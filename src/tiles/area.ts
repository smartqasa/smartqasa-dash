import { CSSResult, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig, navigate } from "custom-card-helpers";

import styleTileBase from "../styles/tile-base";

interface Config extends LovelaceCardConfig{
  area: string;
  icon?: string;
  name?: string;
}

declare global {
  interface Window {
    browser_mod?: {
      service: (service: string, data?: object) => void;
    };
  }
}

@customElement("smartqasa-area-tile")
export class SmartQasaAreaTile extends LitElement {
  @state() private _area: string;
  @state() private _areaObj?: HassEntity;
  @state() private _icon: string = "hass:help-rhombus";
  @state() private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
  @state() private _name: string = "Loading...";

  private _hass: any;

  static styles: CSSResult = styleTileBase;

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
    this._areaObj = this._hass?.areas[this._area] ?? undefined;
  }

  render(): TemplateResult {
    if (this._areaObj) {
      this._icon = this._icon ?? this._hass.areas[this._area!].icon ?? "hass:help-rhombus";
      this._iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
      this._name = this._name ?? this._hass.areas[this._area!].name ?? "Unknown";
    } else {
      this._icon = this._icon ?? "hass:alert-rhombus";
      this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
      this._name = this._name ?? "Unknown";
    }

    return html`
      <div class="container" @click=${this._navigate}>
        <div
          class="icon"
          style="
            color: rgb(${this._iconColor});
            background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
          "
        >
          <ha-icon .icon=${this._icon}></ha-icon>
        </div>
        <div class="name">${this._name}</div>
      </div>
    `;
  }

  private _navigate(e: Event): void {
    e.stopPropagation();
    if (this._areaObj) {
      navigate(null, `/home-dash/${this._area}`, false);

      window.browser_mod?.service("close_popup", {});
    } else {
      console.error("Area is not found.");
    }
  }

  getCardSize(): number {
    return 1;
  }
}

window.customCards.push({
  type: "smartqasa-area-tile",
  name: "SmartQasa Area Tile",
  preview: true,
  description: "A SmartQasa card for navigating to an area panel.",
});