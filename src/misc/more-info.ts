import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";

interface Config extends LovelaceCardConfig {
    category?: string;
    entity: string;
}

@customElement("smartqasa-more-info-dialog")
export class MoreInfoDialog extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private config?: Config;
    @state() private stateObj?: HassEntity;

    private entity?: string;

    setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config?.entity;
    }

    shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("config") && this.config) ||
            (changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj)
        );
    }

    protected render(): TemplateResult {
        return html`
            <div>
                <div class="card-content">
                    <more-info-content .hass=${this.hass} .stateObj=${this.stateObj}> </more-info-content>
                </div>
            </div>
        `;
    }

    getCardSize(): number {
        return 5;
    }
}

window.customCards.push({
    type: "smartqasa-more-info-dialog",
    name: "SmartQasa More Info Dialog",
    preview: true,
    description: "A SmartQasa dialog for showing More Info for an entity.",
});
