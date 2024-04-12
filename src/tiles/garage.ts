import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { showMoreInfo } from "../utils/showMoreInfo";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";
import styleTileIconBlink from "../styles/tile-icon-blink";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

@customElement("smartqasa-garage-tile")
export class GarageTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _hass: any;
    private _icon: string = "hass:garage-variant";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";

    static styles: CSSResultGroup = [styleTileBase, styleTileState, styleTileIconBlink];

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
            this._config?.entity && this._config.entity.split(".")[0] === "cover"
                ? this._hass?.states[this._config.entity]
                : undefined;

        if (!this._stateObj) {
            this._icon = this._config?.icon || "hass:garage-alert-variant";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }

        const state = this._stateObj.state || "unknown";
        switch (state) {
            case "closed":
                this._icon = "hass:garage-variant";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
                break;
            case "opening":
                this._icon = "hass:arrow-up-box";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-garage-opening-rgb, 255, 120, 0)";
                break;
            case "open":
                this._icon = "hass:garage-open-variant";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-garage-open-rgb, 255, 120, 0)";
                break;
            case "closing":
                this._icon = "hass:arrow-down-box";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-garage-closing-rgb, 255, 120, 0)";
                break;
            default:
                this._icon = "hass:garage-alert-variant";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                break;
        }
        this._stateFmtd =
            this._hass.formatEntityState(this._stateObj) +
            (state === "open" && this._stateObj.attributes.current_position
                ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "current_position")
                : "");
        this._name = this._config?.icon || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
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
        this._hass.callService("cover", "toggle", { entity_id: this._stateObj.entity_id });
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
    type: "smartqasa-garage-tile",
    name: "SmartQasa Garage Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a garage cover entity.",
});
