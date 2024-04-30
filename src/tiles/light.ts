import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { moreInfoDialog } from "../utils/more-info-dialog";
import { entityListDialog } from "../utils/entity-list-dialog";

import { tileBaseStyle, tileStateStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
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

    @state() private config?: Config;
    @state() private stateObj?: HassEntity;

    private entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("light.") ? this.config.entity : undefined;
    }

    updated(changedProps: PropertyValues) {
        if (changedProps.has("hass") && this.entity) {
            this.stateObj = this.hass?.states[this.entity];
        }
    }

    protected render(): TemplateResult {
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
        if (!this.hass || !this.stateObj) {
            return {
                icon: this.config?.icon || "hass:lightbulb-alert",
                iconAnimation: "none",
                iconColor: "var(--sq-unavailable-rgb, 255, 0, 255)",
                name: this.config?.name || "Unknown",
                stateFmtd: "Invalid entity!",
            };
        }

        const state = this.stateObj.state || "unknown";
        return {
            icon: this.config?.icon || this.stateObj.attributes.icon || "hass:lightbulb",
            iconAnimation: "none",
            iconColor: state === "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb)",
            name: this.config?.name || this.stateObj.attributes.friendly_name || "Unknown",
            stateFmtd:
                this.hass.formatEntityState(this.stateObj) +
                (state === "on" && this.stateObj.attributes.brightness
                    ? " - " + this.hass.formatEntityAttributeValue(this.stateObj, "brightness")
                    : ""),
        };
    }

    private async toggleEntity(e: Event): Promise<void> {
        e.stopPropagation();
        if (!this.hass || !this.entity) return;

        try {
            await this.hass.callService("light", "toggle", { entity_id: this.entity });
        } catch (error) {
            console.error("Failed to toggle the light:", error);
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
        entityListDialog(this.stateObj.attributes?.friendly_name || "Unknown", "group", this.entity, "light");
    }

    getCardSize() {
        return 1;
    }

    static getConfigElement() {
        return document.createElement("smartqasa-light-tile-editor");
    }

    static getStubConfig() {
        return {
            entity: "",
            icon: "",
            name: "",
        };
    }
}
