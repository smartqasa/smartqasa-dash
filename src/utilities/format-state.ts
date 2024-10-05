import { HassEntity, HomeAssistant } from "../types";

export const formatState = (stateObj: HassEntity, hass: HomeAssistant): string => {
    if (typeof hass.formatEntityState !== "function") {
        return "N/A";
    }

    const domain = stateObj.entity_id.split(".")[0];

    let stateFmtd: string = hass.formatEntityState(stateObj);

    switch (domain) {
        case "climate":
            if (stateObj.state !== "off") {
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
                stateObj.state === "open" && stateObj.attributes.current_position
                    ? " - " + hass.formatEntityAttributeValue(stateObj, "current_position")
                    : "";
            break;

        case "fan":
            stateFmtd +=
                stateObj.state === "on" && stateObj.attributes.percentage
                    ? " - " + hass.formatEntityAttributeValue(stateObj, "percentage")
                    : "";
            break;

        case "light":
            stateFmtd +=
                stateObj.state === "on" && stateObj.attributes.brightness
                    ? " - " + hass.formatEntityAttributeValue(stateObj, "brightness")
                    : "";
            break;
    }

    return stateFmtd;
};
