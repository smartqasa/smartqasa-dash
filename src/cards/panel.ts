import { css, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassArea, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { deviceType } from "../const";
import { createElement } from "../utils/create-element";
import { loadYamlAsJson } from "../utils/load-yaml-as-json";

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
    @property({ attribute: false }) public hass!: HomeAssistant;
    @state() private _config?: Config;
    private _area?: string;
    private _areaObj?: HassArea;
    private _headerChips: LovelaceCard[] = [];

    static styles = css`
        :host {
            height: 100%;
            background: var(--sq-panel-background);
        }
        .container {
            display: grid;
            grid-template-rows: auto auto 1fr auto;
        }
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .header-chips {
            display: flex;
            flex-direction: row;
            margin-right: calc(var(--sq-chip-margin, 0.4rem) * -1);
            align-items: flex-start;
            justify-content: flex-end;
        }
        .chip {
            display: flex;
        }
    `;

    protected update(changedProps: PropertyValues) {
        if (changedProps.has("hass") && this.hass && this._headerChips) {
            this._headerChips.forEach((chip) => {
                chip.hass = this.hass;
            });
        }
        super.update(changedProps);
    }

    protected render(): TemplateResult {
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

    private _renderHeader() {
        if (!this._headerChips.length) this._createHeaderChips();
        return html`
            <div class="header-content">
                <smartqasa-time-date .hass=${this.hass}></smartqasa-time-date>
                <div class="header-chips">
                    ${this._headerChips.map((chip) => html`<div class="chip">${chip}</div>`)}
                </div>
            </div>
        `;
    }

    private async _createHeaderChips(): Promise<void> {
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

    private _renderArea() {
        return html`<p>Area content with dynamic data.</p>`;
    }

    private _renderTiles(isPhone: boolean) {
        return isPhone ? html`<p>Phone Tiles</p>` : html`<p>Tablet Tiles</p>`;
    }

    private _renderFooter() {
        return html`<p>Footer content with dynamic data.</p>`;
    }
}
