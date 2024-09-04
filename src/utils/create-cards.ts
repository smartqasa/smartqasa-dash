import { nothing } from "lit";
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElement } from "./create-element";

export const createCards = (config: LovelaceCardConfig[], hass: HomeAssistant): LovelaceCard[] | typeof nothing => {
    if (!config || !config.length || !hass) return nothing;

    return config.map((cardConfig) => {
        const card = createElement(cardConfig) as LovelaceCard;
        card.hass = hass;
        return card;
    });
};
