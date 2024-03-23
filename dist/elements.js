(function () {
  'use strict';

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;class n$3{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}}const r$5=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$2=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$5(e)})(t):t;

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const{is:i$1,defineProperty:e$1,getOwnPropertyDescriptor:r$4,getOwnPropertyNames:h$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$1(t,s),y$1={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$1){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e$1(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$4(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...h$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$1)(this[t],s))return;this.P(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$ET());}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$ET(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i);}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU();}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU();}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d$1("elementProperties")]=new Map,b[d$1("finalized")]=new Map,p$1?.({ReactiveElement:b}),(a$1.reactiveElementVersions??=[]).push("2.0.4");

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t=globalThis,i=t.trustedTypes,s$1=i?i.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",h=`lit$${(Math.random()+"").slice(9)}$`,o$1="?"+h,n$1=`<${o$1}>`,r$3=document,l=()=>r$3.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),w=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),A=new WeakMap,E=r$3.createTreeWalker(r$3,129);function C(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const P=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$1:d>=0?(o.push(a),s.slice(0,d)+e+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [C(t,l+(t[s]||"<?>")+(2===i?"</svg>":"")),o]};class V{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=P(t,s);if(this.el=V.createElement(f,n),E.currentNode=this.el.content,2===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=E.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?k:"?"===e[1]?H:"@"===e[1]?I:R}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i?i.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),E.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$1)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$3.createElement("template");return s.innerHTML=t,s}}function N(t,i,s=t,e){if(i===w)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=N(t,h._$AS(t,i.values),h,e)),i}class S{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$3).importNode(i,!0);E.currentNode=e;let h=E.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new M(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new L(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=E.nextNode(),o++);}return E.currentNode=r$3,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N(this,t,i),c(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==w&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t));}_(t){this._$AH!==T&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$3.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=V.createElement(C(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new S(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new V(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new M(this.S(l()),this.S(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=T;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=N(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=N(this,e[s+n],i,n),r===w&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===T?t=T:t!==T&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class k extends R{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===T?void 0:t;}}class H extends R{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T);}}class I extends R{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=N(this,t,i,0)??T)===w)return;const s=this._$AH,e=t===T&&s!==T||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==T&&(s===T||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t);}}const Z=t.litHtmlPolyfillSupport;Z?.(V,M),(t.litHtmlVersions??=[]).push("3.1.2");const j=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new M(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */class s extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=j(i,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return w}}s._$litElement$=!0,s[("finalized")]=!0,globalThis.litElementHydrateSupport?.({LitElement:s});const r$2=globalThis.litElementPolyfillSupport;r$2?.({LitElement:s});(globalThis.litElementVersions??=[]).push("4.0.4");

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const o={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.P(o,void 0,t),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:!0}:t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */function r(r){return n({...r,state:!0,attribute:!1})}

  class SmartQasaAreaPicture extends s {
      setConfig(config) {
          var _a;
          if (!config.area) {
              throw new Error("You must specify an area");
          }
          this._area = config.area;
          this._picture = (_a = config.picture) !== null && _a !== void 0 ? _a : undefined;
      }
      set hass(hass) {
          var _a;
          this._hass = hass;
          this._areaObj = (_a = this._hass.areas[this._area]) !== null && _a !== void 0 ? _a : undefined;
      }
      static get styles() {
          return i$2 `
      :host {
        display: block;
      }
      ha-card {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        border-radius: 4px;
        border: none;
        box-shadow: none;
        background-color: transparent;
        overflow: hidden;
      }
    `;
      }
      render() {
          var _a, _b, _c;
          if (!this._areaObj && this._area !== "home") {
              return x ``;
          }
          const height = window.smartqasa.deviceType == "phone" ? "15vh" : "20vh";
          const picture = this._picture
              ? `/local/sq-areas/${this._picture}`
              : (_c = (_b = (_a = this._hass) === null || _a === void 0 ? void 0 : _a.areas[this._area]) === null || _b === void 0 ? void 0 : _b.picture) !== null && _c !== void 0 ? _c : "/local/sq-storage/images/default.png";
          return x `
      <ha-card
        style="background-image: url(${picture}); height: ${height};"
        class="picture"
      ></ha-card>
    `;
      }
      getCardSize() {
          return 1;
      }
  }
  __decorate([
      r()
  ], SmartQasaAreaPicture.prototype, "_area", void 0);
  __decorate([
      r()
  ], SmartQasaAreaPicture.prototype, "_areaObj", void 0);
  __decorate([
      r()
  ], SmartQasaAreaPicture.prototype, "_picture", void 0);
  customElements.define("smartqasa-area-picture", SmartQasaAreaPicture);

  class SmartQasaTimeDate extends s {
      constructor() {
          super(...arguments);
          this._time = '';
          this._date = '';
      }
      setConfig(config) {
          // Handle configuration setup if necessary
      }
      set hass(hass) {
          this._hass = hass;
          this._time = this._hass.states["sensor.current_time"].state;
          this._date = this._hass.states["sensor.current_date"].state;
      }
      static get styles() {
          return i$2 `
      :host {
        display: block;
        padding: 0;
        background-color: transparent;
      }
      .container {
        display: grid;
        grid-template-rows: auto auto;
        padding: 0;
        border-radius: 0;
        border: none;
        box-shadow: none;
        background-color: transparent;
        cursor: pointer;
      }
      .time,
      .date {
        justify-self: start;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .time {
        line-height: var(--sq-title-font-size, 16px);
        font-size: var(--sq-title-font-size, 16px);
        font-weight: var(--sq-title-font-weight, 400);
        color: rgb(var(--sq-title-font-rgb, 0, 0, 0));
      }
      .date {
        font-size: var(--sq-primary-font-size, 14px);
        font-weight: var(--sq-primary-font-weight, 300);
        color: rgb(var(--sq-secondary-font-rgb, 128, 128, 128));
      }
    `;
      }
      render() {
          return x `
      <div class="container" @click="${this._handleTap}">
        <div class="time">${this._time}</div>
        <div class="date">${this._date}</div>
      </div>
    `;
      }
      _handleTap() {
          if (typeof window.fully !== "undefined" && window.fully.startApplication) {
              window.fully.startApplication("com.google.android.deskclock");
          }
          else {
              console.warn("fully.startApplication is not available.");
          }
      }
      getCardSize() {
          return 1;
      }
  }
  __decorate([
      r()
  ], SmartQasaTimeDate.prototype, "_hass", void 0);
  __decorate([
      r()
  ], SmartQasaTimeDate.prototype, "_time", void 0);
  __decorate([
      r()
  ], SmartQasaTimeDate.prototype, "_date", void 0);
  customElements.define("smartqasa-time-date", SmartQasaTimeDate);
  window.customCards.push({
      type: "smartqasa-time-date",
      name: "SmartQasa Time Date",
      preview: true,
      description: "A SmartQasa card for rendering the time and date.",
  });

  var styleTileBase = i$2 `
  .container {
    display: grid;
    height: 5.2rem;
    border: var(--sq-card-border, none);
    border-radius: 1.5rem;
    grid-template-areas: "i n";
    grid-template-columns: auto 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 0.4rem;
    padding: 1rem;
    background-color: var(--sq-card-background-color, rgba(192, 192, 192, 0.5));
    cursor: pointer;
  }
  .icon {
    grid-area: i;
    display: flex;
    justify-content: center;
    align-self: center;
    height: 1.8rem;
    width: 1.8rem;
    padding: 1rem;
    border-radius: 50%;
    transition: var(--sq-icon-transition, none);
  }
  .name {
    grid-area: n;
    place-self: center start;
    max-height: 3.6rem;
    line-height: 1.2;
    max-width: 100%;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-weight: var(--sq-primary-font-weight, 400);
    font-size: var(--sq-primary-font-size, 1.5rem);
    color: rgb(var(--sq-primary-font-rgb), 128, 128, 128);
  }
`;

  var styleTileIconSpin = i$2 `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

  class SmartQasaAllOffTile extends s {
      setConfig(config) {
          var _a, _b;
          if (!config.area) {
              throw new Error("You must specify an area");
          }
          this._area = config.area;
          this._icon = (_a = config.icon) !== null && _a !== void 0 ? _a : undefined;
          this._name = (_b = config.name) !== null && _b !== void 0 ? _b : undefined;
      }
      set hass(hass) {
          var _a, _b, _c, _d;
          this._hass = hass;
          this._areaObj = (_b = (_a = this._hass.areas) !== null && _a !== void 0 ? _a : [this._area]) !== null && _b !== void 0 ? _b : undefined;
          this._icon = (_d = (_c = this._hass.areas[this._area].icon) !== null && _c !== void 0 ? _c : this._icon) !== null && _d !== void 0 ? _d : "hass:power";
      }
      render() {
          var _a, _b;
          let iconColor = "var(--sq-unavailable-rgb)";
          let name = (_a = this._name) !== null && _a !== void 0 ? _a : "Unknown";
          if (this._areaObj) {
              iconColor = "var(--sq-inactive-rgb)";
              name = (_b = this._name) !== null && _b !== void 0 ? _b : "All Off";
          }
          return x `
      <div class="container" @click=${this._runRoutine}>
        <div
          class="icon"
          id="icon"
          style="
            color: rgb(${iconColor});
            background-color: rgba(${iconColor}, var(--sq-icon-opacity));
          "
        >
          <ha-icon .icon=${this._icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
      </div>
    `;
      }
      _runRoutine(e) {
          var _a, _b;
          e.stopPropagation();
          if (this._hass && this._areaObj) {
              const haIconElement = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("ha-icon");
              haIconElement.icon = "hass:rotate-right";
              const iconElement = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById("icon");
              iconElement.style.animation = "spin 1.0s linear infinite";
              this._hass.callService("light", "turn_off", {
                  area_id: this._area,
                  transition: 2,
              });
              this._hass.callService("fan", "turn_off", {
                  area_id: this._area,
              });
              setTimeout(() => {
                  haIconElement.icon = this._icon;
                  iconElement.style.color = `rgb(var(--sq-inactive-rgb))`;
                  iconElement.style.animation = "none";
              }, 2000);
          }
      }
      getCardSize() {
          return 1;
      }
  }
  SmartQasaAllOffTile.styles = [styleTileBase, styleTileIconSpin];
  __decorate([
      r()
  ], SmartQasaAllOffTile.prototype, "_area", void 0);
  __decorate([
      r()
  ], SmartQasaAllOffTile.prototype, "_areaObj", void 0);
  __decorate([
      r()
  ], SmartQasaAllOffTile.prototype, "_icon", void 0);
  __decorate([
      r()
  ], SmartQasaAllOffTile.prototype, "_name", void 0);
  customElements.define("smartqasa-all-off-tile", SmartQasaAllOffTile);
  window.customCards.push({
      type: "smartqasa-all-off-tile",
      name: "SmartQasa All Off Tile",
      preview: true,
      description: "A SmartQasa tile for turning off all light and fan entities in an area.",
  });

  var appTable = {
      accuweather: {
          name: "AccuWeather",
          app_icon: "icon_accuweather.png",
          launcher: "package",
          package: "com.accuweather.android",
      },
      allrecipes: {
          name: "AllRecipes",
          app_icon: "icon_allrecipes.png",
          launcher: "package",
          package: "com.allrecipes.spinner.free",
      },
      amazon_music: {
          name: "Amazon Music",
          app_icon: "icon_amazon_music.png",
          launcher: "uri_scheme",
          uri_scheme: "amznmp3://",
      },
      amazon_shopping: {
          name: "Amazon Shopping",
          app_icon: "icon_amazon_shopping.png",
          launcher: "uri_scheme",
          package: "com.amazon.windowshop",
          uri_scheme: "amazon://",
      },
      amcrest_smart_home: {
          name: "Amcrest Smart Home",
          app_icon: "icon_amcrest_smart_home.png",
          launcher: "package",
          package: "com.mm.android.amcrestsmarthome",
      },
      apple_music: {
          name: "Apple Music",
          app_icon: "icon_apple_music.png",
          launcher: "package",
          package: "com.apple.android.music",
      },
      bmw: {
          name: "My BMW",
          app_icon: "icon_bmw.png",
          launcher: "package",
          package: "de.bmw.connected.mobile20.na",
      },
      bond: {
          name: "Bond Home",
          app_icon: "icon_bond.png",
          launcher: "package",
          package: "io.olibra.bondapp",
      },
      bring: {
          name: "Bring!",
          app_icon: "icon_bring.png",
          launcher: "package",
          package: "ch.publisheria.bring",
      },
      calculator: {
          name: "Calculator",
          app_icon: "icon_calculator.png",
          launcher: "package",
          package: "com.google.android.calculator",
      },
      chatgpt: {
          name: "ChatGPT",
          app_icon: "icon_chatgpt.png",
          launcher: "package",
          package: "com.openai.chatgpt",
      },
      chrome: {
          name: "Chrome",
          app_icon: "icon_chrome.png",
          launcher: "uri_scheme",
          uri_scheme: "chrome://",
          package: "com.android.chrome",
      },
      clock_timer: {
          name: "Clock/Timer",
          app_icon: "icon_clock.png",
          launcher: "package",
          package: "com.google.android.deskclock",
      },
      doordash: {
          name: "Doordash",
          app_icon: "icon_doordash.png",
          launcher: "uri_scheme",
          uri_scheme: "doordash://",
          package: "com.dd.dashdash",
      },
      eufy_security: {
          name: "Eufy Security",
          app_icon: "icon_eufy_security.png",
          launcher: "package",
          package: "com.oceanwing.battery.cam",
      },
      grubhub: {
          name: "Grubhub",
          app_icon: "icon_grubhub.png",
          launcher: "uri_scheme",
          uri_scheme: "grubhub://",
          package: "com.grubhub.android",
      },
      home_connect: {
          name: "Home Connect",
          app_icon: "icon_home_connect.png",
          launcher: "package",
          package: "com.bshg.homeconnect.android.release.na",
      },
      hue: {
          name: "Hue",
          app_icon: "icon_hue.png",
          launcher: "package",
          package: "com.philips.lighting.hue2",
      },
      hulu: {
          name: "Hulu",
          app_icon: "icon_hulu.png",
          launcher: "uri_scheme",
          uri_scheme: "hulu://",
          package: "com.hulu.plus",
      },
      irobot: {
          name: "iRobot",
          app_icon: "icon_irobot.png",
          launcher: "package",
          package: "com.irobot.home",
      },
      keurig: {
          name: "Keurig",
          app_icon: "icon_keurig.png",
          launcher: "package",
          package: "com.keurig.kconnect",
      },
      lionchief: {
          name: "LionChief",
          app_icon: "icon_lionchief.png",
          launcher: "package",
          package: "com.lionel.lionchief",
      },
      lutron: {
          name: "Lutron",
          app_icon: "icon_lutron.png",
          launcher: "package",
          package: "com.lutron.mmw",
      },
      myq: {
          name: "MyQ",
          app_icon: "icon_myq.png",
          launcher: "package",
          package: "com.chamberlain.android.liftmaster.myq",
      },
      nest: {
          name: "Nest",
          app_icon: "icon_nest.png",
          launcher: "package",
          package: "com.nest.android",
      },
      netflix: {
          name: "Netflix",
          app_icon: "icon_netflix.png",
          launcher: "package",
          package: "com.netflix.mediaclient",
      },
      pandora: {
          name: "Pandora",
          app_icon: "icon_pandora.png",
          launcher: "uri_scheme",
          uri_scheme: "pandora://",
          package: "com.pandora.android",
      },
      play_store: {
          name: "Play Store",
          app_icon: "mdi:store",
          launcher: "package",
          package: "com.android.vending",
      },
      rachio: {
          name: "Rachio",
          app_icon: "icon_rachio.png",
          launcher: "package",
          package: "com.rachio.iro",
      },
      rainbird: {
          name: "Rainbird",
          app_icon: "icon_rainbird.png",
          launcher: "package",
          package: "com.rainbird",
      },
      ring: {
          name: "Ring",
          app_icon: "icon_ring.png",
          launcher: "uri_scheme",
          uri_scheme: "ring://",
          package: "com.ringapp",
      },
      roku_remote: {
          name: "Roku Remote",
          app_icon: "icon_roku.png",
          launcher: "package",
          package: "com.roku.remote",
      },
      sense: {
          name: "Sense Energy",
          app_icon: "icon_sense.png",
          launcher: "package",
          package: "com.sense.androidclient",
      },
      shazam: {
          name: "Shazam",
          app_icon: "icon_shazam.png",
          launcher: "package",
          package: "com.shazam.android",
      },
      shipt_shopper: {
          name: "Shipt Shopper",
          app_icon: "icon_shipt.png",
          launcher: "package",
          package: "com.shipt.shopper",
      },
      sleepiq: {
          name: "SleepIQ",
          app_icon: "icon_sleepiq.png",
          launcher: "package",
          package: "com.selectcomfort.SleepIQ",
      },
      solitaire: {
          name: "Solitaire",
          app_icon: "icon_solitaire.png",
          launcher: "package",
          package: "com.tripledot.solitaire",
      },
      sonos: {
          name: "Sonos",
          app_icon: "icon_sonos.png",
          launcher: "uri_scheme",
          uri_scheme: "sonos://",
          package: "com.sonos.acr2",
      },
      spotify: {
          name: "Spotify",
          app_icon: "icon_spotify.png",
          launcher: "uri_scheme",
          uri_scheme: "spotify://",
          package: "com.spotify.music",
      },
      tuya_smart: {
          name: "Tuya Smart",
          app_icon: "icon_tuya.png",
          launcher: "package",
          package: "com.tuya.smart",
      },
      uber_eats: {
          name: "Uber Eats",
          app_icon: "icon_uber_eats.png",
          launcher: "package",
          package: "com.ubercab.eats",
      },
      weather_channel: {
          name: "Weather Channel",
          app_icon: "icon_weather_channel.png",
          launcher: "package",
          package: "com.weather.Weather",
      },
      weather_underground: {
          name: "Weather Underground",
          app_icon: "icon_weather_underground.png",
          launcher: "package",
          package: "com.wunderground.android.weather",
      },
      yummly: {
          name: "Yummly Recipes",
          app_icon: "icon_yummly.png",
          launcher: "package",
          package: "com.yummly.android",
      },
  };

  class SmartQasaAppTile extends s {
      setConfig(config) {
          if (!config.app) {
              throw new Error("You must specify an app");
          }
          this._app = config.app;
          this._appObj = appTable[this._app];
          this._icon = config.icon;
          this._name = config.name;
      }
      render() {
          var _a, _b;
          let icon, iconStyle, name;
          if (this._appObj) {
              if (this._icon) {
                  icon = x `<ha-icon .icon=${this._icon}></ha-icon>`;
                  iconStyle = "color: rgb(var(--sq-inactive-rgb)); background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-opacity));";
              }
              else if (this._appObj.app_icon) {
                  icon = x `<img src="/local/sq-storage/images/${this._appObj.app_icon}" alt="App Icon" style="border-radius: 50%;" />`;
                  iconStyle = "height: 3.8rem; width: 3.8rem; padding: 0;";
              }
              else {
                  icon = x `<ha-icon .icon="hass:alert-rhombus"></ha-icon>`;
                  iconStyle = "color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-opacity));";
              }
              name = (_b = (_a = this._name) !== null && _a !== void 0 ? _a : this._appObj.name) !== null && _b !== void 0 ? _b : "Unknown";
          }
          else {
              icon = x `<ha-icon .icon="hass:alert-rhombus"></ha-icon>`;
              iconStyle = "color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-opacity));";
              name = "Unknown";
          }
          return x `
      <div class="container" @click=${this._launchApp}>
        <div class="icon" style=${iconStyle}>${icon}</div>
        <div class="name">${name}</div>
      </div>
    `;
      }
      _launchApp(e) {
          e.stopPropagation();
          // Launch logic remains unchanged, assuming `fully` and `window.location.href` are globally accessible
      }
      getCardSize() {
          return 1;
      }
  }
  SmartQasaAppTile.styles = styleTileBase;
  __decorate([
      r()
  ], SmartQasaAppTile.prototype, "_app", void 0);
  __decorate([
      r()
  ], SmartQasaAppTile.prototype, "_appObj", void 0);
  __decorate([
      r()
  ], SmartQasaAppTile.prototype, "_icon", void 0);
  __decorate([
      r()
  ], SmartQasaAppTile.prototype, "_name", void 0);
  customElements.define("smartqasa-app-tile", SmartQasaAppTile);
  window.customCards.push({
      type: "smartqasa-app-tile",
      name: "SmartQasa App Tile",
      preview: true,
      description: "A SmartQasa tile for launching applications from the dashboard",
  });

  var styleTileState = i$2 `
    .container {
        grid-template-areas: 'i n' 'i s';
        grid-row-gap: 0.3rem;
    }
    .name {
        place-self: end start;
    }
    .state {
        grid-area: s;
        align-self: start;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: var(--sq-secondary-font-weight, 300);
        font-size: var(--sq-secondary-font-size, 1.0rem);
        color: rgb(var(--sq-secondary-font-rgb, 0, 0, 0));
    }
`;

  class SmartQasaFanTile extends s {
      setConfig(config) {
          var _a, _b;
          if (!config.entity) {
              throw new Error("You must specify an entity");
          }
          this._entity = config.entity;
          this._icon = (_a = config.icon) !== null && _a !== void 0 ? _a : undefined;
          this._name = (_b = config.name) !== null && _b !== void 0 ? _b : undefined;
      }
      set hass(hass) {
          var _a;
          this._hass = hass;
          this._stateObj = (_a = this._hass.states[this._entity]) !== null && _a !== void 0 ? _a : undefined;
      }
      render() {
          var _a, _b, _c, _d, _e, _f;
          let icon = (_a = this._icon) !== null && _a !== void 0 ? _a : "hass:alert-rhombus";
          let iconColor = "var(--sq-unavailable-rgb)";
          let iconAnimation = "none";
          let name = (_b = this._name) !== null && _b !== void 0 ? _b : "Unknown";
          let stateFmtd = "Unknown";
          if (this._stateObj) {
              const state = (_c = this._stateObj.state) !== null && _c !== void 0 ? _c : "unknown";
              icon = (_d = this._icon) !== null && _d !== void 0 ? _d : "hass:fan";
              iconColor = state == "on" ? "var(--sq-fan-on-rgb)" : "var(--sq-inactive-rgb)";
              if (state === "on" && !this._icon) {
                  if (this._stateObj.attributes.percentage) {
                      const speed = 0.5 + (1 - this._stateObj.attributes.percentage / 100);
                      const direction = this._stateObj.attributes.direction === "reverse"
                          ? "reverse"
                          : "normal";
                      iconAnimation = `spin ${speed}s linear infinite ${direction}`;
                  }
                  else {
                      iconAnimation = `spin 0.5s linear infinite normal`;
                  }
              }
              name = (_f = (_e = this._name) !== null && _e !== void 0 ? _e : this._stateObj.attributes.friendly_name) !== null && _f !== void 0 ? _f : this._entity;
              stateFmtd =
                  this._hass.formatEntityState(this._stateObj) +
                      (state == "on" && this._stateObj.attributes.percentage
                          ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "percentage")
                          : "");
          }
          return x `
      <div class="container" @click=${this._showMoreInfo}>
        <div
          class="icon"
          @click=${this._toggleEntity}
          style="color: rgb(${iconColor}); background-color: rgba(${iconColor}, var(--sq-icon-opacity)); animation: ${iconAnimation};"
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
        <div class="state">${stateFmtd}</div>
      </div>
    `;
      }
      _toggleEntity(e) {
          e.stopPropagation();
          if (this._hass && this._stateObj) {
              this._hass.callService("fan", "toggle", { entity_id: this._entity });
          }
      }
      _showMoreInfo(e) {
          e.stopPropagation();
          const event = new CustomEvent("hass-more-info", {
              bubbles: true,
              composed: true,
              detail: { entityId: this._entity },
          });
          this.dispatchEvent(event);
      }
      getCardSize() {
          return 1;
      }
  }
  SmartQasaFanTile.styles = [styleTileBase, styleTileState, styleTileIconSpin];
  __decorate([
      r()
  ], SmartQasaFanTile.prototype, "_entity", void 0);
  __decorate([
      r()
  ], SmartQasaFanTile.prototype, "_icon", void 0);
  __decorate([
      r()
  ], SmartQasaFanTile.prototype, "_name", void 0);
  __decorate([
      r()
  ], SmartQasaFanTile.prototype, "_stateObj", void 0);
  customElements.define("smartqasa-fan-tile", SmartQasaFanTile);
  window.customCards.push({
      type: "smartqasa-fan-tile",
      name: "SmartQasa Fan Tile",
      preview: true,
      description: "A SmartQasa tile for controlling a fan entity.",
  });

  var styleTileIconBlink = i$2 `
  @keyframes blink {
    50% {
      opacity: 0.25;
    }
  }
`;

  class SmartQasaGarageTile extends s {
      setConfig(config) {
          var _a;
          if (!config.entity) {
              throw new Error("You must specify an entity");
          }
          this._entity = config.entity;
          this._name = (_a = config.name) !== null && _a !== void 0 ? _a : undefined;
      }
      set hass(hass) {
          var _a;
          this._hass = hass;
          this._stateObj = (_a = this._hass.states[this._entity]) !== null && _a !== void 0 ? _a : undefined;
      }
      render() {
          var _a, _b, _c, _d;
          let icon = "hass:alert-rhombus";
          let iconColor = "var(--sq-unavailable-rgb)";
          let iconAnimation = "none";
          let name = (_a = this._name) !== null && _a !== void 0 ? _a : "Unknown";
          let stateFmtd;
          if (this._stateObj) {
              const state = (_b = this._stateObj.state) !== null && _b !== void 0 ? _b : "unknown";
              switch (state) {
                  case "closed":
                      icon = "hass:garage-variant";
                      iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
                      iconAnimation = "none";
                      break;
                  case "closing":
                      icon = "hass:arrow-down-box";
                      iconColor = "var(--sq-garage-closing-rgb, 255, 120, 0)";
                      iconAnimation = "blink 2.0s linear infinite";
                      break;
                  case "opening":
                      icon = "hass:arrow-up-box";
                      iconColor = "var(--sq-garage-opening-rgb, 255, 120, 0)";
                      iconAnimation = "blink 2.0s linear infinite";
                      break;
                  case "open":
                      icon = "hass:garage-open-variant";
                      iconColor = "var(--sq-garage-open-rgb, 255, 120, 0)";
                      iconAnimation = "none";
                      break;
                  default:
                      icon = "hass:alert-rhombus";
                      iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                      iconAnimation = "none";
                      break;
              }
              stateFmtd =
                  this._hass.formatEntityState(this._stateObj) +
                      (state === "open" && this._stateObj.attributes.current_position
                          ? " - " +
                              this._hass.formatEntityAttributeValue(this._stateObj, "current_position")
                          : "");
              name = (_d = (_c = this._name) !== null && _c !== void 0 ? _c : this._stateObj.attributes.friendly_name) !== null && _d !== void 0 ? _d : this._entity;
          }
          return x `
      <div class="container" @click=${this._showMoreInfo}>
        <div
          class="icon"
          @click=${this._toggleEntity}
          style="
            color: rgb(${iconColor});
            background-color: rgba(${iconColor}, var(--sq-icon-opacity));
            animation: ${iconAnimation};
          "
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
        <div class="state">${stateFmtd}</div>
      </div>
    `;
      }
      _toggleEntity(e) {
          e.stopPropagation();
          if (this._hass && this._stateObj) {
              this._hass.callService("cover", "toggle", { entity_id: this._entity });
          }
      }
      _showMoreInfo(e) {
          e.stopPropagation();
          const event = new CustomEvent("hass-more-info", {
              bubbles: true,
              composed: true,
              detail: { entityId: this._entity },
          });
          this.dispatchEvent(event);
      }
      getCardSize() {
          return 1;
      }
  }
  SmartQasaGarageTile.styles = [styleTileBase, styleTileState, styleTileIconBlink];
  __decorate([
      r()
  ], SmartQasaGarageTile.prototype, "_entity", void 0);
  __decorate([
      r()
  ], SmartQasaGarageTile.prototype, "_name", void 0);
  __decorate([
      r()
  ], SmartQasaGarageTile.prototype, "_stateObj", void 0);
  customElements.define("smartqasa-garage-tile", SmartQasaGarageTile);
  window.customCards.push({
      type: "smartqasa-garage-tile",
      name: "SmartQasa Garage Tile",
      preview: true,
      description: "A SmartQasa tile for controlling a garage cover entity.",
  });

  class SmartQasaLightTile extends s {
      setConfig(config) {
          var _a, _b;
          if (!config.entity) {
              throw new Error("You must specify an entity");
          }
          this._entity = config.entity;
          this._icon = (_a = config.icon) !== null && _a !== void 0 ? _a : undefined;
          this._name = (_b = config.name) !== null && _b !== void 0 ? _b : undefined;
      }
      set hass(hass) {
          var _a;
          this._hass = hass;
          this._stateObj = (_a = this._hass.states[this._entity]) !== null && _a !== void 0 ? _a : undefined;
      }
      render() {
          var _a, _b, _c, _d, _e, _f, _g;
          let icon = (_a = this._icon) !== null && _a !== void 0 ? _a : "hass:alert-rhombus";
          let iconColor = "var(--sq-unavailable-rgb)";
          let name = (_b = this._name) !== null && _b !== void 0 ? _b : "Unknown";
          let stateFmtd = "Unknown";
          if (this._stateObj) {
              const state = (_c = this._stateObj.state) !== null && _c !== void 0 ? _c : "unknown";
              icon = (_e = (_d = this._icon) !== null && _d !== void 0 ? _d : this._stateObj.attributes.icon) !== null && _e !== void 0 ? _e : "hass:help-circle";
              iconColor = state == "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb)";
              name = (_g = (_f = this._name) !== null && _f !== void 0 ? _f : this._stateObj.attributes.friendly_name) !== null && _g !== void 0 ? _g : this._entity;
              stateFmtd =
                  this._hass.formatEntityState(this._stateObj) +
                      (state == "on" && this._stateObj.attributes.brightness
                          ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "brightness")
                          : "");
          }
          return x `
      <div class="container" @click=${this._showMoreInfo}>
        <div
          class="icon"
          @click=${this._toggleEntity}
          style="
            color: rgb(${iconColor});
            background-color: rgba(${iconColor}, var(--sq-icon-opacity));
          "
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
        <div class="state">${stateFmtd}</div>
      </div>
    `;
      }
      _toggleEntity(e) {
          e.stopPropagation();
          if (this._hass && this._stateObj) {
              this._hass.callService("light", "toggle", { entity_id: this._entity });
          }
      }
      _showMoreInfo(e) {
          e.stopPropagation();
          const event = new CustomEvent("hass-more-info", {
              bubbles: true,
              composed: true,
              detail: { entityId: this._entity },
          });
          this.dispatchEvent(event);
      }
      getCardSize() {
          return 1;
      }
  }
  SmartQasaLightTile.styles = [styleTileBase, styleTileState];
  __decorate([
      r()
  ], SmartQasaLightTile.prototype, "_entity", void 0);
  __decorate([
      r()
  ], SmartQasaLightTile.prototype, "_icon", void 0);
  __decorate([
      r()
  ], SmartQasaLightTile.prototype, "_name", void 0);
  __decorate([
      r()
  ], SmartQasaLightTile.prototype, "_stateObj", void 0);
  customElements.define("smartqasa-light-tile", SmartQasaLightTile);
  window.customCards.push({
      type: "smartqasa-light-tile",
      name: "SmartQasa Light Tile",
      preview: true,
      description: "A SmartQasa tile for controlling a light entity.",
  });

  class SmartQasaLockTile extends s {
      setConfig(config) {
          var _a;
          if (!config.entity) {
              throw new Error("You must specify an entity");
          }
          this._name = (_a = config.name) !== null && _a !== void 0 ? _a : undefined;
      }
      set hass(hass) {
          var _a, _b, _c, _d;
          this._hass = hass;
          this._stateObj = (_a = this._hass.states[this._entity]) !== null && _a !== void 0 ? _a : undefined;
          if (this._stateObj) {
              const state = (_b = this._stateObj.state) !== null && _b !== void 0 ? _b : "unknown";
              switch (state) {
                  case "locked":
                      this._icon = "hass:lock";
                      this._iconColor = "var(--sq-inactive-rgb)";
                      break;
                  case "unlocked":
                      this._icon = "hass:lock-open";
                      this._iconColor = "var(--sq-lock-unlocked-rgb)";
                      break;
                  default:
                      this._icon = "hass:alert-rhombus";
                      this._iconColor = "var(--sq-unavailable-rgb)";
                      break;
              }
              this._iconAnimation = "none";
              this._name = (_d = (_c = this._name) !== null && _c !== void 0 ? _c : this._stateObj.attributes.friendly_name) !== null && _d !== void 0 ? _d : this._entity;
              this._stateFmtd = this._hass.formatEntityState(this._stateObj);
          }
          else {
              this._icon = "hass:alert-rhombus";
              this._iconAnimation = "none";
              this._iconColor = "var(--sq-unavailable-rgb)";
              this._name = "Unknown";
              this._stateFmtd = "Unknown";
          }
      }
      render() {
          return x `
      <div class="container" @click=${this._showMoreInfo}>
        <div
          class="icon"
          id="icon"
          @click=${this._toggleLock}
          style="
            color: rgb(${this._iconColor});
            background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
            animation: ${this._iconAnimation}"
        >
          <ha-icon .icon=${this._icon}></ha-icon>
        </div>
        <div class="name">${this._name}</div>
        <div class="state">${this._stateFmtd}</div>
      </div>
    `;
      }
      _toggleLock(e) {
          var _a;
          e.stopPropagation();
          if (this._hass && this._stateObj) {
              this._icon = "hass:rotate-right";
              this._iconAnimation = "spin 1.0s linear infinite";
              this._hass.callService("lock", ((_a = this._stateObj) === null || _a === void 0 ? void 0 : _a.state) === "locked" ? "unlock" : "lock", { entity_id: this._entity });
          }
      }
      _showMoreInfo(e) {
          e.stopPropagation();
          const event = new CustomEvent("hass-more-info", {
              bubbles: true,
              composed: true,
              detail: { entityId: this._entity },
          });
          this.dispatchEvent(event);
      }
      getCardSize() {
          return 1;
      }
  }
  SmartQasaLockTile.styles = [styleTileBase, styleTileState, styleTileIconSpin];
  __decorate([
      r()
  ], SmartQasaLockTile.prototype, "_entity", void 0);
  __decorate([
      r()
  ], SmartQasaLockTile.prototype, "_name", void 0);
  __decorate([
      r()
  ], SmartQasaLockTile.prototype, "_icon", void 0);
  __decorate([
      r()
  ], SmartQasaLockTile.prototype, "_iconColor", void 0);
  __decorate([
      r()
  ], SmartQasaLockTile.prototype, "_iconAnimation", void 0);
  __decorate([
      r()
  ], SmartQasaLockTile.prototype, "_stateFmtd", void 0);
  __decorate([
      r()
  ], SmartQasaLockTile.prototype, "_stateObj", void 0);
  customElements.define("smartqasa-lock-tile", SmartQasaLockTile);
  window.customCards.push({
      type: "smartqasa-lock-tile",
      name: "SmartQasa Lock Tile",
      preview: true,
      description: "A SmartQasa tile for controlling a lock entity.",
  });

  class SmartQasaRoutineTile extends s {
      setConfig(config) {
          var _a, _b;
          if (!config.entity) {
              throw new Error("You must specify an entity");
          }
          this._entity = config.entity;
          this._icon = (_a = config.icon) !== null && _a !== void 0 ? _a : undefined;
          this._name = (_b = config.name) !== null && _b !== void 0 ? _b : undefined;
      }
      set hass(hass) {
          var _a;
          this._hass = hass;
          this._stateObj = (_a = this._hass.states[this._entity]) !== null && _a !== void 0 ? _a : undefined;
      }
      render() {
          var _a, _b, _c, _d, _e, _f;
          this._icon = (_a = this._icon) !== null && _a !== void 0 ? _a : "hass:alert-rhombus";
          let iconColor = "var(--sq-unavailable-rgb)";
          this._iconAnimation = "none";
          let name = (_b = this._name) !== null && _b !== void 0 ? _b : "Unknown";
          if (this._stateObj) {
              this._icon = (_d = (_c = this._icon) !== null && _c !== void 0 ? _c : this._stateObj.attributes.icon) !== null && _d !== void 0 ? _d : "hass:help-circle";
              iconColor = "var(--sq-inactive-rgb)";
              name = (_f = (_e = this._name) !== null && _e !== void 0 ? _e : this._stateObj.attributes.friendly_name) !== null && _f !== void 0 ? _f : this._entity;
          }
          return x `
      <div class="container" @click=${this._runRoutine}>
        <div
          class="icon"
          id="icon"
          @click=${this._runRoutine}
          style="
            color: rgb(${iconColor});
            background-color: rgba(${iconColor}, var(--sq-icon-opacity));
            animation: ${this._iconAnimation};
          "
        >
          <ha-icon .icon=${this._icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
      </div>
    `;
      }
      _runRoutine(e) {
          e.stopPropagation();
          if (this._hass && this._stateObj) {
              let icon = this._icon;
              this._icon = "hass:rotate-right";
              this._iconAnimation = "spin 1.0s linear infinite";
              const domain = this._entity.split(".")[0];
              switch (domain) {
                  case "script":
                      this._hass.callService("script", "turn_on", { entity_id: this._entity });
                      break;
                  case "scene":
                      this._hass.callService("scene", "turn_on", { entity_id: this._entity });
                      break;
                  case "automation":
                      this._hass.callService("automation", "trigger", { entity_id: this._entity });
                      break;
                  default:
                      console.error("Unsupported entity domain:", domain);
                      return;
              }
              setTimeout(() => {
                  this._icon = icon;
                  this._iconAnimation = "none";
              }, 2000);
          }
      }
      getCardSize() {
          return 1;
      }
  }
  SmartQasaRoutineTile.styles = [styleTileBase, styleTileIconSpin];
  __decorate([
      r()
  ], SmartQasaRoutineTile.prototype, "_entity", void 0);
  __decorate([
      r()
  ], SmartQasaRoutineTile.prototype, "_icon", void 0);
  __decorate([
      r()
  ], SmartQasaRoutineTile.prototype, "_iconAnimation", void 0);
  __decorate([
      r()
  ], SmartQasaRoutineTile.prototype, "_name", void 0);
  __decorate([
      r()
  ], SmartQasaRoutineTile.prototype, "_stateObj", void 0);
  customElements.define("smartqasa-routine-tile", SmartQasaRoutineTile);
  window.customCards.push({
      type: "smartqasa-routine-tile",
      name: "SmartQasa Routine Tile",
      preview: true,
      description: "A SmartQasa tile for triggering an automation, scene, or script entity.",
  });

  class SmartQasaShadeTile extends s {
      setConfig(config) {
          var _a, _b;
          if (!config.entity) {
              throw new Error("You must specify an entity");
          }
          this._entity = config.entity;
          this._name = (_a = config.name) !== null && _a !== void 0 ? _a : undefined;
          this._tilt = (_b = config.tilt) !== null && _b !== void 0 ? _b : 100;
      }
      set hass(hass) {
          var _a;
          this._hass = hass;
          this._stateObj = (_a = this._hass.states[this._entity]) !== null && _a !== void 0 ? _a : undefined;
      }
      render() {
          var _a, _b, _c;
          let icon = "hass:alert-rhombus";
          let iconColor = "var(--sq-unavailable-rgb)";
          let iconAnimation = "none";
          let name = (_a = this._name) !== null && _a !== void 0 ? _a : "Unknown";
          let stateFmtd = "Unknown";
          if (this._stateObj) {
              const state = this._stateObj.state;
              switch (state) {
                  case "closed":
                      icon = "hass:roller-shade-closed";
                      iconColor = "var(--sq-inactive-rgb, 128, 128, 128)";
                      iconAnimation = "none";
                      break;
                  case "closing":
                      icon = "hass:arrow-down-box";
                      iconColor = "var(--sq-shade-closing-rgb, 146, 107, 199)";
                      iconAnimation = "blink 2.0s linear infinite";
                      break;
                  case "opening":
                      icon = "hass:arrow-up-box";
                      iconColor = "var(--sq-shade-opening-rgb, 146, 107, 199)";
                      iconAnimation = "blink 2.0s linear infinite";
                      break;
                  case "open":
                      icon = "hass:roller-shade";
                      iconColor = "var(--sq-shade-open-rgb, 146, 107, 199)";
                      iconAnimation = "none";
                      break;
                  default:
                      icon = "hass:alert-rhombus";
                      iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                      iconAnimation = "none";
                      break;
              }
              stateFmtd =
                  this._hass.formatEntityState(this._stateObj) +
                      (state === "open" && this._stateObj.attributes.current_position
                          ? " - " +
                              this._hass.formatEntityAttributeValue(this._stateObj, "current_position")
                          : "");
              name =
                  (_c = (_b = this._name) !== null && _b !== void 0 ? _b : this._stateObj.attributes.friendly_name) !== null && _c !== void 0 ? _c : this._entity;
          }
          return x `
      <div class="container" @click=${this._showMoreInfo}>
        <div
          class="icon"
          @click=${this._toggleEntity}
          style="
            color: rgb(${iconColor});
            background-color: rgba(${iconColor}, var(--sq-icon-opacity));
            animation: ${iconAnimation};
          "
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
        <div class="state">${stateFmtd}</div>
      </div>
    `;
      }
      _toggleEntity(e) {
          e.stopPropagation();
          if (this._hass && this._stateObj && typeof this._tilt === "number") {
              const newPosition = this._stateObj.attributes.current_position < this._tilt ? this._tilt : 0;
              this._hass.callService("cover", "set_cover_position", {
                  entity_id: this._entity,
                  position: newPosition,
              });
          }
      }
      _showMoreInfo(e) {
          e.stopPropagation();
          const event = new CustomEvent("hass-more-info", {
              bubbles: true,
              composed: true,
              detail: { entityId: this._entity },
          });
          this.dispatchEvent(event);
      }
      getCardSize() {
          return 1;
      }
  }
  SmartQasaShadeTile.styles = [styleTileBase, styleTileState, styleTileIconBlink];
  __decorate([
      r()
  ], SmartQasaShadeTile.prototype, "_entity", void 0);
  __decorate([
      r()
  ], SmartQasaShadeTile.prototype, "_name", void 0);
  __decorate([
      r()
  ], SmartQasaShadeTile.prototype, "_stateObj", void 0);
  __decorate([
      r()
  ], SmartQasaShadeTile.prototype, "_tilt", void 0);
  customElements.define("smartqasa-shade-tile", SmartQasaShadeTile);
  window.customCards.push({
      type: "smartqasa-shade-tile",
      name: "SmartQasa Shade Tile",
      preview: true,
      description: "A SmartQasa tile for controlling a window shade entity.",
  });

  class SmartQasaSwitchTile extends s {
      setConfig(config) {
          var _a, _b, _c;
          if (!config.entity) {
              throw new Error("You must specify an entity");
          }
          this._category = (_a = config.category) !== null && _a !== void 0 ? _a : undefined;
          this._entity = config.entity;
          this._icon = (_b = config.icon) !== null && _b !== void 0 ? _b : undefined;
          this._name = (_c = config.name) !== null && _c !== void 0 ? _c : undefined;
      }
      set hass(hass) {
          var _a;
          this._hass = hass;
          this._stateObj = (_a = this._hass.states[this._entity]) !== null && _a !== void 0 ? _a : undefined;
      }
      render() {
          var _a, _b, _c, _d, _e, _f;
          let icon = (_a = this._icon) !== null && _a !== void 0 ? _a : "hass:alert-rhombus";
          let iconColor = "var(--sq-unavailable-rgb)";
          let name = (_b = this._name) !== null && _b !== void 0 ? _b : "Unknown";
          let stateFmtd = "Unknown";
          if (this._stateObj) {
              const state = this._stateObj.state;
              icon = (_d = (_c = this._icon) !== null && _c !== void 0 ? _c : this._stateObj.attributes.icon) !== null && _d !== void 0 ? _d : "hass:help-circle";
              iconColor = state === "on"
                  ? `var(--sq-switch${this._category ? `-${this._category}` : ""}-on-rgb)`
                  : "var(--sq-inactive-rgb)";
              name = (_f = (_e = this._name) !== null && _e !== void 0 ? _e : this._stateObj.attributes.friendly_name) !== null && _f !== void 0 ? _f : this._entity;
              stateFmtd = this._hass ? this._hass.formatEntityState(this._stateObj) : "Unknown";
          }
          return x `
      <div class="container" @click=${this._showMoreInfo}>
        <div
          class="icon"
          @click=${this._toggleEntity}
          style="color: rgb(${iconColor}); background-color: rgba(${iconColor}, var(--sq-icon-opacity));"
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="name">${name}</div>
        <div class="state">${stateFmtd}</div>
      </div>
    `;
      }
      _toggleEntity(e) {
          e.stopPropagation();
          if (this._hass && this._stateObj) {
              this._hass.callService("homeassistant", "toggle", {
                  entity_id: this._entity,
              });
          }
      }
      _showMoreInfo(e) {
          e.stopPropagation();
          const event = new CustomEvent("hass-more-info", {
              bubbles: true,
              composed: true,
              detail: { entityId: this._entity },
          });
          this.dispatchEvent(event);
      }
      getCardSize() {
          return 1;
      }
  }
  SmartQasaSwitchTile.styles = [styleTileBase, styleTileState];
  __decorate([
      r()
  ], SmartQasaSwitchTile.prototype, "_category", void 0);
  __decorate([
      r()
  ], SmartQasaSwitchTile.prototype, "_entity", void 0);
  __decorate([
      r()
  ], SmartQasaSwitchTile.prototype, "_icon", void 0);
  __decorate([
      r()
  ], SmartQasaSwitchTile.prototype, "_name", void 0);
  __decorate([
      r()
  ], SmartQasaSwitchTile.prototype, "_stateObj", void 0);
  customElements.define("smartqasa-switch-tile", SmartQasaSwitchTile);
  window.customCards.push({
      type: "smartqasa-switch-tile",
      name: "SmartQasa Switch Tile",
      preview: true,
      description: "A SmartQasa tile for toggling an entity.",
  });

  var _a;
  window.smartqasa = window.smartqasa || {};
  if (typeof window.screen.width === "number") {
      window.smartqasa.deviceType = window.screen.width < 600 ? "phone" : "tablet";
  }
  else {
      window.smartqasa.deviceType = "tablet";
  }
  window.customCards = (_a = window.customCards) !== null && _a !== void 0 ? _a : [];

})();
