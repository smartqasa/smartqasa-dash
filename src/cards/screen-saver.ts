import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LovelaceCardConfig } from "../types";
import { formattedDate, formattedTime } from "../utils/format-date-time";
import logoImage from "../assets/images/logo.png";

interface Config extends LovelaceCardConfig {
    display: "time" | "logo";
    move_timer?: number;
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
                display: flex;
                position: absolute;
                padding: 2rem;
                background-color: transparent;
                opacity: 0;
                animation: fade-in 1.5s forwards;
            }
            .time,
            .date {
                text-align: center;
                line-height: normal;
                white-space: nowrap;
                transition: all 0.5s ease-in-out;
            }
            .time {
                font-size: 7rem;
                font-weight: 300;
                color: rgb(140, 140, 140);
            }
            .date {
                font-size: 2.5rem;
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
                    ${this._config?.display === "time"
                        ? html`
                              <div class="time">${this._time}</div>
                              <div class="date">${this._date}</div>
                          `
                        : html` <img src=${logoImage} alt="Logo" /> `}
                </div>
            </div>
        `;
    }

    private _startClock(): void {
        if (this._config?.display === "time") {
            this._timeIntervalId = window.setInterval(() => {
                this._updateElement();
            }, 1000);
        }
    }

    private _cycleElement(): void {
        const element = this.shadowRoot?.querySelector(".element") as HTMLElement;
        const moveTimer = (this._config?.move_timer ?? 30) * 1000;

        if (element) {
            element.style.animation = "fade-in 1.5s forwards";

            setTimeout(() => {
                element.style.animation = "";
                setTimeout(() => {
                    element.style.animation = "fade-out 1.5s forwards";
                    setTimeout(() => {
                        this._moveElement();
                        element.style.animation = "fade-in 1.5s forwards";
                        this._cycleElement();
                    }, 1500);
                }, moveTimer);
            }, 1500);
        }
    }

    private _updateElement(): void {
        const now = new Date();
        if (this._config?.display === "time") {
            this._time = formattedTime(now);
            this._date = formattedDate(now);
        }
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
