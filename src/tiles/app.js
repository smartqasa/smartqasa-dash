import { LitElement, html } from "lit";
import styleTileBase from "../styles/tile-base";
import appTable from "../tables/apps";

export class SmartQasaAppTile extends LitElement {
  _hass;

  static get properties() {
    return {
      _app: { state: true },
      _appObj: { state: true },
      _icon: { state: true },
      _name: { state: true },
    };
  }

  setConfig(config) {
    this._app = config.app ?? null;
    this._appObj = appTable[this._app] ?? undefined;
    this._icon = config.icon ?? null;
    this._name = config.name ?? null;
  }

  set hass(hass) {
    this._hass = hass;
  }

  static styles = styleTileBase;

  render() {
    let icon, iconStyle, name;
    if (this._appObj) {
      if (this._icon) {
        icon = html`<ha-icon .icon=${this._icon}></ha-icon>`;
        iconStyle =
          "color: rgb(var(--sq-inactive-rgb)); background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-opacity));";
      } else if (this._appObj.app_icon) {
        icon = html`<img
          src="/local/sq-storage/images/${this._appObj.app_icon}"
          alt="App Icon"
          style="border-radius: 50%;"
        />`;
        iconStyle = "height: 3.8rem; width: 3.8rem; padding: 0;";
      } else {
        icon = html`<ha-icon .icon="hass:alert-rhombus"></ha-icon>`;
        iconStyle =
          "color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-opacity));";
      }
      name = this._name ?? this._appObj.name ?? "Unknown";
    } else {
      icon = html`<ha-icon .icon="hass:alert-rhombus"></ha-icon>`;
      iconStyle =
        "color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-opacity));";
      name = this._name ?? "Unknown";
    }
    return html`
      <div class="container" @click=${this._launchApp}>
        <div class="icon" style=${iconStyle}>${icon}</div>
        <div class="name">${name}</div>
      </div>
    `;
  }

  _launchApp(e) {
    e.stopPropagation();
    if (this._appObj.launcher === "uri_scheme" && this._appObj.uri_scheme) {
      window.location.href = this._appObj.uri_scheme;
    } else if (this._appObj.launcher === "package" && this._appObj.package) {
      if (typeof fully !== "undefined" && fully.startApplication) {
        fully.startApplication(this._appObj.package);
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
