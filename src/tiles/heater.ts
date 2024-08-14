import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";
import { moreInfoDialog } from "../utils/more-info-dialog";
import { heaterColors } from "../const";

import { tileBaseStyle, tileStateStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-heater-tile",
    name: "SmartQasa Heater Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a water heater entity.",
});

@customElement("smartqasa-heater-tile")
export class HeaterTile extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private config?: Config;
    @state() private stateObj?: HassEntity;

    private entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("water_heater.") ? this.config.entity : undefined;
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
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
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
            const state = this.stateObj.state || "unknown";
            icon = this.config.icon || "hass:water-thermometer";
            iconAnimation = "none";
            iconColor = heaterColors[state] || heaterColors.idle;
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd = this.hass.formatEntityState(this.stateObj);
            if (state !== "off" && this.stateObj.attributes.temperature) {
                stateFmtd += ` - ${this.stateObj.attributes.temperature}°`;
            }
        } else {
            icon = this.config?.icon || "hass:water-thermometer";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private toggleEntity(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this.entity) return;
        callService(this.hass, "water_heater", "toggle", { entity_id: this.entity });
    }

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
}
