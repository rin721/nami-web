import { rlComponentMetadata } from '@rin-labs/ui';
import { t } from './i18n';

export const componentGroups = [
  { id: 'themeLayout', title: 'Theme and Layout', names: ['rl-config', 'rl-theme', 'rl-app-shell', 'rl-card'] },
  { id: 'actionsSelection', title: 'Actions and Selection', names: ['rl-button', 'rl-icon-button', 'rl-badge', 'rl-chip', 'rl-tab-bar'] },
  { id: 'forms', title: 'Forms', names: ['rl-input', 'rl-switch', 'rl-radio-card'] },
  { id: 'feedbackOverlays', title: 'Feedback and Overlays', names: ['rl-spinner', 'rl-dialog', 'rl-drawer', 'rl-toast', 'rl-illustration', 'rl-empty', 'rl-result'] }
];

export function componentGroupTitle(group: { id: string; title: string }) {
  return t(group.title, `docs.group.${group.id}`);
}

export const componentPreviews = new Map<string, string>([
  ['rl-config', '<rl-config locale="zh-CN"><rl-empty compact></rl-empty></rl-config>'],
  ['rl-theme', '<rl-theme accent="#14b8a6" style-preset="illustration"><rl-button>Scoped theme</rl-button></rl-theme>'],
  ['rl-app-shell', '<div class="mini-shell"><span>Rail</span><strong>App shell</strong><small>Responsive layout slots</small></div>'],
  ['rl-card', '<rl-card><rl-badge slot="header" variant="primary">Card</rl-badge><p>Grouped content surface.</p></rl-card>'],
  ['rl-button', '<rl-button>Primary</rl-button><rl-button variant="soft">Soft</rl-button>'],
  ['rl-icon-button', '<rl-icon-button label="Favorite" selected><span slot="icon">F</span></rl-icon-button>'],
  ['rl-badge', '<rl-badge variant="primary">Primary</rl-badge><rl-badge variant="success" tone="solid">Stable</rl-badge>'],
  ['rl-chip', '<rl-chip checkbox selected value="docs">Docs</rl-chip><rl-chip checkbox value="theme">Theme</rl-chip>'],
  ['rl-tab-bar', '<rl-tab-bar value="Overview"><button value="Overview">Overview</button><button value="API">API</button></rl-tab-bar>'],
  ['rl-input', '<rl-input label="Search" placeholder="Try a token name"><span slot="icon">/</span></rl-input>'],
  ['rl-switch', '<rl-switch checked>Enabled</rl-switch>'],
  ['rl-radio-card', '<rl-radio-card selected label="Token driven" description="Selected state follows accent."></rl-radio-card>'],
  ['rl-spinner', '<rl-spinner size="md" label="Loading"></rl-spinner>'],
  ['rl-dialog', '<rl-button variant="soft">Dialog trigger</rl-button>'],
  ['rl-drawer', '<rl-button variant="soft">Drawer trigger</rl-button>'],
  ['rl-toast', '<rl-button variant="soft">Toast API</rl-button>'],
  ['rl-illustration', '<rl-illustration name="search" size="sm"></rl-illustration>'],
  ['rl-empty', '<rl-empty title="No results" description="Try changing filters." compact></rl-empty>'],
  ['rl-result', '<rl-result status="success" title="Ready" sub-title="The component rendered." compact></rl-result>']
]);

export const metadataByName = new Map(rlComponentMetadata.map((item) => [item.name, item]));

export function componentSlug(name: string) {
  return name.replace(/^rl-/, '');
}

export function componentNameFromSlug(slug: string) {
  return slug.startsWith('rl-') ? slug : `rl-${slug}`;
}
