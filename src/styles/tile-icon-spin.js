import { css } from 'lit';

export default css`
.icon {
    transition: var(--sq-icon-transition, none);
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
