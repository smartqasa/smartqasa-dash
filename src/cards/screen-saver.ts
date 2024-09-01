import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { formattedDate, formattedTime } from "../utils/format-date-time";

window.customCards.push({
    type: "smartqasa-screen-saver",
    name: "SmartQasa Screen Saver Card",
    preview: true,
    description: "A SmartQasa card for displaying a screen saver.",
});

@customElement("smartqasa-screen-saver")
export class ScreenSaver extends LitElement {
    @state() private _time: string = "Loading...";
    @state() private _date: string = "Loading...";

    private _intervalId: number | undefined;

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

    protected firstUpdated(): void {
        this._updateElement();
        this._startClock();
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
        this._intervalId = window.setInterval(() => {
            this._updateElement();
        }, 1000); // Check every second
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
        if (this._intervalId !== undefined) {
            window.clearInterval(this._intervalId);
        }
        super.disconnectedCallback();
    }
}
