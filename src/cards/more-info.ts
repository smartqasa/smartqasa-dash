import { css, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";

interface Config extends LovelaceCardConfig {
    entity: string;
    background?: boolean;
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
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles = css`
        .container {
            border: var(--sq-card-border, none);
            border-radius: var(--sq-card-border-radius, 1.5rem);
            padding: var(--sq-card-padding, 1rem);
            background-color: var(--sq-card-background-color, rgba(192, 192, 192, 0.5));
        }

        .container-transparent {
            border-radius: var(--sq-card-border-radius, 1.5rem);
            background-color: transparent;
            padding: var(--sq-card-padding, 1rem);
        }
    `;

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config?.entity;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected willUpdate(changedProps: PropertyValues): void {
        if (changedProps.has("hass") && this.hass && this._entity) {
            this._stateObj = this.hass.states[this._entity];
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this.hass || !this._stateObj) return nothing;

        const containerClass = this._config.background ? "container" : "container-transparent";

        return html`
            <div>
                <div class="${containerClass}">
                    <more-info-content .hass=${this.hass} .stateObj=${this._stateObj}> </more-info-content>
                </div>
            </div>
        `;
    }
}