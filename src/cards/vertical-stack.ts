import { css, html, LitElement, PropertyValues } from "lit";
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
    @property({ attribute: false }) private hass!: HomeAssistant;
    @property() private _config?: Config;
    @state() private _cards: LovelaceCard[] = [];

    static get styles() {
        return css`
            .container {
                display: flex;
                flex-direction: column;
                padding: 1rem;
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

    protected updated(changedProps: PropertyValues) {
        if (changedProps.has("hass") || changedProps.has("_config")) {
            this._createCards();
        }
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

    protected render() {
        return html`
            <div class="container">
                ${this._cards.length > 0
                    ? this._cards.map((card) => html`<div>${card}</div>`)
                    : html`<p>No cards available</p>`}
            </div>
        `;
    }
}
