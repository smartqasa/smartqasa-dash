import { PropertyValues } from "lit";
import { HomeAssistant, LovelaceCardConfig } from "../types";

/**
 * Utility function to determine if a component should update.
 *
 * @param changedProps - The PropertyValues object from LitElement's `shouldUpdate` or `updated` methods.
 * @param config - The configuration object of the component.
 * @param entity - The entity identifier string.
 * @param hass - The HomeAssistant object.
 * @param stateObj - The current state object being tracked.
 * @returns boolean - Returns true if the component should update.
 */
export function shouldComponentUpdate(
    changedProps: PropertyValues,
    config: LovelaceCardConfig | undefined,
    entity: string | undefined,
    hass: HomeAssistant | undefined,
    stateObj: any
): boolean {
    if (!config) return false;

    const hasHassChanged = changedProps.has("hass") && entity && hass?.states[entity] !== stateObj;
    const hasConfigChanged = changedProps.has("_config");

    return !!(hasHassChanged || hasConfigChanged);
}
