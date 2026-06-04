var NamiUI=(function(fi){"use strict";const he=globalThis,gi=he.ShadowRoot&&(he.ShadyCSS===void 0||he.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,vi=Symbol(),rr=new WeakMap;let nr=class{constructor(t,i,a){if(this._$cssResult$=!0,a!==vi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(gi&&t===void 0){const a=i!==void 0&&i.length===1;a&&(t=rr.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),a&&rr.set(i,t))}return t}toString(){return this.cssText}};const qs=e=>new nr(typeof e=="string"?e:e+"",void 0,vi),E=(e,...t)=>{const i=e.length===1?e[0]:t.reduce((a,r,n)=>a+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[n+1],e[0]);return new nr(i,e,vi)},Ys=(e,t)=>{if(gi)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of t){const a=document.createElement("style"),r=he.litNonce;r!==void 0&&a.setAttribute("nonce",r),a.textContent=i.cssText,e.appendChild(a)}},sr=gi?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const a of t.cssRules)i+=a.cssText;return qs(i)})(e):e;const{is:Gs,defineProperty:Zs,getOwnPropertyDescriptor:Qs,getOwnPropertyNames:Js,getOwnPropertySymbols:to,getPrototypeOf:eo}=Object,ue=globalThis,or=ue.trustedTypes,io=or?or.emptyScript:"",ao=ue.reactiveElementPolyfillSupport,jt=(e,t)=>e,bi={toAttribute(e,t){switch(t){case Boolean:e=e?io:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},lr=(e,t)=>!Gs(e,t),cr={attribute:!0,type:String,converter:bi,reflect:!1,useDefault:!1,hasChanged:lr};Symbol.metadata??=Symbol("metadata"),ue.litPropertyMetadata??=new WeakMap;let kt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=cr){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const a=Symbol(),r=this.getPropertyDescriptor(t,a,i);r!==void 0&&Zs(this.prototype,t,r)}}static getPropertyDescriptor(t,i,a){const{get:r,set:n}=Qs(this.prototype,t)??{get(){return this[i]},set(s){this[i]=s}};return{get:r,set(s){const o=r?.call(this);n?.call(this,s),this.requestUpdate(t,o,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??cr}static _$Ei(){if(this.hasOwnProperty(jt("elementProperties")))return;const t=eo(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(jt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(jt("properties"))){const i=this.properties,a=[...Js(i),...to(i)];for(const r of a)this.createProperty(r,i[r])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[a,r]of i)this.elementProperties.set(a,r)}this._$Eh=new Map;for(const[i,a]of this.elementProperties){const r=this._$Eu(i,a);r!==void 0&&this._$Eh.set(r,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const a=new Set(t.flat(1/0).reverse());for(const r of a)i.unshift(sr(r))}else t!==void 0&&i.push(sr(t));return i}static _$Eu(t,i){const a=i.attribute;return a===!1?void 0:typeof a=="string"?a:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const a of i.keys())this.hasOwnProperty(a)&&(t.set(a,this[a]),delete this[a]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ys(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,a){this._$AK(t,a)}_$ET(t,i){const a=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,a);if(r!==void 0&&a.reflect===!0){const n=(a.converter?.toAttribute!==void 0?a.converter:bi).toAttribute(i,a.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,i){const a=this.constructor,r=a._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const n=a.getPropertyOptions(r),s=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:bi;this._$Em=r;const o=s.fromAttribute(i,n.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,i,a,r=!1,n){if(t!==void 0){const s=this.constructor;if(r===!1&&(n=this[t]),a??=s.getPropertyOptions(t),!((a.hasChanged??lr)(n,i)||a.useDefault&&a.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,a))))return;this.C(t,i,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:a,reflect:r,wrapped:n},s){a&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??i??this[t]),n!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||a||(i=void 0),this._$AL.set(t,i)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[r,n]of a){const{wrapped:s}=n,o=this[r];s!==!0||this._$AL.has(r)||o===void 0||this.C(r,void 0,n,o)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(i)):this._$EM()}catch(a){throw t=!1,this._$EM(),a}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(i=>this._$ET(i,this[i])),this._$EM()}updated(t){}firstUpdated(t){}};kt.elementStyles=[],kt.shadowRootOptions={mode:"open"},kt[jt("elementProperties")]=new Map,kt[jt("finalized")]=new Map,ao?.({ReactiveElement:kt}),(ue.reactiveElementVersions??=[]).push("2.1.2");const yi=globalThis,dr=e=>e,me=yi.trustedTypes,hr=me?me.createPolicy("lit-html",{createHTML:e=>e}):void 0,ur="$lit$",st=`lit$${Math.random().toFixed(9).slice(2)}$`,mr="?"+st,ro=`<${mr}>`,pt=document,Ht=()=>pt.createComment(""),Wt=e=>e===null||typeof e!="object"&&typeof e!="function",xi=Array.isArray,no=e=>xi(e)||typeof e?.[Symbol.iterator]=="function",wi=`[ 	
\f\r]`,Kt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pr=/-->/g,fr=/>/g,ft=RegExp(`>|${wi}(?:([^\\s"'>=/]+)(${wi}*=${wi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gr=/'/g,vr=/"/g,br=/^(?:script|style|textarea|title)$/i,so=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),p=so(1),$t=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),yr=new WeakMap,gt=pt.createTreeWalker(pt,129);function xr(e,t){if(!xi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return hr!==void 0?hr.createHTML(t):t}const oo=(e,t)=>{const i=e.length-1,a=[];let r,n=t===2?"<svg>":t===3?"<math>":"",s=Kt;for(let o=0;o<i;o++){const l=e[o];let h,c,d=-1,u=0;for(;u<l.length&&(s.lastIndex=u,c=s.exec(l),c!==null);)u=s.lastIndex,s===Kt?c[1]==="!--"?s=pr:c[1]!==void 0?s=fr:c[2]!==void 0?(br.test(c[2])&&(r=RegExp("</"+c[2],"g")),s=ft):c[3]!==void 0&&(s=ft):s===ft?c[0]===">"?(s=r??Kt,d=-1):c[1]===void 0?d=-2:(d=s.lastIndex-c[2].length,h=c[1],s=c[3]===void 0?ft:c[3]==='"'?vr:gr):s===vr||s===gr?s=ft:s===pr||s===fr?s=Kt:(s=ft,r=void 0);const m=s===ft&&e[o+1].startsWith("/>")?" ":"";n+=s===Kt?l+ro:d>=0?(a.push(h),l.slice(0,d)+ur+l.slice(d)+st+m):l+st+(d===-2?o:m)}return[xr(e,n+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),a]};class Ut{constructor({strings:t,_$litType$:i},a){let r;this.parts=[];let n=0,s=0;const o=t.length-1,l=this.parts,[h,c]=oo(t,i);if(this.el=Ut.createElement(h,a),gt.currentNode=this.el.content,i===2||i===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=gt.nextNode())!==null&&l.length<o;){if(r.nodeType===1){if(r.hasAttributes())for(const d of r.getAttributeNames())if(d.endsWith(ur)){const u=c[s++],m=r.getAttribute(d).split(st),g=/([.?@])?(.*)/.exec(u);l.push({type:1,index:n,name:g[2],strings:m,ctor:g[1]==="."?co:g[1]==="?"?ho:g[1]==="@"?uo:pe}),r.removeAttribute(d)}else d.startsWith(st)&&(l.push({type:6,index:n}),r.removeAttribute(d));if(br.test(r.tagName)){const d=r.textContent.split(st),u=d.length-1;if(u>0){r.textContent=me?me.emptyScript:"";for(let m=0;m<u;m++)r.append(d[m],Ht()),gt.nextNode(),l.push({type:2,index:++n});r.append(d[u],Ht())}}}else if(r.nodeType===8)if(r.data===mr)l.push({type:2,index:n});else{let d=-1;for(;(d=r.data.indexOf(st,d+1))!==-1;)l.push({type:7,index:n}),d+=st.length-1}n++}}static createElement(t,i){const a=pt.createElement("template");return a.innerHTML=t,a}}function At(e,t,i=e,a){if(t===$t)return t;let r=a!==void 0?i._$Co?.[a]:i._$Cl;const n=Wt(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(e),r._$AT(e,i,a)),a!==void 0?(i._$Co??=[])[a]=r:i._$Cl=r),r!==void 0&&(t=At(e,r._$AS(e,t.values),r,a)),t}class lo{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:a}=this._$AD,r=(t?.creationScope??pt).importNode(i,!0);gt.currentNode=r;let n=gt.nextNode(),s=0,o=0,l=a[0];for(;l!==void 0;){if(s===l.index){let h;l.type===2?h=new Xt(n,n.nextSibling,this,t):l.type===1?h=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(h=new mo(n,this,t)),this._$AV.push(h),l=a[++o]}s!==l?.index&&(n=gt.nextNode(),s++)}return gt.currentNode=pt,r}p(t){let i=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(t,a,i),i+=a.strings.length-2):a._$AI(t[i])),i++}}class Xt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,a,r){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=a,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=At(this,t,i),Wt(t)?t===A||t==null||t===""?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==$t&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):no(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&Wt(this._$AH)?this._$AA.nextSibling.data=t:this.T(pt.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:a}=t,r=typeof a=="number"?this._$AC(t):(a.el===void 0&&(a.el=Ut.createElement(xr(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===r)this._$AH.p(i);else{const n=new lo(r,this),s=n.u(this.options);n.p(i),this.T(s),this._$AH=n}}_$AC(t){let i=yr.get(t.strings);return i===void 0&&yr.set(t.strings,i=new Ut(t)),i}k(t){xi(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let a,r=0;for(const n of t)r===i.length?i.push(a=new Xt(this.O(Ht()),this.O(Ht()),this,this.options)):a=i[r],a._$AI(n),r++;r<i.length&&(this._$AR(a&&a._$AB.nextSibling,r),i.length=r)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const a=dr(t).nextSibling;dr(t).remove(),t=a}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class pe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,a,r,n){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=r,this.options=n,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=A}_$AI(t,i=this,a,r){const n=this.strings;let s=!1;if(n===void 0)t=At(this,t,i,0),s=!Wt(t)||t!==this._$AH&&t!==$t,s&&(this._$AH=t);else{const o=t;let l,h;for(t=n[0],l=0;l<n.length-1;l++)h=At(this,o[a+l],i,l),h===$t&&(h=this._$AH[l]),s||=!Wt(h)||h!==this._$AH[l],h===A?t=A:t!==A&&(t+=(h??"")+n[l+1]),this._$AH[l]=h}s&&!r&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class co extends pe{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}class ho extends pe{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}}class uo extends pe{constructor(t,i,a,r,n){super(t,i,a,r,n),this.type=5}_$AI(t,i=this){if((t=At(this,t,i,0)??A)===$t)return;const a=this._$AH,r=t===A&&a!==A||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,n=t!==A&&(a===A||r);r&&this.element.removeEventListener(this.name,this,a),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class mo{constructor(t,i,a){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(t){At(this,t)}}const po=yi.litHtmlPolyfillSupport;po?.(Ut,Xt),(yi.litHtmlVersions??=[]).push("3.3.3");const fo=(e,t,i)=>{const a=i?.renderBefore??t;let r=a._$litPart$;if(r===void 0){const n=i?.renderBefore??null;a._$litPart$=r=new Xt(t.insertBefore(Ht(),n),n,void 0,i??{})}return r._$AI(e),r};const ki=globalThis;class $ extends kt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=fo(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $t}}$._$litElement$=!0,$.finalized=!0,ki.litElementHydrateSupport?.({LitElement:$});const go=ki.litElementPolyfillSupport;go?.({LitElement:$}),(ki.litElementVersions??=[]).push("4.2.2");const M=E`
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
`,vo=E`
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
`,Fe=class Fe extends ${constructor(){super(),this.railWidth="",this.mobileBarHeight="",this.breakpoint="compact",this.sticky=!0,this.safeArea=!1}updated(){this.railWidth?this.style.setProperty("--nami-app-shell-rail-width",this.normalizeLength(this.railWidth)):this.style.removeProperty("--nami-app-shell-rail-width"),this.mobileBarHeight?this.style.setProperty("--nami-app-shell-mobile-bar-height",this.normalizeLength(this.mobileBarHeight)):this.style.removeProperty("--nami-app-shell-mobile-bar-height")}normalizeLength(t){return/^\d+(\.\d+)?$/.test(t)?`${t}px`:t}render(){return p`
      <div class="shell" part="base">
        <aside class="rail" part="rail"><slot name="rail"></slot></aside>
        <header class="top" part="top"><slot name="top"></slot></header>
        <main part="control"><slot></slot></main>
        <nav class="bottom" part="bottom"><slot name="bottom"></slot></nav>
      </div>
    `}};Fe.properties={railWidth:{attribute:"rail-width"},mobileBarHeight:{attribute:"mobile-bar-height"},breakpoint:{reflect:!0},sticky:{type:Boolean,reflect:!0},safeArea:{attribute:"safe-area",type:Boolean,reflect:!0}},Fe.styles=[M,E`
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
    `];let $i=Fe;const Ie=class Ie extends ${constructor(){super(),this.variant="neutral",this.tone="soft"}render(){return p`<span class="base" part="base"><slot></slot></span>`}};Ie.properties={variant:{reflect:!0},tone:{reflect:!0}},Ie.styles=[M,E`
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
    `];let Ai=Ie;const Si="lit-localize-status";const bo=e=>typeof e!="string"&&"strTag"in e,wr=(e,t,i)=>{let a=e[0];for(let r=1;r<e.length;r++)a+=t[i?i[r-1]:r-1],a+=e[r];return a};const kr=(e=>bo(e)?wr(e.strings,e.values):e);let Q=kr,$r=!1;function yo(e){if($r)throw new Error("lit-localize can only be configured once");Q=e,$r=!0}class xo{constructor(t){this.__litLocalizeEventHandler=i=>{i.detail.status==="ready"&&this.host.requestUpdate()},this.host=t}hostConnected(){window.addEventListener(Si,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(Si,this.__litLocalizeEventHandler)}}const ot=e=>e.addController(new xo(e));class Ar{constructor(){this.settled=!1,this.promise=new Promise((t,i)=>{this._resolve=t,this._reject=i})}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}const J=[];for(let e=0;e<256;e++)J[e]=(e>>4&15).toString(16)+(e&15).toString(16);function wo(e){let t=0,i=8997,a=0,r=33826,n=0,s=40164,o=0,l=52210;for(let h=0;h<e.length;h++)i^=e.charCodeAt(h),t=i*435,a=r*435,n=s*435,o=l*435,n+=i<<8,o+=r<<8,a+=t>>>16,i=t&65535,n+=a>>>16,r=a&65535,l=o+(n>>>16)&65535,s=n&65535;return J[l>>8]+J[l&255]+J[s>>8]+J[s&255]+J[r>>8]+J[r&255]+J[i>>8]+J[i&255]}const ko="",$o="h",Ao="s";function So(e,t){return(t?$o:Ao)+wo(typeof e=="string"?e:e.join(ko))}const Sr=new WeakMap,Tr=new Map;function To(e,t,i){if(e){const a=i?.id??Eo(t),r=e[a];if(r){if(typeof r=="string")return r;if("strTag"in r)return wr(r.strings,t.values,r.values);{let n=Sr.get(r);return n===void 0&&(n=r.values,Sr.set(r,n)),{...r,values:n.map(s=>t.values[s])}}}}return kr(t)}function Eo(e){const t=typeof e=="string"?e:e.strings;let i=Tr.get(t);return i===void 0&&(i=So(t,typeof e!="string"&&!("strTag"in e)),Tr.set(t,i)),i}function Ti(e){window.dispatchEvent(new CustomEvent(Si,{detail:e}))}let fe="",Ei,Er,ge,Mi,Mr,vt=new Ar;vt.resolve();let ve=0;const Mo=e=>(yo(((t,i)=>To(Mr,t,i))),fe=Er=e.sourceLocale,ge=new Set(e.targetLocales),ge.add(e.sourceLocale),Mi=e.loadLocale,{getLocale:Co,setLocale:Vo}),Co=()=>fe,Vo=e=>{if(e===(Ei??fe))return vt.promise;if(!ge||!Mi)throw new Error("Internal error");if(!ge.has(e))throw new Error("Invalid locale code");ve++;const t=ve;return Ei=e,vt.settled&&(vt=new Ar),Ti({status:"loading",loadingLocale:e}),(e===Er?Promise.resolve({templates:void 0}):Mi(e)).then(a=>{ve===t&&(fe=e,Ei=void 0,Mr=a.templates,Ti({status:"ready",readyLocale:e}),vt.resolve())},a=>{ve===t&&(Ti({status:"error",errorLocale:e,errorMessage:a.toString()}),vt.reject(a))}),vt.promise};function P(e,t,i,a={}){return e.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,...a,detail:i}))}function k(e,t){customElements.get(e)||customElements.define(e,t)}const _e=class _e extends ${constructor(){super(),ot(this),this.label=""}render(){return p`<span class="indicator" part="base indicator" role="status" aria-label=${this.label||Q("Loading",{id:"nami.spinner.loading"})}></span>`}};_e.properties={size:{reflect:!0},label:{}},_e.styles=[M,E`
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
    `];let St=_e;k("nami-spinner",St);const Le=class Le extends ${constructor(){super(),ot(this),this.variant="solid",this.disabled=!1,this.loading=!1,this.type="button"}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}if(!P(this,"nami-click",{sourceEvent:t},{cancelable:!0})){t.preventDefault();return}this.runFormAction()}runFormAction(){const t=this.closest("form");t&&(this.type==="submit"?t.requestSubmit():this.type==="reset"&&t.reset())}render(){return p`
      <button
        part="base control"
        type=${this.type}
        ?disabled=${this.disabled||this.loading}
        aria-busy=${this.loading?"true":"false"}
        @click=${this.handleClick}
      >
        ${this.loading?p`<nami-spinner size="sm" label=${Q("Loading",{id:"nami.spinner.loading"})} part="indicator"></nami-spinner>`:p`<slot name="icon" part="icon"></slot>`}
        <span part="label"><slot></slot></span>
        ${this.loading?A:p`<slot name="actions"></slot>`}
      </button>
    `}};Le.properties={variant:{reflect:!0},size:{reflect:!0},disabled:{type:Boolean,reflect:!0},loading:{type:Boolean,reflect:!0},type:{}},Le.styles=[M,E`
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
    `];let Ci=Le;const je=class je extends ${constructor(){super(),this.variant="surface"}syncSlotState(t){const i=t.currentTarget,a=i.name||"default",r=i.assignedNodes({flatten:!0}).some(n=>n.nodeType!==Node.TEXT_NODE||n.textContent?.trim());a==="header"&&this.toggleAttribute("has-header",r),a==="actions"&&this.toggleAttribute("has-actions",r),a==="footer"&&this.toggleAttribute("has-footer",r)}render(){return p`
      <article class="base" part="base">
        <header part="header"><slot name="header" @slotchange=${this.syncSlotState}></slot></header>
        <section class="body" part="body"><slot></slot></section>
        <div class="actions" part="actions"><slot name="actions" @slotchange=${this.syncSlotState}></slot></div>
        <footer part="footer"><slot name="footer" @slotchange=${this.syncSlotState}></slot></footer>
      </article>
    `}};je.properties={variant:{reflect:!0}},je.styles=[M,E`
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
    `];let Vi=je;const He=class He extends ${constructor(){super(),this.value="",this.selected=!1,this.checkbox=!1,this.disabled=!1}handleClick(t){this.disabled||(this.checkbox&&(this.selected=!this.selected),P(this,"nami-change",{selected:this.selected,value:this.value,sourceEvent:t}),P(this,"nami-select",{selected:this.selected,value:this.value,sourceEvent:t}))}render(){return p`
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
    `}};He.properties={value:{},selected:{type:Boolean,reflect:!0},checkbox:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}},He.styles=[M,E`
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
    `];let zi=He;function be(e){try{return e.attachInternals()}catch{return null}}function ye(e,t){typeof e?.setFormValue=="function"&&e.setFormValue(t)}function Pi(e,t,i,a){typeof e?.setValidity=="function"&&e.setValidity(t,i,a)}const ne=class ne extends ${constructor(){super(),this.internals=be(this),this.name="",this.value="on",this.checked=!1,this.defaultChecked=!1,this.disabled=!1,this.required=!1,this.error=""}updated(){this.dataset.state=this.checked?"checked":"unchecked",this.toggleAttribute("data-disabled",this.disabled),this.toggleAttribute("data-invalid",!!(this.error||this.required&&!this.checked)),ye(this.internals,!this.disabled&&this.checked?this.value:null),Pi(this.internals,this.validityFlags,this.validationMessage||void 0)}formResetCallback(){this.checked=this.defaultChecked}checkValidity(){return Object.keys(this.validityFlags).length===0}reportValidity(){return this.checkValidity()}get validationMessage(){return this.disabled?"":this.error?this.error:this.required&&!this.checked?"This field is required":""}get validityFlags(){return this.disabled?{}:this.error?{customError:!0}:this.required&&!this.checked?{valueMissing:!0}:{}}toggle(t){this.disabled||(this.checked=!this.checked,P(this,"nami-change",{checked:this.checked,value:this.value,sourceEvent:t}))}render(){return p`
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
    `}};ne.formAssociated=!0,ne.properties={name:{},value:{},checked:{type:Boolean,reflect:!0},defaultChecked:{attribute:"default-checked",type:Boolean},disabled:{type:Boolean,reflect:!0},required:{type:Boolean,reflect:!0},error:{reflect:!0,useDefault:!0}},ne.styles=[M,E`
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
    `];let Di=ne;const We=class We extends ${constructor(){super(),this.gap="sm",this.align="",this.justify=""}updated(){this.align?this.style.setProperty("--nami-cluster-align",this.align):this.style.removeProperty("--nami-cluster-align"),this.justify?this.style.setProperty("--nami-cluster-justify",this.justify):this.style.removeProperty("--nami-cluster-justify")}render(){return p`<div class="base" part="base"><slot></slot></div>`}};We.properties={gap:{reflect:!0},align:{reflect:!0},justify:{reflect:!0}},We.styles=[M,E`
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
    `];let Oi=We;const Cr="en-US",zo=["zh-CN"],Po=["en-US","zh-CN"],Do={"zh-CN":()=>Promise.resolve().then(()=>Kh)},Oo=globalThis,Vr=Oo.__namiLocalization??=Mo({sourceLocale:Cr,targetLocales:zo,loadLocale:e=>Do[e]()}),zr=Vr.getLocale;function Ro(e){return Po.includes(e)}function Pr(e){return e&&Ro(e)?e:Cr}function Bo(e){return Vr.setLocale(Pr(e))}const Ke=class Ke extends ${constructor(){super(),this.lastAppliedLocale="",this.handleLocaleStatus=t=>{P(this,"nami-locale-status",t.detail)},this.locale="en-US",this.dir="ltr"}connectedCallback(){super.connectedCallback(),window.addEventListener("lit-localize-status",this.handleLocaleStatus),this.applyDirection(),this.applyLocale()}disconnectedCallback(){window.removeEventListener("lit-localize-status",this.handleLocaleStatus),super.disconnectedCallback()}updated(t){t.has("locale")&&this.applyLocale(),t.has("dir")&&this.applyDirection()}applyDirection(){this.setAttribute("dir",this.dir)}async applyLocale(){const t=Pr(this.locale);if(t!==this.locale){this.locale=t;return}this.applyDirection(),!(this.lastAppliedLocale===t&&zr()===t)&&(this.lastAppliedLocale=t,zr()!==t&&await Bo(t),P(this,"nami-change",{value:t,locale:t,dir:this.dir}))}render(){return p`<slot></slot>`}};Ke.properties={locale:{reflect:!0},dir:{reflect:!0}},Ke.styles=[M];let Ri=Ke;const Ue=class Ue extends ${constructor(){super(),this.size="lg",this.padded=!0}render(){return p`<div class="base" part="base"><slot></slot></div>`}};Ue.properties={size:{reflect:!0},padded:{type:Boolean,reflect:!0}},Ue.styles=[M,E`
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
    `];let Bi=Ue;const Fi=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");function xe(e){const t=[...Array.from(e.querySelectorAll(Fi)),...Fo(e)];return Array.from(new Set(t)).filter(Io)}function Fo(e){return Array.from(e.querySelectorAll("slot")).flatMap(t=>t.assignedElements({flatten:!0}).flatMap(i=>i instanceof HTMLElement?[...i.matches(Fi)?[i]:[],...Array.from(i.querySelectorAll(Fi))]:[]))}function Io(e){return!e.hasAttribute("disabled")&&e.tabIndex>=0}function Dr(e,t){if(e.key!=="Tab")return;const i=xe(t);if(i.length===0)return;const a=i[0],r=i[i.length-1];e.shiftKey&&document.activeElement===a?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),a.focus())}function Or(e){e instanceof HTMLElement&&e.focus()}const Xe=class Xe extends ${constructor(){super(),this.previousActiveElement=null,this.open=!1,this.label="",this.closeOnBackdrop=!0}get dialogElement(){return this.renderRoot.querySelector("dialog")}get focusableElements(){return xe(this.dialogElement)}updated(t){if(!t.has("open"))return;const i=t.get("open")===!0;this.open&&!this.dialogElement.open&&(this.previousActiveElement=document.activeElement,this.dialogElement.showModal(),requestAnimationFrame(()=>this.focusInitialElement()),P(this,"nami-open",void 0)),!this.open&&this.dialogElement.open&&this.dialogElement.close(),!this.open&&i&&(this.restoreFocus(),P(this,"nami-close",this.closeSourceEvent?{sourceEvent:this.closeSourceEvent}:void 0),this.closeSourceEvent=void 0)}focusInitialElement(){this.focusableElements[0]?.focus()}restoreFocus(){Or(this.previousActiveElement),this.previousActiveElement=null}close(t){this.open&&(this.closeSourceEvent=t,this.open=!1)}handleCancel(t){t.preventDefault(),this.close(t)}handleClick(t){this.closeOnBackdrop&&t.target===this.dialogElement&&this.close(t)}handleNativeClose(){this.open&&this.close()}handleKeydown(t){this.open&&Dr(t,this.dialogElement)}render(){return p`
      <dialog
        part="base"
        aria-label=${this.label||A}
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
    `}};Xe.properties={open:{type:Boolean,reflect:!0},label:{},closeOnBackdrop:{attribute:"close-on-backdrop",type:Boolean,reflect:!0}},Xe.styles=[M,E`
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
    `];let Ii=Xe;const Ne=class Ne extends ${constructor(){super(),this.previousActiveElement=null,this.handleKeydown=t=>{t.key==="Escape"&&this.open&&this.close(t)},this.open=!1,this.placement="left"}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleKeydown)}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeydown),super.disconnectedCallback()}close(t){this.open&&(this.closeSourceEvent=t,this.open=!1)}updated(t){if(!t.has("open"))return;const i=t.get("open")===!0;this.open?(this.previousActiveElement=document.activeElement,requestAnimationFrame(()=>this.focusInitialElement()),P(this,"nami-open",void 0)):i&&(this.restoreFocus(),P(this,"nami-close",this.closeSourceEvent?{sourceEvent:this.closeSourceEvent}:void 0),this.closeSourceEvent=void 0)}get panelElement(){return this.renderRoot.querySelector(".panel")}focusInitialElement(){const t=this.panelElement;if(!t)return;(xe(t)[0]??t).focus()}handlePanelKeydown(t){const i=this.panelElement;if(i){if(t.key==="Tab"&&xe(i).length===0){t.preventDefault(),i.focus();return}Dr(t,i)}}restoreFocus(){Or(this.previousActiveElement),this.previousActiveElement=null}render(){return p`
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
    `}};Ne.properties={open:{type:Boolean,reflect:!0},placement:{reflect:!0}},Ne.styles=[M,E`
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
    `];let _i=Ne;const qe=class qe extends ${constructor(){super(),this.name="empty",this.size="md"}renderBadge(t){return p`
      <circle class="primary" cx="100" cy="66" r="28"></circle>
      <text x="100" y="77" text-anchor="middle" fill="white" font-size="32" font-family="ui-sans-serif, system-ui" font-weight="800">${t}</text>
    `}renderStateMark(){const t={empty:p`<path class="line" d="M80 77h40M90 92h20"></path>`,search:p`<circle class="line" cx="91" cy="72" r="19"></circle><path class="line" d="M105 86l22 22"></path>`,success:p`<path class="line" d="M78 72l16 16 31-35"></path>`,error:p`<path class="line" d="M82 58l36 36M118 58L82 94"></path>`,warning:p`<path class="accent" d="M100 44l40 72H60z"></path><path class="line thin-line" d="M100 68v28M100 108h.1"></path>`,info:p`${this.renderBadge("i")}`,forbidden:p`${this.renderBadge("!")}<path class="line" d="M78 90l44-44"></path>`,"not-found":p`${this.renderBadge("?")}`,"server-error":p`${this.renderBadge("5")}<path class="line thin-line" d="M74 114h52"></path>`};return t[this.name]??t.empty}render(){return p`
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
    `}};qe.properties={name:{reflect:!0},size:{reflect:!0}},qe.styles=[M,E`
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
    `];let Nt=qe;k("nami-illustration",Nt);const Ye=class Ye extends ${constructor(){super(),ot(this),this.illustration="empty",this.title="",this.description="",this.compact=!1}render(){const t=this.description||Q("No data",{id:"nami.empty.description"}),i=this.title||t||Q("Empty state",{id:"nami.empty.aria"});return p`
      <section class="base" part="base" aria-label=${i}>
        <slot name="illustration" part="illustration">
          <nami-illustration name=${this.illustration} size=${this.compact?"sm":"md"}></nami-illustration>
        </slot>
        ${this.title?p`<div class="title" part="title"><slot name="title">${this.title}</slot></div>`:A}
        <div class="description" part="description"><slot name="description">${t}</slot></div>
        <div class="actions" part="actions"><slot name="actions"></slot></div>
      </section>
    `}};Ye.properties={illustration:{reflect:!0},title:{reflect:!0},description:{reflect:!0},compact:{type:Boolean,reflect:!0}},Ye.styles=[M,E`
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
    `];let Li=Ye;const Rr=new Map;function ji(e){const t=(Rr.get(e)??0)+1;return Rr.set(e,t),`${e}-${t}`}const Ge=class Ge extends ${constructor(){super(),this.metaId=`${ji("nami-field")}-meta`,this.label="",this.helperText="",this.error="",this.required=!1,this.disabled=!1}updated(){this.dataset.state=this.error?"invalid":"valid",this.toggleAttribute("data-disabled",this.disabled),this.toggleAttribute("data-invalid",!!this.error)}focusControl(){this.renderRoot.querySelector("slot:not([name])")?.assignedElements({flatten:!0}).find(a=>"focus"in a)?.focus?.()}render(){const t=this.error||this.helperText;return p`
      <div class="base" part="base">
        ${this.label?p`<span class="label" part="label" @click=${this.focusControl}>${this.label}${this.required?" *":""}</span>`:A}
        <div class="control" part="control"><slot></slot></div>
        ${t?p`<div id=${this.metaId} class="meta ${this.error?"error":""}" part=${this.error?"error":"description"}>${t}</div>`:p`<slot name="description"></slot>`}
      </div>
    `}};Ge.properties={label:{},helperText:{attribute:"helper-text"},error:{reflect:!0,useDefault:!0},required:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}},Ge.styles=[M,E`
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
    `];let Hi=Ge;const Ze=class Ze extends ${constructor(){super(),this.columns=0,this.min="",this.gap="md"}updated(){this.columns>0?this.style.setProperty("--nami-grid-columns",String(this.columns)):this.style.removeProperty("--nami-grid-columns"),this.min?this.style.setProperty("--nami-grid-min",this.min):this.style.removeProperty("--nami-grid-min")}render(){return p`<div class="base" part="base"><slot></slot></div>`}};Ze.properties={columns:{type:Number,reflect:!0},min:{reflect:!0},gap:{reflect:!0}},Ze.styles=[M,E`
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
    `];let Wi=Ze;function _o(e,t){e.indexOf(t)===-1&&e.push(t)}function Ki(e,t){const i=e.indexOf(t);i>-1&&e.splice(i,1)}const tt=(e,t,i)=>i>t?t:i<e?e:i;function Ui(e,t){return t?`${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}`:e}let Tt=()=>{},lt=()=>{};typeof process<"u"&&process.env?.NODE_ENV!=="production"&&(Tt=(e,t,i)=>{!e&&typeof console<"u"&&console.warn(Ui(t,i))},lt=(e,t,i)=>{if(!e)throw new Error(Ui(t,i))});const ct={},Br=e=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),Fr=e=>typeof e=="object"&&e!==null,Ir=e=>/^0[^.\s]+$/u.test(e);function _r(e){let t;return()=>(t===void 0&&(t=e()),t)}const dt=e=>e,Xi=(...e)=>e.reduce((t,i)=>a=>i(t(a))),we=(e,t,i)=>{const a=t-e;return a?(i-e)/a:1};class Lr{constructor(){this.subscriptions=[]}add(t){return _o(this.subscriptions,t),()=>Ki(this.subscriptions,t)}notify(t,i,a){const r=this.subscriptions.length;if(r)if(r===1)this.subscriptions[0](t,i,a);else for(let n=0;n<r;n++){const s=this.subscriptions[n];s&&s(t,i,a)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const K=e=>e*1e3,Y=e=>e/1e3,Ni=(e,t)=>t?e*(1e3/t):0,jr=new Set;function qi(e,t,i){e||jr.has(t)||(console.warn(Ui(t,i)),jr.add(t))}const Lo=(e,t,i)=>{const a=t-e;return((i-e)%a+a)%a+e},Hr=(e,t,i)=>(((1-3*i+3*t)*e+(3*i-6*t))*e+3*t)*e,jo=1e-7,Ho=12;function Wo(e,t,i,a,r){let n,s,o=0;do s=t+(i-t)/2,n=Hr(s,a,r)-e,n>0?i=s:t=s;while(Math.abs(n)>jo&&++o<Ho);return s}function qt(e,t,i,a){if(e===t&&i===a)return dt;const r=n=>Wo(n,0,1,e,i);return n=>n===0||n===1?n:Hr(r(n),t,a)}const Wr=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,Yi=e=>t=>1-e(1-t),Kr=qt(.33,1.53,.69,.99),Gi=Yi(Kr),Ur=Wr(Gi),Xr=e=>e>=1?1:(e*=2)<1?.5*Gi(e):.5*(2-Math.pow(2,-10*(e-1))),Zi=e=>1-Math.sin(Math.acos(e)),Ko=Yi(Zi),Nr=Wr(Zi),Uo=qt(.42,0,1,1),Xo=qt(0,0,.58,1),qr=qt(.42,0,.58,1),Yr=e=>Array.isArray(e)&&typeof e[0]!="number";function Gr(e,t){return Yr(e)?e[Lo(0,e.length,t)]:e}const Zr=e=>Array.isArray(e)&&typeof e[0]=="number",Qr={linear:dt,easeIn:Uo,easeInOut:qr,easeOut:Xo,circIn:Zi,circInOut:Nr,circOut:Ko,backIn:Gi,backInOut:Ur,backOut:Kr,anticipate:Xr},No=e=>typeof e=="string",Jr=e=>{if(Zr(e)){lt(e.length===4,"Cubic bezier arrays must contain four numerical values.","cubic-bezier-length");const[t,i,a,r]=e;return qt(t,i,a,r)}else if(No(e))return lt(Qr[e]!==void 0,`Invalid easing type '${e}'`,"invalid-easing-type"),Qr[e];return e},ke=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function qo(e,t){let i=new Set,a=new Set,r=!1,n=!1;const s=new WeakSet;let o={delta:0,timestamp:0,isProcessing:!1};function l(c){s.has(c)&&(h.schedule(c),e()),c(o)}const h={schedule:(c,d=!1,u=!1)=>{const g=u&&r?i:a;return d&&s.add(c),g.add(c),c},cancel:c=>{a.delete(c),s.delete(c)},process:c=>{if(o=c,r){n=!0;return}r=!0;const d=i;i=a,a=d,i.forEach(l),i.clear(),r=!1,n&&(n=!1,h.process(c))}};return h}const Yo=40;function tn(e,t){let i=!1,a=!0;const r={delta:0,timestamp:0,isProcessing:!1},n=()=>i=!0,s=ke.reduce((z,C)=>(z[C]=qo(n),z),{}),{setup:o,read:l,resolveKeyframes:h,preUpdate:c,update:d,preRender:u,render:m,postRender:g}=s,v=()=>{const z=ct.useManualTiming,C=z?r.timestamp:performance.now();i=!1,z||(r.delta=a?1e3/60:Math.max(Math.min(C-r.timestamp,Yo),1)),r.timestamp=C,r.isProcessing=!0,o.process(r),l.process(r),h.process(r),c.process(r),d.process(r),u.process(r),m.process(r),g.process(r),r.isProcessing=!1,i&&t&&(a=!1,e(v))},b=()=>{i=!0,a=!0,r.isProcessing||e(v)};return{schedule:ke.reduce((z,C)=>{const S=s[C];return z[C]=(O,I=!1,T=!1)=>(i||b(),S.schedule(O,I,T)),z},{}),cancel:z=>{for(let C=0;C<ke.length;C++)s[ke[C]].cancel(z)},state:r,steps:s}}const{schedule:L,cancel:Et,state:Yt}=tn(typeof requestAnimationFrame<"u"?requestAnimationFrame:dt,!0);let $e;function Go(){$e=void 0}const U={now:()=>($e===void 0&&U.set(Yt.isProcessing||ct.useManualTiming?Yt.timestamp:performance.now()),$e),set:e=>{$e=e,queueMicrotask(Go)}},en=e=>t=>typeof t=="string"&&t.startsWith(e),an=en("--"),Zo=en("var(--"),Qi=e=>Zo(e)?Qo.test(e.split("/*")[0].trim()):!1,Qo=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function rn(e){return typeof e!="string"?!1:e.split("/*")[0].includes("var(--")}const Mt={test:e=>typeof e=="number",parse:parseFloat,transform:e=>e},Gt={...Mt,transform:e=>tt(0,1,e)},Ae={...Mt,default:1},Zt=e=>Math.round(e*1e5)/1e5,Ji=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Jo(e){return e==null}const tl=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,ta=(e,t)=>i=>!!(typeof i=="string"&&tl.test(i)&&i.startsWith(e)||t&&!Jo(i)&&Object.prototype.hasOwnProperty.call(i,t)),nn=(e,t,i)=>a=>{if(typeof a!="string")return a;const[r,n,s,o]=a.match(Ji);return{[e]:parseFloat(r),[t]:parseFloat(n),[i]:parseFloat(s),alpha:o!==void 0?parseFloat(o):1}},el=e=>tt(0,255,e),ea={...Mt,transform:e=>Math.round(el(e))},bt={test:ta("rgb","red"),parse:nn("red","green","blue"),transform:({red:e,green:t,blue:i,alpha:a=1})=>"rgba("+ea.transform(e)+", "+ea.transform(t)+", "+ea.transform(i)+", "+Zt(Gt.transform(a))+")"};function il(e){let t="",i="",a="",r="";return e.length>5?(t=e.substring(1,3),i=e.substring(3,5),a=e.substring(5,7),r=e.substring(7,9)):(t=e.substring(1,2),i=e.substring(2,3),a=e.substring(3,4),r=e.substring(4,5),t+=t,i+=i,a+=a,r+=r),{red:parseInt(t,16),green:parseInt(i,16),blue:parseInt(a,16),alpha:r?parseInt(r,16)/255:1}}const ia={test:ta("#"),parse:il,transform:bt.transform},Qt=e=>({test:t=>typeof t=="string"&&t.endsWith(e)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${e}`}),et=Qt("deg"),Ct=Qt("%"),f=Qt("px"),al=Qt("vh"),rl=Qt("vw"),sn={...Ct,parse:e=>Ct.parse(e)/100,transform:e=>Ct.transform(e*100)},Vt={test:ta("hsl","hue"),parse:nn("hue","saturation","lightness"),transform:({hue:e,saturation:t,lightness:i,alpha:a=1})=>"hsla("+Math.round(e)+", "+Ct.transform(Zt(t))+", "+Ct.transform(Zt(i))+", "+Zt(Gt.transform(a))+")"},_={test:e=>bt.test(e)||ia.test(e)||Vt.test(e),parse:e=>bt.test(e)?bt.parse(e):Vt.test(e)?Vt.parse(e):ia.parse(e),transform:e=>typeof e=="string"?e:e.hasOwnProperty("red")?bt.transform(e):Vt.transform(e),getAnimatableNone:e=>{const t=_.parse(e);return t.alpha=0,_.transform(t)}},nl=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function sl(e){return isNaN(e)&&typeof e=="string"&&(e.match(Ji)?.length||0)+(e.match(nl)?.length||0)>0}const on="number",ln="color",ol="var",ll="var(",cn="${}",cl=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function zt(e){const t=e.toString(),i=[],a={color:[],number:[],var:[]},r=[];let n=0;const o=t.replace(cl,l=>(_.test(l)?(a.color.push(n),r.push(ln),i.push(_.parse(l))):l.startsWith(ll)?(a.var.push(n),r.push(ol),i.push(l)):(a.number.push(n),r.push(on),i.push(parseFloat(l))),++n,cn)).split(cn);return{values:i,split:o,indexes:a,types:r}}function dl(e){return zt(e).values}function dn({split:e,types:t}){const i=e.length;return a=>{let r="";for(let n=0;n<i;n++)if(r+=e[n],a[n]!==void 0){const s=t[n];s===on?r+=Zt(a[n]):s===ln?r+=_.transform(a[n]):r+=a[n]}return r}}function hl(e){return dn(zt(e))}const ul=e=>typeof e=="number"?0:_.test(e)?_.getAnimatableNone(e):e,ml=(e,t)=>typeof e=="number"?t?.trim().endsWith("/")?e:0:ul(e);function pl(e){const t=zt(e);return dn(t)(t.values.map((a,r)=>ml(a,t.split[r])))}const G={test:sl,parse:dl,createTransformer:hl,getAnimatableNone:pl};function aa(e,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<.16666666666666666?e+(t-e)*6*i:i<.5?t:i<.6666666666666666?e+(t-e)*(.6666666666666666-i)*6:e}function fl({hue:e,saturation:t,lightness:i,alpha:a}){e/=360,t/=100,i/=100;let r=0,n=0,s=0;if(!t)r=n=s=i;else{const o=i<.5?i*(1+t):i+t-i*t,l=2*i-o;r=aa(l,o,e+.3333333333333333),n=aa(l,o,e),s=aa(l,o,e-.3333333333333333)}return{red:Math.round(r*255),green:Math.round(n*255),blue:Math.round(s*255),alpha:a}}function Se(e,t){return i=>i>0?t:e}const Pt=(e,t,i)=>e+(t-e)*i,ra=(e,t,i)=>{const a=e*e,r=i*(t*t-a)+a;return r<0?0:Math.sqrt(r)},gl=[ia,bt,Vt],vl=e=>gl.find(t=>t.test(e));function hn(e){const t=vl(e);if(Tt(!!t,`'${e}' is not an animatable color. Use the equivalent color code instead.`,"color-not-animatable"),!t)return!1;let i=t.parse(e);return t===Vt&&(i=fl(i)),i}const un=(e,t)=>{const i=hn(e),a=hn(t);if(!i||!a)return Se(e,t);const r={...i};return n=>(r.red=ra(i.red,a.red,n),r.green=ra(i.green,a.green,n),r.blue=ra(i.blue,a.blue,n),r.alpha=Pt(i.alpha,a.alpha,n),bt.transform(r))},na=new Set(["none","hidden"]);function bl(e,t){return na.has(e)?i=>i<=0?e:t:i=>i>=1?t:e}function yl(e,t){return i=>Pt(e,t,i)}function sa(e){return typeof e=="number"?yl:typeof e=="string"?Qi(e)?Se:_.test(e)?un:kl:Array.isArray(e)?mn:typeof e=="object"?_.test(e)?un:xl:Se}function mn(e,t){const i=[...e],a=i.length,r=e.map((n,s)=>sa(n)(n,t[s]));return n=>{for(let s=0;s<a;s++)i[s]=r[s](n);return i}}function xl(e,t){const i={...e,...t},a={};for(const r in i)e[r]!==void 0&&t[r]!==void 0&&(a[r]=sa(e[r])(e[r],t[r]));return r=>{for(const n in a)i[n]=a[n](r);return i}}function wl(e,t){const i=[],a={color:0,var:0,number:0};for(let r=0;r<t.values.length;r++){const n=t.types[r],s=e.indexes[n][a[n]],o=e.values[s]??0;i[r]=o,a[n]++}return i}const kl=(e,t)=>{const i=G.createTransformer(t),a=zt(e),r=zt(t);return a.indexes.var.length===r.indexes.var.length&&a.indexes.color.length===r.indexes.color.length&&a.indexes.number.length>=r.indexes.number.length?na.has(e)&&!r.values.length||na.has(t)&&!a.values.length?bl(e,t):Xi(mn(wl(a,r),r.values),i):(Tt(!0,`Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,"complex-values-different"),Se(e,t))};function pn(e,t,i){return typeof e=="number"&&typeof t=="number"&&typeof i=="number"?Pt(e,t,i):sa(e)(e,t)}const $l=e=>{const t=({timestamp:i})=>e(i);return{start:(i=!0)=>L.update(t,i),stop:()=>Et(t),now:()=>Yt.isProcessing?Yt.timestamp:U.now()}},fn=(e,t,i=10)=>{let a="";const r=Math.max(Math.round(t/i),2);for(let n=0;n<r;n++)a+=Math.round(e(n/(r-1))*1e4)/1e4+", ";return`linear(${a.substring(0,a.length-2)})`},Te=2e4;function oa(e){let t=0;const i=50;let a=e.next(t);for(;!a.done&&t<Te;)t+=i,a=e.next(t);return t>=Te?1/0:t}function gn(e,t=100,i){const a=i({...e,keyframes:[0,t]}),r=Math.min(oa(a),Te);return{type:"keyframes",ease:n=>a.next(r*n).value/t,duration:Y(r)}}const F={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function la(e,t){return e*Math.sqrt(1-t*t)}const Al=12;function Sl(e,t,i){let a=i;for(let r=1;r<Al;r++)a=a-e(a)/t(a);return a}const ca=.001;function Tl({duration:e=F.duration,bounce:t=F.bounce,velocity:i=F.velocity,mass:a=F.mass}){let r,n;Tt(e<=K(F.maxDuration),"Spring duration must be 10 seconds or less","spring-duration-limit");let s=1-t;s=tt(F.minDamping,F.maxDamping,s),e=tt(F.minDuration,F.maxDuration,Y(e)),s<1?(r=h=>{const c=h*s,d=c*e,u=c-i,m=la(h,s),g=Math.exp(-d);return ca-u/m*g},n=h=>{const d=h*s*e,u=d*i+i,m=Math.pow(s,2)*Math.pow(h,2)*e,g=Math.exp(-d),v=la(Math.pow(h,2),s);return(-r(h)+ca>0?-1:1)*((u-m)*g)/v}):(r=h=>{const c=Math.exp(-h*e),d=(h-i)*e+1;return-ca+c*d},n=h=>{const c=Math.exp(-h*e),d=(i-h)*(e*e);return c*d});const o=5/e,l=Sl(r,n,o);if(e=K(e),isNaN(l))return{stiffness:F.stiffness,damping:F.damping,duration:e};{const h=Math.pow(l,2)*a;return{stiffness:h,damping:s*2*Math.sqrt(a*h),duration:e}}}const El=["duration","bounce"],Ml=["stiffness","damping","mass"];function vn(e,t){return t.some(i=>e[i]!==void 0)}function Cl(e){let t={velocity:F.velocity,stiffness:F.stiffness,damping:F.damping,mass:F.mass,isResolvedFromDuration:!1,...e};if(!vn(e,Ml)&&vn(e,El))if(t.velocity=0,e.visualDuration){const i=e.visualDuration,a=2*Math.PI/(i*1.2),r=a*a,n=2*tt(.05,1,1-(e.bounce||0))*Math.sqrt(r);t={...t,mass:F.mass,stiffness:r,damping:n}}else{const i=Tl({...e,velocity:0});t={...t,...i,mass:F.mass},t.isResolvedFromDuration=!0}return t}function Jt(e=F.visualDuration,t=F.bounce){const i=typeof e!="object"?{visualDuration:e,keyframes:[0,1],bounce:t}:e;let{restSpeed:a,restDelta:r}=i;const n=i.keyframes[0],s=i.keyframes[i.keyframes.length-1],o={done:!1,value:n},{stiffness:l,damping:h,mass:c,duration:d,velocity:u,isResolvedFromDuration:m}=Cl({...i,velocity:-Y(i.velocity||0)}),g=u||0,v=h/(2*Math.sqrt(l*c)),b=s-n,y=Y(Math.sqrt(l/c)),R=Math.abs(b)<5;a||(a=R?F.restSpeed.granular:F.restSpeed.default),r||(r=R?F.restDelta.granular:F.restDelta.default);let z,C,S,O,I,T;if(v<1)S=la(y,v),O=(g+v*y*b)/S,z=x=>{const D=Math.exp(-v*y*x);return s-D*(O*Math.sin(S*x)+b*Math.cos(S*x))},I=v*y*O+b*S,T=v*y*b-O*S,C=x=>Math.exp(-v*y*x)*(I*Math.sin(S*x)+T*Math.cos(S*x));else if(v===1){z=D=>s-Math.exp(-y*D)*(b+(g+y*b)*D);const x=g+y*b;C=D=>Math.exp(-y*D)*(y*x*D-g)}else{const x=y*Math.sqrt(v*v-1);z=q=>{const at=Math.exp(-v*y*q),rt=Math.min(x*q,300);return s-at*((g+v*y*b)*Math.sinh(rt)+x*b*Math.cosh(rt))/x};const D=(g+v*y*b)/x,N=v*y*D-b*x,X=v*y*b-D*x;C=q=>{const at=Math.exp(-v*y*q),rt=Math.min(x*q,300);return at*(N*Math.sinh(rt)+X*Math.cosh(rt))}}const V={calculatedDuration:m&&d||null,velocity:x=>K(C(x)),next:x=>{if(!m&&v<1){const N=Math.exp(-v*y*x),X=Math.sin(S*x),q=Math.cos(S*x),at=s-N*(O*X+b*q),rt=K(N*(I*X+T*q));return o.done=Math.abs(rt)<=a&&Math.abs(s-at)<=r,o.value=o.done?s:at,o}const D=z(x);if(m)o.done=x>=d;else{const N=K(C(x));o.done=Math.abs(N)<=a&&Math.abs(s-D)<=r}return o.value=o.done?s:D,o},toString:()=>{const x=Math.min(oa(V),Te),D=fn(N=>V.next(x*N).value,x,30);return x+"ms "+D},toTransition:()=>{}};return V}Jt.applyToOptions=e=>{const t=gn(e,100,Jt);return e.ease=t.ease,e.duration=K(t.duration),e.type="keyframes",e};const Vl=5;function bn(e,t,i){const a=Math.max(t-Vl,0);return Ni(i-e(a),t-a)}function da({keyframes:e,velocity:t=0,power:i=.8,timeConstant:a=325,bounceDamping:r=10,bounceStiffness:n=500,modifyTarget:s,min:o,max:l,restDelta:h=.5,restSpeed:c}){const d=e[0],u={done:!1,value:d},m=T=>o!==void 0&&T<o||l!==void 0&&T>l,g=T=>o===void 0?l:l===void 0||Math.abs(o-T)<Math.abs(l-T)?o:l;let v=i*t;const b=d+v,y=s===void 0?b:s(b);y!==b&&(v=y-d);const R=T=>-v*Math.exp(-T/a),z=T=>y+R(T),C=T=>{const V=R(T),x=z(T);u.done=Math.abs(V)<=h,u.value=u.done?y:x};let S,O;const I=T=>{m(u.value)&&(S=T,O=Jt({keyframes:[u.value,g(u.value)],velocity:bn(z,T,u.value),damping:r,stiffness:n,restDelta:h,restSpeed:c}))};return I(0),{calculatedDuration:null,next:T=>{let V=!1;return!O&&S===void 0&&(V=!0,C(T),I(T)),S!==void 0&&T>=S?O.next(T-S):(!V&&C(T),u)}}}function zl(e,t,i){const a=[],r=i||ct.mix||pn,n=e.length-1;for(let s=0;s<n;s++){let o=r(e[s],e[s+1]);if(t){const l=Array.isArray(t)?t[s]||dt:t;o=Xi(l,o)}a.push(o)}return a}function yn(e,t,{clamp:i=!0,ease:a,mixer:r}={}){const n=e.length;if(lt(n===t.length,"Both input and output ranges must be the same length","range-length"),n===1)return()=>t[0];if(n===2&&t[0]===t[1])return()=>t[1];const s=e[0]===e[1];e[0]>e[n-1]&&(e=[...e].reverse(),t=[...t].reverse());const o=zl(t,a,r),l=o.length,h=c=>{if(s&&c<e[0])return t[0];let d=0;if(l>1)for(;d<e.length-2&&!(c<e[d+1]);d++);const u=we(e[d],e[d+1],c);return o[d](u)};return i?c=>h(tt(e[0],e[n-1],c)):h}function xn(e,t){const i=e[e.length-1];for(let a=1;a<=t;a++){const r=we(0,t,a);e.push(Pt(i,1,r))}}function ha(e){const t=[0];return xn(t,e.length-1),t}function Pl(e,t){return e.map(i=>i*t)}function Dl(e,t){return e.map(()=>t||qr).splice(0,e.length-1)}function Dt({duration:e=300,keyframes:t,times:i,ease:a="easeInOut"}){const r=Yr(a)?a.map(Jr):Jr(a),n={done:!1,value:t[0]},s=Pl(i&&i.length===t.length?i:ha(t),e),o=yn(s,t,{ease:Array.isArray(r)?r:Dl(t,r)});return{calculatedDuration:e,next:l=>(n.value=o(l),n.done=l>=e,n)}}const Ol=e=>e!==null;function Ee(e,{repeat:t,repeatType:i="loop"},a,r=1){const n=e.filter(Ol),o=r<0||t&&i!=="loop"&&t%2===1?0:n.length-1;return!o||a===void 0?n[o]:a}const Rl={decay:da,inertia:da,tween:Dt,keyframes:Dt,spring:Jt};function wn(e){typeof e.type=="string"&&(e.type=Rl[e.type])}class ua{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(t=>{this.resolve=t})}notifyFinished(){this.resolve()}then(t,i){return this.finished.then(t,i)}}const Bl=e=>e/100;class Me extends ua{constructor(t){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{const{motionValue:i}=this.options;i&&i.updatedAt!==U.now()&&this.tick(U.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),this.options.onStop?.())},this.options=t,this.initAnimation(),this.play(),t.autoplay===!1&&this.pause()}initAnimation(){const{options:t}=this;wn(t);const{type:i=Dt,repeat:a=0,repeatDelay:r=0,repeatType:n,velocity:s=0}=t;let{keyframes:o}=t;const l=i||Dt;process.env.NODE_ENV!=="production"&&l!==Dt&&lt(o.length<=2,`Only two keyframes currently supported with spring and inertia animations. Trying to animate ${o}`,"spring-two-frames"),l!==Dt&&typeof o[0]!="number"&&(this.mixKeyframes=Xi(Bl,pn(o[0],o[1])),o=[0,100]);const h=l({...t,keyframes:o});n==="mirror"&&(this.mirroredGenerator=l({...t,keyframes:[...o].reverse(),velocity:-s})),h.calculatedDuration===null&&(h.calculatedDuration=oa(h));const{calculatedDuration:c}=h;this.calculatedDuration=c,this.resolvedDuration=c+r,this.totalDuration=this.resolvedDuration*(a+1)-r,this.generator=h}updateTime(t){const i=Math.round(t-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=i}tick(t,i=!1){const{generator:a,totalDuration:r,mixKeyframes:n,mirroredGenerator:s,resolvedDuration:o,calculatedDuration:l}=this;if(this.startTime===null)return a.next(0);const{delay:h=0,keyframes:c,repeat:d,repeatType:u,repeatDelay:m,type:g,onUpdate:v,finalKeyframe:b}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-r/this.speed,this.startTime)),i?this.currentTime=t:this.updateTime(t);const y=this.currentTime-h*(this.playbackSpeed>=0?1:-1),R=this.playbackSpeed>=0?y<0:y>r;this.currentTime=Math.max(y,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=r);let z=this.currentTime,C=a;if(d){const T=Math.min(this.currentTime,r)/o;let V=Math.floor(T),x=T%1;!x&&T>=1&&(x=1),x===1&&V--,V=Math.min(V,d+1),V%2&&(u==="reverse"?(x=1-x,m&&(x-=m/o)):u==="mirror"&&(C=s)),z=tt(0,1,x)*o}let S;R?(this.delayState.value=c[0],S=this.delayState):S=C.next(z),n&&!R&&(S.value=n(S.value));let{done:O}=S;!R&&l!==null&&(O=this.playbackSpeed>=0?this.currentTime>=r:this.currentTime<=0);const I=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&O);return I&&g!==da&&(S.value=Ee(c,this.options,b,this.speed)),v&&v(S.value),I&&this.finish(),S}then(t,i){return this.finished.then(t,i)}get duration(){return Y(this.calculatedDuration)}get iterationDuration(){const{delay:t=0}=this.options||{};return this.duration+Y(t)}get time(){return Y(this.currentTime)}set time(t){t=K(t),this.currentTime=t,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=t,this.tick(t))}getGeneratorVelocity(){const t=this.currentTime;if(t<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(t);const i=this.generator.next(t).value;return bn(a=>this.generator.next(a).value,t,i)}get speed(){return this.playbackSpeed}set speed(t){const i=this.playbackSpeed!==t;i&&this.driver&&this.updateTime(U.now()),this.playbackSpeed=t,i&&this.driver&&(this.time=Y(this.currentTime))}play(){if(this.isStopped)return;const{driver:t=$l,startTime:i}=this.options;this.driver||(this.driver=t(r=>this.tick(r))),this.options.onPlay?.();const a=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=a):this.holdTime!==null?this.startTime=a-this.holdTime:this.startTime||(this.startTime=i??a),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(U.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state="finished",this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}attachTimeline(t){return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),this.driver?.stop(),t.observe(this)}}function Fl(e){for(let t=1;t<e.length;t++)e[t]??(e[t]=e[t-1])}const yt=e=>e*180/Math.PI,ma=e=>{const t=yt(Math.atan2(e[1],e[0]));return pa(t)},Il={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:e=>(Math.abs(e[0])+Math.abs(e[3]))/2,rotate:ma,rotateZ:ma,skewX:e=>yt(Math.atan(e[1])),skewY:e=>yt(Math.atan(e[2])),skew:e=>(Math.abs(e[1])+Math.abs(e[2]))/2},pa=e=>(e=e%360,e<0&&(e+=360),e),kn=ma,$n=e=>Math.sqrt(e[0]*e[0]+e[1]*e[1]),An=e=>Math.sqrt(e[4]*e[4]+e[5]*e[5]),_l={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:$n,scaleY:An,scale:e=>($n(e)+An(e))/2,rotateX:e=>pa(yt(Math.atan2(e[6],e[5]))),rotateY:e=>pa(yt(Math.atan2(-e[2],e[0]))),rotateZ:kn,rotate:kn,skewX:e=>yt(Math.atan(e[4])),skewY:e=>yt(Math.atan(e[1])),skew:e=>(Math.abs(e[1])+Math.abs(e[4]))/2};function fa(e){return e.includes("scale")?1:0}function ga(e,t){if(!e||e==="none")return fa(t);const i=e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let a,r;if(i)a=_l,r=i;else{const o=e.match(/^matrix\(([-\d.e\s,]+)\)$/u);a=Il,r=o}if(!r)return fa(t);const n=a[t],s=r[1].split(",").map(jl);return typeof n=="function"?n(s):s[n]}const Ll=(e,t)=>{const{transform:i="none"}=getComputedStyle(e);return ga(i,t)};function jl(e){return parseFloat(e.trim())}const Ot=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Rt=new Set([...Ot,"pathRotation"]),Sn=e=>e===Mt||e===f,Hl=new Set(["x","y","z"]),Wl=Ot.filter(e=>!Hl.has(e));function Kl(e){const t=[];return Wl.forEach(i=>{const a=e.getValue(i);a!==void 0&&(t.push([i,a.get()]),a.set(i.startsWith("scale")?1:0))}),t}const ht={width:({x:e},{paddingLeft:t="0",paddingRight:i="0",boxSizing:a})=>{const r=e.max-e.min;return a==="border-box"?r:r-parseFloat(t)-parseFloat(i)},height:({y:e},{paddingTop:t="0",paddingBottom:i="0",boxSizing:a})=>{const r=e.max-e.min;return a==="border-box"?r:r-parseFloat(t)-parseFloat(i)},top:(e,{top:t})=>parseFloat(t),left:(e,{left:t})=>parseFloat(t),bottom:({y:e},{top:t})=>parseFloat(t)+(e.max-e.min),right:({x:e},{left:t})=>parseFloat(t)+(e.max-e.min),x:(e,{transform:t})=>ga(t,"x"),y:(e,{transform:t})=>ga(t,"y")};ht.translateX=ht.x,ht.translateY=ht.y;const xt=new Set;let va=!1,ba=!1,ya=!1;function Tn(){if(ba){const e=Array.from(xt).filter(a=>a.needsMeasurement),t=new Set(e.map(a=>a.element)),i=new Map;t.forEach(a=>{const r=Kl(a);r.length&&(i.set(a,r),a.render())}),e.forEach(a=>a.measureInitialState()),t.forEach(a=>{a.render();const r=i.get(a);r&&r.forEach(([n,s])=>{a.getValue(n)?.set(s)})}),e.forEach(a=>a.measureEndState()),e.forEach(a=>{a.suspendedScrollY!==void 0&&window.scrollTo(0,a.suspendedScrollY)})}ba=!1,va=!1,xt.forEach(e=>e.complete(ya)),xt.clear()}function En(){xt.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(ba=!0)})}function Ul(){ya=!0,En(),Tn(),ya=!1}class xa{constructor(t,i,a,r,n,s=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...t],this.onComplete=i,this.name=a,this.motionValue=r,this.element=n,this.isAsync=s}scheduleResolve(){this.state="scheduled",this.isAsync?(xt.add(this),va||(va=!0,L.read(En),L.resolveKeyframes(Tn))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:t,name:i,element:a,motionValue:r}=this;if(t[0]===null){const n=r?.get(),s=t[t.length-1];if(n!==void 0)t[0]=n;else if(a&&i){const o=a.readValue(i,s);o!=null&&(t[0]=o)}t[0]===void 0&&(t[0]=s),r&&n===void 0&&r.set(t[0])}Fl(t)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(t=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,t),xt.delete(this)}cancel(){this.state==="scheduled"&&(xt.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const Xl=e=>e.startsWith("--");function Mn(e,t,i){Xl(t)?e.style.setProperty(t,i):e.style[t]=i}const Nl={};function wa(e,t){const i=_r(e);return()=>Nl[t]??i()}const Cn=wa(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),ql=wa(()=>window.ViewTimeline!==void 0,"viewTimeline"),Vn=wa(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),te=([e,t,i,a])=>`cubic-bezier(${e}, ${t}, ${i}, ${a})`,zn={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:te([0,.65,.55,1]),circOut:te([.55,0,1,.45]),backIn:te([.31,.01,.66,-.59]),backOut:te([.33,1.53,.69,.99])};function Pn(e,t){if(e)return typeof e=="function"?Vn()?fn(e,t):"ease-out":Zr(e)?te(e):Array.isArray(e)?e.map(i=>Pn(i,t)||zn.easeOut):zn[e]}function Yl(e,t,i,{delay:a=0,duration:r=300,repeat:n=0,repeatType:s="loop",ease:o="easeOut",times:l}={},h=void 0){const c={[t]:i};l&&(c.offset=l);const d=Pn(o,r);Array.isArray(d)&&(c.easing=d);const u={delay:a,duration:r,easing:Array.isArray(d)?"linear":d,fill:"both",iterations:n+1,direction:s==="reverse"?"alternate":"normal"};return h&&(u.pseudoElement=h),e.animate(c,u)}function ka(e){return typeof e=="function"&&"applyToOptions"in e}function Gl({type:e,...t}){return ka(e)&&Vn()?e.applyToOptions(t):(t.duration??(t.duration=300),t.ease??(t.ease="easeOut"),t)}class Dn extends ua{constructor(t){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!t)return;const{element:i,name:a,keyframes:r,pseudoElement:n,allowFlatten:s=!1,finalKeyframe:o,onComplete:l}=t;this.isPseudoElement=!!n,this.allowFlatten=s,this.options=t,lt(typeof t.type!="string",`Mini animate() doesn't support "type" as a string.`,"mini-spring");const h=Gl(t);this.animation=Yl(i,a,r,h,n),h.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!n){const c=Ee(r,this.options,o,this.speed);this.updateMotionValue&&this.updateMotionValue(c),Mn(i,a,c),this.animation.cancel()}l?.(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:t}=this;t==="idle"||t==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){const t=this.options?.element;!this.isPseudoElement&&t?.isConnected&&this.animation.commitStyles?.()}get duration(){const t=this.animation.effect?.getComputedTiming?.().duration||0;return Y(Number(t))}get iterationDuration(){const{delay:t=0}=this.options||{};return this.duration+Y(t)}get time(){return Y(Number(this.animation.currentTime)||0)}set time(t){const i=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=K(t),i&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(t){t<0&&(this.finishedTime=null),this.animation.playbackRate=t}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(t){this.manualStartTime=this.animation.startTime=t}attachTimeline({timeline:t,rangeStart:i,rangeEnd:a,observe:r}){return this.allowFlatten&&this.animation.effect?.updateTiming({easing:"linear"}),this.animation.onfinish=null,t&&Cn()?(this.animation.timeline=t,i&&(this.animation.rangeStart=i),a&&(this.animation.rangeEnd=a),dt):r(this)}}const On={anticipate:Xr,backInOut:Ur,circInOut:Nr};function Zl(e){return e in On}function Ql(e){typeof e.ease=="string"&&Zl(e.ease)&&(e.ease=On[e.ease])}const $a=10;class Jl extends Dn{constructor(t){Ql(t),wn(t),super(t),t.startTime!==void 0&&t.autoplay!==!1&&(this.startTime=t.startTime),this.options=t}updateMotionValue(t){const{motionValue:i,onUpdate:a,onComplete:r,element:n,...s}=this.options;if(!i)return;if(t!==void 0){i.set(t);return}const o=new Me({...s,autoplay:!1}),l=Math.max($a,U.now()-this.startTime),h=tt(0,$a,l-$a),c=o.sample(l).value,{name:d}=this.options;n&&d&&Mn(n,d,c),i.setWithVelocity(o.sample(Math.max(0,l-h)).value,c,h),o.stop()}}const Rn=(e,t)=>t==="zIndex"?!1:!!(typeof e=="number"||Array.isArray(e)||typeof e=="string"&&(G.test(e)||e==="0")&&!e.startsWith("url("));function tc(e){const t=e[0];if(e.length===1)return!0;for(let i=0;i<e.length;i++)if(e[i]!==t)return!0}function ec(e,t,i,a){const r=e[0];if(r===null)return!1;if(t==="display"||t==="visibility")return!0;const n=e[e.length-1],s=Rn(r,t),o=Rn(n,t);return Tt(s===o,`You are trying to animate ${t} from "${r}" to "${n}". "${s?n:r}" is not an animatable value.`,"value-not-animatable"),!s||!o?!1:tc(e)||(i==="spring"||ka(i))&&a}function Aa(e){e.duration=0,e.type="keyframes"}const Bn=new Set(["opacity","clipPath","filter","transform"]),ic=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function ac(e){for(let t=0;t<e.length;t++)if(typeof e[t]=="string"&&ic.test(e[t]))return!0;return!1}const rc=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),nc=_r(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function sc(e){const{motionValue:t,name:i,repeatDelay:a,repeatType:r,damping:n,type:s,keyframes:o}=e;if(!(t?.owner?.current instanceof HTMLElement))return!1;const{onUpdate:h,transformTemplate:c}=t.owner.getProps();return nc()&&i&&(Bn.has(i)||rc.has(i)&&ac(o))&&(i!=="transform"||!c)&&!h&&!a&&r!=="mirror"&&n!==0&&s!=="inertia"}const oc=40;class lc extends ua{constructor({autoplay:t=!0,delay:i=0,type:a="keyframes",repeat:r=0,repeatDelay:n=0,repeatType:s="loop",keyframes:o,name:l,motionValue:h,element:c,...d}){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=U.now();const u={autoplay:t,delay:i,type:a,repeat:r,repeatDelay:n,repeatType:s,name:l,motionValue:h,element:c,...d},m=c?.KeyframeResolver||xa;this.keyframeResolver=new m(o,(g,v,b)=>this.onKeyframesResolved(g,v,u,!b),l,h,c),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(t,i,a,r){this.keyframeResolver=void 0;const{name:n,type:s,velocity:o,delay:l,isHandoff:h,onUpdate:c}=a;this.resolvedAt=U.now();let d=!0;ec(t,n,s,o)||(d=!1,(ct.instantAnimations||!l)&&c?.(Ee(t,a,i)),t[0]=t[t.length-1],Aa(a),a.repeat=0);const m={startTime:r?this.resolvedAt?this.resolvedAt-this.createdAt>oc?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:i,...a,keyframes:t},g=d&&!h&&sc(m),v=m.motionValue?.owner?.current;let b;if(g)try{b=new Jl({...m,element:v})}catch{b=new Me(m)}else b=new Me(m);b.finished.then(()=>{this.notifyFinished()}).catch(dt),this.pendingTimeline&&(this.stopTimeline=b.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=b}get finished(){return this._animation?this.animation.finished:this._finished}then(t,i){return this.finished.finally(t).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),Ul()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(t){this.animation.time=t}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(t){this.animation.speed=t}get startTime(){return this.animation.startTime}attachTimeline(t){return this._animation?this.stopTimeline=this.animation.attachTimeline(t):this.pendingTimeline=t,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}}class cc{constructor(t){this.stop=()=>this.runAll("stop"),this.animations=t.filter(Boolean)}get finished(){return Promise.all(this.animations.map(t=>t.finished))}getAll(t){return this.animations[0][t]}setAll(t,i){for(let a=0;a<this.animations.length;a++)this.animations[a][t]=i}attachTimeline(t){const i=this.animations.map(a=>a.attachTimeline(t));return()=>{i.forEach((a,r)=>{a&&a(),this.animations[r].stop()})}}get time(){return this.getAll("time")}set time(t){this.setAll("time",t)}get speed(){return this.getAll("speed")}set speed(t){this.setAll("speed",t)}get state(){return this.getAll("state")}get startTime(){return this.getAll("startTime")}get duration(){return Fn(this.animations,"duration")}get iterationDuration(){return Fn(this.animations,"iterationDuration")}runAll(t){this.animations.forEach(i=>i[t]())}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}}function Fn(e,t){let i=0;for(let a=0;a<e.length;a++){const r=e[a][t];r!==null&&r>i&&(i=r)}return i}class dc extends cc{then(t,i){return this.finished.finally(t).then(()=>{})}}const In=30,hc=e=>!isNaN(parseFloat(e));class uc{constructor(t,i={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=a=>{const r=U.now();if(this.updatedAt!==r&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(a),this.current!==this.prev&&(this.events.change?.notify(this.current),this.dependents))for(const n of this.dependents)n.dirty()},this.hasAnimated=!1,this.setCurrent(t),this.owner=i.owner}setCurrent(t){this.current=t,this.updatedAt=U.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=hc(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return process.env.NODE_ENV!=="production"&&qi(!1,'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'),this.on("change",t)}on(t,i){this.events[t]||(this.events[t]=new Lr);const a=this.events[t].add(i);return t==="change"?()=>{a(),L.read(()=>{this.events.change.getSize()||this.stop()})}:a}clearListeners(){for(const t in this.events)this.events[t].clear()}attach(t,i){this.passiveEffect=t,this.stopPassiveEffect=i}set(t){this.passiveEffect?this.passiveEffect(t,this.updateAndNotify):this.updateAndNotify(t)}setWithVelocity(t,i,a){this.set(i),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-a}jump(t,i=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,i&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.events.change?.notify(this.current)}addDependent(t){this.dependents||(this.dependents=new Set),this.dependents.add(t)}removeDependent(t){this.dependents&&this.dependents.delete(t)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const t=U.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>In)return 0;const i=Math.min(this.updatedAt-this.prevUpdatedAt,In);return Ni(parseFloat(this.current)-parseFloat(this.prevFrameValue),i)}start(t){return this.stop(),new Promise(i=>{this.hasAnimated=!0,this.animation=t(i),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Bt(e,t){return new uc(e,t)}function _n(e,t){if(e?.inherit&&t){const{inherit:i,...a}=e;return{...t,...a}}return e}function Ln(e,t){const i=e?.[t]??e?.default??e;return i!==e?_n(i,e):i}const mc={type:"spring",stiffness:500,damping:25,restSpeed:10},pc=e=>({type:"spring",stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),fc={type:"keyframes",duration:.8},gc={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},vc=(e,{keyframes:t})=>t.length>2?fc:Rt.has(e)?e.startsWith("scale")?pc(t[1]):mc:gc,bc=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function yc(e){for(const t in e)if(!bc.has(t))return!0;return!1}const jn=(e,t,i,a={},r,n)=>s=>{const o=Ln(a,e)||{},l=o.delay||a.delay||0;let{elapsed:h=0}=a;h=h-K(l);const c={keyframes:Array.isArray(i)?i:[null,i],ease:"easeOut",velocity:t.getVelocity(),...o,delay:-h,onUpdate:u=>{t.set(u),o.onUpdate&&o.onUpdate(u)},onComplete:()=>{s(),o.onComplete&&o.onComplete()},name:e,motionValue:t,element:n?void 0:r};yc(o)||Object.assign(c,vc(e,c)),c.duration&&(c.duration=K(c.duration)),c.repeatDelay&&(c.repeatDelay=K(c.repeatDelay)),c.from!==void 0&&(c.keyframes[0]=c.from);let d=!1;if((c.type===!1||c.duration===0&&!c.repeatDelay)&&(Aa(c),c.delay===0&&(d=!0)),(ct.instantAnimations||ct.skipAnimations||r?.shouldSkipAnimations||o.skipAnimations)&&(d=!0,Aa(c),c.delay=0),c.allowFlatten=!o.type&&!o.ease,d&&!n&&t.get()!==void 0){const u=Ee(c.keyframes,o);if(u!==void 0){L.update(()=>{c.onUpdate(u),c.onComplete()});return}}return o.isSync?new Me(c):new lc(c)},xc=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function wc(e){const t=xc.exec(e);if(!t)return[,];const[,i,a,r]=t;return[`--${i??a}`,r]}const kc=4;function Hn(e,t,i=1){lt(i<=kc,`Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`,"max-css-var-depth");const[a,r]=wc(e);if(!a)return;const n=window.getComputedStyle(t).getPropertyValue(a);if(n){const s=n.trim();return Br(s)?parseFloat(s):s}return Qi(r)?Hn(r,t,i+1):r}function Wn(e){const t=[{},{}];return e?.values.forEach((i,a)=>{t[0][a]=i.get(),t[1][a]=i.getVelocity()}),t}function Kn(e,t,i,a){if(typeof t=="function"){const[r,n]=Wn(a);t=t(i!==void 0?i:e.custom,r,n)}if(typeof t=="string"&&(t=e.variants&&e.variants[t]),typeof t=="function"){const[r,n]=Wn(a);t=t(i!==void 0?i:e.custom,r,n)}return t}function $c(e,t,i){const a=e.getProps();return Kn(a,t,a.custom,e)}const Un=new Set(["width","height","top","left","right","bottom",...Ot]),Ac=e=>Array.isArray(e);function Sc(e,t,i){e.hasValue(t)?e.getValue(t).set(i):e.addValue(t,Bt(i))}function Tc(e){return Ac(e)?e[e.length-1]||0:e}function Ec(e,t){const i=$c(e,t);let{transitionEnd:a={},transition:r={},...n}=i||{};n={...n,...a};for(const s in n){const o=Tc(n[s]);Sc(e,s,o)}}const j=e=>!!(e&&e.getVelocity);function Mc(e){return!!(j(e)&&e.add)}function Cc(e,t){const i=e.getValue("willChange");if(Mc(i))return i.add(t);if(!i&&ct.WillChange){const a=new ct.WillChange("auto");e.addValue("willChange",a),a.add(t)}}function Sa(e){return e.replace(/([A-Z])/g,t=>`-${t.toLowerCase()}`)}const Vc="data-"+Sa("framerAppearId");function zc(e){return e.props[Vc]}function Pc({protectedKeys:e,needsAnimating:t},i){const a=e.hasOwnProperty(i)&&t[i]!==!0;return t[i]=!1,a}function Dc(e,t,{delay:i=0,transitionOverride:a,type:r}={}){let{transition:n,transitionEnd:s,...o}=t;const l=e.getDefaultTransition();n=n?_n(n,l):l;const h=n?.reduceMotion,c=n?.skipAnimations;a&&(n=a);const d=[],u=r&&e.animationState&&e.animationState.getState()[r],m=n?.path;m&&m.animateVisualElement(e,o,n,i,d);for(const g in o){const v=e.getValue(g,e.latestValues[g]??null),b=o[g];if(b===void 0||u&&Pc(u,g))continue;const y={delay:i,...Ln(n||{},g)};c&&(y.skipAnimations=!0);const R=v.get();if(R!==void 0&&!v.isAnimating()&&!Array.isArray(b)&&b===R&&!y.velocity){L.update(()=>v.set(b));continue}let z=!1;if(window.MotionHandoffAnimation){const O=zc(e);if(O){const I=window.MotionHandoffAnimation(O,g,L);I!==null&&(y.startTime=I,z=!0)}}Cc(e,g);const C=h??e.shouldReduceMotion;v.start(jn(g,v,b,C&&Un.has(g)?{type:!1}:y,e,z));const S=v.animation;S&&d.push(S)}if(s){const g=()=>L.update(()=>{s&&Ec(e,s)});d.length?Promise.all(d).then(g):g()}return d}const Oc={test:e=>e==="auto",parse:e=>e},Xn=e=>t=>t.test(e),Nn=[Mt,f,Ct,et,rl,al,Oc],qn=e=>Nn.find(Xn(e));function Rc(e){return typeof e=="number"?e===0:e!==null?e==="none"||e==="0"||Ir(e):!0}const Bc=new Set(["brightness","contrast","saturate","opacity"]);function Fc(e){const[t,i]=e.slice(0,-1).split("(");if(t==="drop-shadow")return e;const[a]=i.match(Ji)||[];if(!a)return e;const r=i.replace(a,"");let n=Bc.has(t)?1:0;return a!==i&&(n*=100),t+"("+n+r+")"}const Ic=/\b([a-z-]*)\(.*?\)/gu,Ta={...G,getAnimatableNone:e=>{const t=e.match(Ic);return t?t.map(Fc).join(" "):e}},Ea={...G,getAnimatableNone:e=>{const t=G.parse(e);return G.createTransformer(e)(t.map(a=>typeof a=="number"?0:typeof a=="object"?{...a,alpha:1}:a))}},Yn={...Mt,transform:Math.round},Ce={borderWidth:f,borderTopWidth:f,borderRightWidth:f,borderBottomWidth:f,borderLeftWidth:f,borderRadius:f,borderTopLeftRadius:f,borderTopRightRadius:f,borderBottomRightRadius:f,borderBottomLeftRadius:f,width:f,maxWidth:f,height:f,maxHeight:f,top:f,right:f,bottom:f,left:f,inset:f,insetBlock:f,insetBlockStart:f,insetBlockEnd:f,insetInline:f,insetInlineStart:f,insetInlineEnd:f,padding:f,paddingTop:f,paddingRight:f,paddingBottom:f,paddingLeft:f,paddingBlock:f,paddingBlockStart:f,paddingBlockEnd:f,paddingInline:f,paddingInlineStart:f,paddingInlineEnd:f,margin:f,marginTop:f,marginRight:f,marginBottom:f,marginLeft:f,marginBlock:f,marginBlockStart:f,marginBlockEnd:f,marginInline:f,marginInlineStart:f,marginInlineEnd:f,fontSize:f,backgroundPositionX:f,backgroundPositionY:f,...{rotate:et,pathRotation:et,rotateX:et,rotateY:et,rotateZ:et,scale:Ae,scaleX:Ae,scaleY:Ae,scaleZ:Ae,skew:et,skewX:et,skewY:et,distance:f,translateX:f,translateY:f,translateZ:f,x:f,y:f,z:f,perspective:f,transformPerspective:f,opacity:Gt,originX:sn,originY:sn,originZ:f},zIndex:Yn,fillOpacity:Gt,strokeOpacity:Gt,numOctaves:Yn},_c={...Ce,color:_,backgroundColor:_,outlineColor:_,fill:_,stroke:_,borderColor:_,borderTopColor:_,borderRightColor:_,borderBottomColor:_,borderLeftColor:_,filter:Ta,WebkitFilter:Ta,mask:Ea,WebkitMask:Ea},Gn=e=>_c[e],Lc=new Set([Ta,Ea]);function Zn(e,t){let i=Gn(e);return Lc.has(i)||(i=G),i.getAnimatableNone?i.getAnimatableNone(t):void 0}const jc=new Set(["auto","none","0"]);function Hc(e,t,i){let a=0,r;for(;a<e.length&&!r;){const n=e[a];typeof n=="string"&&!jc.has(n)&&zt(n).values.length&&(r=e[a]),a++}if(r&&i)for(const n of t)e[n]=Zn(i,r)}class Wc extends xa{constructor(t,i,a,r,n){super(t,i,a,r,n,!0)}readKeyframes(){const{unresolvedKeyframes:t,element:i,name:a}=this;if(!i||!i.current)return;super.readKeyframes();for(let c=0;c<t.length;c++){let d=t[c];if(typeof d=="string"&&(d=d.trim(),Qi(d))){const u=Hn(d,i.current);u!==void 0&&(t[c]=u),c===t.length-1&&(this.finalKeyframe=d)}}if(this.resolveNoneKeyframes(),!Un.has(a)||t.length!==2)return;const[r,n]=t,s=qn(r),o=qn(n),l=rn(r),h=rn(n);if(l!==h&&ht[a]){this.needsMeasurement=!0;return}if(s!==o)if(Sn(s)&&Sn(o))for(let c=0;c<t.length;c++){const d=t[c];typeof d=="string"&&(t[c]=parseFloat(d))}else ht[a]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:t,name:i}=this,a=[];for(let r=0;r<t.length;r++)(t[r]===null||Rc(t[r]))&&a.push(r);a.length&&Hc(t,a,i)}measureInitialState(){const{element:t,unresolvedKeyframes:i,name:a}=this;if(!t||!t.current)return;a==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=ht[a](t.measureViewportBox(),window.getComputedStyle(t.current)),i[0]=this.measuredOrigin;const r=i[i.length-1];r!==void 0&&t.getValue(a,r).jump(r,!1)}measureEndState(){const{element:t,name:i,unresolvedKeyframes:a}=this;if(!t||!t.current)return;const r=t.getValue(i);r&&r.jump(this.measuredOrigin,!1);const n=a.length-1,s=a[n];a[n]=ht[i](t.measureViewportBox(),window.getComputedStyle(t.current)),s!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=s),this.removedTransforms?.length&&this.removedTransforms.forEach(([o,l])=>{t.getValue(o).set(l)}),this.resolveNoneKeyframes()}}function Ma(e,t,i){if(e==null)return[];if(e instanceof EventTarget)return[e];if(typeof e=="string"){let a=document;t&&(a=t.current);const r=i?.[e]??a.querySelectorAll(e);return r?Array.from(r):[]}return Array.from(e).filter(a=>a!=null)}const Ca=(e,t)=>t&&typeof e=="number"?t.transform(e):e;function Kc(e){return Fr(e)&&"offsetHeight"in e&&!("ownerSVGElement"in e)}const{schedule:Uc}=tn(queueMicrotask,!1);function Va(e){return Fr(e)&&"ownerSVGElement"in e}const Ve=new WeakMap;let ze;const Qn=(e,t,i)=>(a,r)=>r&&r[0]?r[0][e+"Size"]:Va(a)&&"getBBox"in a?a.getBBox()[t]:a[i],Xc=Qn("inline","width","offsetWidth"),Nc=Qn("block","height","offsetHeight");function qc({target:e,borderBoxSize:t}){Ve.get(e)?.forEach(i=>{i(e,{get width(){return Xc(e,t)},get height(){return Nc(e,t)}})})}function Yc(e){e.forEach(qc)}function Gc(){typeof ResizeObserver>"u"||(ze=new ResizeObserver(Yc))}function Zc(e,t){ze||Gc();const i=Ma(e);return i.forEach(a=>{let r=Ve.get(a);r||(r=new Set,Ve.set(a,r)),r.add(t),ze?.observe(a)}),()=>{i.forEach(a=>{const r=Ve.get(a);r?.delete(t),r?.size||ze?.unobserve(a)})}}const Pe=new Set;let Ft;function Qc(){Ft=()=>{const e={get width(){return window.innerWidth},get height(){return window.innerHeight}};Pe.forEach(t=>t(e))},window.addEventListener("resize",Ft)}function Jc(e){return Pe.add(e),Ft||Qc(),()=>{Pe.delete(e),!Pe.size&&typeof Ft=="function"&&(window.removeEventListener("resize",Ft),Ft=void 0)}}function td(e,t){return typeof e=="function"?Jc(e):Zc(e,t)}function Jn(e,t){let i;const a=()=>{const{currentTime:r}=t,s=(r===null?0:r.value)/100;i!==s&&e(s),i=s};return L.preUpdate(a,!0),()=>Et(a)}function ed(e){return Va(e)&&e.tagName==="svg"}const id=[...Nn,_,G],ad=e=>id.find(Xn(e)),ts=()=>({min:0,max:0}),za=()=>({x:ts(),y:ts()}),ee=new WeakMap;function rd(e){return e!==null&&typeof e=="object"&&typeof e.start=="function"}function nd(e){return typeof e=="string"||Array.isArray(e)}const sd=["initial",...["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"]];function es(e){return rd(e.animate)||sd.some(t=>nd(e[t]))}function od(e){return!!(es(e)||e.variants)}function ld(e,t,i){for(const a in t){const r=t[a],n=i[a];if(j(r))e.addValue(a,r);else if(j(n))e.addValue(a,Bt(r,{owner:e}));else if(n!==r)if(e.hasValue(a)){const s=e.getValue(a);s.liveStyle===!0?s.jump(r):s.hasAnimated||s.set(r)}else{const s=e.getStaticValue(a);e.addValue(a,Bt(s!==void 0?s:r,{owner:e}))}}for(const a in i)t[a]===void 0&&e.removeValue(a);return t}const Pa={current:null},is={current:!1},cd=typeof window<"u";function dd(){if(is.current=!0,!!cd)if(window.matchMedia){const e=window.matchMedia("(prefers-reduced-motion)"),t=()=>Pa.current=e.matches;e.addEventListener("change",t),t()}else Pa.current=!1}const as=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let rs={};class ns{scrapeMotionValuesFromProps(t,i,a){return{}}constructor({parent:t,props:i,presenceContext:a,reducedMotionConfig:r,skipAnimations:n,blockInitialAnimation:s,visualState:o},l={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=xa,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const m=U.now();this.renderScheduledAt<m&&(this.renderScheduledAt=m,L.render(this.render,!1,!0))};const{latestValues:h,renderState:c}=o;this.latestValues=h,this.baseTarget={...h},this.initialValues=i.initial?{...h}:{},this.renderState=c,this.parent=t,this.props=i,this.presenceContext=a,this.depth=t?t.depth+1:0,this.reducedMotionConfig=r,this.skipAnimationsConfig=n,this.options=l,this.blockInitialAnimation=!!s,this.isControllingVariants=es(i),this.isVariantNode=od(i),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);const{willChange:d,...u}=this.scrapeMotionValuesFromProps(i,{},this);for(const m in u){const g=u[m];h[m]!==void 0&&j(g)&&g.set(h[m])}}mount(t){if(this.hasBeenMounted)for(const i in this.initialValues)this.values.get(i)?.jump(this.initialValues[i]),this.latestValues[i]=this.initialValues[i];this.current=t,ee.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((i,a)=>this.bindToMotionValue(a,i)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(is.current||dd(),this.shouldReduceMotion=Pa.current),process.env.NODE_ENV!=="production"&&qi(this.shouldReduceMotion!==!0,"You have Reduced Motion enabled on your device. Animations may not appear as expected.","reduced-motion-disabled"),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,this.parent?.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){this.projection&&this.projection.unmount(),Et(this.notifyUpdate),Et(this.render),this.valueSubscriptions.forEach(t=>t()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent?.removeChild(this);for(const t in this.events)this.events[t].clear();for(const t in this.features){const i=this.features[t];i&&(i.unmount(),i.isMounted=!1)}this.current=null}addChild(t){this.children.add(t),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(t)}removeChild(t){this.children.delete(t),this.enteringChildren&&this.enteringChildren.delete(t)}bindToMotionValue(t,i){if(this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)(),i.accelerate&&Bn.has(t)&&this.current instanceof HTMLElement){const{factory:s,keyframes:o,times:l,ease:h,duration:c}=i.accelerate,d=new Dn({element:this.current,name:t,keyframes:o,times:l,ease:h,duration:K(c)}),u=s(d);this.valueSubscriptions.set(t,()=>{u(),d.cancel()});return}const a=Rt.has(t);a&&this.onBindTransform&&this.onBindTransform();const r=i.on("change",s=>{this.latestValues[t]=s,this.props.onUpdate&&L.preRender(this.notifyUpdate),a&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let n;typeof window<"u"&&window.MotionCheckAppearSync&&(n=window.MotionCheckAppearSync(this,t,i)),this.valueSubscriptions.set(t,()=>{r(),n&&n()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}updateFeatures(){let t="animation";for(t in rs){const i=rs[t];if(!i)continue;const{isEnabled:a,Feature:r}=i;if(!this.features[t]&&r&&a(this.props)&&(this.features[t]=new r(this)),this.features[t]){const n=this.features[t];n.isMounted?n.update():(n.mount(),n.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):za()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,i){this.latestValues[t]=i}update(t,i){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=i;for(let a=0;a<as.length;a++){const r=as[a];this.propEventSubscriptions[r]&&(this.propEventSubscriptions[r](),delete this.propEventSubscriptions[r]);const n="on"+r,s=t[n];s&&(this.propEventSubscriptions[r]=this.on(r,s))}this.prevMotionValues=ld(this,this.scrapeMotionValuesFromProps(t,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){const i=this.getClosestVariantNode();if(i)return i.variantChildren&&i.variantChildren.add(t),()=>i.variantChildren.delete(t)}addValue(t,i){const a=this.values.get(t);i!==a&&(a&&this.removeValue(t),this.bindToMotionValue(t,i),this.values.set(t,i),this.latestValues[t]=i.get())}removeValue(t){this.values.delete(t);const i=this.valueSubscriptions.get(t);i&&(i(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,i){if(this.props.values&&this.props.values[t])return this.props.values[t];let a=this.values.get(t);return a===void 0&&i!==void 0&&(a=Bt(i===null?void 0:i,{owner:this}),this.addValue(t,a)),a}readValue(t,i){let a=this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:this.getBaseTargetFromProps(this.props,t)??this.readValueFromInstance(this.current,t,this.options);return a!=null&&(typeof a=="string"&&(Br(a)||Ir(a))?a=parseFloat(a):!ad(a)&&G.test(i)&&(a=Zn(t,i)),this.setBaseTarget(t,j(a)?a.get():a)),j(a)?a.get():a}setBaseTarget(t,i){this.baseTarget[t]=i}getBaseTarget(t){const{initial:i}=this.props;let a;if(typeof i=="string"||typeof i=="object"){const n=Kn(this.props,i,this.presenceContext?.custom);n&&(a=n[t])}if(i&&a!==void 0)return a;const r=this.getBaseTargetFromProps(this.props,t);return r!==void 0&&!j(r)?r:this.initialValues[t]!==void 0&&a===void 0?void 0:this.baseTarget[t]}on(t,i){return this.events[t]||(this.events[t]=new Lr),this.events[t].add(i)}notify(t,...i){this.events[t]&&this.events[t].notify(...i)}scheduleRenderMicrotask(){Uc.render(this.render)}}class ss extends ns{constructor(){super(...arguments),this.KeyframeResolver=Wc}sortInstanceNodePosition(t,i){return t.compareDocumentPosition(i)&2?1:-1}getBaseTargetFromProps(t,i){const a=t.style;return a?a[i]:void 0}removeValueFromRenderState(t,{vars:i,style:a}){delete i[t],delete a[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:t}=this.props;j(t)&&(this.childSubscription=t.on("change",i=>{this.current&&(this.current.textContent=`${i}`)}))}}function hd({top:e,left:t,right:i,bottom:a}){return{x:{min:t,max:i},y:{min:e,max:a}}}function ud(e,t){if(!t)return e;const i=t({x:e.left,y:e.top}),a=t({x:e.right,y:e.bottom});return{top:i.y,left:i.x,bottom:a.y,right:a.x}}function md(e,t){return hd(ud(e.getBoundingClientRect(),t))}const pd={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},fd=Ot.length;function gd(e,t,i){let a="",r=!0;for(let s=0;s<fd;s++){const o=Ot[s],l=e[o];if(l===void 0)continue;let h=!0;if(typeof l=="number")h=l===(o.startsWith("scale")?1:0);else{const c=parseFloat(l);h=o.startsWith("scale")?c===1:c===0}if(!h||i){const c=Ca(l,Ce[o]);if(!h){r=!1;const d=pd[o]||o;a+=`${d}(${c}) `}i&&(t[o]=c)}}const n=e.pathRotation;return n&&(r=!1,a+=`rotate(${Ca(n,Ce.pathRotation)}) `),a=a.trim(),i?a=i(t,r?"":a):r&&(a="none"),a}function os(e,t,i){const{style:a,vars:r,transformOrigin:n}=e;let s=!1,o=!1;for(const l in t){const h=t[l];if(Rt.has(l)){s=!0;continue}else if(an(l)){r[l]=h;continue}else{const c=Ca(h,Ce[l]);l.startsWith("origin")?(o=!0,n[l]=c):a[l]=c}}if(t.transform||(s||i?a.transform=gd(t,e.transform,i):a.transform&&(a.transform="none")),o){const{originX:l="50%",originY:h="50%",originZ:c=0}=n;a.transformOrigin=`${l} ${h} ${c}`}}function ls(e,{style:t,vars:i},a,r){const n=e.style;let s;for(s in t)n[s]=t[s];r?.applyProjectionStyles(n,a);for(s in i)n.setProperty(s,i[s])}function cs(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}const ie={correct:(e,t)=>{if(!t.target)return e;if(typeof e=="string")if(f.test(e))e=parseFloat(e);else return e;const i=cs(e,t.target.x),a=cs(e,t.target.y);return`${i}% ${a}%`}},vd={correct:(e,{treeScale:t,projectionDelta:i})=>{const a=e,r=G.parse(e);if(r.length>5)return a;const n=G.createTransformer(e),s=typeof r[0]!="number"?1:0,o=i.x.scale*t.x,l=i.y.scale*t.y;r[0+s]/=o,r[1+s]/=l;const h=Pt(o,l,.5);return typeof r[2+s]=="number"&&(r[2+s]/=h),typeof r[3+s]=="number"&&(r[3+s]/=h),n(r)}},bd={borderRadius:{...ie,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:ie,borderTopRightRadius:ie,borderBottomLeftRadius:ie,borderBottomRightRadius:ie,boxShadow:vd};function yd(e,{layout:t,layoutId:i}){return Rt.has(e)||e.startsWith("origin")||(t||i!==void 0)&&(!!bd[e]||e==="opacity")}function ds(e,t,i){const a=e.style,r=t?.style,n={};if(!a)return n;for(const s in a)(j(a[s])||r&&j(r[s])||yd(s,e)||i?.getValue(s)?.liveStyle!==void 0)&&(n[s]=a[s]);return n}function xd(e){return window.getComputedStyle(e)}class wd extends ss{constructor(){super(...arguments),this.type="html",this.renderInstance=ls}readValueFromInstance(t,i){if(Rt.has(i))return this.projection?.isProjecting?fa(i):Ll(t,i);{const a=xd(t),r=(an(i)?a.getPropertyValue(i):a[i])||0;return typeof r=="string"?r.trim():r}}measureInstanceViewportBox(t,{transformPagePoint:i}){return md(t,i)}build(t,i,a){os(t,i,a.transformTemplate)}scrapeMotionValuesFromProps(t,i,a){return ds(t,i,a)}}function kd(e,t){return e in t}class $d extends ns{constructor(){super(...arguments),this.type="object"}readValueFromInstance(t,i){if(kd(i,t)){const a=t[i];if(typeof a=="string"||typeof a=="number")return a}}getBaseTargetFromProps(){}removeValueFromRenderState(t,i){delete i.output[t]}measureInstanceViewportBox(){return za()}build(t,i){Object.assign(t.output,i)}renderInstance(t,{output:i}){Object.assign(t,i)}sortInstanceNodePosition(){return 0}}const Ad={offset:"stroke-dashoffset",array:"stroke-dasharray"},Sd={offset:"strokeDashoffset",array:"strokeDasharray"};function Td(e,t,i=1,a=0,r=!0){e.pathLength=1;const n=r?Ad:Sd;e[n.offset]=`${-a}`,e[n.array]=`${t} ${i}`}const Ed=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function Md(e,{attrX:t,attrY:i,attrScale:a,pathLength:r,pathSpacing:n=1,pathOffset:s=0,...o},l,h,c){if(os(e,o,h),l){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};const{attrs:d,style:u}=e;d.transform&&(u.transform=d.transform,delete d.transform),(u.transform||d.transformOrigin)&&(u.transformOrigin=d.transformOrigin??"50% 50%",delete d.transformOrigin),u.transform&&(u.transformBox=c?.transformBox??"fill-box",delete d.transformBox);for(const m of Ed)d[m]!==void 0&&(u[m]=d[m],delete d[m]);t!==void 0&&(d.x=t),i!==void 0&&(d.y=i),a!==void 0&&(d.scale=a),r!==void 0&&Td(d,r,n,s,!1)}const hs=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),Cd=e=>typeof e=="string"&&e.toLowerCase()==="svg";function Vd(e,t,i,a){ls(e,t,void 0,a);for(const r in t.attrs)e.setAttribute(hs.has(r)?r:Sa(r),t.attrs[r])}function zd(e,t,i){const a=ds(e,t,i);for(const r in e)if(j(e[r])||j(t[r])){const n=Ot.indexOf(r)!==-1?"attr"+r.charAt(0).toUpperCase()+r.substring(1):r;a[n]=e[r]}return a}class Pd extends ss{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=za}getBaseTargetFromProps(t,i){return t[i]}readValueFromInstance(t,i){if(Rt.has(i)){const a=Gn(i);return a&&a.default||0}return i=hs.has(i)?i:Sa(i),t.getAttribute(i)}scrapeMotionValuesFromProps(t,i,a){return zd(t,i,a)}build(t,i,a){Md(t,i,this.isSVGTag,a.transformTemplate,a.style)}renderInstance(t,i,a,r){Vd(t,i,a,r)}mount(t){this.isSVGTag=Cd(t.tagName),super.mount(t)}}function Dd(e,t,i){const a=j(e)?e:Bt(e);return a.start(jn("",a,t,i)),a.animation}function Da(e){return typeof e=="object"&&!Array.isArray(e)}function us(e,t,i,a){return e==null?[]:typeof e=="string"&&Da(t)?Ma(e,i,a):e instanceof NodeList?Array.from(e):Array.isArray(e)?e.filter(r=>r!=null):[e]}function Od(e,t,i){return e*(t+1)+i*t}function ms(e,t,i,a){return typeof t=="number"?t:t.startsWith("-")||t.startsWith("+")?Math.max(0,e+parseFloat(t)):t==="<"?i:t.startsWith("<")?Math.max(0,i+parseFloat(t.slice(1))):a.get(t)??e}function Rd(e,t,i){for(let a=0;a<e.length;a++){const r=e[a];r.at>t&&r.at<i&&(Ki(e,r),a--)}}function Bd(e,t,i,a,r,n){Rd(e,r,n);for(let s=0;s<t.length;s++)e.push({value:t[s],at:Pt(r,n,a[s]),easing:Gr(i,s)})}function Fd(e,t,i=0){const a=t+1+t*i;for(let r=0;r<e.length;r++)e[r]=e[r]/a}function Id(e,t){return e.at===t.at?e.value===null?1:t.value===null?-1:0:e.at-t.at}const _d="easeInOut",Oa=20;function Ld(e,{defaultTransition:t={},...i}={},a,r){const n=t.duration||.3,s=new Map,o=new Map,l={},h=new Map;let c=0,d=0,u=0;for(let m=0;m<e.length;m++){const g=e[m];if(typeof g=="string"){h.set(g,d);continue}else if(!Array.isArray(g)){h.set(g.name,ms(d,g.at,c,h));continue}let[v,b,y={}]=g;y.at!==void 0&&(d=ms(d,y.at,c,h));let R=0;const z=(C,S,O,I=0,T=0)=>{const V=jd(C),{delay:x=0,times:D=ha(V),type:N=t.type||"keyframes",repeat:X,repeatType:q,repeatDelay:at=0,...rt}=S;let{ease:nt=t.ease||"easeOut",duration:Z}=S;const Bs=typeof x=="function"?x(I,T):x,Fs=V.length,Is=ka(N)?N:r?.[N||"keyframes"];if(Fs<=2&&Is){let _t=100;if(Fs===2&&Kd(V)){const ce=V[1]-V[0];_t=Math.abs(ce)}const Lt={...t,...rt};Z!==void 0&&(Lt.duration=K(Z));const pi=gn(Lt,_t,Is);nt=pi.ease,Z=pi.duration}Z??(Z=n);const _s=d+Bs;D.length===1&&D[0]===0&&(D[1]=1);const Ls=D.length-V.length;if(Ls>0&&xn(D,Ls),V.length===1&&V.unshift(null),X&&Tt(X<Oa,`Sequence segments can't repeat ${X} times — ignoring repeat option. Use a value below ${Oa} or apply repeat at the sequence level instead.`),X&&X<Oa){const _t=Z>0?at/Z:0;Z=Od(Z,X,at);const Lt=[...V],pi=[...D];nt=Array.isArray(nt)?[...nt]:[nt];const ce=[...nt],Hs=q==="reverse"||q==="mirror";let Ws=Lt,Ks=ce;Hs&&(Ws=[...Lt].reverse(),q==="reverse"&&(Ks=[...ce].reverse().map(mt=>typeof mt=="function"?Yi(mt):mt)));for(let mt=0;mt<X;mt++){const Us=Hs&&mt%2===0,Xs=Us?Ws:Lt,Uh=Us?Ks:ce,Ns=(mt+1)*(1+_t);_t>0&&(V.push(V[V.length-1]),D.push(Ns),nt.push("linear")),V.push(...Xs);for(let de=0;de<Xs.length;de++)D.push(pi[de]+Ns),nt.push(de===0?"linear":Gr(Uh,de-1))}Fd(D,X,_t)}const js=_s+Z;Bd(O,V,nt,D,_s,js),R=Math.max(Bs+Z,R),u=Math.max(js,u)};if(j(v)){const C=ps(v,o);z(b,y,fs("default",C))}else{const C=us(v,b,a,l),S=C.length;for(let O=0;O<S;O++){b=b,y=y;const I=C[O],T=ps(I,o);for(const V in b)z(b[V],Hd(y,V),fs(V,T),O,S)}}c=d,d+=R}return o.forEach((m,g)=>{for(const v in m){const b=m[v];b.sort(Id);const y=[],R=[],z=[];for(let I=0;I<b.length;I++){const{at:T,value:V,easing:x}=b[I];y.push(V),R.push(we(0,u,T)),z.push(x||"easeOut")}R[0]!==0&&(R.unshift(0),y.unshift(y[0]),z.unshift(_d)),R[R.length-1]!==1&&(R.push(1),y.push(null)),s.has(g)||s.set(g,{keyframes:{},transition:{}});const C=s.get(g);C.keyframes[v]=y;const{type:S,...O}=t;C.transition[v]={...O,duration:u,ease:z,times:R,...i}}}),s}function ps(e,t){return!t.has(e)&&t.set(e,{}),t.get(e)}function fs(e,t){return t[e]||(t[e]=[]),t[e]}function jd(e){return Array.isArray(e)?e:[e]}function Hd(e,t){return e&&e[t]?{...e,...e[t]}:{...e}}const Wd=e=>typeof e=="number",Kd=e=>e.every(Wd);function Ud(e){const t={presenceContext:null,props:{},visualState:{renderState:{transform:{},transformOrigin:{},style:{},vars:{},attrs:{}},latestValues:{}}},i=Va(e)&&!ed(e)?new Pd(t):new wd(t);i.mount(e),ee.set(e,i)}function Xd(e){const t={presenceContext:null,props:{},visualState:{renderState:{output:{}},latestValues:{}}},i=new $d(t);i.mount(e),ee.set(e,i)}function Nd(e,t){return j(e)||typeof e=="number"||typeof e=="string"&&!Da(t)}function gs(e,t,i,a){const r=[];if(Nd(e,t))r.push(Dd(e,Da(t)&&t.default||t,i&&(i.default||i)));else{if(e==null)return r;const n=us(e,t,a),s=n.length;lt(!!s,"No valid elements provided.","no-valid-elements");for(let o=0;o<s;o++){const l=n[o],h=l instanceof Element?Ud:Xd;ee.has(l)||h(l);const c=ee.get(l),d={...i};"delay"in d&&typeof d.delay=="function"&&(d.delay=d.delay(o,s)),r.push(...Dc(c,{...t,transition:d},{}))}}return r}function qd(e,t,i){const a=[],r=e.map(s=>{if(Array.isArray(s)&&typeof s[0]=="function"){const o=s[0],l=Bt(0);return l.on("change",o),s.length===1?[l,[0,1]]:s.length===2?[l,[0,1],s[1]]:[l,s[1],s[2]]}return s});return Ld(r,t,i,{spring:Jt}).forEach(({keyframes:s,transition:o},l)=>{a.push(...gs(l,s,o))}),a}function Yd(e){return Array.isArray(e)&&e.some(Array.isArray)}function Gd(e={}){const{scope:t,reduceMotion:i,skipAnimations:a}=e;function r(n,s,o){let l=[],h;const c={};if(i!==void 0&&(c.reduceMotion=i),a!==void 0&&(c.skipAnimations=a),Yd(n)){const{onComplete:u,...m}=s||{};typeof u=="function"&&(h=u),l=qd(n,{...c,...m},t)}else{const{onComplete:u,...m}=o||{};typeof u=="function"&&(h=u),l=gs(n,s,{...c,...m},t)}const d=new dc(l);return h&&d.finished.then(h),t&&(t.animations.push(d),d.finished.then(()=>{Ki(t.animations,d)})),d}return r}const Ra=Gd();function De(e){return typeof window>"u"?!1:e?ql():Cn()}const Zd=50,vs=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Qd=()=>({time:0,x:vs(),y:vs()}),Jd={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function bs(e,t,i,a){const r=i[t],{length:n,position:s}=Jd[t],o=r.current,l=i.time;r.current=Math.abs(e[`scroll${s}`]),r.scrollLength=e[`scroll${n}`]-e[`client${n}`],r.offset.length=0,r.offset[0]=0,r.offset[1]=r.scrollLength,r.progress=we(0,r.scrollLength,r.current);const h=a-l;r.velocity=h>Zd?0:Ni(r.current-o,h)}function th(e,t,i){bs(e,"x",t,i),bs(e,"y",t,i),t.time=i}function eh(e,t){const i={x:0,y:0};let a=e;for(;a&&a!==t;)if(Kc(a))i.x+=a.offsetLeft,i.y+=a.offsetTop,a=a.offsetParent;else if(a.tagName==="svg"){const r=a.getBoundingClientRect();a=a.parentElement;const n=a.getBoundingClientRect();i.x+=r.left-n.left,i.y+=r.top-n.top}else if(a instanceof SVGGraphicsElement){const{x:r,y:n}=a.getBBox();i.x+=r,i.y+=n;let s=null,o=a.parentNode;for(;!s;)o.tagName==="svg"&&(s=o),o=a.parentNode;a=s}else break;return i}const Ba={start:0,center:.5,end:1};function ys(e,t,i=0){let a=0;if(e in Ba&&(e=Ba[e]),typeof e=="string"){const r=parseFloat(e);e.endsWith("px")?a=r:e.endsWith("%")?e=r/100:e.endsWith("vw")?a=r/100*document.documentElement.clientWidth:e.endsWith("vh")?a=r/100*document.documentElement.clientHeight:e=r}return typeof e=="number"&&(a=t*e),i+a}const ih=[0,0];function ah(e,t,i,a){let r=Array.isArray(e)?e:ih,n=0,s=0;return typeof e=="number"?r=[e,e]:typeof e=="string"&&(e=e.trim(),e.includes(" ")?r=e.split(" "):r=[e,Ba[e]?e:"0"]),n=ys(r[0],i,a),s=ys(r[1],t),n-s}const ae={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},rh={x:0,y:0};function nh(e){return"getBBox"in e&&e.tagName!=="svg"?e.getBBox():{width:e.clientWidth,height:e.clientHeight}}function sh(e,t,i){const{offset:a=ae.All}=i,{target:r=e,axis:n="y"}=i,s=n==="y"?"height":"width",o=r!==e?eh(r,e):rh,l=r===e?{width:e.scrollWidth,height:e.scrollHeight}:nh(r),h={width:e.clientWidth,height:e.clientHeight};t[n].offset.length=0;let c=!t[n].interpolate;const d=a.length;for(let u=0;u<d;u++){const m=ah(a[u],h[s],l[s],o[n]);!c&&m!==t[n].interpolatorOffsets[u]&&(c=!0),t[n].offset[u]=m}c&&(t[n].interpolate=yn(t[n].offset,ha(a),{clamp:!1}),t[n].interpolatorOffsets=[...t[n].offset]),t[n].progress=tt(0,1,t[n].interpolate(t[n].current))}function oh(e,t=e,i){if(i.x.targetOffset=0,i.y.targetOffset=0,t!==e){let a=t;for(;a&&a!==e;)i.x.targetOffset+=a.offsetLeft,i.y.targetOffset+=a.offsetTop,a=a.offsetParent}i.x.targetLength=t===e?t.scrollWidth:t.clientWidth,i.y.targetLength=t===e?t.scrollHeight:t.clientHeight,i.x.containerLength=e.clientWidth,i.y.containerLength=e.clientHeight,process.env.NODE_ENV!=="production"&&e&&t&&t!==e&&e!==document.documentElement&&e!==document.scrollingElement&&e!==document.body&&qi(getComputedStyle(e).position!=="static","Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.")}function lh(e,t,i,a={}){return{measure:r=>{oh(e,a.target,i),th(e,i,r),(a.offset||a.target)&&sh(e,i,a)},notify:()=>t(i)}}const It=new WeakMap,xs=new WeakMap,Fa=new WeakMap,ws=new WeakMap,Oe=new WeakMap,ks=e=>e===document.scrollingElement?window:e;function $s(e,{container:t=document.scrollingElement,trackContentSize:i=!1,...a}={}){if(!t)return dt;let r=Fa.get(t);r||(r=new Set,Fa.set(t,r));const n=Qd(),s=lh(t,e,n,a);if(r.add(s),!It.has(t)){const l=()=>{for(const u of r)u.measure(Yt.timestamp);L.preUpdate(h)},h=()=>{for(const u of r)u.notify()},c=()=>L.read(l);It.set(t,c);const d=ks(t);window.addEventListener("resize",c),t!==document.documentElement&&xs.set(t,td(t,c)),d.addEventListener("scroll",c),c()}if(i&&!Oe.has(t)){const l=It.get(t),h={width:t.scrollWidth,height:t.scrollHeight};ws.set(t,h);const c=()=>{const u=t.scrollWidth,m=t.scrollHeight;(h.width!==u||h.height!==m)&&(l(),h.width=u,h.height=m)},d=L.read(c,!0);Oe.set(t,d)}const o=It.get(t);return L.read(o,!1,!0),()=>{Et(o);const l=Fa.get(t);if(!l||(l.delete(s),l.size))return;const h=It.get(t);It.delete(t),h&&(ks(t).removeEventListener("scroll",h),xs.get(t)?.(),window.removeEventListener("resize",h));const c=Oe.get(t);c&&(Et(c),Oe.delete(t)),ws.delete(t)}}const ch=[[ae.Enter,"entry"],[ae.Exit,"exit"],[ae.Any,"cover"],[ae.All,"contain"]],As={start:0,end:1};function dh(e){const t=e.trim().split(/\s+/);if(t.length!==2)return;const i=As[t[0]],a=As[t[1]];if(!(i===void 0||a===void 0))return[i,a]}function hh(e){if(e.length!==2)return;const t=[];for(const i of e)if(Array.isArray(i))t.push(i);else if(typeof i=="string"){const a=dh(i);if(!a)return;t.push(a)}else return;return t}function uh(e,t){const i=hh(e);if(!i)return!1;for(let a=0;a<2;a++){const r=i[a],n=t[a];if(r[0]!==n[0]||r[1]!==n[1])return!1}return!0}function Ss(e){if(!e)return{rangeStart:"contain 0%",rangeEnd:"contain 100%"};for(const[t,i]of ch)if(uh(e,t))return{rangeStart:`${i} 0%`,rangeEnd:`${i} 100%`}}const Ts=new Map;function Es(e){const t={value:0},i=$s(a=>{t.value=a[e.axis].progress*100},e);return{currentTime:t,cancel:i}}function Ms({source:e,container:t,...i}){const{axis:a}=i;e&&(t=e);let r=Ts.get(t);r||(r=new Map,Ts.set(t,r));const n=i.target??"self";let s=r.get(n);s||(s={},r.set(n,s));const o=a+(i.offset??[]).join(",");return s[o]||(i.target&&De(i.target)?Ss(i.offset)?s[o]=new ViewTimeline({subject:i.target,axis:a}):s[o]=Es({container:t,...i}):De()?s[o]=new ScrollTimeline({source:t,axis:a}):s[o]=Es({container:t,...i})),s[o]}function mh(e,t){const i=Ms(t),a=t.target?Ss(t.offset):void 0,r=t.target?De(t.target)&&!!a:De();return e.attachTimeline({timeline:r?i:void 0,...a&&r&&{rangeStart:a.rangeStart,rangeEnd:a.rangeEnd},observe:n=>(n.pause(),Jn(s=>{n.time=n.iterationDuration*s},i))})}function ph(e){return e&&(e.target||e.offset)}function fh(e){return e.length===2}function gh(e,t){return fh(e)||ph(t)?$s(i=>{e(i[t.axis].progress,i)},t):Jn(e,Ms(t))}function vh(e,{axis:t="y",container:i=document.scrollingElement,...a}={}){if(!i)return dt;const r={axis:t,container:i,...a};return typeof e=="function"?gh(e,r):mh(e,r)}const bh={some:0,all:1};function yh(e,t,{root:i,margin:a,amount:r="some"}={}){const n=Ma(e),s=new WeakMap,o=h=>{h.forEach(c=>{const d=s.get(c.target);if(c.isIntersecting!==!!d)if(c.isIntersecting){const u=t(c.target,c);typeof u=="function"?s.set(c.target,u):l.unobserve(c.target)}else typeof d=="function"&&(d(c),s.delete(c.target))})},l=new IntersectionObserver(o,{root:i,rootMargin:a,threshold:typeof r=="number"?r:bh[r]});return n.forEach(h=>l.observe(h)),()=>l.disconnect()}const Cs=Ra,Qe=class Qe extends ${constructor(){super(),this.beamAnimations=[],this.variant="beam",this.height="screen",this.intensity="normal",this.animated=!0}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>this.startBeamAnimations())}disconnectedCallback(){this.stopBeamAnimations(),super.disconnectedCallback()}updated(t){(t.has("animated")||t.has("variant"))&&this.startBeamAnimations()}startBeamAnimations(){if(this.stopBeamAnimations(),!this.animated||this.variant!=="beam"||this.shouldReduceMotion())return;const t=this.shadowRoot?.querySelector(".beam-a"),i=this.shadowRoot?.querySelector(".beam-b");if(!(!t||!i))try{this.beamAnimations=[Cs(t,{transform:["translate(-50%, -50%) rotate(0deg)","translate(-50%, -50%) rotate(28deg)"]},{duration:1.8,delay:.2,ease:[.25,.46,.45,.94],fill:"forwards"}),Cs(i,{transform:["translate(-50%, -50%) rotate(0deg)","translate(-50%, -50%) rotate(148deg)"]},{duration:1.8,delay:.2,ease:[.25,.46,.45,.94],fill:"forwards"})]}catch{t.style.transform="translate(-50%, -50%) rotate(28deg)",i.style.transform="translate(-50%, -50%) rotate(148deg)"}}stopBeamAnimations(){for(const t of this.beamAnimations)t.stop?.(),t.cancel?.();this.beamAnimations=[]}shouldReduceMotion(){return getComputedStyle(this).getPropertyValue("--nami-motion-normal").trim()==="1ms"||window.matchMedia?.("(prefers-reduced-motion: reduce)").matches}render(){return p`
      <section class="base" part="base">
        <div class="backdrop" part="backdrop" aria-hidden="true"></div>
        <div class="beam beam-a" part="beam-a" aria-hidden="true"></div>
        <div class="beam beam-b" part="beam-b" aria-hidden="true"></div>
        <div class="glow glow-a" part="glow-a" aria-hidden="true"></div>
        <div class="glow glow-b" part="glow-b" aria-hidden="true"></div>
        <div class="content" part="content"><slot></slot></div>
      </section>
    `}};Qe.properties={variant:{reflect:!0},height:{reflect:!0},intensity:{reflect:!0},animated:{type:Boolean,reflect:!0}},Qe.styles=[M,E`
      :host {
        display: block;
      }

      .base {
        --hero-stage-accent: var(--nami-hero-stage-accent, var(--nami-color-primary, #3b82f6));
        --hero-stage-bg: var(--nami-hero-stage-bg, var(--nami-surface, #fff));
        --hero-stage-opacity: 0.46;
        --hero-stage-glow-opacity: 0.12;
        align-items: center;
        background:
          var(--nami-style-background-pattern, none),
          var(--hero-stage-bg);
        background-size: var(--nami-style-background-size, auto);
        color: var(--nami-text, #171717);
        display: grid;
        isolation: isolate;
        min-block-size: auto;
        overflow: hidden;
        padding: var(--nami-hero-stage-padding, clamp(48px, 9vw, 120px) var(--nami-layout-gutter, 16px));
        position: relative;
      }

      :host([height='screen']) .base {
        min-block-size: var(--nami-hero-stage-screen-height, min(100dvh, 860px));
      }

      :host([height='compact']) .base {
        min-block-size: var(--nami-hero-stage-compact-height, 360px);
        padding-block: clamp(32px, 7vw, 72px);
      }

      :host([intensity='soft']) .base {
        --hero-stage-opacity: 0.28;
        --hero-stage-glow-opacity: 0.08;
      }

      :host([intensity='strong']) .base {
        --hero-stage-opacity: 0.64;
        --hero-stage-glow-opacity: 0.18;
      }

      .backdrop {
        background:
          radial-gradient(circle at 18% 28%, color-mix(in oklab, var(--hero-stage-accent), transparent 88%), transparent 28%),
          radial-gradient(circle at 82% 72%, color-mix(in oklab, var(--hero-stage-accent), transparent 88%), transparent 30%);
        inset: 0;
        pointer-events: none;
        position: absolute;
        z-index: -3;
      }

      .beam,
      .glow {
        pointer-events: none;
        position: absolute;
        z-index: -2;
      }

      .beam {
        background: var(--hero-stage-accent);
        block-size: clamp(18px, 3.5vw, 42px);
        border-radius: 999px;
        filter: blur(30px);
        inline-size: min(160vw, 1120px);
        inset-block-start: 50%;
        inset-inline-start: 50%;
        opacity: var(--hero-stage-opacity);
        transform: translate(-50%, -50%) rotate(24deg);
        transform-origin: center;
      }

      .beam-b {
        transform: translate(-50%, -50%) rotate(154deg);
      }

      .glow {
        aspect-ratio: 1;
        background: var(--hero-stage-accent);
        border-radius: 999px;
        filter: blur(54px);
        inline-size: min(34vw, 360px);
        opacity: var(--hero-stage-glow-opacity);
      }

      .glow-a {
        inset-block-start: 18%;
        inset-inline-start: -8%;
      }

      .glow-b {
        inset-block-end: 12%;
        inset-inline-end: -10%;
      }

      :host([variant='glow']) .beam,
      :host([variant='none']) .beam,
      :host([variant='none']) .glow,
      :host([variant='none']) .backdrop {
        display: none;
      }

      .content {
        margin-inline: auto;
        max-inline-size: var(--nami-hero-stage-content-width, var(--nami-container-lg, 1240px));
        position: relative;
        width: min(100%, var(--nami-hero-stage-content-width, var(--nami-container-lg, 1240px)));
        z-index: 1;
      }

      :host([animated]) .glow-a {
        animation: nami-hero-float-a 8s ease-in-out infinite;
      }

      :host([animated]) .glow-b {
        animation: nami-hero-float-b 9s ease-in-out infinite;
      }

      @keyframes nami-hero-float-a {
        0%,
        100% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(-18px);
        }
      }

      @keyframes nami-hero-float-b {
        0%,
        100% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(14px);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        :host([animated]) .glow-a,
        :host([animated]) .glow-b {
          animation: none;
        }
      }
    `];let Ia=Qe;k("nami-spinner",St);const Je=class Je extends ${constructor(){super(),ot(this),this.label="",this.disabled=!1,this.selected=!1,this.loading=!1}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}P(this,"nami-click",{sourceEvent:t,selected:this.selected})}render(){return p`
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
          ${this.loading?p`<nami-spinner size="sm" label=${Q("Loading",{id:"nami.spinner.loading"})}></nami-spinner>`:p`<slot></slot><slot name="icon"></slot>`}
        </span>
      </button>
    `}};Je.properties={label:{},size:{reflect:!0},disabled:{type:Boolean,reflect:!0},selected:{type:Boolean,reflect:!0},loading:{type:Boolean,reflect:!0}},Je.styles=[M,vo,E`
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
    `];let _a=Je;const se=class se extends ${constructor(){super(),this.internals=be(this),this.metaId=`${ji("nami-input")}-meta`,this.name="",this.value="",this.defaultValue="",this.type="text",this.placeholder="",this.label="",this.helperText="",this.error="",this.disabled=!1,this.required=!1}get inputElement(){return this.renderRoot.querySelector("input")}updated(){ye(this.internals,this.disabled?null:this.value),Pi(this.internals,this.validityFlags,this.validityMessage,this.inputElement??void 0)}formResetCallback(){this.value=this.defaultValue}focus(){this.inputElement?.focus()}checkValidity(){return this.inputElement?.checkValidity()??Object.keys(this.validityFlags).length===0}reportValidity(){return this.inputElement?.reportValidity()??this.checkValidity()}get validity(){return this.inputElement?.validity}get validationMessage(){return this.error||this.inputElement?.validationMessage||""}get willValidate(){return!this.disabled}get validityFlags(){return this.disabled?{}:this.error?{customError:!0}:this.required&&!this.value?{valueMissing:!0}:{}}get validityMessage(){if(!this.disabled){if(this.error)return this.error;if(this.required&&!this.value)return`${this.label||this.name||"Field"} is required`}}handleInput(t){this.value=t.target.value,P(this,"nami-input",{value:this.value,sourceEvent:t})}handleChange(t){P(this,"nami-change",{value:this.value,sourceEvent:t})}render(){const t=this.id?`${this.id}-meta`:this.metaId,i=this.error||this.helperText;return p`
      <label part="base">
        ${this.label?p`<span class="label" part="label">${this.label}${this.required?" *":""}</span>`:A}
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
            aria-describedby=${i?t:A}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          <slot name="actions"></slot>
        </span>
      </label>
      ${i?p`<div id=${t} class="meta ${this.error?"error":""}" part=${this.error?"error":"description"}>${i}</div>`:A}
    `}};se.formAssociated=!0,se.properties={name:{},value:{},defaultValue:{attribute:"default-value"},type:{},placeholder:{},label:{},helperText:{attribute:"helper-text"},error:{reflect:!0,useDefault:!0},disabled:{type:Boolean,reflect:!0},required:{type:Boolean,reflect:!0}},se.styles=[M,E`
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
    `];let La=se;const ti=class ti extends ${constructor(){super(),this.value=0,this.max=100,this.label="",this.indeterminate=!1}updated(){const t=this.max>0?Math.min(100,Math.max(0,this.value/this.max*100)):0;this.style.setProperty("--nami-progress-value",`${t}%`),this.dataset.state=this.indeterminate?"indeterminate":"determinate"}render(){const t=this.max>0?Math.min(this.max,Math.max(0,this.value)):0;return this.max>0&&t/this.max*100,p`
      <div
        class="track"
        part="base track"
        role="progressbar"
        aria-label=${this.label||"Progress"}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate?A:t}
      >
        <div class="fill" part="indicator"></div>
      </div>
    `}};ti.properties={value:{type:Number,reflect:!0},max:{type:Number,reflect:!0},label:{},indeterminate:{type:Boolean,reflect:!0}},ti.styles=[M,E`
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
    `];let ja=ti;const ei=class ei extends ${constructor(){super(),this.value="",this.label="",this.description="",this.selected=!1,this.disabled=!1}select(t){this.disabled||this.selected||(this.selected=!0,P(this,"nami-select",{selected:!0,value:this.value,sourceEvent:t}),P(this,"nami-change",{selected:!0,value:this.value,sourceEvent:t}))}render(){return p`
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
        ${this.description?p`<span class="description" part="description"><slot name="description">${this.description}</slot></span>`:A}
        <slot name="actions"></slot>
      </button>
    `}};ei.properties={value:{},label:{},description:{},selected:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}},ei.styles=[M,E`
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
    `];let Ha=ei;k("nami-illustration",Nt);const xh={success:"success",error:"error",info:"info",warning:"warning",403:"forbidden",404:"not-found",500:"server-error"},ii=class ii extends ${constructor(){super(),ot(this),this.status="info",this.title="",this.subTitle="",this.compact=!1}get illustrationName(){return xh[this.status]??"info"}render(){return p`
      <section class="base" part="base" aria-label=${this.title||this.subTitle||Q("Result",{id:"nami.result.aria"})}>
        <slot name="illustration" part="illustration">
          <nami-illustration name=${this.illustrationName} size=${this.compact?"sm":"lg"}></nami-illustration>
        </slot>
        ${this.title?p`<div class="title" part="title"><slot name="title">${this.title}</slot></div>`:A}
        ${this.subTitle?p`<div class="description" part="description"><slot name="description">${this.subTitle}</slot></div>`:A}
        <div class="body" part="body"><slot name="body"></slot></div>
        <div class="actions" part="actions"><slot name="actions"></slot></div>
      </section>
    `}};ii.properties={status:{reflect:!0},title:{reflect:!0},subTitle:{attribute:"sub-title",reflect:!0},compact:{type:Boolean,reflect:!0}},ii.styles=[M,E`
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
    `];let Wa=ii;const ai=class ai extends ${constructor(){super(),this.lastY=0,this.stateSnapshot="",this.handleNativeScroll=()=>{this.syncFromScroll(this.readScrollY())},this.threshold=20,this.hideThreshold=56,this.hidden=!1,this.elevated=!1,this.direction="idle"}connectedCallback(){super.connectedCallback(),this.lastY=this.readScrollY(),this.syncFromScroll(this.lastY),window.addEventListener("scroll",this.handleNativeScroll,{passive:!0});try{this.motionCancel=vh((t,i)=>{this.syncFromScroll(i.y.current,t)})}catch{this.motionCancel=void 0}}disconnectedCallback(){window.removeEventListener("scroll",this.handleNativeScroll),this.motionCancel?.(),this.motionCancel=void 0,super.disconnectedCallback()}sync(){this.syncFromScroll(this.readScrollY())}readScrollY(){return Math.max(0,window.scrollY||document.documentElement.scrollTop||0)}readProgress(t){const i=document.documentElement,a=Math.max(1,i.scrollHeight-window.innerHeight);return Math.min(1,Math.max(0,t/a))}syncFromScroll(t,i=this.readProgress(t)){const a=t>this.lastY?"down":t<this.lastY?"up":this.direction,r=t>Number(this.threshold),n=a==="down"&&t>Number(this.hideThreshold);this.lastY=t,this.direction=a,this.elevated=r,this.hidden=n;const s={scrollY:Math.round(t),progress:i,direction:this.direction,hidden:this.hidden,elevated:this.elevated},o=JSON.stringify(s);o!==this.stateSnapshot&&(this.stateSnapshot=o,P(this,"nami-scroll-state",s))}render(){return p`
      <div class="base" part="base">
        <div class="backdrop" part="backdrop" aria-hidden="true"></div>
        <div class="content" part="content"><slot></slot></div>
        <div class="edge" part="edge" aria-hidden="true"></div>
      </div>
    `}};ai.properties={threshold:{type:Number,reflect:!0},hideThreshold:{attribute:"hide-threshold",type:Number,reflect:!0},hidden:{type:Boolean,reflect:!0},elevated:{type:Boolean,reflect:!0},direction:{reflect:!0}},ai.styles=[M,E`
      :host {
        --scroll-header-bg: var(--nami-scroll-header-bg, var(--nami-surface-overlay, color-mix(in oklab, #fff, transparent 18%)));
        --scroll-header-border: var(--nami-scroll-header-border, var(--nami-border, color-mix(in oklab, #000, transparent 88%)));
        --scroll-header-height: var(--nami-scroll-header-height, 56px);
        --scroll-header-shadow: var(
          --nami-scroll-header-shadow,
          0 12px 32px color-mix(in oklab, var(--nami-shadow-color, #64748b), transparent 78%)
        );
        --scroll-header-z-index: var(--nami-scroll-header-z-index, 40);
        display: block;
        position: sticky;
        top: var(--nami-scroll-header-top, 0);
        z-index: var(--scroll-header-z-index);
      }

      .base {
        color: var(--nami-text, #171717);
        min-height: var(--scroll-header-height);
        position: relative;
        transform: translateY(0);
        transition:
          transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          box-shadow var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
        will-change: transform;
      }

      :host([hidden]) .base {
        transform: translateY(-100%);
      }

      .backdrop {
        background: var(--scroll-header-bg);
        inset: 0;
        opacity: 0;
        position: absolute;
        transition:
          opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          backdrop-filter var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      :host([elevated]) .backdrop {
        -webkit-backdrop-filter: blur(20px) saturate(1.32);
        backdrop-filter: blur(20px) saturate(1.32);
        opacity: 1;
      }

      :host([elevated]) .base {
        box-shadow: var(--scroll-header-shadow);
      }

      .edge {
        background: linear-gradient(90deg, transparent, var(--scroll-header-border), var(--nami-color-primary, #3b82f6), var(--scroll-header-border), transparent);
        block-size: var(--nami-scroll-header-edge-height, 1px);
        inset-block-end: 0;
        inset-inline: 0;
        opacity: 0;
        position: absolute;
        transition: opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      :host([elevated]) .edge {
        opacity: 1;
      }

      .content {
        align-items: center;
        display: flex;
        min-height: var(--scroll-header-height);
        position: relative;
        z-index: 1;
      }

      @media (prefers-reduced-motion: reduce) {
        .base,
        .backdrop,
        .edge {
          transition-duration: 1ms;
        }
      }
    `];let Ka=ai;const Re={"fade-up":{initial:{opacity:0,transform:"translateY(24px)"},visible:{opacity:1,transform:"translateY(0)"}},"fade-in":{initial:{opacity:0},visible:{opacity:1}},"slide-left":{initial:{opacity:0,transform:"translateX(32px)"},visible:{opacity:1,transform:"translateX(0)"}},"slide-right":{initial:{opacity:0,transform:"translateX(-32px)"},visible:{opacity:1,transform:"translateX(0)"}},"scale-in":{initial:{opacity:0,transform:"scale(0.96)"},visible:{opacity:1,transform:"scale(1)"}},"line-expand":{initial:{opacity:0,clipPath:"inset(0 100% 0 0)"},visible:{opacity:1,clipPath:"inset(0 0% 0 0)"}}},ri=class ri extends ${constructor(){super(),this.effect="fade-up",this.once=!0,this.amount="some",this.margin="0px 0px -10% 0px",this.delay=0,this.duration=420,this.inViewState=!1,this.revealed=!1}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>this.setupObserver())}disconnectedCallback(){this.cleanup(),super.disconnectedCallback()}updated(t){[...t.keys()].some(i=>["amount","margin","once"].includes(String(i)))&&this.isConnected&&this.setupObserver()}reveal(){this.inViewState=!0,this.revealed=!0;const t=this.shadowRoot?.querySelector('[part~="base"]');if(!t||this.shouldReduceMotion()){t?.style.removeProperty("opacity"),t?.style.removeProperty("transform"),t?.style.removeProperty("clip-path"),P(this,"nami-reveal",{effect:this.effect});return}const i=Re[this.effect]??Re["fade-up"];this.playback?.stop?.();try{this.playback=Ra(t,i.visible,{duration:Math.max(0,Number(this.duration))/1e3,delay:Math.max(0,Number(this.delay))/1e3,ease:[.25,.46,.45,.94]})}catch{Object.assign(t.style,i.visible)}P(this,"nami-reveal",{effect:this.effect})}hide(){if(this.once)return;this.inViewState=!1,this.revealed=!1;const t=this.shadowRoot?.querySelector('[part~="base"]');if(!t||this.shouldReduceMotion()){P(this,"nami-hide",{effect:this.effect});return}const i=Re[this.effect]??Re["fade-up"];this.playback?.stop?.();try{this.playback=Ra(t,i.initial,{duration:Math.max(0,Number(this.duration))/1e3,ease:[.25,.46,.45,.94]})}catch{Object.assign(t.style,i.initial)}P(this,"nami-hide",{effect:this.effect})}setupObserver(){if(this.cleanup(),!this.isConnected)return;if(!("IntersectionObserver"in window)){this.reveal();return}const i={amount:this.normalizedAmount,margin:this.margin||"0px"};try{this.stopInView=yh(this,()=>(this.reveal(),()=>this.hide()),i)}catch{this.reveal()}}cleanup(){this.stopInView?.(),this.stopInView=void 0,this.playback?.stop?.(),this.playback?.cancel?.(),this.playback=void 0}get normalizedAmount(){if(this.amount==="all"||this.amount==="some")return this.amount;const t=Number(this.amount);return Number.isFinite(t)?Math.min(1,Math.max(0,t)):"some"}shouldReduceMotion(){return getComputedStyle(this).getPropertyValue("--nami-motion-normal").trim()==="1ms"||window.matchMedia?.("(prefers-reduced-motion: reduce)").matches}render(){return p`<div class="base" part="base"><slot></slot></div>`}};ri.properties={effect:{reflect:!0},once:{type:Boolean,reflect:!0},amount:{reflect:!0},margin:{reflect:!0},delay:{type:Number,reflect:!0},duration:{type:Number,reflect:!0},inViewState:{attribute:"in-view",type:Boolean,reflect:!0},revealed:{type:Boolean,reflect:!0}},ri.styles=[M,E`
      :host {
        display: block;
      }

      .base {
        opacity: 0;
        transform: translateY(24px);
        transform-origin: center;
        will-change: opacity, transform, clip-path;
      }

      :host([effect='fade-in']) .base {
        transform: none;
      }

      :host([effect='slide-left']) .base {
        transform: translateX(32px);
      }

      :host([effect='slide-right']) .base {
        transform: translateX(-32px);
      }

      :host([effect='scale-in']) .base {
        transform: scale(0.96);
      }

      :host([effect='line-expand']) .base {
        clip-path: inset(0 100% 0 0);
        transform: none;
      }

      :host([revealed]) .base {
        clip-path: inset(0 0 0 0);
        opacity: 1;
        transform: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .base {
          clip-path: none;
          opacity: 1;
          transform: none;
        }
      }
    `];let Ua=ri;const ni=class ni extends ${constructor(){super(),this.variant="text",this.animated=!0}updated(){this.dataset.state=this.animated?"loading":"idle"}render(){return p`<span class="base" part="base" aria-hidden="true"><slot></slot></span>`}};ni.properties={variant:{reflect:!0},animated:{type:Boolean,reflect:!0}},ni.styles=[M,E`
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
    `];let Xa=ni;const si=class si extends ${constructor(){super(),this.min="",this.gap="md",this.ratio="even"}updated(){this.style.containerType="inline-size",this.min?this.style.setProperty("--nami-split-min",this.min):this.style.removeProperty("--nami-split-min")}render(){return p`<div class="base" part="base"><slot></slot></div>`}};si.properties={min:{reflect:!0},gap:{reflect:!0},ratio:{reflect:!0}},si.styles=[M,E`
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
    `];let Na=si;k("nami-spinner",St);const oi=class oi extends ${constructor(){super(),this.hideTimer=0,this.shownAt=0,ot(this),this.active=!1,this.appearance="veil",this.duration=240,this.hasDefaultContent=!1,this.label="",this.tone="surface",this.variant="screen",this.visible=!1}connectedCallback(){super.connectedCallback(),this.active&&(this.visible=!0,this.shownAt=Date.now())}disconnectedCallback(){window.clearTimeout(this.hideTimer),this.hideResolver?.(),super.disconnectedCallback()}updated(t){if(!t.has("active"))return;if(window.clearTimeout(this.hideTimer),this.active){this.hideResolver?.(),this.hideComplete=void 0,this.visible=!0,this.shownAt=Date.now();return}const i=Date.now()-this.shownAt,a=Math.max(0,Number(this.duration)-i);this.hideComplete=new Promise(r=>{this.hideResolver=r}),this.hideTimer=window.setTimeout(()=>{this.active||(this.visible=!1),this.hideResolver?.(),this.hideResolver=void 0},a)}show(t={}){this.applyOptions(t),this.visible=!0,this.shownAt=Date.now(),this.active=!0}async hide(t={}){this.applyOptions(t),this.active=!1,await this.updateComplete,this.hideComplete&&await this.hideComplete}async waitFor(t,i={}){const a=i.minDuration??i.duration??this.duration,r=Date.now();this.show(i);try{return await(typeof t=="function"?t():t)}finally{const n=Math.max(0,Number(a)-(Date.now()-r));n>0&&await new Promise(s=>window.setTimeout(s,n)),await this.hide(i)}}applyOptions(t){t.appearance&&(this.appearance=t.appearance),t.duration!==void 0&&(this.duration=t.duration),t.label!==void 0&&(this.label=t.label),t.tone&&(this.tone=t.tone),t.variant&&(this.variant=t.variant)}handleSlotChange(t){const i=t.target;this.hasDefaultContent=i.assignedNodes({flatten:!0}).some(a=>a.nodeType===Node.TEXT_NODE?!!a.textContent?.trim():!0)}get fallbackLabel(){return this.label||Q("Preparing interface",{id:"nami.pageTransition.preparing"})}render(){return this.visible?p`
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
    `:A}};oi.properties={active:{type:Boolean,reflect:!0},appearance:{reflect:!0},duration:{type:Number,reflect:!0},hasDefaultContent:{state:!0},label:{},tone:{reflect:!0},variant:{reflect:!0},visible:{state:!0}},oi.styles=[M,E`
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
    `];let qa=oi;const li=class li extends ${constructor(){super(),this.gap="md",this.direction="vertical",this.align="",this.justify=""}updated(){this.align?this.style.setProperty("--nami-stack-align",this.align):this.style.removeProperty("--nami-stack-align"),this.justify?this.style.setProperty("--nami-stack-justify",this.justify):this.style.removeProperty("--nami-stack-justify")}render(){return p`<div class="base" part="base"><slot></slot></div>`}};li.properties={gap:{reflect:!0},direction:{reflect:!0},align:{reflect:!0},justify:{reflect:!0}},li.styles=[M,E`
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
    `];let Ya=li;const oe=class oe extends ${constructor(){super(),this.internals=be(this),this.name="",this.value="on",this.checked=!1,this.disabled=!1}updated(){ye(this.internals,!this.disabled&&this.checked?this.value:null)}formResetCallback(){this.checked=!1}toggle(t){this.disabled||(this.checked=!this.checked,P(this,"nami-change",{checked:this.checked,value:this.value,sourceEvent:t}))}render(){return p`
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
    `}};oe.formAssociated=!0,oe.properties={name:{},value:{},checked:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}},oe.styles=[M,E`
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
    `];let Ga=oe;function Be(e){return e.getAttribute("value")||e.dataset.value||e.textContent?.trim()||""}function wh(e,t,i,a){const r=a==="vertical"?["ArrowDown"]:["ArrowRight"],n=a==="vertical"?["ArrowUp"]:["ArrowLeft"];return e==="Home"?0:e==="End"?i-1:r.includes(e)?(t+1)%i:n.includes(e)?(t-1+i)%i:t}const ci=class ci extends ${constructor(){super(),this.handleItemClick=t=>{const i=t.currentTarget;this.isItemDisabled(i)||this.selectItem(i,t)},this.handleItemKeydown=t=>{if(!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp","Home","End"].includes(t.key))return;t.preventDefault();const i=t.currentTarget,a=this.enabledItems,r=a.indexOf(i);if(r<0||a.length===0)return;const n=wh(t.key,r,a.length,this.orientation),s=a[n];s?.focus(),s&&this.selectItem(s,t)},this.value="",this.orientation="horizontal"}get items(){return this.renderRoot.querySelector("slot")?.assignedElements({flatten:!0})??[]}get enabledItems(){return this.items.filter(t=>!this.isItemDisabled(t))}firstUpdated(){this.syncItems()}updated(){this.syncItems()}syncItems(){const t=this.enabledItems;if(t.length===0){this.items.length===0&&this.value!==""&&(this.value=""),this.items.forEach(r=>{r.setAttribute("role","tab"),r.setAttribute("aria-disabled",this.isItemDisabled(r)?"true":"false"),r.setAttribute("tabindex","-1")});return}const a=t.some(r=>Be(r)===this.value)?this.value:Be(t[0])||"";this.value!==a&&(this.value=a),this.items.forEach(r=>{const n=Be(r),s=this.isItemDisabled(r),o=!s&&n===a;r.setAttribute("role","tab"),r.setAttribute("aria-selected",String(o)),s?r.setAttribute("aria-disabled","true"):r.removeAttribute("aria-disabled"),r.setAttribute("tabindex",o?"0":"-1"),r.removeEventListener("click",this.handleItemClick),r.removeEventListener("keydown",this.handleItemKeydown),r.addEventListener("click",this.handleItemClick),r.addEventListener("keydown",this.handleItemKeydown)})}isItemDisabled(t){return t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"||!!t.disabled}selectItem(t,i){const a=Be(t);!a||a===this.value||(this.value=a,this.syncItems(),P(this,"nami-select",{value:a,sourceEvent:i}),P(this,"nami-change",{value:a,sourceEvent:i}))}render(){return p`
      <div class="base" part="base" role="tablist" aria-orientation=${this.orientation}>
        <slot @slotchange=${()=>this.syncItems()}></slot>
      </div>
    `}};ci.properties={value:{},orientation:{reflect:!0}},ci.styles=[M,E`
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
    `];let Za=ci;const le=class le extends ${constructor(){super(),this.internals=be(this),this.metaId=`${ji("nami-textarea")}-meta`,this.name="",this.value="",this.defaultValue="",this.placeholder="",this.label="",this.helperText="",this.error="",this.disabled=!1,this.required=!1,this.rows=4}get textareaElement(){return this.renderRoot.querySelector("textarea")}updated(){this.dataset.state=this.error?"invalid":"valid",this.toggleAttribute("data-disabled",this.disabled),this.toggleAttribute("data-invalid",!!this.error),ye(this.internals,this.disabled?null:this.value),Pi(this.internals,this.validityFlags,this.validityMessage,this.textareaElement??void 0)}formResetCallback(){this.value=this.defaultValue}focus(){this.textareaElement?.focus()}checkValidity(){return this.textareaElement?.checkValidity()??Object.keys(this.validityFlags).length===0}reportValidity(){return this.textareaElement?.reportValidity()??this.checkValidity()}get validityFlags(){return this.disabled?{}:this.error?{customError:!0}:this.required&&!this.value?{valueMissing:!0}:{}}get validityMessage(){if(!this.disabled){if(this.error)return this.error;if(this.required&&!this.value)return`${this.label||this.name||"Field"} is required`}}handleInput(t){this.value=t.target.value,P(this,"nami-input",{value:this.value,sourceEvent:t})}handleChange(t){P(this,"nami-change",{value:this.value,sourceEvent:t})}render(){const t=this.id?`${this.id}-meta`:this.metaId,i=this.error||this.helperText;return p`
      <label part="base">
        ${this.label?p`<span class="label" part="label">${this.label}${this.required?" *":""}</span>`:A}
        <textarea
          part="control"
          .value=${this.value}
          name=${this.name}
          placeholder=${this.placeholder}
          rows=${this.rows}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${this.error?"true":"false"}
          aria-describedby=${i?t:A}
          @input=${this.handleInput}
          @change=${this.handleChange}
        ></textarea>
      </label>
      ${i?p`<div id=${t} class="meta ${this.error?"error":""}" part=${this.error?"error":"description"}>${i}</div>`:A}
    `}};le.formAssociated=!0,le.properties={name:{},value:{},defaultValue:{attribute:"default-value"},placeholder:{},label:{},helperText:{attribute:"helper-text"},error:{reflect:!0,useDefault:!0},disabled:{type:Boolean,reflect:!0},required:{type:Boolean,reflect:!0},rows:{type:Number,reflect:!0}},le.styles=[M,E`
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
    `];let Qa=le;const ut={accent:"#3b82f6",mode:"light",stylePreset:"default",density:"comfortable",size:"md",motion:"normal",radius:"round",contrast:"normal"},Vs=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i,H={mode:["light","dark"],stylePreset:["default","illustration"],density:["comfortable","compact"],size:["sm","md","lg"],motion:["normal","reduced"],radius:["sharp","soft","round"],contrast:["normal","high"]};function W(e,t){return typeof e=="string"&&t.includes(e)}function wt(e,t){return{code:"invalid-enum",message:`Unsupported ${String(e)} value "${String(t)}". Falling back to the default theme seed.`,path:e,severity:"warning"}}function kh(e){const t=[];return e.accent!==void 0&&!Vs.test(e.accent)&&t.push({code:"invalid-accent",message:`Accent must be a 3 or 6 digit hex color. Received "${e.accent}".`,path:"accent",severity:"warning"}),e.mode!==void 0&&!W(e.mode,H.mode)&&t.push(wt("mode",e.mode)),e.stylePreset!==void 0&&!W(e.stylePreset,H.stylePreset)&&t.push(wt("stylePreset",e.stylePreset)),e.density!==void 0&&!W(e.density,H.density)&&t.push(wt("density",e.density)),e.size!==void 0&&!W(e.size,H.size)&&t.push(wt("size",e.size)),e.motion!==void 0&&!W(e.motion,H.motion)&&t.push(wt("motion",e.motion)),e.radius!==void 0&&!W(e.radius,H.radius)&&t.push(wt("radius",e.radius)),e.contrast!==void 0&&!W(e.contrast,H.contrast)&&t.push(wt("contrast",e.contrast)),t}function $h(e){return{accent:e.accent&&Vs.test(e.accent)?e.accent:ut.accent,mode:W(e.mode,H.mode)?e.mode:ut.mode,stylePreset:W(e.stylePreset,H.stylePreset)?e.stylePreset:ut.stylePreset,density:W(e.density,H.density)?e.density:ut.density,size:W(e.size,H.size)?e.size:ut.size,motion:W(e.motion,H.motion)?e.motion:ut.motion,radius:W(e.radius,H.radius)?e.radius:ut.radius,contrast:W(e.contrast,H.contrast)?e.contrast:ut.contrast}}function Ah(e){return e.replace(/^--nami-/,"").replace(/([a-z0-9])([A-Z])/g,"$1-$2").replace(/[\s_.]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase()}function zs(e){return e.length===1&&e[0].startsWith("--")?e[0]:`--nami-${e.map(Ah).filter(Boolean).join("-")}`}function Ja(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ps(e){return Ja(e)&&"value"in e}function Sh(e){return String(Ps(e)?e.value:e)}function it(e,t=[]){const i={};if(!e)return i;for(const[a,r]of Object.entries(e)){const n=a.startsWith("--")?[a]:[...t,a];if(Ps(r)||typeof r=="string"||typeof r=="number"){i[zs(n)]=Sh(r);continue}Ja(r)&&Object.assign(i,it(r,n))}return i}function Th(e){const t={};if(!e)return t;for(const[i,a]of Object.entries(e)){const r=Ja(a)&&"tokens"in a?a.tokens:a;Object.assign(t,it(r,[i]))}return t}function Ds(e){return{...it(e?.tokens),...it(e?.semanticTokens),...Th(e?.components)}}function Eh(e,t){const i=t.seed,a=e.cssVariablesResolver?.(t)??{};return{...Ds(e),...Ds(e.modes?.[i.mode]),...it(e.density?.[i.density]),...it(e.size?.[i.size]),...it(e.motion?.[i.motion]),...it(e.radius?.[i.radius]),...it(e.contrast?.[i.contrast]),...Object.fromEntries(Object.entries(a.variables??{}).map(([r,n])=>[r,String(n)])),...Object.fromEntries(Object.entries(a[i.mode]??{}).map(([r,n])=>[r,String(n)]))}}function B(e,t,i){return`color-mix(in oklab, ${e}, ${t} ${i}%)`}function w(e,t){return`color-mix(in oklab, ${e}, transparent ${t}%)`}function Mh(e){const t="var(--nami-accent-50)",i=e.mode==="dark";return{"--nami-accent-50":e.accent,"--nami-accent-90":B(t,i?"#fff":"#000",i?80:40),"--nami-accent-80":B(t,i?"#fff":"#000",i?60:30),"--nami-accent-70":B(t,i?"#fff":"#000",i?40:20),"--nami-accent-60":B(t,i?"#fff":"#000",i?20:10),"--nami-accent-40":B(t,i?"#000":"#fff",i?10:20),"--nami-accent-30":B(t,i?"#000":"#fff",i?20:40),"--nami-accent-20":B(t,i?"#000":"#fff",i?30:60),"--nami-accent-10":B(t,i?"#000":"#fff",i?40:80),"--nami-accent-5":B(t,i?"#000":"#fff",i?50:90),"--nami-neutral-10":B(t,"#b3b3b3",84),"--nami-neutral-50":B(t,i?"#eef2f7":"#646a73",94)}}function Ch(e){return e.radius==="sharp"?{"--nami-radius-control":"4px","--nami-radius-surface":"4px","--nami-radius-tight":"2px","--nami-radius-round":"999px"}:e.radius==="soft"?{"--nami-radius-control":"10px","--nami-radius-surface":"8px","--nami-radius-tight":"4px","--nami-radius-round":"999px"}:{"--nami-radius-control":"999px","--nami-radius-surface":"6px","--nami-radius-tight":"4px","--nami-radius-round":"999px"}}function Vh(e){return e.density==="compact"?{"--nami-control-height-sm":"28px","--nami-control-height-md":"34px","--nami-control-height-lg":"40px","--nami-space-1":"2px","--nami-space-2":"4px","--nami-space-3":"8px","--nami-space-4":"12px","--nami-space-5":"16px","--nami-icon-button-size":"36px","--nami-layout-gutter":"12px"}:{"--nami-control-height-sm":"32px","--nami-control-height-md":"40px","--nami-control-height-lg":"48px","--nami-space-1":"4px","--nami-space-2":"6px","--nami-space-3":"10px","--nami-space-4":"16px","--nami-space-5":"24px","--nami-icon-button-size":"40px","--nami-layout-gutter":"16px"}}function zh(e){const i={sm:{height:"var(--nami-control-height-sm)",paddingX:"12px",fontSize:"0.875rem",iconSize:"16px"},md:{height:"var(--nami-control-height-md)",paddingX:"16px",fontSize:"0.9375rem",iconSize:"18px"},lg:{height:"var(--nami-control-height-lg)",paddingX:"20px",fontSize:"1rem",iconSize:"20px"}}[e.size];return{"--nami-control-height":i.height,"--nami-control-padding-x":i.paddingX,"--nami-control-font-size":i.fontSize,"--nami-icon-size":i.iconSize,"--nami-icon-button-size":"var(--nami-control-height)"}}function Ph(){return{"--nami-breakpoint-compact":"639px","--nami-breakpoint-medium":"880px","--nami-breakpoint-wide":"1080px","--nami-container-sm":"720px","--nami-container-md":"960px","--nami-container-lg":"1240px","--nami-app-shell-rail-width":"56px","--nami-app-shell-mobile-bar-height":"56px","--nami-app-shell-breakpoint":"639px"}}function Dh(e){return e.motion==="reduced"?{"--nami-motion-fast":"1ms","--nami-motion-normal":"1ms","--nami-motion-slow":"1ms","--nami-motion-exit":"1ms","--nami-ease-standard":"linear","--nami-ease-emphasized":"linear"}:{"--nami-motion-fast":"120ms","--nami-motion-normal":"250ms","--nami-motion-slow":"700ms","--nami-motion-exit":"150ms","--nami-ease-standard":"cubic-bezier(0.19, 1, 0.22, 1)","--nami-ease-emphasized":"cubic-bezier(0.1, 0.9, 0.2, 1)"}}function Oh(e){const t=e.mode==="dark",i=e.contrast==="high";return{"--nami-color-primary":"var(--nami-accent-50)","--nami-color-primary-hover":t?"var(--nami-accent-60)":"var(--nami-accent-40)","--nami-color-primary-pressed":t?"var(--nami-accent-40)":"var(--nami-accent-60)","--nami-color-primary-focus":"var(--nami-accent-30)","--nami-color-primary-muted":"var(--nami-accent-10)","--nami-color-danger":t?"#ff7875":"#dc2626","--nami-surface":t?"#151718":"#ffffff","--nami-surface-raised":t?"#1c1f21":"#ffffff","--nami-surface-inset":t?w("#fff",94):w("#000",97),"--nami-surface-overlay":t?w("#17191b",16):w("#fff",18),"--nami-border":i?t?w("#fff",70):w("#000",68):t?w("#fff",86):w("#000",88),"--nami-border-strong":i?w(t?"#fff":"#000",54):t?w("#fff",72):w("#000",76),"--nami-text":t?"#f8fafc":"#171717","--nami-text-muted":i?t?"#d8dee8":"#3f4652":t?"#a1a8b3":"#666b74","--nami-text-inverse":"#ffffff","--nami-icon-color":"var(--nami-neutral-50)","--nami-hover-overlay":t?w("#fff",i?88:94):w("#000",i?90:95),"--nami-ripple":t?w("#fff",84):w("#000",86),"--nami-overlay-backdrop":t?w("#000",38):w("#000",52),"--nami-accent-ripple":w("var(--nami-color-primary-pressed)",i?72:84),"--nami-accent-hover-overlay":w("var(--nami-color-primary-hover)",i?82:90),"--nami-focus-ring":i?`0 0 0 4px ${w("var(--nami-color-primary-focus)",20)}, 0 0 0 1px var(--nami-color-primary)`:`0 4px 4px ${w("var(--nami-color-primary)",74)}, 0 0 0 3px ${w("var(--nami-color-primary-focus)",46)}`}}function Rh(e){return{"--nami-font-sans":'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',"--nami-font-mono":'"SFMono-Regular", Consolas, "Liberation Mono", monospace',"--nami-shadow-color":e.mode==="dark"?"#000":B("var(--nami-accent-50)","#8a8f98",80),"--nami-style-stroke-width":e.contrast==="high"?"2px":"1px","--nami-style-stroke-color":"var(--nami-border)","--nami-style-ink-color":"var(--nami-text)","--nami-style-on-paper":"var(--nami-text)","--nami-style-on-paper-muted":"var(--nami-text-muted)","--nami-style-offset-shadow":"none","--nami-style-control-bg":"transparent","--nami-style-panel-bg":"var(--nami-surface-raised)","--nami-style-paper-bg":"var(--nami-surface)","--nami-style-border-radius":"var(--nami-radius-surface)","--nami-style-background-pattern":"none","--nami-style-doodle-opacity":"0","--nami-style-paper-line-color":"var(--nami-border)","--nami-style-focus-shadow":"var(--nami-focus-ring)"}}function Bh(e){const t=e.mode==="dark",i=e.contrast==="high"?"4px":"3px";return{"--nami-font-sans":'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',"--nami-font-mono":'"SFMono-Regular", Consolas, "Liberation Mono", monospace',"--nami-shadow-color":t?"#000":"#2f2f2f","--nami-style-stroke-width":i,"--nami-style-ink-color":t?"#261f1f":"#2f2f2f","--nami-style-stroke-color":"var(--nami-style-ink-color)","--nami-style-on-paper":t?"#29221f":"#2f2f2f","--nami-style-on-paper-muted":t?"#6b5f58":"#62656b","--nami-style-offset-shadow":t?"6px 6px 0 #050506":"5px 5px 0 var(--nami-style-ink-color)","--nami-style-control-bg":t?B("#fff8ea","var(--nami-accent-50)",5):"#fffefe","--nami-style-panel-bg":t?B("#fff1f5","var(--nami-accent-50)",7):B("#fff3f7","#fff",18),"--nami-style-paper-bg":t?B("#fffdf3","var(--nami-accent-50)",4):"#fff8fb","--nami-style-border-radius":e.radius==="sharp"?"8px":e.radius==="soft"?"14px":"16px","--nami-style-doodle-opacity":t?"0.34":"0.42","--nami-style-paper-line-color":t?"rgb(38 31 31 / 0.18)":w("var(--nami-style-ink-color)",84),"--nami-style-focus-shadow":t?`0 0 0 4px ${w("var(--nami-color-primary)",58)}, 4px 4px 0 #050506`:`0 0 0 4px ${w("var(--nami-color-primary)",70)}, 4px 4px 0 var(--nami-style-ink-color)`,"--nami-style-background-pattern":t?`radial-gradient(circle at 10% 18%, rgb(142 217 255 / var(--nami-style-doodle-opacity)) 0 14px, transparent 15px),
    radial-gradient(circle at 88% 14%, rgb(255 216 93 / var(--nami-style-doodle-opacity)) 0 10px, transparent 11px),
    radial-gradient(circle at 74% 80%, rgb(255 183 208 / var(--nami-style-doodle-opacity)) 0 20px, transparent 21px),
    linear-gradient(135deg, transparent 0 46%, ${w("#fff7ed",82)} 47% 49%, transparent 50%),
    linear-gradient(25deg, transparent 0 70%, ${w("var(--nami-accent-50)",62)} 71% 73%, transparent 74%)`:`radial-gradient(circle at 12% 22%, rgb(142 217 255 / var(--nami-style-doodle-opacity)) 0 12px, transparent 13px),
    radial-gradient(circle at 86% 16%, rgb(255 216 93 / var(--nami-style-doodle-opacity)) 0 9px, transparent 10px),
    radial-gradient(circle at 72% 78%, rgb(255 183 208 / var(--nami-style-doodle-opacity)) 0 18px, transparent 19px),
    linear-gradient(135deg, transparent 0 46%, var(--nami-style-paper-line-color) 47% 49%, transparent 50%),
    linear-gradient(25deg, transparent 0 70%, ${w("var(--nami-accent-50)",82)} 71% 73%, transparent 74%)`}}function Fh(e){const t=e.stylePreset==="illustration",i=t&&e.mode==="dark",a=e.contrast==="high";return{"--nami-button-bg":"var(--nami-color-primary)","--nami-button-fg":"#fff","--nami-button-border":t?"var(--nami-style-stroke-color)":a?"var(--nami-color-primary)":"transparent","--nami-button-border-width":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-button-radius":"var(--nami-radius-control)","--nami-button-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-button-hover-bg":"var(--nami-color-primary-hover)","--nami-card-bg":t?"var(--nami-style-control-bg)":"var(--nami-surface-raised)","--nami-card-fg":t?"var(--nami-style-on-paper)":"var(--nami-text)","--nami-card-inset-bg":t?i?"var(--nami-style-paper-bg)":B("var(--nami-style-paper-bg)","var(--nami-accent-50)",5):"var(--nami-surface-inset)","--nami-card-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-card-border-width":"var(--nami-style-stroke-width)","--nami-card-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-card-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-card-padding":"var(--nami-space-4)","--nami-card-gap":"var(--nami-space-3)","--nami-badge-bg":t?i?"var(--nami-style-control-bg)":B("var(--nami-accent-50)","#fff",88):"var(--nami-hover-overlay)","--nami-badge-fg":t?"var(--nami-style-on-paper)":"var(--nami-text)","--nami-badge-border":t?"var(--nami-style-stroke-color)":"transparent","--nami-badge-border-width":"var(--nami-style-stroke-width)","--nami-badge-radius":"var(--nami-radius-control)","--nami-badge-height":"24px","--nami-badge-font-size":"0.75rem","--nami-badge-padding-x":"9px","--nami-soft-control-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-soft-control-color":t?"var(--nami-style-on-paper)":"var(--nami-text)","--nami-soft-control-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-soft-control-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-chip-bg":t?i?"var(--nami-style-control-bg)":B("var(--nami-accent-50)","#fff",92):"var(--nami-hover-overlay)","--nami-chip-selected-bg":"var(--nami-color-primary)","--nami-chip-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-chip-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-chip-radius":"var(--nami-radius-control)","--nami-chip-shadow":t?`3px 3px 0 ${i?"#050506":"#2f2f2f"}`:"none","--nami-input-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-input-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-input-border-width":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-input-radius":t?"12px":"var(--nami-radius-control)","--nami-input-shadow":t?`3px 3px 0 ${i?"#050506":"#2f2f2f"}`:"none","--nami-switch-track-bg":t?"var(--nami-style-control-bg)":"var(--nami-hover-overlay)","--nami-switch-border-width":"var(--nami-style-stroke-width)","--nami-switch-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-switch-thumb-bg":t?"var(--nami-style-paper-bg)":"var(--nami-surface-raised)","--nami-switch-thumb-shadow":t?`2px 2px 0 ${i?"#050506":"var(--nami-style-ink-color)"}`:`0 1px 4px ${w("var(--nami-shadow-color)",64)}`,"--nami-radio-card-bg":t?"var(--nami-style-control-bg)":"var(--nami-surface-raised)","--nami-radio-card-border-width":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-radio-card-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-radio-card-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-radio-card-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-radio-card-selected-shadow":t?"0 0 0 2px var(--nami-color-primary), var(--nami-style-offset-shadow)":"0 0 0 1px var(--nami-color-primary), var(--nami-focus-ring)","--nami-tab-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-tab-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-tab-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-tab-radius":t?"12px":"var(--nami-radius-control)","--nami-dialog-bg":t?"var(--nami-style-panel-bg)":"var(--nami-surface-raised)","--nami-dialog-border-width":t?"var(--nami-style-stroke-width)":"1px","--nami-dialog-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-dialog-radius":t?"18px":"var(--nami-radius-surface)","--nami-dialog-shadow":t?"var(--nami-style-offset-shadow)":`0 18px 50px ${w("var(--nami-shadow-color)",54)}`,"--nami-drawer-bg":t?"var(--nami-style-panel-bg)":"var(--nami-surface-overlay)","--nami-drawer-border-width":t?"var(--nami-style-stroke-width)":"1px","--nami-drawer-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-drawer-shadow":t?"var(--nami-style-offset-shadow)":`0 8px 24px ${w("var(--nami-shadow-color)",52)}`,"--nami-toast-bg":t?"var(--nami-style-control-bg)":"var(--nami-surface-raised)","--nami-toast-border-width":t?"var(--nami-style-stroke-width)":"1px","--nami-toast-border-color":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-toast-radius":t?"14px":"var(--nami-radius-surface)","--nami-app-shell-border-width":t?"var(--nami-style-stroke-width)":"1px","--nami-app-shell-shadow":t?`4px 0 0 ${i?"#050506":"#2f2f2f"}`:"none","--nami-spinner-track-color":w("currentColor",t?64:72),"--nami-transition-progress-height":t?"5px":"4px","--nami-page-transition-z-index":"2147483646","--nami-top-progress-height":"var(--nami-transition-progress-height)","--nami-top-progress-duration":e.motion==="reduced"?"1ms":"260ms","--nami-top-progress-ease":"var(--nami-ease-standard)","--nami-top-progress-indeterminate-duration":e.motion==="reduced"?"1ms":"1280ms","--nami-top-progress-track-bg":t?i?B("var(--nami-color-primary)","var(--nami-style-panel-bg)",68):B("var(--nami-color-primary)","#fff",78):"color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 72%)","--nami-top-progress-fill-bg":t?"var(--nami-color-primary)":"color-mix(in oklab, var(--nami-color-primary), var(--nami-text) 8%)","--nami-top-progress-shadow":t?`0 4px 0 ${i?"#050506":"var(--nami-style-ink-color)"}`:`0 8px 24px ${w("var(--nami-color-primary)",78)}`,"--nami-top-progress-z-index":"2147483647","--nami-illus-primary":"var(--nami-color-primary)","--nami-illus-secondary":t?B("var(--nami-color-primary)","#fff",i?38:58):"var(--nami-accent-20)","--nami-illus-accent":i?"#ffd166":"#f5b84b","--nami-illus-muted":t?w("var(--nami-style-on-paper-muted)",i?24:44):w("var(--nami-text-muted)",48),"--nami-illus-line":t?"var(--nami-style-stroke-color)":w("var(--nami-text)",36),"--nami-illus-bg":t?w("var(--nami-color-primary)",i?84:90):"var(--nami-color-primary-muted)","--nami-illus-size-sm":"92px","--nami-illus-size-md":"140px","--nami-illus-size-lg":"184px","--nami-empty-gap":"12px","--nami-empty-title-color":t?"var(--nami-style-on-paper)":"var(--nami-text)","--nami-empty-description-color":t?"var(--nami-style-on-paper-muted)":"var(--nami-text-muted)","--nami-empty-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-empty-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-empty-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-empty-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-empty-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-result-title-size":"1.5rem","--nami-result-subtitle-size":"0.95rem","--nami-result-gap":"14px","--nami-result-actions-margin":"10px 0 0","--nami-result-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-result-border-width":t?"var(--nami-style-stroke-width)":"0","--nami-result-border-color":t?"var(--nami-style-stroke-color)":"transparent","--nami-result-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-result-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-container-max-width":"var(--nami-container-lg)","--nami-container-padding":"var(--nami-layout-gutter)","--nami-stack-gap":"var(--nami-space-3)","--nami-cluster-gap":"var(--nami-space-2)","--nami-grid-min":"16rem","--nami-grid-gap":"var(--nami-layout-gutter)","--nami-split-min":"18rem","--nami-split-gap":"var(--nami-layout-gutter)","--nami-checkbox-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-checkbox-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-checkbox-border-width":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-checkbox-radius":e.radius==="round"?"6px":"var(--nami-radius-tight)","--nami-checkbox-indicator-color":"#fff","--nami-textarea-bg":t?"var(--nami-style-control-bg)":"transparent","--nami-textarea-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-textarea-border-width":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-textarea-radius":t?"12px":"var(--nami-radius-surface)","--nami-textarea-shadow":t?`3px 3px 0 ${i?"#050506":"#2f2f2f"}`:"none","--nami-form-field-gap":"var(--nami-space-2)","--nami-alert-bg":t?"var(--nami-style-control-bg)":"var(--nami-surface-raised)","--nami-alert-border":t?"var(--nami-style-stroke-color)":"var(--nami-border)","--nami-alert-border-width":t?"var(--nami-style-stroke-width)":a?"2px":"1px","--nami-alert-radius":t?"var(--nami-style-border-radius)":"var(--nami-radius-surface)","--nami-alert-shadow":t?"var(--nami-style-offset-shadow)":"none","--nami-skeleton-bg":t?w("var(--nami-style-on-paper-muted)",82):"var(--nami-hover-overlay)","--nami-skeleton-highlight":t?w("var(--nami-style-paper-bg)",18):w("#fff",i?82:18),"--nami-progress-track-bg":t?i?B("var(--nami-color-primary)","var(--nami-style-panel-bg)",72):B("var(--nami-color-primary)","#fff",84):"color-mix(in oklab, var(--nami-color-primary), var(--nami-surface) 82%)","--nami-progress-fill-bg":"var(--nami-color-primary)","--nami-progress-height":"8px","--nami-progress-radius":"var(--nami-radius-control)"}}function Ih(e={}){const t=$h(e),i=kh(e),a=Mh(t),r=Oh(t),n=t.stylePreset==="illustration"?Bh(t):Rh(t),s=Fh(t),o={...a,...Ch(t),...Ph(),"--nami-contrast-level":t.contrast,...Vh(t),...zh(t),...Dh(t),...r,...n,...s};return{seed:t,palette:a,semantic:r,component:s,style:n,cssVars:o,diagnostics:i}}function _h(e){return{...e,seed:{...e.seed},recipes:{...e.recipes},slotRecipes:{...e.slotRecipes},conditions:{...e.conditions}}}function Os(e){return e.startsWith("--")?e:zs(e.split("."))}function Lh(e){return/^#|^rgb|^hsl|color-mix\(/.test(e)?"color":/^-?\d+(\.\d+)?(px|rem|em|%|dvh|dvw|vh|vw)$/.test(e)?"dimension":/^-?\d+(\.\d+)?m?s$/.test(e)?"duration":/^-?\d+(\.\d+)?$/.test(e)?"number":/cubic-bezier|linear/.test(e)?"cubicBezier":/shadow|0\s/.test(e)&&e.includes(" ")?"shadow":"string"}function re(e){return Object.fromEntries(Object.entries(e).map(([t,i])=>[t,{$type:Lh(i),$value:i}]))}function jh(e={}){const t=_h(e),i=Ih(t.seed??{}),a={...i.cssVars,...Eh(t,i)},r={...i,cssVars:a};return{...r,config:t,conditions:t.conditions??{},recipes:t.recipes??{},slotRecipes:t.slotRecipes??{},token:(n,s="")=>a[Os(n)]??s,tokenVar:(n,s="")=>{const o=Os(n);return o in a?`var(${o})`:s},cssText:(n=":root")=>Hh(r,n),dtcg:()=>Wh(r)}}function Hh(e,t=":root"){const i=Object.entries(e.cssVars).sort(([a],[r])=>a.localeCompare(r)).map(([a,r])=>`  ${a}: ${r};`).join(`
`);return`${t} {
${i}
}`}function Wh(e){const t=Object.fromEntries(Object.entries(e.seed).map(([i,a])=>[i,{$type:i==="accent"?"color":"string",$value:a}]));return{$schema:"https://www.designtokens.org/schemas/2025.10/tokens.json",$extensions:{"org.nami.theme":{generatedBy:"@nami-web/tokens",layers:["seed","palette","semantic","component","style","cssVars"]}},seed:t,palette:re(e.palette),semantic:re(e.semantic),component:re(e.component),style:re(e.style),cssVars:re(e.cssVars)}}const di=class di extends ${constructor(){super(),this.appliedThemeVars=new Set,this.systemQuery=null,this.handleSystemThemeChange=()=>{this.theme==="system"&&this.applyTheme()},this.theme="light",this.density="comfortable",this.size="md",this.motion="normal",this.stylePreset="default",this.radius="round",this.contrast="normal",this.accent="",this.inherit=!0,this.config=null}connectedCallback(){super.connectedCallback(),typeof window<"u"&&typeof window.matchMedia=="function"&&(this.systemQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.systemQuery.addEventListener?.("change",this.handleSystemThemeChange))}disconnectedCallback(){this.systemQuery?.removeEventListener?.("change",this.handleSystemThemeChange),super.disconnectedCallback()}updated(){this.applyTheme()}get resolvedThemeMode(){return this.theme!=="system"?this.theme:this.systemQuery?.matches?"dark":"light"}hasRuntimeThemeInput(){return!!(this.config||this.accent||this.hasAttribute("theme")||this.hasAttribute("density")||this.hasAttribute("size")||this.hasAttribute("motion")||this.hasAttribute("style-preset")||this.hasAttribute("radius")||this.hasAttribute("contrast"))}applyTheme(){const t=this.config?.seed??{},i=this.stylePreset==="ant-illustration"?"illustration":this.stylePreset,a=this.hasAttribute("theme")?this.resolvedThemeMode:t.mode??this.resolvedThemeMode,r=this.hasAttribute("style-preset")?i:t.stylePreset??i,n=this.hasAttribute("density")?this.density:t.density??this.density,s=this.hasAttribute("size")?this.size:t.size??this.size,o=this.hasAttribute("motion")?this.motion:t.motion??this.motion,l=this.hasAttribute("radius")?this.radius:t.radius??this.radius,h=this.hasAttribute("contrast")?this.contrast:t.contrast??this.contrast,c={...t,accent:this.accent||t.accent,mode:a,stylePreset:r,density:n,size:s,motion:o,radius:l,contrast:h};if(this.accent?(this.style.setProperty("--nami-theme-accent",this.accent),this.style.setProperty("--nami-accent-50",this.accent)):(this.style.removeProperty("--nami-theme-accent"),this.style.removeProperty("--nami-accent-50")),this.hasRuntimeThemeInput()){const d=jh({...this.config,seed:c}),u=new Set(Object.keys(d.cssVars));for(const m of this.appliedThemeVars)!u.has(m)&&m!=="--nami-theme-accent"&&m!=="--nami-accent-50"&&this.style.removeProperty(m);for(const[m,g]of Object.entries(d.cssVars))this.style.setProperty(m,g);this.appliedThemeVars=u}else{for(const d of this.appliedThemeVars)this.style.removeProperty(d);this.appliedThemeVars.clear()}this.dataset.namiTheme=a,this.dataset.namiThemeRequested=this.theme,this.dataset.namiDensity=n,this.dataset.namiSize=s,this.dataset.namiMotion=o,this.dataset.namiStyle=r,this.dataset.namiRadius=l,this.dataset.namiContrast=h}render(){return p`<slot></slot>`}};di.properties={theme:{reflect:!0,useDefault:!0},density:{reflect:!0,useDefault:!0},size:{reflect:!0,useDefault:!0},motion:{reflect:!0,useDefault:!0},stylePreset:{attribute:"style-preset",reflect:!0,useDefault:!0},radius:{reflect:!0,useDefault:!0},contrast:{reflect:!0,useDefault:!0},accent:{reflect:!0,useDefault:!0},inherit:{type:Boolean,reflect:!0},config:{attribute:!1}},di.styles=[M,E`
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
    `];let tr=di;const hi=class hi extends ${constructor(){super(),this.timer=0,ot(this),this.open=!1,this.message="",this.variant="neutral",this.placement="top",this.duration=3200}static show(t){const i=document.createElement("nami-toast");return i.message=t.message,i.variant=t.variant??"neutral",i.placement=t.placement??"top",i.duration=t.duration??3200,document.body.append(i),requestAnimationFrame(()=>{i.open=!0}),i}updated(t){t.has("open")&&(this.open?(P(this,"nami-open",void 0),window.clearTimeout(this.timer),this.duration>0&&(this.timer=window.setTimeout(()=>this.close(),this.duration))):t.get("open")===!0&&(window.clearTimeout(this.timer),P(this,"nami-close",this.closeSourceEvent?{sourceEvent:this.closeSourceEvent}:void 0),this.closeSourceEvent=void 0))}disconnectedCallback(){window.clearTimeout(this.timer),super.disconnectedCallback()}close(t){this.open&&(this.closeSourceEvent=t,this.open=!1,window.setTimeout(()=>this.remove(),180))}render(){return p`
      <div class="base" part="base" role="status" aria-live="polite">
        <span class="indicator" part="indicator"><slot name="icon">${this.variant==="neutral"?A:p`<span aria-hidden="true">*</span>`}</slot></span>
        <span part="label"><slot>${this.message}</slot></span>
        <button type="button" part="actions" aria-label=${Q("Close",{id:"nami.toast.close"})} @click=${t=>this.close(t)}>X</button>
      </div>
    `}};hi.properties={open:{type:Boolean,reflect:!0},message:{},variant:{reflect:!0},placement:{reflect:!0},duration:{type:Number}},hi.styles=[M,E`
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
    `];let er=hi;const ui=class ui extends ${constructor(){super(),this.hideTimer=0,this.shownAt=0,ot(this),this.active=!1,this.duration=220,this.effect="flow",this.height=4,this.label="",this.progress=void 0,this.variant="fixed",this.visible=!1}connectedCallback(){super.connectedCallback(),this.active&&(this.visible=!0,this.shownAt=Date.now())}disconnectedCallback(){window.clearTimeout(this.hideTimer),this.hideResolver?.(),super.disconnectedCallback()}updated(t){if(t.has("progress")&&this.syncProgressStyle(),t.has("height")&&this.syncHeightStyle(),t.has("duration")&&this.syncDurationStyle(),!t.has("active"))return;if(window.clearTimeout(this.hideTimer),this.active){this.hideResolver?.(),this.hideComplete=void 0,this.visible=!0,this.shownAt=Date.now();return}const i=Date.now()-this.shownAt,a=Math.max(0,Number(this.duration)-i);this.hideComplete=new Promise(r=>{this.hideResolver=r}),this.hideTimer=window.setTimeout(()=>{this.active||(this.visible=!1),this.hideResolver?.(),this.hideResolver=void 0},a)}show(t={}){this.applyOptions(t),this.visible=!0,this.shownAt=Date.now(),this.active=!0}set(t){this.progress=t??void 0}async finish(t={}){this.applyOptions({...t,progress:t.progress??100}),this.active=!0,await this.updateComplete,await new Promise(i=>window.setTimeout(i,Number(t.minDuration??this.duration))),await this.hide({...t,progress:null})}async hide(t={}){this.applyOptions(t),this.active=!1,await this.updateComplete,this.hideComplete&&await this.hideComplete}async waitFor(t,i={}){const a=i.minDuration??this.duration,r=Date.now();this.show(i);try{return await(typeof t=="function"?t():t)}finally{const n=Math.max(0,Number(a)-(Date.now()-r));n>0&&await new Promise(s=>window.setTimeout(s,n)),await this.finish(i)}}applyOptions(t){t.duration!==void 0&&(this.duration=t.duration),t.effect&&(this.effect=t.effect),t.height!==void 0&&(this.height=t.height),t.label!==void 0&&(this.label=t.label),t.variant&&(this.variant=t.variant),t.progress!==void 0&&this.set(t.progress)}syncProgressStyle(){if(this.progress===void 0||this.progress===null||Number.isNaN(Number(this.progress))){this.style.removeProperty("--nami-top-progress-value");return}const t=Math.min(100,Math.max(0,Number(this.progress)));this.style.setProperty("--nami-top-progress-value",`${t}%`)}syncHeightStyle(){if(!Number.isFinite(Number(this.height))||Number(this.height)<=0){this.style.removeProperty("--nami-top-progress-height");return}this.style.setProperty("--nami-top-progress-height",`${Number(this.height)}px`)}syncDurationStyle(){if(!Number.isFinite(Number(this.duration))||Number(this.duration)<0){this.style.removeProperty("--nami-top-progress-duration");return}this.style.setProperty("--nami-top-progress-duration",`${Number(this.duration)}ms`)}get fallbackLabel(){return this.label||Q("Navigating",{id:"nami.topProgress.navigating"})}render(){if(!this.visible)return A;const t=this.progress!==void 0&&this.progress!==null&&!Number.isNaN(Number(this.progress));return p`
      <div class="base" part="base">
        <span
          class="track"
          part="track"
          role="progressbar"
          aria-label=${this.fallbackLabel}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${t?String(Math.round(Number(this.progress))):A}
        >
          <span class="indicator" part="indicator"></span>
        </span>
      </div>
    `}};ui.properties={active:{type:Boolean,reflect:!0},duration:{type:Number,reflect:!0},effect:{reflect:!0},height:{type:Number,reflect:!0},label:{},progress:{type:Number,reflect:!0},variant:{reflect:!0},visible:{state:!0}},ui.styles=[M,E`
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
    `];let ir=ui;const mi=class mi extends ${constructor(){super(),this.variant="neutral",this.title="",this.closable=!1}updated(){this.dataset.state=this.variant}close(t){P(this,"nami-close",{sourceEvent:t},{cancelable:!0})&&this.remove()}render(){const t=this.variant==="danger"||this.variant==="warning"?"alert":"status";return p`
      <section class="base" part="base" role=${t}>
        <span class="indicator" part="indicator"><slot name="icon">${this.variant==="neutral"?"i":"!"}</slot></span>
        <div>
          ${this.title?p`<h3 part="label"><slot name="title">${this.title}</slot></h3>`:p`<slot name="title"></slot>`}
          <div class="body" part="description"><slot></slot></div>
        </div>
        <div class="actions" part="actions">
          <slot name="actions"></slot>
          ${this.closable?p`<button type="button" aria-label="Close" @click=${this.close}>${"×"}</button>`:A}
        </div>
      </section>
    `}};mi.properties={variant:{reflect:!0},title:{},closable:{type:Boolean,reflect:!0}},mi.styles=[M,E`
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
    `];let ar=mi;function Rs(){k("nami-theme",tr),k("nami-config",Ri),k("nami-spinner",St),k("nami-page-transition",qa),k("nami-top-progress",ir),k("nami-scroll-header",Ka),k("nami-scroll-reveal",Ua),k("nami-hero-stage",Ia),k("nami-illustration",Nt),k("nami-empty",Li),k("nami-result",Wa),k("nami-card",Vi),k("nami-badge",Ai),k("nami-button",Ci),k("nami-icon-button",_a),k("nami-chip",zi),k("nami-input",La),k("nami-switch",Ga),k("nami-radio-card",Ha),k("nami-tab-bar",Za),k("nami-dialog",Ii),k("nami-drawer",_i),k("nami-toast",er),k("nami-app-shell",$i),k("nami-container",Bi),k("nami-stack",Ya),k("nami-cluster",Oi),k("nami-grid",Wi),k("nami-split",Na),k("nami-checkbox",Di),k("nami-textarea",Qa),k("nami-form-field",Hi),k("nami-alert",ar),k("nami-skeleton",Xa),k("nami-progress",ja)}Rs();const Kh=Object.freeze(Object.defineProperty({__proto__:null,templates:{"nami.empty.aria":"空状态","nami.empty.description":"暂无数据","nami.pageTransition.preparing":"正在准备界面","nami.result.aria":"结果","nami.spinner.loading":"加载中","nami.toast.close":"关闭","nami.topProgress.navigating":"正在切换页面"}},Symbol.toStringTag,{value:"Module"}));return fi.registerNamiElements=Rs,Object.defineProperty(fi,Symbol.toStringTag,{value:"Module"}),fi})({});
