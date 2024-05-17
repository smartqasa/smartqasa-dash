import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { AreaRegistryEntry, HomeAssistant, LovelaceCardConfig } from "../types";

import { chipDoubleStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    area_prev?: string;
    area_next?: string;
}
window.customCards.push({
    type: "smartqasa-navigate-chip",
    name: "SmartQasa Navigate Chip",
    preview: true,
    description: "A SmartQasa chip for navigating to a previous/next area.",
});

@customElement("smartqasa-navigate-chip")
export class NavigateChip extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private areaPrev?: string;
    @state() private areaNext?: string;
    @state() private areaObjPrev?: AreaRegistryEntry;
    @state() private areaObjNext?: AreaRegistryEntry;

    static styles: CSSResultGroup = [chipDoubleStyle];

    public setConfig(config: Config): void {
        this.areaPrev = config.area_prev || undefined;
        this.areaNext = config.area_next || undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            changedProps.has("hass") &&
            this.areaPrev &&
            this.areaNext &&
            (this.hass?.areas[this.areaPrev] !== this.areaObjPrev ||
                this.hass?.areas[this.areaNext] !== this.areaObjNext)
        );
    }

    protected render(): TemplateResult {
        if (!this.areaPrev || !this.areaNext) return html``;

        this.areaObjPrev = this.areaPrev ? this.hass?.areas[this.areaPrev] : undefined;
        this.areaObjNext = this.areaNext ? this.hass?.areas[this.areaNext] : undefined;

        const containerStyle = {
            "margin-right": "0.7rem",
        };
        const iconPrev = "hass:menu-left";
        const iconNext = "hass:menu-right";

        return html`
            <div class="container" style="${styleMap(containerStyle)}">
                <div class="icon1" @click=${this.navigatePrev}>
                    <ha-icon .icon=${iconPrev}></ha-icon>
                </div>
                <div class="icon2" @click=${this.navigateNext}>
                    <ha-icon .icon=${iconNext}></ha-icon>
                </div>
            </div>
        `;
    }

    private navigatePrev(e: Event): void {
        e.stopPropagation();
        if (this.areaObjPrev) {
            window.history.pushState(null, "", `/home-dash/${this.areaPrev}`);
            window.dispatchEvent(new CustomEvent("location-changed"));
            // Assume browser_mod is correctly typed and included
        } else {
            console.error("Previous area is not found.");
        }
    }

    private navigateNext(e: Event): void {
        e.stopPropagation();
        if (this.areaObjNext) {
            window.history.pushState(null, "", `/home-dash/${this.areaNext}`);
            window.dispatchEvent(new CustomEvent("location-changed"));
        } else {
            console.error("Next area is not found.");
        }
    }
}
