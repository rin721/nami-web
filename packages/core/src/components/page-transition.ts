import { css, html, LitElement, nothing } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { componentHostStyles } from '../internal/styles';
import { defineElement } from '../internal/define';
import { NamiSpinner } from './spinner';

defineElement('nami-spinner', NamiSpinner);

export type NamiPageTransitionVariant = 'screen' | 'inline';
export type NamiPageTransitionTone = 'surface' | 'brand';
export type NamiPageTransitionAppearance = 'bar' | 'veil' | 'panel';

export interface NamiPageTransitionOptions {
  appearance?: NamiPageTransitionAppearance;
  label?: string;
  tone?: NamiPageTransitionTone;
  variant?: NamiPageTransitionVariant;
  duration?: number;
  minDuration?: number;
}

export class NamiPageTransition extends LitElement {
  static properties = {
    active: { type: Boolean, reflect: true },
    label: {},
    variant: { reflect: true },
    tone: { reflect: true },
    appearance: { reflect: true },
    duration: { type: Number, reflect: true },
    visible: { state: true },
    hasDefaultContent: { state: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        --page-transition-backdrop: color-mix(in oklab, var(--nami-surface), transparent 8%);
        --page-transition-bar-bg: color-mix(in oklab, var(--nami-color-primary), transparent 86%);
        --page-transition-bar-fg: linear-gradient(
          90deg,
          color-mix(in oklab, var(--nami-color-primary), white 18%),
          var(--nami-color-primary),
          color-mix(in oklab, var(--nami-color-primary), var(--nami-text) 20%)
        );
        --page-transition-brand-ink: color-mix(in oklab, var(--nami-color-primary), black 44%);
        --page-transition-panel-bg: var(--nami-surface-overlay);
        --page-transition-panel-fg: var(--nami-text);
        --page-transition-panel-border: var(--nami-border);
        --page-transition-panel-shadow: var(--nami-dialog-shadow, 0 20px 60px color-mix(in oklab, var(--nami-shadow-color), transparent 68%));
        color: var(--page-transition-panel-fg);
        display: contents;
      }

      :host([tone='brand']) {
        --page-transition-backdrop: color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 84%);
        --page-transition-panel-bg: color-mix(in oklab, var(--nami-color-primary), var(--nami-surface-overlay) 90%);
        --page-transition-panel-fg: var(--nami-text);
        --page-transition-panel-border: color-mix(in oklab, var(--nami-color-primary), var(--nami-border) 72%);
      }

      .base {
        box-sizing: border-box;
        color: var(--page-transition-panel-fg);
        inset: 0;
        opacity: 0;
        pointer-events: none;
        position: fixed;
        transition:
          opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          visibility var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        visibility: hidden;
        z-index: 999;
      }

      :host([variant='inline']) .base {
        border-radius: var(--nami-card-radius, var(--nami-radius-surface));
        position: absolute;
      }

      :host([active]) .base {
        opacity: 1;
        visibility: visible;
      }

      :host([appearance='panel'][active]) .base,
      :host([appearance='veil'][active]) .base {
        pointer-events: auto;
      }

      :host([appearance='panel']) .base,
      :host([appearance='veil']) .base {
        align-items: center;
        background:
          var(--nami-style-background-pattern, none),
          var(--page-transition-backdrop);
        background-size: var(--nami-style-background-size, auto);
        display: flex;
        justify-content: center;
        padding: 24px;
      }

      :host([appearance='bar']) .base {
        display: block;
        padding: 0;
      }

      .track,
      .veil,
      .panel {
        display: none;
      }

      :host([appearance='bar']) .track {
        background: var(--page-transition-bar-bg);
        box-shadow: 0 1px 0 color-mix(in oklab, var(--nami-color-primary), transparent 82%);
        display: block;
        height: 3px;
        inset-block-start: 0;
        inset-inline: 0;
        overflow: hidden;
        position: fixed;
      }

      :host([variant='inline'][appearance='bar']) .track {
        border-radius: inherit;
        position: absolute;
      }

      .bar-indicator {
        animation: nami-page-bar 1180ms var(--nami-ease-standard, ease) infinite;
        background: var(--page-transition-bar-fg);
        border-radius: 999px;
        box-shadow: 0 0 18px color-mix(in oklab, var(--nami-color-primary), transparent 55%);
        display: block;
        height: 100%;
        transform: translateX(-48%) scaleX(0.42);
        transform-origin: left center;
        width: 58%;
      }

      :host([appearance='veil']) .veil {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 18px;
        inline-size: min(72vw, 260px);
      }

      .brand {
        align-items: center;
        color: var(--page-transition-brand-ink);
        display: inline-flex;
        filter: drop-shadow(0 12px 28px color-mix(in oklab, var(--nami-color-primary), transparent 78%));
        justify-content: center;
      }

      .brand svg {
        block-size: 86px;
        display: block;
        inline-size: 108px;
      }

      .brand-ink {
        fill: currentColor;
      }

      .brand-accent {
        fill: var(--nami-color-primary);
      }

      .veil-track {
        background: color-mix(in oklab, var(--nami-color-primary), transparent 88%);
        border-radius: 999px;
        display: block;
        height: 4px;
        inline-size: min(100%, 180px);
        overflow: hidden;
      }

