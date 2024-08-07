import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createCardElement } from "../utils/create-card-element"; // Adjust the import path as needed

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
class SmartQasaVerticalStack extends LitElement {
    @property({ attribute: false }) private _hass?: HomeAssistant;
    @property() private config?: SmartQasaVerticalStackConfig;
    private _cards: LovelaceCard[] = [];

    static get styles() {
        return css`
            .container {
                display: flex;
                flex-direction: column;
                gap: var(--vertical-stack-card-gap, var(--stack-card-gap, 8px));
            }
        `;
    }

    public setConfig(config: SmartQasaVerticalStackConfig): void {
        console.log("Setting config for SmartQasaVerticalStack:", config);
        if (!config.cards || !Array.isArray(config.cards)) {
            throw new Error("You need to define 'cards'");
        }

        this.config = config;
        this._createCards();
    }

    private _createCards() {
        if (!this._hass || !this.config) {
            console.warn("hass or config not available for creating cards.");
            return;
        }

        // Create each card element based on the configuration
        this._cards = this.config.cards.map((cardConfig, index) => {
            console.log(`Creating card element ${index} for config:`, cardConfig);
            return this._createCardElement(cardConfig);
        });

        console.log("Created cards:", this._cards);
    }

    private _createCardElement(cardConfig: LovelaceCardConfig): LovelaceCard {
        try {
            const element = createCardElement(cardConfig) as LovelaceCard;
            if (element) {
                element.hass = this._hass;
                console.log("Created element:", element);
            } else {
                console.error("Failed to create element for config:", cardConfig);
            }
            return element;
        } catch (error) {
            console.error("Error creating card element:", error);
            return undefined as unknown as LovelaceCard;
        }
    }

    protected firstUpdated() {
        if (this.config) {
            this._createCards();
        }
    }

    protected render() {
        console.log("Rendering stack with cards:", this._cards);
        return html` <div class="container">${this._cards.map((card) => html`<div>${card}</div>`)}</div> `;
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
