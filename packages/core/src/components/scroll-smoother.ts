import Lenis, {
  type EasingFunction,
  type GestureOrientation,
  type LenisOptions,
  type Orientation,
  type ScrollToOptions as LenisScrollToOptions
} from 'lenis';
import { LitElement, css, nothing } from 'lit';
import { activeState, syncHostState } from '../foundation/selection';
import { emit } from '../internal/events';

export type NamiScrollSmootherPreset = 'gentle' | 'balanced' | 'strong';

export interface NamiScrollSmootherConfig {
  preset?: NamiScrollSmootherPreset;
  duration?: number;
  lerp?: number;
  touchMultiplier?: number;
  wheelMultiplier?: number;
  smoothWheel?: boolean;
  syncTouch?: boolean;
  syncTouchLerp?: number;
  touchInertiaExponent?: number;
  anchors?: boolean | LenisScrollToOptions;
  autoRaf?: boolean;
  autoResize?: boolean;
  overscroll?: boolean;
  infinite?: boolean;
  allowNestedScroll?: boolean;
  orientation?: Orientation;
  gestureOrientation?: GestureOrientation;
  stopInertiaOnNavigate?: boolean;
  easing?: EasingFunction;
  prevent?: LenisOptions['prevent'];
  virtualScroll?: LenisOptions['virtualScroll'];
}

export type NamiScrollSmootherOptions = NamiScrollSmootherConfig;

export interface NamiScrollSmootherDetail {
  scroll: number;
  limit: number;
  progress: number;
  velocity: number;
  direction: 1 | -1 | 0;
  preset: NamiScrollSmootherPreset;
  reducedMotion: boolean;
}

