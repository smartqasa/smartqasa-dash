import { LovelaceCard } from '../types';
import { html, nothing, TemplateResult } from 'lit';
import { renderFooter } from './footer';
import defaultImage from '../assets/images/default.png';

export function renderArea(
    name: string,
    picture: string,
    chips: LovelaceCard[],
    isPhone: boolean,
    isLandscape: boolean
): TemplateResult {
    return html`
        <div class="area-container">
            <div class="area-name ${isPhone ? 'overlay' : ''}">${name}</div>
            <img
                class="area-picture"
                src="/local/smartqasa/pictures/${picture}"
                alt="Area picture..."
                @error=${(e: Event) => {
                    (e.target as HTMLImageElement).src = defaultImage;
                    e.preventDefault();
                    e.stopPropagation();
                }}
            />
            ${chips.length > 0
                ? html`<div class="area-chips">
                      ${chips.map(
                          (chip) => html`<div class="chip">${chip}</div>`
                      )}
                  </div>`
                : nothing}
            ${isPhone && isLandscape
                ? html`<div class="footer-container">${renderFooter()}</div>`
                : nothing}
        </div>
    `;
}
