import { css, html, LitElement, nothing } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { defineElement } from '../internal/define';
import { componentHostStyles } from '../internal/styles';
import { NamiIllustration, type NamiIllustrationName } from './illustration';

defineElement('nami-illustration', NamiIllustration);

export class NamiEmpty extends LitElement {
  static properties = {
    illustration: { reflect: true },
    title: { reflect: true },
    description: { reflect: true },
    compact: { type: Boolean, reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      .base {
        align-items: center;
        color: var(--nami-style-on-paper, var(--nami-text));
        display: grid;
        background: var(--nami-empty-bg, transparent);
        border: var(--nami-empty-border-width, 0) solid var(--nami-empty-border-color, transparent);
        border-radius: var(--nami-empty-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-empty-shadow, none);
        gap: var(--nami-empty-gap, 12px);
        justify-items: center;
        padding: var(--nami-space-5, 24px);
        text-align: center;
      }

      :host([compact]) .base {
        padding: var(--nami-space-3, 10px);
      }

      .title {
        color: var(--nami-empty-title-color, var(--nami-text));
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.35;
      }

      .description {
        color: var(--nami-empty-description-color, var(--nami-text-muted));
        font-size: 0.925rem;
        line-height: 1.6;
        max-width: 42ch;
      }

      .actions {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--nami-space-2, 6px);
        justify-content: center;
      }
    `
  ];

  declare illustration: NamiIllustrationName;
  declare title: string;
  declare description: string;
  declare compact: boolean;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.illustration = 'empty';
    this.title = '';
    this.description = '';
    this.compact = false;
  }

  render() {
    const description = this.description || msg('No data', { id: 'nami.empty.description' });
    const label = this.title || description || msg('Empty state', { id: 'nami.empty.aria' });
    return html`
      <section class="base" part="base" aria-label=${label}>
        <slot name="illustration" part="illustration">
          <nami-illustration name=${this.illustration} size=${this.compact ? 'sm' : 'md'}></nami-illustration>
        </slot>
        ${this.title ? html`<div class="title" part="title"><slot name="title">${this.title}</slot></div>` : nothing}
        <div class="description" part="description"><slot name="description">${description}</slot></div>
        <div class="actions" part="actions"><slot name="actions"></slot></div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-empty': NamiEmpty;
  }
}
