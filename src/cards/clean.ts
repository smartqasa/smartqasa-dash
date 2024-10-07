import { css, html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import image from "../assets/images/clean.png";

window.customCards.push({
    type: "smartqasa-clean-card",
    name: "SmartQasa Clean card",
    preview: true,
    description: "A SmartQasa card for displaying a clean screen image.",
});

@customElement("smartqasa-clean-card")
export class CleanCard extends LitElement {
    public getCardSize(): number | Promise<number> {
        return 100;
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 90%;
            border-radius: var(--sq-card-border-radius);
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--sq-card-border-radius);
        }
    `;

    public setConfig(): void {}

    protected render(): TemplateResult {
        return html` <img src="${image}" alt="Clean Screen" /> `;
    }
}
