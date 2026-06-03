import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export class NamiCluster extends LitElement {
  static properties = {
    gap: { reflect: true },
    align: { reflect: true },
    justify: { reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      .base {
        align-items: var(--nami-cluster-align, center);
        display: flex;
        flex-wrap: wrap;
        gap: var(--nami-cluster-gap, var(--nami-space-2, 6px));
        justify-content: var(--nami-cluster-justify, flex-start);
        min-width: 0;
      }

      :host([gap='none']) {
        --nami-cluster-gap: 0;
      }

      :host([gap='sm']) {
        --nami-cluster-gap: var(--nami-space-2, 6px);
      }

      :host([gap='md']) {
        --nami-cluster-gap: var(--nami-space-3, 10px);
      }

      :host([gap='lg']) {
        --nami-cluster-gap: var(--nami-space-4, 16px);
      }
    `
  ];

  declare gap: 'none' | 'sm' | 'md' | 'lg';
  declare align: string;
  declare justify: string;

  constructor() {
    super();
    this.gap = 'sm';
    this.align = '';
    this.justify = '';
  }

  updated() {
    if (this.align) this.style.setProperty('--nami-cluster-align', this.align);
    else this.style.removeProperty('--nami-cluster-align');
    if (this.justify) this.style.setProperty('--nami-cluster-justify', this.justify);
    else this.style.removeProperty('--nami-cluster-justify');
  }

  render() {
    return html`<div class="base" part="base"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-cluster': NamiCluster;
  }
}
