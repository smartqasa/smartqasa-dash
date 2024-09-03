import { css, LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

window.customCards.push({
    type: "smartqasa-progress-indicator",
    name: "SmartQasa Progress Indicator",
    preview: true,
    description: "A SmartQasa card for rendering a Progress Indicator.",
});

@customElement("progress-indicator")
class ProgressIndicator extends LitElement {
    @property({ type: Number }) activeIndex = 0;

    static styles = css`
        .dots {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
        }
        .dot {
            width: 0.5rem;
            height: 0.5rem;
            background-color: var(--dot-color, #ccc);
            border-radius: 50%;
            opacity: 0.5;
            transition: opacity 0.3s;
        }
        .dot.active {
            opacity: 1;
            background-color: var(--dot-active-color, #000);
        }
    `;

    connectedCallback() {
        super.connectedCallback();
        this._startAnimation();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this._intervalId);
    }

    private _intervalId?: NodeJS.Timeout;

    private _startAnimation() {
        this._intervalId = setInterval(() => {
            this.activeIndex = (this.activeIndex + 1) % 3;
        }, 500); // Change the active dot every 500ms
    }

    render() {
        return html`
            <div class="dots">
                ${[0, 1, 2].map(
                    (index) => html` <div class="dot ${index === this.activeIndex ? "active" : ""}"></div> `
                )}
            </div>
        `;
    }
}
