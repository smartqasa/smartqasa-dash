import { CSSResult, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { selectOptionDialog } from "../utils/select-option-dialog";
import { phaseIcons, modeIcons } from "../utils/const";

import { chipBaseStyle } from "../styles/chip";

interface Config extends LovelaceCardConfig {
    entity: string;
    trigger?: string;
    icon?: string;
}

@customElement("smartqasa-select-chip")
export class SelectChip extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _entity?: string;
    private _icon!: string;

    static styles: CSSResult = chipBaseStyle;

    setConfig(config: Config): void {
        if (!config?.entity) return;
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("input_select.") ? this._config.entity : undefined;
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!hass || !this._entity || hass.states[this._entity] === this._stateObj) return;
        this._stateObj = hass.states[this._entity];
        this.updateState();
    }

    private updateState(): void {
        if (!this._entity || !this._stateObj) return;

        if (this._entity === "input_select.location_phase") {
            this._icon = phaseIcons[this._stateObj.state] || phaseIcons.default;
        } else if (this._entity === "input_select.location_mode") {
            this._icon = modeIcons[this._stateObj.state] || modeIcons.default;
        } else {
            this._icon = this._config?.icon || this._stateObj.attributes?.icon || "hass:form-dropdown";
        }
    }

    protected render(): TemplateResult {
        if (!this._entity) return html``;

        const containerStyle = {
            marginLeft: "0.7rem",
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.showOptions}>
                <div class="icon">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
            </div>
        `;
    }

    private showOptions(e: Event): void {
        e.stopPropagation();
        selectOptionDialog(this._config, this._stateObj);
    }
}

window.customCards.push({
    type: "smartqasa-select-chip",
    name: "SmartQasa Input Select Chip",
    preview: true,
    description: "A SmartQasa chip for selecting an option for a input_select entity.",
});
