import { css, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";

interface Config extends LovelaceCardConfig {
    entity: string;
    title?: string;
    background?: boolean;
}

@customElement("smartqasa-more-info-card")
export class MoreInfoCard extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 4;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles = css`
        .container {
            padding: var(--sq-card-padding);
            border: var(--sq-card-border);
            border-radius: var(--sq-card-border-radius);
            background-color: var(--sq-card-background-color);
        }

        .container-transparent {
            padding: 0;
            border-radius: var(--sq-card-border-radius);
            background-color: transparent;
        }

        .title {
            padding: 0.5rem 0.5rem 1rem 0.5rem;
            text-align: left;
            text-overflow: ellipsis;
            white-space: normal;
            font-weight: 400;
            font-size: var(--sq-primary-font-size);
            color: rgb(var(--sq-primary-font-rgb));
        }
    `;

    public setConfig(config: Config): void {
        this._config = config;
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
                    ${this._config.title ? html`<div class="title">${this._config.title}</div>` : nothing}
                    <more-info-content .hass=${this.hass} .stateObj=${this._stateObj}> </more-info-content>
                </div>
            </div>
        `;
    }
}
