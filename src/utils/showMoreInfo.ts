import { listDialogConfig } from "./listDialogConfig";

export function showMoreInfo(config: any, stateObj: any, hass: any) {
    if (!stateObj) return;

    const title = config.title || stateObj.attributes?.friendly_name || stateObj.entity_id;

    const dialogConfig = {
        title: title,
        timeout: 60000,
        content: {
            type: "custom:smartqasa-more-info-dialog",
            entity: stateObj.entity_id,
        },
        ...(config.listType && {
            dismiss_action: {
                service: "browser_mod.popup",
                data: {
                    ...listDialogConfig(title, config.listType, config.filter, config.tileType),
                },
            },
        }),
    };

    window.browser_mod?.service("popup", dialogConfig);
}
