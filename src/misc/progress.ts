import { css, LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

window.customCards.push({
  type: "smartqasa-progress-indicator",
  name: "SmartQasa Progress Indicator",
  preview: true,
  description: "A SmartQasa card for rendering a Progress Indicator.",
});

@customElement("smartqasa-progress-indicator")
class ProgressIndicator extends LitElement {
  @property({ type: Number }) activeIndex = 0;

  static styles = css`
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: transparent;
    }

    .dots {
      display: flex;
      width: min-content;
      height: min-content;
      gap: 1rem;
      justify-content: center;
      padding: 1.5rem;
      border-radius: 2rem;
      background-color: rgba(128, 128, 128, 0.1);
    }
    .dot {
      width: 1rem;
      height: 1rem;
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

  public async setConfig() {}

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
      <div class="container">
        <div class="dots">
          ${[0, 1, 2].map(
            (index) => html`
              <div
                class="dot ${index === this.activeIndex ? "active" : ""}"
              ></div>
            `,
          )}
        </div>
      </div>
    `;
  }
}
