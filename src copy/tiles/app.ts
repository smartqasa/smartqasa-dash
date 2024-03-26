import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

import styleTileBase from "../styles/tile-base";
import appTable from "../tables/apps";
import { LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  app: string;
  icon?: string;
  name?: string;
}

@customElement("smartqasa-app-tile")
export class SmartQasaAppTile extends LitElement {
  @state() private _app: string = "";
  @state() private _appObj?: any;
  @state() private _icon?: string;
  @state() private _name?: string;

  private _hass: any;

  static styles: CSSResultGroup = styleTileBase;

  setConfig(config: Config): void {
    if (!config.app) throw new Error("You must specify an app");

    this._app = config.app;
    this._appObj = appTable[this._app] ?? undefined;
    if (this._appObj) {
      this._icon = config.icon ?? undefined;
      this._name = config.name ?? this._appObj?.name ?? "Unknown";
    }
  }

  protected render(): TemplateResult {
    let iconTemplate: any;
    let iconStyle = "color: rgb(var(--sq-inactive-rgb)); background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-opacity, 0.2));";

    if (this._icon) {
      iconTemplate = html`<ha-icon .icon=${this._icon}></ha-icon>`;
    } else if (this._appObj?.app_icon) {
      iconTemplate = html`<img src="/local/community/smartqasa-dash/assets/${this._appObj.app_icon}" alt="App Icon" style="border-radius: 50%;" />`;
      iconStyle = "height: 3.8rem; width: 3.8rem; padding: 0;";
    } else {
      iconTemplate = html`<ha-icon .icon="hass:alert-rhombus"></ha-icon>`;
      iconStyle = "color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-opacity));";
    }

    return html`
      <div class="container" @click=${this._launchApp}>
        <div class="icon" style=${iconStyle}>${iconTemplate}</div>
        <div class="name">${this._name}</div>
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
        }).catch((error: any) => {
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

window.customCards.push({
  type: "smartqasa-app-tile",
  name: "SmartQasa App Tile",
  preview: true,
  description: "A SmartQasa tile for launching applications from the dashboard",
});
