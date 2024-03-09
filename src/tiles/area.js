import { LitElement, html } from "lit";

import styleTileBase from "../styles/tile-base";

export class SmartQasaAreaTile extends LitElement {
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
      this._area = config.area ?? null;
      this._icon = config.icon ?? null;
      this._name = config.name ?? null;
    } else {
      throw new Error("You need to define an area");
    }
  }

  set hass(hass) {
    this._hass = hass;
    this._areaObj = this._hass.areas[this._area] ?? undefined;
  }

  static styles = styleTileBase;

  render() {
    let icon, iconColor, name;
    if (this._areaObj) {
      icon = this._icon ?? this._areaObj.icon ?? "hass:help-circle";
      iconColor = "var(--sq-inactive-rgb)";
      name = this._name ?? this._areaObj.name ?? "Unknown";
    } else {
      icon = this._icon ?? "hass:alert-rhombus";
      iconColor = "var(--sq-unavailable-rgb)";
      name = this._name ?? "Unknown";
    }

    return html`
      <div class="container" @click=${this._navigate}>
        <div
          class="icon"
          id="icon"
          style="
                        color: rgb(${iconColor});
                        background-color: rgba(${iconColor}, var(--sq-icon-opacity));
                        "
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
      </div>
    `;
  }

  _navigate(e) {
    e.stopPropagation();
    if (this._areaObj) {
      window.history.pushState(null, "", `/home-dash/${this._area}`);
      window.dispatchEvent(new CustomEvent("location-changed"));
      window.browser_mod.service("close_popup", {});
    } else {
      console.error("Area is not found.");
    }
  }
}

customElements.define("smartqasa-area-tile", SmartQasaAreaTile);
window.customCards.push({
  type: "smartqasa-area-tile",
  name: "SmartQasa Area Tile",
  preview: true,
  description:
    "A SmartQasa tile for navigating to an area or a specific dashboard view.",
});
