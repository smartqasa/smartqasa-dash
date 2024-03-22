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

// Misc
import "./misc/time-date";

// Tiles
import "./tiles/all-off";
import "./tiles/app";
import "./tiles/fan";
import "./tiles/garage";
import "./tiles/light";
import "./tiles/lock";
import "./tiles/routine";
import "./tiles/shade";
import "./tiles/switch";