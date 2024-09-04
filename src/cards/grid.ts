import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { deviceType } from "../utils/device-info";
import { createCards } from "../utils/create-cards";

interface Config extends LovelaceCardConfig {
    columns?: number;
    tiles: LovelaceCardConfig[];
}

window.customCards.push({
    type: "smartqasa-grid-card",
    name: "SmartQasa Grid Card",
    preview: false,
    description: "A SmartQasa element that displays other tiles in a grid.",
});

@customElement("smartqasa-grid-card")
class GridCard extends LitElement {
    @property({ attribute: false }) private hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _tiles: LovelaceCard[] = [];

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
        if (!config.tiles || !config.tiles.length) {
            throw new Error("You need to define 'tiles'");
        }

        this._config = { ...config };
    }

    protected firstUpdated(changedProps: PropertyValues) {
        super.firstUpdated(changedProps);
        if (changedProps.has("_config") && this._config && this.hass) {
            this._tiles = createCards(this._config.tiles, this.hass) as LovelaceCard[];
        }
    }

    protected updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        if (changedProps.has("hass") && this.hass && this._tiles.length) {
            this._tiles.forEach((tile) => {
                tile.hass = this.hass;
            });
        }
    }

    protected render() {
        if (!this._config || !this.hass || !this._tiles.length) return nothing;

        const columns = this._config.columns || 3;
        const gridStyle = {
            gridTemplateColumns:
                deviceType === "phone" ? `1fr 1fr` : `repeat(${columns}, var(--sq-tile-width, 19.5rem))`,
        };

        return html`
            <div class="container" style=${styleMap(gridStyle)}>
                ${this._tiles.map((tile) => html`<div class="element">${tile}</div>`)}
            </div>
        `;
    }
}
