import { css, html, LitElement, nothing } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { componentHostStyles } from '../internal/styles';

export type NamiTopProgressVariant = 'fixed' | 'inline';

export interface NamiTopProgressOptions {
  duration?: number;
  height?: number;
  label?: string;
  minDuration?: number;
  progress?: number | null;
  variant?: NamiTopProgressVariant;
}

export class NamiTopProgress extends LitElement {
  static properties = {
    active: { type: Boolean, reflect: true },
    duration: { type: Number, reflect: true },
    height: { type: Number, reflect: true },
    label: {},
    progress: { type: Number, reflect: true },
    variant: { reflect: true },
    visible: { state: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        --top-progress-height: var(--nami-top-progress-height, 12px);
        --top-progress-duration: var(--nami-top-progress-duration, 220ms);
        --top-progress-track-bg: var(
          --nami-top-progress-track-bg,
          color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 78%)
        );
        --top-progress-fill-bg: var(
          --nami-top-progress-fill-bg,
          color-mix(in oklab, var(--nami-color-primary), var(--nami-text) 10%)
        );
        --top-progress-shadow: var(
          --nami-top-progress-shadow,
          0 8px 24px color-mix(in oklab, var(--nami-color-primary), transparent 78%)
        );
        --top-progress-z-index: var(--nami-top-progress-z-index, 2147483647);
        display: contents;
      }

      .base {
        box-sizing: border-box;
        inset-block-start: 0;
        inset-inline: 0 -4px;
        pointer-events: none;
        position: fixed;
        z-index: var(--top-progress-z-index);
      }

      :host([variant='inline']) .base {
        inset: 0;
        position: absolute;
      }

      .track {
        background: var(--top-progress-track-bg);
        block-size: var(--top-progress-height);
        box-shadow: var(--top-progress-shadow);
        display: block;
        inline-size: 100%;
        overflow: clip;
        position: relative;
        transform: scaleY(0);
        transform-origin: center top;
        transition: transform var(--top-progress-duration) var(--nami-ease-standard, ease);
      }

      :host([active]) .track {
        transform: scaleY(1);
      }

      :host([variant='inline']) .track {
        border-radius: var(--nami-radius-control, 999px);
        box-shadow: none;
      }

      .indicator {
        animation: nami-top-progress-indeterminate 1280ms var(--nami-ease-standard, ease) infinite;
        background: var(--top-progress-fill-bg);
        block-size: 100%;
        border-radius: 0 999px 999px 0;
        box-shadow:
          inset 0 0 0 1px color-mix(in oklab, var(--nami-color-primary), white 24%),
          0 0 18px color-mix(in oklab, var(--nami-color-primary), transparent 52%);
        display: block;
        inline-size: 46%;
        transform: translateX(-62%) scaleX(0.44);
        transform-origin: left center;
      }

      :host([progress]) .indicator {
        animation: none;
        inline-size: var(--nami-top-progress-value, 0%);
        transform: none;
        transition: inline-size var(--top-progress-duration) var(--nami-ease-standard, ease);
      }

