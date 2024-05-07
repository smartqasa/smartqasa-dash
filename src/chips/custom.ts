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

interface DialogObj {
    icon: string;
    icon_rgb?: string;
    entity?: string;
    entity_type?: string;
    data: any;
}

window.customCards.push({
    type: "smartqasa-custom-chip",
    name: "SmartQasa Custom Chip",
    preview: true,
    description: "A SmartQasa chip for custom configurations.",
});

@customElement("smartqasa-custom-chip")
export class CustomChip extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    @state() private dialogObj?: DialogObj;
    @state() private stateObj?: HassEntity;

    private entity?: string;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.loadDialogObj();
    }

    private async loadDialogObj() {
        if (!this.config?.file) return;
        try {
            const path = `/local/smartqasa/dialogs/${this.config.file}`;
            this.dialogObj = (await loadYamlAsJson(path)) as DialogObj;
            this.entity = this.dialogObj.entity;
        } catch (error) {
            console.error("Failed to load YAML:", error);
        }
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj) ||
            (changedProps.has("config") && this.config)
        );
    }

    protected render(): TemplateResult {
        if (!this.dialogObj) return html``;

        this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

        const icon = this.dialogObj.icon || "mdi:help-circle";
        let iconColor = "var(--sq-inactive-rgb)";

        if (this.hass && this.dialogObj.icon_rgb) {
            try {
                const func = new Function("states", this.dialogObj.icon_rgb);
                iconColor = func(this.hass.states);
                console.log("Icon color:", iconColor);
            } catch (error) {
                console.error("Error evaluating icon color expression:", error);
            }
        }
        let text = this.stateObj?.state || "";
        switch (this.dialogObj.entity_type) {
            case "temperature":
                text += "°";
                break;
            case "percentage":
                text += "%";
                break;
        }

        const containerStyle = {
            "margin-left": "0.7rem",
            "grid-template-areas": '"i t"',
        };
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: "transparent",
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

    private showDialog(e: Event): void {
        e.stopPropagation();
        if (!this.dialogObj) return;
        const dialogConfig = { ...this.dialogObj.data };
        window.browser_mod?.service("popup", dialogConfig);
    }
}
