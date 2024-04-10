export const thermostatIcons: Record<string, string> = {
    auto: "hass:thermometer-auto",
    cool: "hass:snowflake-thermometer",
    heat: "hass:sun-thermometer",
    heat_cool: "hass:thermometer-lines",
    off: "hass:thermometer-off",
    default: "hass:thermometer-alert",
};

export const thermostatColors: Record<string, string> = {
    cooling: "var(--sq-climate-cool-rgb, 0, 0, 255)",
    heating: "var(--sq-climate-heat-rgb, 255, 0, 0)",
    fan_only: "var(--sq-climate-fan_only-rgb, 0, 255, 0)",
    idle: "var(--sq-primary-font-rgb, 128, 128, 128)",
    off: "var(--sq-inactive-rgb, 128, 128, 128)",
    default: "var(--sq-unavailable-rgb, 255, 0, 255)",
};
