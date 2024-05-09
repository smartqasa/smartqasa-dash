import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { moreInfoDialog } from "../utils/more-info-dialog";

import { tileBaseStyle, tileStateStyle, tileIconBlinkStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-lock-tile",
    name: "SmartQasa Lock Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a lock entity.",
});

@customElement("smartqasa-lock-tile")
export class LockTile extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private config?: Config;
    @state() private stateObj?: HassEntity;
    @state() private running: boolean = false;

    private entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle, tileIconSpinStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("lock.") ? this.config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            changedProps.has("running") ||
            (changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj) ||
            (changedProps.has("config") && this.config)
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
            const state = this.stateObj.state || "unknown";
            switch (state) {
                case "locked":
                    icon = "hass:lock";
                    iconAnimation = "none";
                    iconColor = "var(--sq-inactive-rgb)";
                    break;
                case "unlocking":
                    icon = "hass:rotate-right";
                    iconAnimation = "spin 1.0s linear infinite";
                    iconColor = "var(--sq-lock-unlocking-rgb)";
                    break;
                case "unlocked":
                    icon = "hass:lock-open";
                    iconAnimation = "none";
                    iconColor = "var(--sq-lock-unlocked-rgb)";
                    break;
                case "locking":
                    icon = "hass:rotate-right";
                    iconAnimation = "spin 1.0s linear infinite";
                    iconColor = "var(--sq-lock-locking-rgb)";
                    break;
                case "jammed":
                    icon = "hass:lock-open";
                    iconAnimation = "blink 1.0s linear infinite";
                    iconColor = "var(--sq-lock-jammed-rgb, 255, 0, 0)";
                    break;
                default:
                    icon = "hass:lock-alert";
                    iconAnimation = "none";
                    iconColor = "var(--sq-unavailable-rgb)";
                    break;
            }
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd = this.hass.formatEntityState(this.stateObj);
        } else {
            icon = this.config?.icon || "hass:garage-alert-variant";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private toggleEntity(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this.stateObj) return;

        const state = this.stateObj.state;
        this.running = true;
        this.stateObj.state = state == "locked" ? "unlocking" : "locking";

        try {
            this.hass.callService("lock", state == "locked" ? "unlock" : "lock", {
                entity_id: this.entity,
            });
        } catch (error) {
            console.error("Failed to toggle the entity:", error);
        }

        setTimeout(() => {
            this.running = false;
        }, 250);
    }

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
}
