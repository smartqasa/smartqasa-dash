import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import styleTileBase from "../styles/tile-base";
import styleTileIconSpin from "../styles/tile-icon-spin";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

@customElement("smartqasa-routine-tile")
export class RoutineTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;
    @state() private _running: boolean = false;

    private _hass: any;
    private _icon: string = "hass:help-rhombus";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
    private _name: string = "Loading...";

    static styles: CSSResultGroup = [styleTileBase, styleTileIconSpin];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!this._config?.entity || !hass) return;
        this._hass = hass;
        this._updateState();
    }

    private _updateState(): void {
        if (this._running === true) return;

        const validDomains = ["automation", "scene", "script"];
        this._stateObj =
            this._config?.entity && validDomains.includes(this._config.entity.split(".")[0])
                ? this._hass?.states[this._config.entity]
                : undefined;

        if (!this._stateObj) {
            this._icon = this._config?.icon || "hass:alert-rhombus";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            return;
        }

        this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:help-circle";
        this._iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
    }

    render(): TemplateResult {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };

        return html`
            <div class="container" @click=${this._runRoutine}>
                <div class="icon" @click=${this._runRoutine} style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }

    private _runRoutine(e: Event): void {
        e.stopPropagation();

        if (!this._stateObj) return;

        this._running = true;
        let icon = this._icon;
        this._icon = "hass:rotate-right";
        this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
        this._iconAnimation = "spin 1.0s linear infinite";

        const domain = this._stateObj.entity_id.split(".")[0];
        switch (domain) {
            case "script":
                this._hass.callService("script", "turn_on", { entity_id: this._stateObj.entity_id });
                break;
            case "scene":
                this._hass.callService("scene", "turn_on", { entity_id: this._stateObj.entity_id });
                break;
            case "automation":
                this._hass.callService("automation", "trigger", { entity_id: this._stateObj.entity_id });
                break;
            default:
                console.error("Unsupported entity domain:", domain);
                return;
        }

        setTimeout(() => {
            this._icon = icon;
            this._iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
            this._iconAnimation = "none";
            this._running = false;
        }, 2000);
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-routine-tile",
    name: "SmartQasa Routine Tile",
    preview: true,
    description: "A SmartQasa tile for triggering an automation, scene, or script entity.",
});
