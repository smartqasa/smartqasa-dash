import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElement } from "../utils/create-element";

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
    @state() private _cards: (LovelaceCard | typeof nothing)[] = [];

    static get styles() {
        return css`
            .container {
                display: flex;
                flex-direction: row;
                align-items: start;
                justify-content: flex-start;
            }
            .container.justify-right {
                justify-content: flex-end;
            }
            .element {
                display: flex;
            }
        `;
    }

    public setConfig(config: Config): void {
        if (!config.cards || !Array.isArray(config.cards)) {
            return;
        }

        this._config = { ...config };
        this._createCards();
    }

    protected update(changedProps: PropertyValues) {
        if ((changedProps.has("_config") && this._config) || (changedProps.has("hass") && this.hass)) {
            this._createCards();
        }
        /*
        if (changedProps.has("hass") && this.hass) {
            this._cards.forEach((card) => {
                if (card !== nothing) {
                    card.hass = this.hass;
                }
            });
        }
*/
        super.update(changedProps);
    }

    protected render() {
        if (!this._config || !this.hass || !Array.isArray(this._cards)) return nothing;

        const containerClass = this._config.justify_right ? "container justify-right" : "container";

        return html`
            <div class="${containerClass}">${this._cards.map((card) => html`<div class="element">${card}</div>`)}</div>
        `;
    }

    private _createCards() {
        if (!this._config || !this.hass) return;

        this._cards = this._config.cards.map((cardConfig, index) => {
            const card = createElement(cardConfig) as LovelaceCard;

            if (card) {
                card.hass = this.hass;

                requestAnimationFrame(() => {
                    const cardElement = card as HTMLElement;
                    const cardWidth = cardElement.offsetWidth;
                    if (cardWidth > 0) {
                        const marginProperty = this._config!.justify_right ? "marginLeft" : "marginRight";
                        cardElement.style[marginProperty] = "var(--sq-chip-spacing, 0.8rem)";
                    }
                });

                return card;
            }

            return nothing;
        });
    }
}
