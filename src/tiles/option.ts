import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { menuConfig } from "../misc/menu-config";
import { phaseIcons, modeIcons } from "../const";

import { tileBaseStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    option: string;
    trigger?: string;
    menu_tab?: number;
}

window.customCards.push({
    type: "smartqasa-option-tile",
    name: "SmartQasa Option Tile",
    preview: true,
    description: "A SmartQasa tile for displaying an Option of an Input Select entity.",
});

@customElement("smartqasa-option-tile")
export class OptionTile extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private initialized: boolean = false;
    @state() private config?: Config;
    @state() private stateObj?: HassEntity;
    @state() private running: boolean = false;

    private entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("input_select.") ? this.config.entity : undefined;
    }

    updated(changedProps: PropertyValues) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }

    protected render(): TemplateResult {
        if (!this.initialized) return html``;

        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this.selectOption}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }

    private updateState() {
        let icon, iconAnimation, iconColor, name;

        if (this.config && this.hass && this.stateObj) {
            if (this.running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            } else {
                if (this.entity === "input_select.location_phase") {
                    icon = phaseIcons[this.config.option] || phaseIcons.default;
                } else if (this.entity === "input_select.location_mode") {
                    icon = modeIcons[this.config.option] || modeIcons.default;
                } else {
                    icon = this.config.icon || this.stateObj.attributes.icon || "hass:form-dropdown";
                }
                iconAnimation = "none";
                iconColor =
                    this.stateObj.state === this.config.option
                        ? "var(--sq-rgb-blue, 25, 125, 255)"
                        : "var(--sq-inactive-rgb)";
            }
            name = this.config.option || "Unknown";
        } else {
            icon = this.config?.icon || "hass:form-dropdown";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.option || "Unknown";
        }

        return { icon, iconAnimation, iconColor, name };
    }

    private selectOption(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this.config || !this.stateObj) return;

        this.running = true;

        this.hass.callService("input_select", "select_option", {
            entity_id: this.entity,
            option: this.config.option,
        });

        const trigger = this.config.trigger;
        if (trigger && trigger.startsWith("input_button.")) {
            this.hass.callService("input_button", "press", {
                entity_id: trigger,
            });
        }

        setTimeout(() => {
            this.running = false;
            const menuTab = this.config?.menu_tab;
            if (menuTab !== undefined && menuTab >= 0 && menuTab <= 3) {
                this.showMenu(menuTab);
            } else {
                window.browser_mod?.service("close_popup", {});
            }
        }, 1000);
    }

    private async showMenu(menuTab: number): Promise<void> {
        try {
            const dialogConfig = await menuConfig(menuTab);
            window.browser_mod?.service("popup", dialogConfig);
        } catch (e) {
            window.browser_mod?.service("close_popup", {});
            console.error("Error opening menu dialog", e);
        }
    }
}
