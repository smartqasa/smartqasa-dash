import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { callService } from "../utilities/call-service";
import { moreInfoDialog } from "../dialogs/more-info-dialog";
import { thermostatIcons, thermostatColors } from "../const";

import tileBaseStyle from "../css/tile-base.css";
import tileStateStyle from "../css/tile-state.css";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-thermostat-tile",
    name: "SmartQasa Thermostat Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a thermostat climate entity.",
});

@customElement("smartqasa-thermostat-tile")
export class ThermostatTile extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;
    private _icon: string = "hass:thermostat";
    private _iconStyles: Record<string, string> = {};
    private _name: string = "Unknown Thermostat";
    private _stateFmtd: string = "Unknown State";

    static get styles(): CSSResultGroup {
        return [unsafeCSS(tileBaseStyle), unsafeCSS(tileStateStyle)];
    }

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("climate.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._showMoreInfo}>
                <div class="icon" style="${styleMap(this._iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        let iconColor;
        if (this._stateObj) {
            const state = this._stateObj.state || "unknown";
            this._icon = thermostatIcons[state] || thermostatIcons.default;
            const hvacAction = this._stateObj.attributes.hvac_action || "idle";
            if (state === "off") {
                iconColor = thermostatColors.off;
            } else {
                iconColor = thermostatColors[hvacAction] || thermostatColors.idle;
            }
            this._name = this._config!.name || this._stateObj.attributes.friendly_name || "Thermostat";
            this._stateFmtd = this.hass!.formatEntityState(this._stateObj);
            if (state !== "off") {
                if (this._stateObj.attributes.current_temperature) {
                    this._stateFmtd += ` - ${this._stateObj.attributes.current_temperature}°`;
                }
                if (this._stateObj.attributes.current_humidity) {
                    this._stateFmtd += ` / ${this._stateObj.attributes.current_humidity}%`;
                }
            }
        } else {
            this._icon = this._config!.icon || "hass:thermostat";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Unknown";
        }

        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
        };
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._stateObj, this._config?.callingDialog);
    }
}
