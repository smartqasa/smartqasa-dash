import {
    css,
    CSSResultGroup,
    html,
    LitElement,
    PropertyValues,
    TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "../src/types";

@customElement("smartqasa-time-date")
export class TimeDate extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _time: string = "Loading...";
    @state() private _date: string = "Loading...";

    static get styles(): CSSResultGroup {
        return css`
            :host {
                display: block;
            }
            .container {
                display: flex;
                flex-direction: column;
                cursor: pointer;
            }
            .time,
            .date {
                text-align: left;
                line-height: normal;
                white-space: nowrap;
            }
            .time {
                font-size: var(--sq-title-font-size, 3.2rem);
                font-weight: var(--sq-title-font-weight, 400);
                color: rgb(var(--sq-title-font-rgb, 128, 128, 128));
            }
            .date {
                font-size: var(--sq-primary-font-size, 1.5rem);
                font-weight: var(--sq-primary-font-weight, 300);
                color: rgb(var(--sq-secondary-font-rgb, 128, 128, 128));
            }
        `;
    }

    public setConfig(config: any): void {}

    protected updated(changedProps: PropertyValues) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.hass) {
            this._time =
                this.hass.states["sensor.current_time"]?.state || "Loading...";
            this._date =
                this.hass.states["sensor.current_date"]?.state || "Loading...";
        }
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click="${this._handleTap}">
                <div class="time">${this._time}</div>
                <div class="date">${this._date}</div>
            </div>
        `;
    }

    private _handleTap(): void {
        if (
            typeof window.fully !== "undefined" &&
            window.fully.startApplication
        ) {
            window.fully.startApplication("com.google.android.deskclock");
        } else {
            console.warn("fully.startApplication is not available.");
        }
    }
}
