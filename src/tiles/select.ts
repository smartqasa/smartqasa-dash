import {
    CSSResult,
    html,
    LitElement,
    nothing,
    PropertyValues,
    TemplateResult,
    unsafeCSS,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import {
    HassEntity,
    HomeAssistant,
    LovelaceCard,
    LovelaceCardConfig,
} from '../types';
import { selectOptionDialog } from '../dialogs/select-option-dialog';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
    entity: string;
    trigger?: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: 'smartqasa-select-tile',
    name: 'SmartQasa Select Tile',
    preview: true,
    description: 'A SmartQasa tile for displaying an Input Select entity.',
});

@customElement('smartqasa-select-tile')
export class SelectTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;
    private _icon: string = 'hass:form-dropdown';
    private _iconStyles: Record<string, string> = {};
    private _name: string = 'Unknown Select';
    private _stateFmtd: string = 'Unknown State';

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        if (!config.entity?.startsWith('input_select.')) {
            console.error(
                'Invalid input_select entity provided in the config.'
            );
            this._entity = undefined;
        } else {
            this._entity = config.entity;
        }
        this._config = config;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has('hass') &&
                this._entity &&
                this.hass?.states[this._entity] !== this._stateObj) ||
            (changedProps.has('_config') && this._config)
        );
    }

    protected willUpdate(changedProps: PropertyValues): void {
        super.willUpdate(changedProps);
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        return html`
            <div class="container" @click=${this._showOptions}>
                <div class="icon" style="${styleMap(this._iconStyles)}">
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                <div class="text">
                    <div class="name">${this._name}</div>
                    <div class="state">${this._stateFmtd}</div>
                </div>
            </div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity
            ? this.hass?.states[this._entity]
            : undefined;

        let icon, iconColor, name, stateFmtd;
        if (this._config && this.hass && this._stateObj) {
            icon =
                this._config.icon ||
                this._stateObj.attributes?.icon ||
                'hass:form-dropdown';
            iconColor = 'var(--sq-inactive-rgb)';
            name =
                this._config.name ||
                this._stateObj.attributes?.friendly_name ||
                'Select List';
            stateFmtd =
                this.hass.formatEntityState(this._stateObj) || 'Unknown';
        } else {
            icon = this._config?.icon || 'hass:form-dropdown';
            iconColor = 'var(--sq-unavailable-rgb, 255, 0, 255)';
            name = this._config?.name || 'Unknown';
            stateFmtd = 'Unknown';
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
        };
        this._icon = icon;
        this._name = name;
        this._stateFmtd = stateFmtd;
    }

    private _showOptions(e: Event): void {
        e.stopPropagation();
        selectOptionDialog(this._config, this._stateObj);
    }
}
