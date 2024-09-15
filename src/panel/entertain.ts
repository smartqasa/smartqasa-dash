import { html, nothing, TemplateResult } from "lit";
import { HomeAssistant, LovelaceCard } from "../types";
import { loadAudioCards } from "./audio";

export function loadEntertainCards(hass: HomeAssistant, audioPlayer: string): LovelaceCard[] {
    const cards: LovelaceCard[] = loadAudioCards(hass, audioPlayer);
    return cards;
}

export function renderEntertain(cards: LovelaceCard[]): TemplateResult {
    function _createCardElement(card: LovelaceCard): TemplateResult {
        const element = card as unknown as HTMLElement;
        return html`${element}`;
    }

    return html`
        <div class="entertain-container">
            <div class="entertain-card">${cards[0] ? _createCardElement(cards[0]) : nothing}</div>
            <div class="entertain-card">${cards[1] ? _createCardElement(cards[1]) : nothing}</div>
            <div class="entertain-card">${cards[2] ? _createCardElement(cards[2]) : nothing}</div>
        </div>
    `;
}
