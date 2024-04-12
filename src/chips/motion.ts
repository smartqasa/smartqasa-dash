import { CSSResult, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { styleMap } from "lit/directives/style-map.js"; // Ensure styleMap is imported

import styleChipBasic from "../styles/chip-basic";

interface Config extends LovelaceCardConfig {
    entity?: string;
    name?: string;
}

@customElement("smartqasa-motion-chip")
export class SmartQasaMotionChip extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _hass: any;
    private _containerStyle!: any; // Change type to any for styleMap compatibility
    private _icon!: string;
    private _iconColor!: string;
    private _name?: string;

    static styles: CSSResult = styleChipBasic;

    setConfig(config: Config): void {
        this._config = { ...config };
        this._updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!hass || !this._config?.entity) return;
        this._hass = hass;
        this._updateState();
    }

    private _updateState(): void {
        this._stateObj = this._config?.entity ? this._hass.states[this._config.entity] : undefined;

        if (!this._stateObj) return;

        const state = this._stateObj.state || undefined;
        switch (state) {
            case "on":
                this._icon = "hass:motion-sensor";
                this._iconColor = "var(--sq-primary-font-rgb, 128, 128, 128)";
                break;
            case "off":
                this._icon = "hass:motion-sensor-off";
                this._iconColor = "var(--sq-red-rgb, 255, 0, 0)";
                break;
            default:
                this._icon = "hass:motion-sensor-off";
                this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                break;
        }

        this._name = this._config?.name || "";
        this._containerStyle = {
            gridTemplateAreas: this._name ? "'i t'" : "'i'",
            gridColumnGap: this._name ? "10px" : "0",
            justifyContent: this._name ? "start" : "center",
        };
    }

    protected render(): TemplateResult {
        if (!this._stateObj) {
            return html``;
        }

        const iconStyles = {
            color: `rgb(${this._iconColor})`,
        };

        return html`
            <div class="container" style="${styleMap(this._containerStyle)}" @click=${this._toggleEntity}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                ${this._name ? html`<div class="text">${this._name}</div>` : null}
            </div>
        `;
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        if (this._stateObj) {
            this._hass.callService("homeassistant", "toggle", {
                entity_id: this._config?.entity,
            });
        }
    }
}

window.customCards.push({
    type: "smartqasa-motion-chip",
    name: "SmartQasa Motion Sensor Chip",
    preview: true,
    description: "A SmartQasa chip for toggling a motion sensor automation entity.",
});
