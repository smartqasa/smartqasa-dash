import { css, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HassArea, HomeAssistant, LovelaceCardConfig } from "../types";
import { deviceType } from "../const";
import defaultImage from "../assets/images/default.png";

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

    getCardSize(): number {
        return 10;
    }

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
    `;

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._area = this._config.area;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._area && this.hass.areas[this._area] !== this._areaObj) ||
            (changedProps.has("config") && this._config)
        );
    }

    protected render(): TemplateResult {
        const isAdmin = this.hass.user?.is_admin;
        const isPhone = deviceType === "phone";

        const containerStyles = {
            //height: isAdmin ? "calc(100vh - 56px)" : "100vh",
            padding: isPhone ? "10px 10px 5px 10px" : "15px 15px 5px 15px",
            gridTemplateAreas: isPhone ? '"area" "phone_tiles" "footer"' : '"header" "area" "tablet_tiles" "footer"',
        };

        return html`
            <div class="container" style="${styleMap(containerStyles)}">
                ${isPhone ? html`<div style="grid-area: header;">${this.renderHeader()}</div>` : nothing}
                <div style="grid-area: area;">${this.renderArea()}</div>
                <div style="grid-area: ${isPhone ? "phone_tiles" : "tablet_tiles"};">${this.renderTiles(isPhone)}</div>
                <div style="grid-area: footer;">${this.renderFooter()}</div>
            </div>
        `;
    }

    renderHeader() {
        return html`<p>Header content with dynamic data.</p>`;
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
