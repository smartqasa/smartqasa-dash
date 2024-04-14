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
        smartqasa: { deviceType?: string };
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
import "./misc/footer";
import "./misc/more-info";
import "./misc/time-date";

// Tiles
import "./tiles/all-off";
import "./tiles/app";
import "./tiles/area";
import "./tiles/dialog";
import "./tiles/fan";
import "./tiles/garage";
import "./tiles/heater";
import "./tiles/light";
import "./tiles/light-editor";
import "./tiles/lock";
import "./tiles/robot";
import "./tiles/roku";
import "./tiles/routine";
import "./tiles/select";
import "./tiles/sensor";
import "./tiles/shade";
import "./tiles/switch";
import "./tiles/thermostat";

console.info(`%c SmartQasa ⏏ ${version} `, "background-color: #0000ff; color: #ffffff; font-weight: 700;");
