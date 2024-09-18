export function dialogPopup(dialogConfig: DialogConfig, callingDialogConfig: DialogConfig): void {
    if (callingDialogConfig && Object.keys(callingDialogConfig).length > 0) {
        dialogConfig.dismiss_action = {
            service: "browser_mod.popup",
            data: callingDialogConfig,
        };

        window.browser_mod?.service("popup", dialogConfig);
    }
}
