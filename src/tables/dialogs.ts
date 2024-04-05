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
            radius: "0px"
          }
        }
      }
    }
  },
  garages: {
    icon: "hass:garage-variant",
    name: "Garage Doors",
    data: {
      title: "Garage Doors",
      size: "normal",
      timeout: 60000,
      content: {
        type: "custom:auto-entities",
        card: {
          type: "custom:layout-card",
          layout_type: "custom:grid-layout",
          layout: {
            "margin": 0,
            "grid-template-columns": "1fr",
            "grid-gap": "var(--sq-dialog-grid-gap)"
          }
        },
        card_param: "cards",
        filter: {
          include: [
            {
              group: "cover.all_garage_doors",
              sort: {
                method: "friendly_name",
                ignore_case: true
              },
              options: {
                type: "custom:smartqasa-garage-tile"
              }
            }
          ]
        }
      }
    }
  },
  locks: {
    icon: "hass:lock",
    name: "Door Locks",
    data: {
      title: "Door Locks",
      size: "normal",
      timeout: 60000,
      content: {
        type: "custom:auto-entities",
        card: {
          type: "custom:layout-card",
          layout_type: "custom:grid-layout",
          layout: {
            "margin": 0,
            "grid-template-columns": "1fr",
            "grid-gap": "var(--sq-dialog-grid-gap)"
          }
        },
        card_param: "cards",
        filter: {
          include: [
            {
              group: "lock.all_door_locks",
              sort: {
                method: "friendly_name",
                ignore_case: true
              },
              options: {
                type: "custom:smartqasa-lock-tile"
              }
            }
          ]
        }
      }
    }
  },
  thermostats: {
    icon: "hass:thermometer-lines",
    name: "Thermostats",
    data: {
      title: "Thermostats",
      size: "normal",
      timeout: 60000,
      content: {
        type: "custom:auto-entities",
        card: {
          type: "custom:layout-card",
          layout_type: "custom:grid-layout",
          layout: {
            "margin": 0,
            "grid-template-columns": "1fr",
            "grid-gap": "var(--sq-dialog-grid-gap)"
          }
        },
        card_param: "cards",
        filter: {
          include: [
            {
              domain: "climate",
              sort: {
                method: "friendly_name",
                ignore_case: true
              },
              options: {
                type: "custom:smartqasa-thermostat-tile"
              }
            }
          ]
        }
      }
    }
  },
};

export default dialogTable;
