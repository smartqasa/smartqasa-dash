import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { LovelaceCardConfig } from "custom-card-helpers";

import { tileBaseStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    icon: string;
    name: string;
    mode: string;
}

@customElement("smartqasa-theme-tile")
export class ThemeTile extends LitElement {
    @state() private _config?: Config;

    private _icon: string = "hass:compare";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    setConfig(config: Config): void {
        this._config = { ...config };
        this.updateState();
    }

    private updateState(): void {
        this._icon = this._config?.icon || "hass:compare";
        this._iconColor = this._config?.mode ? "var(--sq-inactive-rgb)" : "var(--sq-unavailable-rgb, 255, 0, 255)";
        this._name = this._config?.name || this._config?.mode || "Unknown";
    }

    protected render(): TemplateResult {
        if (!this._config) return html``;

        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
        };

        return html`
            <div class="container" @click=${this.selectMode}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }

    private selectMode(e: Event): void {
        e.stopPropagation();
        if (!this._config) return;

        window.browser_mod?.service("set_theme", { dark: this._config.mode });
        window.browser_mod?.service("close_popup", {});
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
