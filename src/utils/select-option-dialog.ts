export function selectOptionDialog(config: any, stateObj: any) {
    if (!stateObj) return;

    const cards = stateObj.attributes.options.map((option: string) => ({
        type: "custom:smartqasa-option-tile",
        entity: stateObj.entity_id,
        option: option,
        trigger: config?.trigger,
        menu_tab: config.menu_tab,
    }));

    const dialogConfig = {
        title: stateObj.attributes.friendly_name || stateObj.entity_id,
        timeout: 60000,
        content: {
            type: "custom:smartqasa-vertical-stack-card",
            cards: cards,
        },
    };

    window.browser_mod?.service("popup", dialogConfig);
}
