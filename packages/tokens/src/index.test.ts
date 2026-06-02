import { describe, expect, it } from 'vitest';
import { componentTokens, motion, semanticTokens, seedTokens } from './index';
import dtcgTokens from './tokens.dtcg.json';

describe('@rin-labs/tokens', () => {
  it('exposes the deep design token layers', () => {
    expect(seedTokens).toContain('--rl-accent-50');
    expect(seedTokens).toContain('--rl-style-stroke-width');
    expect(seedTokens).toContain('--rl-style-ink-color');
    expect(seedTokens).toContain('--rl-style-on-paper');
    expect(seedTokens).toContain('--rl-style-doodle-opacity');
    expect(seedTokens).toContain('--rl-style-offset-shadow');
    expect(semanticTokens).toContain('--rl-focus-ring');
    expect(semanticTokens).toContain('--rl-overlay-backdrop');
    expect(componentTokens).toContain('--rl-chip-selected-bg');
    expect(componentTokens).toContain('--rl-illus-primary');
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

  it('keeps a DTCG-style token source for future generation', () => {
    expect(dtcgTokens.seed.accent['50'].$value).toBe('#3b82f6');
    expect(dtcgTokens.seed.style.strokeWidth.$value).toBe('1px');
    expect(dtcgTokens.seed.style.inkColor.$value).toBe('{semantic.color.text}');
    expect(dtcgTokens.seed.style.doodleOpacity.$value).toBe(0);
    expect(dtcgTokens.semantic.color.overlayBackdrop.$value).toBe('rgba(0, 0, 0, 0.48)');
    expect(dtcgTokens.component.radioCard.selectedShadow.$value).toContain('{semantic.color.primary}');
    expect(dtcgTokens.component.switch.thumbShadow.$value).toContain('rgba');
    expect(dtcgTokens.component.spinner.trackColor.$value).toContain('rgba');
    expect(dtcgTokens.component.illustration.primary.$value).toBe('{semantic.color.primary}');
  });
});
    expect(dtcgTokens.component.softControl.color.$value).toBe('{semantic.color.text}');
    expect(dtcgTokens.component.switch.thumbBg.$value).toBe('{semantic.color.surface}');
