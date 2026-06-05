import { css, html, LitElement, nothing } from 'lit';
import { syncHostState } from '../foundation/selection';
import { componentHostStyles } from '../internal/styles';

export class NamiDivider extends LitElement {
  static properties = {
    orientation: { reflect: true },
    hasLabel: { state: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      .base {
        align-items: center;
        color: var(--nami-divider-label-color, var(--nami-text-muted));
        display: flex;
        gap: var(--nami-divider-gap, var(--nami-space-3, 10px));
        inline-size: 100%;
      }

      .line {
        background: var(--nami-divider-color, var(--nami-border));
        block-size: var(--nami-divider-thickness, var(--nami-style-stroke-width, 1px));
        flex: 1 1 auto;
      }

      .label {
        color: inherit;
        flex: 0 0 auto;
        font-size: 0.8125rem;
        line-height: 1.4;
      }

      :host(:not([data-has-label])) .label,
      :host(:not([data-has-label])) .line + .line {
        display: none;
      }

      :host([orientation='vertical']) {
        display: inline-block;
        min-block-size: 1em;
      }

      :host([orientation='vertical']) .base {
        block-size: 100%;
        flex-direction: column;
        inline-size: auto;
        min-block-size: inherit;
      }

      :host([orientation='vertical']) .line {
        block-size: auto;
        inline-size: var(--nami-divider-thickness, var(--nami-style-stroke-width, 1px));
        min-block-size: var(--nami-divider-min-size, 2rem);
      }
    `
  ];

  declare orientation: 'horizontal' | 'vertical';
  private hasLabel: boolean;

  constructor() {
    super();
    this.orientation = 'horizontal';
    this.hasLabel = false;
  }

  updated() {
    syncHostState(this, { state: this.orientation });
    this.toggleAttribute('data-has-label', this.hasLabel);
  }

  private handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.hasLabel = slot
      .assignedNodes({ flatten: true })
      .some((node) => node.nodeType === Node.ELEMENT_NODE || Boolean(node.textContent?.trim()));
  }

  render() {
    const orientation = this.orientation === 'vertical' ? 'vertical' : 'horizontal';

    return html`
      <div class="base" part="base" role="separator" aria-orientation=${orientation}>
        <span class="line" part="line"></span>
        <span class="label" part="label"><slot @slotchange=${this.handleSlotChange}></slot></span>
        ${this.hasLabel ? html`<span class="line" part="line"></span>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-divider': NamiDivider;
  }
}
