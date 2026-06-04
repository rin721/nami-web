import { i as s, b as o } from "../chunks/lit-element-GeMXvhiH.js";
import { e as l } from "../chunks/events-DtyLzvDt.js";
import { c } from "../chunks/styles-C6m3uqJJ.js";
import { normalizeLocale as r, getLocale as i, setLocale as n } from "../localize.js";
const e = class e extends s {
  constructor() {
    super(), this.lastAppliedLocale = "", this.handleLocaleStatus = (t) => {
      l(this, "nami-locale-status", t.detail);
    }, this.locale = "en-US", this.dir = "ltr";
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("lit-localize-status", this.handleLocaleStatus), this.applyDirection(), this.applyLocale();
  }
  disconnectedCallback() {
    window.removeEventListener("lit-localize-status", this.handleLocaleStatus), super.disconnectedCallback();
  }
  updated(t) {
    t.has("locale") && this.applyLocale(), t.has("dir") && this.applyDirection();
  }
  applyDirection() {
    this.setAttribute("dir", this.dir);
  }
  async applyLocale() {
    const t = r(this.locale);
    if (t !== this.locale) {
      this.locale = t;
      return;
    }
    this.applyDirection(), !(this.lastAppliedLocale === t && i() === t) && (this.lastAppliedLocale = t, i() !== t && await n(t), l(this, "nami-change", { value: t, locale: t, dir: this.dir }));
  }
  render() {
    return o`<slot></slot>`;
  }
};
e.properties = {
  locale: { reflect: !0 },
  dir: { reflect: !0 }
}, e.styles = [c];
let a = e;
export {
  a as NamiConfig
};
