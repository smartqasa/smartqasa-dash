import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";

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
    @state() private _config?: Config;
    @state() private _running: boolean = false;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = ["automation", "scene", "script"].includes(this._config.entity?.split(".")[0])
            ? this._config.entity
            : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            changedProps.has("_running") ||
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this._runRoutine}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }

    private updateState() {
        let icon, iconAnimation, iconColor, name;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._config && this._stateObj) {
            if (this._running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            } else {
                icon = this._config.icon || this._stateObj.attributes.icon || "hass:help-rhombus";
                iconAnimation = "none";
                iconColor = "var(--sq-inactive-rgb)";
            }
            name = this._config.name || this._stateObj.attributes.friendly_name || this._entity;
        } else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name };
    }

    private _runRoutine(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this._stateObj) return;

        this._running = true;

        const domain = this._stateObj.entity_id.split(".")[0];
        switch (domain) {
            case "script":
                callService(this, "script", "turn_on", { entity_id: this._entity });
                break;
            case "scene":
                callService(this, "scene", "turn_on", { entity_id: this._entity });
                break;
            case "automation":
                callService(this, "automation", "trigger", { entity_id: this._entity });
                break;
            default:
                console.error("Unsupported entity domain:", domain);
                break;
        }

        setTimeout(() => {
            this._running = false;
        }, 1000);
    }
}
