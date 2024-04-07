export const showMoreInfo = (entityId: string, dispatchEvent: Function) => {
  const event = new CustomEvent("hass-more-info", {
    bubbles: true,
    composed: true,
    detail: { entityId },
  });
  dispatchEvent(event);
};