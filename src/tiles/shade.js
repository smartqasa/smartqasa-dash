import { LitElement, html } from "lit";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";

export class SmartQasaShadeTile extends LitElement {
  _hass;

  static get properties() {
    return {
      _entity: { state: true },
      _stateObj: { state: true },
      _icon: { state: true },
      _name: { state: true },
      _tilt: { state: true },
    };
  }

  setConfig(config) {
    if (config.entity) {
      this._entity = config.entity;
      this._name = config.name;
      this._tilt = config.tilt ?? 100;
    } else {
      throw new Error("You must specify an entity");
    }
  }

  set hass(hass) {
    this._hass = hass;
    this._stateObj = this._hass.states[this._entity];
  }

  static styles = [styleTileBase, styleTileState];

  render() {
    let icon, iconColor, name, stateFmtd;
    if (this._stateObj) {
      const state = this._stateObj.state;
      switch (state) {
        case "closed":
          icon = "hass:roller-shade-closed";
          iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
          break;
        case "closing":
          icon = "hass:arrow-down-box";
          iconColor = "var(--sq-shade-closing-rgb, 146, 107, 199)";
          break;
        case "opening":
          icon = "hass:arrow-up-box";
          iconColor = "var(--sq-shade-opening-rgb, 146, 107, 199)";
          break;
        case "open":
          icon = "hass:roller-shade";
          iconColor = "var(--sq-shade-open-rgb, 146, 107, 199)";
          break;
        default:
          icon = "hass:alert-rhombus";
          iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
          break;
      }
      stateFmtd =
        this._hass.formatEntityState(this._stateObj) +
        (state === "open" && this._stateObj.attributes.current_position
          ? " - " +
            this._hass.formatEntityAttributeValue(
              this._stateObj,
              "current_position"
            )
          : "");
      name =
        this._name ?? this._stateObj.attributes.friendly_name ?? this._entity;
    } else {
      icon = "hass:alert-rhombus";
      iconColor = "var(--sq-unavailable-rgb)";
      name = this._name ?? "Unknown";
      stateFmtd = "Unknown";
    }

    return html`
      <div class="ha-card" @click=${this._showMoreInfo}>
        <div
          class="icon"
          @click=${this._toggleEntity}
          style="
                    color: rgb(${iconColor});
                    background-color: rgba(${iconColor}, var(--sq-icon-opacity));
                    "
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
        <div class="state">${stateFmtd}</div>
      </div>
    `;
  }

  _toggleEntity(e) {
    e.stopPropagation();
    if (this._tilt > 0 && this._tilt <= 100) {
      if (this._stateObj.attributes.current_position < this._tilt) {
        this._hass.callService("cover", "set_cover_position", {
          entity_id: this._entity,
          position: this._tilt,
        });
      } else {
        this._hass.callService("cover", "set_cover_position", {
          entity_id: this._entity,
          position: 0,
        });
      }
    } else {
      this.hass.callService("cover", "toggle", { entity_id: this._entity });
    }
  }

  _showMoreInfo(e) {
    e.stopPropagation();
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId: this._entity },
    });
    this.dispatchEvent(event);
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("smartqasa-shade-tile", SmartQasaShadeTile);
window.customCards.push({
  type: "smartqasa-shade-tile",
  name: "SmartQasa Shade Tile",
  preview: true,
  description: "A SmartQasa tile for controlling a window shade entity.",
});
