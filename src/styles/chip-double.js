import { css } from "lit";

export default css`
  .container {
    width: fit-content;
    place-self: center;
    display: grid;
    grid-template-areas: "i1 i2";
    grid-column-gap: 0.5rem;
    margin-right: 0.7rem;
    padding: 0.2rem;
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
    --mdc-icon-size: 3.4rem;
    color: rgb(var(--sq-primary-text-rgb));
  }
`;
