import { css, LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { loadYamlAsJson } from "../utils/load-yaml-as-json";
import { getDeviceType } from "../utils/device-info";
import { createElement } from "../utils/create-element";

interface Config extends LovelaceCardConfig {}

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
    @state() private _config?: Config;
    @state() private _loading = true;
    @state() private _tabs: Tab[] = [];
    @state() private _bodyTiles: LovelaceCard[][] = [];

    private _menuTab = 0;

    public async setConfig(config: Config) {
        this._config = { ...config };
        this._menuTab = config.menu_tab || 0;
        this._loading = true;
        await this._loadTabsAndTiles();
        this._loading = false;
    }

    static get styles() {
        return css`
            .container {
                display: block;
                padding: 1rem;
                border: var(--sq-card-border, none);
                border-radius: var(--sq-card-border-radius, 1.5rem);
                background-color: var(--sq-card-background-color, rgba(192, 192, 192, 0.5));
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
                cursor: pointer;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                transition: background-color 0.3s;
            }
            .tab[selected] {
                background-color: var(--primary-color);
                color: white;
            }
            .tab:hover {
                background-color: var(--primary-color-light);
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

    protected render() {
        if (this._loading || !this._config || !this._tabs.length || !this.hass) {
            return html`<div>Loading...</div>`;
        }

        const deviceType = getDeviceType();
        const gridStyle = {
            gridTemplateColumns: deviceType === "phone" ? "1fr 1fr" : "repeat(3, 1fr)",
        };

        return html`
            <div class="container">
                <div class="tab-bar">
                    ${this._tabs.map(
                        (tab, index) => html`
                            <div
                                class="tab"
                                ?selected=${this._menuTab === index}
                                @click="${() => (this._menuTab = index)}"
                                ?icon-only=${deviceType === "phone"}
                            >
                                <ha-icon .icon="${tab.icon}"></ha-icon>
                                <span>${tab.tab}</span>
                            </div>
                        `
                    )}
                </div>
                <div class="tiles" style=${styleMap(gridStyle)}>
                    ${this._bodyTiles[this._menuTab].map((tile) => html`<div class="tile">${tile}</div>`)}
                </div>
            </div>
        `;
    }

    private async _loadTabsAndTiles() {
        try {
            this._tabs = (await loadYamlAsJson("/local/smartqasa/dialogs/menu.yaml")) as Tab[];
            this._bodyTiles = await Promise.all(
                this._tabs.map(async (tab) => {
                    return this._loadTilesForTab(tab.tiles);
                })
            );
        } catch (error) {
            console.error("Error loading tabs and tiles:", error);
        }
    }

    private async _loadTilesForTab(tilesConfig: LovelaceCardConfig[]): Promise<LovelaceCard[]> {
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
}
