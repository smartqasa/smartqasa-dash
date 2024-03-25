import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import styleChipBasic from '../styles/chip-basic';

import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
  entity?: string;
  name?: string;
}

@customElement("smartqasa-motion-chip")
export class SmartQasaMotionChip extends LitElement {
  @state() private _containerStyle: string;
  @state() private _entity?: string;
  @state() private _icon: string;
  @state() private _iconColor: string;
  @state() private _name?: string;
  @state() private _stateObj?: HassEntity;

  private _hass;

  static styles: CSSResult = styleChipBasic;

  public setConfig(config: Config): void {
    this._entity = config.entity ?? undefined;
    this._name = config.name ?? undefined;
    this._containerStyle = this._name
    ? null
    : "grid-template-areas: 'i'; grid-column-gap: 0; justify-content: center;";
  }

  set hass(hass: HomeAssistant) {
    if (this._entity) {
      this._hass = hass;
      this._stateObj = this._hass.states[this._entity] ?? undefined;
      if (this._stateObj) {
        const state = this._stateObj.state ?? undefined;
        switch (state) {
          case 'on':
            this._icon = 'hass:motion-sensor';
            this._iconColor = 'var(--sq-primary-font-rgb, 128, 128, 128)';
            break;
          case 'off':
            this._icon = 'hass:motion-sensor-off';
            this._iconColor = 'var(--sq-red-rgb, 255, 0, 0)';
            break;
          default:
            this._icon = 'hass:motion-sensor-off';
            this._iconColor = 'var(--sq-unavailable-rgb, 255, 0, 255)';
            break;
        }
      }
    }
  }

  render(): TemplateResult {
    if (!this._entity) {
      return html``;
    }

    return html`
      <div class="container" style="${this._containerStyle}" @click=${this._toggleEntity}>
        <div class="icon" id="icon" style="color: rgb(${this._iconColor});">
          <ha-icon .icon=${this._icon}></ha-icon>
        </div>
        ${this._name ? html`<div class="text">${this._name}</div>` : null}
      </div>
    `;
  }

  private _toggleEntity(e: Event): void {
    e.stopPropagation();
    if (this.hass && this._stateObj) {
      this.hass.callService('homeassistant', 'toggle', {
        entity_id: this._entity,
      });
    }
  }
}

window.customCards.push({
  type: 'smartqasa-motion-chip',
  name: 'SmartQasa Motion Sensor Chip',
  preview: true,
  description: 'A SmartQasa chip for toggling a motion sensor automation entity.',
});
