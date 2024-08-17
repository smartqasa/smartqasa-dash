import { HomeAssistant } from "../types";

export const callService = async (
    context: any,
    domain: string,
    service: string,
    serviceData: Record<string, any>
): Promise<void> => {
    if (!context.hass) {
        console.error(`Error calling ${domain}.${service}:`, "Connection to Home Assistant is not available.");
        return;
    }
    if (!context._stateObj) {
        console.error(`Error calling ${domain}.${service}:`, "The entity state object is not available.");
        return;
    }

    try {
        await context.hass.callService(domain, service, serviceData);
    } catch (error) {
        console.error(`Error calling ${domain}.${service}:`, error);
    }
};
