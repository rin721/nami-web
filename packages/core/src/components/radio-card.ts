import { css, html, LitElement, nothing } from 'lit';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class NamiRadioCard extends LitElement {
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
        background: var(--nami-radio-card-bg, var(--nami-surface-raised));
        border: var(--nami-radio-card-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-radio-card-border-color, var(--nami-border));
        border-radius: var(--nami-radio-card-radius, var(--nami-radius-surface, 6px));
        color: var(--nami-style-on-paper, var(--nami-text));
        cursor: pointer;
        display: grid;
        font: inherit;
        gap: var(--nami-space-3, 10px);
        min-height: 128px;
        padding: var(--nami-space-4, 16px);
        position: relative;
        box-shadow: var(--nami-radio-card-shadow, none);
        text-align: left;
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        width: 100%;
      }

      button:hover:not(:disabled) {
        background: var(--nami-hover-overlay);
      }

      :host([selected]) button {
        border-color: var(--nami-color-primary);
        box-shadow: var(--nami-radio-card-selected-shadow, 0 0 0 1px var(--nami-color-primary), var(--nami-focus-ring));
      }

      button:active:not(:disabled) {
        transform: scale(0.99);
      }

      button:focus-visible {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
        outline: none;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.54;
      }

      .indicator {
        align-items: center;
        border: 1px solid var(--nami-border-strong);
        border-radius: 50%;
        color: var(--nami-text-inverse);
        display: inline-flex;
        height: 22px;
        justify-content: center;
        position: absolute;
        right: var(--nami-space-4, 16px);
        top: var(--nami-space-4, 16px);
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: 22px;
      }

      .indicator::before {
        background: currentColor;
        border-radius: 50%;
        content: '';
        height: 8px;
        opacity: 0;
        transition: opacity var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        width: 8px;
      }

      :host([selected]) .indicator {
        background: var(--nami-color-primary);
        border-color: transparent;
      }

      :host([selected]) .indicator::before {
        opacity: 1;
      }

      .label {
        font-weight: 700;
      }

      .description {
        color: var(--nami-style-on-paper-muted, var(--nami-text-muted));
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
    emit(this, 'nami-select', { selected: true, value: this.value, sourceEvent: event });
    emit(this, 'nami-change', { selected: true, value: this.value, sourceEvent: event });
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
    'nami-radio-card': NamiRadioCard;
  }
}
