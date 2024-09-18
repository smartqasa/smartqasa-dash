export async function dialogPopup(dialogConfig: DialogConfig, callingDialogConfig?: DialogConfig): Promise<void> {
    // Check if there is an existing popup
    const closePromise = new Promise<void>((resolve) => {
        const listener = () => {
            window.removeEventListener("browser-mod-popup-closed", listener);
            resolve();
        };
        window.addEventListener("browser-mod-popup-closed", listener);

        // Close the existing popup if any
        window.browser_mod?.service("close_popup");
    });

    // Wait for the current popup to close completely
    await closePromise;

    // Set up the dismiss action if a callingDialogConfig is provided
    if (callingDialogConfig && Object.keys(callingDialogConfig).length > 0) {
        dialogConfig.dismiss_action = {
            service: "browser_mod.popup",
            data: callingDialogConfig,
        };
    }

    // Open the new popup
    await window.browser_mod?.service("popup", dialogConfig);
}
