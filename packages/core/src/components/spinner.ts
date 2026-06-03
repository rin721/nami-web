import { css, html, LitElement } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { componentHostStyles } from '../internal/styles';

export type NamiSpinnerSize = 'sm' | 'md' | 'lg';

export class NamiSpinner extends LitElement {
  static properties = {
    size: { reflect: true },
    label: {}
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        --spinner-size: var(--nami-icon-size, 1em);
        display: inline-flex;
        height: var(--spinner-size);
        width: var(--spinner-size);
      }

      :host([size='sm']) {
        --spinner-size: 14px;
      }

      :host([size='md']) {
        --spinner-size: 18px;
      }

      :host([size='lg']) {
        --spinner-size: 24px;
      }

      .indicator {
        animation: nami-spinner-rotate 900ms linear infinite;
        border: 2px solid var(--nami-spinner-track-color, color-mix(in oklab, currentColor, transparent 72%));
        border-radius: 50%;
        border-top-color: currentColor;
        display: inline-block;
        height: 100%;
        width: 100%;
      }

      @keyframes nami-spinner-rotate {
        to {
          transform: rotate(360deg);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .indicator {
          animation-duration: 1ms;
        }
      }
    `
  ];

  declare size?: NamiSpinnerSize;
  declare label: string;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.label = '';
  }

  render() {
    return html`<span class="indicator" part="base indicator" role="status" aria-label=${this.label || msg('Loading', { id: 'nami.spinner.loading' })}></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-spinner': NamiSpinner;
  }
}
