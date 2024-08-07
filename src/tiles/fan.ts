import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";
import { moreInfoDialog } from "../utils/more-info-dialog";
import { entityListDialog } from "../utils/entity-list-dialog";

import { tileBaseStyle, tileStateStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-fan-tile",
    name: "SmartQasa Fan Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a fan entity.",
});

@customElement("smartqasa-fan-tile")
export class FanTile extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass!: HomeAssistant;
    @state() private _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle, tileIconSpinStyle];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("fan.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._entity && this.hass.states[this._entity] !== this._stateObj) ||
            (changedProps.has("_config") && this._config)
        );
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this._updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this._showMoreInfo} @contextmenu=${this._showEntityList}>
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

        this._stateObj = this._entity ? this.hass.states[this._entity] : undefined;

        if (this._config && this._stateObj) {
            const state = this._stateObj.state || "unknown";
            icon = this._config.icon || "hass:fan";
            iconAnimation = "none";
            if (state == "on" && icon === "hass:fan") {
                if (this._stateObj.attributes.percentage) {
                    const speed = 0.5 + (1 - this._stateObj.attributes.percentage / 100);
                    const direction = this._stateObj.attributes.direction == "reverse" ? "reverse" : "normal";
                    iconAnimation = `spin ${speed}s linear infinite ${direction}`;
                } else {
                    iconAnimation = `spin 0.5s linear infinite normal`;
                }
            }
            iconColor = state === "on" ? "var(--sq-fan-on-rgb)" : "var(--sq-inactive-rgb)";
            name = this._config.name || this._stateObj.attributes.friendly_name || this._entity;
            stateFmtd = `${this.hass.formatEntityState(this._stateObj)}${
                state === "on" && this._stateObj.attributes.percentage
                    ? " - " + this.hass.formatEntityAttributeValue(this._stateObj, "percentage")
                    : ""
            }`;
        } else {
            icon = this._config?.icon || "hass:lightbulb-alert";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this._entity) return;
        callService(this.hass, "fan", "toggle", { entity_id: this._entity });
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }

    private _showEntityList(e: Event): void {
        e.stopPropagation();
        if (
            !this._stateObj ||
            !Array.isArray(this._stateObj.attributes?.entity_id) ||
            this._stateObj.attributes.entity_id.length === 0
        )
            return;
        entityListDialog(this._stateObj.attributes?.friendly_name || "Unknown", "group", this._entity, "fan");
    }
}
