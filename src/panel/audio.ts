import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { createElement } from "../utils/create-element";

export function loadAudioCards(hass: HomeAssistant, player: string): LovelaceCard[] {
    const cards: LovelaceCard[] = [];

    const createCards = (index: number, config: LovelaceCardConfig) => {
        const card = createElement(config) as LovelaceCard;
        card.hass = hass;
        cards[index] = card;
    };

    createCards(0, {
        type: "custom:sonos-card",
        entityId: player,
        heightPercentage: "auto",
        showVolumeUpAndDownButtons: true,
        sections: ["volumes", "groups", "grouping"],
    });

    createCards(1, {
        type: "custom:sonos-card",
        entityId: player,
        heightPercentage: "auto",
        showVolumeUpAndDownButtons: true,
        sections: ["player"],
    });

    createCards(2, {
        type: "custom:sonos-card",
        heightPercentage: "auto",
        mediaBrowserItemsPerRow: 3,
        mediaBrowserShowTitleForThumbnailIcons: true,
        showVolumeUpAndDownButtons: true,
        sections: ["media browser"],
    });

    return cards || [];
}