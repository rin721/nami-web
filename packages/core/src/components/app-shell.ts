import { css, html, LitElement } from 'lit';
import { componentHostStyles } from '../internal/styles';

export class RlAppShell extends LitElement {
  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
        min-height: 100dvh;
      }

      .shell {
        background: var(--rl-surface);
        background-image: var(--rl-style-background-pattern, none);
        background-size: var(--rl-style-background-size, auto);
        color: var(--rl-text);
        min-height: 100dvh;
      }

      .rail {
        background: var(--rl-surface-overlay);
        border-right: var(--rl-app-shell-border-width, var(--rl-style-stroke-width, 1px)) solid var(--rl-border);
        box-shadow: var(--rl-app-shell-shadow, 0 0 24px color-mix(in oklab, var(--rl-shadow-color), transparent 70%));
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
          background: var(--rl-surface-overlay);
          border-color: var(--rl-border);
          box-shadow: var(--rl-app-shell-shadow, 0 0 24px color-mix(in oklab, var(--rl-shadow-color), transparent 70%));
          display: block;
          height: 56px;
          left: 0;
          position: fixed;
          right: 0;
          z-index: 20;
        }

        .top {
          border-bottom: 1px solid var(--rl-border);
          top: 0;
        }

        .bottom {
          border-top: 1px solid var(--rl-border);
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
    'rl-app-shell': RlAppShell;
  }
}
