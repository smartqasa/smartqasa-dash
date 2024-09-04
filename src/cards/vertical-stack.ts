import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElement } from "../utils/create-element";
import { createCards } from "../utils/create-cards";

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
class VerticalStack extends LitElement {
    @property({ attribute: false }) private hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _cards: LovelaceCard[] = [];

    static get styles() {
        return css`
            .container {
                display: flex;
                flex-direction: column;
            }
            .element:not(:last-child) {
                padding-bottom: 0.8rem;
            }
        `;
    }

    public setConfig(config: Config): void {
        if (!config.cards || !config.cards.length) {
            throw new Error("You need to define 'cards'");
        }

        this._config = { ...config };
    }

    protected firstUpdated(changedProps: PropertyValues) {
        super.firstUpdated(changedProps);
        if (changedProps.has("_config") && this._config && this.hass) {
            this._cards = createCards(this._config.tiles, this.hass) as LovelaceCard[];
        }
    }

    protected updated(changedProps: PropertyValues) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.hass) {
            this._cards.forEach((card) => {
                card.hass = this.hass;
            });
        }
    }

    protected render() {
        if (!this._config || !this.hass || !Array.isArray(this._cards)) return nothing;

        return html`
            <div class="container">${this._cards.map((card) => html`<div class="element">${card}</div>`)}</div>
        `;
    }
}
