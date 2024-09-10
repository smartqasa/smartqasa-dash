import { html } from "lit";
import { LovelaceCard } from "../types";
import { formattedTime, formattedDate } from "../utils/format-date-time";

export function renderHeader(panelCard: any) {
    return html`
        <div class="header-container">
            <div class="header-time-date" @click="${panelCard._launchClock}">
                <div class="time">${formattedTime()}</div>
                <div class="date">${formattedDate()}</div>
            </div>
            <div class="header-chips">
                ${panelCard._headerChips.map((chip: LovelaceCard) => html`<div class="chip">${chip}</div>`)}
            </div>
        </div>
    `;
}
