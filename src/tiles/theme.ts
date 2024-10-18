import {
    CSSResult,
    html,
    LitElement,
    nothing,
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
    mode: string;
}

window.customCards.push({
    type: 'smartqasa-theme-tile',
    name: 'SmartQasa Theme Tile',
    preview: true,
    description: 'A SmartQasa tile for setting the display theme.',
});

@customElement('smartqasa-theme-tile')
export class ThemeTile extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 1;
    }

    @state() protected _config?: Config;

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        this._config = config;
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config) return nothing;

        const icon = this._config.icon || 'hass:compare';
        const iconColor = this._config.mode
            ? 'var(--sq-inactive-rgb)'
            : 'var(--sq-unavailable-rgb, 255, 0, 255)';
        const name = this._config.name || this._config.mode || 'Unknown';

        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
        };

        return html`
            <div class="container" @click=${this.selectMode}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon icon=${icon}></ha-icon>
                </div>
                <div class="text">
                    <div class="name">${name}</div>
                </div>
            </div>
        `;
    }

    private selectMode(e: Event): void {
        e.stopPropagation();
        window.browser_mod?.service('set_theme', { dark: this._config!.mode });
        window.browser_mod?.service('close_popup', {});
    }
}
