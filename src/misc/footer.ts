import { LitElement, html, css, CSSResultGroup, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { loadYamlAsJson } from "../utils/loadYamlAsJson";

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

    async handleEntertain(): Promise<void> {
        if (!this._config) return;

        const deviceType = window.smartqasa.deviceType;
        const videoPlayerObj = this._config.video_player ? this._hass.states[this._config.video_player] : undefined;
        const videoSoundObj = this._config.video_sound ? this._hass.states[this._config.video_sound] : undefined;
        const audioPlayerObj = this._config.audio_player ? this._hass.states[this._config.audio_player] : undefined;
        const appListCards = await loadYamlAsJson("/local/smartqasa/lists/entertain.yaml");

        const videoPlayerTitle = videoPlayerObj
            ? {
                  type: "custom:smartqasa-title-card",
                  title: videoPlayerObj.attributes.friendly_name || "TV",
              }
            : undefined;

        const videoPlayerCard = videoPlayerObj
            ? {
                  type: "custom:roku-card",
                  entity: videoPlayerObj.entity_id,
                  tv: true,
              }
            : undefined;

        const audioPlayerTitle = audioPlayerObj
            ? {
                  type: "custom:smartqasa-title-card",
                  title: audioPlayerObj.attributes.friendly_name || "Audio",
              }
            : undefined;

        const audioPlayerCard = audioPlayerObj
            ? {
                  type: "custom:sonos-card",
                  entityId: audioPlayerObj.entity_id,
                  heightPercentage: 89,
                  mediaBrowserItemsPerRow: 3,
                  mediaBrowserShowTitleForThumbnailIcons: true,
                  showVolumeUpAndDownButtons: true,
                  sections: ["player", "volumes", "groups", "grouping", "media browser"],
              }
            : undefined;

        const appListTitle =
            videoPlayerObj || audioPlayerObj
                ? {
                      type: "custom:smartqasa-title-card",
                      title: "Apps",
                  }
                : undefined;

        const appListCard =
            videoPlayerObj || audioPlayerObj
                ? {
                      type: "custom:layout-card",
                      layout_type: "custom:grid-layout",
                      layout: {
                          height: "448px",
                          margin: 0,
                          "grid-gap": "var(--sq-dialog-grid-gap)",
                      },
                      cards: appListCards,
                  }
                : undefined;

        let gridTemplateColumns = "auto";
        let cards: any = [];

        if (window.smartqasa.deviceType === "phone") {
            gridTemplateColumns = "auto";
            if (videoPlayerObj && audioPlayerObj) {
                cards = [
                    videoPlayerTitle,
                    videoPlayerCard,
                    audioPlayerTitle,
                    audioPlayerCard,
                    appListTitle,
                    appListCard,
                ];
            } else if (!videoPlayerObj && audioPlayerObj) {
                cards = [audioPlayerTitle, audioPlayerCard, appListTitle, appListCard];
            } else if (videoPlayerObj && !audioPlayerObj) {
                cards = [videoPlayerTitle, videoPlayerCard, appListTitle, appListCard];
            }
        } else {
            if (videoPlayerObj && audioPlayerObj) {
                gridTemplateColumns = "340px 420px 250px";
                cards = [
                    videoPlayerTitle,
                    audioPlayerTitle,
                    appListTitle,
                    videoPlayerCard,
                    audioPlayerCard,
                    appListCard,
                ];
            } else if (!videoPlayerObj && audioPlayerObj) {
                gridTemplateColumns = "420px 250px";
                cards = [audioPlayerTitle, audioPlayerCard, audioPlayerCard, appListCard];
            } else if (videoPlayerObj && !audioPlayerObj) {
                gridTemplateColumns = "340px 250px";
                cards = [videoPlayerTitle, videoPlayerCard, audioPlayerCard, appListCard];
            }
        }

        const dialogConfig = {
            title: "Entertainment",
            size: "fullscreen",
            timeout: 300000,
            content: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: {
                    margin: 0,
                    "place-content": "center",
                    "grid-template-columns": gridTemplateColumns,
                    "grid-template-rows": "max-content 448px",
                    "grid-gap": "var(--sq-dialog-grid-gap)",
                },
                cards: cards,
            },
        };

        window.browser_mod?.service("popup", dialogConfig);
    }

    async handleMenu(): Promise<void> {
        if (!this._config) return;

        function createAttributes(icon: string, label: string) {
            return {
                icon: window.smartqasa.deviceType === "phone" ? icon : null,
                label: window.smartqasa.deviceType === "tablet" ? label : null,
            };
        }

        const layout = {
            margin: 0,
            card_margin: 0,
            padding: "10px 0 0 0",
            "grid-template-columns":
                window.smartqasa.deviceType === "phone"
                    ? "repeat(2, var(--sq-tile-width-phone))"
                    : "repeat(3, var(--sq-tile-width-tablet))",
            "grid-gap": "var(--sq-dialog-grid-gap)",
        };

        const favoMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/favorites.yaml");
        const funcMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/functions.yaml");
        const applMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/functions.yaml");
        const utilMenuTiles = [
            {
                type: "custom:smartqasa-dialog-tile",
                dialog: "clean_screen",
            },
            {
                type: "custom:button-card",
                template: "themes-tile",
            },
            {
                type: "custom:button-card",
                template: "tablet-refresh-tile",
            },
            {
                type: "custom:button-card",
                template: "clear-cache-tile",
            },
            {
                type: "custom:button-card",
                template: "speedtest-tile",
            },
            {
                type: "custom:restriction-card",
                condition: {
                    entity: "input_boolean.admin_mode",
                    value: "off",
                },
                restrictions: {
                    block: {
                        condition: {
                            entity: "input_boolean.admin_mode",
                            value: "off",
                        },
                    },
                },
                card: {
                    type: "custom:button-card",
                    template: "system-reboot-tile",
                },
            },
            {
                type: "custom:restriction-card",
                condition: {
                    entity: "input_boolean.admin_mode",
                    value: "off",
                },
                restrictions: {
                    block: {
                        condition: {
                            entity: "input_boolean.admin_mode",
                            value: "off",
                        },
                    },
                },
                card: {
                    type: "custom:button-card",
                    template: "system-power-down-tile",
                },
            },
            {
                type: "custom:restriction-card",
                condition: {
                    entity: "input_boolean.admin_mode",
                    value: "off",
                },
                restrictions: {
                    block: {
                        condition: {
                            entity: "input_boolean.admin_mode",
                            value: "off",
                        },
                    },
                },
                card: {
                    type: "custom:smartqasa-app-tile",
                    app: "play_store",
                    icon: "mdi:store",
                },
            },
            {
                type: "custom:button-card",
                template: "admin-mode-tile",
            },
            {
                type: "custom:button-card",
                template: "about-tile",
            },
        ];

        const dialogConfig = {
            title: "Menu",
            timeout: 60000,
            content: {
                type: "custom:tabbed-card",
                options: {
                    defaultTabIndex: 0,
                },
                styles: {
                    "--mdc-tab-height": "45px",
                    "--mdc-typography-button-font-size": "var(--sq-primary-font-size)",
                    "--mdc-typography-button-font-weight": "var(--sq-primary-font-weight)",
                    "--mdc-typography-button-text-transform": "none",
                    "--mdc-theme-primary": "rgb(var(--sq-primary-font-rgb))",
                    "--mdc-tab-color-default": "rgb(var(--sq-inactive-rgb))",
                    "--mdc-tab-text-label-color-default": "rgb(var(--sq-inactive-rgb))",
                },
                tabs: [
                    {
                        attributes: createAttributes("hass:star", "Favorites"),
                        card: {
                            type: "custom:layout-card",
                            layout_type: "custom:grid-layout",
                            layout: layout,
                            cards: favoMenuTiles,
                        },
                    },
                    {
                        attributes: {
                            icon: window.smartqasa.deviceType === "phone" ? "hass:function-variant" : null,
                            label: window.smartqasa.deviceType === "tablet" ? "Functions" : null,
                        },
                        card: {
                            type: "custom:layout-card",
                            layout_type: "custom:grid-layout",
                            layout: layout,
                            cards: funcMenuTiles,
                        },
                    },
                    {
                        attributes: {
                            icon: "[[[ return smartqasa.deviceType === 'phone' ? 'hass:exit-to-app' : null ]]]",
                            label: "[[[ return smartqasa.deviceType === 'tablet' ? 'Apps' : null ]]]",
                        },
                        card: {
                            type: "custom:layout-card",
                            layout_type: "custom:grid-layout",
                            layout: layout,
                            cards: applMenuTiles,
                        },
                    },
                    {
                        attributes: {
                            icon: window.smartqasa.deviceType === "phone" ? "hass:cog-outline" : null,
                            label: window.smartqasa.deviceType === "tablet" ? "Utilities" : null,
                        },
                        card: {
                            type: "custom:layout-card",
                            layout_type: "custom:grid-layout",
                            layout: layout,
                            cards: utilMenuTiles,
                        },
                    },
                ],
            },
        };
        window.browser_mod?.service("popup", dialogConfig);
    }
}

window.customCards.push({
    type: "smartqasa-footer-strip",
    name: "SmartQasa Footer Strip",
    preview: true,
    description: "A SmartQasa tile for displaying the panel footer strip.",
});
