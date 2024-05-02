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
    type: "smartqasa-all-off-tile",
    name: "SmartQasa All Off Tile",
    preview: true,
    description: "A SmartQasa tile for turning off all light and fan entities in an area.",
});

@customElement("smartqasa-all-off-tile")
export class AllOffTile extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private initialized: boolean = false;
    @state() private config?: Config;
    @state() private areaObj?: AreaRegistryEntry;
    @state() private running: boolean = false;

    private area?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
        this.area = this.config?.area;
    }

    updated(changedProps: PropertyValues) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.area) {
            this.areaObj = this.hass && this.area ? this.hass.areas[this.area] : undefined;
            this.initialized = true;
        }
    }

    protected render(): TemplateResult {
        if (!this.initialized) return html``;

        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this.runRoutine}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }

    private updateState() {
        let icon, iconAnimation, iconColor, name;

        if (this.config && this.hass && this.areaObj) {
            if (this.running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            } else {
                icon = this.config.icon || "hass:power";
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

    private async runRoutine(e: Event): Promise<void> {
        e.stopPropagation();
        if (!this.areaObj || !this.hass) return;

        this.running = true;

        try {
            await this.hass.callService("light", "turn_off", {
                area_id: this.area,
                transition: 2,
            });
            await this.hass.callService("fan", "turn_off", {
                area_id: this.area,
            });
        } catch (error) {
            console.error("Failed to turn off entities:", error);
        }

        setTimeout(() => {
            this.running = false;
        }, 2000);
    }
}
