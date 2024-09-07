export function moreInfoDialog(config: any, stateObj: any) {
    if (!config || !stateObj) return;

    const title = stateObj.attributes.friendly_name || stateObj.entity_id;

    let dialogConfig: any = {
        title: title,
        timeout: 60000,
        card: {
            type: "custom:smartqasa-more-info-card",
            entity: stateObj.entity_id,
        },
    };

    if (!window.browser_mod) {
        console.error("browser_mod is not available");
    }
    window.smartqasa.service("popup", dialogConfig);
}
