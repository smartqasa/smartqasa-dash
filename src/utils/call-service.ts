import { HomeAssistant } from "../types";

export const callService = async (
    hass: HomeAssistant,
    domain: string,
    service: string,
    serviceData: Record<string, any>
): Promise<void> => {
    try {
        await hass.callService(domain, service, serviceData);
    } catch (error) {
        console.error(`Error calling ${domain}.${service}:`, error);
    }
};
