import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { createElement } from "../utils/create-element";
import { LovelaceCard, LovelaceCardConfig, HomeAssistant } from "../types"; // Correct import for LovelaceCard

export interface PopupData {
    title?: string;
    size?: "normal" | "fullscreen"; // Using specific types for better validation
    timeout?: number;
    card?: LovelaceCardConfig;
}

@customElement("smartqasa-popup-dialog")
export class PopupDialog extends LitElement {
    @property({ type: String }) title = "";
    @property({ type: String }) size: "normal" | "fullscreen" = "normal";
    @property({ type: Number }) timeout = 0;
    @property({ type: Object }) card?: LovelaceCardConfig;
    @property({ type: Object }) hass!: HomeAssistant;

    @state() private progressBarAnimation: string = ""; // Track progress bar animation

    @query(".progress-bar > div") private progressBar!: HTMLElement; // Query the progress bar for direct access

    private cardElement?: LovelaceCard; // Correct usage of LovelaceCard
    private timeoutId: number | undefined;

    updated(changedProperties: PropertyValues) {
        // Handle changes to the timeout property
        if (changedProperties.has("timeout")) {
            this.handleTimeout();
        }

        // Handle changes to the hass property and bind it to the card
        if (changedProperties.has("hass") && this.cardElement) {
            this.cardElement.hass = this.hass;
        }

        // Recreate the card if 'card' config changes
        if (changedProperties.has("card")) {
            this.cardElement = this.renderCard();
        }
    }

    private handleTimeout() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        if (this.timeout > 0) {
            // Start the timeout and update progress bar animation
            this.timeoutId = window.setTimeout(() => this.closePopup(), this.timeout * 1000);

            this.progressBarAnimation = `progress ${this.timeout}s linear forwards`;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    closePopup() {
        this.dispatchEvent(new CustomEvent("smartqasa-popup-close", { bubbles: true, composed: true }));
    }

    private renderCard() {
        if (this.card) {
            const cardElement = createElement(this.card);
            if (cardElement) {
                cardElement.hass = this.hass;
                return cardElement;
            } else {
                console.error("Failed to create card element from config:", this.card);
            }
        }
        return undefined;
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

        .progress-bar div {
            height: 100%;
            background-color: #3b82f6;
            animation: var(--progress-animation, none);
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
        return html`
            <div class="popup-container ${this.size}">
                ${this.timeout > 0
                    ? html`<div class="progress-bar">
                          <div style="--progress-animation: ${this.progressBarAnimation}"></div>
                      </div>`
                    : ""}
                <button class="close-btn" @click=${this.closePopup}>X</button>
                <div class="title">${this.title}</div>
                <div class="content">${this.cardElement ? html`${this.cardElement}` : html`<slot></slot>`}</div>
            </div>
        `;
    }
}
