import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { dialogTable } from "../dialogs/dialog-table";
import { dialogPopup } from "../dialogs/dialog-popup";
import { launchApp } from "../utilities/launch-app";

import chipBaseStyle from "../css/chip-base.css";
import musicBarsStyle from "../css/music-bars.css";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

window.customCards.push({
    type: "smartqasa-audio-chip",
    name: "SmartQasa Audio Chip",
    preview: true,
    description: "A SmartQasa chip for displaying an audio dialog.",
});

@customElement("smartqasa-audio-chip")
export class AudioChip extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static get styles(): CSSResultGroup[] {
        return [unsafeCSS(chipBaseStyle), unsafeCSS(musicBarsStyle)];
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

        let content;
        if (this._stateObj?.state === "playing") {
            content = html`
                <div class="bars">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            `;
        } else {
            content = html`
                <div class="icon">
                    <ha-icon icon="hass:music"></ha-icon>
                </div>
            `;
        }

        return html`
            <div class="container" @click=${this._showDialog} @contextmenu=${this._launchApp}>${content}</div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;
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