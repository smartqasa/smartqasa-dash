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
        box-sizing: border-box;
        justify-content: space-between;
    }
    .top-wrapper {
        display: flex;
    }

    .header-container {
        display: flex;
        margin-bottom: 2.5rem;
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
        flex-grow: 2;
    }

    .body-tiles {
        display: grid;
        width: min-content;
        margin: auto;
        gap: var(--sq-tile-spacing, 0.8rem);
        overflow: hidden;
    }

    .footer-container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-top: 2.5rem;
    }
`;
