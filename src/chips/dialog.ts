import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { dialogTable } from "../tables/dialogs";
import { styleMap } from "lit/directives/style-map.js";
import { chipBaseStyle, chipTextStyle } from "../styles/chip-2";

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
    @state() private _config?: Config;
    private _dialog?: string;
    private _dialogObj?: any;
    private _entity?: string;
    private _icon?: string;
    private _label?: string;
    private _stateObj?: HassEntity;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._dialog = this._config.dialog;
        this._dialogObj = this._dialog ? dialogTable[this._dialog] : undefined;
        this._entity = this._dialogObj?.entity;
        this._icon = this._dialogObj?.icon;
        this._label = this._config.label || "";
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this._dialogObj) return nothing;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        const state = this._stateObj?.state || "unknown";
        if (
            (this._dialog === "garages" && state === "closed") ||
            (this._dialog === "locks" && state === "locked") ||
            (this._dialog === "sensors_doors" && state === "off") ||
            (this._dialog === "sensors_windows" && state === "off")
        ) {
            return nothing;
        }

        const iconStyles = {
            color: `rgb(${this._dialogObj.color})`,
            paddingRight: `${this._label ? "calc(var(--sq-chip-padding, 1rem) / 2)" : "var(--sq-chip-padding, 1rem)"}`,
        };

        return html`
            <div class="container" @click=${this._showDialog}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                ${this._label ? html`<div class="text">${this._label}</div>` : nothing}
            </div>
        `;
    }

    private _showDialog(e: Event): void {
        e.stopPropagation();
        if (!window.browser_mod) {
            console.error("browser_mod is not available!");
            return;
        }

        const dialogConfig = { ...this._dialogObj.data };
        window.browser_mod.service("popup", dialogConfig);
    }
}
