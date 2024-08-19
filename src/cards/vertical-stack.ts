import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createThing } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
    cards: LovelaceCardConfig[];
}

window.customCards.push({
    type: "smartqasa-vertical-stack-card",
    name: "SmartQasa Vertical Stack Card",
    preview: false,
    description: "A SmartQasa card that displays other cards in a vertical stack.",
});

@customElement("smartqasa-vertical-stack-card")
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
        if (!config.cards || !Array.isArray(config.cards)) {
            throw new Error("You need to define 'cards'");
        }

        this._config = { ...config };

        this._createCards();
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return changedProps.has("hass") || changedProps.has("_config");
    }

    protected render() {
        if (!this._config || !this.hass || !(this._cards.length > 0)) return html``;

        return html`
            <div class="container">${this._cards.map((card) => html`<div class="element">${card}</div>`)}</div>
        `;
    }
    private _createCards() {
        if (!this.hass || !this._config) {
            return;
        }

        this._cards = this._config.cards.map((cardConfig) => {
            const element = createThing(cardConfig) as LovelaceCard;
            element.hass = this.hass;
            return element;
        });
    }
}
