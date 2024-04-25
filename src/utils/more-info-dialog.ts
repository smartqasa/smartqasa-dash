import { listDialogConfig } from "./list-dialog-config";

export function moreInfoDialog(config: any, stateObj: any) {
    if (!config || !stateObj) return;

    let dialogConfig: any = {
        title: stateObj.attributes?.friendly_name || stateObj.entity_id,
        timeout: 60000,
        content: {
            type: "custom:smartqasa-more-info-dialog",
            entity: stateObj.entity_id,
        },
    };

    if (config.dialog_title) {
        const dismissData = listDialogConfig(
            config.dialog_title,
            config.filter_type,
            config.filter_value,
            config.tile_type
        );

        dialogConfig.dismiss_action = {
            service: "browser_mod.popup",
            data: dismissData,
        };
    }

    window.browser_mod?.service("popup", dialogConfig);
}
