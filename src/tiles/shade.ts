import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";
import styleTileIconBlink from "../styles/tile-icon-blink";

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  entity: string;
  name?: string;
  tilt?: number;
}

@customElement("smartqasa-shade-tile")
export class ShadeTile extends LitElement {
  @state() private _config?: Config;
  @state() private _icon: string = "hass:roller-shade";
  @state() private _iconAnimation: string = "none";
  @state() private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
  @state() private _name: string = "Loading...";
  @state() private _stateFmtd: string = "Loading...";
  @state() private _stateObj?: HassEntity;
  @state() private _tilt: number = 100;

  private _hass: any;

  static styles: CSSResultGroup = [styleTileBase, styleTileState, styleTileIconBlink];

  setConfig(config: Config): void {
    if (!config.entity || config.entity.split('.')[0] != "cover") throw new Error("A valid cover entity is required.");
    this._config = config;
    if (this._hass) this.hass = this._hass;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._stateObj = this._config?.entity ? this._hass.states[this._config.entity] : undefined;
    this._updateState();
  }

  private _updateState(): void {
    if (this._stateObj) {
      const state = this._stateObj.state;
      switch (state) {
        case "closed":
          this._icon = "hass:roller-shade-closed";
          this._iconAnimation = "none";
          this._iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
          break;
        case "opening":
          this._icon = "hass:arrow-up-box";
          this._iconAnimation = "blink 2.0s linear infinite";
          this._iconColor = "var(--sq-shade-opening-rgb, 146, 107, 199)";
          break;
        case "open":
          this._icon = "hass:roller-shade";
          this._iconAnimation = "none";
          this._iconColor = "var(--sq-shade-open-rgb, 146, 107, 199)";
          break;
        case "closing":
          this._icon = "hass:arrow-down-box";
          this._iconAnimation = "blink 2.0s linear infinite";
          this._iconColor = "var(--sq-shade-closing-rgb, 146, 107, 199)";
          break;
        default:
          this._icon = "hass:alert-rhombus";
          this._iconAnimation = "none";
          this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
          break;
      }
      this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
      this._stateFmtd =
        this._hass.formatEntityState(this._stateObj) +
        (state === "open" && this._stateObj.attributes.current_position
          ? " - " +
            this._hass.formatEntityAttributeValue(
              this._stateObj,
              "current_position"
            )
          : "");
    } else {
      this._icon = "hass:roller-shade";
      this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
      this._iconAnimation = "none";
      this._name = this._config?.name || "Unknown";
      this._stateFmtd = "Unknown";
    }
}

  render(): TemplateResult {
    return html`
      <div class="container" @click=${this._showMoreInfo}>
        <div
          class="icon"
          @click=${this._toggleEntity}
          style="
            color: rgb(${this._iconColor});
            background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
            animation: ${this._iconAnimation};
          "
        >
          <ha-icon .icon=${this._icon}></ha-icon>
        </div>
        <div class="name">${this._name}</div>
        <div class="state">${this._stateFmtd}</div>
      </div>
    `;
  }

  private _toggleEntity(e: Event): void {
    e.stopPropagation();
    if (this._stateObj) {
      if (this._tilt > 0 && this._tilt <= 100) {
        if (this._stateObj.attributes.current_position < this._tilt) {
          this._hass.callService("cover", "set_cover_position", {
            entity_id: this._stateObj.entity_id,
            position: this._tilt,
          });
        } else {
          this._hass.callService("cover", "set_cover_position", {
            entity_id: this._stateObj.entity_id,
            position: 0,
          });
        }
      } else {
        this.hass.callService("cover", "toggle", { entity_id: this._stateObj.entity_id });
      }
    }
  }

  private _showMoreInfo(e: Event): void {
    e.stopPropagation();
    if (this._stateObj) {
      const event = new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: this._stateObj.entity_id },
      });
      this.dispatchEvent(event);
    }
  }

  getCardSize(): number {
    return 1;
  }
}

window.customCards.push({
  type: "smartqasa-shade-tile",
  name: "SmartQasa Shade Tile",
  preview: true,
  description: "A SmartQasa tile for controlling a window shade entity.",
});
