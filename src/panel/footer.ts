import { html, TemplateResult } from "lit";
import { navigateToArea } from "../utils/navigate-to-area";
import { dialogTable } from "../tables/dialogs";

export function renderFooter(): TemplateResult {
    console.log("Footer viewMode", window.smartqasa.viewMode);
    function renderFooterButton(icon: string, name: string, action: () => void): TemplateResult {
        return html`
            <div
                class="footer-button"
                @click=${(e: Event) => {
                    e.stopPropagation();
                    action();
                }}
            >
                <ha-icon .icon=${icon}></ha-icon>
                <span>${name}</span>
            </div>
        `;
    }

    function handleHome(): void {
        console.log("Handle Home viewMode:", window.smartqasa.viewMode);

        if (window.smartqasa.viewMode !== "control") {
            window.smartqasa.viewMode = "control";
            return;
        }

        const startArea = window.smartqasa.startArea;
        if (!startArea) return;

        const url = new URL(location.href);
        const pathSegments = url.pathname.split("/");
        const currentArea = pathSegments.pop();

        console.log("Current area:", currentArea);
        console.log("Start area:", startArea);
        if (currentArea !== startArea) {
            navigateToArea(startArea);
        } else {
            navigateToArea("home");
        }
    }

    function handleAreas(): void {
        const dialogObj = dialogTable["areas"];
        window.browser_mod?.service("popup", { ...dialogObj.data });
    }

    function handleEntertain(): void {
        window.smartqasa.viewMode = "entertain";
    }

    function handleMenu(): void {
        window.smartqasa.menuTab = 0;

        const dialogObj = dialogTable["menu"];
        window.browser_mod?.service("popup", { ...dialogObj.data });
    }

    return html`
        <div class="footer-container">
            ${renderFooterButton("hass:home", "Home", handleHome)}
            ${renderFooterButton("hass:view-dashboard", "Areas", handleAreas)}
            ${renderFooterButton("hass:music", "Entertainment", handleEntertain)}
            ${renderFooterButton("hass:menu", "Menu", handleMenu)}
        </div>
    `;
}
