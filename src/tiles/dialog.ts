import { CSSResult, html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { LovelaceCard, LovelaceCardConfig } from "../types";
import { dialogTable } from "../dialogs/dialog-table";
import { dialogPopup } from "../dialogs/dialog-popup";

import tileBaseStyle from "../css/tile-base.css";

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
    getCardSize(): number {
        return 1;
    }

    @state() private _config?: Config;
    @state() private _dialogObj?: any;

    static styles: CSSResult = unsafeCSS(tileBaseStyle);

    setConfig(config: Config): void {
        this._config = { ...config };
        this._dialogObj = dialogTable[config.dialog];
    }

    protected render(): TemplateResult {
        const { icon, iconAnimation, iconColor, name } = this._updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
            animation: iconAnimation,
        };
        return html`
            <div class="container" @click=${this._showDialog}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }

    private _updateState(): { icon: string; iconAnimation?: string; iconColor: string; name: string } {
        let icon, iconAnimation, iconColor, name;

        if (this._config && this._dialogObj) {
            icon = this._config.icon || this._dialogObj.icon;
            iconColor = "var(--sq-inactive-rgb)";
            name = this._config.name || this._dialogObj.name;
        } else {
            icon = this._config?.icon || "hass:help-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this._config?.name || "Unknown";
        }

        return { icon, iconAnimation, iconColor, name };
    }

    private _showDialog(e: Event) {
        e.stopPropagation();
        if (!this._dialogObj) return;
        dialogPopup(this._dialogObj.data, this._config?.callingDialog || undefined);
    }
}
