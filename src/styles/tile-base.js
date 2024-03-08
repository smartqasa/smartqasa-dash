import { css } from 'lit';

export default css`
    .container {
        display: grid;
        height: 5.4rem;
        border: var(--sq-card-border, none);
        border-radius: var(--sq-card-border-radius, 1.5rem);
        grid-template-areas: 'i n';
        grid-template-columns: auto 1fr;
        grid-column-gap: var(--sq-card-gap-column, 0.7rem);
        grid-row-gap: var(--sq-card-gap-row, 0.3rem);
        padding: 1.0rem;
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
        padding: 1.0rem;
        border-radius: 50%;
        transition: var(--sq-icon-transition, none);
    }
    .name {
        grid-area: n;
        place-self: center start;
        max-height: calc(var(--sq-primary-font-size) * 2.2);
        line-height: 1.2;
        max-width: 100%;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        font-weight: var(--sq-primary-font-weight, 400);
        font-size: var(--sq-primary-font-size, 1.5rem);
        color: rgb(var(--sq-primary-font-rgb), 128, 128, 128);
    }
`;
