import { CSSResult, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { callService } from "../utilities/call-service";
import { moreInfoDialog } from "../dialogs/more-info-dialog";
import { formatState } from "../utilities/format-state";

import tileStyle from "../css/tile.css";

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

    private readonly _stateMap: Record<string, { stateIcon: string; stateAnimation: string; stateColor: string }> = {
        locked: {
            stateIcon: "hass:lock",
            stateAnimation: "none",
            stateColor: "var(--sq-inactive-rgb)",
        },
        unlocking: {
            stateIcon: "hass:rotate-right",
            stateAnimation: "spin 1.0s linear infinite",
            stateColor: "var(--sq-lock-unlocking-rgb)",
        },
        unlocked: {
            stateIcon: "hass:lock-open",
            stateAnimation: "none",
            stateColor: "var(--sq-lock-unlocked-rgb)",
        },
        locking: {
            stateIcon: "hass:rotate-right",
            stateAnimation: "spin 1.0s linear infinite",
            stateColor: "var(--sq-lock-locking-rgb)",
        },
        jammed: {
            stateIcon: "hass:lock-open",
            stateAnimation: "blink 1.0s linear infinite",
            stateColor: "var(--sq-lock-jammed-rgb, 255, 0, 0)",
        },
        default: {
            stateIcon: "hass:lock-alert",
            stateAnimation: "none",
            stateColor: "var(--sq-unavailable-rgb)",
        },
    };

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        if (!config.entity?.startsWith("lock.")) {
            console.error("Invalid lock entity provided in the config.");
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
            changedProps.has("_running")
        );
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        return html`
            <div class="container" @click=${this._toggleEntity}>
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
        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this._stateObj) {
            const state = this._stateObj.state || "unknown";
            const { stateIcon, stateAnimation, stateColor } = this._stateMap[state] || this._stateMap.default;
            icon = this._config!.icon || stateIcon || "hass:lock-variant";
            iconAnimation = stateAnimation;
            iconColor = stateColor;
            name = this._config?.name || this._stateObj.attributes.friendly_name || "Lock";
            stateFmtd = formatState(this._entity!, this.hass!);
        } else {
            icon = this._config!.icon || "hass:lock-alert-variant";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config!.name || "Unknown Lock";
            stateFmtd = "Unknown State";
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
        this._icon = icon;
        this._name = name;
        this._stateFmtd = stateFmtd;
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
