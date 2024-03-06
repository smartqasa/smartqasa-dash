import { LitElement, html } from 'lit';

import styleTileBase from '../styles/tile-base';
import styleTileState from '../styles/tile-state';
import styleTileIconBlink from '../styles/tile-icon-blink';
export class SmartQasaLockTile extends LitElement {

    _hass;

    static get properties() {
        return {
            _entity: { state: true },
            _stateObj: { state: true },
            _name: { state: true },
            _state: { state: true }
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

    static styles = [styleTileBase, styleTileState, styleTileIconBlink];

    render() {
        let icon, iconColor, name, stateFmtd;
        if (this._stateObj) {
            this._state = this._stateObj.state;
            switch (this._state) {
                case 'locked':
                    icon = 'hass:lock';
                    iconColor = 'var(--sq-inactive-rgb, 128, 128, 128)';
                    break;
                case 'unlocked':
                    icon = 'hass:lock-open';
                    iconColor = 'var(--sq-lock-unlocked-rgb, 255, 120, 0)';
                    break;
                default:
                    icon = 'hass:alert-rhombus';
                    iconColor = 'var(--sq-unavailable-rgb, 255, 0, 255)';
                    break;
            }
            name = this._name || this._stateObj.attributes.friendly_name;
            stateFmtd = this._hass.formatEntityState(this._stateObj);
        } else {
            icon = 'hass:alert-rhombus';
            iconColor = 'var(--sq-unavailable-rgb)';
            name = this._name || 'Unknown';
            stateFmtd = 'Unknown';
        }

        return html`
            <div class='container' @click=${this._showMoreInfo}>
                <div class='icon' id='icon' @click=${this._toggleLock} style='
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

    _toggleLock(e) {
        e.stopPropagation();
        const iconElement = this.shadowRoot.getElementById('icon');
        iconElement.style.color = `rgb(var(--sq-accent-rgb))`;
        iconElement.style.backgroundColor = `rgba(var(--sq-accent-rgb), var(--sq-icon-opacity)`;
        iconElement.style.animation = 'blink 2.0s linear infinite';
        this._hass.callService('lock', this._state === 'locked' ? 'unlock' : 'lock', { entity_id: this._entity });
    }

    _showMoreInfo(e) {
        e.stopPropagation();
        const event = new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId: this._entity } });
        this.dispatchEvent(event);
    }
}
