import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";
import { moreInfoDialog } from "../dialogs/more-info-dialog";

import tileBaseStyle from "../css/tile-base.css";
import tileStateStyle from "../css/tile-state.css";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-robot-tile",
    name: "SmartQasa Robot Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a robot vacuum entity.",
});

@customElement("smartqasa-robot-tile")
export class RobotTile extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;
    private _entity?: string;

    static styles: CSSResultGroup = [unsafeCSS(tileBaseStyle), unsafeCSS(tileStateStyle)];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("vacuum.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
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

    private _updateState(): {
        icon: string;
        iconAnimation?: string;
        iconColor: string;
        name: string;
        stateFmtd: string;
    } {
        let icon, iconAnimation, iconColor, name, stateFmtd;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._config && this._stateObj) {
            const state = this._stateObj.state || "unknown";
            switch (state) {
                case "cleaning":
                    icon = "hass:robot-vacuum-variant";
                    iconAnimation = "none";
                    iconColor = "var(--sq-vacuum-cleaning-rgb, 0, 150, 136)";
                    break;
                case "docked":
                    icon = "hass:robot-vacuum-variant";
                    iconAnimation = "none";
                    iconColor = "var(--sq-inactive-rgb)";
                    break;
                case "idle":
                    icon = "hass:robot-vacuum-variant";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-vacuum-idle-rgb, 190, 75, 85)";
                    break;
                case "paused":
                    icon = "hass:robot-vacuum-variant";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-vacuum-paused-rgb, 190, 75, 85)";
                    break;
                case "returning":
                    icon = "hass:robot-vacuum-variant";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-vacuum-returning-rgb, 0, 150, 136)";
                    break;
                default:
                    icon = "hass:robot-vacuum-variant-alert";
                    iconAnimation = "none";
                    iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                    break;
            }
            name = this._config.name || this._stateObj.attributes.friendly_name || "Robot";
            stateFmtd =
                this.hass?.formatEntityState(this._stateObj) +
                (this._stateObj.attributes.battery_level
                    ? " - " + this.hass?.formatEntityAttributeValue(this._stateObj, "battery_level")
                    : "");
        } else {
            icon = this._config?.icon || "hass:robot-vacuum-variant-alert";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        const state = this._stateObj?.state || "unknown";
        const service = ["docked", "idle", "paused"].includes(state) ? "start" : "pause";
        callService(this.hass, "vacuum", service, {
            entity_id: this._entity,
        });
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
}
