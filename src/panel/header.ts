import { LovelaceCard } from "../types";
import { html, TemplateResult } from "lit";
import { formattedTime, formattedDate } from "../utils/format-date-time";

export function renderHeader(headerChips: LovelaceCard[]): TemplateResult {
    function launchClock(e: Event): void {
        e.stopPropagation();

        if (typeof window.fully !== "undefined" && window.fully.startApplication) {
            window.fully.startApplication("com.google.android.deskclock");
        } else {
            console.warn("fully.startApplication is not available.");
        }
    }

    return html`
        <div class="header-container">
            <div class="header-time-date" @click="${launchClock}">
                <div class="time">${formattedTime()}</div>
                <div class="date">${formattedDate()}</div>
            </div>
            <div class="header-chips">${headerChips.map((chip) => html`<div class="chip">${chip}</div>`)}</div>
        </div>
    `;
}
