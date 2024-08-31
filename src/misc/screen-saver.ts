import { css, CSSResultGroup, html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("smartqasa-screen-saver")
export class ScreenSaver extends LitElement {
    @state() private _visible: boolean = true;
    @state() private _time: string = "Loading...";
    @state() private _date: string = "Loading...";

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
            .container {
                position: absolute;
                animation: fade-in-out 5s ease-in-out infinite;
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
        this._updateElement();
        this._moveElement();
        setInterval(() => this._updateElement(), 60000); // Update time and date every minute
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._visible) {
            return nothing;
        }
        return html`
            <div class="container">
                <div class="time">${this._time}</div>
                <div class="date">${this._date}</div>
            </div>
        `;
    }

    private _updateElement(): void {
        const now = new Date();

        const hours = now.getHours();
        const minutes = now.getMinutes();
        this._time = `${hours % 12 || 12}:${minutes < 10 ? "0" + minutes : minutes}`;

        const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: "numeric" };
        this._date = now.toLocaleDateString(undefined, options);
    }

    private _moveElement(): void {
        const move = () => {
            const container = this.shadowRoot?.querySelector(".container") as HTMLElement;
            if (container) {
                const maxWidth = Math.max(0, window.innerWidth - container.clientWidth);
                const maxHeight = Math.max(0, window.innerHeight - container.clientHeight);
                const randomX = Math.floor(Math.random() * maxWidth);
                const randomY = Math.floor(Math.random() * maxHeight);
                container.style.left = `${randomX}px`;
                container.style.top = `${randomY}px`;
            }

            setTimeout(move, 15000);
        };

        move();
    }
}
