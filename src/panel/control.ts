import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import { createElement } from '../utilities/create-element';
import { html, nothing, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { register } from 'swiper/element/bundle';

let isSwiperRegistered = false;
if (!isSwiperRegistered) {
    register();
    isSwiperRegistered = true;
}

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
                config.type === 'page' &&
                config.columns >= 2 &&
                config.columns <= 4
                    ? config.columns
                    : 3;
            controlColumns.push(columns);
        }

        if (config.type === 'page') {
            if (!firstTile && currentPage.length) {
                controlTiles.push(currentPage);
                currentPage = [];

                const columns =
                    config.type === 'page' &&
                    config.columns >= 2 &&
                    config.columns <= 4
                        ? config.columns
                        : 3;
                controlColumns.push(columns);
            }
        } else if (config.type === 'blank') {
            if (isTablet) {
                const blankTile = document.createElement('div');
                blankTile.classList.add('blank-tile');
                currentPage.push(blankTile as unknown as LovelaceCard);
            }
        } else {
            const tile = createElement(config, hass) as LovelaceCard;
            if (tile) {
                currentPage.push(tile);
            } else {
                console.error('Failed to create tile for config:', config);
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
    isPhone: boolean
): TemplateResult | typeof nothing {
    if (controlTiles.length === 0) return nothing;

    if (isPhone) {
        const gridStyle = { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' };
        return html`
            <div class="control-tiles" style=${styleMap(gridStyle)}>
                ${controlTiles.flat().map((tile) => html`${tile}`)}
            </div>
        `;
    }

    if (controlTiles.length === 1) {
        const gridStyle = {
            gridTemplateColumns: `repeat(${controlColumns[0]}, var(--sq-tile-width, 19.5rem))`,
        };

        return html`
            <div class="control-slide">
                <div class="control-tiles" style=${styleMap(gridStyle)}>
                    ${controlTiles[0].map(
                        (tile) => html` <div class="tile">${tile}</div> `
                    )}
                </div>
            </div>
        `;
    }

    return html`
        <swiper-container
            .initialSlide=${0}
            .loop=${true}
            .mousewheel=${true}
            .navigation=${true}
            class="control-container"
        >
            ${controlTiles.map((page, index) => {
                const gridStyle = {
                    gridTemplateColumns: `repeat(${controlColumns[index]}, var(--sq-tile-width, 19.5rem))`,
                };

                return html`
                    <swiper-slide class="control-slide">
                        <div class="control-tiles" style=${styleMap(gridStyle)}>
                            ${page.map(
                                (tile) => html`<div class="tile">${tile}</div>`
                            )}
                        </div>
                    </swiper-slide>
                `;
            })}
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </swiper-container>
    `;
}
