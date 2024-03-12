// SmartQasa - Set global variable for Device type
window.smartqasa = window.smartqasa || {};

// Determine the device type based on screen width
window.smartqasa.deviceType =
  typeof window.screen.width !== "number"
    ? "tablet"
    : window.screen.width < 600
    ? "phone"
    : "tablet";

// Reset Home Path
// window.smartqasa.homePath = 'notSet';
