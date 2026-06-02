import { css, html, LitElement, nothing } from 'lit';
import { defineElement } from '../internal/define';
import { componentHostStyles } from '../internal/styles';
import { RlIllustration, type RlIllustrationName } from './illustration';

defineElement('rl-illustration', RlIllustration);

export type RlResultStatus = 'success' | 'error' | 'info' | 'warning' | '403' | '404' | '500';

const statusIllustrations: Record<RlResultStatus, RlIllustrationName> = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  '403': 'forbidden',
  '404': 'not-found',
  '500': 'server-error'
};

export class RlResult extends LitElement {
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
        color: var(--rl-style-on-paper, var(--rl-text));
        display: grid;
        background: var(--rl-result-bg, transparent);
        border: var(--rl-result-border-width, 0) solid var(--rl-result-border-color, transparent);
        border-radius: var(--rl-result-radius, var(--rl-radius-surface, 6px));
        box-shadow: var(--rl-result-shadow, none);
        gap: var(--rl-result-gap, 14px);
        justify-items: center;
        padding: var(--rl-space-5, 24px);
        text-align: center;
      }

      :host([compact]) .base {
        padding: var(--rl-space-3, 10px);
      }

      .title {
        color: var(--rl-style-on-paper, var(--rl-text));
        font-size: var(--rl-result-title-size, 1.5rem);
        font-weight: 800;
        line-height: 1.25;
      }

      .description {
        color: var(--rl-style-on-paper-muted, var(--rl-text-muted));
        font-size: var(--rl-result-subtitle-size, 0.95rem);
        line-height: 1.6;
        max-width: 54ch;
      }

      .body {
        color: var(--rl-style-on-paper-muted, var(--rl-text-muted));
        max-width: 62ch;
        width: 100%;
      }

      .actions {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--rl-space-2, 6px);
        justify-content: center;
        margin: var(--rl-result-actions-margin, 10px 0 0);
      }
    `
  ];

  declare status: RlResultStatus;
  declare title: string;
  declare subTitle: string;
  declare compact: boolean;

  constructor() {
    super();
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
      <section class="base" part="base" aria-label=${this.title || this.subTitle || 'Result'}>
        <slot name="illustration" part="illustration">
          <rl-illustration name=${this.illustrationName} size=${this.compact ? 'sm' : 'lg'}></rl-illustration>
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
    'rl-result': RlResult;
  }
}
