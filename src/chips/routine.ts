import { CSSResultGroup, html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { callService } from "../utils/call-service";

import chipBaseStyle from "../css/chip-base.css";
import chipTextStyle from "../css/chip-text.css";

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    color?: string;
    name?: string;
}

window.customCards.push({
    type: "smartqasa-routine-chip",
    name: "SmartQasa Routine Chip",
    preview: true,
    description: "A SmartQasa chip for triggering an automation, scene, or script entity.",
});

@customElement("smartqasa-routine-chip")
export class RoutineChip extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _running: boolean = false;
    private _entity?: string;
    private _stateObj?: HassEntity;

    static styles: CSSResultGroup = [unsafeCSS(chipBaseStyle), unsafeCSS(chipTextStyle)];

    public setConfig(config: Config): void {
        this._config = { ...config };
        this._entity = ["automation", "scene", "script"].includes(this._config.entity?.split(".")[0])
            ? this._config.entity
            : undefined;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return !!(
            (changedProps.has("hass") && this._entity && this.hass?.states[this._entity] !== this._stateObj) ||
            (changedProps.has("_config") && this._config)
        );
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._entity) return nothing;

        const { icon, iconAnimation, iconColor, name } = this._updateState();

        const iconStyles = {
            color: `rgb(${iconColor})`,
            animation: iconAnimation,
            paddingRight: name ? "calc(var(--sq-chip-padding, 1rem) / 2)" : "var(--sq-chip-padding, 1rem)",
        };

        return html`
            <div class="container" @click=${this._runRoutine}>
                <div class="icon" style="${styleMap(iconStyles)}">
                    <ha-icon icon=${icon}></ha-icon>
                </div>
                ${name ? html`<div class="text">${name}</div>` : null}
            </div>
        `;
    }

    private _updateState(): { icon: string; iconAnimation: string; iconColor: string; name: string } {
        let icon, iconAnimation, iconColor, name;

        this._stateObj = this._entity ? this.hass?.states[this._entity] : undefined;

        if (this._stateObj) {
            if (this._running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            } else {
                icon = this._config!.icon || this._stateObj.attributes.icon || "hass:help-rhombus";
                iconAnimation = "none";
                iconColor = this._config!.color || "var(--sq-primary-text-rgb)";
            }
        } else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
        }
        name = this._config?.name || "";

        return { icon, iconAnimation, iconColor, name };
    }

    private _runRoutine(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this._stateObj) return;

        this._running = true;

        const domain = this._stateObj.entity_id.split(".")[0];
        switch (domain) {
            case "script":
                callService(this.hass, "script", "turn_on", { entity_id: this._entity });
                break;
            case "scene":
                callService(this.hass, "scene", "turn_on", { entity_id: this._entity });
                break;
            case "automation":
                callService(this.hass, "automation", "trigger", { entity_id: this._entity });
                break;
            default:
                console.error("Unsupported entity domain:", domain);
                return;
        }

        setTimeout(() => {
            this._running = false;
        }, 2000);
    }
}
