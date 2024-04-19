import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { moreInfoDialog } from "../utils/more-info-dialog";

import { tileBaseStyle, tileStateStyle, tileIconBlinkStyle, tileIconSpinStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
}

@customElement("smartqasa-lock-tile")
export class LockTile extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;
    @state() private _waiting: boolean = false;

    private _entity?: string;
    private _hass: any;
    private _icon: string = "hass:lock";
    private _iconAnimation: string = "none";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";
    private _stateFmtd: string = "Loading...";

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle, tileIconSpinStyle];

    setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("lock.") ? this._config.entity : undefined;
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (!hass || !this._entity || hass.states[this._entity] === this._stateObj) return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }

    private updateState(): void {
        if (this._waiting === true) return;

        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:lock-alert";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }

        const state = this._stateObj.state || "unknown";
        switch (state) {
            case "locked":
                this._icon = "hass:lock";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-inactive-rgb)";
                break;
            case "unlocking":
                this._icon = "hass:rotate-right";
                this._iconAnimation = "spin 1.0s linear infinite";
                this._iconColor = "var(--sq-lock-unlocking-rgb)";
                break;
            case "unlocked":
                this._icon = "hass:lock-open";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-lock-unlocked-rgb)";
                break;
            case "locking":
                this._icon = "hass:rotate-right";
                this._iconAnimation = "spin 1.0s linear infinite";
                this._iconColor = "var(--sq-lock-locking-rgb)";
                break;
            case "jammed":
                this._icon = "hass:lock-open";
                this._iconAnimation = "blink 1.0s linear infinite";
                this._iconColor = "var(--sq-lock-jammed-rgb, 255, 0, 0)";
                break;
            default:
                this._icon = "hass:lock-alert";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-unavailable-rgb)";
                break;
        }
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || "Unknown";
        this._stateFmtd = this._hass.formatEntityState(this._stateObj);
    }

    protected render(): TemplateResult {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };

        return html`
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${styleMap(iconStyles)}">
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

        const state = this._stateObj.state;
        this._stateObj.state = state == "locked" ? "unlocking" : "locking";
        this.updateState();
        this._waiting = true;

        this._hass.callService("lock", state == "locked" ? "unlock" : "lock", {
            entity_id: this._entity,
        });

        setTimeout(() => {
            this._waiting = false;
            this.updateState();
        }, 500);
    }

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-lock-tile",
    name: "SmartQasa Lock Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a lock entity.",
});
