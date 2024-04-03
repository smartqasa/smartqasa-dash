import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  area: string;
  picture?: string;
  }

  interface AreaEntry {
    [key: string]: {
      area_id: string;
      icon: string;
      name: string;
      picture: string;
    };
  }

  @customElement("smartqasa-area-picture")
  export class AreaPicture extends LitElement {
  @state() private _config?: Config;
  @state() private _areaObj?: AreaEntry;

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
    this._config = config;
    if (this._hass) this.hass = this._hass;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._areaObj = this._config?.area ? this._hass?.areas[this._config.area] : undefined;
    }

  render(): TemplateResult {
    const height = window.smartqasa.deviceType == "phone" ? "15vh" : "20vh";

    const picture = this._config?.picture
      ? `/local/sq-areas/${this._config.picture}`
      : this._areaObj?.picture ?? "/local/sq-storage/images/default.png";

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