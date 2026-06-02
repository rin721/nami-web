import { docs } from './content';
import { componentGroups, componentSlug } from './component-catalog';

export interface DocsRouteLink {
  path: string;
  label: string;
  shortLabel: string;
  group: 'Home' | 'Docs' | 'Components' | 'System' | 'Playground';
}

export const routeLinks: DocsRouteLink[] = [
  { path: '/', label: 'Overview', shortLabel: 'R', group: 'Home' },
  ...docs.map((doc) => ({
    path: `/docs/${doc.slug}`,
    label: doc.title,
    shortLabel: doc.title.slice(0, 1),
    group: 'Docs' as const
  })),
  { path: '/components', label: 'Components', shortLabel: 'C', group: 'Components' },
  ...componentGroups.flatMap((group) =>
    group.names.map((name) => ({
      path: `/components/${componentSlug(name)}`,
      label: name,
      shortLabel: name.replace(/^rl-/, '').slice(0, 1).toUpperCase(),
      group: 'Components' as const
    }))
  ),
  { path: '/tokens', label: 'Tokens', shortLabel: 'T', group: 'System' },
  { path: '/playground/theme-lab', label: 'Theme Lab', shortLabel: 'P', group: 'Playground' }
];

export const primaryNav = [
  { path: '/', label: 'Home', shortLabel: 'R' },
  { path: '/docs/getting-started', label: 'Docs', shortLabel: 'D' },
  { path: '/components', label: 'Components', shortLabel: 'C' },
  { path: '/tokens', label: 'Tokens', shortLabel: 'T' },
  { path: '/playground/theme-lab', label: 'Lab', shortLabel: 'P' }
];

export function hrefForPath(path: string) {
  return `#${path}`;
}

export function currentPath() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

export function navigate(path: string) {
  window.location.hash = path;
}

export function notifyRouteChange(path = currentPath()) {
  window.dispatchEvent(new CustomEvent('rin-docs-route-change', { detail: { path } }));
}
