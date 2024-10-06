import { CSSResult, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { callService } from "../utilities/call-service";
import { moreInfoDialog } from "../dialogs/more-info-dialog";
import { entityListDialog } from "../dialogs/entity-list-dialog";
import { formatState } from "../utilities/format-state";

import tileStyle from "../css/tile.css";

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
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;

    private _entity?: string;
    private _stateObj?: HassEntity;
    private _icon: string = "hass:lightbulb-alert";
    private _iconStyles: Record<string, string> = {};
    private _name: string = "Unknown Light";
    private _stateFmtd: string = "Unknown State";

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        if (!config.entity?.startsWith("light.")) {
            console.error("Invalid light entity provided in the config.");
            this._entity = undefined;
        } else {
            this._entity = config.entity;
        }
        this._config = config;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config") ||
            changedProps.has("_formatAvailable")
        );
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        return html`
            <div class="container" @click=${this._toggleEntity} @contextmenu=${this._showEntityList}>
                <div class="icon" @click=${this._showMoreInfo} style=${styleMap(this._iconStyles)}>
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
        this._stateObj = this.hass && this._entity ? this.hass.states[this._entity] : undefined;

        let icon, iconColor, name, stateFmtd;
        if (this._stateObj) {
            const state = this._stateObj.state || "unknown";
            icon = this._config!.icon || this._stateObj.attributes.icon || "hass:lightbulb";
            iconColor = state === "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb)";
            name = this._config!.name || this._stateObj.attributes.friendly_name || "Light";
            stateFmtd = formatState(this.hass!, this._entity!);
        } else {
            icon = this._config!.icon || "hass:lightbulb-alert";
            iconColor = "var(--sq-unavailable-rgb)";
            name = this._config?.name || "Unknown Light";
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
