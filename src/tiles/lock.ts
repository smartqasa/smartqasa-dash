import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";
import styleTileIconBlink from "../styles/tile-icon-blink";
import styleTileIconSpin from "../styles/tile-icon-spin";

interface Config extends LovelaceCardConfig {
  entity: string;
  name?: string;
}

@customElement("smartqasa-lock-tile")
export class SmartQasaLockTile extends LitElement {
  @state() private _config?: Config;
  @state() private _icon: string = "hass:lock-alert";
  @state() private _iconAnimation: string = "none";
  @state() private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
  @state() private _name: string = "Loading...";
  @state() private _stateFmtd: string = "Loading...";
  @state() private _stateObj?: HassEntity;

  private _hass: any;

  static styles: CSSResultGroup = [styleTileBase, styleTileState, styleTileIconBlink, styleTileIconSpin];

  setConfig(config: Config): void {
    if (!config.entity || config.entity.split('.')[0] != "lock") throw new Error("A valid lock entity is required.");
    this._config = config;
    if (this._hass) this.hass = this._hass;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._stateObj = this._config?.entity ? this._hass?.states[this._config.entity] : undefined;
    this._updateState();
  }

  private _updateState(): void {
    if (this._stateObj) {
      const state = this._stateObj.state ?? "unknown";
      switch (state) {
        case "locked":
          this._icon = "hass:lock";
          this._iconAnimation = "none";
          this._iconColor = "var(--sq-inactive-rgb)";
          break;
        case "unlocking":
          this._icon = "hass:rotate-right";
          this._iconAnimation = "spin 1.0s linear infinite";
          this._iconColor = "var(--sq-inactive-rgb)";
          break;
        case "unlocked":
          this._icon = "hass:lock-open";
          this._iconAnimation = "none";
          this._iconColor = "var(--sq-lock-unlocked-rgb)";
          break;
        case "locking":
          this._icon = "hass:rotate-right";
          this._iconAnimation = "spin 1.0s linear infinite";
          this._iconColor = "var(--sq-lock-unlocked-rgb)";
          break;
        case "jammed":
          this._icon = "hass:lock-open";
          this._iconAnimation = "blink 1.0s linear infinite";
          this._iconColor = "var(--sq-lock-jammed-rgb, 255, 0, 0)";
          break;
        default:
          this._icon = "hass:lock-alert";
          this._iconAnimation = "none";
          this._iconColor = "var(--sq-unavailable-rgb)";
          break;
      }
      this._name = this._config?.name ?? this._stateObj.attributes.friendly_name ?? this._stateObj.entity_id;
      this._stateFmtd = this._hass.formatEntityState(this._stateObj);
    } else {
      this._icon = "hass:lock-alert";
      this._iconAnimation = "none";
      this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 0)";
      this._name = this._config?.name ?? "Unknown";
      this._stateFmtd = "Unavailable";
    }
}

  protected render(): TemplateResult {
    return html`
      <div class="container" @click=${this._showMoreInfo}>
        <div
          class="icon"
          @click=${this._toggleLock}
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

  private _toggleLock(e: Event): void {
    e.stopPropagation();
    if (this._stateObj) {
      const state = this._stateObj.state
      this._stateObj.state = state == "locked" ? "unlocking" : "locking";
      this._hass.callService(
        "lock",
        state == "locked" ? "unlock" : "lock",
        { entity_id: this._stateObj.entity_id }
      );
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
  type: "smartqasa-lock-tile",
  name: "SmartQasa Lock Tile",
  preview: true,
  description: "A SmartQasa tile for controlling a lock entity.",
});
