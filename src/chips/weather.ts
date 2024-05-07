import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { dialogTable } from "../tables/dialogs";

import { chipBaseStyle, chipTextStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

@customElement("smartqasa-weather-chip")
export class ThermostatChip extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    private entity?: string;
    private stateObj?: HassEntity;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("weather.") ? this.config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj) ||
            (changedProps.has("config") && this.config)
        );
    }

    protected render(): TemplateResult {
        let iconColor, temperature;

        this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

        if (this.stateObj) {
            iconColor = "var(--sq-primary-text-rgb)";
            temperature = this.stateObj?.attributes?.temperature || "??";
        } else {
            iconColor = "var(--sq-unavailable-rgb)";
            temperature = "??";
        }

        const containerStyle = {
            "margin-left": "0.7rem",
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.showDialog}>
                <div class="icon" style="color: rgb(${iconColor});">
                    <ha-state-icon .hass=${this.hass} .stateObj=${this.stateObj}></ha-state-icon>
                </div>
                <div class="text">${temperature}°</div>
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
