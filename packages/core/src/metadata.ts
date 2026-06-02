export interface NamiComponentMetadata {
  name: string;
  category: 'configuration' | 'layout' | 'action' | 'selection' | 'form' | 'feedback' | 'overlay' | 'status';
  summary: string;
  usage: string;
  attributes: string[];
  properties: string[];
  events: string[];
  slots: string[];
  parts: string[];
  tokens: string[];
  anatomy: NamiComponentAnatomyPart[];
  states: string[];
  styleHooks: NamiComponentStyleHook[];
}

export interface NamiComponentAnatomyPart {
  part: string;
  description: string;
}

export interface NamiComponentStyleHook {
  part: string;
  state: string;
  tokens: string[];
}

type NamiComponentMetadataSource = Omit<NamiComponentMetadata, 'category' | 'anatomy' | 'states' | 'styleHooks'> &
  Partial<Pick<NamiComponentMetadata, 'category' | 'anatomy' | 'states' | 'styleHooks'>>;

const namiComponentMetadataSource: NamiComponentMetadataSource[] = [
  {
    name: 'nami-config',
    summary: 'Global locale and text-direction boundary powered by @lit/localize.',
    usage: '<nami-config locale="zh-CN"><nami-empty></nami-empty></nami-config>',
    attributes: ['locale', 'dir'],
    properties: ['locale', 'dir'],
    events: ['nami-change', 'nami-locale-status'],
    slots: ['default'],
    parts: [],
    tokens: []
  },
  {
    name: 'nami-theme',
    summary: 'Theme, accent, density, motion, radius, contrast, and style preset boundary.',
    usage: '<nami-theme theme="light" style-preset="illustration" accent="#3b82f6" radius="soft" contrast="high"><slot /></nami-theme>',
    attributes: ['theme', 'accent', 'density', 'motion', 'style-preset', 'radius', 'contrast'],
    properties: ['theme', 'accent', 'density', 'motion', 'stylePreset', 'radius', 'contrast'],
    events: [],
    slots: ['default'],
    parts: [],
    tokens: ['--nami-accent-50', '--nami-contrast-level', '--nami-surface', '--nami-text', '--nami-focus-ring', '--nami-overlay-backdrop', '--nami-style-stroke-width', '--nami-style-ink-color', '--nami-style-on-paper', '--nami-style-on-paper-muted', '--nami-style-offset-shadow', '--nami-style-control-bg', '--nami-style-panel-bg', '--nami-style-background-pattern', '--nami-style-doodle-opacity', '--nami-style-paper-line-color']
  },
  {
    name: 'nami-spinner',
    summary: 'Small loading indicator for async states.',
    usage: '<nami-spinner size="sm" label="Loading"></nami-spinner>',
    attributes: ['size', 'label'],
    properties: ['size', 'label'],
    events: [],
    slots: [],
    parts: ['base', 'indicator'],
    tokens: ['--nami-motion-fast', '--nami-text', '--nami-spinner-track-color']
  },
  {
    name: 'nami-page-transition',
    summary: 'Framework-hook driven page transition for route progress, first-paint reveal, and blocking tasks.',
    usage: '<nami-page-transition appearance="bar" progress="64" active></nami-page-transition>',
    attributes: ['active', 'label', 'variant', 'tone', 'appearance', 'duration', 'progress'],
    properties: ['active', 'label', 'variant', 'tone', 'appearance', 'duration', 'progress', 'show()', 'hide()', 'waitFor()'],
    events: [],
    slots: ['default', 'icon'],
    parts: ['base', 'track', 'indicator', 'brand', 'panel', 'label'],
    tokens: ['--nami-motion-fast', '--nami-motion-normal', '--nami-surface', '--nami-surface-overlay', '--nami-text', '--nami-color-primary', '--nami-border', '--nami-dialog-border-width', '--nami-dialog-radius', '--nami-dialog-shadow', '--nami-spinner-track-color', '--nami-style-background-pattern', '--nami-style-stroke-width'],
    category: 'feedback',
    states: ['default', 'loading', 'active']
  },
  {
    name: 'nami-illustration',
    summary: 'Token-driven status illustration.',
    usage: '<nami-illustration name="empty" size="md"></nami-illustration>',
    attributes: ['name', 'size'],
    properties: ['name', 'size'],
    events: [],
    slots: [],
    parts: ['base', 'illustration', 'image'],
    tokens: ['--nami-illus-primary', '--nami-illus-secondary', '--nami-illus-accent', '--nami-illus-muted', '--nami-illus-line', '--nami-illus-bg']
  },
  {
    name: 'nami-empty',
    summary: 'Illustration-ready empty state with description and actions.',
    usage: '<nami-empty title="No results" description="Try another keyword"><nami-button slot="actions">Create</nami-button></nami-empty>',
    attributes: ['illustration', 'title', 'description', 'compact'],
    properties: ['illustration', 'title', 'description', 'compact'],
    events: [],
    slots: ['illustration', 'title', 'description', 'actions'],
    parts: ['base', 'illustration', 'title', 'description', 'actions'],
    tokens: ['--nami-empty-gap', '--nami-empty-title-color', '--nami-empty-description-color', '--nami-empty-bg', '--nami-empty-border-width', '--nami-empty-border-color', '--nami-empty-radius', '--nami-empty-shadow']
  },
  {
    name: 'nami-result',
    summary: 'Illustration-ready result feedback for success, error, warnings, and HTTP states.',
    usage: '<nami-result status="success" title="Done" sub-title="Everything is ready"><nami-button slot="actions">Continue</nami-button></nami-result>',
    attributes: ['status', 'title', 'sub-title', 'compact'],
    properties: ['status', 'title', 'subTitle', 'compact'],
    events: [],
    slots: ['illustration', 'title', 'description', 'actions', 'body'],
    parts: ['base', 'illustration', 'title', 'description', 'actions', 'body'],
    tokens: ['--nami-result-title-size', '--nami-result-subtitle-size', '--nami-result-gap', '--nami-result-actions-margin', '--nami-result-bg', '--nami-result-border-width', '--nami-result-border-color', '--nami-result-radius', '--nami-result-shadow']
  },
  {
    name: 'nami-card',
    summary: 'Token-driven content container for grouped surfaces.',
    usage: '<nami-card><h3 slot="header">Title</h3><p>Content</p><nami-button slot="actions">Action</nami-button></nami-card>',
    attributes: ['variant'],
    properties: ['variant'],
    events: [],
    slots: ['default', 'header', 'actions', 'footer'],
    parts: ['base', 'header', 'body', 'actions', 'footer'],
    tokens: ['--nami-card-bg', '--nami-card-fg', '--nami-card-inset-bg', '--nami-card-border', '--nami-card-border-width', '--nami-card-radius', '--nami-card-shadow', '--nami-card-padding', '--nami-card-gap']
  },
  {
    name: 'nami-badge',
    summary: 'Compact status label for metadata and state.',
    usage: '<nami-badge variant="primary">Token driven</nami-badge>',
    attributes: ['variant', 'tone'],
    properties: ['variant', 'tone'],
    events: [],
    slots: ['default'],
    parts: ['base'],
    tokens: ['--nami-badge-bg', '--nami-badge-fg', '--nami-badge-border', '--nami-badge-border-width', '--nami-badge-radius', '--nami-badge-height', '--nami-badge-font-size', '--nami-badge-padding-x']
  },
  {
    name: 'nami-button',
    summary: 'Primary command button.',
    usage: '<nami-button variant="soft" loading>Save</nami-button>',
    attributes: ['variant', 'size', 'disabled', 'loading', 'type'],
    properties: ['variant', 'size', 'disabled', 'loading', 'type'],
    events: ['nami-click'],
    slots: ['default', 'icon', 'actions'],
    parts: ['base', 'control', 'icon', 'label', 'indicator'],
    tokens: ['--nami-button-bg', '--nami-button-fg', '--nami-button-border', '--nami-button-border-width', '--nami-button-radius', '--nami-button-shadow', '--nami-button-hover-bg']
  },
  {
    name: 'nami-icon-button',
    summary: 'Soft icon command button.',
    usage: '<nami-icon-button label="Favorite" selected><span slot="icon">F</span></nami-icon-button>',
    attributes: ['label', 'size', 'disabled', 'selected', 'loading'],
    properties: ['label', 'size', 'disabled', 'selected', 'loading'],
    events: ['nami-click'],
    slots: ['default', 'icon'],
    parts: ['base', 'control', 'icon'],
    tokens: ['--nami-icon-button-size', '--nami-soft-control-bg', '--nami-soft-control-color', '--nami-soft-control-border-width', '--nami-soft-control-border-color', '--nami-hover-overlay', '--nami-ripple']
  },
  {
    name: 'nami-chip',
    summary: 'Selectable tag-like control.',
    usage: '<nami-chip checkbox selected value="tag">Tag</nami-chip>',
    attributes: ['value', 'selected', 'checkbox', 'disabled'],
    properties: ['value', 'selected', 'checkbox', 'disabled'],
    events: ['nami-change', 'nami-select'],
    slots: ['default', 'icon'],
    parts: ['base', 'control', 'icon', 'label'],
    tokens: ['--nami-chip-bg', '--nami-chip-selected-bg', '--nami-chip-border-width', '--nami-chip-border-color', '--nami-chip-radius', '--nami-chip-shadow']
  },
  {
    name: 'nami-input',
    summary: 'Form-associated text input.',
    usage: '<nami-input label="Search" helper-text="Token driven"></nami-input>',
    attributes: ['name', 'value', 'default-value', 'type', 'placeholder', 'label', 'helper-text', 'error', 'disabled', 'required'],
    properties: ['name', 'value', 'defaultValue', 'type', 'placeholder', 'label', 'helperText', 'error', 'disabled', 'required'],
    events: ['nami-input', 'nami-change'],
    slots: ['icon', 'actions'],
    parts: ['base', 'control', 'label', 'description', 'error'],
    tokens: ['--nami-input-bg', '--nami-input-border', '--nami-input-border-width', '--nami-input-radius', '--nami-input-shadow', '--nami-focus-ring']
  },
  {
    name: 'nami-switch',
    summary: 'Form-associated switch control.',
    usage: '<nami-switch checked>Enabled</nami-switch>',
    attributes: ['name', 'value', 'checked', 'disabled'],
    properties: ['name', 'value', 'checked', 'disabled'],
    events: ['nami-change'],
    slots: ['default'],
    parts: ['base', 'control', 'indicator', 'label'],
    tokens: ['--nami-switch-track-bg', '--nami-switch-border-width', '--nami-switch-border-color', '--nami-switch-thumb-bg', '--nami-switch-thumb-shadow', '--nami-color-primary', '--nami-border', '--nami-focus-ring']
  },
  {
    name: 'nami-radio-card',
    summary: 'Radio-like selectable card.',
    usage: '<nami-radio-card selected label="Blue" description="Default"></nami-radio-card>',
    attributes: ['value', 'label', 'description', 'selected', 'disabled'],
    properties: ['value', 'label', 'description', 'selected', 'disabled'],
    events: ['nami-select', 'nami-change'],
    slots: ['icon', 'label', 'description', 'actions'],
    parts: ['base', 'control', 'indicator', 'icon', 'label', 'description'],
    tokens: ['--nami-radio-card-bg', '--nami-radio-card-border-width', '--nami-radio-card-border-color', '--nami-radio-card-radius', '--nami-radio-card-shadow', '--nami-radio-card-selected-shadow', '--nami-surface-raised', '--nami-color-primary', '--nami-focus-ring']
  },
  {
    name: 'nami-tab-bar',
    summary: 'Roving-tabindex tablist.',
    usage: '<nami-tab-bar value="Overview"><button value="Overview">Overview</button></nami-tab-bar>',
    attributes: ['value', 'orientation'],
    properties: ['value', 'orientation'],
    events: ['nami-select', 'nami-change'],
    slots: ['default'],
    parts: ['base'],
    tokens: ['--nami-tab-bg', '--nami-tab-border-width', '--nami-tab-border-color', '--nami-tab-radius', '--nami-accent-hover-overlay', '--nami-color-primary']
  },
  {
    name: 'nami-dialog',
    summary: 'Modal dialog with focus management.',
    usage: '<nami-dialog open label="Settings">Content</nami-dialog>',
    attributes: ['open', 'label', 'close-on-backdrop'],
    properties: ['open', 'label', 'closeOnBackdrop'],
    events: ['nami-open', 'nami-close'],
    slots: ['default', 'label', 'actions'],
    parts: ['base', 'control', 'label', 'description', 'actions', 'header', 'footer'],
    tokens: ['--nami-dialog-bg', '--nami-dialog-border-width', '--nami-dialog-border-color', '--nami-dialog-radius', '--nami-dialog-shadow', '--nami-overlay-backdrop', '--nami-surface-raised', '--nami-border']
  },
  {
    name: 'nami-drawer',
    summary: 'Off-canvas drawer with focus return.',
    usage: '<nami-drawer open placement="left">Content</nami-drawer>',
    attributes: ['open', 'placement'],
    properties: ['open', 'placement'],
    events: ['nami-open', 'nami-close'],
    slots: ['default', 'label', 'actions'],
    parts: ['base', 'control', 'backdrop', 'label'],
    tokens: ['--nami-drawer-bg', '--nami-drawer-border-width', '--nami-drawer-border-color', '--nami-drawer-shadow', '--nami-overlay-backdrop', '--nami-surface-overlay', '--nami-border']
  },
  {
    name: 'nami-toast',
    summary: 'Temporary feedback toast.',
    usage: 'NamiToast.show({ message: "Saved", variant: "success" })',
    attributes: ['open', 'message', 'variant', 'placement', 'duration'],
    properties: ['open', 'message', 'variant', 'placement', 'duration'],
    events: ['nami-open', 'nami-close'],
    slots: ['default', 'icon'],
    parts: ['base', 'indicator', 'label', 'actions'],
    tokens: ['--nami-toast-bg', '--nami-toast-border-width', '--nami-toast-border-color', '--nami-toast-radius', '--nami-dialog-shadow', '--nami-border']
  },
  {
    name: 'nami-app-shell',
    summary: 'Responsive application shell.',
    usage: '<nami-app-shell><div slot="rail"></div><main></main></nami-app-shell>',
    attributes: [],
    properties: [],
    events: [],
    slots: ['default', 'rail', 'top', 'bottom'],
    parts: ['base', 'rail', 'top', 'bottom', 'control'],
    tokens: ['--nami-app-shell-border-width', '--nami-app-shell-shadow', '--nami-surface', '--nami-surface-overlay', '--nami-border', '--nami-style-background-pattern']
  }
];

