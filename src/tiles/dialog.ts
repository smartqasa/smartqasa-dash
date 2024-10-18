import { CSSResult, html, LitElement, TemplateResult, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { LovelaceCard, LovelaceCardConfig } from "../types";
import { dialogTable } from "../dialogs/dialog-table";
import { dialogPopup } from "../dialogs/dialog-popup";

import tileStyle from "../css/tile.css";

interface Config extends LovelaceCardConfig {
    dialog: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-dialog-tile",
    name: "SmartQasa Dialog Tile",
    preview: true,
    description: "A SmartQasa card for displaying a browser_mod popup dialog.",
});

@customElement("smartqasa-dialog-tile")
export class DialogTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @state() private _config?: Config;
    @state() private _dialogObj?: any;

    private _icon: string = "hass:help-rhombus";
    private _iconStyles: Record<string, string> = {};
    private _name: string = "Unknown Dialog";

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        this._config = config;
        this._dialogObj = dialogTable[config.dialog];
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._showDialog}>
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
        let icon, iconColor, name;

        if (this._config && this._dialogObj) {
            icon = this._config.icon || this._dialogObj.icon;
            iconColor = "var(--sq-inactive-rgb)";
            name = this._config.name || this._dialogObj.name;
        } else {
            icon = this._config?.icon || "hass:help-rhombus";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config?.name || "Unknown";
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
        };
        this._icon = icon;
        this._name = name;
    }

    private _showDialog(e: Event) {
        e.stopPropagation();
        if (!this._dialogObj) return;
        dialogPopup(
            this._dialogObj.data,
            this._config?.callingDialog || undefined
        );
    }
}
