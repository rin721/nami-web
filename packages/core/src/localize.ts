import { configureLocalization } from '@lit/localize';
import type { LocaleModule } from '@lit/localize';
import { allLocales, sourceLocale, targetLocales } from './generated/locale-codes';

export { allLocales, sourceLocale, targetLocales };

export type RlLocaleCode = (typeof allLocales)[number];
export type RlTargetLocaleCode = (typeof targetLocales)[number];

const localeLoaders: Record<RlTargetLocaleCode, () => Promise<LocaleModule>> = {
  'zh-CN': () => import('./generated/locales/zh-CN')
};

const localization = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => localeLoaders[locale as RlTargetLocaleCode]()
});

export const getLocale = localization.getLocale;

export function isSupportedLocale(locale: string): locale is RlLocaleCode {
  return (allLocales as readonly string[]).includes(locale);
}

export function normalizeLocale(locale: string | null | undefined): RlLocaleCode {
  return locale && isSupportedLocale(locale) ? locale : sourceLocale;
}

export function setLocale(locale: string) {
  return localization.setLocale(normalizeLocale(locale));
}

