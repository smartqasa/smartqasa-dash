import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HomeAssistant, LovelaceCardConfig } from "../types";

interface Config extends LovelaceCardConfig {
    title?: string;
    pin_entity: string;
    outcome_entity: string;
}

window.customCards.push({
    type: "smartqasa-pin-verify-card",
    name: "SmartQasa PIN Verify card",
    preview: true,
    description: "A SmartQasa card for accepting and verifying a PIN.",
});

@customElement("smartqasa-pin-verify-card")
export class PinVerifyCard extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: Config;
    @state() private _inputPin: string = "";
    @state() private _maskedPin: string = "";
    @state() private _pinState: string = "";
    private _pinEntity?: string;
    private _outcomeEntity?: string;

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
            -webkit-tap-highlight-color: transparent;
            cursor: pointer;
        }
        .button:focus,
        .button:active {
            background-color: var(--sq-ripple-color);
            border-radius: 1.5rem;
            outline: none;
        }
    `;

    public setConfig(config: Config): void {
        this._config = { ...config };
        this.validateEntities();
    }

    private validateEntities() {
        if (!this._config) return;
        const pinDomain = this._config.pin_entity.split(".")[0];
        const outcomeDomain = this._config.outcome_entity.split(".")[0];
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
        this._pinEntity = this._config.pin_entity;
        this._outcomeEntity = this._config.outcome_entity;
    }

    protected render() {
        if (!this._config) return html``;

        const title = this._config.title || "Enter PIN";

        let maskedPin, pinStyles;
        if (!this._pinState) {
            maskedPin = this._maskedPin;
            pinStyles = {
                color: "rgb(var(--sq-primary-font-rgb))",
            };
        } else if (this._pinState === "valid") {
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
        if (this._pinState) return;

        if (digit === "✓") {
            this.verifyPin();
        } else if (digit === "☓") {
            this._inputPin = "";
            this._maskedPin = "";
        } else {
            this._inputPin += digit;
            this._maskedPin += "*";
        }
    }

    private verifyPin() {
        if (!this.hass || !this._pinEntity || !this._outcomeEntity) return;

        const adminPin = this.hass.states[this._pinEntity].state;
        if (this._inputPin === adminPin) {
            this._pinState = "valid";
            try {
                this.hass.callService("input_boolean", "turn_on", {
                    entity_id: this._outcomeEntity,
                });
            } catch (error) {
                console.error("Failed to turn_on the admin mode entity:", error);
            }
            setTimeout(() => {
                this._inputPin = "";
                this._maskedPin = "";
                this._pinState = "";
                window.browser_mod?.service("close_popup", {});
            }, 5000);
        } else {
            this._pinState = "invalid";
            setTimeout(() => {
                this._inputPin = "";
                this._maskedPin = "";
                this._pinState = "";
            }, 2000);
        }
    }
}