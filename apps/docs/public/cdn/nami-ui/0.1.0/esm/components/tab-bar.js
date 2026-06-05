import { i as h, a as m, b as u } from "../chunks/lit-element-GeMXvhiH.js";
import { g as b, a as r } from "../chunks/roving-tabindex-BIO4J81E.js";
import { s as v } from "../chunks/selection-CrKkvo5N.js";
import { e as d } from "../chunks/events-DtyLzvDt.js";
import { c as g } from "../chunks/styles-C6m3uqJJ.js";
const n = class n extends h {
  constructor() {
    super(), this.handleItemClick = (t) => {
      const a = t.currentTarget;
      this.isItemDisabled(a) || this.selectItem(a, t);
    }, this.handleItemKeydown = (t) => {
      if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(t.key)) return;
      t.preventDefault();
      const a = t.currentTarget, s = this.enabledItems, e = s.indexOf(a);
      if (e < 0 || s.length === 0) return;
      const o = b(t.key, e, s.length, this.orientation), i = s[o];
      i?.focus(), i && this.selectItem(i, t);
    }, this.value = "", this.orientation = "horizontal";
  }
  get items() {
    return this.renderRoot.querySelector("slot")?.assignedElements({ flatten: !0 }) ?? [];
  }
  get enabledItems() {
    return this.items.filter((t) => !this.isItemDisabled(t));
  }
  firstUpdated() {
    this.syncItems();
  }
  updated() {
    this.syncItems(), v(this, {
      state: this.value ? "selected" : "default"
    });
  }
  syncItems() {
    const t = this.enabledItems;
    if (t.length === 0) {
      this.items.length === 0 && this.value !== "" && (this.value = ""), this.items.forEach((e) => {
        e.setAttribute("role", "tab"), e.setAttribute("aria-disabled", this.isItemDisabled(e) ? "true" : "false"), e.setAttribute("tabindex", "-1");
      });
      return;
    }
    const s = t.some((e) => r(e) === this.value) ? this.value : r(t[0]) || "";
    this.value !== s && (this.value = s), this.items.forEach((e) => {
      const o = r(e), i = this.isItemDisabled(e), l = !i && o === s;
      e.setAttribute("role", "tab"), e.setAttribute("aria-selected", String(l)), i ? e.setAttribute("aria-disabled", "true") : e.removeAttribute("aria-disabled"), e.setAttribute("tabindex", l ? "0" : "-1"), e.removeEventListener("click", this.handleItemClick), e.removeEventListener("keydown", this.handleItemKeydown), e.addEventListener("click", this.handleItemClick), e.addEventListener("keydown", this.handleItemKeydown);
    });
  }
  isItemDisabled(t) {
    return t.hasAttribute("disabled") || t.getAttribute("aria-disabled") === "true" || !!t.disabled;
  }
  selectItem(t, a) {
    const s = r(t);
    !s || s === this.value || (this.value = s, this.syncItems(), d(this, "nami-select", { value: s, sourceEvent: a }), d(this, "nami-change", { value: s, sourceEvent: a }));
  }
  render() {
    return u`
      <div class="base" part="base" role="tablist" aria-orientation=${this.orientation}>
        <slot @slotchange=${() => this.syncItems()}></slot>
      </div>
    `;
  }
};
n.properties = {
  value: {},
  orientation: { reflect: !0 }
}, n.styles = [
  g,
  m`
      :host {
        display: block;
      }

      .base {
        align-items: center;
        display: flex;
        gap: var(--nami-space-1, 4px);
      }

      :host([orientation='vertical']) .base {
        align-items: stretch;
        flex-direction: column;
      }

      ::slotted(*) {
        background: var(--nami-tab-bg, transparent);
        border: var(--nami-tab-border-width, 0) solid var(--nami-tab-border-color, transparent);
        border-radius: var(--nami-tab-radius, var(--nami-radius-control, 999px));
        color: var(--nami-style-on-paper, var(--nami-icon-color));
        cursor: pointer;
        min-height: var(--nami-control-height, var(--nami-control-height-md, 40px));
        padding: 0 var(--nami-control-padding-x, 14px);
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          color var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
      }

      ::slotted([aria-selected='true']) {
        background: var(--nami-accent-hover-overlay);
        color: var(--nami-color-primary);
      }
    `
];
let c = n;
export {
  c as NamiTabBar
};
