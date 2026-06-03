import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export type NamiSkeletonVariant = 'text' | 'rect' | 'circle';

export class NamiSkeleton extends LitElement {
  static properties = {
    variant: { reflect: true },
    animated: { type: Boolean, reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      .base {
        background:
          linear-gradient(90deg, transparent, var(--nami-skeleton-highlight, rgb(255 255 255 / 0.48)), transparent),
          var(--nami-skeleton-bg, var(--nami-hover-overlay));
        background-size: 220% 100%, auto;
        border-radius: var(--nami-radius-surface, 6px);
        display: block;
        min-height: 1rem;
        overflow: hidden;
      }

      :host([variant='text']) .base {
        border-radius: var(--nami-radius-control, 999px);
        min-height: 0.875rem;
        width: 100%;
      }

      :host([variant='circle']) .base {
        aspect-ratio: 1;
        border-radius: 50%;
      }

      :host([animated]) .base {
        animation: nami-skeleton var(--nami-motion-slow, 700ms) linear infinite;
      }

      @keyframes nami-skeleton {
        from {
          background-position: 120% 0, 0 0;
        }
        to {
          background-position: -120% 0, 0 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        :host([animated]) .base {
          animation-duration: 1ms;
          animation-iteration-count: 1;
        }
      }
    `
  ];

  declare variant: NamiSkeletonVariant;
  declare animated: boolean;

  constructor() {
    super();
    this.variant = 'text';
    this.animated = true;
  }

  updated() {
    this.dataset.state = this.animated ? 'loading' : 'idle';
  }

  render() {
    return html`<span class="base" part="base" aria-hidden="true"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-skeleton': NamiSkeleton;
  }
}
