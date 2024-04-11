export const listDialogConfig: any = (
    dialogTitle: string,
    filterType: "domain" | "group",
    filterValue: string,
    tileType: string
) => {
    return {
        title: dialogTitle,
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
                        [filterType]: filterValue,
                        sort: {
                            method: "friendly_name",
                            ignore_case: true,
                        },
                        options: {
                            type: `custom:smartqasa-${tileType}-tile`,
                            dialogTitle: dialogTitle,
                            filterType: filterType,
                            filterValue: filterValue,
                            tileType: tileType,
                        },
                    },
                ],
            },
        },
    };
};
