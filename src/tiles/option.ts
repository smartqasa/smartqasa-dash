import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";
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

    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;
    @state() private _running: boolean = false;
    private _entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("input_select.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            changedProps.has("running") ||
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            (changedProps.has("config") && this._config)
        );
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
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

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._config && this.hass && this._stateObj) {
            if (this._running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            } else {
                if (this._entity === "input_select.location_phase") {
                    icon = phaseIcons[this._config.option] || phaseIcons.default;
                } else if (this._entity === "input_select.location_mode") {
                    icon = modeIcons[this._config.option] || modeIcons.default;
                } else {
                    icon = this._config.icon || this._stateObj.attributes.icon || "hass:form-dropdown";
                }
                iconAnimation = "none";
                iconColor =
                    this._stateObj.state === this._config.option
                        ? "var(--sq-rgb-blue, 25, 125, 255)"
                        : "var(--sq-inactive-rgb)";
            }
            name = this._config.option || "Unknown";
        } else {
            icon = this._config?.icon || "hass:form-dropdown";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config?.option || "Unknown";
        }

        return { icon, iconAnimation, iconColor, name };
    }

    private selectOption(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this._config || !this._stateObj) return;

        this._running = true;
        callService(this.hass, "input_select", "select_option", {
            entity_id: this._entity,
            option: this._config.option,
        });

        const trigger = this._config.trigger;
        if (trigger && trigger.startsWith("input_button.")) {
            callService(this.hass, "input_button", "press", {
                entity_id: trigger,
            });
        }

        setTimeout(() => {
            this._running = false;
            const menuTab = this._config?.menu_tab;
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
