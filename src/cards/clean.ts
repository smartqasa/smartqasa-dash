import { css, html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import image from "../assets/images/clean.png";

@customElement("smartqasa-clean-card")
export class CleanCard extends LitElement {
    public getCardSize(): number | Promise<number> {
        return 10;
    }

    static styles = css`
        .container {
            border-radius: var(--sq-card-border-radius);
            background-size: cover;
            background-position: center;
            width: 100%;
            height: 100%;
        }
    `;

    public setConfig(): void {}

    protected render(): TemplateResult {
        const backgroundImage = `url(${image})`;

        return html` <div class="container" style="background-image: ${backgroundImage}"></div> `;
    }
}
