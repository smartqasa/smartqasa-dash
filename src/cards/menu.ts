import { css, LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { loadYamlAsJson } from "../utils/load-yaml-as-json";
import { createElement } from "../utils/create-element";
import { deviceType } from "../utils/device-info"; // Assuming deviceType utility is available

interface Tab {
    icon: string;
    name: string;
    columns: number;
    tiles: LovelaceCardConfig[];
}

interface Config extends LovelaceCardConfig {
    menu_tab: number;
    tabs: Tab[];
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

    private _menuTab = 0;
    private _tabs?: Tab[];

    public async setConfig(config: Config) {
        this._config = { ...config };
        this._menuTab = config.menu_tab || 0;
        this._tabs = config.tabs;
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
                padding: 0.5rem 1rem;
                border-radius: 5px;
                background-color: rgba(var(--sq-secondard-font-color), 0.2);
                color: rgb(var(--sq-secondary-font-rgb));
                transition: background-color 0.3s;
                cursor: pointer;
            }
            .tab[selected] {
                background-color: rgba(var(--sq-primary-font-color), 0.2);
                color: rgb(var(--sq-primary-font-rgb));
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
        `;
    }

    render() {
        if (!this._config || !this._tabs || !this.hass) {
            return nothing;
        }

        this._loadMenuTiles();

        const currentTab = this._tabs[this._menuTab];
        const gridStyle = {
            gridTemplateColumns: `repeat(${currentTab.columns}, minmax(0, 1fr))`,
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
                                <span>${tab.name}</span>
                            </div>
                        `
                    )}
                </div>
                <div class="tiles-container" style=${styleMap(gridStyle)}>
                    ${currentTab.tiles.map(
                        (tileConfig) => html` <div class="tile">${this._renderTile(tileConfig)}</div> `
                    )}
                </div>
            </div>
        `;
    }

    private _loadMenuTiles = async () => {
        const favoMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/favorites.yaml");
        const funcMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/functions.yaml");
        const applMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/applications.yaml");
    };

    private _renderTile(config: LovelaceCardConfig) {
        const tile = createElement(config) as LovelaceCard;
        if (tile) {
            tile.hass = this.hass;
        } else {
            console.error("Failed to create tile for config:", config);
        }
        return html`<div>${tile}</div>`;
    }
}
