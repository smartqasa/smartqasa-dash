import { CSSResult, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import styleChipBasic from "../styles/chip-basic";

interface Config extends LovelaceCardConfig {
    entity?: string;
    name?: string;
}

@customElement("smartqasa-motion-chip")
export class SmartQasaMotionChip extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _containerStyle!: string;
    private _icon!: string;
    private _iconColor!: string;
    private _name?: string;
    private _hass: any;

    static styles: CSSResult = styleChipBasic;

    setConfig(config: Config): void {
        this._name = config.name || undefined;
        this._containerStyle = this._name
            ? ""
            : "grid-template-areas: 'i'; grid-column-gap: 0; justify-content: center;";
    }

    set hass(hass: HomeAssistant) {
        if (this._config && this._config.entity) {
            this._hass = hass;
            this._stateObj = this._hass.states[this._config.entity];
            this._updateState();
        }
    }

    private _updateState(): void {
        if (this._stateObj) {
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
        }
    }

    protected render(): TemplateResult {
        if (!this._stateObj) {
            return html``;
        }

        return html`
            <div class="container" style="${this._containerStyle}" @click=${this._toggleEntity}>
                <div class="icon" style="color: rgb(${this._iconColor});">
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
