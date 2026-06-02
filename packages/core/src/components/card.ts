import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export type RlCardVariant = 'surface' | 'inset' | 'outline';

export class RlCard extends LitElement {
  static properties = {
    variant: { reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      .base {
        background: var(--rl-card-bg, var(--rl-surface-raised));
        border: var(--rl-card-border-width, var(--rl-style-stroke-width, 1px)) solid var(--rl-card-border, var(--rl-border));
        border-radius: var(--rl-card-radius, var(--rl-radius-surface, 6px));
        box-shadow: var(--rl-card-shadow, none);
        color: var(--rl-card-fg, var(--rl-text));
        display: grid;
        gap: var(--rl-card-gap, var(--rl-space-3, 10px));
        padding: var(--rl-card-padding, var(--rl-space-4, 16px));
      }

      :host([variant='inset']) .base {
        background: var(--rl-card-inset-bg, var(--rl-surface-inset));
      }

      :host([variant='outline']) .base {
        background: transparent;
      }

      :host(:not([has-header])) header,
      :host(:not([has-actions])) .actions,
      :host(:not([has-footer])) footer {
        display: none;
      }

      header,
      footer,
      .actions {
        min-width: 0;
      }

      .body {
        min-width: 0;
      }

      .actions {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--rl-space-2, 6px);
      }
    `
  ];

  declare variant: RlCardVariant;

  constructor() {
    super();
    this.variant = 'surface';
  }

  private syncSlotState(event: Event) {
    const slot = event.currentTarget as HTMLSlotElement;
    const name = slot.name || 'default';
    const hasContent = slot.assignedNodes({ flatten: true }).some((node) => node.nodeType !== Node.TEXT_NODE || node.textContent?.trim());

    if (name === 'header') this.toggleAttribute('has-header', hasContent);
    if (name === 'actions') this.toggleAttribute('has-actions', hasContent);
    if (name === 'footer') this.toggleAttribute('has-footer', hasContent);
  }

  render() {
    return html`
      <article class="base" part="base">
        <header part="header"><slot name="header" @slotchange=${this.syncSlotState}></slot></header>
        <section class="body" part="body"><slot></slot></section>
        <div class="actions" part="actions"><slot name="actions" @slotchange=${this.syncSlotState}></slot></div>
        <footer part="footer"><slot name="footer" @slotchange=${this.syncSlotState}></slot></footer>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rl-card': RlCard;
  }
}
