import { version } from "../package.json";

declare global {
  interface Window {
    browser_mod?: {
      service: (service: string, data?: object) => void;
    };
    customCards: Array<Object>;
    fully?: {
      startApplication: (packageName: string) => void;
    };
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
import "./tiles/light-editor";
import "./tiles/lock";
import "./tiles/routine";
import "./tiles/shade";
import "./tiles/switch";
import "./tiles/thermostat";

console.info(`%cSmartQasa - ${version}`, "background-color: #a0a0a0; color: #0000ff; font-weight: 700;");