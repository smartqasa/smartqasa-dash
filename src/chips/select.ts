import { CSSResult, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { selectOptionDialog } from "../dialogs/select-option-dialog";
import { phaseIcons, modeIcons } from "../const";

import chipBaseStyle from "../css/chip-base.css";

interface Config extends LovelaceCardConfig {
    entity: string;
    trigger?: string;
    icon?: string;
}

window.customCards.push({
    type: "smartqasa-select-chip",
    name: "SmartQasa Input Select Chip",
    preview: true,
    description: "A SmartQasa chip for selecting an option for a input_select entity.",
});

@customElement("smartqasa-select-chip")
export class SelectChip extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles: CSSResult = unsafeCSS(chipBaseStyle);

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("input_select.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._entity) return nothing;

        let icon;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        const state = this._stateObj?.state || "unknown";
        if (this._entity === "input_select.location_phase") {
            icon = phaseIcons[state] || phaseIcons.default;
        } else if (this._entity === "input_select.location_mode") {
            icon = modeIcons[state] || modeIcons.default;
        } else {
            icon = this._config?.icon || this._stateObj?.attributes?.icon || "hass:form-dropdown";
        }

        return html`
            <div class="container" @click=${this._showOptions}>
                <div class="icon">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
            </div>
        `;
    }

    private _showOptions(e: Event): void {
        e.stopPropagation();
        selectOptionDialog(this._config, this._stateObj);
    }
}
