import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { showMoreInfo } from "../utils/showMoreInfo";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

@customElement("smartqasa-select-tile")
export class SwitchTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _hass: any;
    private _icon: string = "hass:form-dropdown";
    private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";
    static styles: CSSResultGroup = [styleTileBase, styleTileState];

    setConfig(config: Config): void {
        if (!config.entity || config.entity.split(".")[0] != "input_select")
            throw new Error("A valid input_select entity is required.");
        this._config = config;
        if (this._hass) this.hass = this._hass;
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;
        this._stateObj = this._config?.entity ? this._hass.states[this._config.entity] : undefined;
        this._updateState();
    }

    private _updateState(): void {
        if (this._stateObj) {
            this._icon = this._config?.icon || this._stateObj.attributes?.icon || this._icon;
            this._name = this._config?.name || this._stateObj.attributes?.friendly_name || this._stateObj.entity_id;
            this._stateFmtd = this._hass.formatEntityState(this._stateObj) || "Unknown";
        } else {
            this._icon = this._config?.icon || this._icon;
            this._iconColor = "var(--sq-unavailable-rgb)";
            this._name = this._name || "Unknown";
            this._stateFmtd = "Unknown";
        }
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._showChoices}>
                <div
                    class="icon"
                    style="
            color: rgb(${this._iconColor});
            background-color: rgba(${this._iconColor}, var(--sq-icon-opacity, 0.2));
          "
                >
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }

    private _showChoices(e: Event): void {
        e.stopPropagation();
        showMoreInfo(this._config, this._stateObj, this._hass);
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-select-tile",
    name: "SmartQasa Select Tile",
    preview: true,
    description: "A SmartQasa tile for displaying an Input Select entity.",
});
