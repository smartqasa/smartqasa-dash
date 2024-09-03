export async function menuConfig(): Promise<any> {
    const menuConfig = {
        title: "Menu",
        timeout: 120000,
        content: {
            type: "custom:smartqasa-menu-card",
        },
    };

    window.smartqasa.menuConfig = menuConfig;

    return menuConfig;
}
