import { i as s, c as t, a, b as e } from "../chunks/styles-DgWJnXXm.js";
const r = class r extends s {
  constructor() {
    super(), this.name = "empty", this.size = "md";
  }
  renderBadge(i) {
    return e`
      <circle class="primary" cx="100" cy="66" r="28"></circle>
      <text x="100" y="77" text-anchor="middle" fill="white" font-size="32" font-family="ui-sans-serif, system-ui" font-weight="800">${i}</text>
    `;
  }
  renderStateMark() {
    const i = {
      empty: e`<path class="line" d="M80 77h40M90 92h20"></path>`,
      search: e`<circle class="line" cx="91" cy="72" r="19"></circle><path class="line" d="M105 86l22 22"></path>`,
      success: e`<path class="line" d="M78 72l16 16 31-35"></path>`,
      error: e`<path class="line" d="M82 58l36 36M118 58L82 94"></path>`,
      warning: e`<path class="accent" d="M100 44l40 72H60z"></path><path class="line thin-line" d="M100 68v28M100 108h.1"></path>`,
      info: e`${this.renderBadge("i")}`,
      forbidden: e`${this.renderBadge("!")}<path class="line" d="M78 90l44-44"></path>`,
      "not-found": e`${this.renderBadge("?")}`,
      "server-error": e`${this.renderBadge("5")}<path class="line thin-line" d="M74 114h52"></path>`
    };
    return i[this.name] ?? i.empty;
  }
  render() {
    return e`
      <svg part="base illustration image" viewBox="0 0 200 160" role="img" aria-label=${this.name}>
        <ellipse class="bg" cx="100" cy="134" rx="62" ry="12"></ellipse>
        <rect class="secondary" x="54" y="54" width="92" height="70" rx="14"></rect>
        <path class="primary" d="M70 46h60l14 22H56z"></path>
        <path class="muted" d="M48 105h104v16a12 12 0 0 1-12 12H60a12 12 0 0 1-12-12z"></path>
        ${this.renderStateMark()}
        <path class="line thin-line" d="M42 129h116"></path>
        <circle class="accent" cx="153" cy="47" r="6"></circle>
        <circle class="muted" cx="45" cy="49" r="5"></circle>
      </svg>
    `;
  }
};
r.properties = {
  name: { reflect: !0 },
  size: { reflect: !0 }
}, r.styles = [
  t,
  a`
      :host {
        --illustration-size: var(--nami-illus-size-md, 140px);
        color: var(--nami-illus-primary, var(--nami-color-primary, #3b82f6));
        display: inline-flex;
        height: var(--illustration-size);
        width: var(--illustration-size);
      }

      :host([size='sm']) {
        --illustration-size: var(--nami-illus-size-sm, 92px);
      }

      :host([size='lg']) {
        --illustration-size: var(--nami-illus-size-lg, 184px);
      }

      svg {
        display: block;
        height: 100%;
        overflow: visible;
        width: 100%;
      }

      .bg {
        fill: var(--nami-illus-bg, color-mix(in oklab, currentColor, transparent 92%));
      }

      .primary {
        fill: var(--nami-illus-primary, currentColor);
      }

      .secondary {
        fill: var(--nami-illus-secondary, color-mix(in oklab, currentColor, #fff 58%));
      }

      .accent {
        fill: var(--nami-illus-accent, #f5b84b);
      }

      .muted {
        fill: var(--nami-illus-muted, color-mix(in oklab, currentColor, transparent 66%));
      }

      .line {
        fill: none;
        stroke: var(--nami-illus-line, color-mix(in oklab, currentColor, #111 34%));
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 3.5;
      }

      .thin-line {
        stroke-width: 2.2;
      }
    `
];
let l = r;
export {
  l as NamiIllustration
};
