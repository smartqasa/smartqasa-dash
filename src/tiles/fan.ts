import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { toggleHassEntity } from "../utils/toggle-hass-entity";
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

    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private initialized: boolean = false;
    @state() private config?: Config;
    @state() private stateObj?: HassEntity;

    private entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle, tileIconSpinStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("fan.") ? this.config.entity : undefined;
    }

    updated(changedProps: PropertyValues) {
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }

    protected render(): TemplateResult {
        if (!this.initialized) return html``;

        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
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

        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state || "unknown";
            icon = this.config.icon || "hass:fan";
            iconAnimation = "none";
            if (state == "on" && icon === "hass:fan") {
                if (this.stateObj.attributes.percentage) {
                    const speed = 0.5 + (1 - this.stateObj.attributes.percentage / 100);
                    const direction = this.stateObj.attributes.direction == "reverse" ? "reverse" : "normal";
                    iconAnimation = `spin ${speed}s linear infinite ${direction}`;
                } else {
                    iconAnimation = `spin 0.5s linear infinite normal`;
                }
            }
            iconColor = state === "on" ? "var(--sq-fan-on-rgb)" : "var(--sq-inactive-rgb)";
            name = this.config.name || this.stateObj.attributes.friendly_name || "Unknown";
            stateFmtd = `${this.hass.formatEntityState(this.stateObj)}${
                state === "on" && this.stateObj.attributes.percentage
                    ? " - " + this.hass.formatEntityAttributeValue(this.stateObj, "percentage")
                    : ""
            }`;
        } else {
            icon = this.config?.icon || "hass:lightbulb-alert";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private toggleEntity(e: Event): void {
        e.stopPropagation();
        toggleHassEntity(this.hass, this.entity);
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
        entityListDialog(this.stateObj.attributes?.friendly_name || "Unknown", "group", this.entity, "fan");
    }
}
