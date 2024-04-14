import { LitElement, html, css, CSSResultGroup, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface Config extends LovelaceCardConfig {}

@customElement("smartqasa-footer-strip")
class NavigateStrip extends LitElement {
    @state() private _config?: Config;

    private _hass: any;

    static styles: CSSResultGroup = css`
        :host {
            display: block;
            width: 100%;
            place-self: center;
            margin: 5px 0;
            padding: 0;
            border: none;
            border-radius: 0;
            box-shadow: none;
            background-color: transparent;
        }
        .grid {
            display: grid;
            grid-template-areas: "home areas entertain menu";
            grid-template-columns: repeat(4, max-content);
            grid-column-gap: 5vw;
            justify-content: center;
        }
        .button {
            padding: 1rem;
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .icon {
            height: 1.8rem;
            width: 1.8rem;
        }
    `;

    setConfig(config: Config): void {
        this._config = { ...config };
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;
    }

    protected render(): TemplateResult {
        return html`
            <div class="grid">
                ${this.renderButton("home", "hass:home", "Home")}
                ${this.renderButton("areas", "hass:view-dashboard", "Areas")}
                ${this.renderButton("entertain", "hass:music", "Entertainment")}
                ${this.renderButton("menu", "hass:menu", "Menu")}
            </div>
        `;
    }

    private renderButton(id: string, icon: string, name: string): TemplateResult {
        return html`
            <div class="button" @click="${this.handleAction(id)}">
                <ha-icon .icon=${icon}></ha-icon>
                <span>${name}</span>
            </div>
        `;
    }

    private handleAction(id: string): void {
        // Define action handling logic here based on the `id`
        console.log(`Action for ${id}`);
    }
}

window.customCards.push({
    type: "smartqasa-footer-strip",
    name: "SmartQasa Footer Strip",
    preview: true,
    description: "A SmartQasa tile for displaying the panel footer strip.",
});
