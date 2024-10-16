import {
    css,
    html,
    LitElement,
    PropertyValues,
    TemplateResult,
    nothing,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import { createElement } from '../utilities/create-element';

interface Config extends LovelaceCardConfig {
    entity?: string;
}

window.customCards.push({
    type: 'smartqasa-weather-card',
    name: 'SmartQasa Weather Card',
    preview: false,
    description: 'A SmartQasa element that displays a grid of weather info.',
});

@customElement('smartqasa-weather-card')
export class WeatherCard extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 10;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    private _entity?: string;

    private _hourlyForecastCard?: LovelaceCard;
    private _dailyForecastCard?: LovelaceCard;
    private _radarMapCard?: LovelaceCard;

    static get styles() {
        return css`
            .container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: var(--sq-tile-spacing, 0.8rem);
            }
            .left-column {
                display: flex;
                flex-direction: column;
                gap: var(--sq-tile-spacing, 0.8rem);
            }
            .left-column > * {
                flex-grow: 1;
            }
        `;
    }

    public setConfig(config: Config): void {
        if (config.entity && config.entity.startsWith('weather.')) {
            this._entity = config.entity;
        } else {
            this._entity = 'weather.forecast_home';
        }
        this._config = config;
    }

    protected willUpdate(changedProps: PropertyValues): void {
        if (!this._entity) return;

        if (changedProps.has('hass') && this.hass) {
            [
                this._hourlyForecastCard,
                this._dailyForecastCard,
                this._radarMapCard,
            ].forEach((card) => {
                if (card && card.hass !== this.hass) card.hass = this.hass;
            });
        }
    }

    protected render(): TemplateResult {
        const renderCard = (
            card: LovelaceCard | undefined
        ): TemplateResult | typeof nothing => {
            if (!card) return nothing;
            const element = card as unknown as HTMLElement;
            return html`<ha-card>${element}</ha-card>`;
        };

        return html`
            <div class="container">
                <div class="left-column">
                    ${renderCard(this._hourlyForecastCard)}
                    ${renderCard(this._dailyForecastCard)}
                </div>
                ${renderCard(this._radarMapCard)}
            </div>
        `;
    }

    protected firstUpdated(): void {
        this._hourlyForecastCard = createElement(
            {
                type: 'weather-forecast',
                entity: this._entity,
                forecast_type: 'hourly',
                name: 'Forecast',
                show_current: true,
                show_forecast: true,
                secondary_info_attribute: 'wind_speed',
            },
            this.hass
        );

        this._dailyForecastCard = createElement(
            {
                type: 'weather-forecast',
                entity: this._entity,
                forecast_type: 'daily',
                show_current: false,
                show_forecast: true,
            },
            this.hass
        );

        this._radarMapCard = createElement(
            {
                type: 'custom:weather-radar-card',
                frame_count: 10,
                show_marker: true,
                show_range: true,
                show_zoom: true,
                show_recenter: true,
                show_playback: true,
                zoom_level: 20,
                square_map: true,
                show_scale: true,
                extra_labels: true,
                map_style: 'Voyager',
            },
            this.hass
        );
    }
}
