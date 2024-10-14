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

import { HassEntity, HomeAssistant, LovelaceCard } from "../types";
import { callService } from "../utilities/call-service";

import chipBaseStyle from "../css/chip-base.css";

window.customCards.push({
  type: "smartqasa-admin-chip",
  name: "SmartQasa Admin Chip",
  preview: true,
  description: "A SmartQasa chip for toggling off admin mode.",
});

@customElement("smartqasa-admin-chip")
export class AdminChip extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _stateObj?: HassEntity;

  private _entity = "input_boolean.admin_mode";

  static get styles(): CSSResult {
    return unsafeCSS(chipBaseStyle);
  }

  public setConfig(): void {}

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (this.hass && changedProps.has("hass")) {
      this._stateObj = this.hass.states[this._entity];
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._entity || this._stateObj?.state !== "on") return nothing;

    const icon = "hass:tools";
    const iconStyles = {
      color: "rgb(var(--sq-orange-rgb))",
      animation: "blink 2.0s linear infinite",
    };

    return html`
      <div class="container" @click=${this._toggleEntity}>
        <div class="icon" style="${styleMap(iconStyles)}">
          <ha-icon icon=${icon}></ha-icon>
        </div>
      </div>
    `;
  }

  private _toggleEntity(e: Event): void {
    e.stopPropagation();
    callService(this.hass, "input_boolean", "turn_off", {
      entity_id: this._entity,
    });
  }
}
