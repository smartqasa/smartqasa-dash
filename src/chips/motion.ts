import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";

import { chipBaseStyle, chipTextStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    entity?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-motion-chip",
    name: "SmartQasa Motion Sensor Chip",
    preview: true,
    description: "A SmartQasa chip for toggling a motion sensor automation entity.",
});

@customElement("smartqasa-motion-chip")
export class MotionChip extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("automation.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._entity) return nothing;

        const { icon, iconColor, name } = this._updateState();

        const containerStyle = {
            "margin-right": "0.7rem",
            "grid-template-areas": name ? '"i t"' : '"i"',
        };

        const iconStyles = {
            color: `rgb(${iconColor})`,
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this._toggleEntity}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                ${name ? html`<div class="text">${name}</div>` : null}
            </div>
        `;
    }

    private _updateState() {
        let icon, iconColor, name;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._config && this._stateObj) {
            const state = this._stateObj.state || undefined;
            switch (state) {
                case "on":
                    icon = "hass:motion-sensor";
                    iconColor = "var(--sq-primary-font-rgb)";
                    break;
                case "off":
                    icon = "hass:motion-sensor-off";
                    iconColor = "var(--sq-red-rgb, 255, 0, 0)";
                    break;
                default:
                    icon = "hass:motion-sensor-off";
                    iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                    break;
            }
        } else {
            icon = this._config?.icon || "hass:lightbulb-alert";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
        }
        name = this._config?.name || "";

        return { icon, iconColor, name };
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        callService(this.hass, "automation", "toggle", { entity_id: this._entity });
    }
}
