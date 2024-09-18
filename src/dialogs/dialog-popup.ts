export async function dialogPopup(dialogConfig: DialogConfig, callingDialogConfig?: DialogConfig): Promise<void> {
    if (callingDialogConfig && Object.keys(callingDialogConfig).length > 0) {
        dialogConfig.dismiss_action = {
            service: "browser_mod.popup",
            data: callingDialogConfig,
        };
    }

    setTimeout(() => {
        window.browser_mod?.service("popup", dialogConfig);
    }, 500);
}
