import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassArea, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { getDeviceOrientation, getDeviceType } from "../utils/device-info";
import { formattedTime, formattedDate } from "../utils/format-date-time";
import { navigateToArea } from "../utils/navigate-to-area";
import Swiper from "swiper";
import { SwiperOptions } from "swiper/types";
import { Navigation } from "swiper/modules";
import { createElement } from "../utils/create-element";
import { loadYamlAsJson } from "../utils/load-yaml-as-json";
import { dialogTable } from "../tables/dialogs";
import { loadControlTiles, renderControls } from "./controls";
import { loadAudioCards } from "./audio";

import panelStyles from "../css/panel.css";
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
    @state() private _isAdminMode = false;
    @state() private _displayMode: "control" | "entertain" = "control";
    @state() private _isPhone: boolean = getDeviceType() === "phone";
    @state() private _isTablet: boolean = getDeviceType() === "tablet";
    @state() private _isPortrait: boolean = getDeviceOrientation() === "portrait";
    @state() private _isLandscape: boolean = getDeviceOrientation() === "landscape";

    private _boundHandleDeviceChanges: () => void;
    private _boundStartResetTimer: () => void;
    private _areaPicture: string = defaultImage;
    private _timeIntervalId: number | undefined;
    private _swiper: Swiper | undefined;
    private _resetTimer?: ReturnType<typeof setTimeout>;
    private _area?: string;
    private _areaObj?: HassArea;
    private _headerChips: LovelaceCard[] = [];
    private _areaChips: LovelaceCard[] = [];
    private _controlTiles: LovelaceCard[][] = [];
    private _controlColumns: number[] = [];
    private _audioCards: LovelaceCard[] = [];

    static styles: CSSResultGroup = [unsafeCSS(swiperStyles), unsafeCSS(panelStyles)];

    public async setConfig(config: Config) {
        this._config = { ...config };
        this._area = this._config.area;
        this._areaPicture = await this._getAreaPicture();
    }

    constructor() {
        super();
        this._boundHandleDeviceChanges = this._handleDeviceChanges.bind(this);
        this._boundStartResetTimer = this._startResetTimer.bind(this);
    }

    public connectedCallback(): void {
        super.connectedCallback();

        this._syncTime();

        window.addEventListener("resize", this._boundHandleDeviceChanges);
        window.addEventListener("orientationchange", this._boundHandleDeviceChanges);
        window.addEventListener("touchstart", this._boundStartResetTimer, { passive: true });

        this._loadContent();

        this._startResetTimer();
    }

    protected willUpdate(changedProps: PropertyValues): void {
        if (this.hass) {
            const isAdminMode = this.hass.states["input_boolean.admin_mode"]?.state === "on";
            this._isAdminMode = (this.hass.user?.is_admin ?? false) || isAdminMode;
        }

        if (changedProps.has("_config") && this._config) this._loadContent();

        if (changedProps.has("hass") && this.hass) {
            this._areaObj = this._area ? this.hass.areas[this._area] : undefined;

            const updateHassForCards = (cards: LovelaceCard[]) => {
                cards.forEach((card) => {
                    card.hass = this.hass;
                });
            };

            if (this._isTablet && this._headerChips.length) updateHassForCards(this._headerChips);

            if (this._areaChips.length) updateHassForCards(this._areaChips);

            if (this._controlTiles.length)
                this._controlTiles.forEach((page) => {
                    updateHassForCards(page);
                });
        }
    }

    protected updated(): void {
        if (this._isTablet && this._controlTiles.length > 1 && !this._swiper) {
            this._initializeSwiper();
        }
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();

        window.removeEventListener("resize", this._boundHandleDeviceChanges);
        window.removeEventListener("orientationchange", this._boundHandleDeviceChanges);
        window.removeEventListener("touchstart", this._boundStartResetTimer);

        if (this._timeIntervalId !== undefined) {
            clearInterval(this._timeIntervalId);
        }

        if (this._resetTimer) {
            clearTimeout(this._resetTimer);
        }
    }

    protected render(): TemplateResult {
        const displayMode = this._displayMode;

        let content;
        // prettier-ignore
        switch (displayMode) {
            case "control":
                content = html`
                    ${this._renderArea()}
                    ${renderControls(this._controlTiles, this._controlColumns, this._isPhone, this._swiper)}
                `;
                break;
            case "entertain":
                content = html`${this._renderEntertain()}`;
                break;
            default:
                content = nothing;
                break;
        }

        // prettier-ignore
        return html`
            <div
                class="container"
                ?admin=${this._isAdminMode}
                ?control=${displayMode === "control"}
                ?entertain=${displayMode === "entertain"}
            >
                ${this._isTablet ? this._renderHeader() : nothing}
                ${content}
                ${this._isPhone && this._isLandscape ? nothing : this._renderFooter()}
            </div>
        `;
    }

    private _handleDeviceChanges(): void {
        const type = getDeviceType();
        this._isPhone = type === "phone";
        this._isTablet = type === "tablet";

        const orientation = getDeviceOrientation();
        this._isPortrait = orientation === "portrait";
        this._isLandscape = orientation === "landscape";
    }

    private _renderHeader(): TemplateResult {
        return html`
            <div class="header-container">
                <div class="header-time-date" @click="${this._launchClock}">
                    <div class="time">${formattedTime()}</div>
                    <div class="date">${formattedDate()}</div>
                </div>
                <div class="header-chips">
                    ${this._headerChips.map((chip) => html`<div class="chip">${chip}</div>`)}
                </div>
            </div>
        `;
    }

    private _renderArea(): TemplateResult {
        const name = this._config?.name ?? this._areaObj?.name ?? "Area";

        const isPhoneLandscape = this._isPhone && this._isLandscape;

        return html`
            <div class="area-container">
                <div class="area-name ${this._isPhone ? "overlay" : ""}">${name}</div>
                <img class="area-picture" src=${this._areaPicture} alt="Area picture..." loading="lazy" />
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

    private async _getAreaPicture(): Promise<string> {
        if (this._areaPicture !== defaultImage) return this._areaPicture;

        if (this._config?.picture) {
            const configPictureFile = `/local/smartqasa/pictures/${this._config.picture}`;
            try {
                const response = await fetch(configPictureFile, { method: "HEAD" });
                if (response.ok) return (this._areaPicture = configPictureFile);
            } catch (error) {
                console.error("Picture from config not found, using defaultImage", error);
            }
        }

        const areaFileName = `/local/smartqasa/pictures/${this._area}.png`;
        try {
            const response = await fetch(areaFileName, { method: "HEAD" });
            if (response.ok) return (this._areaPicture = areaFileName);
        } catch (error) {}

        return (this._areaPicture = defaultImage);
    }

    private _renderControl(): TemplateResult | typeof nothing {
        if (!this._config || !this._controlTiles.length) return nothing;

        if (this._isPhone) {
            const gridStyle = { gridTemplateColumns: "1fr 1fr" };
            return html`
                <div class="control-tiles" style=${styleMap(gridStyle)}>
                    ${this._controlTiles.flat().map((tile) => html`<div class="tile">${tile}</div>`)}
                </div>
            `;
        }

        return html`
            <div class="swiper">
                <div class="swiper-wrapper">
                    ${this._controlTiles.map((page, index) => {
                        const gridStyle = {
                            gridTemplateColumns: `repeat(${this._controlColumns[index]}, var(--sq-tile-width, 19.5rem))`,
                        };

                        return html`
                            <div class="swiper-slide">
                                <div class="control-tiles" style=${styleMap(gridStyle)}>
                                    ${page.map((tile) => html`<div class="tile">${tile}</div>`)}
                                </div>
                            </div>
                        `;
                    })}
                </div>
                ${this._controlTiles.length > 1
                    ? html`
                          <div
                              class="swiper-button-prev"
                              @click=${(e: Event) => this._handleSwiperNavigation(e, "prev")}
                          ></div>
                          <div
                              class="swiper-button-next"
                              @click=${(e: Event) => this._handleSwiperNavigation(e, "next")}
                          ></div>
                      `
                    : nothing}
            </div>
        `;
    }

    private _renderEntertain(): TemplateResult {
        return html`
            <div class="entertain-container">
                <div class="entertain-card">${this._audioCards[0]}</div>
                <div class="entertain-card">${this._audioCards[1]}</div>
                <div class="entertain-card">${this._audioCards[2]}</div>
            </div>
        `;
    }

    private _renderFooter(): TemplateResult {
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

    private _syncTime(): void {
        const syncTime = () => {
            const now = new Date();
            const millisecondsUntilNextSecond = 1000 - now.getMilliseconds();

            setTimeout(() => {
                requestAnimationFrame(syncTime);
            }, millisecondsUntilNextSecond);
        };

        syncTime();
    }

    private _initializeSwiper() {
        const swiperContainer = this.shadowRoot?.querySelector(".swiper");
        if (!swiperContainer) {
            console.error("Swiper container not found");
            return;
        }

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
    }

    private _startResetTimer(): void {
        if (this._resetTimer) {
            clearTimeout(this._resetTimer);
        }

        this._resetTimer = setTimeout(() => {
            this._resetToFirstPage();
        }, 5 * 60 * 1000); // 5 minutes
    }

    private _resetToFirstPage(): void {
        if (this._swiper && this._swiper.activeIndex !== 0) {
            this._swiper.slideTo(0);
        }

        this._startResetTimer();
    }

    private _loadContent(): void {
        this._areaObj = this._area ? this.hass?.areas[this._area] : undefined;

        this._loadHeaderChips()
            .then((headerChips) => {
                this._headerChips = headerChips;
            })
            .catch((error) => {
                console.error("Error loading header chips:", error);
            });

        this._loadAreaChips(this._config?.chips || [])
            .then((areaChips) => {
                this._areaChips = areaChips;
            })
            .catch((error) => {
                console.error("Error loading area chips:", error);
            });

        const { controlTiles, controlColumns } = loadControlTiles(
            this._config?.tiles || [],
            this.hass!,
            this._isTablet
        );

        this._controlTiles = controlTiles;
        this._controlColumns = controlColumns;

        this._audioCards = loadAudioCards(this.hass!, this._config?.audio_player || "");
    }

    private async _loadHeaderChips(): Promise<LovelaceCard[]> {
        let chipsConfig: LovelaceCardConfig[] = [];
        try {
            const yamlFilePath = "/local/smartqasa/config/chips.yaml";
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

    private _launchClock(e: Event): void {
        e.stopPropagation();

        if (typeof window.fully !== "undefined" && window.fully.startApplication) {
            window.fully.startApplication("com.google.android.deskclock");
        } else {
            console.warn("fully.startApplication is not available.");
        }
    }

    private _handleSwiperNavigation(e: Event, direction: "prev" | "next"): void {
        e.stopPropagation();

        if (this._swiper) {
            if (direction === "prev") {
                this._swiper.slidePrev();
            } else {
                this._swiper.slideNext();
            }

            //this._startResetTimer();
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
        if (this._displayMode !== "control") {
            this._displayMode = "control";
            return;
        }

        const startArea = window.smartqasa.startArea;
        if (!startArea) return;

        const url = new URL(location.href);
        const pathSegments = url.pathname.split("/");
        const currentArea = pathSegments.pop();

        if (currentArea !== startArea) {
            navigateToArea(startArea);
        } else {
            navigateToArea("home");
        }
    }

    private _handleAreas(): void {
        this._displayMode = "control";
        const dialogObj = dialogTable["areas"];
        window.browser_mod?.service("popup", { ...dialogObj.data });
    }

    private _handleEntertain(): void {
        this._displayMode = "entertain";
    }

    private _handleMenu(): void {
        window.smartqasa.menuTab = 0;

        const dialogObj = dialogTable["menu"];
        window.browser_mod?.service("popup", { ...dialogObj.data });
    }
}