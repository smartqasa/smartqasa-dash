export function dialogPopup(dialogConfig: DialogConfig, prevDialogConfig: DialogConfig): void {
    if (prevDialogConfig) {
        dialogConfig.dismiss_action = {
            service: "browser_mod.popup",
            data: prevDialogConfig,
        };

        window.browser_mod?.service("popup", dialogConfig);
    }
}
