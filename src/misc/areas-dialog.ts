interface Area {
    area_id: string;
    aliases: string[];
    floor_id: string;
    icon: string;
    labels: string[];
    name: string;
    picture: string;
}

export function areasDialog(hass: any): void {
    if (!hass) return;

    const areas = Object.values<Area>(hass.areas).filter((area) => area?.labels.includes("visible"));

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
            layout: {
                margin: 0,
                "grid-template-columns": "1fr",
                "grid-gap": "var(--sq-dialog-grid-gap)",
            },
            cards: cards,
        },
    };

    window.browser_mod?.service("popup", dialogConfig);
}
