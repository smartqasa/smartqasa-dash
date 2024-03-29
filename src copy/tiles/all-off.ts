import { CSSResultGroup, LitElement, html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

import styleTileBase from "../styles/tile-base";
import styleTileIconSpin from "../styles/tile-icon-spin";

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  area: string;
  icon?: string;
  name?: string;
}

@customElement("smartqasa-all-off-tile")
export class SmartQasaAllOffTile extends LitElement {
  @state() private _area: string = "";
  @state() private _areaObj?: HassEntity;
  @state() private _icon: string = "hass:help-rhombus-outline";
  @state() private _iconAnimation: string = "none";
  @state() private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
  @state() private _name: string = "Loading...";

  private _hass: any;

  static styles: CSSResultGroup = [styleTileBase, styleTileIconSpin];

  setConfig(config: Config): void {
    if (!config.area) throw new Error("You must specify an area");

    this._area = config.area;
    this._icon = config.icon ?? "";
    this._name = config.name ?? "";

    if (this._hass) this.hass = this._hass;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._areaObj = this._hass?.areas[this._area] ?? undefined;
    this._updateState();
  }

  private _updateState(): void {
    if (this._areaObj) {
      this._icon = this._icon ?? "hass:power";
      this._iconAnimation = "none";
      this._iconColor = "var(--sq-inactive-rgb)";
      this._name = this._name ?? this._hass.areas[this._area].name ?? this._area;
    } else {
      this._icon = this._icon ?? "hass:alert-rhombus";
      this._iconAnimation = "none";
      this._iconColor = "var(--sq-unavailable-rgb)";
      this._name = this._name ?? "Unknown";
    }
  }

  protected render(): TemplateResult {
    return html`
      <div class="container" @click=${this._runRoutine}>
        <div
          class="icon"
          style="
            color: rgb(${this._iconColor});
            background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
            animation: ${this._iconAnimation};
          "
        >
          <ha-icon .icon=${this._icon}></ha-icon>
        </div>
        <div class="name">${this._name}</div>
      </div>
    `;
  }

  private _runRoutine(e: Event): void {
    e.stopPropagation();
    if (this._areaObj) {
      const icon = this._icon;

      this._icon = "hass:rotate-right";
      this._iconAnimation = "spin 1.0s linear infinite";

      this._hass.callService("light", "turn_off", {
        area_id: this._area,
        transition: 2,
      });
      this._hass.callService("fan", "turn_off", {
        area_id: this._area,
      });

      setTimeout(() => {
        this._icon = icon;
        this._iconAnimation = "none";
      }, 2000);
    }
  }

  getCardSize(): number {
    return 1;
  }
}

window.customCards.push({
  type: "smartqasa-all-off-tile",
  name: "SmartQasa All Off Tile",
  preview: true,
  description: "A SmartQasa tile for turning off all light and fan entities in an area.",
});
