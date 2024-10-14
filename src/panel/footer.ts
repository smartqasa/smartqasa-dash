import { html, TemplateResult } from 'lit';
import { navigateToArea } from '../utilities/navigate-to-area';
import { dialogTable } from '../dialogs/dialog-table';
import { dialogPopup } from '../dialogs/dialog-popup';

export function renderFooter(): TemplateResult {
    function renderFooterButton(
        icon: string,
        name: string,
        action: () => void
    ): TemplateResult {
        return html`
            <div
                class="footer-button"
                @click=${(e: Event) => {
                    e.stopPropagation();
                    action();
                }}
            >
                <ha-icon icon=${icon}></ha-icon>
                <span>${name}</span>
            </div>
        `;
    }

    function handleHome(): void {
        const startArea = window.smartqasa.startArea;
        if (!startArea) return;

        const currentArea = new URL(location.href).pathname.split('/').pop();
        if (currentArea !== startArea) {
            navigateToArea(startArea);
        } else {
            navigateToArea('home');
        }
    }

    function handleAreas(): void {
        dialogPopup(dialogTable['areas'].data);
    }

    function handleMenu(): void {
        window.smartqasa.menuTab = 0;
        dialogPopup(dialogTable['menu'].data);
    }

    return html`
        <div class="footer-container">
            ${renderFooterButton('hass:home', 'Home', handleHome)}
            ${renderFooterButton('hass:view-dashboard', 'Areas', handleAreas)}
            ${renderFooterButton('hass:menu', 'Menu', handleMenu)}
        </div>
    `;
}
