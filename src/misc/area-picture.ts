import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  area: string;
  picture?: string;
  }

  @customElement("smartqasa-area-picture")
export class SmartQasaAreaPicture extends LitElement {
  @state() private _area: string;
  @state() private _areaObj?: HassEntity;
  @state() private _picture?: string;

  private _hass: any;

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
      ha-card {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        border-radius: 4px;
        border: none;
        box-shadow: none;
        background-color: transparent;
        overflow: hidden;
      }
    `;
  }

  setConfig(config: Config): void {
    if (!config.area) throw new Error("You must specify an area");

    this._area = config.area;
    this._picture = config.picture ?? undefined;

    if (this._hass) this.hass = this._hass;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._areaObj = this._hass.areas[this._area] ?? undefined;
  }

  render(): TemplateResult {
    if (!this._areaObj && this._area != "home") {
      return html``;
    }

    const height = window.smartqasa.deviceType == "phone" ? "15vh" : "20vh";
    const picture = this._picture
      ? `/local/sq-areas/${this._picture}`
      : this._hass?.areas[this._area]?.picture ?? "/local/sq-storage/images/default.png";

    return html`
      <ha-card
        style="background-image: url(${picture}); height: ${height};"
        class="picture"
      ></ha-card>
    `;
  }

  getCardSize(): number {
    return 1;
  }
}

window.customCards.push({
  type: "smartqasa-area-picture",
  name: "SmartQasa Area Picture",
  preview: true,
  description: "A SmartQasa card for rendering an area picture.",
});