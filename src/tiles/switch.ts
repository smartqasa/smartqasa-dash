import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { toggleHassEntity } from "../utils/toggle-hass-entity";
import { moreInfoDialog } from "../utils/more-info-dialog";

import { tileBaseStyle, tileStateStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    category?: string;
    entity: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-switch-tile",
    name: "SmartQasa Switch Tile",
    preview: true,
    description: "A SmartQasa tile for toggling an entity.",
});

@customElement("smartqasa-switch-tile")
export class SwitchTile extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    private entity?: string;
    private stateObj?: HassEntity;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = ["fan", "input_boolean", "light", "switch"].includes(this.config.entity?.split(".")[0])
            ? this.config.entity
            : undefined;
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
            const state = this.stateObj.state;
            icon = this.config.icon || this.stateObj.attributes.icon || "hass:toggle-switch-variant";
            iconAnimation = "none";
            iconColor =
                state === "on"
                    ? `var(--sq-switch${this.config.category ? `-${this.config.category}` : ""}-on-rgb)`
                    : "var(--sq-inactive-rgb)";
            name = this.config.name || this.stateObj.attributes.friendly_name || this.stateObj.entity_id;
            stateFmtd = this.hass.formatEntityState(this.stateObj);
        } else {
            icon = this.config?.icon || "hass:toggle-switch-variant";
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
}
