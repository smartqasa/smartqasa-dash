import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassArea, HomeAssistant, LovelaceCardConfig } from "../types";

import { tileBaseStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    area: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-area-tile",
    name: "SmartQasa Area Tile",
    preview: true,
    description: "A SmartQasa card for navigating to an area panel.",
});

@customElement("smartqasa-area-tile")
export class AreaTile extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _running: boolean = false;
    private _area?: string;
    private _areaObj?: HassArea;

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._area = this._config.area;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            changedProps.has("running") ||
            (changedProps.has("hass") && this._area && this.hass?.areas[this._area] !== this._areaObj) ||
            (changedProps.has("_config") && this._config)
        );
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this._navigateToArea}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }

    private updateState() {
        let icon, iconAnimation, iconColor, name;

        this._areaObj = this._area ? this.hass?.areas[this._area] : undefined;

        if (this._config && this._areaObj) {
            if (this._running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            } else {
                icon = this._config.icon || this._areaObj.icon || "hass:help-rhombus";
                iconAnimation = "none";
                iconColor = "var(--sq-inactive-rgb)";
            }
            name = this._config.name || this._areaObj.name || this._area;
        } else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name };
    }

    private _navigateToArea(e: Event): void {
        e.stopPropagation();
        if (!this._areaObj) return;

        this._running = true;
        window.smartqasa.viewMode = "area";
        window.history.pushState(null, "", `/home-dash/${this._area}`);
        window.dispatchEvent(new CustomEvent("location-changed"));

        setTimeout(() => {
            this._running = false;
            window.browser_mod?.service("close_popup", {});
        }, 500);
    }
}
