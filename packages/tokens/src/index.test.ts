import { describe, expect, it } from 'vitest';
import { componentTokens, motion, semanticTokens, seedTokens } from './index';
import { deriveNamiTheme, themeToCssText, themeToCssVars, validateThemeSeed } from './theme';
import dtcgTokens from './tokens.dtcg.json';

describe('@nami/tokens', () => {
  it('exposes the deep design token layers', () => {
    expect(seedTokens).toContain('--nami-accent-50');
    expect(seedTokens).toContain('--nami-style-stroke-width');
    expect(seedTokens).toContain('--nami-style-ink-color');
    expect(seedTokens).toContain('--nami-style-on-paper');
    expect(seedTokens).toContain('--nami-style-doodle-opacity');
    expect(seedTokens).toContain('--nami-style-offset-shadow');
    expect(seedTokens).toContain('--nami-contrast-level');
    expect(semanticTokens).toContain('--nami-focus-ring');
    expect(semanticTokens).toContain('--nami-overlay-backdrop');
    expect(componentTokens).toContain('--nami-chip-selected-bg');
    expect(componentTokens).toContain('--nami-illus-primary');
    expect(componentTokens).toContain('--nami-card-bg');
    expect(componentTokens).toContain('--nami-badge-bg');
    expect(componentTokens).toContain('--nami-radio-card-selected-shadow');
    expect(componentTokens).toContain('--nami-soft-control-color');
    expect(componentTokens).toContain('--nami-switch-thumb-bg');
    expect(componentTokens).toContain('--nami-switch-thumb-shadow');
    expect(componentTokens).toContain('--nami-spinner-track-color');
    expect(componentTokens).toContain('--nami-page-transition-z-index');
    expect(componentTokens).toContain('--nami-top-progress-height');
    expect(componentTokens).toContain('--nami-top-progress-duration');
    expect(componentTokens).toContain('--nami-top-progress-track-bg');
    expect(componentTokens).toContain('--nami-top-progress-fill-bg');
    expect(componentTokens).toContain('--nami-top-progress-shadow');
    expect(componentTokens).toContain('--nami-top-progress-z-index');
  });

  it('keeps the motion contract explicit', () => {
    expect(motion.normal).toBe('250ms');
    expect(motion.exit).toBe('150ms');
  });

  it('keeps a typed DTCG token source with Nami theme extensions', () => {
    expect(dtcgTokens.seed.accent['50'].$type).toBe('color');
    expect(dtcgTokens.seed.accent['50'].$value).toBe('#3b82f6');
    expect(dtcgTokens.seed.accent['50'].$extensions['org.nami.theme'].affectedComponents).toContain('nami-button');
    expect(dtcgTokens.seed.style.strokeWidth.$value).toBe('1px');
    expect(dtcgTokens.seed.style.inkColor.$value).toBe('{semantic.color.text}');
    expect(dtcgTokens.seed.style.doodleOpacity.$value).toBe(0);
    expect(dtcgTokens.seed.contrast.level.$value).toBe('normal');
    expect(dtcgTokens.semantic.color.primary.$extensions['org.nami.theme'].semanticRole).toContain('primary');
    expect(dtcgTokens.semantic.color.overlayBackdrop.$value).toBe('rgba(0, 0, 0, 0.48)');
    expect(dtcgTokens.component.button.bg.$extensions['org.nami.theme'].affectedComponents).toEqual(['nami-button']);
    expect(dtcgTokens.component.radioCard.selectedShadow.$value).toContain('{semantic.color.primary}');
    expect(dtcgTokens.component.card.bg.$value).toBe('{semantic.color.surface}');
    expect(dtcgTokens.component.badge.fg.$value).toBe('{semantic.color.text}');
    expect(dtcgTokens.component.softControl.color.$value).toBe('{semantic.color.text}');
    expect(dtcgTokens.component.switch.thumbBg.$value).toBe('{semantic.color.surface}');
    expect(dtcgTokens.component.switch.thumbShadow.$value).toContain('rgba');
    expect(dtcgTokens.component.spinner.trackColor.$value).toContain('rgba');
    expect(dtcgTokens.component.pageTransition.zIndex.$value).toBe(2147483646);
    expect(dtcgTokens.component.topProgress.height.$value).toBe('12px');
    expect(dtcgTokens.component.topProgress.duration.$value).toBe('220ms');
    expect(dtcgTokens.component.topProgress.trackBg.$value).toContain('{semantic.color.surface}');
    expect(dtcgTokens.component.topProgress.fillBg.$value).toBe('{semantic.color.primary}');
    expect(dtcgTokens.component.topProgress.zIndex.$value).toBe(2147483647);
    expect(dtcgTokens.component.illustration.primary.$value).toBe('{semantic.color.primary}');
  });

  it('derives default and illustration themes from seed values', () => {
    const defaultTheme = deriveNamiTheme({ accent: '#14b8a6', mode: 'dark', density: 'compact', motion: 'reduced', radius: 'sharp', contrast: 'high' });
    const illustrationTheme = deriveNamiTheme({ accent: '#8b5cf6', mode: 'dark', stylePreset: 'illustration', radius: 'soft', contrast: 'high' });

    expect(defaultTheme.seed).toEqual({
      accent: '#14b8a6',
      mode: 'dark',
      stylePreset: 'default',
      density: 'compact',
      motion: 'reduced',
      radius: 'sharp',
      contrast: 'high'
    });
    expect(defaultTheme.cssVars['--nami-accent-50']).toBe('#14b8a6');
    expect(defaultTheme.cssVars['--nami-control-height-md']).toBe('34px');
    expect(defaultTheme.cssVars['--nami-motion-normal']).toBe('1ms');
    expect(defaultTheme.cssVars['--nami-radius-control']).toBe('4px');
    expect(defaultTheme.cssVars['--nami-contrast-level']).toBe('high');
    expect(defaultTheme.cssVars['--nami-button-border-width']).toBe('2px');
    expect(defaultTheme.cssVars['--nami-top-progress-height']).toBe('12px');
    expect(defaultTheme.cssVars['--nami-top-progress-duration']).toBe('1ms');
    expect(defaultTheme.cssVars['--nami-top-progress-track-bg']).toContain('var(--nami-surface)');
    expect(defaultTheme.cssVars['--nami-top-progress-fill-bg']).toContain('var(--nami-color-primary)');

    expect(illustrationTheme.cssVars['--nami-accent-50']).toBe('#8b5cf6');
    expect(illustrationTheme.cssVars['--nami-style-stroke-width']).toBe('4px');
    expect(illustrationTheme.cssVars['--nami-top-progress-height']).toBe('14px');
    expect(illustrationTheme.cssVars['--nami-style-on-paper']).toBe('#29221f');
    expect(illustrationTheme.cssVars['--nami-card-bg']).toBe('var(--nami-style-control-bg)');
    expect(illustrationTheme.cssVars['--nami-style-background-pattern']).toContain('radial-gradient');
  });

  it('serializes derived themes to CSS variables and CSS text', () => {
    const theme = deriveNamiTheme({ accent: '#3b82f6', stylePreset: 'illustration' });
    const vars = themeToCssVars(theme);
    const cssText = themeToCssText(theme, '.preview-theme');

    expect(vars['--nami-color-primary']).toBe('var(--nami-accent-50)');
    expect(cssText).toContain('.preview-theme {');
    expect(cssText).toContain('--nami-accent-50: #3b82f6;');
    expect(cssText).toContain('--nami-button-shadow: var(--nami-style-offset-shadow);');
  });

  it('validates unsupported seed values before derivation', () => {
    const diagnostics = validateThemeSeed({ accent: 'blue', mode: 'system' as never, contrast: 'loud' as never });
    const theme = deriveNamiTheme({ accent: 'blue', mode: 'system' as never, contrast: 'loud' as never });

    expect(diagnostics.map((item) => item.code)).toEqual(['invalid-accent', 'invalid-enum', 'invalid-enum']);
    expect(theme.seed.accent).toBe('#3b82f6');
    expect(theme.seed.mode).toBe('light');
    expect(theme.seed.contrast).toBe('normal');
  });
});
