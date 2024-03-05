import { css } from 'lit';

export default css`
    .container {
        display: grid;
        height: var(--sq-card-height, 4.0rem);
        padding: var(--sq-card-padding, 0 1.0rem);
        border: var(--sq-card-border, 'none');
        border-radius: var(--sq-card-border-radius, 1.0rem);
        box-shadow: var(--sq-card-box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.2));
        grid-template-areas: "i n";
        grid-template-columns: auto 1fr;
        grid-column-gap: var(--sq-card-gap-column, 0.7rem);
        background-color: var(--sq-card-background-color, rgba(192, 192, 192, 0.5));
        cursor: pointer;
    }
    .icon {
        grid-area: i;
        display: flex;
        height: var(--sq-icon-size, 1.8rem);
        width: var(--sq-icon-size, 1.8rem);
        justify-content: center;
        align-self: center;
        padding: var(--sq-icon-padding, 1.0rem);
        border-radius: 50%;
        transition: var(--sq-icon-transition, none);
    }
    .name {
        grid-area: n;
        place-self: end start;
        max-height: 3.5rem;
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
