import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HassArea, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { getDeviceOrientation, getDeviceType } from "../utilities/device-info";
import { createElements } from "../utilities/create-elements";
import Swiper from "swiper";
import { SwiperOptions } from "swiper/types";
import { Navigation } from "swiper/modules";
import { renderHeader } from "./header";
import { renderArea } from "./area";
import { loadControlTiles, renderControls } from "./controls";
import { renderFooter } from "./footer";

import panelStyles from "../css/panel.css";
import entertainStyles from "../css/entertain.css";
import swiperStyles from "swiper/swiper-bundle.css";

interface Config extends LovelaceCardConfig {
    area: string;
    name?: string;
    picture?: string;
    audio_player: string;
    video_player: string;
    video_sound: string;
    header_chips?: LovelaceCardConfig[];
    area_chips?: LovelaceCardConfig[];
    tiles?: LovelaceCardConfig[];
}

window.customCards.push({
    type: "smartqasa-panel-card",
    name: "SmartQasa Panel Card",
    preview: true,
    description: "A SmartQasa card for rendering an panel.",
});
@customElement("smartqasa-panel-card")
export class PanelCard extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 100;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _isAdminMode = false;
    @state() private _isPhone: boolean = getDeviceType() === "phone";
    @state() private _isTablet: boolean = getDeviceType() === "tablet";
    @state() private _isPortrait: boolean = getDeviceOrientation() === "portrait";
    @state() private _isLandscape: boolean = getDeviceOrientation() === "landscape";
    @state() private _swiper: Swiper | undefined;

    private _boundHandleDeviceChanges = () => this._handleDeviceChanges();
    private _boundStartResetTimer = () => this._startResetTimer();
    private _viewModeChangedHandler = () => this.requestUpdate();

    private _timeIntervalId: number | undefined;
    private _resetTimer?: ReturnType<typeof setTimeout>;
    private _area?: string;
    private _areaObj?: HassArea;
    private _headerChips: LovelaceCard[] = [];
    private _areaChips: LovelaceCard[] = [];
    private _controlTiles: LovelaceCard[][] = [];
    private _controlColumns: number[] = [];

    static styles: CSSResultGroup = [unsafeCSS(swiperStyles), unsafeCSS(panelStyles), unsafeCSS(entertainStyles)];

    public setConfig(config: Config) {
        this._config = config;
        this._area = this._config.area;
    }

    public connectedCallback(): void {
        super.connectedCallback();

        this._syncTime();

        window.smartqasa.viewMode = "control";

        window.addEventListener("resize", this._boundHandleDeviceChanges);
        window.addEventListener("orientationchange", this._boundHandleDeviceChanges);
        window.addEventListener("touchstart", this._boundStartResetTimer, { passive: true });
        window.addEventListener("viewModeChanged", this._viewModeChangedHandler);

        this._startResetTimer();
    }

    protected willUpdate(changedProps: PropertyValues): void {
        if (this.hass) {
            const isAdminMode = this.hass.states["input_boolean.admin_mode"]?.state === "on";
            this._isAdminMode = (this.hass.user?.is_admin ?? false) || isAdminMode;
        }

        if (this.hass && this._headerChips.length === 0 && window.smartqasa.chipsConfig.length > 0) {
            this._headerChips = createElements(window.smartqasa.chipsConfig, this.hass);
        }

        if (changedProps.has("_config") && this._config) this._loadContent();

        if (changedProps.has("hass") && this.hass) {
            this._areaObj = this._area ? this.hass?.areas[this._area] : undefined;

            const updateHassForCards = (cards: LovelaceCard[]) => {
                cards.forEach((card) => {
                    if (card.hass !== this.hass) card.hass = this.hass;
                });
            };

            if (this._isTablet && this._headerChips.length > 0) updateHassForCards(this._headerChips);

            if (this._areaChips.length > 0) updateHassForCards(this._areaChips);

            if (this._controlTiles.length > 0)
                this._controlTiles.forEach((page) => {
                    updateHassForCards(page);
                });
        }
    }

    protected firstUpdated(): void {
        this._loadContent();
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
        window.removeEventListener("viewModeChanged", this._viewModeChangedHandler);

        if (this._timeIntervalId !== undefined) {
            clearInterval(this._timeIntervalId);
        }

        if (this._resetTimer) {
            clearTimeout(this._resetTimer);
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this.hass || !this._config || !this._area) return nothing;

        const name = this._config?.name ?? this._areaObj?.name ?? "Area";

        const picture = this._config.picture ?? `${this._area}.png`;

        // prettier-ignore
        return html`
            <div
                class="container"
                ?admin=${this._isAdminMode}
            >
                ${this._isTablet ? renderHeader(this._headerChips) : nothing}
                ${renderArea(name, picture, this._areaChips, this._isPhone, this._isLandscape)}
                ${renderControls(this._controlTiles, this._controlColumns, this._isPhone, this._swiper)}
                ${this._isPhone && this._isLandscape ? nothing : renderFooter()}
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

        if (this._isTablet && this._controlTiles.length > 1) {
            this._initializeSwiper();
        }
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
        window.smartqasa.viewMode = "control";
        if (this._swiper && this._swiper.activeIndex !== 0) {
            this._swiper.slideTo(0);
        }

        this._startResetTimer();
    }

    private _loadContent(): void {
        if (!this.hass || !this._config) return;

        const headerChipsConfig = window.smartqasa.chipsConfig;
        if (headerChipsConfig) this._headerChips = createElements(window.smartqasa.chipsConfig, this.hass);

        this._areaObj = this._area ? this.hass.areas[this._area] : undefined;
        this._areaChips = createElements(this._config.area_chips || [], this.hass);

        const { controlTiles, controlColumns } = loadControlTiles(this._config.tiles || [], this.hass, this._isTablet);
        this._controlTiles = controlTiles;
        this._controlColumns = controlColumns;

        /*
        this._entertainCards = loadEntertainCards(
            this._config.audio_player || "",
            this._config.video_player || "",
            this._config.video_sound || "",
            this.hass
        ) as LovelaceCard[];
        */
    }
}
