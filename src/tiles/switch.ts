import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";

interface Config extends LovelaceCardConfig {
  category?: string;
  entity: string;
  icon?: string;
  name?: string;
}

@customElement("smartqasa-switch-tile")
export class SmartQasaSwitchTile extends LitElement {
  @state() private _category: string = "";
  @state() private _config?: Config;
  @state() private _icon: string = "hass:toggle-switch-variant";
  @state() private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
  @state() private _name: string = "Loading...";
  @state() private _stateFmtd: string = "Loading...";
  @state() private _stateObj?: HassEntity;

  private _hass: any;

  static styles: CSSResultGroup = [styleTileBase, styleTileState];

  setConfig(config: Config): void {
    if (!config.entity || config.entity.split('.')[0] != "switch") throw new Error("A valid switch entity is required.");
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
      this._icon = this._config?.icon ?? this._stateObj.attributes.icon ?? "hass:toggle-switch-variant";
      this._iconColor = state === "on"
        ? `var(--sq-switch${this._category ? `-${this._category}` : ""}-on-rgb)`
        : "var(--sq-inactive-rgb)";
      this._name = this._config?.name ?? this._stateObj.attributes.friendly_name ?? this._stateObj.entity_id;
      this._stateFmtd = this._hass ? this._hass.formatEntityState(this._stateObj) : "Unknown";
    } else {
      this._icon = this._config?.icon ?? "hass:toggle-switch-variant";
      this._iconColor = "var(--sq-unavailable-rgb)";
      this._name = this._name ?? "Unknown";
      this._stateFmtd = "Unknown";
    }
  }

  protected render(): TemplateResult {
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
    if (this._stateObj) {
      this._hass.callService("homeassistant", "toggle", {
        entity_id: this._stateObj.entity_id,
      });
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
  type: "smartqasa-switch-tile",
  name: "SmartQasa Switch Tile",
  preview: true,
  description: "A SmartQasa tile for toggling an entity.",
});
