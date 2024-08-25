import { css } from "lit";

export const tileBaseStyle = css`
    .container {
        display: grid;
        height: 7rem;
        width: 100%;
        box-sizing: border-box;
        border: var(--sq-card-border, none);
        border-radius: var(--sq-card-border-radius, 1.5rem);
        grid-template-areas: "i n";
        grid-template-columns: auto 1fr;
        grid-column-gap: 1rem;
        grid-row-gap: 0.4rem;
        padding: var(--sq-tile-padding, 1rem);
        background-color: var(--sq-card-background-color, rgba(192, 192, 192, 0.5));
        cursor: pointer;
    }
    .icon {
        grid-area: i;
        display: flex;
        justify-content: center;
        align-self: center;
        height: var(--sq-icon-size, 1.8rem);
        width: var(--sq-icon-size, 1.8rem);
        padding: var(--sq-tile-padding, 1rem);
        border-radius: 50%;
        transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
    }
    .name {
        grid-area: n;
        place-self: center start;
        max-height: 3.6rem;
        line-height: 1.2;
        max-width: 100%;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        font-weight: var(--sq-primary-font-weight, 400);
        font-size: var(--sq-primary-font-size, 1.5rem);
        color: rgb(var(--sq-primary-font-rgb, 128, 128, 128));
    }
`;

export const tileStateStyle = css`
    .container {
        grid-template-areas: "i n" "i s";
        grid-row-gap: 0.3rem;
    }
    .name {
        place-self: end start;
    }
    .state {
        grid-area: s;
        align-self: start;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: var(--sq-secondary-font-weight, 300);
        font-size: var(--sq-secondary-font-size, 1rem);
        color: rgb(var(--sq-secondary-font-rgb, 0, 0, 0));
    }
`;

export const tileIconBlinkStyle = css`
    @keyframes blink {
        50% {
            opacity: 0.25;
        }
    }
`;

export const tileIconSpinStyle = css`
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
