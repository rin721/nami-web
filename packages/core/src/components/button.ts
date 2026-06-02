import { css, html, LitElement, nothing } from 'lit';
import { emit } from '../internal/events';
import { defineElement } from '../internal/define';
import { componentHostStyles } from '../internal/styles';
import { RlSpinner } from './spinner';

export type RlButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type RlButtonSize = 'sm' | 'md' | 'lg';

defineElement('rl-spinner', RlSpinner);

export class RlButton extends LitElement {
  static properties = {
    variant: { reflect: true },
    size: { reflect: true },
    disabled: { type: Boolean, reflect: true },
    loading: { type: Boolean, reflect: true },
    type: {}
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: inline-flex;
      }

      button {
        align-items: center;
        background: var(--rl-button-bg, var(--rl-color-primary));
        border: var(--rl-button-border-width, var(--rl-style-stroke-width, 1px)) solid var(--rl-button-border, transparent);
        border-radius: var(--rl-button-radius, var(--rl-radius-control, 999px));
        color: var(--rl-button-fg, var(--rl-text-inverse));
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        font-weight: 600;
        gap: var(--rl-space-2, 6px);
        justify-content: center;
        min-height: var(--button-height);
        min-width: var(--button-height);
        padding: 0 var(--button-padding);
        position: relative;
        box-shadow: var(--rl-button-shadow, none);
        transition:
          background-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease),
          border-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease),
          color var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease),
          box-shadow var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease),
          transform var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease);
        user-select: none;
      }

      :host([size='sm']) {
        --button-height: var(--rl-control-height-sm, 32px);
        --button-padding: 12px;
      }

      :host,
      :host([size='md']) {
        --button-height: var(--rl-control-height-md, 40px);
        --button-padding: 16px;
      }

      :host([size='lg']) {
        --button-height: var(--rl-control-height-lg, 48px);
        --button-padding: 20px;
      }

      :host([variant='soft']) button {
        background: var(--rl-accent-hover-overlay, var(--rl-color-primary-muted));
        color: var(--rl-color-primary);
      }

      :host([variant='outline']) button {
        background: transparent;
        border-color: var(--rl-border, currentColor);
        color: var(--rl-text);
      }

      :host([variant='ghost']) button {
        background: transparent;
        color: var(--rl-text);
      }

      button:hover:not(:disabled) {
        background: var(--rl-button-hover-bg, var(--rl-color-primary-hover));
      }

      :host([variant='soft']) button:hover:not(:disabled),
      :host([variant='ghost']) button:hover:not(:disabled),
      :host([variant='outline']) button:hover:not(:disabled) {
        background: var(--rl-hover-overlay);
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

      rl-spinner {
        color: currentColor;
      }

      ::slotted([slot='icon']) {
        flex: 0 0 auto;
      }

      @media (prefers-reduced-motion: reduce) {
        button {
          transition-duration: 1ms;
        }

        button:active:not(:disabled) {
          transform: none;
        }
      }
    `
  ];

  declare variant: RlButtonVariant;
  declare size: RlButtonSize;
  declare disabled: boolean;
  declare loading: boolean;
  declare type: 'button' | 'submit' | 'reset';

  constructor() {
    super();
    this.variant = 'solid';
    this.size = 'md';
    this.disabled = false;
    this.loading = false;
    this.type = 'button';
  }

  private handleClick(event: MouseEvent) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    emit(this, 'rl-click', { sourceEvent: event });
  }

  render() {
    return html`
      <button
        part="base control"
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading ? 'true' : 'false'}
        @click=${this.handleClick}
      >
        ${this.loading ? html`<rl-spinner size="sm" label="Loading" part="indicator"></rl-spinner>` : html`<slot name="icon" part="icon"></slot>`}
        <span part="label"><slot></slot></span>
        ${this.loading ? nothing : html`<slot name="actions"></slot>`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rl-button': RlButton;
  }
}
