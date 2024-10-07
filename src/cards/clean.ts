import { css, html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import image from "../assets/images/clean.png";

@customElement("smartqasa-clean-card")
export class CleanCard extends LitElement {
    public getCardSize(): number | Promise<number> {
        return 100;
    }

    static styles = css`
        .container {
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
