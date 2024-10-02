import { CSSResult, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { callService } from "../utilities/call-service";
import { moreInfoDialog } from "../dialogs/more-info-dialog";

import tileStyle from "../css/tile.css";

interface Config extends LovelaceCardConfig {
    category?: string;
    entity: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-switch-tile",
    name: "SmartQasa Switch Tile",
    preview: true,
    description: "A SmartQasa tile for toggling an entity.",
});

@customElement("smartqasa-switch-tile")
export class SwitchTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;
    private _icon: string = "hass:toggle-switch-variant";
    private _iconStyles: Record<string, string> = {};
    private _name: string = "Unknown Fan";
    private _stateFmtd: string = "Unknown State";

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = ["fan", "input_boolean", "light", "switch"].includes(this._config.entity?.split(".")[0])
            ? this._config.entity
            : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
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
            <div class="container" @click=${this._toggleEntity}>
                <div class="icon" @click=${this._showMoreInfo} style="${styleMap(this._iconStyles)}">
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                <div class="text">
                    <div class="name">${this._name}</div>
                    <div class="state">${this._stateFmtd}</div>
                </div>
            </div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        let icon, iconColor, name, stateFmtd;
        if (this._stateObj) {
            icon = this._config!.icon || this._stateObj.attributes.icon || "hass:toggle-switch-variant";
            const state = this._stateObj.state;
            iconColor =
                state === "on"
                    ? `var(--sq-switch${this._config!.category ? `-${this._config!.category}` : ""}-on-rgb)`
                    : "var(--sq-inactive-rgb)";
            name = this._config!.name || this._stateObj.attributes.friendly_name || "Switch";
            stateFmtd = this.hass!.formatEntityState(this._stateObj);
        } else {
            icon = this._config!.icon || "hass:toggle-switch-variant";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config?.name || "Unknown Switch";
            stateFmtd = "Unknown State";
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
        };
        this._icon = icon;
        this._name = name;
        this._stateFmtd = stateFmtd;
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        callService(this.hass, "homeassistant", "toggle", { entity_id: this._entity });
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._stateObj, this._config?.callingDialog);
    }
}
