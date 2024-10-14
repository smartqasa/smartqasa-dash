import {
  LitElement,
  html,
  css,
  CSSResultGroup,
  PropertyValues,
  TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HomeAssistant, LovelaceCardConfig } from "../src/types";
import { areasDialog } from "../src/misc/areas-dialog";
import { entertainDialog } from "../src/misc/entertain-dialog";
import { menuConfig } from "../src/misc/menu-config";
import { deviceType } from "../src/utils/device-info";

interface Config extends LovelaceCardConfig {
  audio_player: string;
  video_player: string;
  video_sound: string;
}

interface ActionHandlers {
  handleHome: () => void;
  handleAreas: () => void;
  handleEntertain: () => void;
  handleMenu: () => void;
}

window.customCards.push({
  type: "smartqasa-panel-footer",
  name: "SmartQasa Panel Footer",
  preview: true,
  description: "A SmartQasa tile for displaying the panel footer strip.",
});

@customElement("smartqasa-panel-footer")
class PanelFooter extends LitElement implements ActionHandlers {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: Config;

  static styles: CSSResultGroup = css`
    :host {
      display: block;
      width: 100%;
      margin: 5px 0;
      padding: 0;
      border: none;
      border-radius: 0;
      box-shadow: none;
      background-color: transparent;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(4, min-content);
      grid-gap: 5vw;
      justify-content: center;
      align-items: center;
    }
    .button {
      display: flex;
      padding: 1rem;
      align-items: center;
      justify-content: center;
      column-gap: 0.5rem;
      font-size: var(--sq-primary-font-size, 1.5rem);
      font-weight: var(--sq-primary-font-weight, 400);
      color: rgb(var(--sq-secondary-font-rgb));
      cursor: pointer;
    }
    .icon {
      height: 1.8rem;
      width: 1.8rem;
    }
  `;

  setConfig(config: Config): void {
    this._config = { ...config };
  }

  protected render(): TemplateResult {
    return html`
      <div class="grid">
        ${this.renderButton("hass:home", "Home", "handleHome")}
        ${this.renderButton("hass:view-dashboard", "Areas", "handleAreas")}
        ${this.renderButton("hass:music", "Entertainment", "handleEntertain")}
        ${this.renderButton("hass:menu", "Menu", "handleMenu")}
      </div>
    `;
  }

  private renderButton(
    icon: string,
    name: string,
    methodName: keyof ActionHandlers,
  ): TemplateResult {
    return html`
      <div
        class="button"
        @click="${(e: Event) => this.handleAction(e, methodName)}"
      >
        <ha-icon .icon=${icon}></ha-icon>
        ${deviceType !== "phone" ? html`<span>${name}</span>` : ""}
      </div>
    `;
  }

  private handleAction(e: Event, methodName: keyof ActionHandlers): void {
    e.stopPropagation();
    if (typeof this[methodName] === "function") {
      this[methodName]();
    } else {
      console.error(`Method not found: ${methodName}`);
    }
  }

  handleHome(): void {
    const basePath = window.smartqasa.homePath;
    window.smartqasa.viewMode = "area";
    const path = location.href.endsWith("/" + basePath) ? "home" : basePath;
    window.history.pushState(null, "", `/home-dash/${path}`);
    window.dispatchEvent(new CustomEvent("location-changed"));
  }

  handleAreas(): void {
    areasDialog(this.hass);
  }

  handleEntertain(): void {
    entertainDialog(this._config, this.hass);
  }

  async handleMenu(): Promise<void> {
    window.smartqasa.menuTab = 0;
    try {
      const dialogConfig = await menuConfig();
      window.browser_mod?.service("popup", dialogConfig);
    } catch (error) {
      console.error("Error loading menu configuration", error);
    }
  }
}
