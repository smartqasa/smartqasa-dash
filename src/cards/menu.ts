import { css, LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { getDeviceType } from "../utils/device-info";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { createElement } from "../utils/create-element";

interface Tab {
    icon: string;
    name: string;
    tiles: LovelaceCardConfig[];
}

interface Config extends LovelaceCardConfig {
    menu_tab?: number;
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
            .tiles-container {
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

    render() {
        if (!this._config || !this._tabs || !this.hass) {
            return nothing;
        }

        const currentTab = this._tabs[this._menuTab];
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
                                <span>${tab.name}</span>
                            </div>
                        `
                    )}
                </div>
                <div class="tiles-container" style=${styleMap(gridStyle)}>
                    ${currentTab.tiles.map((tile) => html` <div class="tile">${this._renderTile(tile)}</div> `)}
                </div>
            </div>
        `;
    }

    private _renderTile(tile: LovelaceCardConfig) {
        const element = createElement(tile); // Use the createElement utility
        if (!element) {
            console.warn(`Failed to create element for tile: ${tile.type}`);
            return nothing;
        }

        element.hass = this.hass;
        return element;
    }
}
