import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

window.customCards.push({
    type: "smartqasa-admin-mode-dialog",
    name: "SmartQasa Admin Mode Dialog",
    preview: true,
    description: "A SmartQasa tile for accepting a PIN and enabling Admin Mode.",
});

@customElement("smartqasa-admin-mode-dialog")
export class AdminModeDialog extends LitElement {
    @property({ type: String }) adminPin: string = "";
    @state() inputPin: string = "";
    @state() isAdmin: boolean = false;

    static styles = css`
        .card {
            --ha-card-background: none;
            margin-top: 0;
            border-style: none;
            box-shadow: none;
            text-align: center;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(3, min-content);
            grid-template-rows: repeat(4, min-content);
            grid-gap: 40px;
            place-content: center;
            place-items: center;
        }
        .button {
            cursor: pointer;
            padding: 10px;
            border: 1px solid #ccc;
        }
    `;

    protected render() {
        return html`
            <div class="card">
                <div>Passcode Required</div>
                <div class="grid">
                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "✔️"].map((digit) => this.renderButton(digit))}
                </div>
            </div>
        `;
    }

    private renderButton(digit: number | string) {
        return html` <div class="button" @click=${() => this.handleInput(digit)}>${digit}</div> `;
    }

    private handleInput(digit: number | string) {
        if (digit === "✔️") {
            this.verifyPin();
        } else if (digit === "") {
            this.inputPin = "";
        } else {
            this.inputPin += digit;
        }
    }

    private verifyPin() {
        if (this.inputPin === this.adminPin) {
            this.isAdmin = true;
            console.log("Admin Mode is now ON!");
        } else {
            this.isAdmin = false;
            console.log("Admin Mode is OFF.");
        }
        this.dispatchEvent(new CustomEvent("admin-mode-changed", { detail: { isAdmin: this.isAdmin } }));
    }
}