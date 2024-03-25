import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';

import styleChipDouble from '../styles/chip-double';

interface Config extends LovelaceCardConfig  {
  area_prev: string;
  area_next: string;
}

@customElement("smartqasa-navigate-chip")
export class SmartQasaNavigateChip extends LitElement {
  @state() private _areaPrev?: string;
  @state() private _areaNext?: string;
  @state() private _areaObjPrev?: string;
  @state() private _areaObjNext?: string;

  private _hass: any;

  static styles: CSSResult = styleChipDouble;

  public setConfig(config: Config): void {
    if (!config.area_prev || !config.area_next) {
      throw new Error('Both area_prev and area_next must be specified');
    }
    this._areaPrev = config.area_prev;
    this._areaNext = config.area_next;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (this._hass?.areas) {
      this._areaObjPrev = this._hass.areas[this._areaPrev];
      this._areaObjNext = this._hass.areas[this._areaNext];
    }
  }

  protected render(): TemplateResult {
    if (!this._areaObjPrev || !this._areaObjNext) {
      return html``;
    }

    const iconPrev = 'hass:arrow-left';
    const iconNext = 'hass:arrow-right';

    return html`
      <div class="container">
        <div class="icon1" @click=${this._navigatePrev}>
          <ha-icon .icon=${iconPrev}></ha-icon>
        </div>
        <div class="icon2" @click=${this._navigateNext}>
          <ha-icon .icon=${iconNext}></ha-icon>
        </div>
      </div>
    `;
  }

  private _navigatePrev(e: Event): void {
    e.stopPropagation();
    if (this._areaObjPrev) {
      window.history.pushState(null, '', `/home-dash/${this._areaPrev}`);
      window.dispatchEvent(new CustomEvent('location-changed'));
      // Assume browser_mod is correctly typed and included
    } else {
      console.error('Previous area is not found.');
    }
  }

  private _navigateNext(e: Event): void {
    e.stopPropagation();
    if (this._areaObjNext) {
      window.history.pushState(null, '', `/home-dash/${this._areaNext}`);
      window.dispatchEvent(new CustomEvent('location-changed'));
      // Assume browser_mod is correctly typed and included
    } else {
      console.error('Next area is not found.');
    }
  }
}

window.customCards.push({
  type: "smartqasa-navigate-chip",
  name: "SmartQasa Navigate Chip",
  preview: true,
  description: "A SmartQasa chip for navigating to a previous/next area.",
});
