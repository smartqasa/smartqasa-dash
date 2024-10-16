import {
  CSSResult,
  html,
  LitElement,
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
import { navigateToArea } from "../utilities/navigate-to-area";

import tileStyle from "../css/tile.css";

interface Config extends LovelaceCardConfig {
  area: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: "smartqasa-area-tile",
  name: "SmartQasa Area Tile",
  preview: true,
  description: "A SmartQasa card for navigating to an area panel.",
});

@customElement("smartqasa-area-tile")
export class AreaTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected _config?: Config;
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
    this._area = this._config.area;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return !!(
      (changedProps.has("hass") &&
        this._area &&
        this.hass?.areas[this._area] !== this._areaObj) ||
      (changedProps.has("_config") && this._config)
    );
  }

  protected willUpdate(): void {
    this._updateState();
  }

  protected render(): TemplateResult {
    return html`
      <div class="container" @click=${this._navigateToArea}>
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

    let iconColor;
    if (this._config && this._areaObj) {
      this._icon =
        this._config.icon || this._areaObj.icon || "hass:help-rhombus";
      iconColor = "var(--sq-inactive-rgb)";

      this._name = this._config.name || this._areaObj.name || "Area";
    } else {
      this._icon = "hass:alert-rhombus";
      iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
      this._name = "Unknown Area";
    }

    this._iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity, 0.2))`,
    };
  }

  private _navigateToArea(e: Event): void {
    e.stopPropagation();
    if (!this._area) return;
    navigateToArea(this._area);
    window.browser_mod?.service("close_popup", {});
  }
}
