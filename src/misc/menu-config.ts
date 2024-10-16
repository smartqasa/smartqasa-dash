export const menuConfig = async (): Promise<any> => {
  const config = {
    title: "Menu",
    timeout: 120000,
    content: {
      type: "custom:smartqasa-menu-card",
    },
  };

  window.smartqasa.menuConfig = config;

  return config;
};
