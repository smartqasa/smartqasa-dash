import { HassEntity, HomeAssistant } from '../types';

export const formatState = (hass: HomeAssistant, entity: string): string => {
    const stateObj: HassEntity = hass?.states[entity];
    if (!stateObj) return 'Unknown State';

    let stateFmtd: string = hass.formatEntityState(stateObj);

    const domain = stateObj.entity_id.split('.')[0];
    const state = stateObj.state;

    switch (domain) {
        case 'binary_sensor':
            stateFmtd += stateObj.attributes.battery_level
                ? ' - ' +
                  hass.formatEntityAttributeValue(stateObj, 'battery_level')
                : '';
            break;

        case 'climate':
            if (state !== 'off') {
                if (stateObj.attributes.current_temperature) {
                    stateFmtd += ` - ${stateObj.attributes.current_temperature}°`;
                }
                if (stateObj.attributes.current_humidity) {
                    stateFmtd += ` / ${stateObj.attributes.current_humidity}%`;
                }
            }
            break;

        case 'cover':
            stateFmtd +=
                state === 'open' && stateObj.attributes.current_position
                    ? ' - ' +
                      hass.formatEntityAttributeValue(
                          stateObj,
                          'current_position'
                      )
                    : '';
            break;

        case 'fan':
            stateFmtd +=
                state === 'on' && stateObj.attributes.percentage
                    ? ' - ' +
                      hass.formatEntityAttributeValue(stateObj, 'percentage')
                    : '';
            break;

        case 'light':
            stateFmtd +=
                state === 'on' && stateObj.attributes.brightness
                    ? ' - ' +
                      hass.formatEntityAttributeValue(stateObj, 'brightness')
                    : '';
            break;

        case 'media_player':
            stateFmtd +=
                state === stateObj.attributes.volume_level
                    ? ' - ' +
                      hass.formatEntityAttributeValue(stateObj, 'volume_level')
                    : '';
            break;

        case 'vacuum':
            stateFmtd += stateObj.attributes.battery_level
                ? ' - ' +
                  hass.formatEntityAttributeValue(stateObj, 'battery_level')
                : '';
            break;

        case 'water_heater':
            stateFmtd +=
                state !== 'off' && stateObj.attributes.brightness
                    ? ' - ' +
                      hass.formatEntityAttributeValue(stateObj, 'temperature')
                    : '';
            break;
    }

    return stateFmtd;
};
