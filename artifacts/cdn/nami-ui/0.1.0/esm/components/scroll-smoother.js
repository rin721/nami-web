import { i as P, a as Y, A as D } from "../chunks/lit-element-GeMXvhiH.js";
import { e as T } from "../chunks/events-DtyLzvDt.js";
var M = "1.3.23";
function k(t, e, i) {
  return Math.max(t, Math.min(e, i));
}
function I(t, e, i) {
  return (1 - i) * t + i * e;
}
function A(t, e, i, s) {
  return I(t, e, 1 - Math.exp(-i * s));
}
function X(t, e) {
  return (t % e + e) % e;
}
var F = class {
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
      const i = k(0, this.currentTime / this.duration, 1);
      e = i >= 1;
      const s = e ? 1 : this.easing(i);
      this.value = this.from + (this.to - this.from) * s;
    } else this.lerp ? (this.value = A(this.value, this.to, this.lerp * 60, t), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, e = !0)) : (this.value = this.to, e = !0);
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
  fromTo(t, e, { lerp: i, duration: s, easing: o, onStart: l, onUpdate: h }) {
    this.from = this.value = t, this.to = e, this.lerp = i, this.duration = s, this.easing = o, this.currentTime = 0, this.isRunning = !0, l?.(), this.onUpdate = h;
  }
};
function q(t, e) {
  let i;
  return function(...s) {
    clearTimeout(i), i = setTimeout(() => {
      i = void 0, t.apply(this, s);
    }, e);
  };
}
var V = class {
  width = 0;
  height = 0;
  scrollHeight = 0;
  scrollWidth = 0;
  debouncedResize;
  wrapperResizeObserver;
  contentResizeObserver;
  constructor(t, e, { autoResize: i = !0, debounce: s = 250 } = {}) {
    this.wrapper = t, this.content = e, i && (this.debouncedResize = q(this.resize, s), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
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
}, x = class {
  events = {};
  /**
  * Emit an event with the given data
  * @param event Event name
  * @param args Data to pass to the event handlers
  */
  emit(t, ...e) {
    const i = this.events[t] || [];
    for (let s = 0, o = i.length; s < o; s++) i[s]?.(...e);
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
const U = 100 / 6, b = { passive: !1 };
function N(t, e) {
  return t === 1 ? U : t === 2 ? e : 1;
}
var Q = class {
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
  emitter = new x();
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
    const { clientX: e, clientY: i } = t.targetTouches ? t.targetTouches[0] : t, s = -(e - this.touchStart.x) * this.options.touchMultiplier, o = -(i - this.touchStart.y) * this.options.touchMultiplier;
    this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
      x: s,
      y: o
    }, this.emitter.emit("scroll", {
      deltaX: s,
      deltaY: o,
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
    let { deltaX: e, deltaY: i, deltaMode: s } = t;
    const o = N(s, this.window.width), l = N(s, this.window.height);
    e *= o, i *= l, e *= this.options.wheelMultiplier, i *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
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
const R = (t) => Math.min(1, 1.001 - 2 ** (-10 * t));
var j = class {
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
  animate = new F();
  emitter = new x();
  dimensions;
  virtualScroll;
  constructor({ wrapper: t = window, content: e = document.documentElement, eventsTarget: i = t, smoothWheel: s = !0, syncTouch: o = !1, syncTouchLerp: l = 0.075, touchInertiaExponent: h = 1.7, duration: c, easing: a, lerp: p = 0.1, infinite: f = !1, orientation: u = "vertical", gestureOrientation: n = u === "horizontal" ? "both" : "vertical", touchMultiplier: d = 1, wheelMultiplier: r = 1, autoResize: m = !0, prevent: v, virtualScroll: w, overscroll: g = !0, autoRaf: S = !1, anchors: y = !1, autoToggle: z = !1, allowNestedScroll: E = !1, __experimental__naiveDimensions: C = !1, naiveDimensions: _ = C, stopInertiaOnNavigate: B = !1 } = {}) {
    window.lenisVersion = M, window.lenis || (window.lenis = {}), window.lenis.version = M, u === "horizontal" && (window.lenis.horizontal = !0), o === !0 && (window.lenis.touch = !0), (!t || t === document.documentElement) && (t = window), typeof c == "number" && typeof a != "function" ? a = R : typeof a == "function" && typeof c != "number" && (c = 1), this.options = {
      wrapper: t,
      content: e,
      eventsTarget: i,
      smoothWheel: s,
      syncTouch: o,
      syncTouchLerp: l,
      touchInertiaExponent: h,
      duration: c,
      easing: a,
      lerp: p,
      infinite: f,
      gestureOrientation: n,
      orientation: u,
      touchMultiplier: d,
      wheelMultiplier: r,
      autoResize: m,
      prevent: v,
      virtualScroll: w,
      overscroll: g,
      autoRaf: S,
      anchors: y,
      autoToggle: z,
      allowNestedScroll: E,
      naiveDimensions: _,
      stopInertiaOnNavigate: B
    }, this.dimensions = new V(t, e, { autoResize: m }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: !0 }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new Q(i, {
      touchMultiplier: d,
      wheelMultiplier: r
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
    const e = t.composedPath().filter((s) => s instanceof HTMLAnchorElement && s.href).map((s) => new URL(s.href)), i = new URL(window.location.href);
    if (this.options.anchors) {
      const s = e.find((o) => i.host === o.host && i.pathname === o.pathname && o.hash);
      if (s) {
        const o = typeof this.options.anchors == "object" && this.options.anchors ? this.options.anchors : void 0, l = `#${s.hash.split("#")[1]}`;
        this.scrollTo(l, o);
        return;
      }
    }
    if (this.options.stopInertiaOnNavigate && e.some((s) => i.host === s.host && i.pathname !== s.pathname)) {
      this.reset();
      return;
    }
  };
  onPointerDown = (t) => {
    t.button === 1 && this.reset();
  };
  onVirtualScroll = (t) => {
    if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(t) === !1) return;
    const { deltaX: e, deltaY: i, event: s } = t;
    if (this.emitter.emit("virtual-scroll", {
      deltaX: e,
      deltaY: i,
      event: s
    }), s.ctrlKey || s.lenisStopPropagation) return;
    const o = s.type.includes("touch"), l = s.type.includes("wheel");
    this.isTouching = s.type === "touchstart" || s.type === "touchmove";
    const h = e === 0 && i === 0;
    if (this.options.syncTouch && o && s.type === "touchstart" && h && !this.isStopped && !this.isLocked) {
      this.reset();
      return;
    }
    const c = this.options.gestureOrientation === "vertical" && i === 0 || this.options.gestureOrientation === "horizontal" && e === 0;
    if (h || c) return;
    let a = s.composedPath();
    a = a.slice(0, a.indexOf(this.rootElement));
    const p = this.options.prevent, f = Math.abs(e) >= Math.abs(i) ? "horizontal" : "vertical";
    if (a.find((r) => r instanceof HTMLElement && (typeof p == "function" && p?.(r) || r.hasAttribute?.("data-lenis-prevent") || f === "vertical" && r.hasAttribute?.("data-lenis-prevent-vertical") || f === "horizontal" && r.hasAttribute?.("data-lenis-prevent-horizontal") || o && r.hasAttribute?.("data-lenis-prevent-touch") || l && r.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(r, {
      deltaX: e,
      deltaY: i
    })))) return;
    if (this.isStopped || this.isLocked) {
      s.cancelable && s.preventDefault();
      return;
    }
    if (!(this.options.syncTouch && o || this.options.smoothWheel && l)) {
      this.isScrolling = "native", this.animate.stop(), s.lenisStopPropagation = !0;
      return;
    }
    let u = i;
    this.options.gestureOrientation === "both" ? u = Math.abs(i) > Math.abs(e) ? i : e : this.options.gestureOrientation === "horizontal" && (u = e), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && i > 0 || this.animatedScroll === this.limit && i < 0)) && (s.lenisStopPropagation = !0), s.cancelable && s.preventDefault();
    const n = o && this.options.syncTouch, d = o && s.type === "touchend";
    d && (u = Math.sign(u) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + u, {
      programmatic: !1,
      ...n ? { lerp: d ? this.options.syncTouchLerp : 1 } : {
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
  scrollTo(t, { offset: e = 0, immediate: i = !1, lock: s = !1, programmatic: o = !0, lerp: l = o ? this.options.lerp : void 0, duration: h = o ? this.options.duration : void 0, easing: c = o ? this.options.easing : void 0, onStart: a, onComplete: p, force: f = !1, userData: u } = {}) {
    if ((this.isStopped || this.isLocked) && !f) return;
    let n = t, d = e;
    if (typeof n == "string" && [
      "top",
      "left",
      "start",
      "#"
    ].includes(n)) n = 0;
    else if (typeof n == "string" && [
      "bottom",
      "right",
      "end"
    ].includes(n)) n = this.limit;
    else {
      let r = null;
      if (typeof n == "string" ? (r = document.querySelector(n), r || (n === "#top" ? n = 0 : console.warn("Lenis: Target not found", n))) : n instanceof HTMLElement && n?.nodeType && (r = n), r) {
        if (this.options.wrapper !== window) {
          const y = this.rootElement.getBoundingClientRect();
          d -= this.isHorizontal ? y.left : y.top;
        }
        const m = r.getBoundingClientRect(), v = getComputedStyle(r), w = this.isHorizontal ? Number.parseFloat(v.scrollMarginLeft) : Number.parseFloat(v.scrollMarginTop), g = getComputedStyle(this.rootElement), S = this.isHorizontal ? Number.parseFloat(g.scrollPaddingLeft) : Number.parseFloat(g.scrollPaddingTop);
        n = (this.isHorizontal ? m.left : m.top) + this.animatedScroll - (Number.isNaN(w) ? 0 : w) - (Number.isNaN(S) ? 0 : S);
      }
    }
    if (typeof n == "number") {
      if (n += d, this.options.infinite) {
        if (o) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const r = n - this.animatedScroll;
          r > this.limit / 2 ? n -= this.limit : r < -this.limit / 2 && (n += this.limit);
        }
      } else n = k(0, n, this.limit);
      if (n === this.targetScroll) {
        a?.(this), p?.(this);
        return;
      }
      if (this.userData = u ?? {}, i) {
        this.animatedScroll = this.targetScroll = n, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), p?.(this), this.userData = {}, requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        });
        return;
      }
      o || (this.targetScroll = n), typeof h == "number" && typeof c != "function" ? c = R : typeof c == "function" && typeof h != "number" && (h = 1), this.animate.fromTo(this.animatedScroll, n, {
        duration: h,
        easing: c,
        lerp: l,
        onStart: () => {
          s && (this.isLocked = !0), this.isScrolling = "smooth", a?.(this);
        },
        onUpdate: (r, m) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = r - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = r, this.setScroll(this.scroll), o && (this.targetScroll = r), m || this.emit(), m && (this.reset(), this.emit(), p?.(this), this.userData = {}, requestAnimationFrame(() => {
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
    const s = Date.now();
    t._lenis || (t._lenis = {});
    const o = t._lenis;
    let l, h, c, a, p, f, u, n, d, r;
    if (s - (o.time ?? 0) > 2e3) {
      o.time = Date.now();
      const E = window.getComputedStyle(t);
      if (o.computedStyle = E, l = [
        "auto",
        "overlay",
        "scroll"
      ].includes(E.overflowX), h = [
        "auto",
        "overlay",
        "scroll"
      ].includes(E.overflowY), p = ["auto"].includes(E.overscrollBehaviorX), f = ["auto"].includes(E.overscrollBehaviorY), o.hasOverflowX = l, o.hasOverflowY = h, !(l || h)) return !1;
      u = t.scrollWidth, n = t.scrollHeight, d = t.clientWidth, r = t.clientHeight, c = u > d, a = n > r, o.isScrollableX = c, o.isScrollableY = a, o.scrollWidth = u, o.scrollHeight = n, o.clientWidth = d, o.clientHeight = r, o.hasOverscrollBehaviorX = p, o.hasOverscrollBehaviorY = f;
    } else
      c = o.isScrollableX, a = o.isScrollableY, l = o.hasOverflowX, h = o.hasOverflowY, u = o.scrollWidth, n = o.scrollHeight, d = o.clientWidth, r = o.clientHeight, p = o.hasOverscrollBehaviorX, f = o.hasOverscrollBehaviorY;
    if (!(l && c || h && a)) return !1;
    const m = Math.abs(e) >= Math.abs(i) ? "horizontal" : "vertical";
    let v, w, g, S, y, z;
    if (m === "horizontal")
      v = Math.round(t.scrollLeft), w = u - d, g = e, S = l, y = c, z = p;
    else if (m === "vertical")
      v = Math.round(t.scrollTop), w = n - r, g = i, S = h, y = a, z = f;
    else return !1;
    return !z && (v >= w || v <= 0) ? !0 : (g > 0 ? v < w : v > 0) && S && y;
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
    return this.options.infinite ? X(this.animatedScroll, this.limit) : this.animatedScroll;
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
const O = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), W = "nami-scroll-smoother-global-style";
function K() {
  if (typeof document > "u" || document.getElementById(W)) return;
  const t = document.createElement("style");
  t.id = W, t.textContent = `
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
function G() {
  return typeof window < "u" && typeof document < "u" && typeof window.requestAnimationFrame == "function" && typeof window.ResizeObserver == "function";
}
function $(t) {
  if (typeof t == "number") return t;
  const e = typeof t == "string" ? document.querySelector(t) : t;
  if (e)
    return e.getBoundingClientRect().top + window.scrollY;
}
const L = class L extends P {
  constructor() {
    super(), this.pendingResize = 0, this.handleLoad = () => {
      this.resizeOnLoad && this.queueResize();
    }, this.handleNavigation = () => {
      this.lenis && (this.stopInertiaOnNavigate && this.lenis.stop(), this.queueResize(), window.requestAnimationFrame(() => this.lenis?.start()));
    }, this.handleMotionPreference = () => {
      this.configure();
    }, this.handleScroll = (e) => {
      T(this, "nami-scroll-smoother", {
        scroll: e.scroll,
        limit: e.limit,
        progress: e.progress,
        velocity: e.velocity,
        direction: e.direction,
        reducedMotion: this.reducedMotion
      });
    }, this.active = !1, this.anchors = !0, this.autoRaf = !0, this.disabled = !1, this.duration = 1.2, this.reducedMotion = !1, this.resizeOnLoad = !0, this.smoothWheel = !0, this.stopInertiaOnNavigate = !0, this.syncTouch = !1, this.touchMultiplier = 2, this.wheelMultiplier = 1;
  }
  connectedCallback() {
    super.connectedCallback(), this.installMotionListener(), window.addEventListener("load", this.handleLoad), window.addEventListener("hashchange", this.handleNavigation), window.addEventListener("popstate", this.handleNavigation), document.addEventListener("astro:page-load", this.handleNavigation), this.configure();
  }
  disconnectedCallback() {
    window.removeEventListener("load", this.handleLoad), window.removeEventListener("hashchange", this.handleNavigation), window.removeEventListener("popstate", this.handleNavigation), document.removeEventListener("astro:page-load", this.handleNavigation), this.motionQuery?.removeEventListener("change", this.handleMotionPreference), this.motionQuery = void 0, this.destroyLenis(), super.disconnectedCallback();
  }
  updated(e) {
    [
      "anchors",
      "autoRaf",
      "disabled",
      "duration",
      "resizeOnLoad",
      "smoothWheel",
      "stopInertiaOnNavigate",
      "syncTouch",
      "touchMultiplier",
      "wheelMultiplier"
    ].some((s) => e.has(s)) && this.configure();
  }
  render() {
    return D;
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
        easing: O,
        ...i
      });
      return;
    }
    const s = $(e);
    typeof s == "number" && window.scrollTo({ top: s, behavior: "auto" });
  }
  installMotionListener() {
    typeof window.matchMedia == "function" && (this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)"), this.motionQuery.addEventListener("change", this.handleMotionPreference));
  }
  configure() {
    if (!this.isConnected) return;
    const e = this.shouldReduceMotion();
    if (this.reducedMotion = e, this.destroyLenis(), this.disabled || e || !G()) {
      this.active = !1, this.emitState();
      return;
    }
    K(), this.lenis = new j({
      anchors: this.anchors,
      autoRaf: this.autoRaf,
      duration: this.duration,
      easing: O,
      smoothWheel: this.smoothWheel,
      stopInertiaOnNavigate: this.stopInertiaOnNavigate,
      syncTouch: this.syncTouch,
      touchMultiplier: this.touchMultiplier,
      wheelMultiplier: this.wheelMultiplier
    }), this.unsubscribeScroll = this.lenis.on("scroll", this.handleScroll), this.active = !0, this.emitState(), this.queueResize(), this.queueFontResize();
  }
  destroyLenis() {
    this.pendingResize && (window.cancelAnimationFrame(this.pendingResize), this.pendingResize = 0), this.unsubscribeScroll?.(), this.unsubscribeScroll = void 0, this.lenis?.destroy(), this.lenis = void 0, this.active = !1;
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
    T(this, "nami-scroll-smoother-state", {
      scroll: this.lenis?.scroll ?? window.scrollY,
      limit: this.lenis?.limit ?? Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
      progress: this.lenis?.progress ?? 0,
      velocity: this.lenis?.velocity ?? 0,
      direction: this.lenis?.direction ?? 0,
      reducedMotion: this.reducedMotion
    });
  }
};
L.properties = {
  active: { type: Boolean, reflect: !0 },
  anchors: { type: Boolean },
  autoRaf: { type: Boolean, attribute: "auto-raf" },
  disabled: { type: Boolean, reflect: !0 },
  duration: { type: Number },
  reducedMotion: { type: Boolean, attribute: "reduced-motion", reflect: !0 },
  resizeOnLoad: { type: Boolean, attribute: "resize-on-load" },
  smoothWheel: { type: Boolean, attribute: "smooth-wheel" },
  stopInertiaOnNavigate: { type: Boolean, attribute: "stop-inertia-on-navigate" },
  syncTouch: { type: Boolean, attribute: "sync-touch" },
  touchMultiplier: { type: Number, attribute: "touch-multiplier" },
  wheelMultiplier: { type: Number, attribute: "wheel-multiplier" }
}, L.styles = Y`
    :host {
      display: none !important;
    }
  `;
let H = L;
export {
  H as NamiScrollSmoother
};
