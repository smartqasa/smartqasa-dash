import { css, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { deviceType } from "../utils/device-info";
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
    private _stateObj?: HassEntity;

    static get styles() {
        return css`
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
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

    protected willUpdate(changedProps: PropertyValues): void {
        if (!this.hass || !this._entity) {
            return;
        }

        if (changedProps.has("hass")) {
            this._stateObj = this.hass.states[this._entity];
        }
    }

    protected render(): TemplateResult {
        const hourlyForecast = createElement({
            type: "weather-forecast",
            entity: this._entity,
            forecast_type: "hourly",
            name: "Forecast",
            show_current: true,
            show_forecast: true,
            secondary_info_attribute: "wind_speed",
        });

        if (hourlyForecast) hourlyForecast.hass = this.hass;

        const dailyForecast = createElement({
            type: "weather-forecast",
            entity: "weather.forecast_home",
            forecast_type: "daily",
            show_current: false,
            show_forecast: true,
        });

        if (dailyForecast) dailyForecast.hass = this.hass;

        const radarMap = createElement({
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
        });

        if (radarMap) radarMap.hass = this.hass;

        return html` <div class="grid">${hourlyForecast} ${dailyForecast} ${radarMap}</div> `;
    }
}
