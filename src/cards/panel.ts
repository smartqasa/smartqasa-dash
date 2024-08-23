import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassArea, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import Swiper from "swiper";
import { SwiperOptions } from "swiper/types";
import { deviceType } from "../const";
import { createElement } from "../utils/create-element";
import { loadYamlAsJson } from "../utils/load-yaml-as-json";
import { panelStyle } from "../styles/panel";
import swiperStyle from "swiper/swiper-bundle.css";
import defaultImage from "../assets/images/default.png";

interface Config extends LovelaceCardConfig {
    area: string;
    name?: string;
    picture?: string;
    chips?: LovelaceCardConfig[];
    columns?: number | undefined;
    tiles?: LovelaceCardConfig[];
}

@customElement("smartqasa-panel-card")
export class PanelCard extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _loading = true;
    private _swiper?: Swiper;
    private _area?: string;
    private _areaObj?: HassArea;
    private _headerChips: LovelaceCard[] = [];
    private _areaChips: LovelaceCard[] = [];
    private _bodyTiles: LovelaceCard[][] = [];

    static styles: CSSResultGroup = [panelStyle, unsafeCSS(swiperStyle)];

    public async setConfig(config: Config) {
        this._config = { ...config };
        this._area = this._config.area;
        this._loading = true;
    }

    protected async firstUpdated(changedProps: PropertyValues) {
        super.firstUpdated(changedProps);

        await this._loadContent();

        this._loading = false;
    }

    protected render(): TemplateResult {
        if (this._loading) return html`<div>Loading...</div>`;

        const isPhone = deviceType === "phone";
        const containerStyles = {
            padding: isPhone ? "0.5rem" : "1rem",
            gridTemplateAreas: isPhone ? '"area" "body" "footer"' : '"header" "area" "body" "footer"',
        };

        return html`
            <div class="container" style="${styleMap(containerStyles)}">
                <div style="grid-area: header;">${this._renderHeader()}</div>
                <div style="grid-area: area;">${this._renderArea()}</div>
                <div style="grid-area: body">${this._renderBody()}</div>
                <div style="grid-area: footer;">${this._renderFooter()}</div>
            </div>
        `;
    }

    protected updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        if (!this._swiper) {
            this._initializeSwiper();
        } else {
            this._swiper.update();
        }

        if (changedProps.has("_config") && this._config) {
            this._area = this._config.area;
            this._loadContent();
        } else if (changedProps.has("hass") && this.hass) {
            this._areaObj = this._area ? this.hass.areas[this._area] : undefined;

            if (this._headerChips.length) {
                this._headerChips.forEach((chip) => {
                    chip.hass = this.hass;
                });
            }

            if (this._areaChips.length) {
                this._areaChips.forEach((chip) => {
                    chip.hass = this.hass;
                });
            }

            if (this._bodyTiles.length) {
                this._bodyTiles.forEach((page) => {
                    page.forEach((tile) => {
                        tile.hass = this.hass;
                    });
                });
            }
        }
    }

    private async _loadContent() {
        this._areaObj = this._area ? this.hass?.areas[this._area] : undefined;

        this._headerChips = await this._loadHeaderChips();

        if (this._config?.chips) {
            this._areaChips = await this._loadAreaChips(this._config.chips);
        }

        if (this._config?.tiles) {
            this._bodyTiles = await this._loadBodyTiles(this._config.tiles);
        }
    }

    private async _loadHeaderChips(): Promise<LovelaceCard[]> {
        let chipsConfig: LovelaceCardConfig[] = [];
        try {
            const yamlFilePath = "/local/smartqasa/lists/chips.yaml";
            chipsConfig = (await loadYamlAsJson(yamlFilePath)) as LovelaceCardConfig[];
        } catch (error) {
            console.error("Error loading header chips:", error);
            return [];
        }

        return chipsConfig.map((config) => {
            const chip = createElement(config) as LovelaceCard;
            chip.hass = this.hass;
            return chip;
        });
    }

    private async _loadAreaChips(chipsConfig: LovelaceCardConfig[]): Promise<LovelaceCard[]> {
        return chipsConfig.map((config) => {
            const chip = createElement(config) as LovelaceCard;
            chip.hass = this.hass;
            return chip;
        });
    }

    private async _loadBodyTiles(tilesConfig: LovelaceCardConfig[]): Promise<LovelaceCard[][]> {
        const pages: LovelaceCard[][] = [];
        let currentPage: LovelaceCard[] = [];

        for (const config of tilesConfig) {
            if (config.type === "page-break") {
                if (currentPage.length > 0) {
                    pages.push(currentPage);
                    currentPage = [];
                }
            } else {
                const tile = createElement(config) as LovelaceCard;
                tile.hass = this.hass;
                currentPage.push(tile);
            }
        }

        if (currentPage.length > 0) {
            pages.push(currentPage);
        }

        return pages;
    }

    private _initializeSwiper() {
        const swiperContainer = this.shadowRoot?.querySelector(".swiper");
        console.log("Swiper container found:", swiperContainer); // Log to see the element
        if (!swiperContainer) {
            console.error("Swiper container not found!");
            return;
        }

        console.log("Initializing Swiper...");

        const swiperParams: SwiperOptions = {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            initialSlide: 0,
        };

        this._swiper = new Swiper(swiperContainer as HTMLElement, swiperParams);

        console.log("Swiper initialized:", this._swiper);
    }

    private _renderHeader() {
        let time = this.hass?.states["sensor.current_time"]?.state || "Loading...";
        let date = this.hass?.states["sensor.current_date"]?.state || "Loading...";

        return html`
            <div class="header-container">
                <div class="header-time" @click="${this._launchClock}">
                    <div class="time">${time}</div>
                    <div class="date">${date}</div>
                </div>
                <div class="header-chips">
                    ${this._headerChips.map((chip) => html`<div class="chip">${chip}</div>`)}
                </div>
            </div>
        `;
    }

    private _launchClock(e: Event) {
        e.stopPropagation();
        if (typeof window.fully !== "undefined" && window.fully.startApplication) {
            window.fully.startApplication("com.google.android.deskclock");
        } else {
            console.warn("fully.startApplication is not available.");
        }
    }

    private _renderArea() {
        const name = this._config?.name ?? this._areaObj?.name ?? "Area";
        const height = deviceType === "phone" ? "15vh" : "20vh";
        const picture = this._config?.picture
            ? `/local/smartqasa/images/${this._config.picture}`
            : this._areaObj?.picture ?? defaultImage;

        return html`
            <div class="area-container">
                <div class="area-info">
                    <div class="area-name">${name}</div>
                    ${this._areaChips.length > 0
                        ? html` <div class="area-chips">
                              ${this._areaChips.map((chip) => html`<div class="chip">${chip}</div>`)}
                          </div>`
                        : nothing}
                </div>
                <img class="area-image" alt="Area picture..." src=${picture} style="max-height: ${height};" />
            </div>
        `;
    }

    private _renderBody() {
        if (!this._config || !this._bodyTiles.length) return nothing;

        const columns =
            this._config.columns && this._config.columns >= 2 && this._config.columns <= 4 ? this._config.columns : 3;
        const bodyStyles = {
            gridTemplateColumns: `repeat(${columns}, auto)`,
        };

        return html`
            <div class="swiper">
                <div class="swiper-wrapper">
                    ${this._bodyTiles.map(
                        (page) => html`
                            <div class="swiper-slide">
                                <div class="body-tiles" style="${styleMap(bodyStyles)}">
                                    ${page.map((tile) => html`<div class="tile">${tile}</div>`)}
                                </div>
                            </div>
                        `
                    )}
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        `;
    }

    private _renderFooter() {
        return html`<p>Footer content with dynamic data.</p>`;
    }
}
