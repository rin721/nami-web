import { i as a, c as e, a as n, b as s } from "../chunks/styles-DgWJnXXm.js";
const t = class t extends a {
  constructor() {
    super(), this.size = "lg", this.padded = !0;
  }
  render() {
    return s`<div class="base" part="base"><slot></slot></div>`;
  }
};
t.properties = {
  size: { reflect: !0 },
  padded: { type: Boolean, reflect: !0 }
}, t.styles = [
  e,
  n`
      :host {
        display: block;
      }

      .base {
        box-sizing: border-box;
        margin-inline: auto;
        max-width: var(--nami-container-max-width, var(--nami-container-lg, 1240px));
        padding-inline: var(--nami-container-padding, var(--nami-layout-gutter, 16px));
        width: 100%;
      }

      :host(:not([padded])) .base {
        padding-inline: 0;
      }

      :host([size='sm']) {
        --nami-container-max-width: var(--nami-container-sm, 720px);
      }

      :host([size='md']) {
        --nami-container-max-width: var(--nami-container-md, 960px);
      }

      :host,
      :host([size='lg']) {
        --nami-container-max-width: var(--nami-container-lg, 1240px);
      }

      :host([size='full']) {
        --nami-container-max-width: none;
      }
    `
];
let i = t;
export {
  i as NamiContainer
};
