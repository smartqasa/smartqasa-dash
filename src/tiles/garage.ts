import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service-new";
import { moreInfoDialog } from "../utils/more-info-dialog";

import { tileBaseStyle, tileStateStyle, tileIconBlinkStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-garage-tile",
    name: "SmartQasa Garage Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a garage cover entity.",
});

@customElement("smartqasa-garage-tile")
export class GarageTile extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;
    private _entity?: string;

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("cover.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this.hass || !this._config) return false;
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            (changedProps.has("_config") && this._config)
        );
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this._showMoreInfo}>
                <div class="icon" @click=${this._toggleEntity} style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }

    private updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._config && this.hass && this._stateObj) {
            const state = this._stateObj.state || "unknown";
            switch (state) {
                case "closed":
                    icon = "hass:garage-variant";
                    iconAnimation = "none";
                    iconColor = "var(--sq-inactive-rgb)";
                    break;
                case "opening":
                    icon = "hass:arrow-up-box";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-garage-opening-rgb, 255, 120, 0)";
                    break;
                case "open":
                    icon = "hass:garage-open-variant";
                    iconAnimation = "none";
                    iconColor = "var(--sq-garage-open-rgb, 255, 120, 0)";
                    break;
                case "closing":
                    icon = "hass:arrow-down-box";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-garage-closing-rgb, 255, 120, 0)";
                    break;
                default:
                    icon = "hass:garage-alert-variant";
                    iconAnimation = "none";
                    iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                    break;
            }
            name = this._config.name || this._stateObj.attributes.friendly_name || this._entity;
            stateFmtd =
                this.hass.formatEntityState(this._stateObj) +
                (state === "open" && this._stateObj.attributes.current_position
                    ? " - " + this.hass.formatEntityAttributeValue(this._stateObj, "current_position")
                    : "");
        } else {
            icon = this._config?.icon || "hass:garage-alert-variant";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config?.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        callService(this, "cover", "toggle", { entity_id: this._entity });
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
}
