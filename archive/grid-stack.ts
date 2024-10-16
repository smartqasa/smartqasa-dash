import { css, html, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from '../src/types';
import { createElement } from '../src/utils/create-element';

interface Config extends LovelaceCardConfig {
    columns?: number;
    cards: LovelaceCardConfig[];
}

window.customCards.push({
    type: 'smartqasa-grid-stack',
    name: 'SmartQasa Grid Stack',
    preview: false,
    description:
        'A SmartQasa element that displays other cards in a grid layout.',
});

@customElement('smartqasa-grid-stack')
class VerticalStack extends LitElement {
    @property({ attribute: false }) private hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _columns: number = 3;
    @state() private _cards: LovelaceCard[] = [];

    static get styles() {
        return css`
            .container {
                display: grid;
                gap: 1rem;
            }
        `;
    }

    public setConfig(config: Config): void {
        if (!config.cards || !Array.isArray(config.cards)) {
            throw new Error("You need to define 'cards'");
        }

        this._config = { ...config };
        this._columns = config.columns || 3;
        this._createCards();
    }

    protected update(changedProps: PropertyValues) {
        if (changedProps.has('_config') && this._config) {
            this._createCards();
        }

        if (changedProps.has('hass') && this.hass) {
            this._cards.forEach((card) => {
                card.hass = this.hass;
            });
        }

        super.update(changedProps);
    }

    protected render() {
        if (!this._config || !this.hass || !Array.isArray(this._cards))
            return nothing;

        return html`
            <div class="container">
                ${this._cards.map(
                    (card) => html`<div class="element">${card}</div>`
                )}
            </div>
        `;
    }

    private _createCards() {
        if (!this._config || !this.hass) return;

        this._cards = this._config.cards.map((cardConfig) => {
            const card = createElement(cardConfig) as LovelaceCard;
            card.hass = this.hass;
            return card;
        });
    }
}
