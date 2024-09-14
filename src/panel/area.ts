import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { createElement } from "../utils/create-element";
import { html, nothing, TemplateResult } from "lit";
import { renderFooter } from "./footer";
import defaultImage from "../assets/images/default.png";

export async function loadAreaPicture(configFileName: string, area: string): Promise<string> {
    if (configFileName) {
        const path = `/local/smartqasa/pictures/${configFileName}`;
        try {
            const response = await fetch(path, { method: "HEAD" });
            if (response.ok) return path;
        } catch (error) {
            console.error("Picture from config not found, using defaultImage", error);
            return defaultImage;
        }
    }

    const areaFileName = `/local/smartqasa/pictures/${area}.png`;
    try {
        const response = await fetch(areaFileName, { method: "HEAD" });
        if (response.ok) return areaFileName;
    } catch (error) {
        return defaultImage;
    }

    return defaultImage;
}

export function loadAreaChips(chipsConfig: LovelaceCardConfig[], hass: HomeAssistant): LovelaceCard[] {
    return chipsConfig.map((config) => {
        const chip = createElement(config) as LovelaceCard;
        chip.hass = hass;
        return chip;
    });
}

export function renderArea(
    name: string,
    picture: string,
    chips: LovelaceCard[],
    isPhone: boolean,
    isLandscape: boolean
): TemplateResult {
    return html`
        <div class="area-container">
            <div class="area-name ${isPhone ? "overlay" : ""}">${name}</div>
            <img class="area-picture" src=${picture} alt="Area picture..." />
            ${chips.length > 0
                ? html` <div class="area-chips">${chips.map((chip) => html`<div class="chip">${chip}</div>`)}</div> `
                : nothing}
            ${isPhone && isLandscape ? html`<div class="footer-container">${renderFooter()}</div>` : nothing}
        </div>
    `;
}
