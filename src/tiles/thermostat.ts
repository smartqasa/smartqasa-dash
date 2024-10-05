import { CSSResult, html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { moreInfoDialog } from "../dialogs/more-info-dialog";
import { thermostatIcons, thermostatColors } from "../const";
import { formatState } from "../utilities/format-state";

import tileStyle from "../css/tile.css";

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
    public getCardSize(): number | Promise<number> {
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

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        if (!config.entity?.startsWith("climate.")) {
            console.error("Invalid climate entity provided in the config.");
        } else {
            this._entity = config.entity;
        }
        this._config = config;
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
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                <div class="text">
                    <div class="name">${this._name}</div>
                    <div class="state">${this._stateFmtd}</div>
                </div>
            </div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        let icon, iconColor, name, stateFmtd;
        if (this._stateObj && this.hass) {
            const state = this._stateObj.state || "unknown";

            icon = thermostatIcons[state] || thermostatIcons.default;
            const hvacAction = this._stateObj.attributes.hvac_action || "idle";
            if (state === "off") {
                iconColor = thermostatColors.off;
            } else {
                iconColor = thermostatColors[hvacAction] || thermostatColors.idle;
            }
            name = this._config!.name || this._stateObj.attributes.friendly_name || "Thermostat";
            stateFmtd = formatState(this._stateObj, this.hass);
        } else {
            icon = this._config!.icon || "hass:thermostat";
            iconColor = "var(--sq-unavailable-rgb)";
            name = this._config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
        };
        this._icon = icon;
        this._name = name;
        this._stateFmtd = stateFmtd;
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._stateObj, this._config?.callingDialog);
    }
}
