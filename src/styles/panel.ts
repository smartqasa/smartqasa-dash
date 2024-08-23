import { css } from "lit";

export const panelStyles = css`
    :host {
        height: 100%;
        width: 100%;
        background: var(--sq-panel-background);
    }

    .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    .header-container {
        display: flex;
        flex-shrink: 0;
        margin-bottom: 2.5rem;
        justify-content: space-between;
    }

    .header-time {
        display: flex;
        flex-direction: column;
        cursor: pointer;
    }

    .time,
    .date {
        text-align: left;
        white-space: nowrap;
    }

    .time {
        line-height: 3rem;
        font-size: var(--sq-title-font-size, 3.2rem);
        font-weight: var(--sq-title-font-weight, 400);
        color: rgb(var(--sq-title-font-rgb, 128, 128, 128));
    }

    .date {
        margin-top: 0.4rem;
        font-size: var(--sq-primary-font-size, 1.5rem);
        font-weight: var(--sq-primary-font-weight, 300);
        color: rgb(var(--sq-secondary-font-rgb, 128, 128, 128));
    }

    .header-chips {
        display: flex;
        flex-direction: row;
        margin-right: calc(var(--sq-chip-spacing, 0.4rem) * -1);
        justify-content: flex-end;
    }

    .chip {
        display: flex;
    }

    .area-container {
        display: flex;
        flex-shrink: 0;
        flex-direction: row;
        margin-bottom: 2.5rem;
    }

    .area-info {
        display: flex;
        flex-direction: column;
        flex: 1; /* Allow the area info to take up available space */
    }

    .area-name {
        margin-bottom: 0.4rem;
        line-height: normal;
        text-align: left;
        font-size: var(--sq-title-font-size, 3.2rem);
        font-weight: var(--sq-title-font-weight, 400);
        color: rgb(var(--sq-title-font-rgb, 128, 128, 128));
    }

    .area-chips {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        margin-left: calc(var(--sq-chip-spacing, 0.4rem) * -1);
    }

    .area-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
        border: none;
        box-shadow: none;
        background-color: transparent;
    }

    .body-container {
        flex-grow: 1; /* Allow the body to grow and fill the space */
        display: flex;
        justify-content: center; /* Center the swiper horizontally */
        align-items: center; /* Center the swiper vertically */
        max-width: 100vw;
        width: 100%;
    }

    .swiper {
        width: 100%; /* Ensure the swiper respects the parent's width */
        height: 100%; /* Ensure the swiper respects the parent's height */
    }

    .swiper-slide {
        display: flex; /* Center content inside each slide */
        align-items: center;
        justify-content: center;
    }

    .body-tiles {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--sq-tile-spacing, 0.8rem);
        width: min-content; /* Ensure the tiles don't overflow */
    }

    .footer-container {
        display: flex;
        flex-shrink: 0;
        margin-top: 1rem;
        text-align: center;
    }
`;
