import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export type NamiContainerSize = 'sm' | 'md' | 'lg' | 'full';

export class NamiContainer extends LitElement {
  static properties = {
    size: { reflect: true },
    padded: { type: Boolean, reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      .base {
        box-sizing: border-box;
        margin-inline: auto;
        max-width: var(--nami-container-max-width, var(--nami-container-lg, 1240px));
        padding-inline: var(--nami-container-padding, var(--nami-layout-gutter, 16px));
        width: 100%;
      }

      :host(:not([padded])) .base {
        padding-inline: 0;
      }

      :host([size='sm']) {
        --nami-container-max-width: var(--nami-container-sm, 720px);
      }

      :host([size='md']) {
        --nami-container-max-width: var(--nami-container-md, 960px);
      }

      :host,
      :host([size='lg']) {
        --nami-container-max-width: var(--nami-container-lg, 1240px);
      }

      :host([size='full']) {
        --nami-container-max-width: none;
      }
    `
  ];

  declare size: NamiContainerSize;
  declare padded: boolean;

  constructor() {
    super();
    this.size = 'lg';
    this.padded = true;
  }

  render() {
    return html`<div class="base" part="base"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-container': NamiContainer;
  }
}
