import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassArea } from "../types";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import { tileBaseStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    area: string;
    icon?: string;
    name?: string;
}

@customElement("smartqasa-area-tile")
export class AreaTile extends LitElement {
    @state() private _config?: Config;
    @state() private _areaObj?: HassArea;

    private _area: any;
    private _hass: any;
    private _icon: string = "hass:help-rhombus";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._area = this._config?.area;
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!this._area || !hass) return;
        this._hass = hass;
        this._areaObj = this._hass?.areas[this._area];
        this.updateState();
    }

    private updateState(): void {
        if (!this._areaObj) {
            this._icon = this._config?.icon ?? "hass:alert-rhombus";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name ?? "Unknown";
            return;
        }

        this._icon = this._config?.icon || this._areaObj.icon || "hass:help-rhombus";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._areaObj.name || this._area || "Unknown";
    }

    render(): TemplateResult {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };

        return html`
            <div class="container" @click=${this.navigateToArea}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }

    private navigateToArea(e: Event): void {
        e.stopPropagation();
        if (!this._areaObj) return;

        const icon = this._icon;

        this._icon = "hass:rotate-right";
        this._iconAnimation = "spin 1.0s linear infinite";
        this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";

        setTimeout(() => {
            window.history.pushState(null, "", `/home-dash/${this._area}`);
            window.dispatchEvent(new CustomEvent("location-changed"));
            window.browser_mod?.service("close_popup", {});
        }, 1000);
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
