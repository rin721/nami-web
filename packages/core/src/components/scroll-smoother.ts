import Lenis, { type ScrollToOptions as LenisScrollToOptions } from 'lenis';
import { LitElement, css, nothing } from 'lit';
import { emit } from '../internal/events';

export interface NamiScrollSmootherOptions {
  duration?: number;
  touchMultiplier?: number;
  wheelMultiplier?: number;
  smoothWheel?: boolean;
  syncTouch?: boolean;
  anchors?: boolean;
  autoRaf?: boolean;
  stopInertiaOnNavigate?: boolean;
}

export interface NamiScrollSmootherDetail {
  scroll: number;
  limit: number;
  progress: number;
  velocity: number;
  direction: 1 | -1 | 0;
  reducedMotion: boolean;
}

const expoEase = (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time));
const globalStyleId = 'nami-scroll-smoother-global-style';

function ensureLenisDocumentStyles() {
  if (typeof document === 'undefined' || document.getElementById(globalStyleId)) return;

  const style = document.createElement('style');
  style.id = globalStyleId;
  style.textContent = `
html.lenis,
html.lenis body {
  height: auto;
  scroll-behavior: auto !important;
}

.lenis:not(.lenis-autoToggle).lenis-stopped {
  overflow: clip;
}

.lenis [data-lenis-prevent],
.lenis [data-lenis-prevent-wheel],
.lenis [data-lenis-prevent-touch],
.lenis [data-lenis-prevent-vertical],
.lenis [data-lenis-prevent-horizontal] {
  overscroll-behavior: contain;
}

.lenis.lenis-smooth iframe {
  pointer-events: none;
}
`;
  document.head.append(style);
}

function supportsLenisRuntime() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof window.requestAnimationFrame === 'function' &&
    typeof window.ResizeObserver === 'function'
  );
}

function getScrollTopForTarget(target: number | string | HTMLElement) {
  if (typeof target === 'number') return target;
  const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!element) return undefined;
  return element.getBoundingClientRect().top + window.scrollY;
}

export class NamiScrollSmoother extends LitElement {
  static properties = {
    active: { type: Boolean, reflect: true },
    anchors: { type: Boolean },
    autoRaf: { type: Boolean, attribute: 'auto-raf' },
    disabled: { type: Boolean, reflect: true },
    duration: { type: Number },
    reducedMotion: { type: Boolean, attribute: 'reduced-motion', reflect: true },
    resizeOnLoad: { type: Boolean, attribute: 'resize-on-load' },
    smoothWheel: { type: Boolean, attribute: 'smooth-wheel' },
    stopInertiaOnNavigate: { type: Boolean, attribute: 'stop-inertia-on-navigate' },
    syncTouch: { type: Boolean, attribute: 'sync-touch' },
    touchMultiplier: { type: Number, attribute: 'touch-multiplier' },
    wheelMultiplier: { type: Number, attribute: 'wheel-multiplier' }
  };

  static styles = css`
    :host {
      display: none !important;
    }
  `;

  declare active: boolean;
  declare anchors: boolean;
  declare autoRaf: boolean;
  declare disabled: boolean;
  declare duration: number;
  declare reducedMotion: boolean;
  declare resizeOnLoad: boolean;
  declare smoothWheel: boolean;
  declare stopInertiaOnNavigate: boolean;
  declare syncTouch: boolean;
  declare touchMultiplier: number;
  declare wheelMultiplier: number;

  private lenis?: Lenis;
  private unsubscribeScroll?: () => void;
  private motionQuery?: MediaQueryList;
  private pendingResize = 0;

  constructor() {
    super();
    this.active = false;
    this.anchors = true;
    this.autoRaf = true;
    this.disabled = false;
    this.duration = 1.2;
    this.reducedMotion = false;
    this.resizeOnLoad = true;
    this.smoothWheel = true;
    this.stopInertiaOnNavigate = true;
    this.syncTouch = false;
    this.touchMultiplier = 2;
    this.wheelMultiplier = 1;
  }

  connectedCallback() {
    super.connectedCallback();
    this.installMotionListener();
    window.addEventListener('load', this.handleLoad);
    window.addEventListener('hashchange', this.handleNavigation);
    window.addEventListener('popstate', this.handleNavigation);
    document.addEventListener('astro:page-load', this.handleNavigation);
    this.configure();
  }

  disconnectedCallback() {
    window.removeEventListener('load', this.handleLoad);
    window.removeEventListener('hashchange', this.handleNavigation);
    window.removeEventListener('popstate', this.handleNavigation);
    document.removeEventListener('astro:page-load', this.handleNavigation);
    this.motionQuery?.removeEventListener('change', this.handleMotionPreference);
    this.motionQuery = undefined;
    this.destroyLenis();
    super.disconnectedCallback();
  }

  protected updated(changed: Map<string, unknown>) {
    const configKeys = [
      'anchors',
      'autoRaf',
      'disabled',
      'duration',
      'resizeOnLoad',
      'smoothWheel',
      'stopInertiaOnNavigate',
      'syncTouch',
      'touchMultiplier',
      'wheelMultiplier'
    ];

    if (configKeys.some((key) => changed.has(key))) {
      this.configure();
    }
  }

