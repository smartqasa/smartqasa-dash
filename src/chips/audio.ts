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

import {
    HassEntity,
    HomeAssistant,
    LovelaceCard,
    LovelaceCardConfig,
} from '../types';
import { dialogTable } from '../dialogs/dialog-table';
import { dialogPopup } from '../dialogs/dialog-popup';
import { launchApp } from '../utilities/launch-app';

import chipBaseStyle from '../css/chip-base.css';
import musicBarsStyle from '../css/music-bars.css';

interface Config extends LovelaceCardConfig {
    entity?: string;
}

window.customCards.push({
    type: 'smartqasa-audio-chip',
    name: 'SmartQasa Audio Chip',
    preview: true,
    description: 'A SmartQasa chip for displaying an audio dialog.',
});

@customElement('smartqasa-audio-chip')
export class AudioChip extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;

    private _entity?: string;
    private _stateObj?: HassEntity;
    private _iconTemplate?: TemplateResult;

    static get styles(): CSSResultGroup[] {
        return [unsafeCSS(chipBaseStyle), unsafeCSS(musicBarsStyle)];
    }

    public setConfig(config: Config): void {
        if (!config.entity?.startsWith('media_player.')) {
            console.error(
                'Invalid media_player entity provided in the config.'
            );
            this._entity = undefined;
        } else {
            this._entity = config.entity;
        }
        this._config = config;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
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
        if (!this._config || !this._entity) return nothing;

        return html`
            <div
                class="container"
                @click=${this._showDialog}
                @contextmenu=${this._launchApp}
            >
                ${this._iconTemplate}
            </div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity
            ? this.hass?.states[this._entity]
            : undefined;

        let iconTemplate;
        if (this._stateObj?.state === 'playing') {
            iconTemplate = html`
                <div class="bars">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            `;
        } else {
            iconTemplate = html`
                <div class="icon">
                    <ha-icon icon="hass:music"></ha-icon>
                </div>
            `;
        }

        this._iconTemplate = iconTemplate;
    }

    private _showDialog(e: Event): void {
        e.stopPropagation();
        const dialogObj = dialogTable['sonos'];
        if (!dialogObj) return;

        const dialogConfig = { ...dialogObj.data };
        if (this._entity) dialogConfig.content.entityId = this._entity;

        dialogPopup(dialogObj.data);
    }

    private _launchApp(e: Event): void {
        e.stopPropagation();
        launchApp('sonos');
    }
}
