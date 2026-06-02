import { css, html, LitElement, nothing } from 'lit';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class RlRadioCard extends LitElement {
  static properties = {
    value: {},
    label: {},
    description: {},
    selected: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      button {
        background: var(--rl-radio-card-bg, var(--rl-surface-raised));
        border: var(--rl-radio-card-border-width, var(--rl-style-stroke-width, 1px)) solid var(--rl-radio-card-border-color, var(--rl-border));
        border-radius: var(--rl-radio-card-radius, var(--rl-radius-surface, 6px));
        color: var(--rl-text);
        cursor: pointer;
        display: grid;
        font: inherit;
        gap: var(--rl-space-3, 10px);
        min-height: 128px;
        padding: var(--rl-space-4, 16px);
        position: relative;
        box-shadow: var(--rl-radio-card-shadow, none);
        text-align: left;
        transition:
          background-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease),
          border-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease),
          box-shadow var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease),
          transform var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease);
        width: 100%;
      }

      button:hover:not(:disabled) {
        background: var(--rl-hover-overlay);
      }

      :host([selected]) button {
        border-color: var(--rl-color-primary);
        box-shadow: var(--rl-radio-card-selected-shadow, 0 0 0 1px var(--rl-color-primary), var(--rl-focus-ring));
      }

      button:active:not(:disabled) {
        transform: scale(0.99);
      }

      button:focus-visible {
        box-shadow: var(--rl-style-focus-shadow, var(--rl-focus-ring));
        outline: none;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.54;
      }

      .indicator {
        align-items: center;
        border: 1px solid var(--rl-border-strong);
        border-radius: 50%;
        color: var(--rl-text-inverse);
        display: inline-flex;
        height: 22px;
        justify-content: center;
        position: absolute;
        right: var(--rl-space-4, 16px);
        top: var(--rl-space-4, 16px);
        transition:
          background-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease),
          border-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease);
        width: 22px;
      }

      .indicator::before {
        background: currentColor;
        border-radius: 50%;
        content: '';
        height: 8px;
        opacity: 0;
        transition: opacity var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease);
        width: 8px;
      }

      :host([selected]) .indicator {
        background: var(--rl-color-primary);
        border-color: transparent;
      }

      :host([selected]) .indicator::before {
        opacity: 1;
      }

      .label {
        font-weight: 700;
      }

      .description {
        color: var(--rl-text-muted);
        font-size: 0.875rem;
      }
    `
  ];

  declare value: string;
  declare label: string;
  declare description: string;
  declare selected: boolean;
  declare disabled: boolean;

  constructor() {
    super();
    this.value = '';
    this.label = '';
    this.description = '';
    this.selected = false;
    this.disabled = false;
  }

  private select(event: MouseEvent) {
    if (this.disabled) return;
    if (this.selected) return;
    this.selected = true;
    emit(this, 'rl-select', { selected: true, value: this.value, sourceEvent: event });
    emit(this, 'rl-change', { selected: true, value: this.value, sourceEvent: event });
  }

  render() {
    return html`
      <button
        part="base control"
        type="button"
        role="radio"
        aria-checked=${this.selected ? 'true' : 'false'}
        ?disabled=${this.disabled}
        @click=${this.select}
      >
        <span class="indicator" part="indicator"></span>
        <slot name="icon" part="icon"></slot>
        <span class="label" part="label"><slot name="label">${this.label}</slot></span>
        ${this.description ? html`<span class="description" part="description"><slot name="description">${this.description}</slot></span>` : nothing}
        <slot name="actions"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rl-radio-card': RlRadioCard;
  }
}
