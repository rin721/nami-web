import { css, html, LitElement } from 'lit';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class NamiChip extends LitElement {
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
        background: var(--nami-chip-bg, var(--nami-hover-overlay));
        border: var(--nami-chip-border-width, 0) solid var(--nami-chip-border-color, transparent);
        border-radius: var(--nami-chip-radius, var(--nami-radius-control, 999px));
        color: var(--nami-style-on-paper, var(--nami-text));
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        gap: var(--nami-space-2, 6px);
        min-height: 31px;
        padding: 0 12px;
        box-shadow: var(--nami-chip-shadow, none);
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          color var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
      }

      :host([selected]) button {
        background: var(--nami-chip-selected-bg, var(--nami-color-primary));
        color: var(--nami-text-inverse);
      }

      button:hover:not(:disabled) {
        background: var(--nami-accent-hover-overlay, var(--nami-hover-overlay));
      }

      :host([selected]) button:hover:not(:disabled) {
        background: var(--nami-color-primary-hover);
      }

      button:active:not(:disabled) {
        transform: scale(0.98);
      }

      button:focus-visible {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
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
    emit(this, 'nami-change', { selected: this.selected, value: this.value, sourceEvent: event });
    emit(this, 'nami-select', { selected: this.selected, value: this.value, sourceEvent: event });
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
    'nami-chip': NamiChip;
  }
}
