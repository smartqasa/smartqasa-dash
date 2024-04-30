import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { LovelaceCardConfig } from "../types";

import { tileBaseStyle, tileIconSpinStyle } from "../styles/tile";

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
    getCardSize(): number {
        return 1;
    }

    @state() private config?: Config;

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
    }

    protected render(): TemplateResult {
        if (!this.config) return html``;

        const icon = this.config.icon || "hass:compare";
        const iconColor = this.config.mode ? "var(--sq-inactive-rgb)" : "var(--sq-unavailable-rgb, 255, 0, 255)";
        const name = this.config.name || this.config.mode || "Unknown";

        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
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
        if (!this.config) return;

        window.browser_mod?.service("set_theme", { dark: this.config.mode });
        window.browser_mod?.service("close_popup", {});
    }
}
