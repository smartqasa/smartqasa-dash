import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createThing } from "custom-card-helpers";

interface SmartQasaVerticalStackConfig extends LovelaceCardConfig {
    cards: LovelaceCardConfig[];
}
window.customCards.push({
    type: "smartqasa-vertical-stack",
    name: "SmartQasa Vertical Stack",
    preview: false,
    description: "A custom stack card that displays other cards.",
});

@customElement("smartqasa-vertical-stack")
class SmartQasaVerticalStack extends LitElement {
    @property({ attribute: false }) private _hass?: HomeAssistant;
    @property() private config?: SmartQasaVerticalStackConfig;
    private _cards: LovelaceCard[] = [];

    static get styles() {
        return css`
            .container {
                display: flex;
                flex-direction: column;
            }
        `;
    }

    public setConfig(config: SmartQasaVerticalStackConfig): void {
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

    protected firstUpdated() {
        if (this.config) {
            this._createCards();
        }
    }

    protected render() {
        return html` <div class="container">${this._cards.map((card) => html`<div>${card}</div>`)}</div> `;
    }

    set hass(hass: HomeAssistant) {
        this.hass = hass;
        this._cards.forEach((card) => {
            card.hass = hass;
        });
        this.requestUpdate();
    }

    get hass(): HomeAssistant {
        return this._hass!;
    }
}
