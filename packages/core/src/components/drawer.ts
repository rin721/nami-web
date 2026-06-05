import { css, html, LitElement } from 'lit';
import { getFocusableElements, trapFocus } from '../foundation/focus';
import { captureOverlayFocus, isEscapeKey, overlayCloseDetail, overlayState, restoreOverlayFocus } from '../foundation/overlay';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class NamiDrawer extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    placement: { reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: contents;
      }

      .backdrop {
        background: var(--nami-overlay-backdrop, color-mix(in oklab, #000, transparent 55%));
        backdrop-filter: blur(8px);
        inset: 0;
        opacity: 0;
        pointer-events: none;
        position: fixed;
        transition: opacity var(--nami-motion-exit, 150ms) var(--nami-ease-standard, ease);
        z-index: 50;
      }

      .panel {
        background: var(--nami-drawer-bg, var(--nami-surface-overlay));
        border: var(--nami-drawer-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-drawer-border-color, var(--nami-border));
        box-shadow: var(--nami-drawer-shadow);
        color: var(--nami-style-on-paper, var(--nami-text));
        max-height: 100dvh;
        max-width: 100dvw;
        overflow: auto;
        padding: var(--nami-space-5, 24px);
        pointer-events: none;
        position: fixed;
        transition: transform var(--nami-motion-slow, 700ms) var(--nami-ease-emphasized, ease);
        visibility: hidden;
        z-index: 51;
      }

      :host([placement='left']) .panel {
        border-radius: 0 var(--nami-radius-surface, 6px) var(--nami-radius-surface, 6px) 0;
        bottom: 0;
        left: 0;
        top: 0;
        transform: translateX(-105%);
        width: min(320px, calc(100vw - 48px));
      }

      :host([placement='right']) .panel {
        border-radius: var(--nami-radius-surface, 6px) 0 0 var(--nami-radius-surface, 6px);
        bottom: 0;
        right: 0;
        top: 0;
        transform: translateX(105%);
        width: min(320px, calc(100vw - 48px));
      }

      :host([placement='bottom']) .panel {
        border-radius: var(--nami-radius-surface, 6px) var(--nami-radius-surface, 6px) 0 0;
        bottom: 0;
        left: 0;
        right: 0;
        transform: translateY(105%);
      }

      :host([open]) .backdrop {
        opacity: 1;
        pointer-events: auto;
        transition-duration: var(--nami-motion-normal, 250ms);
      }

      :host([open]) .panel {
        pointer-events: auto;
        transform: translate(0);
        visibility: visible;
      }

      @media (prefers-reduced-motion: reduce) {
        .backdrop,
        .panel {
          transition-duration: 1ms;
        }
      }
    `
  ];

  declare open: boolean;
  declare placement: 'left' | 'right' | 'bottom';

  private previousActiveElement: Element | null = null;
  private closeSourceEvent: Event | undefined;

  constructor() {
    super();
    this.open = false;
    this.placement = 'left';
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeydown);
    super.disconnectedCallback();
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (isEscapeKey(event) && this.open) this.close(event);
  };

  private close(sourceEvent?: Event) {
    if (!this.open) return;
    this.closeSourceEvent = sourceEvent;
    this.open = false;
  }

  updated(changed: Map<string, unknown>) {
    this.dataset.state = overlayState(this.open);
    if (!changed.has('open')) return;
    const wasOpen = changed.get('open') === true;

    if (this.open) {
      this.previousActiveElement = captureOverlayFocus();
      requestAnimationFrame(() => this.focusInitialElement());
      emit(this, 'nami-open', undefined);
    } else if (wasOpen) {
      this.restoreFocus();
      emit(this, 'nami-close', overlayCloseDetail(this.closeSourceEvent));
      this.closeSourceEvent = undefined;
    }
  }

  private get panelElement() {
    return this.renderRoot.querySelector('.panel') as HTMLElement | null;
  }

  private focusInitialElement() {
    const panel = this.panelElement;
    if (!panel) return;
    const firstFocusable = getFocusableElements(panel)[0];
    (firstFocusable ?? panel).focus();
  }

  private handlePanelKeydown(event: KeyboardEvent) {
    const panel = this.panelElement;
    if (!panel) return;
    if (event.key === 'Tab' && getFocusableElements(panel).length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }
    trapFocus(event, panel);
  }

  private restoreFocus() {
    restoreOverlayFocus(this.previousActiveElement);
    this.previousActiveElement = null;
  }

  render() {
    return html`
      <div class="backdrop" part="backdrop" @click=${(event: MouseEvent) => this.close(event)}></div>
      <aside
        class="panel"
        part="base control"
        role="dialog"
        aria-modal=${this.open ? 'true' : 'false'}
        aria-hidden=${this.open ? 'false' : 'true'}
        tabindex=${this.open ? '0' : '-1'}
        ?inert=${!this.open}
        @keydown=${this.handlePanelKeydown}
      >
        <slot name="label" part="label"></slot>
        <slot></slot>
        <slot name="actions"></slot>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-drawer': NamiDrawer;
  }
}
