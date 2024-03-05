import { SmartQasaFanTile } from './tiles/fan-tile';
customElements.define('smartqasa-fan-tile', SmartQasaFanTile);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'smartqasa-fan-tile',
  name: 'SmartQasa Fan Tile',
  preview: true,
  description: 'A SmartQasa tile for controlling a fan entity.',
});

import { SmartQasaLightTile } from './tiles/light-tile';
customElements.define('smartqasa-light-tile', SmartQasaLightTile);
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'smartqasa-light-tile',
    name: 'SmartQasa Light Tile',
    description: 'A SmartQasa tile for controlling a light entity.',
});

import { SmartQasaSwitchTile } from './tiles/switch-tile';
customElements.define('smartqasa-switch-tile', SmartQasaSwitchTile);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'smartqasa-switch-tile',
  name: 'SmartQasa Switch Tile',
  preview: true,
  description: 'A SmartQasa tile for toggling an entity.',
});