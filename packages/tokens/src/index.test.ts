import { describe, expect, it } from 'vitest';
import { componentTokens, motion, semanticTokens, seedTokens } from './index';
import { createNamiThemeSystem, defineNamiTheme, deriveNamiTheme, themeToCssText, themeToCssVars, themeToDtcg, validateThemeSeed } from './theme';
import { contrastRatio, createNamiThemeStudio, readDtcgCssVars } from './theme-studio';
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
    expect(seedTokens).toContain('--nami-layout-gutter');
    expect(seedTokens).toContain('--nami-breakpoint-compact');
    expect(seedTokens).toContain('--nami-app-shell-rail-width');
    expect(seedTokens).toContain('--nami-control-height');
    expect(seedTokens).toContain('--nami-control-padding-x');
    expect(seedTokens).toContain('--nami-control-font-size');
    expect(seedTokens).toContain('--nami-icon-size');
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
    expect(componentTokens).toContain('--nami-transition-progress-height');
    expect(componentTokens).toContain('--nami-page-transition-z-index');
    expect(componentTokens).toContain('--nami-top-progress-height');
    expect(componentTokens).toContain('--nami-top-progress-duration');
    expect(componentTokens).toContain('--nami-top-progress-ease');
    expect(componentTokens).toContain('--nami-top-progress-indeterminate-duration');
    expect(componentTokens).toContain('--nami-top-progress-track-bg');
    expect(componentTokens).toContain('--nami-top-progress-fill-bg');
    expect(componentTokens).toContain('--nami-top-progress-shadow');
    expect(componentTokens).toContain('--nami-top-progress-z-index');
    expect(componentTokens).toContain('--nami-container-max-width');
    expect(componentTokens).toContain('--nami-grid-min');
    expect(componentTokens).toContain('--nami-checkbox-bg');
    expect(componentTokens).toContain('--nami-textarea-bg');
    expect(componentTokens).toContain('--nami-alert-bg');
    expect(componentTokens).toContain('--nami-skeleton-bg');
    expect(componentTokens).toContain('--nami-progress-fill-bg');
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
    expect(dtcgTokens.component.pageTransition.progressHeight.$value).toBe('4px');
    expect(dtcgTokens.component.pageTransition.zIndex.$value).toBe(2147483646);
    expect(dtcgTokens.component.topProgress.height.$value).toBe('{component.pageTransition.progressHeight}');
    expect(dtcgTokens.component.topProgress.duration.$value).toBe('260ms');
    expect(dtcgTokens.component.topProgress.ease.$value).toBe('{seed.motion.standard}');
    expect(dtcgTokens.component.topProgress.indeterminateDuration.$value).toBe('1280ms');
    expect(dtcgTokens.component.topProgress.trackBg.$value).toContain('{semantic.color.surface}');
    expect(dtcgTokens.component.topProgress.fillBg.$value).toBe('{semantic.color.primary}');
    expect(dtcgTokens.component.topProgress.zIndex.$value).toBe(2147483647);
    expect(dtcgTokens.component.illustration.primary.$value).toBe('{semantic.color.primary}');
  });

  it('derives default and illustration themes from seed values', () => {
    const defaultTheme = deriveNamiTheme({ accent: '#14b8a6', mode: 'dark', density: 'compact', size: 'lg', motion: 'reduced', radius: 'sharp', contrast: 'high' });
    const illustrationTheme = deriveNamiTheme({ accent: '#8b5cf6', mode: 'dark', stylePreset: 'illustration', radius: 'soft', contrast: 'high' });

    expect(defaultTheme.seed).toEqual({
      accent: '#14b8a6',
      mode: 'dark',
      stylePreset: 'default',
      density: 'compact',
      size: 'lg',
      motion: 'reduced',
      radius: 'sharp',
      contrast: 'high'
    });
    expect(defaultTheme.cssVars['--nami-accent-50']).toBe('#14b8a6');
    expect(defaultTheme.cssVars['--nami-control-height-md']).toBe('34px');
    expect(defaultTheme.cssVars['--nami-control-height']).toBe('var(--nami-control-height-lg)');
    expect(defaultTheme.cssVars['--nami-control-padding-x']).toBe('20px');
    expect(defaultTheme.cssVars['--nami-control-font-size']).toBe('1rem');
    expect(defaultTheme.cssVars['--nami-icon-size']).toBe('20px');
    expect(defaultTheme.cssVars['--nami-icon-button-size']).toBe('var(--nami-control-height)');
    expect(defaultTheme.cssVars['--nami-layout-gutter']).toBe('12px');
    expect(defaultTheme.cssVars['--nami-motion-normal']).toBe('1ms');
    expect(defaultTheme.cssVars['--nami-radius-control']).toBe('4px');
    expect(defaultTheme.cssVars['--nami-contrast-level']).toBe('high');
    expect(defaultTheme.cssVars['--nami-button-border-width']).toBe('2px');
    expect(defaultTheme.cssVars['--nami-transition-progress-height']).toBe('4px');
    expect(defaultTheme.cssVars['--nami-top-progress-height']).toBe('var(--nami-transition-progress-height)');
    expect(defaultTheme.cssVars['--nami-top-progress-duration']).toBe('1ms');
    expect(defaultTheme.cssVars['--nami-top-progress-indeterminate-duration']).toBe('1ms');
    expect(defaultTheme.cssVars['--nami-top-progress-track-bg']).toContain('var(--nami-surface)');
    expect(defaultTheme.cssVars['--nami-top-progress-fill-bg']).toContain('var(--nami-color-primary)');

    expect(illustrationTheme.cssVars['--nami-accent-50']).toBe('#8b5cf6');
    expect(illustrationTheme.cssVars['--nami-style-stroke-width']).toBe('4px');
    expect(illustrationTheme.cssVars['--nami-transition-progress-height']).toBe('5px');
    expect(illustrationTheme.cssVars['--nami-top-progress-height']).toBe('var(--nami-transition-progress-height)');
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

  it('creates a custom theme system from semantic, component, mode, and resolver layers', () => {
    const config = defineNamiTheme({
      seed: { accent: '#f97316', mode: 'dark', density: 'compact' },
      tokens: {
        '--nami-layout-gutter': '10px'
      },
      semanticTokens: {
        color: {
          primary: '#123456'
        }
      },
      components: {
        button: {
          tokens: {
            bg: '#123456',
            radius: '12px'
          }
        },
        progress: {
          fillBg: '#123456'
        }
      },
      modes: {
        dark: {
          tokens: {
            '--nami-surface': '#020617'
          }
        }
      },
      conditions: {
        hocus: ':is(:hover, :focus-visible)'
      },
      recipes: {
        button: {
          base: { fontWeight: 700 },
          variants: {
            intent: {
              primary: { color: 'var(--nami-color-primary)' }
            }
          }
        }
      },
      slotRecipes: {
        alert: {
          slots: ['base', 'indicator'],
          base: {
            base: { padding: 'var(--nami-space-4)' }
          }
        }
      },
      cssVariablesResolver: () => ({
        variables: {
          '--nami-custom-common': '1'
        },
        dark: {
          '--nami-custom-mode': 'dark'
        }
      })
    });
    const system = createNamiThemeSystem(config);
    const dtcg = themeToDtcg(system);

    expect(system.seed.mode).toBe('dark');
    expect(system.token('color.primary')).toBe('#123456');
    expect(system.token('button.bg')).toBe('#123456');
    expect(system.token('progress.fillBg')).toBe('#123456');
    expect(system.tokenVar('button.radius')).toBe('var(--nami-button-radius)');
    expect(system.token('--nami-surface')).toBe('#020617');
    expect(system.token('--nami-layout-gutter')).toBe('10px');
    expect(system.token('--nami-custom-mode')).toBe('dark');
    expect(system.conditions.hocus).toBe(':is(:hover, :focus-visible)');
    expect(system.recipes.button.defaultVariants).toBeUndefined();
    expect(system.slotRecipes.alert.slots).toEqual(['base', 'indicator']);
    expect(system.cssText('.scoped')).toContain('.scoped {');
    expect(system.dtcg().cssVars['--nami-button-bg'].$value).toBe('#123456');
    expect(dtcg.cssVars['--nami-custom-common'].$type).toBe('number');
  });

  it('validates unsupported seed values before derivation', () => {
    const diagnostics = validateThemeSeed({ accent: 'blue', mode: 'system' as never, size: 'xl' as never, contrast: 'loud' as never });
    const theme = deriveNamiTheme({ accent: 'blue', mode: 'system' as never, size: 'xl' as never, contrast: 'loud' as never });

    expect(diagnostics.map((item) => item.code)).toEqual(['invalid-accent', 'invalid-enum', 'invalid-enum', 'invalid-enum']);
    expect(theme.seed.accent).toBe('#3b82f6');
    expect(theme.seed.mode).toBe('light');
    expect(theme.seed.size).toBe('md');
    expect(theme.seed.contrast).toBe('normal');
  });

  it('creates theme studio exports and reads DTCG CSS variables', () => {
    const studio = createNamiThemeStudio({ seed: { accent: '#14b8a6', size: 'sm' } }, { selector: '.demo-theme' });
    const imported = readDtcgCssVars(studio.system.dtcg());

    expect(studio.system.seed.size).toBe('sm');
    expect(studio.cssText).toContain('.demo-theme {');
    expect(studio.dtcgJson).toContain('"cssVars"');
    expect(studio.tsConfig).toContain('defineNamiTheme');
    expect(studio.tokenTree.map((item) => item.label)).toEqual(['Seed', 'Palette', 'Semantic', 'Style', 'Component']);
    expect(studio.diagnostics.map((item) => item.label)).toEqual(['Text / surface', 'Accent / surface']);
    expect(imported['--nami-control-height']).toBe('var(--nami-control-height-sm)');
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
  });
});
