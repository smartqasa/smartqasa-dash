import { HassArea } from "../types";

export function areasDialog(hass: any): void {
    if (!hass) return;

    const areas = Object.values<HassArea>(hass.areas).filter((area) => area?.labels.includes("visible"));

    const cards = areas?.map((area) => ({
        type: "custom:smartqasa-area-tile",
        area: area.area_id,
    }));

    const dialogConfig = {
        title: "Areas",
        timeout: 60000,
        content: {
            type: "custom:smartqasa-grid-stack",
            columns: 3,
            cards: cards,
        },
    };

    window.browser_mod?.service("popup", dialogConfig);
}
