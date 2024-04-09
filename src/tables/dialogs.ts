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
        data: {
            title: "Garage Doors",
            timeout: 60000,
            content: {
                type: "custom:auto-entities",
                card: {
                    type: "custom:layout-card",
                    layout_type: "custom:grid-layout",
                    layout: {
                        margin: 0,
                        "grid-template-columns": "1fr",
                        "grid-gap": "var(--sq-dialog-grid-gap)",
                    },
                },
                card_param: "cards",
                filter: {
                    include: [
                        {
                            group: "cover.all_garage_doors",
                            sort: {
                                method: "friendly_name",
                                ignore_case: true,
                            },
                            options: {
                                type: "custom:smartqasa-garage-tile",
                                group: "cover.all_garage_doors",
                                tileType: "garage",
                            },
                        },
                    ],
                },
            },
        },
    },
    internet_speed: {
        icon: "hass:gauge",
        name: "Internet Speed",
        data: {
            title: "Internet Speed",
            size: "wide",
            timeout: 60000,
            content: {
                type: "statistics-graph",
                entities: ["sensor.speedtest_download", "sensor.speedtest_upload"],
                chart_type: "line",
                period: "hour",
                stat_types: "mean",
                hide_legend: false,
                days_to_show: 3,
            },
        },
    },
    locks: {
        icon: "hass:lock",
        name: "Door Locks",
        data: {
            title: "Door Locks",
            timeout: 60000,
            content: {
                type: "custom:auto-entities",
                card: {
                    type: "custom:layout-card",
                    layout_type: "custom:grid-layout",
                    layout: {
                        margin: 0,
                        "grid-template-columns": "1fr",
                        "grid-gap": "var(--sq-dialog-grid-gap)",
                    },
                },
                card_param: "cards",
                filter: {
                    include: [
                        {
                            group: "lock.all_door_locks",
                            sort: {
                                method: "friendly_name",
                                ignore_case: true,
                            },
                            options: {
                                type: "custom:smartqasa-lock-tile",
                                group: "lock.all_door_locks",
                                tileType: "lock",
                            },
                        },
                    ],
                },
            },
        },
    },
    robots: {
        icon: "hass:robot-vacuum-variant",
        name: "Robots",
        data: {
            title: "Robots",
            timeout: 60000,
            content: {
                type: "custom:auto-entities",
                card: {
                    type: "custom:layout-card",
                    layout_type: "custom:grid-layout",
                    layout: {
                        margin: 0,
                        "grid-template-columns": "1fr",
                        "grid-gap": "var(--sq-dialog-grid-gap)",
                    },
                },
                card_param: "cards",
                filter: {
                    include: [
                        {
                            domain: "vacuum",
                            sort: {
                                method: "friendly_name",
                                ignore_case: true,
                            },
                            options: {
                                type: "custom:smartqasa-robot-tile",
                            },
                        },
                    ],
                },
            },
        },
    },
    sensors_doors: {
        icon: "hass:door-open",
        name: "Door Sensors",
        data: {
            title: "Door Sensors",
            timeout: 60000,
            content: {
                type: "custom:auto-entities",
                card: {
                    type: "custom:layout-card",
                    layout_type: "custom:grid-layout",
                    layout: {
                        margin: 0,
                        "grid-template-columns": "1fr",
                        "grid-gap": "var(--sq-dialog-grid-gap)",
                    },
                },
                card_param: "cards",
                filter: {
                    include: [
                        {
                            group: "binary_sensor.all_door_sensors",
                            sort: {
                                method: "friendly_name",
                                ignore_case: true,
                            },
                            options: {
                                type: "custom:smartqasa-sensor-tile",
                            },
                        },
                    ],
                },
            },
        },
    },
    sensors_windows: {
        icon: "hass:window-open",
        name: "Window Sensors",
        data: {
            title: "Window Sensors",
            timeout: 60000,
            content: {
                type: "custom:auto-entities",
                card: {
                    type: "custom:layout-card",
                    layout_type: "custom:grid-layout",
                    layout: {
                        margin: 0,
                        "grid-template-columns": "1fr",
                        "grid-gap": "var(--sq-dialog-grid-gap)",
                    },
                },
                card_param: "cards",
                filter: {
                    include: [
                        {
                            group: "binary_sensor.all_window_sensors",
                            sort: {
                                method: "friendly_name",
                                ignore_case: true,
                            },
                            options: {
                                type: "custom:smartqasa-sensor-tile",
                            },
                        },
                    ],
                },
            },
        },
    },
    thermostats: {
        icon: "hass:thermometer-lines",
        name: "Thermostats",
        data: {
            title: "Thermostats",
            timeout: 60000,
            content: {
                type: "custom:auto-entities",
                card: {
                    type: "custom:layout-card",
                    layout_type: "custom:grid-layout",
                    layout: {
                        margin: 0,
                        "grid-template-columns": "1fr",
                        "grid-gap": "var(--sq-dialog-grid-gap)",
                    },
                },
                card_param: "cards",
                filter: {
                    include: [
                        {
                            domain: "climate",
                            sort: {
                                method: "friendly_name",
                                ignore_case: true,
                            },
                            options: {
                                type: "custom:smartqasa-thermostat-tile",
                            },
                        },
                    ],
                },
            },
        },
    },
};

export default dialogTable;
