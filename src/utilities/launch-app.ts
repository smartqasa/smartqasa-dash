import { appTable } from "../tables/apps";

export function launchApp(app: string): void {
    const appObj = appTable[app];
    if (!appObj) {
        console.error(`App "${app}" not found in App Table.`);
        return;
    }

    if (appObj.launcher === "uri_scheme" && appObj.uri_scheme) {
        window.location.href = appObj.uri_scheme;
        return;
    }

    if (appObj.launcher === "package" && appObj.package) {
        if (typeof window.fully !== "undefined" && window.fully.startApplication) {
            window.fully.startApplication(appObj.package);
        } else {
            console.error("Fully Kiosk Browser's startApplication is not available.");
        }
        return;
    }

    console.error(`App "${app}" cannot be launched: neither URI scheme nor package is available.`);
}
