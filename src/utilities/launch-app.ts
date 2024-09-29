export function launchApp(packageId: string): void {
    if (typeof window.fully !== "undefined" && window.fully.startApplication) {
        window.fully.startApplication(packageId);
    } else {
        console.warn("fully.startApplication is not available.");
    }
}
