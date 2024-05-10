import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { thermostatIcons } from "../const";

interface Config extends LovelaceCardConfig {
    title?: string;
    pin_entity: string;
    outcome_entity: string;
}

window.customCards.push({
    type: "smartqasa-pin-verify-dialog",
    name: "SmartQasa PIN Verify Dialog",
    preview: true,
    description: "A SmartQasa dialog for accepting and verifying a PIN.",
});

@customElement("smartqasa-pin-verify-dialog")
export class PinVerifyDialog extends LitElement {
    getCardSize(): number {
        return 6;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    @state() private inputPin: string = "";
    @state() private maskedPin: string = "";
    @state() private pinState: string = "";
    private pinEntity?: string;
    private outcomeEntity?: string;

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
            height: var(--sq-primary-font-size, 1.5rem);
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
            width: 4rem;
            height: 4rem;
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
        this.validateEntities();
    }

    private validateEntities() {
        if (!this.config) return;
        const pinDomain = this.config.pin_entity.split(".")[0];
        const outcomeDomain = this.config.outcome_entity.split(".")[0];
        if (pinDomain !== "input_text") {
            throw new Error(
                `Invalid entity domain: PIN entity should be of domain "input_text", got "${pinDomain}" instead.`
            );
        }
        if (outcomeDomain !== "input_boolean") {
            throw new Error(
                `Invalid entity domain: Outcome entity should be of domain "input_boolean", got "${outcomeDomain}" instead.`
            );
        }
    }

    protected render() {
        if (!this.config) return html``;

        const title = this.config.title || "Enter PIN";

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
                    <span class="header-text">${title}</span>
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
        if (!this.hass || !this.pinEntity || !this.outcomeEntity) return;

        const adminPin = this.hass.states[this.pinEntity].state;
        if (this.inputPin === adminPin) {
            this.pinState = "valid";
            try {
                this.hass.callService("input_boolean", "turn_on", {
                    entity_id: this.outcomeEntity,
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
            }, 2000);
        }
    }
}
