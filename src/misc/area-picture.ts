import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface ExtendedHassEntity extends HassEntity {
  picture?: string;
}

interface Config extends LovelaceCardConfig {
  area: string;
  picture?: string;
  }

export class SmartQasaAreaPicture extends LitElement {
  @state() private _area: string;
  @state() private _areaObj?: HassEntity;
  @state() private _picture?: string;

  private _hass;

  setConfig(config: Config): void {
    if (!config.area) {
      throw new Error("You must specify an area");
    }
    this._area = config.area;
    this._picture = config.picture ?? undefined;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._areaObj = this._hass.areas[this._area] ?? undefined;
  }

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

  render(): TemplateResult {
    if (!this._areaObj && this._area !== "home") {
      return html``;
    }

    const height = window.smartqasa.deviceType == "phone" ? "15vh" : "20vh";
    const picture = this._picture
      ? `/local/sq-areas/${this._picture}`
      : (this._areaObj as ExtendedHassEntity).picture ?? "/local/sq-storage/images/default.png";

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

customElements.define("smartqasa-area-picture", SmartQasaAreaPicture);
