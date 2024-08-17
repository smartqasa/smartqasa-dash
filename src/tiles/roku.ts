import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";
import { listDialogConfig } from "../utils/list-dialog-config";

import { tileBaseStyle, tileStateStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-roku-tile",
    name: "SmartQasa Roku Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a Roku media_player entity.",
});

@customElement("smartqasa-roku-tile")
export class RokuTile extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity.startsWith("media_player.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this._updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this._showMoreInfo}>
                <div class="icon" @click=${this._toggleEntity} style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }

    private _updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._stateObj) {
            icon = this._config?.icon || this._stateObj.attributes.icon || "hass:audio-video";
            iconAnimation = "none";
            const state = this._stateObj.state || "unknown";
            switch (state) {
                case "idle":
                    iconColor = "var(--sq-media_player-idle-rgb)";
                    break;
                case "standby":
                    iconColor = "var(--sq-media_player-standby-rgb)";
                    break;
                case "on":
                    iconColor = "var(--sq-media_player-on-rgb)";
                    break;
                case "paused":
                    iconColor = "var(--sq-media_player-paused-rgb)";
                    break;
                case "playing":
                    iconColor = "var(--sq-media_player-playing-rgb, 3, 169, 244)";
                    break;
                default:
                    iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                    break;
            }
            name = this._config!.name || this._stateObj.attributes.friendly_name || this._entity;
            stateFmtd = `${this.hass!.formatEntityState(this._stateObj)}${
                this._stateObj.attributes?.source ? ` - ${this._stateObj.attributes.source}` : ""
            }`;
        } else {
            icon = this._config!.icon || "hass:audio-video-off";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config!.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        callService(this, "media_player", "toggle", { entity_id: this._entity });
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        if (!this._config || !this._stateObj) return;

        const dialogConfig = {
            title: this._stateObj.attributes?.friendly_name || this._entity || "Unknown",
            timeout: 60000,
            content: {
                type: "custom:roku-card",
                entity: this._entity,
                tv: true,
            },
            ...(this._config.dialog_title && {
                dismiss_action: {
                    service: "browser_mod.popup",
                    data: {
                        ...listDialogConfig(
                            this._config.dialog_title,
                            this._config.filter_type,
                            this._config.filter_value,
                            this._config.tile_type
                        ),
                    },
                },
            }),
        };

        window.browser_mod?.service("popup", dialogConfig);
    }
}
