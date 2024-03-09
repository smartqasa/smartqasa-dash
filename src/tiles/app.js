import { LitElement, html, css } from "lit";
import styleTileBase from "../styles/tile-base";

export class SmartQasaAppTile extends LitElement {
  _hass;

  static get properties() {
    return {
      _icon: { state: true },
      _appIcon: { state: true },
      _name: { state: true },
      _package: { state: true },
      _uri: { state: true },
    };
  }

  setConfig(config) {
    this._icon = config.icon ?? null;
    this._appIcon = config.app_icon ?? null;
    this._name = config.name ?? "Unknown";
    this._package = config.package ?? null;
    this._uri = config.uri ?? null;
  }

  set hass(hass) {
    this._hass = hass;
  }

  static styles = styleTileBase;

  render() {
    let icon, iconStyle;
    if (this._appIcon) {
      icon = html`<img
        src="/local/sq-storage/images/${this._appIcon}"
        alt="App Icon"
        style="border-radius: 50%;"
      />`;
      iconStyle = "height: 3.8rem; width: 3.8rem; padding: 0;";
    } else if (this._icon) {
      icon = html`<ha-icon .icon=${this._icon}></ha-icon>`;
      iconStyle =
        "color: rgb(var(--sq-inactive-rgb)); background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-opacity));";
    } else {
      icon = html`<ha-icon .icon="hass:alert-rhombus"></ha-icon>`;
      iconStyle =
        "color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-opacity));";
    }

    return html`
      <div class="container" @click=${this._launchApp}>
        <div class="icon" style=${iconStyle}>${icon}</div>
        <div class="name">${this._name}</div>
      </div>
    `;
  }

  _launchApp(e) {
    e.stopPropagation();
    if (this._uri) {
      window.location.href = this._uri;
    } else if (this._package) {
      if (typeof fully !== "undefined" && fully.startApplication) {
        fully.startApplication(this._package);
      } else {
        console.error("fully.startApplication is not available.");
      }
    } else {
      console.error(
        "Neither URI nor package ID is provided for launching the app."
      );
    }
  }
}

customElements.define("smartqasa-app-tile", SmartQasaAppTile);
window.customCards.push({
  type: "smartqasa-app-tile",
  name: "SmartQasa App Tile",
  preview: true,
  description: "A SmartQasa tile for launching applications from the dashboard",
});
