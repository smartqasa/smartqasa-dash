import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { callService } from "../utilities/call-service";
import { moreInfoDialog } from "../dialogs/more-info-dialog";

import tileBaseStyle from "../css/tile-base.css";
import tileStateStyle from "../css/tile-state.css";

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
export class GarageTile extends LitElement implements LovelaceCard {
    getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _stateObj?: HassEntity;
    private _entity?: string;

    static styles: CSSResultGroup = [unsafeCSS(tileBaseStyle), unsafeCSS(tileStateStyle)];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("cover.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            (changedProps.has("_config") && this._config)
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
            <div class="container" @click=${this._toggleEntity}>
                <div class="icon" @click=${this._showMoreInfo} style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
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
            name = this._config.name || this._stateObj.attributes.friendly_name || "Garage";
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
        callService(this.hass, "cover", "toggle", { entity_id: this._entity });
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._stateObj, this._config?.callingDialog);
    }
}
