import { CSSResult, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { showMoreInfo } from "../utils/showMoreInfo";
import { thermostatIcons, thermostatColors } from "../utils/const";

import styleChipBasic from "../styles/chip-basic";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

@customElement("smartqasa-thermostat-chip")
export class SmartQasaThermostatChip extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _hass: any;
    private _icon: string = "hass:thermometer-lines";
    private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
    private _entity?: string;
    private _temperature: string = "??";

    static styles: CSSResult = styleChipBasic;

    setConfig(config: Config): void {
        this._config = config;
        this._entity = config.entity || undefined;
    }

    set hass(hass: HomeAssistant) {
        if (this._entity) {
            this._hass = hass;
            this._stateObj = this._hass?.states[this._entity] || undefined;
            this._updateState();
        }
    }

    private _updateState(): void {
        if (this._stateObj) {
            const state = this._stateObj.state;
            this._icon = thermostatIcons[state] || thermostatIcons.default;
            const hvacAction = this._stateObj.attributes.hvac_action;
            this._iconColor = thermostatColors[hvacAction] || thermostatColors.default;
            this._temperature = this._stateObj.attributes.current_temperature || "??";
        } else {
            this._icon = thermostatIcons.default;
            this._iconColor = thermostatColors.default;
            this._temperature = "??";
        }
    }

    protected render(): TemplateResult {
        if (!this._entity) {
            return html``;
        }

        return html`
            <div class="container" @click=${this._showMoreInfo}>
                <div class="icon" id="icon" style="color: rgb(${this._iconColor});">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="text">${this._temperature}°</div>
            </div>
        `;
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        showMoreInfo(this._config, this._stateObj, this._hass);
    }
}
