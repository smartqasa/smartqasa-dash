import { LitElement, html } from 'lit';

import styleTileBase from '../styles/tile-base';
import styleTileState from '../styles/tile-state';

export class SmartQasaSwitchTile extends LitElement {

    _hass;

    static get properties() {
        return {
            _entity: { state: true },
            _category: { state: true },
            _stateObj: { state: true },
            _icon: { state: true },
            _name: { state: true }
        }
    }

    setConfig(config) {
        if (config.entity) {
            this._entity = config.entity;
            this._category = config.category ?? null;
            this._icon = config.icon ?? null;
            this._name = config.name ?? null;
        } else {
            throw new Error('You need to define an entity');
        }
    }

    set hass(hass) {
        this._hass = hass;
        this._stateObj = this._hass.states[this._entity] ?? undefined;
    }

    static styles = [styleTileBase, styleTileState];

    render() {
        let icon, iconColor, name, stateFmtd;
        if (this._stateObj) {
            const state = this._stateObj.state;
            icon = this._icon ?? this._stateObj.attributes.icon ?? 'hass:help-circle';
            iconColor = state == 'on' ?
                `var(--sq-switch${this._category ? '-' + this._category : ''}-on-rgb)` :
                'var(--sq-inactive-rgb)';
            name = this._name ?? this._stateObj.attributes.friendly_name ?? this._entity;
            stateFmtd = this._hass.formatEntityState(this._stateObj);
        } else {
            icon = 'hass:alert-rhombus';
            iconColor = 'var(--sq-unavailable-rgb)';
            stateFmtd = 'Unknown';
        }
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
          this._hass.callService('homeassistant', 'toggle', { entity_id: this._entity });
      }

      _showMoreInfo(e) {
          e.stopPropagation();
          const event = new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId: this._entity } });
          this.dispatchEvent(event);
      }
}
