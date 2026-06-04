var NamiUI=(function(Rt){"use strict";const N=globalThis,Bt=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ht=Symbol(),Pe=new WeakMap;let Te=class{constructor(t,a,i){if(this._$cssResult$=!0,i!==Ht)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=a}get styleSheet(){let t=this.o;const a=this.t;if(Bt&&t===void 0){const i=a!==void 0&&a.length===1;i&&(t=Pe.get(a)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Pe.set(a,t))}return t}toString(){return this.cssText}};const ua=e=>new Te(typeof e=="string"?e:e+"",void 0,Ht),u=(e,...t)=>{const a=e.length===1?e[0]:t.reduce((i,r,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[s+1],e[0]);return new Te(a,e,Ht)},va=(e,t)=>{if(Bt)e.adoptedStyleSheets=t.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of t){const i=document.createElement("style"),r=N.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=a.cssText,e.appendChild(i)}},Me=Bt?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let a="";for(const i of t.cssRules)a+=i.cssText;return ua(a)})(e):e;const{is:fa,defineProperty:ba,getOwnPropertyDescriptor:ga,getOwnPropertyNames:ya,getOwnPropertySymbols:xa,getPrototypeOf:wa}=Object,tt=globalThis,Le=tt.trustedTypes,ka=Le?Le.emptyScript:"",$a=tt.reactiveElementPolyfillSupport,V=(e,t)=>e,Vt={toAttribute(e,t){switch(t){case Boolean:e=e?ka:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let a=e;switch(t){case Boolean:a=e!==null;break;case Number:a=e===null?null:Number(e);break;case Object:case Array:try{a=JSON.parse(e)}catch{a=null}}return a}},De=(e,t)=>!fa(e,t),Oe={attribute:!0,type:String,converter:Vt,reflect:!1,useDefault:!1,hasChanged:De};Symbol.metadata??=Symbol("metadata"),tt.litPropertyMetadata??=new WeakMap;let j=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,a=Oe){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(t,a),!a.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,a);r!==void 0&&ba(this.prototype,t,r)}}static getPropertyDescriptor(t,a,i){const{get:r,set:s}=ga(this.prototype,t)??{get(){return this[a]},set(n){this[a]=n}};return{get:r,set(n){const p=r?.call(this);s?.call(this,n),this.requestUpdate(t,p,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Oe}static _$Ei(){if(this.hasOwnProperty(V("elementProperties")))return;const t=wa(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(V("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V("properties"))){const a=this.properties,i=[...ya(a),...xa(a)];for(const r of i)this.createProperty(r,a[r])}const t=this[Symbol.metadata];if(t!==null){const a=litPropertyMetadata.get(t);if(a!==void 0)for(const[i,r]of a)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[a,i]of this.elementProperties){const r=this._$Eu(a,i);r!==void 0&&this._$Eh.set(r,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const a=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)a.unshift(Me(r))}else t!==void 0&&a.push(Me(t));return a}static _$Eu(t,a){const i=a.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,a=this.constructor.elementProperties;for(const i of a.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return va(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,a,i){this._$AK(t,i)}_$ET(t,a){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:Vt).toAttribute(a,i.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,a){const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const s=i.getPropertyOptions(r),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Vt;this._$Em=r;const p=n.fromAttribute(a,s.type);this[r]=p??this._$Ej?.get(r)??p,this._$Em=null}}requestUpdate(t,a,i,r=!1,s){if(t!==void 0){const n=this.constructor;if(r===!1&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??De)(s,a)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,a,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,a,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??a??this[t]),s!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(a=void 0),this._$AL.set(t,a)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,s]of i){const{wrapped:n}=s,p=this[r];n!==!0||this._$AL.has(r)||p===void 0||this.C(r,void 0,s,p)}}let t=!1;const a=this._$AL;try{t=this.shouldUpdate(a),t?(this.willUpdate(a),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(a)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(a)}willUpdate(t){}_$AE(t){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(a=>this._$ET(a,this[a])),this._$EM()}updated(t){}firstUpdated(t){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[V("elementProperties")]=new Map,j[V("finalized")]=new Map,$a?.({ReactiveElement:j}),(tt.reactiveElementVersions??=[]).push("2.1.2");const Xt=globalThis,je=e=>e,et=Xt.trustedTypes,Ie=et?et.createPolicy("lit-html",{createHTML:e=>e}):void 0,Re="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Be="?"+C,za=`<${Be}>`,T=document,X=()=>T.createComment(""),U=e=>e===null||typeof e!="object"&&typeof e!="function",Ut=Array.isArray,Aa=e=>Ut(e)||typeof e?.[Symbol.iterator]=="function",qt=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,He=/-->/g,Ve=/>/g,M=RegExp(`>|${qt}(?:([^\\s"'>=/]+)(${qt}*=${qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xe=/'/g,Ue=/"/g,qe=/^(?:script|style|textarea|title)$/i,Ea=e=>(t,...a)=>({_$litType$:e,strings:t,values:a}),o=Ea(1),I=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Fe=new WeakMap,L=T.createTreeWalker(T,129);function We(e,t){if(!Ut(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ie!==void 0?Ie.createHTML(t):t}const Sa=(e,t)=>{const a=e.length-1,i=[];let r,s=t===2?"<svg>":t===3?"<math>":"",n=q;for(let p=0;p<a;p++){const l=e[p];let b,x,f=-1,z=0;for(;z<l.length&&(n.lastIndex=z,x=n.exec(l),x!==null);)z=n.lastIndex,n===q?x[1]==="!--"?n=He:x[1]!==void 0?n=Ve:x[2]!==void 0?(qe.test(x[2])&&(r=RegExp("</"+x[2],"g")),n=M):x[3]!==void 0&&(n=M):n===M?x[0]===">"?(n=r??q,f=-1):x[1]===void 0?f=-2:(f=n.lastIndex-x[2].length,b=x[1],n=x[3]===void 0?M:x[3]==='"'?Ue:Xe):n===Ue||n===Xe?n=M:n===He||n===Ve?n=q:(n=M,r=void 0);const w=n===M&&e[p+1].startsWith("/>")?" ":"";s+=n===q?l+za:f>=0?(i.push(b),l.slice(0,f)+Re+l.slice(f)+C+w):l+C+(f===-2?p:w)}return[We(e,s+(e[a]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class F{constructor({strings:t,_$litType$:a},i){let r;this.parts=[];let s=0,n=0;const p=t.length-1,l=this.parts,[b,x]=Sa(t,a);if(this.el=F.createElement(b,i),L.currentNode=this.el.content,a===2||a===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(r=L.nextNode())!==null&&l.length<p;){if(r.nodeType===1){if(r.hasAttributes())for(const f of r.getAttributeNames())if(f.endsWith(Re)){const z=x[n++],w=r.getAttribute(f).split(C),H=/([.?@])?(.*)/.exec(z);l.push({type:1,index:s,name:H[2],strings:w,ctor:H[1]==="."?_a:H[1]==="?"?Pa:H[1]==="@"?Ta:at}),r.removeAttribute(f)}else f.startsWith(C)&&(l.push({type:6,index:s}),r.removeAttribute(f));if(qe.test(r.tagName)){const f=r.textContent.split(C),z=f.length-1;if(z>0){r.textContent=et?et.emptyScript:"";for(let w=0;w<z;w++)r.append(f[w],X()),L.nextNode(),l.push({type:2,index:++s});r.append(f[z],X())}}}else if(r.nodeType===8)if(r.data===Be)l.push({type:2,index:s});else{let f=-1;for(;(f=r.data.indexOf(C,f+1))!==-1;)l.push({type:7,index:s}),f+=C.length-1}s++}}static createElement(t,a){const i=T.createElement("template");return i.innerHTML=t,i}}function R(e,t,a=e,i){if(t===I)return t;let r=i!==void 0?a._$Co?.[i]:a._$Cl;const s=U(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(e),r._$AT(e,a,i)),i!==void 0?(a._$Co??=[])[i]=r:a._$Cl=r),r!==void 0&&(t=R(e,r._$AS(e,t.values),r,i)),t}class Ca{constructor(t,a){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:a},parts:i}=this._$AD,r=(t?.creationScope??T).importNode(a,!0);L.currentNode=r;let s=L.nextNode(),n=0,p=0,l=i[0];for(;l!==void 0;){if(n===l.index){let b;l.type===2?b=new W(s,s.nextSibling,this,t):l.type===1?b=new l.ctor(s,l.name,l.strings,this,t):l.type===6&&(b=new Ma(s,this,t)),this._$AV.push(b),l=i[++p]}n!==l?.index&&(s=L.nextNode(),n++)}return L.currentNode=T,r}p(t){let a=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,a),a+=i.strings.length-2):i._$AI(t[a])),a++}}class W{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,a,i,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=a,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const a=this._$AM;return a!==void 0&&t?.nodeType===11&&(t=a.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,a=this){t=R(this,t,a),U(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==I&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Aa(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:a,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=F.createElement(We(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(a);else{const s=new Ca(r,this),n=s.u(this.options);s.p(a),this.T(n),this._$AH=s}}_$AC(t){let a=Fe.get(t.strings);return a===void 0&&Fe.set(t.strings,a=new F(t)),a}k(t){Ut(this._$AH)||(this._$AH=[],this._$AR());const a=this._$AH;let i,r=0;for(const s of t)r===a.length?a.push(i=new W(this.O(X()),this.O(X()),this,this.options)):i=a[r],i._$AI(s),r++;r<a.length&&(this._$AR(i&&i._$AB.nextSibling,r),a.length=r)}_$AR(t=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);t!==this._$AB;){const i=je(t).nextSibling;je(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class at{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,a,i,r,s){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=a,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,a=this,i,r){const s=this.strings;let n=!1;if(s===void 0)t=R(this,t,a,0),n=!U(t)||t!==this._$AH&&t!==I,n&&(this._$AH=t);else{const p=t;let l,b;for(t=s[0],l=0;l<s.length-1;l++)b=R(this,p[i+l],a,l),b===I&&(b=this._$AH[l]),n||=!U(b)||b!==this._$AH[l],b===d?t=d:t!==d&&(t+=(b??"")+s[l+1]),this._$AH[l]=b}n&&!r&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class _a extends at{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class Pa extends at{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class Ta extends at{constructor(t,a,i,r,s){super(t,a,i,r,s),this.type=5}_$AI(t,a=this){if((t=R(this,t,a,0)??d)===I)return;const i=this._$AH,r=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==d&&(i===d||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Ma{constructor(t,a,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=a,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){R(this,t)}}const La=Xt.litHtmlPolyfillSupport;La?.(F,W),(Xt.litHtmlVersions??=[]).push("3.3.3");const Da=(e,t,a)=>{const i=a?.renderBefore??t;let r=i._$litPart$;if(r===void 0){const s=a?.renderBefore??null;i._$litPart$=r=new W(t.insertBefore(X(),s),s,void 0,a??{})}return r._$AI(e),r};const Ft=globalThis;class h extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Da(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}h._$litElement$=!0,h.finalized=!0,Ft.litElementHydrateSupport?.({LitElement:h});const Oa=Ft.litElementPolyfillSupport;Oa?.({LitElement:h}),(Ft.litElementVersions??=[]).push("4.2.2");const v=u`
  :host {
    box-sizing: border-box;
    color: var(--nami-text, #171717);
    font-family: var(--nami-font-sans, Inter, ui-sans-serif, system-ui, sans-serif);
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,ja=u`
  .soft-control {
    align-items: center;
    background: var(--nami-soft-control-bg, transparent);
    border: var(--nami-soft-control-border-width, 0) solid var(--nami-soft-control-border-color, transparent);
    border-radius: var(--nami-radius-control, 999px);
    color: var(--nami-soft-control-color, var(--nami-icon-color, var(--nami-text-muted, #666b74)));
    cursor: pointer;
    display: inline-flex;
    flex-shrink: 0;
    font: inherit;
    justify-content: center;
    min-height: var(--nami-icon-button-size, var(--nami-control-height, 40px));
    min-width: var(--nami-icon-button-size, var(--nami-control-height, 40px));
    padding: 0;
    position: relative;
    touch-action: manipulation;
    transition:
      background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
      color var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
      box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
  }

  .soft-control::before {
    background: transparent;
    border-radius: inherit;
    content: '';
    inset: 0;
    position: absolute;
    transition:
      inset var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
      background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
  }

  .soft-control:hover::before {
    background: var(--nami-hover-overlay, color-mix(in oklab, #000, transparent 95%));
    inset: -4px;
  }

  .soft-control:active::before {
    background: var(--nami-ripple, color-mix(in oklab, #000, transparent 86%));
    inset: -6px;
  }

  .soft-control:focus-visible {
    box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring, 0 0 0 3px color-mix(in oklab, currentColor, transparent 55%)));
    outline: none;
  }

  .soft-control[aria-pressed='true'],
  .soft-control[aria-selected='true'] {
    color: var(--nami-color-primary, #3b82f6);
  }

  .soft-control[aria-pressed='true']::before,
  .soft-control[aria-selected='true']::before {
    background: var(--nami-accent-hover-overlay, color-mix(in oklab, currentColor, transparent 90%));
  }

  .soft-control:active .icon-motion {
    transform: scale(0.9);
  }

  .icon-motion {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    position: relative;
    transition: transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
    z-index: 1;
  }

  .soft-control:disabled,
  .soft-control[aria-disabled='true'] {
    color: var(--nami-text-muted, #666b74);
    cursor: not-allowed;
    opacity: 0.52;
  }

  @media (prefers-reduced-motion: reduce) {
    .soft-control,
    .soft-control::before,
    .icon-motion {
      transition-duration: 1ms;
    }

    .soft-control:active .icon-motion {
      transform: none;
    }
  }
`,dt=class dt extends h{constructor(){super(),this.railWidth="",this.mobileBarHeight="",this.breakpoint="compact",this.sticky=!0,this.safeArea=!1}updated(){this.railWidth?this.style.setProperty("--nami-app-shell-rail-width",this.normalizeLength(this.railWidth)):this.style.removeProperty("--nami-app-shell-rail-width"),this.mobileBarHeight?this.style.setProperty("--nami-app-shell-mobile-bar-height",this.normalizeLength(this.mobileBarHeight)):this.style.removeProperty("--nami-app-shell-mobile-bar-height")}normalizeLength(t){return/^\d+(\.\d+)?$/.test(t)?`${t}px`:t}render(){return o`
      <div class="shell" part="base">
        <aside class="rail" part="rail"><slot name="rail"></slot></aside>
        <header class="top" part="top"><slot name="top"></slot></header>
        <main part="control"><slot></slot></main>
        <nav class="bottom" part="bottom"><slot name="bottom"></slot></nav>
      </div>
    `}};dt.properties={railWidth:{attribute:"rail-width"},mobileBarHeight:{attribute:"mobile-bar-height"},breakpoint:{reflect:!0},sticky:{type:Boolean,reflect:!0},safeArea:{attribute:"safe-area",type:Boolean,reflect:!0}},dt.styles=[v,u`
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
        width: var(--nami-app-shell-rail-width, 56px);
        z-index: 20;
      }

      :host(:not([sticky])) .rail {
        position: absolute;
      }

      .top,
      .bottom {
        display: none;
      }

      main {
        min-height: 100dvh;
        padding-left: var(--nami-app-shell-rail-width, 56px);
      }

      @media (width <= 639px) {
        :host(:not([breakpoint='medium']):not([breakpoint='wide'])) .rail {
          display: none;
        }

        :host(:not([breakpoint='medium']):not([breakpoint='wide'])) .top,
        :host(:not([breakpoint='medium']):not([breakpoint='wide'])) .bottom {
          display: block;
        }

        :host(:not([breakpoint='medium']):not([breakpoint='wide'])) main {
          padding: var(--nami-app-shell-mobile-bar-height, 56px) 0;
        }
      }

      @media (width <= 880px) {
        :host([breakpoint='medium']) .rail {
          display: none;
        }

        :host([breakpoint='medium']) .top,
        :host([breakpoint='medium']) .bottom {
          display: block;
        }

        :host([breakpoint='medium']) main {
          padding: var(--nami-app-shell-mobile-bar-height, 56px) 0;
        }
      }

      @media (width <= 1080px) {
        :host([breakpoint='wide']) .rail {
          display: none;
        }

        :host([breakpoint='wide']) .top,
        :host([breakpoint='wide']) .bottom {
          display: block;
        }

        :host([breakpoint='wide']) main {
          padding: var(--nami-app-shell-mobile-bar-height, 56px) 0;
        }
      }

      @media (width <= 1080px) {
        .top,
        .bottom {
          background: var(--nami-surface-overlay);
          border-color: var(--nami-border);
          box-shadow: var(--nami-app-shell-shadow, 0 0 24px color-mix(in oklab, var(--nami-shadow-color), transparent 70%));
          height: var(--nami-app-shell-mobile-bar-height, 56px);
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

        :host([safe-area]) .top {
          height: calc(var(--nami-app-shell-mobile-bar-height, 56px) + env(safe-area-inset-top));
          padding-top: env(safe-area-inset-top);
        }

        :host([safe-area]) .bottom {
          height: calc(var(--nami-app-shell-mobile-bar-height, 56px) + env(safe-area-inset-bottom));
          padding-bottom: env(safe-area-inset-bottom);
        }
      }
    `];let Wt=dt;const mt=class mt extends h{constructor(){super(),this.variant="neutral",this.tone="soft"}render(){return o`<span class="base" part="base"><slot></slot></span>`}};mt.properties={variant:{reflect:!0},tone:{reflect:!0}},mt.styles=[v,u`
      :host {
        display: inline-flex;
      }

      .base {
        align-items: center;
        background: var(--badge-bg, var(--nami-badge-bg, var(--nami-hover-overlay)));
        border: var(--nami-badge-border-width, var(--nami-style-stroke-width, 1px)) solid var(--badge-border, var(--nami-badge-border, transparent));
        border-radius: var(--nami-badge-radius, var(--nami-radius-control, 999px));
        color: var(--badge-fg, var(--nami-badge-fg, var(--nami-text)));
        display: inline-flex;
        font-size: var(--nami-badge-font-size, 0.75rem);
        font-weight: 800;
        gap: var(--nami-space-1, 4px);
        line-height: 1;
        min-height: var(--nami-badge-height, 24px);
        padding: 0 var(--nami-badge-padding-x, 9px);
        white-space: nowrap;
      }

      :host([variant='primary']) {
        --badge-bg: var(--nami-color-primary-muted);
        --badge-border: color-mix(in oklab, var(--nami-color-primary), transparent 54%);
        --badge-fg: var(--nami-color-primary);
      }

      :host([variant='success']) {
        --badge-bg: color-mix(in oklab, #22c55e, transparent 88%);
        --badge-border: color-mix(in oklab, #22c55e, transparent 52%);
        --badge-fg: #15803d;
      }

      :host([variant='warning']) {
        --badge-bg: color-mix(in oklab, #f59e0b, transparent 86%);
        --badge-border: color-mix(in oklab, #f59e0b, transparent 48%);
        --badge-fg: #92400e;
      }

      :host([variant='danger']) {
        --badge-bg: color-mix(in oklab, var(--nami-color-danger), transparent 88%);
        --badge-border: color-mix(in oklab, var(--nami-color-danger), transparent 54%);
        --badge-fg: var(--nami-color-danger);
      }

      :host([tone='solid']) {
        --badge-bg: var(--nami-text);
        --badge-border: var(--nami-text);
        --badge-fg: var(--nami-text-inverse);
      }

      :host([tone='solid'][variant='primary']) {
        --badge-bg: var(--nami-color-primary);
        --badge-border: var(--nami-color-primary);
        --badge-fg: var(--nami-text-inverse);
      }

      :host([tone='solid'][variant='success']) {
        --badge-bg: #22c55e;
        --badge-border: #22c55e;
        --badge-fg: #fff;
      }

      :host([tone='solid'][variant='warning']) {
        --badge-bg: #f59e0b;
        --badge-border: #f59e0b;
        --badge-fg: #1f1300;
      }

      :host([tone='solid'][variant='danger']) {
        --badge-bg: var(--nami-color-danger);
        --badge-border: var(--nami-color-danger);
        --badge-fg: #fff;
      }
    `];let Kt=mt;const Yt="lit-localize-status";const Ia=e=>typeof e!="string"&&"strTag"in e,Ke=(e,t,a)=>{let i=e[0];for(let r=1;r<e.length;r++)i+=t[a?a[r-1]:r-1],i+=e[r];return i};const Ye=(e=>Ia(e)?Ke(e.strings,e.values):e);let A=Ye,Qe=!1;function Ra(e){if(Qe)throw new Error("lit-localize can only be configured once");A=e,Qe=!0}class Ba{constructor(t){this.__litLocalizeEventHandler=a=>{a.detail.status==="ready"&&this.host.requestUpdate()},this.host=t}hostConnected(){window.addEventListener(Yt,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(Yt,this.__litLocalizeEventHandler)}}const _=e=>e.addController(new Ba(e));class Ze{constructor(){this.settled=!1,this.promise=new Promise((t,a)=>{this._resolve=t,this._reject=a})}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}const E=[];for(let e=0;e<256;e++)E[e]=(e>>4&15).toString(16)+(e&15).toString(16);function Ha(e){let t=0,a=8997,i=0,r=33826,s=0,n=40164,p=0,l=52210;for(let b=0;b<e.length;b++)a^=e.charCodeAt(b),t=a*435,i=r*435,s=n*435,p=l*435,s+=a<<8,p+=r<<8,i+=t>>>16,a=t&65535,s+=i>>>16,r=i&65535,l=p+(s>>>16)&65535,n=s&65535;return E[l>>8]+E[l&255]+E[n>>8]+E[n&255]+E[r>>8]+E[r&255]+E[a>>8]+E[a&255]}const Va="",Xa="h",Ua="s";function qa(e,t){return(t?Xa:Ua)+Ha(typeof e=="string"?e:e.join(Va))}const Je=new WeakMap,Ge=new Map;function Fa(e,t,a){if(e){const i=a?.id??Wa(t),r=e[i];if(r){if(typeof r=="string")return r;if("strTag"in r)return Ke(r.strings,t.values,r.values);{let s=Je.get(r);return s===void 0&&(s=r.values,Je.set(r,s)),{...r,values:s.map(n=>t.values[n])}}}}return Ye(t)}function Wa(e){const t=typeof e=="string"?e:e.strings;let a=Ge.get(t);return a===void 0&&(a=qa(t,typeof e!="string"&&!("strTag"in e)),Ge.set(t,a)),a}function Qt(e){window.dispatchEvent(new CustomEvent(Yt,{detail:e}))}let it="",Zt,Ne,rt,Jt,ta,D=new Ze;D.resolve();let st=0;const Ka=e=>(Ra(((t,a)=>Fa(ta,t,a))),it=Ne=e.sourceLocale,rt=new Set(e.targetLocales),rt.add(e.sourceLocale),Jt=e.loadLocale,{getLocale:Ya,setLocale:Qa}),Ya=()=>it,Qa=e=>{if(e===(Zt??it))return D.promise;if(!rt||!Jt)throw new Error("Internal error");if(!rt.has(e))throw new Error("Invalid locale code");st++;const t=st;return Zt=e,D.settled&&(D=new Ze),Qt({status:"loading",loadingLocale:e}),(e===Ne?Promise.resolve({templates:void 0}):Jt(e)).then(i=>{st===t&&(it=e,Zt=void 0,ta=i.templates,Qt({status:"ready",readyLocale:e}),D.resolve())},i=>{st===t&&(Qt({status:"error",errorLocale:e,errorMessage:i.toString()}),D.reject(i))}),D.promise};function y(e,t,a,i={}){return e.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,...i,detail:a}))}function m(e,t){customElements.get(e)||customElements.define(e,t)}const ht=class ht extends h{constructor(){super(),_(this),this.label=""}render(){return o`<span class="indicator" part="base indicator" role="status" aria-label=${this.label||A("Loading",{id:"nami.spinner.loading"})}></span>`}};ht.properties={size:{reflect:!0},label:{}},ht.styles=[v,u`
      :host {
        --spinner-size: var(--nami-icon-size, 1em);
        display: inline-flex;
        height: var(--spinner-size);
        width: var(--spinner-size);
      }

      :host([size='sm']) {
        --spinner-size: 14px;
      }

      :host([size='md']) {
        --spinner-size: 18px;
      }

      :host([size='lg']) {
        --spinner-size: 24px;
      }

      .indicator {
        animation: nami-spinner-rotate 900ms linear infinite;
        border: 2px solid var(--nami-spinner-track-color, color-mix(in oklab, currentColor, transparent 72%));
        border-radius: 50%;
        border-top-color: currentColor;
        display: inline-block;
        height: 100%;
        width: 100%;
      }

      @keyframes nami-spinner-rotate {
        to {
          transform: rotate(360deg);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .indicator {
          animation-duration: 1ms;
        }
      }
    `];let B=ht;m("nami-spinner",B);const pt=class pt extends h{constructor(){super(),_(this),this.variant="solid",this.disabled=!1,this.loading=!1,this.type="button"}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}if(!y(this,"nami-click",{sourceEvent:t},{cancelable:!0})){t.preventDefault();return}this.runFormAction()}runFormAction(){const t=this.closest("form");t&&(this.type==="submit"?t.requestSubmit():this.type==="reset"&&t.reset())}render(){return o`
      <button
        part="base control"
        type=${this.type}
        ?disabled=${this.disabled||this.loading}
        aria-busy=${this.loading?"true":"false"}
        @click=${this.handleClick}
      >
        ${this.loading?o`<nami-spinner size="sm" label=${A("Loading",{id:"nami.spinner.loading"})} part="indicator"></nami-spinner>`:o`<slot name="icon" part="icon"></slot>`}
        <span part="label"><slot></slot></span>
        ${this.loading?d:o`<slot name="actions"></slot>`}
      </button>
    `}};pt.properties={variant:{reflect:!0},size:{reflect:!0},disabled:{type:Boolean,reflect:!0},loading:{type:Boolean,reflect:!0},type:{}},pt.styles=[v,u`
      :host {
        --button-height: var(--nami-control-height, var(--nami-control-height-md, 40px));
        --button-padding: var(--nami-control-padding-x, 16px);
        display: inline-flex;
      }

      button {
        align-items: center;
        background: var(--nami-button-bg, var(--nami-color-primary));
        border: var(--nami-button-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-button-border, transparent);
        border-radius: var(--nami-button-radius, var(--nami-radius-control, 999px));
        color: var(--nami-button-fg, var(--nami-text-inverse));
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        font-weight: 600;
        gap: var(--nami-space-2, 6px);
        justify-content: center;
        min-height: var(--button-height);
        min-width: var(--button-height);
        padding: 0 var(--button-padding);
        font-size: var(--nami-control-font-size, 0.9375rem);
        position: relative;
        box-shadow: var(--nami-button-shadow, none);
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          color var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        user-select: none;
      }

      :host([size='sm']) {
        --button-height: var(--nami-control-height-sm, 32px);
        --button-padding: 12px;
        --nami-control-font-size: 0.875rem;
      }

      :host([size='md']) {
        --button-height: var(--nami-control-height-md, 40px);
        --button-padding: 16px;
        --nami-control-font-size: 0.9375rem;
      }

      :host([size='lg']) {
        --button-height: var(--nami-control-height-lg, 48px);
        --button-padding: 20px;
        --nami-control-font-size: 1rem;
      }

      :host([variant='soft']) button {
        background: var(--nami-accent-hover-overlay, var(--nami-color-primary-muted));
        color: var(--nami-color-primary);
      }

      :host([variant='outline']) button {
        background: transparent;
        border-color: var(--nami-border, currentColor);
        color: var(--nami-text);
      }

      :host([variant='ghost']) button {
        background: transparent;
        color: var(--nami-text);
      }

      button:hover:not(:disabled) {
        background: var(--nami-button-hover-bg, var(--nami-color-primary-hover));
      }

      :host([variant='soft']) button:hover:not(:disabled),
      :host([variant='ghost']) button:hover:not(:disabled),
      :host([variant='outline']) button:hover:not(:disabled) {
        background: var(--nami-hover-overlay);
      }

      button:active:not(:disabled) {
        transform: scale(0.98);
      }

      button:focus-visible {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
        outline: none;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.54;
      }

      nami-spinner {
        color: currentColor;
      }

      ::slotted([slot='icon']) {
        flex: 0 0 auto;
      }

      @media (prefers-reduced-motion: reduce) {
        button {
          transition-duration: 1ms;
        }

        button:active:not(:disabled) {
          transform: none;
        }
      }
    `];let Gt=pt;const ut=class ut extends h{constructor(){super(),this.variant="surface"}syncSlotState(t){const a=t.currentTarget,i=a.name||"default",r=a.assignedNodes({flatten:!0}).some(s=>s.nodeType!==Node.TEXT_NODE||s.textContent?.trim());i==="header"&&this.toggleAttribute("has-header",r),i==="actions"&&this.toggleAttribute("has-actions",r),i==="footer"&&this.toggleAttribute("has-footer",r)}render(){return o`
      <article class="base" part="base">
        <header part="header"><slot name="header" @slotchange=${this.syncSlotState}></slot></header>
        <section class="body" part="body"><slot></slot></section>
        <div class="actions" part="actions"><slot name="actions" @slotchange=${this.syncSlotState}></slot></div>
        <footer part="footer"><slot name="footer" @slotchange=${this.syncSlotState}></slot></footer>
      </article>
    `}};ut.properties={variant:{reflect:!0}},ut.styles=[v,u`
      :host {
        display: block;
      }

      .base {
        background: var(--nami-card-bg, var(--nami-surface-raised));
        border: var(--nami-card-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-card-border, var(--nami-border));
        border-radius: var(--nami-card-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-card-shadow, none);
        color: var(--nami-card-fg, var(--nami-text));
        display: grid;
        gap: var(--nami-card-gap, var(--nami-space-3, 10px));
        padding: var(--nami-card-padding, var(--nami-space-4, 16px));
      }

      :host([variant='inset']) .base {
        background: var(--nami-card-inset-bg, var(--nami-surface-inset));
      }

      :host([variant='outline']) .base {
        background: transparent;
      }

      :host(:not([has-header])) header,
      :host(:not([has-actions])) .actions,
      :host(:not([has-footer])) footer {
        display: none;
      }

      header,
      footer,
      .actions {
        min-width: 0;
      }

      .body {
        min-width: 0;
      }

      .actions {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--nami-space-2, 6px);
      }
    `];let Nt=ut;const vt=class vt extends h{constructor(){super(),this.value="",this.selected=!1,this.checkbox=!1,this.disabled=!1}handleClick(t){this.disabled||(this.checkbox&&(this.selected=!this.selected),y(this,"nami-change",{selected:this.selected,value:this.value,sourceEvent:t}),y(this,"nami-select",{selected:this.selected,value:this.value,sourceEvent:t}))}render(){return o`
      <button
        part="base control"
        type="button"
        role=${this.checkbox?"checkbox":"button"}
        aria-checked=${this.checkbox?String(this.selected):void 0}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot name="icon" part="icon"></slot>
        <span part="label"><slot></slot></span>
      </button>
    `}};vt.properties={value:{},selected:{type:Boolean,reflect:!0},checkbox:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}},vt.styles=[v,u`
      :host {
        display: inline-flex;
      }

      button {
        align-items: center;
        background: var(--nami-chip-bg, var(--nami-hover-overlay));
        border: var(--nami-chip-border-width, 0) solid var(--nami-chip-border-color, transparent);
        border-radius: var(--nami-chip-radius, var(--nami-radius-control, 999px));
        color: var(--nami-style-on-paper, var(--nami-text));
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        gap: var(--nami-space-2, 6px);
        min-height: 31px;
        padding: 0 12px;
        box-shadow: var(--nami-chip-shadow, none);
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          color var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
      }

      :host([selected]) button {
        background: var(--nami-chip-selected-bg, var(--nami-color-primary));
        color: var(--nami-text-inverse);
      }

      button:hover:not(:disabled) {
        background: var(--nami-accent-hover-overlay, var(--nami-hover-overlay));
      }

      :host([selected]) button:hover:not(:disabled) {
        background: var(--nami-color-primary-hover);
      }

      button:active:not(:disabled) {
        transform: scale(0.98);
      }

      button:focus-visible {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
        outline: none;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.54;
      }
    `];let te=vt;function nt(e){try{return e.attachInternals()}catch{return null}}function ot(e,t){typeof e?.setFormValue=="function"&&e.setFormValue(t)}function ee(e,t,a,i){typeof e?.setValidity=="function"&&e.setValidity(t,a,i)}const Q=class Q extends h{constructor(){super(),this.internals=nt(this),this.name="",this.value="on",this.checked=!1,this.defaultChecked=!1,this.disabled=!1,this.required=!1,this.error=""}updated(){this.dataset.state=this.checked?"checked":"unchecked",this.toggleAttribute("data-disabled",this.disabled),this.toggleAttribute("data-invalid",!!(this.error||this.required&&!this.checked)),ot(this.internals,!this.disabled&&this.checked?this.value:null),ee(this.internals,this.validityFlags,this.validationMessage||void 0)}formResetCallback(){this.checked=this.defaultChecked}checkValidity(){return Object.keys(this.validityFlags).length===0}reportValidity(){return this.checkValidity()}get validationMessage(){return this.disabled?"":this.error?this.error:this.required&&!this.checked?"This field is required":""}get validityFlags(){return this.disabled?{}:this.error?{customError:!0}:this.required&&!this.checked?{valueMissing:!0}:{}}toggle(t){this.disabled||(this.checked=!this.checked,y(this,"nami-change",{checked:this.checked,value:this.value,sourceEvent:t}))}render(){return o`
      <button
        part="base control"
        type="button"
        role="checkbox"
        aria-checked=${this.checked?"true":"false"}
        aria-invalid=${this.error?"true":"false"}
        ?disabled=${this.disabled}
        @click=${this.toggle}
      >
        <span class="box" part="indicator"><span class="mark" aria-hidden="true">${"✓"}</span></span>
        <span part="label"><slot></slot></span>
      </button>
    `}};Q.formAssociated=!0,Q.properties={name:{},value:{},checked:{type:Boolean,reflect:!0},defaultChecked:{attribute:"default-checked",type:Boolean},disabled:{type:Boolean,reflect:!0},required:{type:Boolean,reflect:!0},error:{reflect:!0,useDefault:!0}},Q.styles=[v,u`
      :host {
        display: inline-flex;
      }

      button {
        align-items: center;
        background: transparent;
        border: 0;
        color: var(--nami-text);
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        gap: var(--nami-space-3, 10px);
        padding: 0;
      }

      .box {
        align-items: center;
        background: var(--nami-checkbox-bg, transparent);
        border: var(--nami-checkbox-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-checkbox-border, var(--nami-border));
        border-radius: var(--nami-checkbox-radius, var(--nami-radius-tight, 4px));
        box-sizing: border-box;
        color: var(--nami-checkbox-indicator-color, #fff);
        display: inline-flex;
        height: 20px;
        justify-content: center;
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        width: 20px;
      }

      :host([checked]) .box {
        background: var(--nami-color-primary);
        border-color: var(--nami-color-primary);
      }

      :host([error]) .box {
        border-color: var(--nami-color-danger);
      }

      button:focus-visible .box {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.54;
      }

      .mark {
        display: inline-block;
        font-size: 0.9rem;
        line-height: 1;
        opacity: 0;
        transform: scale(0.82);
        transition:
          opacity var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
      }

      :host([checked]) .mark {
        opacity: 1;
        transform: scale(1);
      }
    `];let ae=Q;const ft=class ft extends h{constructor(){super(),this.gap="sm",this.align="",this.justify=""}updated(){this.align?this.style.setProperty("--nami-cluster-align",this.align):this.style.removeProperty("--nami-cluster-align"),this.justify?this.style.setProperty("--nami-cluster-justify",this.justify):this.style.removeProperty("--nami-cluster-justify")}render(){return o`<div class="base" part="base"><slot></slot></div>`}};ft.properties={gap:{reflect:!0},align:{reflect:!0},justify:{reflect:!0}},ft.styles=[v,u`
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
    `];let ie=ft;const ea="en-US",Za=["zh-CN"],Ja=["en-US","zh-CN"],Ga={"zh-CN":()=>Promise.resolve().then(()=>Ci)},Na=globalThis,aa=Na.__namiLocalization??=Ka({sourceLocale:ea,targetLocales:Za,loadLocale:e=>Ga[e]()}),ia=aa.getLocale;function ti(e){return Ja.includes(e)}function ra(e){return e&&ti(e)?e:ea}function ei(e){return aa.setLocale(ra(e))}const bt=class bt extends h{constructor(){super(),this.lastAppliedLocale="",this.handleLocaleStatus=t=>{y(this,"nami-locale-status",t.detail)},this.locale="en-US",this.dir="ltr"}connectedCallback(){super.connectedCallback(),window.addEventListener("lit-localize-status",this.handleLocaleStatus),this.applyDirection(),this.applyLocale()}disconnectedCallback(){window.removeEventListener("lit-localize-status",this.handleLocaleStatus),super.disconnectedCallback()}updated(t){t.has("locale")&&this.applyLocale(),t.has("dir")&&this.applyDirection()}applyDirection(){this.setAttribute("dir",this.dir)}async applyLocale(){const t=ra(this.locale);if(t!==this.locale){this.locale=t;return}this.applyDirection(),!(this.lastAppliedLocale===t&&ia()===t)&&(this.lastAppliedLocale=t,ia()!==t&&await ei(t),y(this,"nami-change",{value:t,locale:t,dir:this.dir}))}render(){return o`<slot></slot>`}};bt.properties={locale:{reflect:!0},dir:{reflect:!0}},bt.styles=[v];let re=bt;const gt=class gt extends h{constructor(){super(),this.size="lg",this.padded=!0}render(){return o`<div class="base" part="base"><slot></slot></div>`}};gt.properties={size:{reflect:!0},padded:{type:Boolean,reflect:!0}},gt.styles=[v,u`
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
    `];let se=gt;const ne=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");function lt(e){const t=[...Array.from(e.querySelectorAll(ne)),...ai(e)];return Array.from(new Set(t)).filter(ii)}function ai(e){return Array.from(e.querySelectorAll("slot")).flatMap(t=>t.assignedElements({flatten:!0}).flatMap(a=>a instanceof HTMLElement?[...a.matches(ne)?[a]:[],...Array.from(a.querySelectorAll(ne))]:[]))}function ii(e){return!e.hasAttribute("disabled")&&e.tabIndex>=0}function sa(e,t){if(e.key!=="Tab")return;const a=lt(t);if(a.length===0)return;const i=a[0],r=a[a.length-1];e.shiftKey&&document.activeElement===i?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),i.focus())}function na(e){e instanceof HTMLElement&&e.focus()}const yt=class yt extends h{constructor(){super(),this.previousActiveElement=null,this.open=!1,this.label="",this.closeOnBackdrop=!0}get dialogElement(){return this.renderRoot.querySelector("dialog")}get focusableElements(){return lt(this.dialogElement)}updated(t){if(!t.has("open"))return;const a=t.get("open")===!0;this.open&&!this.dialogElement.open&&(this.previousActiveElement=document.activeElement,this.dialogElement.showModal(),requestAnimationFrame(()=>this.focusInitialElement()),y(this,"nami-open",void 0)),!this.open&&this.dialogElement.open&&this.dialogElement.close(),!this.open&&a&&(this.restoreFocus(),y(this,"nami-close",this.closeSourceEvent?{sourceEvent:this.closeSourceEvent}:void 0),this.closeSourceEvent=void 0)}focusInitialElement(){this.focusableElements[0]?.focus()}restoreFocus(){na(this.previousActiveElement),this.previousActiveElement=null}close(t){this.open&&(this.closeSourceEvent=t,this.open=!1)}handleCancel(t){t.preventDefault(),this.close(t)}handleClick(t){this.closeOnBackdrop&&t.target===this.dialogElement&&this.close(t)}handleNativeClose(){this.open&&this.close()}handleKeydown(t){this.open&&sa(t,this.dialogElement)}render(){return o`
      <dialog
        part="base"
        aria-label=${this.label||d}
        @cancel=${this.handleCancel}
        @click=${this.handleClick}
        @close=${this.handleNativeClose}
        @keydown=${this.handleKeydown}
      >
        <div class="panel" part="control">
          <header part="header">
            <h2 part="label"><slot name="label">${this.label}</slot></h2>
            <button class="close" type="button" aria-label="Close" part="actions" @click=${t=>this.close(t)}>X</button>
          </header>
          <section part="description"><slot></slot></section>
          <footer part="footer"><slot name="actions"></slot></footer>
        </div>
      </dialog>
    `}};yt.properties={open:{type:Boolean,reflect:!0},label:{},closeOnBackdrop:{attribute:"close-on-backdrop",type:Boolean,reflect:!0}},yt.styles=[v,u`
      dialog {
        background: var(--nami-dialog-bg, var(--nami-surface-raised));
        border: var(--nami-dialog-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-dialog-border-color, var(--nami-border));
        border-radius: var(--nami-dialog-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-dialog-shadow);
        color: var(--nami-style-on-paper, var(--nami-text));
        margin: auto;
        max-width: min(560px, calc(100vw - 32px));
        min-width: min(420px, calc(100vw - 32px));
        padding: 0;
        transition:
          opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      dialog::backdrop {
        background: var(--nami-overlay-backdrop, color-mix(in oklab, #000, transparent 52%));
        backdrop-filter: blur(8px);
      }

      .panel {
        display: grid;
        gap: var(--nami-space-4, 16px);
        padding: var(--nami-space-5, 24px);
      }

      header {
        align-items: center;
        display: flex;
        justify-content: space-between;
      }

      h2 {
        font-size: 1.125rem;
        line-height: 1.3;
        margin: 0;
      }

      .close {
        background: transparent;
        border: 0;
        border-radius: var(--nami-radius-control, 999px);
        color: var(--nami-style-on-paper-muted, var(--nami-icon-color));
        cursor: pointer;
        height: 36px;
        width: 36px;
      }

      .close:hover {
        background: var(--nami-hover-overlay);
      }

      .close:focus-visible {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
        outline: none;
      }

      footer {
        display: flex;
        gap: var(--nami-space-2, 6px);
        justify-content: flex-end;
      }
    `];let oe=yt;const xt=class xt extends h{constructor(){super(),this.previousActiveElement=null,this.handleKeydown=t=>{t.key==="Escape"&&this.open&&this.close(t)},this.open=!1,this.placement="left"}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleKeydown)}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeydown),super.disconnectedCallback()}close(t){this.open&&(this.closeSourceEvent=t,this.open=!1)}updated(t){if(!t.has("open"))return;const a=t.get("open")===!0;this.open?(this.previousActiveElement=document.activeElement,requestAnimationFrame(()=>this.focusInitialElement()),y(this,"nami-open",void 0)):a&&(this.restoreFocus(),y(this,"nami-close",this.closeSourceEvent?{sourceEvent:this.closeSourceEvent}:void 0),this.closeSourceEvent=void 0)}get panelElement(){return this.renderRoot.querySelector(".panel")}focusInitialElement(){const t=this.panelElement;if(!t)return;(lt(t)[0]??t).focus()}handlePanelKeydown(t){const a=this.panelElement;if(a){if(t.key==="Tab"&&lt(a).length===0){t.preventDefault(),a.focus();return}sa(t,a)}}restoreFocus(){na(this.previousActiveElement),this.previousActiveElement=null}render(){return o`
      <div class="backdrop" part="backdrop" @click=${t=>this.close(t)}></div>
      <aside
        class="panel"
        part="base control"
        role="dialog"
        aria-modal=${this.open?"true":"false"}
        aria-hidden=${this.open?"false":"true"}
        tabindex=${this.open?"0":"-1"}
        ?inert=${!this.open}
        @keydown=${this.handlePanelKeydown}
      >
        <slot name="label" part="label"></slot>
        <slot></slot>
        <slot name="actions"></slot>
      </aside>
    `}};xt.properties={open:{type:Boolean,reflect:!0},placement:{reflect:!0}},xt.styles=[v,u`
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
    `];let le=xt;const wt=class wt extends h{constructor(){super(),this.name="empty",this.size="md"}renderBadge(t){return o`
      <circle class="primary" cx="100" cy="66" r="28"></circle>
      <text x="100" y="77" text-anchor="middle" fill="white" font-size="32" font-family="ui-sans-serif, system-ui" font-weight="800">${t}</text>
    `}renderStateMark(){const t={empty:o`<path class="line" d="M80 77h40M90 92h20"></path>`,search:o`<circle class="line" cx="91" cy="72" r="19"></circle><path class="line" d="M105 86l22 22"></path>`,success:o`<path class="line" d="M78 72l16 16 31-35"></path>`,error:o`<path class="line" d="M82 58l36 36M118 58L82 94"></path>`,warning:o`<path class="accent" d="M100 44l40 72H60z"></path><path class="line thin-line" d="M100 68v28M100 108h.1"></path>`,info:o`${this.renderBadge("i")}`,forbidden:o`${this.renderBadge("!")}<path class="line" d="M78 90l44-44"></path>`,"not-found":o`${this.renderBadge("?")}`,"server-error":o`${this.renderBadge("5")}<path class="line thin-line" d="M74 114h52"></path>`};return t[this.name]??t.empty}render(){return o`
      <svg part="base illustration image" viewBox="0 0 200 160" role="img" aria-label=${this.name}>
        <ellipse class="bg" cx="100" cy="134" rx="62" ry="12"></ellipse>
        <rect class="secondary" x="54" y="54" width="92" height="70" rx="14"></rect>
        <path class="primary" d="M70 46h60l14 22H56z"></path>
        <path class="muted" d="M48 105h104v16a12 12 0 0 1-12 12H60a12 12 0 0 1-12-12z"></path>
        ${this.renderStateMark()}
        <path class="line thin-line" d="M42 129h116"></path>
        <circle class="accent" cx="153" cy="47" r="6"></circle>
        <circle class="muted" cx="45" cy="49" r="5"></circle>
      </svg>
    `}};wt.properties={name:{reflect:!0},size:{reflect:!0}},wt.styles=[v,u`
      :host {
        --illustration-size: var(--nami-illus-size-md, 140px);
        color: var(--nami-illus-primary, var(--nami-color-primary, #3b82f6));
        display: inline-flex;
        height: var(--illustration-size);
        width: var(--illustration-size);
      }

      :host([size='sm']) {
        --illustration-size: var(--nami-illus-size-sm, 92px);
      }

      :host([size='lg']) {
        --illustration-size: var(--nami-illus-size-lg, 184px);
      }

      svg {
        display: block;
        height: 100%;
        overflow: visible;
        width: 100%;
      }

      .bg {
        fill: var(--nami-illus-bg, color-mix(in oklab, currentColor, transparent 92%));
      }

      .primary {
        fill: var(--nami-illus-primary, currentColor);
      }

      .secondary {
        fill: var(--nami-illus-secondary, color-mix(in oklab, currentColor, #fff 58%));
      }

      .accent {
        fill: var(--nami-illus-accent, #f5b84b);
      }

      .muted {
        fill: var(--nami-illus-muted, color-mix(in oklab, currentColor, transparent 66%));
      }

      .line {
        fill: none;
        stroke: var(--nami-illus-line, color-mix(in oklab, currentColor, #111 34%));
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 3.5;
      }

      .thin-line {
        stroke-width: 2.2;
      }
    `];let K=wt;m("nami-illustration",K);const kt=class kt extends h{constructor(){super(),_(this),this.illustration="empty",this.title="",this.description="",this.compact=!1}render(){const t=this.description||A("No data",{id:"nami.empty.description"}),a=this.title||t||A("Empty state",{id:"nami.empty.aria"});return o`
      <section class="base" part="base" aria-label=${a}>
        <slot name="illustration" part="illustration">
          <nami-illustration name=${this.illustration} size=${this.compact?"sm":"md"}></nami-illustration>
        </slot>
        ${this.title?o`<div class="title" part="title"><slot name="title">${this.title}</slot></div>`:d}
        <div class="description" part="description"><slot name="description">${t}</slot></div>
        <div class="actions" part="actions"><slot name="actions"></slot></div>
      </section>
    `}};kt.properties={illustration:{reflect:!0},title:{reflect:!0},description:{reflect:!0},compact:{type:Boolean,reflect:!0}},kt.styles=[v,u`
      :host {
        display: block;
      }

      .base {
        align-items: center;
        color: var(--nami-style-on-paper, var(--nami-text));
        display: grid;
        background: var(--nami-empty-bg, transparent);
        border: var(--nami-empty-border-width, 0) solid var(--nami-empty-border-color, transparent);
        border-radius: var(--nami-empty-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-empty-shadow, none);
        gap: var(--nami-empty-gap, 12px);
        justify-items: center;
        padding: var(--nami-space-5, 24px);
        text-align: center;
      }

      :host([compact]) .base {
        padding: var(--nami-space-3, 10px);
      }

      .title {
        color: var(--nami-empty-title-color, var(--nami-text));
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.35;
      }

      .description {
        color: var(--nami-empty-description-color, var(--nami-text-muted));
        font-size: 0.925rem;
        line-height: 1.6;
        max-width: 42ch;
      }

      .actions {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--nami-space-2, 6px);
        justify-content: center;
      }
    `];let ce=kt;const oa=new Map;function de(e){const t=(oa.get(e)??0)+1;return oa.set(e,t),`${e}-${t}`}const $t=class $t extends h{constructor(){super(),this.metaId=`${de("nami-field")}-meta`,this.label="",this.helperText="",this.error="",this.required=!1,this.disabled=!1}updated(){this.dataset.state=this.error?"invalid":"valid",this.toggleAttribute("data-disabled",this.disabled),this.toggleAttribute("data-invalid",!!this.error)}focusControl(){this.renderRoot.querySelector("slot:not([name])")?.assignedElements({flatten:!0}).find(i=>"focus"in i)?.focus?.()}render(){const t=this.error||this.helperText;return o`
      <div class="base" part="base">
        ${this.label?o`<span class="label" part="label" @click=${this.focusControl}>${this.label}${this.required?" *":""}</span>`:d}
        <div class="control" part="control"><slot></slot></div>
        ${t?o`<div id=${this.metaId} class="meta ${this.error?"error":""}" part=${this.error?"error":"description"}>${t}</div>`:o`<slot name="description"></slot>`}
      </div>
    `}};$t.properties={label:{},helperText:{attribute:"helper-text"},error:{reflect:!0,useDefault:!0},required:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}},$t.styles=[v,u`
      :host {
        color: var(--nami-text);
        display: block;
      }

      .base {
        display: grid;
        gap: var(--nami-form-field-gap, var(--nami-space-2, 6px));
      }

      .label {
        font-size: 0.875rem;
        font-weight: 600;
      }

      .control {
        min-width: 0;
      }

      .meta {
        color: var(--nami-text-muted);
        font-size: 0.8125rem;
        line-height: 1.45;
      }

      .error {
        color: var(--nami-color-danger);
      }

      :host([disabled]) {
        opacity: 0.58;
      }
    `];let me=$t;const zt=class zt extends h{constructor(){super(),this.columns=0,this.min="",this.gap="md"}updated(){this.columns>0?this.style.setProperty("--nami-grid-columns",String(this.columns)):this.style.removeProperty("--nami-grid-columns"),this.min?this.style.setProperty("--nami-grid-min",this.min):this.style.removeProperty("--nami-grid-min")}render(){return o`<div class="base" part="base"><slot></slot></div>`}};zt.properties={columns:{type:Number,reflect:!0},min:{reflect:!0},gap:{reflect:!0}},zt.styles=[v,u`
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
    `];let he=zt;m("nami-spinner",B);const At=class At extends h{constructor(){super(),_(this),this.label="",this.disabled=!1,this.selected=!1,this.loading=!1}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}y(this,"nami-click",{sourceEvent:t,selected:this.selected})}render(){return o`
      <button
        part="base control"
        class="soft-control"
        type="button"
        aria-label=${this.label}
        aria-pressed=${this.selected?"true":"false"}
        aria-busy=${this.loading?"true":"false"}
        ?disabled=${this.disabled||this.loading}
        @click=${this.handleClick}
      >
        <span class="icon-motion" part="icon">
          ${this.loading?o`<nami-spinner size="sm" label=${A("Loading",{id:"nami.spinner.loading"})}></nami-spinner>`:o`<slot></slot><slot name="icon"></slot>`}
        </span>
      </button>
    `}};At.properties={label:{},size:{reflect:!0},disabled:{type:Boolean,reflect:!0},selected:{type:Boolean,reflect:!0},loading:{type:Boolean,reflect:!0}},At.styles=[v,ja,u`
      :host {
        display: inline-flex;
      }

      button {
        height: var(--nami-icon-button-size, var(--nami-control-height, 40px));
        width: var(--nami-icon-button-size, var(--nami-control-height, 40px));
      }

      :host([size='sm']) {
        --nami-icon-button-size: var(--nami-control-height-sm, 32px);
      }

      :host([size='md']) {
        --nami-icon-button-size: var(--nami-control-height-md, 40px);
      }

      :host([size='lg']) {
        --nami-icon-button-size: var(--nami-control-height-lg, 48px);
      }

      nami-spinner {
        color: currentColor;
      }
    `];let pe=At;const Z=class Z extends h{constructor(){super(),this.internals=nt(this),this.metaId=`${de("nami-input")}-meta`,this.name="",this.value="",this.defaultValue="",this.type="text",this.placeholder="",this.label="",this.helperText="",this.error="",this.disabled=!1,this.required=!1}get inputElement(){return this.renderRoot.querySelector("input")}updated(){ot(this.internals,this.disabled?null:this.value),ee(this.internals,this.validityFlags,this.validityMessage,this.inputElement??void 0)}formResetCallback(){this.value=this.defaultValue}focus(){this.inputElement?.focus()}checkValidity(){return this.inputElement?.checkValidity()??Object.keys(this.validityFlags).length===0}reportValidity(){return this.inputElement?.reportValidity()??this.checkValidity()}get validity(){return this.inputElement?.validity}get validationMessage(){return this.error||this.inputElement?.validationMessage||""}get willValidate(){return!this.disabled}get validityFlags(){return this.disabled?{}:this.error?{customError:!0}:this.required&&!this.value?{valueMissing:!0}:{}}get validityMessage(){if(!this.disabled){if(this.error)return this.error;if(this.required&&!this.value)return`${this.label||this.name||"Field"} is required`}}handleInput(t){this.value=t.target.value,y(this,"nami-input",{value:this.value,sourceEvent:t})}handleChange(t){y(this,"nami-change",{value:this.value,sourceEvent:t})}render(){const t=this.id?`${this.id}-meta`:this.metaId,a=this.error||this.helperText;return o`
      <label part="base">
        ${this.label?o`<span class="label" part="label">${this.label}${this.required?" *":""}</span>`:d}
        <span class="control" part="control">
          <slot name="icon" part="icon"></slot>
          <input
            .value=${this.value}
            name=${this.name}
            type=${this.type}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-invalid=${this.error?"true":"false"}
            aria-describedby=${a?t:d}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          <slot name="actions"></slot>
        </span>
      </label>
      ${a?o`<div id=${t} class="meta ${this.error?"error":""}" part=${this.error?"error":"description"}>${a}</div>`:d}
    `}};Z.formAssociated=!0,Z.properties={name:{},value:{},defaultValue:{attribute:"default-value"},type:{},placeholder:{},label:{},helperText:{attribute:"helper-text"},error:{reflect:!0,useDefault:!0},disabled:{type:Boolean,reflect:!0},required:{type:Boolean,reflect:!0}},Z.styles=[v,u`
      :host {
        display: block;
      }

      label {
        color: var(--nami-text);
        display: grid;
        gap: var(--nami-space-2, 6px);
      }

      .label {
        font-size: 0.875rem;
        font-weight: 600;
      }

      .control {
        align-items: center;
        background: var(--nami-input-bg, transparent);
        border: var(--nami-input-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-input-border, var(--nami-border));
        border-radius: var(--nami-input-radius, var(--nami-radius-surface, 6px));
        display: flex;
        min-height: var(--nami-control-height, var(--nami-control-height-md, 40px));
        padding: 0 var(--nami-control-padding-x, 10px);
        box-shadow: var(--nami-input-shadow, none);
        transition:
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      .control:focus-within {
        border-color: var(--nami-color-primary);
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      :host([error]) .control {
        border-color: var(--nami-color-danger);
      }

      input {
        background: transparent;
        border: 0;
        color: var(--nami-style-on-paper, var(--nami-text));
        flex: 1 1 auto;
        font: inherit;
        font-size: var(--nami-control-font-size, 0.9375rem);
        min-width: 0;
        outline: none;
        padding: 0;
      }

      input::placeholder {
        color: var(--nami-style-on-paper-muted, var(--nami-text-muted));
      }

      .meta {
        color: var(--nami-text-muted);
        font-size: 0.8125rem;
      }

      .error {
        color: var(--nami-color-danger);
      }

      :host([disabled]) {
        opacity: 0.58;
      }

      ::slotted([slot='icon']),
      ::slotted([slot='actions']) {
        color: var(--nami-icon-color);
        flex: 0 0 auto;
      }
    `];let ue=Z;const Et=class Et extends h{constructor(){super(),this.value=0,this.max=100,this.label="",this.indeterminate=!1}updated(){const t=this.max>0?Math.min(100,Math.max(0,this.value/this.max*100)):0;this.style.setProperty("--nami-progress-value",`${t}%`),this.dataset.state=this.indeterminate?"indeterminate":"determinate"}render(){const t=this.max>0?Math.min(this.max,Math.max(0,this.value)):0;return this.max>0&&t/this.max*100,o`
      <div
        class="track"
        part="base track"
        role="progressbar"
        aria-label=${this.label||"Progress"}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate?d:t}
      >
        <div class="fill" part="indicator"></div>
      </div>
    `}};Et.properties={value:{type:Number,reflect:!0},max:{type:Number,reflect:!0},label:{},indeterminate:{type:Boolean,reflect:!0}},Et.styles=[v,u`
      :host {
        display: block;
      }

      .track {
        background: var(--nami-progress-track-bg, color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 82%));
        border-radius: var(--nami-progress-radius, var(--nami-radius-control, 999px));
        height: var(--nami-progress-height, 8px);
        overflow: hidden;
        position: relative;
      }

      .fill {
        background: var(--nami-progress-fill-bg, var(--nami-color-primary));
        border-radius: inherit;
        height: 100%;
        transform-origin: left center;
        transition: width var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: var(--nami-progress-value, 0%);
      }

      :host([indeterminate]) .fill {
        animation: nami-progress-indeterminate 1180ms var(--nami-ease-standard, ease) infinite;
        width: 48%;
      }

      @keyframes nami-progress-indeterminate {
        0% {
          transform: translateX(-110%) scaleX(0.56);
        }
        55% {
          transform: translateX(92%) scaleX(0.92);
        }
        100% {
          transform: translateX(210%) scaleX(0.56);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .fill {
          transition-duration: 1ms;
        }

        :host([indeterminate]) .fill {
          animation-duration: 1ms;
          animation-iteration-count: 1;
        }
      }
    `];let ve=Et;const St=class St extends h{constructor(){super(),this.value="",this.label="",this.description="",this.selected=!1,this.disabled=!1}select(t){this.disabled||this.selected||(this.selected=!0,y(this,"nami-select",{selected:!0,value:this.value,sourceEvent:t}),y(this,"nami-change",{selected:!0,value:this.value,sourceEvent:t}))}render(){return o`
      <button
        part="base control"
        type="button"
        role="radio"
        aria-checked=${this.selected?"true":"false"}
        ?disabled=${this.disabled}
        @click=${this.select}
      >
        <span class="indicator" part="indicator"></span>
        <slot name="icon" part="icon"></slot>
        <span class="label" part="label"><slot name="label">${this.label}</slot></span>
        ${this.description?o`<span class="description" part="description"><slot name="description">${this.description}</slot></span>`:d}
        <slot name="actions"></slot>
      </button>
    `}};St.properties={value:{},label:{},description:{},selected:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}},St.styles=[v,u`
      :host {
        display: block;
      }

      button {
        background: var(--nami-radio-card-bg, var(--nami-surface-raised));
        border: var(--nami-radio-card-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-radio-card-border-color, var(--nami-border));
        border-radius: var(--nami-radio-card-radius, var(--nami-radius-surface, 6px));
        color: var(--nami-style-on-paper, var(--nami-text));
        cursor: pointer;
        display: grid;
        font: inherit;
        gap: var(--nami-space-3, 10px);
        min-height: 128px;
        padding: var(--nami-space-4, 16px);
        position: relative;
        box-shadow: var(--nami-radio-card-shadow, none);
        text-align: left;
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        width: 100%;
      }

      button:hover:not(:disabled) {
        background: var(--nami-hover-overlay);
      }

      :host([selected]) button {
        border-color: var(--nami-color-primary);
        box-shadow: var(--nami-radio-card-selected-shadow, 0 0 0 1px var(--nami-color-primary), var(--nami-focus-ring));
      }

      button:active:not(:disabled) {
        transform: scale(0.99);
      }

      button:focus-visible {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
        outline: none;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.54;
      }

      .indicator {
        align-items: center;
        border: 1px solid var(--nami-border-strong);
        border-radius: 50%;
        color: var(--nami-text-inverse);
        display: inline-flex;
        height: 22px;
        justify-content: center;
        position: absolute;
        right: var(--nami-space-4, 16px);
        top: var(--nami-space-4, 16px);
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: 22px;
      }

      .indicator::before {
        background: currentColor;
        border-radius: 50%;
        content: '';
        height: 8px;
        opacity: 0;
        transition: opacity var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        width: 8px;
      }

      :host([selected]) .indicator {
        background: var(--nami-color-primary);
        border-color: transparent;
      }

      :host([selected]) .indicator::before {
        opacity: 1;
      }

      .label {
        font-weight: 700;
      }

      .description {
        color: var(--nami-style-on-paper-muted, var(--nami-text-muted));
        font-size: 0.875rem;
      }
    `];let fe=St;m("nami-illustration",K);const ri={success:"success",error:"error",info:"info",warning:"warning",403:"forbidden",404:"not-found",500:"server-error"},Ct=class Ct extends h{constructor(){super(),_(this),this.status="info",this.title="",this.subTitle="",this.compact=!1}get illustrationName(){return ri[this.status]??"info"}render(){return o`
      <section class="base" part="base" aria-label=${this.title||this.subTitle||A("Result",{id:"nami.result.aria"})}>
        <slot name="illustration" part="illustration">
          <nami-illustration name=${this.illustrationName} size=${this.compact?"sm":"lg"}></nami-illustration>
        </slot>
        ${this.title?o`<div class="title" part="title"><slot name="title">${this.title}</slot></div>`:d}
        ${this.subTitle?o`<div class="description" part="description"><slot name="description">${this.subTitle}</slot></div>`:d}
        <div class="body" part="body"><slot name="body"></slot></div>
        <div class="actions" part="actions"><slot name="actions"></slot></div>
      </section>
    `}};Ct.properties={status:{reflect:!0},title:{reflect:!0},subTitle:{attribute:"sub-title",reflect:!0},compact:{type:Boolean,reflect:!0}},Ct.styles=[v,u`
      :host {
        display: block;
      }

      .base {
        align-items: center;
        color: var(--nami-style-on-paper, var(--nami-text));
        display: grid;
        background: var(--nami-result-bg, transparent);
        border: var(--nami-result-border-width, 0) solid var(--nami-result-border-color, transparent);
        border-radius: var(--nami-result-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-result-shadow, none);
        gap: var(--nami-result-gap, 14px);
        justify-items: center;
        padding: var(--nami-space-5, 24px);
        text-align: center;
      }

      :host([compact]) .base {
        padding: var(--nami-space-3, 10px);
      }

      .title {
        color: var(--nami-style-on-paper, var(--nami-text));
        font-size: var(--nami-result-title-size, 1.5rem);
        font-weight: 800;
        line-height: 1.25;
      }

      .description {
        color: var(--nami-style-on-paper-muted, var(--nami-text-muted));
        font-size: var(--nami-result-subtitle-size, 0.95rem);
        line-height: 1.6;
        max-width: 54ch;
      }

      .body {
        color: var(--nami-style-on-paper-muted, var(--nami-text-muted));
        max-width: 62ch;
        width: 100%;
      }

      .actions {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--nami-space-2, 6px);
        justify-content: center;
        margin: var(--nami-result-actions-margin, 10px 0 0);
      }
    `];let be=Ct;const _t=class _t extends h{constructor(){super(),this.variant="text",this.animated=!0}updated(){this.dataset.state=this.animated?"loading":"idle"}render(){return o`<span class="base" part="base" aria-hidden="true"><slot></slot></span>`}};_t.properties={variant:{reflect:!0},animated:{type:Boolean,reflect:!0}},_t.styles=[v,u`
      :host {
        display: block;
      }

      .base {
        background:
          linear-gradient(90deg, transparent, var(--nami-skeleton-highlight, rgb(255 255 255 / 0.48)), transparent),
          var(--nami-skeleton-bg, var(--nami-hover-overlay));
        background-size: 220% 100%, auto;
        border-radius: var(--nami-radius-surface, 6px);
        display: block;
        min-height: 1rem;
        overflow: hidden;
      }

      :host([variant='text']) .base {
        border-radius: var(--nami-radius-control, 999px);
        min-height: 0.875rem;
        width: 100%;
      }

      :host([variant='circle']) .base {
        aspect-ratio: 1;
        border-radius: 50%;
      }

      :host([animated]) .base {
        animation: nami-skeleton var(--nami-motion-slow, 700ms) linear infinite;
      }

      @keyframes nami-skeleton {
        from {
          background-position: 120% 0, 0 0;
        }
        to {
          background-position: -120% 0, 0 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        :host([animated]) .base {
          animation-duration: 1ms;
          animation-iteration-count: 1;
        }
      }
    `];let ge=_t;const Pt=class Pt extends h{constructor(){super(),this.min="",this.gap="md",this.ratio="even"}updated(){this.style.containerType="inline-size",this.min?this.style.setProperty("--nami-split-min",this.min):this.style.removeProperty("--nami-split-min")}render(){return o`<div class="base" part="base"><slot></slot></div>`}};Pt.properties={min:{reflect:!0},gap:{reflect:!0},ratio:{reflect:!0}},Pt.styles=[v,u`
      :host {
        display: block;
      }

      .base {
        align-items: stretch;
        display: grid;
        gap: var(--nami-split-gap, var(--nami-layout-gutter, 16px));
        grid-template-columns: minmax(min(100%, var(--nami-split-min, 18rem)), var(--nami-split-first, 1fr)) minmax(0, var(--nami-split-second, 1fr));
        min-width: 0;
      }

      :host([ratio='sidebar-main']) {
        --nami-split-first: 0.38fr;
        --nami-split-second: 1fr;
      }

      :host([ratio='main-sidebar']) {
        --nami-split-first: 1fr;
        --nami-split-second: 0.38fr;
      }

      :host([gap='none']) {
        --nami-split-gap: 0;
      }

      :host([gap='sm']) {
        --nami-split-gap: var(--nami-space-2, 6px);
      }

      :host,
      :host([gap='md']) {
        --nami-split-gap: var(--nami-layout-gutter, 16px);
      }

      :host([gap='lg']) {
        --nami-split-gap: var(--nami-space-5, 24px);
      }

      @container (width < 42rem) {
        .base {
          grid-template-columns: 1fr;
        }
      }

      @supports not (container-type: inline-size) {
        @media (width <= 720px) {
          .base {
            grid-template-columns: 1fr;
          }
        }
      }
    `];let ye=Pt;m("nami-spinner",B);const Tt=class Tt extends h{constructor(){super(),this.hideTimer=0,this.shownAt=0,_(this),this.active=!1,this.appearance="veil",this.duration=240,this.hasDefaultContent=!1,this.label="",this.tone="surface",this.variant="screen",this.visible=!1}connectedCallback(){super.connectedCallback(),this.active&&(this.visible=!0,this.shownAt=Date.now())}disconnectedCallback(){window.clearTimeout(this.hideTimer),this.hideResolver?.(),super.disconnectedCallback()}updated(t){if(!t.has("active"))return;if(window.clearTimeout(this.hideTimer),this.active){this.hideResolver?.(),this.hideComplete=void 0,this.visible=!0,this.shownAt=Date.now();return}const a=Date.now()-this.shownAt,i=Math.max(0,Number(this.duration)-a);this.hideComplete=new Promise(r=>{this.hideResolver=r}),this.hideTimer=window.setTimeout(()=>{this.active||(this.visible=!1),this.hideResolver?.(),this.hideResolver=void 0},i)}show(t={}){this.applyOptions(t),this.visible=!0,this.shownAt=Date.now(),this.active=!0}async hide(t={}){this.applyOptions(t),this.active=!1,await this.updateComplete,this.hideComplete&&await this.hideComplete}async waitFor(t,a={}){const i=a.minDuration??a.duration??this.duration,r=Date.now();this.show(a);try{return await(typeof t=="function"?t():t)}finally{const s=Math.max(0,Number(i)-(Date.now()-r));s>0&&await new Promise(n=>window.setTimeout(n,s)),await this.hide(a)}}applyOptions(t){t.appearance&&(this.appearance=t.appearance),t.duration!==void 0&&(this.duration=t.duration),t.label!==void 0&&(this.label=t.label),t.tone&&(this.tone=t.tone),t.variant&&(this.variant=t.variant)}handleSlotChange(t){const a=t.target;this.hasDefaultContent=a.assignedNodes({flatten:!0}).some(i=>i.nodeType===Node.TEXT_NODE?!!i.textContent?.trim():!0)}get fallbackLabel(){return this.label||A("Preparing interface",{id:"nami.pageTransition.preparing"})}render(){return this.visible?o`
      <div class="base" part="base" role="status" aria-live="polite" aria-busy=${this.active?"true":"false"} aria-label=${this.fallbackLabel} aria-hidden=${this.active?"false":"true"}>
        <div class="veil" aria-hidden="true">
          <span class="brand" part="brand">
            <svg viewBox="0 0 112 96" focusable="false" aria-hidden="true">
              <path class="brand-ink" d="M12 18h16v64H12zM27 18h16l42 56-3 18H66L35 50v32H27zM72 18h17L78 82H60z" />
              <path class="brand-accent" d="M72 4h12l-2 13H74zM91 4h12l-2 13H93z" />
            </svg>
          </span>
          <span class="veil-track" part="track"><span class="veil-indicator" part="indicator"></span></span>
        </div>
        <div class="panel" part="panel">
          <span class="indicator" part="indicator">
            <slot name="icon"><nami-spinner size="md" label=${this.fallbackLabel}></nami-spinner></slot>
          </span>
          <span class=${this.hasDefaultContent?"label has-content":"label"} part="label"><slot @slotchange=${this.handleSlotChange}></slot></span>
        </div>
      </div>
    `:d}};Tt.properties={active:{type:Boolean,reflect:!0},appearance:{reflect:!0},duration:{type:Number,reflect:!0},hasDefaultContent:{state:!0},label:{},tone:{reflect:!0},variant:{reflect:!0},visible:{state:!0}},Tt.styles=[v,u`
      :host {
        --page-transition-backdrop: color-mix(in oklab, var(--nami-surface), transparent 8%);
        --page-transition-brand-ink: color-mix(in oklab, var(--nami-color-primary), black 44%);
        --page-transition-panel-bg: var(--nami-surface-overlay);
        --page-transition-panel-fg: var(--nami-text);
        --page-transition-panel-border: var(--nami-border);
        --page-transition-panel-shadow: var(
          --nami-dialog-shadow,
          0 20px 60px color-mix(in oklab, var(--nami-shadow-color), transparent 68%)
        );
        --page-transition-progress-bg: color-mix(in oklab, var(--nami-color-primary), transparent 88%);
        --page-transition-progress-fg: color-mix(in oklab, var(--nami-color-primary), var(--nami-text) 8%);
        --page-transition-progress-height: var(--nami-transition-progress-height, 4px);
        --page-transition-z-index: var(--nami-page-transition-z-index, 2147483646);
        color: var(--page-transition-panel-fg);
        display: contents;
      }

      :host([tone='brand']) {
        --page-transition-backdrop: color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 84%);
        --page-transition-panel-bg: color-mix(in oklab, var(--nami-color-primary), var(--nami-surface-overlay) 90%);
        --page-transition-panel-border: color-mix(in oklab, var(--nami-color-primary), var(--nami-border) 72%);
      }

      .base {
        align-items: center;
        background:
          var(--nami-style-background-pattern, none),
          var(--page-transition-backdrop);
        background-size: var(--nami-style-background-size, auto);
        box-sizing: border-box;
        color: var(--page-transition-panel-fg);
        display: flex;
        inset: 0;
        justify-content: center;
        opacity: 0;
        padding: 24px;
        pointer-events: none;
        position: fixed;
        transition:
          opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          visibility var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        visibility: hidden;
        z-index: var(--page-transition-z-index);
      }

      :host([variant='inline']) .base {
        border-radius: var(--nami-card-radius, var(--nami-radius-surface));
        position: absolute;
      }

      :host([active]) .base {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
      }

      .veil,
      .panel {
        display: none;
      }

      :host([appearance='veil']) .veil {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 18px;
        inline-size: min(72vw, 260px);
      }

      .brand {
        align-items: center;
        color: var(--page-transition-brand-ink);
        display: inline-flex;
        filter: drop-shadow(0 12px 28px color-mix(in oklab, var(--nami-color-primary), transparent 78%));
        justify-content: center;
      }

      .brand svg {
        block-size: 86px;
        display: block;
        inline-size: 108px;
      }

      .brand-ink {
        fill: currentColor;
      }

      .brand-accent {
        fill: var(--nami-color-primary);
      }

      .veil-track {
        background: var(--page-transition-progress-bg);
        border-radius: 999px;
        display: block;
        height: var(--page-transition-progress-height);
        inline-size: min(100%, 180px);
        overflow: hidden;
      }

      .veil-indicator {
        animation: nami-page-veil 1320ms var(--nami-ease-standard, ease) infinite;
        background: var(--page-transition-progress-fg);
        border-radius: inherit;
        display: block;
        height: 100%;
        transform: translateX(-52%) scaleX(0.44);
        transform-origin: left center;
        width: 64%;
      }

      :host([appearance='panel']) .panel {
        align-items: center;
        background: var(--page-transition-panel-bg);
        border: var(--nami-dialog-border-width, var(--nami-style-stroke-width, 1px)) solid var(--page-transition-panel-border);
        border-radius: var(--nami-dialog-radius, var(--nami-radius-surface));
        box-shadow: var(--page-transition-panel-shadow);
        display: inline-flex;
        gap: 12px;
        max-width: min(88vw, 360px);
        min-height: 56px;
        padding: 14px 18px;
        transform: translateY(8px) scale(0.98);
        transition: transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      :host([active][appearance='panel']) .panel {
        transform: translateY(0) scale(1);
      }

      .indicator {
        align-items: center;
        color: var(--nami-color-primary);
        display: inline-flex;
        flex: 0 0 auto;
      }

      .label {
        color: var(--page-transition-panel-fg);
        display: none;
        font-size: 0.9375rem;
        font-weight: 800;
        line-height: 1.2;
      }

      .label.has-content {
        display: inline;
      }

      @keyframes nami-page-veil {
        0% {
          transform: translateX(-56%) scaleX(0.36);
        }

        55% {
          transform: translateX(74%) scaleX(0.68);
        }

        100% {
          transform: translateX(158%) scaleX(0.32);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .base,
        .panel,
        .veil-indicator {
          transition-duration: 1ms;
        }

        .veil-indicator {
          animation-duration: 1ms;
          animation-iteration-count: 1;
        }

        .panel {
          transform: none;
        }
      }
    `];let xe=Tt;const Mt=class Mt extends h{constructor(){super(),this.gap="md",this.direction="vertical",this.align="",this.justify=""}updated(){this.align?this.style.setProperty("--nami-stack-align",this.align):this.style.removeProperty("--nami-stack-align"),this.justify?this.style.setProperty("--nami-stack-justify",this.justify):this.style.removeProperty("--nami-stack-justify")}render(){return o`<div class="base" part="base"><slot></slot></div>`}};Mt.properties={gap:{reflect:!0},direction:{reflect:!0},align:{reflect:!0},justify:{reflect:!0}},Mt.styles=[v,u`
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
    `];let we=Mt;const J=class J extends h{constructor(){super(),this.internals=nt(this),this.name="",this.value="on",this.checked=!1,this.disabled=!1}updated(){ot(this.internals,!this.disabled&&this.checked?this.value:null)}formResetCallback(){this.checked=!1}toggle(t){this.disabled||(this.checked=!this.checked,y(this,"nami-change",{checked:this.checked,value:this.value,sourceEvent:t}))}render(){return o`
      <button
        part="base control"
        type="button"
        role="switch"
        aria-checked=${this.checked?"true":"false"}
        ?disabled=${this.disabled}
        @click=${this.toggle}
      >
        <span class="track" part="indicator"><span class="thumb"></span></span>
        <span part="label"><slot></slot></span>
      </button>
    `}};J.formAssociated=!0,J.properties={name:{},value:{},checked:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}},J.styles=[v,u`
      :host {
        display: inline-flex;
      }

      button {
        align-items: center;
        background: transparent;
        border: 0;
        color: var(--nami-text);
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        gap: var(--nami-space-3, 10px);
        padding: 0;
      }

      .track {
        align-items: center;
        background: var(--nami-switch-track-bg, var(--nami-hover-overlay));
        border: var(--nami-switch-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-switch-border-color, var(--nami-border));
        border-radius: var(--nami-radius-control, 999px);
        display: inline-flex;
        height: 28px;
        padding: 2px;
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: 48px;
      }

      .thumb {
        background: var(--nami-switch-thumb-bg, var(--nami-surface-raised));
        border-radius: 50%;
        box-shadow: var(--nami-switch-thumb-shadow, 0 1px 4px color-mix(in oklab, var(--nami-shadow-color), transparent 64%));
        height: 22px;
        transform: translateX(0);
        transition: transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: 22px;
      }

      :host([checked]) .track {
        background: var(--nami-color-primary);
        border-color: transparent;
      }

      :host([checked]) .thumb {
        transform: translateX(20px);
      }

      button:focus-visible .track {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.54;
      }

      @media (prefers-reduced-motion: reduce) {
        .track,
        .thumb {
          transition-duration: 1ms;
        }
      }
    `];let ke=J;function ct(e){return e.getAttribute("value")||e.dataset.value||e.textContent?.trim()||""}function si(e,t,a,i){const r=i==="vertical"?["ArrowDown"]:["ArrowRight"],s=i==="vertical"?["ArrowUp"]:["ArrowLeft"];return e==="Home"?0:e==="End"?a-1:r.includes(e)?(t+1)%a:s.includes(e)?(t-1+a)%a:t}const Lt=class Lt extends h{constructor(){super(),this.handleItemClick=t=>{const a=t.currentTarget;this.isItemDisabled(a)||this.selectItem(a,t)},this.handleItemKeydown=t=>{if(!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp","Home","End"].includes(t.key))return;t.preventDefault();const a=t.currentTarget,i=this.enabledItems,r=i.indexOf(a);if(r<0||i.length===0)return;const s=si(t.key,r,i.length,this.orientation),n=i[s];n?.focus(),n&&this.selectItem(n,t)},this.value="",this.orientation="horizontal"}get items(){return this.renderRoot.querySelector("slot")?.assignedElements({flatten:!0})??[]}get enabledItems(){return this.items.filter(t=>!this.isItemDisabled(t))}firstUpdated(){this.syncItems()}updated(){this.syncItems()}syncItems(){const t=this.enabledItems;if(t.length===0){this.items.length===0&&this.value!==""&&(this.value=""),this.items.forEach(r=>{r.setAttribute("role","tab"),r.setAttribute("aria-disabled",this.isItemDisabled(r)?"true":"false"),r.setAttribute("tabindex","-1")});return}const i=t.some(r=>ct(r)===this.value)?this.value:ct(t[0])||"";this.value!==i&&(this.value=i),this.items.forEach(r=>{const s=ct(r),n=this.isItemDisabled(r),p=!n&&s===i;r.setAttribute("role","tab"),r.setAttribute("aria-selected",String(p)),n?r.setAttribute("aria-disabled","true"):r.removeAttribute("aria-disabled"),r.setAttribute("tabindex",p?"0":"-1"),r.removeEventListener("click",this.handleItemClick),r.removeEventListener("keydown",this.handleItemKeydown),r.addEventListener("click",this.handleItemClick),r.addEventListener("keydown",this.handleItemKeydown)})}isItemDisabled(t){return t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"||!!t.disabled}selectItem(t,a){const i=ct(t);!i||i===this.value||(this.value=i,this.syncItems(),y(this,"nami-select",{value:i,sourceEvent:a}),y(this,"nami-change",{value:i,sourceEvent:a}))}render(){return o`
      <div class="base" part="base" role="tablist" aria-orientation=${this.orientation}>
        <slot @slotchange=${()=>this.syncItems()}></slot>
      </div>
    `}};Lt.properties={value:{},orientation:{reflect:!0}},Lt.styles=[v,u`
      :host {
        display: block;
      }

      .base {
        align-items: center;
        display: flex;
        gap: var(--nami-space-1, 4px);
      }

      :host([orientation='vertical']) .base {
        align-items: stretch;
        flex-direction: column;
      }

      ::slotted(*) {
        background: var(--nami-tab-bg, transparent);
        border: var(--nami-tab-border-width, 0) solid var(--nami-tab-border-color, transparent);
        border-radius: var(--nami-tab-radius, var(--nami-radius-control, 999px));
        color: var(--nami-style-on-paper, var(--nami-icon-color));
        cursor: pointer;
        min-height: var(--nami-control-height, var(--nami-control-height-md, 40px));
        padding: 0 var(--nami-control-padding-x, 14px);
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          color var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
      }

      ::slotted([aria-selected='true']) {
        background: var(--nami-accent-hover-overlay);
        color: var(--nami-color-primary);
      }
    `];let $e=Lt;const G=class G extends h{constructor(){super(),this.internals=nt(this),this.metaId=`${de("nami-textarea")}-meta`,this.name="",this.value="",this.defaultValue="",this.placeholder="",this.label="",this.helperText="",this.error="",this.disabled=!1,this.required=!1,this.rows=4}get textareaElement(){return this.renderRoot.querySelector("textarea")}updated(){this.dataset.state=this.error?"invalid":"valid",this.toggleAttribute("data-disabled",this.disabled),this.toggleAttribute("data-invalid",!!this.error),ot(this.internals,this.disabled?null:this.value),ee(this.internals,this.validityFlags,this.validityMessage,this.textareaElement??void 0)}formResetCallback(){this.value=this.defaultValue}focus(){this.textareaElement?.focus()}checkValidity(){return this.textareaElement?.checkValidity()??Object.keys(this.validityFlags).length===0}reportValidity(){return this.textareaElement?.reportValidity()??this.checkValidity()}get validityFlags(){return this.disabled?{}:this.error?{customError:!0}:this.required&&!this.value?{valueMissing:!0}:{}}get validityMessage(){if(!this.disabled){if(this.error)return this.error;if(this.required&&!this.value)return`${this.label||this.name||"Field"} is required`}}handleInput(t){this.value=t.target.value,y(this,"nami-input",{value:this.value,sourceEvent:t})}handleChange(t){y(this,"nami-change",{value:this.value,sourceEvent:t})}render(){const t=this.id?`${this.id}-meta`:this.metaId,a=this.error||this.helperText;return o`
      <label part="base">
        ${this.label?o`<span class="label" part="label">${this.label}${this.required?" *":""}</span>`:d}
        <textarea
          part="control"
          .value=${this.value}
          name=${this.name}
          placeholder=${this.placeholder}
          rows=${this.rows}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${this.error?"true":"false"}
          aria-describedby=${a?t:d}
          @input=${this.handleInput}
          @change=${this.handleChange}
        ></textarea>
      </label>
      ${a?o`<div id=${t} class="meta ${this.error?"error":""}" part=${this.error?"error":"description"}>${a}</div>`:d}
    `}};G.formAssociated=!0,G.properties={name:{},value:{},defaultValue:{attribute:"default-value"},placeholder:{},label:{},helperText:{attribute:"helper-text"},error:{reflect:!0,useDefault:!0},disabled:{type:Boolean,reflect:!0},required:{type:Boolean,reflect:!0},rows:{type:Number,reflect:!0}},G.styles=[v,u`
      :host {
        display: block;
      }

      label {
        color: var(--nami-text);
        display: grid;
        gap: var(--nami-form-field-gap, var(--nami-space-2, 6px));
      }

      .label {
        font-size: 0.875rem;
        font-weight: 600;
      }

      textarea {
        background: var(--nami-textarea-bg, transparent);
        border: var(--nami-textarea-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-textarea-border, var(--nami-border));
        border-radius: var(--nami-textarea-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-textarea-shadow, none);
        box-sizing: border-box;
        color: var(--nami-style-on-paper, var(--nami-text));
        font: inherit;
        line-height: 1.5;
        min-height: calc(var(--nami-control-height, var(--nami-control-height-md, 40px)) * 2);
        min-width: 0;
        outline: none;
        padding: var(--nami-space-3, 10px) var(--nami-control-padding-x, 12px);
        resize: vertical;
        transition:
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: 100%;
      }

      textarea:focus-visible {
        border-color: var(--nami-color-primary);
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      :host([error]) textarea {
        border-color: var(--nami-color-danger);
      }

      textarea::placeholder {
        color: var(--nami-style-on-paper-muted, var(--nami-text-muted));
      }

      .meta {
        color: var(--nami-text-muted);
        font-size: 0.8125rem;
      }

      .error {
        color: var(--nami-color-danger);
      }

      :host([disabled]) {
        opacity: 0.58;
      }
    `];let ze=G;const P={accent:"#3b82f6",mode:"light",stylePreset:"default",density:"comfortable",size:"md",motion:"normal",radius:"round",contrast:"normal"},la=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i,k={mode:["light","dark"],stylePreset:["default","illustration"],density:["comfortable","compact"],size:["sm","md","lg"],motion:["normal","reduced"],radius:["sharp","soft","round"],contrast:["normal","high"]};function $(e,t){return typeof e=="string"&&t.includes(e)}function O(e,t){return{code:"invalid-enum",message:`Unsupported ${String(e)} value "${String(t)}". Falling back to the default theme seed.`,path:e,severity:"warning"}}function ni(e){const t=[];return e.accent!==void 0&&!la.test(e.accent)&&t.push({code:"invalid-accent",message:`Accent must be a 3 or 6 digit hex color. Received "${e.accent}".`,path:"accent",severity:"warning"}),e.mode!==void 0&&!$(e.mode,k.mode)&&t.push(O("mode",e.mode)),e.stylePreset!==void 0&&!$(e.stylePreset,k.stylePreset)&&t.push(O("stylePreset",e.stylePreset)),e.density!==void 0&&!$(e.density,k.density)&&t.push(O("density",e.density)),e.size!==void 0&&!$(e.size,k.size)&&t.push(O("size",e.size)),e.motion!==void 0&&!$(e.motion,k.motion)&&t.push(O("motion",e.motion)),e.radius!==void 0&&!$(e.radius,k.radius)&&t.push(O("radius",e.radius)),e.contrast!==void 0&&!$(e.contrast,k.contrast)&&t.push(O("contrast",e.contrast)),t}function oi(e){return{accent:e.accent&&la.test(e.accent)?e.accent:P.accent,mode:$(e.mode,k.mode)?e.mode:P.mode,stylePreset:$(e.stylePreset,k.stylePreset)?e.stylePreset:P.stylePreset,density:$(e.density,k.density)?e.density:P.density,size:$(e.size,k.size)?e.size:P.size,motion:$(e.motion,k.motion)?e.motion:P.motion,radius:$(e.radius,k.radius)?e.radius:P.radius,contrast:$(e.contrast,k.contrast)?e.contrast:P.contrast}}function li(e){return e.replace(/^--nami-/,"").replace(/([a-z0-9])([A-Z])/g,"$1-$2").replace(/[\s_.]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase()}function ca(e){return e.length===1&&e[0].startsWith("--")?e[0]:`--nami-${e.map(li).filter(Boolean).join("-")}`}function Ae(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function da(e){return Ae(e)&&"value"in e}function ci(e){return String(da(e)?e.value:e)}function S(e,t=[]){const a={};if(!e)return a;for(const[i,r]of Object.entries(e)){const s=i.startsWith("--")?[i]:[...t,i];if(da(r)||typeof r=="string"||typeof r=="number"){a[ca(s)]=ci(r);continue}Ae(r)&&Object.assign(a,S(r,s))}return a}function di(e){const t={};if(!e)return t;for(const[a,i]of Object.entries(e)){const r=Ae(i)&&"tokens"in i?i.tokens:i;Object.assign(t,S(r,[a]))}return t}function ma(e){return{...S(e?.tokens),...S(e?.semanticTokens),...di(e?.components)}}function mi(e,t){const a=t.seed,i=e.cssVariablesResolver?.(t)??{};return{...ma(e),...ma(e.modes?.[a.mode]),...S(e.density?.[a.density]),...S(e.size?.[a.size]),...S(e.motion?.[a.motion]),...S(e.radius?.[a.radius]),...S(e.contrast?.[a.contrast]),...Object.fromEntries(Object.entries(i.variables??{}).map(([r,s])=>[r,String(s)])),...Object.fromEntries(Object.entries(i[a.mode]??{}).map(([r,s])=>[r,String(s)]))}}function g(e,t,a){return`color-mix(in oklab, ${e}, ${t} ${a}%)`}function c(e,t){return`color-mix(in oklab, ${e}, transparent ${t}%)`}function hi(e){const t="var(--nami-accent-50)",a=e.mode==="dark";return{"--nami-accent-50":e.accent,"--nami-accent-90":g(t,a?"#fff":"#000",a?80:40),"--nami-accent-80":g(t,a?"#fff":"#000",a?60:30),"--nami-accent-70":g(t,a?"#fff":"#000",a?40:20),"--nami-accent-60":g(t,a?"#fff":"#000",a?20:10),"--nami-accent-40":g(t,a?"#000":"#fff",a?10:20),"--nami-accent-30":g(t,a?"#000":"#fff",a?20:40),"--nami-accent-20":g(t,a?"#000":"#fff",a?30:60),"--nami-accent-10":g(t,a?"#000":"#fff",a?40:80),"--nami-accent-5":g(t,a?"#000":"#fff",a?50:90),"--nami-neutral-10":g(t,"#b3b3b3",84),"--nami-neutral-50":g(t,a?"#eef2f7":"#646a73",94)}}function pi(e){return e.radius==="sharp"?{"--nami-radius-control":"4px","--nami-radius-surface":"4px","--nami-radius-tight":"2px","--nami-radius-round":"999px"}:e.radius==="soft"?{"--nami-radius-control":"10px","--nami-radius-surface":"8px","--nami-radius-tight":"4px","--nami-radius-round":"999px"}:{"--nami-radius-control":"999px","--nami-radius-surface":"6px","--nami-radius-tight":"4px","--nami-radius-round":"999px"}}function ui(e){return e.density==="compact"?{"--nami-control-height-sm":"28px","--nami-control-height-md":"34px","--nami-control-height-lg":"40px","--nami-space-1":"2px","--nami-space-2":"4px","--nami-space-3":"8px","--nami-space-4":"12px","--nami-space-5":"16px","--nami-icon-button-size":"36px","--nami-layout-gutter":"12px"}:{"--nami-control-height-sm":"32px","--nami-control-height-md":"40px","--nami-control-height-lg":"48px","--nami-space-1":"4px","--nami-space-2":"6px","--nami-space-3":"10px","--nami-space-4":"16px","--nami-space-5":"24px","--nami-icon-button-size":"40px","--nami-layout-gutter":"16px"}}function vi(e){const a={sm:{height:"var(--nami-control-height-sm)",paddingX:"12px",fontSize:"0.875rem",iconSize:"16px"},md:{height:"var(--nami-control-height-md)",paddingX:"16px",fontSize:"0.9375rem",iconSize:"18px"},lg:{height:"var(--nami-control-height-lg)",paddingX:"20px",fontSize:"1rem",iconSize:"20px"}}[e.size];return{"--nami-control-height":a.height,"--nami-control-padding-x":a.paddingX,"--nami-control-font-size":a.fontSize,"--nami-icon-size":a.iconSize,"--nami-icon-button-size":"var(--nami-control-height)"}}function fi(){return{"--nami-breakpoint-compact":"639px","--nami-breakpoint-medium":"880px","--nami-breakpoint-wide":"1080px","--nami-container-sm":"720px","--nami-container-md":"960px","--nami-container-lg":"1240px","--nami-app-shell-rail-width":"56px","--nami-app-shell-mobile-bar-height":"56px","--nami-app-shell-breakpoint":"639px"}}function bi(e){return e.motion==="reduced"?{"--nami-motion-fast":"1ms","--nami-motion-normal":"1ms","--nami-motion-slow":"1ms","--nami-motion-exit":"1ms","--nami-ease-standard":"linear","--nami-ease-emphasized":"linear"}:{"--nami-motion-fast":"120ms","--nami-motion-normal":"250ms","--nami-motion-slow":"700ms","--nami-motion-exit":"150ms","--nami-ease-standard":"cubic-bezier(0.19, 1, 0.22, 1)","--nami-ease-emphasized":"cubic-bezier(0.1, 0.9, 0.2, 1)"}}function gi(e){const t=e.mode==="dark",a=e.contrast==="high";return{"--nami-color-primary":"var(--nami-accent-50)","--nami-color-primary-hover":t?"var(--nami-accent-60)":"var(--nami-accent-40)","--nami-color-primary-pressed":t?"var(--nami-accent-40)":"var(--nami-accent-60)","--nami-color-primary-focus":"var(--nami-accent-30)","--nami-color-primary-muted":"var(--nami-accent-10)","--nami-color-danger":t?"#ff7875":"#dc2626","--nami-surface":t?"#151718":"#ffffff","--nami-surface-raised":t?"#1c1f21":"#ffffff","--nami-surface-inset":t?c("#fff",94):c("#000",97),"--nami-surface-overlay":t?c("#17191b",16):c("#fff",18),"--nami-border":a?t?c("#fff",70):c("#000",68):t?c("#fff",86):c("#000",88),"--nami-border-strong":a?c(t?"#fff":"#000",54):t?c("#fff",72):c("#000",76),"--nami-text":t?"#f8fafc":"#171717","--nami-text-muted":a?t?"#d8dee8":"#3f4652":t?"#a1a8b3":"#666b74","--nami-text-inverse":"#ffffff","--nami-icon-color":"var(--nami-neutral-50)","--nami-hover-overlay":t?c("#fff",a?88:94):c("#000",a?90:95),"--nami-ripple":t?c("#fff",84):c("#000",86),"--nami-overlay-backdrop":t?c("#000",38):c("#000",52),"--nami-accent-ripple":c("var(--nami-color-primary-pressed)",a?72:84),"--nami-accent-hover-overlay":c("var(--nami-color-primary-hover)",a?82:90),"--nami-focus-ring":a?`0 0 0 4px ${c("var(--nami-color-primary-focus)",20)}, 0 0 0 1px var(--nami-color-primary)`:`0 4px 4px ${c("var(--nami-color-primary)",74)}, 0 0 0 3px ${c("var(--nami-color-primary-focus)",46)}`}}function yi(e){return{"--nami-font-sans":'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',"--nami-font-mono":'"SFMono-Regular", Consolas, "Liberation Mono", monospace',"--nami-shadow-color":e.mode==="dark"?"#000":g("var(--nami-accent-50)","#8a8f98",80),"--nami-style-stroke-width":e.contrast==="high"?"2px":"1px","--nami-style-stroke-color":"var(--nami-border)","--nami-style-ink-color":"var(--nami-text)","--nami-style-on-paper":"var(--nami-text)","--nami-style-on-paper-muted":"var(--nami-text-muted)","--nami-style-offset-shadow":"none","--nami-style-control-bg":"transparent","--nami-style-panel-bg":"var(--nami-surface-raised)","--nami-style-paper-bg":"var(--nami-surface)","--nami-style-border-radius":"var(--nami-radius-surface)","--nami-style-background-pattern":"none","--nami-style-doodle-opacity":"0","--nami-style-paper-line-color":"var(--nami-border)","--nami-style-focus-shadow":"var(--nami-focus-ring)"}}function xi(e){const t=e.mode==="dark",a=e.contrast==="high"?"4px":"3px";return{"--nami-font-sans":'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',"--nami-font-mono":'"SFMono-Regular", Consolas, "Liberation Mono", monospace',"--nami-shadow-color":t?"#000":"#2f2f2f","--nami-style-stroke-width":a,"--nami-style-ink-color":t?"#261f1f":"#2f2f2f","--nami-style-stroke-color":"var(--nami-style-ink-color)","--nami-style-on-paper":t?"#29221f":"#2f2f2f","--nami-style-on-paper-muted":t?"#6b5f58":"#62656b","--nami-style-offset-shadow":t?"6px 6px 0 #050506":"5px 5px 0 var(--nami-style-ink-color)","--nami-style-control-bg":t?g("#fff8ea","var(--nami-accent-50)",5):"#fffefe","--nami-style-panel-bg":t?g("#fff1f5","var(--nami-accent-50)",7):g("#fff3f7","#fff",18),"--nami-style-paper-bg":t?g("#fffdf3","var(--nami-accent-50)",4):"#fff8fb","--nami-style-border-radius":e.radius==="sharp"?"8px":e.radius==="soft"?"14px":"16px","--nami-style-doodle-opacity":t?"0.34":"0.42","--nami-style-paper-line-color":t?"rgb(38 31 31 / 0.18)":c("var(--nami-style-ink-color)",84),"--nami-style-focus-shadow":t?`0 0 0 4px ${c("var(--nami-color-primary)",58)}, 4px 4px 0 #050506`:`0 0 0 4px ${c("var(--nami-color-primary)",70)}, 4px 4px 0 var(--nami-style-ink-color)`,"--nami-style-background-pattern":t?`radial-gradient(circle at 10% 18%, rgb(142 217 255 / var(--nami-style-doodle-opacity)) 0 14px, transparent 15px),
    radial-gradient(circle at 88% 14%, rgb(255 216 93 / var(--nami-style-doodle-opacity)) 0 10px, transparent 11px),
    radial-gradient(circle at 74% 80%, rgb(255 183 208 / var(--nami-style-doodle-opacity)) 0 20px, transparent 21px),
    linear-gradient(135deg, transparent 0 46%, ${c("#fff7ed",82)} 47% 49%, transparent 50%),
    linear-gradient(25deg, transparent 0 70%, ${c("var(--nami-accent-50)",62)} 71% 73%, transparent 74%)`:`radial-gradient(circle at 12% 22%, rgb(142 217 255 / var(--nami-style-doodle-opacity)) 0 12px, transparent 13px),
    radial-gradient(circle at 86% 16%, rgb(255 216 93 / var(--nami-style-doodle-opacity)) 0 9px, transparent 10px),
    radial-gradient(circle at 72% 78%, rgb(255 183 208 / var(--nami-style-doodle-opacity)) 0 18px, transparent 19px),
    linear-gradient(135deg, transparent 0 46%, var(--nami-style-paper-line-color) 47% 49%, transparent 50%),
    linear-gradient(25deg, transparent 0 70%, ${c("var(--nami-accent-50)",82)} 71% 73%, transparent 74%)`}}function wi(e){const t=e.stylePreset==="illustration",a=t&&e.mode==="dark",i=e.contrast==="high";return{"--nami-button-bg":"var(--nami-color-primary)","--nami-button-fg":"#fff","--nami-button-border":t?"var(--nami-style-stroke-color)":i?"var(--nami-color-primary)":"transparent","--nami-button-border-width":t?"var(--nami-style-stroke-width)":i?"2px":"1px","--nami-button-radius":"var(--nami-radius-control)","--nami-button-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-button-hover-bg":"var(--nami-color-primary-hover)","--nami-card-bg":t?"var(--nami-style-control-bg)":"var(--nami-surface-raised)","--nami-card-fg":t?"var(--nami-style-on-paper)":"var(--nami-text)","--nami-card-inset-bg":t?a?"var(--nami-style-paper-bg)":g("var(--nami-style-paper-bg)","var(--nami-accent-50)",5):"var(--nami-surface-inset)","--nami-card-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-card-border-width":"var(--nami-style-stroke-width)","--nami-card-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-card-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-card-padding":"var(--nami-space-4)","--nami-card-gap":"var(--nami-space-3)","--nami-badge-bg":t?a?"var(--nami-style-control-bg)":g("var(--nami-accent-50)","#fff",88):"var(--nami-hover-overlay)","--nami-badge-fg":t?"var(--nami-style-on-paper)":"var(--nami-text)","--nami-badge-border":t?"var(--nami-style-stroke-color)":"transparent","--nami-badge-border-width":"var(--nami-style-stroke-width)","--nami-badge-radius":"var(--nami-radius-control)","--nami-badge-height":"24px","--nami-badge-font-size":"0.75rem","--nami-badge-padding-x":"9px","--nami-soft-control-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-soft-control-color":t?"var(--nami-style-on-paper)":"var(--nami-text)","--nami-soft-control-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-soft-control-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-chip-bg":t?a?"var(--nami-style-control-bg)":g("var(--nami-accent-50)","#fff",92):"var(--nami-hover-overlay)","--nami-chip-selected-bg":"var(--nami-color-primary)","--nami-chip-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-chip-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-chip-radius":"var(--nami-radius-control)","--nami-chip-shadow":t?`3px 3px 0 ${a?"#050506":"#2f2f2f"}`:"none","--nami-input-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-input-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-input-border-width":t?"var(--nami-style-stroke-width)":i?"2px":"1px","--nami-input-radius":t?"12px":"var(--nami-radius-control)","--nami-input-shadow":t?`3px 3px 0 ${a?"#050506":"#2f2f2f"}`:"none","--nami-switch-track-bg":t?"var(--nami-style-control-bg)":"var(--nami-hover-overlay)","--nami-switch-border-width":"var(--nami-style-stroke-width)","--nami-switch-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-switch-thumb-bg":t?"var(--nami-style-paper-bg)":"var(--nami-surface-raised)","--nami-switch-thumb-shadow":t?`2px 2px 0 ${a?"#050506":"var(--nami-style-ink-color)"}`:`0 1px 4px ${c("var(--nami-shadow-color)",64)}`,"--nami-radio-card-bg":t?"var(--nami-style-control-bg)":"var(--nami-surface-raised)","--nami-radio-card-border-width":t?"var(--nami-style-stroke-width)":i?"2px":"1px","--nami-radio-card-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-radio-card-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-radio-card-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-radio-card-selected-shadow":t?"0 0 0 2px var(--nami-color-primary), var(--nami-style-offset-shadow)":"0 0 0 1px var(--nami-color-primary), var(--nami-focus-ring)","--nami-tab-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-tab-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-tab-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-tab-radius":t?"12px":"var(--nami-radius-control)","--nami-dialog-bg":t?"var(--nami-style-panel-bg)":"var(--nami-surface-raised)","--nami-dialog-border-width":t?"var(--nami-style-stroke-width)":"1px","--nami-dialog-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-dialog-radius":t?"18px":"var(--nami-radius-surface)","--nami-dialog-shadow":t?"var(--nami-style-offset-shadow)":`0 18px 50px ${c("var(--nami-shadow-color)",54)}`,"--nami-drawer-bg":t?"var(--nami-style-panel-bg)":"var(--nami-surface-overlay)","--nami-drawer-border-width":t?"var(--nami-style-stroke-width)":"1px","--nami-drawer-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-drawer-shadow":t?"var(--nami-style-offset-shadow)":`0 8px 24px ${c("var(--nami-shadow-color)",52)}`,"--nami-toast-bg":t?"var(--nami-style-control-bg)":"var(--nami-surface-raised)","--nami-toast-border-width":t?"var(--nami-style-stroke-width)":"1px","--nami-toast-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-toast-radius":t?"14px":"var(--nami-radius-surface)","--nami-app-shell-border-width":t?"var(--nami-style-stroke-width)":"1px","--nami-app-shell-shadow":t?`4px 0 0 ${a?"#050506":"#2f2f2f"}`:"none","--nami-spinner-track-color":c("currentColor",t?64:72),"--nami-transition-progress-height":t?"5px":"4px","--nami-page-transition-z-index":"2147483646","--nami-top-progress-height":"var(--nami-transition-progress-height)","--nami-top-progress-duration":e.motion==="reduced"?"1ms":"260ms","--nami-top-progress-ease":"var(--nami-ease-standard)","--nami-top-progress-indeterminate-duration":e.motion==="reduced"?"1ms":"1280ms","--nami-top-progress-track-bg":t?a?g("var(--nami-color-primary)","var(--nami-style-panel-bg)",68):g("var(--nami-color-primary)","#fff",78):"color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 72%)","--nami-top-progress-fill-bg":t?"var(--nami-color-primary)":"color-mix(in oklab, var(--nami-color-primary), var(--nami-text) 8%)","--nami-top-progress-shadow":t?`0 4px 0 ${a?"#050506":"var(--nami-style-ink-color)"}`:`0 8px 24px ${c("var(--nami-color-primary)",78)}`,"--nami-top-progress-z-index":"2147483647","--nami-illus-primary":"var(--nami-color-primary)","--nami-illus-secondary":t?g("var(--nami-color-primary)","#fff",a?38:58):"var(--nami-accent-20)","--nami-illus-accent":a?"#ffd166":"#f5b84b","--nami-illus-muted":t?c("var(--nami-style-on-paper-muted)",a?24:44):c("var(--nami-text-muted)",48),"--nami-illus-line":t?"var(--nami-style-stroke-color)":c("var(--nami-text)",36),"--nami-illus-bg":t?c("var(--nami-color-primary)",a?84:90):"var(--nami-color-primary-muted)","--nami-illus-size-sm":"92px","--nami-illus-size-md":"140px","--nami-illus-size-lg":"184px","--nami-empty-gap":"12px","--nami-empty-title-color":t?"var(--nami-style-on-paper)":"var(--nami-text)","--nami-empty-description-color":t?"var(--nami-style-on-paper-muted)":"var(--nami-text-muted)","--nami-empty-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-empty-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-empty-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-empty-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-empty-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-result-title-size":"1.5rem","--nami-result-subtitle-size":"0.95rem","--nami-result-gap":"14px","--nami-result-actions-margin":"10px 0 0","--nami-result-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-result-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-result-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-result-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-result-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-container-max-width":"var(--nami-container-lg)","--nami-container-padding":"var(--nami-layout-gutter)","--nami-stack-gap":"var(--nami-space-3)","--nami-cluster-gap":"var(--nami-space-2)","--nami-grid-min":"16rem","--nami-grid-gap":"var(--nami-layout-gutter)","--nami-split-min":"18rem","--nami-split-gap":"var(--nami-layout-gutter)","--nami-checkbox-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-checkbox-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-checkbox-border-width":t?"var(--nami-style-stroke-width)":i?"2px":"1px","--nami-checkbox-radius":e.radius==="round"?"6px":"var(--nami-radius-tight)","--nami-checkbox-indicator-color":"#fff","--nami-textarea-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-textarea-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-textarea-border-width":t?"var(--nami-style-stroke-width)":i?"2px":"1px","--nami-textarea-radius":t?"12px":"var(--nami-radius-surface)","--nami-textarea-shadow":t?`3px 3px 0 ${a?"#050506":"#2f2f2f"}`:"none","--nami-form-field-gap":"var(--nami-space-2)","--nami-alert-bg":t?"var(--nami-style-control-bg)":"var(--nami-surface-raised)","--nami-alert-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-alert-border-width":t?"var(--nami-style-stroke-width)":i?"2px":"1px","--nami-alert-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-alert-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-skeleton-bg":t?c("var(--nami-style-on-paper-muted)",82):"var(--nami-hover-overlay)","--nami-skeleton-highlight":t?c("var(--nami-style-paper-bg)",18):c("#fff",a?82:18),"--nami-progress-track-bg":t?a?g("var(--nami-color-primary)","var(--nami-style-panel-bg)",72):g("var(--nami-color-primary)","#fff",84):"color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 82%)","--nami-progress-fill-bg":"var(--nami-color-primary)","--nami-progress-height":"8px","--nami-progress-radius":"var(--nami-radius-control)"}}function ki(e={}){const t=oi(e),a=ni(e),i=hi(t),r=gi(t),s=t.stylePreset==="illustration"?xi(t):yi(t),n=wi(t),p={...i,...pi(t),...fi(),"--nami-contrast-level":t.contrast,...ui(t),...vi(t),...bi(t),...r,...s,...n};return{seed:t,palette:i,semantic:r,component:n,style:s,cssVars:p,diagnostics:a}}function $i(e){return{...e,seed:{...e.seed},recipes:{...e.recipes},slotRecipes:{...e.slotRecipes},conditions:{...e.conditions}}}function ha(e){return e.startsWith("--")?e:ca(e.split("."))}function zi(e){return/^#|^rgb|^hsl|color-mix\(/.test(e)?"color":/^-?\d+(\.\d+)?(px|rem|em|%|dvh|dvw|vh|vw)$/.test(e)?"dimension":/^-?\d+(\.\d+)?m?s$/.test(e)?"duration":/^-?\d+(\.\d+)?$/.test(e)?"number":/cubic-bezier|linear/.test(e)?"cubicBezier":/shadow|0\s/.test(e)&&e.includes(" ")?"shadow":"string"}function Y(e){return Object.fromEntries(Object.entries(e).map(([t,a])=>[t,{$type:zi(a),$value:a}]))}function Ai(e={}){const t=$i(e),a=ki(t.seed??{}),i={...a.cssVars,...mi(t,a)},r={...a,cssVars:i};return{...r,config:t,conditions:t.conditions??{},recipes:t.recipes??{},slotRecipes:t.slotRecipes??{},token:(s,n="")=>i[ha(s)]??n,tokenVar:(s,n="")=>{const p=ha(s);return p in i?`var(${p})`:n},cssText:(s=":root")=>Ei(r,s),dtcg:()=>Si(r)}}function Ei(e,t=":root"){const a=Object.entries(e.cssVars).sort(([i],[r])=>i.localeCompare(r)).map(([i,r])=>`  ${i}: ${r};`).join(`
`);return`${t} {
${a}
}`}function Si(e){const t=Object.fromEntries(Object.entries(e.seed).map(([a,i])=>[a,{$type:a==="accent"?"color":"string",$value:i}]));return{$schema:"https://www.designtokens.org/schemas/2025.10/tokens.json",$extensions:{"org.nami.theme":{generatedBy:"@nami/tokens",layers:["seed","palette","semantic","component","style","cssVars"]}},seed:t,palette:Y(e.palette),semantic:Y(e.semantic),component:Y(e.component),style:Y(e.style),cssVars:Y(e.cssVars)}}const Dt=class Dt extends h{constructor(){super(),this.appliedThemeVars=new Set,this.systemQuery=null,this.handleSystemThemeChange=()=>{this.theme==="system"&&this.applyTheme()},this.theme="light",this.density="comfortable",this.size="md",this.motion="normal",this.stylePreset="default",this.radius="round",this.contrast="normal",this.accent="",this.inherit=!0,this.config=null}connectedCallback(){super.connectedCallback(),typeof window<"u"&&typeof window.matchMedia=="function"&&(this.systemQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.systemQuery.addEventListener?.("change",this.handleSystemThemeChange))}disconnectedCallback(){this.systemQuery?.removeEventListener?.("change",this.handleSystemThemeChange),super.disconnectedCallback()}updated(){this.applyTheme()}get resolvedThemeMode(){return this.theme!=="system"?this.theme:this.systemQuery?.matches?"dark":"light"}hasRuntimeThemeInput(){return!!(this.config||this.accent||this.hasAttribute("theme")||this.hasAttribute("density")||this.hasAttribute("size")||this.hasAttribute("motion")||this.hasAttribute("style-preset")||this.hasAttribute("radius")||this.hasAttribute("contrast"))}applyTheme(){const t=this.config?.seed??{},a=this.stylePreset==="ant-illustration"?"illustration":this.stylePreset,i=this.hasAttribute("theme")?this.resolvedThemeMode:t.mode??this.resolvedThemeMode,r=this.hasAttribute("style-preset")?a:t.stylePreset??a,s=this.hasAttribute("density")?this.density:t.density??this.density,n=this.hasAttribute("size")?this.size:t.size??this.size,p=this.hasAttribute("motion")?this.motion:t.motion??this.motion,l=this.hasAttribute("radius")?this.radius:t.radius??this.radius,b=this.hasAttribute("contrast")?this.contrast:t.contrast??this.contrast,x={...t,accent:this.accent||t.accent,mode:i,stylePreset:r,density:s,size:n,motion:p,radius:l,contrast:b};if(this.accent?(this.style.setProperty("--nami-theme-accent",this.accent),this.style.setProperty("--nami-accent-50",this.accent)):(this.style.removeProperty("--nami-theme-accent"),this.style.removeProperty("--nami-accent-50")),this.hasRuntimeThemeInput()){const f=Ai({...this.config,seed:x}),z=new Set(Object.keys(f.cssVars));for(const w of this.appliedThemeVars)!z.has(w)&&w!=="--nami-theme-accent"&&w!=="--nami-accent-50"&&this.style.removeProperty(w);for(const[w,H]of Object.entries(f.cssVars))this.style.setProperty(w,H);this.appliedThemeVars=z}else{for(const f of this.appliedThemeVars)this.style.removeProperty(f);this.appliedThemeVars.clear()}this.dataset.namiTheme=i,this.dataset.namiThemeRequested=this.theme,this.dataset.namiDensity=s,this.dataset.namiSize=n,this.dataset.namiMotion=p,this.dataset.namiStyle=r,this.dataset.namiRadius=l,this.dataset.namiContrast=b}render(){return o`<slot></slot>`}};Dt.properties={theme:{reflect:!0,useDefault:!0},density:{reflect:!0,useDefault:!0},size:{reflect:!0,useDefault:!0},motion:{reflect:!0,useDefault:!0},stylePreset:{attribute:"style-preset",reflect:!0,useDefault:!0},radius:{reflect:!0,useDefault:!0},contrast:{reflect:!0,useDefault:!0},accent:{reflect:!0,useDefault:!0},inherit:{type:Boolean,reflect:!0},config:{attribute:!1}},Dt.styles=[v,u`
      :host {
        display: block;
        min-height: 0;
      }

      :host([accent]) {
        --nami-accent-50: var(--nami-theme-accent);
      }

      :host([theme='light']) {
        color-scheme: light;
      }

      :host([theme='dark']) {
        color-scheme: dark;
      }

      :host([radius='sharp']) {
        --nami-radius-control: 4px;
        --nami-radius-surface: 4px;
        --nami-radius-tight: 2px;
      }

      :host([radius='soft']) {
        --nami-radius-control: 10px;
        --nami-radius-surface: 8px;
        --nami-radius-tight: 4px;
      }

      :host([radius='round']) {
        --nami-radius-control: 999px;
        --nami-radius-surface: 6px;
        --nami-radius-tight: 4px;
      }

      :host([contrast='high']) {
        --nami-contrast-level: high;
        --nami-style-stroke-width: max(2px, var(--nami-style-stroke-width, 1px));
      }
    `];let Ee=Dt;const Ot=class Ot extends h{constructor(){super(),this.timer=0,_(this),this.open=!1,this.message="",this.variant="neutral",this.placement="top",this.duration=3200}static show(t){const a=document.createElement("nami-toast");return a.message=t.message,a.variant=t.variant??"neutral",a.placement=t.placement??"top",a.duration=t.duration??3200,document.body.append(a),requestAnimationFrame(()=>{a.open=!0}),a}updated(t){t.has("open")&&(this.open?(y(this,"nami-open",void 0),window.clearTimeout(this.timer),this.duration>0&&(this.timer=window.setTimeout(()=>this.close(),this.duration))):t.get("open")===!0&&(window.clearTimeout(this.timer),y(this,"nami-close",this.closeSourceEvent?{sourceEvent:this.closeSourceEvent}:void 0),this.closeSourceEvent=void 0))}disconnectedCallback(){window.clearTimeout(this.timer),super.disconnectedCallback()}close(t){this.open&&(this.closeSourceEvent=t,this.open=!1,window.setTimeout(()=>this.remove(),180))}render(){return o`
      <div class="base" part="base" role="status" aria-live="polite">
        <span class="indicator" part="indicator"><slot name="icon">${this.variant==="neutral"?d:o`<span aria-hidden="true">*</span>`}</slot></span>
        <span part="label"><slot>${this.message}</slot></span>
        <button type="button" part="actions" aria-label=${A("Close",{id:"nami.toast.close"})} @click=${t=>this.close(t)}>X</button>
      </div>
    `}};Ot.properties={open:{type:Boolean,reflect:!0},message:{},variant:{reflect:!0},placement:{reflect:!0},duration:{type:Number}},Ot.styles=[v,u`
      :host {
        display: block;
        left: 50%;
        max-width: min(420px, calc(100vw - 32px));
        pointer-events: auto;
        position: fixed;
        transform: translateX(-50%) translateY(var(--toast-offset, -16px));
        transition:
          opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        width: max-content;
        z-index: 70;
      }

      :host([placement='top']) {
        top: 16px;
        --toast-offset: -16px;
      }

      :host([placement='bottom']) {
        bottom: 16px;
        --toast-offset: 16px;
      }

      :host([open]) {
        transform: translateX(-50%) translateY(0);
      }

      .base {
        align-items: center;
        background: var(--nami-toast-bg, var(--nami-surface-raised));
        border: var(--nami-toast-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-toast-border-color, var(--nami-border));
        border-radius: var(--nami-toast-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-dialog-shadow);
        color: var(--nami-style-on-paper, var(--nami-text));
        display: flex;
        gap: var(--nami-space-3, 10px);
        min-height: 44px;
        padding: 10px 12px;
      }

      :host([variant='success']) .indicator {
        color: var(--nami-color-primary);
      }

      :host([variant='danger']) .indicator {
        color: var(--nami-color-danger);
      }

      button {
        background: transparent;
        border: 0;
        border-radius: var(--nami-radius-control, 999px);
        color: var(--nami-style-on-paper-muted, var(--nami-icon-color));
        cursor: pointer;
        height: 30px;
        width: 30px;
      }

      button:hover {
        background: var(--nami-hover-overlay);
      }
    `];let Se=Ot;const jt=class jt extends h{constructor(){super(),this.hideTimer=0,this.shownAt=0,_(this),this.active=!1,this.duration=220,this.effect="flow",this.height=4,this.label="",this.progress=void 0,this.variant="fixed",this.visible=!1}connectedCallback(){super.connectedCallback(),this.active&&(this.visible=!0,this.shownAt=Date.now())}disconnectedCallback(){window.clearTimeout(this.hideTimer),this.hideResolver?.(),super.disconnectedCallback()}updated(t){if(t.has("progress")&&this.syncProgressStyle(),t.has("height")&&this.syncHeightStyle(),t.has("duration")&&this.syncDurationStyle(),!t.has("active"))return;if(window.clearTimeout(this.hideTimer),this.active){this.hideResolver?.(),this.hideComplete=void 0,this.visible=!0,this.shownAt=Date.now();return}const a=Date.now()-this.shownAt,i=Math.max(0,Number(this.duration)-a);this.hideComplete=new Promise(r=>{this.hideResolver=r}),this.hideTimer=window.setTimeout(()=>{this.active||(this.visible=!1),this.hideResolver?.(),this.hideResolver=void 0},i)}show(t={}){this.applyOptions(t),this.visible=!0,this.shownAt=Date.now(),this.active=!0}set(t){this.progress=t??void 0}async finish(t={}){this.applyOptions({...t,progress:t.progress??100}),this.active=!0,await this.updateComplete,await new Promise(a=>window.setTimeout(a,Number(t.minDuration??this.duration))),await this.hide({...t,progress:null})}async hide(t={}){this.applyOptions(t),this.active=!1,await this.updateComplete,this.hideComplete&&await this.hideComplete}async waitFor(t,a={}){const i=a.minDuration??this.duration,r=Date.now();this.show(a);try{return await(typeof t=="function"?t():t)}finally{const s=Math.max(0,Number(i)-(Date.now()-r));s>0&&await new Promise(n=>window.setTimeout(n,s)),await this.finish(a)}}applyOptions(t){t.duration!==void 0&&(this.duration=t.duration),t.effect&&(this.effect=t.effect),t.height!==void 0&&(this.height=t.height),t.label!==void 0&&(this.label=t.label),t.variant&&(this.variant=t.variant),t.progress!==void 0&&this.set(t.progress)}syncProgressStyle(){if(this.progress===void 0||this.progress===null||Number.isNaN(Number(this.progress))){this.style.removeProperty("--nami-top-progress-value");return}const t=Math.min(100,Math.max(0,Number(this.progress)));this.style.setProperty("--nami-top-progress-value",`${t}%`)}syncHeightStyle(){if(!Number.isFinite(Number(this.height))||Number(this.height)<=0){this.style.removeProperty("--nami-top-progress-height");return}this.style.setProperty("--nami-top-progress-height",`${Number(this.height)}px`)}syncDurationStyle(){if(!Number.isFinite(Number(this.duration))||Number(this.duration)<0){this.style.removeProperty("--nami-top-progress-duration");return}this.style.setProperty("--nami-top-progress-duration",`${Number(this.duration)}ms`)}get fallbackLabel(){return this.label||A("Navigating",{id:"nami.topProgress.navigating"})}render(){if(!this.visible)return d;const t=this.progress!==void 0&&this.progress!==null&&!Number.isNaN(Number(this.progress));return o`
      <div class="base" part="base">
        <span
          class="track"
          part="track"
          role="progressbar"
          aria-label=${this.fallbackLabel}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${t?String(Math.round(Number(this.progress))):d}
        >
          <span class="indicator" part="indicator"></span>
        </span>
      </div>
    `}};jt.properties={active:{type:Boolean,reflect:!0},duration:{type:Number,reflect:!0},effect:{reflect:!0},height:{type:Number,reflect:!0},label:{},progress:{type:Number,reflect:!0},variant:{reflect:!0},visible:{state:!0}},jt.styles=[v,u`
      :host {
        --top-progress-height: var(--nami-top-progress-height, var(--nami-transition-progress-height, 4px));
        --top-progress-duration: var(--nami-top-progress-duration, 220ms);
        --top-progress-ease: var(--nami-top-progress-ease, var(--nami-ease-standard, cubic-bezier(0.19, 1, 0.22, 1)));
        --top-progress-indeterminate-duration: var(--nami-top-progress-indeterminate-duration, 1280ms);
        --top-progress-track-bg: var(
          --nami-top-progress-track-bg,
          color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 78%)
        );
        --top-progress-fill-bg: var(
          --nami-top-progress-fill-bg,
          color-mix(in oklab, var(--nami-color-primary), var(--nami-text) 10%)
        );
        --top-progress-shadow: var(
          --nami-top-progress-shadow,
          0 8px 24px color-mix(in oklab, var(--nami-color-primary), transparent 78%)
        );
        --top-progress-z-index: var(--nami-top-progress-z-index, 2147483647);
        display: contents;
      }

      .base {
        box-sizing: border-box;
        inset-block-start: 0;
        inset-inline: 0 -4px;
        pointer-events: none;
        position: fixed;
        z-index: var(--top-progress-z-index);
      }

      :host([variant='inline']) .base {
        inset: 0;
        position: absolute;
      }

      .track {
        background: var(--top-progress-track-bg);
        block-size: var(--top-progress-height);
        box-shadow: var(--top-progress-shadow);
        display: block;
        inline-size: 100%;
        overflow: clip;
        position: relative;
        transform: scaleY(0);
        transform-origin: center top;
        transition: transform var(--top-progress-duration) var(--top-progress-ease);
      }

      :host([active]) .track {
        transform: scaleY(1);
      }

      :host([variant='inline']) .track {
        border-radius: var(--nami-radius-control, 999px);
        box-shadow: none;
      }

      .indicator {
        animation: nami-top-progress-flow var(--top-progress-indeterminate-duration) var(--top-progress-ease) infinite;
        background-color: var(--top-progress-fill-bg);
        background-image: linear-gradient(
          90deg,
          var(--top-progress-fill-bg) 0%,
          color-mix(in oklab, var(--top-progress-fill-bg), white 18%) 56%,
          var(--top-progress-fill-bg) 100%
        );
        block-size: 100%;
        border-radius: 0 999px 999px 0;
        box-shadow:
          inset 0 0 0 1px color-mix(in oklab, var(--nami-color-primary), white 24%),
          0 0 18px color-mix(in oklab, var(--nami-color-primary), transparent 52%);
        display: block;
        inline-size: 46%;
        overflow: hidden;
        position: relative;
        transform: translateX(-62%) scaleX(0.44);
        transform-origin: left center;
        will-change: inline-size, transform, filter;
      }

      .indicator::after {
        animation: nami-top-progress-sheen var(--top-progress-indeterminate-duration) var(--top-progress-ease) infinite;
        background: linear-gradient(
          90deg,
          transparent 0%,
          color-mix(in oklab, white, transparent 52%) 48%,
          transparent 100%
        );
        content: '';
        inset: 0;
        opacity: 0.72;
        position: absolute;
        transform: translateX(-130%);
      }

      :host([progress]) .indicator {
        animation: none;
        inline-size: var(--nami-top-progress-value, 0%);
        transform: none;
        transition:
          inline-size var(--top-progress-duration) var(--top-progress-ease),
          filter var(--top-progress-duration) var(--top-progress-ease);
      }

      :host([effect='slide']) .indicator {
        animation-name: nami-top-progress-slide;
        background-image: none;
      }

      :host([effect='slide']) .indicator::after {
        display: none;
      }

      :host([effect='pulse']) .indicator {
        animation-name: nami-top-progress-pulse;
        background-image: none;
        inline-size: 50%;
      }

      :host([effect='pulse']) .indicator::after {
        animation-name: nami-top-progress-sheen-soft;
        opacity: 0.38;
      }

      :host([progress][effect='pulse']) .indicator {
        animation: nami-top-progress-breathe 940ms ease-in-out infinite;
      }

      @keyframes nami-top-progress-flow {
        0% {
          transform: translateX(-64%) scaleX(0.34);
        }

        42% {
          transform: translateX(34%) scaleX(0.82);
        }

        72% {
          transform: translateX(92%) scaleX(0.58);
        }

        100% {
          transform: translateX(166%) scaleX(0.3);
        }
      }

      @keyframes nami-top-progress-slide {
        0% {
          transform: translateX(-72%) scaleX(0.42);
        }

        55% {
          transform: translateX(80%) scaleX(0.66);
        }

        100% {
          transform: translateX(168%) scaleX(0.38);
        }
      }

      @keyframes nami-top-progress-pulse {
        0% {
          filter: brightness(0.98) saturate(0.96);
          transform: translateX(-54%) scaleX(0.28);
        }

        46% {
          filter: brightness(1.12) saturate(1.18);
          transform: translateX(64%) scaleX(0.74);
        }

        100% {
          filter: brightness(1) saturate(1);
          transform: translateX(152%) scaleX(0.34);
        }
      }

      @keyframes nami-top-progress-sheen {
        0% {
          transform: translateX(-130%);
        }

        55% {
          transform: translateX(86%);
        }

        100% {
          transform: translateX(150%);
        }
      }

      @keyframes nami-top-progress-sheen-soft {
        0%,
        24% {
          transform: translateX(-130%);
        }

        72% {
          transform: translateX(96%);
        }

        100% {
          transform: translateX(150%);
        }
      }

      @keyframes nami-top-progress-breathe {
        0%,
        100% {
          filter: brightness(1) saturate(1);
        }

        50% {
          filter: brightness(1.12) saturate(1.14);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .track,
        .indicator {
          transition-duration: 1ms;
        }

        .indicator,
        .indicator::after {
          animation-duration: 1ms;
          animation-iteration-count: 1;
        }
      }
    `];let Ce=jt;const It=class It extends h{constructor(){super(),this.variant="neutral",this.title="",this.closable=!1}updated(){this.dataset.state=this.variant}close(t){y(this,"nami-close",{sourceEvent:t},{cancelable:!0})&&this.remove()}render(){const t=this.variant==="danger"||this.variant==="warning"?"alert":"status";return o`
      <section class="base" part="base" role=${t}>
        <span class="indicator" part="indicator"><slot name="icon">${this.variant==="neutral"?"i":"!"}</slot></span>
        <div>
          ${this.title?o`<h3 part="label"><slot name="title">${this.title}</slot></h3>`:o`<slot name="title"></slot>`}
          <div class="body" part="description"><slot></slot></div>
        </div>
        <div class="actions" part="actions">
          <slot name="actions"></slot>
          ${this.closable?o`<button type="button" aria-label="Close" @click=${this.close}>${"×"}</button>`:d}
        </div>
      </section>
    `}};It.properties={variant:{reflect:!0},title:{},closable:{type:Boolean,reflect:!0}},It.styles=[v,u`
      :host {
        display: block;
      }

      .base {
        background: var(--nami-alert-bg, var(--nami-surface-raised));
        border: var(--nami-alert-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-alert-border, var(--nami-border));
        border-radius: var(--nami-alert-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-alert-shadow, none);
        color: var(--nami-style-on-paper, var(--nami-text));
        display: grid;
        gap: var(--nami-space-2, 6px) var(--nami-space-3, 10px);
        grid-template-columns: auto minmax(0, 1fr) auto;
        padding: var(--nami-space-4, 16px);
      }

      .indicator {
        color: var(--nami-color-primary);
        font-weight: 900;
      }

      :host([variant='danger']) .indicator {
        color: var(--nami-color-danger);
      }

      :host([variant='warning']) .indicator {
        color: #b7791f;
      }

      h3 {
        font-size: 0.95rem;
        line-height: 1.35;
        margin: 0;
      }

      .body {
        color: var(--nami-text-muted);
        line-height: 1.55;
      }

      button {
        background: transparent;
        border: 0;
        border-radius: var(--nami-radius-control, 999px);
        color: var(--nami-icon-color);
        cursor: pointer;
        height: 30px;
        width: 30px;
      }

      button:hover {
        background: var(--nami-hover-overlay);
      }

      .actions {
        align-items: start;
        display: inline-flex;
        gap: var(--nami-space-2, 6px);
      }
    `];let _e=It;function pa(){m("nami-theme",Ee),m("nami-config",re),m("nami-spinner",B),m("nami-page-transition",xe),m("nami-top-progress",Ce),m("nami-illustration",K),m("nami-empty",ce),m("nami-result",be),m("nami-card",Nt),m("nami-badge",Kt),m("nami-button",Gt),m("nami-icon-button",pe),m("nami-chip",te),m("nami-input",ue),m("nami-switch",ke),m("nami-radio-card",fe),m("nami-tab-bar",$e),m("nami-dialog",oe),m("nami-drawer",le),m("nami-toast",Se),m("nami-app-shell",Wt),m("nami-container",se),m("nami-stack",we),m("nami-cluster",ie),m("nami-grid",he),m("nami-split",ye),m("nami-checkbox",ae),m("nami-textarea",ze),m("nami-form-field",me),m("nami-alert",_e),m("nami-skeleton",ge),m("nami-progress",ve)}pa();const Ci=Object.freeze(Object.defineProperty({__proto__:null,templates:{"nami.empty.aria":"空状态","nami.empty.description":"暂无数据","nami.pageTransition.preparing":"正在准备界面","nami.result.aria":"结果","nami.spinner.loading":"加载中","nami.toast.close":"关闭","nami.topProgress.navigating":"正在切换页面"}},Symbol.toStringTag,{value:"Module"}));return Rt.registerNamiElements=pa,Object.defineProperty(Rt,Symbol.toStringTag,{value:"Module"}),Rt})({});
