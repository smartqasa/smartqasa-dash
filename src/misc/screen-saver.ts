import { css, CSSResultGroup, html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { SS_CYCLE_TIMER, SS_HIDE_EVENTS, SS_IDLE_TIMER } from "../const";

@customElement("smartqasa-screen-saver")
export class ScreenSaver extends LitElement {
    @state() private _time: string = "Loading...";
    @state() private _date: string = "Loading...";

    private _animationTimeout: number | undefined;

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
            }
            .overlay {
                width: 100%;
                height: 100%;
                pointer-events: all;
            }
            .container {
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
                font-size: 5rem;
                font-weight: 400;
                color: rgb(180, 180, 180);
            }
            .date {
                font-size: 2rem;
                font-weight: 200;
                color: rgb(180, 180, 180);
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
        this._cycle();
        this._addEventListeners();
    }

    private _addEventListeners(): void {
        SS_HIDE_EVENTS.forEach((event) =>
            window.addEventListener(event, this._hideScreenSaver.bind(this), { capture: true, passive: true })
        );
    }

    public disconnectedCallback(): void {
        this._removeEventListeners();
        clearTimeout(this._animationTimeout);
        super.disconnectedCallback();
    }

    private _removeEventListeners(): void {
        SS_HIDE_EVENTS.forEach((event) =>
            window.removeEventListener(event, this._hideScreenSaver.bind(this), { capture: true })
        );
    }

    protected render(): TemplateResult {
        return html`
            <div class="overlay" @touchstart="${this._hideScreenSaver}">
                <div class="container">
                    <div class="time">${this._time}</div>
                    <div class="date">${this._date}</div>
                </div>
            </div>
        `;
    }

    private _hideScreenSaver(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        clearTimeout(this._animationTimeout);

        this.parentNode?.removeChild(this);
    }

    private _updateElement(): void {
        const now = new Date();

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? "0" + minutes : minutes}`;

        const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: "numeric" };
        const formattedDate = now.toLocaleDateString(undefined, options);

        if (this._time !== formattedTime || this._date !== formattedDate) {
            this._time = formattedTime;
            this._date = formattedDate;
            //this.requestUpdate();
        }
    }

    private _cycle(): void {
        this._moveElement();

        const container = this.shadowRoot?.querySelector(".container") as HTMLElement;
        if (container) {
            container.style.animation = "fade-in 1.5s forwards";
        }

        this._animationTimeout = window.setTimeout(() => {
            if (container) {
                container.style.animation = "fade-out 1.5s forwards";
            }

            this._animationTimeout = window.setTimeout(() => {
                this._cycle();
            }, 1500);
        }, SS_CYCLE_TIMER + 1500);
    }

    private _moveElement(): void {
        const container = this.shadowRoot?.querySelector(".container") as HTMLElement;
        if (container) {
            const maxWidth = Math.max(0, window.innerWidth - container.clientWidth);
            const maxHeight = Math.max(0, window.innerHeight - container.clientHeight);
            const randomX = Math.floor(Math.random() * maxWidth);
            const randomY = Math.floor(Math.random() * maxHeight);
            container.style.left = `${randomX}px`;
            container.style.top = `${randomY}px`;

            console.log("Container position:", randomX, randomY);
            this._updateElement();
        }
    }
}

export function initializeScreenSaver(): void {
    startIdleTimer();
}

let idleTimer: number;

function startIdleTimer(): void {
    console.log("Starting idle timer");
    idleTimer = window.setTimeout(() => {
        const screenSaver = document.createElement("smartqasa-screen-saver");
        document.body.appendChild(screenSaver);
    }, SS_IDLE_TIMER);
}

export function resetIdleTimer(): void {
    console.log("Resetting idle timer");
    clearTimeout(idleTimer);
    const existingScreenSaver = document.querySelector("smartqasa-screen-saver");
    if (existingScreenSaver) {
        existingScreenSaver.remove();
    }
    startIdleTimer();
}
