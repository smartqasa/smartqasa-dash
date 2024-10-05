window.smartqasa = window.smartqasa || {};
window.smartqasa.viewMode = "control";
window.smartqasa.startArea = window.smartqasa.startArea || location.pathname.split("/").pop();

window.customCards = window.customCards ?? [];

// Utility Imports
import { loadYamlAsJson } from "./utilities/load-yaml-as-json";
import { LovelaceCardConfig } from "./types";

// Function to display a 'blue screen of death' style error
function displayBSoD(errorMessage: string) {
    const bsodStyle = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #0000FF;
        color: #FFFFFF;
        font-family: monospace;
        font-size: 16px;
        padding: 20px;
        box-sizing: border-box;
        z-index: 99999;
        white-space: pre-wrap;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;
    const bsodMessage = `
        A fatal error has occurred in SmartQasa.
        Please contact support.

        Error Details:
        ${errorMessage}
    `;

    const bsodDiv = document.createElement("div");
    bsodDiv.style.cssText = bsodStyle;
    bsodDiv.textContent = bsodMessage;

    document.body.appendChild(bsodDiv);
}

// Async function to initialize everything in one stream
(async function initialize() {
    try {
        // Preload chips config
        window.smartqasa.chipsConfig = [];
        const yamlFilePath = "/local/smartqasa/config/chips.yaml";
        const chipsConfig = await loadYamlAsJson<LovelaceCardConfig[]>(yamlFilePath);
        window.smartqasa.chipsConfig = chipsConfig;

        // Load all other required modules in sequence
        await import("./panel/panel");

        // Cards
        await Promise.all([
            import("./cards/areas"),
            import("./cards/grid-stack"),
            import("./cards/group-stack"),
            import("./cards/horizontal-stack"),
            import("./cards/menu"),
            import("./cards/more-info"),
            import("./cards/pin-verify"),
            import("./cards/screensaver"),
            import("./cards/vertical-stack"),
            import("./cards/tv-remote"),
            import("./cards/weather"),
        ]);

        // Chips
        await Promise.all([
            import("./chips/admin"),
            import("./chips/audio"),
            import("./chips/custom"),
            import("./chips/dialog"),
            import("./chips/motion"),
            import("./chips/navigate"),
            import("./chips/routine"),
            import("./chips/select"),
            import("./chips/thermostat"),
            import("./chips/weather"),
        ]);

        // Tiles
        await Promise.all([
            import("./tiles/action"),
            import("./tiles/all-off"),
            import("./tiles/app"),
            import("./tiles/area"),
            import("./tiles/audio"),
            import("./tiles/dialog"),
            import("./tiles/fan"),
            import("./tiles/garage"),
            import("./tiles/heater"),
            import("./tiles/light"),
            import("./tiles/light-editor"),
            import("./tiles/lock"),
            import("./tiles/option"),
            import("./tiles/robot"),
            import("./tiles/roku"),
            import("./tiles/routine"),
            import("./tiles/select"),
            import("./tiles/sensor"),
            import("./tiles/pool-light"),
            import("./tiles/pool-light-sequencer"),
            import("./tiles/shade"),
            import("./tiles/switch"),
            import("./tiles/theme"),
            import("./tiles/thermostat"),
        ]);

        // Log version info
        const { version } = await import("../package.json");
        console.info(`%c SmartQasa ⏏ ${version} `, "background-color: #0000ff; color: #ffffff; font-weight: 700;");
    } catch (error) {
        // On error, display a 'blue screen of death' with error details
        if (error instanceof Error) {
            displayBSoD(error.message);
        } else {
            displayBSoD("An unknown error occurred.");
        }
    }
})();
