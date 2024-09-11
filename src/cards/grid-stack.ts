import { css, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
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
            .element {
                width: 100%;
            }
        `;
    }

    public setConfig(config: Config): void {
        if (!config.cards || config.cards.length === 0) {
            throw new Error("You need to define 'tiles'");
        }
        this._config = { ...config };
    }

    protected willUpdate(changedProps: PropertyValues): void {
        const hassChanged = changedProps.has("hass");
        const configChanged = changedProps.has("_config");

        if ((hassChanged || configChanged) && this._config) {
            if (this.hass && this._config.cards.length > 0) {
                this._cards = createCards(this._config.cards, this.hass);
            }
        }

        if (hassChanged && this._cards.length > 0) {
            this._cards.forEach((card) => {
                card.hass = this.hass;
            });
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this.hass || this._cards.length === 0) return nothing;
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
