import { css } from 'lit';

export default css`
    .container {
        grid-template-areas: 'i n' 'i s';
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
        font-size: var(--sq-secondary-font-size, 1.0rem);
        color: rgb(var(--sq-secondary-font-rgb, 0, 0, 0));
    }
`;
