import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

import styleChipBasic from '../styles/chip-basic';

interface Config extends LovelaceCardConfig {
    entity?: string;
  }

@customElement('smartqasa-thermostat-chip')
export class SmartQasaThermostatChip extends LitElement {
  @state() private _entity?: string;
  @state() private _icon: string = "hass:thermometer-lines";
  @state() private _iconColor: string = "var(--sq-inactive-rgb, 128, 128, 128)";
  @state() private _stateObj?: HassEntity;
  @state() private _temperature: string = "??";

  private _hass: any;

  static styles: CSSResult = styleChipBasic;

  setConfig(config: Config): void {
    this._entity = config.entity ?? undefined;
  }

  set hass(hass: HomeAssistant) {
    if (this._entity) {
      this._hass = hass;
      this._stateObj = this._hass?.states[this._entity] ?? undefined;
      this._updateState();
    }
  }

  private _updateState(): void {
    const actionColor = {
      cooling: "var(--sq-climate-cool-rgb, 0, 0, 255)",
      heating: "var(--sq-climate-heat-rgb, 255, 0, 0)",
      fan_only: "var(--sq-climate-fan_only-rgb, 0, 255, 0)",
      idle: "var(--sq-primary-font-rgb, 128, 128, 128)",
      off: "var(--sq-inactive-rgb, 128, 128, 128)",
      default: "var(--sq-unavailable-rgb, 255, 0, 255)",
    };

    if (this._stateObj) {
      const hvacAction = this._stateObj.attributes.hvac_action;
      this._iconColor = actionColor[hvacAction] || actionColor.default;
      this._temperature = this._stateObj.attributes.current_temperature ?? "??";
    } else {
      this._iconColor = actionColor.default;
      this._temperature = "??";
    }
  }

  protected render(): TemplateResult {
    if (!this._entity) {
      return html``;
    }


    return html`
      <div class="container" @click=${this._showDialog}>
        <div
          class="icon"
          id="icon"
          style="color: rgb(${this._iconColor});"
        >
          <ha-icon .icon=${this._icon}></ha-icon>
        </div>
        <div class="text">${this._temperature}°</div>
      </div>
    `;
  }

  private _showDialog(e: Event): void {
    e.stopPropagation();
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId: this._entity },
    });
    this.dispatchEvent(event);
  }
}
