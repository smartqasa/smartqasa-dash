import { html, nothing, TemplateResult } from "lit";
import { HomeAssistant } from "../types";
import { createElement } from "../utils/create-element";

export function renderEntertain(entity: string, hass: HomeAssistant): TemplateResult {
    const audioCard = createElement(
        {
            type: "custom:smartqasa-sonos-card",
            entity: entity,
        },
        hass
    );

    console.log("Audio Card:", audioCard);
    return html`<div class="entertain-container">${audioCard ? html`${audioCard}` : nothing}</div>`;
}
