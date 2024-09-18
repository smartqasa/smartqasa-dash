export const moreInfoDialog = (stateObj: any): DialogConfig | undefined => {
    if (!stateObj) return undefined;

    const title = stateObj.attributes.friendly_name || stateObj.entity_id;

    let dialogConfig: any = {
        title: title,
        timeout: 60000,
        content: {
            type: "custom:smartqasa-more-info-card",
            entity: stateObj.entity_id,
            background: false,
        },
    };

    return dialogConfig;
};
