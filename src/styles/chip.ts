import { css } from "lit";

export const chipBasicStyle = css`
    .container {
        width: fit-content;
        place-self: center;
        display: grid;
        grid-template-areas: "i t";
        grid-column-gap: 0.8rem;
        margin-right: 0.7rem;
        padding: 1rem;
        border: var(--sq-card-border);
        border-radius: var(--sq-chip-border-radius);
        background-color: var(--sq-card-background-color);
        cursor: pointer;
    }
    .icon {
        grid-area: i;
        display: flex;
        height: 1.8rem;
        width: 1.8rem;
        transition: var(--sq-icon-transition, none);
    }
    .text {
        grid-area: t;
        place-self: center start;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        font-weight: var(--sq-primary-font-weight, 400);
        font-size: var(--sq-primary-font-size, 1.5rem);
        color: rgb(var(--sq-primary-font-rgb), 128, 128, 128);
    }
`;

export const chipDoubleStyle = css`
    .container {
        width: fit-content;
        place-self: center;
        display: grid;
        grid-template-areas: "i1 s i2";
        grid-column-gap: 0.7rem;
        margin-right: 0.7rem;
        padding: 0.2rem;
        border: var(--sq-card-border);
        border-radius: var(--sq-chip-border-radius);
        background-color: var(--sq-card-background-color);
        cursor: pointer;
    }
    .container::after {
        content: "";
        grid-area: s;
        width: 1px;
        background-color: rgb(128, 128, 128);
        margin: auto;
        height: 90%;
    }
    .icon1 {
        grid-area: i1;
    }
    .icon2 {
        grid-area: i2;
    }
    .icon1,
    .icon2 {
        display: flex;
        --mdc-icon-size: 3.4rem;
        color: rgb(var(--sq-primary-text-rgb));
    }
`;
