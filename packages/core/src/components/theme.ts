import { css, html, LitElement } from 'lit';
import { createNamiThemeSystem, type NamiThemeConfig } from '@nami-web/tokens/theme';
import { componentHostStyles } from '../internal/styles';

export type NamiThemeMode = 'light' | 'dark' | 'system';
export type NamiDensity = 'comfortable' | 'compact';
export type NamiSize = 'sm' | 'md' | 'lg';
export type NamiMotion = 'normal' | 'reduced';
export type NamiStylePreset = 'default' | 'illustration' | 'ant-illustration';
export type NamiRadius = 'sharp' | 'soft' | 'round';
export type NamiContrast = 'normal' | 'high';

export class NamiTheme extends LitElement {
  static properties = {
    theme: { reflect: true, useDefault: true },
    density: { reflect: true, useDefault: true },
    size: { reflect: true, useDefault: true },
    motion: { reflect: true, useDefault: true },
    stylePreset: { attribute: 'style-preset', reflect: true, useDefault: true },
    radius: { reflect: true, useDefault: true },
    contrast: { reflect: true, useDefault: true },
    accent: { reflect: true, useDefault: true },
    inherit: { type: Boolean, reflect: true },
    config: { attribute: false }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
        min-height: 0;
      }

      :host([accent]) {
        --nami-accent-50: var(--nami-theme-accent);
      }

      :host([theme='light']) {
        color-scheme: light;
      }

      :host([theme='dark']) {
        color-scheme: dark;
      }

      :host([radius='sharp']) {
        --nami-radius-control: 4px;
        --nami-radius-surface: 4px;
        --nami-radius-tight: 2px;
      }

      :host([radius='soft']) {
        --nami-radius-control: 10px;
        --nami-radius-surface: 8px;
        --nami-radius-tight: 4px;
      }

      :host([radius='round']) {
        --nami-radius-control: 999px;
        --nami-radius-surface: 6px;
        --nami-radius-tight: 4px;
      }

      :host([contrast='high']) {
        --nami-contrast-level: high;
        --nami-style-stroke-width: max(2px, var(--nami-style-stroke-width, 1px));
      }
    `
  ];

  declare theme: NamiThemeMode;
  declare density: NamiDensity;
  declare size: NamiSize;
  declare motion: NamiMotion;
  declare stylePreset: NamiStylePreset;
  declare radius: NamiRadius;
  declare contrast: NamiContrast;
  declare accent: string;
  declare inherit: boolean;
  declare config: NamiThemeConfig | null;

  private appliedThemeVars = new Set<string>();
  private systemQuery: MediaQueryList | null = null;
  private handleSystemThemeChange = () => {
    if (this.theme === 'system') this.applyTheme();
  };

  constructor() {
    super();
    this.theme = 'light';
    this.density = 'comfortable';
    this.size = 'md';
    this.motion = 'normal';
    this.stylePreset = 'default';
    this.radius = 'round';
    this.contrast = 'normal';
    this.accent = '';
    this.inherit = true;
    this.config = null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      this.systemQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.systemQuery.addEventListener?.('change', this.handleSystemThemeChange);
    }
  }

  disconnectedCallback() {
    this.systemQuery?.removeEventListener?.('change', this.handleSystemThemeChange);
    super.disconnectedCallback();
  }

  updated() {
    this.applyTheme();
  }

  private get resolvedThemeMode(): 'light' | 'dark' {
    if (this.theme !== 'system') return this.theme;
    return this.systemQuery?.matches ? 'dark' : 'light';
  }

  private hasRuntimeThemeInput() {
    return Boolean(
      this.config ||
      this.accent ||
      this.hasAttribute('theme') ||
      this.hasAttribute('density') ||
      this.hasAttribute('size') ||
      this.hasAttribute('motion') ||
      this.hasAttribute('style-preset') ||
      this.hasAttribute('radius') ||
      this.hasAttribute('contrast')
    );
  }

  private applyTheme() {
    const configSeed = this.config?.seed ?? {};
    const normalizedStylePreset = this.stylePreset === 'ant-illustration' ? 'illustration' : this.stylePreset;
    const appliedMode = this.hasAttribute('theme') ? this.resolvedThemeMode : configSeed.mode ?? this.resolvedThemeMode;
    const appliedStylePreset = this.hasAttribute('style-preset') ? normalizedStylePreset : configSeed.stylePreset ?? normalizedStylePreset;
    const appliedDensity = this.hasAttribute('density') ? this.density : configSeed.density ?? this.density;
    const appliedSize = this.hasAttribute('size') ? this.size : configSeed.size ?? this.size;
    const appliedMotion = this.hasAttribute('motion') ? this.motion : configSeed.motion ?? this.motion;
    const appliedRadius = this.hasAttribute('radius') ? this.radius : configSeed.radius ?? this.radius;
    const appliedContrast = this.hasAttribute('contrast') ? this.contrast : configSeed.contrast ?? this.contrast;
    const appliedSeed = {
      ...configSeed,
      accent: this.accent || configSeed.accent,
      mode: appliedMode,
      stylePreset: appliedStylePreset,
      density: appliedDensity,
      size: appliedSize,
      motion: appliedMotion,
      radius: appliedRadius,
      contrast: appliedContrast
    } satisfies NamiThemeConfig['seed'];

    if (this.accent) {
      this.style.setProperty('--nami-theme-accent', this.accent);
      this.style.setProperty('--nami-accent-50', this.accent);
    } else {
      this.style.removeProperty('--nami-theme-accent');
      this.style.removeProperty('--nami-accent-50');
    }

    if (this.hasRuntimeThemeInput()) {
      const system = createNamiThemeSystem({
        ...this.config,
        seed: appliedSeed
      });
      const nextVars = new Set(Object.keys(system.cssVars));
      for (const token of this.appliedThemeVars) {
        if (!nextVars.has(token) && token !== '--nami-theme-accent' && token !== '--nami-accent-50') this.style.removeProperty(token);
      }
      for (const [token, value] of Object.entries(system.cssVars)) {
        this.style.setProperty(token, value);
      }
      this.appliedThemeVars = nextVars;
    } else {
      for (const token of this.appliedThemeVars) {
        this.style.removeProperty(token);
      }
      this.appliedThemeVars.clear();
    }

    this.dataset.namiTheme = appliedMode;
    this.dataset.namiThemeRequested = this.theme;
    this.dataset.namiDensity = appliedDensity;
    this.dataset.namiSize = appliedSize;
    this.dataset.namiMotion = appliedMotion;
    this.dataset.namiStyle = appliedStylePreset;
    this.dataset.namiRadius = appliedRadius;
    this.dataset.namiContrast = appliedContrast;
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-theme': NamiTheme;
  }
}
