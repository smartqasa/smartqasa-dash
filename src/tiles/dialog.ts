import { CSSResult, LitElement, html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LovelaceCardConfig } from "custom-card-helpers";

import styleTileBase from "../styles/tile-base";

import dialogTable from "../tables/dialogs";

interface Config extends LovelaceCardConfig {
  dialog: string;
  icon?: string;
  name?: string;
}

@customElement("smartqasa-dialog-tile")
export class DialogTile extends LitElement {
  @state() private _config?: Config;
  @state() private _dialogObj?: any

  static styles: CSSResult = styleTileBase;

  setConfig(config: Config): void {
    if (!config.dialog) throw new Error("A valid dialog must be specified.");
    this._config = config;
    this._dialogObj = dialogTable[config.dialog] || undefined;
  }

  protected render(): TemplateResult {
    const icon = this._config?.icon || this._dialogObj?.icon || "hass:help-rhombus";
    const iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
    const name = this._config?.name || this._dialogObj?.name || this._config?.dialog;

    return html`
      <div class="container" @click=${this._showDialog}>
        <div
          class="icon"
          style="
            color: rgb(${iconColor});
            background-color: rgba(${iconColor}, var(--sq-icon-opacity, 0.2));
          "
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
      </div>
    `;
  }

  private _showDialog(e: Event): void {
    e.stopPropagation();
    window.browser_mod?.service("popup", this._dialogObj.data);
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
