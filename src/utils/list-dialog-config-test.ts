export const listDialogConfig: any = (
    dialogTitle: string,
    filterType: "domain" | "group",
    filterValue: string,
    cardType: string
) => {
    return {
        title: dialogTitle,
        timeout: 60000,
        card: {
            type: "custom:smartqasa-group-stack",
            filter_type: filterType,
            filter_value: filterValue,
            card_type: `custom:smartqasa-${cardType}-tile`,
        },
    };
};
