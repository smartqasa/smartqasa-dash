import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import { chipBaseStyle, chipTextStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    entity?: string;
    name?: string;
}

@customElement("smartqasa-motion-chip")
export class MotionChip extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _entity?: string;
    private _hass: any;
    private _icon!: string;
    private _iconColor!: string;
    private _name?: string;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    setConfig(config: Config): void {
        if (!config?.entity) return;
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("automation.") ? this._config.entity : undefined;
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!hass || !this._entity || hass.states[this._entity] === this._stateObj) return;
        this._hass = hass;
        this._stateObj = hass.states[this._entity];
        this.updateState();
    }

    private updateState(): void {
        if (!this._entity || !this._stateObj) return;

        const state = this._stateObj.state || undefined;
        switch (state) {
            case "on":
                this._icon = "hass:motion-sensor";
                this._iconColor = "var(--sq-primary-font-rgb)";
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
    }

    protected render(): TemplateResult {
        if (!this._entity) return html``;

        const containerStyle = {
            "margin-left": "0.7rem",
            "grid-template-areas": this._name ? "i t" : "i",
        };

        const iconStyles = {
            color: `rgb(${this._iconColor})`,
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.toggleEntity}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                ${this._name ? html`<div class="text">${this._name}</div>` : null}
            </div>
        `;
    }

    private toggleEntity(e: Event): void {
        e.stopPropagation();
        if (!this._stateObj) return;
        this._hass.callService("homeassistant", "toggle", { entity_id: this._entity });
    }
}

window.customCards.push({
    type: "smartqasa-motion-chip",
    name: "SmartQasa Motion Sensor Chip",
    preview: true,
    description: "A SmartQasa chip for toggling a motion sensor automation entity.",
});
