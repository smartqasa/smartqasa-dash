declare global {
  interface Window {
    customCards: Array<Object>;
    smartqasa: { deviceType?: string; };
  }
}

window.smartqasa = window.smartqasa || {};
if (typeof window.screen.width === "number") {
  window.smartqasa.deviceType = window.screen.width < 600 ? "phone" : "tablet";
} else {
  window.smartqasa.deviceType = "tablet";
}

window.customCards = window.customCards ?? [];

// Chips
import "./chips/motion";
import "./chips/navigate";
import "./chips/thermostat";

// Misc
import "./misc/area-picture";
import "./misc/time-date";

// Tiles
import "./tiles/all-off";
import "./tiles/app";
import "./tiles/area";
import "./tiles/fan";
import "./tiles/garage";
import "./tiles/light";
import "./tiles/lock";
import "./tiles/routine";
import "./tiles/shade";
import "./tiles/switch";

// Tile Editors
import "./tiles/light-editor";
