import { CSSResultGroup, LitElement, html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import { tileBaseStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    area: string;
    icon?: string;
    name?: string;
}

@customElement("smartqasa-all-off-tile")
export class AllOffTile extends LitElement {
    @state() private _config?: Config;
    @state() private _areaObj?: any;
    @state() private _running: boolean = false;

    private _area?: string;
    private _hass: any;
    private _icon: string = "hass:help-rhombus";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._area = this._config?.entity;
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!this._area || !hass) return;
        this._hass = hass;
        this._areaObj = this._hass?.areas[this._area];
        this.updateState();
    }

    private updateState(): void {
        if (this._running === true) return;

        if (!this._areaObj) {
            this._icon = this._config?.icon ?? "hass:alert-rhombus";
            this._iconAnimation = "none";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name ?? "Unknown";
            return;
        }

        this._icon = this._config?.icon || "hass:power";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._areaObj.name || this._areaObj.id;
    }

    protected render(): TemplateResult {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };

        return html`
            <div class="container" @click=${this.runRoutine}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }

    private runRoutine(e: Event): void {
        e.stopPropagation();
        if (!this._areaObj) return;

        this._running = true;
        this._icon = "hass:rotate-right";
        this._iconAnimation = "spin 1.0s linear infinite";
        this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";

        this._hass.callService("light", "turn_off", {
            area_id: this._areaObj.area_id,
            transition: 2,
        });
        this._hass.callService("fan", "turn_off", {
            area_id: this._areaObj.area_id,
        });

        setTimeout(() => {
            this._running = false;
            this.updateState();
        }, 2000);
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-all-off-tile",
    name: "SmartQasa All Off Tile",
    preview: true,
    description: "A SmartQasa tile for turning off all light and fan entities in an area.",
});