const categoryByName = new Map<string, NamiComponentMetadata['category']>([
  ['nami-config', 'configuration'],
  ['nami-theme', 'configuration'],
  ['nami-app-shell', 'layout'],
  ['nami-card', 'layout'],
  ['nami-button', 'action'],
  ['nami-icon-button', 'action'],
  ['nami-badge', 'status'],
  ['nami-chip', 'selection'],
  ['nami-tab-bar', 'selection'],
  ['nami-input', 'form'],
  ['nami-switch', 'form'],
  ['nami-radio-card', 'form'],
  ['nami-spinner', 'feedback'],
  ['nami-page-transition', 'feedback'],
  ['nami-illustration', 'feedback'],
  ['nami-empty', 'feedback'],
  ['nami-result', 'feedback'],
  ['nami-dialog', 'overlay'],
  ['nami-drawer', 'overlay'],
  ['nami-toast', 'overlay']
]);

const baseStatesByCategory: Record<NamiComponentMetadata['category'], string[]> = {
  configuration: ['default'],
  layout: ['default'],
  action: ['default', 'hover', 'active', 'focus-visible', 'disabled', 'loading'],
  selection: ['default', 'hover', 'active', 'focus-visible', 'disabled', 'selected'],
  form: ['default', 'hover', 'active', 'focus-visible', 'disabled', 'checked', 'selected', 'error'],
  feedback: ['default', 'loading'],
  overlay: ['default', 'open', 'focus-visible'],
  status: ['default']
};

