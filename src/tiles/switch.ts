import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { state } from "lit/decorators.js";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  category?: string;
  entity: string;
  icon?: string;
  name?: string;
}

export class SmartQasaSwitchTile extends LitElement {
  @state() private _category: string;
  @state() private _entity: string;
  @state() private _icon: string;
  @state() private _iconColor: string;
  @state() private _name: string;
  @state() private _stateFmtd: string;
  @state() private _stateObj?: HassEntity;

  private _hass;

  static styles: CSSResultGroup = [styleTileBase, styleTileState];

  setConfig(config: Config): void {
    if (!config.entity) {
      throw new Error("You must specify an entity");
    }
    this._category = config.category ?? undefined;
    this._entity = config.entity;
    this._icon = config.icon ?? undefined;
    this._name = config.name ?? undefined;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._stateObj = this._hass.states[this._entity] ?? undefined;;
    if (this._stateObj) {
      const state = this._stateObj.state;
      this._icon = this._icon ?? this._stateObj.attributes.icon ?? "hass:help-circle";
      this._iconColor = state === "on"
        ? `var(--sq-switch${this._category ? `-${this._category}` : ""}-on-rgb)`
        : "var(--sq-inactive-rgb)";
      this._name = this._name ?? this._stateObj.attributes.friendly_name ?? this._entity;
      this._stateFmtd = this._hass ? this._hass.formatEntityState(this._stateObj) : "Unknown";
    } else {
      this._icon = this._icon ?? "hass:alert-rhombus";
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
      this._hass.callService("homeassistant", "toggle", {
        entity_id: this._entity,
      });
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

customElements.define("smartqasa-switch-tile", SmartQasaSwitchTile);

window.customCards.push({
  type: "smartqasa-switch-tile",
  name: "SmartQasa Switch Tile",
  preview: true,
  description: "A SmartQasa tile for toggling an entity.",
});
