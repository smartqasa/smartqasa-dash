declare global {
  interface Window {
    customCards: Array<Object>;
  }
}

window.customCards = window.customCards ?? [];

import "./tiles/all-off";
import "./tiles/fan";
import "./tiles/light";
