import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import styleTileBase from "../styles/tile-base";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
    option: string;
}

@customElement("smartqasa-option-tile")
export class OptionTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;
    @state() private _running: boolean = false;

    private _hass: any;
    private _icon: string = "hass:form-dropdown";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";
    static styles: CSSResultGroup = [styleTileBase];

    setConfig(config: Config): void {
        this._config = { ...config };
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!this._config?.entity || !hass) return;
        this._hass = hass;
        this.updateState();
    }

    private updateState(): void {
        if (this._running === true) return;

        this._stateObj = this._config?.entity ? this._hass.states[this._config.entity] : undefined;

        if (!this._stateObj) {
            this._icon = this._config?.icon || this._icon;
            this._iconColor = "var(--sq-unavailable-rgb)";
            this._name = this._name || "Unknown";
            return;
        }

        this._icon = this._config?.icon || this._stateObj.attributes?.icon || "hass:form-dropdown";
        this._iconAnimation = "none";
        this._iconColor =
            this._stateObj.state === this._config?.option
                ? "var(--sq-rgb-blue, 25, 125, 255)"
                : "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._stateObj.attributes?.friendly_name || this._stateObj.entity_id;
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
        if (!this._stateObj) return;

        this._running = true;
        this._icon = "hass:rotate-right";
        this._iconAnimation = "spin 1.0s linear infinite";
        this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";

        this._hass.callService("input_select", "select_option", {
            entity_id: this._stateObj.entity_id,
            option: this._config?.option,
        });

        setTimeout(() => {
            this._running = false;
            window.browser_mod?.service("close_popup", {});
        }, 2000);
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
