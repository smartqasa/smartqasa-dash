import { CSSResult, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassArea, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { deviceType } from "../const";
import { createElement } from "../utils/create-element";
import { loadYamlAsJson } from "../utils/load-yaml-as-json";
import defaultImage from "../assets/images/default.png";
import { panelStyle } from "../styles/panel";

interface Config extends LovelaceCardConfig {
    area: string;
    name?: string;
    picture?: string;
}

window.customCards.push({
    type: "smartqasa-panel-card",
    name: "SmartQasa Panel Card",
    preview: true,
    description: "A SmartQasa card for rendering Main Panel.",
});

@customElement("smartqasa-panel-card")
export class PanelCard extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _loading = true;
    private _area?: string;
    private _areaObj?: HassArea;
    private _headerChips: LovelaceCard[] = [];

    static styles: CSSResult = panelStyle;

    public async setConfig(config: Config) {
        this._config = { ...config };
        this._area = this._config.area;
    }

    protected update(changedProps: PropertyValues) {
        super.update(changedProps);
        if (changedProps.has("hass") && this.hass && this._headerChips.length) {
            this._headerChips.forEach((chip) => {
                chip.hass = this.hass;
            });
        }
    }

    protected render(): TemplateResult {
        if (this._loading) {
            return html`<div>Loading...</div>`;
        }

        const isPhone = deviceType === "phone";

        const containerStyles = {
            padding: isPhone ? "0.5rem" : "1rem",
            gridTemplateAreas: isPhone ? '"area" "phone_tiles" "footer"' : '"header" "area" "tablet_tiles" "footer"',
        };

        return html`
            <div class="container" style="${styleMap(containerStyles)}">
                <div style="grid-area: header;">${this._renderHeader()}</div>
                <div style="grid-area: area;">${this._renderArea()}</div>
                <div style="grid-area: ${isPhone ? "phone_tiles" : "tablet_tiles"};">${this._renderTiles(isPhone)}</div>
                <div style="grid-area: footer;">${this._renderFooter()}</div>
            </div>
        `;
    }

    protected firstUpdated(changedProps: PropertyValues) {
        super.firstUpdated(changedProps);
        this._loading = false;
    }

    private _renderHeader() {
        let time = this.hass?.states["sensor.current_time"]?.state || "Loading...";
        let date = this.hass?.states["sensor.current_date"]?.state || "Loading...";
        if (!this._headerChips.length) this._createHeaderChips();
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

    private async _createHeaderChips() {
        if (!this.hass) return;

        let chipsConfig: LovelaceCardConfig[];

        try {
            const yamlFilePath = "/local/smartqasa/lists/chips.yaml";
            chipsConfig = (await loadYamlAsJson(yamlFilePath)) as LovelaceCardConfig[];
        } catch (error) {
            console.error("Error loading header chips:", error);
            this._headerChips = [];
            return;
        }

        this._headerChips = chipsConfig.map((config) => {
            const card = createElement(config) as LovelaceCard;
            card.hass = this.hass;
            return card;
        });
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
        const height = deviceType === "phone" ? "15vh" : "20vh";
        const picture = this._config?.picture
            ? `/local/smartqasa/images/${this._config.picture}`
            : this._areaObj?.picture ?? defaultImage;

        return html`
            <div class="area-container">
                <div class="area-info">
                    <div class="area-name">${this._areaObj?.name}</div>
                </div>
                <img class="area-image" alt="Area picture..." src=${picture} style="max-height: ${height};" />
            </div>
        `;
    }

    private _renderTiles(isPhone: boolean) {
        return isPhone ? html`<p>Phone Tiles</p>` : html`<p>Tablet Tiles</p>`;
    }

    private _renderFooter() {
        return html`<p>Footer content with dynamic data.</p>`;
    }
}
