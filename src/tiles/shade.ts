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
  tilt?: number;
}

export class SmartQasaShadeTile extends LitElement {
  @state() private _entity: string;
  @state() private _name?: string;
  @state() private _stateObj?: HassEntity;
  @state() private _tilt?: number;

  private _hass;

  setConfig(config: Config): void {
    if (!config.entity) {
      throw new Error("You must specify an entity");
    }
    this._entity = config.entity;
    this._name = config.name ?? undefined;
    this._tilt = config.tilt ?? 100;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._stateObj = this._hass.states[this._entity] ?? undefined;
  }

  static styles: CSSResultGroup = [styleTileBase, styleTileState, styleTileIconBlink];

  render(): TemplateResult {
    let icon = "hass:alert-rhombus";
    let iconColor = "var(--sq-unavailable-rgb)";
    let iconAnimation = "none";
    let name = this._name ?? "Unknown";
    let stateFmtd = "Unknown";

    if (this._stateObj) {
      const state = this._stateObj.state;
      switch (state) {
        case "closed":
          icon = "hass:roller-shade-closed";
          iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
          iconAnimation = "none";
          break;
        case "closing":
          icon = "hass:arrow-down-box";
          iconColor = "var(--sq-shade-closing-rgb, 146, 107, 199)";
          iconAnimation = "blink 2.0s linear infinite";
          break;
        case "opening":
          icon = "hass:arrow-up-box";
          iconColor = "var(--sq-shade-opening-rgb, 146, 107, 199)";
          iconAnimation = "blink 2.0s linear infinite";
          break;
        case "open":
          icon = "hass:roller-shade";
          iconColor = "var(--sq-shade-open-rgb, 146, 107, 199)";
          iconAnimation = "none";
          break;
        default:
          icon = "hass:alert-rhombus";
          iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
          iconAnimation = "none";
          break;
      }
      stateFmtd =
        this._hass.formatEntityState(this._stateObj) +
        (state === "open" && this._stateObj.attributes.current_position
          ? " - " +
            this._hass.formatEntityAttributeValue(
              this._stateObj,
              "current_position"
            )
          : "");
      name =
        this._name ?? this._stateObj.attributes.friendly_name ?? this._entity;
    }

    return html`
      <div class="container" @click=${this._showMoreInfo}>
        <div
          class="icon"
          @click=${this._toggleEntity}
          style="
            color: rgb(${iconColor});
            background-color: rgba(${iconColor}, var(--sq-icon-opacity));
            animation: ${iconAnimation};
          "
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
        <div class="state">${stateFmtd}</div>
      </div>
    `;
  }

  private _toggleEntity(e: Event): void {
    e.stopPropagation();
    if (this._hass && this._stateObj && typeof this._tilt === "number") {
      const newPosition = this._stateObj.attributes.current_position < this._tilt ? this._tilt : 0;
      this._hass.callService("cover", "set_cover_position", {
        entity_id: this._entity,
        position: newPosition,
      });
    }
  }

  private _showMoreInfo(e: Event): void {
    e.stopPropagation();
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId: this._entity },
    });
    this.dispatchEvent(event);
  }

  getCardSize(): number {
    return 1;
  }
}

customElements.define("smartqasa-shade-tile", SmartQasaShadeTile);

window.customCards.push({
  type: "smartqasa-shade-tile",
  name: "SmartQasa Shade Tile",
  preview: true,
  description: "A SmartQasa tile for controlling a window shade entity.",
});
