import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElement } from "../utils/create-element";

interface Config extends LovelaceCardConfig {
    entity: string; // Entity containing the 'entity_id' array
    card: LovelaceCardConfig; // Card configuration template
}

window.customCards.push({
    type: "smartqasa-group-stack",
    name: "SmartQasa Group Stack",
    preview: false,
    description: "A SmartQasa element that dynamically creates cards for entities in a group.",
});

@customElement("smartqasa-group-stack")
class GroupStack extends LitElement {
    @property({ attribute: false }) private hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _cards: LovelaceCard[] = [];

    static get styles() {
        return css`
            .container {
                display: flex;
                flex-direction: column;
            }
            .element:not(:last-child) {
                padding-bottom: 0.8rem;
            }
        `;
    }

    public setConfig(config: Config): void {
        if (!config.entity || !config.card) {
            throw new Error("Entity and card must be provided in the config.");
        }
        this._config = { ...config };
    }

    protected firstUpdated(changedProps: PropertyValues) {
        super.firstUpdated(changedProps);
        if (changedProps.has("_config") && this._config && this.hass) {
            const entity = this.hass!.states[this._config.entity];

            if (entity && entity.attributes.entity_id) {
                const entityIds = entity.attributes.entity_id as string[];

                // Generate a card for each entity ID, using the card template from the config
                this._cards = entityIds.map((entityId) => {
                    // Clone the card config and assign the current entity ID
                    const cardConfig = {
                        ...this._config!.card,
                        entity: entityId, // Pass the entity ID to the card config
                    };
                    // Create the Lovelace card element using the config
                    const card = createElement(cardConfig) as LovelaceCard;
                    card.hass = this.hass!;
                    return card;
                });
            }
        }
    }

    protected updated(changedProps: PropertyValues) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.hass) {
            this._cards.forEach((card) => {
                card.hass = this.hass!;
            });
        }
    }

    protected render() {
        if (!this._config || !this.hass || this._cards.length === 0) return nothing;
        return html`
            <div class="container">${this._cards.map((card) => html`<div class="element">${card}</div>`)}</div>
        `;
    }
}
