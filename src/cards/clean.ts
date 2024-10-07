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
        }
    `;

    public setConfig(): void {}

    protected render(): TemplateResult {
        return html`
            <div>
                <div class="container">
                    <img src=${image} />
                </div>
            </div>
        `;
    }
}
