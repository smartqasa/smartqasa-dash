import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { dialogTable } from "../tables/dialogs";

import { chipBaseStyle, chipTextStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

@customElement("smartqasa-weather-chip")
export class ThermostatChip extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _hass: any;
    private _entity?: string;
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _temperature: string = "??";

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    setConfig(config: Config): void {
        if (!config?.entity) return;
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("weather.") ? this._config.entity : undefined;
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
            this._iconColor = "var(--sq-unavailable-rgb)";
            this._temperature = "??";
            return;
        }

        this._iconColor = "var(--sq-primary-text-rgb)";
        this._temperature = this._stateObj.attributes.temperature || "??";
    }

    protected render(): TemplateResult {
        if (!this._entity) return html``;

        const containerStyle = {
            "margin-left": "0.7rem",
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.showDialog}>
                <div class="icon" style="color: rgb(${this._iconColor});">
                    <ha-state-icon .hass=${this._hass} .stateObj=${this._stateObj}></ha-state-icon>
                </div>
                <div class="text">${this._temperature}°</div>
            </div>
        `;
    }

    private showDialog(e: Event): void {
        e.stopPropagation();

        const dialogObj = dialogTable.weather;
        const dialogConfig = { ...dialogObj.data };
        window.browser_mod?.service("popup", dialogConfig);
    }
}
window.customCards.push({
    type: "smartqasa-weather-chip",
    name: "SmartQasa Weather Chip",
    preview: true,
    description: "A SmartQasa chip for displaying the weather.",
});
