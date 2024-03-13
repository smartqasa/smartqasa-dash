import { LitElement, html } from "lit";

import styleTileBase from "../styles/tile-base";
import styleTileIconSpin from "../styles/tile-icon-spin";

export class SmartQasaAllOffTile extends LitElement {
  _hass;

  static get properties() {
    return {
      _area: { state: true },
      _areaObj: { state: true },
      _icon: { state: true },
      _name: { state: true },
    };
  }

  setConfig(config) {
    if (config.area) {
      this._area = config.area;
      this._icon = config.icon ?? "hass:power";
      this._name = config.name;
    } else {
      throw new Error("You need to specify an area");
    }
  }

  set hass(hass) {
    this._hass = hass;
    this._areaObj = this._hass.areas[this._area];
  }

  static styles = [styleTileBase, styleTileIconSpin];

  render() {
    let iconColor, name;
    if (this._areaObj) {
      iconColor = "var(--sq-inactive-rgb)";
      name = this._name ?? "All Off";
    } else {
      iconColor = "var(--sq-unavailable-rgb)";
      name = this._name ?? "Unknown";
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

  _runRoutine(e) {
    e.stopPropagation();
    const haIconElement = this.shadowRoot.querySelector("ha-icon");
    haIconElement.icon = "hass:rotate-right";
    const iconElement = this.shadowRoot.getElementById("icon");
    iconElement.style.animation = "spin 1.0s linear infinite";

    this._hass.callService("light", "turn_off", {
      area_id: this._area,
      transition: 2,
    });
    this._hass.callService("fan", "turn_off", {
      area_id: this._area,
    });

    setTimeout(() => {
      haIconElement.icon = this._icon;
      iconElement.style.color = `rgb(var(--sq-inactive-rgb))`;
      iconElement.style.animation = "none";
    }, 2000);
  }
}

customElements.define("smartqasa-all-off-tile", SmartQasaAllOffTile);
window.customCards.push({
  type: "smartqasa-all-off-tile",
  name: "SmartQasa All Off Tile",
  preview: true,
  description:
    "A SmartQasa tile for turning off all light and fan entities in an area.",
});
