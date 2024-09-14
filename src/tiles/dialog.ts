import { CSSResult, html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { LovelaceCardConfig } from "../types";
import { dialogTable } from "../tables/dialogs";
import { menuConfig } from "../misc/menu-config";

import tileBaseStyle from "../css/tile-base.css";

interface Config extends LovelaceCardConfig {
    dialog: string;
    icon?: string;
    name?: string;
    menu_tab?: number;
}

window.customCards.push({
    type: "smartqasa-dialog-tile",
    name: "SmartQasa Dialog Tile",
    preview: true,
    description: "A SmartQasa card for displaying a browser_mod popup dialog.",
});

@customElement("smartqasa-dialog-tile")
export class DialogTile extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @state() private config?: Config;
    @state() private dialogObj?: any;

    static styles: CSSResult = unsafeCSS(tileBaseStyle);

    setConfig(config: Config): void {
        this.config = { ...config };
        this.dialogObj = dialogTable[config.dialog];
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

        if (this.config && this.dialogObj) {
            icon = this.config.icon || this.dialogObj.icon;
            iconColor = "var(--sq-inactive-rgb)";
            name = this.config.name || this.dialogObj.name;
        } else {
            icon = this.config?.icon || "hass:help-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
        }

        return { icon, iconAnimation, iconColor, name };
    }

    private _showDialog(e: Event) {
        e.stopPropagation();
        if (!this.dialogObj || !this.config) return;

        const dialogConfig = { ...this.dialogObj.data };

        /*
        const menuTab = this._config.menu_tab;

        if (menuTab !== undefined && menuTab >= 0 && menuTab <= 3) {
            const dismissData = await menuConfig(menuTab);
            dialogConfig.dismiss_action = {
                service: "browser_mod.popup",
                data: {
                    ...dismissData,
                },
            };
        }
        */

        window.browser_mod?.service("popup", dialogConfig);
    }
}
