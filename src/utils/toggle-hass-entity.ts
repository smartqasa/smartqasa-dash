export async function toggleHassEntity(hass: any, entity: any) {
    if (!hass || !entity) return;

    try {
        await hass.callService("homeassistant", "toggle", { entity_id: entity });
    } catch (error) {
        console.error("Failed to toggle the entity:", error);
    }
}
