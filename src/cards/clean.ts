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
            width: 100%; /* Fill the size of the popup window */
            height: 100%; /* Fill the size of the popup window */
            overflow: hidden;
        }

        .container {
            width: 100%;
            height: 100%;
            background-attachment: fixed;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: var(--sq-card-border-radius);
            overflow: hidden;
        }
    `;

    public setConfig(): void {}

    protected render(): TemplateResult {
        const backgroundImage = `url(${image})`;

        return html` <div class="container" style="background-image: ${backgroundImage}"></div> `;
    }
}
