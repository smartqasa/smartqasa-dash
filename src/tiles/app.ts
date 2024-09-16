import { CSSResult, html, LitElement, TemplateResult, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";

import { LovelaceCard, LovelaceCardConfig } from "../types";
import appTable from "../tables/apps";

import tileBaseStyle from "../css/tile-base.css";
interface Config extends LovelaceCardConfig {
    app: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-app-tile",
    name: "SmartQasa App Tile",
    preview: true,
    description: "A SmartQasa tile for launching applications from the dashboard",
});

@customElement("smartqasa-app-tile")
export class AppTile extends LitElement implements LovelaceCard {
    getCardSize(): number | Promise<number> {
        return 1;
    }

    @state() protected _config?: Config;
    private _appObj?: any;

    static styles: CSSResult = unsafeCSS(tileBaseStyle);

    public setConfig(config: Config): void {
        if (!config.app) throw new Error("A valid app must be specified.");
        this._config = { ...config };
        this._appObj = appTable[config.app] || undefined;
    }

    protected render(): TemplateResult {
        let iconStyle: string, iconTemplate: any, name: string;
        if (this._appObj) {
            if (this._config?.icon) {
                iconStyle =
                    "color: rgb(var(--sq-inactive-rgb)); background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-opacity, 0.2));";
                iconTemplate = html`<ha-icon icon=${this._config.icon}></ha-icon>`;
            } else if (this._appObj?.app_icon) {
                iconStyle = "height: 3.8rem; width: 3.8rem; padding: 0;";
                iconTemplate = html`<img src="${this._appObj.app_icon}" alt="App Icon" style="border-radius: 50%;" />`;
            } else {
                iconStyle =
                    "color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-opacity, 0.2));";
                iconTemplate = html`<ha-icon icon="hass:help-rhombus"></ha-icon>`;
            }
        } else {
            iconStyle =
                "color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-opacity, 0.2));";
            iconTemplate = html`<ha-icon icon="hass:alert-rhombus"></ha-icon>`;
        }
        name = this._config?.name || this._appObj?.name || this._config?.app;

        return html`
            <div class="container" @click=${this.launchApp}>
                <div class="icon" style=${iconStyle}>${iconTemplate}</div>
                <div class="name">${name}</div>
            </div>
        `;
    }

    private launchApp(e: Event): void {
        e.stopPropagation();

        if (this._appObj.launcher == "uri_scheme" && this._appObj.uri_scheme) {
            window.location.href = this._appObj.uri_scheme;
        } else if (this._appObj.launcher == "package" && this._appObj.package) {
            if (window.fully?.startApplication) {
                window.fully.startApplication(this._appObj.package);
            } else {
                console.warn("fully.startApplication is not available.");
            }
        } else {
            console.error("Neither URI scheme nor package has been specified.");
        }
    }
}
