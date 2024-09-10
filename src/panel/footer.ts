import { html, TemplateResult } from "lit";
import { navigateToArea } from "../utils/navigate-to-area";
import { areasDialog } from "../misc/areas-dialog";
import { entertainDialog } from "../misc/entertain-dialog";
import { menuConfig } from "../misc/menu-config";

// Handlers for footer actions
export function handleHome(panelCard: any): void {
    const startArea = window.smartqasa.startArea;
    if (!startArea) return;

    const url = new URL(location.href);
    const pathSegments = url.pathname.split("/");
    const currentArea = pathSegments.pop();

    if (currentArea !== startArea) {
        navigateToArea(startArea);
    } else {
        navigateToArea("home");
    }
}

export function handleAreas(panelCard: any): void {
    areasDialog(panelCard.hass);
}

export function handleEntertain(panelCard: any): void {
    entertainDialog(panelCard._config, panelCard.hass);
}

export async function handleMenu(panelCard: any): Promise<void> {
    window.smartqasa.menuTab = 0;
    try {
        const dialogConfig = await menuConfig();
        window.browser_mod?.service("popup", dialogConfig);
    } catch (error) {
        console.error("Error loading menu configuration", error);
    }
}

// Render the footer buttons and handle clicks
export function renderFooter(panelCard: any) {
    return html`
        <div class="footer-container">
            ${panelCard._renderFooterButton("hass:home", "Home", "handleHome")}
            ${panelCard._renderFooterButton("hass:view-dashboard", "Areas", "handleAreas")}
            ${panelCard._renderFooterButton("hass:music", "Entertainment", "handleEntertain")}
            ${panelCard._renderFooterButton("hass:menu", "Menu", "handleMenu")}
        </div>
    `;
}

// Footer button renderer
export function renderFooterButton(panelCard: any, icon: string, name: string, methodName: keyof any): TemplateResult {
    return html`
        <div class="footer-button" @click="${(e: Event) => handleFooterAction(panelCard, e, methodName)}">
            <ha-icon .icon=${icon}></ha-icon>
            <span>${name}</span>
        </div>
    `;
}

// Action handler dispatcher for footer actions
export function handleFooterAction(panelCard: any, e: Event, methodName: string | number | symbol): void {
    e.stopPropagation();
    const method = String(methodName); // Convert the methodName to a string
    if (typeof panelCard[method] === "function") {
        panelCard[method]();
    } else {
        console.error(`Method not found: ${method}`);
    }
}
