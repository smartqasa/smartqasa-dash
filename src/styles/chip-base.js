import { css } from 'lit';

export default css`
    .container {
        place-self: center;
        display: grid;
        grid-template-areas: 'i';
        border: var(--sq-card-border, 'none');
        cursor: pointer;
    }
    .icon {
        grid-area: i;
        display: flex;
        height: var(--sq-icon-size, 1.8rem);
        width: var(--sq-icon-size, 1.8rem);
        padding: var(--sq-icon-padding, 1.0rem);
        border-radius: 50%;
        background-color: var(--sq-card-background-color);
        transition: var(--sq-icon-transition, none);
    }
`;
