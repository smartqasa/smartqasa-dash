export const showGroupEntities = (stateObj: any, tileType: string) => {
    console.log(tileType);
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
                            type: `custom:smartqasa-${tileType}-tile`,
                            group: stateObj.entity_id,
                            tileType: tileType,
                        },
                    },
                ],
            },
        },
    };

    window.browser_mod?.service("popup", dialogConfig);
};
