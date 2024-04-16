import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { moreInfoDialog } from "../utils/moreInfoDialog";
import { entityListDialog } from "../utils/entityListDialog";

import { tileBaseStyle, tileStateStyle, tileIconBlinkStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
    tilt?: number;
}

@customElement("smartqasa-shade-tile")
export class ShadeTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _hass: any;
    private _icon: string = "hass:roller-shade";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle];

    setConfig(config: Config): void {
        this._config = { ...config };
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!this._config?.entity || !hass) return;
        this._hass = hass;
        this.updateState();
    }

    private updateState(): void {
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "cover"
                ? this._hass?.states[this._config.entity]
                : undefined;

        if (!this._stateObj) {
            this._icon = this._config?.icon || "hass:roller-shade";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }

        const state = this._stateObj.state;
        switch (state) {
            case "closed":
                this._icon = "hass:roller-shade-closed";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-inactive-rgb)";
                break;
            case "opening":
                this._icon = "hass:arrow-up-box";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-shade-opening-rgb, 146, 107, 199)";
                break;
            case "open":
                this._icon = "hass:roller-shade";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-shade-open-rgb, 146, 107, 199)";
                break;
            case "closing":
                this._icon = "hass:arrow-down-box";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-shade-closing-rgb, 146, 107, 199)";
                break;
            default:
                this._icon = "hass:alert-rhombus";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                break;
        }
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
        this._stateFmtd =
            this._hass.formatEntityState(this._stateObj) +
            (state === "open" && this._stateObj.attributes.current_position
                ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "current_position")
                : "");
    }

    render(): TemplateResult {
        return html`
            <div class="container" @click=${this.showMoreInfo} @contextmenu=${this.showGroupList}>
                <div
                    class="icon"
                    @click=${this.toggleEntity}
                    style="
                        color: rgb(${this._iconColor});
                        background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
                        animation: ${this._iconAnimation};
                    "
                >
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }

    private toggleEntity(e: Event): void {
        e.stopPropagation();
        if (!this._stateObj) return;
        const tilt = this._config?.tilt || 100;
        if (tilt >= 1 && tilt <= 100) {
            if (this._stateObj.attributes.current_position !== tilt) {
                this._hass.callService("cover", "set_cover_position", {
                    entity_id: this._stateObj.entity_id,
                    position: tilt,
                });
            } else {
                this._hass.callService("cover", "set_cover_position", {
                    entity_id: this._stateObj.entity_id,
                    position: 0,
                });
            }
        } else {
            this.hass.callService("cover", "toggle", { entity_id: this._stateObj.entity_id });
        }
    }

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }

    private showGroupList(e: Event): void {
        e.stopPropagation();
        if (
            !this._stateObj ||
            !Array.isArray(this._stateObj.attributes?.entity_id) ||
            this._stateObj.attributes.entity_id.length === 0
        )
            return;
        entityListDialog(
            this._stateObj.attributes?.friendly_name || this._stateObj.entity_id,
            "group",
            this._stateObj.entity_id,
            "shade"
        );
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-shade-tile",
    name: "SmartQasa Shade Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a window shade entity.",
});
