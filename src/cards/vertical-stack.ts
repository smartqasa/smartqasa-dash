import { css, html, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from '../types';
import { createElements } from '../utilities/create-elements';

interface Config extends LovelaceCardConfig {
    cards: LovelaceCardConfig[];
}

window.customCards.push({
    type: 'smartqasa-vertical-stack',
    name: 'SmartQasa Vertical Stack',
    preview: false,
    description:
        'A SmartQasa element that displays other cards in a vertical stack.',
});

@customElement('smartqasa-vertical-stack')
export class VerticalStack extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _cards: LovelaceCard[] = [];

    static get styles() {
        return css`
            .container {
                display: flex;
                flex-direction: column;
            }
            .card {
                height: var(--sq-tile-height);
            }
            .card:not(:last-child) {
                padding-bottom: var(--sq-tile-spacing);
            }
        `;
    }

    public setConfig(config: Config) {
        if (!config) throw new Error('Invalid configuration object');

        if (!Array.isArray(config.cards) || config.cards.length === 0) {
            console.warn('No cards defined in configuration');
            return;
        }

        this._config = config;
    }

    protected willUpdate(changedProps: PropertyValues) {
        if (!this._config || !this.hass) return;

        if (changedProps.has('_config')) {
            this._createCards();
        } else if (changedProps.has('hass') && this._cards.length > 0) {
            this._cards.forEach((card) => {
                if (card.hass !== this.hass) card.hass = this.hass;
            });
        }
    }

    protected render() {
        if (!this._config || !this.hass || this._cards.length === 0)
            return nothing;

        return html`
            <div class="container">
                ${this._cards.map(
                    (card) => html`<div class="card">${card}</div>`
                )}
            </div>
        `;
    }

    private async _createCards(): Promise<void> {
        if (!this._config || !this.hass) return;

        if (this._config.cards.length > 0) {
            try {
                this._cards = await createElements(
                    this._config.cards,
                    this.hass
                );
            } catch (error) {
                this._cards = [];
                console.error('Error creating cards:', error);
            }
        } else {
            this._cards = [];
            console.warn('No cards defined in configuration');
        }
    }
}
