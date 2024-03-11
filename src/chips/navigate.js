import { LitElement, html } from "lit";

import styleChipDouble from "../styles/chip-double";

export class SmartQasaNavigateChip extends LitElement {
  _hass;

  static get properties() {
    return {
      _areaPrev: { state: true },
      _areaNext: { state: true },
      _areaObjPrev: { state: true },
      _areaObjNext: { state: true },
    };
  }

  setConfig(config) {
    this._areaPrev = config.area_prev;
    this._areaNext = config.area_next;
  }

  set hass(hass) {
    this._hass = hass;
    this._areaObjPrev = this._hass.areas[this._areaPrev];
    this._areaObjNext = this._hass.areas[this._areaNext];
  }

  static styles = styleChipDouble;

  render() {
    if (!this._areaObjPrev || !this.areaObjNext) {
      return html``;
    }

    const icon1 = "hass:menu-left";
    const icon2 = "hass:menu-right";

    return html`
      <div class="container">
        <div class="icon1" @click=${this._navigatePrev}>
          <ha-icon .icon=${icon1}></ha-icon>
        </div>
        <div class="icon2" @click=${this._navigateNext}>
          <ha-icon .icon=${icon2}></ha-icon>
        </div>
      </div>
    `;
  }

  _navigatePrev(e) {
    e.stopPropagation();
    if (this._areaObjPrev) {
      window.history.pushState(null, "", `/home-dash/${this._areaPrev}`);
      window.dispatchEvent(new CustomEvent("location-changed"));
      window.browser_mod.service("close_popup", {});
    } else {
      console.error("Area is not found.");
    }
  }
  _navigateNext(e) {
    e.stopPropagation();
    if (this._areaObjNext) {
      window.history.pushState(null, "", `/home-dash/${this._areaNext}`);
      window.dispatchEvent(new CustomEvent("location-changed"));
      window.browser_mod.service("close_popup", {});
    } else {
      console.error("Area is not found.");
    }
  }
}

customElements.define("smartqasa-navigate-chip", SmartQasaNavigateChip);
window.customCards.push({
  type: "smartqasa-navigate-chip",
  name: "SmartQasa Area Navigattion Chip",
  preview: true,
  description: "A SmartQasa chip for navigating to a previous/next area.",
});
