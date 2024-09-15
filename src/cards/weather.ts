import { css, html, LitElement, PropertyValues, TemplateResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { createElement } from "../utils/create-element";

interface Config extends LovelaceCardConfig {
    entity: string;
}

window.customCards.push({
    type: "smartqasa-weather-card",
    name: "SmartQasa Weather Card",
    preview: false,
    description: "A SmartQasa element that displays a grid of weather info.",
});

@customElement("smartqasa-weather-card")
export class WeatherCard extends LitElement {
    @property({ attribute: false }) private hass?: HomeAssistant;
    @state() private _config?: Config;
    private _entity?: string;

    private _hourlyForecastCard?: LovelaceCard;
    private _dailyForecastCard?: LovelaceCard;
    private _radarMapCard?: LovelaceCard;

    static get styles() {
        return css`
            .container {
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: 0.8fr 1fr;
                gap: var(--sq-tile-spacing, 0.8rem);
            }
            .left-column {
                display: flex;
                flex-direction: column;
                gap: var(--sq-tile-spacing, 0.8rem);
            }
        `;
    }

    public setConfig(config: Config): void {
        this._config = { ...config };

        if (this._config.entity) {
            this._entity = this._config.entity.startsWith("weather.") ? this._config.entity : "undefined";
        } else {
            this._entity = "weather.forecast_home";
        }
    }

    protected firstUpdated(): void {
        this._hourlyForecastCard = createElement(
            {
                type: "weather-forecast",
                entity: this._entity,
                forecast_type: "hourly",
                name: "Forecast",
                show_current: true,
                show_forecast: true,
                secondary_info_attribute: "wind_speed",
            },
            this.hass
        );

        this._dailyForecastCard = createElement(
            {
                type: "weather-forecast",
                entity: this._entity,
                forecast_type: "daily",
                show_current: false,
                show_forecast: true,
            },
            this.hass
        );

        this._radarMapCard = createElement(
            {
                type: "custom:weather-radar-card",
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
                map_style: "Voyager",
            },
            this.hass
        );
    }

    protected willUpdate(changedProps: PropertyValues): void {
        if (!this.hass || !this._entity) return;

        if (changedProps.has("hass")) {
            if (this._hourlyForecastCard) this._hourlyForecastCard.hass = this.hass;
            if (this._dailyForecastCard) this._dailyForecastCard.hass = this.hass;
            if (this._radarMapCard) this._radarMapCard.hass = this.hass;
        }
    }

    protected render(): TemplateResult {
        return html`
            <div class="container">
                <div class="left-column">
                    ${this._hourlyForecastCard ? html`${this._hourlyForecastCard}` : nothing}
                    ${this._dailyForecastCard ? html`${this._dailyForecastCard}` : nothing}
                </div>
                <div>${this._radarMapCard ? html`${this._radarMapCard}` : nothing}</div>
            </div>
        `;
    }
}
