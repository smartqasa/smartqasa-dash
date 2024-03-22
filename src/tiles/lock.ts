import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { state } from "lit/decorators.js";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";
import styleTileIconSpin from "../styles/tile-icon-spin";

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  entity: string;
  name?: string;
}

export class SmartQasaLockTile extends LitElement {
  @state() private _entity: string;
  @state() private _name?: string;
  @state() private _stateObj?: HassEntity;

  private _hass;

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
  }

  static styles: CSSResultGroup = [styleTileBase, styleTileState, styleTileIconSpin];

  render(): TemplateResult {
    let icon = "hass:alert-rhombus";
    let iconColor = "var(--sq-unavailable-rgb)";
    let name = this._name ?? "Unknown";
    let stateFmtd = "Unknown";

    if (this._stateObj) {
      const state = this._stateObj.state ?? "unknown";
      switch (state) {
        case "locked":
          icon = "hass:lock";
          iconColor = "var(--sq-inactive-rgb)";
          break;
        case "unlocked":
          icon = "hass:lock-open";
          iconColor = "var(--sq-lock-unlocked-rgb)";
          break;
        default:
          icon = "hass:alert-rhombus";
          iconColor = "var(--sq-unavailable-rgb)";
          break;
      }
      name = this._name ?? this._stateObj.attributes.friendly_name ?? this._entity;
      stateFmtd = this._hass.formatEntityState(this._stateObj);
    }

    return html`
      <div class="container" @click=${this._showMoreInfo}>
        <div
          class="icon"
          id="icon"
          @click=${this._toggleLock}
          style="color: rgb(${iconColor}); background-color: rgba(${iconColor}, var(--sq-icon-opacity));"
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
        <div class="state">${stateFmtd}</div>
      </div>
    `;
  }

  private _toggleLock(e: Event): void {
    e.stopPropagation();
    if (this._hass && this._stateObj) {
      const haIconElement = this.shadowRoot?.querySelector("ha-icon") as HTMLElement & { icon: string } | null;
      haIconElement.icon = "hass:rotate-right";
      const iconElement = this.shadowRoot?.getElementById("icon") as HTMLElement | null;
      iconElement.style.animation = "spin 1.0s linear infinite";
      this._hass.callService(
        "lock",
        this._stateObj?.state === "locked" ? "unlock" : "lock",
        { entity_id: this._entity }
      );
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

customElements.define("smartqasa-lock-tile", SmartQasaLockTile);

window.customCards.push({
  type: "smartqasa-lock-tile",
  name: "SmartQasa Lock Tile",
  preview: true,
  description: "A SmartQasa tile for controlling a lock entity.",
});
