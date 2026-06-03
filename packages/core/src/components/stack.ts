import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export type NamiStackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg';
export type NamiStackDirection = 'vertical' | 'horizontal';

export class NamiStack extends LitElement {
  static properties = {
    gap: { reflect: true },
    direction: { reflect: true },
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
        align-items: var(--nami-stack-align, stretch);
        display: flex;
        flex-direction: column;
        gap: var(--nami-stack-gap, var(--nami-space-3, 10px));
        justify-content: var(--nami-stack-justify, flex-start);
        min-width: 0;
      }

      :host([direction='horizontal']) .base {
        flex-direction: row;
        flex-wrap: wrap;
      }

      :host([gap='none']) {
        --nami-stack-gap: 0;
      }

      :host([gap='xs']) {
        --nami-stack-gap: var(--nami-space-1, 4px);
      }

      :host([gap='sm']) {
        --nami-stack-gap: var(--nami-space-2, 6px);
      }

      :host,
      :host([gap='md']) {
        --nami-stack-gap: var(--nami-space-3, 10px);
      }

      :host([gap='lg']) {
        --nami-stack-gap: var(--nami-space-4, 16px);
      }
    `
  ];

  declare gap: NamiStackGap;
  declare direction: NamiStackDirection;
  declare align: string;
  declare justify: string;

  constructor() {
    super();
    this.gap = 'md';
    this.direction = 'vertical';
    this.align = '';
    this.justify = '';
  }

  updated() {
    if (this.align) this.style.setProperty('--nami-stack-align', this.align);
    else this.style.removeProperty('--nami-stack-align');
    if (this.justify) this.style.setProperty('--nami-stack-justify', this.justify);
    else this.style.removeProperty('--nami-stack-justify');
  }

  render() {
    return html`<div class="base" part="base"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-stack': NamiStack;
  }
}
