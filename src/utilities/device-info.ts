export function getDeviceOrientation(): string {
    return window.screen.orientation.type.startsWith("portrait") ? "portrait" : "landscape";
}

export function getDeviceType(): string {
    const { width, height } = window.screen;
    const orientation = window.screen.orientation.type.startsWith("portrait") ? "portrait" : "landscape";
    if (
        (orientation === "portrait" && width < 600 && width != 534) ||
        (orientation === "landscape" && height < 600 && height != 534)
    ) {
        return "phone";
    } else {
        return "tablet";
    }
}

export const deviceType: string = getDeviceType();
