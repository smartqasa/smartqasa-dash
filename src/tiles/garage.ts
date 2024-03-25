import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { state } from "lit/decorators.js";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";
import styleTileIconBlink from "../styles/tile-icon-blink";

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  entity: string;
  name?: string;
}

export class SmartQasaGarageTile extends LitElement {
  @state() private _entity: string;
  @state() private _name: string;
  @state() private _icon: string;
  @state() private _iconAnimation: string;
  @state() private _iconColor: string;
  @state() private _stateFmtd: string;
  @state() private _stateObj?: HassEntity;

  private _hass;

  static styles: CSSResultGroup = [styleTileBase, styleTileState, styleTileIconBlink];

  setConfig(config: Config): void {
    if (!config.entity) {
      throw new Error("You must specify an entity");
    }
    this._entity = config.entity;
    this._name = config.name ?? undefined;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._stateObj = this._hass.states[this._entity] ?? undefined;
    if (this._stateObj) {
      const state = this._stateObj.state ?? "unknown";
      switch (state) {
        case "closed":
          this._icon = "hass:garage-variant";
          this._iconAnimation = "none";
          this._iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
          break;
        case "opening":
          this._icon = "hass:arrow-up-box";
          this._iconAnimation = "blink 2.0s linear infinite";
          this._iconColor = "var(--sq-garage-opening-rgb, 255, 120, 0)";
          break;
        case "open":
          this._icon = "hass:garage-open-variant";
          this._iconAnimation = "none";
          this._iconColor = "var(--sq-garage-open-rgb, 255, 120, 0)";
          break;
        case "closing":
          this._icon = "hass:arrow-down-box";
          this._iconAnimation = "blink 2.0s linear infinite";
          this._iconColor = "var(--sq-garage-closing-rgb, 255, 120, 0)";
          break;
        default:
          this._icon = "hass:alert-rhombus";
          this._iconAnimation = "none";
          this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
          break;
      }
      this._stateFmtd =
        this._hass.formatEntityState(this._stateObj) +
        (state === "open" && this._stateObj.attributes.current_position
          ? " - " +
            this._hass.formatEntityAttributeValue(
              this._stateObj,
              "current_position"
            )
          : "");
      this._name = this._name ?? this._stateObj.attributes.friendly_name ?? this._entity;
    } else {
      this._icon = "hass:alert-rhombus";
      this._iconAnimation = "none";
      this._iconColor = "var(--sq-unavailable-rgb)";
      this._name = this._name ?? "Unknown";
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
    if (this._hass && this._stateObj) {
      this._hass.callService("cover", "toggle", { entity_id: this._entity });
    }
  }

  private _showMoreInfo(e: Event): void {
    e.stopPropagation();
    if (this._hass && this._stateObj) {
      const event = new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: this._entity },
      });
      this.dispatchEvent(event);
    }
  }

  getCardSize(): number {
    return 1;
  }
}

customElements.define("smartqasa-garage-tile", SmartQasaGarageTile);

window.customCards.push({
  type: "smartqasa-garage-tile",
  name: "SmartQasa Garage Tile",
  preview: true,
  description: "A SmartQasa tile for controlling a garage cover entity.",
});
