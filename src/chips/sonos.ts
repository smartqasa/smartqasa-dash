import { CSSResult, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { when } from "lit/directives/when.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { dialogTable } from "../dialogs/dialog-table";
import { dialogPopup } from "../dialogs/dialog-popup";
import { launchApp } from "../utils/launch-app";

import chipBaseStyle from "../css/chip-base.css";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

window.customCards.push({
    type: "smartqasa-sonos-chip",
    name: "SmartQasa Sonos Chip",
    preview: true,
    description: "A SmartQasa chip for displaying a Sonos dialog.",
});

@customElement("smartqasa-sonos-chip")
export class SonosChip extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;

    private _entity?: string;
    private _stateObj?: HassEntity;
    private _icon: string = "hass:music";
    private _iconStyles: Record<string, string> = {};

    static get styles(): CSSResult[] {
        return [
            unsafeCSS(chipBaseStyle),
            unsafeCSS(`
                .bars {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: var(--sq-icon-size, 1.8rem); /* Match icon size */
                    width: var(--sq-icon-size, 1.8rem); /* Match icon size */
                    padding: var(--sq-chip-padding, 1rem);
                }

                .bars > div {
                    background: var(--accent-color);
                    height: 0.15rem;
                    width: 0.15rem;
                    margin: 0 0.05rem;
                    animation: blink 1s ease-in-out infinite;
                }

                .bars > div:nth-child(1) {
                    animation-delay: -0.4s;
                }

                .bars > div:nth-child(2) {
                    animation-delay: -0.2s;
                }

                .bars > div:nth-child(3) {
                    animation-delay: 0s;
                }
            `),
        ];
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

        const isPlaying = this._stateObj?.state === "playing";

        return html`
            <div class="container" @click=${this._showDialog} @contextmenu=${this._launchApp}>
                ${when(
                    !isPlaying, // Render icon when not playing
                    () => html`
                        <div class="icon" style="${styleMap(this._iconStyles)}">
                            <ha-icon .icon=${this._icon}></ha-icon>
                        </div>
                    `,
                    () => html`
                        <!-- Render bars when playing -->
                        <div class="bars">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    `
                )}
            </div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;
        const state = this._stateObj?.state;

        let iconColor: string;
        if (state) {
            iconColor = state === "playing" ? "var(--sq-rgb-blue)" : "var(--sq-primary-font-rgb)";
        } else {
            iconColor = "var(--sq-unavailable-rgb)";
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
        };
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
