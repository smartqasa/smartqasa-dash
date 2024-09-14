import { HomeAssistant, LovelaceCard } from "../types";
import { styleMap } from "lit/directives/style-map.js";
import { html, TemplateResult } from "lit";
import { loadAudioCards } from "./audio";

export function loadEntertainCards(hass: HomeAssistant, audioPlayer: string): LovelaceCard[] {
    const cards: LovelaceCard[] = loadAudioCards(hass, audioPlayer);
    return cards;
}

export function renderEntertain(cards: LovelaceCard[]): TemplateResult {
    const cardStyle = {
        "border-radius": "var(--sq-card-border-radius, 0.8rem)",
    };

    return html`
        <div class="entertain-container">
            <div class="entertain-card" style=${styleMap(cardStyle)}>${cards[0]}</div>
            <div class="entertain-card" style=${styleMap(cardStyle)}>${cards[1]}</div>
            <div class="entertain-card" style=${styleMap(cardStyle)}>${cards[2]}</div>
        </div>
    `;
}
