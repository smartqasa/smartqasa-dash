import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("popup-dialog")
class PopupDialog extends LitElement {
    @property({ type: Array }) cardConfigs = [];

    static styles = css`
        :host([is-open]) .overlay {
            display: flex;
        }
        .overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .popup {
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: auto; /* Or a specific width */
            display: flex;
            flex-direction: column;
        }
    `;

    protected render() {
        return html`
            <div class="overlay" @click="${this.close}">
                <div class="popup" @click="${this.handleClick}"></div>
            </div>
        `;
    }

    private handleClick(e: Event): void {
        e.stopPropagation();
    }

    private close() {
        this.dispatchEvent(new CustomEvent("close"));
    }
}
