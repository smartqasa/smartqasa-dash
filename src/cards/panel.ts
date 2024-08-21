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
    private _headerChips?: LovelaceCardConfig[];

    static styles = css`
        :host {
            display: block;
            height: 100%;
            background: var(--sq-panel-background);
        }
        .container {
            display: grid;
            grid-template-rows: auto auto 1fr auto;
        }
        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .header-chip-container {
            display: flex;
            flex-direction: row;
            margin-right: calc(var(--sq-chip-margin, 0.4rem) * -1);
            align-items: center;
            justify-content: flex-end;
        }
        .header-chip {
            display: flex;
        }
    `;

    public async setConfig(config: Config): Promise<void> {
        this._config = { ...config };
        this._area = this._config.area;

        const yamlFilePath = "/local/smartqasa/lists/chips.yaml";
        this._headerChips = ((await loadYamlAsJson(yamlFilePath)) as LovelaceCardConfig[]) || undefined;
        this.requestUpdate(); // Ensure re-render
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            (changedProps.has("hass") && this._area && this.hass.areas[this._area] !== this._areaObj) ||
            changedProps.has("_config")
        );
    }

    protected render(): TemplateResult {
        const isPhone = deviceType === "phone";

        const containerStyles = {
            padding: isPhone ? "0.5rem" : "1rem",
            gridTemplateAreas: isPhone ? '"area" "phone_tiles" "footer"' : '"header" "area" "tablet_tiles" "footer"',
        };

        return html`
            <div class="container" style="${styleMap(containerStyles)}">
                <div style="grid-area: header;">${this.renderHeader()}</div>
                <div style="grid-area: area;">${this.renderArea()}</div>
                <div style="grid-area: ${isPhone ? "phone_tiles" : "tablet_tiles"};">${this.renderTiles(isPhone)}</div>
                <div style="grid-area: footer;">${this.renderFooter()}</div>
            </div>
        `;
    }

    private renderHeader() {
        console.log("Header Chips:", this._headerChips);
        return html`
            <div class="header-content">
                <smartqasa-time-date .hass=${this.hass}></smartqasa-time-date>
                ${this._headerChips ? this.renderHeaderChips() : nothing}
            </div>
        `;
    }

    private renderHeaderChips() {
        return html`
            <div class="header-chip-container">
                ${this._headerChips!.map((chip) => {
                    const chipElement = createElement(chip) as LovelaceCard;
                    chipElement.hass = this.hass;
                    return chipElement;
                })}
            </div>
        `;
    }

    renderArea() {
        return html`<p>Area content with dynamic data.</p>`;
    }

    renderTiles(isPhone: boolean) {
        return isPhone ? html`<p>Phone Tiles</p>` : html`<p>Tablet Tiles</p>`;
    }

    renderFooter() {
        return html`<p>Footer content with dynamic data.</p>`;
    }
}
