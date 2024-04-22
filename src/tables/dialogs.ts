import { listDialogConfig } from "../utils/list-dialog-config";
import { listDialogStyle } from "../styles/dialog";

interface DialogTable {
    [key: string]: {
        icon: string;
        name: string;
        data: any;
    };
}

const dialogTable: DialogTable = {
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
                card_mod: {
                    style: {
                        radius: "0px",
                    },
                },
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
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: listDialogStyle,
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
        icon: "hass:garage-variant",
        name: "Garage Doors",
        data: listDialogConfig("Garage Doors", "group", "cover.all_garage_doors", "garage"),
    },

    locks: {
        icon: "hass:lock",
        name: "Door Locks",
        data: listDialogConfig("Door Locks", "group", "lock.all_door_locks", "lock"),
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
        data: listDialogConfig("Door Sensors", "group", "binary_sensor.all_door_sensors", "sensor"),
    },

    sensors_windows: {
        icon: "hass:window-open",
        name: "Window Sensors",
        data: listDialogConfig("Window Sensors", "group", "binary_sensor.all_window_sensors", "sensor"),
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

    sonos_players: {
        icon: "hass:speaker-multiple",
        name: "Sonos Players",
        data: listDialogConfig("Sonos Players", "group", "media_player.all_sonos_players", "sonos"),
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
            size: "fullscreen",
            timeout: 60000,
            content: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: {
                    place_content: "center",
                    place_self: "center",
                    grid_template_columns: "446px 454px",
                    grid_gap: "var(--sq-dialog-grid-gap)",
                },
                cards: [
                    {
                        type: "vertical-stack",
                        cards: [
                            {
                                type: "custom:gap-card",
                                height: 15,
                            },
                            {
                                type: "weather-forecast",
                                entity: "weather.forecast_home",
                                forecast_type: "hourly",
                                name: "Forecast",
                                show_current: true,
                                show_forecast: true,
                                secondary_info_attribute: "wind_speed",
                            },
                            {
                                type: "weather-forecast",
                                entity: "weather.forecast_home",
                                forecast_type: "daily",
                                show_current: false,
                                show_forecast: true,
                            },
                        ],
                    },
                    {
                        type: "vertical-stack",
                        cards: [
                            {
                                type: "custom:gap-card",
                                height: 15,
                            },
                            {
                                type: "custom:weather-radar-card",
                                frame_count: 10,
                                show_marker: true,
                                show_range: true,
                                show_zoom: true,
                                show_recenter: true,
                                show_playback: true,
                                zoom_level: 20,
                                square_map: true,
                                show_scale: true,
                                extra_labels: true,
                                map_style: "Voyager",
                            },
                        ],
                    },
                ],
            },
        },
    },
};

export default dialogTable;
