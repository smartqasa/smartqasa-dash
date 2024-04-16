import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import { tileBaseStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    icon: string;
    name: string;
    option: string;
}

@customElement("smartqasa-theme-tile")
export class ThemeTile extends LitElement {
    @state() private _config?: Config;

    private _hass: any;
    private _icon: string = "hass:compare";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";
    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    setConfig(config: Config): void {
        this._config = { ...config };
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!this._config || !hass) return;
        this._hass = hass;
    }

    private updateState(): void {
        if (!this._config) return;

        this._icon = this._config.icon || "hass:compare";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = this._config.name || this._config.option || "Unknown";
    }

    protected render(): TemplateResult {
        if (!this._config) return html``;

        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };

        return html`
            <div class="container" @click=${this.selectOption}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }

    private selectOption(e: Event): void {
        e.stopPropagation();
        if (!this._config) return;

        this._icon = "hass:rotate-right";
        this._iconAnimation = "spin 1.0s linear infinite";
        this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";

        this._hass.callService("browser_mod", "set_theme", {
            dark: this._config.option,
        });

        setTimeout(() => {
            window.browser_mod?.service("close_popup", {});
        }, 2000);
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-theme-tile",
    name: "SmartQasa Theme Tile",
    preview: true,
    description: "A SmartQasa tile for setting the display theme.",
});
