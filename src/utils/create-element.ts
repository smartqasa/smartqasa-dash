import { LovelaceCard, LovelaceCardConfig } from "../types";

export const createElement = (config: LovelaceCardConfig): LovelaceCard | undefined => {
    if (!config.type) {
        console.error("Error: No type configured for element:", config);
        return undefined;
    }

    const tag = config.type.startsWith("custom:") ? config.type.replace("custom:", "") : config.type;
    if (!customElements.get(tag)) {
        console.error("Error: Custom element doesn't exist:", tag);
        return undefined;
    }
    const element = window.document.createElement(tag) as LovelaceCard;
    try {
        element.setConfig(config);
        return element;
    } catch (err) {
        console.error("Error setting config for element:", err);
        return undefined;
    }
};