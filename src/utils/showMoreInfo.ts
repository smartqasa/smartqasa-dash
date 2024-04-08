export const showMoreInfo = (config: any, stateObj: any, hass: any) => {
    if (!stateObj) return;

    let groupConfig = undefined;
    if (config.group) {
        groupConfig = {
            service: "browser_mod.popup",
            data: {
                title: hass.states[config.group]?.attributes?.friendly_name || config.group,
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
                                group: config.group,
                                sort: { method: "friendly_name", ignore_case: true },
                                options: {
                                    type: `custom:smartqasa-${config.tile}-tile`,
                                    group: config.group,
                                    tile: config.tile,
                                },
                            },
                        ],
                    },
                },
            },
        };
    }

    const dialogConfig = {
        title: stateObj.attributes.friendly_name || stateObj.entity_id,
        timeout: 60000,
        content: {
            type: "custom:smartqasa-more-info-dialog",
            entity: stateObj.entity_id,
        },
        ...(groupConfig && { dismiss_action: groupConfig }),
    };
    window.browser_mod?.service("popup", dialogConfig);
};
