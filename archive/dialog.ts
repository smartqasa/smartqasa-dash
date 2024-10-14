import { deviceType } from "../src/utils/device-info";

export const listDialogStyle = {
  margin: 0,
  card_margin: 0,
  "grid-template-columns": "1fr",
  "grid-gap": "var(--sq-dialog-grid-gap)",
};

export const gridDialogStyle = {
  margin: 0,
  card_margin: 0,
  "grid-template-columns":
    deviceType === "phone"
      ? "repeat(2, 1fr)"
      : "repeat(3, var(--sq-tile-width-tablet, 20rem))",
  "grid-gap": "var(--sq-dialog-grid-gap)",
};
