import { i as s, a as r, A as a, b as i } from "../chunks/lit-element-GeMXvhiH.js";
import { m as n } from "../chunks/runtime-4rCsJ4EI.js";
import { u as o } from "../chunks/localized-controller-BapUPJ8o.js";
import { d as l } from "../chunks/define-BpqXLfIT.js";
import { c as m } from "../chunks/styles-C6m3uqJJ.js";
import { NamiIllustration as c } from "./illustration.js";
l("nami-illustration", c);
const p = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
  403: "forbidden",
  404: "not-found",
  500: "server-error"
}, t = class t extends s {
  constructor() {
    super(), o(this), this.status = "info", this.title = "", this.subTitle = "", this.compact = !1;
  }
  get illustrationName() {
    return p[this.status] ?? "info";
  }
  render() {
    return i`
      <section class="base" part="base" aria-label=${this.title || this.subTitle || n("Result", { id: "nami.result.aria" })}>
        <slot name="illustration" part="illustration">
          <nami-illustration name=${this.illustrationName} size=${this.compact ? "sm" : "lg"}></nami-illustration>
        </slot>
        ${this.title ? i`<div class="title" part="title"><slot name="title">${this.title}</slot></div>` : a}
        ${this.subTitle ? i`<div class="description" part="description"><slot name="description">${this.subTitle}</slot></div>` : a}
        <div class="body" part="body"><slot name="body"></slot></div>
        <div class="actions" part="actions"><slot name="actions"></slot></div>
      </section>
    `;
  }
};
t.properties = {
  status: { reflect: !0 },
  title: { reflect: !0 },
  subTitle: { attribute: "sub-title", reflect: !0 },
  compact: { type: Boolean, reflect: !0 }
}, t.styles = [
  m,
  r`
      :host {
        display: block;
      }

      .base {
        align-items: center;
        color: var(--nami-style-on-paper, var(--nami-text));
        display: grid;
        background: var(--nami-result-bg, transparent);
        border: var(--nami-result-border-width, 0) solid var(--nami-result-border-color, transparent);
        border-radius: var(--nami-result-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-result-shadow, none);
        gap: var(--nami-result-gap, 14px);
        justify-items: center;
        padding: var(--nami-space-5, 24px);
        text-align: center;
      }

      :host([compact]) .base {
        padding: var(--nami-space-3, 10px);
      }

      .title {
        color: var(--nami-style-on-paper, var(--nami-text));
        font-size: var(--nami-result-title-size, 1.5rem);
        font-weight: 800;
        line-height: 1.25;
      }

      .description {
        color: var(--nami-style-on-paper-muted, var(--nami-text-muted));
        font-size: var(--nami-result-subtitle-size, 0.95rem);
        line-height: 1.6;
        max-width: 54ch;
      }

      .body {
        color: var(--nami-style-on-paper-muted, var(--nami-text-muted));
        max-width: 62ch;
        width: 100%;
      }

      .actions {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--nami-space-2, 6px);
        justify-content: center;
        margin: var(--nami-result-actions-margin, 10px 0 0);
      }
    `
];
let e = t;
export {
  e as NamiResult
};
