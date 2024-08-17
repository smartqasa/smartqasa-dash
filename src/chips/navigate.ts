import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassArea, HomeAssistant, LovelaceCardConfig } from "../types";

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
    @state() private _areaPrev?: string;
    @state() private _areaNext?: string;
    @state() private _areaObjPrev?: HassArea;
    @state() private _areaObjNext?: HassArea;

    static styles: CSSResultGroup = [chipDoubleStyle];

    public setConfig(config: Config): void {
        this._areaPrev = config.area_prev || undefined;
        this._areaNext = config.area_next || undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            changedProps.has("hass") &&
            this._areaPrev &&
            this._areaNext &&
            (this.hass?.areas[this._areaPrev] !== this._areaObjPrev ||
                this.hass?.areas[this._areaNext] !== this._areaObjNext)
        );
    }

    protected render(): TemplateResult {
        if (!this._areaPrev || !this._areaNext) return html``;

        this._areaObjPrev = this._areaPrev ? this.hass?.areas[this._areaPrev] : undefined;
        this._areaObjNext = this._areaNext ? this.hass?.areas[this._areaNext] : undefined;

        const containerStyle = {
            "margin-right": "0.7rem",
        };
        const iconPrev = "hass:menu-left";
        const iconNext = "hass:menu-right";

        return html`
            <div class="container" style="${styleMap(containerStyle)}">
                <div class="icon1" @click=${this._navigatePrev}>
                    <ha-icon .icon=${iconPrev}></ha-icon>
                </div>
                <div class="icon2" @click=${this._navigateNext}>
                    <ha-icon .icon=${iconNext}></ha-icon>
                </div>
            </div>
        `;
    }

    private _navigatePrev(e: Event): void {
        e.stopPropagation();
        if (this._areaObjPrev) {
            window.history.pushState(null, "", `/home-dash/${this._areaPrev}`);
            window.dispatchEvent(new CustomEvent("location-changed"));
            // Assume browser_mod is correctly typed and included
        } else {
            console.error("Previous area is not found.");
        }
    }

    private _navigateNext(e: Event): void {
        e.stopPropagation();
        if (this._areaObjNext) {
            window.history.pushState(null, "", `/home-dash/${this._areaNext}`);
            window.dispatchEvent(new CustomEvent("location-changed"));
        } else {
            console.error("Next area is not found.");
        }
    }
}
