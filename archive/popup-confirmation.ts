import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('popup-confirmation')
class PopupConfirmation extends LitElement {
    @property({ type: Boolean, reflect: true }) isOpen: boolean = false;
    @property({ type: String }) message: string = 'Proceed?';

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
        button:hover {
            background-color: #e0e0e0;
        }
    `;

    protected render() {
        return html`
            <div class="overlay" @click="${this.close}">
                <div class="popup" @click="${this.stopPropagation}">
                    <p>${this.message}</p>
                    <button @click="${this.confirm}">Confirm</button>
                    <button @click="${this.close}">Cancel</button>
                </div>
            </div>
        `;
    }

    public confirm() {
        this.dispatchEvent(new CustomEvent('confirm'));
        this.close();
    }

    public close(e?: Event): void {
        if (e) e.stopPropagation();
        this.isOpen = false;
    }

    public open(message = 'Are you sure?') {
        this.message = message;
        this.isOpen = true;
    }

    private stopPropagation(e: Event): void {
        e.stopPropagation();
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('open-confirmation-popup', this.handleOpen);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('open-confirmation-popup', this.handleOpen);
    }

    handleOpen = (event: CustomEvent): void => {
        console.log('Received open-confirmation-popup', event.detail.message);
        this.open(event.detail.message);
    };
}

export { PopupConfirmation };
