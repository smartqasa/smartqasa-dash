import { css, CSSResultGroup, html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("smartqasa-screen-saver")
export class ScreenSaver extends LitElement {
    @state() private _visible: boolean = true;
    @state() private _time: string = "Loading...";
    @state() private _date: string = "Loading...";

    private _resetTimerBound = this._resetTimer.bind(this);

    static get styles(): CSSResultGroup {
        return css`
            :host {
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: black;
                z-index: 9999;
                pointer-events: none;
            }
            .time-date-container {
                position: absolute;
                animation: fade-in-out 5s ease-in-out infinite;
            }
            .time {
                font-size: 3.2rem;
                font-weight: 400;
                color: rgb(255, 255, 255);
                text-align: left;
                line-height: normal;
                white-space: nowrap;
            }
            .date {
                font-size: 1.5rem;
                font-weight: 300;
                color: rgb(255, 255, 255);
                text-align: left;
                line-height: normal;
                white-space: nowrap;
            }
            @keyframes fade-in-out {
                0% {
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                }
            }
        `;
    }

    protected firstUpdated(): void {
        this._updateTimeAndDate(); // Update time and date immediately
        this._moveTimeDate();
        window.addEventListener("mousemove", this._resetTimerBound);
        window.addEventListener("keypress", this._resetTimerBound);
        this._startTimer();
        setInterval(() => this._updateTimeAndDate(), 60000); // Update time and date every minute
    }

    public disconnectedCallback(): void {
        window.removeEventListener("mousemove", this._resetTimerBound);
        window.removeEventListener("keypress", this._resetTimerBound);
        super.disconnectedCallback();
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._visible) {
            console.log("Screen saver not visible");
            return nothing;
        }
        console.log("Render called with time and date", this._time, this._date);
        return html`
            <div class="time-date-container">
                <div class="time">${this._time}</div>
                <div class="date">${this._date}</div>
            </div>
        `;
    }

    private _updateTimeAndDate(): void {
        const now = new Date();

        // Time format: h:mm (no leading zero for hours)
        const hours = now.getHours();
        const minutes = now.getMinutes();
        this._time = `${hours % 12 || 12}:${minutes < 10 ? "0" + minutes : minutes}`;

        // Date format: day-of-week, month (3 letters), day
        const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: "numeric" };
        this._date = now.toLocaleDateString(undefined, options);
    }

    private _startTimer(): void {
        this._visible = true;
        this._hideScreenSaverAfterTimeout();
    }

    private _resetTimer(): void {
        this._visible = true;
        this.requestUpdate();
        clearTimeout(this._hideScreenSaverAfterTimeout as unknown as number);
        this._hideScreenSaverAfterTimeout();
    }

    private _hideScreenSaverAfterTimeout(): void {
        setTimeout(() => {
            this._visible = false;
            this.requestUpdate();
        }, 30000);
    }

    private _moveTimeDate(): void {
        const container = this.shadowRoot?.querySelector(".time-date-container") as HTMLElement;
        if (container) {
            const maxWidth = window.innerWidth - container.clientWidth;
            const maxHeight = window.innerHeight - container.clientHeight;
            const randomX = Math.floor(Math.random() * maxWidth);
            const randomY = Math.floor(Math.random() * maxHeight);
            container.style.left = `${randomX}px`;
            container.style.top = `${randomY}px`;
        }

        setTimeout(() => {
            this._moveTimeDate();
        }, 5000);
    }
}
