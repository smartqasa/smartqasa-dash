import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { moreInfoDialog } from "../dialogs/more-info-dialog";
import { heaterColors } from "../const";

import tileBaseStyle from "../css/tile-base.css";
import tileStateStyle from "../css/tile-state.css";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-heater-tile",
    name: "SmartQasa Heater Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a water heater entity.",
});

@customElement("smartqasa-heater-tile")
export class HeaterTile extends LitElement implements LovelaceCard {
    getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _stateObj?: HassEntity;
    private _entity?: string;
    private _icon: string = "hass:water-boiler-alert";
    private _iconStyles: Record<string, string> = {};
    private _name: string = "Unknown Heater";
    private _stateFmtd: string = "Unknown State";

    static styles: CSSResultGroup = [unsafeCSS(tileBaseStyle), unsafeCSS(tileStateStyle)];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("water_heater.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            (changedProps.has("_config") && this._config)
        );
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

    protected updated(): void {
        this._updateState();
    }
    private _updateState(): void {
        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        let icon, iconColor, name, stateFmtd;
        if (this._stateObj) {
            const state = this._stateObj.state || "unknown";
            icon = this._config!.icon || "hass:water-boiler";
            iconColor = heaterColors[state] || heaterColors.idle;
            name = this._config!.name || this._stateObj.attributes.friendly_name || "Heater";
            stateFmtd = this.hass!.formatEntityState(this._stateObj);
            if (state !== "off" && this._stateObj.attributes.temperature) {
                this._stateFmtd += ` - ${this._stateObj.attributes.temperature}°`;
            }
        } else {
            icon = this._config!.icon || "hass:water-boiler-alert";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config!.name || "Unknown";
            stateFmtd = "Unknown";
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
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
