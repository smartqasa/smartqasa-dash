import {
    CSSResult,
    html,
    LitElement,
    nothing,
    PropertyValues,
    TemplateResult,
    unsafeCSS,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import {
    HassEntity,
    HomeAssistant,
    LovelaceCard,
    LovelaceCardConfig,
} from "../types";
import { callService } from "../utilities/call-service";
import { moreInfoDialog } from "../dialogs/more-info-dialog";
import { entityListDialog } from "../dialogs/entity-list-dialog";
import { formatState } from "../utilities/format-state";

import tileStyle from "../css/tile.css";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
    tilt?: number;
}

window.customCards.push({
    type: "smartqasa-shade-tile",
    name: "SmartQasa Shade Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a window shade entity.",
});

@customElement("smartqasa-shade-tile")
export class ShadeTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;
    private _icon: string = "hass:roller-shade";
    private _iconStyles: Record<string, string> = {};
    private _name: string = "Unknown Shade";
    private _stateFmtd: string = "Unknown State";

    private readonly _stateMap: Record<
        string,
        { stateIcon: string; stateAnimation: string; stateColor: string }
    > = {
        closed: {
            stateIcon: "hass:roller-shade-closed",
            stateAnimation: "none",
            stateColor: "var(--sq-inactive-rgb)",
        },
        closing: {
            stateIcon: "hass:arrow-down-box",
            stateAnimation: "blink 2.0s linear infinite",
            stateColor: "var(--sq-cover-shade-closing-rgb)",
        },
        opening: {
            stateIcon: "hass:arrow-up-box",
            stateAnimation: "blink 2.0s linear infinite",
            stateColor: "var(--sq-cover-shade-opening-rgb)",
        },
        open: {
            stateIcon: "hass:roller-shade",
            stateAnimation: "none",
            stateColor: "var(--sq-cover-shade-open-rgb)",
        },
        default: {
            stateIcon: "hass:alert-rhombus",
            stateAnimation: "none",
            stateColor: "var(--sq-unavailable-rgb)",
        },
    };

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        if (!config.entity?.startsWith("cover.")) {
            console.error("Invalid cover entity provided in the config.");
            this._entity = undefined;
        } else {
            this._entity = config.entity;
        }
        this._config = config;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") &&
                this._entity &&
                this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        return html`
            <div
                class="container"
                @click=${this._toggleEntity}
                @contextmenu=${this._showEntityList}
            >
                <div
                    class="icon"
                    @click=${this._showMoreInfo}
                    style="${styleMap(this._iconStyles)}"
                >
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
        this._stateObj = this._entity
            ? this.hass?.states[this._entity]
            : undefined;

        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this._stateObj) {
            const state = this._stateObj.state || "unknown";
            const { stateIcon, stateAnimation, stateColor } =
                this._stateMap[state] || this._stateMap.default;
            icon = this._config!.icon || stateIcon;
            iconAnimation = stateAnimation;
            iconColor = stateColor;
            name =
                this._config!.name ||
                this._stateObj.attributes.friendly_name ||
                "Shade";
            stateFmtd = formatState(this.hass!, this._entity!);
        } else {
            icon = this._config!.icon || "hass:roller-shade";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb)";
            name = this._config?.name || "Unknown";
            stateFmtd = "Unknown";
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
        if (!this.hass || !this._config || !this._stateObj) return;
        const state = this._stateObj.state;
        const tilt = this._config.tilt || 100;
        if (["closing", "opening"].includes(state)) {
            callService(this.hass, "cover", "stop_cover", {
                entity_id: this._entity,
            });
            return;
        }
        if (tilt >= 1 && tilt <= 100) {
            if (this._stateObj.attributes.current_position !== tilt) {
                callService(this.hass, "cover", "set_cover_position", {
                    entity_id: this._entity,
                    position: tilt,
                });
            } else {
                callService(this.hass, "cover", "set_cover_position", {
                    entity_id: this._entity,
                    position: 0,
                });
            }
        } else {
            callService(this.hass, "cover", "toggle", {
                entity_id: this._entity,
                position: 0,
            });
        }
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._stateObj, this._config?.callingDialog);
    }

    private _showEntityList(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this._stateObj) return;

        const group = this._config!.group || this._entity;
        const groupObj = this.hass.states[group];
        if (!groupObj) return;

        const entityIds = groupObj.attributes?.entity_id;
        if (entityIds.length === 0) return;

        const friendlyName =
            this._stateObj.attributes?.friendly_name || "Unknown";
        entityListDialog(friendlyName, "group", group, "shade");
    }
}
