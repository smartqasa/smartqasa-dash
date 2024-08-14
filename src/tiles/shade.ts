import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";
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
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    private entity?: string;
    private stateObj?: HassEntity;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("cover.") ? this.config.entity : undefined;
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
            <div class="container" @click=${this.showMoreInfo} @contextmenu=${this.showEntityList}>
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
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd =
                this.hass.formatEntityState(this.stateObj) +
                (state === "open" && this.stateObj.attributes.current_position
                    ? " - " + this.hass.formatEntityAttributeValue(this.stateObj, "current_position")
                    : "");
        } else {
            icon = this.config?.icon || "hass:roller-shade";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private toggleEntity(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this.config || !this.stateObj) return;
        const state = this.stateObj.state;
        const tilt = this.config.tilt || 100;
        if (["closing", "opening"].includes(state)) {
            callService(this.hass, "cover", "stop_cover", {
                entity_id: this.entity,
            });
            return;
        }
        if (tilt >= 1 && tilt <= 100) {
            if (this.stateObj.attributes.current_position !== tilt) {
                callService(this.hass, "cover", "set_cover_position", {
                    entity_id: this.entity,
                    position: tilt,
                });
            } else {
                callService(this.hass, "cover", "set_cover_position", {
                    entity_id: this.entity,
                    position: 0,
                });
            }
        } else {
            callService(this.hass, "cover", "toggle", {
                entity_id: this.entity,
                position: 0,
            });
        }
    }

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }

    private showEntityList(e: Event): void {
        e.stopPropagation();
        if (
            !this.stateObj ||
            !Array.isArray(this.stateObj.attributes?.entity_id) ||
            this.stateObj.attributes.entity_id.length === 0
        )
            return;
        entityListDialog(this.stateObj.attributes?.friendly_name || "Unknown", "group", this.entity, "shade");
    }
}
