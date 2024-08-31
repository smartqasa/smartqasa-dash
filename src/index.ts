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
}

declare global {
    interface WindowEventMap {
        "open-confirmation-popup": CustomEvent;
    }
}

window.smartqasa = window.smartqasa || {};
window.smartqasa.homePath = window.smartqasa.homePath || location.pathname.split("/").pop();
window.smartqasa.startArea = window.smartqasa.startArea || location.pathname.split("/").pop();

window.customCards = window.customCards ?? [];

// Cards
import "./cards/horizontal-stack";
import "./cards/panel";
import "./cards/vertical-stack";
import "./cards/tv-remote";

// Chips
import "./chips/custom";
import "./chips/dialog";
import "./chips/motion";
import "./chips/navigate";
import "./chips/routine";
import "./chips/select";
import "./chips/thermostat";
import "./chips/weather";

// Dialogs
import "./dialogs/pin-verify";
import "./dialogs/more-info";

// Misc
import "./misc/area-picture";
import "./misc/panel-footer";
import "./misc/screen-saver";
import "./misc/time-date";
import "./misc/title";

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

// Utils
import "./utils/popup-confirmation";

// Screen Saver
import { deviceType } from "./utils/device-info";
let idleTimer: number;

function startIdleTimer() {
    idleTimer = window.setTimeout(() => {
        const screenSaver = document.createElement("smartqasa-screen-saver");
        document.body.appendChild(screenSaver);
    }, 10000);
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    const existingScreenSaver = document.querySelector("smartqasa-screen-saver");
    if (existingScreenSaver) {
        existingScreenSaver.remove();
    }
    startIdleTimer();
}

if (deviceType === "tablet") {
    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keypress", resetIdleTimer);

    startIdleTimer();
}

import { version } from "../package.json";
console.info(`%c SmartQasa ⏏ ${version} `, "background-color: #0000ff; color: #ffffff; font-weight: 700;");