      .veil-indicator {
        animation: nami-page-bar 1320ms var(--nami-ease-standard, ease) infinite;
        background: var(--page-transition-bar-fg);
        border-radius: inherit;
        display: block;
        height: 100%;
        transform: translateX(-52%) scaleX(0.44);
        transform-origin: left center;
        width: 64%;
      }

      :host([appearance='panel']) .panel {
        align-items: center;
        background: var(--page-transition-panel-bg);
        border: var(--nami-dialog-border-width, var(--nami-style-stroke-width, 1px)) solid var(--page-transition-panel-border);
        border-radius: var(--nami-dialog-radius, var(--nami-radius-surface));
        box-shadow: var(--page-transition-panel-shadow);
        display: inline-flex;
        gap: 12px;
        max-width: min(88vw, 360px);
        min-height: 56px;
        padding: 14px 18px;
        transform: translateY(8px) scale(0.98);
        transition: transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      :host([active][appearance='panel']) .panel {
        transform: translateY(0) scale(1);
      }

      .indicator {
        align-items: center;
        color: var(--nami-color-primary);
        display: inline-flex;
        flex: 0 0 auto;
      }

      .label {
        color: var(--page-transition-panel-fg);
        display: none;
        font-size: 0.9375rem;
        font-weight: 800;
        line-height: 1.2;
      }

      .label.has-content {
        display: inline;
      }

      @keyframes nami-page-bar {
        0% {
          transform: translateX(-56%) scaleX(0.36);
        }

        55% {
          transform: translateX(74%) scaleX(0.68);
        }

        100% {
          transform: translateX(158%) scaleX(0.32);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .base,
        .panel {
          transition-duration: 1ms;
        }

        .bar-indicator,
        .veil-indicator {
          animation-duration: 1ms;
          animation-iteration-count: 1;
        }

        .panel {
          transform: none;
        }
      }
    `
  ];

  declare active: boolean;
  declare label: string;
  declare variant: NamiPageTransitionVariant;
  declare tone: NamiPageTransitionTone;
  declare appearance: NamiPageTransitionAppearance;
  declare duration: number;
  protected declare visible: boolean;
  protected declare hasDefaultContent: boolean;

  private hideTimer = 0;
  private hideResolver?: () => void;
  private hideComplete?: Promise<void>;
  private shownAt = 0;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.active = false;
    this.label = '';
    this.variant = 'screen';
    this.tone = 'surface';
    this.appearance = 'bar';
    this.duration = 240;
    this.visible = false;
    this.hasDefaultContent = false;
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

  show(options: NamiPageTransitionOptions = {}) {
    this.applyOptions(options);
    this.active = true;
  }

  async hide(options: NamiPageTransitionOptions = {}) {
    this.applyOptions(options);
    this.active = false;
    await this.updateComplete;
    if (this.hideComplete) await this.hideComplete;
  }

  async waitFor<T>(task: PromiseLike<T> | (() => PromiseLike<T>), options: NamiPageTransitionOptions = {}) {
    const minDuration = options.minDuration ?? options.duration ?? this.duration;
    const startedAt = Date.now();
    this.show(options);
    try {
      return await (typeof task === 'function' ? task() : task);
    } finally {
      const remaining = Math.max(0, Number(minDuration) - (Date.now() - startedAt));
      if (remaining > 0) {
        await new Promise((resolve) => window.setTimeout(resolve, remaining));
      }
      await this.hide(options);
    }
  }

  private applyOptions(options: NamiPageTransitionOptions) {
    if (options.appearance) this.appearance = options.appearance;
    if (options.label !== undefined) this.label = options.label;
    if (options.tone) this.tone = options.tone;
    if (options.variant) this.variant = options.variant;
    if (options.duration !== undefined) this.duration = options.duration;
  }

  private handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.hasDefaultContent = slot.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.TEXT_NODE) return Boolean(node.textContent?.trim());
      return true;
    });
  }

  private get fallbackLabel() {
    return this.label || msg('Preparing interface', { id: 'nami.pageTransition.preparing' });
  }

  render() {
    if (!this.visible) return nothing;
    return html`
      <div class="base" part="base" role="status" aria-live="polite" aria-busy=${this.active ? 'true' : 'false'} aria-label=${this.fallbackLabel} aria-hidden=${this.active ? 'false' : 'true'}>
        <span class="track" part="track" aria-hidden="true">
          <span class="bar-indicator indicator" part="indicator"></span>
        </span>
        <div class="veil" aria-hidden="true">
          <span class="brand" part="brand">
            <svg viewBox="0 0 112 96" focusable="false" aria-hidden="true">
              <path class="brand-ink" d="M12 18h16v64H12zM27 18h16l42 56-3 18H66L35 50v32H27zM72 18h17L78 82H60z" />
              <path class="brand-accent" d="M72 4h12l-2 13H74zM91 4h12l-2 13H93z" />
            </svg>
          </span>
          <span class="veil-track" part="track"><span class="veil-indicator indicator" part="indicator"></span></span>
        </div>
        <div class="panel" part="panel">
          <span class="indicator" part="indicator">
            <slot name="icon"><nami-spinner size="md" label=${this.fallbackLabel}></nami-spinner></slot>
          </span>
          <span class=${this.hasDefaultContent ? 'label has-content' : 'label'} part="label"><slot @slotchange=${this.handleSlotChange}></slot></span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-page-transition': NamiPageTransition;
  }
}
