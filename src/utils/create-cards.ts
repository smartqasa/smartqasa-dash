import { nothing } from "lit";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElement } from "./create-element";

export const createCards = (
    cardsConfig: LovelaceCardConfig[],
    hass: HomeAssistant
): LovelaceCard[] | typeof nothing => {
    if (!cardsConfig || cardsConfig.length > 0) return nothing;

    return cardsConfig.map((cardConfig) => {
        const card = createElement(cardConfig) as LovelaceCard;
        if (hass) card.hass = hass;
        return card;
    });
};
