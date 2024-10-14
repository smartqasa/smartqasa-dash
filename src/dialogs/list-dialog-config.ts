export const listDialogConfig: any = (
  dialogTitle: string,
  filterType: "domain" | "group",
  filterValue: string,
  tileType: string,
) => {
  const dialogConfig = {
    title: dialogTitle,
    timeout: 60000,
    content: {
      type: "custom:smartqasa-group-stack",
      filter_type: filterType,
      filter_value: filterValue,
      tile_type: `custom:smartqasa-${tileType}-tile`,
      callingDialog: {},
    },
  };

  dialogConfig.content.callingDialog = {
    ...dialogConfig,
  };

  return dialogConfig;
};
