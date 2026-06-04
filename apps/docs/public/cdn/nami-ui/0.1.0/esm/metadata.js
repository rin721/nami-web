const n = [
  {
    name: "nami-config",
    summary: "Global locale and text-direction boundary powered by @lit/localize.",
    usage: '<nami-config locale="zh-CN"><nami-empty></nami-empty></nami-config>',
    attributes: ["locale", "dir"],
    properties: ["locale", "dir"],
    events: ["nami-change", "nami-locale-status"],
    slots: ["default"],
    parts: [],
    tokens: []
  },
  {
    name: "nami-theme",
    summary: "Theme, accent, density, size, motion, radius, contrast, and style preset boundary.",
    usage: '<nami-theme theme="light" style-preset="illustration" accent="#3b82f6" size="lg" radius="soft" contrast="high"><slot /></nami-theme>',
    attributes: ["theme", "accent", "density", "size", "motion", "style-preset", "radius", "contrast"],
    properties: ["theme", "accent", "density", "size", "motion", "stylePreset", "radius", "contrast"],
    events: [],
    slots: ["default"],
    parts: [],
    tokens: ["--nami-accent-50", "--nami-control-height", "--nami-control-padding-x", "--nami-control-font-size", "--nami-icon-size", "--nami-contrast-level", "--nami-surface", "--nami-text", "--nami-focus-ring", "--nami-overlay-backdrop", "--nami-style-stroke-width", "--nami-style-ink-color", "--nami-style-on-paper", "--nami-style-on-paper-muted", "--nami-style-offset-shadow", "--nami-style-control-bg", "--nami-style-panel-bg", "--nami-style-background-pattern", "--nami-style-doodle-opacity", "--nami-style-paper-line-color"]
  },
  {
    name: "nami-spinner",
    summary: "Small loading indicator for async states.",
    usage: '<nami-spinner size="sm" label="Loading"></nami-spinner>',
    attributes: ["size", "label"],
    properties: ["size", "label"],
    events: [],
    slots: [],
    parts: ["base", "indicator"],
    tokens: ["--nami-motion-fast", "--nami-text", "--nami-spinner-track-color"]
  },
  {
    name: "nami-page-transition",
    summary: "Framework-hook driven veil or panel transition for first-paint reveal and blocking tasks.",
    usage: '<nami-page-transition appearance="veil" active></nami-page-transition>',
    attributes: ["active", "label", "variant", "tone", "appearance", "duration"],
    properties: ["active", "label", "variant", "tone", "appearance", "duration", "show()", "hide()", "waitFor()"],
    events: [],
    slots: ["default", "icon"],
    parts: ["base", "track", "indicator", "brand", "panel", "label"],
    tokens: ["--nami-motion-fast", "--nami-motion-normal", "--nami-surface", "--nami-surface-overlay", "--nami-text", "--nami-color-primary", "--nami-border", "--nami-dialog-border-width", "--nami-dialog-radius", "--nami-dialog-shadow", "--nami-spinner-track-color", "--nami-style-background-pattern", "--nami-style-stroke-width", "--nami-transition-progress-height", "--nami-page-transition-z-index"],
    category: "feedback",
    states: ["default", "loading", "active"]
  },
  {
    name: "nami-top-progress",
    summary: "Route progress indicator with equal-height track and fill, designed for framework navigation hooks.",
    usage: '<nami-top-progress active progress="64" height="4"></nami-top-progress>',
    attributes: ["active", "progress", "height", "duration", "effect", "variant", "label"],
    properties: ["active", "progress", "height", "duration", "effect", "variant", "label", "show()", "set()", "finish()", "hide()", "waitFor()"],
    events: [],
    slots: [],
    parts: ["base", "track", "indicator"],
    tokens: ["--nami-transition-progress-height", "--nami-top-progress-height", "--nami-top-progress-duration", "--nami-top-progress-ease", "--nami-top-progress-indeterminate-duration", "--nami-top-progress-track-bg", "--nami-top-progress-fill-bg", "--nami-top-progress-shadow", "--nami-top-progress-z-index"],
    category: "feedback",
    states: ["default", "loading", "active"]
  },
  {
    name: "nami-scroll-smoother",
    summary: "Lenis-powered page scroll controller that adds inertial resistance while preserving native document flow.",
    usage: '<nami-scroll-smoother duration="1.2" touch-multiplier="2" anchors></nami-scroll-smoother>',
    attributes: ["disabled", "duration", "smooth-wheel", "sync-touch", "anchors", "auto-raf", "touch-multiplier", "wheel-multiplier", "stop-inertia-on-navigate", "resize-on-load"],
    properties: ["active", "disabled", "duration", "smoothWheel", "syncTouch", "anchors", "autoRaf", "touchMultiplier", "wheelMultiplier", "stopInertiaOnNavigate", "resizeOnLoad", "start()", "stop()", "resize()", "sync()", "scrollTo()"],
    events: ["nami-scroll-smoother", "nami-scroll-smoother-state"],
    slots: [],
    parts: [],
    tokens: ["--nami-motion-normal"],
    category: "feedback",
    states: ["default", "active", "disabled", "reduced-motion"]
  },
  {
    name: "nami-illustration",
    summary: "Token-driven status illustration.",
    usage: '<nami-illustration name="empty" size="md"></nami-illustration>',
    attributes: ["name", "size"],
    properties: ["name", "size"],
    events: [],
    slots: [],
    parts: ["base", "illustration", "image"],
    tokens: ["--nami-illus-primary", "--nami-illus-secondary", "--nami-illus-accent", "--nami-illus-muted", "--nami-illus-line", "--nami-illus-bg"]
  },
  {
    name: "nami-empty",
    summary: "Illustration-ready empty state with description and actions.",
    usage: '<nami-empty title="No results" description="Try another keyword"><nami-button slot="actions">Create</nami-button></nami-empty>',
    attributes: ["illustration", "title", "description", "compact"],
    properties: ["illustration", "title", "description", "compact"],
    events: [],
    slots: ["illustration", "title", "description", "actions"],
    parts: ["base", "illustration", "title", "description", "actions"],
    tokens: ["--nami-empty-gap", "--nami-empty-title-color", "--nami-empty-description-color", "--nami-empty-bg", "--nami-empty-border-width", "--nami-empty-border-color", "--nami-empty-radius", "--nami-empty-shadow"]
  },
  {
    name: "nami-result",
    summary: "Illustration-ready result feedback for success, error, warnings, and HTTP states.",
    usage: '<nami-result status="success" title="Done" sub-title="Everything is ready"><nami-button slot="actions">Continue</nami-button></nami-result>',
    attributes: ["status", "title", "sub-title", "compact"],
    properties: ["status", "title", "subTitle", "compact"],
    events: [],
    slots: ["illustration", "title", "description", "actions", "body"],
    parts: ["base", "illustration", "title", "description", "actions", "body"],
    tokens: ["--nami-result-title-size", "--nami-result-subtitle-size", "--nami-result-gap", "--nami-result-actions-margin", "--nami-result-bg", "--nami-result-border-width", "--nami-result-border-color", "--nami-result-radius", "--nami-result-shadow"]
  },
  {
    name: "nami-card",
    summary: "Token-driven content container for grouped surfaces.",
    usage: '<nami-card><h3 slot="header">Title</h3><p>Content</p><nami-button slot="actions">Action</nami-button></nami-card>',
    attributes: ["variant"],
    properties: ["variant"],
    events: [],
    slots: ["default", "header", "actions", "footer"],
    parts: ["base", "header", "body", "actions", "footer"],
    tokens: ["--nami-card-bg", "--nami-card-fg", "--nami-card-inset-bg", "--nami-card-border", "--nami-card-border-width", "--nami-card-radius", "--nami-card-shadow", "--nami-card-padding", "--nami-card-gap"]
  },
  {
    name: "nami-badge",
    summary: "Compact status label for metadata and state.",
    usage: '<nami-badge variant="primary">Token driven</nami-badge>',
    attributes: ["variant", "tone"],
    properties: ["variant", "tone"],
    events: [],
    slots: ["default"],
    parts: ["base"],
    tokens: ["--nami-badge-bg", "--nami-badge-fg", "--nami-badge-border", "--nami-badge-border-width", "--nami-badge-radius", "--nami-badge-height", "--nami-badge-font-size", "--nami-badge-padding-x"]
  },
  {
    name: "nami-button",
    summary: "Primary command button.",
    usage: '<nami-button variant="soft" loading>Save</nami-button>',
    attributes: ["variant", "size", "disabled", "loading", "type"],
    properties: ["variant", "size", "disabled", "loading", "type"],
    events: ["nami-click"],
    slots: ["default", "icon", "actions"],
    parts: ["base", "control", "icon", "label", "indicator"],
    tokens: ["--nami-button-bg", "--nami-button-fg", "--nami-button-border", "--nami-button-border-width", "--nami-button-radius", "--nami-button-shadow", "--nami-button-hover-bg"]
  },
  {
    name: "nami-icon-button",
    summary: "Soft icon command button.",
    usage: '<nami-icon-button label="Favorite" selected><span slot="icon">F</span></nami-icon-button>',
    attributes: ["label", "size", "disabled", "selected", "loading"],
    properties: ["label", "size", "disabled", "selected", "loading"],
    events: ["nami-click"],
    slots: ["default", "icon"],
    parts: ["base", "control", "icon"],
    tokens: ["--nami-icon-button-size", "--nami-soft-control-bg", "--nami-soft-control-color", "--nami-soft-control-border-width", "--nami-soft-control-border-color", "--nami-hover-overlay", "--nami-ripple"]
  },
  {
    name: "nami-chip",
    summary: "Selectable tag-like control.",
    usage: '<nami-chip checkbox selected value="tag">Tag</nami-chip>',
    attributes: ["value", "selected", "checkbox", "disabled"],
    properties: ["value", "selected", "checkbox", "disabled"],
    events: ["nami-change", "nami-select"],
    slots: ["default", "icon"],
    parts: ["base", "control", "icon", "label"],
    tokens: ["--nami-chip-bg", "--nami-chip-selected-bg", "--nami-chip-border-width", "--nami-chip-border-color", "--nami-chip-radius", "--nami-chip-shadow"]
  },
  {
    name: "nami-input",
    summary: "Form-associated text input.",
    usage: '<nami-input label="Search" helper-text="Token driven"></nami-input>',
    attributes: ["name", "value", "default-value", "type", "placeholder", "label", "helper-text", "error", "disabled", "required"],
    properties: ["name", "value", "defaultValue", "type", "placeholder", "label", "helperText", "error", "disabled", "required"],
    events: ["nami-input", "nami-change"],
    slots: ["icon", "actions"],
    parts: ["base", "control", "label", "description", "error"],
    tokens: ["--nami-input-bg", "--nami-input-border", "--nami-input-border-width", "--nami-input-radius", "--nami-input-shadow", "--nami-focus-ring"]
  },
  {
    name: "nami-switch",
    summary: "Form-associated switch control.",
    usage: "<nami-switch checked>Enabled</nami-switch>",
    attributes: ["name", "value", "checked", "disabled"],
    properties: ["name", "value", "checked", "disabled"],
    events: ["nami-change"],
    slots: ["default"],
    parts: ["base", "control", "indicator", "label"],
    tokens: ["--nami-switch-track-bg", "--nami-switch-border-width", "--nami-switch-border-color", "--nami-switch-thumb-bg", "--nami-switch-thumb-shadow", "--nami-color-primary", "--nami-border", "--nami-focus-ring"]
  },
  {
    name: "nami-radio-card",
    summary: "Radio-like selectable card.",
    usage: '<nami-radio-card selected label="Blue" description="Default"></nami-radio-card>',
    attributes: ["value", "label", "description", "selected", "disabled"],
    properties: ["value", "label", "description", "selected", "disabled"],
    events: ["nami-select", "nami-change"],
    slots: ["icon", "label", "description", "actions"],
    parts: ["base", "control", "indicator", "icon", "label", "description"],
    tokens: ["--nami-radio-card-bg", "--nami-radio-card-border-width", "--nami-radio-card-border-color", "--nami-radio-card-radius", "--nami-radio-card-shadow", "--nami-radio-card-selected-shadow", "--nami-surface-raised", "--nami-color-primary", "--nami-focus-ring"]
  },
  {
    name: "nami-tab-bar",
    summary: "Roving-tabindex tablist.",
    usage: '<nami-tab-bar value="Overview"><button value="Overview">Overview</button></nami-tab-bar>',
    attributes: ["value", "orientation"],
    properties: ["value", "orientation"],
    events: ["nami-select", "nami-change"],
    slots: ["default"],
    parts: ["base"],
    tokens: ["--nami-tab-bg", "--nami-tab-border-width", "--nami-tab-border-color", "--nami-tab-radius", "--nami-accent-hover-overlay", "--nami-color-primary"]
  },
  {
    name: "nami-dialog",
    summary: "Modal dialog with focus management.",
    usage: '<nami-dialog open label="Settings">Content</nami-dialog>',
    attributes: ["open", "label", "close-on-backdrop"],
    properties: ["open", "label", "closeOnBackdrop"],
    events: ["nami-open", "nami-close"],
    slots: ["default", "label", "actions"],
    parts: ["base", "control", "label", "description", "actions", "header", "footer"],
    tokens: ["--nami-dialog-bg", "--nami-dialog-border-width", "--nami-dialog-border-color", "--nami-dialog-radius", "--nami-dialog-shadow", "--nami-overlay-backdrop", "--nami-surface-raised", "--nami-border"]
  },
  {
    name: "nami-drawer",
    summary: "Off-canvas drawer with focus return.",
    usage: '<nami-drawer open placement="left">Content</nami-drawer>',
    attributes: ["open", "placement"],
    properties: ["open", "placement"],
    events: ["nami-open", "nami-close"],
    slots: ["default", "label", "actions"],
    parts: ["base", "control", "backdrop", "label"],
    tokens: ["--nami-drawer-bg", "--nami-drawer-border-width", "--nami-drawer-border-color", "--nami-drawer-shadow", "--nami-overlay-backdrop", "--nami-surface-overlay", "--nami-border"]
  },
  {
    name: "nami-toast",
    summary: "Temporary feedback toast.",
    usage: 'NamiToast.show({ message: "Saved", variant: "success" })',
    attributes: ["open", "message", "variant", "placement", "duration"],
    properties: ["open", "message", "variant", "placement", "duration"],
    events: ["nami-open", "nami-close"],
    slots: ["default", "icon"],
    parts: ["base", "indicator", "label", "actions"],
    tokens: ["--nami-toast-bg", "--nami-toast-border-width", "--nami-toast-border-color", "--nami-toast-radius", "--nami-dialog-shadow", "--nami-border"]
  },
  {
    name: "nami-app-shell",
    summary: "Responsive application shell.",
    usage: '<nami-app-shell rail-width="64" breakpoint="medium"><div slot="rail"></div><main></main></nami-app-shell>',
    attributes: ["rail-width", "mobile-bar-height", "breakpoint", "sticky", "safe-area"],
    properties: ["railWidth", "mobileBarHeight", "breakpoint", "sticky", "safeArea"],
    events: [],
    slots: ["default", "rail", "top", "bottom"],
    parts: ["base", "rail", "top", "bottom", "control"],
    tokens: ["--nami-app-shell-border-width", "--nami-app-shell-shadow", "--nami-app-shell-rail-width", "--nami-app-shell-mobile-bar-height", "--nami-app-shell-breakpoint", "--nami-surface", "--nami-surface-overlay", "--nami-border", "--nami-style-background-pattern"]
  },
  {
    name: "nami-container",
    summary: "Width-constrained layout container with token-driven gutters.",
    usage: '<nami-container size="lg"><slot /></nami-container>',
    attributes: ["size", "padded"],
    properties: ["size", "padded"],
    events: [],
    slots: ["default"],
    parts: ["base"],
    tokens: ["--nami-container-max-width", "--nami-container-padding", "--nami-container-sm", "--nami-container-md", "--nami-container-lg", "--nami-layout-gutter"]
  },
  {
    name: "nami-stack",
    summary: "One-dimensional layout primitive for vertical or horizontal spacing.",
    usage: '<nami-stack gap="md"><slot /></nami-stack>',
    attributes: ["gap", "direction", "align", "justify"],
    properties: ["gap", "direction", "align", "justify"],
    events: [],
    slots: ["default"],
    parts: ["base"],
    tokens: ["--nami-stack-gap", "--nami-space-1", "--nami-space-2", "--nami-space-3", "--nami-space-4"]
  },
  {
    name: "nami-cluster",
    summary: "Wrapping flex layout primitive for action groups and chips.",
    usage: '<nami-cluster gap="sm"><slot /></nami-cluster>',
    attributes: ["gap", "align", "justify"],
    properties: ["gap", "align", "justify"],
    events: [],
    slots: ["default"],
    parts: ["base"],
    tokens: ["--nami-cluster-gap", "--nami-space-2", "--nami-space-3", "--nami-space-4"]
  },
  {
    name: "nami-grid",
    summary: "Responsive auto-fit grid layout primitive.",
    usage: '<nami-grid min="18rem"><slot /></nami-grid>',
    attributes: ["columns", "min", "gap"],
    properties: ["columns", "min", "gap"],
    events: [],
    slots: ["default"],
    parts: ["base"],
    tokens: ["--nami-grid-min", "--nami-grid-gap", "--nami-layout-gutter"]
  },
  {
    name: "nami-split",
    summary: "Two-column split layout that collapses when space is constrained.",
    usage: '<nami-split ratio="sidebar-main"><aside></aside><main></main></nami-split>',
    attributes: ["min", "gap", "ratio"],
    properties: ["min", "gap", "ratio"],
    events: [],
    slots: ["default"],
    parts: ["base"],
    tokens: ["--nami-split-min", "--nami-split-gap", "--nami-layout-gutter"]
  },
  {
    name: "nami-checkbox",
    summary: "Form-associated checkbox with token-driven state styling.",
    usage: '<nami-checkbox name="terms" required>Accept terms</nami-checkbox>',
    attributes: ["name", "value", "checked", "default-checked", "disabled", "required", "error"],
    properties: ["name", "value", "checked", "defaultChecked", "disabled", "required", "error"],
    events: ["nami-change"],
    slots: ["default"],
    parts: ["base", "control", "indicator", "label"],
    tokens: ["--nami-checkbox-bg", "--nami-checkbox-border", "--nami-checkbox-border-width", "--nami-checkbox-radius", "--nami-checkbox-indicator-color", "--nami-color-primary", "--nami-color-danger", "--nami-focus-ring"]
  },
  {
    name: "nami-textarea",
    summary: "Form-associated multiline text input.",
    usage: '<nami-textarea label="Notes" rows="4"></nami-textarea>',
    attributes: ["name", "value", "default-value", "placeholder", "label", "helper-text", "error", "disabled", "required", "rows"],
    properties: ["name", "value", "defaultValue", "placeholder", "label", "helperText", "error", "disabled", "required", "rows"],
    events: ["nami-input", "nami-change"],
    slots: [],
    parts: ["base", "control", "label", "description", "error"],
    tokens: ["--nami-textarea-bg", "--nami-textarea-border", "--nami-textarea-border-width", "--nami-textarea-radius", "--nami-textarea-shadow", "--nami-form-field-gap", "--nami-color-primary", "--nami-color-danger", "--nami-focus-ring"]
  },
  {
    name: "nami-form-field",
    summary: "Composable field wrapper for custom form controls.",
    usage: '<nami-form-field label="Email"><nami-input></nami-input></nami-form-field>',
    attributes: ["label", "helper-text", "error", "required", "disabled"],
    properties: ["label", "helperText", "error", "required", "disabled"],
    events: [],
    slots: ["default", "description"],
    parts: ["base", "control", "label", "description", "error"],
    tokens: ["--nami-form-field-gap", "--nami-text", "--nami-text-muted", "--nami-color-danger"]
  },
  {
    name: "nami-alert",
    summary: "Inline feedback surface for information, success, warning, and danger states.",
    usage: '<nami-alert variant="warning" title="Check settings">Review the configuration.</nami-alert>',
    attributes: ["variant", "title", "closable"],
    properties: ["variant", "title", "closable"],
    events: ["nami-close"],
    slots: ["default", "icon", "title"],
    parts: ["base", "indicator", "label", "description", "actions"],
    tokens: ["--nami-alert-bg", "--nami-alert-border", "--nami-alert-border-width", "--nami-alert-radius", "--nami-alert-shadow", "--nami-color-primary", "--nami-color-danger"]
  },
  {
    name: "nami-skeleton",
    summary: "Token-driven placeholder for loading content.",
    usage: '<nami-skeleton variant="text"></nami-skeleton>',
    attributes: ["variant", "animated"],
    properties: ["variant", "animated"],
    events: [],
    slots: ["default"],
    parts: ["base"],
    tokens: ["--nami-skeleton-bg", "--nami-skeleton-highlight", "--nami-radius-surface", "--nami-radius-control", "--nami-motion-slow"]
  },
  {
    name: "nami-progress",
    summary: "Determinate or indeterminate inline progress bar.",
    usage: '<nami-progress value="64" max="100" label="Uploading"></nami-progress>',
    attributes: ["value", "max", "label", "indeterminate"],
    properties: ["value", "max", "label", "indeterminate"],
    events: [],
    slots: [],
    parts: ["base", "track", "indicator"],
    tokens: ["--nami-progress-track-bg", "--nami-progress-fill-bg", "--nami-progress-height", "--nami-progress-radius", "--nami-color-primary"]
  }
], r = /* @__PURE__ */ new Map([
  ["nami-config", "configuration"],
  ["nami-theme", "configuration"],
  ["nami-app-shell", "layout"],
  ["nami-container", "layout"],
  ["nami-stack", "layout"],
  ["nami-cluster", "layout"],
  ["nami-grid", "layout"],
  ["nami-split", "layout"],
  ["nami-card", "layout"],
  ["nami-button", "action"],
  ["nami-icon-button", "action"],
  ["nami-badge", "status"],
  ["nami-chip", "selection"],
  ["nami-tab-bar", "selection"],
  ["nami-input", "form"],
  ["nami-checkbox", "form"],
  ["nami-textarea", "form"],
  ["nami-form-field", "form"],
  ["nami-switch", "form"],
  ["nami-radio-card", "form"],
  ["nami-alert", "feedback"],
  ["nami-skeleton", "feedback"],
  ["nami-progress", "feedback"],
  ["nami-spinner", "feedback"],
  ["nami-page-transition", "feedback"],
  ["nami-top-progress", "feedback"],
  ["nami-scroll-smoother", "feedback"],
  ["nami-illustration", "feedback"],
  ["nami-empty", "feedback"],
  ["nami-result", "feedback"],
  ["nami-dialog", "overlay"],
  ["nami-drawer", "overlay"],
  ["nami-toast", "overlay"]
]), o = {
  configuration: ["default"],
  layout: ["default"],
  action: ["default", "hover", "active", "focus-visible", "disabled", "loading"],
  selection: ["default", "hover", "active", "focus-visible", "disabled", "selected"],
  form: ["default", "hover", "active", "focus-visible", "disabled", "checked", "selected", "error"],
  feedback: ["default", "loading"],
  overlay: ["default", "open", "focus-visible"],
  status: ["default"]
}, s = /* @__PURE__ */ new Map([
  ["base", "Stable outer style surface exposed through CSS Parts."],
  ["control", "Interactive control surface that receives state styling."],
  ["label", "Primary readable label content."],
  ["description", "Secondary explanatory content."],
  ["indicator", "Visual state indicator such as spinner, thumb, or marker."],
  ["icon", "Icon slot or visual symbol area."],
  ["actions", "Action slot or grouped command area."],
  ["backdrop", "Overlay backdrop surface."],
  ["header", "Header region for title or leading content."],
  ["footer", "Footer region for secondary content."],
  ["body", "Main content region."],
  ["track", "Progress track for route and reveal transitions."],
  ["brand", "Brand mark region for first-paint reveal transitions."],
  ["panel", "Raised inner surface for grouped transition content."],
  ["illustration", "Illustration container."],
  ["image", "Rendered illustration artwork."],
  ["error", "Validation or error message region."],
  ["rail", "Desktop navigation rail slot."],
  ["top", "Mobile top navigation slot."],
  ["bottom", "Mobile bottom navigation slot."]
]);
function l(e) {
  return e.map((t) => ({
    part: t,
    description: s.get(t) ?? "Named style part exposed as public component anatomy."
  }));
}
function m(e, t) {
  return t === "focus-visible" ? e.filter((a) => a.includes("focus") || a.includes("ring")) : t === "selected" || t === "checked" ? e.filter((a) => a.includes("selected") || a.includes("primary") || a.includes("checked")) : t === "hover" ? e.filter((a) => a.includes("hover")) : t === "loading" ? e.filter((a) => a.includes("spinner") || a.includes("motion")) : t === "open" ? e.filter((a) => a.includes("dialog") || a.includes("drawer") || a.includes("toast") || a.includes("overlay")) : t === "error" ? e.filter((a) => a.includes("error") || a.includes("danger")) : e;
}
function d(e, t) {
  const a = e.parts.includes("control") ? "control" : e.parts[0] ?? "base";
  return t.map((i) => ({
    part: a,
    state: i,
    tokens: m(e.tokens, i)
  })).filter((i) => i.tokens.length > 0);
}
const c = n.map((e) => {
  const t = e.category ?? r.get(e.name) ?? "status", a = e.states ?? o[t];
  return {
    ...e,
    category: t,
    anatomy: e.anatomy ?? l(e.parts),
    states: a,
    styleHooks: e.styleHooks ?? d(e, a)
  };
});
export {
  c as namiComponentMetadata
};
