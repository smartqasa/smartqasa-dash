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

import { HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import { moreInfoDialog } from '../dialogs/more-info-dialog';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
    category?: string;
    entity: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: 'smartqasa-sensor-tile',
    name: 'SmartQasa Sensor Tile',
    preview: true,
    description: 'A SmartQasa tile for observing a binary_sensor entity.',
});

@customElement('smartqasa-sensor-tile')
export class SensorTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;
    private _iconStyles: Record<string, string> = {};
    private _iconTemplate?: TemplateResult;
    private _name: string = 'Unknown Sensor';
    private _stateFmtd: string = 'Unknown State';

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        if (!config.entity?.startsWith('binary_sensor.')) {
            console.error(
                'Invalid binary_sensor entity provided in the config.'
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
            changedProps.has('_config')
        );
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        return html`
            <div class="container" @click=${this._showMoreInfo}>
                <div class="icon" style="${styleMap(this._iconStyles)}">
                    ${this._iconTemplate}
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

        let iconTemplate, iconColor, name, stateFmtd;
        if (this._stateObj) {
            if (!this._config!.icon) {
                iconTemplate = html`<ha-state-icon
                    .hass=${this.hass}
                    .stateObj=${this._stateObj}
                ></ha-state-icon>`;
            } else {
                iconTemplate = html`<ha-icon
                    icon=${this._config!.icon}
                ></ha-icon>`;
            }
            iconColor =
                this._stateObj.state === 'on'
                    ? 'var(--sq-binary_sensor-on-rgb)'
                    : 'var(--sq-inactive-rgb)';
            name =
                this._config!.name ||
                this._stateObj.attributes.friendly_name ||
                'Sensor';
            stateFmtd = this.hass!.formatEntityState(this._stateObj);
        } else {
            iconTemplate = html`<ha-icon icon="hass:leak"></ha-icon>`;
            iconColor = 'var(--sq-unavailable-rgb)';
            name = this._config!.name || 'Unknown';
            stateFmtd = 'Unknown';
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
        };
        this._iconTemplate = iconTemplate;
        this._name = name;
        this._stateFmtd = stateFmtd;
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._stateObj, this._config?.callingDialog);
    }
}
