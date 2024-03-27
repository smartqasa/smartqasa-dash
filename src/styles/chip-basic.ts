import { css } from "lit";

export default css`
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
