import { CSSResult, html, LitElement, TemplateResult } from "lit";
import { state } from "lit/decorators.js";

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import styleTileBase from "../styles/tile-base";

declare global {
  interface Window {
    browser_mod: {
      service: (service: string, data: object) => void;
    };
  }
}

interface Config extends LovelaceCardConfig{
  area: string;
  icon?: string;
  name?: string;
}

export class SmartQasaAreaTile extends LitElement {
  @state() private _area?: string;
  @state() private _areaObj?: HassEntity;
  @state() private _icon?: string;
  @state() private _name?: string;

  private _hass;

  setConfig(config: Config): void {
    if (!config.area) {
      throw new Error("You must specify an area");
    }
    this._area = config.area;
    this._icon = config.icon ?? undefined;
    this._name = config.name ?? undefined;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._areaObj = this._hass.areas[this._area] ?? undefined;
  }

  static get styles(): CSSResult {
    return styleTileBase;
  }

  render(): TemplateResult {
    let icon = this._icon ?? "hass:alert-rhombus";
    let iconColor = "var(--sq-unavailable-rgb)";
    let name = this._name ?? "Unknown";

    if (this._areaObj) {
      icon = this._icon ?? this._hass.areas[this._area!].icon ?? "hass:help-circle";
      iconColor = "var(--sq-inactive-rgb)";
      name = this._name ?? this._hass.areas[this._area!].name ?? "Unknown";
    }

    return html`
      <div class="container" @click=${this._navigate}>
        <div
          class="icon"
          id="icon"
          style="color: rgb(${iconColor}); background-color: rgba(${iconColor}, var(--sq-icon-opacity));"
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
      </div>
    `;
  }

  private _navigate(e: Event): void {
    e.stopPropagation();
    if (this._areaObj) {
      window.history.pushState(null, "", `/home-dash/${this._area}`);
      window.dispatchEvent(new CustomEvent("location-changed"));
      window.browser_mod!.service("close_popup", {});
    } else {
      console.error("Area is not found.");
    }
  }

  getCardSize(): number {
    return 1;
  }
}

customElements.define("smartqasa-area-tile", SmartQasaAreaTile);

window.customCards.push({
  type: "smartqasa-area-tile",
  name: "SmartQasa Area Tile",
  preview: true,
  description: "A SmartQasa card for navigating to an area panel.",
});