  render() {
    return nothing;
  }

  start() {
    if (!this.lenis) {
      this.configure();
      return;
    }
    this.lenis.start();
    this.active = true;
    this.emitState();
  }

  stop() {
    this.lenis?.stop();
    this.active = false;
    this.emitState();
  }

  resize() {
    this.lenis?.resize();
  }

  sync() {
    this.resize();
  }

  scrollTo(options?: globalThis.ScrollToOptions): void;
  scrollTo(x: number, y: number): void;
  scrollTo(target: number | string | HTMLElement, options?: LenisScrollToOptions): void;
  scrollTo(target?: number | string | HTMLElement | globalThis.ScrollToOptions, options: LenisScrollToOptions | number = {}) {
    if (typeof target === 'undefined') {
      window.scrollTo();
      return;
    }

    if (typeof target === 'object' && !(target instanceof HTMLElement)) {
      window.scrollTo(target);
      return;
    }

    if (typeof options === 'number') {
      window.scrollTo(Number(target), options);
      return;
    }

    if (this.lenis && !this.reducedMotion && !this.disabled) {
      this.lenis.scrollTo(target, {
        duration: this.duration,
        easing: expoEase,
        ...options
      });
      return;
    }

    const top = getScrollTopForTarget(target);
    if (typeof top === 'number') {
      window.scrollTo({ top, behavior: 'auto' });
    }
  }

  private installMotionListener() {
    if (typeof window.matchMedia !== 'function') return;
    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.motionQuery.addEventListener('change', this.handleMotionPreference);
  }

  private configure() {
    if (!this.isConnected) return;

    const reducedMotion = this.shouldReduceMotion();
    this.reducedMotion = reducedMotion;
    this.destroyLenis();

    if (this.disabled || reducedMotion || !supportsLenisRuntime()) {
      this.active = false;
      this.emitState();
      return;
    }

    ensureLenisDocumentStyles();
    this.lenis = new Lenis({
      anchors: this.anchors,
      autoRaf: this.autoRaf,
      duration: this.duration,
      easing: expoEase,
      smoothWheel: this.smoothWheel,
      stopInertiaOnNavigate: this.stopInertiaOnNavigate,
      syncTouch: this.syncTouch,
      touchMultiplier: this.touchMultiplier,
      wheelMultiplier: this.wheelMultiplier
    });
    this.unsubscribeScroll = this.lenis.on('scroll', this.handleScroll);
    this.active = true;
    this.emitState();
    this.queueResize();
    this.queueFontResize();
  }

  private destroyLenis() {
    if (this.pendingResize) {
      window.cancelAnimationFrame(this.pendingResize);
      this.pendingResize = 0;
    }
    this.unsubscribeScroll?.();
    this.unsubscribeScroll = undefined;
    this.lenis?.destroy();
    this.lenis = undefined;
    this.active = false;
  }

  private shouldReduceMotion() {
    if (this.motionQuery?.matches) return true;

    const scopedMotion = this.closest<HTMLElement>('[data-nami-motion]');
    if (scopedMotion?.dataset.namiMotion === 'reduced') return true;

    const duration = getComputedStyle(this).getPropertyValue('--nami-motion-normal').trim();
    return duration === '0s' || duration === '0ms' || duration === '1ms';
  }

  private queueResize() {
    if (!this.lenis || this.pendingResize) return;
    this.pendingResize = window.requestAnimationFrame(() => {
      this.pendingResize = 0;
      this.resize();
    });
  }

  private queueFontResize() {
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(() => {
      if (this.isConnected) this.resize();
    });
  }

  private readonly handleLoad = () => {
    if (this.resizeOnLoad) this.queueResize();
  };

  private readonly handleNavigation = () => {
    if (!this.lenis) return;
    if (this.stopInertiaOnNavigate) this.lenis.stop();
    this.queueResize();
    window.requestAnimationFrame(() => this.lenis?.start());
  };

  private readonly handleMotionPreference = () => {
    this.configure();
  };

  private readonly handleScroll = (lenis: Lenis) => {
    emit<NamiScrollSmootherDetail>(this, 'nami-scroll-smoother', {
      scroll: lenis.scroll,
      limit: lenis.limit,
      progress: lenis.progress,
      velocity: lenis.velocity,
      direction: lenis.direction,
      reducedMotion: this.reducedMotion
    });
  };

  private emitState() {
    emit<NamiScrollSmootherDetail>(this, 'nami-scroll-smoother-state', {
      scroll: this.lenis?.scroll ?? window.scrollY,
      limit: this.lenis?.limit ?? Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
      progress: this.lenis?.progress ?? 0,
      velocity: this.lenis?.velocity ?? 0,
      direction: this.lenis?.direction ?? 0,
      reducedMotion: this.reducedMotion
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-scroll-smoother': NamiScrollSmoother;
  }
}
