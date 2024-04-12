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

@customElement("smartqasa-switch-tile")
export class SwitchTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _hass: any;
    private _icon: string = "hass:toggle-switch-variant";
    private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";

    static styles: CSSResultGroup = [styleTileBase, styleTileState];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._updateState();
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass ? hass : undefined;
        this._updateState();
    }

    private _updateState(): void {
        const validDomains = ["fan", "input_boolean", "light", "switch"];
        this._stateObj =
            this._config?.entity && validDomains.includes(this._config.entity.split(".")[0])
                ? this._hass?.states[this._config.entity]
                : undefined;

        if (!this._stateObj) {
            this._icon = this._config?.icon || "hass:toggle-switch-variant";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }

        const state = this._stateObj.state;
        this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:toggle-switch-variant";
        this._iconColor =
            state === "on"
                ? `var(--sq-switch${this._config?.category ? `-${this._config.category}` : ""}-on-rgb)`
                : "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
        this._stateFmtd = this._hass ? this._hass.formatEntityState(this._stateObj) : "Unknown";
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._showMoreInfo}>
                <div
                    class="icon"
                    @click=${this._toggleEntity}
                    style="
            color: rgb(${this._iconColor});
            background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
          "
                >
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        if (this._stateObj) {
            this._hass.callService("homeassistant", "toggle", {
                entity_id: this._stateObj.entity_id,
            });
        }
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
    type: "smartqasa-switch-tile",
    name: "SmartQasa Switch Tile",
    preview: true,
    description: "A SmartQasa tile for toggling an entity.",
});
