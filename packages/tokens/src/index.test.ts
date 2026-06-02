import { describe, expect, it } from 'vitest';
import { componentTokens, motion, semanticTokens, seedTokens } from './index';
import { deriveRinTheme, themeToCssText, themeToCssVars, validateThemeSeed } from './theme';
import dtcgTokens from './tokens.dtcg.json';

describe('@rin-labs/tokens', () => {
  it('exposes the deep design token layers', () => {
    expect(seedTokens).toContain('--rl-accent-50');
    expect(seedTokens).toContain('--rl-style-stroke-width');
    expect(seedTokens).toContain('--rl-style-ink-color');
    expect(seedTokens).toContain('--rl-style-on-paper');
    expect(seedTokens).toContain('--rl-style-doodle-opacity');
    expect(seedTokens).toContain('--rl-style-offset-shadow');
    expect(seedTokens).toContain('--rl-contrast-level');
    expect(semanticTokens).toContain('--rl-focus-ring');
    expect(semanticTokens).toContain('--rl-overlay-backdrop');
    expect(componentTokens).toContain('--rl-chip-selected-bg');
    expect(componentTokens).toContain('--rl-illus-primary');
    expect(componentTokens).toContain('--rl-card-bg');
    expect(componentTokens).toContain('--rl-badge-bg');
    expect(componentTokens).toContain('--rl-radio-card-selected-shadow');
    expect(componentTokens).toContain('--rl-soft-control-color');
    expect(componentTokens).toContain('--rl-switch-thumb-bg');
    expect(componentTokens).toContain('--rl-switch-thumb-shadow');
    expect(componentTokens).toContain('--rl-spinner-track-color');
  });

  it('keeps the motion contract explicit', () => {
    expect(motion.normal).toBe('250ms');
    expect(motion.exit).toBe('150ms');
  });

  it('keeps a typed DTCG token source with Rin theme extensions', () => {
    expect(dtcgTokens.seed.accent['50'].$type).toBe('color');
    expect(dtcgTokens.seed.accent['50'].$value).toBe('#3b82f6');
    expect(dtcgTokens.seed.accent['50'].$extensions['org.rin-labs.theme'].affectedComponents).toContain('rl-button');
    expect(dtcgTokens.seed.style.strokeWidth.$value).toBe('1px');
    expect(dtcgTokens.seed.style.inkColor.$value).toBe('{semantic.color.text}');
    expect(dtcgTokens.seed.style.doodleOpacity.$value).toBe(0);
    expect(dtcgTokens.seed.contrast.level.$value).toBe('normal');
    expect(dtcgTokens.semantic.color.primary.$extensions['org.rin-labs.theme'].semanticRole).toContain('primary');
    expect(dtcgTokens.semantic.color.overlayBackdrop.$value).toBe('rgba(0, 0, 0, 0.48)');
    expect(dtcgTokens.component.button.bg.$extensions['org.rin-labs.theme'].affectedComponents).toEqual(['rl-button']);
    expect(dtcgTokens.component.radioCard.selectedShadow.$value).toContain('{semantic.color.primary}');
    expect(dtcgTokens.component.card.bg.$value).toBe('{semantic.color.surface}');
    expect(dtcgTokens.component.badge.fg.$value).toBe('{semantic.color.text}');
    expect(dtcgTokens.component.softControl.color.$value).toBe('{semantic.color.text}');
    expect(dtcgTokens.component.switch.thumbBg.$value).toBe('{semantic.color.surface}');
    expect(dtcgTokens.component.switch.thumbShadow.$value).toContain('rgba');
    expect(dtcgTokens.component.spinner.trackColor.$value).toContain('rgba');
    expect(dtcgTokens.component.illustration.primary.$value).toBe('{semantic.color.primary}');
  });

  it('derives default and illustration themes from seed values', () => {
    const defaultTheme = deriveRinTheme({ accent: '#14b8a6', mode: 'dark', density: 'compact', motion: 'reduced', radius: 'sharp', contrast: 'high' });
    const illustrationTheme = deriveRinTheme({ accent: '#8b5cf6', mode: 'dark', stylePreset: 'illustration', radius: 'soft', contrast: 'high' });

    expect(defaultTheme.seed).toEqual({
      accent: '#14b8a6',
      mode: 'dark',
      stylePreset: 'default',
      density: 'compact',
      motion: 'reduced',
      radius: 'sharp',
      contrast: 'high'
    });
    expect(defaultTheme.cssVars['--rl-accent-50']).toBe('#14b8a6');
    expect(defaultTheme.cssVars['--rl-control-height-md']).toBe('34px');
    expect(defaultTheme.cssVars['--rl-motion-normal']).toBe('1ms');
    expect(defaultTheme.cssVars['--rl-radius-control']).toBe('4px');
    expect(defaultTheme.cssVars['--rl-contrast-level']).toBe('high');
    expect(defaultTheme.cssVars['--rl-button-border-width']).toBe('2px');

    expect(illustrationTheme.cssVars['--rl-accent-50']).toBe('#8b5cf6');
    expect(illustrationTheme.cssVars['--rl-style-stroke-width']).toBe('4px');
    expect(illustrationTheme.cssVars['--rl-style-on-paper']).toBe('#29221f');
    expect(illustrationTheme.cssVars['--rl-card-bg']).toBe('var(--rl-style-control-bg)');
    expect(illustrationTheme.cssVars['--rl-style-background-pattern']).toContain('radial-gradient');
  });

  it('serializes derived themes to CSS variables and CSS text', () => {
    const theme = deriveRinTheme({ accent: '#3b82f6', stylePreset: 'illustration' });
    const vars = themeToCssVars(theme);
    const cssText = themeToCssText(theme, '.preview-theme');

    expect(vars['--rl-color-primary']).toBe('var(--rl-accent-50)');
    expect(cssText).toContain('.preview-theme {');
    expect(cssText).toContain('--rl-accent-50: #3b82f6;');
    expect(cssText).toContain('--rl-button-shadow: var(--rl-style-offset-shadow);');
  });

  it('validates unsupported seed values before derivation', () => {
    const diagnostics = validateThemeSeed({ accent: 'blue', mode: 'system' as never, contrast: 'loud' as never });
    const theme = deriveRinTheme({ accent: 'blue', mode: 'system' as never, contrast: 'loud' as never });

    expect(diagnostics.map((item) => item.code)).toEqual(['invalid-accent', 'invalid-enum', 'invalid-enum']);
    expect(theme.seed.accent).toBe('#3b82f6');
    expect(theme.seed.mode).toBe('light');
    expect(theme.seed.contrast).toBe('normal');
  });
});
