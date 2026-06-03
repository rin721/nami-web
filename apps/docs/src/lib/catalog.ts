import {
  componentAdvancedExample,
  componentAvailability,
  componentBasicExample,
  componentCatalogItemsForGroup,
  componentDisplayName,
  componentFrameworkExample,
  componentGroupDescription,
  componentGroupTitle,
  componentNameFromSlug,
  componentPreview,
  componentSlug,
  componentUseCase,
  namiComponentCatalogGroups,
  namiComponentCatalogItems,
  namiComponentExamples,
  namiPlannedComponentCatalog,
  namiComponentPreviews,
  namiMetadataByName
} from '@nami/ui/catalog';
import { namiComponentMetadata } from '@nami/ui/metadata';
import type { DocsLocale } from './site';

export const componentGroups = namiComponentCatalogGroups;
export const componentPreviews = namiComponentPreviews;
export const metadataByName = namiMetadataByName;

export function groupTitle(group: (typeof componentGroups)[number], locale: DocsLocale) {
  return componentGroupTitle(group, locale);
}

export function groupDescription(group: (typeof componentGroups)[number], locale: DocsLocale) {
  return componentGroupDescription(group, locale);
}

export function componentPath(locale: DocsLocale, name: string) {
  return `/${locale}/components/${componentSlug(name)}/`;
}

export {
  componentAdvancedExample,
  componentAvailability,
  componentBasicExample,
  componentCatalogItemsForGroup,
  componentDisplayName,
  componentFrameworkExample,
  componentNameFromSlug,
  componentPreview,
  componentSlug,
  componentUseCase,
  namiComponentCatalogItems,
  namiComponentExamples,
  namiPlannedComponentCatalog,
  namiComponentMetadata
};
