import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { showMoreInfo } from "../utils/showMoreInfo";
import { showEntitiesList } from "../utils/showEntitiesList";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";
import styleTileIconSpin from "../styles/tile-icon-spin";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

@customElement("smartqasa-fan-tile")
export class FanTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _hass: any;
    private _icon: string = "hass:fan";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";

    static styles: CSSResultGroup = [styleTileBase, styleTileState, styleTileIconSpin];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!hass || !this._config?.entity) return;
        this._hass = hass;
        this._updateState();
    }

    private _updateState(): void {
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "fan"
                ? this._hass?.states[this._config.entity]
                : undefined;

        if (!this._stateObj) {
            this._icon = this._config?.icon || "hass:fan-alert";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }

        const state: string = this._stateObj.state || "unknown";
        this._icon = this._config?.icon || "hass:fan";
        if (state == "on" && this._icon === "hass:fan") {
            if (this._stateObj.attributes.percentage) {
                const speed = 0.5 + (1 - this._stateObj.attributes.percentage / 100);
                const direction = this._stateObj.attributes.direction == "reverse" ? "reverse" : "normal";
                this._iconAnimation = `spin ${speed}s linear infinite ${direction}`;
            } else {
                this._iconAnimation = `spin 0.5s linear infinite normal`;
            }
        } else {
            this._iconAnimation = "none";
        }
        this._iconColor = state == "on" ? "var(--sq-fan-on-rgb)" : "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
        this._stateFmtd =
            this._hass.formatEntityState(this._stateObj) +
            (state == "on" && this._stateObj.attributes.percentage
                ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "percentage")
                : "");
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._showMoreInfo} @contextmenu=${this._showGroupList}>
                <div
                    class="icon"
                    @click=${this._toggleEntity}
                    style="
                        color: rgb(${this._iconColor});
                        background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
                        animation: ${this._iconAnimation};
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
        if (!this._stateObj) return;
        this._hass.callService("fan", "toggle", { entity_id: this._stateObj.entity_id });
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
            "fan"
        );
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-fan-tile",
    name: "SmartQasa Fan Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a fan entity.",
});
