import { LitElement, html, css } from "lit";

export class SmartQasaAreaImageCard extends LitElement {
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
        smartqasa.devicetype==='phone'? '15vh' : "20vh";
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

    const picture =
      this._areaObj.picture ?? "/local/sq-storage/images/default.png";
    return html`
      <ha-card
        style="background-image: url('${picture}')"
        clas="picture "
      ></ha-card>
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
