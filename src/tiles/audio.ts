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
import { formatState } from '../utilities/format-state';

import tileStyle from '../css/tile.css';
import musicBarsStyle from '../css/music-bars.css';

interface Config extends LovelaceCardConfig {
    entity?: string;
}

window.customCards.push({
    type: 'smartqasa-audio-tile',
    name: 'SmartQasa Audio Tile',
    preview: true,
    description: 'A SmartQasa tile for displaying an audio dialog.',
});

@customElement('smartqasa-audio-tile')
export class AudioTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;

    private _entity?: string;
    private _stateObj?: HassEntity;
    private _iconHtml: TemplateResult = html``;
    private _name: string = 'Unknown Speaker';
    private _stateFmtd: string = 'Unknown State';

    static get styles(): CSSResultGroup[] {
        return [unsafeCSS(tileStyle), unsafeCSS(musicBarsStyle)];
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
        return html`
            <div class="container" @click=${this._showDialog}>
                ${this._iconHtml}
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

        let iconHtml, name, stateFmtd;
        if (this._stateObj) {
            if (this._stateObj.state === 'playing') {
                iconHtml = html`
                    <div class="bars tile" @click=${this._launchApp}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                `;
            } else {
                iconHtml = html`
                    <div class="icon" @click=${this._launchApp}>
                        <ha-icon icon="hass:music"></ha-icon>
                    </div>
                `;
            }

            const state = this._stateObj.state || 'unknown';
            name =
                this._config!.name ||
                this._stateObj.attributes.friendly_name ||
                'Speaker';
            stateFmtd = formatState(this.hass!, this._entity!);
        } else {
            iconHtml = html`
                <div class="icon">
                    <ha-icon icon="hass:music"></ha-icon>
                </div>
            `;
            name = this._config?.name || 'Unknown Speaker';
            stateFmtd = 'Unknown State';
        }

        this._iconHtml = iconHtml;
        this._name = name;
        this._stateFmtd = stateFmtd;
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
        launchApp('com.sonos.acr2');
    }
}
