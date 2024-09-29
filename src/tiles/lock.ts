import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
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
    private _icon: string = "hass:lock-alert";
    private _iconStyles: Record<string, string> = {};
    private _name: string = "Unknown Lock";
    private _stateFmtd: string = "Unknown State";

    private readonly _stateMap: Record<string, { icon: string; animation: string; color: string }> = {
        locked: {
            icon: "hass:lock",
            animation: "none",
            color: "var(--sq-inactive-rgb)",
        },
        unlocking: {
            icon: "hass:rotate-right",
            animation: "spin 1.0s linear infinite",
            color: "var(--sq-lock-unlocking-rgb)",
        },
        unlocked: {
            icon: "hass:lock-open",
            animation: "none",
            color: "var(--sq-lock-unlocked-rgb)",
        },
        locking: {
            icon: "hass:rotate-right",
            animation: "spin 1.0s linear infinite",
            color: "var(--sq-lock-locking-rgb)",
        },
        jammed: {
            icon: "hass:lock-open",
            animation: "blink 1.0s linear infinite",
            color: "var(--sq-lock-jammed-rgb, 255, 0, 0)",
        },
        default: {
            icon: "hass:lock-alert",
            animation: "none",
            color: "var(--sq-unavailable-rgb)",
        },
    };

    static get styles(): CSSResultGroup {
        return [unsafeCSS(tileBaseStyle), unsafeCSS(tileStateStyle)];
    }

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

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this._entity) return nothing;

        return html`
            <div class="container" @click=${this._toggleEntity}>
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

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._stateObj) {
            const state = this._stateObj.state || "unknown";
            const { icon, animation, color } = this._stateMap[state] || this._stateMap.default;
            this._icon = icon;
            iconAnimation = animation;
            iconColor = color;
            this._name = this._config?.name || this._stateObj.attributes.friendly_name || "Lock";
            this._stateFmtd = this.hass!.formatEntityState(this._stateObj);
        } else {
            this._icon = this._config!.icon || "hass:lock-alert-variant";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config!.name || "Unknown Lock";
            this._stateFmtd = "Unknown State";
        }
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

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._stateObj, this._config?.callingDialog);
    }
}
