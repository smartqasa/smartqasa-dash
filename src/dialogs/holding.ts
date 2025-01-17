export const mediaPlayerCardMod = {
    style: `{
        mxmp-player$ mxmp-player-header$ {
            .entity {
                color: rgb(var(--sq-primary-font-rgb));
                font-weight: var(--sq-primary-font-weight);
                font-size: var(--sq-primary-font-size);
            }
        }
        mxmp-player$ mxmp-player-controls$ {
            .icons {
                margin-bottom: 1rem;
                gap: 1rem;
            }
            mxmp-ha-player, ha-icon-button {
                --mdc-icon-size: 2rem !important;
                --mdc-icon-button-size: 3rem !important;
                border-radius: 50%;
                background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-opacity));
            }
            .big-icon {
                --mdc-icon-size: 3rem !important;
                --mdc-icon-button-size: 4rem !important;
                border-radius: 50%;
                background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-opacity));
            }
        }
}
    `,
};
