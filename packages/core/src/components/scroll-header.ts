import { css, html, LitElement } from 'lit';
import { scroll } from 'motion';
import type { NamiScrollStateEventDetail } from '../events';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export type NamiScrollDirection = 'idle' | 'up' | 'down';

export class NamiScrollHeader extends LitElement {
  static properties = {
    threshold: { type: Number, reflect: true },
    hideThreshold: { attribute: 'hide-threshold', type: Number, reflect: true },
    hidden: { type: Boolean, reflect: true },
    elevated: { type: Boolean, reflect: true },
    direction: { reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        --scroll-header-bg: var(--nami-scroll-header-bg, var(--nami-surface-overlay, color-mix(in oklab, #fff, transparent 18%)));
        --scroll-header-border: var(--nami-scroll-header-border, var(--nami-border, color-mix(in oklab, #000, transparent 88%)));
        --scroll-header-height: var(--nami-scroll-header-height, 56px);
        --scroll-header-shadow: var(
          --nami-scroll-header-shadow,
          0 12px 32px color-mix(in oklab, var(--nami-shadow-color, #64748b), transparent 78%)
        );
        --scroll-header-z-index: var(--nami-scroll-header-z-index, 40);
        display: block;
        position: sticky;
        top: var(--nami-scroll-header-top, 0);
        z-index: var(--scroll-header-z-index);
      }

      .base {
        color: var(--nami-text, #171717);
        min-height: var(--scroll-header-height);
        position: relative;
        transform: translateY(0);
        transition:
          transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        will-change: transform;
      }

      :host([hidden]) .base {
        transform: translateY(-100%);
      }

      .backdrop {
        background: var(--scroll-header-bg);
        inset: 0;
        opacity: 0;
        position: absolute;
        transition:
          opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          backdrop-filter var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      :host([elevated]) .backdrop {
        -webkit-backdrop-filter: blur(20px) saturate(1.32);
        backdrop-filter: blur(20px) saturate(1.32);
        opacity: 1;
      }

      :host([elevated]) .base {
        box-shadow: var(--scroll-header-shadow);
      }

      .edge {
        background: linear-gradient(90deg, transparent, var(--scroll-header-border), var(--nami-color-primary, #3b82f6), var(--scroll-header-border), transparent);
        block-size: var(--nami-scroll-header-edge-height, 1px);
        inset-block-end: 0;
        inset-inline: 0;
        opacity: 0;
        position: absolute;
        transition: opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      :host([elevated]) .edge {
        opacity: 1;
      }

      .content {
        align-items: center;
        display: flex;
        min-height: var(--scroll-header-height);
        position: relative;
        z-index: 1;
      }

      @media (prefers-reduced-motion: reduce) {
        .base,
        .backdrop,
        .edge {
          transition-duration: 1ms;
        }
      }
    `
  ];

  declare threshold: number;
  declare hideThreshold: number;
  declare hidden: boolean;
  declare elevated: boolean;
  declare direction: NamiScrollDirection;

  private lastY = 0;
  private motionCancel?: () => void;
  private stateSnapshot = '';

  constructor() {
    super();
    this.threshold = 20;
    this.hideThreshold = 56;
    this.hidden = false;
    this.elevated = false;
    this.direction = 'idle';
  }

  connectedCallback() {
    super.connectedCallback();
    this.lastY = this.readScrollY();
    this.syncFromScroll(this.lastY);
    window.addEventListener('scroll', this.handleNativeScroll, { passive: true });
    try {
      this.motionCancel = scroll((progress, info) => {
        this.syncFromScroll(info.y.current, progress);
      });
    } catch {
      this.motionCancel = undefined;
    }
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.handleNativeScroll);
    this.motionCancel?.();
    this.motionCancel = undefined;
    super.disconnectedCallback();
  }

  sync() {
    this.syncFromScroll(this.readScrollY());
  }

  private handleNativeScroll = () => {
    this.syncFromScroll(this.readScrollY());
  };

  private readScrollY() {
    return Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);
  }

  private readProgress(scrollY: number) {
    const root = document.documentElement;
    const max = Math.max(1, root.scrollHeight - window.innerHeight);
    return Math.min(1, Math.max(0, scrollY / max));
  }

  private syncFromScroll(scrollY: number, progress = this.readProgress(scrollY)) {
    const nextDirection: NamiScrollDirection = scrollY > this.lastY ? 'down' : scrollY < this.lastY ? 'up' : this.direction;
    const nextElevated = scrollY > Number(this.threshold);
    const nextHidden = nextDirection === 'down' && scrollY > Number(this.hideThreshold);

    this.lastY = scrollY;
    this.direction = nextDirection;
    this.elevated = nextElevated;
    this.hidden = nextHidden;

    const detail: NamiScrollStateEventDetail = {
      scrollY: Math.round(scrollY),
      progress,
      direction: this.direction,
      hidden: this.hidden,
      elevated: this.elevated
    };
    const snapshot = JSON.stringify(detail);
    if (snapshot !== this.stateSnapshot) {
      this.stateSnapshot = snapshot;
      emit(this, 'nami-scroll-state', detail);
    }
  }

  render() {
    return html`
      <div class="base" part="base">
        <div class="backdrop" part="backdrop" aria-hidden="true"></div>
        <div class="content" part="content"><slot></slot></div>
        <div class="edge" part="edge" aria-hidden="true"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-scroll-header': NamiScrollHeader;
  }
}
