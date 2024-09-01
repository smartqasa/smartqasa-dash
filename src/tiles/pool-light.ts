import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";
import { sequenceTable } from "../tables/pool-light-sequences";
import { gridDialogStyle } from "../styles/dialog";

import tileBaseStyle from "../styles/tile-base.css";
import tileStateStyle from "../styles/tile-state.css";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-pool-light-tile",
    name: "SmartQasa Pool Light Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a pool color light or switch entity.",
});

@customElement("smartqasa-pool-light-tile")
export class PoolLightTile extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;
    private _entity?: string;

    static styles: CSSResultGroup = [unsafeCSS(tileBaseStyle), unsafeCSS(tileStateStyle)];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = ["light", "switch"].includes(this._config.entity?.split(".")[0])
            ? this._config.entity
            : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            (changedProps.has("config") && this._config)
        );
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this._updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this._showColorList}>
                <div class="icon" @click=${this._toggleEntity} style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }

    private _updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._stateObj) {
            const state = this._stateObj.state || "unknown";
            icon = this._config!.icon || this._stateObj.attributes.icon || "hass:lightbulb";
            iconColor = state === "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb)";
            name = this._config!.name || this._stateObj.attributes.friendly_name || this._entity;
            stateFmtd =
                this.hass!.formatEntityState(this._stateObj) +
                (state === "on" && this._stateObj.attributes.brightness
                    ? " - " + this.hass!.formatEntityAttributeValue(this._stateObj, "brightness")
                    : "");
        } else {
            icon = this._config!.icon || "hass:lightbulb-alert";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config!.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        callService(this.hass, "light", "toggle", { entity_id: this._entity });
    }

    private _showColorList(e: Event): void {
        e.stopPropagation();
        if (!this._stateObj) return;

        const cards = Object.keys(sequenceTable).map((key) => ({
            type: "custom:smartqasa-pool-light-sequencer-tile",
            entity: this._entity,
            sequence: key,
        }));
        const dialogConfig = {
            title: this._stateObj.attributes.friendly_name || this._stateObj.entity_id,
            timeout: 60000,
            content: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: gridDialogStyle,
                cards: cards,
            },
        };

        window.browser_mod?.service("popup", dialogConfig);
    }
}
