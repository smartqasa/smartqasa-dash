import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { loadYamlAsJson } from "../utils/load-yaml-as-json";

import { chipBaseStyle, chipTextStyle } from "../styles/chip";

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

    @state() private config?: Config;
    @state() private dialogObj?: any;
    @state() private stateObj?: HassEntity;

    @state() private icon = "mdi:help-circle";
    @state() private iconAnimation = "none";
    @state() private iconColor = "var(--sq-primary-text-rgb)";

    private entity: string = "";
    private file?: string;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
        this.file = this.config.file;
        if (!this.file) return;
        this.initializeComponent();
    }

    updated(changedProps: PropertyValues) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
        }
    }

    async initializeComponent() {
        if (!this.config || !this.config.file) return;

        this.dialogObj = await loadYamlAsJson(`/local/smartqasa/dialogs/${this.config.file}`);

        this.icon = this.dialogObj.icon || "mdi:help-circle";
        if (this.dialogObj.icon_color && this.hass && this.hass.states) {
            try {
                this.iconColor = eval(this.dialogObj.icon_color);
            } catch (error) {
                console.error("Error evaluating icon color: ", error);
                this.iconColor = "var(--sq-inactive-rgb)";
            }
        } else {
            this.iconColor = "var(--sq-inactive-rgb)";
        }
        this.entity = this.dialogObj.entity || "";
    }

    protected render(): TemplateResult {
        if (!this.hass || !this.file) return html``;

        const text = this.hass.states[this.entity].state || "";

        const containerStyle = {
            "margin-left": "0.7rem",
            "grid-template-areas": text ? '"i t"' : '"i"',
        };
        const iconStyles = {
            color: `rgb(${this.iconColor})`,
            backgroundColor: `rgba(${this.iconColor}, var(--sq-icon-opacity))`,
            animation: this.iconAnimation,
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.showDialog}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this.icon}></ha-icon>
                </div>
                ${text ? html`<div class="text">${text}</div>` : null}
            </div>
        `;
    }

    private showDialog(e: Event): void {
        e.stopPropagation();
        const dialogConfig = { ...this.dialogObj.data };
        window.browser_mod?.service("popup", dialogConfig);
    }
}
