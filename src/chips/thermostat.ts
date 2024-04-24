import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { moreInfoDialog } from "../utils/more-info-dialog";
import { thermostatIcons, thermostatColors } from "../utils/const";

import { chipBaseStyle, chipTextStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

@customElement("smartqasa-thermostat-chip")
export class ThermostatChip extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _entity?: string;
    private _hass: any;
    private _icon: string = "hass:thermometer-lines";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _temperature: string = "??";

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    setConfig(config: Config): void {
        if (!config?.entity) return;
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("climate.") ? this._config.entity : undefined;
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!hass || !this._entity || hass.states[this._entity] === this._stateObj) return;
        this._hass = hass;
        this._stateObj = hass.states[this._entity];
        this.updateState();
    }

    private updateState(): void {
        if (!this._entity || !this._stateObj) {
            this._icon = thermostatIcons.default;
            this._iconColor = thermostatColors.default;
            this._temperature = "??";
            return;
        }

        const state = this._stateObj.state;
        this._icon = thermostatIcons[state] || thermostatIcons.default;
        const hvacAction = this._stateObj.attributes.hvac_action;
        this._iconColor = thermostatColors[hvacAction] || thermostatColors.default;
        this._temperature = this._stateObj.attributes.current_temperature || "??";
    }

    protected render(): TemplateResult {
        if (!this._entity) return html``;

        const containerStyle = {
            "margin-right": "0.7rem",
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.showMoreInfo}>
                <div class="icon" id="icon" style="color: rgb(${this._iconColor});">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="text">${this._temperature}°</div>
            </div>
        `;
    }

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
}
