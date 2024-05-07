import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { toggleHassEntity } from "../utils/toggle-hass-entity";
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
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    private entity?: string;
    private stateObj?: HassEntity;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("media_player.") ? this.config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj) ||
            (changedProps.has("config") && this.config)
        );
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }

    private updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;

        this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

        if (this.config && this.hass && this.stateObj) {
            icon = this.config?.icon || this.stateObj.attributes.icon || "hass:audio-video";
            iconAnimation = "none";
            const state = this.stateObj.state || "unknown";
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
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd = `${this.hass.formatEntityState(this.stateObj)}${
                this.stateObj.attributes?.source ? ` - ${this.stateObj.attributes.source}` : ""
            }`;
        } else {
            icon = this.config?.icon || "hass:audio-video-off";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private toggleEntity(e: Event): void {
        e.stopPropagation();
        toggleHassEntity(this.hass, this.entity);
    }

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        if (!this.config || !this.stateObj) return;

        const dialogConfig = {
            title: this.stateObj.attributes?.friendly_name || this.entity || "Unknown",
            timeout: 60000,
            content: {
                type: "custom:roku-card",
                entity: this.entity,
                tv: true,
            },
            ...(this.config.dialog_title && {
                dismiss_action: {
                    service: "browser_mod.popup",
                    data: {
                        ...listDialogConfig(
                            this.config.dialog_title,
                            this.config.filter_type,
                            this.config.filter_value,
                            this.config.tile_type
                        ),
                    },
                },
            }),
        };

        window.browser_mod?.service("popup", dialogConfig);
    }
}
