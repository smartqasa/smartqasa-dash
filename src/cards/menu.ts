import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { loadYamlAsJson } from "../utils/load-yaml-as-json";
import { getDeviceType } from "../utils/device-info";
import { createElement } from "../utils/create-element";

interface Tab {
    tab: string;
    icon: string;
    tiles: LovelaceCardConfig[];
}

window.customCards.push({
    type: "smartqasa-menu-card",
    name: "SmartQasa Menu Card",
    preview: true,
    description: "A SmartQasa card for rendering a menu.",
});

@customElement("smartqasa-menu-card")
export class MenuCard extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _tabs: Tab[] = [];
    @state() private _bodyTiles: LovelaceCard[][] = [];

    private _deviceType = getDeviceType();
    private _menuTab = window.smartqasa.menuTab || 0;

    public async setConfig() {}

    static get styles() {
        return css`
            .container {
                display: block;
                padding: 1rem;
                border: var(--sq-card-border, none);
                border-radius: var(--sq-card-border-radius, 1.5rem);
                background-color: transparent;
                box-sizing: border-box;
            }
            .tab-bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
                padding: 0.5rem 0;
                border-bottom: 1px solid var(--divider-color);
            }
            .tab {
                display: flex;
                align-items: center;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-size: var(--sq-primary-font-size, 1.5rem);
                font-weight: var(--sq-primary-font-weight, 300);
                color: rgb(var(--sq-secondary-font-rgb, 128, 128, 128));
                transition: background-color 0.3s;
                cursor: pointer;
            }
            .tab[selected] {
                font-weight: var(--sq-primary-font-weight, 400);
                color: rgb(var(--sq-primary-font-rgb, 128, 128, 128));
            }
            .tab ha-icon {
                margin-right: 0.5rem;
            }
            .tab[icon-only] ha-icon {
                margin-right: 0;
            }
            .tab[icon-only] span {
                display: none;
            }
            .tiles {
                display: grid;
                gap: var(--sq-tile-spacing, 0.8rem);
                width: 100%;
                margin: auto;
                grid-template-rows: var(--sq-tile-height, 7rem);
                overflow-y: auto;
                padding: 1rem 0;
            }
            .tile {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
        `;
    }

    protected async firstUpdated(changedProps: PropertyValues) {
        super.firstUpdated(changedProps);
        await this._loadMenuTabs();

        if (this._menuTab < 0 || this._menuTab >= this._tabs.length) {
            this._menuTab = 0;
            window.smartqasa.menuTab = 0;
        }
    }

    protected render() {
        const gridStyle = {
            gridTemplateColumns: this._deviceType === "phone" ? "1fr 1fr" : "repeat(3, 1fr)",
        };

        const currentTiles = this._bodyTiles[this._menuTab] || [];

        return html`
            <div class="container">
                <div class="tab-bar">
                    ${this._tabs.map(
                        (tab, index) => html`
                            <div
                                class="tab"
                                ?selected=${this._menuTab === index}
                                @click="${() => this._setMenuTab(index)}"
                                ?icon-only=${this._deviceType === "phone"}
                            >
                                <ha-icon .icon="${tab.icon}"></ha-icon>
                                <span>${tab.tab}</span>
                            </div>
                        `
                    )}
                </div>
                <div class="tiles" style=${styleMap(gridStyle)}>
                    ${currentTiles.map((tile) => html`<div class="tile">${tile}</div>`)}
                </div>
            </div>
        `;
    }

    private async _loadMenuTabs() {
        console.log("Loading menu tabs and tiles...");
        try {
            this._tabs = (await loadYamlAsJson("/local/smartqasa/dialogs/menu.yaml")) as Tab[];
            this._bodyTiles = await Promise.all(
                this._tabs.map(async (tab) => {
                    return this._loadMenuTiles(tab.tiles);
                })
            );
        } catch (error) {
            console.error("Error loading tabs and tiles:", error);
        }
    }

    private async _loadMenuTiles(tilesConfig: LovelaceCardConfig[]): Promise<LovelaceCard[]> {
        const tiles: LovelaceCard[] = [];
        for (const config of tilesConfig) {
            const tile = createElement(config) as LovelaceCard;
            if (tile) {
                tile.hass = this.hass;
                tiles.push(tile);
            } else {
                console.error("Failed to create tile for config:", config);
            }
        }
        return tiles;
    }

    private _setMenuTab(index: number) {
        this._menuTab = index;
        window.smartqasa.menuTab = index;
    }
}
