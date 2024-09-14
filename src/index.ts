window.smartqasa = window.smartqasa || {};
window.smartqasa.viewMode = "control";
window.smartqasa.startArea = window.smartqasa.startArea || location.pathname.split("/").pop();

window.customCards = window.customCards ?? [];

import { loadYamlAsJson } from "./utils/load-yaml-as-json";
import { LovelaceCardConfig } from "./types";

async function preloadChipsConfig() {
    try {
        const yamlFilePath = "/local/smartqasa/config/chips.yaml";
        const chipsConfig = await loadYamlAsJson<LovelaceCardConfig[]>(yamlFilePath);
        window.smartqasa.chipsConfig = chipsConfig;
        console.info("Preloaded chipsConfig:", window.smartqasa.chipsConfig);
    } catch (error) {
        console.error("Error preloading chipsConfig:", error);
        window.smartqasa.chipsConfig = [];
    }
}

preloadChipsConfig();

// Panel
import "./panel/panel";

// Cards
import "./cards/areas";
import "./cards/grid-stack";
import "./cards/group-stack";
import "./cards/horizontal-stack";
import "./cards/menu";
import "./cards/more-info";
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

// Log version info
import { version } from "../package.json";
console.info(`%c SmartQasa ⏏ ${version} `, "background-color: #0000ff; color: #ffffff; font-weight: 700;");
