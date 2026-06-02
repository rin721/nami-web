import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export type RlThemeMode = 'light' | 'dark' | 'system';
export type RlDensity = 'comfortable' | 'compact';
export type RlMotion = 'normal' | 'reduced';
export type RlStylePreset = 'default' | 'illustration' | 'ant-illustration';

export class RlTheme extends LitElement {
  static properties = {
    theme: { reflect: true },
    density: { reflect: true },
    motion: { reflect: true },
    stylePreset: { attribute: 'style-preset', reflect: true },
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
    `
  ];

  declare theme: RlThemeMode;
  declare density: RlDensity;
  declare motion: RlMotion;
  declare stylePreset: RlStylePreset;
  declare accent: string;

  constructor() {
    super();
    this.theme = 'light';
    this.density = 'comfortable';
    this.motion = 'normal';
    this.stylePreset = 'default';
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
