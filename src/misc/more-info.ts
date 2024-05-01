import { html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "../types";

interface Config extends LovelaceCardConfig {
    category?: string;
    entity: string;
}

@customElement("smartqasa-more-info-dialog")
export class MoreInfoDialog extends LitElement {
    @state() private _config?: Config;
    @state() private _stateObj?: HassEntity;

    private _entity?: string;
    private _hass: any;

    setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = this._config?.entity;
    }

    set hass(hass: HomeAssistant) {
        if (!this._entity || !hass) return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
    }

    protected render(): TemplateResult {
        return html`
            <div>
                <div class="card-content">
                    <more-info-content .hass=${this._hass} .stateObj=${this._stateObj}> </more-info-content>
                </div>
            </div>
        `;
    }

    getCardSize(): number {
        return 5;
    }
}

window.customCards.push({
    type: "smartqasa-more-info-dialog",
    name: "SmartQasa More Info Dialog",
    preview: true,
    description: "A SmartQasa dialog for showing More Info for an entity.",
});
