import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service-new";
import { sequenceTable } from "../tables/pool-light-sequences";

import { tileBaseStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    sequence: string;
    entity: string;
}

@customElement("smartqasa-pool-light-sequencer-tile")
export class PoolLightSequencerTile extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _running: boolean = false;
    private _sequenceObj?: any;
    private _stateObj?: HassEntity;
    private _entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

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

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this.runRoutine}>
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
            name = this._sequenceObj.name || "Unknown";
        } else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name };
    }

    private async runRoutine(e: Event): Promise<void> {
        e.stopPropagation();
        if (!this.hass || !this._stateObj) return;

        this._running = true;

        await callService(this, "script", "system_color_light_sequence_selector", {
            entity: this._entity,
            count: this._sequenceObj.count,
        });

        setTimeout(() => {
            this._running = false;
        }, 2000);
    }
}
