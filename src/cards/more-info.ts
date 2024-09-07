import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";

interface Config extends LovelaceCardConfig {
    entity: string;
    background: boolean;
}

window.customCards.push({
    type: "smartqasa-more-info-card",
    name: "SmartQasa More Info Card",
    preview: true,
    description: "A SmartQasa card for displaying More Info for an entity.",
});

@customElement("smartqasa-more-info-card")
export class MoreInfoCard extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;
    private _entity?: string;

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config?.entity;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            (changedProps.has("config") && this._config)
        );
    }

    protected updated(changedProps: PropertyValues): void {
        if (changedProps.has("hass") && this._entity) {
            this._stateObj = this.hass?.states[this._entity];
        }
    }

    protected render(): TemplateResult {
        if (!this.hass || !this._entity) return html``;

        // Dynamically set the background style
        const backgroundStyle = this._config?.background ? "var(--sq-card-background-color)" : "transparent";

        return html`
            <div>
                <div class="container" style="background-color: ${backgroundStyle};">
                    <more-info-content .hass=${this.hass} .stateObj=${this._stateObj}> </more-info-content>
                </div>
            </div>
        `;
    }
}
