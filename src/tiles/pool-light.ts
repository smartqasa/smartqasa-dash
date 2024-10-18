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
import { sequenceTable } from "../tables/pool-light-sequences";

import tileStyle from "../css/tile.css";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-pool-light-tile",
    name: "SmartQasa Pool Light Tile",
    preview: true,
    description:
        "A SmartQasa tile for controlling a pool color light or switch entity.",
});

@customElement("smartqasa-pool-light-tile")
export class PoolLightTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _entity?: string;
    private _icon: string = "hass:lightbulb";
    private _iconStyles: Record<string, string> = {};
    private _name: string = "Unknown Light";
    private _stateFmtd: string = "Unknown State";

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        this._entity = ["light", "switch"].includes(
            config.entity?.split(".")[0]
        )
            ? config.entity
            : undefined;
        this._config = config;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") &&
                this._entity &&
                this.hass?.states[this._entity] !== this._stateObj) ||
            (changedProps.has("config") && this._config)
        );
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        return html`
            <div class="container" @click=${this._toggleEntity}>
                <div
                    class="icon"
                    @click=${this._showColorList}
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

        let icon, iconColor, name, stateFmtd;
        if (this._stateObj) {
            const state = this._stateObj.state || "unknown";
            icon =
                this._config!.icon ||
                this._stateObj.attributes.icon ||
                "hass:lightbulb";
            iconColor =
                state === "on"
                    ? "var(--sq-light-on-rgb)"
                    : "var(--sq-inactive-rgb)";
            name =
                this._config!.name ||
                this._stateObj.attributes.friendly_name ||
                "Light";
            stateFmtd =
                this.hass!.formatEntityState(this._stateObj) +
                (state === "on" && this._stateObj.attributes.brightness
                    ? " - " +
                      this.hass!.formatEntityAttributeValue(
                          this._stateObj,
                          "brightness"
                      )
                    : "");
        } else {
            icon = this._config!.icon || "hass:lightbulb-alert";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config!.name || "Unknown";
            stateFmtd = "Unknown";
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
        };
        this._icon = icon;
        this._name = name;
        this._stateFmtd = stateFmtd;
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
            title:
                this._stateObj.attributes.friendly_name ||
                this._stateObj.entity_id,
            timeout: 60000,
            content: {
                type: "custom:smartqasa-grid-stack",
                columns: 3,
                cards: cards,
            },
        };

        window.browser_mod?.service("popup", dialogConfig);
    }
}
