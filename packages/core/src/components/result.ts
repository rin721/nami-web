import { css, html, LitElement, nothing } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { defineElement } from '../internal/define';
import { componentHostStyles } from '../internal/styles';
import { NamiIllustration, type NamiIllustrationName } from './illustration';

defineElement('nami-illustration', NamiIllustration);

export type NamiResultStatus = 'success' | 'error' | 'info' | 'warning' | '403' | '404' | '500';

const statusIllustrations: Record<NamiResultStatus, NamiIllustrationName> = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  '403': 'forbidden',
  '404': 'not-found',
  '500': 'server-error'
};

export class NamiResult extends LitElement {
  static properties = {
    status: { reflect: true },
    title: { reflect: true },
    subTitle: { attribute: 'sub-title', reflect: true },
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
        background: var(--nami-result-bg, transparent);
        border: var(--nami-result-border-width, 0) solid var(--nami-result-border-color, transparent);
        border-radius: var(--nami-result-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-result-shadow, none);
        gap: var(--nami-result-gap, 14px);
        justify-items: center;
        padding: var(--nami-space-5, 24px);
        text-align: center;
      }

      :host([compact]) .base {
        padding: var(--nami-space-3, 10px);
      }

      .title {
        color: var(--nami-style-on-paper, var(--nami-text));
        font-size: var(--nami-result-title-size, 1.5rem);
        font-weight: 800;
        line-height: 1.25;
      }

      .description {
        color: var(--nami-style-on-paper-muted, var(--nami-text-muted));
        font-size: var(--nami-result-subtitle-size, 0.95rem);
        line-height: 1.6;
        max-width: 54ch;
      }

      .body {
        color: var(--nami-style-on-paper-muted, var(--nami-text-muted));
        max-width: 62ch;
        width: 100%;
      }

      .actions {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--nami-space-2, 6px);
        justify-content: center;
        margin: var(--nami-result-actions-margin, 10px 0 0);
      }
    `
  ];

  declare status: NamiResultStatus;
  declare title: string;
  declare subTitle: string;
  declare compact: boolean;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.status = 'info';
    this.title = '';
    this.subTitle = '';
    this.compact = false;
  }

  private get illustrationName() {
    return statusIllustrations[this.status] ?? 'info';
  }

  render() {
    return html`
      <section class="base" part="base" aria-label=${this.title || this.subTitle || msg('Result', { id: 'nami.result.aria' })}>
        <slot name="illustration" part="illustration">
          <nami-illustration name=${this.illustrationName} size=${this.compact ? 'sm' : 'lg'}></nami-illustration>
        </slot>
        ${this.title ? html`<div class="title" part="title"><slot name="title">${this.title}</slot></div>` : nothing}
        ${this.subTitle
          ? html`<div class="description" part="description"><slot name="description">${this.subTitle}</slot></div>`
          : nothing}
        <div class="body" part="body"><slot name="body"></slot></div>
        <div class="actions" part="actions"><slot name="actions"></slot></div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-result': NamiResult;
  }
}
