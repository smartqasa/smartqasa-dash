import { css, CSSResult, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";

import rokuLogo from "../assets/tv-remote/logos/roku.webp";

interface Config extends LovelaceCardConfig {
    entity: string;
    name?: string;
    audio_entity?: string;
    remote_entity?: string;
    video_entity?: string;
}

window.customCards.push({
    type: "smartqasa-tv-remote-card",
    name: "SmartQasa TV Remote Card",
    preview: true,
    description: "A SmartQasa card for simulating a television remote control.",
});

@customElement("smartqasa-tv-remote-card")
export class TVRemoteCard extends LitElement {
    getCardSize() {
        return 7;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    @state() private mode: string = "remote";
    private entity?: string;
    private stateObj?: HassEntity;
    private entities: { [key: string]: string | undefined } = {};

    static get styles(): CSSResult {
        return css`
            .container {
                display: flex;
                width: 22rem;
                margin: 1rem;
                padding: 1rem;
                border: var(--sq-card-border, none);
                border-radius: var(--sq-card-border-radius, 1.5rem);
                flex-direction: column;
                height: 100%; /* Ensure container takes full height */
            }
            .warning {
                display: block;
                color: black;
                background-color: #fce588;
                padding: 8px;
            }
            .name {
                padding: 1rem;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: var(--sq-primary-font-weight, 400);
                font-size: var(--sq-primary-font-size, 1.5rem);
                color: rgb(var(--sq-primary-font-rgb), 128, 128, 128);
            }
            .body {
                height: 40rem;
                overflow-y: auto;
                -ms-overflow-style: none; /* Hide scrollbar for Internet Explorer 10+ */
                scrollbar-width: none; /* Hide scrollbar for Firefox */
            }
            .body::-webkit-scrollbar {
                display: none; /* Hide scrollbar for Safari and Chrome */
            }
            .row {
                display: flex;
                margin: 1.5rem;
                justify-content: center;
                align-items: center;
            }
            .icon {
                display: flex;
                justify-content: center;
                align-self: center;
                margin: 0 0.8rem 0 0.8rem;
                padding: 1rem;
                border: var(--sq-card-border, none);
                border-radius: 1rem;
                background-color: var(--sq-card-background-color, rgba(192, 192, 192, 0.5));
                cursor: pointer;
            }
            ha-icon {
                --mdc-icon-size: 2rem;
            }
            .app-list {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                margin: 1rem;
            }
            .app {
                margin: 5px;
                padding: 5px 10px;
                background: var(--sq-card-background-color, rgba(192, 192, 192, 0.5));
                color: rgb(var(--sq-primary-font-rgb), 128, 128, 128);
                border: var(--sq-card-border, none);
                border-radius: 0.5rem;
                cursor: pointer;
            }
            .logo {
                display: flex;
                margin: 0 0.8rem 0 0.8rem;
                justify-content: center;
                align-items: center;
            }
            .logo img {
                height: 4rem;
                width: 4rem;
                border-radius: 1rem;
            }
        `;
    }

    public setConfig(config: Config): void {
        this.config = { ...config };
        if (!this.config.entity.startsWith("media_player.")) return;

        this.entity = this.config.entity;
        this.initializeEntities();
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this.entity && this.hass?.states[this.entity] !== this.stateObj) ||
            (changedProps.has("config") && this.config) ||
            (changedProps.has("mode") && this.mode)
        );
    }

    protected updated(changedProps: PropertyValues): void {
        if (changedProps.has("hass") || changedProps.has("config")) {
            this.initializeEntities();
        }
    }

    private initializeEntities(): void {
        if (!this.hass || !this.config || !this.entity) return;

        this.entities.remote = this.config.remote_entity
            ? this.config.remote_entity
            : `remote.${this.entity.split(".")[1]}`;

        const entityBase = this.entity.split(".")[1].replace(/_roku$/, "");

        const findAudioEntity = () => {
            if (this.config?.audio_entity) return this.config.audio_entity;
            const candidates = [
                `media_player.${entityBase}_arc`,
                `media_player.${entityBase}_beam`,
                `media_player.${entityBase}_playbar`,
                `media_player.${entityBase}_sound_bar`,
                `media_player.${entityBase}_soundbar`,
                `media_player.${entityBase}_tv_speaker`,
                `media_player.${entityBase}_tv_speakers`,
                `media_player.${entityBase}_tv`,
            ];
            return candidates.find((candidate) => this.hass?.states[candidate]) || undefined;
        };

        const findVideoEntity = () => {
            if (this.config?.video_entity) return this.config.video_entity;
            const candidates = [
                `media_player.${entityBase}_frame`,
                `media_player.${entityBase}_frame_tv`,
                `media_player.${entityBase}_tv`,
            ];
            return candidates.find((candidate) => this.hass?.states[candidate]) || undefined;
        };

        this.entities.audio = findAudioEntity();
        this.entities.video = findVideoEntity();
    }

    protected render(): TemplateResult | void {
        if (!this.hass || !this.config || !this.entity || !this.entities.remote) {
            return html``;
        }

        this.stateObj = this.hass.states[this.entity];
        if (!this.stateObj || !this.hass.states[this.entities.remote]) {
            return html`
                <ha-card>
                    <div class="warning">Entity Unavailable</div>
                </ha-card>
            `;
        }

        switch (this.mode) {
            case "remote":
                return html`
                    <div class="container">
                        <div class="name">
                            ${this.config.name || this.stateObj.attributes.friendly_name || "TV Remote"}
                        </div>

                        <div class="body">
                            <div class="row">${this.renderButton("power", "power", "mdi:power")}</div>

                            <div class="row">
                                ${this.renderButton("command", "back", "mdi:arrow-left")}
                                ${this.renderButton("command", "info", "mdi:asterisk")}
                                ${this.renderButton("command", "home", "mdi:home")}
                            </div>

                            <div class="row">${this.renderButton("command", "up", "mdi:chevron-up")}</div>

                            <div class="row">
                                ${this.renderButton("command", "left", "mdi:chevron-left")}
                                ${this.renderButton("command", "select", "mdi:checkbox-blank-circle")}
                                ${this.renderButton("command", "right", "mdi:chevron-right")}
                            </div>

                            <div class="row">${this.renderButton("command", "down", "mdi:chevron-down")}</div>

                            <div class="row">
                                ${this.renderButton("command", "reverse", "mdi:rewind")}
                                ${this.renderButton("command", "play", "mdi:play-pause")}
                                ${this.renderButton("command", "forward", "mdi:fast-forward")}
                            </div>

                            <div class="row">
                                ${this.renderButton("volume", "volume_down", "mdi:volume-minus")}
                                ${this.renderButton("volume", "volume_mute", "mdi:volume-mute")}
                                ${this.renderButton("volume", "volume_up", "mdi:volume-plus")}
                            </div>
                        </div>

                        <div class="row">
                            ${this.renderButton("navigate", "remote", "mdi:remote-tv")}
                            <div class="logo">
                                <img src="${rokuLogo}" />
                            </div>
                            ${this.renderButton("navigate", "app_select", "mdi:apps-box")}
                        </div>
                    </div>
                `;

            case "app_select":
                return html`
                    <div class="container">
                        <div class="name">
                            ${this.config.name || this.stateObj.attributes.friendly_name || "TV Remote"}
                        </div>

                        <div class="body">
                            <div class="app-list">
                                ${this.stateObj.attributes.source_list.map(
                                    (app: string) => html`
                                        <div class="app" @click=${() => this.selectApp(app)}>${app}</div>
                                    `
                                )}
                            </div>
                        </div>

                        <div class="row">
                            ${this.renderButton("navigate", "remote", "mdi:remote-tv")}
                            <div class="logo">
                                <img src="${rokuLogo}" />
                            </div>
                            ${this.renderButton("navigate", "app_select", "mdi:apps-box")}
                        </div>
                    </div>
                `;
        }
    }

    private renderButton(category: string, button: string, icon: string): TemplateResult {
        return html`
            <div class="icon" data-category=${category} data-button=${button} @click=${this.handleButton}>
                <ha-icon .icon=${icon}></ha-icon>
            </div>
        `;
    }

    private handleButton(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this.entity) return;

        const target = e.currentTarget as HTMLElement;
        const category = target.dataset.category!;
        const button = target.dataset.button!;

        if (category === "power") {
            this.handlePower();
        } else if (category === "volume") {
            this.handleVolume(button);
        } else if (category === "command") {
            this.handleCommand(button);
        } else if (category === "navigate") {
            this.handleNavigate(button);
        }
    }

    private handlePower(): void {
        /*
        const entity = this.entities.video || undefined;
        if (entity) {
            callService(this.hass!, "media_player", "toggle", { entity_id: entity });
            return;
        }
*/
        callService(this.hass!, "remote", "send_command", { entity_id: this.entities.remote, command: "power" });
    }

    private handleVolume(button: string): void {
        const entity = this.entities.audio || undefined;
        if (entity) {
            const isMuted = this.hass!.states[entity].attributes.is_volume_muted;
            if (button === "volume_mute") {
                callService(this.hass!, "media_player", "volume_mute", {
                    entity_id: entity,
                    is_volume_muted: !isMuted,
                });
            } else {
                if (!isMuted) {
                    callService(this.hass!, "media_player", button, { entity_id: entity });
                } else {
                    callService(this.hass!, "media_player", "volume_mute", {
                        entity_id: entity,
                        is_volume_muted: false,
                    });
                }
            }
        } else {
            callService(this.hass!, "remote", "send_command", {
                entity_id: this.entities.remote,
                command: button,
            });
        }
    }

    private handleCommand(button: string): void {
        callService(this.hass!, "remote", "send_command", { entity_id: this.entities.remote, command: button });
    }

    private handleNavigate(button: string): void {
        this.mode = button;
    }

    private selectApp(app: string): void {
        if (!this.hass || !this.entity) return;
        callService(this.hass!, "media_player", "select_source", {
            entity_id: this.entity,
            source: app,
        });
    }
}
