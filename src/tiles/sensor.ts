import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { moreInfoDialog } from "../utils/more-info-dialog";

import { tileBaseStyle, tileStateStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    category?: string;
    entity: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-sensor-tile",
    name: "SmartQasa Sensor Tile",
    preview: true,
    description: "A SmartQasa tile for observing a binary_sensor entity.",
});

@customElement("smartqasa-sensor-tile")
export class SensorTile extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private initialized: boolean = false;
    @state() private config?: Config;
    @state() private stateObj?: HassEntity;

    private entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("binary_sensor.") ? this.config.entity : undefined;
    }

    updated(changedProps: PropertyValues) {
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }

    protected render(): TemplateResult {
        if (!this.initialized) return html``;

        const { iconTemplate, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };

        return html`
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" style="${styleMap(iconStyles)}">${iconTemplate}</div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }

    private updateState() {
        let iconTemplate, iconAnimation, iconColor, name, stateFmtd;

        if (this.config && this.hass && this.stateObj) {
            if (!this.config.icon) {
                iconTemplate = html`<ha-state-icon .hass=${this.hass} .stateObj=${this.stateObj}></ha-state-icon>`;
            } else {
                iconTemplate = html`<ha-icon .icon=${this.config.icon}></ha-icon>`;
            }
            iconColor = this.stateObj.state === "on" ? "var(--sq-binary_sensor-on-rgb)" : "var(--sq-inactive-rgb)";
            name = this.config?.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd = this.hass.formatEntityState(this.stateObj);
        } else {
            iconTemplate = html`<ha-icon .icon="hass:leak"></ha-icon>`;
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { iconTemplate, iconAnimation, iconColor, name, stateFmtd };
    }

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
}
