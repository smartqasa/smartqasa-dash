import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { sequenceTable } from "../tables/light-sequences";
import { gridDialogStyle } from "../styles/dialog";

import { tileBaseStyle, tileStateStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

@customElement("smartqasa-pool-light-tile")
export class PoolLightTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _entity?: string;
    private _hass: any;
    private _icon: string = "hass:lightbulb";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = ["light", "switch"].includes(config.entity?.split(".")[0]) ? config.entity : undefined;
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!hass || !this._entity || hass.states[this._entity] === this._stateObj) {
            this._stateObj = undefined;
            return;
        }
        this._hass = hass;
        this._stateObj = hass.states[this._entity];
        this.updateState();
    }

    private updateState(): void {
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:lightbulb-alert";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }

        const state = this._stateObj.state || "unknown";
        this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:lightbulb";
        this._iconColor = state === "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || "Unknown";
        this._stateFmtd =
            this._hass.formatEntityState(this._stateObj) +
            (state === "on" && this._stateObj.attributes.brightness
                ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "brightness")
                : "");
    }

    protected render(): TemplateResult {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };

        return html`
            <div class="container" @click=${this.showColorList}>
                <div class="icon" @click=${this.toggleEntity} style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }

    private toggleEntity(e: Event): void {
        e.stopPropagation();
        if (!this._stateObj) return;

        this._hass.callService("homeassistant", "toggle", { entity_id: this._entity });
    }

    private showColorList(e: Event): void {
        e.stopPropagation();
        if (!this._stateObj) return;

        const cards = Object.keys(sequenceTable).map((key) => ({
            type: "custom:smartqasa-pool-sequencer-tile",
            entity: this._entity,
            sequence: key,
        }));
        const dialogConfig = {
            title: this._stateObj.attributes.friendly_name || this._stateObj.entity_id,
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

    getCardSize() {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-pool-light-tile",
    name: "SmartQasa Pool Light Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a pool color light or switch entity.",
});
