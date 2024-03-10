import { css } from "lit";

export default css`
  :host {
    --mdc-icon-size: 4rem;
  }
  .container {
    width: fit-content;
    place-self: center;
    display: grid;
    grid-template-areas: "i1 i2";
    grid-column-gap: 1rem;
    padding: 1rem;
    border: var(--sq-card-border);
    border-radius: var(--sq-chip-border-radius);
    background-color: var(--sq-card-background-color);
    cursor: pointer;
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
    color: rgb(var(--sq-primary-text-rgb));
  }
`;
