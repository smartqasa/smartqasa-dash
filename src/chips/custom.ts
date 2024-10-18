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
    HassEntity,
    HomeAssistant,
    LovelaceCard,
    LovelaceCardConfig,
} from '../types';
import { loadYamlAsJson } from '../utilities/load-yaml-as-json';

import chipBaseStyle from '../css/chip-base.css';
import chipTextStyle from '../css/chip-text.css';

interface Config extends LovelaceCardConfig {
    dialog_file: string;
}

interface DialogObj {
    icon: string;
    icon_rgb?: string;
    entity?: string;
    entity_type?: string;
    data: any;
}

window.customCards.push({
    type: 'smartqasa-custom-chip',
    name: 'SmartQasa Custom Chip',
    preview: true,
    description: 'A SmartQasa chip for custom configurations.',
});

@customElement('smartqasa-custom-chip')
export class CustomChip extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _dialogObj?: DialogObj;
    @state() private _stateObj?: HassEntity;

    private _entity?: string;

    static get styles(): CSSResultGroup {
        return [unsafeCSS(chipBaseStyle), unsafeCSS(chipTextStyle)];
    }

    public async setConfig(config: Config): Promise<void> {
        if (!config.dialog_file) {
            console.error('dialog_file must be provided in the config.');
            return;
        }

        try {
            const path = `/local/smartqasa/dialogs/${config.dialog_file}`;
            this._dialogObj = (await loadYamlAsJson(path)) as DialogObj;
            this._entity = this._dialogObj.entity;
        } catch (error) {
            console.error('Failed to load YAML:', error);
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

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this._dialogObj) return nothing;

        this._stateObj = this._entity
            ? this.hass?.states[this._entity]
            : undefined;

        const icon = this._dialogObj.icon || 'mdi:help-circle';
        let iconColor = 'var(--sq-inactive-rgb)';

        if (this.hass && this._dialogObj.icon_rgb) {
            try {
                const func = new Function('states', this._dialogObj.icon_rgb);
                iconColor = func(this.hass.states);
            } catch (error) {
                console.error('Error evaluating icon color expression:', error);
            }
        }
        let text = this._stateObj?.state || '';
        switch (this._dialogObj.entity_type) {
            case 'temperature':
                text += '°';
                break;
            case 'percentage':
                text += '%';
                break;
        }

        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: 'transparent',
            paddingRight: text
                ? 'calc(var(--sq-chip-padding) / 2)'
                : 'var(--sq-chip-padding)',
        };

        return html`
            <div class="container" @click=${this._showDialog}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon icon=${icon}></ha-icon>
                </div>
                ${text ? html`<div class="text">${text}</div>` : null}
            </div>
        `;
    }

    private _showDialog(e: Event): void {
        e.stopPropagation();
        const dialogObj = this._dialogObj;
        if (dialogObj?.data)
            window.browser_mod?.service('popup', dialogObj.data);
    }
}
