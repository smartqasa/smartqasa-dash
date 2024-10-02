import { CSSResult, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { callService } from "../utilities/call-service";

import tileStyle from "../css/tile.css";

interface ActionConfig {
    action: string;
    data?: Record<string, any>;
}

interface Config extends LovelaceCardConfig {
    icon: string;
    name: string;
    actions: ActionConfig[];
}

window.customCards.push({
    type: "smartqasa-action-tile",
    name: "SmartQasa Action Tile",
    preview: true,
    description: "A SmartQasa tile for executing multiple Home Assistant actions.",
});

@customElement("smartqasa-action-tile")
export class ActionTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _running: boolean = false;

    private _actions: ActionConfig[] = [];
    private _icon: string = "hass:alert-rhombus";
    private _iconStyles: Record<string, string> = {};
    private _name: string = "Unknown Action";

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        this._config = config;
        this._actions = config.actions || [];
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(changedProps.has("_config") || changedProps.has("_running"));
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config) return nothing;

        return html`
            <div class="container" @click=${this._runActions}>
                <div class="icon" style="${styleMap(this._iconStyles)}">
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                <div class="text">
                    <div class="name">${this._name}</div>
                </div>
            </div>
        `;
    }

    private _updateState(): void {
        let iconAnimation, iconColor;

        if (this._config) {
            if (this._running) {
                this._icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue)";
            } else {
                this._icon = this._config.icon || "hass:help-rhombus";
                iconAnimation = "none";
                iconColor = "var(--sq-inactive-rgb)";
            }
            this._name = this._config.name || "Action Tile";
        } else {
            this._icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb)";
            this._name = "Unknown";
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
    }

    private async _runActions(e: Event): Promise<void> {
        e.stopPropagation();
        if (!this.hass || !this._config?.actions) return;

        this._running = true;

        for (const action of this._config.actions) {
            const [domain, service] = action.action.split(".");
            await callService(this.hass, domain, service, action.data || {});
        }

        setTimeout(() => {
            this._running = false;
        }, 1000);
    }
}
