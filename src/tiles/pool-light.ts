import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { toggleHassEntity } from "../utils/toggle-hass-entity";
import { sequenceTable } from "../tables/pool-light-sequences";
import { gridDialogStyle } from "../styles/dialog";

import { tileBaseStyle, tileStateStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-pool-light-tile",
    name: "SmartQasa Pool Light Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a pool color light or switch entity.",
});

@customElement("smartqasa-pool-light-tile")
export class PoolLightTile extends LitElement {
    getCardSize() {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private config?: Config;
    @state() private stateObj?: HassEntity;

    private entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = ["light", "switch"].includes(this.config.entity?.split(".")[0]) ? this.config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("config") && this.config) ||
            (changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj)
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
            <div class="container" @click=${this.showColorList}>
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
            icon = this.config.icon || this.stateObj.attributes.icon || "hass:lightbulb";
            iconColor = state === "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb)";
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd =
                this.hass.formatEntityState(this.stateObj) +
                (state === "on" && this.stateObj.attributes.brightness
                    ? " - " + this.hass.formatEntityAttributeValue(this.stateObj, "brightness")
                    : "");
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

    private showColorList(e: Event): void {
        e.stopPropagation();
        if (!this.stateObj) return;

        const cards = Object.keys(sequenceTable).map((key) => ({
            type: "custom:smartqasa-pool-light-sequencer-tile",
            entity: this.entity,
            sequence: key,
        }));
        const dialogConfig = {
            title: this.stateObj.attributes.friendly_name || this.stateObj.entity_id,
            timeout: 60000,
            content: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: gridDialogStyle,
                cards: cards,
            },
        };

        window.browser_mod?.service("popup", dialogConfig);
    }
}
