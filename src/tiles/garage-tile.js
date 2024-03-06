import { LitElement, html, css } from 'lit';

import styleTileBase from '../styles/tile-base';
import styleTileState from '../styles/tile-state';

export class SmartQasaGarageTile extends LitElement {
  _hass;

  static get properties() {
    return {
      _entity: { state: true },
      _stateObj: { state: true },
      _icon: { state: true },
      _name: { state: true },
    };
  }

  setConfig(config) {
    if (config.entity) {
      this._entity = config.entity;
      this._name = config.name || null;
    } else {
      throw new Error('You need to define an entity');
    };
  }

  set hass(hass) {
    this._hass = hass;
    this._stateObj = this._hass.states[this._entity] || undefined;
  }

  static styles = [styleTileBase, styleTileState];

  render() {
    let icon, iconColor, name, state, stateFmtd;
    if (this._stateObj) {
      name = this._name || this._stateObj.attributes.friendly_name;
      state = this._stateObj.state;
      switch (state) {
        case 'closed':
            icon = 'hass:garage-variant';
            iconColor = 'var(--sq-inactive-rgb, 128, 128, 128)';
            break;
        case 'closing':
            icon = 'hass:arrow-down-box';
            iconColor = 'var(--sq-garage-closing-rgb, 255, 120, 0)';
            break;
        case 'opening':
            icon = 'hass:arrow-up-box';
            iconColor = 'var(--sq-garage-opening-rgb, 255, 120, 0)';
            break;
        case 'open':
            icon = 'hass:garage-open-variant';
            iconColor = 'var(--sq-garage-open-rgb, 255, 120, 0)';
            break;
        default:
            icon = 'hass:alert-rhombus';
            iconColor = 'var(--sq-unavailable-rgb, 255, 0, 255)';
            break;
      }
      stateFmtd = this._hass.formatEntityState(this._stateObj) +
        (state === 'open' && this._stateObj.attributes.current_position
        ? ' - ' + this._hass.formatEntityAttributeValue(this._stateObj, 'current_position')
        : '');
    } else {
      icon = 'hass:alert-rhombus';
      iconColor = 'var(--sq-unavailable-rgb)';
      name = this._name || 'Unknown';
      stateFmtd = 'Unknown';
    };

    return html`
      <div class='container' @click=${this._showMoreInfo}>
        <div class='icon' @click=${this._toggleEntity} style='
          color: rgb(${iconColor});
          background-color: rgba(${iconColor}, var(--sq-icon-opacity));
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
    this._hass.callService('cover', 'toggle', { entity_id: this._entity });
  }

  _showMoreInfo(e) {
    e.stopPropagation();
    const event = new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId: this._entity } });
    this.dispatchEvent(event);
  }
}
