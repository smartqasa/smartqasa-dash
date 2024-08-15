import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createThing } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
    cards: LovelaceCardConfig[];
}

window.customCards.push({
    type: "smartqasa-vertical-stack",
    name: "SmartQasa Vertical Stack",
    preview: false,
    description: "A custom stack card that displays other cards.",
});

@customElement("smartqasa-vertical-stack")
class VerticalStack extends LitElement {
    @property({ attribute: false }) private _hass?: HomeAssistant;
    @property() private config?: Config;
    @state() private _cards: LovelaceCard[] = [];

    static get styles() {
        return css`
            .container {
                display: flex;
                flex-direction: column;
            }
        `;
    }

    public setConfig(config: Config): void {
        if (!config.cards || !Array.isArray(config.cards)) {
            throw new Error("You need to define 'cards'");
        }

        this.config = config;
        this._createCards();
    }

    private _createCards() {
        if (!this._hass || !this.config) {
            return;
        }

        this._cards = this.config.cards.map((cardConfig) => {
            const element = createThing(cardConfig) as LovelaceCard;
            element.hass = this._hass;
            return element;
        });
    }

    protected render() {
        return html`
            <div class="container">
                ${this._cards.length > 0
                    ? this._cards.map((card) => html`<div>${card}</div>`)
                    : html`<p>No cards available</p>`}
            </div>
        `;
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;
        this._cards.forEach((card) => {
            card.hass = hass;
        });
        this.requestUpdate();
    }

    get hass(): HomeAssistant {
        return this._hass!;
    }
}
