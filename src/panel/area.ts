import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { createElement } from "../utils/create-element";
import { html, nothing, TemplateResult } from "lit";
import { renderFooter } from "./footer";
import defaultImage from "../assets/images/default.png";

export function loadAreaChips(chipsConfig: LovelaceCardConfig[], hass: HomeAssistant): LovelaceCard[] {
    return chipsConfig.map((config) => {
        const chip = createElement(config) as LovelaceCard;
        if (hass) chip.hass = hass;
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
    const picturePath = `/local/smartqasa/pictures/${picture}`;

    return html`
        <div class="area-container">
            <div class="area-name ${isPhone ? "overlay" : ""}">${name}</div>
            <img
                class="area-picture"
                src=${picturePath}
                alt="Area picture..."
                @error=${(e: Event) => ((e.target as HTMLImageElement).src = defaultImage)}
            />
            ${chips.length > 0
                ? html` <div class="area-chips">${chips.map((chip) => html`<div class="chip">${chip}</div>`)}</div> `
                : nothing}
            ${isPhone && isLandscape ? html`<div class="footer-container">${renderFooter()}</div>` : nothing}
        </div>
    `;
}
