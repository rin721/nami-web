import { msg, str } from '@lit/localize';
import { getLocale, isSupportedLocale, type RlLocaleCode } from '@rin-labs/ui/localize';
import type { RlComponentMetadata } from '@rin-labs/ui';

export type { RlLocaleCode };

export const defaultDocsLocale: RlLocaleCode = 'zh-CN';
export const docsLocales = ['zh-CN', 'en-US'] as const;

export function isDocsLocale(locale: string): locale is RlLocaleCode {
  return isSupportedLocale(locale) && docsLocales.includes(locale as (typeof docsLocales)[number]);
}

const docsMessages: Record<string, () => string> = {
  'docs.nav.home': () => msg('Home', { id: 'docs.nav.home' }),
  'docs.nav.docs': () => msg('Docs', { id: 'docs.nav.docs' }),
  'docs.nav.components': () => msg('Components', { id: 'docs.nav.components' }),
  'docs.nav.tokens': () => msg('Tokens', { id: 'docs.nav.tokens' }),
  'docs.nav.lab': () => msg('Lab', { id: 'docs.nav.lab' }),
  'docs.route.overview': () => msg('Overview', { id: 'docs.route.overview' }),
  'docs.nav.primary': () => msg('Primary sections', { id: 'docs.nav.primary' }),
  'docs.nav.sections': () => msg('Docs sections', { id: 'docs.nav.sections' }),
  'docs.mobile.toggleTheme': () => msg('Toggle theme', { id: 'docs.mobile.toggleTheme' }),
  'docs.drawer.title': () => msg('Theme controls', { id: 'docs.drawer.title' }),
  'docs.controls.light': () => msg('Light', { id: 'docs.controls.light' }),
  'docs.controls.dark': () => msg('Dark', { id: 'docs.controls.dark' }),
  'docs.controls.blue': () => msg('Blue', { id: 'docs.controls.blue' }),
  'docs.controls.teal': () => msg('Teal', { id: 'docs.controls.teal' }),
  'docs.controls.violet': () => msg('Violet', { id: 'docs.controls.violet' }),
  'docs.controls.accent': () => msg('Accent color', { id: 'docs.controls.accent' }),
  'docs.controls.compact': () => msg('Compact density', { id: 'docs.controls.compact' }),
  'docs.controls.reducedMotion': () => msg('Reduced motion', { id: 'docs.controls.reducedMotion' }),
  'docs.controls.illustration': () => msg('Illustration style', { id: 'docs.controls.illustration' }),
  'docs.toast.ready': () => msg('Rin UI routes, tokens, and components are active.', { id: 'docs.toast.ready' }),
  'docs.home.eyebrow': () => msg('Rin UI v1.1', { id: 'docs.home.eyebrow' }),
  'docs.home.subtitle': () => msg('Web Components UI library for themeable apps.', { id: 'docs.home.subtitle' }),
  'docs.home.lead': () => msg('A Lit-based component system with standard custom elements, token-driven themes, default and illustration skins, routed Markdown guides, and metadata-generated API pages.', { id: 'docs.home.lead' }),
  'docs.home.themeControls': () => msg('Theme controls', { id: 'docs.home.themeControls' }),
  'docs.home.showToast': () => msg('Show toast', { id: 'docs.home.showToast' }),
  'docs.home.strengths': () => msg('Library strengths', { id: 'docs.home.strengths' }),
  'docs.home.frameworkAgnostic': () => msg('Framework agnostic', { id: 'docs.home.frameworkAgnostic' }),
  'docs.home.cssThemes': () => msg('CSS variable themes', { id: 'docs.home.cssThemes' }),
  'docs.home.accessible': () => msg('Accessible interactions', { id: 'docs.home.accessible' }),
  'docs.home.treeShakable': () => msg('Tree-shakable entries', { id: 'docs.home.treeShakable' }),
  'docs.home.preview': () => msg('Interactive component preview', { id: 'docs.home.preview' }),
  'docs.home.token': () => msg('Token', { id: 'docs.home.token' }),
  'docs.home.docs': () => msg('Docs', { id: 'docs.home.docs' }),
  'docs.home.favorite': () => msg('Favorite', { id: 'docs.home.favorite' }),
  'docs.home.search': () => msg('Search components', { id: 'docs.home.search' }),
  'docs.home.searchPlaceholder': () => msg('button, theme, dialog', { id: 'docs.home.searchPlaceholder' }),
  'docs.home.searchHelper': () => msg('Focus, border, and text color follow tokens.', { id: 'docs.home.searchHelper' }),
  'docs.home.radioTitle': () => msg('One source, two skins', { id: 'docs.home.radioTitle' }),
  'docs.home.radioDescription': () => msg('Default and illustration presets share the same Web Component code.', { id: 'docs.home.radioDescription' }),
  'docs.home.primary': () => msg('Primary', { id: 'docs.home.primary' }),
  'docs.home.soft': () => msg('Soft', { id: 'docs.home.soft' }),
  'docs.home.live': () => msg('Live', { id: 'docs.home.live' }),
  'docs.home.install': () => msg('Install', { id: 'docs.home.install' }),
  'docs.home.modelEyebrow': () => msg('Onion model', { id: 'docs.home.modelEyebrow' }),
  'docs.home.modelTitle': () => msg('Home introduces, routes go deep', { id: 'docs.home.modelTitle' }),
  'docs.home.modelCopy': () => msg('The homepage stays thin. Documentation, component API, tokens, and playground routes load only when you open them.', { id: 'docs.home.modelCopy' }),
  'docs.home.guides': () => msg('Guides', { id: 'docs.home.guides' }),
  'docs.home.guidesCopy': () => msg('Install, theme, style presets, framework integration, and quality contracts.', { id: 'docs.home.guidesCopy' }),
  'docs.home.startReading': () => msg('Start reading', { id: 'docs.home.startReading' }),
  'docs.home.library': () => msg('Library', { id: 'docs.home.library' }),
  'docs.home.componentsCopy': () => msg('Browse every public component with previews and metadata-driven API reference.', { id: 'docs.home.componentsCopy' }),
  'docs.home.viewComponents': () => msg('View components', { id: 'docs.home.viewComponents' }),
  'docs.home.system': () => msg('System', { id: 'docs.home.system' }),
  'docs.home.tokensLab': () => msg('Tokens and Lab', { id: 'docs.home.tokensLab' }),
  'docs.home.tokensCopy': () => msg('Inspect token layers or stress-test default and illustration skins in the Theme Lab.', { id: 'docs.home.tokensCopy' }),
  'docs.home.openLab': () => msg('Open lab', { id: 'docs.home.openLab' }),
  'docs.common.none': () => msg('none', { id: 'docs.common.none' }),
  'docs.common.openComponent': () => msg('Open component reference', { id: 'docs.common.openComponent' }),
  'docs.common.attributes': () => msg('Attributes', { id: 'docs.common.attributes' }),
  'docs.common.properties': () => msg('Properties', { id: 'docs.common.properties' }),
  'docs.common.events': () => msg('Events', { id: 'docs.common.events' }),
  'docs.common.slots': () => msg('Slots', { id: 'docs.common.slots' }),
  'docs.common.parts': () => msg('Parts', { id: 'docs.common.parts' }),
  'docs.common.cssProperties': () => msg('CSS custom properties', { id: 'docs.common.cssProperties' }),
  'docs.empty.routeTitle': () => msg('Route not found', { id: 'docs.empty.routeTitle' }),
  'docs.empty.routeDescription': () => msg('This documentation route does not exist.', { id: 'docs.empty.routeDescription' }),
  'docs.empty.backHome': () => msg('Back home', { id: 'docs.empty.backHome' }),
  'docs.empty.guideTitle': () => msg('Guide not found', { id: 'docs.empty.guideTitle' }),
  'docs.empty.guideDescription': () => msg('Open a known documentation route.', { id: 'docs.empty.guideDescription' }),
  'docs.empty.backDocs': () => msg('Back to docs', { id: 'docs.empty.backDocs' }),
  'docs.empty.componentTitle': () => msg('Component not found', { id: 'docs.empty.componentTitle' }),
  'docs.empty.componentDescription': () => msg('Open a known component route.', { id: 'docs.empty.componentDescription' }),
  'docs.empty.backComponents': () => msg('Back to components', { id: 'docs.empty.backComponents' }),
  'docs.components.eyebrow': () => msg('Components', { id: 'docs.components.eyebrow' }),
  'docs.components.title': () => msg('Browse the library surface', { id: 'docs.components.title' }),
  'docs.components.copy': () => msg('Open a component route for usage, attributes, properties, events, slots, parts, and token hooks.', { id: 'docs.components.copy' }),
  'docs.component.eyebrow': () => msg('Component API', { id: 'docs.component.eyebrow' }),
  'docs.tokens.eyebrow': () => msg('Tokens', { id: 'docs.tokens.eyebrow' }),
  'docs.tokens.title': () => msg('Seed, semantic, component', { id: 'docs.tokens.title' }),
  'docs.tokens.copy': () => msg('Rin UI keeps theme replacement behind CSS variables. Components consume semantic and component tokens, while style presets rewrite the surface language.', { id: 'docs.tokens.copy' }),
  'docs.tokens.seed': () => msg('Seed', { id: 'docs.tokens.seed' }),
  'docs.tokens.seedCopy': () => msg('Brand input and motion/radius defaults.', { id: 'docs.tokens.seedCopy' }),
  'docs.tokens.semantic': () => msg('Semantic', { id: 'docs.tokens.semantic' }),
  'docs.tokens.semanticCopy': () => msg('Meaning shared across components.', { id: 'docs.tokens.semanticCopy' }),
  'docs.tokens.component': () => msg('Component', { id: 'docs.tokens.component' }),
  'docs.tokens.componentCopy': () => msg('Per-component override boundary.', { id: 'docs.tokens.componentCopy' }),
  'docs.tokens.coverage': () => msg('Metadata coverage', { id: 'docs.tokens.coverage' }),
  'docs.lab.eyebrow': () => msg('Theme Lab', { id: 'docs.lab.eyebrow' }),
  'docs.lab.title': () => msg('Stress-test the full contract', { id: 'docs.lab.title' }),
  'docs.lab.copy': () => msg('Accent, dark mode, density, motion, and style preset update through the root', { id: 'docs.lab.copy' }),
  'docs.lab.controls': () => msg('Controls', { id: 'docs.lab.controls' }),
  'docs.lab.surface': () => msg('Live surface', { id: 'docs.lab.surface' }),
  'docs.lab.primary': () => msg('Primary action', { id: 'docs.lab.primary' }),
  'docs.lab.soft': () => msg('Soft action', { id: 'docs.lab.soft' }),
  'docs.lab.selected': () => msg('Selected chip', { id: 'docs.lab.selected' }),
  'docs.lab.enabled': () => msg('Enabled', { id: 'docs.lab.enabled' }),
  'docs.lab.currentSkin': () => msg('Current skin', { id: 'docs.lab.currentSkin' }),
  'docs.lab.currentSkinDescription': () => msg('This card follows the current root theme.', { id: 'docs.lab.currentSkinDescription' }),
  'docs.lab.defaultLight': () => msg('Default light', { id: 'docs.lab.defaultLight' }),
  'docs.lab.defaultDark': () => msg('Default dark', { id: 'docs.lab.defaultDark' }),
  'docs.lab.illustrationLight': () => msg('Illustration light', { id: 'docs.lab.illustrationLight' }),
  'docs.lab.illustrationDark': () => msg('Illustration dark', { id: 'docs.lab.illustrationDark' }),
  'docs.group.themeLayout': () => msg('Theme and Layout', { id: 'docs.group.themeLayout' }),
  'docs.group.actionsSelection': () => msg('Actions and Selection', { id: 'docs.group.actionsSelection' }),
  'docs.group.forms': () => msg('Forms', { id: 'docs.group.forms' }),
  'docs.group.feedbackOverlays': () => msg('Feedback and Overlays', { id: 'docs.group.feedbackOverlays' })
};

