import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { state } from "lit/decorators.js";

import styleTileBase from "../styles/tile-base";
import appTable from "../tables/apps";

import { LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  app: string;
  icon?: string;
  name?: string;
}

interface AppEntry {
  name: string;
  app_icon?: string;
  launcher: "package" | "uri_scheme";
  package?: string;
  uri_scheme?: string;
}

interface AppTable {
  [key: string]: AppEntry;
}

export class SmartQasaAppTile extends LitElement {
  @state() private _app: string;
  @state() private _appObj?: AppEntry;
  @state() private _icon?: string;
  @state() private _name?: string;

  private _hass;

  static styles: CSSResultGroup = styleTileBase;

  setConfig(config: Config): void {
    if (!config.app) {
      throw new Error("You must specify an app");
    }
    this._app = config.app;
    this._appObj = appTable[this._app] as AppEntry;
    if (this._appObj) {
      this._icon = config.icon ?? undefined;
      this._name = config.name ?? undefined;
    }
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

    if (this._appObj.launcher === "uri_scheme" && this._appObj.uri_scheme) {
      window.location.href = this._appObj.uri_scheme;
    } else if (this._appObj.launcher === "package" && this._appObj.package) {
      if (this._hass) {
        this._hass.callService("fully_kiosk", "start_application", {
          application: this._appObj.package,
        }).catch((error) => {
          console.error("Error calling fully_kiosk.start_application service:", error);
        });
      } else {
        console.error("Home Assistant client (this._hass) is not available.");
      }
    } else {
      console.error(
        "Neither URI scheme nor package ID is provided for launching the app."
      );
    }
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
