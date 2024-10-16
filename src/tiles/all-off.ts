import {
  CSSResult,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
  unsafeCSS,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import {
  HassArea,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../types";
import { callService } from "../utilities/call-service";

import tileStyle from "../css/tile.css";

interface Config extends LovelaceCardConfig {
  area: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: "smartqasa-all-off-tile",
  name: "SmartQasa All Off Tile",
  preview: true,
  description:
    "A SmartQasa tile for turning off all light and fan entities in an area.",
});

@customElement("smartqasa-all-off-tile")
export class AllOffTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected _config?: Config;
  @state() private _running: boolean = false;

  private _area?: string;
  private _areaObj?: HassArea;
  private _icon: string = "hass:alert-rhombus";
  private _iconStyles: Record<string, string> = {};
  private _name: string = "Unknown Area";

  static get styles(): CSSResult {
    return unsafeCSS(tileStyle);
  }

  public setConfig(config: Config): void {
    this._config = config;
    this._area = config.area;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return !!(
      changedProps.has("running") ||
      (changedProps.has("hass") &&
        this._area &&
        this.hass?.areas[this._area] !== this._areaObj) ||
      changedProps.has("_config")
    );
  }

  protected willUpdate(): void {
    this._updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this._area) return nothing;

    return html`
      <div class="container" @click=${this._runRoutine}>
        <div class="icon" style="${styleMap(this._iconStyles)}">
          <ha-icon icon=${this._icon}></ha-icon>
        </div>
        <div class="text">
          <div class="name">${this._name}</div>
        </div>
      </div>
    `;
  }

  private _updateState(): void {
    this._areaObj = this._area ? this.hass?.areas[this._area] : undefined;

    let icon, iconAnimation, iconColor, name;
    if (this._config && this._areaObj) {
      if (this._running) {
        icon = "hass:rotate-right";
        iconAnimation = "spin 1.0s linear infinite";
        iconColor = "var(--sq-blue-rgb)";
      } else {
        icon = this._config.icon || "hass:power";
        iconAnimation = "none";
        iconColor = "var(--sq-inactive-rgb)";
      }
      name = this._config.name || this._areaObj.name || "All Off";
    } else {
      icon = "hass:alert-rhombus";
      iconAnimation = "none";
      iconColor = "var(--sq-unavailable-rgb)";
      name = "Unknown Area";
    }

    this._iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
      animation: iconAnimation,
    };
    this._icon = icon;
    this._name = name;
  }

  private async _runRoutine(e: Event): Promise<void> {
    e.stopPropagation();
    if (!this.hass || !this._areaObj) return;

    this._running = true;

    await callService(this.hass, "light", "turn_off", {
      area_id: this._area,
      transition: 2,
    });
    await callService(this.hass, "fan", "turn_off", {
      area_id: this._area,
    });

    setTimeout(() => {
      this._running = false;
    }, 1000);
  }
}
