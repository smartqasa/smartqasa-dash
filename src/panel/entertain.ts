import { html, TemplateResult } from "lit";
import { HomeAssistant, LovelaceCard } from "../types";
import { loadAudioCards } from "./audio";

export function loadEntertainCards(hass: HomeAssistant, audioPlayer: string): LovelaceCard[] {
    const cards: LovelaceCard[] = loadAudioCards(hass, audioPlayer);
    return cards;
}

export function renderEntertain(cards: LovelaceCard[]): TemplateResult {
    return html`
        <div class="entertain-container">
            <hui-card class="entertain-card">${cards[0]}</hui-card>
            <hui-card class="entertain-card">${cards[1]}</hui-card>
            <hui-card class="entertain-card">${cards[2]}</hui-card>
        </div>
    `;
}
