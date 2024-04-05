import { CSSResult, LitElement, html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LovelaceCardConfig } from "custom-card-helpers";

import styleTileBase from "../styles/tile-base";

interface Config extends LovelaceCardConfig {
  icon: string;
  name: string;
  title?: string;
  size?: string;
  dismissable?: boolean;
  timeout?: number;
  content?: any;
}

@customElement("smartqasa-dialog-tile")
export class DialogTile extends LitElement {
  @state() private _config?: Config;
  @state() private _icon: string = "hass:help-rhombus";
  @state() private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
  @state() private _name: string = "Loading...";

  private _hass: any;

  static styles: CSSResult = styleTileBase;

  setConfig(config: Config): void {
    if (!config) throw new Error("You must specify an icon and name.");
    this._config = config;
    this._icon = this._config.icon;
    this._name = this._config.name;
  }

  protected render(): TemplateResult {
    return html`
      <div class="container" @click=${this._showDialog}>
        <div
          class="icon"
          style="
            color: rgb(${this._iconColor});
            background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
          "
        >
          <ha-icon .icon=${this._icon}></ha-icon>
        </div>
        <div class="name">${this._name}</div>
      </div>
    `;
  }

  private _showDialog(e: Event): void {
    e.stopPropagation();
    const popupData = {
      title: this._config?.title || this._name,
      size: this._config?.size || "normal",
      dismissable: this._config?.dismissable || true,
      timeout: this._config?.timeout || 60000,
      content: this._config?.content || {
        type: "markdown",
        title: "No content",
        content: "No content provided.",
      },
    };
    window.browser_mod?.service("popup", popupData);
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
