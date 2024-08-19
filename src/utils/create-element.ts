import { LovelaceCard, LovelaceCardConfig } from "../types";

export const createCardElement = (config: LovelaceCardConfig): LovelaceCard | undefined => {
    try {
        const tag = config.type;
        if (customElements.get(tag)) {
            const element = document.createElement(tag) as LovelaceCard;
            element.setConfig(config);

            return element;
        }
        const element = document.createElement(tag) as LovelaceCard;
        customElements.whenDefined(tag).then(() => {
            try {
                customElements.upgrade(element);
                element.setConfig(config);
            } catch (err) {
                console.error("Error setting config for element:", err);
            }
        });
        return element;
    } catch (err) {
        console.error("Error creating card element:", err);
        return undefined;
    }
};
