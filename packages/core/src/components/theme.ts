import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export type NamiThemeMode = 'light' | 'dark' | 'system';
export type NamiDensity = 'comfortable' | 'compact';
export type NamiMotion = 'normal' | 'reduced';
export type NamiStylePreset = 'default' | 'illustration' | 'ant-illustration';
export type NamiRadius = 'sharp' | 'soft' | 'round';
export type NamiContrast = 'normal' | 'high';

export class NamiTheme extends LitElement {
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
  declare motion: NamiMotion;
  declare stylePreset: NamiStylePreset;
  declare radius: NamiRadius;
  declare contrast: NamiContrast;
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
      this.style.setProperty('--nami-theme-accent', this.accent);
      this.style.setProperty('--nami-accent-50', this.accent);
    } else {
      this.style.removeProperty('--nami-theme-accent');
      this.style.removeProperty('--nami-accent-50');
    }

    this.dataset.namiTheme = this.theme;
    this.dataset.namiDensity = this.density;
    this.dataset.namiMotion = this.motion;
    this.dataset.namiStyle = this.stylePreset === 'ant-illustration' ? 'illustration' : this.stylePreset;
    this.dataset.namiRadius = this.radius;
    this.dataset.namiContrast = this.contrast;
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
