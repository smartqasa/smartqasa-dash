import { LitElement, html, css, CSSResultGroup, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {
    speakers: string;
    tv_stream: string;
    tv_sound: string;
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

@customElement("smartqasa-footer-strip")
class FooterStrip extends LitElement implements ActionHandlers {
    @state() private _config?: Config;
    @state() private _areas?: Area[];

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
            grid-template-areas: "home areas entertain menu";
            grid-template-columns: repeat(4, max-content);
            grid-column-gap: 5vw;
            justify-content: center;
        }
        .button {
            display: flex;
            padding: 1rem;
            align-items: center;
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
                ${this.renderButton("home", "hass:home", "Home", "handleHome")}
                ${this.renderButton("areas", "hass:view-dashboard", "Areas", "handleAreas")}
                ${this.renderButton("entertain", "hass:music", "Entertainment", "handleEntertain")}
                ${this.renderButton("menu", "hass:menu", "Menu", "handleMenu")}
            </div>
        `;
    }

    private renderButton(id: string, icon: string, name: string, methodName: keyof ActionHandlers): TemplateResult {
        return html`
            <div class="button" @click="${(e: Event) => this.handleAction(e, methodName)}">
                <ha-icon .icon=${icon}></ha-icon>
                <span>${name}</span>
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
        this._areas = Object.values<Area>(this._hass.areas).filter((area) => area?.labels.includes("visible"));
        const cards = this._areas?.map((area) => ({
            type: "custom:smartqasa-area-tile",
            area: area.area_id,
        }));
        const dialogConfig = {
            title: "Areas",
            timeout: 60000,
            content: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: {
                    margin: 0,
                    "grid-template-columns": "1fr",
                    "grid-gap": "var(--sq-dialog-grid-gap)",
                },
                cards: cards,
            },
        };

        window.browser_mod?.service("popup", dialogConfig);
    }

    handleEntertain(): void {
        if (!this._config) return;

        const deviceType = window.smartqasa.deviceType;
        const tvStreamObj = this._config.tv_stream ? this._hass.states[this._config.tv_stream] : undefined;
        const tvSoundObj = this._config.tv_sound ? this._hass.states[this._config.tv_sound] : undefined;
        const speakerObj = this._config.speaker ? this._hass.states[this._config.speaker] : undefined;

        let gridTemplateAreas = '"message"';
        let gridTemplateColumns = "auto";
        if (tvStreamObj && speakerObj) {
            gridTemplateAreas =
                deviceType === "phone"
                    ? '"rk-title" "rk-card" "sn-title" "sn-card" "ap-title" "ap-card"'
                    : '"rk-title sn-title ap-title" "rk-card sn-card ap-card"';
            gridTemplateColumns = deviceType === "phone" ? "95%" : "340px 420px auto";
        } else if (!tvStreamObj && speakerObj) {
            gridTemplateAreas =
                deviceType === "phone"
                    ? '"sn-title" "sn-card" "ap-title" "ap-card"'
                    : '"sn-title ap-title" "sn-card ap-card"';
            gridTemplateColumns = deviceType === "phone" ? "95%" : "420px auto";
        } else if (tvStreamObj && !speakerObj) {
            gridTemplateAreas =
                deviceType === "phone"
                    ? '"rk-title" "rk-card" "ap-title" "ap-card"'
                    : '"rk-title ap-title" "rk-card ap-card"';
            gridTemplateColumns = deviceType === "phone" ? "95%" : "340px auto";
        }

        const dialogConfig = {
            title: "Entertainment",
            timeout: 300000,
            content: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: {
                    margin: 0,
                    "grid-template-columns": gridTemplateColumns,
                    "grid-gap": "var(--sq-dialog-grid-gap)",
                    "grid-template-areas": gridTemplateAreas,
                },
                cards: [
                    {
                        type: "custom:roku-card",
                        entity: tvStreamObj.entity_id,
                        tv: true,
                    },
                    {
                        type: "custom:sonos-card",
                        entity: speakerObj.entity_id,
                    },
                ],
            },
        };

        window.browser_mod?.service("popup", dialogConfig);
    }

    handleMenu(): void {
        console.log("Menu action");
    }
}

window.customCards.push({
    type: "smartqasa-footer-strip",
    name: "SmartQasa Footer Strip",
    preview: true,
    description: "A SmartQasa tile for displaying the panel footer strip.",
});