const expoEase = (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time));
const globalStyleId = 'nami-scroll-smoother-global-style';
const scrollSmootherPresets = {
  gentle: {
    duration: 0.8,
    touchMultiplier: 1.4,
    wheelMultiplier: 0.9
  },
  balanced: {
    duration: 1.2,
    touchMultiplier: 2,
    wheelMultiplier: 1
  },
  strong: {
    duration: 1.6,
    touchMultiplier: 2.4,
    wheelMultiplier: 0.85
  }
} satisfies Record<NamiScrollSmootherPreset, NamiScrollSmootherConfig>;

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
    allowNestedScroll: { type: Boolean, attribute: 'allow-nested-scroll' },
    anchors: { type: Boolean },
    autoRaf: { type: Boolean, attribute: 'auto-raf' },
    autoResize: { type: Boolean, attribute: 'auto-resize' },
    config: { attribute: false },
    disabled: { type: Boolean, reflect: true },
    duration: { type: Number },
    gestureOrientation: { attribute: 'gesture-orientation' },
    infinite: { type: Boolean },
    lerp: { type: Number },
    orientation: {},
    overscroll: { type: Boolean },
    preset: { reflect: true },
    reducedMotion: { type: Boolean, attribute: 'reduced-motion', reflect: true },
    resizeOnLoad: { type: Boolean, attribute: 'resize-on-load' },
    smoothWheel: { type: Boolean, attribute: 'smooth-wheel' },
    stopInertiaOnNavigate: { type: Boolean, attribute: 'stop-inertia-on-navigate' },
    syncTouch: { type: Boolean, attribute: 'sync-touch' },
    syncTouchLerp: { type: Number, attribute: 'sync-touch-lerp' },
    touchInertiaExponent: { type: Number, attribute: 'touch-inertia-exponent' },
    touchMultiplier: { type: Number, attribute: 'touch-multiplier' },
    wheelMultiplier: { type: Number, attribute: 'wheel-multiplier' }
  };

  static styles = css`
    :host {
      display: none !important;
    }
  `;

  declare active: boolean;
  declare allowNestedScroll: boolean;
  declare anchors: boolean;
  declare autoRaf: boolean;
  declare autoResize: boolean;
  declare config: NamiScrollSmootherConfig | null;
  declare disabled: boolean;
  declare duration: number;
  declare gestureOrientation: GestureOrientation;
  declare infinite: boolean;
  declare lerp?: number;
  declare orientation: Orientation;
  declare overscroll: boolean;
  declare preset: NamiScrollSmootherPreset;
  declare reducedMotion: boolean;
  declare resizeOnLoad: boolean;
  declare smoothWheel: boolean;
  declare stopInertiaOnNavigate: boolean;
  declare syncTouch: boolean;
  declare syncTouchLerp?: number;
  declare touchInertiaExponent?: number;
  declare touchMultiplier: number;
  declare wheelMultiplier: number;

  private anchorOptions?: LenisScrollToOptions;
  private easing: EasingFunction = expoEase;
  private lenis?: Lenis;
  private prevent?: LenisOptions['prevent'];
  private unsubscribeScroll?: () => void;
  private virtualScroll?: LenisOptions['virtualScroll'];
  private motionQuery?: MediaQueryList;
  private pendingResize = 0;

  constructor() {
    super();
    this.active = false;
    this.allowNestedScroll = false;
    this.anchors = true;
    this.autoRaf = true;
    this.autoResize = true;
    this.config = null;
    this.disabled = false;
    this.gestureOrientation = 'vertical';
    this.infinite = false;
    this.orientation = 'vertical';
    this.overscroll = true;
    this.preset = 'balanced';
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
    this.syncState();
    if (changed.has('config') && this.config) {
      this.applyConfig(this.config, { persist: false, respectAttributes: true });
      return;
    }

    if (changed.has('preset')) {
      this.applyConfig(scrollSmootherPresets[this.preset] ?? scrollSmootherPresets.balanced, {
        persist: false,
        respectAttributes: true
      });
      return;
    }

    const configKeys = [
      'allowNestedScroll',
      'anchors',
      'autoRaf',
      'autoResize',
      'disabled',
      'duration',
      'gestureOrientation',
      'infinite',
      'lerp',
      'orientation',
      'overscroll',
      'resizeOnLoad',
      'smoothWheel',
      'stopInertiaOnNavigate',
      'syncTouch',
      'syncTouchLerp',
      'touchInertiaExponent',
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

  applyConfig(config: NamiScrollSmootherConfig, options: { persist?: boolean; respectAttributes?: boolean } = {}) {
    const { persist = true, respectAttributes = false } = options;
    const nextConfig = config.preset ? { ...scrollSmootherPresets[config.preset], ...config } : config;

    if (persist) {
      this.config = { ...(this.config ?? {}), ...config };
    }

    this.assignConfigValue('preset', nextConfig.preset, 'preset', respectAttributes);
    this.assignConfigValue('duration', nextConfig.duration, 'duration', respectAttributes);
    this.assignConfigValue('lerp', nextConfig.lerp, 'lerp', respectAttributes);
    this.assignConfigValue('smoothWheel', nextConfig.smoothWheel, 'smooth-wheel', respectAttributes);
    this.assignConfigValue('syncTouch', nextConfig.syncTouch, 'sync-touch', respectAttributes);
    this.assignConfigValue('syncTouchLerp', nextConfig.syncTouchLerp, 'sync-touch-lerp', respectAttributes);
    this.assignConfigValue(
      'touchInertiaExponent',
      nextConfig.touchInertiaExponent,
      'touch-inertia-exponent',
      respectAttributes
    );
    this.assignConfigValue('touchMultiplier', nextConfig.touchMultiplier, 'touch-multiplier', respectAttributes);
    this.assignConfigValue('wheelMultiplier', nextConfig.wheelMultiplier, 'wheel-multiplier', respectAttributes);
    this.assignConfigValue('autoRaf', nextConfig.autoRaf, 'auto-raf', respectAttributes);
    this.assignConfigValue('autoResize', nextConfig.autoResize, 'auto-resize', respectAttributes);
    this.assignConfigValue('overscroll', nextConfig.overscroll, 'overscroll', respectAttributes);
    this.assignConfigValue('infinite', nextConfig.infinite, 'infinite', respectAttributes);
    this.assignConfigValue('allowNestedScroll', nextConfig.allowNestedScroll, 'allow-nested-scroll', respectAttributes);
    this.assignConfigValue('orientation', nextConfig.orientation, 'orientation', respectAttributes);
    this.assignConfigValue(
      'gestureOrientation',
      nextConfig.gestureOrientation,
      'gesture-orientation',
      respectAttributes
    );
    this.assignConfigValue(
      'stopInertiaOnNavigate',
      nextConfig.stopInertiaOnNavigate,
      'stop-inertia-on-navigate',
      respectAttributes
    );

    if (typeof nextConfig.anchors === 'boolean') {
      this.assignConfigValue('anchors', nextConfig.anchors, 'anchors', respectAttributes);
      this.anchorOptions = undefined;
    } else if (nextConfig.anchors) {
      if (!respectAttributes || !this.hasAttribute('anchors')) {
        this.anchors = true;
        this.anchorOptions = nextConfig.anchors;
      }
    }

    if (nextConfig.easing) this.easing = nextConfig.easing;
    if (nextConfig.prevent) this.prevent = nextConfig.prevent;
    if (nextConfig.virtualScroll) this.virtualScroll = nextConfig.virtualScroll;

    this.configure();
    return this;
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
        easing: this.easing,
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
    const lenisOptions: LenisOptions = {
      allowNestedScroll: this.allowNestedScroll,
      anchors: this.anchorOptions ?? this.anchors,
      autoRaf: this.autoRaf,
      autoResize: this.autoResize,
      duration: this.duration,
      easing: this.easing,
      gestureOrientation: this.gestureOrientation,
      infinite: this.infinite,
      orientation: this.orientation,
      overscroll: this.overscroll,
      prevent: this.prevent,
      smoothWheel: this.smoothWheel,
      stopInertiaOnNavigate: this.stopInertiaOnNavigate,
      syncTouch: this.syncTouch,
      touchMultiplier: this.touchMultiplier,
      virtualScroll: this.virtualScroll,
      wheelMultiplier: this.wheelMultiplier
    };
    if (typeof this.lerp === 'number') lenisOptions.lerp = this.lerp;
    if (typeof this.syncTouchLerp === 'number') lenisOptions.syncTouchLerp = this.syncTouchLerp;
    if (typeof this.touchInertiaExponent === 'number') lenisOptions.touchInertiaExponent = this.touchInertiaExponent;

    this.lenis = new Lenis(lenisOptions);
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

  private assignConfigValue<K extends keyof this>(
    key: K,
    value: this[K] | undefined,
    attribute: string,
    respectAttributes: boolean
  ) {
    if (typeof value === 'undefined') return;
    if (respectAttributes && this.hasAttribute(attribute)) return;
    this[key] = value;
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
      preset: this.preset,
      reducedMotion: this.reducedMotion
    });
  };

  private emitState() {
    this.syncState();
    emit<NamiScrollSmootherDetail>(this, 'nami-scroll-smoother-state', {
      scroll: this.lenis?.scroll ?? window.scrollY,
      limit: this.lenis?.limit ?? Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
      progress: this.lenis?.progress ?? 0,
      velocity: this.lenis?.velocity ?? 0,
      direction: this.lenis?.direction ?? 0,
      preset: this.preset,
      reducedMotion: this.reducedMotion
    });
  }

  private syncState() {
    syncHostState(this, {
      state: this.reducedMotion ? 'reduced-motion' : this.disabled ? 'disabled' : activeState(this.active),
      disabled: this.disabled
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-scroll-smoother': NamiScrollSmoother;
  }
}
