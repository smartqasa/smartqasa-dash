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
            margin: 0,
            gridTemplateColumns: "1fr",
            gridGap: "var(--sq-dialog-grid-gap)"
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
};

export default dialogTable;
