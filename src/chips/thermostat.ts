import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { moreInfoDialog } from "../utils/more-info-dialog";
import { thermostatIcons, thermostatColors } from "../const";

import { chipBaseStyle, chipTextStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

@customElement("smartqasa-thermostat-chip")
export class ThermostatChip extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    private entity?: string;
    private stateObj?: HassEntity;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("climate.") ? this.config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj) ||
            (changedProps.has("config") && this.config)
        );
    }

    protected render(): TemplateResult {
        if (!this.entity) return html``;

        const { icon, iconColor, temperature } = this.updateState();

        const containerStyle = {
            "margin-right": "0.7rem",
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.showMoreInfo}>
                <div class="icon" id="icon" style="color: rgb(${iconColor});">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="text">${temperature}°</div>
            </div>
        `;
    }

    private updateState() {
        let icon, iconAnimation, iconColor, temperature;

        this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

        if (this.config && this.stateObj) {
            const state = this.stateObj.state;
            icon = thermostatIcons[state] || thermostatIcons.default;
            const hvacAction = this.stateObj.attributes.hvac_action;
            iconColor = thermostatColors[hvacAction] || thermostatColors.default;
            temperature = this.stateObj.attributes.current_temperature || "??";
        } else {
            icon = thermostatIcons.default;
            iconColor = thermostatColors.default;
            temperature = "??";
        }

        return { icon, iconAnimation, iconColor, temperature };
    }

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
}
