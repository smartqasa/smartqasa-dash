import { css, html, LitElement, PropertyValues, TemplateResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { createElement } from "../utils/create-element";

interface Config extends LovelaceCardConfig {
    entity: string;
}

window.customCards.push({
    type: "smartqasa-sonos-card",
    name: "SmartQasa Sonos Card",
    preview: false,
    description: "A SmartQasa element that display a set of Sonos cards.",
});

@customElement("smartqasa-sonos-card")
export class SonosCard extends LitElement {
    @property({ attribute: false }) private hass?: HomeAssistant;
    @state() private _config?: Config;
    private _entity?: string;

    private _speakersCard?: LovelaceCard;
    private _playerCard?: LovelaceCard;
    private _mediaCard?: LovelaceCard;

    static get styles() {
        return css`
            .container {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: var(--sq-card-spacing, 0.8rem);
            }
        `;
    }

    public setConfig(config: Config): void {
        this._config = { ...config };

        if (this._config.entity) {
            this._entity = this._config.entity.startsWith("media_player.") ? this._config.entity : "undefined";
        }
    }

    protected firstUpdated(): void {
        this._speakersCard = createElement({
            type: "custom:sonos-card",
            entityId: this._entity,
            heightPercentage: "75",
            showVolumeUpAndDownButtons: true,
            sections: ["volumes", "groups", "grouping"],
        });

        this._playerCard = createElement({
            type: "custom:sonos-card",
            entityId: this._entity,
            heightPercentage: "75",
            showVolumeUpAndDownButtons: true,
            sections: ["player"],
        });

        this._mediaCard = createElement({
            type: "custom:sonos-card",
            heightPercentage: "75",
            mediaBrowserItemsPerRow: 3,
            mediaBrowserShowTitleForThumbnailIcons: true,
            showVolumeUpAndDownButtons: true,
            sections: ["media browser"],
        });
    }

    protected willUpdate(changedProps: PropertyValues): void {
        if (!this.hass || !this._entity) return;

        if (changedProps.has("hass")) {
            if (this._speakersCard) this._speakersCard.hass = this.hass;
            if (this._playerCard) this._playerCard.hass = this.hass;
            if (this._mediaCard) this._mediaCard.hass = this.hass;
        }
    }

    protected render(): TemplateResult {
        return html`
            <div class="container">
                <div>${this._speakersCard ? html`${this._speakersCard}` : nothing}</div>
                <div>${this._playerCard ? html`${this._playerCard}` : nothing}</div>
                <div>${this._mediaCard ? html`${this._mediaCard}` : nothing}</div>
            </div>
        `;
    }
}
