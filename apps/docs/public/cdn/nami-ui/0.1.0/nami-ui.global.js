var NamiUI=(function(re){"use strict";const mt=globalThis,se=mt.ShadowRoot&&(mt.ShadyCSS===void 0||mt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ne=Symbol(),ai=new WeakMap;let ri=class{constructor(t,i,a){if(this._$cssResult$=!0,a!==ne)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(se&&t===void 0){const a=i!==void 0&&i.length===1;a&&(t=ai.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),a&&ai.set(i,t))}return t}toString(){return this.cssText}};const Zi=e=>new ri(typeof e=="string"?e:e+"",void 0,ne),b=(e,...t)=>{const i=e.length===1?e[0]:t.reduce((a,r,s)=>a+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[s+1],e[0]);return new ri(i,e,ne)},Ji=(e,t)=>{if(se)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of t){const a=document.createElement("style"),r=mt.litNonce;r!==void 0&&a.setAttribute("nonce",r),a.textContent=i.cssText,e.appendChild(a)}},si=se?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const a of t.cssRules)i+=a.cssText;return Zi(i)})(e):e;const{is:Gi,defineProperty:ta,getOwnPropertyDescriptor:ea,getOwnPropertyNames:ia,getOwnPropertySymbols:aa,getPrototypeOf:ra}=Object,ut=globalThis,ni=ut.trustedTypes,sa=ni?ni.emptyScript:"",na=ut.reactiveElementPolyfillSupport,Z=(e,t)=>e,oe={toAttribute(e,t){switch(t){case Boolean:e=e?sa:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},oi=(e,t)=>!Gi(e,t),li={attribute:!0,type:String,converter:oe,reflect:!1,useDefault:!1,hasChanged:oi};Symbol.metadata??=Symbol("metadata"),ut.litPropertyMetadata??=new WeakMap;let N=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=li){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const a=Symbol(),r=this.getPropertyDescriptor(t,a,i);r!==void 0&&ta(this.prototype,t,r)}}static getPropertyDescriptor(t,i,a){const{get:r,set:s}=ea(this.prototype,t)??{get(){return this[i]},set(n){this[i]=n}};return{get:r,set(n){const c=r?.call(this);s?.call(this,n),this.requestUpdate(t,c,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??li}static _$Ei(){if(this.hasOwnProperty(Z("elementProperties")))return;const t=ra(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Z("properties"))){const i=this.properties,a=[...ia(i),...aa(i)];for(const r of a)this.createProperty(r,i[r])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[a,r]of i)this.elementProperties.set(a,r)}this._$Eh=new Map;for(const[i,a]of this.elementProperties){const r=this._$Eu(i,a);r!==void 0&&this._$Eh.set(r,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const a=new Set(t.flat(1/0).reverse());for(const r of a)i.unshift(si(r))}else t!==void 0&&i.push(si(t));return i}static _$Eu(t,i){const a=i.attribute;return a===!1?void 0:typeof a=="string"?a:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const a of i.keys())this.hasOwnProperty(a)&&(t.set(a,this[a]),delete this[a]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ji(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,a){this._$AK(t,a)}_$ET(t,i){const a=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,a);if(r!==void 0&&a.reflect===!0){const s=(a.converter?.toAttribute!==void 0?a.converter:oe).toAttribute(i,a.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,i){const a=this.constructor,r=a._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const s=a.getPropertyOptions(r),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:oe;this._$Em=r;const c=n.fromAttribute(i,s.type);this[r]=c??this._$Ej?.get(r)??c,this._$Em=null}}requestUpdate(t,i,a,r=!1,s){if(t!==void 0){const n=this.constructor;if(r===!1&&(s=this[t]),a??=n.getPropertyOptions(t),!((a.hasChanged??oi)(s,i)||a.useDefault&&a.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,a))))return;this.C(t,i,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:a,reflect:r,wrapped:s},n){a&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??i??this[t]),s!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||a||(i=void 0),this._$AL.set(t,i)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[r,s]of a){const{wrapped:n}=s,c=this[r];n!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,s,c)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(i)):this._$EM()}catch(a){throw t=!1,this._$EM(),a}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(i=>this._$ET(i,this[i])),this._$EM()}updated(t){}firstUpdated(t){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[Z("elementProperties")]=new Map,N[Z("finalized")]=new Map,na?.({ReactiveElement:N}),(ut.reactiveElementVersions??=[]).push("2.1.2");const le=globalThis,ci=e=>e,ft=le.trustedTypes,di=ft?ft.createPolicy("lit-html",{createHTML:e=>e}):void 0,hi="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,pi="?"+P,oa=`<${pi}>`,H=document,J=()=>H.createComment(""),G=e=>e===null||typeof e!="object"&&typeof e!="function",ce=Array.isArray,la=e=>ce(e)||typeof e?.[Symbol.iterator]=="function",de=`[ 	
\f\r]`,tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mi=/-->/g,ui=/>/g,X=RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fi=/'/g,vi=/"/g,bi=/^(?:script|style|textarea|title)$/i,ca=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),o=ca(1),W=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),gi=new WeakMap,j=H.createTreeWalker(H,129);function yi(e,t){if(!ce(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return di!==void 0?di.createHTML(t):t}const da=(e,t)=>{const i=e.length-1,a=[];let r,s=t===2?"<svg>":t===3?"<math>":"",n=tt;for(let c=0;c<i;c++){const l=e[c];let v,w,h=-1,d=0;for(;d<l.length&&(n.lastIndex=d,w=n.exec(l),w!==null);)d=n.lastIndex,n===tt?w[1]==="!--"?n=mi:w[1]!==void 0?n=ui:w[2]!==void 0?(bi.test(w[2])&&(r=RegExp("</"+w[2],"g")),n=X):w[3]!==void 0&&(n=X):n===X?w[0]===">"?(n=r??tt,h=-1):w[1]===void 0?h=-2:(h=n.lastIndex-w[2].length,v=w[1],n=w[3]===void 0?X:w[3]==='"'?vi:fi):n===vi||n===fi?n=X:n===mi||n===ui?n=tt:(n=X,r=void 0);const k=n===X&&e[c+1].startsWith("/>")?" ":"";s+=n===tt?l+oa:h>=0?(a.push(v),l.slice(0,h)+hi+l.slice(h)+P+k):l+P+(h===-2?c:k)}return[yi(e,s+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),a]};class et{constructor({strings:t,_$litType$:i},a){let r;this.parts=[];let s=0,n=0;const c=t.length-1,l=this.parts,[v,w]=da(t,i);if(this.el=et.createElement(v,a),j.currentNode=this.el.content,i===2||i===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=j.nextNode())!==null&&l.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(hi)){const d=w[n++],k=r.getAttribute(h).split(P),g=/([.?@])?(.*)/.exec(d);l.push({type:1,index:s,name:g[2],strings:k,ctor:g[1]==="."?pa:g[1]==="?"?ma:g[1]==="@"?ua:vt}),r.removeAttribute(h)}else h.startsWith(P)&&(l.push({type:6,index:s}),r.removeAttribute(h));if(bi.test(r.tagName)){const h=r.textContent.split(P),d=h.length-1;if(d>0){r.textContent=ft?ft.emptyScript:"";for(let k=0;k<d;k++)r.append(h[k],J()),j.nextNode(),l.push({type:2,index:++s});r.append(h[d],J())}}}else if(r.nodeType===8)if(r.data===pi)l.push({type:2,index:s});else{let h=-1;for(;(h=r.data.indexOf(P,h+1))!==-1;)l.push({type:7,index:s}),h+=P.length-1}s++}}static createElement(t,i){const a=H.createElement("template");return a.innerHTML=t,a}}function Y(e,t,i=e,a){if(t===W)return t;let r=a!==void 0?i._$Co?.[a]:i._$Cl;const s=G(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(e),r._$AT(e,i,a)),a!==void 0?(i._$Co??=[])[a]=r:i._$Cl=r),r!==void 0&&(t=Y(e,r._$AS(e,t.values),r,a)),t}class ha{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:a}=this._$AD,r=(t?.creationScope??H).importNode(i,!0);j.currentNode=r;let s=j.nextNode(),n=0,c=0,l=a[0];for(;l!==void 0;){if(n===l.index){let v;l.type===2?v=new it(s,s.nextSibling,this,t):l.type===1?v=new l.ctor(s,l.name,l.strings,this,t):l.type===6&&(v=new fa(s,this,t)),this._$AV.push(v),l=a[++c]}n!==l?.index&&(s=j.nextNode(),n++)}return j.currentNode=H,r}p(t){let i=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(t,a,i),i+=a.strings.length-2):a._$AI(t[i])),i++}}class it{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,a,r){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=a,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=Y(this,t,i),G(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==W&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):la(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&G(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:a}=t,r=typeof a=="number"?this._$AC(t):(a.el===void 0&&(a.el=et.createElement(yi(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===r)this._$AH.p(i);else{const s=new ha(r,this),n=s.u(this.options);s.p(i),this.T(n),this._$AH=s}}_$AC(t){let i=gi.get(t.strings);return i===void 0&&gi.set(t.strings,i=new et(t)),i}k(t){ce(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let a,r=0;for(const s of t)r===i.length?i.push(a=new it(this.O(J()),this.O(J()),this,this.options)):a=i[r],a._$AI(s),r++;r<i.length&&(this._$AR(a&&a._$AB.nextSibling,r),i.length=r)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const a=ci(t).nextSibling;ci(t).remove(),t=a}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class vt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,a,r,s){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=i,this._$AM=r,this.options=s,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=p}_$AI(t,i=this,a,r){const s=this.strings;let n=!1;if(s===void 0)t=Y(this,t,i,0),n=!G(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const c=t;let l,v;for(t=s[0],l=0;l<s.length-1;l++)v=Y(this,c[a+l],i,l),v===W&&(v=this._$AH[l]),n||=!G(v)||v!==this._$AH[l],v===p?t=p:t!==p&&(t+=(v??"")+s[l+1]),this._$AH[l]=v}n&&!r&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class pa extends vt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}class ma extends vt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}}class ua extends vt{constructor(t,i,a,r,s){super(t,i,a,r,s),this.type=5}_$AI(t,i=this){if((t=Y(this,t,i,0)??p)===W)return;const a=this._$AH,r=t===p&&a!==p||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,s=t!==p&&(a===p||r);r&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class fa{constructor(t,i,a){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const va=le.litHtmlPolyfillSupport;va?.(et,it),(le.litHtmlVersions??=[]).push("3.3.3");const ba=(e,t,i)=>{const a=i?.renderBefore??t;let r=a._$litPart$;if(r===void 0){const s=i?.renderBefore??null;a._$litPart$=r=new it(t.insertBefore(J(),s),s,void 0,i??{})}return r._$AI(e),r};const he=globalThis;class f extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ba(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}f._$litElement$=!0,f.finalized=!0,he.litElementHydrateSupport?.({LitElement:f});const ga=he.litElementPolyfillSupport;ga?.({LitElement:f}),(he.litElementVersions??=[]).push("4.2.2");const y=b`
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
`,ya=b`
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
`,zt=class zt extends f{constructor(){super(),this.railWidth="",this.mobileBarHeight="",this.breakpoint="compact",this.sticky=!0,this.safeArea=!1}updated(){this.railWidth?this.style.setProperty("--nami-app-shell-rail-width",this.normalizeLength(this.railWidth)):this.style.removeProperty("--nami-app-shell-rail-width"),this.mobileBarHeight?this.style.setProperty("--nami-app-shell-mobile-bar-height",this.normalizeLength(this.mobileBarHeight)):this.style.removeProperty("--nami-app-shell-mobile-bar-height")}normalizeLength(t){return/^\d+(\.\d+)?$/.test(t)?`${t}px`:t}render(){return o`
      <div class="shell" part="base">
        <aside class="rail" part="rail"><slot name="rail"></slot></aside>
        <header class="top" part="top"><slot name="top"></slot></header>
        <main part="control"><slot></slot></main>
        <nav class="bottom" part="bottom"><slot name="bottom"></slot></nav>
      </div>
    `}};zt.properties={railWidth:{attribute:"rail-width"},mobileBarHeight:{attribute:"mobile-bar-height"},breakpoint:{reflect:!0},sticky:{type:Boolean,reflect:!0},safeArea:{attribute:"safe-area",type:Boolean,reflect:!0}},zt.styles=[y,b`
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
    `];let pe=zt;const At=class At extends f{constructor(){super(),this.variant="neutral",this.tone="soft"}render(){return o`<span class="base" part="base"><slot></slot></span>`}};At.properties={variant:{reflect:!0},tone:{reflect:!0}},At.styles=[y,b`
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
    `];let me=At;const ue="lit-localize-status";const xa=e=>typeof e!="string"&&"strTag"in e,xi=(e,t,i)=>{let a=e[0];for(let r=1;r<e.length;r++)a+=t[i?i[r-1]:r-1],a+=e[r];return a};const wi=(e=>xa(e)?xi(e.strings,e.values):e);let T=wi,ki=!1;function wa(e){if(ki)throw new Error("lit-localize can only be configured once");T=e,ki=!0}class ka{constructor(t){this.__litLocalizeEventHandler=i=>{i.detail.status==="ready"&&this.host.requestUpdate()},this.host=t}hostConnected(){window.addEventListener(ue,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(ue,this.__litLocalizeEventHandler)}}const O=e=>e.addController(new ka(e));class $i{constructor(){this.settled=!1,this.promise=new Promise((t,i)=>{this._resolve=t,this._reject=i})}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}const L=[];for(let e=0;e<256;e++)L[e]=(e>>4&15).toString(16)+(e&15).toString(16);function $a(e){let t=0,i=8997,a=0,r=33826,s=0,n=40164,c=0,l=52210;for(let v=0;v<e.length;v++)i^=e.charCodeAt(v),t=i*435,a=r*435,s=n*435,c=l*435,s+=i<<8,c+=r<<8,a+=t>>>16,i=t&65535,s+=a>>>16,r=a&65535,l=c+(s>>>16)&65535,n=s&65535;return L[l>>8]+L[l&255]+L[n>>8]+L[n&255]+L[r>>8]+L[r&255]+L[i>>8]+L[i&255]}const Sa="",Ea="h",za="s";function Aa(e,t){return(t?Ea:za)+$a(typeof e=="string"?e:e.join(Sa))}const Si=new WeakMap,Ei=new Map;function Ca(e,t,i){if(e){const a=i?.id??Ta(t),r=e[a];if(r){if(typeof r=="string")return r;if("strTag"in r)return xi(r.strings,t.values,r.values);{let s=Si.get(r);return s===void 0&&(s=r.values,Si.set(r,s)),{...r,values:s.map(n=>t.values[n])}}}}return wi(t)}function Ta(e){const t=typeof e=="string"?e:e.strings;let i=Ei.get(t);return i===void 0&&(i=Aa(t,typeof e!="string"&&!("strTag"in e)),Ei.set(t,i)),i}function fe(e){window.dispatchEvent(new CustomEvent(ue,{detail:e}))}let bt="",ve,zi,gt,be,Ai,q=new $i;q.resolve();let yt=0;const La=e=>(wa(((t,i)=>Ca(Ai,t,i))),bt=zi=e.sourceLocale,gt=new Set(e.targetLocales),gt.add(e.sourceLocale),be=e.loadLocale,{getLocale:Ma,setLocale:_a}),Ma=()=>bt,_a=e=>{if(e===(ve??bt))return q.promise;if(!gt||!be)throw new Error("Internal error");if(!gt.has(e))throw new Error("Invalid locale code");yt++;const t=yt;return ve=e,q.settled&&(q=new $i),fe({status:"loading",loadingLocale:e}),(e===zi?Promise.resolve({templates:void 0}):be(e)).then(a=>{yt===t&&(bt=e,ve=void 0,Ai=a.templates,fe({status:"ready",readyLocale:e}),q.resolve())},a=>{yt===t&&(fe({status:"error",errorLocale:e,errorMessage:a.toString()}),q.reject(a))}),q.promise};function x(e,t,i,a={}){return e.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,...a,detail:i}))}function m(e,t){customElements.get(e)||customElements.define(e,t)}function ge(e){return e?"checked":"unchecked"}function ye(e){return e?"selected":"unselected"}function xe(e){return e?"active":"inactive"}function S(e,t){e.dataset.state=t.state,t.disabled!==void 0&&e.toggleAttribute("data-disabled",t.disabled),t.invalid!==void 0&&e.toggleAttribute("data-invalid",t.invalid),t.loading!==void 0&&e.toggleAttribute("data-loading",t.loading)}const Ct=class Ct extends f{constructor(){super(),O(this),this.label=""}updated(){S(this,{state:"loading",loading:!0})}render(){return o`<span class="indicator" part="base indicator" role="status" aria-label=${this.label||T("Loading",{id:"nami.spinner.loading"})}></span>`}};Ct.properties={size:{reflect:!0},label:{}},Ct.styles=[y,b`
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
    `];let K=Ct;m("nami-spinner",K);const Tt=class Tt extends f{constructor(){super(),O(this),this.variant="solid",this.disabled=!1,this.loading=!1,this.type="button"}updated(){S(this,{state:this.loading?"loading":this.disabled?"disabled":"default",disabled:this.disabled,loading:this.loading})}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}if(!x(this,"nami-click",{sourceEvent:t},{cancelable:!0})){t.preventDefault();return}this.runFormAction()}runFormAction(){const t=this.closest("form");t&&(this.type==="submit"?t.requestSubmit():this.type==="reset"&&t.reset())}render(){return o`
      <button
        part="base control"
        type=${this.type}
        ?disabled=${this.disabled||this.loading}
        aria-busy=${this.loading?"true":"false"}
        @click=${this.handleClick}
      >
        ${this.loading?o`<nami-spinner size="sm" label=${T("Loading",{id:"nami.spinner.loading"})} part="indicator"></nami-spinner>`:o`<slot name="icon" part="icon"></slot>`}
        <span part="label"><slot></slot></span>
        ${this.loading?p:o`<slot name="actions"></slot>`}
      </button>
    `}};Tt.properties={variant:{reflect:!0},size:{reflect:!0},disabled:{type:Boolean,reflect:!0},loading:{type:Boolean,reflect:!0},type:{}},Tt.styles=[y,b`
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
    `];let we=Tt;const Lt=class Lt extends f{constructor(){super(),this.variant="surface"}syncSlotState(t){const i=t.currentTarget,a=i.name||"default",r=i.assignedNodes({flatten:!0}).some(s=>s.nodeType!==Node.TEXT_NODE||s.textContent?.trim());a==="header"&&this.toggleAttribute("has-header",r),a==="actions"&&this.toggleAttribute("has-actions",r),a==="footer"&&this.toggleAttribute("has-footer",r)}render(){return o`
      <article class="base" part="base">
        <header part="header"><slot name="header" @slotchange=${this.syncSlotState}></slot></header>
        <section class="body" part="body"><slot></slot></section>
        <div class="actions" part="actions"><slot name="actions" @slotchange=${this.syncSlotState}></slot></div>
        <footer part="footer"><slot name="footer" @slotchange=${this.syncSlotState}></slot></footer>
      </article>
    `}};Lt.properties={variant:{reflect:!0}},Lt.styles=[y,b`
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
    `];let ke=Lt;const Mt=class Mt extends f{constructor(){super(),this.value="",this.selected=!1,this.checkbox=!1,this.disabled=!1}updated(){S(this,{state:ye(this.selected),disabled:this.disabled})}handleClick(t){this.disabled||(this.checkbox&&(this.selected=!this.selected),x(this,"nami-change",{selected:this.selected,value:this.value,sourceEvent:t}),x(this,"nami-select",{selected:this.selected,value:this.value,sourceEvent:t}))}render(){return o`
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
    `}};Mt.properties={value:{},selected:{type:Boolean,reflect:!0},checkbox:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}},Mt.styles=[y,b`
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
    `];let $e=Mt;function at(e){try{return e.attachInternals()}catch{return null}}function rt(e,t){typeof e?.setFormValue=="function"&&e.setFormValue(t)}function xt(e,t,i,a){typeof e?.setValidity=="function"&&e.setValidity(t,i,a)}function Q(e,t="Field"){const i=e.length===0;return{flags:i?{valueMissing:!0}:{},message:i?`${t} is required`:void 0}}function Ci(e,t="This field is required"){return{flags:e?{}:{valueMissing:!0},message:e?void 0:t}}const ot=class ot extends f{constructor(){super(),this.internals=at(this),this.name="",this.value="on",this.checked=!1,this.defaultChecked=!1,this.disabled=!1,this.required=!1,this.error=""}updated(){const t=!this.disabled&&!!(this.error||this.required&&!this.checked);S(this,{state:ge(this.checked),disabled:this.disabled,invalid:t}),rt(this.internals,!this.disabled&&this.checked?this.value:null),xt(this.internals,this.validityFlags,this.validationMessage||void 0)}formResetCallback(){this.checked=this.defaultChecked}checkValidity(){return Object.keys(this.validityFlags).length===0}reportValidity(){return this.checkValidity()}get validationMessage(){return this.disabled?"":this.error?this.error:this.required?Ci(this.checked).message??"":""}get validityFlags(){return this.disabled?{}:this.error?{customError:!0}:this.required?Ci(this.checked).flags:{}}toggle(t){this.disabled||(this.checked=!this.checked,x(this,"nami-change",{checked:this.checked,value:this.value,sourceEvent:t}))}render(){return o`
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
    `}};ot.formAssociated=!0,ot.properties={name:{},value:{},checked:{type:Boolean,reflect:!0},defaultChecked:{attribute:"default-checked",type:Boolean},disabled:{type:Boolean,reflect:!0},required:{type:Boolean,reflect:!0},error:{reflect:!0,useDefault:!0}},ot.styles=[y,b`
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
    `];let Se=ot;const _t=class _t extends f{constructor(){super(),this.gap="sm",this.align="",this.justify=""}updated(){this.align?this.style.setProperty("--nami-cluster-align",this.align):this.style.removeProperty("--nami-cluster-align"),this.justify?this.style.setProperty("--nami-cluster-justify",this.justify):this.style.removeProperty("--nami-cluster-justify")}render(){return o`<div class="base" part="base"><slot></slot></div>`}};_t.properties={gap:{reflect:!0},align:{reflect:!0},justify:{reflect:!0}},_t.styles=[y,b`
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
    `];let Ee=_t;const Ti="en-US",Pa=["zh-CN"],Oa=["en-US","zh-CN"],Ra={"zh-CN":()=>Promise.resolve().then(()=>zr)},Da=globalThis,Li=Da.__namiLocalization??=La({sourceLocale:Ti,targetLocales:Pa,loadLocale:e=>Ra[e]()}),Mi=Li.getLocale;function Ia(e){return Oa.includes(e)}function _i(e){return e&&Ia(e)?e:Ti}function Va(e){return Li.setLocale(_i(e))}const Pt=class Pt extends f{constructor(){super(),this.lastAppliedLocale="",this.handleLocaleStatus=t=>{x(this,"nami-locale-status",t.detail)},this.locale="en-US",this.dir="ltr"}connectedCallback(){super.connectedCallback(),window.addEventListener("lit-localize-status",this.handleLocaleStatus),this.applyDirection(),this.applyLocale()}disconnectedCallback(){window.removeEventListener("lit-localize-status",this.handleLocaleStatus),super.disconnectedCallback()}updated(t){t.has("locale")&&this.applyLocale(),t.has("dir")&&this.applyDirection()}applyDirection(){this.setAttribute("dir",this.dir)}async applyLocale(){const t=_i(this.locale);if(t!==this.locale){this.locale=t;return}this.applyDirection(),!(this.lastAppliedLocale===t&&Mi()===t)&&(this.lastAppliedLocale=t,Mi()!==t&&await Va(t),x(this,"nami-change",{value:t,locale:t,dir:this.dir}))}render(){return o`<slot></slot>`}};Pt.properties={locale:{reflect:!0},dir:{reflect:!0}},Pt.styles=[y];let ze=Pt;const Ot=class Ot extends f{constructor(){super(),this.size="lg",this.padded=!0}render(){return o`<div class="base" part="base"><slot></slot></div>`}};Ot.properties={size:{reflect:!0},padded:{type:Boolean,reflect:!0}},Ot.styles=[y,b`
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
    `];let Ae=Ot;const Ce=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");function wt(e){const t=[...Array.from(e.querySelectorAll(Ce)),...Ba(e)];return Array.from(new Set(t)).filter(Ha)}function Ba(e){return Array.from(e.querySelectorAll("slot")).flatMap(t=>t.assignedElements({flatten:!0}).flatMap(i=>i instanceof HTMLElement?[...i.matches(Ce)?[i]:[],...Array.from(i.querySelectorAll(Ce))]:[]))}function Ha(e){return!e.hasAttribute("disabled")&&e.tabIndex>=0}function Pi(e,t){if(e.key!=="Tab")return;const i=wt(t);if(i.length===0)return;const a=i[0],r=i[i.length-1];e.shiftKey&&document.activeElement===a?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),a.focus())}function Xa(e){e instanceof HTMLElement&&e.focus()}function kt(e){return e?"open":"closed"}function Oi(){return document.activeElement}function Ri(e){Xa(e)}function $t(e){return e?{sourceEvent:e}:void 0}function Di(e){return e.key==="Escape"}function ja(e,t){return e.target===t}function qa(e,t="ltr"){return e==="start"?t==="rtl"?"right":"left":e==="end"?t==="rtl"?"left":"right":e}const Rt=class Rt extends f{constructor(){super(),this.previousActiveElement=null,this.open=!1,this.label="",this.closeOnBackdrop=!0}get dialogElement(){return this.renderRoot.querySelector("dialog")}get focusableElements(){return wt(this.dialogElement)}updated(t){if(this.dataset.state=kt(this.open),!t.has("open"))return;const i=t.get("open")===!0;this.open&&!this.dialogElement.open&&(this.previousActiveElement=Oi(),this.dialogElement.showModal(),requestAnimationFrame(()=>this.focusInitialElement()),x(this,"nami-open",void 0)),!this.open&&this.dialogElement.open&&this.dialogElement.close(),!this.open&&i&&(this.restoreFocus(),x(this,"nami-close",$t(this.closeSourceEvent)),this.closeSourceEvent=void 0)}focusInitialElement(){this.focusableElements[0]?.focus()}restoreFocus(){Ri(this.previousActiveElement),this.previousActiveElement=null}close(t){this.open&&(this.closeSourceEvent=t,this.open=!1)}handleCancel(t){t.preventDefault(),this.close(t)}handleClick(t){this.closeOnBackdrop&&ja(t,this.dialogElement)&&this.close(t)}handleNativeClose(){this.open&&this.close()}handleKeydown(t){this.open&&Pi(t,this.dialogElement)}render(){return o`
      <dialog
        part="base"
        aria-label=${this.label||p}
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
    `}};Rt.properties={open:{type:Boolean,reflect:!0},label:{},closeOnBackdrop:{attribute:"close-on-backdrop",type:Boolean,reflect:!0}},Rt.styles=[y,b`
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
    `];let Te=Rt;const Dt=class Dt extends f{constructor(){super(),this.previousActiveElement=null,this.handleKeydown=t=>{Di(t)&&this.open&&this.close(t)},this.open=!1,this.placement="left"}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleKeydown)}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeydown),super.disconnectedCallback()}close(t){this.open&&(this.closeSourceEvent=t,this.open=!1)}updated(t){if(this.dataset.state=kt(this.open),!t.has("open"))return;const i=t.get("open")===!0;this.open?(this.previousActiveElement=Oi(),requestAnimationFrame(()=>this.focusInitialElement()),x(this,"nami-open",void 0)):i&&(this.restoreFocus(),x(this,"nami-close",$t(this.closeSourceEvent)),this.closeSourceEvent=void 0)}get panelElement(){return this.renderRoot.querySelector(".panel")}focusInitialElement(){const t=this.panelElement;if(!t)return;(wt(t)[0]??t).focus()}handlePanelKeydown(t){const i=this.panelElement;if(i){if(t.key==="Tab"&&wt(i).length===0){t.preventDefault(),i.focus();return}Pi(t,i)}}restoreFocus(){Ri(this.previousActiveElement),this.previousActiveElement=null}render(){return o`
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
    `}};Dt.properties={open:{type:Boolean,reflect:!0},placement:{reflect:!0}},Dt.styles=[y,b`
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
    `];let Le=Dt;const It=class It extends f{constructor(){super(),this.name="empty",this.size="md"}renderBadge(t){return o`
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
    `}};It.properties={name:{reflect:!0},size:{reflect:!0}},It.styles=[y,b`
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
    `];let st=It;m("nami-illustration",st);const Vt=class Vt extends f{constructor(){super(),O(this),this.illustration="empty",this.title="",this.description="",this.compact=!1}render(){const t=this.description||T("No data",{id:"nami.empty.description"}),i=this.title||t||T("Empty state",{id:"nami.empty.aria"});return o`
      <section class="base" part="base" aria-label=${i}>
        <slot name="illustration" part="illustration">
          <nami-illustration name=${this.illustration} size=${this.compact?"sm":"md"}></nami-illustration>
        </slot>
        ${this.title?o`<div class="title" part="title"><slot name="title">${this.title}</slot></div>`:p}
        <div class="description" part="description"><slot name="description">${t}</slot></div>
        <div class="actions" part="actions"><slot name="actions"></slot></div>
      </section>
    `}};Vt.properties={illustration:{reflect:!0},title:{reflect:!0},description:{reflect:!0},compact:{type:Boolean,reflect:!0}},Vt.styles=[y,b`
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
    `];let Me=Vt;const Ii=new Map;function St(e){const t=(Ii.get(e)??0)+1;return Ii.set(e,t),`${e}-${t}`}const Bt=class Bt extends f{constructor(){super(),this.metaId=`${St("nami-field")}-meta`,this.label="",this.helperText="",this.error="",this.required=!1,this.disabled=!1}updated(){const t=!this.disabled&&!!this.error;S(this,{state:t?"invalid":"valid",disabled:this.disabled,invalid:t})}focusControl(){this.renderRoot.querySelector("slot:not([name])")?.assignedElements({flatten:!0}).find(a=>"focus"in a)?.focus?.()}render(){const t=this.error||this.helperText;return o`
      <div class="base" part="base">
        ${this.label?o`<span class="label" part="label" @click=${this.focusControl}>${this.label}${this.required?" *":""}</span>`:p}
        <div class="control" part="control"><slot></slot></div>
        ${t?o`<div id=${this.metaId} class="meta ${this.error?"error":""}" part=${this.error?"error":"description"}>${t}</div>`:o`<slot name="description"></slot>`}
      </div>
    `}};Bt.properties={label:{},helperText:{attribute:"helper-text"},error:{reflect:!0,useDefault:!0},required:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}},Bt.styles=[y,b`
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
    `];let _e=Bt;const Ht=class Ht extends f{constructor(){super(),this.columns=0,this.min="",this.gap="md"}updated(){this.columns>0?this.style.setProperty("--nami-grid-columns",String(this.columns)):this.style.removeProperty("--nami-grid-columns"),this.min?this.style.setProperty("--nami-grid-min",this.min):this.style.removeProperty("--nami-grid-min")}render(){return o`<div class="base" part="base"><slot></slot></div>`}};Ht.properties={columns:{type:Number,reflect:!0},min:{reflect:!0},gap:{reflect:!0}},Ht.styles=[y,b`
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
    `];let Pe=Ht;m("nami-spinner",K);const Xt=class Xt extends f{constructor(){super(),O(this),this.label="",this.disabled=!1,this.selected=!1,this.loading=!1}updated(){S(this,{state:this.loading?"loading":ye(this.selected),disabled:this.disabled,loading:this.loading})}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}x(this,"nami-click",{sourceEvent:t,selected:this.selected})}render(){return o`
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
          ${this.loading?o`<nami-spinner size="sm" label=${T("Loading",{id:"nami.spinner.loading"})}></nami-spinner>`:o`<slot></slot><slot name="icon"></slot>`}
        </span>
      </button>
    `}};Xt.properties={label:{},size:{reflect:!0},disabled:{type:Boolean,reflect:!0},selected:{type:Boolean,reflect:!0},loading:{type:Boolean,reflect:!0}},Xt.styles=[y,ya,b`
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
    `];let Oe=Xt;const lt=class lt extends f{constructor(){super(),this.internals=at(this),this.metaId=`${St("nami-input")}-meta`,this.name="",this.value="",this.defaultValue="",this.type="text",this.placeholder="",this.label="",this.helperText="",this.error="",this.disabled=!1,this.required=!1}get inputElement(){return this.renderRoot.querySelector("input")}updated(){const t=!this.disabled&&!!(this.error||this.required&&!this.value);S(this,{state:t?"invalid":"valid",disabled:this.disabled,invalid:t}),rt(this.internals,this.disabled?null:this.value),xt(this.internals,this.validityFlags,this.validityMessage,this.inputElement??void 0)}formResetCallback(){this.value=this.defaultValue}focus(){this.inputElement?.focus()}checkValidity(){return this.inputElement?.checkValidity()??Object.keys(this.validityFlags).length===0}reportValidity(){return this.inputElement?.reportValidity()??this.checkValidity()}get validity(){return this.inputElement?.validity}get validationMessage(){return this.error||this.inputElement?.validationMessage||""}get willValidate(){return!this.disabled}get validityFlags(){return this.disabled?{}:this.error?{customError:!0}:this.required?Q(this.value,this.label||this.name||"Field").flags:{}}get validityMessage(){if(!this.disabled){if(this.error)return this.error;if(this.required)return Q(this.value,this.label||this.name||"Field").message}}handleInput(t){this.value=t.target.value,x(this,"nami-input",{value:this.value,sourceEvent:t})}handleChange(t){x(this,"nami-change",{value:this.value,sourceEvent:t})}render(){const t=this.id?`${this.id}-meta`:this.metaId,i=this.error||this.helperText;return o`
      <label part="base">
        ${this.label?o`<span class="label" part="label">${this.label}${this.required?" *":""}</span>`:p}
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
            aria-describedby=${i?t:p}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          <slot name="actions"></slot>
        </span>
      </label>
      ${i?o`<div id=${t} class="meta ${this.error?"error":""}" part=${this.error?"error":"description"}>${i}</div>`:p}
    `}};lt.formAssociated=!0,lt.properties={name:{},value:{},defaultValue:{attribute:"default-value"},type:{},placeholder:{},label:{},helperText:{attribute:"helper-text"},error:{reflect:!0,useDefault:!0},disabled:{type:Boolean,reflect:!0},required:{type:Boolean,reflect:!0}},lt.styles=[y,b`
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
    `];let Re=lt;const jt=class jt extends f{constructor(){super(),this.value=0,this.max=100,this.label="",this.indeterminate=!1}updated(){const t=this.max>0?Math.min(100,Math.max(0,this.value/this.max*100)):0;this.style.setProperty("--nami-progress-value",`${t}%`),this.dataset.state=this.indeterminate?"indeterminate":"determinate"}render(){const t=this.max>0?Math.min(this.max,Math.max(0,this.value)):0;return this.max>0&&t/this.max*100,o`
      <div
        class="track"
        part="base track"
        role="progressbar"
        aria-label=${this.label||"Progress"}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate?p:t}
      >
        <div class="fill" part="indicator"></div>
      </div>
    `}};jt.properties={value:{type:Number,reflect:!0},max:{type:Number,reflect:!0},label:{},indeterminate:{type:Boolean,reflect:!0}},jt.styles=[y,b`
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
    `];let De=jt;function Et(e){return e.getAttribute("value")||e.dataset.value||e.textContent?.trim()||""}function Vi(e,t,i,a){const r=a==="vertical"?["ArrowDown"]:["ArrowRight"],s=a==="vertical"?["ArrowUp"]:["ArrowLeft"];return e==="Home"?0:e==="End"?i-1:r.includes(e)?(t+1)%i:s.includes(e)?(t-1+i)%i:t}const ct=class ct extends f{constructor(){super(),this.internals=at(this),this.handleItemSelect=t=>{t.stopPropagation();const i=t.currentTarget,a=t.detail?.sourceEvent??t;this.selectItem(i,a)},this.handleItemChange=t=>{t.stopPropagation()},this.handleItemKeydown=t=>{if(!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp","Home","End"].includes(t.key))return;t.preventDefault();const i=t.currentTarget,a=this.enabledItems,r=a.indexOf(i);if(r<0||a.length===0)return;const s=Vi(t.key,r,a.length,this.orientation),n=a[s];n?.focus(),n&&this.selectItem(n,t)},this.name="",this.value="",this.defaultValue="",this.orientation="vertical",this.disabled=!1,this.required=!1,this.error=""}get items(){return Array.from(this.children).filter(t=>t.localName==="nami-radio-item")}get enabledItems(){return this.items.filter(t=>!t.effectiveDisabled)}firstUpdated(){this.syncItems()}updated(){this.syncItems();const t=!this.disabled&&!!(this.error||this.required&&!this.value);S(this,{state:this.value?"selected":"empty",disabled:this.disabled,invalid:t}),rt(this.internals,this.disabled||!this.value?null:this.value),xt(this.internals,this.validityFlags,this.validityMessage)}formResetCallback(){this.value=this.defaultValue,this.syncItems()}checkValidity(){return Object.keys(this.validityFlags).length===0}reportValidity(){return this.checkValidity()}get validationMessage(){return this.validityMessage??""}get validityFlags(){return this.disabled?{}:this.error?{customError:!0}:this.required?Q(this.value,this.name||"Radio group").flags:{}}get validityMessage(){if(!this.disabled){if(this.error)return this.error;if(this.required)return Q(this.value,this.name||"Radio group").message}}syncItems(){const t=this.items,i=!!this.value,a=t.filter(n=>!n.disabled&&!this.disabled),s=a.find(n=>i&&n.value===this.value)??a[0];t.forEach(n=>{const c=i&&n.value===this.value;n.setGroupDisabled(this.disabled),n.checked=c,n.tabIndex=n===s?0:-1,n.removeEventListener("nami-select",this.handleItemSelect),n.removeEventListener("nami-change",this.handleItemChange),n.removeEventListener("keydown",this.handleItemKeydown),n.addEventListener("nami-select",this.handleItemSelect),n.addEventListener("nami-change",this.handleItemChange),n.addEventListener("keydown",this.handleItemKeydown)})}selectItem(t,i){if(this.disabled||t.effectiveDisabled||!t.value)return;const a=this.value;if(a===t.value){this.syncItems();return}this.value=t.value,this.syncItems();const r={value:this.value,previousValue:a,item:t,sourceEvent:i};x(this,"nami-select",r),x(this,"nami-change",r)}render(){return o`
      <fieldset class="base" part="base">
        <legend class="label" part="label"><slot name="label">${p}</slot></legend>
        <div class="items" part="items" role="radiogroup" aria-orientation=${this.orientation} aria-invalid=${this.error?"true":"false"}>
          <slot @slotchange=${()=>this.syncItems()}></slot>
        </div>
        ${this.error?o`<div class="error" part="error">${this.error}</div>`:p}
      </fieldset>
    `}};ct.formAssociated=!0,ct.properties={name:{},value:{},defaultValue:{attribute:"default-value"},orientation:{reflect:!0},disabled:{type:Boolean,reflect:!0},required:{type:Boolean,reflect:!0},error:{reflect:!0,useDefault:!0}},ct.styles=[y,b`
      :host {
        display: block;
      }

      .base {
        border: 0;
        display: grid;
        gap: var(--nami-radio-group-gap, var(--nami-space-2, 6px));
        margin: 0;
        min-inline-size: 0;
        padding: 0;
      }

      :host([orientation='horizontal']) .items {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--nami-radio-group-gap, var(--nami-space-3, 10px));
      }

      :host([orientation='vertical']) .items {
        display: grid;
        gap: var(--nami-radio-group-gap, var(--nami-space-2, 6px));
      }

      .label {
        color: var(--nami-text);
        font-size: 0.875rem;
        font-weight: 600;
      }

      .error {
        color: var(--nami-color-danger);
        font-size: 0.8125rem;
      }

      :host([disabled]) {
        opacity: 0.58;
      }
    `];let Ie=ct;const qt=class qt extends f{constructor(){super(),this.handleKeydown=t=>{t.key!==" "&&t.key!=="Enter"||(t.preventDefault(),this.select(t))},this.value="",this.checked=!1,this.disabled=!1,this.description="",this.groupDisabled=!1}connectedCallback(){super.connectedCallback(),this.hasAttribute("tabindex")||(this.tabIndex=0),this.addEventListener("keydown",this.handleKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this.handleKeydown),super.disconnectedCallback()}updated(){const t=this.effectiveDisabled;S(this,{state:ge(this.checked),disabled:t}),this.setAttribute("role","radio"),this.setAttribute("aria-checked",String(this.checked)),this.toggleAttribute("aria-disabled",t),t&&(this.tabIndex=-1)}setGroupDisabled(t){this.groupDisabled=t}get effectiveDisabled(){return this.disabled||this.groupDisabled}select(t){this.effectiveDisabled||this.checked||(this.checked=!0,x(this,"nami-select",{checked:!0,value:this.value,sourceEvent:t}),x(this,"nami-change",{checked:!0,value:this.value,sourceEvent:t}))}render(){return o`
      <div class="base" part="base control" @click=${this.select}>
        <span class="indicator" part="indicator"></span>
        <span class="label" part="label">
          <slot></slot>
          ${this.description?o`<span class="description" part="description"><slot name="description">${this.description}</slot></span>`:p}
        </span>
      </div>
    `}};qt.properties={value:{},checked:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0},description:{},groupDisabled:{state:!0}},qt.styles=[y,b`
      :host {
        display: block;
        outline: none;
      }

      .base {
        align-items: flex-start;
        color: var(--nami-style-on-paper, var(--nami-text));
        cursor: pointer;
        display: flex;
        gap: var(--nami-radio-item-gap, var(--nami-space-3, 10px));
        padding: var(--nami-radio-item-padding, 8px 0);
      }

      .indicator {
        align-items: center;
        background: var(--nami-radio-item-bg, transparent);
        border: var(--nami-radio-item-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-radio-item-border-color, var(--nami-border));
        border-radius: 50%;
        color: var(--nami-radio-item-indicator-color, var(--nami-color-primary));
        display: inline-flex;
        flex: 0 0 auto;
        height: var(--nami-radio-item-size, 20px);
        justify-content: center;
        margin-block-start: 0.1em;
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          border-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        width: var(--nami-radio-item-size, 20px);
      }

      .indicator::before {
        background: currentColor;
        border-radius: 50%;
        content: '';
        height: calc(var(--nami-radio-item-size, 20px) * 0.45);
        opacity: 0;
        transform: scale(0.75);
        transition:
          opacity var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
        width: calc(var(--nami-radio-item-size, 20px) * 0.45);
      }

      :host([checked]) .indicator {
        border-color: var(--nami-color-primary);
      }

      :host([checked]) .indicator::before {
        opacity: 1;
        transform: scale(1);
      }

      :host(:focus-visible) .indicator {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
      }

      :host([data-disabled]) .base {
        cursor: not-allowed;
        opacity: 0.54;
      }

      .label {
        display: grid;
        gap: var(--nami-space-1, 4px);
        line-height: 1.35;
      }

      .description {
        color: var(--nami-radio-item-description-color, var(--nami-text-muted));
        font-size: 0.875rem;
      }
    `];let Ve=qt;const Ut=class Ut extends f{constructor(){super(),this.value="",this.label="",this.description="",this.selected=!1,this.disabled=!1}updated(){S(this,{state:ye(this.selected),disabled:this.disabled})}select(t){this.disabled||this.selected||(this.selected=!0,x(this,"nami-select",{selected:!0,value:this.value,sourceEvent:t}),x(this,"nami-change",{selected:!0,value:this.value,sourceEvent:t}))}render(){return o`
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
        ${this.description?o`<span class="description" part="description"><slot name="description">${this.description}</slot></span>`:p}
        <slot name="actions"></slot>
      </button>
    `}};Ut.properties={value:{},label:{},description:{},selected:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}},Ut.styles=[y,b`
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
    `];let Be=Ut;m("nami-illustration",st);const Ua={success:"success",error:"error",info:"info",warning:"warning",403:"forbidden",404:"not-found",500:"server-error"},Ft=class Ft extends f{constructor(){super(),O(this),this.status="info",this.title="",this.subTitle="",this.compact=!1}get illustrationName(){return Ua[this.status]??"info"}render(){return o`
      <section class="base" part="base" aria-label=${this.title||this.subTitle||T("Result",{id:"nami.result.aria"})}>
        <slot name="illustration" part="illustration">
          <nami-illustration name=${this.illustrationName} size=${this.compact?"sm":"lg"}></nami-illustration>
        </slot>
        ${this.title?o`<div class="title" part="title"><slot name="title">${this.title}</slot></div>`:p}
        ${this.subTitle?o`<div class="description" part="description"><slot name="description">${this.subTitle}</slot></div>`:p}
        <div class="body" part="body"><slot name="body"></slot></div>
        <div class="actions" part="actions"><slot name="actions"></slot></div>
      </section>
    `}};Ft.properties={status:{reflect:!0},title:{reflect:!0},subTitle:{attribute:"sub-title",reflect:!0},compact:{type:Boolean,reflect:!0}},Ft.styles=[y,b`
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
    `];let He=Ft;var Bi="1.3.23";function Hi(e,t,i){return Math.max(e,Math.min(t,i))}function Fa(e,t,i){return(1-i)*e+i*t}function Na(e,t,i,a){return Fa(e,t,1-Math.exp(-i*a))}function Wa(e,t){return(e%t+t)%t}var Ya=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(e){if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=e;const i=Hi(0,this.currentTime/this.duration,1);t=i>=1;const a=t?1:this.easing(i);this.value=this.from+(this.to-this.from)*a}else this.lerp?(this.value=Na(this.value,this.to,this.lerp*60,e),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),this.onUpdate?.(this.value,t)}stop(){this.isRunning=!1}fromTo(e,t,{lerp:i,duration:a,easing:r,onStart:s,onUpdate:n}){this.from=this.value=e,this.to=t,this.lerp=i,this.duration=a,this.easing=r,this.currentTime=0,this.isRunning=!0,s?.(),this.onUpdate=n}};function Ka(e,t){let i;return function(...a){clearTimeout(i),i=setTimeout(()=>{i=void 0,e.apply(this,a)},t)}}var Qa=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(e,t,{autoResize:i=!0,debounce:a=250}={}){this.wrapper=e,this.content=t,i&&(this.debouncedResize=Ka(this.resize,a),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Xi=class{events={};emit(e,...t){const i=this.events[e]||[];for(let a=0,r=i.length;a<r;a++)i[a]?.(...t)}on(e,t){return this.events[e]?this.events[e].push(t):this.events[e]=[t],()=>{this.events[e]=this.events[e]?.filter(i=>t!==i)}}off(e,t){this.events[e]=this.events[e]?.filter(i=>t!==i)}destroy(){this.events={}}};const Za=100/6,R={passive:!1};function ji(e,t){return e===1?Za:e===2?t:1}var Ja=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new Xi;constructor(e,t={wheelMultiplier:1,touchMultiplier:1}){this.element=e,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,R),this.element.addEventListener("touchstart",this.onTouchStart,R),this.element.addEventListener("touchmove",this.onTouchMove,R),this.element.addEventListener("touchend",this.onTouchEnd,R)}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,R),this.element.removeEventListener("touchstart",this.onTouchStart,R),this.element.removeEventListener("touchmove",this.onTouchMove,R),this.element.removeEventListener("touchend",this.onTouchEnd,R)}onTouchStart=e=>{const{clientX:t,clientY:i}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:e})};onTouchMove=e=>{const{clientX:t,clientY:i}=e.targetTouches?e.targetTouches[0]:e,a=-(t-this.touchStart.x)*this.options.touchMultiplier,r=-(i-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=i,this.lastDelta={x:a,y:r},this.emitter.emit("scroll",{deltaX:a,deltaY:r,event:e})};onTouchEnd=e=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})};onWheel=e=>{let{deltaX:t,deltaY:i,deltaMode:a}=e;const r=ji(a,this.window.width),s=ji(a,this.window.height);t*=r,i*=s,t*=this.options.wheelMultiplier,i*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:i,event:e})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}};const qi=e=>Math.min(1,1.001-2**(-10*e));var Ga=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;isTouching;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new Ya;emitter=new Xi;dimensions;virtualScroll;constructor({wrapper:e=window,content:t=document.documentElement,eventsTarget:i=e,smoothWheel:a=!0,syncTouch:r=!1,syncTouchLerp:s=.075,touchInertiaExponent:n=1.7,duration:c,easing:l,lerp:v=.1,infinite:w=!1,orientation:h="vertical",gestureOrientation:d=h==="horizontal"?"both":"vertical",touchMultiplier:k=1,wheelMultiplier:g=1,autoResize:A=!0,prevent:C,virtualScroll:_,overscroll:I=!0,autoRaf:V=!1,anchors:B=!1,autoToggle:pt=!1,allowNestedScroll:F=!1,__experimental__naiveDimensions:Ar=!1,naiveDimensions:Cr=Ar,stopInertiaOnNavigate:Tr=!1}={}){window.lenisVersion=Bi,window.lenis||(window.lenis={}),window.lenis.version=Bi,h==="horizontal"&&(window.lenis.horizontal=!0),r===!0&&(window.lenis.touch=!0),(!e||e===document.documentElement)&&(e=window),typeof c=="number"&&typeof l!="function"?l=qi:typeof l=="function"&&typeof c!="number"&&(c=1),this.options={wrapper:e,content:t,eventsTarget:i,smoothWheel:a,syncTouch:r,syncTouchLerp:s,touchInertiaExponent:n,duration:c,easing:l,lerp:v,infinite:w,gestureOrientation:d,orientation:h,touchMultiplier:k,wheelMultiplier:g,autoResize:A,prevent:C,virtualScroll:_,overscroll:I,autoRaf:V,anchors:B,autoToggle:pt,allowNestedScroll:F,naiveDimensions:Cr,stopInertiaOnNavigate:Tr},this.dimensions=new Qa(e,t,{autoResize:A}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Ja(i,{touchMultiplier:k,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}onScrollEnd=e=>{e instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&e.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){const e=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[e]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=e=>{e.propertyName?.includes("overflow")&&e.target===this.rootElement&&this.checkOverflow()};setScroll(e){this.isHorizontal?this.options.wrapper.scrollTo({left:e,behavior:"instant"}):this.options.wrapper.scrollTo({top:e,behavior:"instant"})}onClick=e=>{const t=e.composedPath().filter(a=>a instanceof HTMLAnchorElement&&a.href).map(a=>new URL(a.href)),i=new URL(window.location.href);if(this.options.anchors){const a=t.find(r=>i.host===r.host&&i.pathname===r.pathname&&r.hash);if(a){const r=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=`#${a.hash.split("#")[1]}`;this.scrollTo(s,r);return}}if(this.options.stopInertiaOnNavigate&&t.some(a=>i.host===a.host&&i.pathname!==a.pathname)){this.reset();return}};onPointerDown=e=>{e.button===1&&this.reset()};onVirtualScroll=e=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(e)===!1)return;const{deltaX:t,deltaY:i,event:a}=e;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:i,event:a}),a.ctrlKey||a.lenisStopPropagation)return;const r=a.type.includes("touch"),s=a.type.includes("wheel");this.isTouching=a.type==="touchstart"||a.type==="touchmove";const n=t===0&&i===0;if(this.options.syncTouch&&r&&a.type==="touchstart"&&n&&!this.isStopped&&!this.isLocked){this.reset();return}const c=this.options.gestureOrientation==="vertical"&&i===0||this.options.gestureOrientation==="horizontal"&&t===0;if(n||c)return;let l=a.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const v=this.options.prevent,w=Math.abs(t)>=Math.abs(i)?"horizontal":"vertical";if(l.find(g=>g instanceof HTMLElement&&(typeof v=="function"&&v?.(g)||g.hasAttribute?.("data-lenis-prevent")||w==="vertical"&&g.hasAttribute?.("data-lenis-prevent-vertical")||w==="horizontal"&&g.hasAttribute?.("data-lenis-prevent-horizontal")||r&&g.hasAttribute?.("data-lenis-prevent-touch")||s&&g.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(g,{deltaX:t,deltaY:i}))))return;if(this.isStopped||this.isLocked){a.cancelable&&a.preventDefault();return}if(!(this.options.syncTouch&&r||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),a.lenisStopPropagation=!0;return}let h=i;this.options.gestureOrientation==="both"?h=Math.abs(i)>Math.abs(t)?i:t:this.options.gestureOrientation==="horizontal"&&(h=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&i>0||this.animatedScroll===this.limit&&i<0))&&(a.lenisStopPropagation=!0),a.cancelable&&a.preventDefault();const d=r&&this.options.syncTouch,k=r&&a.type==="touchend";k&&(h=Math.sign(h)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+h,{programmatic:!1,...d?{lerp:k?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const e=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-e,this.direction=Math.sign(this.animatedScroll-e),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=e=>{const t=e-(this.time||e);this.time=e,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(e,{offset:t=0,immediate:i=!1,lock:a=!1,programmatic:r=!0,lerp:s=r?this.options.lerp:void 0,duration:n=r?this.options.duration:void 0,easing:c=r?this.options.easing:void 0,onStart:l,onComplete:v,force:w=!1,userData:h}={}){if((this.isStopped||this.isLocked)&&!w)return;let d=e,k=t;if(typeof d=="string"&&["top","left","start","#"].includes(d))d=0;else if(typeof d=="string"&&["bottom","right","end"].includes(d))d=this.limit;else{let g=null;if(typeof d=="string"?(g=document.querySelector(d),g||(d==="#top"?d=0:console.warn("Lenis: Target not found",d))):d instanceof HTMLElement&&d?.nodeType&&(g=d),g){if(this.options.wrapper!==window){const B=this.rootElement.getBoundingClientRect();k-=this.isHorizontal?B.left:B.top}const A=g.getBoundingClientRect(),C=getComputedStyle(g),_=this.isHorizontal?Number.parseFloat(C.scrollMarginLeft):Number.parseFloat(C.scrollMarginTop),I=getComputedStyle(this.rootElement),V=this.isHorizontal?Number.parseFloat(I.scrollPaddingLeft):Number.parseFloat(I.scrollPaddingTop);d=(this.isHorizontal?A.left:A.top)+this.animatedScroll-(Number.isNaN(_)?0:_)-(Number.isNaN(V)?0:V)}}if(typeof d=="number"){if(d+=k,this.options.infinite){if(r){this.targetScroll=this.animatedScroll=this.scroll;const g=d-this.animatedScroll;g>this.limit/2?d-=this.limit:g<-this.limit/2&&(d+=this.limit)}}else d=Hi(0,d,this.limit);if(d===this.targetScroll){l?.(this),v?.(this);return}if(this.userData=h??{},i){this.animatedScroll=this.targetScroll=d,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),v?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}r||(this.targetScroll=d),typeof n=="number"&&typeof c!="function"?c=qi:typeof c=="function"&&typeof n!="number"&&(n=1),this.animate.fromTo(this.animatedScroll,d,{duration:n,easing:c,lerp:s,onStart:()=>{a&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(g,A)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=g-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=g,this.setScroll(this.scroll),r&&(this.targetScroll=g),A||this.emit(),A&&(this.reset(),this.emit(),v?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(e,{deltaX:t,deltaY:i}){const a=Date.now();e._lenis||(e._lenis={});const r=e._lenis;let s,n,c,l,v,w,h,d,k,g;if(a-(r.time??0)>2e3){r.time=Date.now();const F=window.getComputedStyle(e);if(r.computedStyle=F,s=["auto","overlay","scroll"].includes(F.overflowX),n=["auto","overlay","scroll"].includes(F.overflowY),v=["auto"].includes(F.overscrollBehaviorX),w=["auto"].includes(F.overscrollBehaviorY),r.hasOverflowX=s,r.hasOverflowY=n,!(s||n))return!1;h=e.scrollWidth,d=e.scrollHeight,k=e.clientWidth,g=e.clientHeight,c=h>k,l=d>g,r.isScrollableX=c,r.isScrollableY=l,r.scrollWidth=h,r.scrollHeight=d,r.clientWidth=k,r.clientHeight=g,r.hasOverscrollBehaviorX=v,r.hasOverscrollBehaviorY=w}else c=r.isScrollableX,l=r.isScrollableY,s=r.hasOverflowX,n=r.hasOverflowY,h=r.scrollWidth,d=r.scrollHeight,k=r.clientWidth,g=r.clientHeight,v=r.hasOverscrollBehaviorX,w=r.hasOverscrollBehaviorY;if(!(s&&c||n&&l))return!1;const A=Math.abs(t)>=Math.abs(i)?"horizontal":"vertical";let C,_,I,V,B,pt;if(A==="horizontal")C=Math.round(e.scrollLeft),_=h-k,I=t,V=s,B=c,pt=v;else if(A==="vertical")C=Math.round(e.scrollTop),_=d-g,I=i,V=n,B=l,pt=w;else return!1;return!pt&&(C>=_||C<=0)?!0:(I>0?C<_:C>0)&&V&&B}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const e=this.options.wrapper;return this.isHorizontal?e.scrollX??e.scrollLeft:e.scrollY??e.scrollTop}get scroll(){return this.options.infinite?Wa(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(e){this._isScrolling!==e&&(this._isScrolling=e,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(e){this._isStopped!==e&&(this._isStopped=e,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(e){this._isLocked!==e&&(this._isLocked=e,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let e="lenis";return this.options.autoToggle&&(e+=" lenis-autoToggle"),this.isStopped&&(e+=" lenis-stopped"),this.isLocked&&(e+=" lenis-locked"),this.isScrolling&&(e+=" lenis-scrolling"),this.isScrolling==="smooth"&&(e+=" lenis-smooth"),e}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(e=>{this.rootElement.classList.add(e)})}cleanUpClassName(){for(const e of Array.from(this.rootElement.classList))(e==="lenis"||e.startsWith("lenis-"))&&this.rootElement.classList.remove(e)}};const tr=e=>Math.min(1,1.001-Math.pow(2,-10*e)),Ui="nami-scroll-smoother-global-style",Xe={gentle:{duration:.8,touchMultiplier:1.4,wheelMultiplier:.9},balanced:{duration:1.2,touchMultiplier:2,wheelMultiplier:1},strong:{duration:1.6,touchMultiplier:2.4,wheelMultiplier:.85}};function er(){if(typeof document>"u"||document.getElementById(Ui))return;const e=document.createElement("style");e.id=Ui,e.textContent=`
