import { AreaRegistryEntry } from "../types";
import { gridDialogStyle } from "../styles/dialog";

export function areasDialog(hass: any): void {
    if (!hass) return;

    const areas = Object.values<AreaRegistryEntry>(hass.areas).filter((area) => area?.labels.includes("visible"));

    const cards = areas?.map((area) => ({
        type: "custom:smartqasa-area-tile",
        area: area.area_id,
    }));

    const dialogConfig = {
        title: "Areas",
        timeout: 60000,
        content: {
            type: "custom:layout-card",
            layout_type: "custom:grid-layout",
            layout: gridDialogStyle,
            cards: cards,
        },
    };

    window.browser_mod?.service("popup", dialogConfig);
}
