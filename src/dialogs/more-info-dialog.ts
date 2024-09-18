import { dialogPopup } from "./dialog-popup";

export function moreInfoDialog(stateObj: any, callingDialogConfig: DialogConfig): void {
    if (!stateObj) return;

    const title = stateObj.attributes.friendly_name || stateObj.entity_id;

    const dialogConfig: any = {
        title: title,
        timeout: 60000,
        content: {
            type: "custom:smartqasa-more-info-card",
            entity: stateObj.entity_id,
            background: false,
        },
    };

    console.log("More Info Dialog: ", callingDialogConfig);
    dialogPopup(dialogConfig, callingDialogConfig);
}
