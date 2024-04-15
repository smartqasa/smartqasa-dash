import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { moreInfoDialog } from "../utils/moreInfoDialog";

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
    @state() private _stateObj?: HassEntity;

    private _hass: any;
    private _iconTemplate: any;
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";
    static styles: CSSResultGroup = [styleTileBase, styleTileState];

    setConfig(config: Config): void {
        this._config = { ...config };
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!this._config?.entity || !hass) return;
        this._hass = hass;
        this.updateState();
    }

    private updateState(): void {
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "binary_sensor"
                ? this._hass?.states[this._config.entity]
                : undefined;

        if (!this._stateObj) {
            this._iconTemplate = html`<ha-icon .icon="hass:leak"></ha-icon>`;
            this._iconColor = "var(--sq-unavailable-rgb)";
            this._name = this._name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }

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
            <div class="container" @click=${this.showMoreInfo}>
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

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
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
