import { CSSResult, html, LitElement, TemplateResult, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { LovelaceCardConfig } from "../types";

import tileBaseStyle from "../styles/tile-base.css";

interface Config extends LovelaceCardConfig {
    icon: string;
    name: string;
    mode: string;
}

window.customCards.push({
    type: "smartqasa-theme-tile",
    name: "SmartQasa Theme Tile",
    preview: true,
    description: "A SmartQasa tile for setting the display theme.",
});

@customElement("smartqasa-theme-tile")
export class ThemeTile extends LitElement {
    @state() private _config?: Config;

    static styles: CSSResult = unsafeCSS(tileBaseStyle);

    public setConfig(config: Config): void {
        this._config = { ...config };
    }

    protected render(): TemplateResult {
        if (!this._config) return html``;

        const icon = this._config.icon || "hass:compare";
        const iconColor = this._config.mode ? "var(--sq-inactive-rgb)" : "var(--sq-unavailable-rgb, 255, 0, 255)";
        const name = this._config.name || this._config.mode || "Unknown";

        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
        };

        return html`
            <div class="container" @click=${this.selectMode}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }

    private selectMode(e: Event): void {
        e.stopPropagation();
        window.browser_mod?.service("set_theme", { dark: this._config!.mode });
        window.browser_mod?.service("close_popup", {});
    }
}
