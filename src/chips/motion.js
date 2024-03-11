import { LitElement, html } from "lit";

import styleChipBase from "../styles/chip-basic";

export class SmartQasaMotionChip extends LitElement {
  _hass;

  static get properties() {
    return {
      _entity: { state: true },
      _stateObj: { state: true },
      _name: { state: true },
    };
  }

  setConfig(config) {
    this._entity = config.entity;
    this._name = config.name;
  }

  set hass(hass) {
    this._hass = hass;
    this._stateObj = this._hass.states[this._entity];
  }

  static styles = styleChipBase;

  render() {
    if (!this._entity) {
      return html``;
    }

    let icon, iconColor, state;
    if (this._stateObj) {
      state = this._stateObj.state;
      switch (state) {
        case "on":
          icon = "hass:motion-sensor";
          iconColor = "var(--sq-primary-font-rgb, 128, 128, 128)";
          break;
        case "off":
          icon = "hass:motion-sensor-off";
          iconColor = "var(--sq-red-rgb, 255, 0, 0)";
          break;
        default:
          icon = "hass:motion-sensor-off";
          iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
          break;
      }
    } else {
      icon = "hass:motion-sensor-off";
      iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
    }
    const containerStyle = this._name
      ? null
      : "grid-template-areas: 'i'; grid-column-gap: 0; justify-content: center;";

    return html`
      <div
        class="container"
        style="${containerStyle}"
        @click=${this._toggleEntity}
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
        <div class="text">${this._name}</div>
      </div>
    `;
  }

  _toggleEntity(e) {
    e.stopPropagation();
    this._hass.callService("homeassistant", "toggle", {
      entity_id: this._entity,
    });
  }
}

customElements.define("smartqasa-motion-chip", SmartQasaMotionChip);
window.customCards.push({
  type: "smartqasa-motion-chip",
  name: "SmartQasa Motion Sensor Chip",
  preview: true,
  description: "A SmartQasa chip for toggling an motion sensor entity.",
});
