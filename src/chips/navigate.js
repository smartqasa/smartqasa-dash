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
    if (config.area_prev && config.area_next) {
      this._areaPrev = config.area_prev ?? null;
      this._areaNext = config.area_next ?? null;
    } else {
      throw new Error("You need to define an area");
    }
  }

  set hass(hass) {
    this._hass = hass;
    this._areaObjPrev = this._hass.areas[this._areaPrev] ?? undefined;
    this._areaObjNext = this._hass.areas[this._areaNext] ?? undefined;
  }

  static styles = styleChipDouble;

  render() {
    return html`
      <div class="container">
        <div class="icon1" @click=${this._navigatePrev}>
          <ha-icon .icon="hass:menu-left"></ha-icon>
        </div>
        <div class="icon2" @click=${this._navigateNext}>
          <ha-icon .icon="hass:menu-right"></ha-icon>
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
  name: "SmartQasa Navigate Sensor Chip",
  preview: true,
  description: "A SmartQasa chip for navigating to a previous/next area.",
});