html.lenis,
html.lenis body {
  height: auto;
  scroll-behavior: auto !important;
}

.lenis:not(.lenis-autoToggle).lenis-stopped {
  overflow: clip;
}

.lenis [data-lenis-prevent],
.lenis [data-lenis-prevent-wheel],
.lenis [data-lenis-prevent-touch],
.lenis [data-lenis-prevent-vertical],
.lenis [data-lenis-prevent-horizontal] {
  overscroll-behavior: contain;
}

.lenis.lenis-smooth iframe {
  pointer-events: none;
}
`,document.head.append(e)}function ir(){return typeof window<"u"&&typeof document<"u"&&typeof window.requestAnimationFrame=="function"&&typeof window.ResizeObserver=="function"}function ar(e){if(typeof e=="number")return e;const t=typeof e=="string"?document.querySelector(e):e;if(t)return t.getBoundingClientRect().top+window.scrollY}const Nt=class Nt extends f{constructor(){super(),this.easing=tr,this.pendingResize=0,this.handleLoad=()=>{this.resizeOnLoad&&this.queueResize()},this.handleNavigation=()=>{this.lenis&&(this.stopInertiaOnNavigate&&this.lenis.stop(),this.queueResize(),window.requestAnimationFrame(()=>this.lenis?.start()))},this.handleMotionPreference=()=>{this.configure()},this.handleScroll=t=>{x(this,"nami-scroll-smoother",{scroll:t.scroll,limit:t.limit,progress:t.progress,velocity:t.velocity,direction:t.direction,preset:this.preset,reducedMotion:this.reducedMotion})},this.active=!1,this.allowNestedScroll=!1,this.anchors=!0,this.autoRaf=!0,this.autoResize=!0,this.config=null,this.disabled=!1,this.gestureOrientation="vertical",this.infinite=!1,this.orientation="vertical",this.overscroll=!0,this.preset="balanced",this.duration=1.2,this.reducedMotion=!1,this.resizeOnLoad=!0,this.smoothWheel=!0,this.stopInertiaOnNavigate=!0,this.syncTouch=!1,this.touchMultiplier=2,this.wheelMultiplier=1}connectedCallback(){super.connectedCallback(),this.installMotionListener(),window.addEventListener("load",this.handleLoad),window.addEventListener("hashchange",this.handleNavigation),window.addEventListener("popstate",this.handleNavigation),document.addEventListener("astro:page-load",this.handleNavigation),this.configure()}disconnectedCallback(){window.removeEventListener("load",this.handleLoad),window.removeEventListener("hashchange",this.handleNavigation),window.removeEventListener("popstate",this.handleNavigation),document.removeEventListener("astro:page-load",this.handleNavigation),this.motionQuery?.removeEventListener("change",this.handleMotionPreference),this.motionQuery=void 0,this.destroyLenis(),super.disconnectedCallback()}updated(t){if(this.syncState(),t.has("config")&&this.config){this.applyConfig(this.config,{persist:!1,respectAttributes:!0});return}if(t.has("preset")){this.applyConfig(Xe[this.preset]??Xe.balanced,{persist:!1,respectAttributes:!0});return}["allowNestedScroll","anchors","autoRaf","autoResize","disabled","duration","gestureOrientation","infinite","lerp","orientation","overscroll","resizeOnLoad","smoothWheel","stopInertiaOnNavigate","syncTouch","syncTouchLerp","touchInertiaExponent","touchMultiplier","wheelMultiplier"].some(a=>t.has(a))&&this.configure()}render(){return p}start(){if(!this.lenis){this.configure();return}this.lenis.start(),this.active=!0,this.emitState()}stop(){this.lenis?.stop(),this.active=!1,this.emitState()}resize(){this.lenis?.resize()}sync(){this.resize()}applyConfig(t,i={}){const{persist:a=!0,respectAttributes:r=!1}=i,s=t.preset?{...Xe[t.preset],...t}:t;return a&&(this.config={...this.config??{},...t}),this.assignConfigValue("preset",s.preset,"preset",r),this.assignConfigValue("duration",s.duration,"duration",r),this.assignConfigValue("lerp",s.lerp,"lerp",r),this.assignConfigValue("smoothWheel",s.smoothWheel,"smooth-wheel",r),this.assignConfigValue("syncTouch",s.syncTouch,"sync-touch",r),this.assignConfigValue("syncTouchLerp",s.syncTouchLerp,"sync-touch-lerp",r),this.assignConfigValue("touchInertiaExponent",s.touchInertiaExponent,"touch-inertia-exponent",r),this.assignConfigValue("touchMultiplier",s.touchMultiplier,"touch-multiplier",r),this.assignConfigValue("wheelMultiplier",s.wheelMultiplier,"wheel-multiplier",r),this.assignConfigValue("autoRaf",s.autoRaf,"auto-raf",r),this.assignConfigValue("autoResize",s.autoResize,"auto-resize",r),this.assignConfigValue("overscroll",s.overscroll,"overscroll",r),this.assignConfigValue("infinite",s.infinite,"infinite",r),this.assignConfigValue("allowNestedScroll",s.allowNestedScroll,"allow-nested-scroll",r),this.assignConfigValue("orientation",s.orientation,"orientation",r),this.assignConfigValue("gestureOrientation",s.gestureOrientation,"gesture-orientation",r),this.assignConfigValue("stopInertiaOnNavigate",s.stopInertiaOnNavigate,"stop-inertia-on-navigate",r),typeof s.anchors=="boolean"?(this.assignConfigValue("anchors",s.anchors,"anchors",r),this.anchorOptions=void 0):s.anchors&&(!r||!this.hasAttribute("anchors"))&&(this.anchors=!0,this.anchorOptions=s.anchors),s.easing&&(this.easing=s.easing),s.prevent&&(this.prevent=s.prevent),s.virtualScroll&&(this.virtualScroll=s.virtualScroll),this.configure(),this}scrollTo(t,i={}){if(typeof t>"u"){window.scrollTo();return}if(typeof t=="object"&&!(t instanceof HTMLElement)){window.scrollTo(t);return}if(typeof i=="number"){window.scrollTo(Number(t),i);return}if(this.lenis&&!this.reducedMotion&&!this.disabled){this.lenis.scrollTo(t,{duration:this.duration,easing:this.easing,...i});return}const a=ar(t);typeof a=="number"&&window.scrollTo({top:a,behavior:"auto"})}installMotionListener(){typeof window.matchMedia=="function"&&(this.motionQuery=window.matchMedia("(prefers-reduced-motion: reduce)"),this.motionQuery.addEventListener("change",this.handleMotionPreference))}configure(){if(!this.isConnected)return;const t=this.shouldReduceMotion();if(this.reducedMotion=t,this.destroyLenis(),this.disabled||t||!ir()){this.active=!1,this.emitState();return}er();const i={allowNestedScroll:this.allowNestedScroll,anchors:this.anchorOptions??this.anchors,autoRaf:this.autoRaf,autoResize:this.autoResize,duration:this.duration,easing:this.easing,gestureOrientation:this.gestureOrientation,infinite:this.infinite,orientation:this.orientation,overscroll:this.overscroll,prevent:this.prevent,smoothWheel:this.smoothWheel,stopInertiaOnNavigate:this.stopInertiaOnNavigate,syncTouch:this.syncTouch,touchMultiplier:this.touchMultiplier,virtualScroll:this.virtualScroll,wheelMultiplier:this.wheelMultiplier};typeof this.lerp=="number"&&(i.lerp=this.lerp),typeof this.syncTouchLerp=="number"&&(i.syncTouchLerp=this.syncTouchLerp),typeof this.touchInertiaExponent=="number"&&(i.touchInertiaExponent=this.touchInertiaExponent),this.lenis=new Ga(i),this.unsubscribeScroll=this.lenis.on("scroll",this.handleScroll),this.active=!0,this.emitState(),this.queueResize(),this.queueFontResize()}destroyLenis(){this.pendingResize&&(window.cancelAnimationFrame(this.pendingResize),this.pendingResize=0),this.unsubscribeScroll?.(),this.unsubscribeScroll=void 0,this.lenis?.destroy(),this.lenis=void 0,this.active=!1}assignConfigValue(t,i,a,r){typeof i>"u"||r&&this.hasAttribute(a)||(this[t]=i)}shouldReduceMotion(){if(this.motionQuery?.matches||this.closest("[data-nami-motion]")?.dataset.namiMotion==="reduced")return!0;const i=getComputedStyle(this).getPropertyValue("--nami-motion-normal").trim();return i==="0s"||i==="0ms"||i==="1ms"}queueResize(){!this.lenis||this.pendingResize||(this.pendingResize=window.requestAnimationFrame(()=>{this.pendingResize=0,this.resize()}))}queueFontResize(){document.fonts?.ready.then(()=>{this.isConnected&&this.resize()})}emitState(){this.syncState(),x(this,"nami-scroll-smoother-state",{scroll:this.lenis?.scroll??window.scrollY,limit:this.lenis?.limit??Math.max(0,document.documentElement.scrollHeight-window.innerHeight),progress:this.lenis?.progress??0,velocity:this.lenis?.velocity??0,direction:this.lenis?.direction??0,preset:this.preset,reducedMotion:this.reducedMotion})}syncState(){S(this,{state:this.reducedMotion?"reduced-motion":this.disabled?"disabled":xe(this.active),disabled:this.disabled})}};Nt.properties={active:{type:Boolean,reflect:!0},allowNestedScroll:{type:Boolean,attribute:"allow-nested-scroll"},anchors:{type:Boolean},autoRaf:{type:Boolean,attribute:"auto-raf"},autoResize:{type:Boolean,attribute:"auto-resize"},config:{attribute:!1},disabled:{type:Boolean,reflect:!0},duration:{type:Number},gestureOrientation:{attribute:"gesture-orientation"},infinite:{type:Boolean},lerp:{type:Number},orientation:{},overscroll:{type:Boolean},preset:{reflect:!0},reducedMotion:{type:Boolean,attribute:"reduced-motion",reflect:!0},resizeOnLoad:{type:Boolean,attribute:"resize-on-load"},smoothWheel:{type:Boolean,attribute:"smooth-wheel"},stopInertiaOnNavigate:{type:Boolean,attribute:"stop-inertia-on-navigate"},syncTouch:{type:Boolean,attribute:"sync-touch"},syncTouchLerp:{type:Number,attribute:"sync-touch-lerp"},touchInertiaExponent:{type:Number,attribute:"touch-inertia-exponent"},touchMultiplier:{type:Number,attribute:"touch-multiplier"},wheelMultiplier:{type:Number,attribute:"wheel-multiplier"}},Nt.styles=b`
    :host {
      display: none !important;
    }
  `;let je=Nt;const Wt=class Wt extends f{constructor(){super(),this.variant="text",this.animated=!0}updated(){this.dataset.state=this.animated?"loading":"idle"}render(){return o`<span class="base" part="base" aria-hidden="true"><slot></slot></span>`}};Wt.properties={variant:{reflect:!0},animated:{type:Boolean,reflect:!0}},Wt.styles=[y,b`
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
    `];let qe=Wt;const Yt=class Yt extends f{constructor(){super(),this.min="",this.gap="md",this.ratio="even"}updated(){this.style.containerType="inline-size",this.min?this.style.setProperty("--nami-split-min",this.min):this.style.removeProperty("--nami-split-min")}render(){return o`<div class="base" part="base"><slot></slot></div>`}};Yt.properties={min:{reflect:!0},gap:{reflect:!0},ratio:{reflect:!0}},Yt.styles=[y,b`
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
    `];let Ue=Yt;m("nami-spinner",K);const Kt=class Kt extends f{constructor(){super(),this.hideTimer=0,this.shownAt=0,O(this),this.active=!1,this.appearance="veil",this.duration=240,this.hasDefaultContent=!1,this.label="",this.tone="surface",this.variant="screen",this.visible=!1}connectedCallback(){super.connectedCallback(),this.active&&(this.visible=!0,this.shownAt=Date.now())}disconnectedCallback(){window.clearTimeout(this.hideTimer),this.hideResolver?.(),super.disconnectedCallback()}updated(t){if(S(this,{state:xe(this.active),loading:this.active}),!t.has("active"))return;if(window.clearTimeout(this.hideTimer),this.active){this.hideResolver?.(),this.hideComplete=void 0,this.visible=!0,this.shownAt=Date.now();return}const i=Date.now()-this.shownAt,a=Math.max(0,Number(this.duration)-i);this.hideComplete=new Promise(r=>{this.hideResolver=r}),this.hideTimer=window.setTimeout(()=>{this.active||(this.visible=!1),this.hideResolver?.(),this.hideResolver=void 0},a)}show(t={}){this.applyOptions(t),this.visible=!0,this.shownAt=Date.now(),this.active=!0}async hide(t={}){this.applyOptions(t),this.active=!1,await this.updateComplete,this.hideComplete&&await this.hideComplete}async waitFor(t,i={}){const a=i.minDuration??i.duration??this.duration,r=Date.now();this.show(i);try{return await(typeof t=="function"?t():t)}finally{const s=Math.max(0,Number(a)-(Date.now()-r));s>0&&await new Promise(n=>window.setTimeout(n,s)),await this.hide(i)}}applyOptions(t){t.appearance&&(this.appearance=t.appearance),t.duration!==void 0&&(this.duration=t.duration),t.label!==void 0&&(this.label=t.label),t.tone&&(this.tone=t.tone),t.variant&&(this.variant=t.variant)}handleSlotChange(t){const i=t.target;this.hasDefaultContent=i.assignedNodes({flatten:!0}).some(a=>a.nodeType===Node.TEXT_NODE?!!a.textContent?.trim():!0)}get fallbackLabel(){return this.label||T("Preparing interface",{id:"nami.pageTransition.preparing"})}render(){return this.visible?o`
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
    `:p}};Kt.properties={active:{type:Boolean,reflect:!0},appearance:{reflect:!0},duration:{type:Number,reflect:!0},hasDefaultContent:{state:!0},label:{},tone:{reflect:!0},variant:{reflect:!0},visible:{state:!0}},Kt.styles=[y,b`
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
    `];let Fe=Kt;const Qt=class Qt extends f{constructor(){super(),this.gap="md",this.direction="vertical",this.align="",this.justify=""}updated(){this.align?this.style.setProperty("--nami-stack-align",this.align):this.style.removeProperty("--nami-stack-align"),this.justify?this.style.setProperty("--nami-stack-justify",this.justify):this.style.removeProperty("--nami-stack-justify")}render(){return o`<div class="base" part="base"><slot></slot></div>`}};Qt.properties={gap:{reflect:!0},direction:{reflect:!0},align:{reflect:!0},justify:{reflect:!0}},Qt.styles=[y,b`
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
    `];let Ne=Qt;const dt=class dt extends f{constructor(){super(),this.internals=at(this),this.name="",this.value="on",this.checked=!1,this.defaultChecked=!1,this.disabled=!1}updated(){S(this,{state:ge(this.checked),disabled:this.disabled}),rt(this.internals,!this.disabled&&this.checked?this.value:null)}formResetCallback(){this.checked=this.defaultChecked}toggle(t){this.disabled||(this.checked=!this.checked,x(this,"nami-change",{checked:this.checked,value:this.value,sourceEvent:t}))}render(){return o`
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
    `}};dt.formAssociated=!0,dt.properties={name:{},value:{},checked:{type:Boolean,reflect:!0},defaultChecked:{attribute:"default-checked",type:Boolean},disabled:{type:Boolean,reflect:!0}},dt.styles=[y,b`
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
    `];let We=dt;const Zt=class Zt extends f{constructor(){super(),this.handleItemClick=t=>{const i=t.currentTarget;this.isItemDisabled(i)||this.selectItem(i,t)},this.handleItemKeydown=t=>{if(!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp","Home","End"].includes(t.key))return;t.preventDefault();const i=t.currentTarget,a=this.enabledItems,r=a.indexOf(i);if(r<0||a.length===0)return;const s=Vi(t.key,r,a.length,this.orientation),n=a[s];n?.focus(),n&&this.selectItem(n,t)},this.value="",this.orientation="horizontal"}get items(){return this.renderRoot.querySelector("slot")?.assignedElements({flatten:!0})??[]}get enabledItems(){return this.items.filter(t=>!this.isItemDisabled(t))}firstUpdated(){this.syncItems()}updated(){this.syncItems(),S(this,{state:this.value?"selected":"default"})}syncItems(){const t=this.enabledItems;if(t.length===0){this.items.length===0&&this.value!==""&&(this.value=""),this.items.forEach(r=>{r.setAttribute("role","tab"),r.setAttribute("aria-disabled",this.isItemDisabled(r)?"true":"false"),r.setAttribute("tabindex","-1")});return}const a=t.some(r=>Et(r)===this.value)?this.value:Et(t[0])||"";this.value!==a&&(this.value=a),this.items.forEach(r=>{const s=Et(r),n=this.isItemDisabled(r),c=!n&&s===a;r.setAttribute("role","tab"),r.setAttribute("aria-selected",String(c)),n?r.setAttribute("aria-disabled","true"):r.removeAttribute("aria-disabled"),r.setAttribute("tabindex",c?"0":"-1"),r.removeEventListener("click",this.handleItemClick),r.removeEventListener("keydown",this.handleItemKeydown),r.addEventListener("click",this.handleItemClick),r.addEventListener("keydown",this.handleItemKeydown)})}isItemDisabled(t){return t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"||!!t.disabled}selectItem(t,i){const a=Et(t);!a||a===this.value||(this.value=a,this.syncItems(),x(this,"nami-select",{value:a,sourceEvent:i}),x(this,"nami-change",{value:a,sourceEvent:i}))}render(){return o`
      <div class="base" part="base" role="tablist" aria-orientation=${this.orientation}>
        <slot @slotchange=${()=>this.syncItems()}></slot>
      </div>
    `}};Zt.properties={value:{},orientation:{reflect:!0}},Zt.styles=[y,b`
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
    `];let Ye=Zt;const ht=class ht extends f{constructor(){super(),this.internals=at(this),this.metaId=`${St("nami-textarea")}-meta`,this.name="",this.value="",this.defaultValue="",this.placeholder="",this.label="",this.helperText="",this.error="",this.disabled=!1,this.required=!1,this.rows=4}get textareaElement(){return this.renderRoot.querySelector("textarea")}updated(){const t=!this.disabled&&!!(this.error||this.required&&!this.value);S(this,{state:t?"invalid":"valid",disabled:this.disabled,invalid:t}),rt(this.internals,this.disabled?null:this.value),xt(this.internals,this.validityFlags,this.validityMessage,this.textareaElement??void 0)}formResetCallback(){this.value=this.defaultValue}focus(){this.textareaElement?.focus()}checkValidity(){return this.textareaElement?.checkValidity()??Object.keys(this.validityFlags).length===0}reportValidity(){return this.textareaElement?.reportValidity()??this.checkValidity()}get validityFlags(){return this.disabled?{}:this.error?{customError:!0}:this.required?Q(this.value,this.label||this.name||"Field").flags:{}}get validityMessage(){if(!this.disabled){if(this.error)return this.error;if(this.required)return Q(this.value,this.label||this.name||"Field").message}}handleInput(t){this.value=t.target.value,x(this,"nami-input",{value:this.value,sourceEvent:t})}handleChange(t){x(this,"nami-change",{value:this.value,sourceEvent:t})}render(){const t=this.id?`${this.id}-meta`:this.metaId,i=this.error||this.helperText;return o`
      <label part="base">
        ${this.label?o`<span class="label" part="label">${this.label}${this.required?" *":""}</span>`:p}
        <textarea
          part="control"
          .value=${this.value}
          name=${this.name}
          placeholder=${this.placeholder}
          rows=${this.rows}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${this.error?"true":"false"}
          aria-describedby=${i?t:p}
          @input=${this.handleInput}
          @change=${this.handleChange}
        ></textarea>
      </label>
      ${i?o`<div id=${t} class="meta ${this.error?"error":""}" part=${this.error?"error":"description"}>${i}</div>`:p}
    `}};ht.formAssociated=!0,ht.properties={name:{},value:{},defaultValue:{attribute:"default-value"},placeholder:{},label:{},helperText:{attribute:"helper-text"},error:{reflect:!0,useDefault:!0},disabled:{type:Boolean,reflect:!0},required:{type:Boolean,reflect:!0},rows:{type:Number,reflect:!0}},ht.styles=[y,b`
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
    `];let Ke=ht;const D={accent:"#3b82f6",mode:"light",stylePreset:"default",density:"comfortable",size:"md",motion:"normal",radius:"round",contrast:"normal"},Fi=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i,E={mode:["light","dark"],stylePreset:["default","illustration"],density:["comfortable","compact"],size:["sm","md","lg"],motion:["normal","reduced"],radius:["sharp","soft","round"],contrast:["normal","high"]};function z(e,t){return typeof e=="string"&&t.includes(e)}function U(e,t){return{code:"invalid-enum",message:`Unsupported ${String(e)} value "${String(t)}". Falling back to the default theme seed.`,path:e,severity:"warning"}}function rr(e){const t=[];return e.accent!==void 0&&!Fi.test(e.accent)&&t.push({code:"invalid-accent",message:`Accent must be a 3 or 6 digit hex color. Received "${e.accent}".`,path:"accent",severity:"warning"}),e.mode!==void 0&&!z(e.mode,E.mode)&&t.push(U("mode",e.mode)),e.stylePreset!==void 0&&!z(e.stylePreset,E.stylePreset)&&t.push(U("stylePreset",e.stylePreset)),e.density!==void 0&&!z(e.density,E.density)&&t.push(U("density",e.density)),e.size!==void 0&&!z(e.size,E.size)&&t.push(U("size",e.size)),e.motion!==void 0&&!z(e.motion,E.motion)&&t.push(U("motion",e.motion)),e.radius!==void 0&&!z(e.radius,E.radius)&&t.push(U("radius",e.radius)),e.contrast!==void 0&&!z(e.contrast,E.contrast)&&t.push(U("contrast",e.contrast)),t}function sr(e){return{accent:e.accent&&Fi.test(e.accent)?e.accent:D.accent,mode:z(e.mode,E.mode)?e.mode:D.mode,stylePreset:z(e.stylePreset,E.stylePreset)?e.stylePreset:D.stylePreset,density:z(e.density,E.density)?e.density:D.density,size:z(e.size,E.size)?e.size:D.size,motion:z(e.motion,E.motion)?e.motion:D.motion,radius:z(e.radius,E.radius)?e.radius:D.radius,contrast:z(e.contrast,E.contrast)?e.contrast:D.contrast}}function nr(e){return e.replace(/^--nami-/,"").replace(/([a-z0-9])([A-Z])/g,"$1-$2").replace(/[\s_.]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase()}function Ni(e){return e.length===1&&e[0].startsWith("--")?e[0]:`--nami-${e.map(nr).filter(Boolean).join("-")}`}function Qe(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Wi(e){return Qe(e)&&"value"in e}function or(e){return String(Wi(e)?e.value:e)}function M(e,t=[]){const i={};if(!e)return i;for(const[a,r]of Object.entries(e)){const s=a.startsWith("--")?[a]:[...t,a];if(Wi(r)||typeof r=="string"||typeof r=="number"){i[Ni(s)]=or(r);continue}Qe(r)&&Object.assign(i,M(r,s))}return i}function lr(e){const t={};if(!e)return t;for(const[i,a]of Object.entries(e)){const r=Qe(a)&&"tokens"in a?a.tokens:a;Object.assign(t,M(r,[i]))}return t}function Yi(e){return{...M(e?.tokens),...M(e?.semanticTokens),...lr(e?.components)}}function cr(e,t){const i=t.seed,a=e.cssVariablesResolver?.(t)??{};return{...Yi(e),...Yi(e.modes?.[i.mode]),...M(e.density?.[i.density]),...M(e.size?.[i.size]),...M(e.motion?.[i.motion]),...M(e.radius?.[i.radius]),...M(e.contrast?.[i.contrast]),...Object.fromEntries(Object.entries(a.variables??{}).map(([r,s])=>[r,String(s)])),...Object.fromEntries(Object.entries(a[i.mode]??{}).map(([r,s])=>[r,String(s)]))}}function $(e,t,i){return`color-mix(in oklab, ${e}, ${t} ${i}%)`}function u(e,t){return`color-mix(in oklab, ${e}, transparent ${t}%)`}function dr(e){const t="var(--nami-accent-50)",i=e.mode==="dark";return{"--nami-accent-50":e.accent,"--nami-accent-90":$(t,i?"#fff":"#000",i?80:40),"--nami-accent-80":$(t,i?"#fff":"#000",i?60:30),"--nami-accent-70":$(t,i?"#fff":"#000",i?40:20),"--nami-accent-60":$(t,i?"#fff":"#000",i?20:10),"--nami-accent-40":$(t,i?"#000":"#fff",i?10:20),"--nami-accent-30":$(t,i?"#000":"#fff",i?20:40),"--nami-accent-20":$(t,i?"#000":"#fff",i?30:60),"--nami-accent-10":$(t,i?"#000":"#fff",i?40:80),"--nami-accent-5":$(t,i?"#000":"#fff",i?50:90),"--nami-neutral-10":$(t,"#b3b3b3",84),"--nami-neutral-50":$(t,i?"#eef2f7":"#646a73",94)}}function hr(e){return e.radius==="sharp"?{"--nami-radius-control":"4px","--nami-radius-surface":"4px","--nami-radius-tight":"2px","--nami-radius-round":"999px"}:e.radius==="soft"?{"--nami-radius-control":"10px","--nami-radius-surface":"8px","--nami-radius-tight":"4px","--nami-radius-round":"999px"}:{"--nami-radius-control":"999px","--nami-radius-surface":"6px","--nami-radius-tight":"4px","--nami-radius-round":"999px"}}function pr(e){return e.density==="compact"?{"--nami-control-height-sm":"28px","--nami-control-height-md":"34px","--nami-control-height-lg":"40px","--nami-space-1":"2px","--nami-space-2":"4px","--nami-space-3":"8px","--nami-space-4":"12px","--nami-space-5":"16px","--nami-icon-button-size":"36px","--nami-layout-gutter":"12px"}:{"--nami-control-height-sm":"32px","--nami-control-height-md":"40px","--nami-control-height-lg":"48px","--nami-space-1":"4px","--nami-space-2":"6px","--nami-space-3":"10px","--nami-space-4":"16px","--nami-space-5":"24px","--nami-icon-button-size":"40px","--nami-layout-gutter":"16px"}}function mr(e){const i={sm:{height:"var(--nami-control-height-sm)",paddingX:"12px",fontSize:"0.875rem",iconSize:"16px"},md:{height:"var(--nami-control-height-md)",paddingX:"16px",fontSize:"0.9375rem",iconSize:"18px"},lg:{height:"var(--nami-control-height-lg)",paddingX:"20px",fontSize:"1rem",iconSize:"20px"}}[e.size];return{"--nami-control-height":i.height,"--nami-control-padding-x":i.paddingX,"--nami-control-font-size":i.fontSize,"--nami-icon-size":i.iconSize,"--nami-icon-button-size":"var(--nami-control-height)"}}function ur(){return{"--nami-breakpoint-compact":"639px","--nami-breakpoint-medium":"880px","--nami-breakpoint-wide":"1080px","--nami-container-sm":"720px","--nami-container-md":"960px","--nami-container-lg":"1240px","--nami-app-shell-rail-width":"56px","--nami-app-shell-mobile-bar-height":"56px","--nami-app-shell-breakpoint":"639px"}}function fr(e){return e.motion==="reduced"?{"--nami-motion-fast":"1ms","--nami-motion-normal":"1ms","--nami-motion-slow":"1ms","--nami-motion-exit":"1ms","--nami-ease-standard":"linear","--nami-ease-emphasized":"linear"}:{"--nami-motion-fast":"120ms","--nami-motion-normal":"250ms","--nami-motion-slow":"700ms","--nami-motion-exit":"150ms","--nami-ease-standard":"cubic-bezier(0.19, 1, 0.22, 1)","--nami-ease-emphasized":"cubic-bezier(0.1, 0.9, 0.2, 1)"}}function vr(e){const t=e.mode==="dark",i=e.contrast==="high";return{"--nami-color-primary":"var(--nami-accent-50)","--nami-color-primary-hover":t?"var(--nami-accent-60)":"var(--nami-accent-40)","--nami-color-primary-pressed":t?"var(--nami-accent-40)":"var(--nami-accent-60)","--nami-color-primary-focus":"var(--nami-accent-30)","--nami-color-primary-muted":"var(--nami-accent-10)","--nami-color-danger":t?"#ff7875":"#dc2626","--nami-surface":t?"#151718":"#ffffff","--nami-surface-raised":t?"#1c1f21":"#ffffff","--nami-surface-inset":t?u("#fff",94):u("#000",97),"--nami-surface-overlay":t?u("#17191b",16):u("#fff",18),"--nami-border":i?t?u("#fff",70):u("#000",68):t?u("#fff",86):u("#000",88),"--nami-border-strong":i?u(t?"#fff":"#000",54):t?u("#fff",72):u("#000",76),"--nami-text":t?"#f8fafc":"#171717","--nami-text-muted":i?t?"#d8dee8":"#3f4652":t?"#a1a8b3":"#666b74","--nami-text-inverse":"#ffffff","--nami-icon-color":"var(--nami-neutral-50)","--nami-hover-overlay":t?u("#fff",i?88:94):u("#000",i?90:95),"--nami-ripple":t?u("#fff",84):u("#000",86),"--nami-overlay-backdrop":t?u("#000",38):u("#000",52),"--nami-accent-ripple":u("var(--nami-color-primary-pressed)",i?72:84),"--nami-accent-hover-overlay":u("var(--nami-color-primary-hover)",i?82:90),"--nami-focus-ring":i?`0 0 0 4px ${u("var(--nami-color-primary-focus)",20)}, 0 0 0 1px var(--nami-color-primary)`:`0 4px 4px ${u("var(--nami-color-primary)",74)}, 0 0 0 3px ${u("var(--nami-color-primary-focus)",46)}`}}function br(e){return{"--nami-font-sans":'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',"--nami-font-mono":'"SFMono-Regular", Consolas, "Liberation Mono", monospace',"--nami-shadow-color":e.mode==="dark"?"#000":$("var(--nami-accent-50)","#8a8f98",80),"--nami-style-stroke-width":e.contrast==="high"?"2px":"1px","--nami-style-stroke-color":"var(--nami-border)","--nami-style-ink-color":"var(--nami-text)","--nami-style-on-paper":"var(--nami-text)","--nami-style-on-paper-muted":"var(--nami-text-muted)","--nami-style-offset-shadow":"none","--nami-style-control-bg":"transparent","--nami-style-panel-bg":"var(--nami-surface-raised)","--nami-style-paper-bg":"var(--nami-surface)","--nami-style-border-radius":"var(--nami-radius-surface)","--nami-style-background-pattern":"none","--nami-style-doodle-opacity":"0","--nami-style-paper-line-color":"var(--nami-border)","--nami-style-focus-shadow":"var(--nami-focus-ring)"}}function gr(e){const t=e.mode==="dark",i=e.contrast==="high"?"4px":"3px";return{"--nami-font-sans":'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',"--nami-font-mono":'"SFMono-Regular", Consolas, "Liberation Mono", monospace',"--nami-shadow-color":t?"#000":"#2f2f2f","--nami-style-stroke-width":i,"--nami-style-ink-color":t?"#261f1f":"#2f2f2f","--nami-style-stroke-color":"var(--nami-style-ink-color)","--nami-style-on-paper":t?"#29221f":"#2f2f2f","--nami-style-on-paper-muted":t?"#6b5f58":"#62656b","--nami-style-offset-shadow":t?"6px 6px 0 #050506":"5px 5px 0 var(--nami-style-ink-color)","--nami-style-control-bg":t?$("#fff8ea","var(--nami-accent-50)",5):"#fffefe","--nami-style-panel-bg":t?$("#fff1f5","var(--nami-accent-50)",7):$("#fff3f7","#fff",18),"--nami-style-paper-bg":t?$("#fffdf3","var(--nami-accent-50)",4):"#fff8fb","--nami-style-border-radius":e.radius==="sharp"?"8px":e.radius==="soft"?"14px":"16px","--nami-style-doodle-opacity":t?"0.34":"0.42","--nami-style-paper-line-color":t?"rgb(38 31 31 / 0.18)":u("var(--nami-style-ink-color)",84),"--nami-style-focus-shadow":t?`0 0 0 4px ${u("var(--nami-color-primary)",58)}, 4px 4px 0 #050506`:`0 0 0 4px ${u("var(--nami-color-primary)",70)}, 4px 4px 0 var(--nami-style-ink-color)`,"--nami-style-background-pattern":t?`radial-gradient(circle at 10% 18%, rgb(142 217 255 / var(--nami-style-doodle-opacity)) 0 14px, transparent 15px),
    radial-gradient(circle at 88% 14%, rgb(255 216 93 / var(--nami-style-doodle-opacity)) 0 10px, transparent 11px),
    radial-gradient(circle at 74% 80%, rgb(255 183 208 / var(--nami-style-doodle-opacity)) 0 20px, transparent 21px),
    linear-gradient(135deg, transparent 0 46%, ${u("#fff7ed",82)} 47% 49%, transparent 50%),
    linear-gradient(25deg, transparent 0 70%, ${u("var(--nami-accent-50)",62)} 71% 73%, transparent 74%)`:`radial-gradient(circle at 12% 22%, rgb(142 217 255 / var(--nami-style-doodle-opacity)) 0 12px, transparent 13px),
    radial-gradient(circle at 86% 16%, rgb(255 216 93 / var(--nami-style-doodle-opacity)) 0 9px, transparent 10px),
    radial-gradient(circle at 72% 78%, rgb(255 183 208 / var(--nami-style-doodle-opacity)) 0 18px, transparent 19px),
    linear-gradient(135deg, transparent 0 46%, var(--nami-style-paper-line-color) 47% 49%, transparent 50%),
    linear-gradient(25deg, transparent 0 70%, ${u("var(--nami-accent-50)",82)} 71% 73%, transparent 74%)`}}function yr(e){const t=e.stylePreset==="illustration",i=t&&e.mode==="dark",a=e.contrast==="high";return{"--nami-button-bg":"var(--nami-color-primary)","--nami-button-fg":"#fff","--nami-button-border":t?"var(--nami-style-stroke-color)":a?"var(--nami-color-primary)":"transparent","--nami-button-border-width":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-button-radius":"var(--nami-radius-control)","--nami-button-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-button-hover-bg":"var(--nami-color-primary-hover)","--nami-card-bg":t?"var(--nami-style-control-bg)":"var(--nami-surface-raised)","--nami-card-fg":t?"var(--nami-style-on-paper)":"var(--nami-text)","--nami-card-inset-bg":t?i?"var(--nami-style-paper-bg)":$("var(--nami-style-paper-bg)","var(--nami-accent-50)",5):"var(--nami-surface-inset)","--nami-card-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-card-border-width":"var(--nami-style-stroke-width)","--nami-card-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-card-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-card-padding":"var(--nami-space-4)","--nami-card-gap":"var(--nami-space-3)","--nami-badge-bg":t?i?"var(--nami-style-control-bg)":$("var(--nami-accent-50)","#fff",88):"var(--nami-hover-overlay)","--nami-badge-fg":t?"var(--nami-style-on-paper)":"var(--nami-text)","--nami-badge-border":t?"var(--nami-style-stroke-color)":"transparent","--nami-badge-border-width":"var(--nami-style-stroke-width)","--nami-badge-radius":"var(--nami-radius-control)","--nami-badge-height":"24px","--nami-badge-font-size":"0.75rem","--nami-badge-padding-x":"9px","--nami-soft-control-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-soft-control-color":t?"var(--nami-style-on-paper)":"var(--nami-text)","--nami-soft-control-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-soft-control-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-chip-bg":t?i?"var(--nami-style-control-bg)":$("var(--nami-accent-50)","#fff",92):"var(--nami-hover-overlay)","--nami-chip-selected-bg":"var(--nami-color-primary)","--nami-chip-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-chip-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-chip-radius":"var(--nami-radius-control)","--nami-chip-shadow":t?`3px 3px 0 ${i?"#050506":"#2f2f2f"}`:"none","--nami-input-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-input-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-input-border-width":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-input-radius":t?"12px":"var(--nami-radius-control)","--nami-input-shadow":t?`3px 3px 0 ${i?"#050506":"#2f2f2f"}`:"none","--nami-switch-track-bg":t?"var(--nami-style-control-bg)":"var(--nami-hover-overlay)","--nami-switch-border-width":"var(--nami-style-stroke-width)","--nami-switch-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-switch-thumb-bg":t?"var(--nami-style-paper-bg)":"var(--nami-surface-raised)","--nami-switch-thumb-shadow":t?`2px 2px 0 ${i?"#050506":"var(--nami-style-ink-color)"}`:`0 1px 4px ${u("var(--nami-shadow-color)",64)}`,"--nami-radio-item-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-radio-item-border-width":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-radio-item-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-radio-item-indicator-color":"var(--nami-color-primary)","--nami-radio-item-size":"20px","--nami-radio-item-gap":"var(--nami-space-3)","--nami-radio-item-padding":"8px 0","--nami-radio-item-description-color":t?"var(--nami-style-on-paper-muted)":"var(--nami-text-muted)","--nami-radio-group-gap":"var(--nami-space-2)","--nami-radio-card-bg":t?"var(--nami-style-control-bg)":"var(--nami-surface-raised)","--nami-radio-card-border-width":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-radio-card-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-radio-card-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-radio-card-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-radio-card-selected-shadow":t?"0 0 0 2px var(--nami-color-primary), var(--nami-style-offset-shadow)":"0 0 0 1px var(--nami-color-primary), var(--nami-focus-ring)","--nami-tab-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-tab-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-tab-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-tab-radius":t?"12px":"var(--nami-radius-control)","--nami-dialog-bg":t?"var(--nami-style-panel-bg)":"var(--nami-surface-raised)","--nami-dialog-border-width":t?"var(--nami-style-stroke-width)":"1px","--nami-dialog-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-dialog-radius":t?"18px":"var(--nami-radius-surface)","--nami-dialog-shadow":t?"var(--nami-style-offset-shadow)":`0 18px 50px ${u("var(--nami-shadow-color)",54)}`,"--nami-drawer-bg":t?"var(--nami-style-panel-bg)":"var(--nami-surface-overlay)","--nami-drawer-border-width":t?"var(--nami-style-stroke-width)":"1px","--nami-drawer-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-drawer-shadow":t?"var(--nami-style-offset-shadow)":`0 8px 24px ${u("var(--nami-shadow-color)",52)}`,"--nami-tooltip-bg":t?"var(--nami-style-control-bg)":"var(--nami-text)","--nami-tooltip-fg":t?"var(--nami-style-on-paper)":"var(--nami-text-inverse)","--nami-tooltip-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-tooltip-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-tooltip-radius":"var(--nami-radius-tight)","--nami-tooltip-shadow":t?"var(--nami-style-offset-shadow)":`0 8px 24px ${u("var(--nami-shadow-color)",72)}`,"--nami-tooltip-offset":"8px","--nami-tooltip-font-size":"0.75rem","--nami-tooltip-padding-x":"8px","--nami-tooltip-padding-y":"6px","--nami-tooltip-z-index":"80","--nami-toast-bg":t?"var(--nami-style-control-bg)":"var(--nami-surface-raised)","--nami-toast-border-width":t?"var(--nami-style-stroke-width)":"1px","--nami-toast-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-toast-radius":t?"14px":"var(--nami-radius-surface)","--nami-app-shell-border-width":t?"var(--nami-style-stroke-width)":"1px","--nami-app-shell-shadow":t?`4px 0 0 ${i?"#050506":"#2f2f2f"}`:"none","--nami-spinner-track-color":u("currentColor",t?64:72),"--nami-transition-progress-height":t?"5px":"4px","--nami-page-transition-z-index":"2147483646","--nami-top-progress-height":"var(--nami-transition-progress-height)","--nami-top-progress-duration":e.motion==="reduced"?"1ms":"260ms","--nami-top-progress-ease":"var(--nami-ease-standard)","--nami-top-progress-appear-duration":e.motion==="reduced"?"1ms":"360ms","--nami-top-progress-appear-ease":"var(--nami-ease-emphasized)","--nami-top-progress-indeterminate-duration":e.motion==="reduced"?"1ms":"1280ms","--nami-top-progress-track-bg":t?i?$("var(--nami-color-primary)","var(--nami-style-panel-bg)",68):$("var(--nami-color-primary)","#fff",78):"color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 72%)","--nami-top-progress-fill-bg":t?"var(--nami-color-primary)":"color-mix(in oklab, var(--nami-color-primary), var(--nami-text) 8%)","--nami-top-progress-shadow":t?`0 4px 0 ${i?"#050506":"var(--nami-style-ink-color)"}`:`0 8px 24px ${u("var(--nami-color-primary)",78)}`,"--nami-top-progress-z-index":"2147483647","--nami-illus-primary":"var(--nami-color-primary)","--nami-illus-secondary":t?$("var(--nami-color-primary)","#fff",i?38:58):"var(--nami-accent-20)","--nami-illus-accent":i?"#ffd166":"#f5b84b","--nami-illus-muted":t?u("var(--nami-style-on-paper-muted)",i?24:44):u("var(--nami-text-muted)",48),"--nami-illus-line":t?"var(--nami-style-stroke-color)":u("var(--nami-text)",36),"--nami-illus-bg":t?u("var(--nami-color-primary)",i?84:90):"var(--nami-color-primary-muted)","--nami-illus-size-sm":"92px","--nami-illus-size-md":"140px","--nami-illus-size-lg":"184px","--nami-empty-gap":"12px","--nami-empty-title-color":t?"var(--nami-style-on-paper)":"var(--nami-text)","--nami-empty-description-color":t?"var(--nami-style-on-paper-muted)":"var(--nami-text-muted)","--nami-empty-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-empty-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-empty-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-empty-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-empty-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-result-title-size":"1.5rem","--nami-result-subtitle-size":"0.95rem","--nami-result-gap":"14px","--nami-result-actions-margin":"10px 0 0","--nami-result-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-result-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-result-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-result-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-result-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-container-max-width":"var(--nami-container-lg)","--nami-container-padding":"var(--nami-layout-gutter)","--nami-stack-gap":"var(--nami-space-3)","--nami-cluster-gap":"var(--nami-space-2)","--nami-grid-min":"16rem","--nami-grid-gap":"var(--nami-layout-gutter)","--nami-split-min":"18rem","--nami-split-gap":"var(--nami-layout-gutter)","--nami-divider-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-divider-thickness":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-divider-gap":"var(--nami-space-3)","--nami-divider-label-color":t?"var(--nami-style-on-paper-muted)":"var(--nami-text-muted)","--nami-divider-min-size":"2rem","--nami-checkbox-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-checkbox-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-checkbox-border-width":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-checkbox-radius":e.radius==="round"?"6px":"var(--nami-radius-tight)","--nami-checkbox-indicator-color":"#fff","--nami-textarea-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-textarea-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-textarea-border-width":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-textarea-radius":t?"12px":"var(--nami-radius-surface)","--nami-textarea-shadow":t?`3px 3px 0 ${i?"#050506":"#2f2f2f"}`:"none","--nami-form-field-gap":"var(--nami-space-2)","--nami-alert-bg":t?"var(--nami-style-control-bg)":"var(--nami-surface-raised)","--nami-alert-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-alert-border-width":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-alert-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-alert-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-skeleton-bg":t?u("var(--nami-style-on-paper-muted)",82):"var(--nami-hover-overlay)","--nami-skeleton-highlight":t?u("var(--nami-style-paper-bg)",18):u("#fff",i?82:18),"--nami-progress-track-bg":t?i?$("var(--nami-color-primary)","var(--nami-style-panel-bg)",72):$("var(--nami-color-primary)","#fff",84):"color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 82%)","--nami-progress-fill-bg":"var(--nami-color-primary)","--nami-progress-height":"8px","--nami-progress-radius":"var(--nami-radius-control)"}}function xr(e={}){const t=sr(e),i=rr(e),a=dr(t),r=vr(t),s=t.stylePreset==="illustration"?gr(t):br(t),n=yr(t),c={...a,...hr(t),...ur(),"--nami-contrast-level":t.contrast,...pr(t),...mr(t),...fr(t),...r,...s,...n};return{seed:t,palette:a,semantic:r,component:n,style:s,cssVars:c,diagnostics:i}}function wr(e){return{...e,seed:{...e.seed},recipes:{...e.recipes},slotRecipes:{...e.slotRecipes},conditions:{...e.conditions}}}function Ki(e){return e.startsWith("--")?e:Ni(e.split("."))}function kr(e){return/^#|^rgb|^hsl|color-mix\(/.test(e)?"color":/^-?\d+(\.\d+)?(px|rem|em|%|dvh|dvw|vh|vw)$/.test(e)?"dimension":/^-?\d+(\.\d+)?m?s$/.test(e)?"duration":/^-?\d+(\.\d+)?$/.test(e)?"number":/cubic-bezier|linear/.test(e)?"cubicBezier":/shadow|0\s/.test(e)&&e.includes(" ")?"shadow":"string"}function nt(e){return Object.fromEntries(Object.entries(e).map(([t,i])=>[t,{$type:kr(i),$value:i}]))}function $r(e={}){const t=wr(e),i=xr(t.seed??{}),a={...i.cssVars,...cr(t,i)},r={...i,cssVars:a};return{...r,config:t,conditions:t.conditions??{},recipes:t.recipes??{},slotRecipes:t.slotRecipes??{},token:(s,n="")=>a[Ki(s)]??n,tokenVar:(s,n="")=>{const c=Ki(s);return c in a?`var(${c})`:n},cssText:(s=":root")=>Sr(r,s),dtcg:()=>Er(r)}}function Sr(e,t=":root"){const i=Object.entries(e.cssVars).sort(([a],[r])=>a.localeCompare(r)).map(([a,r])=>`  ${a}: ${r};`).join(`
