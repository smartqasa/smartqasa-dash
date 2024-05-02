import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../src/types";
import { loadYamlAsJson } from "../src/utils/load-yaml-as-json";

import { chipBaseStyle, chipTextStyle } from "../src/styles/chip";

interface Config extends LovelaceCardConfig {
    file: string;
}

window.customCards.push({
    type: "smartqasa-custom-chip",
    name: "SmartQasa Custom Chip",
    preview: true,
    description: "A SmartQasa chip for custom.",
});

@customElement("smartqasa-custom-chip")
export class CustomChip extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private initialized: boolean = false;
    @state() private config?: Config;
    @state() private dialogObj?: any;
    @state() private stateObj?: HassEntity;

    private file?: string;
    private entity?: string;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
        this.file = this.config.file;
    }

    updated(changedProps: PropertyValues) {
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }

    protected render(): TemplateResult {
        if (!this.stateObj) return html``;

        const { icon, iconAnimation, iconColor, text } = this.updateState();

        const containerStyle = {
            "margin-left": "0.7rem",
            "grid-template-areas": text ? '"i t"' : '"i"',
        };
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.showDialog}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                ${text ? html`<div class="text">${text}</div>` : null}
            </div>
        `;
    }

    private async updateState() {
        let icon, iconAnimation, iconColor;
        this.dialogObj = await loadYamlAsJson(`/local/smartqasa/dialogs/${this.file}`);

        if (this.dialogObj.data.icon) {
            icon = this.dialogObj.data.icon;
        } else {
            icon = "mdi:help-circle";
        }
        iconAnimation = "none";
        iconColor = "var(--sq-primary-text-rgb)";

        return { icon, iconAnimation, iconColor };
    }

    private showDialog(e: Event): void {
        e.stopPropagation();

        const dialogConfig = { ...this.dialogObj.data };
        window.browser_mod?.service("popup", dialogConfig);
    }
}
