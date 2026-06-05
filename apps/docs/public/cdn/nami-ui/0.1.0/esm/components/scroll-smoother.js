import { i as _, a as B, A } from "../chunks/lit-element-GeMXvhiH.js";
import { s as P, b as Y } from "../chunks/selection-CrKkvo5N.js";
import { e as M } from "../chunks/events-DtyLzvDt.js";
var N = "1.3.23";
function x(t, e, i) {
  return Math.max(t, Math.min(e, i));
}
function D(t, e, i) {
  return (1 - i) * t + i * e;
}
function X(t, e, i, o) {
  return D(t, e, 1 - Math.exp(-i * o));
}
function F(t, e) {
  return (t % e + e) % e;
}
var q = class {
  isRunning = !1;
  value = 0;
  from = 0;
  to = 0;
  currentTime = 0;
  lerp;
  duration;
  easing;
  onUpdate;
  /**
  * Advance the animation by the given delta time
  *
  * @param deltaTime - The time in seconds to advance the animation
  */
  advance(t) {
    if (!this.isRunning) return;
    let e = !1;
    if (this.duration && this.easing) {
      this.currentTime += t;
      const i = x(0, this.currentTime / this.duration, 1);
      e = i >= 1;
      const o = e ? 1 : this.easing(i);
      this.value = this.from + (this.to - this.from) * o;
    } else this.lerp ? (this.value = X(this.value, this.to, this.lerp * 60, t), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, e = !0)) : (this.value = this.to, e = !0);
    e && this.stop(), this.onUpdate?.(this.value, e);
  }
  /** Stop the animation */
  stop() {
    this.isRunning = !1;
  }
  /**
  * Set up the animation from a starting value to an ending value
  * with optional parameters for lerping, duration, easing, and onUpdate callback
  *
  * @param from - The starting value
  * @param to - The ending value
  * @param options - Options for the animation
  */
  fromTo(t, e, { lerp: i, duration: o, easing: s, onStart: n, onUpdate: h }) {
    this.from = this.value = t, this.to = e, this.lerp = i, this.duration = o, this.easing = s, this.currentTime = 0, this.isRunning = !0, n?.(), this.onUpdate = h;
  }
};
function U(t, e) {
  let i;
  return function(...o) {
    clearTimeout(i), i = setTimeout(() => {
      i = void 0, t.apply(this, o);
    }, e);
  };
}
var Q = class {
  width = 0;
  height = 0;
  scrollHeight = 0;
  scrollWidth = 0;
  debouncedResize;
  wrapperResizeObserver;
  contentResizeObserver;
  constructor(t, e, { autoResize: i = !0, debounce: o = 250 } = {}) {
    this.wrapper = t, this.content = e, i && (this.debouncedResize = U(this.resize, o), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
  }
  destroy() {
    this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize);
  }
  resize = () => {
    this.onWrapperResize(), this.onContentResize();
  };
  onWrapperResize = () => {
    this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
  };
  onContentResize = () => {
    this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
  };
  get limit() {
    return {
      x: this.scrollWidth - this.width,
      y: this.scrollHeight - this.height
    };
  }
}, H = class {
  events = {};
  /**
  * Emit an event with the given data
  * @param event Event name
  * @param args Data to pass to the event handlers
  */
  emit(t, ...e) {
    const i = this.events[t] || [];
    for (let o = 0, s = i.length; o < s; o++) i[o]?.(...e);
  }
  /**
  * Add a callback to the event
  * @param event Event name
  * @param cb Callback function
  * @returns Unsubscribe function
  */
  on(t, e) {
    return this.events[t] ? this.events[t].push(e) : this.events[t] = [e], () => {
      this.events[t] = this.events[t]?.filter((i) => e !== i);
    };
  }
  /**
  * Remove a callback from the event
  * @param event Event name
  * @param callback Callback function
  */
  off(t, e) {
    this.events[t] = this.events[t]?.filter((i) => e !== i);
  }
  /**
  * Remove all event listeners and clean up
  */
  destroy() {
    this.events = {};
  }
};
const j = 100 / 6, b = { passive: !1 };
function R(t, e) {
  return t === 1 ? j : t === 2 ? e : 1;
}
var K = class {
  touchStart = {
    x: 0,
    y: 0
  };
  lastDelta = {
    x: 0,
    y: 0
  };
  window = {
    width: 0,
    height: 0
  };
  emitter = new H();
  constructor(t, e = {
    wheelMultiplier: 1,
    touchMultiplier: 1
  }) {
    this.element = t, this.options = e, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, b), this.element.addEventListener("touchstart", this.onTouchStart, b), this.element.addEventListener("touchmove", this.onTouchMove, b), this.element.addEventListener("touchend", this.onTouchEnd, b);
  }
  /**
  * Add an event listener for the given event and callback
  *
  * @param event Event name
  * @param callback Callback function
  */
  on(t, e) {
    return this.emitter.on(t, e);
  }
  /** Remove all event listeners and clean up */
  destroy() {
    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, b), this.element.removeEventListener("touchstart", this.onTouchStart, b), this.element.removeEventListener("touchmove", this.onTouchMove, b), this.element.removeEventListener("touchend", this.onTouchEnd, b);
  }
  /**
  * Event handler for 'touchstart' event
  *
  * @param event Touch event
  */
  onTouchStart = (t) => {
    const { clientX: e, clientY: i } = t.targetTouches ? t.targetTouches[0] : t;
    this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
      x: 0,
      y: 0
    }, this.emitter.emit("scroll", {
      deltaX: 0,
      deltaY: 0,
      event: t
    });
  };
  /** Event handler for 'touchmove' event */
  onTouchMove = (t) => {
    const { clientX: e, clientY: i } = t.targetTouches ? t.targetTouches[0] : t, o = -(e - this.touchStart.x) * this.options.touchMultiplier, s = -(i - this.touchStart.y) * this.options.touchMultiplier;
    this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
      x: o,
      y: s
    }, this.emitter.emit("scroll", {
      deltaX: o,
      deltaY: s,
      event: t
    });
  };
  onTouchEnd = (t) => {
    this.emitter.emit("scroll", {
      deltaX: this.lastDelta.x,
      deltaY: this.lastDelta.y,
      event: t
    });
  };
  /** Event handler for 'wheel' event */
  onWheel = (t) => {
    let { deltaX: e, deltaY: i, deltaMode: o } = t;
    const s = R(o, this.window.width), n = R(o, this.window.height);
    e *= s, i *= n, e *= this.options.wheelMultiplier, i *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
      deltaX: e,
      deltaY: i,
      event: t
    });
  };
  onWindowResize = () => {
    this.window = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };
};
const O = (t) => Math.min(1, 1.001 - 2 ** (-10 * t));
var G = class {
  _isScrolling = !1;
  _isStopped = !1;
  _isLocked = !1;
  _preventNextNativeScrollEvent = !1;
  _resetVelocityTimeout = null;
  _rafId = null;
  /**
  * Whether or not the user is touching the screen
  */
  isTouching;
  /**
  * The time in ms since the lenis instance was created
  */
  time = 0;
  /**
  * User data that will be forwarded through the scroll event
  *
  * @example
  * lenis.scrollTo(100, {
  *   userData: {
  *     foo: 'bar'
  *   }
  * })
  */
  userData = {};
  /**
  * The last velocity of the scroll
  */
  lastVelocity = 0;
  /**
  * The current velocity of the scroll
  */
  velocity = 0;
  /**
  * The direction of the scroll
  */
  direction = 0;
  /**
  * The options passed to the lenis instance
  */
  options;
  /**
  * The target scroll value
  */
  targetScroll;
  /**
  * The animated scroll value
  */
  animatedScroll;
  animate = new q();
  emitter = new H();
  dimensions;
  virtualScroll;
  constructor({ wrapper: t = window, content: e = document.documentElement, eventsTarget: i = t, smoothWheel: o = !0, syncTouch: s = !1, syncTouchLerp: n = 0.075, touchInertiaExponent: h = 1.7, duration: c, easing: a, lerp: d = 0.1, infinite: f = !1, orientation: u = "vertical", gestureOrientation: r = u === "horizontal" ? "both" : "vertical", touchMultiplier: p = 1, wheelMultiplier: l = 1, autoResize: m = !0, prevent: v, virtualScroll: g, overscroll: w = !0, autoRaf: y = !1, anchors: S = !1, autoToggle: z = !1, allowNestedScroll: E = !1, __experimental__naiveDimensions: V = !1, naiveDimensions: k = V, stopInertiaOnNavigate: I = !1 } = {}) {
    window.lenisVersion = N, window.lenis || (window.lenis = {}), window.lenis.version = N, u === "horizontal" && (window.lenis.horizontal = !0), s === !0 && (window.lenis.touch = !0), (!t || t === document.documentElement) && (t = window), typeof c == "number" && typeof a != "function" ? a = O : typeof a == "function" && typeof c != "number" && (c = 1), this.options = {
      wrapper: t,
      content: e,
      eventsTarget: i,
      smoothWheel: o,
      syncTouch: s,
      syncTouchLerp: n,
      touchInertiaExponent: h,
      duration: c,
      easing: a,
      lerp: d,
      infinite: f,
      gestureOrientation: r,
      orientation: u,
      touchMultiplier: p,
      wheelMultiplier: l,
      autoResize: m,
      prevent: v,
      virtualScroll: g,
      overscroll: w,
      autoRaf: y,
      anchors: S,
      autoToggle: z,
      allowNestedScroll: E,
      naiveDimensions: k,
      stopInertiaOnNavigate: I
    }, this.dimensions = new Q(t, e, { autoResize: m }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: !0 }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new K(i, {
      touchMultiplier: p,
      wheelMultiplier: l
    }), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && (this.checkOverflow(), this.rootElement.addEventListener("transitionend", this.onTransitionEnd)), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
  }
  /**
  * Destroy the lenis instance, remove all event listeners and clean up the class name
  */
  destroy() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, { capture: !0 }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.removeEventListener("click", this.onClick), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this._rafId && cancelAnimationFrame(this._rafId);
  }
  on(t, e) {
    return this.emitter.on(t, e);
  }
  off(t, e) {
    return this.emitter.off(t, e);
  }
  onScrollEnd = (t) => {
    t instanceof CustomEvent || (this.isScrolling === "smooth" || this.isScrolling === !1) && t.stopPropagation();
  };
  dispatchScrollendEvent = () => {
    this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
      bubbles: this.options.wrapper === window,
      detail: { lenisScrollEnd: !0 }
    }));
  };
  get overflow() {
    const t = this.isHorizontal ? "overflow-x" : "overflow-y";
    return getComputedStyle(this.rootElement)[t];
  }
  checkOverflow() {
    ["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart();
  }
  onTransitionEnd = (t) => {
    t.propertyName?.includes("overflow") && t.target === this.rootElement && this.checkOverflow();
  };
  setScroll(t) {
    this.isHorizontal ? this.options.wrapper.scrollTo({
      left: t,
      behavior: "instant"
    }) : this.options.wrapper.scrollTo({
      top: t,
      behavior: "instant"
    });
  }
  onClick = (t) => {
    const e = t.composedPath().filter((o) => o instanceof HTMLAnchorElement && o.href).map((o) => new URL(o.href)), i = new URL(window.location.href);
    if (this.options.anchors) {
      const o = e.find((s) => i.host === s.host && i.pathname === s.pathname && s.hash);
      if (o) {
        const s = typeof this.options.anchors == "object" && this.options.anchors ? this.options.anchors : void 0, n = `#${o.hash.split("#")[1]}`;
        this.scrollTo(n, s);
        return;
      }
    }
    if (this.options.stopInertiaOnNavigate && e.some((o) => i.host === o.host && i.pathname !== o.pathname)) {
      this.reset();
      return;
    }
  };
  onPointerDown = (t) => {
    t.button === 1 && this.reset();
  };
  onVirtualScroll = (t) => {
    if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(t) === !1) return;
    const { deltaX: e, deltaY: i, event: o } = t;
    if (this.emitter.emit("virtual-scroll", {
      deltaX: e,
      deltaY: i,
      event: o
    }), o.ctrlKey || o.lenisStopPropagation) return;
    const s = o.type.includes("touch"), n = o.type.includes("wheel");
    this.isTouching = o.type === "touchstart" || o.type === "touchmove";
    const h = e === 0 && i === 0;
    if (this.options.syncTouch && s && o.type === "touchstart" && h && !this.isStopped && !this.isLocked) {
      this.reset();
      return;
    }
    const c = this.options.gestureOrientation === "vertical" && i === 0 || this.options.gestureOrientation === "horizontal" && e === 0;
    if (h || c) return;
    let a = o.composedPath();
    a = a.slice(0, a.indexOf(this.rootElement));
    const d = this.options.prevent, f = Math.abs(e) >= Math.abs(i) ? "horizontal" : "vertical";
    if (a.find((l) => l instanceof HTMLElement && (typeof d == "function" && d?.(l) || l.hasAttribute?.("data-lenis-prevent") || f === "vertical" && l.hasAttribute?.("data-lenis-prevent-vertical") || f === "horizontal" && l.hasAttribute?.("data-lenis-prevent-horizontal") || s && l.hasAttribute?.("data-lenis-prevent-touch") || n && l.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(l, {
      deltaX: e,
      deltaY: i
    })))) return;
    if (this.isStopped || this.isLocked) {
      o.cancelable && o.preventDefault();
      return;
    }
    if (!(this.options.syncTouch && s || this.options.smoothWheel && n)) {
      this.isScrolling = "native", this.animate.stop(), o.lenisStopPropagation = !0;
      return;
    }
    let u = i;
    this.options.gestureOrientation === "both" ? u = Math.abs(i) > Math.abs(e) ? i : e : this.options.gestureOrientation === "horizontal" && (u = e), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && i > 0 || this.animatedScroll === this.limit && i < 0)) && (o.lenisStopPropagation = !0), o.cancelable && o.preventDefault();
    const r = s && this.options.syncTouch, p = s && o.type === "touchend";
    p && (u = Math.sign(u) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + u, {
      programmatic: !1,
      ...r ? { lerp: p ? this.options.syncTouchLerp : 1 } : {
        lerp: this.options.lerp,
        duration: this.options.duration,
        easing: this.options.easing
      }
    });
  };
  /**
  * Force lenis to recalculate the dimensions
  */
  resize() {
    this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  onNativeScroll = () => {
    if (this._resetVelocityTimeout !== null && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) {
      this._preventNextNativeScrollEvent = !1;
      return;
    }
    if (this.isScrolling === !1 || this.isScrolling === "native") {
      const t = this.animatedScroll;
      this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - t, this.direction = Math.sign(this.animatedScroll - t), this.isStopped || (this.isScrolling = "native"), this.emit(), this.velocity !== 0 && (this._resetVelocityTimeout = setTimeout(() => {
        this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit();
      }, 400));
    }
  };
  reset() {
    this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
  }
  /**
  * Start lenis scroll after it has been stopped
  */
  start() {
    if (this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.removeProperty("overflow");
        return;
      }
      this.internalStart();
    }
  }
  internalStart() {
    this.isStopped && (this.reset(), this.isStopped = !1, this.emit());
  }
  /**
  * Stop lenis scroll
  */
  stop() {
    if (!this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.setProperty("overflow", "clip");
        return;
      }
      this.internalStop();
    }
  }
  internalStop() {
    this.isStopped || (this.reset(), this.isStopped = !0, this.emit());
  }
  /**
  * RequestAnimationFrame for lenis
  *
  * @param time The time in ms from an external clock like `requestAnimationFrame` or Tempus
  */
  raf = (t) => {
    const e = t - (this.time || t);
    this.time = t, this.animate.advance(e * 1e-3), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
  };
  /**
  * Scroll to a target value
  *
  * @param target The target value to scroll to
  * @param options The options for the scroll
  *
  * @example
  * lenis.scrollTo(100, {
  *   offset: 100,
  *   duration: 1,
  *   easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
  *   lerp: 0.1,
  *   onStart: () => {
  *     console.log('onStart')
  *   },
  *   onComplete: () => {
  *     console.log('onComplete')
  *   },
  * })
  */
  scrollTo(t, { offset: e = 0, immediate: i = !1, lock: o = !1, programmatic: s = !0, lerp: n = s ? this.options.lerp : void 0, duration: h = s ? this.options.duration : void 0, easing: c = s ? this.options.easing : void 0, onStart: a, onComplete: d, force: f = !1, userData: u } = {}) {
    if ((this.isStopped || this.isLocked) && !f) return;
    let r = t, p = e;
    if (typeof r == "string" && [
      "top",
      "left",
      "start",
      "#"
    ].includes(r)) r = 0;
    else if (typeof r == "string" && [
      "bottom",
      "right",
      "end"
    ].includes(r)) r = this.limit;
    else {
      let l = null;
      if (typeof r == "string" ? (l = document.querySelector(r), l || (r === "#top" ? r = 0 : console.warn("Lenis: Target not found", r))) : r instanceof HTMLElement && r?.nodeType && (l = r), l) {
        if (this.options.wrapper !== window) {
          const S = this.rootElement.getBoundingClientRect();
          p -= this.isHorizontal ? S.left : S.top;
        }
        const m = l.getBoundingClientRect(), v = getComputedStyle(l), g = this.isHorizontal ? Number.parseFloat(v.scrollMarginLeft) : Number.parseFloat(v.scrollMarginTop), w = getComputedStyle(this.rootElement), y = this.isHorizontal ? Number.parseFloat(w.scrollPaddingLeft) : Number.parseFloat(w.scrollPaddingTop);
        r = (this.isHorizontal ? m.left : m.top) + this.animatedScroll - (Number.isNaN(g) ? 0 : g) - (Number.isNaN(y) ? 0 : y);
      }
    }
    if (typeof r == "number") {
      if (r += p, this.options.infinite) {
        if (s) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const l = r - this.animatedScroll;
          l > this.limit / 2 ? r -= this.limit : l < -this.limit / 2 && (r += this.limit);
        }
      } else r = x(0, r, this.limit);
      if (r === this.targetScroll) {
        a?.(this), d?.(this);
        return;
      }
      if (this.userData = u ?? {}, i) {
        this.animatedScroll = this.targetScroll = r, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), d?.(this), this.userData = {}, requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        });
        return;
      }
      s || (this.targetScroll = r), typeof h == "number" && typeof c != "function" ? c = O : typeof c == "function" && typeof h != "number" && (h = 1), this.animate.fromTo(this.animatedScroll, r, {
        duration: h,
        easing: c,
        lerp: n,
        onStart: () => {
          o && (this.isLocked = !0), this.isScrolling = "smooth", a?.(this);
        },
        onUpdate: (l, m) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = l - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = l, this.setScroll(this.scroll), s && (this.targetScroll = l), m || this.emit(), m && (this.reset(), this.emit(), d?.(this), this.userData = {}, requestAnimationFrame(() => {
            this.dispatchScrollendEvent();
          }), this.preventNextNativeScrollEvent());
        }
      });
    }
  }
  preventNextNativeScrollEvent() {
    this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
      this._preventNextNativeScrollEvent = !1;
    });
  }
  hasNestedScroll(t, { deltaX: e, deltaY: i }) {
    const o = Date.now();
    t._lenis || (t._lenis = {});
    const s = t._lenis;
    let n, h, c, a, d, f, u, r, p, l;
    if (o - (s.time ?? 0) > 2e3) {
      s.time = Date.now();
      const E = window.getComputedStyle(t);
      if (s.computedStyle = E, n = [
        "auto",
        "overlay",
        "scroll"
      ].includes(E.overflowX), h = [
        "auto",
        "overlay",
        "scroll"
      ].includes(E.overflowY), d = ["auto"].includes(E.overscrollBehaviorX), f = ["auto"].includes(E.overscrollBehaviorY), s.hasOverflowX = n, s.hasOverflowY = h, !(n || h)) return !1;
      u = t.scrollWidth, r = t.scrollHeight, p = t.clientWidth, l = t.clientHeight, c = u > p, a = r > l, s.isScrollableX = c, s.isScrollableY = a, s.scrollWidth = u, s.scrollHeight = r, s.clientWidth = p, s.clientHeight = l, s.hasOverscrollBehaviorX = d, s.hasOverscrollBehaviorY = f;
    } else
      c = s.isScrollableX, a = s.isScrollableY, n = s.hasOverflowX, h = s.hasOverflowY, u = s.scrollWidth, r = s.scrollHeight, p = s.clientWidth, l = s.clientHeight, d = s.hasOverscrollBehaviorX, f = s.hasOverscrollBehaviorY;
    if (!(n && c || h && a)) return !1;
    const m = Math.abs(e) >= Math.abs(i) ? "horizontal" : "vertical";
    let v, g, w, y, S, z;
    if (m === "horizontal")
      v = Math.round(t.scrollLeft), g = u - p, w = e, y = n, S = c, z = d;
    else if (m === "vertical")
      v = Math.round(t.scrollTop), g = r - l, w = i, y = h, S = a, z = f;
    else return !1;
    return !z && (v >= g || v <= 0) ? !0 : (w > 0 ? v < g : v > 0) && y && S;
  }
  /**
  * The root element on which lenis is instanced
  */
  get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }
  /**
  * The limit which is the maximum scroll value
  */
  get limit() {
    return this.options.naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  /**
  * Whether or not the scroll is horizontal
  */
  get isHorizontal() {
    return this.options.orientation === "horizontal";
  }
  /**
  * The actual scroll value
  */
  get actualScroll() {
    const t = this.options.wrapper;
    return this.isHorizontal ? t.scrollX ?? t.scrollLeft : t.scrollY ?? t.scrollTop;
  }
  /**
  * The current scroll value
  */
  get scroll() {
    return this.options.infinite ? F(this.animatedScroll, this.limit) : this.animatedScroll;
  }
  /**
  * The progress of the scroll relative to the limit
  */
  get progress() {
    return this.limit === 0 ? 1 : this.scroll / this.limit;
  }
  /**
  * Current scroll state
  */
  get isScrolling() {
    return this._isScrolling;
  }
  set isScrolling(t) {
    this._isScrolling !== t && (this._isScrolling = t, this.updateClassName());
  }
  /**
  * Check if lenis is stopped
  */
  get isStopped() {
    return this._isStopped;
  }
  set isStopped(t) {
    this._isStopped !== t && (this._isStopped = t, this.updateClassName());
  }
  /**
  * Check if lenis is locked
  */
  get isLocked() {
    return this._isLocked;
  }
  set isLocked(t) {
    this._isLocked !== t && (this._isLocked = t, this.updateClassName());
  }
  /**
  * Check if lenis is smooth scrolling
  */
  get isSmooth() {
    return this.isScrolling === "smooth";
  }
  /**
  * The class name applied to the wrapper element
  */
  get className() {
    let t = "lenis";
    return this.options.autoToggle && (t += " lenis-autoToggle"), this.isStopped && (t += " lenis-stopped"), this.isLocked && (t += " lenis-locked"), this.isScrolling && (t += " lenis-scrolling"), this.isScrolling === "smooth" && (t += " lenis-smooth"), t;
  }
  updateClassName() {
    this.cleanUpClassName(), this.className.split(" ").forEach((t) => {
      this.rootElement.classList.add(t);
    });
  }
  cleanUpClassName() {
    for (const t of Array.from(this.rootElement.classList)) (t === "lenis" || t.startsWith("lenis-")) && this.rootElement.classList.remove(t);
  }
};
const $ = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), C = "nami-scroll-smoother-global-style", L = {
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
};
function J() {
  if (typeof document > "u" || document.getElementById(C)) return;
  const t = document.createElement("style");
  t.id = C, t.textContent = `
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
`, document.head.append(t);
}
function Z() {
  return typeof window < "u" && typeof document < "u" && typeof window.requestAnimationFrame == "function" && typeof window.ResizeObserver == "function";
}
function tt(t) {
  if (typeof t == "number") return t;
  const e = typeof t == "string" ? document.querySelector(t) : t;
  if (e)
    return e.getBoundingClientRect().top + window.scrollY;
}
const T = class T extends _ {
  constructor() {
    super(), this.easing = $, this.pendingResize = 0, this.handleLoad = () => {
      this.resizeOnLoad && this.queueResize();
    }, this.handleNavigation = () => {
      this.lenis && (this.stopInertiaOnNavigate && this.lenis.stop(), this.queueResize(), window.requestAnimationFrame(() => this.lenis?.start()));
    }, this.handleMotionPreference = () => {
      this.configure();
    }, this.handleScroll = (e) => {
      M(this, "nami-scroll-smoother", {
        scroll: e.scroll,
        limit: e.limit,
        progress: e.progress,
        velocity: e.velocity,
        direction: e.direction,
        preset: this.preset,
        reducedMotion: this.reducedMotion
      });
    }, this.active = !1, this.allowNestedScroll = !1, this.anchors = !0, this.autoRaf = !0, this.autoResize = !0, this.config = null, this.disabled = !1, this.gestureOrientation = "vertical", this.infinite = !1, this.orientation = "vertical", this.overscroll = !0, this.preset = "balanced", this.duration = 1.2, this.reducedMotion = !1, this.resizeOnLoad = !0, this.smoothWheel = !0, this.stopInertiaOnNavigate = !0, this.syncTouch = !1, this.touchMultiplier = 2, this.wheelMultiplier = 1;
  }
  connectedCallback() {
    super.connectedCallback(), this.installMotionListener(), window.addEventListener("load", this.handleLoad), window.addEventListener("hashchange", this.handleNavigation), window.addEventListener("popstate", this.handleNavigation), document.addEventListener("astro:page-load", this.handleNavigation), this.configure();
  }
  disconnectedCallback() {
    window.removeEventListener("load", this.handleLoad), window.removeEventListener("hashchange", this.handleNavigation), window.removeEventListener("popstate", this.handleNavigation), document.removeEventListener("astro:page-load", this.handleNavigation), this.motionQuery?.removeEventListener("change", this.handleMotionPreference), this.motionQuery = void 0, this.destroyLenis(), super.disconnectedCallback();
  }
  updated(e) {
    if (this.syncState(), e.has("config") && this.config) {
      this.applyConfig(this.config, { persist: !1, respectAttributes: !0 });
      return;
    }
    if (e.has("preset")) {
      this.applyConfig(L[this.preset] ?? L.balanced, {
        persist: !1,
        respectAttributes: !0
      });
      return;
    }
    [
      "allowNestedScroll",
      "anchors",
      "autoRaf",
      "autoResize",
      "disabled",
      "duration",
      "gestureOrientation",
      "infinite",
      "lerp",
      "orientation",
      "overscroll",
      "resizeOnLoad",
      "smoothWheel",
      "stopInertiaOnNavigate",
      "syncTouch",
      "syncTouchLerp",
      "touchInertiaExponent",
      "touchMultiplier",
      "wheelMultiplier"
    ].some((o) => e.has(o)) && this.configure();
  }
  render() {
    return A;
  }
  start() {
    if (!this.lenis) {
      this.configure();
      return;
    }
    this.lenis.start(), this.active = !0, this.emitState();
  }
  stop() {
    this.lenis?.stop(), this.active = !1, this.emitState();
  }
  resize() {
    this.lenis?.resize();
  }
  sync() {
    this.resize();
  }
  applyConfig(e, i = {}) {
    const { persist: o = !0, respectAttributes: s = !1 } = i, n = e.preset ? { ...L[e.preset], ...e } : e;
    return o && (this.config = { ...this.config ?? {}, ...e }), this.assignConfigValue("preset", n.preset, "preset", s), this.assignConfigValue("duration", n.duration, "duration", s), this.assignConfigValue("lerp", n.lerp, "lerp", s), this.assignConfigValue("smoothWheel", n.smoothWheel, "smooth-wheel", s), this.assignConfigValue("syncTouch", n.syncTouch, "sync-touch", s), this.assignConfigValue("syncTouchLerp", n.syncTouchLerp, "sync-touch-lerp", s), this.assignConfigValue(
      "touchInertiaExponent",
      n.touchInertiaExponent,
      "touch-inertia-exponent",
      s
    ), this.assignConfigValue("touchMultiplier", n.touchMultiplier, "touch-multiplier", s), this.assignConfigValue("wheelMultiplier", n.wheelMultiplier, "wheel-multiplier", s), this.assignConfigValue("autoRaf", n.autoRaf, "auto-raf", s), this.assignConfigValue("autoResize", n.autoResize, "auto-resize", s), this.assignConfigValue("overscroll", n.overscroll, "overscroll", s), this.assignConfigValue("infinite", n.infinite, "infinite", s), this.assignConfigValue("allowNestedScroll", n.allowNestedScroll, "allow-nested-scroll", s), this.assignConfigValue("orientation", n.orientation, "orientation", s), this.assignConfigValue(
      "gestureOrientation",
      n.gestureOrientation,
      "gesture-orientation",
      s
    ), this.assignConfigValue(
      "stopInertiaOnNavigate",
      n.stopInertiaOnNavigate,
      "stop-inertia-on-navigate",
      s
    ), typeof n.anchors == "boolean" ? (this.assignConfigValue("anchors", n.anchors, "anchors", s), this.anchorOptions = void 0) : n.anchors && (!s || !this.hasAttribute("anchors")) && (this.anchors = !0, this.anchorOptions = n.anchors), n.easing && (this.easing = n.easing), n.prevent && (this.prevent = n.prevent), n.virtualScroll && (this.virtualScroll = n.virtualScroll), this.configure(), this;
  }
  scrollTo(e, i = {}) {
    if (typeof e > "u") {
      window.scrollTo();
      return;
    }
    if (typeof e == "object" && !(e instanceof HTMLElement)) {
      window.scrollTo(e);
      return;
    }
    if (typeof i == "number") {
      window.scrollTo(Number(e), i);
      return;
    }
    if (this.lenis && !this.reducedMotion && !this.disabled) {
      this.lenis.scrollTo(e, {
        duration: this.duration,
        easing: this.easing,
        ...i
      });
      return;
    }
    const o = tt(e);
    typeof o == "number" && window.scrollTo({ top: o, behavior: "auto" });
  }
  installMotionListener() {
    typeof window.matchMedia == "function" && (this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)"), this.motionQuery.addEventListener("change", this.handleMotionPreference));
  }
  configure() {
    if (!this.isConnected) return;
    const e = this.shouldReduceMotion();
    if (this.reducedMotion = e, this.destroyLenis(), this.disabled || e || !Z()) {
      this.active = !1, this.emitState();
      return;
    }
    J();
    const i = {
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
    typeof this.lerp == "number" && (i.lerp = this.lerp), typeof this.syncTouchLerp == "number" && (i.syncTouchLerp = this.syncTouchLerp), typeof this.touchInertiaExponent == "number" && (i.touchInertiaExponent = this.touchInertiaExponent), this.lenis = new G(i), this.unsubscribeScroll = this.lenis.on("scroll", this.handleScroll), this.active = !0, this.emitState(), this.queueResize(), this.queueFontResize();
  }
  destroyLenis() {
    this.pendingResize && (window.cancelAnimationFrame(this.pendingResize), this.pendingResize = 0), this.unsubscribeScroll?.(), this.unsubscribeScroll = void 0, this.lenis?.destroy(), this.lenis = void 0, this.active = !1;
  }
  assignConfigValue(e, i, o, s) {
    typeof i > "u" || s && this.hasAttribute(o) || (this[e] = i);
  }
  shouldReduceMotion() {
    if (this.motionQuery?.matches || this.closest("[data-nami-motion]")?.dataset.namiMotion === "reduced") return !0;
    const i = getComputedStyle(this).getPropertyValue("--nami-motion-normal").trim();
    return i === "0s" || i === "0ms" || i === "1ms";
  }
  queueResize() {
    !this.lenis || this.pendingResize || (this.pendingResize = window.requestAnimationFrame(() => {
      this.pendingResize = 0, this.resize();
    }));
  }
  queueFontResize() {
    document.fonts?.ready.then(() => {
      this.isConnected && this.resize();
    });
  }
  emitState() {
    this.syncState(), M(this, "nami-scroll-smoother-state", {
      scroll: this.lenis?.scroll ?? window.scrollY,
      limit: this.lenis?.limit ?? Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
      progress: this.lenis?.progress ?? 0,
      velocity: this.lenis?.velocity ?? 0,
      direction: this.lenis?.direction ?? 0,
      preset: this.preset,
      reducedMotion: this.reducedMotion
    });
  }
  syncState() {
    P(this, {
      state: this.reducedMotion ? "reduced-motion" : this.disabled ? "disabled" : Y(this.active),
      disabled: this.disabled
    });
  }
};
T.properties = {
  active: { type: Boolean, reflect: !0 },
  allowNestedScroll: { type: Boolean, attribute: "allow-nested-scroll" },
  anchors: { type: Boolean },
  autoRaf: { type: Boolean, attribute: "auto-raf" },
  autoResize: { type: Boolean, attribute: "auto-resize" },
  config: { attribute: !1 },
  disabled: { type: Boolean, reflect: !0 },
  duration: { type: Number },
  gestureOrientation: { attribute: "gesture-orientation" },
  infinite: { type: Boolean },
  lerp: { type: Number },
  orientation: {},
  overscroll: { type: Boolean },
  preset: { reflect: !0 },
  reducedMotion: { type: Boolean, attribute: "reduced-motion", reflect: !0 },
  resizeOnLoad: { type: Boolean, attribute: "resize-on-load" },
  smoothWheel: { type: Boolean, attribute: "smooth-wheel" },
  stopInertiaOnNavigate: { type: Boolean, attribute: "stop-inertia-on-navigate" },
  syncTouch: { type: Boolean, attribute: "sync-touch" },
  syncTouchLerp: { type: Number, attribute: "sync-touch-lerp" },
  touchInertiaExponent: { type: Number, attribute: "touch-inertia-exponent" },
  touchMultiplier: { type: Number, attribute: "touch-multiplier" },
  wheelMultiplier: { type: Number, attribute: "wheel-multiplier" }
}, T.styles = B`
    :host {
      display: none !important;
    }
  `;
let W = T;
export {
  W as NamiScrollSmoother
};
