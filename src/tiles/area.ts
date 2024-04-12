import { CSSResult, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import styleTileBase from "../styles/tile-base";

interface Config extends LovelaceCardConfig {
    area: string;
    icon?: string;
    name?: string;
}

interface AreaEntry {
    [key: string]: {
        area_id: string;
        icon: string;
        name: string;
        picture: string;
    };
}

@customElement("smartqasa-area-tile")
export class AreaTile extends LitElement {
    @state() private _config?: Config;
    @state() private _areaObj?: AreaEntry;

    private _hass: any;
    private _icon: string = "hass:help-rhombus";
    private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
    private _name: string = "Loading...";

    static styles: CSSResult = styleTileBase;

    setConfig(config: Config): void {
        this._config = { ...config };
        this._updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!this._config?.area || !hass) return;
        this._hass = hass;
        this._updateState();
    }

    private _updateState(): void {
        this._areaObj = this._config?.area ? this._hass?.areas[this._config.area] : undefined;

        if (!this._areaObj) {
            this._icon = this._config?.icon ?? "hass:alert-rhombus";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name ?? "Unknown";
            return;
        }

        this._icon = (this._config?.icon as string) ?? this._areaObj.icon ?? this._icon;
        this._iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
        this._name = (this._config?.name as string) ?? this._areaObj.name ?? "Unknown";
    }

    render(): TemplateResult {
        return html`
            <div class="container" @click=${this._navigate}>
                <div
                    class="icon"
                    style="
                        color: rgb(${this._iconColor});
                        background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
                    "
                >
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }

    private _navigate(e: Event): void {
        e.stopPropagation();
        if (this._areaObj) {
            window.history.pushState(null, "", `/home-dash/${this._areaObj.area_id}`);
            window.dispatchEvent(new CustomEvent("location-changed"));
            window.browser_mod?.service("close_popup", {});
        } else {
            console.error("Area is not found.");
        }
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-area-tile",
    name: "SmartQasa Area Tile",
    preview: true,
    description: "A SmartQasa card for navigating to an area panel.",
});
