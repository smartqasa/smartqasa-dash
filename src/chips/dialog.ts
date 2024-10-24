import {
    CSSResultGroup,
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
    DialogEntry,
    HassEntity,
    HomeAssistant,
    LovelaceCard,
    LovelaceCardConfig,
} from '../types';
import { dialogTable } from '../dialogs/dialog-table';
import { dialogPopup } from '../dialogs/dialog-popup';

import chipBaseStyle from '../css/chip-base.css';
import chipTextStyle from '../css/chip-text.css';

interface Config extends LovelaceCardConfig {
    dialog: keyof typeof dialogTable;
    label?: string;
}

window.customCards.push({
    type: 'smartqasa-dialog-chip',
    name: 'SmartQasa Dialog Chip',
    preview: true,
    description: 'A SmartQasa chip for displaying a dialog.',
});

@customElement('smartqasa-dialog-chip')
export class DialogChip extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;

    private _dialog?: keyof typeof dialogTable;
    private _dialogObj?: DialogEntry;
    private _entity?: string;
    private _icon: string = 'hass:message-outline';
    private _label?: string;
    private _stateObj?: HassEntity;

    static get styles(): CSSResultGroup {
        return [unsafeCSS(chipBaseStyle), unsafeCSS(chipTextStyle)];
    }

    public setConfig(config: Config): void {
        if (!config.dialog) return;

        this._config = config;
        this._dialog = this._config.dialog;
        this._dialogObj = dialogTable[this._dialog];

        this._entity = this._dialogObj?.entity;
        this._icon = this._dialogObj?.icon || 'hass:help-alert';
        this._label = this._config.label || '';
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has('hass') &&
                this._entity &&
                this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has('_config')
        );
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this._dialogObj) return nothing;

        this._stateObj = this._entity
            ? this.hass?.states[this._entity]
            : undefined;

        const state = this._stateObj?.state || 'unknown';
        const display =
            (this._dialog === 'garages' && state === 'closed') ||
            (this._dialog === 'locks' && state === 'locked') ||
            (this._dialog === 'sensors_doors' && state === 'off') ||
            (this._dialog === 'sensors_windows' && state === 'off')
                ? 'none'
                : 'flex';
        const containerStyles = {
            display: `${display}`,
        };

        const iconStyles = {
            color: this._dialogObj.color || 'rgb(var(--sq-orange-rgb))',
            paddingRight: this._label
                ? 'calc(var(--sq-chip-padding) / 2)'
                : 'var(--sq-chip-padding)',
        };

        return html`
            <div
                class="container"
                style="${styleMap(containerStyles)}"
                @click=${this._showDialog}
            >
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                ${this._label
                    ? html`<div class="text">${this._label}</div>`
                    : nothing}
            </div>
        `;
    }

    private _showDialog(e: Event): void {
        e.stopPropagation();
        if (!this._dialogObj) return;

        dialogPopup(this._dialogObj.data);
    }
}
