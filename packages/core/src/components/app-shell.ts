import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export class NamiAppShell extends LitElement {
  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
        min-height: 100dvh;
      }

      .shell {
        background: var(--nami-surface);
        background-image: var(--nami-style-background-pattern, none);
        background-size: var(--nami-style-background-size, auto);
        color: var(--nami-text);
        min-height: 100dvh;
      }

      .rail {
        background: var(--nami-surface-overlay);
        border-right: var(--nami-app-shell-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-border);
        box-shadow: var(--nami-app-shell-shadow, 0 0 24px color-mix(in oklab, var(--nami-shadow-color), transparent 70%));
        bottom: 0;
        display: flex;
        flex-direction: column;
        left: 0;
        position: fixed;
        top: 0;
        width: 56px;
        z-index: 20;
      }

      .top,
      .bottom {
        display: none;
      }

      main {
        min-height: 100dvh;
        padding-left: 56px;
      }

      @media (width <= 639px) {
        .rail {
          display: none;
        }

        .top,
        .bottom {
          background: var(--nami-surface-overlay);
          border-color: var(--nami-border);
          box-shadow: var(--nami-app-shell-shadow, 0 0 24px color-mix(in oklab, var(--nami-shadow-color), transparent 70%));
          display: block;
          height: 56px;
          left: 0;
          position: fixed;
          right: 0;
          z-index: 20;
        }

        .top {
          border-bottom: 1px solid var(--nami-border);
          top: 0;
        }

        .bottom {
          border-top: 1px solid var(--nami-border);
          bottom: 0;
        }

        main {
          padding: 56px 0;
        }
      }
    `
  ];

  render() {
    return html`
      <div class="shell" part="base">
        <aside class="rail" part="rail"><slot name="rail"></slot></aside>
        <header class="top" part="top"><slot name="top"></slot></header>
        <main part="control"><slot></slot></main>
        <nav class="bottom" part="bottom"><slot name="bottom"></slot></nav>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-app-shell': NamiAppShell;
  }
}
