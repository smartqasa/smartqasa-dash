import { listDialogConfig } from "./listDialogConfig";

export function showEntitiesList(title: string, listType: "domain" | "group", filter: any, tileType: string) {
    const dialogConfig = listDialogConfig(title, listType, filter, tileType);
    window.browser_mod?.service("popup", dialogConfig);
}
