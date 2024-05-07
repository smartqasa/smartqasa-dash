import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { toggleHassEntity } from "../utils/toggle-hass-entity";

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

    @state() private config?: Config;
    @state() private stateObj?: HassEntity;

    private entity?: string;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("automation.") ? this.config.entity : undefined;
    }

    shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj);
    }

    protected render(): TemplateResult {
        if (!this.entity) return html``;

        const { icon, iconColor, name } = this.updateState();

        const containerStyle = {
            "margin-right": "0.7rem",
            "grid-template-areas": name ? '"i t"' : '"i"',
        };

        const iconStyles = {
            color: `rgb(${iconColor})`,
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.toggleEntity}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                ${name ? html`<div class="text">${name}</div>` : null}
            </div>
        `;
    }

    private updateState() {
        let icon, iconColor, name;

        this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

        if (this.config && this.stateObj) {
            const state = this.stateObj.state || undefined;
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
            icon = this.config?.icon || "hass:lightbulb-alert";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
        }
        name = this.config?.name || "";

        return { icon, iconColor, name };
    }

    private toggleEntity(e: Event): void {
        e.stopPropagation();
        toggleHassEntity(this.hass, this.entity);
    }
}
