import { listDialogConfig } from "./list-dialog-config";

export function moreInfoDialog(config: any, stateObj: any) {
    if (!config || !stateObj) return;

    const title = stateObj.attributes.friendly_name || stateObj.entity_id;

    let dialogConfig: any = {
        title: title,
        dismissable: true,
        timeout: 60000,
        content: {
            type: "custom:smartqasa-more-info-dialog",
            entity: stateObj.entity_id,
        },
    };

    if (config.dialogTitle) {
        const dismissData = listDialogConfig(
            config.dialogTitle,
            config.filterType,
            config.filterValue,
            config.tileType
        );

        dialogConfig.dismiss_action = {
            service: "browser_mod.popup",
            data: { ...dismissData },
        };
    }

    window.browser_mod?.service("popup", dialogConfig);
}
