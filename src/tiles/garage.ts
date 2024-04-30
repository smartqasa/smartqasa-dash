import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { moreInfoDialog } from "../utils/more-info-dialog";

import { tileBaseStyle, tileStateStyle, tileIconBlinkStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-garage-tile",
    name: "SmartQasa Garage Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a garage cover entity.",
});

@customElement("smartqasa-garage-tile")
export class GarageTile extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private config?: Config;
    @state() private stateObj?: HassEntity;

    private entity?: string;

    private _icon: string = "hass:garage-variant";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("cover.") ? this.config.entity : undefined;
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
        let icon = this.config?.icon || "hass:garage-alert-variant";
        let iconAnimation = "none";
        let iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
        let name = this.config?.name || "Unknown";
        let stateFmtd = "Invalid entity!";

        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state || "unknown";
            switch (state) {
                case "closed":
                    icon = "hass:garage-variant";
                    iconAnimation = "none";
                    iconColor = "var(--sq-inactive-rgb)";
                    break;
                case "opening":
                    icon = "hass:arrow-up-box";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-garage-opening-rgb, 255, 120, 0)";
                    break;
                case "open":
                    icon = "hass:garage-open-variant";
                    iconAnimation = "none";
                    iconColor = "var(--sq-garage-open-rgb, 255, 120, 0)";
                    break;
                case "closing":
                    icon = "hass:arrow-down-box";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-garage-closing-rgb, 255, 120, 0)";
                    break;
                default:
                    icon = "hass:garage-alert-variant";
                    iconAnimation = "none";
                    iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                    break;
            }
            name = this.config?.name || this.stateObj.attributes.friendly_name || "Unknown";
            stateFmtd =
                this.hass.formatEntityState(this.stateObj) +
                (state === "open" && this.stateObj.attributes.current_position
                    ? " - " + this.hass.formatEntityAttributeValue(this.stateObj, "current_position")
                    : "");
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private async toggleEntity(e: Event): Promise<void> {
        e.stopPropagation();
        if (!this.hass || !this.entity) return;

        try {
            await this.hass.callService("cover", "toggle", { entity_id: this.entity });
        } catch (error) {
            console.error("Failed to toggle the entity:", error);
        }
    }

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
}
