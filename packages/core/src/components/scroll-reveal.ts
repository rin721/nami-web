import { css, html, LitElement } from 'lit';
import { animate, inView } from 'motion';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export type NamiScrollRevealEffect = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in' | 'line-expand';

type MotionPlayback = {
  stop?: () => void;
  cancel?: () => void;
};

const effectFrames: Record<NamiScrollRevealEffect, { initial: Record<string, string | number>; visible: Record<string, string | number> }> = {
  'fade-up': {
    initial: { opacity: 0, transform: 'translateY(24px)' },
    visible: { opacity: 1, transform: 'translateY(0)' }
  },
  'fade-in': {
    initial: { opacity: 0 },
    visible: { opacity: 1 }
  },
  'slide-left': {
    initial: { opacity: 0, transform: 'translateX(32px)' },
    visible: { opacity: 1, transform: 'translateX(0)' }
  },
  'slide-right': {
    initial: { opacity: 0, transform: 'translateX(-32px)' },
    visible: { opacity: 1, transform: 'translateX(0)' }
  },
  'scale-in': {
    initial: { opacity: 0, transform: 'scale(0.96)' },
    visible: { opacity: 1, transform: 'scale(1)' }
  },
  'line-expand': {
    initial: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
  }
};

export class NamiScrollReveal extends LitElement {
  static properties = {
    effect: { reflect: true },
    once: { type: Boolean, reflect: true },
    amount: { reflect: true },
    margin: { reflect: true },
    delay: { type: Number, reflect: true },
    duration: { type: Number, reflect: true },
    inViewState: { attribute: 'in-view', type: Boolean, reflect: true },
    revealed: { type: Boolean, reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      .base {
        opacity: 0;
        transform: translateY(24px);
        transform-origin: center;
        will-change: opacity, transform, clip-path;
      }

      :host([effect='fade-in']) .base {
        transform: none;
      }

      :host([effect='slide-left']) .base {
        transform: translateX(32px);
      }

      :host([effect='slide-right']) .base {
        transform: translateX(-32px);
      }

      :host([effect='scale-in']) .base {
        transform: scale(0.96);
      }

      :host([effect='line-expand']) .base {
        clip-path: inset(0 100% 0 0);
        transform: none;
      }

      :host([revealed]) .base {
        clip-path: inset(0 0 0 0);
        opacity: 1;
        transform: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .base {
          clip-path: none;
          opacity: 1;
          transform: none;
        }
      }
    `
  ];

  declare effect: NamiScrollRevealEffect;
  declare once: boolean;
  declare amount: string;
  declare margin: string;
  declare delay: number;
  declare duration: number;
  declare inViewState: boolean;
  declare revealed: boolean;

  private stopInView?: () => void;
  private playback?: MotionPlayback;

  constructor() {
    super();
    this.effect = 'fade-up';
    this.once = true;
    this.amount = 'some';
    this.margin = '0px 0px -10% 0px';
    this.delay = 0;
    this.duration = 420;
    this.inViewState = false;
    this.revealed = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => this.setupObserver());
  }

  disconnectedCallback() {
    this.cleanup();
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>) {
    if ([...changed.keys()].some((key) => ['amount', 'margin', 'once'].includes(String(key))) && this.isConnected) {
      this.setupObserver();
    }
  }

  reveal() {
    this.inViewState = true;
    this.revealed = true;
    const base = this.shadowRoot?.querySelector<HTMLElement>('[part~="base"]');
    if (!base || this.shouldReduceMotion()) {
      base?.style.removeProperty('opacity');
      base?.style.removeProperty('transform');
      base?.style.removeProperty('clip-path');
      emit(this, 'nami-reveal', { effect: this.effect });
      return;
    }

    const frames = effectFrames[this.effect] ?? effectFrames['fade-up'];
    this.playback?.stop?.();
    try {
      this.playback = animate(base, frames.visible, {
        duration: Math.max(0, Number(this.duration)) / 1000,
        delay: Math.max(0, Number(this.delay)) / 1000,
        ease: [0.25, 0.46, 0.45, 0.94]
      }) as MotionPlayback;
    } catch {
      Object.assign(base.style, frames.visible);
    }
    emit(this, 'nami-reveal', { effect: this.effect });
  }

  hide() {
    if (this.once) return;
    this.inViewState = false;
    this.revealed = false;
    const base = this.shadowRoot?.querySelector<HTMLElement>('[part~="base"]');
    if (!base || this.shouldReduceMotion()) {
      emit(this, 'nami-hide', { effect: this.effect });
      return;
    }

    const frames = effectFrames[this.effect] ?? effectFrames['fade-up'];
    this.playback?.stop?.();
    try {
      this.playback = animate(base, frames.initial, {
        duration: Math.max(0, Number(this.duration)) / 1000,
        ease: [0.25, 0.46, 0.45, 0.94]
      }) as MotionPlayback;
    } catch {
      Object.assign(base.style, frames.initial);
    }
    emit(this, 'nami-hide', { effect: this.effect });
  }

  private setupObserver() {
    this.cleanup();
    if (!this.isConnected) return;
    if (!('IntersectionObserver' in window)) {
      this.reveal();
      return;
    }

    const amount = this.normalizedAmount;
    const options: Parameters<typeof inView>[2] = {
      amount,
      margin: (this.margin || '0px') as NonNullable<Parameters<typeof inView>[2]>['margin']
    };
    try {
      this.stopInView = inView(
        this,
        () => {
          this.reveal();
          return () => this.hide();
        },
        options
      );
    } catch {
      this.reveal();
    }
  }

  private cleanup() {
    this.stopInView?.();
    this.stopInView = undefined;
    this.playback?.stop?.();
    this.playback?.cancel?.();
    this.playback = undefined;
  }

  private get normalizedAmount() {
    if (this.amount === 'all' || this.amount === 'some') return this.amount;
    const value = Number(this.amount);
    return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 'some';
  }

  private shouldReduceMotion() {
    const duration = getComputedStyle(this).getPropertyValue('--nami-motion-normal').trim();
    return duration === '1ms' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }

  render() {
    return html`<div class="base" part="base"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-scroll-reveal': NamiScrollReveal;
  }
}
