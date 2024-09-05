import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

window.customCards.push({
    type: "smartqasa-popup-dialog",
    name: "SmartQasa Popup Dialog",
    preview: true,
    description: "A SmartQasa tile for executing multiple Home Assistant actions.",
});

@customElement("smartqasa-popup-dialog")
class SmartQasaPopupDialog extends LitElement {
    @property({ type: String }) title = "";
    @property({ type: String }) size = "normal"; // 'normal' or 'fullscreen'
    @property({ type: Number }) timeout = 0; // timeout in seconds
    @property({ type: Object }) card = {};
    @property({ type: Boolean }) smartqasa_popupVisible = false; // Controls the visibility of the popup

    private smartqasa_timeoutId: number | undefined;

    public async setConfig() {}

    connectedCallback() {
        super.connectedCallback();
        if (this.timeout > 0) {
            this.smartqasa_timeoutId = window.setTimeout(() => this.smartqasa_closePopup(), this.timeout * 1000);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.smartqasa_timeoutId) {
            clearTimeout(this.smartqasa_timeoutId);
        }
    }

    smartqasa_closePopup() {
        this.smartqasa_popupVisible = false; // Hide the popup
        this.dispatchEvent(new CustomEvent("smartqasa-close-popup", { bubbles: true, composed: true }));
    }

    smartqasa_onOverlayClick(e: Event) {
        if ((e.target as HTMLElement).classList.contains("overlay")) {
            this.smartqasa_closePopup();
        }
    }

    static styles = css`
        :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            backdrop-filter: blur(5px);
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
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
            z-index: 1000;
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
        if (!this.smartqasa_popupVisible) return html``; // Do not render anything if the popup is not visible

        const progressStyle = this.timeout > 0 ? `animation: progress ${this.timeout}s linear forwards;` : "";

        return html`
            <div class="overlay" @click="${this.smartqasa_onOverlayClick}"></div>
            <!-- Clicking outside the container triggers close -->
            <div class="popup-container ${this.size}">
                <div class="progress-bar"><div style="${progressStyle}"></div></div>
                <button class="close-btn" @click=${this.smartqasa_closePopup}>X</button>
                <div class="title">${this.title}</div>
                <div class="content">${this.card ? this.card : html`<slot></slot>`}</div>
            </div>
        `;
    }
}
