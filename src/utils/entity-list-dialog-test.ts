import { listDialogConfig } from "./list-dialog-config-test";

export function entityListDialog(
    dialogTitle: string,
    filterType: "domain" | "group",
    filterValue: any,
    tileType: string
) {
    const dialogConfig = listDialogConfig(dialogTitle, filterType, filterValue, tileType);
    console.log("Entity List Dialog", dialogConfig);
    window.smartqasa.service("popup", dialogConfig);
}
