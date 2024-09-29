import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { callService } from "../utilities/call-service";
import { moreInfoDialog } from "../dialogs/more-info-dialog";
import { entityListDialog } from "../dialogs/entity-list-dialog";

import tileBaseStyle from "../css/tile-base.css";
import tileStateStyle from "../css/tile-state.css";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-fan-tile",
    name: "SmartQasa Fan Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a fan entity.",
});

@customElement("smartqasa-fan-tile")
export class FanTile extends LitElement implements LovelaceCard {
    getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;
    private _icon: string = "hass:fan-alert";
    private _iconStyles: Record<string, string> = {};
    private _name: string = "Unknown Fan";
    private _stateFmtd: string = "Unknown State";

    static get styles(): CSSResultGroup {
        return [unsafeCSS(tileBaseStyle), unsafeCSS(tileStateStyle)];
    }

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity.startsWith("fan.") ? this._config.entity : undefined;
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
            <div class="container" @click=${this._toggleEntity} @contextmenu=${this._showEntityList}>
                <div class="icon" @click=${this._showMoreInfo} style=${styleMap(this._iconStyles)}>
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }

    private _updateState(): void {
        let iconAnimation, iconColor;

        this._stateObj = this.hass && this._entity ? this.hass.states[this._entity] : undefined;

        if (this._stateObj) {
            const state = this._stateObj.state || "unknown";
            this._icon = this._config!.icon || this._stateObj.attributes.icon || "hass:fan";
            if (state == "on" && this._icon === "hass:fan") {
                if (this._stateObj.attributes.percentage) {
                    const speed = 0.5 + (1 - this._stateObj.attributes.percentage / 100);
                    const direction = this._stateObj.attributes.direction == "reverse" ? "reverse" : "normal";
                    iconAnimation = `spin ${speed}s linear infinite ${direction}`;
                } else {
                    iconAnimation = `spin 0.5s linear infinite normal`;
                }
            } else {
                iconAnimation = "none";
            }
            iconColor = state === "on" ? "var(--sq-fan-on-rgb)" : "var(--sq-inactive-rgb)";
            this._name = this._config!.name || this._stateObj.attributes.friendly_name || "Fan";
            this._stateFmtd = `${this.hass!.formatEntityState(this._stateObj)}${
                state === "on" && this._stateObj.attributes.percentage
                    ? " - " + this.hass!.formatEntityAttributeValue(this._stateObj, "percentage")
                    : ""
            }`;
        } else {
            this._icon = this._config!.icon || "hass:fan-alert";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Unknown";
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        if (!this._stateObj) return;
        callService(this.hass, "fan", "toggle", { entity_id: this._entity });
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._stateObj, this._config?.callingDialog);
    }

    private _showEntityList(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this._stateObj) return;

        const group = this._config!.group || this._entity;
        const groupObj = this.hass.states[group];
        if (!groupObj) return;

        const entityIds = groupObj.attributes?.entity_id;
        if (entityIds.length === 0) return;

        const friendlyName = this._stateObj.attributes?.friendly_name || "Unknown";
        entityListDialog(friendlyName, "group", group, "fan");
    }
}