`);return`${t} {
${i}
}`}function Er(e){const t=Object.fromEntries(Object.entries(e.seed).map(([i,a])=>[i,{$type:i==="accent"?"color":"string",$value:a}]));return{$schema:"https://www.designtokens.org/schemas/2025.10/tokens.json",$extensions:{"org.nami.theme":{generatedBy:"@nami-web/tokens",layers:["seed","palette","semantic","component","style","cssVars"]}},seed:t,palette:nt(e.palette),semantic:nt(e.semantic),component:nt(e.component),style:nt(e.style),cssVars:nt(e.cssVars)}}const Jt=class Jt extends f{constructor(){super(),this.appliedThemeVars=new Set,this.systemQuery=null,this.handleSystemThemeChange=()=>{this.theme==="system"&&this.applyTheme()},this.theme="light",this.density="comfortable",this.size="md",this.motion="normal",this.stylePreset="default",this.radius="round",this.contrast="normal",this.accent="",this.inherit=!0,this.config=null}connectedCallback(){super.connectedCallback(),typeof window<"u"&&typeof window.matchMedia=="function"&&(this.systemQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.systemQuery.addEventListener?.("change",this.handleSystemThemeChange))}disconnectedCallback(){this.systemQuery?.removeEventListener?.("change",this.handleSystemThemeChange),super.disconnectedCallback()}updated(){this.applyTheme()}get resolvedThemeMode(){return this.theme!=="system"?this.theme:this.systemQuery?.matches?"dark":"light"}hasRuntimeThemeInput(){return!!(this.config||this.accent||this.hasAttribute("theme")||this.hasAttribute("density")||this.hasAttribute("size")||this.hasAttribute("motion")||this.hasAttribute("style-preset")||this.hasAttribute("radius")||this.hasAttribute("contrast"))}applyTheme(){const t=this.config?.seed??{},i=this.stylePreset==="ant-illustration"?"illustration":this.stylePreset,a=this.hasAttribute("theme")?this.resolvedThemeMode:t.mode??this.resolvedThemeMode,r=this.hasAttribute("style-preset")?i:t.stylePreset??i,s=this.hasAttribute("density")?this.density:t.density??this.density,n=this.hasAttribute("size")?this.size:t.size??this.size,c=this.hasAttribute("motion")?this.motion:t.motion??this.motion,l=this.hasAttribute("radius")?this.radius:t.radius??this.radius,v=this.hasAttribute("contrast")?this.contrast:t.contrast??this.contrast,w={...t,accent:this.accent||t.accent,mode:a,stylePreset:r,density:s,size:n,motion:c,radius:l,contrast:v};if(this.accent?(this.style.setProperty("--nami-theme-accent",this.accent),this.style.setProperty("--nami-accent-50",this.accent)):(this.style.removeProperty("--nami-theme-accent"),this.style.removeProperty("--nami-accent-50")),this.hasRuntimeThemeInput()){const h=$r({...this.config,seed:w}),d=new Set(Object.keys(h.cssVars));for(const k of this.appliedThemeVars)!d.has(k)&&k!=="--nami-theme-accent"&&k!=="--nami-accent-50"&&this.style.removeProperty(k);for(const[k,g]of Object.entries(h.cssVars))this.style.setProperty(k,g);this.appliedThemeVars=d}else{for(const h of this.appliedThemeVars)this.style.removeProperty(h);this.appliedThemeVars.clear()}this.dataset.namiTheme=a,this.dataset.namiThemeRequested=this.theme,this.dataset.namiDensity=s,this.dataset.namiSize=n,this.dataset.namiMotion=c,this.dataset.namiStyle=r,this.dataset.namiRadius=l,this.dataset.namiContrast=v}render(){return o`<slot></slot>`}};Jt.properties={theme:{reflect:!0,useDefault:!0},density:{reflect:!0,useDefault:!0},size:{reflect:!0,useDefault:!0},motion:{reflect:!0,useDefault:!0},stylePreset:{attribute:"style-preset",reflect:!0,useDefault:!0},radius:{reflect:!0,useDefault:!0},contrast:{reflect:!0,useDefault:!0},accent:{reflect:!0,useDefault:!0},inherit:{type:Boolean,reflect:!0},config:{attribute:!1}},Jt.styles=[y,b`
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
    `];let Ze=Jt;const Gt=class Gt extends f{constructor(){super(),this.contentId=St("nami-tooltip"),this.triggerElements=new Set,this.handleTriggerOpen=t=>{this.openTooltip(t)},this.handleTriggerClose=t=>{this.close(t)},this.handleTriggerKeydown=t=>{Di(t)&&this.open&&(t.stopPropagation(),this.close(t))},this.open=!1,this.placement="top",this.disabled=!1}disconnectedCallback(){this.unsyncTriggers(),super.disconnectedCallback()}updated(t){const i=this.open&&!this.disabled,a=this.resolvedPlacement;if(S(this,{state:kt(i),disabled:this.disabled}),this.dataset.placement=a,this.syncTriggerDescriptions(),this.disabled&&this.open){this.close();return}!t.has("open")||t.get("open")===void 0||(this.open?x(this,"nami-open",void 0):t.get("open")===!0&&(x(this,"nami-close",$t(this.closeSourceEvent)),this.closeSourceEvent=void 0))}get resolvedPlacement(){const t=getComputedStyle(this).direction==="rtl"?"rtl":"ltr";return qa(this.placement,t)}openTooltip(t){this.disabled||this.open||(this.open=!0,this.closeSourceEvent=void 0,t.stopPropagation())}close(t){this.open&&(this.closeSourceEvent=t,this.open=!1)}handleTriggerSlotChange(t){const i=t.target;this.unsyncTriggers();const a=i.assignedElements({flatten:!0}).filter(r=>r instanceof HTMLElement);this.triggerElements=new Set(a);for(const r of this.triggerElements)r.addEventListener("mouseenter",this.handleTriggerOpen),r.addEventListener("mouseleave",this.handleTriggerClose),r.addEventListener("focusin",this.handleTriggerOpen),r.addEventListener("focusout",this.handleTriggerClose),r.addEventListener("keydown",this.handleTriggerKeydown);this.syncTriggerDescriptions()}syncTriggerDescriptions(){for(const t of this.triggerElements)this.disabled?t.removeAttribute("aria-describedby"):t.setAttribute("aria-describedby",this.contentId)}unsyncTriggers(){for(const t of this.triggerElements)t.removeEventListener("mouseenter",this.handleTriggerOpen),t.removeEventListener("mouseleave",this.handleTriggerClose),t.removeEventListener("focusin",this.handleTriggerOpen),t.removeEventListener("focusout",this.handleTriggerClose),t.removeEventListener("keydown",this.handleTriggerKeydown),t.removeAttribute("aria-describedby");this.triggerElements.clear()}render(){const t=this.open&&!this.disabled,i=this.resolvedPlacement;return o`
      <span class="trigger" part="trigger"><slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot></span>
      <span
        id=${this.contentId}
        class="content"
        part="base content"
        role="tooltip"
        data-placement=${i}
        aria-hidden=${t?"false":"true"}
        ?hidden=${!t}
      >
        <slot name="content">${p}</slot>
      </span>
    `}};Gt.properties={open:{type:Boolean,reflect:!0},placement:{reflect:!0},disabled:{type:Boolean,reflect:!0}},Gt.styles=[y,b`
      :host {
        display: inline-block;
        position: relative;
      }

      .trigger {
        display: contents;
      }

      .content {
        background: var(--nami-tooltip-bg, var(--nami-text));
        border: var(--nami-tooltip-border-width, 0) solid var(--nami-tooltip-border-color, transparent);
        border-radius: var(--nami-tooltip-radius, var(--nami-radius-tight, 4px));
        box-shadow: var(--nami-tooltip-shadow, 0 8px 24px color-mix(in oklab, var(--nami-shadow-color, #000), transparent 72%));
        color: var(--nami-tooltip-fg, var(--nami-text-inverse));
        font-size: var(--nami-tooltip-font-size, 0.75rem);
        inset: auto auto auto 50%;
        line-height: 1.35;
        max-inline-size: min(240px, calc(100vw - 32px));
        padding: var(--nami-tooltip-padding-y, 6px) var(--nami-tooltip-padding-x, 8px);
        pointer-events: none;
        position: absolute;
        white-space: normal;
        width: max-content;
        z-index: var(--nami-tooltip-z-index, 80);
      }

      .content[hidden] {
        display: none;
      }

      .content[data-placement='top'] {
        bottom: calc(100% + var(--nami-tooltip-offset, 8px));
        left: 50%;
        transform: translateX(-50%);
      }

      .content[data-placement='bottom'] {
        left: 50%;
        top: calc(100% + var(--nami-tooltip-offset, 8px));
        transform: translateX(-50%);
      }

      .content[data-placement='left'] {
        right: calc(100% + var(--nami-tooltip-offset, 8px));
        top: 50%;
        transform: translateY(-50%);
      }

      .content[data-placement='right'] {
        left: calc(100% + var(--nami-tooltip-offset, 8px));
        top: 50%;
        transform: translateY(-50%);
      }
    `];let Je=Gt;const te=class te extends f{constructor(){super(),this.timer=0,O(this),this.open=!1,this.message="",this.variant="neutral",this.placement="top",this.duration=3200}static show(t){const i=document.createElement("nami-toast");return i.message=t.message,i.variant=t.variant??"neutral",i.placement=t.placement??"top",i.duration=t.duration??3200,document.body.append(i),requestAnimationFrame(()=>{i.open=!0}),i}updated(t){this.dataset.state=kt(this.open),t.has("open")&&(this.open?(x(this,"nami-open",void 0),window.clearTimeout(this.timer),this.duration>0&&(this.timer=window.setTimeout(()=>this.close(),this.duration))):t.get("open")===!0&&(window.clearTimeout(this.timer),x(this,"nami-close",$t(this.closeSourceEvent)),this.closeSourceEvent=void 0))}disconnectedCallback(){window.clearTimeout(this.timer),super.disconnectedCallback()}close(t){this.open&&(this.closeSourceEvent=t,this.open=!1,window.setTimeout(()=>this.remove(),180))}render(){return o`
      <div class="base" part="base" role="status" aria-live="polite">
        <span class="indicator" part="indicator"><slot name="icon">${this.variant==="neutral"?p:o`<span aria-hidden="true">*</span>`}</slot></span>
        <span part="label"><slot>${this.message}</slot></span>
        <button type="button" part="actions" aria-label=${T("Close",{id:"nami.toast.close"})} @click=${t=>this.close(t)}>X</button>
      </div>
    `}};te.properties={open:{type:Boolean,reflect:!0},message:{},variant:{reflect:!0},placement:{reflect:!0},duration:{type:Number}},te.styles=[y,b`
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
    `];let Ge=te;const ee=class ee extends f{constructor(){super(),this.enterTimer=0,this.hideTimer=0,this.shownAt=0,O(this),this.active=!1,this.appear=!0,this.appearDuration=360,this.duration=220,this.effect="flow",this.entering=!1,this.height=4,this.label="",this.progress=void 0,this.variant="fixed",this.visible=!1}connectedCallback(){super.connectedCallback(),this.active&&(this.visible=!0,this.shownAt=Date.now(),this.beginEnter())}disconnectedCallback(){window.clearTimeout(this.enterTimer),window.clearTimeout(this.hideTimer),this.hideResolver?.(),super.disconnectedCallback()}updated(t){if(S(this,{state:xe(this.active),loading:this.active}),t.has("progress")&&this.syncProgressStyle(),t.has("appear")&&!this.appear&&(window.clearTimeout(this.enterTimer),this.entering=!1),t.has("appearDuration")&&this.syncAppearDurationStyle(),t.has("height")&&this.syncHeightStyle(),t.has("duration")&&this.syncDurationStyle(),!t.has("active"))return;if(window.clearTimeout(this.hideTimer),this.active){this.hideResolver?.(),this.hideComplete=void 0,this.visible=!0,this.shownAt=Date.now(),this.beginEnter();return}window.clearTimeout(this.enterTimer),this.entering=!1;const i=Date.now()-this.shownAt,a=Math.max(0,Number(this.duration)-i);this.hideComplete=new Promise(r=>{this.hideResolver=r}),this.hideTimer=window.setTimeout(()=>{this.active||(this.visible=!1),this.hideResolver?.(),this.hideResolver=void 0},a)}show(t={}){const i=!this.visible;this.applyOptions(t),this.visible=!0,this.shownAt=Date.now(),this.active=!0,i&&this.beginEnter()}start(t={}){this.show(t)}set(t){this.progress=t??void 0}async finish(t={}){this.applyOptions({...t,progress:t.progress??100}),this.active=!0,await this.updateComplete,await new Promise(i=>window.setTimeout(i,Number(t.minDuration??this.duration))),await this.hide({...t,progress:null})}async hide(t={}){this.applyOptions(t),this.active=!1,await this.updateComplete,this.hideComplete&&await this.hideComplete}async waitFor(t,i={}){const a=i.minDuration??this.duration,r=Date.now();this.show(i);try{return await(typeof t=="function"?t():t)}finally{const s=Math.max(0,Number(a)-(Date.now()-r));s>0&&await new Promise(n=>window.setTimeout(n,s)),await this.finish(i)}}applyOptions(t){t.appear!==void 0&&(this.appear=t.appear),t.appearDuration!==void 0&&(this.appearDuration=t.appearDuration),t.duration!==void 0&&(this.duration=t.duration),t.effect&&(this.effect=t.effect),t.height!==void 0&&(this.height=t.height),t.label!==void 0&&(this.label=t.label),t.variant&&(this.variant=t.variant),t.progress!==void 0&&this.set(t.progress)}beginEnter(){if(window.clearTimeout(this.enterTimer),!this.appear){this.entering=!1;return}this.entering=!0;const t=Number.isFinite(Number(this.appearDuration))?Math.max(0,Number(this.appearDuration)):360;this.enterTimer=window.setTimeout(()=>{this.entering=!1},t+40)}syncProgressStyle(){if(this.progress===void 0||this.progress===null||Number.isNaN(Number(this.progress))){this.style.removeProperty("--nami-top-progress-value");return}const t=Math.min(100,Math.max(0,Number(this.progress)));this.style.setProperty("--nami-top-progress-value",`${t}%`)}syncHeightStyle(){if(!Number.isFinite(Number(this.height))||Number(this.height)<=0){this.style.removeProperty("--nami-top-progress-height");return}this.style.setProperty("--nami-top-progress-height",`${Number(this.height)}px`)}syncAppearDurationStyle(){if(!Number.isFinite(Number(this.appearDuration))||Number(this.appearDuration)<0){this.style.removeProperty("--nami-top-progress-appear-duration");return}this.style.setProperty("--nami-top-progress-appear-duration",`${Number(this.appearDuration)}ms`)}syncDurationStyle(){if(!Number.isFinite(Number(this.duration))||Number(this.duration)<0){this.style.removeProperty("--nami-top-progress-duration");return}this.style.setProperty("--nami-top-progress-duration",`${Number(this.duration)}ms`)}get fallbackLabel(){return this.label||T("Navigating",{id:"nami.topProgress.navigating"})}render(){if(!this.visible)return p;const t=this.progress!==void 0&&this.progress!==null&&!Number.isNaN(Number(this.progress));return o`
      <div class="base" part="base">
        <span
          class="track"
          part="track"
          role="progressbar"
          aria-label=${this.fallbackLabel}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${t?String(Math.round(Number(this.progress))):p}
        >
          <span class="indicator" part="indicator"></span>
        </span>
      </div>
    `}};ee.properties={active:{type:Boolean,reflect:!0},appear:{converter:{fromAttribute:t=>t!==null&&t!=="false"&&t!=="0"&&t!=="none",toAttribute:t=>t?"true":"false"},reflect:!0},appearDuration:{type:Number,attribute:"appear-duration",reflect:!0},duration:{type:Number,reflect:!0},effect:{reflect:!0},entering:{type:Boolean,reflect:!0},height:{type:Number,reflect:!0},label:{},progress:{type:Number,reflect:!0},variant:{reflect:!0},visible:{state:!0}},ee.styles=[y,b`
      :host {
        --top-progress-height: var(--nami-top-progress-height, var(--nami-transition-progress-height, 4px));
        --top-progress-duration: var(--nami-top-progress-duration, 220ms);
        --top-progress-ease: var(--nami-top-progress-ease, var(--nami-ease-standard, cubic-bezier(0.19, 1, 0.22, 1)));
        --top-progress-appear-duration: var(--nami-top-progress-appear-duration, 360ms);
        --top-progress-appear-ease: var(
          --nami-top-progress-appear-ease,
          var(--nami-ease-emphasized, cubic-bezier(0.16, 1, 0.3, 1))
        );
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

      :host([entering]) .track {
        animation: nami-top-progress-appear-track var(--top-progress-appear-duration) var(--top-progress-appear-ease) both;
        transform-origin: left top;
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

      :host([entering][progress]) .indicator {
        animation: nami-top-progress-appear-indicator var(--top-progress-appear-duration) var(--top-progress-appear-ease)
          both;
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

      @keyframes nami-top-progress-appear-track {
        0% {
          opacity: 0;
          transform: translateX(-10px) scaleX(0.08) scaleY(1);
        }

        42% {
          opacity: 1;
        }

        100% {
          opacity: 1;
          transform: translateX(0) scaleX(1) scaleY(1);
        }
      }

      @keyframes nami-top-progress-appear-indicator {
        0% {
          filter: brightness(1.08) saturate(1.08);
          transform: scaleX(0.08);
        }

        100% {
          filter: brightness(1) saturate(1);
          transform: scaleX(1);
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

        .track,
        .indicator,
        .indicator::after {
          animation-duration: 1ms;
          animation-iteration-count: 1;
        }
      }
    `];let ti=ee;const ie=class ie extends f{constructor(){super(),this.variant="neutral",this.title="",this.closable=!1}updated(){this.dataset.state=this.variant}close(t){x(this,"nami-close",{sourceEvent:t},{cancelable:!0})&&this.remove()}render(){const t=this.variant==="danger"||this.variant==="warning"?"alert":"status";return o`
      <section class="base" part="base" role=${t}>
        <span class="indicator" part="indicator"><slot name="icon">${this.variant==="neutral"?"i":"!"}</slot></span>
        <div>
          ${this.title?o`<h3 part="label"><slot name="title">${this.title}</slot></h3>`:o`<slot name="title"></slot>`}
          <div class="body" part="description"><slot></slot></div>
        </div>
        <div class="actions" part="actions">
          <slot name="actions"></slot>
          ${this.closable?o`<button type="button" aria-label="Close" @click=${this.close}>${"×"}</button>`:p}
        </div>
      </section>
    `}};ie.properties={variant:{reflect:!0},title:{},closable:{type:Boolean,reflect:!0}},ie.styles=[y,b`
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
    `];let ei=ie;const ae=class ae extends f{constructor(){super(),this.orientation="horizontal",this.hasLabel=!1}updated(){S(this,{state:this.orientation}),this.toggleAttribute("data-has-label",this.hasLabel)}handleSlotChange(t){const i=t.target;this.hasLabel=i.assignedNodes({flatten:!0}).some(a=>a.nodeType===Node.ELEMENT_NODE||!!a.textContent?.trim())}render(){const t=this.orientation==="vertical"?"vertical":"horizontal";return o`
      <div class="base" part="base" role="separator" aria-orientation=${t}>
        <span class="line" part="line"></span>
        <span class="label" part="label"><slot @slotchange=${this.handleSlotChange}></slot></span>
        ${this.hasLabel?o`<span class="line" part="line"></span>`:p}
      </div>
    `}};ae.properties={orientation:{reflect:!0},hasLabel:{state:!0}},ae.styles=[y,b`
      :host {
        display: block;
      }

      .base {
        align-items: center;
        color: var(--nami-divider-label-color, var(--nami-text-muted));
        display: flex;
        gap: var(--nami-divider-gap, var(--nami-space-3, 10px));
        inline-size: 100%;
      }

      .line {
        background: var(--nami-divider-color, var(--nami-border));
        block-size: var(--nami-divider-thickness, var(--nami-style-stroke-width, 1px));
        flex: 1 1 auto;
      }

      .label {
        color: inherit;
        flex: 0 0 auto;
        font-size: 0.8125rem;
        line-height: 1.4;
      }

      :host(:not([data-has-label])) .label,
      :host(:not([data-has-label])) .line + .line {
        display: none;
      }

      :host([orientation='vertical']) {
        display: inline-block;
        min-block-size: 1em;
      }

      :host([orientation='vertical']) .base {
        block-size: 100%;
        flex-direction: column;
        inline-size: auto;
        min-block-size: inherit;
      }

      :host([orientation='vertical']) .line {
        block-size: auto;
        inline-size: var(--nami-divider-thickness, var(--nami-style-stroke-width, 1px));
        min-block-size: var(--nami-divider-min-size, 2rem);
      }
    `];let ii=ae;function Qi(){m("nami-theme",Ze),m("nami-config",ze),m("nami-spinner",K),m("nami-page-transition",Fe),m("nami-top-progress",ti),m("nami-scroll-smoother",je),m("nami-illustration",st),m("nami-empty",Me),m("nami-result",He),m("nami-card",ke),m("nami-badge",me),m("nami-button",we),m("nami-icon-button",Oe),m("nami-chip",$e),m("nami-input",Re),m("nami-switch",We),m("nami-radio-item",Ve),m("nami-radio-group",Ie),m("nami-radio-card",Be),m("nami-tab-bar",Ye),m("nami-dialog",Te),m("nami-drawer",Le),m("nami-tooltip",Je),m("nami-toast",Ge),m("nami-app-shell",pe),m("nami-container",Ae),m("nami-stack",Ne),m("nami-cluster",Ee),m("nami-grid",Pe),m("nami-split",Ue),m("nami-divider",ii),m("nami-checkbox",Se),m("nami-textarea",Ke),m("nami-form-field",_e),m("nami-alert",ei),m("nami-skeleton",qe),m("nami-progress",De)}Qi();const zr=Object.freeze(Object.defineProperty({__proto__:null,templates:{"nami.empty.aria":"空状态","nami.empty.description":"暂无数据","nami.pageTransition.preparing":"正在准备界面","nami.result.aria":"结果","nami.spinner.loading":"加载中","nami.toast.close":"关闭","nami.topProgress.navigating":"正在切换页面"}},Symbol.toStringTag,{value:"Module"}));return re.registerNamiElements=Qi,Object.defineProperty(re,Symbol.toStringTag,{value:"Module"}),re})({});
