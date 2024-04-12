import { CSSResultGroup, LitElement, html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import styleTileBase from "../styles/tile-base";
import styleTileIconSpin from "../styles/tile-icon-spin";

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

    private _hass: any;
    private _icon: string = "hass:help-rhombus";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
    private _name: string = "Loading...";

    static styles: CSSResultGroup = [styleTileBase, styleTileIconSpin];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._updateArea();
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass ? hass : undefined;
        this._updateArea();
    }

    private _updateArea(): void {
        if (this._running === true) return;

        this._areaObj = this._config?.area ? this._hass?.areas[this._config.area] : undefined;

        if (!this._areaObj) {
            this._icon = this._config?.icon ?? "hass:alert-rhombus";
            this._iconAnimation = "none";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name ?? "Unknown";
            return;
        }

        this._icon = this._config?.icon || "hass:power";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
        this._name = this._config?.name || this._areaObj.name || this._areaObj.id;
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._runRoutine}>
                <div
                    class="icon"
                    style="
                        color: rgb(${this._iconColor});
                        background-color: rgba(${this._iconColor}, var(--sq-icon-opacity, 0.2));
                        animation: ${this._iconAnimation};
                    "
                >
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }

    private _runRoutine(e: Event): void {
        e.stopPropagation();
        if (!this._areaObj) return;

        this._running = true;

        const icon = this._icon;
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
            this._icon = icon;
            this._iconAnimation = "none";
            this._iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
            this._running = false;
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
