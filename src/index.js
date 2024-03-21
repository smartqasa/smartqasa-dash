window.smartqasa = window.smartqasa ?? {};
window.smartqasa.deviceType =
  typeof window.screen.width !== "number"
    ? "tablet"
    : window.screen.width < 600
    ? "phone"
    : "tablet";

window.customCards = window.customCards ?? [];

// Tiles
import { SmartQasaLightTile } from "./tiles/light";
