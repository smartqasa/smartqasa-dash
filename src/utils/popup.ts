import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

window.customCards.push({
    type: "smartqasa-popup-dialog",
    name: "SmartQasa Popup Dialog",
    preview: true,
    description: "A SmartQasa tile for executing multiple Home Assistant actions.",
});

@customElement("smartqasa-popup-dialog")
class CustomPopup extends LitElement {
    @property({ type: String }) title = "";
    @property({ type: String }) size = "normal";
    @property({ type: Number }) timeout = 0;
    @property({ type: Object }) card = {};

    private timeoutId: number | undefined;

    connectedCallback() {
        super.connectedCallback();
        if (this.timeout > 0) {
            this.timeoutId = window.setTimeout(() => this.closePopup(), this.timeout * 1000);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    closePopup() {
        this.dispatchEvent(new CustomEvent("close-popup", { bubbles: true, composed: true }));
    }

    static styles = css`
        :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .popup-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            width: var(--popup-width, 300px);
            max-width: 90vw;
            padding: 20px;
            position: relative;
            transition: all 0.3s ease;
        }

        .popup-container.fullscreen {
            width: 100vw;
            height: 100vh;
        }

        .progress-bar {
            width: 100%;
            height: 5px;
            background-color: lightgray;
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
        }

        .title {
            text-align: left;
            font-size: 1.5em;
        }

        .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 1.2em;
            cursor: pointer;
        }
    `;

    render() {
        const progressStyle = this.timeout > 0 ? `animation: progress ${this.timeout}s linear forwards;` : "";

        return html`
            <div class="popup-container ${this.size}">
                <div class="progress-bar"><div style="${progressStyle}"></div></div>
                <button class="close-btn" @click=${this.closePopup}>X</button>
                <div class="title">${this.title}</div>
                <div class="content">${this.card ? this.card : html`<slot></slot>`}</div>
            </div>
        `;
    }
}

customElements.define("custom-popup", CustomPopup);
