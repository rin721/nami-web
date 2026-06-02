import { css, html, LitElement } from 'lit';
import { attachInternalsSafe, setSafeFormValue, type SafeElementInternals } from '../foundation/form-associated';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class RlSwitch extends LitElement {
  static formAssociated = true;
  static properties = {
    name: {},
    value: {},
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: inline-flex;
      }

      button {
        align-items: center;
        background: transparent;
        border: 0;
        color: var(--rl-text);
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        gap: var(--rl-space-3, 10px);
        padding: 0;
      }

      .track {
        align-items: center;
        background: var(--rl-switch-track-bg, var(--rl-hover-overlay));
        border: var(--rl-switch-border-width, var(--rl-style-stroke-width, 1px)) solid var(--rl-switch-border-color, var(--rl-border));
        border-radius: var(--rl-radius-control, 999px);
        display: inline-flex;
        height: 28px;
        padding: 2px;
        transition:
          background-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease),
          border-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease);
        width: 48px;
      }

      .thumb {
        background: var(--rl-surface-raised);
        border-radius: 50%;
        box-shadow: var(--rl-switch-thumb-shadow, 0 1px 4px color-mix(in oklab, var(--rl-shadow-color), transparent 64%));
        height: 22px;
        transform: translateX(0);
        transition: transform var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease);
        width: 22px;
      }

      :host([checked]) .track {
        background: var(--rl-color-primary);
        border-color: transparent;
      }

      :host([checked]) .thumb {
        transform: translateX(20px);
      }

      button:focus-visible .track {
        box-shadow: var(--rl-style-focus-shadow, var(--rl-focus-ring));
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.54;
      }

      @media (prefers-reduced-motion: reduce) {
        .track,
        .thumb {
          transition-duration: 1ms;
        }
      }
    `
  ];

  declare name: string;
  declare value: string;
  declare checked: boolean;
  declare disabled: boolean;

  constructor() {
    super();
    this.name = '';
    this.value = 'on';
    this.checked = false;
    this.disabled = false;
  }

  private internals: SafeElementInternals | null = attachInternalsSafe(this);

  updated() {
    setSafeFormValue(this.internals, !this.disabled && this.checked ? this.value : null);
  }

  formResetCallback() {
    this.checked = false;
  }

  private toggle(event: MouseEvent) {
    if (this.disabled) return;
    this.checked = !this.checked;
    emit(this, 'rl-change', { checked: this.checked, value: this.value, sourceEvent: event });
  }

  render() {
    return html`
      <button
        part="base control"
        type="button"
        role="switch"
        aria-checked=${this.checked ? 'true' : 'false'}
        ?disabled=${this.disabled}
        @click=${this.toggle}
      >
        <span class="track" part="indicator"><span class="thumb"></span></span>
        <span part="label"><slot></slot></span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rl-switch': RlSwitch;
  }
}
