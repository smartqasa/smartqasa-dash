import { LitElement, html } from 'lit';

import styleTileBase from '../styles/tile-base';

export class SmartQasaAllOffTile extends LitElement {

    _hass;

    static get properties() {
        return {
            _area: { state: true },
            _areaObj: { state: true },
            _icon: { state: true },
            _name: { state: true },
        };
    }

    setConfig(config) {
        if (config.area) {
            this._area = config.area || null;
            this._icon = config.icon || null;
            this._name = config.name || null;
        } else {
            throw new Error('You need to define an area');
        };
    }

    set hass(hass) {
        this._hass = hass;
        this._areaObj = this._hass.areas[this._area] || undefined;
    }

    static styles = styleTileBase;

    render() {
        let icon, iconColor, name
        if (this._areaObj) {
            icon = this._icon || 'hass:power';
            iconColor = 'var(--sq-inactive-rgb)';
            name = this._name || 'All Off';
        } else {
            icon = this._icon || 'hass:alert-rhombus';
            iconColor = 'var(--sq-unavailable-rgb)';
            name = this._name || 'Unknown';
        };
        return html`
            <div class='container' @click=${this._runRoutine}>
                <div class='icon' id='icon' style='
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

        this._hass.callService('light', 'turn_off', {
            area_id: this._area,
            transition: 2
        });
        this._hass.callService('fan', 'turn_off', {
            area_id: this._area
        });

        setTimeout(() => {
            iconElement.style.color = `rgb(var(--sq-inactive-rgb))`;
            iconElement.style.backgroundColor = `rgba(var(--sq-inactive-rgb), var(--sq-icon-opacity))`;
        }, 2000);
    }
}