export function t(source: string, id: string) {
  return docsMessages[id]?.() ?? source;
}

export function currentDocsLocale(): RlLocaleCode {
  const locale = getLocale();
  return isDocsLocale(locale) ? locale : defaultDocsLocale;
}

export function tokenCoverageText(count: number) {
  return msg(str`${count} token hooks are referenced by component metadata.`, { id: 'docs.tokens.coverageCount' });
}

const componentSummaryMessages: Record<string, () => string> = {
  'rl-config': () => msg('Global locale and text-direction boundary powered by @lit/localize.', { id: 'docs.meta.rl-config.summary' }),
  'rl-theme': () => msg('Theme, accent, density, and motion boundary.', { id: 'docs.meta.rl-theme.summary' }),
  'rl-spinner': () => msg('Small loading indicator for async states.', { id: 'docs.meta.rl-spinner.summary' }),
  'rl-illustration': () => msg('Token-driven status illustration.', { id: 'docs.meta.rl-illustration.summary' }),
  'rl-empty': () => msg('Illustration-ready empty state with description and actions.', { id: 'docs.meta.rl-empty.summary' }),
  'rl-result': () => msg('Illustration-ready result feedback for success, error, warnings, and HTTP states.', { id: 'docs.meta.rl-result.summary' }),
  'rl-card': () => msg('Token-driven content container for grouped surfaces.', { id: 'docs.meta.rl-card.summary' }),
  'rl-badge': () => msg('Compact status label for metadata and state.', { id: 'docs.meta.rl-badge.summary' }),
  'rl-button': () => msg('Primary command button.', { id: 'docs.meta.rl-button.summary' }),
  'rl-icon-button': () => msg('Soft icon command button.', { id: 'docs.meta.rl-icon-button.summary' }),
  'rl-chip': () => msg('Selectable tag-like control.', { id: 'docs.meta.rl-chip.summary' }),
  'rl-input': () => msg('Form-associated text input.', { id: 'docs.meta.rl-input.summary' }),
  'rl-switch': () => msg('Form-associated switch control.', { id: 'docs.meta.rl-switch.summary' }),
  'rl-radio-card': () => msg('Radio-like selectable card.', { id: 'docs.meta.rl-radio-card.summary' }),
  'rl-tab-bar': () => msg('Roving-tabindex tablist.', { id: 'docs.meta.rl-tab-bar.summary' }),
  'rl-dialog': () => msg('Modal dialog with focus management.', { id: 'docs.meta.rl-dialog.summary' }),
  'rl-drawer': () => msg('Off-canvas drawer with focus return.', { id: 'docs.meta.rl-drawer.summary' }),
  'rl-toast': () => msg('Temporary feedback toast.', { id: 'docs.meta.rl-toast.summary' }),
  'rl-app-shell': () => msg('Responsive application shell.', { id: 'docs.meta.rl-app-shell.summary' })
};

export function componentSummary(item: RlComponentMetadata) {
  return componentSummaryMessages[item.name]?.() ?? item.summary;
}
