import { html, nothing } from "lit";
import { LovelaceCard } from "../types"; // Make sure LovelaceCard is imported
import defaultImage from "../assets/images/default.png";

// Function to fetch the area picture
export async function getAreaPicture(panelCard: any): Promise<string> {
    // If a custom picture is set in the config
    if (panelCard._config?.picture) {
        const configPictureFile = `/local/smartqasa/pictures/${panelCard._config.picture}`;
        try {
            const response = await fetch(configPictureFile, { method: "HEAD" });
            if (response.ok) {
                return configPictureFile;
            } else {
                console.error("Picture from config not found, using defaultImage");
                return defaultImage;
            }
        } catch (error) {
            console.error(`Failed to check picture from config: ${panelCard._config.picture}`, error);
            return defaultImage;
        }
    }

    // Try to load the area-specific picture
    const areaFileName = `/local/smartqasa/pictures/${panelCard._area}.png`;
    try {
        const response = await fetch(areaFileName, { method: "HEAD" });
        if (response.ok) {
            return areaFileName;
        }
    } catch (error) {
        console.error("Error fetching area picture:", error);
    }

    // Fallback to using the area object’s picture if available
    if (panelCard._areaObj?.picture) {
        return panelCard._areaObj.picture;
    }

    // Use the default image as a last resort
    return defaultImage;
}

// Function to render the area section
export function renderArea(panelCard: any) {
    const name = panelCard._config?.name ?? panelCard._areaObj?.name ?? "Area";
    const isPhoneLandscape = panelCard._deviceType === "phone" && panelCard._deviceOrientation === "landscape";

    return html`
        <div class="area-container">
            <div class="area-name ${panelCard._deviceType === "phone" ? "overlay" : ""}">${name}</div>
            <img class="area-picture" alt="Area picture..." src=${panelCard._areaPicture} />
            ${panelCard._areaChips.length > 0
                ? html`
                      <div class="area-chips">
                          ${panelCard._areaChips.map((chip: LovelaceCard) => html`<div class="chip">${chip}</div>`)}
                      </div>
                  `
                : nothing}
            ${isPhoneLandscape ? html`<div class="footer-container">${panelCard._renderFooter()}</div>` : nothing}
        </div>
    `;
}
