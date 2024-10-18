import {
    css,
    html,
    LitElement,
    nothing,
    PropertyValues,
    TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from '../types';
import { deviceType } from '../utilities/device-info';
import { createElements } from '../utilities/create-elements';

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
export class GridStack extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 10;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _cards: LovelaceCard[] = [];

    static get styles() {
        return css`
            .container {
                display: grid;
                grid-auto-rows: var(--sq-tile-height);
                gap: var(--sq-card-spacing);
            }
            .card {
                min-height: var(--sq-tile-height);
            }
        `;
    }

    public setConfig(config: Config): void {
        if (!config.cards || config.cards.length === 0) {
            throw new Error('No card configurations provided.');
        }
        this._config = config;
    }

    protected willUpdate(changedProps: PropertyValues) {
        if (!this.hass) return;

        if (changedProps.has('_config')) {
            this._createCards();
        } else if (
            changedProps.has('hass') &&
            this.hass &&
            this._cards.length > 0
        ) {
            this._cards.forEach((card) => {
                if (card.hass !== this.hass) card.hass = this.hass;
            });
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this.hass || this._cards.length === 0)
            return nothing;
        const columns = this._config.columns || 3;
        const gridStyle = {
            gridTemplateColumns:
                deviceType === 'phone'
                    ? `1fr 1fr`
                    : `repeat(${columns}, var(--sq-tile-width, 19.5rem))`,
        };

        return html`
            <div class="container" style=${styleMap(gridStyle)}>
                ${this._cards.map(
                    (card) => html`<div class="element">${card}</div>`
                )}
            </div>
        `;
    }

    private async _createCards(): Promise<void> {
        if (!this._config || !this.hass) return;

        if (this._config.cards.length > 0) {
            try {
                this._cards = createElements(this._config.cards, this.hass);
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
