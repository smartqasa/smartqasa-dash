import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { showMoreInfo } from "../utils/showMoreInfo";
import { showEntitiesList } from "../utils/showEntitiesList";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

@customElement("smartqasa-light-tile")
export class LightTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _hass: any;
    private _icon: string = "hass:lightbulb-alert";
    private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";

    static styles: CSSResultGroup = [styleTileBase, styleTileState];

    setConfig(config: Config): void {
        this._config = config ? config : undefined;
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass ? hass : undefined;
        this.updateState();
    }

    private updateState(): void {
        this._stateObj =
            this._config && this._config.entity.split(".")[0] === "light"
                ? this._hass?.states[this._config.entity]
                : undefined;

        if (!this._stateObj) {
            this._icon = this._config?.icon || "hass:lightbulb-alert";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Entity unavailable!";
            return;
        }

        const state = this._stateObj.state || "unknown";
        this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:lightbulb";
        this._iconColor = state === "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb, 128, 128, 128)";
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
        this._stateFmtd =
            this._hass.formatEntityState(this._stateObj) +
            (state === "on" && this._stateObj.attributes.brightness
                ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "brightness")
                : "");
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._showMoreInfo} @contextmenu=${this._showGroupList}>
                <button
                    class="icon"
                    @click=${this._toggleEntity}
                    style="color: rgb(${this._iconColor}); background-color: rgba(${this
                        ._iconColor}, var(--sq-icon-opacity));"
                    aria-label="Toggle Light"
                >
                    <ha-icon .icon=${this._icon}></ha-icon>
                </button>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        if (this._stateObj) {
            this._hass.callService("light", "toggle", {
                entity_id: this._stateObj.entity_id,
            });
        }
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        showMoreInfo(this._config, this._stateObj, this._hass);
    }

    private _showGroupList(e: Event): void {
        e.stopPropagation();
        if (
            !this._stateObj ||
            !Array.isArray(this._stateObj.attributes?.entity_id) ||
            this._stateObj.attributes.entity_id.length === 0
        )
            return;
        showEntitiesList(
            this._stateObj.attributes?.friendly_name || this._stateObj.entity_id,
            "group",
            this._stateObj.entity_id,
            "light"
        );
    }

    getCardSize() {
        return 1;
    }

    static getConfigElement() {
        return document.createElement("smartqasa-light-tile-editor");
    }

    static getStubConfig() {
        return {
            entity: "",
            icon: "",
            name: "",
        };
    }
}

window.customCards.push({
    type: "smartqasa-light-tile",
    name: "SmartQasa Light Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a light entity.",
});
