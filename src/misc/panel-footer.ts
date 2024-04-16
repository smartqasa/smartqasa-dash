import { LitElement, html, css, CSSResultGroup, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { areasDialog } from "./areas-dialog";
import { entertainDialog } from "./entertain-dialog";
import { menuDialog } from "./menu-dialog";

interface Config extends LovelaceCardConfig {
    audio_player: string;
    video_player: string;
    video_sound: string;
}

interface ExtendedHomeAssistant extends HomeAssistant {
    areas: Record<string, Area>;
}

interface Area {
    area_id: string;
    aliases: string[];
    floor_id: string;
    icon: string;
    labels: string[];
    name: string;
    picture: string;
}

interface ActionHandlers {
    handleHome: () => void;
    handleAreas: () => void;
    handleEntertain: () => void;
    handleMenu: () => void;
}

@customElement("smartqasa-panel-footer")
class PanelFooter extends LitElement implements ActionHandlers {
    @state() private _config?: Config;

    private _hass: any;

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

    set hass(hass: any) {
        if (!hass) return;
        this._hass = hass;
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

    private renderButton(icon: string, name: string, methodName: keyof ActionHandlers): TemplateResult {
        return html`
            <div class="button" @click="${(e: Event) => this.handleAction(e, methodName)}">
                <ha-icon .icon=${icon}></ha-icon>
                ${window.smartqasa.deviceType !== "phone" ? html`<span>${name}</span>` : ""}
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
        const path = location.href.endsWith("/" + basePath) ? "home" : basePath;
        window.history.pushState(null, "", `/home-dash/${path}`);
        window.dispatchEvent(new CustomEvent("location-changed"));
    }

    handleAreas(): void {
        areasDialog(this._hass);
    }

    handleEntertain(): void {
        entertainDialog(this._config, this._hass);
    }

    handleMenu(): void {
        menuDialog(0);
    }
}

window.customCards.push({
    type: "smartqasa-panel-footer",
    name: "SmartQasa Panel Footer",
    preview: true,
    description: "A SmartQasa tile for displaying the panel footer strip.",
});
