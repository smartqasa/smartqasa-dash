import { css, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElement } from "../utils/create-element";

interface Config extends LovelaceCardConfig {
    filter_type: "group" | "domain";
    filter_value: string;
    card_type: string;
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
        if (!config.filter_type || !config.filter_value || !config.card_type) {
            throw new Error("filter_type, filter_value, and card_type must be provided in the config.");
        }
        this._config = { ...config };
        this._cards = [];
    }

    protected willUpdate(changedProps: PropertyValues) {
        if ((changedProps.has("_config") || changedProps.has("hass")) && this._config && this.hass) {
            let entityIds: string[] = [];

            if (this._config.filter_type === "group") {
                const groupEntity = this.hass.states[this._config.filter_value];
                if (groupEntity && groupEntity.attributes.entity_id) {
                    entityIds = groupEntity.attributes.entity_id as string[];
                }
            } else if (this._config.filter_type === "domain") {
                const domain = this._config.filter_value;
                entityIds = Object.keys(this.hass.states).filter((entityId) => {
                    return entityId.startsWith(`${domain}.`);
                });
            }

            if (entityIds.length > 0) {
                const entityNameMap = entityIds.map((entityId) => {
                    const entity = this.hass!.states[entityId];
                    const friendlyName = entity?.attributes.friendly_name?.toLowerCase() || "";
                    return { entityId, friendlyName };
                });

                entityNameMap.sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));
                entityIds = entityNameMap.map((item) => item.entityId);

                this._cards = entityIds.map((entityId) => {
                    const cardConfig: LovelaceCardConfig = {
                        type: this._config!.card_type,
                        entity: entityId,
                    };
                    const card = createElement(cardConfig) as LovelaceCard;
                    card.hass = this.hass!;
                    return card;
                });
            } else {
                this._cards = [];
            }
        }
    }

    protected updated(changedProps: PropertyValues) {
        if (changedProps.has("hass") && this.hass) {
            this._cards.forEach((card) => {
                card.hass = this.hass!;
            });
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this.hass || this._cards.length === 0) return nothing;
        return html`
            <div class="container">${this._cards.map((card) => html`<div class="element">${card}</div>`)}</div>
        `;
    }
}
