import { LitElement, html, css, CSSResultGroup, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("smartqasa-navigate-strip")
class NavigateStrip extends LitElement {
    static styles: CSSResultGroup = css`
        :host {
            display: block;
            align-self: end;
            margin: 5px 0;
            padding: 0;
            border: none;
            border-radius: 0;
            box-shadow: none;
            background-color: transparent;
        }
        .grid {
            display: grid;
            grid-template-areas: "home areas entertain menu";
            grid-template-columns: repeat(4, max-content);
            grid-column-gap: 5vw;
        }
    `;

    protected render(): TemplateResult {
        return html`
            <div class="grid">
                ${this.renderButton("home", "hass:home", "Home")}
                ${this.renderButton("areas", "hass:view-dashboard", "Areas")}
                ${this.renderButton("entertain", "hass:music", "Entertainment")}
                ${this.renderButton("menu", "hass:menu", "Menu")}
            </div>
        `;
    }

    private renderButton(id: string, icon: string, name: string): TemplateResult {
        return html`
            <div class="icon" @click="${() => this.handleAction(id)}">
                <ha-icon .icon=${icon}></ha-icon>
                <span>${name}</span>
            </div>
        `;
    }

    private handleAction(id: string): void {
        // Define action handling logic here based on the `id`
        console.log(`Action for ${id}`);
    }
}
