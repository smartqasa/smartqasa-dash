import { listDialogConfig } from "./listDialogConfig";

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
                    ...listDialogConfig(config.dialogTitle, config.filterType, config.filterValue, config.tileType),
                },
            },
        }),
    };

    window.browser_mod?.service("popup", dialogConfig);
}
