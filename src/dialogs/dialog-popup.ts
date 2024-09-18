export async function dialogPopup(dialogConfig: DialogConfig, callingDialogConfig?: DialogConfig): Promise<void> {
    await window.browser_mod?.service("close_popup");

    if (callingDialogConfig && Object.keys(callingDialogConfig).length > 0) {
        dialogConfig.dismiss_action = {
            service: "browser_mod.popup",
            data: callingDialogConfig,
        };
    }

    await setTimeout(() => {
        window.browser_mod?.service("popup", dialogConfig);
    }, 100);
}
