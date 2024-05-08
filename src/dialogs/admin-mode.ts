import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig } from "../types";

interface Config extends LovelaceCardConfig {}

window.customCards.push({
    type: "smartqasa-admin-mode-dialog",
    name: "SmartQasa Admin Mode Dialog",
    preview: true,
    description: "A SmartQasa tile for accepting a PIN and enabling Admin Mode.",
});

@customElement("smartqasa-admin-mode-dialog")
export class AdminModeDialog extends LitElement {
    getCardSize(): number {
        return 6;
    }

    @property({ type: String }) adminPin: string = "";
    @state() config: any;
    @state() inputPin: string = "";
    @state() maskedPin: string = ""; // State to keep track of masked PIN
    @state() isAdmin: boolean = false;

    static styles = css`
        .container {
            background: none;
            margin-top: 0;
            border-style: none;
            box-shadow: none;
            text-align: center;
        }
        .header {
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }
        .header-text {
            flex-grow: 1;
            text-align: center;
        }
        .masked-pin {
            font-size: 1.5rem;
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
            width: 3.5rem;
            height: 3.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: var(--sq-card-border, none);
            border-radius: 1.5rem;
            background-color: var(--sq-card-background-color, rgba(192, 192, 192, 0.5));
            cursor: pointer;
        }
    `;

    public setConfig(config: Config): void {
        this.config = { ...config };
    }

    protected render() {
        return html`
            <div class="container">
                <div class="header">
                    <span class="header-text">Passcode Required</span>
                    <ha-icon class="icon" icon="hass:dialpad"></ha-icon>
                    <span class="masked-pin">${this.maskedPin}</span>
                </div>
                <div class="grid">
                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, "☓", 0, "✓"].map((digit) => this.renderButton(digit))}
                </div>
            </div>
        `;
    }

    private renderButton(digit: number | string) {
        return html` <div class="button" @click=${() => this.handleInput(digit)}>${digit}</div> `;
    }

    private handleInput(digit: number | string) {
        if (digit === "✓") {
            this.verifyPin();
        } else if (digit === "☓") {
            this.inputPin = "";
            this.maskedPin = ""; // Clear the masked PIN
        } else {
            this.inputPin += digit;
            this.maskedPin += "*"; // Add a * for each digit entered
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
