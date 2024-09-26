import { CSSResult, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { dialogTable } from "../tables/dialogs";
import { dialogPopup } from "../dialogs/dialog-popup";

import chipBaseStyle from "../css/chip-base.css";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

window.customCards.push({
    type: "smartqasa-sonos-chip",
    name: "SmartQasa Sonos Chip",
    preview: true,
    description: "A SmartQasa chip for displaying a Sonos dialog.",
});

@customElement("smartqasa-sonos-chip")
export class SonosChip extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;

    private _entity?: string;
    private _stateObj?: HassEntity;
    private _icon: string = "hass:music";
    private _iconStyles: Record<string, string> = {};

    static styles: CSSResult = unsafeCSS(chipBaseStyle);

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("media_player.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this._entity) return nothing;

        return html`
            <div class="container" @click=${this._showDialog}>
                <div class="icon" style="${styleMap(this._iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
            </div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;
        const state = this._stateObj?.state;

        let iconColor: string;
        if (state) {
            iconColor = state === "playing" ? "var(--sq-rgb-blue)" : "var(--sq-primary-font-rgb)";
        } else {
            iconColor = "var(--sq-unavailable-rgb)";
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
        };
    }

    private _showDialog(e: Event): void {
        e.stopPropagation();
        const dialogObj = dialogTable["sonos"];
        if (!dialogObj) return;

        const dialogConfig = { ...dialogObj.data };
        if (this._entity) dialogConfig.content.entityId = this._entity;

        dialogPopup(dialogObj.data);
    }
}
