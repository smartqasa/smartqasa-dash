import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { moreInfoDialog } from "../utils/more-info-dialog";

import { chipBaseStyle, chipTextStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

@customElement("smartqasa-weather-chip")
export class ThermostatChip extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _entity?: string;
    private _icon: string = "hass:rhombus-question";
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
        this._stateObj = hass.states[this._entity];
        this.updateState();
    }

    private updateState(): void {
        if (!this._entity || !this._stateObj) {
            this._icon = "hass:rhombus-alert";
            this._iconColor = "var(--sq-unavailable-rgb)";
            this._temperature = "??";
            return;
        }

        this._icon = this._stateObj.attributes.icon || "hass:rhombus-alert";
        this._iconColor = "var(--sq-primary-text-rgb)";
        this._temperature = this._stateObj.attributes.temperature || "??";
    }

    protected render(): TemplateResult {
        if (!this._entity) return html``;

        const containerStyle = {
            marginLeft: "0.7rem",
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.showMoreInfo}>
                <div class="icon" style="color: rgb(${this._iconColor});">
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
