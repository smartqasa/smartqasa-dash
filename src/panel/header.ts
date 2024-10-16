import { LovelaceCard } from '../types';
import { html, TemplateResult } from 'lit';
import { formattedTime, formattedDate } from '../utilities/format-date-time';
import { launchApp } from '../utilities/launch-app';

function launchClock(e: Event): void {
    e.stopPropagation();
    launchApp('clock');
}

export function renderHeader(headerChips: LovelaceCard[]): TemplateResult {
    return html`
        <div class="header-container">
            <div class="header-time-date" @click="${launchClock}">
                <div class="time">${formattedTime()}</div>
                <div class="date">${formattedDate()}</div>
            </div>
            <div class="header-chips">
                ${headerChips.map(
                    (chip) => html`<div class="chip">${chip}</div>`
                )}
            </div>
        </div>
    `;
}
