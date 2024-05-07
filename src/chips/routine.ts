import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";

import { chipBaseStyle, chipTextStyle, chipIconSpinStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    color?: string;
    name?: string;
}

@customElement("smartqasa-routine-chip")
export class RoutineChip extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    @state() private running: boolean = false;
    private entity?: string;
    private stateObj?: HassEntity;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle, chipIconSpinStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = ["automation", "scene", "script"].includes(this.config.entity?.split(".")[0])
            ? this.config.entity
            : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj) ||
            (changedProps.has("config") && this.config)
        );
    }

    protected render(): TemplateResult {
        if (!this.entity) return html``;

        const { icon, iconAnimation, iconColor, name } = this.updateState();

        const containerStyle = {
            "margin-left": "0.7rem",
            "grid-template-areas": name ? '"i t"' : '"i"',
        };

        const iconStyles = {
            color: `rgb(${iconColor})`,
            animation: iconAnimation,
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.runRoutine}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                ${name ? html`<div class="text">${name}</div>` : null}
            </div>
        `;
    }

    private updateState() {
        let icon, iconAnimation, iconColor, name;

        this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

        if (this.config && this.stateObj) {
            if (this.running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            } else {
                icon = this.config.icon || this.stateObj.attributes.icon || "hass:help-rhombus";
                iconAnimation = "none";
                iconColor = this.config.color || "var(--sq-primary-text-rgb)";
            }
        } else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
        }
        name = this.config?.name || "";

        return { icon, iconAnimation, iconColor, name };
    }

    private runRoutine(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this.stateObj) return;

        this.running = true;

        const domain = this.stateObj.entity_id.split(".")[0];
        switch (domain) {
            case "script":
                this.hass.callService("script", "turn_on", { entity_id: this.entity });
                break;
            case "scene":
                this.hass.callService("scene", "turn_on", { entity_id: this.entity });
                break;
            case "automation":
                this.hass.callService("automation", "trigger", { entity_id: this.entity });
                break;
            default:
                console.error("Unsupported entity domain:", domain);
                return;
        }

        setTimeout(() => {
            this.running = false;
        }, 2000);
    }
}

window.customCards.push({
    type: "smartqasa-routine-chip",
    name: "SmartQasa Routine Chip",
    preview: true,
    description: "A SmartQasa chip for triggering an automation, scene, or script entity.",
});
