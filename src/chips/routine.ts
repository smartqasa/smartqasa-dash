import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import { chipBaseStyle, chipTextStyle, chipIconSpinStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    color?: string;
    name?: string;
}

@customElement("smartqasa-routine-chip")
export class RoutineChip extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;
    @state() private _running: boolean = false;

    private _entity?: string;
    private _hass: any;
    private _icon: string = "hass:help-rhombus";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name?: string;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle, chipIconSpinStyle];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = ["automation", "scene", "script"].includes(this._config.entity?.split(".")[0])
            ? this._config.entity
            : undefined;
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!hass || !this._entity || hass.states[this._entity] === this._stateObj) return;
        this._hass = hass;
        this._stateObj = hass.states[this._entity];
        this.updateState();
    }

    private updateState(): void {
        if (this._running === true) return;

        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:alert-rhombus";
            this._iconAnimation = "none";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "";
            return;
        }

        this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:help-circle";
        this._iconAnimation = "none";
        this._iconColor = this._config?.color || "var(--sq-primary-text-rgb)";
        this._name = this._config?.name || "";
    }

    protected render(): TemplateResult {
        if (!this._entity) return html``;

        const containerStyle = {
            marginRight: "0.7rem",
            gridTemplateAreas: this._name ? "'i t'" : "'i'",
            gridColumnGap: this._name ? "10px" : "0",
            justifyContent: this._name ? "start" : "center",
        };

        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            animation: this._iconAnimation,
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.runRoutine}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                ${this._name ? html`<div class="text">${this._name}</div>` : null}
            </div>
        `;
    }

    private runRoutine(e: Event): void {
        e.stopPropagation();
        if (!this._stateObj) return;

        this._running = true;
        this._icon = "hass:rotate-right";
        this._iconAnimation = "spin 1.0s linear infinite";

        const domain = this._stateObj.entity_id.split(".")[0];
        switch (domain) {
            case "script":
                this._hass.callService("script", "turn_on", { entity_id: this._entity });
                break;
            case "scene":
                this._hass.callService("scene", "turn_on", { entity_id: this._entity });
                break;
            case "automation":
                this._hass.callService("automation", "trigger", { entity_id: this._entity });
                break;
            default:
                console.error("Unsupported entity domain:", domain);
                return;
        }

        setTimeout(() => {
            this._running = false;
            this.updateState();
        }, 2000);
    }
}

window.customCards.push({
    type: "smartqasa-routine-chip",
    name: "SmartQasa Routine Chip",
    preview: true,
    description: "A SmartQasa chip for triggering an automation, scene, or script entity.",
});
