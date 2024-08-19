import { LovelaceCard, LovelaceCardConfig } from "../types";

export const createElement = (config: LovelaceCardConfig): LovelaceCard | undefined => {
    console.log("Config", config);
    if (!config.type) return;

    const tag = config.type.startsWith("custom:") ? config.type.replace("custom:", "") : config.type;
    if (!customElements.get(tag)) return;

    const element = window.document.createElement(tag) as any;
    if (!element.setConfig) return;
    element.setConfig(config);

    console.log("Element", element);

    return element;
};
