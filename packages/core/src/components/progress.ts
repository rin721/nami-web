import { css, html, LitElement, nothing } from 'lit';
import { componentHostStyles } from '../internal/styles';

export class NamiProgress extends LitElement {
  static properties = {
    value: { type: Number, reflect: true },
    max: { type: Number, reflect: true },
    label: {},
    indeterminate: { type: Boolean, reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      .track {
        background: var(--nami-progress-track-bg, color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 82%));
        border-radius: var(--nami-progress-radius, var(--nami-radius-control, 999px));
        height: var(--nami-progress-height, 8px);
        overflow: hidden;
        position: relative;
      }

      .fill {
        background: var(--nami-progress-fill-bg, var(--nami-color-primary));
        border-radius: inherit;
        height: 100%;
        transform-origin: left center;
        transition: width var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: var(--nami-progress-value, 0%);
      }

      :host([indeterminate]) .fill {
        animation: nami-progress-indeterminate 1180ms var(--nami-ease-standard, ease) infinite;
        width: 48%;
      }

      @keyframes nami-progress-indeterminate {
        0% {
          transform: translateX(-110%) scaleX(0.56);
        }
        55% {
          transform: translateX(92%) scaleX(0.92);
        }
        100% {
          transform: translateX(210%) scaleX(0.56);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .fill {
          transition-duration: 1ms;
        }

        :host([indeterminate]) .fill {
          animation-duration: 1ms;
          animation-iteration-count: 1;
        }
      }
    `
  ];

  declare value: number;
  declare max: number;
  declare label: string;
  declare indeterminate: boolean;

  constructor() {
    super();
    this.value = 0;
    this.max = 100;
    this.label = '';
    this.indeterminate = false;
  }

  updated() {
    const percent = this.max > 0 ? Math.min(100, Math.max(0, (this.value / this.max) * 100)) : 0;
    this.style.setProperty('--nami-progress-value', `${percent}%`);
    this.dataset.state = this.indeterminate ? 'indeterminate' : 'determinate';
  }

  render() {
    const clampedValue = this.max > 0 ? Math.min(this.max, Math.max(0, this.value)) : 0;
    const percent = this.max > 0 ? (clampedValue / this.max) * 100 : 0;
    return html`
      <div
        class="track"
        part="base track"
        role="progressbar"
        aria-label=${this.label || 'Progress'}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate ? nothing : clampedValue}
      >
        <div class="fill" part="indicator"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-progress': NamiProgress;
  }
}
