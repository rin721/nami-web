import { L as t } from "./runtime-4rCsJ4EI.js";
class s {
  constructor(n) {
    this.__litLocalizeEventHandler = (o) => {
      o.detail.status === "ready" && this.host.requestUpdate();
    }, this.host = n;
  }
  hostConnected() {
    window.addEventListener(t, this.__litLocalizeEventHandler);
  }
  hostDisconnected() {
    window.removeEventListener(t, this.__litLocalizeEventHandler);
  }
}
const a = (e) => e.addController(new s(e)), l = a;
export {
  l as u
};
