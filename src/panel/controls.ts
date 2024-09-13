import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { createElement } from "../utils/create-element";

export function loadControls(
    tilesConfig: LovelaceCardConfig[],
    hass: HomeAssistant,
    isTablet: boolean
): { controlTiles: LovelaceCard[][]; controlColumns: number[] } {
    const controlTiles: LovelaceCard[][] = [];
    const controlColumns = [];
    let currentPage: LovelaceCard[] = [];
    let firstTile = true;

    for (const config of tilesConfig) {
        if (firstTile) {
            const columns = config.type === "page" && config.columns >= 2 && config.columns <= 4 ? config.columns : 3;
            controlColumns.push(columns);
        }

        if (config.type === "page") {
            if (!firstTile && currentPage.length) {
                controlTiles.push(currentPage);
                currentPage = [];

                const columns =
                    config.type === "page" && config.columns >= 2 && config.columns <= 4 ? config.columns : 3;
                controlColumns.push(columns);
            }
        } else if (config.type === "blank") {
            if (isTablet) {
                const blankTile = document.createElement("div");
                blankTile.classList.add("blank-tile");
                currentPage.push(blankTile as unknown as LovelaceCard);
            }
        } else {
            const tile = createElement(config) as LovelaceCard;
            if (tile) {
                tile.hass = hass;
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
