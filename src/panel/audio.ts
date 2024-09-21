import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { createElement } from "../utils/create-element";

export function loadAudioCard(player_id: string, hass: HomeAssistant): LovelaceCard {
    const createCard = (cardConfig: LovelaceCardConfig): LovelaceCard => {
        const card = createElement(cardConfig, hass) as LovelaceCard;
        card.className = "ha-card";
        return card;
    };

    return createCard({
        type: "custom:sonos-card",
        title: "Player",
        entityId: player_id,
        widthPercentage: "100",
        heightPercentage: "70",
        labelForTheAllVolumesSlider: "All",
        showVolumeUpAndDownButtons: false,
        mediaBrowserItemsPerRow: 3,
        hideBrowseMediaButton: true,
    });
}
