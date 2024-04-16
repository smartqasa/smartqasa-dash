import { CSSResultGroup, LitElement, html, css, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

interface Config {
    // Configuration interface, define any expected properties
}

@customElement("smartqasa-time-date")
export class SmartQasaTimeDate extends LitElement {
    @state() private _time: string = "Loading...";
    @state() private _date: string = "Loading...";

    private _intervalId?: number;

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

    setConfig(config: Config): void {
        // Placeholder for configuration
    }

    connectedCallback(): void {
        super.connectedCallback();
        this._startInterval();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this._clearInterval();
    }

    private _startInterval(): void {
        this._updateTime();
        this._intervalId = window.setInterval(() => {
            if (document.visibilityState === "visible") {
                this._updateTime();
            }
        }, 1000);
    }

    private _clearInterval(): void {
        if (this._intervalId) {
            window.clearInterval(this._intervalId);
            this._intervalId = undefined;
        }
    }

    private _updateTime(): void {
        const now = new Date();
        this._time = now.toLocaleTimeString();
        this._date = now.toLocaleDateString();
    }

    render(): TemplateResult {
        return html`
            <div class="container" @click="${this._handleTap}">
                <div class="time">${this._time}</div>
                <div class="date">${this._date}</div>
            </div>
        `;
    }

    private _handleTap(): void {
        // Placeholder for tap action
    }

    getCardSize(): number {
        return 1;
    }
}

window.customCards = window.customCards || [];
window.customCards.push({
    type: "smartqasa-time-date",
    name: "SmartQasa Time Date",
    preview: true,
    description: "A SmartQasa card for rendering the time and date based on the local browser's time.",
});
