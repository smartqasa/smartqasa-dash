import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("popup-confirmation")
class PopupConfirmation extends LitElement {
    @property({ type: Boolean, reflect: true }) isOpen: boolean = false;
    @property({ type: String }) message: string = "";

    static styles = css`
        :host {
            display: block;
        }
        :host([is-open]) .overlay {
            display: flex;
        }
        .overlay {
            display: none;
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .popup {
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        button {
            margin-top: 10px;
            margin-right: 10px;
            cursor: pointer;
        }
    `;

    protected render() {
        return html`
            <div class="overlay" @click="${this.close}">
                <div class="popup" @click="${this.close}">
                    <p>${this.message}</p>
                    <button @click="${this.confirm}">Confirm</button>
                    <button @click="${this.close}">Cancel</button>
                </div>
            </div>
        `;
    }

    private confirm() {
        this.dispatchEvent(new CustomEvent("confirm"));
        this.close;
    }

    private close(e: Event): void {
        e.stopPropagation();
        this.isOpen = false;
    }

    private open(message = "Are you sure?") {
        this.message = message;
        this.isOpen = true;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("open-confirmation-popup", this.handleOpen);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("open-confirmation-popup", this.handleOpen);
    }

    handleOpen = (event: CustomEvent): void => {
        const { detail } = event;
        this.open(detail.message);
    };
}
