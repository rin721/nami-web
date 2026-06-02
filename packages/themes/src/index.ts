export type RlThemeMode = 'light' | 'dark' | 'system';
export type RlDensity = 'comfortable' | 'compact';
export type RlMotion = 'normal' | 'reduced';
export type RlStylePreset = 'default' | 'illustration' | 'ant-illustration';

export const defaultAccent = '#3b82f6';

export function themeAttributes(options: {
  theme?: RlThemeMode;
  density?: RlDensity;
  motion?: RlMotion;
  stylePreset?: RlStylePreset;
}) {
  const stylePreset = options.stylePreset ?? 'default';
  return {
    'data-rl-theme': options.theme ?? 'light',
    'data-rl-density': options.density ?? 'comfortable',
    'data-rl-motion': options.motion ?? 'normal',
    'data-rl-style': stylePreset === 'ant-illustration' ? 'illustration' : stylePreset
  };
}
