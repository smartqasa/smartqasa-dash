import { CSSResultGroup, LitElement, html, css, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
    title: string;
}

@customElement("smartqasa-title-card")
export class TitleCard extends LitElement {
    @state() private _config?: Config;

    static get styles(): CSSResultGroup {
        return css`
            :host {
                display: block;
                padding: 0.7rem;
                border: var(--sq-card-border, none);
                border-radius: 1.5rem;
                background-color: var(--sq-card-background-color, rgba(192, 192, 192, 0.5));
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

    setConfig(config: Config): void {
        this._config = { ...config };
        this._config.title = this._config.title || "Title";
    }

    render(): TemplateResult {
        return html` <div class="title">${this._config?.title}</div> `;
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-title-card",
    name: "SmartQasa Title Card",
    preview: true,
    description: "A SmartQasa card for rendering text in a title.",
});
