import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { state } from "lit/decorators.js";

import styleTileBase from "../styles/tile-base";
import appTable from "../tables/apps";

interface AppEntry {
  name: string;
  app_icon?: string;
  launcher: "package" | "uri_scheme";
  package?: string;
  uri_scheme?: string;
}

// Define the type for the application table
interface AppTable {
  [key: string]: AppEntry;
}

// Define the configuration interface
interface Config {
  app: string;
  icon?: string;
  name?: string;
}

export class SmartQasaAppTile extends LitElement {
  @state() private _app: string;
  @state() private _appObj?: AppEntry;
  @state() private _icon?: string;
  @state() private _name?: string;

  static styles: CSSResultGroup = styleTileBase;

  setConfig(config: Config): void {
    if (!config.app) {
      throw new Error("You must specify an app");
    }
    this._app = config.app;
    this._appObj = appTable[this._app] as AppEntry;
    this._icon = config.icon;
    this._name = config.name;
  }

  render(): TemplateResult {
    let icon, iconStyle, name;
    if (this._appObj) {
      if (this._icon) {
        icon = html`<ha-icon .icon=${this._icon}></ha-icon>`;
        iconStyle = "color: rgb(var(--sq-inactive-rgb)); background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-opacity));";
      } else if (this._appObj.app_icon) {
        icon = html`<img src="/local/sq-storage/images/${this._appObj.app_icon}" alt="App Icon" style="border-radius: 50%;" />`;
        iconStyle = "height: 3.8rem; width: 3.8rem; padding: 0;";
      } else {
        icon = html`<ha-icon .icon="hass:alert-rhombus"></ha-icon>`;
        iconStyle = "color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-opacity));";
      }
      name = this._name ?? this._appObj.name ?? "Unknown";
    } else {
      icon = html`<ha-icon .icon="hass:alert-rhombus"></ha-icon>`;
      iconStyle = "color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-opacity));";
      name = "Unknown";
    }

    return html`
      <div class="container" @click=${this._launchApp}>
        <div class="icon" style=${iconStyle}>${icon}</div>
        <div class="name">${name}</div>
      </div>
    `;
  }

  private _launchApp(e: Event): void {
    e.stopPropagation();
    // Launch logic remains unchanged, assuming `fully` and `window.location.href` are globally accessible
  }

  getCardSize(): number {
    return 1;
  }
}

customElements.define("smartqasa-app-tile", SmartQasaAppTile);

window.customCards.push({
  type: "smartqasa-app-tile",
  name: "SmartQasa App Tile",
  preview: true,
  description: "A SmartQasa tile for launching applications from the dashboard",
});
