import { LitElement, html } from "lit";

import styleChipBase from "../styles/chip-basic";

export class SmartQasaThermostatChip extends LitElement {
  _hass;

  static get properties() {
    return {
      _entity: { state: true },
      _stateObj: { state: true },
    };
  }

  setConfig(config) {
    if (config.entity) {
      this._entity = config.entity;
    } else {
      throw new Error("You need to specify an entity");
    }
  }

  set hass(hass) {
    this._hass = hass;
    this._stateObj = this._hass.states[this._entity];
  }

  static styles = styleChipBase;

  render() {
    const icon = "hass:thermometer-lines";
    let iconColor, temperature;
    const actionColor = {
      cooling: "var(--sq-climate-cool-rgb, 0, 0, 255)",
      heating: "var(--sq-climate-heat-rgb, 255, 0, 0)",
      fan_only: "var(--sq-climate-fan_only-rgb, 0, 255, 0)",
      idle: "var(--sq-primary-text-rgb, 128, 128, 128)",
      off: "var(--sq-inactive-rgb, 128, 128, 128)",
      default: "var(--sq-unavailable-rgb, 255, 0, 255)",
    };
    if (this._stateObj) {
      const hvacAction = this._stateObj.attributes.hvac_action;
      iconColor = actionColor[hvacAction] || actionColor.default;
      temperature = this._stateObj.attributes.current_temperature ?? "??";
    } else {
      iconColor = actionColor.default;
      temperature = "??";
    }

    return html`
      <div class="container" @click=${this._showDialog}>
        <div
          class="icon"
          id="icon"
          style="
            color: rgb(${iconColor});
          "
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="text">${temperature}°</div>
      </div>
    `;
  }

  _showDialog(e) {
    e.stopPropagation();
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId: this._entity },
    });
    this.dispatchEvent(event);
  }
}

customElements.define("smartqasa-thermostat-chip", SmartQasaThermostatChip);
window.customCards.push({
  type: "smartqasa-thermostat-chip",
  name: "SmartQasa Thermostat Chip",
  preview: true,
  description: "A SmartQasa chip for controlling a thermostat entity.",
});
