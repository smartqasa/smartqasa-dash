// Initialize global variables
window.smartqasa = window.smartqasa || {};
window.smartqasa.lightModeImage = lightModeImage;
window.smartqasa.darkModeImage = darkModeImage;
window.smartqasa.startArea =
    window.smartqasa.startArea || location.pathname.split('/').pop();
window.smartqasa.version = __BUILD_VERSION__; // Injected version
window.smartqasa.timestamp = __BUILD_TIMESTAMP__; // Injected timestamp

window.customCards = window.customCards ?? [];

// Utility Imports
import { loadYamlAsJson } from './utilities/load-yaml-as-json';
import { LovelaceCardConfig } from './types';

// Preload assets
// Preload background images
import lightModeImage from './assets/backgrounds/background_light.jpg';
import darkModeImage from './assets/backgrounds/background_dark.jpg';

const preloadImages = [lightModeImage, darkModeImage];
preloadImages.forEach((src) => {
    const img = new Image();
    img.src = src;
});

// Preload YAML configuration (e.g., chips.yaml)
(async function preloadConfigs() {
    const yamlFilePath = '/local/smartqasa/config/chips.yaml';
    try {
        const chipsConfig =
            await loadYamlAsJson<LovelaceCardConfig[]>(yamlFilePath);
        window.smartqasa.chipsConfig = chipsConfig;
    } catch (error) {
        console.error('Failed to preload chips config:', error);
    }
})();

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

    const bsodDiv = document.createElement('div');
    bsodDiv.style.cssText = bsodStyle;
    bsodDiv.textContent = bsodMessage;

    document.body.appendChild(bsodDiv);
}

// Initialize everything in one stream
(async function initialize() {
    try {
        // Load panel and cards
        await import('./panel/panel');

        // Cards
        await Promise.all([
            import('./cards/areas'),
            import('./cards/clean'),
            import('./cards/grid-stack'),
            import('./cards/group-stack'),
            import('./cards/horizontal-stack'),
            import('./cards/light-grid'),
            import('./cards/menu'),
            import('./cards/more-info'),
            import('./cards/pin-verify'),
            import('./cards/screensaver'),
            import('./cards/vertical-stack'),
            import('./cards/tv-remote'),
            import('./cards/weather'),
        ]);

        // Chips
        await Promise.all([
            import('./chips/admin'),
            import('./chips/audio'),
            import('./chips/custom'),
            import('./chips/dialog'),
            import('./chips/motion'),
            import('./chips/navigate'),
            import('./chips/routine'),
            import('./chips/select'),
            import('./chips/thermostat'),
            import('./chips/weather'),
            import('./chips/webpage'),
        ]);

        // Tiles
        await Promise.all([
            import('./tiles/action'),
            import('./tiles/all-off'),
            import('./tiles/app'),
            import('./tiles/area'),
            import('./tiles/audio'),
            import('./tiles/dialog'),
            import('./tiles/fan'),
            import('./tiles/garage'),
            import('./tiles/heater'),
            import('./tiles/light'),
            import('./tiles/light-editor'),
            import('./tiles/lock'),
            import('./tiles/option'),
            import('./tiles/robot'),
            import('./tiles/roku'),
            import('./tiles/routine'),
            import('./tiles/select'),
            import('./tiles/sensor'),
            import('./tiles/pool-light'),
            import('./tiles/pool-light-sequencer'),
            import('./tiles/shade'),
            import('./tiles/switch'),
            import('./tiles/theme'),
            import('./tiles/thermostat'),
            import('./tiles/webpage'),
        ]);

        // Log version info
        console.info(
            `%c SmartQasa ⏏ ${window.smartqasa.version} (Built: ${window.smartqasa.timestamp}) `,
            'background-color: #0000ff; color: #ffffff; font-weight: 700;'
        );
    } catch (error) {
        if (error instanceof Error) {
            displayBSoD(error.message);
        } else {
            displayBSoD('An unknown error occurred.');
        }
    }
})();
