import { HassEntity, HomeAssistant } from "../types";

export const formatAvailable = (hass: HomeAssistant): boolean => {
    console.log("formatEntityState: ", typeof hass.formatEntityState);
    console.log("formatEntityAttributeValue: ", typeof hass.formatEntityAttributeValue);
    return !!(
        hass &&
        typeof hass.formatEntityState === "function" &&
        typeof hass.formatEntityAttributeValue === "function"
    );
};

export const formatState = (stateObj: HassEntity, hass: HomeAssistant): string => {
    let stateFmtd: string = hass.formatEntityState(stateObj);

    const domain = stateObj.entity_id.split(".")[0];
    const state = stateObj.state;

    switch (domain) {
        case "climate":
            if (state !== "off") {
                if (stateObj.attributes.current_temperature) {
                    stateFmtd += ` - ${stateObj.attributes.current_temperature}°`;
                }
                if (stateObj.attributes.current_humidity) {
                    stateFmtd += ` / ${stateObj.attributes.current_humidity}%`;
                }
            }
            break;

        case "cover":
            stateFmtd +=
                state === "open" && stateObj.attributes.current_position
                    ? " - " + hass.formatEntityAttributeValue(stateObj, "current_position")
                    : "";
            break;

        case "fan":
            stateFmtd +=
                state === "on" && stateObj.attributes.percentage
                    ? " - " + hass.formatEntityAttributeValue(stateObj, "percentage")
                    : "";
            break;

        case "light":
            stateFmtd +=
                state === "on" && stateObj.attributes.brightness
                    ? " - " + hass.formatEntityAttributeValue(stateObj, "brightness")
                    : "";
            break;
    }

    return stateFmtd;
};
