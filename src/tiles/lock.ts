import { CSSResultGroup, html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";
import { moreInfoDialog } from "../dialogs/more-info-dialog";

import tileBaseStyle from "../css/tile-base.css";
import tileStateStyle from "../css/tile-state.css";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-lock-tile",
    name: "SmartQasa Lock Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a lock entity.",
});

@customElement("smartqasa-lock-tile")
export class LockTile extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _stateObj?: HassEntity;
    @state() private _running: boolean = false;
    private _entity?: string;

    static styles: CSSResultGroup = [unsafeCSS(tileBaseStyle), unsafeCSS(tileStateStyle)];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("lock.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config") ||
            changedProps.has("_running")
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
        iconAnimation: string;
        iconColor: string;
        name: string;
        stateFmtd: string;
    } {
        let icon, iconAnimation, iconColor, name, stateFmtd;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._stateObj) {
            const state = this._stateObj.state || "unknown";
            switch (state) {
                case "locked":
                    icon = "hass:lock";
                    iconAnimation = "none";
                    iconColor = "var(--sq-inactive-rgb)";
                    break;
                case "unlocking":
                    icon = "hass:rotate-right";
                    iconAnimation = "spin 1.0s linear infinite";
                    iconColor = "var(--sq-lock-unlocking-rgb)";
                    break;
                case "unlocked":
                    icon = "hass:lock-open";
                    iconAnimation = "none";
                    iconColor = "var(--sq-lock-unlocked-rgb)";
                    break;
                case "locking":
                    icon = "hass:rotate-right";
                    iconAnimation = "spin 1.0s linear infinite";
                    iconColor = "var(--sq-lock-locking-rgb)";
                    break;
                case "jammed":
                    icon = "hass:lock-open";
                    iconAnimation = "blink 1.0s linear infinite";
                    iconColor = "var(--sq-lock-jammed-rgb, 255, 0, 0)";
                    break;
                default:
                    icon = "hass:lock-alert";
                    iconAnimation = "none";
                    iconColor = "var(--sq-unavailable-rgb)";
                    break;
            }
            name = this._config!.name || this._stateObj.attributes.friendly_name || "Lock";
            stateFmtd = this.hass!.formatEntityState(this._stateObj);
        } else {
            icon = this._config!.icon || "hass:garage-alert-variant";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config!.name || "Unknown";
            stateFmtd = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        if (!this._stateObj) return;

        const state = this._stateObj.state;
        this._running = true;
        this._stateObj.state = state == "locked" ? "unlocking" : "locking";
        callService(this.hass, "lock", state == "locked" ? "unlock" : "lock", {
            entity_id: this._entity,
        });

        setTimeout(() => {
            this._running = false;
        }, 500);
    }

    private async _showMoreInfo(e: Event): Promise<void> {
        e.stopPropagation();
        console.log("Lock Tile: ", this._config?.callingDialog);
        await moreInfoDialog(this._stateObj, this._config?.callingDialog);
    }
}
