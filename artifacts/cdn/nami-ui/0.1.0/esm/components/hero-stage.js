import { i as o, c as r, a as s, b as l } from "../chunks/styles-DgWJnXXm.js";
import { a as c } from "../chunks/index-BWFPQd53.js";
const n = c, t = class t extends o {
  constructor() {
    super(), this.beamAnimations = [], this.variant = "beam", this.height = "screen", this.intensity = "normal", this.animated = !0;
  }
  connectedCallback() {
    super.connectedCallback(), this.updateComplete.then(() => this.startBeamAnimations());
  }
  disconnectedCallback() {
    this.stopBeamAnimations(), super.disconnectedCallback();
  }
  updated(a) {
    (a.has("animated") || a.has("variant")) && this.startBeamAnimations();
  }
  startBeamAnimations() {
    if (this.stopBeamAnimations(), !this.animated || this.variant !== "beam" || this.shouldReduceMotion()) return;
    const a = this.shadowRoot?.querySelector(".beam-a"), e = this.shadowRoot?.querySelector(".beam-b");
    if (!(!a || !e))
      try {
        this.beamAnimations = [
          n(
            a,
            { transform: ["translate(-50%, -50%) rotate(0deg)", "translate(-50%, -50%) rotate(28deg)"] },
            { duration: 1.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94], fill: "forwards" }
          ),
          n(
            e,
            { transform: ["translate(-50%, -50%) rotate(0deg)", "translate(-50%, -50%) rotate(148deg)"] },
            { duration: 1.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94], fill: "forwards" }
          )
        ];
      } catch {
        a.style.transform = "translate(-50%, -50%) rotate(28deg)", e.style.transform = "translate(-50%, -50%) rotate(148deg)";
      }
  }
  stopBeamAnimations() {
    for (const a of this.beamAnimations)
      a.stop?.(), a.cancel?.();
    this.beamAnimations = [];
  }
  shouldReduceMotion() {
    return getComputedStyle(this).getPropertyValue("--nami-motion-normal").trim() === "1ms" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }
  render() {
    return l`
      <section class="base" part="base">
        <div class="backdrop" part="backdrop" aria-hidden="true"></div>
        <div class="beam beam-a" part="beam-a" aria-hidden="true"></div>
        <div class="beam beam-b" part="beam-b" aria-hidden="true"></div>
        <div class="glow glow-a" part="glow-a" aria-hidden="true"></div>
        <div class="glow glow-b" part="glow-b" aria-hidden="true"></div>
        <div class="content" part="content"><slot></slot></div>
      </section>
    `;
  }
};
t.properties = {
  variant: { reflect: !0 },
  height: { reflect: !0 },
  intensity: { reflect: !0 },
  animated: { type: Boolean, reflect: !0 }
}, t.styles = [
  r,
  s`
      :host {
        display: block;
      }

      .base {
        --hero-stage-accent: var(--nami-hero-stage-accent, var(--nami-color-primary, #3b82f6));
        --hero-stage-bg: var(--nami-hero-stage-bg, var(--nami-surface, #fff));
        --hero-stage-opacity: 0.46;
        --hero-stage-glow-opacity: 0.12;
        align-items: center;
        background:
          var(--nami-style-background-pattern, none),
          var(--hero-stage-bg);
        background-size: var(--nami-style-background-size, auto);
        color: var(--nami-text, #171717);
        display: grid;
        isolation: isolate;
        min-block-size: auto;
        overflow: hidden;
        padding: var(--nami-hero-stage-padding, clamp(48px, 9vw, 120px) var(--nami-layout-gutter, 16px));
        position: relative;
      }

      :host([height='screen']) .base {
        min-block-size: var(--nami-hero-stage-screen-height, min(100dvh, 860px));
      }

      :host([height='compact']) .base {
        min-block-size: var(--nami-hero-stage-compact-height, 360px);
        padding-block: clamp(32px, 7vw, 72px);
      }

      :host([intensity='soft']) .base {
        --hero-stage-opacity: 0.28;
        --hero-stage-glow-opacity: 0.08;
      }

      :host([intensity='strong']) .base {
        --hero-stage-opacity: 0.64;
        --hero-stage-glow-opacity: 0.18;
      }

      .backdrop {
        background:
          radial-gradient(circle at 18% 28%, color-mix(in oklab, var(--hero-stage-accent), transparent 88%), transparent 28%),
          radial-gradient(circle at 82% 72%, color-mix(in oklab, var(--hero-stage-accent), transparent 88%), transparent 30%);
        inset: 0;
        pointer-events: none;
        position: absolute;
        z-index: -3;
      }

      .beam,
      .glow {
        pointer-events: none;
        position: absolute;
        z-index: -2;
      }

      .beam {
        background: var(--hero-stage-accent);
        block-size: clamp(18px, 3.5vw, 42px);
        border-radius: 999px;
        filter: blur(30px);
        inline-size: min(160vw, 1120px);
        inset-block-start: 50%;
        inset-inline-start: 50%;
        opacity: var(--hero-stage-opacity);
        transform: translate(-50%, -50%) rotate(24deg);
        transform-origin: center;
      }

      .beam-b {
        transform: translate(-50%, -50%) rotate(154deg);
      }

      .glow {
        aspect-ratio: 1;
        background: var(--hero-stage-accent);
        border-radius: 999px;
        filter: blur(54px);
        inline-size: min(34vw, 360px);
        opacity: var(--hero-stage-glow-opacity);
      }

      .glow-a {
        inset-block-start: 18%;
        inset-inline-start: -8%;
      }

      .glow-b {
        inset-block-end: 12%;
        inset-inline-end: -10%;
      }

      :host([variant='glow']) .beam,
      :host([variant='none']) .beam,
      :host([variant='none']) .glow,
      :host([variant='none']) .backdrop {
        display: none;
      }

      .content {
        margin-inline: auto;
        max-inline-size: var(--nami-hero-stage-content-width, var(--nami-container-lg, 1240px));
        position: relative;
        width: min(100%, var(--nami-hero-stage-content-width, var(--nami-container-lg, 1240px)));
        z-index: 1;
      }

      :host([animated]) .glow-a {
        animation: nami-hero-float-a 8s ease-in-out infinite;
      }

      :host([animated]) .glow-b {
        animation: nami-hero-float-b 9s ease-in-out infinite;
      }

      @keyframes nami-hero-float-a {
        0%,
        100% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(-18px);
        }
      }

      @keyframes nami-hero-float-b {
        0%,
        100% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(14px);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        :host([animated]) .glow-a,
        :host([animated]) .glow-b {
          animation: none;
        }
      }
    `
];
let i = t;
export {
  i as NamiHeroStage
};
