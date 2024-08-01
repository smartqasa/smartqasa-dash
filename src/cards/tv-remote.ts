import { css, CSSResult, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";

interface Config extends LovelaceCardConfig {
    stream_entity: string;
    name?: string;
    audio_entity?: string;
    remote_entity?: string;
    video_entity?: string;
    power?: string;
    volume?: string;
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
    private entities: { [key: string]: string | undefined } = {};

    static get styles(): CSSResult {
        return css`
            .container {
                padding: 1rem;
            }
            .row {
                display: flex;
                padding: 0.8rem 4rem 0.8rem 4rem;
                justify-content: space-evenly;
                align-items: center;
            }
            .name {
                padding: 0.8rem;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: var(--sq-primary-font-weight, 400);
                font-size: var(--sq-primary-font-size, 1.5rem);
                color: rgb(var(--sq-primary-font-rgb), 128, 128, 128);
            }
            .icon {
                display: flex;
                justify-content: center;
                align-self: center;
                height: 3rem;
                width: 3rem;
                padding: 0.8rem;
                cursor: pointer;
            }
            ha-icon {
                --mdc-icon-size: 3rem;
            }
            .warning {
                display: block;
                color: black;
                background-color: #fce588;
                padding: 8px;
            }
        `;
    }

    public setConfig(config: Config): void {
        this.config = { ...config };

        if (!this.config.stream_entity?.startsWith("media_player.")) return;

        this.entities.streamEntity = this.config.stream_entity;
        const objectID = this.config.stream_entity.split(".")[1];

        this.entities.remoteEntity = this.config.remote_entity?.startsWith("remote.")
            ? this.config.remote_entity
            : `remote.${objectID}`;
        this.entities.audioEntity = this.config.audio_entity?.startsWith("media_player.")
            ? this.config.audio_entity
            : `media_player.${objectID}`;
        this.entities.videoEntity = this.config.video_entity?.startsWith("media_player.")
            ? this.config.video_entity
            : `media_player.${objectID}`;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        const hasStateChanged = (entity: string | undefined, stateObj: any): boolean => {
            return entity !== undefined && this.hass?.states[entity] !== stateObj;
        };

        return !!(
            (changedProps.has("hass") &&
                hasStateChanged(this.entities.streamEntity, this.hass?.states[this.entities.streamEntity!])) ||
            (changedProps.has("config") && this.config)
        );
    }

    protected render(): TemplateResult | void {
        if (!this.config || !this.hass) {
            return html``;
        }

        const streamObj = this.hass.states[this.entities.streamEntity!];
        if (!streamObj) {
            return html`
                <ha-card>
                    <div class="warning">Entity Unavailable</div>
                </ha-card>
            `;
        }

        return html`
            <div class="container">
                <div class="name">${this.config.name || streamObj.attributes.friendly_name || "TV Remote"}</div>

                <div class="row">
                    <div class="app">${streamObj.attributes.app_name || ""}</div>
                    ${this.renderButton("power", "power", "mdi:power", "Power")}
                </div>

                <div class="row">
                    ${this.renderButton("command", "mdi:arrow-left", "Back", "back")}
                    ${this.renderButton("command", "mdi:asterisk", "Info", "info")}
                    ${this.renderButton("command", "mdi:home", "Home", "home")}
                </div>

                <div class="row">${this.renderButton("command", "mdi:chevron-up", "Up", "up")}</div>

                <div class="row">
                    ${this.renderButton("command", "mdi:chevron-left", "Left", "left")}
                    ${this.renderButton("command", "mdi:checkbox-blank-circle", "Select", "select")}
                    ${this.renderButton("command", "mdi:chevron-right", "Right", "right")}
                </div>

                <div class="row">${this.renderButton("command", "mdi:chevron-down", "Down", "down")}</div>

                <div class="row">
                    ${this.renderButton("command", "mdi:rewind", "Rewind", "reverse")}
                    ${this.renderButton("command", "mdi:play-pause", "Play/Pause", "play")}
                    ${this.renderButton("command", "mdi:fast-forward", "Fast-Forward", "forward")}
                </div>

                <div class="row">
                    ${this.renderButton("volume", "mdi:volume-mute", "Volume Mute", "volume_mute")}
                    ${this.renderButton("volume", "mdi:volume-minus", "Volume Down", "volume_down")}
                    ${this.renderButton("volume", "mdi:volume-plus", "Volume Up", "volume_up")}
                </div>
            </div>
        `;
    }

    private renderButton(category: string, icon: string, title: string, button: string): TemplateResult {
        return html`
            <div class="icon" data-category=${category} data-button=${button} @click=${this.handleButton}>
                <ha-icon .icon=${icon}></ha-icon>
            </div>
        `;
    }

    private handleButton(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this.entities.streamEntity) return;

        const target = e.currentTarget as HTMLElement;
        const category = target.dataset.category!;
        const button = target.dataset.button!;

        if (category === "power") {
            this.handlePower();
        } else if (category === "volume") {
            this.handleVolume(button);
        } else if (category === "command") {
            this.handleCommand(button);
        }
    }

    private handlePower(): void {
        const powerEntity = this.config?.power === "video" ? this.entities.videoEntity : this.entities.remoteEntity;
        if (powerEntity) {
            const state = this.hass?.states[powerEntity].state;
            const action = state === "on" ? "turn_off" : "turn_on";
            callService(this.hass!, "media_player", action, { entity_id: powerEntity });
        }
    }

    private handleVolume(button: string): void {
        const entity = this.getVolumeEntity();
        if (entity) {
            if (button === "volume_mute") {
                callService(this.hass!, "media_player", "volume_mute", {
                    entity_id: entity,
                    is_volume_muted: !this.hass!.states[entity].attributes.is_volume_muted,
                });
            } else {
                callService(this.hass!, "media_player", button, { entity_id: entity });
            }
        } else {
            callService(this.hass!, "remote", "send_command", {
                entity_id: this.entities.remoteEntity,
                command: button,
            });
        }
    }

    private handleCommand(button: string): void {
        callService(this.hass!, "remote", "send_command", { entity_id: this.entities.streamEntity, command: button });
    }

    private getVolumeEntity(): string | undefined {
        if (this.config?.volume === "audio" && this.entities.audioEntity) {
            return this.entities.audioEntity;
        } else if (this.config?.volume === "video" && this.entities.videoEntity) {
            return this.entities.videoEntity;
        }
        return undefined;
    }
}
