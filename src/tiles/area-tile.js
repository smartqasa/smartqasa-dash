import { LitElement, html, css } from 'lit';

import styleTileBase from '../styles/tile-base';

export class SmartQasaAreaTile extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  static styles = styleTileBase;

  constructor() {
    super();
    this.hass = {};
    this._config = {};
  }

  setConfig(config) {
    if (!config.area) {
      throw new Error('You need to define a area');
    }
    this._config = config;
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const areaObj = this.hass.areas[this._config.area];
    const name = this._config.name || areaObj?.name || 'Unknown';
    const icon = this._config.icon || areaObj?.icon || 'hass:alert-circle-outline';
    const iconColor = 'var(--sq-inactive-rgb)';

    return html`
      <div class='container' @click=${this._navigate}>
        <div class='icon' id='icon' style='color: rgb(${iconColor}); background-color: rgba(${iconColor}, var(--sq-icon-opacity));'>
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class='name'>${name}</div>
      </div>
    `;
  }

  _navigate() {
    if (this._config.arae) {
      if (this.hass && this.hass.callService) {
        this.hass.callService('frontend', 'navigate', {path: '/dashboard-sandbox/test-5'});
      } else {
        // Fallback to direct manipulation if necessary
        window.location.href = this._config.area;
      }
    } else {
      console.error('Navigation path is not defined.');
    }
  }
}
