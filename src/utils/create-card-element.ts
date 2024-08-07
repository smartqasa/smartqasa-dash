import { LovelaceCard, LovelaceCardConfig } from "../types";

export const createCardElement = (config: LovelaceCardConfig): LovelaceCard | undefined => {
    try {
        const tag = computeCardComponentName(config.type);
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
                // Do nothing
            }
        });
        return element;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

export function computeCardComponentName(type: string): string {
    return `hui-${type}-card`;
}
