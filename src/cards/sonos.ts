import { css, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { createElement } from "../utils/create-element";

interface Config extends LovelaceCardConfig {
    entity?: string;
}

window.customCards.push({
    type: "smartqasa-sonos-card",
    name: "SmartQasa Sonos Card",
    preview: false,
    description: "A SmartQasa element that display a set of Sonos card.",
});

@customElement("smartqasa-sonos-card")
class SonosCard extends LitElement {
    @property({ attribute: false }) private hass?: HomeAssistant;
    @state() private _config?: Config;
    private _speakers?: LovelaceCard;
    private _player?: LovelaceCard;
    private _media?: LovelaceCard;

    static get styles() {
        return css`
            .container {
                display: flex;
                gap: var(--sq-tile-spacing, 0.8rem);
            }
            .speakers {
                width: 0.3fr;
            }
            .player {
                width: 0.4fr;
            }
            .media {
                width: 0.3fr;
            }
        `;
    }

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._loadCards();
    }

    protected willUpdate(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("hass") && this.hass) {
            if (this._speakers) this._speakers.hass = this.hass;
            if (this._player) this._player.hass = this.hass;
            if (this._media) this._media.hass = this.hass;
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this.hass) return nothing;
        return html`
            <div class="container">
                <div class="speakers">${this._speakers}</div>
                <div class="player">${this._player}</div>
                <div class="media">${this._media}</div>
            </div>
        `;
    }

    private _loadCards(): void {
        if (!this.hass || !this._config) return;

        this._speakers = createElement(
            {
                type: "custom:sonos-card",
                entityId: this._config.entity,
                heightPercentage: "75",
                showVolumeUpAndDownButtons: true,
                sections: ["volumes", "groups", "grouping"],
            },
            this.hass
        );
        this._player = createElement(
            {
                type: "custom:sonos-card",
                entityId: this._config.entity,
                heightPercentage: "75",
                showVolumeUpAndDownButtons: true,
                sections: ["player"],
            },
            this.hass
        );
        this._media = createElement(
            {
                type: "custom:sonos-card",
                heightPercentage: "75",
                mediaBrowserItemsPerRow: 3,
                mediaBrowserShowTitleForThumbnailIcons: true,
                showVolumeUpAndDownButtons: true,
                sections: ["media browser"],
            },
            this.hass
        );
    }
}
