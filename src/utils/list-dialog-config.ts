export const listDialogConfig: any = (
    dialogTitle: string,
    filterType: "domain" | "group",
    filterValue: string,
    cardType: string
) => {
    return {
        title: dialogTitle,
        timeout: 60000,
        content: {
            type: "custom:smartqasa-group-stack",
            group: filterValue,
            card_type: `custom:smartqasa-${cardType}-tile`,
        },
    };
};
