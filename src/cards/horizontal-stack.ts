import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createCards } from "../utils/create-cards";

interface Config extends LovelaceCardConfig {
    cards: LovelaceCardConfig[];
    justify_right?: boolean;
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
                align-items: start;
                justify-content: flex-start;
                margin-left: calc(var(--sq-chip-margin, 0.4rem) * -1);
            }
            .container.justify-right {
                justify-content: flex-end;
                margin-right: calc(var(--sq-chip-margin, 0.4rem) * -1);
            }
            .element {
                display: flex;
            }
        `;
    }

    public setConfig(config: Config): void {
        if (!config.cards || config.cards.length === 0) return;

        this._config = { ...config };
    }

    protected willUpdate(changedProps: PropertyValues): void {
        const hassChanged = changedProps.has("hass");
        const configChanged = changedProps.has("_config");

        if ((hassChanged || configChanged) && this._config) {
            if (this.hass && this._config.cards.length > 0) {
                this._cards = createCards(this._config.cards, this.hass) as LovelaceCard[];
            }
        }

        if (hassChanged && this._cards.length > 0) {
            this._cards.forEach((card) => {
                card.hass = this.hass;
            });
        }
    }

    protected render() {
        if (!this._config || !this.hass || this._cards.length === 0) return nothing;

        const containerClass = this._config.justify_right ? "container justify-right" : "container";

        return html`
            <div class="${containerClass}">${this._cards.map((card) => html`<div class="element">${card}</div>`)}</div>
        `;
    }
}
