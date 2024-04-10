export const thermostatIcons: Record<string, string> = {
    auto: "hass:thermostat-auto",
    cool: "hass:snowflake",
    heat: "hass:fire",
    heat_cool: "hass:sun-snowflake-variant",
    off: "hass:power",
    default: "hass:thermostat-cog",
};

export const thermostatColors: Record<string, string> = {
    cooling: "var(--sq-climate-cool-rgb, 3, 169, 244)",
    heating: "var(--sq-climate-heat-rgb, 250, 67, 54)",
    fan_only: "var(--sq-climate-fan_only-rgb, 0, 255, 0)",
    idle: "var(--sq-primary-font-rgb, 128, 128, 128)",
    off: "var(--sq-inactive-rgb, 128, 128, 128)",
    default: "var(--sq-unavailable-rgb, 255, 0, 255)",
};
