import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import sequenceTable from "../tables/light-sequences";

import { tileBaseStyle, tileStateStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    sequence: string;
    entity: string;
    icon?: string;
    name?: string;
}

@customElement("smartqasa-sequencer-tile")
export class SequencerTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;
    @state() private _running: boolean = false;

    private _sequenceObj?: any;
    private _entity?: string;
    private _hass: any;
    private _icon: string = "hass:help-rhombus";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle, tileIconSpinStyle];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._sequenceObj = this._config.sequence ? sequenceTable[this._config.sequence] : undefined;
        this._entity = ["light", "switch"].includes(this._config.entity?.split(".")[0])
            ? this._config.entity
            : undefined;
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!hass || !this._entity || hass.states[this._entity] === this._stateObj) return;
        this._hass = hass;
        this._stateObj = hass.states[this._entity];
        this.updateState();
    }

    private updateState(): void {
        if (this._running === true) return;

        if (!this._sequenceObj || !this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:alert-rhombus";
            this._iconAnimation = "none";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._sequenceObj.name || "Unknown";
            this._stateFmtd = "Invalid!";
            return;
        }

        this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:help-circle";
        this._iconAnimation = "none";
        this._iconColor = this._sequenceObj.iconRGB || "var(--sq-inactive-rgb)";
        this._name = this._sequenceObj.name || "Unknown";
        this._stateFmtd = this._hass ? this._hass.formatEntityState(this._stateObj) : "Unknown";
    }

    render(): TemplateResult {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };

        return html`
            <div class="container" @click=${this.runRoutine}>
                <div class="icon" style="${styleMap(iconStyles)}" @click=${this.toggleEntity}>
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

    private runRoutine(e: Event): void {
        e.stopPropagation();
        if (!this._config || !this._stateObj) return;

        this._running = true;
        this._icon = "hass:rotate-right";
        this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
        this._iconAnimation = "spin 1.0s linear infinite";

        this._hass.callService("script", "system_color_light_sequence_selector", {
            entity: this._entity,
            count: this._sequenceObj.count,
        });

        setTimeout(() => {
            this._running = false;
            this.updateState();
        }, 2000);
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-sequence-tile",
    name: "SmartQasa Light Sequencer Tile",
    preview: true,
    description: "A SmartQasa tile for controlling Light Sequence entities.",
});
