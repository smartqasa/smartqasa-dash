import { HomeAssistant } from "../types";

interface ServiceContext {
    hass: HomeAssistant;
    stateObj?: any; // Replace `any` with the actual type of stateObj if known
}

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
