export function selectOptionDialog(config: any, stateObj: any) {
    if (!stateObj) return;

    const cards = stateObj.attributes.options.map((option: string) => ({
        type: "custom:smartqasa-option-tile",
        entity: stateObj?.entity_id,
        option: option,
        trigger: config?.trigger || null,
    }));
    const dialogConfig = {
        title: stateObj.attributes.friendly_name || stateObj.entity_id,
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
