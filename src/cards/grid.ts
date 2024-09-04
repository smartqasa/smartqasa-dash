import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { deviceType } from "../utils/device-info";
import { createElement } from "../utils/create-element";

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
        this._createTiles();
    }

    protected update(changedProps: PropertyValues) {
        super.update(changedProps);
        if (changedProps.has("_config") && this._config) {
            this._createTiles();
        }

        if (changedProps.has("hass") && this.hass) {
            this._tiles.forEach((tile) => {
                tile.hass = this.hass;
            });
        }
    }

    protected render() {
        if (!this._config || !this.hass || this._tiles.length) return nothing;
        const columns = this._config.columns || 3;
        const gridStyle = {
            gridTemplateColumns:
                deviceType === "phone" ? `1fr 1fr` : `repeat(${columns}, var(--sq-tile-width, 19.5rem))`,
        };
        return html`
            <div class="container">${this._tiles.map((tile) => html`<div class="element">${tile}</div>`)}</div>
        `;
    }

    private _createTiles() {
        if (!this._config || !this.hass) return;

        this._tiles = this._config.tiles.map((tileConfig) => {
            const tile = createElement(tileConfig) as LovelaceCard;
            tile.hass = this.hass;
            return tile;
        });
    }
}
