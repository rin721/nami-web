export type NamiThemeMode = 'light' | 'dark' | 'system';
export type NamiDensity = 'comfortable' | 'compact';
export type NamiMotion = 'normal' | 'reduced';
export type NamiStylePreset = 'default' | 'illustration' | 'ant-illustration';

export const defaultAccent = '#3b82f6';

export function themeAttributes(options: {
  theme?: NamiThemeMode;
  density?: NamiDensity;
  motion?: NamiMotion;
  stylePreset?: NamiStylePreset;
}) {
  const stylePreset = options.stylePreset ?? 'default';
  return {
    'data-nami-theme': options.theme ?? 'light',
    'data-nami-density': options.density ?? 'comfortable',
    'data-nami-motion': options.motion ?? 'normal',
    'data-nami-style': stylePreset === 'ant-illustration' ? 'illustration' : stylePreset
  };
}
