import { CSSResult, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { callService } from "../utilities/call-service";
import { sequenceTable } from "../tables/pool-light-sequences";

import tileStyle from "../css/tile.css";

interface Config extends LovelaceCardConfig {
    sequence: string;
    entity: string;
}

@customElement("smartqasa-pool-light-sequencer-tile")
export class PoolLightSequencerTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _running: boolean = false;

    private _sequenceObj?: any;
    private _stateObj?: HassEntity;
    private _entity?: string;
    private _icon: string = "hass:lightbulb";
    private _iconStyles: Record<string, string> = {};
    private _name: string = "Unknown Light";

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._sequenceObj = config.sequence ? sequenceTable[config.sequence] : undefined;
        this._entity = ["light", "switch"].includes(this._config.entity?.split(".")[0])
            ? this._config.entity
            : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this._sequenceObj) return nothing;
        return html`
            <div class="container" @click=${this._runRoutine}>
                <div class="icon" style="${styleMap(this._iconStyles)}">
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                <div class="this._name">${this._name}</div>
            </div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        let icon, iconAnimation, iconColor, name;
        if (this._config && this._sequenceObj && this._stateObj) {
            if (this._running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            } else {
                icon = this._config.icon || this._stateObj.attributes.icon || "hass:lightbulb";
                iconAnimation = "none";
                iconColor = this._sequenceObj.iconRGB || "var(--sq-inactive-rgb)";
            }
            name = this._sequenceObj.name || "Light";
        } else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = "Unknown";
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
        this._icon = icon;
        this._name = name;
    }

    private async _runRoutine(e: Event): Promise<void> {
        e.stopPropagation();
        if (!this.hass || !this._stateObj) return;

        this._running = true;

        await callService(this.hass, "script", "system_color_light_sequence_selector", {
            entity: this._entity,
            count: this._sequenceObj.count,
        });

        setTimeout(() => {
            this._running = false;
        }, 2000);
    }
}