const partDescriptions = new Map<string, string>([
  ['base', 'Stable outer style surface exposed through CSS Parts.'],
  ['control', 'Interactive control surface that receives state styling.'],
  ['label', 'Primary readable label content.'],
  ['description', 'Secondary explanatory content.'],
  ['indicator', 'Visual state indicator such as spinner, thumb, or marker.'],
  ['icon', 'Icon slot or visual symbol area.'],
  ['actions', 'Action slot or grouped command area.'],
  ['backdrop', 'Overlay backdrop surface.'],
  ['header', 'Header region for title or leading content.'],
  ['footer', 'Footer region for secondary content.'],
  ['body', 'Main content region.'],
  ['track', 'Progress track for route and reveal transitions.'],
  ['brand', 'Brand mark region for first-paint reveal transitions.'],
  ['panel', 'Raised inner surface for grouped transition content.'],
  ['illustration', 'Illustration container.'],
  ['image', 'Rendered illustration artwork.'],
  ['error', 'Validation or error message region.'],
  ['rail', 'Desktop navigation rail slot.'],
  ['top', 'Mobile top navigation slot.'],
  ['bottom', 'Mobile bottom navigation slot.']
]);

function anatomyForParts(parts: string[]): NamiComponentAnatomyPart[] {
  return parts.map((part) => ({
    part,
    description: partDescriptions.get(part) ?? 'Named style part exposed as public component anatomy.'
  }));
}

