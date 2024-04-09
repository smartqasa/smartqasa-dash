import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { showMoreInfo } from "../utils/showMoreInfo";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";

interface Config extends LovelaceCardConfig {
    category?: string;
    entity: string;
    icon?: string;
    name?: string;
}

@customElement("smartqasa-sensor-tile")
export class SensorTile extends LitElement {
    @state() private _config?: Config;
    @state() private _iconTemplate: any;
    @state() private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
    @state() private _name: string = "Loading...";
    @state() private _stateFmtd: string = "Loading...";
    @state() private _stateObj?: HassEntity;

    private _hass: any;

    static styles: CSSResultGroup = [styleTileBase, styleTileState];

    setConfig(config: Config): void {
        if (!config.entity || config.entity.split(".")[0] != "binary_sensor")
            throw new Error("A valid binary_sensor entity is required.");
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
            if (!this._config?.icon) {
                this._iconTemplate = html`<ha-state-icon
                    .hass=${this._hass}
                    .stateObj=${this._stateObj}
                ></ha-state-icon>`;
            } else {
                this._iconTemplate = html`<ha-icon .icon=${this._config.icon}></ha-icon>`;
            }
            this._iconColor =
                this._stateObj.state === "on" ? "var(--sq-binary_sensor-on-rgb)" : "var(--sq-inactive-rgb)";
            this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
            this._stateFmtd = this._hass ? this._hass.formatEntityState(this._stateObj) : "Unknown";
        } else {
            this._iconTemplate = html`<ha-icon .icon="hass:leak"></ha-icon>`;
            this._iconColor = "var(--sq-unavailable-rgb)";
            this._name = this._name || "Unknown";
            this._stateFmtd = "Unknown";
        }
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._showMoreInfo}>
                <div
                    class="icon"
                    style="
            color: rgb(${this._iconColor});
            background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
          "
                >
                    ${this._iconTemplate}
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        showMoreInfo(this._config, this._stateObj, this._hass);
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-sensor-tile",
    name: "SmartQasa Sensor Tile",
    preview: true,
    description: "A SmartQasa tile for observing a binary_sensor entity.",
});
