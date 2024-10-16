import {
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
  unsafeCSS,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import {
  HassArea,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../types";
import { getDeviceOrientation, getDeviceType } from "../utils/device-info";
import { navigateToArea } from "../utils/navigate-to-area";
import Swiper from "swiper";
import { SwiperOptions } from "swiper/types";
import { Navigation } from "swiper/modules";
import { createElement } from "../utils/create-element";
import { loadYamlAsJson } from "../utils/load-yaml-as-json";
import { areasDialog } from "../misc/areas-dialog";
import { entertainDialog } from "../misc/entertain-dialog";
import { menuConfig } from "../misc/menu-config";
import { formattedTime, formattedDate } from "../utils/format-date-time";
import { SS_CYCLE_TIMER, SS_HIDE_EVENTS, SS_IDLE_TIMER } from "../const";

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
  @state() private _loading = true;
  @state() private _isAdmin = false;
  @state() private _deviceOrientation: string = getDeviceOrientation();
  @state() private _deviceType: string = getDeviceType();
  private _timeIntervalId: number | undefined;
  private _boundHandleDeviceChanges = this._handleDeviceChanges.bind(this);
  private _swiper?: Swiper;
  private _resetTimer?: ReturnType<typeof setTimeout>;
  private _area?: string;
  private _areaObj?: HassArea;
  private _headerChips: LovelaceCard[] = [];
  private _areaChips: LovelaceCard[] = [];
  private _bodyTiles: LovelaceCard[][] = [];
  private _bodyColumns: number[] = [];

  private _screenSaverActive = false;
  private _sSidleTimer: number | undefined;
  private _sSanimationTimer: number | undefined;

  static styles: CSSResultGroup = [
    unsafeCSS(swiperStyles),
    unsafeCSS(panelStyles),
  ];

  public async setConfig(config: Config) {
    this._config = { ...config };
    this._area = this._config.area;
    this._loading = true;
  }

  protected async firstUpdated(changedProps: PropertyValues) {
    super.firstUpdated(changedProps);

    await this._loadContent();

    if (this._deviceType === "tablet") {
      this._initializeSwiper();
      this._startResetTimer();
    }

    ["orientationchange", "resize"].forEach((event) =>
      window.addEventListener(event, this._boundHandleDeviceChanges),
    );

    this._syncTime();

    this._startSsIdleTimer();

    SS_HIDE_EVENTS.forEach((event) =>
      window.addEventListener(event, () => this._resetScreenSaver()),
    );

    this._loading = false;
  }

  protected updated(changedProps: PropertyValues) {
    super.updated(changedProps);

    this._isAdmin = this.hass?.user?.is_admin ?? false;

    if (this._deviceType === "tablet") {
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

      if (this._deviceType === "tablet" && this._headerChips.length) {
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

    if (this._timeIntervalId !== undefined) {
      clearInterval(this._timeIntervalId);
    }

    if (this._resetTimer) {
      clearTimeout(this._resetTimer);
    }

    ["orientationchange", "resize"].forEach((event) =>
      window.removeEventListener(event, this._boundHandleDeviceChanges),
    );

    SS_HIDE_EVENTS.forEach((event) =>
      window.removeEventListener(event, () => this._resetScreenSaver()),
    );

    if (this._sSidleTimer) {
      clearTimeout(this._sSidleTimer);
    }
    if (this._sSanimationTimer) {
      clearTimeout(this._sSanimationTimer);
    }
  }

  protected render(): TemplateResult {
    if (this._loading) return html`<div>Loading...</div>`;

    const isPhoneLandscape =
      this._deviceType === "phone" && this._deviceOrientation === "landscape";

    return html`
      <div
        class="screen-saver"
        style="display: ${this._screenSaverActive ? "block" : "none"};"
      >
        <div class="ss-element">
          <div class="ss-time">${formattedTime()}</div>
          <div class="ss-date">${formattedDate()}</div>
        </div>
      </div>
      <div
        class="container"
        style="display: ${!this._screenSaverActive
          ? "grid"
          : "none"}; height: ${this._isAdmin ? "calc(100vh - 56px)" : "100vh"};"
      >
        ${this._deviceType === "tablet" ? this._renderHeader() : nothing}
        ${this._renderArea()} ${this._renderBody()}
        ${isPhoneLandscape ? nothing : this._renderFooter()}
      </div>
    `;
  }

  private _handleDeviceChanges() {
    this._deviceOrientation = getDeviceOrientation();
    this._deviceType = getDeviceType();
  }

  private _renderHeader() {
    return html`
      <div class="header-container">
        <div class="header-time-date" @click="${this._launchClock}">
          <div class="time">${formattedTime()}</div>
          <div class="date">${formattedDate()}</div>
        </div>
        <div class="header-chips">
          ${this._headerChips.map(
            (chip) => html`<div class="chip">${chip}</div>`,
          )}
        </div>
      </div>
    `;
  }

  private _renderArea() {
    const name = this._config?.name ?? this._areaObj?.name ?? "Area";
    const picture = this._config?.picture
      ? `/local/smartqasa/images/${this._config.picture}`
      : (this._areaObj?.picture ?? defaultImage);

    const isPhoneLandscape =
      this._deviceType === "phone" && this._deviceOrientation === "landscape";

    return html`
      <div class="area-container">
        <div class="area-name ${this._deviceType === "phone" ? "overlay" : ""}">
          ${name}
        </div>
        <img class="area-image" alt="Area picture..." src=${picture} />
        ${this._areaChips.length > 0
          ? html`
              <div class="area-chips">
                ${this._areaChips.map(
                  (chip) => html`<div class="chip">${chip}</div>`,
                )}
              </div>
            `
          : nothing}
        ${isPhoneLandscape
          ? html`<div class="footer-container">${this._renderFooter()}</div>`
          : nothing}
      </div>
    `;
  }

  private _renderBody() {
    if (!this._config || !this._bodyTiles.length) return nothing;

    if (this._deviceType === "phone") {
      const gridStyle = { gridTemplateColumns: "1fr 1fr" };
      return html`
        <div class="body-tiles" style=${styleMap(gridStyle)}>
          ${this._bodyTiles
            .flat()
            .map((tile) => html`<div class="tile">${tile}</div>`)}
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
        ${this._bodyTiles.length > 1
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

  private _renderFooter() {
    return html`
      <div class="footer-container">
        ${this._renderFooterButton("hass:home", "Home", "_handleHome")}
        ${this._renderFooterButton(
          "hass:view-dashboard",
          "Areas",
          "_handleAreas",
        )}
        ${this._renderFooterButton(
          "hass:music",
          "Entertainment",
          "_handleEntertain",
        )}
        ${this._renderFooterButton("hass:menu", "Menu", "_handleMenu")}
      </div>
    `;
  }

  private _renderFooterButton(
    icon: string,
    name: string,
    methodName: keyof ActionHandlers,
  ): TemplateResult {
    return html`
      <div
        class="footer-button"
        @click="${(e: Event) => this._handleFooterAction(e, methodName)}"
      >
        <ha-icon .icon=${icon}></ha-icon>
        <span>${name}</span>
      </div>
    `;
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

  private _initializeSwiper() {
    if (this._bodyTiles.length <= 1) {
      return;
    }

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

  private _startResetTimer() {
    if (this._resetTimer) {
      clearTimeout(this._resetTimer);
    }

    this._resetTimer = setTimeout(
      () => {
        this._resetToFirstPage();
      },
      5 * 60 * 1000,
    ); // 5 minutes
  }

  private _resetToFirstPage() {
    if (this._swiper && this._swiper.activeIndex !== 0) {
      this._swiper.slideTo(0);
    }

    this._startResetTimer();
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
      chipsConfig = (await loadYamlAsJson(
        yamlFilePath,
      )) as LovelaceCardConfig[];
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

  private async _loadAreaChips(
    chipsConfig: LovelaceCardConfig[],
  ): Promise<LovelaceCard[]> {
    return chipsConfig.map((config) => {
      const chip = createElement(config) as LovelaceCard;
      chip.hass = this.hass;
      return chip;
    });
  }

  private async _loadBodyTiles(
    tilesConfig: LovelaceCardConfig[],
  ): Promise<LovelaceCard[][]> {
    const pages: LovelaceCard[][] = [];
    this._bodyColumns = [];
    let currentPage: LovelaceCard[] = [];
    let firstTile = true;

    for (const config of tilesConfig) {
      if (firstTile) {
        const columns =
          config.type === "page" && config.columns >= 2 && config.columns <= 4
            ? config.columns
            : 3;
        this._bodyColumns.push(columns);
      }

      if (config.type === "page") {
        if (!firstTile && currentPage.length) {
          pages.push(currentPage);
          currentPage = [];

          const columns =
            config.type === "page" && config.columns >= 2 && config.columns <= 4
              ? config.columns
              : 3;
          this._bodyColumns.push(columns);
        }
      } else if (config.type === "blank") {
        if (this._deviceType === "tablet") {
          const blankTile = document.createElement("div");
          blankTile.classList.add("blank-tile");
          currentPage.push(blankTile as unknown as LovelaceCard);
        }
      } else {
        const tile = createElement(config) as LovelaceCard;
        if (tile) {
          tile.hass = this.hass;
          currentPage.push(tile);
        } else {
          console.error("Failed to create tile for config:", config);
        }
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

      this._startResetTimer();
    }
  }

  private _handleFooterAction(
    e: Event,
    methodName: keyof ActionHandlers,
  ): void {
    e.stopPropagation();
    if (typeof this[methodName] === "function") {
      this[methodName]();
    } else {
      console.error(`Method not found: ${methodName}`);
    }
  }

  private _handleHome(): void {
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

  private _startSsIdleTimer(): void {
    this._sSidleTimer = window.setTimeout(() => {
      this._screenSaverActive = true;
      this.requestUpdate();
      this._runSsCycle();
    }, SS_IDLE_TIMER);
  }

  private _runSsCycle(): void {
    this._moveSsElement();

    const container = this.shadowRoot?.querySelector(
      ".ss-element",
    ) as HTMLElement;
    if (container) {
      container.style.animation = "fade-in 1.5s forwards";
    }

    this._sSanimationTimer = window.setTimeout(() => {
      if (container) {
        container.style.animation = "fade-out 1.5s forwards";
      }

      this._sSanimationTimer = window.setTimeout(() => {
        this._runSsCycle();
      }, 1500);
    }, SS_CYCLE_TIMER + 1500);
  }

  private _moveSsElement(): void {
    const container = this.shadowRoot?.querySelector(
      ".screen-saver",
    ) as HTMLElement;
    const element = this.shadowRoot?.querySelector(
      ".ss-element",
    ) as HTMLElement;

    if (container && element) {
      const maxWidth = container.clientWidth - element.clientWidth;
      const maxHeight = container.clientHeight - element.clientHeight;

      const randomX = Math.max(0, Math.floor(Math.random() * maxWidth));
      const randomY = Math.max(0, Math.floor(Math.random() * maxHeight));

      element.style.left = `${randomX}px`;
      element.style.top = `${randomY}px`;
    }
  }

  private _resetScreenSaver(): void {
    if (this._screenSaverActive) {
      setTimeout(() => {
        this._screenSaverActive = false;
        this.requestUpdate();
        clearTimeout(this._sSanimationTimer);
      }, 250);
    }
    clearTimeout(this._sSidleTimer);
    this._startSsIdleTimer();
  }
}
