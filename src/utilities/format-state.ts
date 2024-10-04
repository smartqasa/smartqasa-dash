import { HassEntity, HomeAssistant } from "../types";

export const formatState = (stateObj: HassEntity, hass: HomeAssistant): string => {
    const entity = stateObj.entity_id;
    const domain = entity.split(".")[0];

    let stateFmtd: string = hass.formatEntityState(stateObj);

    switch (domain) {
        case "light":
            stateFmtd +=
                stateObj.state === "on" && stateObj.attributes.brightness
                    ? " - " + hass.formatEntityAttributeValue(stateObj, "brightness")
                    : "";
            break;
    }

    return stateFmtd;
};
