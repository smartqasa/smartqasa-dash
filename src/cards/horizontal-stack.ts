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
    @state() private _cards: LovelaceCard[] = [];

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

        const containerClass = this._config.justify_right ? "container justify-right" : "container";

        return html`
            <div class="${containerClass}">${this._cards.map((card) => html`<div class="element">${card}</div>`)}</div>
        `;
    }

    private _createCards() {
        if (!this._config || !this.hass) return;
        let justifyRight = this._config.justify_right;

        this._cards = this._config.cards.map((cardConfig) => {
            const card = createElement(cardConfig) as LovelaceCard;

            card.hass = this.hass;

            requestAnimationFrame(() => {
                const cardElement = card as HTMLElement;
                cardElement.style[justifyRight ? "marginLeft" : "marginRight"] = "var(--sq-chip-spacing, 0.8rem)";
                const cardWidth = cardElement.offsetWidth || 0;
                cardElement.style.display = cardWidth === 0 ? "none" : "flex";
            });

            return card;
        });
    }
}
