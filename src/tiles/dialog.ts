import { CSSResult, LitElement, html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LovelaceCardConfig } from "custom-card-helpers";
import { dialogTable } from "../tables/dialogs";
import { menuConfig } from "../misc/menu-config";

import { tileBaseStyle } from "../styles/tile";

interface Config extends LovelaceCardConfig {
    dialog: string;
    icon?: string;
    name?: string;
    menu_tab?: number;
}

@customElement("smartqasa-dialog-tile")
export class DialogTile extends LitElement {
    @state() private _config?: Config;
    @state() private _dialogObj?: any;

    private _icon: string = "hass:help-rhombus";
    private _iconColor: string = "var(--sq-inactive-rgb)";
    private _name: string = "Loading...";

    static styles: CSSResult = tileBaseStyle;

    setConfig(config: Config): void {
        this._config = { ...config };
        this._dialogObj = this._config ? dialogTable[this._config.dialog] : undefined;
        this.updateState();
    }

    private updateState(): void {
        if (!this._dialogObj) {
            this._icon = this._config?.icon || "hass:help-rhombus";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            return;
        }

        this._icon = this._config?.icon || this._dialogObj.icon;
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._dialogObj.name;
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this.showDialog}>
                <div
                    class="icon"
                    style="
                        color: rgb(${this._iconColor});
                        background-color: rgba(${this._iconColor}, var(--sq-icon-opacity, 0.2));
                    "
                >
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }

    private async showDialog(e: Event): Promise<void> {
        e.stopPropagation();
        if (!this._dialogObj || !this._config) return;

        let dialogConfig = { ...this._dialogObj.data };

        const menuTab = this._config.menu_tab;
        if (menuTab !== undefined && menuTab >= 0 && menuTab <= 3) {
            try {
                const dismissData = await menuConfig(menuTab);
                dialogConfig.dismiss_action = {
                    service: "browser_mod.popup",
                    /*data: dismissData,*/
                };
            } catch (error) {
                console.error("Error loading menu configuration", error);
            }
        }
        window.browser_mod?.service("popup", dialogConfig);
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-dialog-tile",
    name: "SmartQasa Dialog Tile",
    preview: true,
    description: "A SmartQasa card for displaying a browser_mod popup dialog.",
});
