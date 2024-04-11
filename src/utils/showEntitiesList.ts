import { listDialogConfig } from "./listDialogConfig";

export function showEntitiesList(
    dialogTitle: string,
    filterType: "domain" | "group",
    filterValue: any,
    tileType: string
) {
    const dialogConfig = listDialogConfig(dialogTitle, filterType, filterValue, tileType);
    window.browser_mod?.service("popup", dialogConfig);
}
