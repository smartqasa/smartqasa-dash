import { css } from "lit";

export const chipBaseStyle = css`
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        border: var(--sq-card-border);
        border-radius: var(--sq-chip-border-radius);
        background-color: var(--sq-card-background-color);
        transition: var(--sq-icon-transition, none);
        cursor: pointer;
    }
    .icon {
        display: flex;
        height: var(--sq-chip-icon-size, 1.8rem);
        width: var(--sq-chip-icon-size, 1.8rem);
        padding: var(--sq-chip-padding, 1rem);
        color: rgb(var(--sq-primary-text-rgb));
        transition: var(--sq-icon-transition, none);
    }
`;

export const chipTextStyle = css`
    .container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border: var(--sq-card-border);
        border-radius: var(--sq-chip-border-radius);
        background-color: var(--sq-card-background-color);
        transition: var(--sq-icon-transition, none);
        cursor: pointer;
    }
    .text {
        padding-right: calc(var(--sq-chip-padding, 1rem) / 2);
        font-weight: var(--sq-primary-font-weight, 400);
        font-size: var(--sq-primary-font-size, 1.5rem);
        color: rgb(var(--sq-primary-font-rgb, 128, 128, 128));
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const chipDoubleStyle = css`
    .container {
        display: flex;
        align-items: center;
        padding: 0.2rem;
        border: var(--sq-card-border);
        border-radius: var(--sq-chip-border-radius);
        background-color: var(--sq-card-background-color);
        cursor: pointer;
    }
    .container::after {
        content: "";
        width: 1px;
        height: 90%;
        margin: 0 0.7rem;
        background-color: rgb(128, 128, 128);
    }
    .icon1,
    .icon2 {
        display: flex;
        --mdc-icon-size: 3.4rem;
        color: rgb(var(--sq-primary-text-rgb));
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
