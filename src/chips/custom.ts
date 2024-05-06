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

    setConfig(config: Config): void {
        this.config = { ...config };
        this.loadDialogObj();
    }

    async loadDialogObj() {
        if (!this.config?.file) return;
        try {
            const path = `/local/smartqasa/dialogs/${this.config.file}`;
            this.dialogObj = (await loadYamlAsJson(path)) as DialogObj;
            this.entity = this.dialogObj.entity;
        } catch (error) {
            console.error("Failed to load YAML:", error);
        }
    }

    updated(changedProps: PropertyValues) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.entity) {
            this.stateObj = this.hass?.states[this.entity];
        }
    }

    protected render(): TemplateResult {
        if (!this.dialogObj || !this.stateObj) return html``;

        const icon = this.dialogObj.icon || "mdi:help-circle";
        let iconColor = "var(--sq-inactive-rgb)";

        if (this.dialogObj.icon_rgb && this.hass) {
            try {
                const func = new Function("states", `return ${this.dialogObj.icon_rgb}`);
                iconColor = func(this.hass.states);
            } catch (error) {
                console.error("Error evaluating icon color expression:", error);
            }
        }
        let text = this.stateObj.state || "";
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
        console.log("iconStyles", iconStyles);

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
