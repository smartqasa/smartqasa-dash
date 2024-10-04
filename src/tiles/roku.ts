import { CSSResult, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { callService } from "../utilities/call-service";
import { listDialogConfig } from "../dialogs/list-dialog-config";

import tileStyle from "../css/tile.css";

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
export class RokuTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;

    private _entity?: string;
    private _stateObj?: HassEntity;
    private _icon: string = "hass:audio-video";
    private _iconStyles: Record<string, string> = {};
    private _name: string = "Unknown Roku";
    private _stateFmtd: string = "Unknown State";

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        if (!config.entity?.startsWith("media_player.")) {
            console.error("Invalid media_player entity provided in the config.");
            this._entity = undefined;
        } else {
            this._entity = config.entity;
        }
        this._config = config;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this._entity) return nothing;

        return html`
            <div class="container" @click=${this._toggleEntity}>
                <div class="icon" @click=${this._showMoreInfo} style="${styleMap(this._iconStyles)}">
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        let icon, iconColor, name, stateFmtd;
        if (this._stateObj) {
            icon = this._config?.icon || this._stateObj.attributes.icon || "hass:audio-video";
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
            name = this._config!.name || this._stateObj.attributes.friendly_name || "Roku";
            stateFmtd = `${this.hass!.formatEntityState(this._stateObj)}${
                this._stateObj.attributes?.source ? ` - ${this._stateObj.attributes.source}` : ""
            }`;
        } else {
            icon = this._config!.icon || "hass:audio-video-off";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config!.name || "Unknown";
            stateFmtd = "Unknown";
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
        };
        this._icon = icon;
        this._name = name;
        this._stateFmtd = stateFmtd;
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        callService(this.hass, "media_player", "toggle", { entity_id: this._entity });
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        if (!this._config || !this._stateObj) return;

        const dialogConfig = {
            title: this._stateObj.attributes?.friendly_name || this._entity || "Unknown",
            timeout: 60000,
            content: {
                type: "custom:smartqasa-tv-remote-card",
                entity: this._entity,
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
