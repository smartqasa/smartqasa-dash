import { CSSResultGroup, LitElement, html, css, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";

@customElement("smartqasa-time-date")
export class SmartQasaTimeDate extends LitElement {
    @state() private _time: string = "Loading...";
    @state() private _date: string = "Loading...";

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

    set hass(hass: HomeAssistant) {
        this._time = hass?.states["sensor.current_time"]?.state || "Loading...";
        this._date = hass?.states["sensor.current_date"]?.state || "Loading...";
    }

    render(): TemplateResult {
        return html`
            <div class="container" @click="${this.handleTap}">
                <div class="time">${this._time}</div>
                <div class="date">${this._date}</div>
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

    getCardSize(): number {
        return 1;
    }
}

window.customCards.push({
    type: "smartqasa-time-date",
    name: "SmartQasa Time Date",
    preview: true,
    description: "A SmartQasa card for rendering the time and date.",
});
