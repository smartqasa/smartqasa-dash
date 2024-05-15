import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";
import { sequenceTable } from "../tables/pool-light-sequences";

import { tileBaseStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    sequence: string;
    entity: string;
}

@customElement("smartqasa-pool-light-sequencer-tile")
export class PoolLightSequencerTile extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    @state() private running: boolean = false;
    private sequenceObj?: any;
    private stateObj?: any;

    private entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileIconSpinStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.sequenceObj = config.sequence ? sequenceTable[config.sequence] : undefined;
        this.entity = ["light", "switch"].includes(this.config.entity?.split(".")[0]) ? this.config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("config") && this.config) ||
            (changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj)
        );
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
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

        this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

        if (this.config && this.sequenceObj && this.stateObj) {
            if (this.running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            } else {
                icon = this.config.icon || this.stateObj.attributes.icon || "hass:lightbulb";
                iconAnimation = "none";
                iconColor = this.sequenceObj.iconRGB || "var(--sq-inactive-rgb)";
            }
            name = this.sequenceObj.name || "Unknown";
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
        if (!this.hass || !this.config || !this.stateObj) return;

        this.running = true;

        await callService(this.hass, "script", "system_color_light_sequence_selector", {
            entity: this.entity,
            count: this.sequenceObj.count,
        });

        setTimeout(() => {
            this.running = false;
        }, 2000);
    }
}
