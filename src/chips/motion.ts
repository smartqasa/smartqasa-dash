import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";

import chipBaseStyle from "../css/chip-base.css";
import chipTextStyle from "../css/chip-text.css";

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

    static styles: CSSResultGroup = [unsafeCSS(chipBaseStyle), unsafeCSS(chipTextStyle)];

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

        const iconStyles = {
            color: `rgb(${iconColor})`,
            paddingRight: name ? "calc(var(--sq-chip-padding, 1rem) / 2)" : "var(--sq-chip-padding, 1rem)",
        };

        return html`
            <div class="container" @click=${this._toggleEntity}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                ${name ? html`<div class="text">${name}</div>` : null}
            </div>
        `;
    }

    private _updateState(): { icon: string; iconColor: string; name: string } {
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
