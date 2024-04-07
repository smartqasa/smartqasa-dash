export const showGroupEntities = (entityId: string, name: string, dispatchEvent: Function) => {
    const data: any = {
      title: name,
      timeout: 60000,
      content: {/* Your content object */},
    };
    window.browser_mod?.service("popup", data);
  };