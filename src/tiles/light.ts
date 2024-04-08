import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { showMoreInfo } from "../utils/showMoreInfo";
import { showGroupEntities } from "../utils/showGroupEntities";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
    group?: string;
    tile?: string;
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
        if (!config.entity || config.entity.split(".")[0] != "light")
            throw new Error("A valid light entity is required.");
        this._config = config;
        if (this._hass) this.hass = this._hass;
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;
        this._stateObj = this._config?.entity ? this._hass.states[this._config.entity] : undefined;
        this.updateState();
    }

    private updateState(): void {
        if (this._stateObj) {
            const state = this._stateObj.state || "unknown";
            this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:lightbulb";
            this._iconColor = state === "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb, 128, 128, 128)";
            this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
            this._stateFmtd =
                this._hass.formatEntityState(this._stateObj) +
                (state === "on" && this._stateObj.attributes.brightness
                    ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "brightness")
                    : "");
        } else {
            this._icon = this._config?.icon || "hass:lightbulb-alert";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Unavailable";
        }
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._showMoreInfo} @contextmenu=${this._showGroupEntities}>
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
            this._hass.callService("light", "toggle", {
                entity_id: this._stateObj.entity_id,
            });
        }
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        if (!this._config || !this._stateObj) return;

        showMoreInfo(
            this._config,
            this._stateObj,
            this._config.group
                ? this._hass.states[this._config.group].attributes?.friendly_name || this._config.group
                : ""
        );
    }

    private _showGroupEntities(e: Event): void {
        e.stopPropagation();
        if (
            !this._stateObj ||
            !Array.isArray(this._stateObj.attributes?.entity_id) ||
            this._stateObj.attributes.entity_id.length === 0
        )
            return;

        showGroupEntities(this._config, this._stateObj);
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
