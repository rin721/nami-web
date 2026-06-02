import { css } from 'lit';

export const componentHostStyles = css`
  :host {
    box-sizing: border-box;
    color: var(--rl-text, #171717);
    font-family: var(--rl-font-sans, Inter, ui-sans-serif, system-ui, sans-serif);
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;

export const softControlStyles = css`
  .soft-control {
    align-items: center;
    background: var(--rl-soft-control-bg, transparent);
    border: var(--rl-soft-control-border-width, 0) solid var(--rl-soft-control-border-color, transparent);
    border-radius: var(--rl-radius-control, 999px);
    color: var(--rl-icon-color, var(--rl-text-muted, #666b74));
    cursor: pointer;
    display: inline-flex;
    flex-shrink: 0;
    font: inherit;
    justify-content: center;
    min-height: var(--rl-icon-button-size, 40px);
    min-width: var(--rl-icon-button-size, 40px);
    padding: 0;
    position: relative;
    touch-action: manipulation;
    transition:
      background-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease),
      color var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease),
      box-shadow var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease);
  }

  .soft-control::before {
    background: transparent;
    border-radius: inherit;
    content: '';
    inset: 0;
    position: absolute;
    transition:
      inset var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease),
      background-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease);
  }

  .soft-control:hover::before {
    background: var(--rl-hover-overlay, color-mix(in oklab, #000, transparent 95%));
    inset: -4px;
  }

  .soft-control:active::before {
    background: var(--rl-ripple, color-mix(in oklab, #000, transparent 86%));
    inset: -6px;
  }

  .soft-control:focus-visible {
    box-shadow: var(--rl-style-focus-shadow, var(--rl-focus-ring, 0 0 0 3px color-mix(in oklab, currentColor, transparent 55%)));
    outline: none;
  }

  .soft-control[aria-pressed='true'],
  .soft-control[aria-selected='true'] {
    color: var(--rl-color-primary, #3b82f6);
  }

  .soft-control[aria-pressed='true']::before,
  .soft-control[aria-selected='true']::before {
    background: var(--rl-accent-hover-overlay, color-mix(in oklab, currentColor, transparent 90%));
  }

  .soft-control:active .icon-motion {
    transform: scale(0.9);
  }

  .icon-motion {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    position: relative;
    transition: transform var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease);
    z-index: 1;
  }

  .soft-control:disabled,
  .soft-control[aria-disabled='true'] {
    color: var(--rl-text-muted, #666b74);
    cursor: not-allowed;
    opacity: 0.52;
  }

  @media (prefers-reduced-motion: reduce) {
    .soft-control,
    .soft-control::before,
    .icon-motion {
      transition-duration: 1ms;
    }

    .soft-control:active .icon-motion {
      transform: none;
    }
  }
`;
