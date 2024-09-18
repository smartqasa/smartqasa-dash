export function dialogPopup(dialogConfig: DialogConfig) {
    window.browser_mod?.service("popup", dialogConfig);
}
