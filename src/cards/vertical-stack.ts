import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElements } from "../utilities/create-elements";

interface Config extends LovelaceCardConfig {
    cards: LovelaceCardConfig[];
}

window.customCards.push({
    type: "smartqasa-vertical-stack",
    name: "SmartQasa Vertical Stack",
    preview: false,
    description: "A SmartQasa element that displays other cards in a vertical stack.",
});

@customElement("smartqasa-vertical-stack")
class VerticalStack extends LitElement implements LovelaceCard {
    public getCardSize(): number {
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
        if (!config.cards) {
            this._config = { ...config, cards: [] };
        } else {
            this._config = { ...config };
        }
    }

    protected render() {
        if (!this._config || !this.hass || this._cards.length === 0) return nothing;
        return html` <div class="container">${this._cards.map((card) => html`<div class="card">${card}</div>`)}</div> `;
    }

    protected firstupdated(): void {
        this._createCards();
    }

    protected updated(changedProps: PropertyValues) {
        if (changedProps.has("hass") && this.hass && this._cards.length > 0) {
            this._cards.forEach((card) => {
                if (card.hass !== this.hass) card.hass = this.hass;
            });
        }

        if (changedProps.has("_config")) {
            this._createCards();
        }
    }

    private _createCards(): void {
        if (!this._config || !this.hass) return;

        if (this._config.cards.length > 0) {
            this._cards = createElements(this._config.cards, this.hass);
        } else {
            this._cards = [];
        }
    }
}
