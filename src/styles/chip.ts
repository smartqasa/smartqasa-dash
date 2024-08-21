import { css } from "lit";

export const chipBaseStyle = css`
    .container {
        display: flex;
        margin: 0 var(--sq-chip-margin, 0.4rem) 0 var(--sq-chip-margin, 0.4rem);
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
        justify-content: flex-start;
    }
    .icon {
        padding-right: calc(var(--sq-chip-padding, 1rem) / 2);
    }
    .text {
        padding: var(--sq-chip-padding, 1rem);
        padding-left: 0;
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
        margin: 0 var(--sq-chip-margin, 0.4rem) 0 var(--sq-chip-margin, 0.4rem);
        align-items: center;
        border: var(--sq-card-border);
        border-radius: var(--sq-chip-border-radius);
        background-color: var(--sq-card-background-color);
        cursor: pointer;
    }
    .container::after {
        content: "";
        width: 1px;
        height: 90%;
        background-color: rgb(128, 128, 128);
    }
    .icon1,
    .icon2 {
        display: flex;
        align-items: center;
        justify-content: center;
        --mdc-icon-size: 3.4rem;
        padding: 0.2rem;
        color: rgb(var(--sq-primary-text-rgb));
        font-size: var(--sq-chip-icon-size, 3.4rem);
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
