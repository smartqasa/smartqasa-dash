import {
    css,
    html,
    LitElement,
    nothing,
    PropertyValues,
    TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from '../types';
import { createElement } from '../utilities/create-element';

interface Config extends LovelaceCardConfig {
    filter_type: 'group' | 'domain';
    filter_value: string;
    tile_type: string;
}

window.customCards.push({
    type: 'smartqasa-group-stack',
    name: 'SmartQasa Group Stack',
    preview: false,
    description:
        'A SmartQasa element that dynamically creates cards for entities based on group or domain filtering.',
});

@customElement('smartqasa-group-stack')
export class GroupStack extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 4;
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
            .card {
                height: var(--sq-tile-height);
            }
            .card:not(:last-child) {
                padding-bottom: var(--sq-tile-spacing);
            }
        `;
    }

    public setConfig(config: Config): void {
        if (!config.filter_type || !config.filter_value || !config.tile_type) {
            throw new Error(
                'filter_type, filter_value, and tile_type must be provided in the config.'
            );
        }
        this._config = config;
    }

    protected willUpdate(changedProps: PropertyValues) {
        if (!this._config || !this.hass) return;

        if (changedProps.has('_config')) {
            this._createCards();
        } else if (
            changedProps.has('hass') &&
            this.hass &&
            this._cards.length > 0
        ) {
            this._cards.forEach((card) => {
                if (card.hass !== this.hass) card.hass = this.hass;
            });
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this.hass || this._cards.length === 0) return nothing;

        return html`
            <div class="container">
                ${this._cards.map(
                    (card, index) => html`
                        <div class="card" .key=${index}>${card}</div>
                    `
                )}
            </div>
        `;
    }

    private _createCards(): void {
        if (!this._config || !this.hass) return;

        let entityIds: string[] = [];
        if (this._config.filter_type === 'group') {
            const groupEntity = this.hass.states[this._config.filter_value];
            if (groupEntity && groupEntity.attributes.entity_id) {
                entityIds = groupEntity.attributes.entity_id as string[];
            }
        } else if (this._config.filter_type === 'domain') {
            const domain = this._config.filter_value;
            entityIds = Object.keys(this.hass.states).filter((entityId) => {
                return entityId.startsWith(`${domain}.`);
            });
        }

        if (entityIds.length > 0) {
            const entityNameMap = entityIds.map((entityId) => {
                const entityObj = this.hass!.states[entityId];
                const friendlyName =
                    entityObj?.attributes.friendly_name?.toLowerCase() || '';
                return { entityId, friendlyName };
            });

            entityNameMap.sort((a, b) =>
                a.friendlyName.localeCompare(b.friendlyName)
            );
            entityIds = entityNameMap.map((item) => item.entityId);

            this._cards = entityIds.map((entityId) => {
                const cardConfig: LovelaceCardConfig = {
                    type: this._config!.tile_type,
                    entity: entityId,
                    callingDialog: this._config!.callingDialog,
                };
                const card = createElement(
                    cardConfig,
                    this.hass
                ) as LovelaceCard;
                return card;
            });
        } else {
            this._cards = [];
        }
    }
}
