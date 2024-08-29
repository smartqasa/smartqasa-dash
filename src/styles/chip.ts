import { css } from "lit";

export const chipBaseStyle = css`
    .container {
        display: flex;
        margin: 0 var(--sq-chip-spacing, 0.4rem);
        align-items: center;
        justify-content: center;
        width: fit-content;
        border: var(--sq-card-border);
        border-radius: var(--sq-chip-border-radius);
        background-color: var(--sq-card-background-color);
        transition: var(--sq-icon-transition, none);
        overflow: hidden;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
    }

    .container:focus,
    .container:active {
        background-color: inherit;
        outline: none;
    }

    .icon {
        display: flex;
        height: var(--sq-icon-size, 1.8rem);
        width: var(--sq-icon-size, 1.8rem);
        padding: var(--sq-chip-padding, 1rem);
        color: rgb(var(--sq-primary-text-rgb));
        transition: var(--sq-icon-transition, none);
        align-items: center;
        justify-content: center;
    }
`;

export const chipTextStyle = css`
    .container {
        justify-content: flex-start;
    }

    .icon {
        padding-right: calc(var(--sq-chip-padding, 1rem) / 2);
        align-items: center;
        justify-content: center;
    }

    .text {
        display: flex;
        padding: var(--sq-chip-padding, 1rem);
        padding-left: 0;
        line-height: var(--sq-icon-size, 1.8rem);
        font-weight: var(--sq-primary-font-weight, 400);
        font-size: var(--sq-primary-font-size, 1.5rem);
        color: rgb(var(--sq-primary-font-rgb, 128, 128, 128));
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        align-items: center;
    }
`;

export const chipDoubleStyle = css`
    .container {
        display: flex;
        margin: 0 var(--sq-chip-spacing, 0.4rem);
        align-items: center;
        justify-content: center;
        border: var(--sq-card-border);
        border-radius: var(--sq-chip-border-radius);
        background-color: var(--sq-card-background-color);
        overflow: hidden;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
    }

    .container:focus,
    .container:active {
        background-color: inherit;
        outline: none;
    }

    .icon1,
    .icon2 {
        display: flex;
        align-items: center;
        justify-content: center;
        --mdc-icon-size: 3.6rem;
        padding: 0.1rem;
        color: rgb(var(--sq-primary-text-rgb));
    }

    .icon1::after {
        content: "";
        width: 1px;
        height: var(--sq-icon-size, 1.8rem);
        background-color: rgb(128, 128, 128);
        margin-left: 0.3rem;
    }
`;

export const chipIconSpinStyle = css`
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