function tokensForState(tokens: string[], state: string) {
  if (state === 'focus-visible') return tokens.filter((token) => token.includes('focus') || token.includes('ring'));
  if (state === 'selected' || state === 'checked') return tokens.filter((token) => token.includes('selected') || token.includes('primary') || token.includes('checked'));
  if (state === 'hover') return tokens.filter((token) => token.includes('hover'));
  if (state === 'loading') return tokens.filter((token) => token.includes('spinner') || token.includes('motion'));
  if (state === 'open') return tokens.filter((token) => token.includes('dialog') || token.includes('drawer') || token.includes('toast') || token.includes('overlay'));
  if (state === 'error') return tokens.filter((token) => token.includes('error') || token.includes('danger'));
  return tokens;
}

function styleHooksFor(item: NamiComponentMetadataSource, states: string[]): NamiComponentStyleHook[] {
  const basePart = item.parts.includes('control') ? 'control' : item.parts[0] ?? 'base';
  return states
    .map((state) => ({
      part: basePart,
      state,
      tokens: tokensForState(item.tokens, state)
    }))
    .filter((hook) => hook.tokens.length > 0);
}

export const namiComponentMetadata: NamiComponentMetadata[] = namiComponentMetadataSource.map((item) => {
  const category = item.category ?? categoryByName.get(item.name) ?? 'status';
  const states = item.states ?? baseStatesByCategory[category];
  return {
    ...item,
    category,
    anatomy: item.anatomy ?? anatomyForParts(item.parts),
    states,
    styleHooks: item.styleHooks ?? styleHooksFor(item, states)
  };
});
