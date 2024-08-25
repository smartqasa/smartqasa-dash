import { css } from "lit";

export const panelStyles = css`
    :host {
        height: 100%;
        width: 100%;
        background: var(--sq-panel-background);
    }

    .container {
        display: grid;
        height: 100%;
        width: 100%;
        max-width: 100%;
        grid-template-rows: auto auto 1fr auto;
        grid-template-columns: 100%;
        box-sizing: border-box;
        padding: 1rem 1rem 0 1rem;

        @media (max-width: 600px) {
            grid-template-rows: auto 1fr auto;
            padding: 0.5rem 0.5rem 0 0.5rem;
        }
    }

    .header-container {
        display: flex;
        margin-bottom: 2rem;
        justify-content: space-between;
    }

    .header-time-date {
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
        margin-right: calc(var(--sq-chip-spacing, 0.4rem) * -1);
        justify-content: flex-end;
    }

    .chip {
        display: flex;
    }

    .area-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-bottom: 2.5rem;
    }

    .area-info {
        display: flex;
        flex-direction: column;
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
        display: flex;
        height: 100%;
    }

    .swiper-slide {
        align-content: center;
    }

    .body-tiles {
        display: grid;
        width: min-content;
        margin: auto;
        gap: var(--sq-tile-spacing, 0.8rem);
    }

    .blank-tile {
        visibility: hidden;
        width: 100%;
        height: 100%;
    }

    .footer-container {
        display: flex;
        margin-top: 1rem;
        gap: 3rem;
        justify-content: center;
        align-items: center;
    }

    .footer-button {
        display: flex;
        gap: 0.5rem;
        padding: 1rem;
        align-items: center;
        justify-content: center;
        font-size: var(--sq-primary-font-size, 1.5rem);
        font-weight: var(--sq-primary-font-weight, 400);
        color: rgb(var(--sq-secondary-font-rgb));
        cursor: pointer;
    }
    .footer-icon {
        height: var(--sq-icon-size, 1.8rem);
        width: var(--sq-icon-size, 1.8rem);
    }
`;
