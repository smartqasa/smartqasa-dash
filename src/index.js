window.smartqasa = window.smartqasa ?? {};
window.smartqasa.deviceType =
  typeof window.screen.width !== "number"
    ? "tablet"
    : window.screen.width < 600
    ? "phone"
    : "tablet";

window.customCards = window.customCards ?? [];

// Tiles
import { SmartQasaAllOffTile } from "./tiles/all-off";
import { SmartQasaAppTile } from "./tiles/app";
import { SmartQasaAreaTile } from "./tiles/area";
import { SmartQasaFanTile } from "./tiles/fan";
import { SmartQasaGarageTile } from "./tiles/garage";
import { SmartQasaLightTile } from "./tiles/light";
import { SmartQasaLockTile } from "./tiles/lock";
import { SmartQasaRoutineTile } from "./tiles/routine";
import { SmartQasaShadeTile } from "./tiles/shade";
import { SmartQasaSwitchTile } from "./tiles/switch";

// Chips
import { SmartQasaMotionChip } from "./chips/motion";
import { SmartQasaNavigateChip } from "./chips/navigate";
import { SmartQasaThermostatChip } from "./chips/thermostat";

// Misc
import { SmartQasaTimeCard } from "./misc/time-card";
import { SmartQasaAreaImageCard } from "./misc/area-image-card";
