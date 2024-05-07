import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { selectOptionDialog } from "../utils/select-option-dialog";

import { tileBaseStyle, tileStateStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    trigger?: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-select-tile",
    name: "SmartQasa Select Tile",
    preview: true,
    description: "A SmartQasa tile for displaying an Input Select entity.",
});

@customElement("smartqasa-select-tile")
export class SelectTile extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private config?: Config;
    @state() private stateObj?: HassEntity;

    private entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("input_select.") ? this.config.entity : undefined;
    }

    shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj);
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this.showOptions}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }

    private updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;

        this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

        if (this.config && this.stateObj) {
            const state = this.stateObj.state || "unknown";
            icon = this.config?.icon || this.stateObj.attributes?.icon || "hass:form-dropdown";
            iconAnimation = "none";
            iconColor = "var(--sq-inactive-rgb)";
            name = this.config?.name || this.stateObj.attributes?.friendly_name || this.entity;
            stateFmtd = this.hass?.formatEntityState(this.stateObj) || "Unknown";
        } else {
            icon = this.config?.icon || "hass:form-dropdown";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private showOptions(e: Event): void {
        e.stopPropagation();
        selectOptionDialog(this.config, this.stateObj);
    }
}
