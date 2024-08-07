import { LitElement, html, css, CSSResultGroup, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createCardElement } from "../utils/create-card-element";

interface SmartQasaVerticalStackConfig extends LovelaceCardConfig {
    cards: LovelaceCardConfig[];
}

(window as any).customCards.push({
    type: "smartqasa-vertical-stack",
    name: "SmartQasa Vertical Stack",
    preview: false,
    description: "A custom stack card that displays other cards.",
});

@customElement("smartqasa-vertical-stack")
class SmartQasaVerticalStack extends LitElement implements LovelaceCard {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @property({ type: Boolean }) public preview = false;
    @state() protected _cards?: LovelaceCard[];
    @state() protected _config?: SmartQasaVerticalStackConfig;

    static get styles(): CSSResultGroup {
        return css`
            .container {
                display: flex;
                flex-direction: column;
                gap: var(--vertical-stack-card-gap, var(--stack-card-gap, 8px));
            }
            .card-header {
                color: var(--ha-card-header-color, var(--primary-text-color));
                text-align: var(--ha-stack-title-text-align, start);
                font-family: var(--ha-card-header-font-family, inherit);
                font-size: var(--ha-card-header-font-size, 24px);
                font-weight: normal;
                margin-block-start: 0px;
                margin-block-end: 0px;
                letter-spacing: -0.012em;
                line-height: 32px;
                display: block;
                padding: 24px 16px 16px;
            }
        `;
    }

    public getCardSize(): number | Promise<number> {
        return 1;
    }

    public setConfig(config: SmartQasaVerticalStackConfig): void {
        if (!config || !config.cards || !Array.isArray(config.cards)) {
            throw new Error("Invalid configuration");
        }
        this._config = config;
        if (this.hass) {
            this._createCards();
        }
    }

    protected update(changedProperties: Map<string, any>) {
        super.update(changedProperties);

        if (this._cards) {
            if (changedProperties.has("hass")) {
                this._cards.forEach((card) => {
                    card.hass = this.hass;
                });
            }
            if (changedProperties.has("preview")) {
                this._cards.forEach((card) => {
                    card.preview = this.preview;
                });
            }
        }
    }

    private _createCards() {
        if (!this._config || !this.hass) return;

        this._cards = this._config.cards.map((cardConfig) => {
            const element = createCardElement(cardConfig) as LovelaceCard;
            if (element) {
                element.hass = this.hass;
                element.preview = this.preview;
            }
            return element;
        });
    }

    protected render() {
        if (!this._config || !this._cards) {
            return nothing;
        }

        return html`
            <div class="container">
                ${this._config.title ? html`<h1 class="card-header">${this._config.title}</h1>` : ""}
                <div id="root">${this._cards.map((card) => html`<div>${card}</div>`)}</div>
            </div>
        `;
    }
}
