import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";
import { moreInfoDialog } from "../utils/more-info-dialog";
import { entityListDialog } from "../utils/entity-list-dialog";

import tileBaseStyle from "../styles/tile-base.css";
import tileStateStyle from "../styles/tile-state.css";

interface Config extends LovelaceCardConfig {
    entity: string;
    group?: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-light-tile",
    name: "SmartQasa Light Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a light entity.",
});

@customElement("smartqasa-light-tile")
export class LightTile extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles: CSSResultGroup = [unsafeCSS(tileBaseStyle), unsafeCSS(tileStateStyle)];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity.startsWith("light.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected updated(changedProps: PropertyValues): void {
        if (changedProps.has("hass") && this.hass && this._entity) {
            this._stateObj = this.hass.states[this._entity];
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this._entity) return nothing;

        const { icon, iconAnimation, iconColor, name, stateFmtd } = this._updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
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

        if (this._stateObj) {
            const state = this._stateObj.state || "unknown";
            icon = this._config!.icon || this._stateObj.attributes.icon || "hass:lightbulb";
            iconAnimation = "none";
            iconColor = state === "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb)";
            name = this._config!.name || this._stateObj.attributes.friendly_name || this._entity;
            stateFmtd = `${this.hass!.formatEntityState(this._stateObj)}${
                state === "on" && this._stateObj.attributes.brightness
                    ? " - " + this.hass!.formatEntityAttributeValue(this._stateObj, "brightness")
                    : ""
            }`;
        } else {
            icon = this._config!.icon || "hass:lightbulb-alert";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        callService(this.hass, "light", "toggle", { entity_id: this._entity });
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }

    private _showEntityList(e: Event): void {
        e.stopPropagation();
        if (!this._stateObj) return;

        const group = this._config!.group || `${this._entity}_group`;
        const groupObj = this.hass?.states[group];
        if (!groupObj) return;

        const entityIds = groupObj.attributes?.entity_id;
        if (entityIds.length === 0) return;

        const friendlyName = this._stateObj.attributes?.friendly_name || "Unknown";
        entityListDialog(friendlyName, "group", group, "light");
    }
}
