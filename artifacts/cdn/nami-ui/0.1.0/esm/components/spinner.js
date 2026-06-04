import { i as r, c as s, a as t, b as n } from "../chunks/styles-DgWJnXXm.js";
import { m as a } from "../chunks/runtime-4rCsJ4EI.js";
import { u as o } from "../chunks/localized-controller-BapUPJ8o.js";
const i = class i extends r {
  constructor() {
    super(), o(this), this.label = "";
  }
  render() {
    return n`<span class="indicator" part="base indicator" role="status" aria-label=${this.label || a("Loading", { id: "nami.spinner.loading" })}></span>`;
  }
};
i.properties = {
  size: { reflect: !0 },
  label: {}
}, i.styles = [
  s,
  t`
      :host {
        --spinner-size: var(--nami-icon-size, 1em);
        display: inline-flex;
        height: var(--spinner-size);
        width: var(--spinner-size);
      }

      :host([size='sm']) {
        --spinner-size: 14px;
      }

      :host([size='md']) {
        --spinner-size: 18px;
      }

      :host([size='lg']) {
        --spinner-size: 24px;
      }

      .indicator {
        animation: nami-spinner-rotate 900ms linear infinite;
        border: 2px solid var(--nami-spinner-track-color, color-mix(in oklab, currentColor, transparent 72%));
        border-radius: 50%;
        border-top-color: currentColor;
        display: inline-block;
        height: 100%;
        width: 100%;
      }

      @keyframes nami-spinner-rotate {
        to {
          transform: rotate(360deg);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .indicator {
          animation-duration: 1ms;
        }
      }
    `
];
let e = i;
export {
  e as NamiSpinner
};
