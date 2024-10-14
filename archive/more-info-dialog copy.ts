import { listDialogConfig } from "../src/dialogs/list-dialog-config";

export function moreInfoDialog(config: any, stateObj: any) {
  if (!config || !stateObj) return;

  const title = stateObj.attributes.friendly_name || stateObj.entity_id;

  let dialogConfig: any = {
    title: title,
    dismissable: true,
    timeout: 60000,
    content: {
      type: "custom:smartqasa-more-info-card",
      entity: stateObj.entity_id,
      background: false,
    },
    ...(config.dialog_title && {
      dismiss_action: {
        service: "browser_mod.popup",
        data: {
          ...listDialogConfig(
            config.dialog_title,
            config.filter_type,
            config.filter_value,
            config.tile_type,
          ),
        },
      },
    }),
  };

  if (!window.browser_mod) {
    console.error("browser_mod is not available");
  }
  window.browser_mod?.service("popup", dialogConfig);
}
