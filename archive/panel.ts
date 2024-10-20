import { css } from 'lit';

export const panelStyles = css`
    :host {
        background-attachment: fixed;
        background-size: cover;
        background-image: var(--sq-panel-image);
        background-position: center;
        background-repeat: no-repeat;
    }
    .container {
        display: grid;
        height: 100%;
        width: 100%;
        grid-template-columns: 100%;
        grid-template-rows: auto auto minmax(0, 1fr) auto;
        grid-template-areas:
            'header'
            'area'
            'body'
            'footer';
        gap: 2rem;
        padding: 1rem 1rem 0.5rem 1rem;
        box-sizing: border-box;
    }

    .header-container {
        grid-area: header;
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
        grid-area: area;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: min-content 1fr;
        grid-template-areas:
            'name image'
            'chips image';
    }

    .area-name {
        grid-area: name;
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
        height: 20vh;
        object-fit: cover;
        border-radius: 0.2rem;
        border: none;
        box-shadow: none;
        background-color: transparent;
    }

    .swiper {
        grid-area: body;
        height: 100%;
        width: 100%;
    }

    .swiper-slide {
        align-content: center;
        overflow-y: auto;
    }

    .body-tiles {
        display: grid;
        width: min-content;
        margin: auto;
        grid-template-rows: var(--sq-tile-height, 7rem);
        gap: var(--sq-tile-spacing, 0.8rem);
        overflow-y: auto;
    }

    .blank-tile {
        visibility: hidden;
        width: 100%;
        height: 100%;
    }

    .footer-container {
        grid-area: footer;
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

    /* Tablet Portrait */

    @media (orientation: portrait) and (min-width: 601px),
        (orientation: portrait) and (width: 534px) {
        .area-image {
            height: 10vh;
        }
    }

    /* Phone Portrait */
    @media (orientation: portrait) and (max-width: 534px),
        (orientation: portrait) and (min-width: 535px) and (max-width: 600px) {
        .container {
            grid-template-columns: 100%;
            grid-template-rows: auto minmax(0, 1fr) auto;
            grid-template-areas:
                'area'
                'body'
                'footer';
            gap: 1rem;
            padding: 0.6rem 0.6rem 0.3rem 0.6rem;
        }

        .area-container {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            grid-template-areas:
                'image'
                'chips';
            gap: 1rem;
            position: relative;
        }

        .area-image {
            height: 15vh;
        }

        .area-name.overlay {
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            padding: 0.5rem;
            font-size: 2.5rem;
            font-weight: var(--sq-title-font-weight, 400);
            border-radius: 0.2rem 0 0 0;
        }

        .body-container {
            grid-area: body;
            display: flex;
            width: 100%;
            overflow-y: auto;
        }

        .body-tiles {
            width: 100%;
            margin: 0;
            grid-template-rows: var(--sq-tile-height, 7rem);
            gap: var(--sq-tile-spacing, 0.8rem);
        }

        .footer-button span {
            display: none;
        }
    }

    /* Phone Landscape */
    @media (orientation: landscape) and (max-height: 534px),
        (orientation: landscape) and (min-height: 535px) and (max-height: 600px) {
        .container {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 100%;
            grid-template-areas: 'area body';
            gap: 1rem;
            padding: 0.6rem 0.6rem 0.3rem 0.6rem;
        }

        .area-container {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr auto;
            grid-template-areas:
                'image'
                'chips'
                'footer-p-l';
            gap: 1rem;
            position: relative;
        }

        .area-image {
            height: 35vh;
        }

        .area-name.overlay {
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            padding: 0.5rem;
            font-size: 2.5rem;
            font-weight: var(--sq-title-font-weight, 400);
            border-radius: 0.2rem 0 0 0;
        }

        .area-chips {
            grid-area: chips;
            align-items: flex-start;
        }

        .footer-container {
            grid-area: footer-p-l;
            display: flex;
            gap: 3rem;
            justify-content: center;
            align-items: center;
        }

        .footer-button span {
            display: none;
        }

        .body-container {
            grid-area: body;
            display: flex;
            width: 100%;
            overflow-y: auto;
        }

        .body-tiles {
            width: 100%;
            margin: 0;
            grid-template-rows: var(--sq-tile-height, 7rem);
            gap: var(--sq-tile-spacing, 0.8rem);
        }
    }
`;
