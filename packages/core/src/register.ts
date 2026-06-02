import { NamiAppShell } from './components/app-shell';
import { NamiBadge } from './components/badge';
import { NamiButton } from './components/button';
import { NamiCard } from './components/card';
import { NamiChip } from './components/chip';
import { NamiConfig } from './components/config';
import { NamiDialog } from './components/dialog';
import { NamiDrawer } from './components/drawer';
import { NamiEmpty } from './components/empty';
import { NamiIconButton } from './components/icon-button';
import { NamiIllustration } from './components/illustration';
import { NamiInput } from './components/input';
import { NamiRadioCard } from './components/radio-card';
import { NamiResult } from './components/result';
import { NamiPageTransition } from './components/page-transition';
import { NamiSpinner } from './components/spinner';
import { NamiSwitch } from './components/switch';
import { NamiTabBar } from './components/tab-bar';
import { NamiTheme } from './components/theme';
import { NamiToast } from './components/toast';
import { NamiTopProgress } from './components/top-progress';
import { defineElement } from './internal/define';

export function registerNamiElements() {
  defineElement('nami-theme', NamiTheme);
  defineElement('nami-config', NamiConfig);
  defineElement('nami-spinner', NamiSpinner);
  defineElement('nami-page-transition', NamiPageTransition);
  defineElement('nami-top-progress', NamiTopProgress);
  defineElement('nami-illustration', NamiIllustration);
  defineElement('nami-empty', NamiEmpty);
  defineElement('nami-result', NamiResult);
  defineElement('nami-card', NamiCard);
  defineElement('nami-badge', NamiBadge);
  defineElement('nami-button', NamiButton);
  defineElement('nami-icon-button', NamiIconButton);
  defineElement('nami-chip', NamiChip);
  defineElement('nami-input', NamiInput);
  defineElement('nami-switch', NamiSwitch);
  defineElement('nami-radio-card', NamiRadioCard);
  defineElement('nami-tab-bar', NamiTabBar);
  defineElement('nami-dialog', NamiDialog);
  defineElement('nami-drawer', NamiDrawer);
  defineElement('nami-toast', NamiToast);
  defineElement('nami-app-shell', NamiAppShell);
}

registerNamiElements();
