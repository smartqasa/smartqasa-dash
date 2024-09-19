import { css, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElements } from "../utils/create-elements";

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
class HorizontalStack extends LitElement implements LovelaceCard {
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

    protected willUpdate(changedProps: PropertyValues) {
        if (changedProps.has("hass") && this._cards.length > 0) {
            this._cards.forEach((card) => {
                if (card.hass !== this.hass) card.hass = this.hass;
            });
        }

        if (changedProps.has("_config") && this._config) {
            this._createCards();
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this.hass || this._cards.length === 0) return nothing;

        const containerClass = this._config.justify_right ? "container justify-right" : "container";

        return html`
            <div class="${containerClass}">
                ${this._cards.map((card, index) => html`<div class="element" .key=${index}>${card}</div>`)}
            </div>
        `;
    }

    protected firstupdated(): void {
        if (!this._config || !this.hass) return;

        this._createCards();
    }

    private _createCards(): void {
        if (!this._config || !this.hass) return;

        if (this._config.cards.length > 0) {
            this._cards = createElements(this._config.cards, this.hass);
        } else {
            this._cards = [];
        }
    }
}
