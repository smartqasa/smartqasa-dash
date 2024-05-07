import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";

interface Config extends LovelaceCardConfig {
    entity: string;
}

window.customCards.push({
    type: "smartqasa-more-info-dialog",
    name: "SmartQasa More Info Dialog",
    preview: true,
    description: "A SmartQasa dialog for showing More Info for an entity.",
});

@customElement("smartqasa-more-info-dialog")
export class MoreInfoDialog extends LitElement {
    getCardSize(): number {
        return 6;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    private entity?: string;
    private stateObj?: HassEntity;

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config?.entity;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj) ||
            (changedProps.has("config") && this.config)
        );
    }

    protected render(): TemplateResult {
        this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
        return html`
            <div>
                <div class="container">
                    <more-info-content .hass=${this.hass} .stateObj=${this.stateObj}> </more-info-content>
                </div>
            </div>
        `;
    }
}
