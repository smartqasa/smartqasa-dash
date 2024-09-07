import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { moreInfoDialog } from "../utils/more-info-dialog";
import { thermostatIcons, thermostatColors } from "../const";

import chipBaseStyle from "../css/chip-base.css";
import chipTextStyle from "../css/chip-text.css";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

@customElement("smartqasa-thermostat-chip")
export class ThermostatChip extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles: CSSResultGroup = [unsafeCSS(chipBaseStyle), unsafeCSS(chipTextStyle)];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("climate.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._entity) return nothing;

        const { icon, iconColor, temperature } = this._updateState();

        return html`
            <div class="container" @click=${this._showMoreInfo}>
                <div class="icon" id="icon" style="color: rgb(${iconColor});">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="text">${temperature}°</div>
            </div>
        `;
    }

    private _updateState() {
        let icon, iconAnimation, iconColor, temperature;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._stateObj) {
            const state = this._stateObj.state;
            icon = thermostatIcons[state] || thermostatIcons.default;
            const hvacAction = this._stateObj.attributes.hvac_action;
            iconColor = thermostatColors[hvacAction] || thermostatColors.default;
            temperature = this._stateObj.attributes.current_temperature || "??";
        } else {
            icon = thermostatIcons.default;
            iconColor = thermostatColors.default;
            temperature = "??";
        }

        return { icon, iconAnimation, iconColor, temperature };
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
}
