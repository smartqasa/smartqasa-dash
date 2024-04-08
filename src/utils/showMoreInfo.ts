export const showMoreInfo = (hass: any, config: any) => {
    const entityID = config.entity;
    const title = config.name;
    const group = config.group;
    const tile = config.tile;

    let groupConfig = undefined;
    if (group) {
        groupConfig = {
            service: "browser_mod.popup",
            data: {
                title: hass.states[group]?.attributes?.friendly_name || group,
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
                                group: group,
                                sort: { method: "friendly_name", ignore_case: true },
                                options: { type: `custom:smartqasa-${tile}-tile`, group: group, tile: tile },
                            },
                        ],
                    },
                },
            },
        };
    }

    const dialogConfig = {
        title: title,
        timeout: 60000,
        content: {
            type: "custom:smartqasa-more-info-dialog",
            entity: entityID,
        },
        ...(groupConfig && { dismiss_action: groupConfig }),
    };
    window.browser_mod?.service("popup", dialogConfig);
};
