import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export class NamiGrid extends LitElement {
  static properties = {
    columns: { type: Number, reflect: true },
    min: { reflect: true },
    gap: { reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      .base {
        display: grid;
        gap: var(--nami-grid-gap, var(--nami-layout-gutter, 16px));
        grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--nami-grid-min, 16rem)), 1fr));
        min-width: 0;
      }

      :host([columns]) .base {
        grid-template-columns: repeat(var(--nami-grid-columns), minmax(0, 1fr));
      }

      :host([gap='none']) {
        --nami-grid-gap: 0;
      }

      :host([gap='sm']) {
        --nami-grid-gap: var(--nami-space-2, 6px);
      }

      :host,
      :host([gap='md']) {
        --nami-grid-gap: var(--nami-layout-gutter, 16px);
      }

      :host([gap='lg']) {
        --nami-grid-gap: var(--nami-space-5, 24px);
      }
    `
  ];

  declare columns: number;
  declare min: string;
  declare gap: 'none' | 'sm' | 'md' | 'lg';

  constructor() {
    super();
    this.columns = 0;
    this.min = '';
    this.gap = 'md';
  }

  updated() {
    if (this.columns > 0) this.style.setProperty('--nami-grid-columns', String(this.columns));
    else this.style.removeProperty('--nami-grid-columns');
    if (this.min) this.style.setProperty('--nami-grid-min', this.min);
    else this.style.removeProperty('--nami-grid-min');
  }

  render() {
    return html`<div class="base" part="base"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-grid': NamiGrid;
  }
}
