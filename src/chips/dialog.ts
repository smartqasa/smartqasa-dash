import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { dialogTable } from "../tables/dialogs";

import { chipBaseStyle, chipTextStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    dialog: string;
    entity?: string;
    label?: string;
}

window.customCards.push({
    type: "smartqasa-dialog-chip",
    name: "SmartQasa Dialog Chip",
    preview: true,
    description: "A SmartQasa chip for dialog.",
});

@customElement("smartqasa-dialog-chip")
export class DialogChip extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    @state() private dialogObj?: any;
    private dialog?: string;
    private entity?: string;
    private icon?: string;
    private label?: string;
    private stateObj?: HassEntity;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.dialog = this.config.dialog;
        this.dialogObj = this.dialog ? dialogTable[this.dialog] : undefined;
        this.entity = this.dialogObj.entity;
        this.icon = this.dialogObj.icon;
        this.label = this.config.label || "";
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

        const state = this.stateObj?.state;
        if (
            (this.dialog === "garages" && state === "closed") ||
            (this.dialog === "locks" && state === "locked") ||
            (this.dialog === "sensors_doors" && state === "off") ||
            (this.dialog === "sensors_windows" && state === "off")
        )
            return html``;

        const containerStyle = {
            "margin-left": "0.7rem",
            "grid-template-areas": this.label ? '"i t"' : '"i"',
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.showDialog}>
                <div class="icon" style="color: rgb(var(--sq-rgb-orange));">
                    <ha-icon .icon=${this.icon}></ha-icon>
                </div>
                ${this.label ? html`<div class="text">${this.label}</div>` : null}
            </div>
        `;
    }

    private showDialog(e: Event): void {
        e.stopPropagation();
        if (!window.browser_mod) {
            console.error("browser_mod is not available!");
            return;
        }

        const dialogConfig = { ...this.dialogObj.data };
        window.browser_mod.service("popup", dialogConfig);
    }
}
