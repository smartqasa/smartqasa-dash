import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { deviceType } from "../utils/device-info";
import { createCards } from "../utils/create-cards";

interface Config extends LovelaceCardConfig {
    columns?: number;
    cards: LovelaceCardConfig[];
}

window.customCards.push({
    type: "smartqasa-grid-stack",
    name: "SmartQasa Grid Stack",
    preview: false,
    description: "A SmartQasa element that displays other cards in a grid layout.",
});

@customElement("smartqasa-grid-stack")
class GridStack extends LitElement {
    @property({ attribute: false }) private hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _cards: LovelaceCard[] = [];

    static get styles() {
        return css`
            .container {
                display: grid;
                grid-template-rows: var(--sq-tile-height, 7rem);
                gap: var(--sq-tile-spacing, 0.8rem);
            }
        `;
    }

    public setConfig(config: Config): void {
        if (!config.cards || config.cards.length === 0) {
            throw new Error("You need to define 'tiles'");
        }
        this._config = { ...config };
        console.log("Config", this._config);
    }

    protected firstUpdated(changedProps: PropertyValues) {
        super.firstUpdated(changedProps);
        if (changedProps.has("_config") && this._config && this.hass) {
            this._cards = createCards(this._config.cards, this.hass) as LovelaceCard[];
        }
        console.log("Cards", this._cards);
    }

    protected updated(changedProps: PropertyValues) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.hass && this._cards.length) {
            this._cards.forEach((card) => {
                card.hass = this.hass;
            });
        }
    }

    protected render() {
        if (!this._config || !this.hass || this._cards.length === 0) return nothing;
        console.log("Render", this._cards);
        const columns = this._config.columns || 3;
        const gridStyle = {
            gridTemplateColumns:
                deviceType === "phone" ? `1fr 1fr` : `repeat(${columns}, var(--sq-tile-width, 19.5rem))`,
        };

        return html`
            <div class="container" style=${styleMap(gridStyle)}>
                ${this._cards.map((card) => html`<div class="element">${card}</div>`)}
            </div>
        `;
    }
}
