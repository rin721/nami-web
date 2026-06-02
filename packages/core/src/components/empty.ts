import { css, html, LitElement, nothing } from 'lit';
import { defineElement } from '../internal/define';
import { componentHostStyles } from '../internal/styles';
import { RlIllustration, type RlIllustrationName } from './illustration';

defineElement('rl-illustration', RlIllustration);

export class RlEmpty extends LitElement {
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
        color: var(--rl-style-on-paper, var(--rl-text));
        display: grid;
        background: var(--rl-empty-bg, transparent);
        border: var(--rl-empty-border-width, 0) solid var(--rl-empty-border-color, transparent);
        border-radius: var(--rl-empty-radius, var(--rl-radius-surface, 6px));
        box-shadow: var(--rl-empty-shadow, none);
        gap: var(--rl-empty-gap, 12px);
        justify-items: center;
        padding: var(--rl-space-5, 24px);
        text-align: center;
      }

      :host([compact]) .base {
        padding: var(--rl-space-3, 10px);
      }

      .title {
        color: var(--rl-empty-title-color, var(--rl-text));
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.35;
      }

      .description {
        color: var(--rl-empty-description-color, var(--rl-text-muted));
        font-size: 0.925rem;
        line-height: 1.6;
        max-width: 42ch;
      }

      .actions {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--rl-space-2, 6px);
        justify-content: center;
      }
    `
  ];

  declare illustration: RlIllustrationName;
  declare title: string;
  declare description: string;
  declare compact: boolean;

  constructor() {
    super();
    this.illustration = 'empty';
    this.title = '';
    this.description = 'No data';
    this.compact = false;
  }

  render() {
    return html`
      <section class="base" part="base" aria-label=${this.title || this.description || 'Empty state'}>
        <slot name="illustration" part="illustration">
          <rl-illustration name=${this.illustration} size=${this.compact ? 'sm' : 'md'}></rl-illustration>
        </slot>
        ${this.title ? html`<div class="title" part="title"><slot name="title">${this.title}</slot></div>` : nothing}
        ${this.description
          ? html`<div class="description" part="description"><slot name="description">${this.description}</slot></div>`
          : nothing}
        <div class="actions" part="actions"><slot name="actions"></slot></div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rl-empty': RlEmpty;
  }
}
