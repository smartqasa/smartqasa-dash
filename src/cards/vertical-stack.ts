import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElements } from "../utils/create-elements";

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
            .hui-card:not(:last-child) {
                padding-bottom: 0.8rem;
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

    protected willUpdate(changedProps: PropertyValues) {
        const hassChanged = changedProps.has("hass");
        const configChanged = changedProps.has("_config");

        if ((hassChanged || configChanged) && this._config) {
            if (this.hass && this._config.cards.length > 0) {
                this._cards = createElements(this._config.cards, this.hass);
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
        return html` <div class="container">${this._cards.map((card) => html`<hui-card>${card}</hui-card>`)}</div> `;
    }
}
