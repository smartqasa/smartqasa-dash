import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";
import { moreInfoDialog } from "../dialogs/more-info-dialog";
import { entityListDialog } from "../dialogs/entity-list-dialog";

import tileBaseStyle from "../css/tile-base.css";
import tileStateStyle from "../css/tile-state.css";

interface Config extends LovelaceCardConfig {
    entity: string;
    group?: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-light-tile",
    name: "SmartQasa Light Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a light entity.",
});

@customElement("smartqasa-light-tile")
export class LightTile extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles: CSSResultGroup = [unsafeCSS(tileBaseStyle), unsafeCSS(tileStateStyle)];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity.startsWith("light.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this._entity) return nothing;

        const { icon, iconAnimation, iconColor, name, stateFmtd } = this._updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this._toggleEntity} @contextmenu=${this._showEntityList}>
                <div class="icon" @click=${this._showMoreInfo} style="${styleMap(iconStyles)}">
                    <ha-icon icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }

    private _updateState(): {
        icon: string;
        iconAnimation?: string;
        iconColor: string;
        name: string;
        stateFmtd: string;
    } {
        let icon, iconAnimation, iconColor, name, stateFmtd;

        this._stateObj = this.hass && this._entity ? this.hass.states[this._entity] : undefined;

        if (this._stateObj) {
            const state = this._stateObj.state || "unknown";
            icon = this._config!.icon || this._stateObj.attributes.icon || "hass:lightbulb";
            iconAnimation = "none";
            iconColor = state === "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb)";
            name = this._config!.name || this._stateObj.attributes.friendly_name || "Light";
            stateFmtd = `${this.hass!.formatEntityState(this._stateObj)}${
                state === "on" && this._stateObj.attributes.brightness
                    ? " - " + this.hass!.formatEntityAttributeValue(this._stateObj, "brightness")
                    : ""
            }`;
        } else {
            icon = this._config!.icon || "hass:lightbulb-alert";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();

        if (this._stateObj?.state === "on") {
            callService(this.hass, "light", "turn_off", { entity_id: this._entity, transition: 2 });
        } else {
            callService(this.hass, "light", "turn_on", { entity_id: this._entity });
        }
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._stateObj, this._config?.callingDialog);
    }

    private _showEntityList(e: Event): void {
        e.stopPropagation();

        if (!this.hass || !this._config || !this._stateObj) return;

        let group;
        if (this._config.group) {
            group = this._config.group;
            const groupObj = this.hass.states[group];
            if (!groupObj || groupObj.attributes?.entity_id?.length === 0) return;
        } else if (this._stateObj.attributes?.entity_id?.length > 0) {
            group = this._entity;
        } else {
            group = `${this._entity}_group`;
            const groupObj = this.hass.states[group];
            if (!groupObj || groupObj.attributes?.entity_id?.length === 0) return;
        }

        const friendlyName = this._stateObj.attributes?.friendly_name ?? "Unknown";
        entityListDialog(friendlyName, "group", group, "light");
    }
}
