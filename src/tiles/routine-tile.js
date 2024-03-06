import { LitElement, html, css } from 'lit';

import styleTileBase from '../styles/tile-base';

export class SmartQasaRoutineTile extends LitElement {

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

  static styles = styleTileBase;

  render() {
    let icon, iconColor, name;
    if (this._stateObj) {
      icon = this._icon || this._stateObj.attributes.icon;
      iconColor = 'var(--sq-inactive-rgb)';
      name = this._name || this._stateObj.attributes.friendly_name;
    } else {
      icon = 'hass:alert-rhombus';
      iconColor = 'var(--sq-unavailable-rgb)';
      name = 'Unknown'
    }

    return html`
      <div class='container' @click=${this._runRoutine}>
        <div class='icon' id='icon' @click=${this._showMoreInfo} style='
          color: rgb(${iconColor});
          background-color: rgba(${iconColor}, var(--sq-icon-opacity));
        '>
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class='name'>${name}</div>
      </div>
    `;
  }

  _runRoutine(e) {
    e.stopPropagation();
    const iconElement = this.shadowRoot.getElementById('icon');
    iconElement.style.color = `rgb(var(--sq-accent-rgb))`;
    iconElement.style.backgroundColor = `rgba(var(--sq-accent-rgb), var(--sq-icon-opacity)`;

    const domain = this._entity.split('.')[0];
    switch (domain) {
      case 'script':
        this._hass.callService('script', 'turn_on', { entity_id: this._entity });
        break;
      case 'scene':
        this._hass.callService('scene', 'turn_on', { entity_id: this._entity });
        break;
      case 'automation':
        this._hass.callService('automation', 'trigger', { entity_id: this._entity });
        break;
      default:
        console.error('Unsupported entity domain:', domain);
        return;
    }

    setTimeout(() => {
      iconElement.style.color = `rgb(var(--sq-inactive-rgb))`;
      iconElement.style.backgroundColor = `rgba(var(--sq-inactive-rgb), var(--sq-icon-opacity))`;
    }, 2000);
  }
}
