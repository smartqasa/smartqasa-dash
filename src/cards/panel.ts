import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassArea, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import Swiper from "swiper";
import { SwiperOptions } from "swiper/types";
import { Navigation } from "swiper/modules";
import { deviceType } from "../const";
import { createElement } from "../utils/create-element";
import { loadYamlAsJson } from "../utils/load-yaml-as-json";
import { areasDialog } from "../misc/areas-dialog";
import { entertainDialog } from "../misc/entertain-dialog";
import { menuConfig } from "../misc/menu-config";
import { panelStyles } from "../styles/panel";
import swiperStyles from "swiper/swiper-bundle.css";
import defaultImage from "../assets/images/default.png";

interface Config extends LovelaceCardConfig {
    area: string;
    name?: string;
    picture?: string;
    audio_player: string;
    video_player: string;
    video_sound: string;
    chips?: LovelaceCardConfig[];
    columns?: number | undefined;
    tiles?: LovelaceCardConfig[];
}

interface ActionHandlers {
    _handleHome: () => void;
    _handleAreas: () => void;
    _handleEntertain: () => void;
    _handleMenu: () => void;
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

    static styles: CSSResultGroup = [unsafeCSS(swiperStyles), panelStyles];

    public async setConfig(config: Config) {
        this._config = { ...config };
        this._area = this._config.area;
        this._loading = true;
    }

    protected render(): TemplateResult {
        if (this._loading) return html`<div>Loading...</div>`;

        const isPhone = deviceType === "phone";
        const containerStyles = {
            padding: isPhone ? "0.5rem" : "1rem",
        };

        return html`
            <div class="container" style="${styleMap(containerStyles)}">
                <div class="top-wrapper">
                    <div>${this._renderHeader()}</div>
                    <div>${this._renderArea()}</div>
                </div>
                <div>${this._renderBody()}</div>
                <div>${this._renderFooter()}</div>
            </div>
        `;
    }

    protected async firstUpdated(changedProps: PropertyValues) {
        super.firstUpdated(changedProps);

        await this._loadContent();

        this._loading = false;
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

    private _renderHeader() {
        let time = this.hass?.states["sensor.current_time"]?.state || "Loading...";
        let date = this.hass?.states["sensor.current_date"]?.state || "Loading...";

        return html`
            <div class="header-container">
                <div class="header-time-date" @click="${this._launchClock}">
                    <div class="time">${time}</div>
                    <div class="date">${date}</div>
                </div>
                <div class="header-chips">
                    ${this._headerChips.map((chip) => html`<div class="chip">${chip}</div>`)}
                </div>
            </div>
        `;
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
            <div class="body-container">
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
            </div>
        `;
    }

    private _renderFooter() {
        return html`
            <div class="footer-container">
                ${this._renderFooterButton("hass:home", "Home", "_handleHome")}
                ${this._renderFooterButton("hass:view-dashboard", "Areas", "_handleAreas")}
                ${this._renderFooterButton("hass:music", "Entertainment", "_handleEntertain")}
                ${this._renderFooterButton("hass:menu", "Menu", "_handleMenu")}
            </div>
        `;
    }

    private _renderFooterButton(icon: string, name: string, methodName: keyof ActionHandlers): TemplateResult {
        return html`
            <div class="footer-button" @click="${(e: Event) => this._handleFooterAction(e, methodName)}">
                <ha-icon .icon=${icon}></ha-icon>
                ${deviceType !== "phone" ? html`<span>${name}</span>` : ""}
            </div>
        `;
    }

    private _initializeSwiper() {
        const swiperContainer = this.shadowRoot?.querySelector(".swiper");
        if (!swiperContainer) return;

        const swiperParams: SwiperOptions = {
            modules: [Navigation],
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            initialSlide: 0,
        };

        Swiper.use([Navigation]);

        this._swiper = new Swiper(swiperContainer as HTMLElement, swiperParams);
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

    private _launchClock(e: Event) {
        e.stopPropagation();
        if (typeof window.fully !== "undefined" && window.fully.startApplication) {
            window.fully.startApplication("com.google.android.deskclock");
        } else {
            console.warn("fully.startApplication is not available.");
        }
    }

    private _handleFooterAction(e: Event, methodName: keyof ActionHandlers): void {
        e.stopPropagation();
        if (typeof this[methodName] === "function") {
            this[methodName]();
        } else {
            console.error(`Method not found: ${methodName}`);
        }
    }

    private _handleHome(): void {
        const basePath = window.smartqasa.homePath;
        window.smartqasa.viewMode = "area";
        const path = location.href.endsWith("/" + basePath) ? "home" : basePath;
        window.history.pushState(null, "", `/home-dash/${path}`);
        window.dispatchEvent(new CustomEvent("location-changed"));
    }

    private _handleAreas(): void {
        areasDialog(this.hass);
    }

    private _handleEntertain(): void {
        entertainDialog(this._config, this.hass);
    }

    private async _handleMenu(): Promise<void> {
        try {
            const dialogConfig = await menuConfig(0);
            window.browser_mod?.service("popup", dialogConfig);
        } catch (error) {
            console.error("Error loading menu configuration", error);
        }
    }
}
