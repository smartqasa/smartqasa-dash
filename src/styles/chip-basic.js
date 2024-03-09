import { css } from "lit";

export default css`
  .container {
    width: fit-content;
    place-self: center;
    display: grid;
    grid-template-areas: "i n";
    grid-row-gap: 0.7rem;
    padding: 3.8rem;
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
    padding: calc(var(--sq-icon-padding) + 2px);
    transition: var(--sq-icon-transition, none);
  }
  .name {
    grid-area: n;
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
