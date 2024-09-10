import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

// Import Types and Utilities
import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { getDeviceOrientation, getDeviceType } from "../utils/device-info";
import { loadYamlAsJson } from "../utils/load-yaml-as-json"; // Assuming this is your function to load YAML
import { createElement } from "../utils/create-element"; // Assuming this is your function to create elements
import { menuConfig } from "../misc/menu-config";

// Import Styles and Assets
import panelStyles from "../css/panel.css";
import swiperStyles from "swiper/swiper-bundle.css";
import defaultImage from "../assets/images/default.png";

// Import Swiper and its modules
import Swiper from "swiper";
import "swiper/swiper-bundle.css";

// Import Handlers (from panel folder)
import { renderHeader } from "../panel/header";
import { renderFooter } from "../panel/footer";
import { getAreaPicture, renderArea } from "../panel/area-handler";
import { renderBody, loadBodyTiles } from "../panel/body-renderer";
import { initializeSwiper, handleSwiperNavigation, startResetTimer, resetToFirstPage } from "../panel/swiper-handler";

// Define the configuration interface
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

window.customCards.push({
    type: "smartqasa-panel-card",
    name: "SmartQasa Panel Card",
    preview: true,
    description: "A SmartQasa card for rendering an panel.",
});

@customElement("smartqasa-panel-card")
export class PanelCard extends LitElement {
    // Component Properties
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _loading = true;
    @state() private _isAdmin = false;
    @state() private _deviceOrientation: string = getDeviceOrientation();
    @state() private _deviceType: string = getDeviceType();
    @state() private _areaPicture: string = defaultImage;

    // Private Fields
    private _timeIntervalId: number | undefined;
    private _boundHandleDeviceChanges = this._handleDeviceChanges.bind(this);
    private _swiper?: Swiper;
    private _resetTimer?: ReturnType<typeof setTimeout>;
    private _area?: string;
    private _areaObj?: any; // Adjust according to the correct type, if defined elsewhere
    private _headerChips: LovelaceCard[] = [];
    private _areaChips: LovelaceCard[] = [];
    private _bodyTiles: LovelaceCard[][] = [];
    private _bodyColumns: number[] = [];

    // Static Styles
    static styles: CSSResultGroup = [unsafeCSS(swiperStyles), unsafeCSS(panelStyles)];

    // Lifecycle Methods
    public async setConfig(config: Config) {
        this._config = { ...config };
        this._area = this._config.area;
        this._areaPicture = await getAreaPicture(this);
        this._loading = true;
    }

    protected async firstUpdated() {
        await this._loadContent();

        if (this._deviceType === "tablet") {
            initializeSwiper(this);
            startResetTimer(this);
        }

        ["orientationchange", "resize"].forEach((event) =>
            window.addEventListener(event, this._boundHandleDeviceChanges)
        );

        this._syncTime();
        this._loading = false;
    }

    protected updated(changedProps: PropertyValues) {
        this._isAdmin = this.hass?.user?.is_admin ?? false;

        if (this._deviceType === "tablet") {
            if (this._swiper) {
                this._swiper.update();
            } else {
                initializeSwiper(this);
            }
        }

        if (changedProps.has("_config") && this._config) {
            this._loadContent();
        } else if (changedProps.has("hass") && this.hass) {
            this._areaObj = this._area ? this.hass.areas[this._area] : undefined;

            this._headerChips.forEach((chip) => (chip.hass = this.hass));
            this._areaChips.forEach((chip) => (chip.hass = this.hass));
            this._bodyTiles.forEach((page) => page.forEach((tile) => (tile.hass = this.hass)));
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        if (this._timeIntervalId !== undefined) {
            clearInterval(this._timeIntervalId);
        }

        if (this._resetTimer) {
            clearTimeout(this._resetTimer);
        }

        ["orientationchange", "resize"].forEach((event) =>
            window.removeEventListener(event, this._boundHandleDeviceChanges)
        );
    }

    // Rendering Methods
    protected render(): TemplateResult {
        const isPhoneLandscape = this._deviceType === "phone" && this._deviceOrientation === "landscape";

        return html`
            <div class="container" style="height: ${this._isAdmin ? "calc(100vh - 56px)" : "100vh"};">
                ${this._deviceType === "tablet" ? renderHeader(this) : nothing} ${renderArea(this)} ${renderBody(this)}
                ${isPhoneLandscape ? nothing : renderFooter(this)}
            </div>
        `;
    }

    // Utility Methods
    private _handleDeviceChanges() {
        this._deviceOrientation = getDeviceOrientation();
        this._deviceType = getDeviceType();
    }

    private _syncTime() {
        const syncTime = () => {
            const now = new Date();
            const millisecondsUntilNextSecond = 1000 - now.getMilliseconds();

            setTimeout(() => {
                requestAnimationFrame(syncTime);
            }, millisecondsUntilNextSecond);
        };

        syncTime();
    }

    private async _loadContent() {
        this._areaObj = this._area ? this.hass?.areas[this._area] : undefined;

        this._headerChips = await this._loadHeaderChips();

        if (this._config?.chips) {
            this._areaChips = await this._loadAreaChips(this._config.chips);
        }

        if (this._config?.tiles) {
            this._bodyTiles = await loadBodyTiles(this, this._config.tiles);
        }
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
}
