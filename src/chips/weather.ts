import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { dialogTable } from "../tables/dialogs";

import { chipBaseStyle, chipTextStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

window.customCards.push({
    type: "smartqasa-weather-chip",
    name: "SmartQasa Weather Chip",
    preview: true,
    description: "A SmartQasa chip for displaying the weather.",
});

@customElement("smartqasa-weather-chip")
export class ThermostatChip extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("weather.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected render(): TemplateResult {
        let iconColor, temperature;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._stateObj) {
            iconColor = "var(--sq-primary-text-rgb)";
            temperature = this._stateObj?.attributes?.temperature || "??";
        } else {
            iconColor = "var(--sq-unavailable-rgb)";
            temperature = "??";
        }

        const containerStyle = {
            "margin-left": "0.7rem",
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this._showDialog}>
                <div class="icon" style="color: rgb(${iconColor});">
                    <ha-state-icon .hass=${this.hass} .stateObj=${this._stateObj}></ha-state-icon>
                </div>
                <div class="text">${temperature}°</div>
            </div>
        `;
    }

    private _showDialog(e: Event): void {
        e.stopPropagation();

        const dialogObj = dialogTable.weather;
        const dialogConfig = { ...dialogObj.data };
        window.browser_mod?.service("popup", dialogConfig);
    }
}
