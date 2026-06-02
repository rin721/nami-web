import { docsForLocale } from './content';
import { componentGroups, componentSlug } from './component-catalog';
import { defaultDocsLocale, isDocsLocale, t, type RlLocaleCode } from './i18n';

export interface DocsRouteLink {
  path: string;
  label: string;
  shortLabel: string;
  group: 'Home' | 'Docs' | 'Components' | 'System' | 'Playground';
}

export interface DocsRouteState {
  locale: RlLocaleCode;
  path: string;
  needsRedirect: boolean;
}

function normalizeLogicalPath(path: string) {
  const value = path.startsWith('/') ? path : `/${path}`;
  return value === '//' ? '/' : value;
}

export function routeLinks(locale = currentLocale()): DocsRouteLink[] {
  return [
  { path: '/', label: t('Overview', 'docs.route.overview'), shortLabel: 'R', group: 'Home' },
  ...docsForLocale(locale).map((doc) => ({
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
  { path: '/tokens', label: t('Tokens', 'docs.nav.tokens'), shortLabel: 'T', group: 'System' },
  { path: '/playground/theme-lab', label: t('Theme Lab', 'docs.nav.lab'), shortLabel: 'P', group: 'Playground' }
  ];
}

export function primaryNav() {
  return [
    { path: '/', label: t('Home', 'docs.nav.home'), shortLabel: 'R' },
    { path: '/docs/getting-started', label: t('Docs', 'docs.nav.docs'), shortLabel: 'D' },
    { path: '/components', label: t('Components', 'docs.nav.components'), shortLabel: 'C' },
    { path: '/tokens', label: t('Tokens', 'docs.nav.tokens'), shortLabel: 'T' },
    { path: '/playground/theme-lab', label: t('Lab', 'docs.nav.lab'), shortLabel: 'P' }
  ];
}

export function currentRoute(): DocsRouteState {
  const hash = window.location.hash.replace(/^#/, '');
  const rawPath = normalizeLogicalPath(hash || '/');
  const [, first, ...rest] = rawPath.split('/');
  if (isDocsLocale(first)) {
    return {
      locale: first,
      path: normalizeLogicalPath(rest.join('/') || '/'),
      needsRedirect: false
    };
  }
  return {
    locale: defaultDocsLocale,
    path: rawPath,
    needsRedirect: true
  };
}

export function hrefForPath(path: string, locale = currentLocale()) {
  const normalized = normalizeLogicalPath(path);
  return `#/${locale}${normalized === '/' ? '/' : normalized}`;
}

export function currentPath() {
  return currentRoute().path;
}

export function currentLocale() {
  return currentRoute().locale;
}

export function navigate(path: string, locale = currentLocale()) {
  window.location.hash = hrefForPath(path, locale).slice(1);
}

export function notifyRouteChange(route = currentRoute()) {
  window.dispatchEvent(new CustomEvent('rin-docs-route-change', { detail: route }));
}
