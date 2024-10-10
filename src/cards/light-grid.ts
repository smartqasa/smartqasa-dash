import { css, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from "../types";
import { deviceType } from "../utilities/device-info";

interface Config extends LovelaceCardConfig {
    entities: string[];
    columns?: number;
    style?: "circle" | "square";
}

window.customCards.push({
    type: "smartqasa-light-grid",
    name: "SmartQasa Light Grid",
    preview: false,
    description: "A SmartQasa card that displays a series of light entities in a configurable grid.",
});

@customElement("smartqasa-light-grid")
class LightGrid extends LitElement implements LovelaceCard {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;

    private _columns = 2;
    private _style: "circle" | "square" = "circle";
    private _entities: string[] = [];

    static get styles() {
        return css`
            .container {
                display: grid;
                grid-auto-rows: 8rem;
                gap: 2rem;
            }
            .button {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
            .circle {
                border-radius: 50%;
            }
            .square {
                border-radius: 1rem;
            }
        `;
    }

    public getCardSize(): number {
        return this._entities.length || 1;
    }

    public setConfig(config: Config): void {
        if (!config.entities || config.entities.length === 0) {
            throw new Error("No entities listed.");
        }
        this._entities = config.entities;
        this._columns = config.columns ?? 2;
        this._style = config.style ?? "circle";
        this._config = config;
    }

    protected willUpdate(changedProps: PropertyValues) {
        if (!this.hass) return;

        if (changedProps.has("_config")) {
            this.requestUpdate();
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this.hass) return nothing;

        const gridStyle = {
            "grid-template-columns": deviceType === "phone" ? "1fr 1fr" : `repeat(${this._columns}, 8rem)`,
        };

        return html`
            <div class="container" style=${styleMap(gridStyle)}>
                ${this._entities.map((entity) => this._renderButton(entity))}
            </div>
        `;
    }

    private _renderButton(entity: string): TemplateResult | typeof nothing {
        const stateObj = this.hass?.states[entity];
        if (!stateObj) return nothing;

        const buttonStyle = {
            "border-radius": this._style === "square" ? "1rem" : "50%",
        };

        return html`
            <div
                class="button ${this._style}"
                style=${styleMap(buttonStyle)}
                @click=${() => this._toggleEntity(entity)}
            >
                ${stateObj.state === "on" ? "💡" : "🔌"}
            </div>
        `;
    }

    private _toggleEntity(entity: string): void {
        const stateObj = this.hass?.states[entity];
        if (!stateObj) return;

        this.hass?.callService("homeassistant", "toggle", {
            entity_id: entity,
        });
    }
}
