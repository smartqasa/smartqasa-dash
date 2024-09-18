import { dialogPopup } from "./dialog-popup";

export async function moreInfoDialog(stateObj: any, callingDialogConfig: DialogConfig): Promise<void> {
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

    await dialogPopup(dialogConfig, callingDialogConfig);
}
