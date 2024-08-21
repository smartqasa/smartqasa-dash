import { css } from "lit";

export const panelStyle = css`
    :host {
        display: block;
        height: 100%;
        width: 100%;
        background: var(--sq-panel-background);
    }
    .container {
        display: grid;
        grid-template-rows: auto auto 1fr auto;
    }
    .header-container {
        display: flex;
        margin-bottom: 1rem;
        justify-content: space-between;
    }
    .header-time {
        display: flex;
        flex-direction: column;
        cursor: pointer;
    }
    .time,
    .date {
        text-align: left;
        white-space: nowrap;
    }
    .time {
        line-height: 3rem;
        font-size: var(--sq-title-font-size, 3.2rem);
        font-weight: var(--sq-title-font-weight, 400);
        color: rgb(var(--sq-title-font-rgb, 128, 128, 128));
    }
    .date {
        margin-top: 0.4rem;
        font-size: var(--sq-primary-font-size, 1.5rem);
        font-weight: var(--sq-primary-font-weight, 300);
        color: rgb(var(--sq-secondary-font-rgb, 128, 128, 128));
    }
    .header-chips {
        display: flex;
        flex-direction: row;
        margin-right: calc(var(--sq-chip-margin, 0.4rem) * -1);
        justify-content: flex-end;
    }
    .chip {
        display: flex;
    }
    .area-container {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }
    .area-info {
        flex: 1 1 50%;
    }
    .area-name {
        text-align: left;
        font-size: var(--sq-title-font-size, 3.2rem);
        font-weight: var(--sq-title-font-weight, 400);
        color: rgb(var(--sq-title-font-rgb, 128, 128, 128));
    }
    .area-chps {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-left: calc(var(--sq-chip-margin, 0.4rem) * -1);
    }
    .area-image {
        flex: 1 1 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
        border: none;
        box-shadow: none;
        background-color: transparent;
    }
`;
