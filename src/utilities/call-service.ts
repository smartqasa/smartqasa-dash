import { HomeAssistant } from "../types";

export const callService = async (
    hass: HomeAssistant | undefined,
    domain: string,
    service: string,
    serviceData: Record<string, any>
): Promise<void> => {
    if (!hass) {
        console.error(
            `Error calling ${domain}.${service}:`,
            "Connection to Home Assistant is not available."
        );
        return;
    }
    try {
        await hass.callService(domain, service, serviceData);
    } catch (error) {
        console.error(`Error calling ${domain}.${service}:`, error);
    }
};
