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
      dismissable: true,
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
};

export default dialogTable;