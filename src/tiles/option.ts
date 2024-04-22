import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { menuConfig } from "../misc/menu-config";
import { phaseIcons, modeIcons } from "../utils/const";

import { tileBaseStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    option: string;
    trigger?: string;
    menu_tab?: number;
}

@customElement("smartqasa-option-tile")
export class OptionTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;
    @state() private _running: boolean = false;

    private _entity?: string;
    private _hass: any;
    private _icon: string = "hass:form-dropdown";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("input_select.") ? this._config.entity : undefined;
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!hass || !this._entity || hass.states[this._entity] === this._stateObj) return;
        this._hass = hass;
        this._stateObj = hass.states[this._entity];
        this.updateState();
    }

    private updateState(): void {
        if (!this._config || this._running === true) return;

        if (!this._stateObj) {
            this._icon = "hass:form-dropdown";
            this._iconAnimation = "none";
            this._iconColor = "var(--sq-unavailable-rgb)";
            this._name = this._config?.option || "Unknown";
            return;
        }

        if (this._entity === "input_select.location_phase") {
            this._icon = phaseIcons[this._config.option] || phaseIcons.default;
        } else if (this._entity === "input_select.location_mode") {
            this._icon = modeIcons[this._config.option] || modeIcons.default;
        } else {
            this._icon = this._config?.icon || this._stateObj.attributes?.icon || "hass:form-dropdown";
        }
        this._iconAnimation = "none";
        this._iconColor =
            this._stateObj.state === this._config?.option
                ? "var(--sq-rgb-blue, 25, 125, 255)"
                : "var(--sq-inactive-rgb)";
        this._name = this._config?.option || "Unknown";
    }

    protected render(): TemplateResult {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };

        return html`
            <div class="container" @click=${this.selectOption}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }

    private selectOption(e: Event): void {
        e.stopPropagation();
        if (!this._config || !this._stateObj) return;

        this._running = true;
        this._icon = "hass:rotate-right";
        this._iconAnimation = "spin 1.0s linear infinite";
        this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";

        this._hass.callService("input_select", "select_option", {
            entity_id: this._entity,
            option: this._config.option,
        });

        const trigger = this._config.trigger;
        if (trigger && trigger.startsWith("input_button.")) {
            this._hass.callService("input_button", "press", {
                entity_id: trigger,
            });
        }

        setTimeout(() => {
            this._running = false;
            const menuTab = this._config?.menu_tab;
            if (menuTab !== undefined && menuTab >= 0 && menuTab <= 3) {
                const dialogConfig = { ...menuConfig(menuTab) };
                console.log(dialogConfig);
                window.browser_mod?.service("popup", dialogConfig);
            } else {
                window.browser_mod?.service("close_popup", {});
            }
        }, 1000);
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-option-tile",
    name: "SmartQasa Option Tile",
    preview: true,
    description: "A SmartQasa tile for displaying an Option of an Input Select entity.",
});
