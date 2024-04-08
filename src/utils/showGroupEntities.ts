export const showGroupEntities = (config: any, stateObj: any) => {
    if (!stateObj || !Array.isArray(stateObj.attributes?.entity_id) || stateObj.attributes.entity_id.length === 0)
        return;

    const dialogConfig: any = {
        title: stateObj.attributes.friendly_name || stateObj.entity_id,
        timeout: 60000,
        content: {
            type: "custom:auto-entities",
            card: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: {
                    margin: 0,
                    "grid-template-columns": "1fr",
                    "grid-gap": "var(--sq-dialog-grid-gap)",
                },
            },
            card_param: "cards",
            filter: {
                include: [
                    {
                        group: stateObj.entity_id,
                        sort: {
                            method: "friendly_name",
                            ignore_case: true,
                        },
                        options: {
                            type: "custom:smartqasa-light-tile",
                            group: stateObj.entity_id,
                            tile: config.tile,
                        },
                    },
                ],
            },
        },
    };

    window.browser_mod?.service("popup", dialogConfig);
};
