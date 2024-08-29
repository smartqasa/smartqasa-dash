import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassArea, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import Swiper from "swiper";
import { SwiperOptions } from "swiper/types";
import { Navigation } from "swiper/modules";
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
    tiles?: LovelaceCardConfig[];
}

interface ActionHandlers {
    _handleHome: () => void;
    _handleAreas: () => void;
    _handleEntertain: () => void;
    _handleMenu: () => void;
}

window.customCards.push({
    type: "smartqasa-panel-card",
    name: "SmartQasa Panel Card",
    preview: true,
    description: "A SmartQasa card for rendering an panel.",
});
@customElement("smartqasa-panel-card")
export class PanelCard extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _loading = true;
    @state() private _isAdmin = false;
    @state() private deviceOrientation: string = this._getDeviceOrientation();
    @state() private deviceType: string = this._getDeviceType();
    private _swiper?: Swiper;
    private _area?: string;
    private _areaObj?: HassArea;
    private _headerChips: LovelaceCard[] = [];
    private _areaChips: LovelaceCard[] = [];
    private _bodyTiles: LovelaceCard[][] = [];
    private _bodyColumns: number[] = [];

    static styles: CSSResultGroup = [unsafeCSS(swiperStyles), panelStyles];

    public async setConfig(config: Config) {
        this._config = { ...config };
        this._area = this._config.area;
        this._loading = true;
    }

    protected render(): TemplateResult {
        if (this._loading) return html`<div>Loading...</div>`;

        const containerStyle = {
            height: this._isAdmin ? "calc(100vh - 56px)" : "100vh",
        };

        const isPhoneLandscape = this.deviceType === "phone" && this.deviceOrientation === "landscape";

        return html`
            <div class="container" style=${styleMap(containerStyle)}>
                ${this.deviceType === "tablet" ? this._renderHeader() : nothing} ${this._renderArea()}
                ${this._renderBody()} ${isPhoneLandscape ? nothing : this._renderFooter()}
            </div>
        `;
    }

    protected async firstUpdated(changedProps: PropertyValues) {
        super.firstUpdated(changedProps);

        await this._loadContent();

        if (this.deviceType === "tablet") this._initializeSwiper();

        ["orientationchange", "resize"].forEach((event) =>
            window.addEventListener(event, this._handleDeviceChanges.bind(this))
        );

        this._loading = false;
    }

    protected updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        this._isAdmin = this.hass?.user?.is_admin ?? false;

        if (this.deviceType === "tablet") {
            if (this._swiper) {
                this._swiper.update();
            } else {
                this._initializeSwiper();
            }
        }

        if (changedProps.has("_config") && this._config) {
            this._loadContent();
        } else if (changedProps.has("hass") && this.hass) {
            this._areaObj = this._area ? this.hass.areas[this._area] : undefined;

            if (this.deviceType === "tablet" && this._headerChips.length) {
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

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("resize", this._handleDeviceChanges.bind(this));
        window.removeEventListener("orientationchange", this._handleDeviceChanges.bind(this));
    }

    private _handleDeviceChanges() {
        this.deviceOrientation = this._getDeviceOrientation();
        this.deviceType = this._getDeviceType();
    }

    private _getDeviceOrientation(): string {
        return window.screen.orientation.type.startsWith("portrait") ? "portrait" : "landscape";
    }

    private _getDeviceType(): string {
        const { width, height } = window.screen;
        return (this.deviceOrientation === "portrait" ? width : height) < 600 ? "phone" : "tablet";
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
        const picture = this._config?.picture
            ? `/local/smartqasa/images/${this._config.picture}`
            : this._areaObj?.picture ?? defaultImage;

        const isPhoneLandscape = this.deviceType === "phone" && this.deviceOrientation === "landscape";

        return html`
            <div class="area-container">
                <div class="area-name ${this.deviceType === "phone" ? "overlay" : ""}">${name}</div>
                <img class="area-image" alt="Area picture..." src=${picture} />
                ${this._areaChips.length > 0
                    ? html`
                          <div class="area-chips">
                              ${this._areaChips.map((chip) => html`<div class="chip">${chip}</div>`)}
                          </div>
                      `
                    : nothing}
                ${isPhoneLandscape ? html`<div class="footer-container">${this._renderFooter()}</div>` : nothing}
            </div>
        `;
    }

    private _renderBody() {
        if (!this._config || !this._bodyTiles.length) return nothing;

        if (this.deviceType === "phone") {
            const gridStyle = { gridTemplateColumns: "1fr 1fr" };
            return html`
                <div class="body-tiles" style=${styleMap(gridStyle)}>
                    ${this._bodyTiles.flat().map((tile) => html`<div class="tile">${tile}</div>`)}
                </div>
            `;
        }

        return html`
            <div class="swiper">
                <div class="swiper-wrapper">
                    ${this._bodyTiles.map((page, index) => {
                        const gridStyle = {
                            gridTemplateColumns: `repeat(${this._bodyColumns[index]}, var(--sq-tile-width, 19.5rem))`,
                        };

                        return html`
                            <div class="swiper-slide">
                                <div class="body-tiles" style=${styleMap(gridStyle)}>
                                    ${page.map((tile) => html`<div class="tile">${tile}</div>`)}
                                </div>
                            </div>
                        `;
                    })}
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        `;
    }
    /*
                <div class="swiper-button-prev" @click=${(e: Event) => this._handleSwiperNavigation(e, "prev")}></div>
                <div class="swiper-button-next" @click=${(e: Event) => this._handleSwiperNavigation(e, "next")}></div>

*/

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
                <span>${name}</span>
            </div>
        `;
    }

    private _initializeSwiper() {
        const swiperContainer = this.shadowRoot?.querySelector(".swiper");
        if (!swiperContainer) return;

        const swiperParams: SwiperOptions = {
            initialSlide: 0,
            loop: true,
            modules: [Navigation],
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        };

        this._swiper = new Swiper(swiperContainer as HTMLElement, swiperParams);

        if (this._swiper) {
            Swiper.use([Navigation]);
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
        this._bodyColumns = [];
        let currentPage: LovelaceCard[] = [];
        let firstTile = true;

        for (const config of tilesConfig) {
            if (firstTile) {
                const columns =
                    config.type === "page" && config.columns >= 2 && config.columns <= 4 ? config.columns : 3;
                this._bodyColumns.push(columns);
            }

            if (config.type === "page") {
                if (!firstTile && currentPage.length) {
                    pages.push(currentPage);
                    currentPage = [];

                    const columns =
                        config.type === "page" && config.columns >= 2 && config.columns <= 4 ? config.columns : 3;
                    this._bodyColumns.push(columns);
                }
            } else if (config.type === "blank") {
                if (this.deviceType === "tablet") {
                    const blankTile = document.createElement("div");
                    blankTile.classList.add("blank-tile");
                    currentPage.push(blankTile as unknown as LovelaceCard);
                }
            } else {
                const tile = createElement(config) as LovelaceCard;
                tile.hass = this.hass;
                currentPage.push(tile);
            }

            firstTile = false;
        }

        if (currentPage.length) {
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

    private _handleSwiperNavigation(e: Event, direction: "prev" | "next") {
        e.stopPropagation();
        if (this._swiper) {
            if (direction === "prev") {
                this._swiper.slidePrev();
            } else {
                this._swiper.slideNext();
            }
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
        console.log("Panel", this._config?.audio_player);
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
