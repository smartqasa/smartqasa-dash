import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassArea, HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";

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
    @state() private _config?: Config;
    @state() private _running: boolean = false;
    private _area?: string;
    private _areaObj?: HassArea;

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._area = this._config?.area;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            changedProps.has("running") ||
            (changedProps.has("hass") && this._area && this.hass?.areas[this._area] !== this._areaObj) ||
            changedProps.has("_config")
        );
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name } = this._updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this._runRoutine}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }

    private _updateState() {
        let icon, iconAnimation, iconColor, name;

        this._areaObj = this._area ? this.hass?.areas[this._area] : undefined;

        if (this._config && this._areaObj) {
            if (this._running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            } else {
                icon = this._config.icon || "hass:power";
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

    private async _runRoutine(e: Event): Promise<void> {
        e.stopPropagation();
        if (!this.hass || !this._areaObj) return;

        this._running = true;
        await callService(this.hass, "light", "turn_off", {
            area_id: this._area,
            transition: 2,
        });
        await callService(this.hass, "fan", "turn_off", {
            area_id: this._area,
        });

        setTimeout(() => {
            this._running = false;
        }, 1000);
    }
}
