export function navigateToArea(area: any) {
    if (!area) return;

    const url = new URL(location.href);
    const pathSegments = url.pathname.split('/');
    pathSegments.pop();
    pathSegments.push(area);
    url.pathname = pathSegments.join('/');

    window.history.pushState(null, '', url.toString());
    window.dispatchEvent(new CustomEvent('location-changed'));
}
