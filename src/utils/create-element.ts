import { LovelaceCard, LovelaceCardConfig } from "../types";

export const createElement = (config: LovelaceCardConfig): LovelaceCard | undefined => {
    if (!config || typeof config !== "object" || !config.type) {
        console.error("Error: Invalid or missing 'type' in config:", config);
        return undefined;
    }

    const tag = config.type.startsWith("custom:") ? config.type.replace("custom:", "") : `hui-${config.type}-card`;

    if (!customElements.get(tag)) {
        console.error(`Error: Custom element '${tag}' is not registered.`);
        return undefined;
    }

    const element = document.createElement(tag) as LovelaceCard;

    if (typeof element.setConfig !== "function") {
        console.error(`Error: The element '${tag}' does not implement 'setConfig'.`, element);
        return undefined;
    }

    try {
        element.setConfig(config);
    } catch (err) {
        console.error(`Error: Failed to set config for element '${tag}'.`, err);
        return undefined;
    }

    return element;
};
