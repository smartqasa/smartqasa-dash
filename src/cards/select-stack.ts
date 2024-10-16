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
    entity: string;
}

window.customCards.push({
    type: 'smartqasa-select-stack',
    name: 'SmartQasa Select Stack',
    preview: false,
    description:
        'A SmartQasa element that lists select entity options in a stack.',
});

@customElement('smartqasa-select-stack')
class GroupStack extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 4;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _tiles: LovelaceCard[] = [];
    private _tileType: string = '';

    static get styles() {
        return css`
            .container {
                display: flex;
                flex-direction: column;
            }
            .tile {
                height: var(--sq-tile-height);
            }
            .tile:not(:last-child) {
                padding-bottom: var(--sq-tile-spacing);
            }
        `;
    }

    public setConfig(config: Config): void {
        if (!config.filter_type || !config.filter_value || !config.tile_type) {
            throw new Error(
                'filter_type, filter_value, and card_type must be provided in the config.'
            );
        }
        this._config = config;
        this._tileType = config.tile_type;
    }

    protected willUpdate(changedProps: PropertyValues) {
        if (!this._config || !this.hass) return;

        if (changedProps.has('_config')) {
            this._createTiles();
        } else if (changedProps.has('hass') && this._tiles.length > 0) {
            this._tiles.forEach((tile) => {
                if (tile.hass !== this.hass) tile.hass = this.hass;
            });
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this.hass || this._tiles.length === 0) return nothing;

        return html`
            <div class="container">
                ${this._tiles.map(
                    (tile) => html`<div class="tile">${tile}</div>`
                )}
            </div>
        `;
    }

    protected updated(changedProps: PropertyValues) {
        if (changedProps.has('hass') && this.hass) {
            this._tiles.forEach((tile) => {
                if (this.hass !== tile.hass) tile.hass = this.hass!;
            });
        }
    }

    private _createTiles() {
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
                const entity = this.hass!.states[entityId];
                const friendlyName =
                    entity?.attributes.friendly_name?.toLowerCase() || '';
                return { entityId, friendlyName };
            });

            entityNameMap.sort((a, b) =>
                a.friendlyName.localeCompare(b.friendlyName)
            );
            entityIds = entityNameMap.map((item) => item.entityId);

            this._tiles = entityIds.map((entityId) => {
                const tileConfig: LovelaceCardConfig = {
                    type: this._config!.tile_type,
                    entity: entityId,
                };
                const tile = createElement(
                    tileConfig,
                    this.hass
                ) as LovelaceCard;
                return tile;
            });
        } else {
            this._tiles = [];
        }
    }
}
