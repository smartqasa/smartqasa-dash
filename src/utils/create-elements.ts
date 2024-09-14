import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElement } from "./create-element";

export const createElements = (config: LovelaceCardConfig[], hass: HomeAssistant): LovelaceCard[] => {
    if (!config || config.length === 0) return [];

    return config.map((elementConfig) => {
        const element = createElement(elementConfig) as LovelaceCard;
        if (hass) element.hass = hass;
        return element;
    });
};
