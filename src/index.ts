declare global {
  interface Window {
    customCards: Array<Object>;
  }
}

window.customCards = window.customCards ?? [];

import { SmartQasaLightTile } from "./tiles/light";
customElements.define("smartqasa-light-tile", SmartQasaLightTile);
window.customCards.push({
  type: "smartqasa-light-tile",
  name: "SmartQasa Light Tile",
  preview: true,
  description: "A SmartQasa tile for controlling a light entity.",
});
