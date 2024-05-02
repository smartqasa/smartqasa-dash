import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { AreaRegistryEntry, HomeAssistant, LovelaceCardConfig } from "../types";
import { deviceType } from "../const";
import defaultImage from "../assets/images/default.png";

interface Config extends LovelaceCardConfig {
    area: string;
    picture?: string;
}

window.customCards.push({
    type: "smartqasa-area-picture",
    name: "SmartQasa Area Picture",
    preview: true,
    description: "A SmartQasa card for rendering an area picture.",
});

@customElement("smartqasa-area-picture")
export class AreaPicture extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private initialized: boolean = false;
    @state() private config?: Config;
    @state() private areaObj?: AreaRegistryEntry;

    private area?: string;

    static get styles(): CSSResultGroup {
        return css`
            :host {
                display: block;
            }
            ha-card {
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;
                border-radius: 4px;
                border: none;
                box-shadow: none;
                background-color: transparent;
                overflow: hidden;
            }
        `;
    }

    setConfig(config: Config): void {
        this.config = { ...config };
        this.area = this.config?.area;
    }

    updated(changedProps: PropertyValues) {
        if (changedProps.has("hass") && this.area) {
            this.areaObj = this.hass && this.area ? this.hass.areas[this.area] : undefined;
            this.initialized = true;
        }
    }

    render(): TemplateResult {
        if (!this.initialized || !this.areaObj) return html``;

        const height = deviceType === "phone" ? "15vh" : "20vh";
        const picture = this.config?.picture
            ? `/local/smartqasa/images/${this.config.picture}`
            : this.areaObj?.picture ?? defaultImage;

        return html`
            <ha-card style="background-image: url(${picture}); height: ${height};" class="picture"></ha-card>
        `;
    }
}
