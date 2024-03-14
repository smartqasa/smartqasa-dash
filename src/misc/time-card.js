import { LitElement, html, css } from "lit";

export class SmartQasaTimeCard extends LitElement {
  _hass;

  static get properties() {
    return {
      _time: { state: true },
      _date: { state: true },
    };
  }

  setConfig(config) {}

  set hass(hass) {
    this._hass = hass;
    this._time = this._hass.states["sensor.current_time"].state;
    this._date = this._hass.states["sensor.current_date"].state;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0;
        background-color: transparent;
      }
      .container {
        display: grid;
        grid-template-rows: auto auto;
        padding: 0;
        border-radius: 0;
        border: none;
        box-shadow: none;
        background-color: transparent;
        cursor: pointer;
      }
      .time,
      .date {
        justify-self: start;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .time {
        line-height: var(--sq-title-font-size, 16px);
        font-size: var(--sq-title-font-size, 16px);
        font-weight: var(--sq-title-font-weight, 400);
        color: rgb(var(--sq-title-font-rgb, 0, 0, 0));
      }
      .date {
        font-size: var(--sq-primary-font-size, 14px);
        font-weight: var(--sq-primary-font-weight, 300);
        color: rgb(var(--sq-secondary-font-rgb, 128, 128, 128));
      }
    `;
  }

  render() {
    return html`
      <div class="container" @click="${this._handleTap}">
        <div class="time">${this._time}</div>
        <div class="date">${this._date}</div>
      </div>
    `;
  }

  _handleTap() {
    if (typeof fully !== "undefined" && fully.startApplication) {
      fully.startApplication("com.google.android.deskclock");
    } else {
      console.warn("fully.startApplication is not available.");
    }
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("smartqasa-time-card", SmartQasaTimeCard);
