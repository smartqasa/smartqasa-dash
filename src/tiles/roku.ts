import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { listDialogConfig } from "../utils/listDialogConfig";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

@customElement("smartqasa-roku-tile")
export class RokuTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _hass: any;
    private _icon: string = "hass:audio-video";
    private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";

    static styles: CSSResultGroup = [styleTileBase, styleTileState];

    setConfig(config: Config): void {
        this._config = config ? config : undefined;
        this._updateState();
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass ? hass : undefined;
        this._updateState();
    }

    private _updateState(): void {
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "media_player"
                ? this._hass?.states[this._config.entity]
                : undefined;

        if (!this._stateObj) {
            this._icon = this._config?.icon || "hass:lightbulb-alert";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }

        const state = this._stateObj.state || "unknown";
        switch (state) {
            case "idle":
                this._iconColor = "var(--sq-media_player-idle, 128, 128, 128)";
                break;
            case "standby":
                this._iconColor = "var(--sq-media_player-standby-rgb, 128, 128, 128)";
                break;
            case "on":
                this._iconColor = "var(--sq-media_player-on-rgb, 128, 128, 128)";
                break;
            case "paused":
                this._iconColor = "var(--sq-media_player-paused-rgb, 128, 128, 128)";
                break;
            case "playing":
                this._iconColor = "var(--sq-media_player-playing-rgb, 3, 169, 244)";
                break;
            default:
                this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                break;
        }
        this._stateFmtd = `${this._hass.formatEntityState(this._stateObj)}${
            this._stateObj.attributes?.source ? ` - ${this._stateObj.attributes.source}` : ""
        }`;
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
            this._hass.callService("media_player", "toggle", { entity_id: this._stateObj.entity_id });
        }
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        if (!this._config || !this._stateObj) return;

        const dialogConfig = {
            title: this._stateObj.attributes?.friendly_name || this._stateObj.entity_id,
            timeout: 60000,
            content: {
                type: "custom:roku-card",
                entity: this._stateObj.entity_id,
                tv: true,
            },
            ...(this._config.dialogTitle && {
                dismiss_action: {
                    service: "browser_mod.popup",
                    data: {
                        ...listDialogConfig(
                            this._config.dialogTitle,
                            this._config.filterType,
                            this._config.filterValue,
                            this._config.tileType
                        ),
                    },
                },
            }),
        };

        window.browser_mod?.service("popup", dialogConfig);
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-roku-tile",
    name: "SmartQasa Roku Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a Roku media_player entity.",
});
