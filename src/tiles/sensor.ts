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
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("binary_sensor.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected render(): TemplateResult {
        const { iconTemplate, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };

        return html`
            <div class="container" @click=${this._showMoreInfo}>
                <div class="icon" style="${styleMap(iconStyles)}">${iconTemplate}</div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }

    private updateState() {
        let iconTemplate, iconAnimation, iconColor, name, stateFmtd;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._stateObj) {
            if (!this._config!.icon) {
                iconTemplate = html`<ha-state-icon .hass=${this.hass} .stateObj=${this._stateObj}></ha-state-icon>`;
            } else {
                iconTemplate = html`<ha-icon .icon=${this._config!.icon}></ha-icon>`;
            }
            iconColor = this._stateObj.state === "on" ? "var(--sq-binary_sensor-on-rgb)" : "var(--sq-inactive-rgb)";
            name = this._config!.name || this._stateObj.attributes.friendly_name || this._entity;
            stateFmtd = this.hass!.formatEntityState(this._stateObj);
        } else {
            iconTemplate = html`<ha-icon icon="hass:leak"></ha-icon>`;
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config!.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { iconTemplate, iconAnimation, iconColor, name, stateFmtd };
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
}
