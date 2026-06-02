import { describe, expect, it } from 'vitest';
import { componentTokens, motion, semanticTokens, seedTokens } from './index';
import dtcgTokens from './tokens.dtcg.json';

describe('@rin-labs/tokens', () => {
  it('exposes the deep design token layers', () => {
    expect(seedTokens).toContain('--rl-accent-50');
    expect(seedTokens).toContain('--rl-style-stroke-width');
    expect(seedTokens).toContain('--rl-style-offset-shadow');
    expect(semanticTokens).toContain('--rl-focus-ring');
    expect(componentTokens).toContain('--rl-chip-selected-bg');
    expect(componentTokens).toContain('--rl-illus-primary');
  });

  it('keeps the motion contract explicit', () => {
    expect(motion.normal).toBe('250ms');
    expect(motion.exit).toBe('150ms');
  });

  it('keeps a DTCG-style token source for future generation', () => {
    expect(dtcgTokens.seed.accent['50'].$value).toBe('#3b82f6');
    expect(dtcgTokens.seed.style.strokeWidth.$value).toBe('1px');
    expect(dtcgTokens.component.illustration.primary.$value).toBe('{semantic.color.primary}');
  });
});
