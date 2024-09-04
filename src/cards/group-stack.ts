import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElement } from "../utils/create-element";

interface Config extends LovelaceCardConfig {
    filter: "group" | "domain"; // Filter by group or domain
    group?: string; // Group entity for 'group' filter
    domain?: string; // Domain for 'domain' filter (e.g., 'climate', 'vacuum')
    card_type: string; // The type of card to create for each entity
}

window.customCards.push({
    type: "smartqasa-group-stack",
    name: "SmartQasa Group Stack",
    preview: false,
    description: "A SmartQasa element that dynamically creates cards for entities based on group or domain filtering.",
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
        if (
            !config.filter ||
            !config.card_type ||
            (config.filter === "group" && !config.group) ||
            (config.filter === "domain" && !config.domain)
        ) {
            throw new Error("Filter type, card_type, and either group or domain must be provided in the config.");
        }
        this._config = { ...config };
    }

    protected firstUpdated(changedProps: PropertyValues) {
        super.firstUpdated(changedProps);

        if (changedProps.has("_config") && this._config && this.hass) {
            let entityIds: string[] = [];

            if (this._config.filter === "group") {
                const groupEntity = this.hass!.states[this._config.group!];
                if (groupEntity && groupEntity.attributes.entity_id) {
                    entityIds = groupEntity.attributes.entity_id as string[];
                }
            } else if (this._config.filter === "domain") {
                const domain = this._config.domain!;
                // Filter all entities in Home Assistant by the specified domain
                entityIds = Object.keys(this.hass!.states).filter((entityId) => {
                    return entityId.startsWith(`${domain}.`);
                });
            }

            if (entityIds.length > 0) {
                // Sort the entities by friendly_name
                const entityNameMap = entityIds.map((entityId) => {
                    const entity = this.hass!.states[entityId];
                    const friendlyName = entity?.attributes.friendly_name?.toLowerCase() || "";
                    return { entityId, friendlyName };
                });

                entityNameMap.sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));

                // Update entityIds with the sorted order
                entityIds = entityNameMap.map((item) => item.entityId);

                // Create a card for each entity
                this._cards = entityIds.map((entityId) => {
                    const cardConfig: LovelaceCardConfig = {
                        type: this._config!.card_type,
                        entity: entityId,
                    };
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
