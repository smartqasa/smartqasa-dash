import { css, CSSResult, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";

interface Config extends LovelaceCardConfig {
    audio_entity: string;
    stream_entity: string;
    video_entity?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-tv-remote-card",
    name: "SmartQasa TV Remote Card",
    preview: true,
    description: "A SmartQasa card for simulating a television remote control",
});

@customElement("smartqasa-tv-remote-card")
export class TVRemoteCard extends LitElement {
    getCardSize() {
        return 7;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    private audioEntity?: string;
    private audioObj?: HassEntity;
    private streamEntity?: string;
    private streamObj?: HassEntity;
    private videoEntity?: string;
    private videoObj?: HassEntity;

    static get styles(): CSSResult {
        return css`
            .container {
                padding: 1rem;
            }
            .name {
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: var(--sq-primary-font-weight, 400);
                font-size: var(--sq-primary-font-size, 1.5rem);
                color: rgb(var(--sq-primary-font-rgb), 128, 128, 128);
            }
            img,
            ha-icon {
                cursor: pointer;
            }
            ha-icon-button {
                --mdc-icon-size: 4rem;
            }
            ha-icon-button ha-icon {
                display: flex;
            }
            img {
                width: 64px;
                height: 64px;
                border-radius: 25px;
            }
            .row {
                display: flex;
                padding: 1rem 4rem 1rem 4rem;
                justify-content: space-evenly;
                align-items: center;
            }
            .warning {
                display: block;
                color: black;
                background-color: #fce588;
                padding: 8px;
            }
            .app {
                flex-grow: 3;
                font-size: 20px;
            }
        `;
    }

    public setConfig(config: Config): void {
        this.config = { ...config };
        this.audioEntity = this.config.audio_entity?.startsWith("media_player.") ? this.config.audio_entity : undefined;
        this.streamEntity = this.config.stream_entity?.startsWith("media_player.")
            ? this.config.stream_entity
            : undefined;
        this.videoEntity = this.config.video_entity?.startsWith("media_player.") ? this.config.video_entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        const hasStateChanged = (entity: string | undefined, stateObj: any): boolean => {
            return entity !== undefined && this.hass?.states[entity] !== stateObj;
        };

        return (
            (changedProps.has("hass") &&
                (hasStateChanged(this.audioEntity, this.audioObj) ||
                    hasStateChanged(this.streamEntity, this.streamObj) ||
                    hasStateChanged(this.videoEntity, this.videoObj))) ||
            (changedProps.has("config") && this.config !== undefined)
        );
    }

    protected render(): TemplateResult | void {
        if (!this.config || !this.hass) {
            return html``;
        }

        this.streamObj = this.hass.states[this.streamEntity!] || undefined;

        if (this.config.stream_entity && !this.streamObj) {
            return html`
                <ha-card>
                    <div class="warning">Entity Unavailable</div>
                </ha-card>
            `;
        }

        return html`
            <div class="container">
                <div class="name">${this.config.name || this.streamObj?.attributes.friendly_name || "TV Remote"}</div>

                <div class="row">
                    <div class="app">${this.streamObj.attributes.app_name || ""}</div>
                    ${this.renderButton("power", "mdi:power", "Power")}
                </div>

                <div class="row">
                    ${this.renderButton("back", "mdi:arrow-left", "Back")}
                    ${this.renderButton("info", "mdi:asterisk", "Info")}
                    ${this.renderButton("home", "mdi:home", "Home")}
                </div>

                <div class="row">${this.renderButton("up", "mdi:chevron-up", "Up")}</div>

                <div class="row">
                    ${this.renderButton("left", "mdi:chevron-left", "Left")}
                    ${this.renderButton("select", "mdi:checkbox-blank-circle", "Select")}
                    ${this.renderButton("right", "mdi:chevron-right", "Right")}
                </div>

                <div class="row">${this.renderButton("down", "mdi:chevron-down", "Down")}</div>

                <div class="row">
                    ${this.renderButton("reverse", "mdi:rewind", "Rewind")}
                    ${this.renderButton("play", "mdi:play-pause", "Play/Pause")}
                    ${this.renderButton("forward", "mdi:fast-forward", "Fast-Forward")}
                </div>

                <div class="row">
                    ${this.renderButton("volume_mute", "mdi:volume-mute", "Volume Mute")}
                    ${this.renderButton("volume_down", "mdi:volume-minus", "Volume Down")}
                    ${this.renderButton("volume_up", "mdi:volume-plus", "Volume Up")}
                </div>
            </div>
        `;
    }

    private renderButton(button: string, icon: string, title: string): TemplateResult {
        if (this.config) {
            const config = this.config[button];
            return config && config.show === false
                ? html` <ha-icon icon="mdi:none"></ha-icon> `
                : html`
                      <ha-icon-button .button=${button} title=${title} })}>
                          <ha-icon .icon=${icon}></ha-icon>
                      </ha-icon-button>
                  `;
        } else {
            return html``;
        }
    }
}