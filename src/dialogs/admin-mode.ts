import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HomeAssistant, LovelaceCardConfig } from "../types";

interface Config extends LovelaceCardConfig {
    admin_pin_entity: string;
    admin_mode_entity: string;
}

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

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    @state() private inputPin: string = "";
    @state() private maskedPin: string = "";
    @state() private pinState: string = "";

    static styles = css`
        :host {
            font-weight: var(--sq-primary-font-weight, 400);
            font-size: var(--sq-primary-font-size, 1.5rem);
            color: rgb(var(--sq-primary-font-rgb), 128, 128, 128);
        }
        .container {
            background: none;
            padding: 1.5rem;
            border-style: none;
            box-shadow: none;
            text-align: center;
        }
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .header-text {
            flex: 1;
            text-align: left;
        }
        .masked-pin {
            height: 2rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
            text-align: center;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(3, min-content);
            grid-template-rows: repeat(4, min-content);
            grid-gap: 3rem;
            place-content: center;
            place-items: center;
        }
        .button {
            display: flex;
            width: 3.5rem;
            height: 3.5rem;
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
        if (!this.config) return html``;

        let maskedPin, pinStyles;
        if (!this.pinState) {
            maskedPin = this.maskedPin;
            pinStyles = {
                color: "rgb(var(--sq-primary-font-rgb))",
            };
        } else if (this.pinState === "valid") {
            maskedPin = "PIN Accepted";
            pinStyles = {
                color: "rgb(var(--sq-rgb-green))",
            };
        } else {
            maskedPin = "Invalid PIN";
            pinStyles = {
                color: "rgb(var(--sq-rgb-red))",
            };
        }
        return html`
            <div class="container">
                <div class="header">
                    <span class="header-text">Password Required</span>
                    <ha-icon icon="hass:dialpad"></ha-icon>
                </div>
                <div class="masked-pin" style="${styleMap(pinStyles)}">${maskedPin}</div>
                <div class="grid">
                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, "☓", 0, "✓"].map((digit) => this.renderButton(digit))}
                </div>
            </div>
        `;
    }

    private renderButton(digit: number | string) {
        return html`<div class="button" @click=${() => this.handleInput(digit)}>${digit}</div>`;
    }

    private handleInput(digit: number | string) {
        if (this.pinState) return;

        if (digit === "✓") {
            this.verifyPin();
        } else if (digit === "☓") {
            this.inputPin = "";
            this.maskedPin = "";
        } else {
            this.inputPin += digit;
            this.maskedPin += "*";
        }
    }

    private verifyPin() {
        if (!this.hass || !this.config) return;

        const adminPin = this.hass.states[this.config.admin_pin_entity].state;
        if (this.inputPin === adminPin) {
            this.pinState = "valid";
            try {
                this.hass.callService("input_boolean", "turn_on", {
                    entity_id: this.config.admin_mode_entity,
                });
            } catch (error) {
                console.error("Failed to turn_on the admin mode entity:", error);
            }
            setTimeout(() => {
                this.inputPin = "";
                this.maskedPin = "";
                this.pinState = "";
                window.browser_mod?.service("close_popup", {});
            }, 5000);
        } else {
            this.pinState = "invalid";
            setTimeout(() => {
                this.inputPin = "";
                this.maskedPin = "";
                this.pinState = "";
            }, 5000);
        }
    }
}
