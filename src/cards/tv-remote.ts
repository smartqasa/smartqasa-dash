import { css, CSSResult, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";
import channelTable from "../tables/channels";

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
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    @state() private mode: string = "remote";
    private entity?: string;
    private stateObj?: HassEntity;
    private entities: { [key: string]: string | undefined } = {};

    static get styles(): CSSResult {
        return css`
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                box-sizing: border-box;
            }
            .container {
                display: flex;
                flex-direction: column;
                width: fit-content;
                margin: 1.2rem;
                padding: 1.2rem;
                border: var(--sq-card-border, none);
                border-radius: var(--sq-card-border-radius, 1.5rem);
                background-color: var(--sq-card-background-color, rgba(192, 192, 192, 0.5));
            }
            .name {
                padding: 0.5rem;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: var(--sq-primary-font-weight, 400);
                font-size: var(--sq-primary-font-size, 1.5rem);
                color: rgb(var(--sq-primary-font-rgb, 128, 128, 128));
                width: 100%;
            }
            .sections {
                display: grid;
                grid-template-columns: auto auto;
                gap: 4rem;
            }
            .remote-section {
            }
            .row {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .icon {
                display: flex;
                justify-content: center;
                align-self: center;
                margin: 0.8rem;
                padding: 1rem;
                border: var(--sq-card-border, none);
                border-radius: var(--border-radius, 1rem);
                background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-opacity, 0.2)),
                cursor: pointer;
            }
            ha-icon {
                --mdc-icon-size: 2rem;
            }
            .app-section {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .active-app {
                width: 5.5rem;
                height: calc(5.5rem / 1.33);
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 1rem 0;
            }
            .active-app img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .app-list {
                display: grid;
                grid-template-columns: repeat(3, 5.5rem);
                grid-auto-rows: calc(5.5rem / 1.33);
                gap: 1rem;
                justify-content: center;
                width: 100%;
                height: 33rem;
                overflow: hidden;
                overflow-y: auto;
                scrollbar-width: none; /* Hide scrollbar for Firefox */
            }
            .app-list::-webkit-scrollbar {
                display: none; /* Hide scrollbar for Safari and Chrome */
            }
            .app-item {
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
            .app-item img {
                width: 100%;
                height: 100%;
                object-fit: cover;
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
                `media_player.${entityBase}_tv_speakers`,
                `media_player.${entityBase}_tv_speaker`,
                `media_player.${entityBase}_tv`,
            ];
            return candidates.find((candidate) => this.hass?.states[candidate]) || undefined;
        };

        const findVideoEntity = () => {
            if (this.config?.video_entity) return this.config.video_entity;
            const candidates = [
                `media_player.${entityBase}_frame_tv`,
                `media_player.${entityBase}_frame`,
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

        return html`
            <div class="container">
                <div class="name">${this.config!.name || this.stateObj!.attributes.friendly_name || "TV Remote"}</div>
                <div class="sections">
                    <div class="remote-section">${this._renderRemoteSection()}</div>
                    <div class="app-section">${this._renderAppSection()}</div>
                </div>
            </div>
        `;
    }

    private _renderRemoteSection(): TemplateResult {
        return html`
            <div class="row">${this._renderButton("power", "power", "mdi:power")}</div>
            <div class="row">
                ${this._renderButton("command", "back", "mdi:restore")}
                ${this._renderButton("command", "info", "mdi:asterisk")}
                ${this._renderButton("command", "home", "mdi:home")}
            </div>
            <div class="row">${this._renderButton("command", "up", "mdi:chevron-up")}</div>
            <div class="row">
                ${this._renderButton("command", "left", "mdi:chevron-left")}
                ${this._renderButton("command", "select", "mdi:checkbox-blank-circle")}
                ${this._renderButton("command", "right", "mdi:chevron-right")}
            </div>
            <div class="row">${this._renderButton("command", "down", "mdi:chevron-down")}</div>
            <div class="row">
                ${this._renderButton("command", "reverse", "mdi:rewind")}
                ${this._renderButton("command", "play", "mdi:play-pause")}
                ${this._renderButton("command", "forward", "mdi:fast-forward")}
            </div>
            <div class="row">
                ${this._renderButton("volume", "volume_down", "mdi:volume-minus")}
                ${this._renderButton("volume_mute", "volume_mute", "mdi:volume-mute")}
                ${this._renderButton("volume_up", "volume_up", "mdi:volume-plus")}
            </div>
        `;
    }

    private _renderButton(category: string, button: string, icon: string): TemplateResult {
        return html`
            <div class="icon" data-category=${category} data-button=${button} @click=${this._handleButton}>
                <ha-icon .icon=${icon}></ha-icon>
            </div>
        `;
    }

    private _renderAppSection(): TemplateResult {
        const activeApp = this.stateObj!.attributes.app_name;
        const activeIcon = channelTable[activeApp];

        // Filter out the active app from the source list
        const availableApps = this.stateObj!.attributes.source_list.filter((app: string) => app !== activeApp);

        return html`
            <div class="app-section">
                <div class="active-app">
                    ${activeIcon ? html`<img src="${activeIcon}" alt="${activeApp}" />` : html`${activeApp}`}
                </div>
                <div class="app-list">
                    ${availableApps.map((app: string) => {
                        const icon = channelTable[app];
                        return html`
                            <div
                                class="app-item"
                                @click=${() => this.selectApp(app)}
                                style="${this._getAppItemStyle(icon)}"
                            >
                                ${icon ? html`<img src="${icon}" alt="${app}" />` : html`${app}`}
                            </div>
                        `;
                    })}
                </div>
            </div>
        `;
    }

    private _getAppItemStyle(icon: string | undefined): string {
        return icon
            ? ""
            : `
                font-weight: var(--sq-secondary-font-weight, 300);
                font-size: var(--sq-secondary-font-size, 1rem);
                color: rgb(var(--sq-primary-font-rgb, 128, 128, 128));
                text-overflow: ellipsis;
                overflow: hidden;
            `;
    }

    private _handleButton(e: Event): void {
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
        }
    }

    private handlePower(): void {
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

    private selectApp(app: string): void {
        if (!this.hass || !this.entity) return;
        callService(this.hass!, "media_player", "select_source", {
            entity_id: this.entity,
            source: app,
        });
    }
}
