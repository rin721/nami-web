import { css, html, LitElement } from 'lit';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class RlChip extends LitElement {
  static properties = {
    value: {},
    selected: { type: Boolean, reflect: true },
    checkbox: { type: Boolean, reflect: true },
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
        background: var(--rl-chip-bg, var(--rl-hover-overlay));
        border: var(--rl-chip-border-width, 0) solid var(--rl-chip-border-color, transparent);
        border-radius: var(--rl-chip-radius, var(--rl-radius-control, 999px));
        color: var(--rl-style-on-paper, var(--rl-text));
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        gap: var(--rl-space-2, 6px);
        min-height: 31px;
        padding: 0 12px;
        box-shadow: var(--rl-chip-shadow, none);
        transition:
          background-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease),
          color var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease),
          box-shadow var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease),
          transform var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease);
      }

      :host([selected]) button {
        background: var(--rl-chip-selected-bg, var(--rl-color-primary));
        color: var(--rl-text-inverse);
      }

      button:hover:not(:disabled) {
        background: var(--rl-accent-hover-overlay, var(--rl-hover-overlay));
      }

      :host([selected]) button:hover:not(:disabled) {
        background: var(--rl-color-primary-hover);
      }

      button:active:not(:disabled) {
        transform: scale(0.98);
      }

      button:focus-visible {
        box-shadow: var(--rl-style-focus-shadow, var(--rl-focus-ring));
        outline: none;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.54;
      }
    `
  ];

  declare value: string;
  declare selected: boolean;
  declare checkbox: boolean;
  declare disabled: boolean;

  constructor() {
    super();
    this.value = '';
    this.selected = false;
    this.checkbox = false;
    this.disabled = false;
  }

  private handleClick(event: MouseEvent) {
    if (this.disabled) return;
    if (this.checkbox) this.selected = !this.selected;
    emit(this, 'rl-change', { selected: this.selected, value: this.value, sourceEvent: event });
    emit(this, 'rl-select', { selected: this.selected, value: this.value, sourceEvent: event });
  }

  render() {
    return html`
      <button
        part="base control"
        type="button"
        role=${this.checkbox ? 'checkbox' : 'button'}
        aria-checked=${this.checkbox ? String(this.selected) : undefined}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot name="icon" part="icon"></slot>
        <span part="label"><slot></slot></span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rl-chip': RlChip;
  }
}
