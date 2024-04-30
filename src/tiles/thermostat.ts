import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { moreInfoDialog } from "../utils/more-info-dialog";
import { thermostatIcons, thermostatColors } from "../const";

import { tileBaseStyle, tileStateStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

@customElement("smartqasa-thermostat-tile")
export class ThermostatTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _entity?: string;
    private _hass: any;
    private _icon: string = "hass:thermostat";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle];

    setConfig(config: Config): void {
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
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._entity || "Unknown";
    }

    protected render(): TemplateResult {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };

        return html`
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }

    private toggleEntity(e: Event): void {
        e.stopPropagation();
        if (this._stateObj) {
            this._hass.callService("climate", "toggle", { entity_id: this._stateObj.entity_id });
        }
    }

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
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
