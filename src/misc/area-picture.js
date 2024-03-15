import { LitElement, html, css } from "lit";

export class SmartQasaAreaPicture extends LitElement {
  _hass;

  static get properties() {
    return {
      _area: { state: true },
      _areaObj: { state: true },
      _picture: { state: true },
    };
  }

  setConfig(config) {
    if (config.area) {
      this._area = config.area;
      this._picture = config.picture;
      console.log(`Config: ${config.picture}`);
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

    const height = smartqasa.devicetype === "phone" ? "15vh" : "20vh";
    let picture;
    if (this._picture) {
      picture = `/local/sq-areas/${this._picture}`;
      console.log(`First:  ${picture}`);
    } else if (this._areaObj.picture) {
      picture = this._areaObj.picture;
      console.log(`Second: ${picture}`);
    } else {
      picture = "/local/sq-storage/images/default.png";
      console.log(`Default: ${picture}`);
    }
    return html`
      <ha-card
        style="background-image: url(${picture}); height: ${height};"
        class="picture"
      ></ha-card>
    `;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("smartqasa-area-picture", SmartQasaAreaPicture);
window.customCards.push({
  type: "smartqasa-area-picture",
  name: "SmartQasa Area Picture",
  preview: true,
  description:
    "A SmartQasa tile for displaying the picture associated with an area.",
});
