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
import { callService } from "../utilities/call-service";

import chipBaseStyle from "../css/chip-base.css";
import chipTextStyle from "../css/chip-text.css";

interface Config extends LovelaceCardConfig {
  entity: string;
  icon?: string;
  color?: string;
  name?: string;
}

window.customCards.push({
  type: "smartqasa-routine-chip",
  name: "SmartQasa Routine Chip",
  preview: true,
  description:
    "A SmartQasa chip for triggering an automation, scene, or script entity.",
});

@customElement("smartqasa-routine-chip")
export class RoutineChip extends LitElement implements LovelaceCard {
  public getCardSize(): number {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected _config?: Config;
  @state() private _running: boolean = false;
  private _entity?: string;
  private _stateObj?: HassEntity;
  private _icon: string = "hass:play-circle";
  private _iconStyles: Record<string, string> = {};
  private _name: string = "";

  static get styles(): CSSResultGroup {
    return [unsafeCSS(chipBaseStyle), unsafeCSS(chipTextStyle)];
  }

  public setConfig(config: Config): void {
    this._entity = ["automation", "scene", "script"].includes(
      config.entity?.split(".")[0],
    )
      ? config.entity
      : undefined;
    this._config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return !!(
      (changedProps.has("hass") &&
        this._entity &&
        this.hass?.states[this._entity] !== this._stateObj) ||
      (changedProps.has("_config") && this._config)
    );
  }

  protected willUpdate(): void {
    this._updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this._entity) return nothing;

    return html`
      <div class="container" @click=${this._runRoutine}>
        <div class="icon" style="${styleMap(this._iconStyles)}">
          <ha-icon icon=${this._icon}></ha-icon>
        </div>
        ${this._name ? html`<div class="text">${this._name}</div>` : null}
      </div>
    `;
  }

  private _updateState(): void {
    this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

    let icon, iconAnimation, iconColor;
    if (this._stateObj) {
      if (this._running) {
        icon = "hass:rotate-right";
        iconAnimation = "spin 1.0s linear infinite";
        iconColor = "var(--sq-blue-rgb)";
      } else {
        icon =
          this._config!.icon ||
          this._stateObj.attributes.icon ||
          "hass:play-circle";
        iconAnimation = "none";
        iconColor = this._config!.color || "var(--sq-primary-text-rgb)";
      }
    } else {
      icon = "hass:alert-rhombus";
      iconAnimation = "none";
      iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
    }

    const name = this._config?.name || "";
    this._iconStyles = {
      color: `rgb(${iconColor})`,
      animation: iconAnimation,
      paddingRight: name
        ? "calc(var(--sq-chip-padding, 1rem) / 2)"
        : "var(--sq-chip-padding, 1rem)",
    };
    this._icon = icon;
    this._name = name;
  }

  private _runRoutine(e: Event): void {
    e.stopPropagation();
    if (!this.hass || !this._stateObj) return;

    this._running = true;

    const domain = this._stateObj.entity_id.split(".")[0];
    switch (domain) {
      case "script":
        callService(this.hass, "script", "turn_on", {
          entity_id: this._entity,
        });
        break;
      case "scene":
        callService(this.hass, "scene", "turn_on", { entity_id: this._entity });
        break;
      case "automation":
        callService(this.hass, "automation", "trigger", {
          entity_id: this._entity,
        });
        break;
      default:
        console.error("Unsupported entity domain:", domain);
        return;
    }

    setTimeout(() => {
      this._running = false;
    }, 2000);
  }
}
