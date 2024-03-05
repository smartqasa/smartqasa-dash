import { LitElement, html } from 'lit';
import styles from '../styles/tile';

export class SmartQasaLightTile extends LitElement {

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
    };
  }

  set hass(hass) {
    this._hass = hass;
    this._stateObj = this._hass.states[this._entity] || undefined;
  }

  static styles = styles;

  render() {
    let icon, iconColor, name, stateFmtd;
    if (this._stateObj) {
      this._state = this._stateObj.state;
      icon = this._icon || this._stateObj.attributes.icon;
      name = this._name || this._stateObj.attributes.friendly_name;
      iconColor = this._state == 'on' ? 'var(--sq-light-on-rgb)' : 'var(--sq-inactive-rgb)';
      stateFmtd = this._hass.formatEntityState(this._stateObj) +
        (this._state == 'on' && this._stateObj.attributes.brightness ? ' - ' +
        this._hass.formatEntityAttributeValue(this._stateObj, 'brightness') : '');
    } else {
      icon = 'hass:alert-rhombus';
      name = this._name || 'Unknown';
      iconColor = 'var(--sq-unavailable-rgb)';
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
    this._hass.callService('light', 'toggle', { entity_id: this._entity });
  }

  _showMoreInfo(e) {
    e.stopPropagation();
    const event = new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId: this._entity } });
    this.dispatchEvent(event);
  }
}
