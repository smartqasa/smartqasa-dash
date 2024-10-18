import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { createElement } from "../utilities/create-element";
import { html, nothing, TemplateResult } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import Swiper from "swiper/types/swiper-class";

export function loadControlTiles(
    tilesConfig: LovelaceCardConfig[],
    hass: HomeAssistant,
    isTablet: boolean
): { controlTiles: LovelaceCard[][]; controlColumns: number[] } {
    const controlTiles: LovelaceCard[][] = [];
    const controlColumns: number[] = [];
    let currentPage: LovelaceCard[] = [];
    let firstTile = true;

    for (const config of tilesConfig) {
        if (firstTile) {
            const columns =
                config.type === "page" &&
                config.columns >= 2 &&
                config.columns <= 4
                    ? config.columns
                    : 3;
            controlColumns.push(columns);
        }

        if (config.type === "page") {
            if (!firstTile && currentPage.length) {
                controlTiles.push(currentPage);
                currentPage = [];

                const columns =
                    config.type === "page" &&
                    config.columns >= 2 &&
                    config.columns <= 4
                        ? config.columns
                        : 3;
                controlColumns.push(columns);
            }
        } else if (config.type === "blank") {
            if (isTablet) {
                const blankTile = document.createElement("div");
                blankTile.classList.add("blank-tile");
                currentPage.push(blankTile as unknown as LovelaceCard);
            }
        } else {
            const tile = createElement(config, hass) as LovelaceCard;
            if (tile) {
                currentPage.push(tile);
            } else {
                console.error("Failed to create tile for config:", config);
            }
        }

        firstTile = false;
    }

    if (currentPage.length > 0) {
        controlTiles.push(currentPage);
    }

    return { controlTiles, controlColumns };
}
export function renderControls(
    controlTiles: LovelaceCard[][],
    controlColumns: number[],
    isPhone: boolean,
    swiper: Swiper | undefined
): TemplateResult | typeof nothing {
    if (controlTiles.length === 0) return nothing;

    if (isPhone) {
        const gridStyle = { gridTemplateColumns: "repeat(2, minmax(0, 1fr)" };
        return html`
            <div class="control-tiles" style=${styleMap(gridStyle)}>
                ${controlTiles.flat().map((tile) => html`${tile}`)}
            </div>
        `;
    }

    return html`
        <div class="swiper">
            <div class="swiper-wrapper">
                ${controlTiles.map((page, index) => {
                    const gridStyle = {
                        gridTemplateColumns: `repeat(${controlColumns[index]}, var(--sq-tile-width, 19.5rem))`,
                    };

                    return html`
                        <div class="swiper-slide">
                            <div
                                class="control-tiles"
                                style=${styleMap(gridStyle)}
                            >
                                ${page.map(
                                    (tile) =>
                                        html`<div class="tile">${tile}</div>`
                                )}
                            </div>
                        </div>
                    `;
                })}
            </div>
            ${controlTiles.length > 1 && swiper
                ? html`
                      <div
                          class="swiper-button-prev"
                          @click=${(e: Event) => swiper.slidePrev()}
                      ></div>
                      <div
                          class="swiper-button-next"
                          @click=${(e: Event) => swiper.slideNext()}
                      ></div>
                  `
                : nothing}
        </div>
    `;
}
