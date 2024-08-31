// Import global types and interfaces
import { deviceType } from "./utils/device-info";
import { ScreenSaver } from "./misc/screen-saver";
import { version } from "../package.json";

// Global Declarations
declare global {
    interface Window {
        browser_mod?: {
            service: (service: string, data?: object) => void;
        };
        customCards: Array<Object>;
        fully?: {
            startApplication: (packageName: string) => void;
        };
        smartqasa: {
            homePath?: string;
            startArea?: string;
            menuConfig?: any;
            viewMode: "area" | "entertain";
        };
    }

    interface WindowEventMap {
        "open-confirmation-popup": CustomEvent;
    }
}

// Initialize SmartQasa
window.smartqasa = window.smartqasa || {};
window.smartqasa.homePath = window.smartqasa.homePath || location.pathname.split("/").pop();
window.smartqasa.startArea = window.smartqasa.startArea || location.pathname.split("/").pop();

// Import all the components
import "./cards/horizontal-stack";
import "./cards/panel";
import "./cards/vertical-stack";
import "./cards/tv-remote";
import "./chips/custom";
import "./chips/dialog";
import "./chips/motion";
import "./chips/navigate";
import "./chips/routine";
import "./chips/select";
import "./chips/thermostat";
import "./chips/weather";
import "./dialogs/pin-verify";
import "./dialogs/more-info";
import "./misc/area-picture";
import "./misc/panel-footer";
import "./misc/time-date";
import "./misc/title";
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
import "./tiles/option";
import "./tiles/robot";
import "./tiles/roku";
import "./tiles/routine";
import "./tiles/select";
import "./tiles/sensor";
import "./tiles/pool-light";
import "./tiles/pool-light-sequencer";
import "./tiles/shade";
import "./tiles/switch";
import "./tiles/theme";
import "./tiles/thermostat";
import "./utils/popup-confirmation";

// Initialize Screen Saver
if (deviceType === "tablet") {
    const screenSaver = new ScreenSaver();
    screenSaver.initScreenSaver(); // Initialize the screen saver logic
}

// Log Version
console.info(`%c SmartQasa ⏏ ${version} `, "background-color: #0000ff; color: #ffffff; font-weight: 700;");
