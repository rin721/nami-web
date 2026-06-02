import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export type RlSpinnerSize = 'sm' | 'md' | 'lg';

export class RlSpinner extends LitElement {
  static properties = {
    size: { reflect: true },
    label: {}
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        --spinner-size: 1em;
        display: inline-flex;
        height: var(--spinner-size);
        width: var(--spinner-size);
      }

      :host([size='sm']) {
        --spinner-size: 14px;
      }

      :host,
      :host([size='md']) {
        --spinner-size: 18px;
      }

      :host([size='lg']) {
        --spinner-size: 24px;
      }

      .indicator {
        animation: rl-spinner-rotate 900ms linear infinite;
        border: 2px solid var(--rl-spinner-track-color, color-mix(in oklab, currentColor, transparent 72%));
        border-radius: 50%;
        border-top-color: currentColor;
        display: inline-block;
        height: 100%;
        width: 100%;
      }

      @keyframes rl-spinner-rotate {
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

  declare size: RlSpinnerSize;
  declare label: string;

  constructor() {
    super();
    this.size = 'md';
    this.label = 'Loading';
  }

  render() {
    return html`<span class="indicator" part="base indicator" role="status" aria-label=${this.label}></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rl-spinner': RlSpinner;
  }
}
