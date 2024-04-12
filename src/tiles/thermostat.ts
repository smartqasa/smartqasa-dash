import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { showMoreInfo } from "../utils/showMoreInfo";
import { thermostatIcons, thermostatColors } from "../utils/const";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

@customElement("smartqasa-thermostat-tile")
export class ThermostatTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _hass: any;
    private _icon: string = "hass:thermostat";
    private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";

    static styles: CSSResultGroup = [styleTileBase, styleTileState];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._updateState();
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass ? hass : undefined;
        this._updateState();
    }

    private _updateState(): void {
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "climate"
                ? this._hass?.states[this._config.entity]
                : undefined;

        if (!this._stateObj) {
            this._icon = this._config?.icon || "hass:thermostat";
            this._iconColor = thermostatColors.default;
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }

        const state = this._stateObj.state || "unavailable";
        this._icon = thermostatIcons[state] || thermostatIcons.default;
        const hvacAction = this._stateObj.attributes.hvac_action || "idle";
        if (state === "off") {
            this._iconColor = thermostatColors.off;
        } else {
            this._iconColor = thermostatColors[hvacAction] || thermostatColors.idle;
        }

        this._stateFmtd = this._hass.formatEntityState(this._stateObj);
        if (state !== "off") {
            if (this._stateObj.attributes.current_temperature) {
                this._stateFmtd += ` - ${this._stateObj.attributes.current_temperature}°`;
            }
            if (this._stateObj.attributes.current_humidity) {
                this._stateFmtd += ` / ${this._stateObj.attributes.current_humidity}%`;
            }
        }
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._showMoreInfo}>
                <div
                    class="icon"
                    @click=${this._toggleEntity}
                    style="
                        color: rgb(${this._iconColor});
                        background-color: rgba(${this._iconColor}, var(--sq-icon-opacity, 0.2));
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
