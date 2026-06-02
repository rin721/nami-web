export interface RlComponentMetadata {
  name: string;
  summary: string;
  usage: string;
  attributes: string[];
  properties: string[];
  events: string[];
  slots: string[];
  parts: string[];
  tokens: string[];
}

export const rlComponentMetadata: RlComponentMetadata[] = [
  {
    name: 'rl-theme',
    summary: 'Theme, accent, density, and motion boundary.',
    usage: '<rl-theme theme="light" style-preset="illustration" accent="#3b82f6"><slot /></rl-theme>',
    attributes: ['theme', 'accent', 'density', 'motion', 'style-preset'],
    properties: ['theme', 'accent', 'density', 'motion', 'stylePreset'],
    events: [],
    slots: ['default'],
    parts: [],
    tokens: ['--rl-accent-50', '--rl-surface', '--rl-text', '--rl-focus-ring', '--rl-style-stroke-width', '--rl-style-offset-shadow']
  },
  {
    name: 'rl-spinner',
    summary: 'Small loading indicator for async states.',
    usage: '<rl-spinner size="sm" label="Loading"></rl-spinner>',
    attributes: ['size', 'label'],
    properties: ['size', 'label'],
    events: [],
    slots: [],
    parts: ['base', 'indicator'],
    tokens: ['--rl-motion-fast', '--rl-text']
  },
  {
    name: 'rl-illustration',
    summary: 'Token-driven status illustration.',
    usage: '<rl-illustration name="empty" size="md"></rl-illustration>',
    attributes: ['name', 'size'],
    properties: ['name', 'size'],
    events: [],
    slots: [],
    parts: ['base', 'illustration', 'image'],
    tokens: ['--rl-illus-primary', '--rl-illus-secondary', '--rl-illus-accent', '--rl-illus-muted', '--rl-illus-line', '--rl-illus-bg']
  },
  {
    name: 'rl-empty',
    summary: 'Ant-style empty state with illustration, description, and actions.',
    usage: '<rl-empty title="No results" description="Try another keyword"><rl-button slot="actions">Create</rl-button></rl-empty>',
    attributes: ['illustration', 'title', 'description', 'compact'],
    properties: ['illustration', 'title', 'description', 'compact'],
    events: [],
    slots: ['illustration', 'title', 'description', 'actions'],
    parts: ['base', 'illustration', 'title', 'description', 'actions'],
    tokens: ['--rl-empty-gap', '--rl-empty-title-color', '--rl-empty-description-color']
  },
  {
    name: 'rl-result',
    summary: 'Ant-style result feedback for success, error, warnings, and HTTP states.',
    usage: '<rl-result status="success" title="Done" sub-title="Everything is ready"><rl-button slot="actions">Continue</rl-button></rl-result>',
    attributes: ['status', 'title', 'sub-title', 'compact'],
    properties: ['status', 'title', 'subTitle', 'compact'],
    events: [],
    slots: ['illustration', 'title', 'description', 'actions', 'body'],
    parts: ['base', 'illustration', 'title', 'description', 'actions', 'body'],
    tokens: ['--rl-result-title-size', '--rl-result-subtitle-size', '--rl-result-gap', '--rl-result-actions-margin']
  },
  {
    name: 'rl-button',
    summary: 'Primary command button.',
    usage: '<rl-button variant="soft" loading>Save</rl-button>',
    attributes: ['variant', 'size', 'disabled', 'loading', 'type'],
    properties: ['variant', 'size', 'disabled', 'loading', 'type'],
    events: ['rl-click'],
    slots: ['default', 'icon', 'actions'],
    parts: ['base', 'control', 'icon', 'label', 'indicator'],
    tokens: ['--rl-button-bg', '--rl-button-fg', '--rl-button-border', '--rl-button-hover-bg']
  },
  {
    name: 'rl-icon-button',
    summary: 'Soft icon command button.',
    usage: '<rl-icon-button label="Favorite" selected><span slot="icon">F</span></rl-icon-button>',
    attributes: ['label', 'size', 'disabled', 'selected', 'loading'],
    properties: ['label', 'size', 'disabled', 'selected', 'loading'],
    events: ['rl-click'],
    slots: ['default', 'icon'],
    parts: ['base', 'control', 'icon'],
    tokens: ['--rl-icon-button-size', '--rl-hover-overlay', '--rl-ripple']
  },
  {
    name: 'rl-chip',
    summary: 'Selectable tag-like control.',
    usage: '<rl-chip checkbox selected value="tag">Tag</rl-chip>',
    attributes: ['value', 'selected', 'checkbox', 'disabled'],
    properties: ['value', 'selected', 'checkbox', 'disabled'],
    events: ['rl-change', 'rl-select'],
    slots: ['default', 'icon'],
    parts: ['base', 'control', 'icon', 'label'],
    tokens: ['--rl-chip-bg', '--rl-chip-selected-bg']
  },
  {
    name: 'rl-input',
    summary: 'Form-associated text input.',
    usage: '<rl-input label="Search" helper-text="Token driven"></rl-input>',
    attributes: ['name', 'value', 'default-value', 'type', 'placeholder', 'label', 'helper-text', 'error', 'disabled', 'required'],
    properties: ['name', 'value', 'defaultValue', 'type', 'placeholder', 'label', 'helperText', 'error', 'disabled', 'required'],
    events: ['rl-input', 'rl-change'],
    slots: ['icon', 'actions'],
    parts: ['base', 'control', 'label', 'description', 'error'],
    tokens: ['--rl-input-bg', '--rl-input-border', '--rl-focus-ring']
  },
  {
    name: 'rl-switch',
    summary: 'Form-associated switch control.',
    usage: '<rl-switch checked>Enabled</rl-switch>',
    attributes: ['name', 'value', 'checked', 'disabled'],
    properties: ['name', 'value', 'checked', 'disabled'],
    events: ['rl-change'],
    slots: ['default'],
    parts: ['base', 'control', 'indicator', 'label'],
    tokens: ['--rl-color-primary', '--rl-border', '--rl-focus-ring']
  },
  {
    name: 'rl-radio-card',
    summary: 'Radio-like selectable card.',
    usage: '<rl-radio-card selected label="Blue" description="Default"></rl-radio-card>',
    attributes: ['value', 'label', 'description', 'selected', 'disabled'],
    properties: ['value', 'label', 'description', 'selected', 'disabled'],
    events: ['rl-select', 'rl-change'],
    slots: ['icon', 'label', 'description', 'actions'],
    parts: ['base', 'control', 'indicator', 'icon', 'label', 'description'],
    tokens: ['--rl-surface-raised', '--rl-color-primary', '--rl-focus-ring']
  },
  {
    name: 'rl-tab-bar',
    summary: 'Roving-tabindex tablist.',
    usage: '<rl-tab-bar value="Overview"><button value="Overview">Overview</button></rl-tab-bar>',
    attributes: ['value', 'orientation'],
    properties: ['value', 'orientation'],
    events: ['rl-select', 'rl-change'],
    slots: ['default'],
    parts: ['base'],
    tokens: ['--rl-accent-hover-overlay', '--rl-color-primary']
  },
  {
    name: 'rl-dialog',
    summary: 'Modal dialog with focus management.',
    usage: '<rl-dialog open label="Settings">Content</rl-dialog>',
    attributes: ['open', 'label', 'close-on-backdrop'],
    properties: ['open', 'label', 'closeOnBackdrop'],
    events: ['rl-open', 'rl-close'],
    slots: ['default', 'label', 'actions'],
    parts: ['base', 'control', 'label', 'description', 'actions', 'header', 'footer'],
    tokens: ['--rl-dialog-shadow', '--rl-surface-raised', '--rl-border']
  },
  {
    name: 'rl-drawer',
    summary: 'Off-canvas drawer with focus return.',
    usage: '<rl-drawer open placement="left">Content</rl-drawer>',
    attributes: ['open', 'placement'],
    properties: ['open', 'placement'],
    events: ['rl-open', 'rl-close'],
    slots: ['default', 'label', 'actions'],
    parts: ['base', 'control', 'backdrop', 'label'],
    tokens: ['--rl-drawer-shadow', '--rl-surface-overlay', '--rl-border']
  },
  {
    name: 'rl-toast',
    summary: 'Temporary feedback toast.',
    usage: 'RlToast.show({ message: "Saved", variant: "success" })',
    attributes: ['open', 'message', 'variant', 'placement', 'duration'],
    properties: ['open', 'message', 'variant', 'placement', 'duration'],
    events: ['rl-open', 'rl-close'],
    slots: ['default', 'icon'],
    parts: ['base', 'indicator', 'label', 'actions'],
    tokens: ['--rl-toast-bg', '--rl-dialog-shadow', '--rl-border']
  },
  {
    name: 'rl-app-shell',
    summary: 'Responsive application shell.',
    usage: '<rl-app-shell><div slot="rail"></div><main></main></rl-app-shell>',
    attributes: [],
    properties: [],
    events: [],
    slots: ['default', 'rail', 'top', 'bottom'],
    parts: ['base', 'rail', 'top', 'bottom', 'control'],
    tokens: ['--rl-surface', '--rl-surface-overlay', '--rl-border']
  }
];
