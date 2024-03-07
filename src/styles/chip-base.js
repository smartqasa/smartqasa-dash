import { css } from 'lit';

export default css`
    .container {
        place-self: center;
        display: grid;
        grid-template-areas: 'i';
        border: var(--sq-card-border);
        border-radius: var(--sq-chip-border-radius);
        background-color: var(--sq-card-background-color);
        cursor: pointer;
    }
    .icon {
        grid-area: i;
        display: flex;
        height: var(--sq-icon-size, 1.8rem);
        width: var(--sq-icon-size, 1.8rem);
        padding: calc(var(--sq-icon-padding) + 2px);
        transition: var(--sq-icon-transition, none);
    }
`;
