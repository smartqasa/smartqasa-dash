import { LitElement, html } from 'lit';

import styleTileBase from '../styles/tile-base';
import styleTileState from '../styles/tile-state';
import styleTileIconSpin from '../styles/tile-icon-spin';

export class SmartQasaFanTile extends LitElement {

  _hass;

  static get properties() {
    return {
      _entity: { state: true },
      _stateObj: { state: true },
      _icon: { state: true },
      _name: { state: true },
      _state: { state: true }
    };
  }

  setConfig(config) {
    if (config.entity) {
      this._entity = config.entity;
      this._icon = config.icon || null;
      this._name = config.name || null;
    } else {
      throw new Error('You need to define an entity');
    }
  }

  set hass(hass) {
    this._hass = hass;
    this._stateObj = this._hass.states[this._entity] || undefined;
  }

  static styles = [styleTileBase, styleTileState, styleTileIconSpin];

  render() {
    console.log('Hello Barbi');
    let icon, iconColor, iconAnimation, name, stateFmtd;
    if (this._stateObj) {
      this._state = this._stateObj.state;
      icon = this._icon || 'hass:fan'
      iconColor = this._state == 'on' ? 'var(--sq-fan-on-rgb)' : 'var(--sq-inactive-rgb)';
      if (this._state === 'on') {
        if (this._stateObj.attributes.percentage) {
          const speed = 0.5 + (1 - this._stateObj.attributes.percentage / 100);
          const direction = this._stateObj.attributes.direction === 'reverse' ? 'reverse' : 'normal';
          iconAnimation = `spin ${speed}s linear infinite ${direction}`;
        } else {
          iconAnimation = `spin 0.5s linear infinite normal`
        }
      }
      name = this._name || this._stateObj.attributes.friendly_name || 'Unknown';
      stateFmtd = this._hass.formatEntityState(this._stateObj) +
        (this._state === 'on' && this._stateObj.attributes.percentage ? ' - ' +
        this._hass.formatEntityAttributeValue(this._stateObj, 'percentage') : '');
    } else {
      icon = 'hass:alert-rhombus';
      iconColor = 'var(--sq-unavailable-rgb)';
      name = this._name || 'Unknown';
      stateFmtd = 'Unknown';
    }

    return html`
      <div class='container' @click=${this._showMoreInfo}>
        <div class='icon' @click=${this. _toggleEntity} style='
          color: rgb(${iconColor});
          background-color: rgba(${iconColor}, var(--sq-icon-opacity));
          animation: ${iconAnimation};
        '>
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class='name'>${name}</div>
        <div class='state'>${stateFmtd}</div>
      </div>
    `;
  }

  _toggleEntity(e) {
    e.stopPropagation();
    this._hass.callService('fan', 'toggle', { entity_id: this._entity });
  }

  _showMoreInfo(e) {
    e.stopPropagation();
    const event = new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId: this._entity } });
    this.dispatchEvent(event);
  }
}
