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
            menuTab: number;
            viewMode: "area" | "entertain";
            service: (service: string, data?: object) => void;
        };
    }
}

window.smartqasa = window.smartqasa || {};
window.smartqasa.homePath = window.smartqasa.homePath || location.pathname.split("/").pop();
window.smartqasa.startArea = window.smartqasa.startArea || location.pathname.split("/").pop();

import { PopupDialog, PopupData } from "./utils/popup-dialog";

window.smartqasa.service = function (service: string, data?: PopupData) {
    if (service === "popup") {
        const popup = document.createElement("smartqasa-popup-dialog") as PopupDialog;

        if (data?.title) popup.title = data.title;
        if (data?.size) popup.size = data.size;
        if (data?.timeout) popup.timeout = data.timeout;
        if (data?.card) popup.card = data.card;

        document.body.appendChild(popup);

        popup.addEventListener("smartqasa-popup-close", () => {
            document.body.removeChild(popup);
        });
    } else if (service === "popup_close") {
        console.log("Closing popup via service");
        const popup = document.querySelector("smartqasa-popup-dialog");
        if (popup) {
            console.log("Popup found, dispatching close event");
            popup.dispatchEvent(new CustomEvent("smartqasa-popup-close"));
        } else {
            console.warn("No popup found to close");
        }
    } else {
        console.warn(`Service ${service} is not implemented in smartqasa.`);
    }
};

window.customCards = window.customCards ?? [];

// Test
import "./tiles/light-test";

// Cards
import "./cards/grid-stack";
import "./cards/group-stack";
import "./cards/horizontal-stack";
import "./cards/menu";
import "./cards/more-info";
import "./cards/panel";
import "./cards/pin-verify";
import "./cards/screensaver";
import "./cards/vertical-stack";
import "./cards/tv-remote";
import "./cards/weather";

// Chips
import "./chips/admin";
import "./chips/custom";
import "./chips/dialog";
import "./chips/motion";
import "./chips/navigate";
import "./chips/routine";
import "./chips/select";
import "./chips/thermostat";
import "./chips/weather";

// Tiles
import "./tiles/action";
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

import "./utils/popup-dialog";

// Log version info
import { version } from "../package.json";
console.info(`%c SmartQasa ⏏ ${version} `, "background-color: #0000ff; color: #ffffff; font-weight: 700;");
