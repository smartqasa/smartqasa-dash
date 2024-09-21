import { html, nothing, TemplateResult } from "lit";
import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { createElement } from "../utils/create-element";

export const loadEntertainCards = (
    audioPlayer: string,
    videoPlayer: string,
    videoSound: string,
    hass: HomeAssistant
): LovelaceCard[] => {
    const createCard = (cardConfig: LovelaceCardConfig): LovelaceCard => {
        const card = createElement(cardConfig, hass) as LovelaceCard;
        card.className = "ha-card";
        return card;
    };

    const audioCard = createCard({
        type: "custom:sonos-card",
        title: "Player",
        entityId: audioPlayer,
        widthPercentage: "100",
        heightPercentage: "70",
        labelForTheAllVolumesSlider: "All",
        showVolumeUpAndDownButtons: false,
        mediaBrowserItemsPerRow: 5,
        hideBrowseMediaButton: true,
    });

    const videoCard = createCard({
        type: "custom:smartqasa-tv-remote-card",
        entity: videoPlayer,
        soundEntity: videoSound,
    });

    return [audioCard || nothing, videoCard || nothing];
};

export function renderEntertain(type: number): TemplateResult {
    return html`<div class="entertain-container"></div>`;
}
