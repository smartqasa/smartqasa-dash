import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig } from "../types";

interface Config extends LovelaceCardConfig {
    domain: string;
    service: string;
    entity?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-service-chip",
    name: "SmartQasa Service Chip",
    preview: true,
    description: "A SmartQasa chip for making a service call.",
});

@customElement("smartqasa-service-chip")
export class ServiceChip extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    @state() private showConfirmDialog: boolean = false;

    static styles = css`
        .chip {
            padding: 10px 15px;
            background-color: #007bff;
            color: white;
            border-radius: 15px;
            display: inline-block;
            cursor: pointer;
            user-select: none; /* Prevent text selection */
            margin: 5px;
        }
        .overlay-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Dimmed background */
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100; /* Ensure it is on top */
        }
        .confirm-dialog {
            padding: 20px;
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 101; /* Higher than the overlay background */
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .confirm-dialog button {
            margin-top: 15px;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            outline: none;
        }
        .confirm-dialog button:nth-child(2) {
            background-color: #cccccc;
            margin-left: 10px;
        }
    `;

    public setConfig(config: Config): void {
        this.config = { ...config };
    }

    protected render() {
        return html`
            <div class="chip" @click="${() => (this.showConfirmDialog = true)}">Activate Service</div>
            ${this.showConfirmDialog ? this.renderConfirmDialog() : ""}
        `;
    }

    private renderConfirmDialog() {
        return html`
            <div class="overlay-background">
                <div class="confirm-dialog">
                    <p>Are you sure you want to proceed?</p>
                    <div>
                        <button @click="${this.handleServiceCall}">Confirm</button>
                        <button @click="${() => (this.showConfirmDialog = false)}">Cancel</button>
                    </div>
                </div>
            </div>
        `;
    }

    private handleServiceCall() {
        if (!this.hass) return;
        this.showConfirmDialog = false;
        // Example of calling a Home Assistant service
        this.hass
            .callService("domain", "service", {
                entity_id: "entity_id_here",
            })
            .then(() => {
                console.log("Service call successful");
            })
            .catch((error) => {
                console.error("Service call failed", error);
            });
    }
}
