import { css, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { loadYamlAsJson } from "../utils/load-yaml-as-json";
import { getDeviceType, getDeviceOrientation } from "../utils/device-info";
import { createElement } from "../utils/create-element";

interface Tab {
    tab: string;
    icon: string;
    tiles: LovelaceCardConfig[];
}

@customElement("smartqasa-menu-card")
export class MenuCard extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 4;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _tabs: Tab[] = [];
    @state() private _bodyTiles: LovelaceCard[][] = [];
    @state() private _menuTab = window.smartqasa.menuTab || 0;
    @state() private _gridStyle = {};

    private _boundHandleDeviceChanges: () => void;
    private _deviceType = getDeviceType();

    public setConfig(): void {}

    static get styles() {
        return css`
            :host {
                border: none;
                background-color: transparent;
            }
            .container {
                display: grid;
                grid-templace-columns: 100%;
                grid-template-rows:
                    auto
                    1fr;
                overflow: hidden;
            }
            .tab-bar {
                display: flex;
                justify-content: space-around;
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
                font-size: var(--sq-primary-font-size);
                font-weight: var(--sq-primary-font-weight);
                color: rgb(var(--sq-inactive-rgb));
                transition: background-color 0.3s;
                cursor: pointer;
            }
            .tab[selected] {
                font-weight: var(--sq-primary-font-weight);
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
            .tiles {
                display: grid;
                padding: 1rem 0 0 0;
                gap: var(--sq-tile-spacing);
                grid-auto-rows: var(--sq-tile-height);
                overflow-y: auto;
            }
            .tile {
            }
        `;
    }

    constructor() {
        super();
        this._boundHandleDeviceChanges = this._handleDeviceChanges.bind(this);
    }

    public connectedCallback(): void {
        super.connectedCallback();

        this._loadMenuTabs().catch((error) => {
            console.error("Error loading menu tabs and tiles:", error);
        });

        this._handleDeviceChanges();

        window.addEventListener("resize", this._boundHandleDeviceChanges);
        window.addEventListener("orientationchange", this._boundHandleDeviceChanges);
    }

    protected willUpdate(changedProps: PropertyValues): void {
        if (changedProps.has("hass") && this.hass) {
            const currentTiles = this._bodyTiles[this._menuTab] || [];
            currentTiles.forEach((tile) => {
                tile.hass = this.hass;
            });
        }
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();

        window.removeEventListener("resize", this._boundHandleDeviceChanges);
        window.removeEventListener("orientationchange", this._boundHandleDeviceChanges);
    }

    protected render(): TemplateResult {
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
                <div class="tiles" style=${styleMap(this._gridStyle)}>
                    ${currentTiles.map((tile) => html`<div class="tile">${tile}</div>`)}
                </div>
            </div>
        `;
    }

    private _handleDeviceChanges(): void {
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

    private async _loadMenuTabs(): Promise<void> {
        try {
            const tabsData = (await loadYamlAsJson("/local/smartqasa/config/menu.yaml")) as Tab[];
            if (!Array.isArray(tabsData)) {
                throw new Error("Invalid tabs configuration");
            }
            this._tabs = tabsData;

            this._bodyTiles = await Promise.all(this._tabs.map((tab) => this._loadMenuTiles(tab.tiles)));
        } catch (error) {
            console.error("Error loading menu tabs and tiles:", error);
        }
    }

    private async _loadMenuTiles(tilesConfig: LovelaceCardConfig[]): Promise<LovelaceCard[]> {
        const tiles: LovelaceCard[] = [];
        for (const config of tilesConfig) {
            /*config.callingDialog = {
                title: "Menu",
                timeout: 120000,
                content: {
                    type: "custom:smartqasa-menu-card",
                },
            };*/
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

    private _setMenuTab(index: number): void {
        this._menuTab = index;
        window.smartqasa.menuTab = index;

        const currentTiles = this._bodyTiles[this._menuTab] || [];
        currentTiles.forEach((tile) => {
            tile.hass = this.hass;
        });
    }
}
