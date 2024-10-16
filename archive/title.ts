import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LovelaceCardConfig } from "../src/types";

interface Config extends LovelaceCardConfig {
  title: string;
}

window.customCards.push({
  type: "smartqasa-title-card",
  name: "SmartQasa Title Card",
  preview: true,
  description: "A SmartQasa card for rendering text in a title.",
});

@customElement("smartqasa-title-card")
export class TitleCard extends LitElement {
  getCardSize(): number {
    return 1;
  }

  @state() private _config?: Config;

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        padding: 0.7rem;
        border: var(--sq-card-border, none);
        border-radius: 1.5rem;
        background-color: var(
          --sq-card-background-color,
          rgba(192, 192, 192, 0.5)
        );
        box-sizing: border-box;
      }
      .title {
        justify-self: center;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: var(--sq-primary-font-size, 1.5rem);
        font-weight: var(--sq-primary-font-weight, 400);
        color: rgb(var(--sq-primary-font-rgb));
      }
    `;
  }

  public setConfig(config: Config): void {
    this._config = { ...config };
    this._config.title = this._config.title || "Title";
  }

  protected render(): TemplateResult {
    return html` <div class="title">${this._config?.title}</div> `;
  }
}
