import { configureLocalization } from '@lit/localize';
import type { LocaleModule } from '@lit/localize';
import { allLocales, sourceLocale, targetLocales } from './generated/locale-codes';

export { allLocales, sourceLocale, targetLocales };

export type NamiLocaleCode = (typeof allLocales)[number];
export type NamiTargetLocaleCode = (typeof targetLocales)[number];

const localeLoaders: Record<NamiTargetLocaleCode, () => Promise<LocaleModule>> = {
  'zh-CN': () => import('./generated/locales/zh-CN')
};

type NamiLocalization = ReturnType<typeof configureLocalization>;

const localizationStore = globalThis as typeof globalThis & {
  __namiLocalization?: NamiLocalization;
};

const localization = localizationStore.__namiLocalization ??= configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => localeLoaders[locale as NamiTargetLocaleCode]()
});

export const getLocale = localization.getLocale;

export function isSupportedLocale(locale: string): locale is NamiLocaleCode {
  return (allLocales as readonly string[]).includes(locale);
}

export function normalizeLocale(locale: string | null | undefined): NamiLocaleCode {
  return locale && isSupportedLocale(locale) ? locale : sourceLocale;
}

export function setLocale(locale: string) {
  return localization.setLocale(normalizeLocale(locale));
}
