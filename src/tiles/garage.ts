import {
    CSSResult,
    html,
    LitElement,
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
import { formatState } from "../utilities/format-state";

import tileStyle from "../css/tile.css";

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
    private _icon: string = "hass:garage-alert-variant";
    private _iconStyles: Record<string, string> = {};
    private _name: string = "Unknown Garage";
    private _stateFmtd: string = "Unknown State";

    private readonly _stateMap: Record<
        string,
        { stateIcon: string; stateAnimation: string; stateColor: string }
    > = {
        closed: {
            stateIcon: "hass:garage-variant",
            stateAnimation: "none",
            stateColor: "var(--sq-inactive-rgb)",
        },
        closing: {
            stateIcon: "hass:arrow-down-box",
            stateAnimation: "blink 2.0s linear infinite",
            stateColor: "var(--sq-cover-garage-closing-rgb)",
        },
        opening: {
            stateIcon: "hass:arrow-up-box",
            stateAnimation: "blink 2.0s linear infinite",
            stateColor: "var(--sq-cover-garage-opening-rgb)",
        },
        open: {
            stateIcon: "hass:garage-open-variant",
            stateAnimation: "none",
            stateColor: "var(--sq-cover-garage-open-rgb)",
        },
        default: {
            stateIcon: "hass:garage-alert-variant",
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
            (changedProps.has("_config") && this._config)
        );
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._toggleEntity}>
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
                "Garage";
            stateFmtd = formatState(this.hass!, this._entity!);
        } else {
            icon = this._config!.icon || "hass:garage-alert-variant";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
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
        callService(this.hass, "cover", "toggle", { entity_id: this._entity });
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._stateObj, this._config?.callingDialog);
    }
}
