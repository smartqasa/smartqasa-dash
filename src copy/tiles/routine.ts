import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { state } from "lit/decorators.js";

import styleTileBase from "../styles/tile-base";
import styleTileIconSpin from "../styles/tile-icon-spin";

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  entity: string;
  icon?: string;
  name?: string;
}

export class SmartQasaRoutineTile extends LitElement {
  @state() private _entity: string = "";
  @state() private _icon: string = "hass:help-rhombus";
  @state() private _iconAnimation: string = "none";
  @state() private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
  @state() private _name: string = "Loading...";
  @state() private _stateObj?: HassEntity;

  private _hass: any;

  static styles: CSSResultGroup = [styleTileBase, styleTileIconSpin];

  setConfig(config: Config): void {
    if (!config.entity) throw new Error("You must specify an entity");

    this._entity = config.entity;
    this._icon = config.icon ?? "";
    this._name = config.name ?? "";

    if (this._hass) this.hass = this._hass;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (this._hass) {
      this._stateObj = this._hass?.states[this._entity] ?? undefined;
      this._updateState();
    }
  }

  private _updateState(): void {
    if (this._stateObj) {
      this._icon = this._icon ?? this._stateObj.attributes.icon ?? "hass:help-circle";
      this._iconColor = "var(--sq-inactive-rgb)";
      this._name = this._name ?? this._stateObj.attributes.friendly_name ?? this._entity;
    } else {
      this._icon = this._icon ?? "hass:alert-rhombus";
      this._iconColor = "var(--sq-unavailable-rgb)";
      this._iconAnimation = "none";
      this._name = this._name ?? "Unknown";
    }
  }

  render(): TemplateResult {
    return html`
      <div class="container" @click=${this._runRoutine}>
        <div
          class="icon"
          id="icon"
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

    if (this._hass && this._stateObj) {
      let icon = this._icon;
      this._icon = "hass:rotate-right"
      this._iconAnimation = "spin 1.0s linear infinite"

      const domain = this._entity.split(".")[0];
      switch (domain) {
        case "script":
          this._hass.callService("script", "turn_on", { entity_id: this._entity });
          break;
        case "scene":
          this._hass.callService("scene", "turn_on", { entity_id: this._entity });
          break;
        case "automation":
          this._hass.callService("automation", "trigger", { entity_id: this._entity });
          break;
        default:
          console.error("Unsupported entity domain:", domain);
          return;
      }

      setTimeout(() => {
        this._icon = icon;
        this._iconAnimation = "none";
      }, 2000);
    }
  }

  getCardSize(): number {
    return 1;
  }
}

customElements.define("smartqasa-routine-tile", SmartQasaRoutineTile);

window.customCards.push({
  type: "smartqasa-routine-tile",
  name: "SmartQasa Routine Tile",
  preview: true,
  description: "A SmartQasa tile for triggering an automation, scene, or script entity.",
});
