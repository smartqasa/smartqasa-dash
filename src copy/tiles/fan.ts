import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

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

@customElement("smartqasa-fan-tile")
export class SmartQasaFanTile extends LitElement {
  @state() private _entity: string = "";
  @state() private _icon: string = "hass:help-rhombus";
  @state() private _iconAnimation: string = "none";
  @state() private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
  @state() private _name: string = "Loading...";
  @state() private _stateFmtd: string = "Loading...";
  @state() private _stateObj?: HassEntity;

  private _hass: any;

  static styles: CSSResultGroup = [styleTileBase, styleTileState, styleTileIconSpin];

  setConfig(config: Config): void {
    if (!config.entity) throw new Error("You must specify an entity");

    this._entity = config.entity;
    this._icon = config.icon ?? "";
    this._name = config.name ?? "";

    if (this._hass) this.hass = this._hass;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (this._hass) {
      this._stateObj = this._hass.states[this._entity] ?? undefined;
      this._updateState();
    }
  }

  private _updateState(): void {
    if (this._stateObj) {
      const state: string = this._stateObj.state ?? "unknown";
      this._icon = this._icon ?? "hass:fan";
      if (state == "on" && this._icon == "hass:fan") {
        if (this._stateObj.attributes.percentage) {
          const speed = 0.5 + (1 - this._stateObj.attributes.percentage / 100);
          const direction =
            this._stateObj.attributes.direction === "reverse"
              ? "reverse"
              : "normal";
          this._iconAnimation = `spin ${speed}s linear infinite ${direction}`;
        } else {
          this._iconAnimation = `spin 0.5s linear infinite normal`;
        }
      } else {
        this._iconAnimation = "none";
      }
      this._iconColor = state == "on" ? "var(--sq-fan-on-rgb)" : "var(--sq-inactive-rgb)";
      this._name = this._name ?? this._stateObj.attributes.friendly_name ?? this._entity;
      this._stateFmtd =
        this._hass.formatEntityState(this._stateObj) +
        (state == "on" && this._stateObj.attributes.percentage
          ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "percentage")
          : "");
    } else {
      this._icon = this._icon ?? "hass:alert-rhombus";
      this._iconAnimation = "none";
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
            animation: ${this._iconAnimation};"
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
      this._hass.callService("fan", "toggle", { entity_id: this._entity });
    }
  }

  private _showMoreInfo(e: Event): void {
    e.stopPropagation();
    if (this._stateObj) {
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

window.customCards.push({
  type: "smartqasa-fan-tile",
  name: "SmartQasa Fan Tile",
  preview: true,
  description: "A SmartQasa tile for controlling a fan entity.",
});
