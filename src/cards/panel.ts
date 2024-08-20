import { css, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassArea, HomeAssistant, LovelaceCardConfig } from "../types";
import { deviceType } from "../const";
import yaml from "js-yaml";

// Function to load and parse the YAML file
export async function loadYamlAsJson(yamlFilePath: string) {
    try {
        const response = await fetch(yamlFilePath);
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            return {
                type: "custom:smartqasa-title-card",
                title: "Missing file.",
            };
        }
        const yamlContent = await response.text();
        const jsonContent = yaml.load(yamlContent);
        return jsonContent;
    } catch (e) {
        console.error("Error fetching and parsing YAML file:", e);
        return {
            type: "custom:smartqasa-title-card",
            title: "Missing file.",
        };
    }
}

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
    `;

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._area = this._config.area;

        const yamlFilePath = "/config/www/smartqasa/lists/chips.yaml";
        loadYamlAsJson(yamlFilePath).then((jsonConfig: unknown) => {
            this._headerChips = jsonConfig as LovelaceCardConfig[];
        });
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            (changedProps.has("hass") && this._area && this.hass.areas[this._area] !== this._areaObj) ||
            changedProps.has("_config") ||
            changedProps.has("headerCardsConfig")
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

    renderHeader() {
        return html`
            <div class="header-content">
                <smartqasa-time-date .hass=${this.hass}></smartqasa-time-date>
                ${this._headerChips
                    ? html`
                          <smartqasa-horizontal-stack
                              .hass=${this.hass}
                              .config=${{
                                  type: "custom:smartqasa-horizontal-stack",
                                  align_right: true,
                                  cards: this._headerChips,
                              }}
                          ></smartqasa-horizontal-stack>
                      `
                    : nothing}
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
