import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElement } from "../utils/create-element";

interface Config extends LovelaceCardConfig {
    cards: LovelaceCardConfig[];
    align_right?: boolean;
}

window.customCards.push({
    type: "smartqasa-horizontal-stack",
    name: "SmartQasa Horizontal Stack",
    preview: false,
    description: "A SmartQasa element that displays other cards in a horizontal stack.",
});

@customElement("smartqasa-horizontal-stack")
class HorizontalStack extends LitElement {
    @property({ attribute: false }) private hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _cards: LovelaceCard[] = [];

    static get styles() {
        return css`
            .container {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
            }
            .container.align-right {
                justify-content: flex-end;
            }
            .element {
                padding-right: 0.8rem;
            }
            .container.align-right .element {
                padding-right: 0;
                padding-left: 0.8rem;
            }
            .element:last-child {
                padding-right: 0;
            }
            .container.align-right .element:last-child {
                padding-left: 0;
            }
        `;
    }

    public setConfig(config: Config): void {
        if (!config.cards || !Array.isArray(config.cards)) {
            throw new Error("You need to define 'cards'");
        }

        this._config = { ...config };
        this._createCards();
    }

    protected update(changedProps: PropertyValues) {
        if (changedProps.has("_config") && this._config) {
            this._createCards();
        }

        if (changedProps.has("hass") && this.hass) {
            this._cards.forEach((card) => {
                card.hass = this.hass;
            });
        }

        super.update(changedProps);
    }

    protected render() {
        if (!this._config || !this.hass || !Array.isArray(this._cards)) return nothing;

        const containerClass = this._config.align_right ? "container align-right" : "container";

        return html`
            <div class="${containerClass}">${this._cards.map((card) => html`<div class="element">${card}</div>`)}</div>
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