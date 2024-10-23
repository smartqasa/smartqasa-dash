import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardConfig } from '../types';

@customElement('smartqasa-panel-view')
export class SmartqasaPanelView extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;
    @state() protected _config?: LovelaceCardConfig;

    static get styles() {
        return css`
            .container {
                display: grid;
                grid-template-columns: repeat(2, 1fr); /* Two-column layout */
                gap: 16px;
            }
            .card {
                border: 1px solid #ccc;
                padding: 16px;
                border-radius: 8px;
            }
        `;
    }

    public setConfig(config: LovelaceCardConfig): void {
        this._config = config;
    }

    protected render() {
        if (!this.hass || !this._config) {
            return html`<div>Loading...</div>`;
        }

        return html`
            <div class="container">
                <!-- Add custom tiles/cards in this view -->
                <div class="card">
                    <custom:smartqasa-option-tile
                        .hass=${this.hass}
                        .config=${{ entity: 'input_select.living_room_lights' }}
                    >
                    </custom:smartqasa-option-tile>
                </div>
                <div class="card">
                    <custom:smartqasa-weather-radar
                        .hass=${this.hass}
                        .config=${{ entity: 'weather_radar' }}
                    >
                    </custom:smartqasa-weather-radar>
                </div>
                <!-- You can add more cards in the view here -->
            </div>
        `;
    }
}
