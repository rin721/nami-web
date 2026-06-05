import { css, html, LitElement, nothing } from 'lit';
import { checkedState, syncHostState } from '../foundation/selection';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class NamiRadioItem extends LitElement {
  static properties = {
    value: {},
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    description: {},
    groupDisabled: { state: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
        outline: none;
      }

      .base {
        align-items: flex-start;
        color: var(--nami-style-on-paper, var(--nami-text));
        cursor: pointer;
        display: flex;
        gap: var(--nami-radio-item-gap, var(--nami-space-3, 10px));
        padding: var(--nami-radio-item-padding, 8px 0);
      }

      .indicator {
        align-items: center;
        background: var(--nami-radio-item-bg, transparent);
        border: var(--nami-radio-item-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-radio-item-border-color, var(--nami-border));
        border-radius: 50%;
        color: var(--nami-radio-item-indicator-color, var(--nami-color-primary));
        display: inline-flex;
        flex: 0 0 auto;
        height: var(--nami-radio-item-size, 20px);
        justify-content: center;
        margin-block-start: 0.1em;
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        width: var(--nami-radio-item-size, 20px);
      }

      .indicator::before {
        background: currentColor;
        border-radius: 50%;
        content: '';
        height: calc(var(--nami-radio-item-size, 20px) * 0.45);
        opacity: 0;
        transform: scale(0.75);
        transition:
          opacity var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        width: calc(var(--nami-radio-item-size, 20px) * 0.45);
      }

      :host([checked]) .indicator {
        border-color: var(--nami-color-primary);
      }

      :host([checked]) .indicator::before {
        opacity: 1;
        transform: scale(1);
      }

      :host(:focus-visible) .indicator {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      :host([data-disabled]) .base {
        cursor: not-allowed;
        opacity: 0.54;
      }

      .label {
        display: grid;
        gap: var(--nami-space-1, 4px);
        line-height: 1.35;
      }

      .description {
        color: var(--nami-radio-item-description-color, var(--nami-text-muted));
        font-size: 0.875rem;
      }
    `
  ];

  declare value: string;
  declare checked: boolean;
  declare disabled: boolean;
  declare description: string;
  declare groupDisabled: boolean;

  constructor() {
    super();
    this.value = '';
    this.checked = false;
    this.disabled = false;
    this.description = '';
    this.groupDisabled = false;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
    this.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeydown);
    super.disconnectedCallback();
  }

  updated() {
    const disabled = this.effectiveDisabled;
    syncHostState(this, {
      state: checkedState(this.checked),
      disabled
    });
    this.setAttribute('role', 'radio');
    this.setAttribute('aria-checked', String(this.checked));
    this.toggleAttribute('aria-disabled', disabled);
    if (disabled) this.tabIndex = -1;
  }

  setGroupDisabled(disabled: boolean) {
    this.groupDisabled = disabled;
  }

  get effectiveDisabled() {
    return this.disabled || this.groupDisabled;
  }

  private select(sourceEvent: Event) {
    if (this.effectiveDisabled || this.checked) return;
    this.checked = true;
    emit(this, 'nami-select', { checked: true, value: this.value, sourceEvent });
    emit(this, 'nami-change', { checked: true, value: this.value, sourceEvent });
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== ' ' && event.key !== 'Enter') return;
    event.preventDefault();
    this.select(event);
  };

  render() {
    return html`
      <div class="base" part="base control" @click=${this.select}>
        <span class="indicator" part="indicator"></span>
        <span class="label" part="label">
          <slot></slot>
          ${this.description ? html`<span class="description" part="description"><slot name="description">${this.description}</slot></span>` : nothing}
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-radio-item': NamiRadioItem;
  }
}
