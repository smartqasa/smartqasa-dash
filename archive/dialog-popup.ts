export function dialogPopup(
    dialogConfig: DialogConfig,
    restorePreviousDialog?: boolean
): void {
    // If no dialog stack exists or it's empty, show the popup directly
    if (!dialogStack || dialogStack.length === 0) {
        window.browser_mod?.service('popup', { ...dialogConfig });
    } else {
        // If dialogStack exists, set up dismiss_action to show the previous dialog
        const previousDialogConfig = dialogStack[dialogStack.length - 1];

        window.browser_mod?.service('popup', {
            ...dialogConfig,
            dismiss_action: {
                service: 'browser_mod.popup',
                data: { ...previousDialogConfig },
            },
        });
    }

    // Push the current dialogConfig onto the stack
    window.smartqasa.dialogStack?.push(dialogConfig);
}
