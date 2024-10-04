import { HassEntity, HomeAssistant } from "../types";

export const formatState = (stateObj: HassEntity, hass: HomeAssistant): string => {
    const entity = stateObj.entity_id;
    const domain = entity.split(".")[0];

    let stateFmtd = hass.formatEntityState(stateObj);
    stateFmtd +=
        stateObj.state === "on" && stateObj.attributes.brightness
            ? " - " + hass.formatEntityAttributeValue(stateObj, "brightness")
            : "";

    return stateFmtd;
};
