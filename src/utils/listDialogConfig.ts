export const listDialogConfig: any = (
    title: string,
    listType: "domain" | "group",
    filter: string,
    tileType: string
) => {
    return {
        title: title,
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
                        [listType]: filter,
                        sort: {
                            method: "friendly_name",
                            ignore_case: true,
                        },
                        options: {
                            type: `custom:smartqasa-${tileType}-tile`,
                            listType: listType,
                            filter: filter,
                            tileType: tileType,
                        },
                    },
                ],
            },
        },
    };
};
