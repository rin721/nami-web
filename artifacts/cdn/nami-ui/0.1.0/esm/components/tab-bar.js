import { i as h, c as m, a as b, b as v } from "../chunks/styles-DgWJnXXm.js";
import { e as c } from "../chunks/events-DtyLzvDt.js";
function o(i) {
  return i.getAttribute("value") || i.dataset.value || i.textContent?.trim() || "";
}
function f(i, t, r, s) {
  const e = s === "vertical" ? ["ArrowDown"] : ["ArrowRight"], n = s === "vertical" ? ["ArrowUp"] : ["ArrowLeft"];
  return i === "Home" ? 0 : i === "End" ? r - 1 : e.includes(i) ? (t + 1) % r : n.includes(i) ? (t - 1 + r) % r : t;
}
const l = class l extends h {
  constructor() {
    super(), this.handleItemClick = (t) => {
      const r = t.currentTarget;
      this.isItemDisabled(r) || this.selectItem(r, t);
    }, this.handleItemKeydown = (t) => {
      if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(t.key)) return;
      t.preventDefault();
      const r = t.currentTarget, s = this.enabledItems, e = s.indexOf(r);
      if (e < 0 || s.length === 0) return;
      const n = f(t.key, e, s.length, this.orientation), a = s[n];
      a?.focus(), a && this.selectItem(a, t);
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
    this.syncItems();
  }
  syncItems() {
    const t = this.enabledItems;
    if (t.length === 0) {
      this.items.length === 0 && this.value !== "" && (this.value = ""), this.items.forEach((e) => {
        e.setAttribute("role", "tab"), e.setAttribute("aria-disabled", this.isItemDisabled(e) ? "true" : "false"), e.setAttribute("tabindex", "-1");
      });
      return;
    }
    const s = t.some((e) => o(e) === this.value) ? this.value : o(t[0]) || "";
    this.value !== s && (this.value = s), this.items.forEach((e) => {
      const n = o(e), a = this.isItemDisabled(e), d = !a && n === s;
      e.setAttribute("role", "tab"), e.setAttribute("aria-selected", String(d)), a ? e.setAttribute("aria-disabled", "true") : e.removeAttribute("aria-disabled"), e.setAttribute("tabindex", d ? "0" : "-1"), e.removeEventListener("click", this.handleItemClick), e.removeEventListener("keydown", this.handleItemKeydown), e.addEventListener("click", this.handleItemClick), e.addEventListener("keydown", this.handleItemKeydown);
    });
  }
  isItemDisabled(t) {
    return t.hasAttribute("disabled") || t.getAttribute("aria-disabled") === "true" || !!t.disabled;
  }
  selectItem(t, r) {
    const s = o(t);
    !s || s === this.value || (this.value = s, this.syncItems(), c(this, "nami-select", { value: s, sourceEvent: r }), c(this, "nami-change", { value: s, sourceEvent: r }));
  }
  render() {
    return v`
      <div class="base" part="base" role="tablist" aria-orientation=${this.orientation}>
        <slot @slotchange=${() => this.syncItems()}></slot>
      </div>
    `;
  }
};
l.properties = {
  value: {},
  orientation: { reflect: !0 }
}, l.styles = [
  m,
  b`
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
let u = l;
export {
  u as NamiTabBar
};
