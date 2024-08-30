export async function navigateToArea(area: any) {
    if (!area) return;

    const url = new URL(location.href);
    const pathSegments = url.pathname.split("/");
    pathSegments.pop();
    pathSegments.push(area);
    url.pathname = pathSegments.join("/");

    try {
        const response = await fetch(url.toString(), { method: "HEAD" });

        if (response.ok) {
            window.history.pushState(null, "", url.toString());
            window.dispatchEvent(new CustomEvent("location-changed"));
            window.smartqasa.viewMode = "area";
        } else {
            console.error("URL does not exist:", url.toString());
        }
    } catch (error) {
        console.error("Failed to check URL:", error);
    }
}
