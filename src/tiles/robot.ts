import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { moreInfoDialog } from "../utils/more-info-dialog";

import { tileBaseStyle, tileStateStyle, tileIconBlinkStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

@customElement("smartqasa-robot-tile")
export class RobotTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _entity?: string;
    private _hass: any;
    private _icon: string = "hass:robot-vacuum-variant";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("vacuum.") ? this._config.entity : undefined;
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!hass || !this._entity || hass.states[this._entity] === this._stateObj) return;
        this._hass = hass;
        this._stateObj = hass.states[this._entity];
        this.updateState();
    }

    private updateState(): void {
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:robot-vacuum-variant-alert";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }

        const state = this._stateObj.state || "unknown";
        switch (state) {
            case "cleaning":
                this._icon = "hass:robot-vacuum-variant";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-vacuum-cleaning-rgb, 0, 150, 136)";
                break;
            case "docked":
                this._icon = "hass:robot-vacuum-variant";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-inactive-rgb)";
                break;
            case "idle":
                this._icon = "hass:robot-vacuum-variant";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-vacuum-idle-rgb, 190, 75, 85)";
                break;
            case "paused":
                this._icon = "hass:robot-vacuum-variant";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-vacuum-paused-rgb, 190, 75, 85)";
                break;
            case "returning":
                this._icon = "hass:robot-vacuum-variant";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-vacuum-returning-rgb, 0, 150, 136)";
                break;
            default:
                this._icon = "hass:robot-vacuum-variant-alert";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                break;
        }
        this._stateFmtd =
            this._hass.formatEntityState(this._stateObj) +
            (this._stateObj.attributes.battery_level
                ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "battery_level")
                : "");
        this._name = this._config?.icon || this._stateObj.attributes.friendly_name || this._entity || "Unknown";
    }

    protected render(): TemplateResult {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };

        return html`
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }

    private toggleEntity(e: Event): void {
        e.stopPropagation();
        if (!this._stateObj) return;
        const state = this._stateObj.state;
        this._hass.callService("vacuum", ["docked", "idle", "paused"].includes(state) ? "start" : "pause", {
            entity_id: this._entity,
        });
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
    type: "smartqasa-robot-tile",
    name: "SmartQasa Robot Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a robot vacuum entity.",
});
