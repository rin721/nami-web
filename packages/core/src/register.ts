import { RlAppShell } from './components/app-shell';
import { RlBadge } from './components/badge';
import { RlButton } from './components/button';
import { RlCard } from './components/card';
import { RlChip } from './components/chip';
import { RlDialog } from './components/dialog';
import { RlDrawer } from './components/drawer';
import { RlEmpty } from './components/empty';
import { RlIconButton } from './components/icon-button';
import { RlIllustration } from './components/illustration';
import { RlInput } from './components/input';
import { RlRadioCard } from './components/radio-card';
import { RlResult } from './components/result';
import { RlSpinner } from './components/spinner';
import { RlSwitch } from './components/switch';
import { RlTabBar } from './components/tab-bar';
import { RlTheme } from './components/theme';
import { RlToast } from './components/toast';
import { defineElement } from './internal/define';

export function registerRlElements() {
  defineElement('rl-theme', RlTheme);
  defineElement('rl-spinner', RlSpinner);
  defineElement('rl-illustration', RlIllustration);
  defineElement('rl-empty', RlEmpty);
  defineElement('rl-result', RlResult);
  defineElement('rl-card', RlCard);
  defineElement('rl-badge', RlBadge);
  defineElement('rl-button', RlButton);
  defineElement('rl-icon-button', RlIconButton);
  defineElement('rl-chip', RlChip);
  defineElement('rl-input', RlInput);
  defineElement('rl-switch', RlSwitch);
  defineElement('rl-radio-card', RlRadioCard);
  defineElement('rl-tab-bar', RlTabBar);
  defineElement('rl-dialog', RlDialog);
  defineElement('rl-drawer', RlDrawer);
  defineElement('rl-toast', RlToast);
  defineElement('rl-app-shell', RlAppShell);
}

registerRlElements();
