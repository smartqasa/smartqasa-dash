import { loadYamlAsJson } from "../utils/loadYamlAsJson";

export async function menuDialog(menu_tab?: number): Promise<void> {
    function createAttributes(icon: string, label: string) {
        return {
            icon: window.smartqasa.deviceType === "phone" ? icon : null,
            label: window.smartqasa.deviceType === "tablet" ? label : null,
        };
    }

    const layout = {
        margin: 0,
        card_margin: 0,
        padding: "10px 0 0 0",
        "grid-template-columns":
            window.smartqasa.deviceType === "phone"
                ? "repeat(2, var(--sq-tile-width-phone))"
                : "repeat(3, var(--sq-tile-width-tablet))",
        "grid-gap": "var(--sq-dialog-grid-gap)",
    };

    const favoMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/favorites.yaml");
    const funcMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/functions.yaml");
    const applMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/applications.yaml");
    const utilMenuTiles = [
        {
            type: "custom:smartqasa-dialog-tile",
            dialog: "clean_screen",
        },
        {
            type: "custom:smartqasa-dialog-tile",
            dialog: "display_themes",
            menu_tab: 3,
        },
        {
            type: "custom:button-card",
            template: "tablet-refresh-tile",
        },
        {
            type: "custom:button-card",
            template: "clear-cache-tile",
        },
        {
            type: "custom:button-card",
            template: "speedtest-tile",
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
                type: "custom:button-card",
                template: "system-reboot-tile",
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
                type: "custom:button-card",
                template: "system-power-down-tile",
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
            type: "custom:button-card",
            template: "admin-mode-tile",
        },
        {
            type: "custom:button-card",
            template: "about-tile",
        },
    ];

    const dialogConfig = {
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
                    attributes: createAttributes("hass:exit-to-apps", "Applications"),
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

    window.browser_mod?.service("popup", dialogConfig);
}