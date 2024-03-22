import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { state } from "lit/decorators.js";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";
import styleTileIconSpin from "../styles/tile-icon-spin";

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  entity: string;
  icon?: string;
  name?: string;
}

export class SmartQasaFanTile extends LitElement {
  @state() private _entity: string;
  @state() private _icon?: string;
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

  static styles: CSSResultGroup = [styleTileBase, styleTileState, styleTileIconSpin];

  render(): TemplateResult {
    let icon = this._icon ?? "hass:alert-rhombus";
    let iconColor = "var(--sq-unavailable-rgb)";
    let iconAnimation = "none";
    let name = this._name ?? "Unknown";
    let stateFmtd = "Unknown";

    if (this._stateObj) {
      const state: string = this._stateObj.state ?? "unknown";
      icon = this._icon ?? "hass:fan";
      iconColor = state == "on" ? "var(--sq-fan-on-rgb)" : "var(--sq-inactive-rgb)";
      if (state === "on") {
        if (this._stateObj.attributes.percentage) {
          const speed = 0.5 + (1 - this._stateObj.attributes.percentage / 100);
          const direction =
            this._stateObj.attributes.direction === "reverse"
              ? "reverse"
              : "normal";
          iconAnimation = `spin ${speed}s linear infinite ${direction}`;
        } else {
          iconAnimation = `spin 0.5s linear infinite normal`;
        }
      }
      name = this._name ?? this._stateObj.attributes.friendly_name ?? this._entity;
      stateFmtd =
        this._hass.formatEntityState(this._stateObj) +
        (state == "on" && this._stateObj.attributes.percentage
          ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "percentage")
          : "");
    }

    return html`
      <div class="container" @click=${this._showMoreInfo}>
        <div
          class="icon"
          @click=${this._toggleEntity}
          style="color: rgb(${iconColor}); background-color: rgba(${iconColor}, var(--sq-icon-opacity)); animation: ${iconAnimation};"
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
      this._hass.callService("fan", "toggle", { entity_id: this._entity });
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

customElements.define("smartqasa-fan-tile", SmartQasaFanTile);

window.customCards.push({
  type: "smartqasa-fan-tile",
  name: "SmartQasa Fan Tile",
  preview: true,
  description: "A SmartQasa tile for controlling a fan entity.",
});
