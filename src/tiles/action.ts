import { CSSResult, html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";

import tileBaseStyle from "../styles/tile-base.css";

interface ActionConfig {
    action: string;
    data?: Record<string, any>;
}

interface Config extends LovelaceCardConfig {
    icon?: string;
    name?: string;
    actions: ActionConfig[];
}

window.customCards.push({
    type: "smartqasa-action-tile",
    name: "SmartQasa Action Tile",
    preview: true,
    description: "A SmartQasa tile for executing multiple Home Assistant actions.",
});

@customElement("smartqasa-action-tile")
export class ActionTile extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _running: boolean = false;

    static styles: CSSResult = unsafeCSS(tileBaseStyle);

    public setConfig(config: Config): void {
        this._config = { ...config };
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(changedProps.has("_running") || changedProps.has("hass") || changedProps.has("_config"));
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this._runActions}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }

    private updateState() {
        let icon, iconAnimation, iconColor, name;

        if (this._config) {
            if (this._running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            } else {
                icon = this._config.icon || "hass:help-rhombus";
                iconAnimation = "none";
                iconColor = "var(--sq-inactive-rgb)";
            }
            name = this._config.name || "Action Tile";
        } else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = "Unknown";
        }

        return { icon, iconAnimation, iconColor, name };
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