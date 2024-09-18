import { html, TemplateResult } from "lit";
import { navigateToArea } from "../utils/navigate-to-area";
import { dialogTable } from "../tables/dialogs";
import { dialogPopup } from "../dialogs/dialog-popup";

export function renderFooter(): TemplateResult {
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
        if (window.smartqasa.viewMode !== "control") {
            window.smartqasa.viewMode = "control";
            window.dispatchEvent(new Event("viewModeChanged"));
            return;
        }

        const startArea = window.smartqasa.startArea;
        if (!startArea) return;

        const currentArea = new URL(location.href).pathname.split("/").pop();
        if (currentArea !== startArea) {
            navigateToArea(startArea);
        } else {
            navigateToArea("home");
        }
    }

    function handleAreas(): void {
        const dialogObj = dialogTable["areas"];
        window.browser_mod?.service("popup", dialogObj.data);
    }

    function handleEntertain(): void {
        window.smartqasa.viewMode = "entertain";
        window.dispatchEvent(new Event("viewModeChanged"));
    }

    function handleMenu(): void {
        window.smartqasa.menuTab = 0;

        const dialogObj = dialogTable["menu"];
        dialogPopup(dialogObj.data, dialogObj.data);
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
