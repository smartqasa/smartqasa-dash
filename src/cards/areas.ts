import { css, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassArea, HomeAssistant, LovelaceCard } from "../types";
import { getDeviceType, getDeviceOrientation } from "../utils/device-info";
import { createElement } from "../utils/create-element";

@customElement("smartqasa-areas-card")
export class AreasCard extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _areaTiles: LovelaceCard[] = [];
    @state() private _gridStyle = {};

    public setConfig(): void {}

    static get styles() {
        return css`
            :host {
                border: none;
                background-color: transparent;
                box-sizing: border-box;
            }
            .container {
                display: grid;
                grid-auto-rows: var(--sq-tile-height, 7rem);
                gap: var(--sq-tile-spacing, 0.8rem);
                overflow-y: auto;
            }
            .tile {
                display: block;
            }
        `;
    }

    public async connectedCallback() {
        super.connectedCallback();

        this._handleDeviceChanges();

        ["orientationchange", "resize"].forEach((event) =>
            window.addEventListener(event, this._handleDeviceChanges.bind(this))
        );

        this._loadAreaTiles();
    }

    public disconnectedCallback() {
        super.disconnectedCallback();

        ["orientationchange", "resize"].forEach((event) =>
            window.removeEventListener(event, this._handleDeviceChanges.bind(this))
        );
    }

    protected willUpdate(changedProps: PropertyValues): void {
        if (changedProps.has("hass") && this.hass) {
            this._areaTiles.forEach((tile) => {
                tile.hass = this.hass;
            });
        }
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" style=${styleMap(this._gridStyle)}>
                ${this._areaTiles.map((tile) => html`<div class="tile">${tile}</div>`)}
            </div>
        `;
    }

    private _handleDeviceChanges() {
        const type = getDeviceType();
        const orientation = getDeviceOrientation();

        if (type === "phone") {
            this._gridStyle = {
                gridTemplateColumns: orientation === "landscape" ? "1fr 1fr" : "1fr",
            };
        } else {
            this._gridStyle = {
                gridTemplateColumns: "repeat(3, var(--sq-tile-width, 19.5rem))",
            };
        }
    }

    private _loadAreaTiles(): void {
        if (!this.hass || !this.hass.areas) {
            this._areaTiles = [];
            return;
        }

        const visibleAreas = Object.values<HassArea>(this.hass.areas).filter((area) =>
            area?.labels?.includes("visible")
        );

        if (visibleAreas.length === 0) {
            this._areaTiles = [];
            return;
        }

        this._areaTiles = visibleAreas.map((area) => {
            const tile = createElement({
                type: "custom:smartqasa-area-tile",
                area: area.area_id,
            }) as LovelaceCard;

            tile.hass = this.hass;
            return tile;
        });
    }
}
