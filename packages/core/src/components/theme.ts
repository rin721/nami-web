import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export type RlThemeMode = 'light' | 'dark' | 'system';
export type RlDensity = 'comfortable' | 'compact';
export type RlMotion = 'normal' | 'reduced';
export type RlStylePreset = 'default' | 'illustration' | 'ant-illustration';
export type RlRadius = 'sharp' | 'soft' | 'round';
export type RlContrast = 'normal' | 'high';

export class RlTheme extends LitElement {
  static properties = {
    theme: { reflect: true },
    density: { reflect: true },
    motion: { reflect: true },
    stylePreset: { attribute: 'style-preset', reflect: true },
    radius: { reflect: true },
    contrast: { reflect: true },
    accent: { reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
        min-height: 0;
      }

      :host([accent]) {
        --rl-accent-50: var(--rl-theme-accent);
      }

      :host([theme='light']) {
        color-scheme: light;
      }

      :host([theme='dark']) {
        color-scheme: dark;
      }

      :host([radius='sharp']) {
        --rl-radius-control: 4px;
        --rl-radius-surface: 4px;
        --rl-radius-tight: 2px;
      }

      :host([radius='soft']) {
        --rl-radius-control: 10px;
        --rl-radius-surface: 8px;
        --rl-radius-tight: 4px;
      }

      :host([radius='round']) {
        --rl-radius-control: 999px;
        --rl-radius-surface: 6px;
        --rl-radius-tight: 4px;
      }

      :host([contrast='high']) {
        --rl-contrast-level: high;
        --rl-style-stroke-width: max(2px, var(--rl-style-stroke-width, 1px));
      }
    `
  ];

  declare theme: RlThemeMode;
  declare density: RlDensity;
  declare motion: RlMotion;
  declare stylePreset: RlStylePreset;
  declare radius: RlRadius;
  declare contrast: RlContrast;
  declare accent: string;

  constructor() {
    super();
    this.theme = 'light';
    this.density = 'comfortable';
    this.motion = 'normal';
    this.stylePreset = 'default';
    this.radius = 'round';
    this.contrast = 'normal';
    this.accent = '';
  }

  updated() {
    if (this.accent) {
      this.style.setProperty('--rl-theme-accent', this.accent);
      this.style.setProperty('--rl-accent-50', this.accent);
    } else {
      this.style.removeProperty('--rl-theme-accent');
      this.style.removeProperty('--rl-accent-50');
    }

    this.dataset.rlTheme = this.theme;
    this.dataset.rlDensity = this.density;
    this.dataset.rlMotion = this.motion;
    this.dataset.rlStyle = this.stylePreset === 'ant-illustration' ? 'illustration' : this.stylePreset;
    this.dataset.rlRadius = this.radius;
    this.dataset.rlContrast = this.contrast;
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rl-theme': RlTheme;
  }
}
