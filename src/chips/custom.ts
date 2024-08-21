import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { loadYamlAsJson } from "../utils/load-yaml-as-json";
import { chipBaseStyle, chipTextStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    dialog_file: string;
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
    @state() private _config?: Config;
    @state() private _dialogObj?: DialogObj;
    @state() private _stateObj?: HassEntity;

    private _entity?: string;

    static styles: CSSResultGroup = [chipBaseStyle, chipTextStyle];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this.loadDialogObj();
    }

    private async loadDialogObj(): Promise<void> {
        if (!this._config?.dialog_file) return;

        try {
            const path = `/local/smartqasa/dialogs/${this._config.dialog_file}`;
            const loadedObj = (await loadYamlAsJson(path)) as DialogObj;

            if (loadedObj) {
                this._dialogObj = loadedObj;
                this._entity = this._dialogObj.entity;
            } else {
                console.error("Dialog object is null or undefined after loading.");
            }
        } catch (error) {
            console.error("Failed to load YAML:", error);
            this._dialogObj = undefined;
        } finally {
            this.requestUpdate();
        }
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected render(): TemplateResult {
        if (!this._dialogObj) return html``;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        const icon = this._dialogObj.icon || "mdi:help-circle";
        let iconColor = "var(--sq-inactive-rgb)";

        if (this.hass && this._dialogObj.icon_rgb) {
            try {
                const func = new Function("states", this._dialogObj.icon_rgb);
                iconColor = func(this.hass.states);
            } catch (error) {
                console.error("Error evaluating icon color expression:", error);
            }
        }
        let text = this._stateObj?.state || "";
        switch (this._dialogObj.entity_type) {
            case "temperature":
                text += "°";
                break;
            case "percentage":
                text += "%";
                break;
        }

        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: "transparent",
            paddingRight: text ? "calc(var(--sq-chip-padding, 1rem) / 2)" : "var(--sq-chip-padding, 1rem)",
        };

        return html`
            <div class="container" @click=${this._showDialog}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                ${text ? html`<div class="text">${text}</div>` : null}
            </div>
        `;
    }

    private _showDialog(e: Event): void {
        e.stopPropagation();
        if (!this._dialogObj) return;
        const dialogConfig = { ...this._dialogObj.data };
        window.browser_mod?.service("popup", dialogConfig);
    }
}
