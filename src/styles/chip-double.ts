import { css } from "lit";

export default css`
    .container {
        width: fit-content;
        place-self: center;
        display: grid;
        grid-template-areas: "i1 s i2";
        grid-column-gap: 1rem;
        margin-right: 0.7rem;
        padding: 0.8rem;
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
        --mdc-icon-size: 2.2rem;
        color: rgb(var(--sq-primary-text-rgb));
    }
`;
