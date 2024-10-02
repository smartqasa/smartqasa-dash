import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { dialogTable } from "../dialogs/dialog-table";
import { dialogPopup } from "../dialogs/dialog-popup";
import { launchApp } from "../utilities/launch-app";

import tileStyle from "../css/tile.css";
import musicBarsStyle from "../css/music-bars.css";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

window.customCards.push({
    type: "smartqasa-audio-tile",
    name: "SmartQasa Audio Tile",
    preview: true,
    description: "A SmartQasa tile for displaying an audio dialog.",
});

@customElement("smartqasa-audio-tile")
export class AudioTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;

    private _entity?: string;
    private _stateObj?: HassEntity;
    private _iconHtml: TemplateResult = html``;
    private _name: string = "Unknown Speaker";
    private _stateFmtd: string = "Unknown State";

    static get styles(): CSSResultGroup[] {
        return [unsafeCSS(tileStyle), unsafeCSS(musicBarsStyle)];
    }

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("media_player.") ? this._config.entity : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this._config) return false;
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            changedProps.has("_config")
        );
    }

    protected willUpdate(): void {
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this._entity) return nothing;

        return html`
            <div class="container" @click=${this._showDialog}>
                ${this._iconHtml}
                <div class="text">
                    <div class="name">${this._name}</div>
                    <div class="state">${this._stateFmtd}</div>
                </div>
            </div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._stateObj) {
            if (this._stateObj.state === "playing") {
                this._iconHtml = html`
                    <div class="bars tile" @click=${this._launchApp}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                `;
            } else {
                this._iconHtml = html`
                    <div class="icon" @click=${this._launchApp}>
                        <ha-icon icon="hass:music"></ha-icon>
                    </div>
                `;
            }

            const state = this._stateObj.state || "unknown";
            this._name = this._config!.name || this._stateObj.attributes.friendly_name || "Speaker";
            this._stateFmtd = `${this.hass!.formatEntityState(this._stateObj)}${
                this._stateObj.attributes.volume_level
                    ? " - " + this.hass!.formatEntityAttributeValue(this._stateObj, "volume_level")
                    : ""
            }`;
        } else {
            this._iconHtml = html`
                <div class="icon">
                    <ha-icon icon="hass:music"></ha-icon>
                </div>
            `;
            this._name = this._config?.name || "Unknown Speaker";
            this._stateFmtd = "Unknown State";
        }
    }

    private _showDialog(e: Event): void {
        e.stopPropagation();
        const dialogObj = dialogTable["sonos"];
        if (!dialogObj) return;

        const dialogConfig = { ...dialogObj.data };
        if (this._entity) dialogConfig.content.entityId = this._entity;

        dialogPopup(dialogObj.data);
    }

    private _launchApp(e: Event): void {
        e.stopPropagation();
        launchApp("com.sonos.acr2");
    }
}
