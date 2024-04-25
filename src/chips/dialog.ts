import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { dialogTable } from "../tables/dialogs";

import { chipBaseStyle, chipTextStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    dialog: string;
    entity?: string;
    label?: string;
}

@customElement("smartqasa-dialog-chip")
export class DialogChip extends LitElement {
    @state() private _config?: Config;
    @state() private _dialogObj?: any;
    @state() private _stateObj?: HassEntity;

    private _dialog?: string;
    private _entity?: string;
    private _icon?: string;
    private _label?: string;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._dialog = this._config.dialog;
        this._dialogObj = this._dialog ? dialogTable[this._dialog] : undefined;
        this._entity = this._dialogObj.entity;
        this._icon = this._dialogObj.icon;
        this._label = this._config.label || "";
    }

    set hass(hass: HomeAssistant) {
        if (!hass || !this._entity || hass.states[this._entity] === this._stateObj) return;
        this._stateObj = hass.states[this._entity];
    }

    protected render(): TemplateResult {
        if (!this._stateObj) return html``;

        const state = this._stateObj.state;
        if (
            (this._dialog === "garages" && state === "closed") ||
            (this._dialog === "locks" && state === "locked") ||
            (this._dialog === "sensors_doors" && state === "off") ||
            (this._dialog === "sensors_windows" && state === "off")
        )
            return html``;

        const containerStyle = {
            "margin-left": "0.7rem",
            "grid-template-areas": this._label ? '"i t"' : '"i"',
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.showDialog}>
                <div class="icon" style="color: rgb(var(--sq-rgb-orange));">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                ${this._label ? html`<div class="text">${this._label}</div>` : null}
            </div>
        `;
    }

    private showDialog(e: Event): void {
        e.stopPropagation();

        const dialogConfig = this._dialogObj.data;
        window.browser_mod?.service("popup", dialogConfig);
    }
}

window.customCards.push({
    type: "smartqasa-dialog-chip",
    name: "SmartQasa Dialog Chip",
    preview: true,
    description: "A SmartQasa chip for dialog.",
});
