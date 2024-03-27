import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import styleTileBase from "../styles/tile-base";
import styleTileIconSpin from "../styles/tile-icon-spin";

interface Config extends LovelaceCardConfig {
  entity: string;
  icon?: string;
  name?: string;
}

@customElement("smartqasa-routine-tile")
export class RoutineTile extends LitElement {
  @state() private _config?: Config;
  @state() private _icon: string = "hass:help-rhombus";
  @state() private _iconAnimation: string = "none";
  @state() private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
  @state() private _name: string = "Loading...";
  @state() private _stateObj?: HassEntity;

  private _prevStateIcon: string = "";
  private _prevStateName: string = "";

  private _hass: any;

  static styles: CSSResultGroup = [styleTileBase, styleTileIconSpin];

  setConfig(config: Config): void {
    const validDomains = ['automation', 'scene', 'script'];
    if (!config.entity || !validDomains.includes(config.entity.split('.')[0])) {
      throw new Error("A valid automation, scene, or script entity is required.");
    }
    this._config = config;
    if (this._hass) this.hass = this._hass;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (this._hass && this._config?.entity) {
      this._stateObj = this._hass.states[this._config.entity] ?? undefined;
      if (!this._stateObj) throw new Error("The entity could not be located.");
        if (this._stateObj.attributes.icon != this._prevStateIcon || this._stateObj.attributes.friendly_name != this._prevStateName) {
          this._updateState();
          this._prevStateIcon = this._stateObj.attributes.icon ?? "";
          this._prevStateName = this._stateObj.attributes.friendly_name ?? "";
      }
    }
  }

  private _updateState(): void {
    if (this._stateObj) {
      this._icon = this._config?.icon ?? this._stateObj.attributes.icon ?? "hass:help-circle";
      this._iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
      this._name = this._config?.name ?? this._stateObj.attributes.friendly_name ?? this._stateObj.entity_id;
    } else {
      this._icon = this._config?.icon ?? "hass:alert-rhombus";
      this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
      this._iconAnimation = "none";
      this._name = this._config?.name ?? "Unknown";
    }
  }

  render(): TemplateResult {
    return html`
      <div class="container" @click=${this._runRoutine}>
        <div
          class="icon"
          @click=${this._runRoutine}
          style="
            color: rgb(${this._iconColor});
            background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
            animation: ${this._iconAnimation};
          "
        >
          <ha-icon .icon=${this._icon}></ha-icon>
        </div>
        <div class="name">${this._name}</div>
      </div>
    `;
  }

  private _runRoutine(e: Event): void {
    e.stopPropagation();

    if (this._stateObj) {
      let icon = this._icon;
      this._icon = "hass:rotate-right"
      this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
      this._iconAnimation = "spin 1.0s linear infinite"

      const domain = this._stateObj.entity_id.split(".")[0];
      switch (domain) {
        case "script":
          this._hass.callService("script", "turn_on", { entity_id: this._stateObj.entity_id });
          break;
        case "scene":
          this._hass.callService("scene", "turn_on", { entity_id: this._stateObj.entity_id });
          break;
        case "automation":
          this._hass.callService("automation", "trigger", { entity_id: this._stateObj.entity_id });
          break;
        default:
          console.error("Unsupported entity domain:", domain);
          return;
      }

      setTimeout(() => {
        this._icon = icon;
        this._iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
        this._iconAnimation = "none";
      }, 2000);
    }
  }

  getCardSize(): number {
    return 1;
  }
}

window.customCards.push({
  type: "smartqasa-routine-tile",
  name: "SmartQasa Routine Tile",
  preview: true,
  description: "A SmartQasa tile for triggering an automation, scene, or script entity.",
});
