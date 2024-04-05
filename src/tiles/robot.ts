import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import styleTileBase from "../styles/tile-base";
import styleTileState from "../styles/tile-state";
import styleTileIconBlink from "../styles/tile-icon-blink";

interface Config extends LovelaceCardConfig {
  entity: string;
  name?: string;
}

@customElement("smartqasa-robot-tile")
export class RobotTile extends LitElement {
  @state() private _config?: Config;
  @state() private _icon: string = "hass:robot-vacuum-variant";
  @state() private _iconAnimation: string = "none";
  @state() private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
  @state() private _name: string = "Loading...";
  @state() private _stateFmtd: string = "Loading...";
  @state() private _stateObj?: HassEntity;

  private _hass: any;

  static styles: CSSResultGroup = [styleTileBase, styleTileState, styleTileIconBlink];

  setConfig(config: Config): void {
    if (!config.entity || config.entity.split('.')[0] != "cover") throw new Error("A valid cover entity is required.");
    this._config = config;
    if (this._hass) this.hass = this._hass;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._stateObj = this._config?.entity ? this._hass.states[this._config.entity] : undefined;
    this._updateState();
  }

  private _updateState(): void {
    if (this._stateObj) {
      const state = this._stateObj.state || "unknown";
      switch (state) {
        case "cleaning":
          this._icon = "hass:robot-vacuum-variant";
          this._iconAnimation = "none";
          this._iconColor = "var(--sq-vacuum-cleaning-rgb, 0, 150, 136)";
          break;
        case "docked":
          this._icon = "hass:robot-vacuum-variant";
          this._iconAnimation = "blink 2.0s linear infinite";
          this._iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
          break;
        case "idle":
          this._icon = "hass:robot-vacuum-variant";
          this._iconAnimation = "blink 2.0s linear infinite";
          this._iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
          break;
        case "paused":
          this._icon = "hass:robot-vacuum-variant";
          this._iconAnimation = "none";
          this._iconColor = "var(--sq-vacuum-paused-rgb, 0, 150, 136)";
          break;
        case "returning":
          this._icon = "hass:robot-vacuum-variant";
          this._iconAnimation = "blink 2.0s linear infinite";
          this._iconColor = "var(--sq-vacuum-returning-rgb, 0, 150, 136)";
          break;
        default:
          this._icon = "hass:robot-vacuum-variant-alert";
          this._iconAnimation = "none";
          this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
          break;
      }
      this._stateFmtd =
        this._hass.formatEntityState(this._stateObj) +
        (state === "open" && this._stateObj.attributes.current_position
          ? " - " +
            this._hass.formatEntityAttributeValue(
              this._stateObj,
              "current_position"
            )
          : "");
      this._name = this._config?.icon || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
    } else {
      this._icon = "hass:robot-vacuum-variant-alert";
      this._iconAnimation = "none";
      this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
      this._name = this._name || "Unknown";
      this._stateFmtd = "Unavailable";
    }
  }

  protected render(): TemplateResult {
    return html`
      <div class="container" @click=${this._showMoreInfo}>
        <div
          class="icon"
          @click=${this._toggleVacuum}
          style="
            color: rgb(${this._iconColor});
            background-color: rgba(${this._iconColor}, var(--sq-icon-opacity, 0.2));
            animation: ${this._iconAnimation};
          "
        >
          <ha-icon .icon=${this._icon}></ha-icon>
        </div>
        <div class="name">${this._name}</div>
        <div class="state">${this._stateFmtd}</div>
      </div>
    `;
  }

  private _toggleVacuum(e: Event): void {
    e.stopPropagation();
    if (this._stateObj) {
      const state = this._stateObj.state
      this._hass.callService(
        "vacuum",
        state == "docked" || "idle" || "paused" ? "start" : "pause",
        { entity_id: this._stateObj.entity_id }
      );
    }
  }

  private _showMoreInfo(e: Event): void {
    e.stopPropagation();
    if (this._stateObj) {
      const event = new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: this._stateObj.entity_id },
      });
      this.dispatchEvent(event);
    }
  }

  getCardSize(): number {
    return 1;
  }
}

window.customCards.push({
  type: "smartqasa-robot-tile",
  name: "SmartQasa Robot Tile",
  preview: true,
  description: "A SmartQasa tile for controlling a robot vacuum entity.",
});
