import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";

import { tileBaseStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-routine-tile",
    name: "SmartQasa Routine Tile",
    preview: true,
    description: "A SmartQasa tile for triggering an automation, scene, or script entity.",
});

@customElement("smartqasa-routine-tile")
export class RoutineTile extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private initialized: boolean = false;
    @state() private config?: Config;
    @state() private stateObj?: HassEntity;
    @state() private running: boolean = false;

    private entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = ["automation", "scene", "script"].includes(this.config.entity?.split(".")[0])
            ? this.config.entity
            : undefined;
    }

    shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("config") && this.config) ||
            (changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj) ||
            this.running
        );
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this.runRoutine}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
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
                iconColor = "var(--sq-inactive-rgb)";
            }
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
        } else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name };
    }

    private async runRoutine(e: Event): Promise<void> {
        e.stopPropagation();
        if (!this.hass || !this.stateObj) return;

        this.running = true;

        const domain = this.stateObj.entity_id.split(".")[0];
        try {
            switch (domain) {
                case "script":
                    await this.hass.callService("script", "turn_on", { entity_id: this.entity });
                    break;
                case "scene":
                    await this.hass.callService("scene", "turn_on", { entity_id: this.entity });
                    break;
                case "automation":
                    await this.hass.callService("automation", "trigger", { entity_id: this.entity });
                    break;
                default:
                    console.error("Unsupported entity domain:", domain);
                    return;
            }
        } catch (error) {
            console.error("Failed to turn off entities:", error);
        }

        setTimeout(() => {
            this.running = false;
        }, 1000);
    }
}