      @keyframes nami-top-progress-indeterminate {
        0% {
          transform: translateX(-62%) scaleX(0.36);
        }

        48% {
          transform: translateX(74%) scaleX(0.72);
        }

        100% {
          transform: translateX(168%) scaleX(0.32);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .track,
        .indicator {
          transition-duration: 1ms;
        }

        .indicator {
          animation-duration: 1ms;
          animation-iteration-count: 1;
        }
      }
    `
  ];

  declare active: boolean;
  declare duration: number;
  declare height: number;
  declare label: string;
  declare progress?: number;
  declare variant: NamiTopProgressVariant;
  protected declare visible: boolean;

  private hideTimer = 0;
  private hideResolver?: () => void;
  private hideComplete?: Promise<void>;
  private shownAt = 0;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.active = false;
    this.duration = 220;
    this.height = 12;
    this.label = '';
    this.progress = undefined;
    this.variant = 'fixed';
    this.visible = false;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.active) {
      this.visible = true;
      this.shownAt = Date.now();
    }
  }

  disconnectedCallback() {
    window.clearTimeout(this.hideTimer);
    this.hideResolver?.();
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('progress')) this.syncProgressStyle();
    if (changed.has('height')) this.syncHeightStyle();
    if (changed.has('duration')) this.syncDurationStyle();
    if (!changed.has('active')) return;

    window.clearTimeout(this.hideTimer);
    if (this.active) {
      this.hideResolver?.();
      this.hideComplete = undefined;
      this.visible = true;
      this.shownAt = Date.now();
      return;
    }

    const elapsed = Date.now() - this.shownAt;
    const delay = Math.max(0, Number(this.duration) - elapsed);
    this.hideComplete = new Promise((resolve) => {
      this.hideResolver = resolve;
    });
    this.hideTimer = window.setTimeout(() => {
      if (!this.active) this.visible = false;
      this.hideResolver?.();
      this.hideResolver = undefined;
    }, delay);
  }

  show(options: NamiTopProgressOptions = {}) {
    this.applyOptions(options);
    this.visible = true;
    this.shownAt = Date.now();
    this.active = true;
  }

  set(progress: number | null | undefined) {
    this.progress = progress === null || progress === undefined ? undefined : progress;
  }

  async finish(options: NamiTopProgressOptions = {}) {
    this.applyOptions({ ...options, progress: options.progress ?? 100 });
    this.active = true;
    await this.updateComplete;
    await new Promise((resolve) => window.setTimeout(resolve, Number(options.minDuration ?? this.duration)));
    await this.hide({ ...options, progress: null });
  }

  async hide(options: NamiTopProgressOptions = {}) {
    this.applyOptions(options);
    this.active = false;
    await this.updateComplete;
    if (this.hideComplete) await this.hideComplete;
  }

  async waitFor<T>(task: PromiseLike<T> | (() => PromiseLike<T>), options: NamiTopProgressOptions = {}) {
    const minDuration = options.minDuration ?? this.duration;
    const startedAt = Date.now();
    this.show(options);
    try {
      return await (typeof task === 'function' ? task() : task);
    } finally {
      const remaining = Math.max(0, Number(minDuration) - (Date.now() - startedAt));
      if (remaining > 0) await new Promise((resolve) => window.setTimeout(resolve, remaining));
      await this.finish(options);
    }
  }

  private applyOptions(options: NamiTopProgressOptions) {
    if (options.duration !== undefined) this.duration = options.duration;
    if (options.height !== undefined) this.height = options.height;
    if (options.label !== undefined) this.label = options.label;
    if (options.variant) this.variant = options.variant;
    if (options.progress !== undefined) this.set(options.progress);
  }

  private syncProgressStyle() {
    if (this.progress === undefined || this.progress === null || Number.isNaN(Number(this.progress))) {
      this.style.removeProperty('--nami-top-progress-value');
      return;
    }
    const value = Math.min(100, Math.max(0, Number(this.progress)));
    this.style.setProperty('--nami-top-progress-value', `${value}%`);
  }

  private syncHeightStyle() {
    if (!Number.isFinite(Number(this.height)) || Number(this.height) <= 0) {
      this.style.removeProperty('--nami-top-progress-height');
      return;
    }
    this.style.setProperty('--nami-top-progress-height', `${Number(this.height)}px`);
  }

  private syncDurationStyle() {
    if (!Number.isFinite(Number(this.duration)) || Number(this.duration) < 0) {
      this.style.removeProperty('--nami-top-progress-duration');
      return;
    }
    this.style.setProperty('--nami-top-progress-duration', `${Number(this.duration)}ms`);
  }

  private get fallbackLabel() {
    return this.label || msg('Navigating', { id: 'nami.topProgress.navigating' });
  }

  render() {
    if (!this.visible) return nothing;
    const hasProgress = this.progress !== undefined && this.progress !== null && !Number.isNaN(Number(this.progress));
    return html`
      <div class="base" part="base">
        <span
          class="track"
          part="track"
          role="progressbar"
          aria-label=${this.fallbackLabel}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${hasProgress ? String(Math.round(Number(this.progress))) : nothing}
        >
          <span class="indicator" part="indicator"></span>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-top-progress': NamiTopProgress;
  }
}
