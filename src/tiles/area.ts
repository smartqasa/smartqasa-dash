import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { AreaRegistryEntry, HomeAssistant, LovelaceCardConfig } from "../types";

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
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    @state() private running: boolean = false;
    private area?: string;
    private areaObj?: AreaRegistryEntry;

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.area = this.config.area;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("config") && this.config) ||
            (changedProps.has("hass") && this.area && this.hass?.areas[this.area] !== this.areaObj) ||
            this.running
        );
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this.navigateToArea}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }

    private updateState() {
        let icon, iconAnimation, iconColor, name;

        this.areaObj = this.area ? this.hass?.areas[this.area] : undefined;

        if (this.config && this.areaObj) {
            if (this.running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            } else {
                icon = this.config.icon || this.areaObj.icon || "hass:help-rhombus";
                iconAnimation = "none";
                iconColor = "var(--sq-inactive-rgb)";
            }
            name = this.config.name || this.areaObj.name || this.area;
        } else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name };
    }

    private navigateToArea(e: Event): void {
        e.stopPropagation();
        if (!this.areaObj) return;

        this.running = true;

        window.history.pushState(null, "", `/home-dash/${this.area}`);
        window.dispatchEvent(new CustomEvent("location-changed"));

        setTimeout(() => {
            this.running = false;
            window.browser_mod?.service("close_popup", {});
        }, 500);
    }
}
