import { LitElement, html } from "lit";

export class SmartQasaImageCard extends LitElement {
  _hass;

  static get properties() {
    return {
      _area: { state: true },
      _areaObj: { state: true },
    };
  }

  setConfig(config) {
    if (config.area) {
      this._area = config.area;
    } else {
      throw new Error("You must specify an area");
    }
  }

  set hass(hass) {
    this._hass = hass;
    this._areaObj = this._hass.areas[this._area];
  }

  static get styles() {
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

  render() {
    if (!this._areaObj) {
      return html``;
    }

    const picture = `url('/local/sq-areas/${this._area}')`;
    return html`
      <ha-card style="background-image: url('${picture}')"></ha-card>
    `;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("smartqasa-area-image-card", SmartQasaAreaImageCard);
window.customCards.push({
  type: "smartqasa-area-image-card",
  name: "SmartQasa Area Image Card",
  preview: true,
  description:
    "A SmartQasa tile for displaying the image associated with an area.",
});
