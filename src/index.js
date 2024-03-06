import { SmartQasaAllOffTile } from './tiles/all-off-tile';
customElements.define('smartqasa-all-off-tile', SmartQasaAllOffTile);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'smartqasa-all-off-tile',
  name: 'SmartQasa All Off Tile',
  preview: true,
  description: 'A SmartQasa tile for turning off all light and fan entities in an area..'
});

import { SmartQasaAreaTile } from './tiles/area-tile';
customElements.define('smartqasa-area-tile', SmartQasaAreaTile);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'smartqasa-area-tile',
  name: 'SmartQasa Area Tile',
  preview: true,
  description: 'A SmartQasa tile for navigating to an area or a specific dashboard view.'
});

import { SmartQasaFanTile } from './tiles/fan-tile';
customElements.define('smartqasa-fan-tile', SmartQasaFanTile);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'smartqasa-fan-tile',
  name: 'SmartQasa Fan Tile',
  preview: true,
  description: 'A SmartQasa tile for controlling a fan entity.'
});

// Garage Tile //
import { SmartQasaGarageTile } from './tiles/garage-tile';
customElements.define('smartqasa-garage-tile', SmartQasaGarageTile);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'smartqasa-garage-tile',
  name: 'SmartQasa Garage Tile',
  preview: true,
  description: 'A SmartQasa tile for controlling a garage cover entity.'
});

import { SmartQasaLightTile } from './tiles/light-tile';
customElements.define('smartqasa-light-tile', SmartQasaLightTile);
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'smartqasa-light-tile',
    name: 'SmartQasa Light Tile',
    description: 'A SmartQasa tile for controlling a light entity.'
});

import { SmartQasaLockTile } from './tiles/lock-tile';
customElements.define('smartqasa-lock-tile', SmartQasaLockTile);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'smartqasa-lock-tile',
  name: 'SmartQasa Lock Tile',
  preview: true,
  description: 'A SmartQasa tile for controlling a lock entity.'
});

import { SmartQasaRoutineTile } from './tiles/routine-tile';
customElements.define('smartqasa-routine-tile', SmartQasaRoutineTile);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'smartqasa-routine-tile',
  name: 'SmartQasa Routine Tile',
  preview: true,
  description: 'A SmartQasa tile for triggering an automation, scene, or script entity.',
});

import { SmartQasaSwitchTile } from './tiles/switch-tile';
customElements.define('smartqasa-switch-tile', SmartQasaSwitchTile);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'smartqasa-switch-tile',
  name: 'SmartQasa Switch Tile',
  preview: true,
  description: 'A SmartQasa tile for toggling an entity.'
});
