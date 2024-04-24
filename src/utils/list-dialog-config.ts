import { listDialogStyle } from "../styles/dialog";

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
                layout: listDialogStyle,
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
                            dialog_title: dialogTitle,
                            filter_type: filterType,
                            filter_value: filterValue,
                            tile_type: tileType,
                        },
                    },
                ],
            },
        },
        dismiss_action: {},
    };
};
