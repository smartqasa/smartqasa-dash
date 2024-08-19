import { LovelaceCard, LovelaceCardConfig } from "../types";

export const createElement = (config: LovelaceCardConfig): LovelaceCard | undefined => {
    if (!config.type) return;

    const tag = config.type.startsWith("custom:") ? config.type.replace("custom:", "") : config.type;
    if (!customElements.get(tag)) return;

    const element = window.document.createElement(tag) as LovelaceCard;
    if (!element.setConfig) return;
    element.setConfig(config);
};
