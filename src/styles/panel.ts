import { css } from "lit";

export const panelStyles = css`
    :host {
        display: flex;
        height: 100%;
        width: 100%;
        background: var(--sq-panel-background);
    }

    .container {
        display: grid;
        height: 100%;
        width: 100%;
        grid-template-rows: auto auto 1fr auto;
        grid-template-columns: 100%;
        row-gap: 2rem;
        padding: 1rem 1rem 0 1rem;
        box-sizing: border-box;
    }

    .header-container {
        display: flex;
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
        grid-template-areas:
            "name image"
            "chips image";
        grid-template-columns: 1fr 1fr;
    }

    .area-name {
        grid-area: name;
        margin-bottom: 0.4rem;
        line-height: normal;
        text-align: left;
        font-size: var(--sq-title-font-size, 3.2rem);
        font-weight: var(--sq-title-font-weight, 400);
        color: rgb(var(--sq-title-font-rgb, 128, 128, 128));
    }

    .area-chips {
        grid-area: chips;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        margin-left: calc(var(--sq-chip-spacing, 0.4rem) * -1);
    }

    .area-image {
        grid-area: image;
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
        overflow-y: auto;
    }

    .body-tiles {
        display: grid;
        width: min-content;
        margin: auto;
        grid-template-columns: repeat(3, var(--sq-tile-width, 19.5rem));
        grid-template-rows: var(--sq-tile-height, 7rem);
        gap: var(--sq-tile-spacing, 0.8rem);
    }

    .blank-tile {
        visibility: hidden;
        width: 100%;
        height: 100%;
    }

    .footer-container {
        position: sticky;
        bottom: 0;
        display: flex;
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

    /* Phone Portrait */
    @media (max-width: 600px) and (orientation: portrait) {
        .container {
            grid-template-rows: auto 1fr auto;
            row-gap: 0.5rem;
            padding: 0.5rem 0.5rem 0 0.5rem;
        }

        .area-container {
            grid-template-areas:
                "name"
                "image"
                "chips";
            grid-template-columns: 1fr;
            row-gap: 0.5rem;
        }

        .body-tiles {
            width: 100%;
            margin: 0;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: var(--sq-tile-height, 7rem);
            gap: var(--sq-tile-spacing, 0.8rem);
        }

        .footer-container {
            position: sticky;
            bottom: 0;
        }

        .footer-button span {
            display: none; /* Hide text in footer buttons */
        }
    }
`;
