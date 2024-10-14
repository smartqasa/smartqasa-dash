import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import { createElement } from '../utilities/create-element';

export function loadAudioCards(
    player_id: string,
    hass: HomeAssistant
): LovelaceCard[] {
    const createAudioCard = (cardConfig: LovelaceCardConfig): LovelaceCard => {
        const card = createElement(cardConfig, hass) as LovelaceCard;
        card.className = 'ha-card';
        return card;
    };

    const cards: LovelaceCard[] = [];

    cards[0] = createAudioCard({
        type: 'custom:sonos-card',
        sections: '["volumes", "groups", "grouping"]',
        title: 'Speakers',
        entity_id: player_id,
        widthPercentage: '33',
        heightPercentage: '70',
        showVolumeUpAndDownButtons: true,
    });

    cards[1] = createAudioCard({
        type: 'custom:sonos-card',
        sections: ['player, volumes', 'groups', 'grouping'],
        title: 'Player',
        entityId: player_id,
        widthPercentage: '60',
        heightPercentage: '70',
        labelForTheAllVolumesSlider: 'All',
        showVolumeUpAndDownButtons: false,
    });

    cards[2] = createAudioCard({
        type: 'custom:sonos-card',
        sections: ['media browser'],
        title: 'Favorites',
        entityId: player_id,
        mediaBrowserTitle: '',
        widthPercentage: '33',
        heightPercentage: '70',
        mediaBrowserItemsPerRow: 3,
        hideBrowseMediaButton: true,
    });

    return cards || [];
}
