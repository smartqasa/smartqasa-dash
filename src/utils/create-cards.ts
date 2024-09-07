import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElement } from "./create-element";

export const createCards = (cardsConfig: LovelaceCardConfig[], hass: HomeAssistant): LovelaceCard[] => {
    if (!cardsConfig || cardsConfig.length === 0) return [];

    return cardsConfig.map((cardConfig) => {
        const card = createElement(cardConfig) as LovelaceCard;
        if (hass) card.hass = hass;
        return card;
    });
};
