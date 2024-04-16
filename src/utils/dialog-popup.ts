interface DialogConfig {
    title: string;
    size: "normal" | "wide" | "fullscreen";
    timeout: number;
    dismissable: boolean;
    dismiss_action: any;
    autoclose: boolean;
    content: any;
}

export function dialogPopup({
    title = "Default Title",
    size = "normal",
    timeout = 60000,
    dismissable = true,
    dismiss_action,
    autoclose = false,
    content = "Default content",
}: DialogConfig) {
    window.browser_mod?.service("popup", {
        title,
        size,
        timeout,
        dismissable,
        dismiss_action,
        autoclose,
        content,
    });
}
