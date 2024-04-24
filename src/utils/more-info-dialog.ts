import { listDialogConfig } from "./list-dialog-config";

export function moreInfoDialog(config: any, stateObj: any) {
    if (!stateObj) return;

    const dialogConfig = {
        title: stateObj.attributes?.friendly_name || stateObj.entity_id,
        timeout: 60000,
        content: {
            type: "custom:smartqasa-more-info-dialog",
            entity: stateObj.entity_id,
        },
        ...(config.dialogTitle && {
            dismiss_action: {
                service: "browser_mod.popup",
                data: {
                    ...listDialogConfig(config.dialog_title, config.filter_type, config.filter_value, config.tile_type),
                },
            },
        }),
    };

    window.browser_mod?.service("popup", dialogConfig);
}
