import { listDialogConfig } from "./list-dialog-config";
import { dialogPopup } from "./dialog-popup";

export function entityListDialog(
    dialogTitle: string,
    filterType: "domain" | "group",
    filterValue: any,
    tileType: string
) {
    const dialogConfig = listDialogConfig(
        dialogTitle,
        filterType,
        filterValue,
        tileType
    );

    dialogPopup(dialogConfig);
}
