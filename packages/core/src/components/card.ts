import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export type NamiCardVariant = 'surface' | 'inset' | 'outline';

export class NamiCard extends LitElement {
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
        background: var(--nami-card-bg, var(--nami-surface-raised));
        border: var(--nami-card-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-card-border, var(--nami-border));
        border-radius: var(--nami-card-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-card-shadow, none);
        color: var(--nami-card-fg, var(--nami-text));
        display: grid;
        gap: var(--nami-card-gap, var(--nami-space-3, 10px));
        padding: var(--nami-card-padding, var(--nami-space-4, 16px));
      }

      :host([variant='inset']) .base {
        background: var(--nami-card-inset-bg, var(--nami-surface-inset));
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
        gap: var(--nami-space-2, 6px);
      }
    `
  ];

  declare variant: NamiCardVariant;

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
    'nami-card': NamiCard;
  }
}
