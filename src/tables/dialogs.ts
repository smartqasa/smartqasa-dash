interface DialogTable {
    [key: string]: {
        icon: string;
        name: string;
        data: any;
    };
}

// Create common data structure
function createData(title: string, type: string, criteria: string, tileType: string) {
    return {
        title: title,
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
                        [type]: criteria,
                        sort: {
                            method: "friendly_name",
                            ignore_case: true,
                        },
                        options: {
                            type: `custom:smartqasa-${tileType}-tile`,
                            [type]: criteria,
                            tileType: tileType,
                        },
                    },
                ],
            },
        },
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
        data: createData("Garage Doors", "group", "cover.all_garage_doors", "garage"),
    },
    locks: {
        icon: "hass:lock",
        name: "Door Locks",
        data: createData("Door Locks", "group", "lock.all_door_locks", "lock"),
    },
    robots: {
        icon: "hass:robot-vacuum-variant",
        name: "Robots",
        data: createData("Robots", "domain", "vacuum", "robot"),
    },
    sensors_doors: {
        icon: "hass:door-open",
        name: "Door Sensors",
        data: createData("Door Sensors", "group", "binary_sensor.all_door_sensors", "sensor"),
    },
    sensors_windows: {
        icon: "hass:window-open",
        name: "Window Sensors",
        data: createData("Window Sensors", "group", "binary_sensor.all_window_sensors", "sensor"),
    },
    thermostats: {
        icon: "hass:thermostat",
        name: "Thermostats",
        data: createData("Thermostats", "domain", "climate", "thermostat"),
    },
};

export default dialogTable;
