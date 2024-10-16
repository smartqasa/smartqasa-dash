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
import { callService } from '../utilities/call-service';
import { menuConfig } from '../misc/menu-config';
import { phaseIcons, modeIcons } from '../const';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
    entity: string;
    option: string;
    trigger?: string;
}

window.customCards.push({
    type: 'smartqasa-option-tile',
    name: 'SmartQasa Option Tile',
    preview: true,
    description:
        'A SmartQasa tile for displaying an Option of an Input Select entity.',
});

@customElement('smartqasa-option-tile')
export class OptionTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _stateObj?: HassEntity;
    @state() private _running: boolean = false;

    private _entity?: string;
    private _icon: string = 'hass:form-dropdown';
    private _iconStyles: Record<string, string> = {};
    private _name: string = 'Unknown Lock';

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
            changedProps.has('_running') ||
            (changedProps.has('hass') &&
                this._entity &&
                this.hass?.states[this._entity] !== this._stateObj) ||
            (changedProps.has('_config') && this._config)
        );
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        return html`
            <div class="container" @click=${this._selectOption}>
                <div class="icon" style="${styleMap(this._iconStyles)}">
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                <div class="text">
                    <div class="name">${this._name}</div>
                </div>
            </div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity
            ? this.hass?.states[this._entity]
            : undefined;

        let icon, iconAnimation, iconColor, name;
        if (this._stateObj) {
            if (this._running) {
                icon = 'hass:rotate-right';
                iconAnimation = 'spin 1.0s linear infinite';
                iconColor = 'var(--sq-blue-rgb)';
            } else {
                if (this._entity === 'input_select.location_phase') {
                    icon =
                        phaseIcons[this._config!.option] || phaseIcons.default;
                } else if (this._entity === 'input_select.location_mode') {
                    icon = modeIcons[this._config!.option] || modeIcons.default;
                } else {
                    icon =
                        this._config!.icon ||
                        this._stateObj.attributes.icon ||
                        'hass:form-dropdown';
                }
                iconAnimation = 'none';
                iconColor =
                    this._stateObj.state === this._config!.option
                        ? 'var(--sq-blue-rgb)'
                        : 'var(--sq-inactive-rgb)';
            }
            name = this._config!.option || 'Unknown';
        } else {
            icon = this._config?.icon || 'hass:form-dropdown';
            iconAnimation = 'none';
            iconColor = 'var(--sq-unavailable-rgb, 255, 0, 255)';
            name = this._config?.option || 'Unknown';
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
        this._icon = icon;
        this._name = name;
    }

    private async _selectOption(e: Event): Promise<void> {
        e.stopPropagation();
        if (!this.hass || !this._config || !this._stateObj) return;

        this._running = true;
        this.requestUpdate();
        await callService(this.hass, 'input_select', 'select_option', {
            entity_id: this._entity,
            option: this._config.option,
        });

        const trigger = this._config.trigger;
        if (trigger && trigger.startsWith('input_button.')) {
            await callService(this.hass, 'input_button', 'press', {
                entity_id: trigger,
            });
        }

        setTimeout(() => {
            this._running = false;
            const menuTab = this._config?.menu_tab;
            if (menuTab !== undefined && menuTab >= 0 && menuTab <= 3) {
                this._showMenu();
            } else {
                window.browser_mod?.service('close_popup', {});
            }
        }, 1000);
    }

    private async _showMenu(): Promise<void> {
        try {
            const dialogConfig = await menuConfig();
            window.browser_mod?.service('popup', dialogConfig);
        } catch (e) {
            window.browser_mod?.service('close_popup', {});
            console.error('Error opening menu dialog', e);
        }
    }
}
