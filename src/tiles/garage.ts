import { CSSResultGroup, html, LitElement, nothing, TemplateResult } from "lit";
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
  @state() private _name: string | typeof nothing;
  @state() private _stateObj?: HassEntity;

  private _hass;

  setConfig(config: Config): void {
    if (!config.entity) {
      throw new Error("You must specify an entity");
    }
    this._entity = config.entity;
    this._name = config.name ?? nothing;
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
    let name = this._name as string ?? "Unknown";
    let stateFmtd: "Unknown";

    if (this._stateObj) {
        const state: string = this._stateObj.state as string ?? "unknown";
        switch (state) {
          case "closed":
            icon = "hass:garage-variant";
            iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
            iconAnimation = "none";
            break;
          case "closing":
            icon = "hass:arrow-down-box";
            iconColor = "var(--sq-garage-closing-rgb, 255, 120, 0)";
            iconAnimation = "blink 2.0s linear infinite";
            break;
          case "opening":
            icon = "hass:arrow-up-box";
            iconColor = "var(--sq-garage-opening-rgb, 255, 120, 0)";
            iconAnimation = "blink 2.0s linear infinite";
            break;
          case "open":
            icon = "hass:garage-open-variant";
            iconColor = "var(--sq-garage-open-rgb, 255, 120, 0)";
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
        name = this._name as string ?? this._stateObj.attributes.friendly_name ?? this._entity;
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
    if (this._hass && this._stateObj) {
      this._hass.callService("cover", "toggle", { entity_id: this._entity });
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

customElements.define("smartqasa-garage-tile", SmartQasaGarageTile);

window.customCards.push({
  type: "smartqasa-garage-tile",
  name: "SmartQasa Garage Tile",
  preview: true,
  description: "A SmartQasa tile for controlling a garage cover entity.",
});
