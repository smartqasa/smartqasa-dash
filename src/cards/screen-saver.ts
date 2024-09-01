import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LovelaceCardConfig } from "../types";
import { formattedDate, formattedTime } from "../utils/format-date-time";

interface Config extends LovelaceCardConfig {
    move_timer?: number; // move_timer in seconds
}

window.customCards.push({
    type: "smartqasa-screen-saver",
    name: "SmartQasa Screen Saver Card",
    preview: true,
    description: "A SmartQasa card for displaying a screen saver.",
});

@customElement("smartqasa-screen-saver")
export class ScreenSaver extends LitElement {
    @state() private _config?: Config;
    @state() private _time: string = "Loading...";
    @state() private _date: string = "Loading...";

    private _moveTimerId: number | undefined;
    private _timeIntervalId: number | undefined;

    static get styles(): CSSResultGroup {
        return css`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                background-color: black;
                box-sizing: border-box;
            }
            .container {
                width: 100%;
                height: 100%;
                position: relative;
            }
            .element {
                position: absolute;
                padding: 2rem;
                background-color: transparent;
                opacity: 0; /* Start as invisible */
                animation: fade-in 1.5s forwards;
            }
            .time,
            .date {
                text-align: center;
                line-height: normal;
                white-space: nowrap;
            }
            .time {
                font-size: 6rem;
                font-weight: 300;
                color: rgb(140, 140, 140);
            }
            .date {
                font-size: 2rem;
                font-weight: 200;
                color: rgb(140, 140, 140);
            }
            @keyframes fade-in {
                0% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }
            @keyframes fade-out {
                0% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                }
            }
        `;
    }

    public setConfig(config: Config) {
        this._config = { ...config };
    }

    protected firstUpdated(): void {
        this._updateElement();
        this._startClock();
        this._cycleElement();
    }

    protected render(): TemplateResult {
        return html`
            <div class="container">
                <div class="element">
                    <div class="time">${this._time}</div>
                    <div class="date">${this._date}</div>
                </div>
            </div>
        `;
    }

    private _startClock(): void {
        this._timeIntervalId = window.setInterval(() => {
            this._updateElement();
        }, 1000); // Update time every second
    }

    private _cycleElement(): void {
        const element = this.shadowRoot?.querySelector(".element") as HTMLElement;
        const moveTimer = (this._config?.move_timer ?? 30) * 1000;

        if (element) {
            element.style.animation = "fade-in 1.5s forwards";

            setTimeout(() => {
                element.style.animation = ""; // Clear fade-in animation
                setTimeout(() => {
                    element.style.animation = "fade-out 1.5s forwards";
                    setTimeout(() => {
                        this._moveElement();
                        element.style.animation = "fade-in 1.5s forwards";
                        this._cycleElement(); // Repeat the cycle
                    }, 1500); // Wait for fade-out to complete
                }, moveTimer); // Wait for move_timer duration
            }, 1500); // Wait for initial fade-in to complete
        }
    }

    private _updateElement(): void {
        const now = new Date();
        this._time = formattedTime(now);
        this._date = formattedDate(now);
    }

    private _moveElement(): void {
        const container = this.shadowRoot?.querySelector(".container") as HTMLElement;
        const element = this.shadowRoot?.querySelector(".element") as HTMLElement;

        if (container && element) {
            const maxWidth = container.clientWidth - element.clientWidth;
            const maxHeight = container.clientHeight - element.clientHeight;

            const randomX = Math.max(0, Math.floor(Math.random() * maxWidth));
            const randomY = Math.max(0, Math.floor(Math.random() * maxHeight));

            element.style.left = `${randomX}px`;
            element.style.top = `${randomY}px`;
        }
    }

    disconnectedCallback(): void {
        if (this._timeIntervalId !== undefined) {
            window.clearInterval(this._timeIntervalId);
        }
        if (this._moveTimerId !== undefined) {
            window.clearTimeout(this._moveTimerId);
        }
        super.disconnectedCallback();
    }
}
