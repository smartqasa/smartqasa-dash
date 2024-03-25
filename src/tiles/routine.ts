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
  @state() private _entity: string;
  @state() private _icon?: string;
  @state() private _iconAnimation: string;
  @state() private _name?: string;
  @state() private _stateObj?: HassEntity;

  private _hass;

  setConfig(config: Config): void {
    if (!config.entity) {
      throw new Error("You must specify an entity");
    }
    this._entity = config.entity;
    this._icon = config.icon ?? undefined;
    this._name = config.name ?? undefined;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._stateObj = this._hass.states[this._entity] ?? undefined;
  }

  static styles: CSSResultGroup = [styleTileBase, styleTileIconSpin];

  render(): TemplateResult {
    this._icon = this._icon ?? "hass:alert-rhombus";
    let iconColor = "var(--sq-unavailable-rgb)";
    this._iconAnimation = "none";
    let name = this._name ?? "Unknown";

    if (this._stateObj) {
      this._icon = this._icon ?? this._stateObj.attributes.icon ?? "hass:help-circle";
      iconColor = "var(--sq-inactive-rgb)";
      name = this._name ?? this._stateObj.attributes.friendly_name ?? this._entity;
    }

    return html`
      <div class="container" @click=${this._runRoutine}>
        <div
          class="icon"
          id="icon"
          @click=${this._runRoutine}
          style="
            color: rgb(${iconColor});
            background-color: rgba(${iconColor}, var(--sq-icon-opacity));
            animation: ${this._iconAnimation};
          "
        >
          <ha-icon .icon=${this._icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
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
