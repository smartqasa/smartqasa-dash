import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { createElement } from "../utils/create-element";
import { html, TemplateResult } from "lit";
import { formattedTime, formattedDate } from "../utils/format-date-time";
import { loadYamlAsJson } from "../utils/load-yaml-as-json";

/*
export async function loadHeaderChips(hass: HomeAssistant): Promise<LovelaceCard[]> {
    let chipsConfig: LovelaceCardConfig[] = [];
    try {
        const yamlFilePath = "/local/smartqasa/config/chips.yaml";
        chipsConfig = (await loadYamlAsJson(yamlFilePath)) as LovelaceCardConfig[];
    } catch (error) {
        console.error("Error loading header chips:", error);
        return [];
    }


    return chipsConfig.map((config) => {
        const chip = createElement(config) as LovelaceCard;
        if (hass) chip.hass = hass;
        return chip;
    });
}
*/

export function renderHeader(headerChips: LovelaceCard[]): TemplateResult {
    function launchClock(e: Event): void {
        e.stopPropagation();

        if (typeof window.fully !== "undefined" && window.fully.startApplication) {
            window.fully.startApplication("com.google.android.deskclock");
        } else {
            console.warn("fully.startApplication is not available.");
        }
    }

    return html`
        <div class="header-container">
            <div class="header-time-date" @click="${launchClock}">
                <div class="time">${formattedTime()}</div>
                <div class="date">${formattedDate()}</div>
            </div>
            <div class="header-chips">${headerChips.map((chip) => html`<div class="chip">${chip}</div>`)}</div>
        </div>
    `;
}
