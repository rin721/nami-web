import { a as o } from "./lit-element-GeMXvhiH.js";
const n = o`
  :host {
    box-sizing: border-box;
    color: var(--nami-text, #171717);
    font-family: var(--nami-font-sans, Inter, ui-sans-serif, system-ui, sans-serif);
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`, a = o`
  .soft-control {
    align-items: center;
    background: var(--nami-soft-control-bg, transparent);
    border: var(--nami-soft-control-border-width, 0) solid var(--nami-soft-control-border-color, transparent);
    border-radius: var(--nami-radius-control, 999px);
    color: var(--nami-soft-control-color, var(--nami-icon-color, var(--nami-text-muted, #666b74)));
    cursor: pointer;
    display: inline-flex;
    flex-shrink: 0;
    font: inherit;
    justify-content: center;
    min-height: var(--nami-icon-button-size, var(--nami-control-height, 40px));
    min-width: var(--nami-icon-button-size, var(--nami-control-height, 40px));
    padding: 0;
    position: relative;
    touch-action: manipulation;
    transition:
      background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
      color var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
      box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
  }

  .soft-control::before {
    background: transparent;
    border-radius: inherit;
    content: '';
    inset: 0;
    position: absolute;
    transition:
      inset var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
      background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
  }

  .soft-control:hover::before {
    background: var(--nami-hover-overlay, color-mix(in oklab, #000, transparent 95%));
    inset: -4px;
  }

  .soft-control:active::before {
    background: var(--nami-ripple, color-mix(in oklab, #000, transparent 86%));
    inset: -6px;
  }

  .soft-control:focus-visible {
    box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring, 0 0 0 3px color-mix(in oklab, currentColor, transparent 55%)));
    outline: none;
  }

  .soft-control[aria-pressed='true'],
  .soft-control[aria-selected='true'] {
    color: var(--nami-color-primary, #3b82f6);
  }

  .soft-control[aria-pressed='true']::before,
  .soft-control[aria-selected='true']::before {
    background: var(--nami-accent-hover-overlay, color-mix(in oklab, currentColor, transparent 90%));
  }

  .soft-control:active .icon-motion {
    transform: scale(0.9);
  }

  .icon-motion {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    position: relative;
    transition: transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
    z-index: 1;
  }

  .soft-control:disabled,
  .soft-control[aria-disabled='true'] {
    color: var(--nami-text-muted, #666b74);
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
export {
  n as c,
  a as s
};
