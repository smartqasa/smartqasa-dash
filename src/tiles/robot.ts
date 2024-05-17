import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";
import { moreInfoDialog } from "../utils/more-info-dialog";

import { tileBaseStyle, tileStateStyle, tileIconBlinkStyle } from "../styles/tile";

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
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    private stateObj?: HassEntity;

    private entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("vacuum.") ? this.config.entity : undefined;
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

        if (this.config && this.stateObj) {
            const state = this.stateObj.state || "unknown";
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
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd =
                this.hass?.formatEntityState(this.stateObj) +
                (this.stateObj.attributes.battery_level
                    ? " - " + this.hass?.formatEntityAttributeValue(this.stateObj, "battery_level")
                    : "");
        } else {
            icon = this.config?.icon || "hass:robot-vacuum-variant-alert";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private toggleEntity(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this.stateObj) return;
        const state = this.stateObj.state;
        callService(this.hass, "vacuum", ["docked", "idle", "paused"].includes(state) ? "start" : "pause", {
            entity_id: this.entity,
        });
    }

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
}
