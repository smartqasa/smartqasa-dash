import { CSSResultGroup, html, LitElement, nothing, TemplateResult } from "lit";
import { state } from "lit/decorators.js";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  entity: string;
  icon?: string;
  name?: string;
}

export class SmartQasaLightTile extends LitElement {
  @state() private _entity: string;
  @state() private _icon: string | typeof nothing;
  @state() private _name: string | typeof nothing;
  @state() private _stateObj?: HassEntity;

  private _hass;

  setConfig(config: Config): void {
    if (!config.entity) {
      throw new Error("You must specify an entity");
    }
    this._entity = config.entity;
    this._icon = config.icon ?? nothing;
    this._name = config.name ?? nothing;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._stateObj = this._hass.states[this._entity] ?? undefined;
  }

  static styles: CSSResultGroup = [styleTileBase, styleTileState];

  render(): TemplateResult {
    let icon: any = "hass:alert-rhombus";
    let iconColor: string = "var(--sq-unavailable-rgb)";
    let name: any = "Unknown";
    let stateFmtd: string = "Unknown";

    if (this._stateObj) {
      const state: string = this._stateObj.state ?? "unknown";
      icon = this._icon ?? this._stateObj.attributes.icon ?? "hass:help-circle";
      iconColor = state == "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb)";
      name = this._name ?? this._stateObj.attributes.friendly_name ?? this._entity;
      stateFmtd =
        this._hass.formatEntityState(this._stateObj) +
        (state == "on" && this._stateObj.attributes.brightness
          ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "brightness")
          : "");
    }

    return html`
      <div class="container" @click=${this._showMoreInfo}>
        <div
          class="icon"
          @click=${this._toggleEntity}
          style="
            color: rgb(${iconColor});
            background-color: rgba(${iconColor}, var(--sq-icon-opacity));
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
      this._hass.callService("light", "toggle", { entity_id: this._entity });
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

  getCardSize() {
    return 1;
  }
}

customElements.define("smartqasa-light-tile", SmartQasaLightTile);

window.customCards.push({
  type: "smartqasa-light-tile",
  name: "SmartQasa Light Tile",
  preview: true,
  description: "A SmartQasa tile for controlling a light entity.",
});
