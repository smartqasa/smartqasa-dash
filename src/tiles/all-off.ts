import { CSSResultGroup, LitElement, html, TemplateResult, nothing } from "lit";
import { state } from "lit/decorators.js";

import styleTileBase from "../styles/tile-base";
import styleTileIconSpin from "../styles/tile-icon-spin";

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  area: string;
  icon?: string;
  name?: string;
}

export class SmartQasaAllOffTile extends LitElement {
  @state() private _area: string;
  @state() private _areaObj?: HassEntity;
  @state() private _icon: string = "hass:power";
  @state() private _name: string | typeof nothing = nothing;

  private _hass;

  setConfig(config: Config): void {
    if (!config.area) {
      throw new Error("You must specify an area");
    }
      this._area = config.area;
      this._icon = config.icon ?? "hass:power";
      this._name = config.name ?? nothing;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._areaObj = this._hass.areas[this._area] ?? undefined;
  }

  static styles: CSSResultGroup = [styleTileBase, styleTileIconSpin];

  render(): TemplateResult {
    let iconColor: string = "var(--sq-unavailable-rgb)";
    let name: any = this._name ?? "Unknown";

    if (this._areaObj) {
      iconColor = "var(--sq-inactive-rgb)";
      name = this._name ?? "All Off";
    }

    return html`
      <div class="container" @click=${this._runRoutine}>
        <div
          class="icon"
          id="icon"
          style="
            color: rgb(${iconColor});
            background-color: rgba(${iconColor}, var(--sq-icon-opacity));
          "
        >
          <ha-icon .icon=${this._icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
      </div>
    `;
  }

  private _runRoutine(e: Event): void {
    e.stopPropagation();

    if (this._hass && this._areaObj) {
      const haIconElement = this.shadowRoot?.querySelector("ha-icon") as HTMLElement & { icon: string };
      haIconElement.icon = "hass:rotate-right";
      const iconElement = this.shadowRoot?.getElementById("icon") as HTMLElement;
      iconElement.style.animation = "spin 1.0s linear infinite";

      this._hass.callService("light", "turn_off", {
        area_id: this._area,
        transition: 2,
      });
      this._hass.callService("fan", "turn_off", {
        area_id: this._area,
      });

      setTimeout(() => {
        haIconElement.icon = this._icon as string;
        iconElement.style.color = `rgb(var(--sq-inactive-rgb))`;
        iconElement.style.animation = "none";
      }, 2000);
    }
  }

  getCardSize(): number {
    return 1;
  }
}

customElements.define("smartqasa-all-off-tile", SmartQasaAllOffTile);

window.customCards.push({
  type: "smartqasa-all-off-tile",
  name: "SmartQasa All Off Tile",
  preview: true,
  description: "A SmartQasa tile for turning off all light and fan entities in an area.",
});
