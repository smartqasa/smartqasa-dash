import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "../types";

window.customCards.push({
    type: "smartqasa-time-date",
    name: "SmartQasa Time Date",
    preview: true,
    description: "A SmartQasa card for rendering the time and date.",
});

@customElement("smartqasa-time-date")
export class SmartQasaTimeDate extends LitElement {
    getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private time: string = "Loading...";
    @state() private date: string = "Loading...";

    static get styles(): CSSResultGroup {
        return css`
            :host {
                display: block;
                padding: 0;
                background-color: transparent;
            }
            .container {
                display: grid;
                grid-template-rows: auto auto;
                padding: 0;
                border-radius: 0;
                border: none;
                box-shadow: none;
                background-color: transparent;
                cursor: pointer;
            }
            .time,
            .date {
                justify-self: start;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .time {
                line-height: var(--sq-title-font-size, 16px);
                font-size: var(--sq-title-font-size, 16px);
                font-weight: var(--sq-title-font-weight, 400);
                color: rgb(var(--sq-title-font-rgb, 0, 0, 0));
            }
            .date {
                font-size: var(--sq-primary-font-size, 14px);
                font-weight: var(--sq-primary-font-weight, 300);
                color: rgb(var(--sq-secondary-font-rgb));
            }
        `;
    }

    setConfig(config: any): void {}

    updated(changedProps: PropertyValues) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.hass) {
            this.time = this.hass.states["sensor.current_time"]?.state || "Loading...";
            this.date = this.hass.states["sensor.current_date"]?.state || "Loading...";
        }
    }

    render(): TemplateResult {
        return html`
            <div class="container" @click="${this.handleTap}">
                <div class="time">${this.time}</div>
                <div class="date">${this.date}</div>
            </div>
        `;
    }

    private handleTap(): void {
        if (typeof window.fully !== "undefined" && window.fully.startApplication) {
            window.fully.startApplication("com.google.android.deskclock");
        } else {
            console.warn("fully.startApplication is not available.");
        }
    }
}
