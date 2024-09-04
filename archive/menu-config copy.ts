import { loadYamlAsJson } from "../src/utils/load-yaml-as-json";
import { deviceType } from "../src/utils/device-info";

export async function menuConfig(menu_tab?: number): Promise<any> {
    function createAttributes(icon: string, label: string) {
        return {
            icon: deviceType === "phone" ? icon : null,
            label: deviceType === "tablet" ? label : null,
        };
    }

    const layout = {
        margin: 0,
        card_margin: 0,
        padding: "1rem 0 0 0",
        "grid-template-columns":
            deviceType === "phone" ? "repeat(2, 1fr)" : "repeat(3, var(--sq-tile-width-tablet, 20rem))",
        "grid-gap": "var(--sq-dialog-grid-gap)",
    };

    const favoMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/favorites.yaml");
    const funcMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/functions.yaml");
    const applMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/applications.yaml");
    const utilMenuTiles = [
        {
            type: "custom:smartqasa-dialog-tile",
            dialog: "clean_screen",
            menu_tab: 3,
        },
        {
            type: "custom:smartqasa-dialog-tile",
            dialog: "display_themes",
            menu_tab: 3,
        },
        {
            type: "custom:smartqasa-routine-tile",
            entity: "script.system_tablet_reload",
        },
        {
            type: "custom:smartqasa-action-tile",
            icon: "mdi:wiper",
            name: "Clear Cache",
            menu_tab: 3,
            actions: [
                {
                    action: "browser_mod.javascript",
                    data: {
                        code: "fully.clearCache()",
                    },
                },
            ],
        },
        {
            type: "custom:smartqasa-dialog-tile",
            dialog: "speed_test",
            menu_tab: 3,
        },
        {
            type: "custom:restriction-card",
            condition: {
                entity: "input_boolean.admin_mode",
                value: "off",
            },
            restrictions: {
                block: {
                    condition: {
                        entity: "input_boolean.admin_mode",
                        value: "off",
                    },
                },
            },
            card: {
                type: "custom:smartqasa-action-tile",
                icon: "mdi:restart",
                name: "Reboot System",
                menu_tab: 3,
                action: "hassio.host_reboot",
            },
        },
        {
            type: "custom:restriction-card",
            condition: {
                entity: "input_boolean.admin_mode",
                value: "off",
            },
            restrictions: {
                block: {
                    condition: {
                        entity: "input_boolean.admin_mode",
                        value: "off",
                    },
                },
            },
            card: {
                type: "custom:smartqasa-action-tile",
                icon: "mdi:power",
                name: "Shutdown System",
                menu_tab: 3,
                action: "hassio.host_shutdown",
            },
        },
        {
            type: "custom:restriction-card",
            condition: {
                entity: "input_boolean.admin_mode",
                value: "off",
            },
            restrictions: {
                block: {
                    condition: {
                        entity: "input_boolean.admin_mode",
                        value: "off",
                    },
                },
            },
            card: {
                type: "custom:smartqasa-app-tile",
                app: "play_store",
                icon: "mdi:store",
            },
        },
        {
            type: "custom:smartqasa-dialog-tile",
            dialog: "admin_mode",
            menu_tab: 3,
        },
    ];

    const menuConfig = {
        title: "Menu",
        timeout: 120000,
        content: {
            type: "custom:tabbed-card",
            options: {
                defaultTabIndex: menu_tab || 0,
            },
            styles: {
                "--mdc-tab-height": "45px",
                "--mdc-typography-button-font-size": "var(--sq-primary-font-size)",
                "--mdc-typography-button-font-weight": "var(--sq-primary-font-weight)",
                "--mdc-typography-button-text-transform": "none",
                "--mdc-theme-primary": "rgb(var(--sq-primary-font-rgb))",
                "--mdc-tab-color-default": "rgb(var(--sq-inactive-rgb))",
                "--mdc-tab-text-label-color-default": "rgb(var(--sq-inactive-rgb))",
            },
            tabs: [
                {
                    attributes: createAttributes("hass:star", "Favorites"),
                    card: {
                        type: "custom:layout-card",
                        layout_type: "custom:grid-layout",
                        layout: layout,
                        cards: favoMenuTiles,
                    },
                },
                {
                    attributes: createAttributes("hass:function", "Functions"),
                    card: {
                        type: "custom:layout-card",
                        layout_type: "custom:grid-layout",
                        layout: layout,
                        cards: funcMenuTiles,
                    },
                },
                {
                    attributes: createAttributes("hass:exit-to-app", "Applications"),
                    card: {
                        type: "custom:layout-card",
                        layout_type: "custom:grid-layout",
                        layout: layout,
                        cards: applMenuTiles,
                    },
                },
                {
                    attributes: createAttributes("hass:cog-outline", "Utilities"),
                    card: {
                        type: "custom:layout-card",
                        layout_type: "custom:grid-layout",
                        layout: layout,
                        cards: utilMenuTiles,
                    },
                },
            ],
        },
    };

    window.smartqasa.menuConfig = menuConfig;

    return menuConfig;
}
