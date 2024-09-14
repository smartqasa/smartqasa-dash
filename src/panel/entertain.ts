import { HomeAssistant, LovelaceCard } from "../types";
import { html, TemplateResult } from "lit";
import { loadAudioCards } from "./audio";

export function loadEntertainCards(hass: HomeAssistant, audioPlayer: string): LovelaceCard[] {
    const cards: LovelaceCard[] = loadAudioCards(hass, audioPlayer);
    return cards;
}

export function renderEntertain(cards: LovelaceCard[]): TemplateResult {
    return html`
        <div class="entertain-container">
            <div class="entertain-card">${cards[0]}</div>
            <div class="entertain-card">${cards[1]}</div>
            <div class="entertain-card">${cards[2]}</div>
        </div>
    `;
}
