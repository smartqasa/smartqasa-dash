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
    let iconColor, text;
    if (this._stateObj) {
      const hvacAction = this._stateObj.attributes.hvac_action;
      switch (hvacAction) {
        case "cooling":
          iconColor = "rgb(var(--sq-climate-cool-rgb), 0, 0, 255)";
          break;
        case "heating":
          iconColor = "rgb(var(--sq-climate-heat-rgb), 255, 0, 0)";
          break;
        case "fan_only":
          iconColor = "rgb(var(--sq-primary-text-rgb), 128, 128, 128)";
          break;
        case "off":
          iconColor = "rgb(var(--sq-inactive-rgb), 128, 128, 128)";
          break;
        default:
          iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
          break;
      }
      text = this._stateObj.attributes.current_temperature + "°";
    } else {
      iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
      text = "??°";
    }

    return html`
      <div
        class="container"
        style="${containerStyle}"
        @click=${this._showDialog}
      >
        <div
          class="icon"
          id="icon"
          style="
            color: rgb(${iconColor});
          "
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="text">${text}</div>
      </div>
    `;
  }

  _showDialog(e) {
    e.stopPropagation();
  }
}

customElements.define("smartqasa-thermostat-chip", SmartQasaThermostatChip);
window.customCards.push({
  type: "smartqasa-thermostat-chip",
  name: "SmartQasa Thermostat Chip",
  preview: true,
  description: "A SmartQasa chip for controlling a thermostat entity.",
});
