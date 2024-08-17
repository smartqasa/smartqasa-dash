import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service-new";
import { moreInfoDialog } from "../utils/more-info-dialog";
import { entityListDialog } from "../utils/entity-list-dialog";

import { tileBaseStyle, tileStateStyle, tileIconBlinkStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
    tilt?: number;
}

window.customCards.push({
    type: "smartqasa-shade-tile",
    name: "SmartQasa Shade Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a window shade entity.",
});

@customElement("smartqasa-shade-tile")
export class ShadeTile extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("cover.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
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

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._config && this.hass && this._stateObj) {
            const state = this._stateObj.state || "unknown";
            switch (state) {
                case "closed":
                    icon = "hass:roller-shade-closed";
                    iconAnimation = "none";
                    iconColor = "var(--sq-inactive-rgb)";
                    break;
                case "opening":
                    icon = "hass:arrow-up-box";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-shade-opening-rgb, 146, 107, 199)";
                    break;
                case "open":
                    icon = "hass:roller-shade";
                    iconAnimation = "none";
                    iconColor = "var(--sq-shade-open-rgb, 146, 107, 199)";
                    break;
                case "closing":
                    icon = "hass:arrow-down-box";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-shade-closing-rgb, 146, 107, 199)";
                    break;
                default:
                    icon = "hass:alert-rhombus";
                    iconAnimation = "none";
                    iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                    break;
            }
            name = this._config.name || this._stateObj.attributes.friendly_name || this._entity;
            stateFmtd =
                this.hass.formatEntityState(this._stateObj) +
                (state === "open" && this._stateObj.attributes.current_position
                    ? " - " + this.hass.formatEntityAttributeValue(this._stateObj, "current_position")
                    : "");
        } else {
            icon = this._config?.icon || "hass:roller-shade";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this._config || !this._stateObj) return;
        const state = this._stateObj.state;
        const tilt = this._config.tilt || 100;
        if (["closing", "opening"].includes(state)) {
            callService(this.hass, "cover", "stop_cover", {
                entity_id: this._entity,
            });
            return;
        }
        if (tilt >= 1 && tilt <= 100) {
            if (this._stateObj.attributes.current_position !== tilt) {
                callService(this, "cover", "set_cover_position", {
                    entity_id: this._entity,
                    position: tilt,
                });
            } else {
                callService(this, "cover", "set_cover_position", {
                    entity_id: this._entity,
                    position: 0,
                });
            }
        } else {
            callService(this, "cover", "toggle", {
                entity_id: this._entity,
                position: 0,
            });
        }
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }

    private _showEntityList(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this._stateObj) return;

        const group = this._config!.group || `${this._entity}_group`;
        const groupObj = this.hass.states[group];
        if (!groupObj) return;

        const entityIds = groupObj.attributes?.entity_id;
        if (!Array.isArray(entityIds) || entityIds.length === 0) return;

        const friendlyName = this._stateObj.attributes?.friendly_name || "Unknown";
        entityListDialog(friendlyName, "group", group, "shade");
    }
}
