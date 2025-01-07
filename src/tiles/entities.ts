import {
    CSSResult,
    html,
    LitElement,
    PropertyValues,
    TemplateResult,
    unsafeCSS,
} from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { LovelaceCard, LovelaceCardConfig } from '../types';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
    icon: string;
    name: string;
    entities: string[];
}

window.customCards.push({
    type: 'smartqasa-entities-tile',
    name: 'SmartQasa Entities Tile',
    preview: true,
    description:
        'A SmartQasa card for displaying a list of entities in a dialog.',
});

@customElement('smartqasa-entnties-tile')
export class EntntiesTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @state() private _config?: Config;

    private _icon: string = 'hass:help-rhombus';
    private _name: string = 'Unknown';

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        this._config = config;
    }

    protected render(): TemplateResult {
        const iconStyles = {
            color: 'rgb(var(--sq-unavailable-rgb))',
            backgroundColor: 'rgba(var(--sq-unavailable-rgb), var(--sq-icon-opacity, 0.2))',
        };
        return html`
            <div class="container" @click=${this._showDialog}>
                <div class="icon" style="${styleMap(this._iconStyles)}">
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                <div class="text">
                    <div class="name">${this._name}</div>
                </div>
            </div>
        `;
    }


    private _showDialog(e: Event) {
        e.stopPropagation();

        );
    }
}
