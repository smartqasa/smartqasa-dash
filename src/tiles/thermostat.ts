import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { showMoreInfo } from "../utils/showMoreInfo";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

@customElement("smartqasa-thermostat-tile")
export class ThermostatTile extends LitElement {
    @state() private _config?: Config;
    @state() private _icon: string = "hass:thermometer-lines";
    @state() private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
    @state() private _name: string = "Loading...";
    @state() private _stateFmtd: string = "Loading...";
    @state() private _stateObj?: HassEntity;

    private _hass: any;

    static styles: CSSResultGroup = [styleTileBase, styleTileState];

    setConfig(config: Config): void {
        if (!config.entity || config.entity.split(".")[0] != "climate")
            throw new Error("A valid climate entity is required.");
        this._config = config;
        if (this._hass) this.hass = this._hass;
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;
        this._stateObj = this._config?.entity ? this._hass.states[this._config.entity] : undefined;
        this._updateState();
    }

    private _updateState(): void {
        const actionColor: Record<string, string> = {
            cooling: "var(--sq-climate-cool-rgb, 0, 0, 255)",
            heating: "var(--sq-climate-heat-rgb, 255, 0, 0)",
            idle: "var(--sq-primary-font-rgb, 0, 0, 0)",
            off: "var(--sq-inactive-rgb, 128, 128, 128)",
        };
        if (this._stateObj) {
            const state = this._stateObj.state || "unavailable";
            const hvacAction = this._stateObj.attributes.hvac_action || "idle";
            if (state == "off") {
                this._iconColor = actionColor.off;
            } else {
                this._iconColor = actionColor[hvacAction] || actionColor.idle;
            }

            this._stateFmtd = this._hass.formatEntityState(this._stateObj);
            if (state != "off") {
                if (this._stateObj.attributes.current_temperature) {
                    this._stateFmtd += ` - ${this._stateObj.attributes.current_temperature}°`;
                }
                if (this._stateObj.attributes.current_humidity) {
                    this._stateFmtd += ` / ${this._stateObj.attributes.current_humidity}%`;
                }
            }
            this._name = this._config?.icon || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
        } else {
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Unavailable";
        }
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._showMoreInfo}>
                <div
                    class="icon"
                    @click=${this._toggleEntity}
                    style="
                        color: rgb(${this._iconColor});
                        background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
                    "
                >
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        if (this._stateObj) {
            this._hass.callService("climate", "toggle", { entity_id: this._stateObj.entity_id });
        }
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        showMoreInfo(this._config, this._stateObj, this._hass);
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-thermostat-tile",
    name: "SmartQasa Thermostat Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a thermostat climate entity.",
});
