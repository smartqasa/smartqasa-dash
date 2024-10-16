import {
  CSSResultGroup,
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
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../types";
import { moreInfoDialog } from "../dialogs/more-info-dialog";
import { thermostatIcons, thermostatColors } from "../const";

import chipBaseStyle from "../css/chip-base.css";
import chipTextStyle from "../css/chip-text.css";

interface Config extends LovelaceCardConfig {
  entity?: string;
}

window.customCards.push({
  type: "smartqasa-theromstat-chip",
  name: "SmartQasa Thermostat Chip",
  preview: true,
  description: "A SmartQasa chip that displays a thermostat.",
});

@customElement("smartqasa-thermostat-chip")
export class ThermostatChip extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected _config?: Config;

  private _entity?: string;
  private _stateObj?: HassEntity;
  private _icon: string = "hass:thermostat";
  private _iconStyles: Record<string, string> = {};
  private _temperature: string = "??";

  static get styles(): CSSResultGroup {
    return [unsafeCSS(chipBaseStyle), unsafeCSS(chipTextStyle)];
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith("climate.")) {
      console.error("Invalid climate entity provided in the config.");
      this._entity = undefined;
    } else {
      this._entity = config.entity;
    }
    this._config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this._config) return false;
    return !!(
      (changedProps.has("hass") &&
        this._entity &&
        this.hass?.states[this._entity] !== this._stateObj) ||
      changedProps.has("_config")
    );
  }

  protected willUpdate(): void {
    this._updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._entity) return nothing;

    return html`
      <div class="container" @click=${this._showMoreInfo}>
        <div class="icon" id="icon" style="${styleMap(this._iconStyles)}">
          <ha-icon icon=${this._icon}></ha-icon>
        </div>
        <div class="text">${this._temperature}°</div>
      </div>
    `;
  }

  private _updateState() {
    this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

    let icon, iconColor, temperature;
    if (this._stateObj) {
      const state = this._stateObj.state;
      icon = thermostatIcons[state] || thermostatIcons.default;
      const hvacAction = this._stateObj.attributes.hvac_action;
      iconColor = thermostatColors[hvacAction] || thermostatColors.default;
      temperature = this._stateObj.attributes.current_temperature || "??";
    } else {
      icon = thermostatIcons.default;
      iconColor = thermostatColors.default;
      temperature = "??";
    }

    this._iconStyles = {
      color: `rgb(${iconColor})`,
    };
    this._icon = icon;
    this._temperature = temperature;
  }

  private _showMoreInfo(e: Event): void {
    e.stopPropagation();
    moreInfoDialog(this._stateObj, this._config?.callingDialog);
  }
}
