import { css, html, LitElement, PropertyValues, TemplateResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { createElement } from "../utilities/create-element";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

window.customCards.push({
    type: "smartqasa-sonos-card",
    name: "SmartQasa Sonos Card",
    preview: true,
    description: "A SmartQasa element that display a set of Sonos cards.",
});

@customElement("smartqasa-sonos-card")
export class SonosPanelCard extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 10;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
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
            .card {
                display: block;
            }
        `;
    }

    public setConfig(config: Config): void {
        this._config = { ...config };

        if (this._config.entity) {
            this._entity = this._config.entity.startsWith("media_player.") ? this._config.entity : "undefined";
        }
    }

    protected willUpdate(changedProps: PropertyValues): void {
        if (changedProps.has("hass") && this.hass) {
            [this._speakersCard, this._playerCard, this._mediaCard].forEach((card) => {
                if (card) card.hass = this.hass;
            });
        }
    }

    protected render(): TemplateResult {
        const renderCard = (card: LovelaceCard | undefined): TemplateResult | typeof nothing => {
            if (!card) return nothing;
            const element = card as unknown as HTMLElement;
            return html`<div class="card">${element}</div>`;
        };

        return html`
            <div class="container">
                ${renderCard(this._speakersCard)} ${renderCard(this._playerCard)} ${renderCard(this._mediaCard)}
            </div>
        `;
    }

    protected firstUpdated(): void {
        this._speakersCard = createElement(
            {
                type: "custom:sonos-card",
                entityId: this._entity,
                heightPercentage: "75",
                showVolumeUpAndDownButtons: true,
                sections: '["volumes", "groups", "grouping"]',
            },
            this.hass
        );

        this._playerCard = createElement(
            {
                type: "custom:sonos-card",
                entityId: this._entity,
                heightPercentage: "75",
                showVolumeUpAndDownButtons: true,
                sections: '["player"]',
            },
            this.hass
        );

        this._mediaCard = createElement(
            {
                type: "custom:sonos-card",
                heightPercentage: "75",
                mediaBrowserItemsPerRow: 3,
                mediaBrowserShowTitleForThumbnailIcons: true,
                showVolumeUpAndDownButtons: true,
                sections: '["media browser"]',
            },
            this.hass
        );
    }
}
