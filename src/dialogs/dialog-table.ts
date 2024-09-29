import { DialogTable } from "../types";
import { listDialogConfig } from "./list-dialog-config";

export const dialogTable: DialogTable = {
    admin_mode: {
        icon: "hass:tools",
        name: "Admin Mode",
        data: {
            title: "Admin Mode",
            timeout: 30000,
            content: {
                type: "custom:smartqasa-pin-verify-card",
                title: "Enter Admin PIN",
                pin_entity: "input_text.admin_pin_code",
                outcome_entity: "input_boolean.admin_mode",
            },
        },
    },

    air_quality: {
        icon: "hass:air-filter",
        name: "Air Quality",
        data: {
            title: "Air Quality",
            size: "fullscreen",
            timeout: 120000,
            content: {
                type: "custom:smartqasa-grid-stack",
                columns: 3,
                cards: [
                    {
                        type: "custom:mini-graph-card",
                        entities: ["sensor.air_quality_radon"],
                        name: "Radon Gas",
                        icon: "mdi:radioactive",
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: "#00ff00",
                            },
                            {
                                value: 48.1,
                                color: "#32cd32",
                            },
                            {
                                value: 96.2,
                                color: "#ffd700",
                            },
                            {
                                value: 148,
                                color: "#ff0000",
                            },
                        ],
                        tap_action: {
                            action: "none",
                        },
                        color_thresholds_transition: "hard",
                    },
                    {
                        type: "custom:mini-graph-card",
                        entities: ["sensor.air_quality_co2"],
                        name: "Carbon Dioxide",
                        icon: "mdi:molecule-co2",
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: "#00ff00",
                            },
                            {
                                value: 799,
                                color: "#ffd700",
                            },
                            {
                                value: 999,
                                color: "#ff0000",
                            },
                        ],
                        color_thresholds_transition: "hard",
                        tap_action: {
                            action: "none",
                        },
                    },
                    {
                        type: "custom:mini-graph-card",
                        entities: ["sensor.air_quality_voc"],
                        name: "VOC (Contaminents)",
                        icon: "mdi:weather-dust",
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: "#00ff00",
                            },
                            {
                                value: 250,
                                color: "#ffd700",
                            },
                            {
                                value: 2000,
                                color: "#ff0000",
                            },
                        ],
                        color_thresholds_transition: "hard",
                        tap_action: {
                            action: "none",
                        },
                    },
                    {
                        type: "custom:mini-graph-card",
                        entities: ["sensor.air_quality_temperature"],
                        name: "Temperature",
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: "#0000ff",
                            },
                            {
                                value: 68,
                                color: "#00ff00",
                            },
                            {
                                value: 75,
                                color: "#ffa500",
                            },
                            {
                                value: 85,
                                color: "#ff0000",
                            },
                        ],
                        color_thresholds_transition: "hard",
                        tap_action: {
                            action: "none",
                        },
                    },
                    {
                        type: "custom:mini-graph-card",
                        entities: ["sensor.air_quality_humidity"],
                        name: "Humidity",
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: "#d0ae8b",
                            },
                            {
                                value: 40,
                                color: "#00ff00",
                            },
                            {
                                value: 60,
                                color: "#52B1D2",
                            },
                        ],
                        color_thresholds_transition: "hard",
                        tap_action: {
                            action: "none",
                        },
                    },
                    {
                        type: "custom:mini-graph-card",
                        entities: ["sensor.air_quality_pressure"],
                        name: "Barometric Presure",
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: "#52B1D2",
                            },
                            {
                                value: 1009.144,
                                color: "#00ff00",
                            },
                            {
                                value: 1022.689,
                                color: "#d0ae8b",
                            },
                        ],
                        color_thresholds_transition: "hard",
                        tap_action: {
                            action: "none",
                        },
                    },
                ],
            },
        },
    },

    areas: {
        icon: "hass:view-dashboard",
        name: "Areas",
        data: {
            title: "Areas",
            timeout: 60000,
            content: {
                type: "custom:smartqasa-areas-card",
            },
        },
    },

    clean_screen: {
        icon: "hass:spray-bottle",
        name: "Clean Screen",
        data: {
            title: "Clean Screen",
            size: "fullscreen",
            timeout: 30000,
            dismissable: false,
            content: {
                type: "picture",
                image: "/local/sq-storage/images/clean_screen.png",
            },
        },
    },

    display_themes: {
        icon: "hass:compare",
        name: "Dispaly Themes",
        data: {
            title: "Display Themes",
            timeout: 60000,
            content: {
                type: "custom:smartqasa-vertical-stack",
                cards: [
                    {
                        type: "custom:smartqasa-theme-tile",
                        mode: "light",
                        icon: "hass:brightness-7",
                        name: "Light",
                    },
                    {
                        type: "custom:smartqasa-theme-tile",
                        mode: "dark",
                        icon: "hass:weather-night",
                        name: "Dark",
                    },
                    {
                        type: "custom:smartqasa-theme-tile",
                        mode: "auto",
                        icon: "hass:theme-light-dark",
                        name: "Auto",
                    },
                ],
            },
        },
    },

    energy_monitor: {
        icon: "hass:transmission-tower",
        name: "Energy Monitor",
        data: {
            title: "Energy Monitor",
            size: "fullscreen",
            timeout: 120000,
            content: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: {
                    "grid-template-columns": "90vw",
                    "grid-template-rows": "auto",
                    "grid-gap": "var(--sq-dialog-grid-gap)",
                    "place-content": "center",
                    margin: 0,
                },
                cards: [
                    {
                        type: "horizontal-stack",
                        cards: [{ type: "energy-distribution" }, { type: "energy-date-selection" }],
                    },
                    { type: "energy-usage-graph" },
                ],
            },
        },
    },

    garages: {
        icon: "hass:garage-open-variant",
        name: "Garage Doors",
        entity: "cover.all_garage_doors",
        data: listDialogConfig("Garage Doors", "group", "cover.all_garage_doors", "garage"),
    },

    locks: {
        icon: "hass:lock-open",
        name: "Door Locks",
        entity: "lock.all_door_locks",
        data: listDialogConfig("Door Locks", "group", "lock.all_door_locks", "lock"),
    },

    menu: {
        icon: "hass:menu",
        name: "Menu",
        data: {
            title: "Menu",
            timeout: 120000,
            content: {
                type: "custom:smartqasa-menu-card",
            },
        },
    },

    robots: {
        icon: "hass:robot-vacuum-variant",
        name: "Robots",
        data: listDialogConfig("Robots", "domain", "vacuum", "robot"),
    },

    roku_players: {
        icon: "hass:audio-video",
        name: "Roku Players",
        data: listDialogConfig("Roku Players", "group", "media_player.all_roku_players", "roku"),
    },

    sensors_doors: {
        icon: "hass:door-open",
        name: "Door Sensors",
        entity: "binary_sensor.all_door_sensors",
        data: listDialogConfig("Door Sensors", "group", "binary_sensor.all_door_sensors", "sensor"),
    },

    sensors_windows: {
        icon: "hass:window-open",
        name: "Window Sensors",
        entity: "binary_sensor.all_window_sensors",
        data: listDialogConfig("Window Sensors", "group", "binary_sensor.all_window_sensors", "sensor"),
    },

    shades: {
        icon: "hass:roller-shade",
        name: "Shades",
        data: listDialogConfig("Shades", "group", "cover.all_window_shades", "shade"),
    },

    sonos: {
        icon: "hass:music",
        name: "Sonos",
        data: {
            title: "Sonos",
            timeout: 600000,
            style: {
                "--control-button-padding": 0,
            },
            content: {
                type: "custom:sonos-card",
                sections: ["player", "media browser", "groups", "grouping", "volumes"],
                showVolumeUpAndDownButtons: true,
                showSourceInPlayer: true,
                mediaBrowserTitle: "Favorites",
                hideBrowseMediaButton: true,
                mediaBrowserHideTitleForThumbnailIcons: true,
                mediaBrowserItemsPerRow: 5,
            },
        },
    },

    sonos_players: {
        icon: "hass:speaker-multiple",
        name: "Sonos Players",
        data: listDialogConfig("Sonos Players", "group", "media_player.all_sonos_players", "sonos"),
    },

    speed_test: {
        icon: "hass:gauge",
        name: "Speed Test",
        data: {
            title: "Speed Test",
            size: "wide",
            timeout: 60000,
            content: {
                type: "statistics-graph",
                entities: ["sensor.speedtest_download", "sensor.speedtest_upload"],
                chart_type: "line",
                period: "hour",
                stat_types: ["mean"],
                hide_legend: false,
                days_to_show: 3,
            },
        },
    },

    thermostats: {
        icon: "hass:thermostat",
        name: "Thermostats",
        data: listDialogConfig("Thermostats", "domain", "climate", "thermostat"),
    },

    weather: {
        icon: "hass:sun-wireless",
        name: "Weather",
        data: {
            title: "Weather",
            size: "wide",
            timeout: 60000,
            content: {
                type: "custom:smartqasa-weather-card",
            },
        },
    },
};
