import { html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { LovelaceCard } from "../types";
import { createElement } from "../utils/create-element";

// Function to load and process body tiles
export async function loadBodyTiles(panelCard: any, tilesConfig: any): Promise<LovelaceCard[][]> {
    const pages: LovelaceCard[][] = [];
    panelCard._bodyColumns = [];
    let currentPage: LovelaceCard[] = [];
    let firstTile = true;

    for (const config of tilesConfig) {
        if (firstTile) {
            const columns = config.type === "page" && config.columns >= 2 && config.columns <= 4 ? config.columns : 3;
            panelCard._bodyColumns.push(columns);
        }

        if (config.type === "page") {
            if (!firstTile && currentPage.length) {
                pages.push(currentPage);
                currentPage = [];

                const columns =
                    config.type === "page" && config.columns >= 2 && config.columns <= 4 ? config.columns : 3;
                panelCard._bodyColumns.push(columns);
            }
        } else if (config.type === "blank") {
            if (panelCard._deviceType === "tablet") {
                const blankTile = document.createElement("div");
                blankTile.classList.add("blank-tile");
                currentPage.push(blankTile as unknown as LovelaceCard);
            }
        } else {
            const tile = createElement(config) as LovelaceCard;
            if (tile) {
                tile.hass = panelCard.hass;
                currentPage.push(tile);
            } else {
                console.error("Failed to create tile for config:", config);
            }
        }

        firstTile = false;
    }

    if (currentPage.length) {
        pages.push(currentPage);
    }

    return pages;
}

// Function to render body for phone
function renderPhoneBody(panelCard: any) {
    const gridStyle = { gridTemplateColumns: "1fr 1fr" };
    return html`
        <div class="body-tiles" style=${styleMap(gridStyle)}>
            ${panelCard._bodyTiles.flat().map((tile: LovelaceCard) => html`<div class="tile">${tile}</div>`)}
        </div>
    `;
}

// Function to render body for tablet with Swiper
function renderSwiperBody(panelCard: any) {
    return html`
        <div class="swiper">
            <div class="swiper-wrapper">
                ${panelCard._bodyTiles.map((page: LovelaceCard[], index: number) => {
                    const gridStyle = {
                        gridTemplateColumns: `repeat(${panelCard._bodyColumns[index]}, var(--sq-tile-width, 19.5rem))`,
                    };

                    return html`
                        <div class="swiper-slide">
                            <div class="body-tiles" style=${styleMap(gridStyle)}>
                                ${page.map((tile: LovelaceCard) => html`<div class="tile">${tile}</div>`)}
                            </div>
                        </div>
                    `;
                })}
            </div>
            ${panelCard._bodyTiles.length > 1
                ? html`
                      <div
                          class="swiper-button-prev"
                          @click=${(e: Event) => panelCard._handleSwiperNavigation(e, "prev")}
                      ></div>
                      <div
                          class="swiper-button-next"
                          @click=${(e: Event) => panelCard._handleSwiperNavigation(e, "next")}
                      ></div>
                  `
                : nothing}
        </div>
    `;
}

// Main function to render the body based on device type
export function renderBody(panelCard: any) {
    if (!panelCard._config || !panelCard._bodyTiles.length) return nothing;

    return panelCard._deviceType === "phone" ? renderPhoneBody(panelCard) : renderSwiperBody(panelCard);
}
