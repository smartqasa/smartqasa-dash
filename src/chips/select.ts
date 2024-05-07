import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { selectOptionDialog } from "../utils/select-option-dialog";
import { phaseIcons, modeIcons } from "../const";

import { chipBaseStyle } from "../styles/chip";

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
export class SelectChip extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private config?: Config;
    @state() private stateObj?: HassEntity;

    private entity?: string;

    static styles: CSSResultGroup = [chipBaseStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("input_select.") ? this.config.entity : undefined;
    }

    shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj);
    }

    protected render(): TemplateResult {
        if (!this.entity) return html``;

        let icon;

        this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

        const state = this.stateObj?.state || "unknown";
        if (this.entity === "input_select.location_phase") {
            icon = phaseIcons[state] || phaseIcons.default;
        } else if (this.entity === "input_select.location_mode") {
            icon = modeIcons[state] || modeIcons.default;
        } else {
            icon = this.config?.icon || this.stateObj?.attributes?.icon || "hass:form-dropdown";
        }

        const containerStyle = {
            "margin-left": "0.7rem",
        };

        return html`
            <div class="container" style="${styleMap(containerStyle)}" @click=${this.showOptions}>
                <div class="icon">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
            </div>
        `;
    }

    private showOptions(e: Event): void {
        e.stopPropagation();
        selectOptionDialog(this.config, this.stateObj);
    }
}
