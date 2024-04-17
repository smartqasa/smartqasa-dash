var version = "1.1.70";

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
/* global Reflect, Promise, SuppressedError, Symbol */


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
const t$3=globalThis,e$3=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$5=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$5(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$2,getOwnPropertyDescriptor:r$4,getOwnPropertyNames:h$1,getOwnPropertySymbols:o$3,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),y$1={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$1){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e$2(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$4(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...h$1(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$1)(this[t],s))return;this.P(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$ET());}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$ET(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i);}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU();}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU();}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d$1("elementProperties")]=new Map,b[d$1("finalized")]=new Map,p$1?.({ReactiveElement:b}),(a$1.reactiveElementVersions??=[]).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$3=t$2.trustedTypes,s$1=i$3?i$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$1="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$2="?"+h,n$2=`<${o$2}>`,r$3=document,l=()=>r$3.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),w=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),A=new WeakMap,E=r$3.createTreeWalker(r$3,129);function C(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const P=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$2:d>=0?(o.push(a),s.slice(0,d)+e$1+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [C(t,l+(t[s]||"<?>")+(2===i?"</svg>":"")),o]};class V{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=P(t,s);if(this.el=V.createElement(f,n),E.currentNode=this.el.content,2===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=E.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$1)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?k:"?"===e[1]?H:"@"===e[1]?I:R}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$3?i$3.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),E.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$2)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$3.createElement("template");return s.innerHTML=t,s}}function N(t,i,s=t,e){if(i===w)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=N(t,h._$AS(t,i.values),h,e)),i}class S{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$3).importNode(i,!0);E.currentNode=e;let h=E.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new M(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new L(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=E.nextNode(),o++);}return E.currentNode=r$3,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N(this,t,i),c(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==w&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t));}_(t){this._$AH!==T&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$3.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=V.createElement(C(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new S(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new V(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new M(this.S(l()),this.S(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=T;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=N(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=N(this,e[s+n],i,n),r===w&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===T?t=T:t!==T&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class k extends R{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===T?void 0:t;}}class H extends R{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T);}}class I extends R{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=N(this,t,i,0)??T)===w)return;const s=this._$AH,e=t===T&&s!==T||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==T&&(s===T||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t);}}const Z=t$2.litHtmlPolyfillSupport;Z?.(V,M),(t$2.litHtmlVersions??=[]).push("3.1.3");const j=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new M(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class s extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=j(i,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return w}}s._$litElement$=!0,s[("finalized")]=!0,globalThis.litElementHydrateSupport?.({LitElement:s});const r$2=globalThis.litElementPolyfillSupport;r$2?.({LitElement:s});(globalThis.litElementVersions??=[]).push("4.0.5");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1},r$1=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.P(o,void 0,t),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:!0}:t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n$1({...r,state:!0,attribute:!1})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});let i$2 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i$1=" !"+n,o=e(class extends i$2{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i$1);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return w}});

const chipBasicStyle = i$5 `
    .container {
        width: fit-content;
        place-self: center;
        display: grid;
        grid-template-areas: "i t";
        grid-column-gap: 0.5rem;
        margin-right: 0.7rem;
        padding: 1rem;
        border: var(--sq-card-border);
        border-radius: var(--sq-chip-border-radius);
        background-color: var(--sq-card-background-color);
        cursor: pointer;
    }
    .icon {
        grid-area: i;
        display: flex;
        height: 1.8rem;
        width: 1.8rem;
        transition: var(--sq-icon-transition, none);
    }
    .text {
        grid-area: t;
        place-self: center start;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        font-weight: var(--sq-primary-font-weight, 400);
        font-size: var(--sq-primary-font-size, 1.5rem);
        color: rgb(var(--sq-primary-font-rgb), 128, 128, 128);
    }
`;
const chipDoubleStyle = i$5 `
    .container {
        width: fit-content;
        place-self: center;
        display: grid;
        grid-template-areas: "i1 s i2";
        grid-column-gap: 0.7rem;
        margin-right: 0.7rem;
        padding: 0.2rem;
        border: var(--sq-card-border);
        border-radius: var(--sq-chip-border-radius);
        background-color: var(--sq-card-background-color);
        cursor: pointer;
    }
    .container::after {
        content: "";
        grid-area: s;
        width: 1px;
        background-color: rgb(128, 128, 128);
        margin: auto;
        height: 90%;
    }
    .icon1 {
        grid-area: i1;
    }
    .icon2 {
        grid-area: i2;
    }
    .icon1,
    .icon2 {
        display: flex;
        --mdc-icon-size: 3.4rem;
        color: rgb(var(--sq-primary-text-rgb));
    }
`;

let MotionChip = class MotionChip extends s {
    static { this.styles = chipBasicStyle; }
    setConfig(config) {
        if (!config?.entity)
            return;
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("automation.") ? this._config.entity : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (!this._entity || !this._stateObj)
            return;
        const state = this._stateObj.state || undefined;
        switch (state) {
            case "on":
                this._icon = "hass:motion-sensor";
                this._iconColor = "var(--sq-primary-font-rgb)";
                break;
            case "off":
                this._icon = "hass:motion-sensor-off";
                this._iconColor = "var(--sq-red-rgb, 255, 0, 0)";
                break;
            default:
                this._icon = "hass:motion-sensor-off";
                this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                break;
        }
        this._name = this._config?.name || "";
        this._containerStyle = {
            gridTemplateAreas: this._name ? "'i t'" : "'i'",
            gridColumnGap: this._name ? "10px" : "0",
            justifyContent: this._name ? "start" : "center",
        };
    }
    render() {
        if (!this._entity)
            return x ``;
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
        };
        return x `
            <div class="container" style="${o(this._containerStyle)}" @click=${this.toggleEntity}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                ${this._name ? x `<div class="text">${this._name}</div>` : null}
            </div>
        `;
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (!this._stateObj)
            return;
        this._hass.callService("homeassistant", "toggle", { entity_id: this._config?.entity });
    }
};
__decorate([
    r()
], MotionChip.prototype, "_config", void 0);
__decorate([
    r()
], MotionChip.prototype, "_stateObj", void 0);
MotionChip = __decorate([
    t$1("smartqasa-motion-chip")
], MotionChip);
window.customCards.push({
    type: "smartqasa-motion-chip",
    name: "SmartQasa Motion Sensor Chip",
    preview: true,
    description: "A SmartQasa chip for toggling a motion sensor automation entity.",
});

let NavigateChip = class NavigateChip extends s {
    static { this.styles = chipDoubleStyle; }
    setConfig(config) {
        this._areaPrev = config.area_prev || undefined;
        this._areaNext = config.area_next || undefined;
    }
    set hass(hass) {
        if (!this._areaPrev || !this._areaNext || !hass)
            return;
        this._hass = hass;
        this._areaObjPrev = this._hass.areas[this._areaPrev];
        this._areaObjNext = this._hass.areas[this._areaNext];
    }
    render() {
        if (!this._areaObjPrev || !this._areaObjNext) {
            return x ``;
        }
        const iconPrev = "hass:menu-left";
        const iconNext = "hass:menu-right";
        return x `
            <div class="container">
                <div class="icon1" @click=${this._navigatePrev}>
                    <ha-icon .icon=${iconPrev}></ha-icon>
                </div>
                <div class="icon2" @click=${this._navigateNext}>
                    <ha-icon .icon=${iconNext}></ha-icon>
                </div>
            </div>
        `;
    }
    _navigatePrev(e) {
        e.stopPropagation();
        if (this._areaObjPrev) {
            window.history.pushState(null, "", `/home-dash/${this._areaPrev}`);
            window.dispatchEvent(new CustomEvent("location-changed"));
            // Assume browser_mod is correctly typed and included
        }
        else {
            console.error("Previous area is not found.");
        }
    }
    _navigateNext(e) {
        e.stopPropagation();
        if (this._areaObjNext) {
            window.history.pushState(null, "", `/home-dash/${this._areaNext}`);
            window.dispatchEvent(new CustomEvent("location-changed"));
        }
        else {
            console.error("Next area is not found.");
        }
    }
};
__decorate([
    r()
], NavigateChip.prototype, "_areaPrev", void 0);
__decorate([
    r()
], NavigateChip.prototype, "_areaNext", void 0);
__decorate([
    r()
], NavigateChip.prototype, "_areaObjPrev", void 0);
__decorate([
    r()
], NavigateChip.prototype, "_areaObjNext", void 0);
NavigateChip = __decorate([
    t$1("smartqasa-navigate-chip")
], NavigateChip);
window.customCards.push({
    type: "smartqasa-navigate-chip",
    name: "SmartQasa Navigate Chip",
    preview: true,
    description: "A SmartQasa chip for navigating to a previous/next area.",
});

const listDialogStyle = {
    margin: "0",
    "grid-template-columns": "1fr",
    "grid-gap": "var(--sq-dialog-grid-gap)",
};

const listDialogConfig = (dialogTitle, filterType, filterValue, tileType) => {
    return {
        title: dialogTitle,
        timeout: 60000,
        content: {
            type: "custom:auto-entities",
            card: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: listDialogStyle,
            },
            card_param: "cards",
            filter: {
                include: [
                    {
                        [filterType]: filterValue,
                        sort: {
                            method: "friendly_name",
                            ignore_case: true,
                        },
                        options: {
                            type: `custom:smartqasa-${tileType}-tile`,
                            dialogTitle: dialogTitle,
                            filterType: filterType,
                            filterValue: filterValue,
                            tileType: tileType,
                        },
                    },
                ],
            },
        },
    };
};

function moreInfoDialog(config, stateObj) {
    if (!stateObj)
        return;
    const dialogConfig = {
        title: stateObj.attributes?.friendly_name || stateObj.entity_id,
        timeout: 60000,
        content: {
            type: "custom:smartqasa-more-info-dialog",
            entity: stateObj.entity_id,
        },
        ...(config.dialogTitle && {
            dismiss_action: {
                service: "browser_mod.popup",
                data: {
                    ...listDialogConfig(config.dialogTitle, config.filterType, config.filterValue, config.tileType),
                },
            },
        }),
    };
    window.browser_mod?.service("popup", dialogConfig);
}

const heaterColors = {
    electric: "var(--sq-climate-heat-rgb, 250, 67, 54)",
    heating: "var(--sq-climate-heat-rgb, 250, 67, 54)",
    idle: "var(--sq-idle-rgb, 128, 128, 128)",
    off: "var(--sq-inactive-rgb, 128, 128, 128)",
    default: "var(--sq-unavailable-rgb, 255, 0, 255)",
};
const thermostatColors = {
    cooling: "var(--sq-climate-cool-rgb, 3, 169, 244)",
    heating: "var(--sq-climate-heat-rgb, 250, 67, 54)",
    fan_only: "var(--sq-climate-fan_only-rgb, 0, 255, 0)",
    idle: "var(--sq-idle-rgb, 128, 128, 128)",
    off: "var(--sq-inactive-rgb, 128, 128, 128)",
    default: "var(--sq-unavailable-rgb, 255, 0, 255)",
};
const thermostatIcons = {
    auto: "hass:thermostat-auto",
    cool: "hass:snowflake",
    heat: "hass:fire",
    heat_cool: "hass:sun-snowflake-variant",
    off: "hass:power",
    default: "hass:thermostat-cog",
};

let ThermostatChip = class ThermostatChip extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:thermometer-lines";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._temperature = "??";
    }
    static { this.styles = chipBasicStyle; }
    setConfig(config) {
        if (!config?.entity)
            return;
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("climate.") ? this._config.entity : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (!this._entity || !this._stateObj) {
            this._icon = thermostatIcons.default;
            this._iconColor = thermostatColors.default;
            this._temperature = "??";
            return;
        }
        const state = this._stateObj.state;
        this._icon = thermostatIcons[state] || thermostatIcons.default;
        const hvacAction = this._stateObj.attributes.hvac_action;
        this._iconColor = thermostatColors[hvacAction] || thermostatColors.default;
        this._temperature = this._stateObj.attributes.current_temperature || "??";
    }
    render() {
        if (!this._entity)
            return x ``;
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" id="icon" style="color: rgb(${this._iconColor});">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="text">${this._temperature}°</div>
            </div>
        `;
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
};
__decorate([
    r()
], ThermostatChip.prototype, "_config", void 0);
__decorate([
    r()
], ThermostatChip.prototype, "_stateObj", void 0);
ThermostatChip = __decorate([
    t$1("smartqasa-thermostat-chip")
], ThermostatChip);

let AreaPicture = class AreaPicture extends s {
    static get styles() {
        return i$5 `
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
    setConfig(config) {
        this._config = config;
        if (this._hass)
            this.hass = this._hass;
    }
    set hass(hass) {
        this._hass = hass;
        this._areaObj = this._config?.area ? this._hass?.areas[this._config.area] : undefined;
    }
    render() {
        const height = window.smartqasa.deviceType == "phone" ? "15vh" : "20vh";
        const picture = this._config?.picture
            ? `/local/smartqasa/images/${this._config.picture}`
            : this._areaObj?.picture ?? "/local/sq-storage/images/default.png";
        return x `
            <ha-card style="background-image: url(${picture}); height: ${height};" class="picture"></ha-card>
        `;
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], AreaPicture.prototype, "_config", void 0);
__decorate([
    r()
], AreaPicture.prototype, "_areaObj", void 0);
AreaPicture = __decorate([
    t$1("smartqasa-area-picture")
], AreaPicture);
window.customCards.push({
    type: "smartqasa-area-picture",
    name: "SmartQasa Area Picture",
    preview: true,
    description: "A SmartQasa card for rendering an area picture.",
});

function areasDialog(hass) {
    if (!hass)
        return;
    const areas = Object.values(hass.areas).filter((area) => area?.labels.includes("visible"));
    const cards = areas?.map((area) => ({
        type: "custom:smartqasa-area-tile",
        area: area.area_id,
    }));
    const dialogConfig = {
        title: "Areas",
        timeout: 60000,
        content: {
            type: "custom:layout-card",
            layout_type: "custom:grid-layout",
            layout: {
                margin: 0,
                "grid-template-columns": window.smartqasa.deviceType === "phone"
                    ? "repeat(2, 1fr)"
                    : "repeat(3, var(--sq-tile-width-tablet, 20rem))",
                "grid-gap": "var(--sq-dialog-grid-gap)",
            },
            cards: cards,
        },
    };
    window.browser_mod?.service("popup", dialogConfig);
}

/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function isNothing(subject) {
  return (typeof subject === 'undefined') || (subject === null);
}


function isObject(subject) {
  return (typeof subject === 'object') && (subject !== null);
}


function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];

  return [ sequence ];
}


function extend(target, source) {
  var index, length, key, sourceKeys;

  if (source) {
    sourceKeys = Object.keys(source);

    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }

  return target;
}


function repeat(string, count) {
  var result = '', cycle;

  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }

  return result;
}


function isNegativeZero(number) {
  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
}


var isNothing_1      = isNothing;
var isObject_1       = isObject;
var toArray_1        = toArray;
var repeat_1         = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1         = extend;

var common = {
	isNothing: isNothing_1,
	isObject: isObject_1,
	toArray: toArray_1,
	repeat: repeat_1,
	isNegativeZero: isNegativeZero_1,
	extend: extend_1
};

// YAML error class. http://stackoverflow.com/questions/8458984


function formatError(exception, compact) {
  var where = '', message = exception.reason || '(unknown reason)';

  if (!exception.mark) return message;

  if (exception.mark.name) {
    where += 'in "' + exception.mark.name + '" ';
  }

  where += '(' + (exception.mark.line + 1) + ':' + (exception.mark.column + 1) + ')';

  if (!compact && exception.mark.snippet) {
    where += '\n\n' + exception.mark.snippet;
  }

  return message + ' ' + where;
}


function YAMLException$1(reason, mark) {
  // Super constructor
  Error.call(this);

  this.name = 'YAMLException';
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);

  // Include stack trace in error object
  if (Error.captureStackTrace) {
    // Chrome and NodeJS
    Error.captureStackTrace(this, this.constructor);
  } else {
    // FF, IE 10+ and Safari 6+. Fallback for others
    this.stack = (new Error()).stack || '';
  }
}


// Inherit from Error
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;


YAMLException$1.prototype.toString = function toString(compact) {
  return this.name + ': ' + formatError(this, compact);
};


var exception = YAMLException$1;

// get snippet for a single line, respecting maxLength
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = '';
  var tail = '';
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;

  if (position - lineStart > maxHalfLength) {
    head = ' ... ';
    lineStart = position - maxHalfLength + head.length;
  }

  if (lineEnd - position > maxHalfLength) {
    tail = ' ...';
    lineEnd = position + maxHalfLength - tail.length;
  }

  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, '→') + tail,
    pos: position - lineStart + head.length // relative position
  };
}


function padStart(string, max) {
  return common.repeat(' ', max - string.length) + string;
}


function makeSnippet(mark, options) {
  options = Object.create(options || null);

  if (!mark.buffer) return null;

  if (!options.maxLength) options.maxLength = 79;
  if (typeof options.indent      !== 'number') options.indent      = 1;
  if (typeof options.linesBefore !== 'number') options.linesBefore = 3;
  if (typeof options.linesAfter  !== 'number') options.linesAfter  = 2;

  var re = /\r?\n|\r|\0/g;
  var lineStarts = [ 0 ];
  var lineEnds = [];
  var match;
  var foundLineNo = -1;

  while ((match = re.exec(mark.buffer))) {
    lineEnds.push(match.index);
    lineStarts.push(match.index + match[0].length);

    if (mark.position <= match.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }

  if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;

  var result = '', i, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);

  for (i = 1; i <= options.linesBefore; i++) {
    if (foundLineNo - i < 0) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i],
      lineEnds[foundLineNo - i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
      maxLineLength
    );
    result = common.repeat(' ', options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) +
      ' | ' + line.str + '\n' + result;
  }

  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common.repeat(' ', options.indent) + padStart((mark.line + 1).toString(), lineNoLength) +
    ' | ' + line.str + '\n';
  result += common.repeat('-', options.indent + lineNoLength + 3 + line.pos) + '^' + '\n';

  for (i = 1; i <= options.linesAfter; i++) {
    if (foundLineNo + i >= lineEnds.length) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i],
      lineEnds[foundLineNo + i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
      maxLineLength
    );
    result += common.repeat(' ', options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) +
      ' | ' + line.str + '\n';
  }

  return result.replace(/\n$/, '');
}


var snippet = makeSnippet;

var TYPE_CONSTRUCTOR_OPTIONS = [
  'kind',
  'multi',
  'resolve',
  'construct',
  'instanceOf',
  'predicate',
  'represent',
  'representName',
  'defaultStyle',
  'styleAliases'
];

var YAML_NODE_KINDS = [
  'scalar',
  'sequence',
  'mapping'
];

function compileStyleAliases(map) {
  var result = {};

  if (map !== null) {
    Object.keys(map).forEach(function (style) {
      map[style].forEach(function (alias) {
        result[String(alias)] = style;
      });
    });
  }

  return result;
}

function Type$1(tag, options) {
  options = options || {};

  Object.keys(options).forEach(function (name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });

  // TODO: Add tag format check.
  this.options       = options; // keep original options in case user wants to extend this type later
  this.tag           = tag;
  this.kind          = options['kind']          || null;
  this.resolve       = options['resolve']       || function () { return true; };
  this.construct     = options['construct']     || function (data) { return data; };
  this.instanceOf    = options['instanceOf']    || null;
  this.predicate     = options['predicate']     || null;
  this.represent     = options['represent']     || null;
  this.representName = options['representName'] || null;
  this.defaultStyle  = options['defaultStyle']  || null;
  this.multi         = options['multi']         || false;
  this.styleAliases  = compileStyleAliases(options['styleAliases'] || null);

  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}

var type = Type$1;

/*eslint-disable max-len*/





function compileList(schema, name) {
  var result = [];

  schema[name].forEach(function (currentType) {
    var newIndex = result.length;

    result.forEach(function (previousType, previousIndex) {
      if (previousType.tag === currentType.tag &&
          previousType.kind === currentType.kind &&
          previousType.multi === currentType.multi) {

        newIndex = previousIndex;
      }
    });

    result[newIndex] = currentType;
  });

  return result;
}


function compileMap(/* lists... */) {
  var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {},
        multi: {
          scalar: [],
          sequence: [],
          mapping: [],
          fallback: []
        }
      }, index, length;

  function collectType(type) {
    if (type.multi) {
      result.multi[type.kind].push(type);
      result.multi['fallback'].push(type);
    } else {
      result[type.kind][type.tag] = result['fallback'][type.tag] = type;
    }
  }

  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}


function Schema$1(definition) {
  return this.extend(definition);
}


Schema$1.prototype.extend = function extend(definition) {
  var implicit = [];
  var explicit = [];

  if (definition instanceof type) {
    // Schema.extend(type)
    explicit.push(definition);

  } else if (Array.isArray(definition)) {
    // Schema.extend([ type1, type2, ... ])
    explicit = explicit.concat(definition);

  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    // Schema.extend({ explicit: [ type1, type2, ... ], implicit: [ type1, type2, ... ] })
    if (definition.implicit) implicit = implicit.concat(definition.implicit);
    if (definition.explicit) explicit = explicit.concat(definition.explicit);

  } else {
    throw new exception('Schema.extend argument should be a Type, [ Type ], ' +
      'or a schema definition ({ implicit: [...], explicit: [...] })');
  }

  implicit.forEach(function (type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }

    if (type$1.loadKind && type$1.loadKind !== 'scalar') {
      throw new exception('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
    }

    if (type$1.multi) {
      throw new exception('There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.');
    }
  });

  explicit.forEach(function (type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }
  });

  var result = Object.create(Schema$1.prototype);

  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);

  result.compiledImplicit = compileList(result, 'implicit');
  result.compiledExplicit = compileList(result, 'explicit');
  result.compiledTypeMap  = compileMap(result.compiledImplicit, result.compiledExplicit);

  return result;
};


var schema = Schema$1;

var str = new type('tag:yaml.org,2002:str', {
  kind: 'scalar',
  construct: function (data) { return data !== null ? data : ''; }
});

var seq = new type('tag:yaml.org,2002:seq', {
  kind: 'sequence',
  construct: function (data) { return data !== null ? data : []; }
});

var map = new type('tag:yaml.org,2002:map', {
  kind: 'mapping',
  construct: function (data) { return data !== null ? data : {}; }
});

var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});

function resolveYamlNull(data) {
  if (data === null) return true;

  var max = data.length;

  return (max === 1 && data === '~') ||
         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
}

function constructYamlNull() {
  return null;
}

function isNull(object) {
  return object === null;
}

var _null = new type('tag:yaml.org,2002:null', {
  kind: 'scalar',
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function () { return '~';    },
    lowercase: function () { return 'null'; },
    uppercase: function () { return 'NULL'; },
    camelcase: function () { return 'Null'; },
    empty:     function () { return '';     }
  },
  defaultStyle: 'lowercase'
});

function resolveYamlBoolean(data) {
  if (data === null) return false;

  var max = data.length;

  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
}

function constructYamlBoolean(data) {
  return data === 'true' ||
         data === 'True' ||
         data === 'TRUE';
}

function isBoolean(object) {
  return Object.prototype.toString.call(object) === '[object Boolean]';
}

var bool = new type('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function (object) { return object ? 'true' : 'false'; },
    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
    camelcase: function (object) { return object ? 'True' : 'False'; }
  },
  defaultStyle: 'lowercase'
});

function isHexCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
}

function isOctCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
}

function isDecCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
}

function resolveYamlInteger(data) {
  if (data === null) return false;

  var max = data.length,
      index = 0,
      hasDigits = false,
      ch;

  if (!max) return false;

  ch = data[index];

  // sign
  if (ch === '-' || ch === '+') {
    ch = data[++index];
  }

  if (ch === '0') {
    // 0
    if (index + 1 === max) return true;
    ch = data[++index];

    // base 2, base 8, base 16

    if (ch === 'b') {
      // base 2
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (ch !== '0' && ch !== '1') return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'x') {
      // base 16
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'o') {
      // base 8
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isOctCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }
  }

  // base 10 (except 0)

  // value should not start with `_`;
  if (ch === '_') return false;

  for (; index < max; index++) {
    ch = data[index];
    if (ch === '_') continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }

  // Should have digits and should not end with `_`
  if (!hasDigits || ch === '_') return false;

  return true;
}

function constructYamlInteger(data) {
  var value = data, sign = 1, ch;

  if (value.indexOf('_') !== -1) {
    value = value.replace(/_/g, '');
  }

  ch = value[0];

  if (ch === '-' || ch === '+') {
    if (ch === '-') sign = -1;
    value = value.slice(1);
    ch = value[0];
  }

  if (value === '0') return 0;

  if (ch === '0') {
    if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
    if (value[1] === 'x') return sign * parseInt(value.slice(2), 16);
    if (value[1] === 'o') return sign * parseInt(value.slice(2), 8);
  }

  return sign * parseInt(value, 10);
}

function isInteger(object) {
  return (Object.prototype.toString.call(object)) === '[object Number]' &&
         (object % 1 === 0 && !common.isNegativeZero(object));
}

var int = new type('tag:yaml.org,2002:int', {
  kind: 'scalar',
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
    octal:       function (obj) { return obj >= 0 ? '0o'  + obj.toString(8) : '-0o'  + obj.toString(8).slice(1); },
    decimal:     function (obj) { return obj.toString(10); },
    /* eslint-disable max-len */
    hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
  },
  defaultStyle: 'decimal',
  styleAliases: {
    binary:      [ 2,  'bin' ],
    octal:       [ 8,  'oct' ],
    decimal:     [ 10, 'dec' ],
    hexadecimal: [ 16, 'hex' ]
  }
});

var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  '^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
  // .2e4, .2
  // special case, seems not from spec
  '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
  // .inf
  '|[-+]?\\.(?:inf|Inf|INF)' +
  // .nan
  '|\\.(?:nan|NaN|NAN))$');

function resolveYamlFloat(data) {
  if (data === null) return false;

  if (!YAML_FLOAT_PATTERN.test(data) ||
      // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === '_') {
    return false;
  }

  return true;
}

function constructYamlFloat(data) {
  var value, sign;

  value  = data.replace(/_/g, '').toLowerCase();
  sign   = value[0] === '-' ? -1 : 1;

  if ('+-'.indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }

  if (value === '.inf') {
    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

  } else if (value === '.nan') {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}


var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

function representYamlFloat(object, style) {
  var res;

  if (isNaN(object)) {
    switch (style) {
      case 'lowercase': return '.nan';
      case 'uppercase': return '.NAN';
      case 'camelcase': return '.NaN';
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '.inf';
      case 'uppercase': return '.INF';
      case 'camelcase': return '.Inf';
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '-.inf';
      case 'uppercase': return '-.INF';
      case 'camelcase': return '-.Inf';
    }
  } else if (common.isNegativeZero(object)) {
    return '-0.0';
  }

  res = object.toString(10);

  // JS stringifier can build scientific format without dots: 5e-100,
  // while YAML requres dot: 5.e-100. Fix it with simple hack

  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
}

function isFloat(object) {
  return (Object.prototype.toString.call(object) === '[object Number]') &&
         (object % 1 !== 0 || common.isNegativeZero(object));
}

var float = new type('tag:yaml.org,2002:float', {
  kind: 'scalar',
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: 'lowercase'
});

var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});

var core = json;

var YAML_DATE_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9])'                    + // [2] month
  '-([0-9][0-9])$');                   // [3] day

var YAML_TIMESTAMP_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9]?)'                   + // [2] month
  '-([0-9][0-9]?)'                   + // [3] day
  '(?:[Tt]|[ \\t]+)'                 + // ...
  '([0-9][0-9]?)'                    + // [4] hour
  ':([0-9][0-9])'                    + // [5] minute
  ':([0-9][0-9])'                    + // [6] second
  '(?:\\.([0-9]*))?'                 + // [7] fraction
  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}

function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0,
      delta = null, tz_hour, tz_minute, date;

  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

  if (match === null) throw new Error('Date resolve error');

  // match: [1] year [2] month [3] day

  year = +(match[1]);
  month = +(match[2]) - 1; // JS month starts with 0
  day = +(match[3]);

  if (!match[4]) { // no hour
    return new Date(Date.UTC(year, month, day));
  }

  // match: [4] hour [5] minute [6] second [7] fraction

  hour = +(match[4]);
  minute = +(match[5]);
  second = +(match[6]);

  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) { // milli-seconds
      fraction += '0';
    }
    fraction = +fraction;
  }

  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

  if (match[9]) {
    tz_hour = +(match[10]);
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
    if (match[9] === '-') delta = -delta;
  }

  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

  if (delta) date.setTime(date.getTime() - delta);

  return date;
}

function representYamlTimestamp(object /*, style*/) {
  return object.toISOString();
}

var timestamp = new type('tag:yaml.org,2002:timestamp', {
  kind: 'scalar',
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});

function resolveYamlMerge(data) {
  return data === '<<' || data === null;
}

var merge = new type('tag:yaml.org,2002:merge', {
  kind: 'scalar',
  resolve: resolveYamlMerge
});

/*eslint-disable no-bitwise*/





// [ 64, 65, 66 ] -> [ padding, CR, LF ]
var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


function resolveYamlBinary(data) {
  if (data === null) return false;

  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

  // Convert one by one.
  for (idx = 0; idx < max; idx++) {
    code = map.indexOf(data.charAt(idx));

    // Skip CR/LF
    if (code > 64) continue;

    // Fail on illegal characters
    if (code < 0) return false;

    bitlen += 6;
  }

  // If there are any bits left, source was corrupted
  return (bitlen % 8) === 0;
}

function constructYamlBinary(data) {
  var idx, tailbits,
      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
      max = input.length,
      map = BASE64_MAP,
      bits = 0,
      result = [];

  // Collect by 6*4 bits (3 bytes)

  for (idx = 0; idx < max; idx++) {
    if ((idx % 4 === 0) && idx) {
      result.push((bits >> 16) & 0xFF);
      result.push((bits >> 8) & 0xFF);
      result.push(bits & 0xFF);
    }

    bits = (bits << 6) | map.indexOf(input.charAt(idx));
  }

  // Dump tail

  tailbits = (max % 4) * 6;

  if (tailbits === 0) {
    result.push((bits >> 16) & 0xFF);
    result.push((bits >> 8) & 0xFF);
    result.push(bits & 0xFF);
  } else if (tailbits === 18) {
    result.push((bits >> 10) & 0xFF);
    result.push((bits >> 2) & 0xFF);
  } else if (tailbits === 12) {
    result.push((bits >> 4) & 0xFF);
  }

  return new Uint8Array(result);
}

function representYamlBinary(object /*, style*/) {
  var result = '', bits = 0, idx, tail,
      max = object.length,
      map = BASE64_MAP;

  // Convert every three bytes to 4 ASCII characters.

  for (idx = 0; idx < max; idx++) {
    if ((idx % 3 === 0) && idx) {
      result += map[(bits >> 18) & 0x3F];
      result += map[(bits >> 12) & 0x3F];
      result += map[(bits >> 6) & 0x3F];
      result += map[bits & 0x3F];
    }

    bits = (bits << 8) + object[idx];
  }

  // Dump tail

  tail = max % 3;

  if (tail === 0) {
    result += map[(bits >> 18) & 0x3F];
    result += map[(bits >> 12) & 0x3F];
    result += map[(bits >> 6) & 0x3F];
    result += map[bits & 0x3F];
  } else if (tail === 2) {
    result += map[(bits >> 10) & 0x3F];
    result += map[(bits >> 4) & 0x3F];
    result += map[(bits << 2) & 0x3F];
    result += map[64];
  } else if (tail === 1) {
    result += map[(bits >> 2) & 0x3F];
    result += map[(bits << 4) & 0x3F];
    result += map[64];
    result += map[64];
  }

  return result;
}

function isBinary(obj) {
  return Object.prototype.toString.call(obj) ===  '[object Uint8Array]';
}

var binary = new type('tag:yaml.org,2002:binary', {
  kind: 'scalar',
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});

var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2       = Object.prototype.toString;

function resolveYamlOmap(data) {
  if (data === null) return true;

  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
      object = data;

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;

    if (_toString$2.call(pair) !== '[object Object]') return false;

    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }

    if (!pairHasKey) return false;

    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }

  return true;
}

function constructYamlOmap(data) {
  return data !== null ? data : [];
}

var omap = new type('tag:yaml.org,2002:omap', {
  kind: 'sequence',
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});

var _toString$1 = Object.prototype.toString;

function resolveYamlPairs(data) {
  if (data === null) return true;

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    if (_toString$1.call(pair) !== '[object Object]') return false;

    keys = Object.keys(pair);

    if (keys.length !== 1) return false;

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return true;
}

function constructYamlPairs(data) {
  if (data === null) return [];

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    keys = Object.keys(pair);

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return result;
}

var pairs = new type('tag:yaml.org,2002:pairs', {
  kind: 'sequence',
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});

var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;

function resolveYamlSet(data) {
  if (data === null) return true;

  var key, object = data;

  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }

  return true;
}

function constructYamlSet(data) {
  return data !== null ? data : {};
}

var set = new type('tag:yaml.org,2002:set', {
  kind: 'mapping',
  resolve: resolveYamlSet,
  construct: constructYamlSet
});

var _default = core.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});

/*eslint-disable max-len,no-use-before-define*/







var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;


var CONTEXT_FLOW_IN   = 1;
var CONTEXT_FLOW_OUT  = 2;
var CONTEXT_BLOCK_IN  = 3;
var CONTEXT_BLOCK_OUT = 4;


var CHOMPING_CLIP  = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP  = 3;


var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;


function _class(obj) { return Object.prototype.toString.call(obj); }

function is_EOL(c) {
  return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
}

function is_WHITE_SPACE(c) {
  return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
}

function is_WS_OR_EOL(c) {
  return (c === 0x09/* Tab */) ||
         (c === 0x20/* Space */) ||
         (c === 0x0A/* LF */) ||
         (c === 0x0D/* CR */);
}

function is_FLOW_INDICATOR(c) {
  return c === 0x2C/* , */ ||
         c === 0x5B/* [ */ ||
         c === 0x5D/* ] */ ||
         c === 0x7B/* { */ ||
         c === 0x7D/* } */;
}

function fromHexCode(c) {
  var lc;

  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  /*eslint-disable no-bitwise*/
  lc = c | 0x20;

  if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
    return lc - 0x61 + 10;
  }

  return -1;
}

function escapedHexLen(c) {
  if (c === 0x78/* x */) { return 2; }
  if (c === 0x75/* u */) { return 4; }
  if (c === 0x55/* U */) { return 8; }
  return 0;
}

function fromDecimalCode(c) {
  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  return -1;
}

function simpleEscapeSequence(c) {
  /* eslint-disable indent */
  return (c === 0x30/* 0 */) ? '\x00' :
        (c === 0x61/* a */) ? '\x07' :
        (c === 0x62/* b */) ? '\x08' :
        (c === 0x74/* t */) ? '\x09' :
        (c === 0x09/* Tab */) ? '\x09' :
        (c === 0x6E/* n */) ? '\x0A' :
        (c === 0x76/* v */) ? '\x0B' :
        (c === 0x66/* f */) ? '\x0C' :
        (c === 0x72/* r */) ? '\x0D' :
        (c === 0x65/* e */) ? '\x1B' :
        (c === 0x20/* Space */) ? ' ' :
        (c === 0x22/* " */) ? '\x22' :
        (c === 0x2F/* / */) ? '/' :
        (c === 0x5C/* \ */) ? '\x5C' :
        (c === 0x4E/* N */) ? '\x85' :
        (c === 0x5F/* _ */) ? '\xA0' :
        (c === 0x4C/* L */) ? '\u2028' :
        (c === 0x50/* P */) ? '\u2029' : '';
}

function charFromCodepoint(c) {
  if (c <= 0xFFFF) {
    return String.fromCharCode(c);
  }
  // Encode UTF-16 surrogate pair
  // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
  return String.fromCharCode(
    ((c - 0x010000) >> 10) + 0xD800,
    ((c - 0x010000) & 0x03FF) + 0xDC00
  );
}

var simpleEscapeCheck = new Array(256); // integer, for fast access
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}


function State$1(input, options) {
  this.input = input;

  this.filename  = options['filename']  || null;
  this.schema    = options['schema']    || _default;
  this.onWarning = options['onWarning'] || null;
  // (Hidden) Remove? makes the loader to expect YAML 1.1 documents
  // if such documents have no explicit %YAML directive
  this.legacy    = options['legacy']    || false;

  this.json      = options['json']      || false;
  this.listener  = options['listener']  || null;

  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap       = this.schema.compiledTypeMap;

  this.length     = input.length;
  this.position   = 0;
  this.line       = 0;
  this.lineStart  = 0;
  this.lineIndent = 0;

  // position of first leading tab in the current line,
  // used to make sure there are no tabs in the indentation
  this.firstTabInLine = -1;

  this.documents = [];

  /*
  this.version;
  this.checkLineBreaks;
  this.tagMap;
  this.anchorMap;
  this.tag;
  this.anchor;
  this.kind;
  this.result;*/

}


function generateError(state, message) {
  var mark = {
    name:     state.filename,
    buffer:   state.input.slice(0, -1), // omit trailing \0
    position: state.position,
    line:     state.line,
    column:   state.position - state.lineStart
  };

  mark.snippet = snippet(mark);

  return new exception(message, mark);
}

function throwError(state, message) {
  throw generateError(state, message);
}

function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}


var directiveHandlers = {

  YAML: function handleYamlDirective(state, name, args) {

    var match, major, minor;

    if (state.version !== null) {
      throwError(state, 'duplication of %YAML directive');
    }

    if (args.length !== 1) {
      throwError(state, 'YAML directive accepts exactly one argument');
    }

    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);

    if (match === null) {
      throwError(state, 'ill-formed argument of the YAML directive');
    }

    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);

    if (major !== 1) {
      throwError(state, 'unacceptable YAML version of the document');
    }

    state.version = args[0];
    state.checkLineBreaks = (minor < 2);

    if (minor !== 1 && minor !== 2) {
      throwWarning(state, 'unsupported YAML version of the document');
    }
  },

  TAG: function handleTagDirective(state, name, args) {

    var handle, prefix;

    if (args.length !== 2) {
      throwError(state, 'TAG directive accepts exactly two arguments');
    }

    handle = args[0];
    prefix = args[1];

    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
    }

    if (_hasOwnProperty$1.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }

    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
    }

    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError(state, 'tag prefix is malformed: ' + prefix);
    }

    state.tagMap[handle] = prefix;
  }
};


function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;

  if (start < end) {
    _result = state.input.slice(start, end);

    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 0x09 ||
              (0x20 <= _character && _character <= 0x10FFFF))) {
          throwError(state, 'expected valid JSON character');
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, 'the stream contains non-printable characters');
    }

    state.result += _result;
  }
}

function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;

  if (!common.isObject(source)) {
    throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
  }

  sourceKeys = Object.keys(source);

  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];

    if (!_hasOwnProperty$1.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}

function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode,
  startLine, startLineStart, startPos) {

  var index, quantity;

  // The output is a plain object here, so keys can only be strings.
  // We need to convert keyNode to a string, but doing so can hang the process
  // (deeply nested arrays that explode exponentially using aliases).
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);

    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, 'nested arrays are not supported inside keys');
      }

      if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
        keyNode[index] = '[object Object]';
      }
    }
  }

  // Avoid code execution in load() via toString property
  // (still use its own toString for arrays, timestamps,
  // and whatever user schema extensions happen to have @@toStringTag)
  if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
    keyNode = '[object Object]';
  }


  keyNode = String(keyNode);

  if (_result === null) {
    _result = {};
  }

  if (keyTag === 'tag:yaml.org,2002:merge') {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json &&
        !_hasOwnProperty$1.call(overridableKeys, keyNode) &&
        _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError(state, 'duplicated mapping key');
    }

    // used for this specific key only because Object.defineProperty is slow
    if (keyNode === '__proto__') {
      Object.defineProperty(_result, keyNode, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: valueNode
      });
    } else {
      _result[keyNode] = valueNode;
    }
    delete overridableKeys[keyNode];
  }

  return _result;
}

function readLineBreak(state) {
  var ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x0A/* LF */) {
    state.position++;
  } else if (ch === 0x0D/* CR */) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
      state.position++;
    }
  } else {
    throwError(state, 'a line break is expected');
  }

  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}

function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0,
      ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 0x09/* Tab */ && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }

    if (allowComments && ch === 0x23/* # */) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
    }

    if (is_EOL(ch)) {
      readLineBreak(state);

      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;

      while (ch === 0x20/* Space */) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }

  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, 'deficient indentation');
  }

  return lineBreaks;
}

function testDocumentSeparator(state) {
  var _position = state.position,
      ch;

  ch = state.input.charCodeAt(_position);

  // Condition state.position === state.lineStart is tested
  // in parent on each call, for efficiency. No needs to test here again.
  if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
      ch === state.input.charCodeAt(_position + 1) &&
      ch === state.input.charCodeAt(_position + 2)) {

    _position += 3;

    ch = state.input.charCodeAt(_position);

    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }

  return false;
}

function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += ' ';
  } else if (count > 1) {
    state.result += common.repeat('\n', count - 1);
  }
}


function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding,
      following,
      captureStart,
      captureEnd,
      hasPendingContent,
      _line,
      _lineStart,
      _lineIndent,
      _kind = state.kind,
      _result = state.result,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (is_WS_OR_EOL(ch)      ||
      is_FLOW_INDICATOR(ch) ||
      ch === 0x23/* # */    ||
      ch === 0x26/* & */    ||
      ch === 0x2A/* * */    ||
      ch === 0x21/* ! */    ||
      ch === 0x7C/* | */    ||
      ch === 0x3E/* > */    ||
      ch === 0x27/* ' */    ||
      ch === 0x22/* " */    ||
      ch === 0x25/* % */    ||
      ch === 0x40/* @ */    ||
      ch === 0x60/* ` */) {
    return false;
  }

  if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
    following = state.input.charCodeAt(state.position + 1);

    if (is_WS_OR_EOL(following) ||
        withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }

  state.kind = 'scalar';
  state.result = '';
  captureStart = captureEnd = state.position;
  hasPendingContent = false;

  while (ch !== 0) {
    if (ch === 0x3A/* : */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following) ||
          withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }

    } else if (ch === 0x23/* # */) {
      preceding = state.input.charCodeAt(state.position - 1);

      if (is_WS_OR_EOL(preceding)) {
        break;
      }

    } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
               withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;

    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);

      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }

    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }

    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }

    ch = state.input.charCodeAt(++state.position);
  }

  captureSegment(state, captureStart, captureEnd, false);

  if (state.result) {
    return true;
  }

  state.kind = _kind;
  state.result = _result;
  return false;
}

function readSingleQuotedScalar(state, nodeIndent) {
  var ch,
      captureStart, captureEnd;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x27/* ' */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x27/* ' */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (ch === 0x27/* ' */) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a single quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a single quoted scalar');
}

function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart,
      captureEnd,
      hexLength,
      hexResult,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x22/* " */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x22/* " */) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;

    } else if (ch === 0x5C/* \ */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);

        // TODO: rework to inline fn with no type cast?
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;

      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;

        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);

          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;

          } else {
            throwError(state, 'expected hexadecimal character');
          }
        }

        state.result += charFromCodepoint(hexResult);

        state.position++;

      } else {
        throwError(state, 'unknown escape sequence');
      }

      captureStart = captureEnd = state.position;

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a double quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a double quoted scalar');
}

function readFlowCollection(state, nodeIndent) {
  var readNext = true,
      _line,
      _lineStart,
      _pos,
      _tag     = state.tag,
      _result,
      _anchor  = state.anchor,
      following,
      terminator,
      isPair,
      isExplicitPair,
      isMapping,
      overridableKeys = Object.create(null),
      keyNode,
      keyTag,
      valueNode,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x5B/* [ */) {
    terminator = 0x5D;/* ] */
    isMapping = false;
    _result = [];
  } else if (ch === 0x7B/* { */) {
    terminator = 0x7D;/* } */
    isMapping = true;
    _result = {};
  } else {
    return false;
  }

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(++state.position);

  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? 'mapping' : 'sequence';
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, 'missed comma between flow collection entries');
    } else if (ch === 0x2C/* , */) {
      // "flow collection entries can never be completely empty", as per YAML 1.2, section 7.4
      throwError(state, "expected the node content, but found ','");
    }

    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;

    if (ch === 0x3F/* ? */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }

    _line = state.line; // Save the current line.
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }

    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }

    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === 0x2C/* , */) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }

  throwError(state, 'unexpected end of the stream within a flow collection');
}

function readBlockScalar(state, nodeIndent) {
  var captureStart,
      folding,
      chomping       = CHOMPING_CLIP,
      didReadContent = false,
      detectedIndent = false,
      textIndent     = nodeIndent,
      emptyLines     = 0,
      atMoreIndented = false,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x7C/* | */) {
    folding = false;
  } else if (ch === 0x3E/* > */) {
    folding = true;
  } else {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';

  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);

    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
      if (CHOMPING_CLIP === chomping) {
        chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, 'repeat of a chomping mode identifier');
      }

    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, 'repeat of an indentation width identifier');
      }

    } else {
      break;
    }
  }

  if (is_WHITE_SPACE(ch)) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (is_WHITE_SPACE(ch));

    if (ch === 0x23/* # */) {
      do { ch = state.input.charCodeAt(++state.position); }
      while (!is_EOL(ch) && (ch !== 0));
    }
  }

  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;

    ch = state.input.charCodeAt(state.position);

    while ((!detectedIndent || state.lineIndent < textIndent) &&
           (ch === 0x20/* Space */)) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }

    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }

    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }

    // End of the scalar.
    if (state.lineIndent < textIndent) {

      // Perform the chomping.
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) { // i.e. only if the scalar is not empty.
          state.result += '\n';
        }
      }

      // Break this `while` cycle and go to the funciton's epilogue.
      break;
    }

    // Folded style: use fancy rules to handle line breaks.
    if (folding) {

      // Lines starting with white space characters (more-indented lines) are not folded.
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        // except for the first content line (cf. Example 8.1)
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

      // End of more-indented block.
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat('\n', emptyLines + 1);

      // Just one line break - perceive as the same line.
      } else if (emptyLines === 0) {
        if (didReadContent) { // i.e. only if we have already read some scalar content.
          state.result += ' ';
        }

      // Several line breaks - perceive as different lines.
      } else {
        state.result += common.repeat('\n', emptyLines);
      }

    // Literal style: just add exact number of line breaks between content lines.
    } else {
      // Keep all line breaks except the header line break.
      state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
    }

    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;

    while (!is_EOL(ch) && (ch !== 0)) {
      ch = state.input.charCodeAt(++state.position);
    }

    captureSegment(state, captureStart, state.position, false);
  }

  return true;
}

function readBlockSequence(state, nodeIndent) {
  var _line,
      _tag      = state.tag,
      _anchor   = state.anchor,
      _result   = [],
      following,
      detected  = false,
      ch;

  // there is a leading tab before this token, so it can't be a block sequence/mapping;
  // it can still be flow sequence/mapping or a scalar
  if (state.firstTabInLine !== -1) return false;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, 'tab characters must not be used in indentation');
    }

    if (ch !== 0x2D/* - */) {
      break;
    }

    following = state.input.charCodeAt(state.position + 1);

    if (!is_WS_OR_EOL(following)) {
      break;
    }

    detected = true;
    state.position++;

    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }

    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
      throwError(state, 'bad indentation of a sequence entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'sequence';
    state.result = _result;
    return true;
  }
  return false;
}

function readBlockMapping(state, nodeIndent, flowIndent) {
  var following,
      allowCompact,
      _line,
      _keyLine,
      _keyLineStart,
      _keyPos,
      _tag          = state.tag,
      _anchor       = state.anchor,
      _result       = {},
      overridableKeys = Object.create(null),
      keyTag        = null,
      keyNode       = null,
      valueNode     = null,
      atExplicitKey = false,
      detected      = false,
      ch;

  // there is a leading tab before this token, so it can't be a block sequence/mapping;
  // it can still be flow sequence/mapping or a scalar
  if (state.firstTabInLine !== -1) return false;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, 'tab characters must not be used in indentation');
    }

    following = state.input.charCodeAt(state.position + 1);
    _line = state.line; // Save the current line.

    //
    // Explicit notation case. There are two separate blocks:
    // first for the key (denoted by "?") and second for the value (denoted by ":")
    //
    if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {

      if (ch === 0x3F/* ? */) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }

        detected = true;
        atExplicitKey = true;
        allowCompact = true;

      } else if (atExplicitKey) {
        // i.e. 0x3A/* : */ === character after the explicit key.
        atExplicitKey = false;
        allowCompact = true;

      } else {
        throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
      }

      state.position += 1;
      ch = following;

    //
    // Implicit notation case. Flow-style node as the key first, then ":", and the value.
    //
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;

      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        // Neither implicit nor explicit notation.
        // Reading is done. Go to the epilogue.
        break;
      }

      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);

        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }

        if (ch === 0x3A/* : */) {
          ch = state.input.charCodeAt(++state.position);

          if (!is_WS_OR_EOL(ch)) {
            throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
          }

          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }

          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;

        } else if (detected) {
          throwError(state, 'can not read an implicit mapping pair; a colon is missed');

        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true; // Keep the result of `composeNode`.
        }

      } else if (detected) {
        throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');

      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true; // Keep the result of `composeNode`.
      }
    }

    //
    // Common reading code for both explicit and implicit notations.
    //
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }

      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }

      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }

      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }

    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
      throwError(state, 'bad indentation of a mapping entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  //
  // Epilogue.
  //

  // Special case: last mapping's node contains only the key in explicit notation.
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }

  // Expose the resulting mapping.
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'mapping';
    state.result = _result;
  }

  return detected;
}

function readTagProperty(state) {
  var _position,
      isVerbatim = false,
      isNamed    = false,
      tagHandle,
      tagName,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x21/* ! */) return false;

  if (state.tag !== null) {
    throwError(state, 'duplication of a tag property');
  }

  ch = state.input.charCodeAt(++state.position);

  if (ch === 0x3C/* < */) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);

  } else if (ch === 0x21/* ! */) {
    isNamed = true;
    tagHandle = '!!';
    ch = state.input.charCodeAt(++state.position);

  } else {
    tagHandle = '!';
  }

  _position = state.position;

  if (isVerbatim) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (ch !== 0 && ch !== 0x3E/* > */);

    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, 'unexpected end of the stream within a verbatim tag');
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {

      if (ch === 0x21/* ! */) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);

          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, 'named tag handle cannot contain such characters');
          }

          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, 'tag suffix cannot contain exclamation marks');
        }
      }

      ch = state.input.charCodeAt(++state.position);
    }

    tagName = state.input.slice(_position, state.position);

    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, 'tag suffix cannot contain flow indicator characters');
    }
  }

  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, 'tag name cannot contain such characters: ' + tagName);
  }

  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state, 'tag name is malformed: ' + tagName);
  }

  if (isVerbatim) {
    state.tag = tagName;

  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;

  } else if (tagHandle === '!') {
    state.tag = '!' + tagName;

  } else if (tagHandle === '!!') {
    state.tag = 'tag:yaml.org,2002:' + tagName;

  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }

  return true;
}

function readAnchorProperty(state) {
  var _position,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x26/* & */) return false;

  if (state.anchor !== null) {
    throwError(state, 'duplication of an anchor property');
  }

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an anchor node must contain at least one character');
  }

  state.anchor = state.input.slice(_position, state.position);
  return true;
}

function readAlias(state) {
  var _position, alias,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x2A/* * */) return false;

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an alias node must contain at least one character');
  }

  alias = state.input.slice(_position, state.position);

  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }

  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}

function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles,
      allowBlockScalars,
      allowBlockCollections,
      indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
      atNewLine  = false,
      hasContent = false,
      typeIndex,
      typeQuantity,
      typeList,
      type,
      flowIndent,
      blockIndent;

  if (state.listener !== null) {
    state.listener('open', state);
  }

  state.tag    = null;
  state.anchor = null;
  state.kind   = null;
  state.result = null;

  allowBlockStyles = allowBlockScalars = allowBlockCollections =
    CONTEXT_BLOCK_OUT === nodeContext ||
    CONTEXT_BLOCK_IN  === nodeContext;

  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;

      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }

  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;

        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }

  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }

  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }

    blockIndent = state.position - state.lineStart;

    if (indentStatus === 1) {
      if (allowBlockCollections &&
          (readBlockSequence(state, blockIndent) ||
           readBlockMapping(state, blockIndent, flowIndent)) ||
          readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
            readSingleQuotedScalar(state, flowIndent) ||
            readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;

        } else if (readAlias(state)) {
          hasContent = true;

          if (state.tag !== null || state.anchor !== null) {
            throwError(state, 'alias node should not have any properties');
          }

        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;

          if (state.tag === null) {
            state.tag = '?';
          }
        }

        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      // Special case: block sequences are allowed to have same indentation level as the parent.
      // http://www.yaml.org/spec/1.2/spec.html#id2799784
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }

  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }

  } else if (state.tag === '?') {
    // Implicit resolving is not allowed for non-scalar types, and '?'
    // non-specific tag is only automatically assigned to plain scalars.
    //
    // We only need to check kind conformity in case user explicitly assigns '?'
    // tag, for example like this: "!<?> [0]"
    //
    if (state.result !== null && state.kind !== 'scalar') {
      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }

    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type = state.implicitTypes[typeIndex];

      if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
        state.result = type.construct(state.result);
        state.tag = type.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== '!') {
    if (_hasOwnProperty$1.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
      type = state.typeMap[state.kind || 'fallback'][state.tag];
    } else {
      // looking for multi type
      type = null;
      typeList = state.typeMap.multi[state.kind || 'fallback'];

      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type = typeList[typeIndex];
          break;
        }
      }
    }

    if (!type) {
      throwError(state, 'unknown tag !<' + state.tag + '>');
    }

    if (state.result !== null && type.kind !== state.kind) {
      throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
    }

    if (!type.resolve(state.result, state.tag)) { // `state.result` updated in resolver if matched
      throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
    } else {
      state.result = type.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }

  if (state.listener !== null) {
    state.listener('close', state);
  }
  return state.tag !== null ||  state.anchor !== null || hasContent;
}

function readDocument(state) {
  var documentStart = state.position,
      _position,
      directiveName,
      directiveArgs,
      hasDirectives = false,
      ch;

  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = Object.create(null);
  state.anchorMap = Object.create(null);

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if (state.lineIndent > 0 || ch !== 0x25/* % */) {
      break;
    }

    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;

    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];

    if (directiveName.length < 1) {
      throwError(state, 'directive name must not be less than one character in length');
    }

    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      if (ch === 0x23/* # */) {
        do { ch = state.input.charCodeAt(++state.position); }
        while (ch !== 0 && !is_EOL(ch));
        break;
      }

      if (is_EOL(ch)) break;

      _position = state.position;

      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      directiveArgs.push(state.input.slice(_position, state.position));
    }

    if (ch !== 0) readLineBreak(state);

    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }

  skipSeparationSpace(state, true, -1);

  if (state.lineIndent === 0 &&
      state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);

  } else if (hasDirectives) {
    throwError(state, 'directives end mark is expected');
  }

  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);

  if (state.checkLineBreaks &&
      PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, 'non-ASCII line breaks are interpreted as content');
  }

  state.documents.push(state.result);

  if (state.position === state.lineStart && testDocumentSeparator(state)) {

    if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }

  if (state.position < (state.length - 1)) {
    throwError(state, 'end of the stream or a document separator is expected');
  } else {
    return;
  }
}


function loadDocuments(input, options) {
  input = String(input);
  options = options || {};

  if (input.length !== 0) {

    // Add tailing `\n` if not exists
    if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
        input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
      input += '\n';
    }

    // Strip BOM
    if (input.charCodeAt(0) === 0xFEFF) {
      input = input.slice(1);
    }
  }

  var state = new State$1(input, options);

  var nullpos = input.indexOf('\0');

  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, 'null byte is not allowed in input');
  }

  // Use 0 as string terminator. That significantly simplifies bounds check.
  state.input += '\0';

  while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
    state.lineIndent += 1;
    state.position += 1;
  }

  while (state.position < (state.length - 1)) {
    readDocument(state);
  }

  return state.documents;
}


function loadAll$1(input, iterator, options) {
  if (iterator !== null && typeof iterator === 'object' && typeof options === 'undefined') {
    options = iterator;
    iterator = null;
  }

  var documents = loadDocuments(input, options);

  if (typeof iterator !== 'function') {
    return documents;
  }

  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}


function load$1(input, options) {
  var documents = loadDocuments(input, options);

  if (documents.length === 0) {
    /*eslint-disable no-undefined*/
    return undefined;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new exception('expected a single document in the stream, but found more');
}


var loadAll_1 = loadAll$1;
var load_1    = load$1;

var loader = {
	loadAll: loadAll_1,
	load: load_1
};

/*eslint-disable no-use-before-define*/





var _toString       = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;

var CHAR_BOM                  = 0xFEFF;
var CHAR_TAB                  = 0x09; /* Tab */
var CHAR_LINE_FEED            = 0x0A; /* LF */
var CHAR_CARRIAGE_RETURN      = 0x0D; /* CR */
var CHAR_SPACE                = 0x20; /* Space */
var CHAR_EXCLAMATION          = 0x21; /* ! */
var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
var CHAR_SHARP                = 0x23; /* # */
var CHAR_PERCENT              = 0x25; /* % */
var CHAR_AMPERSAND            = 0x26; /* & */
var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
var CHAR_ASTERISK             = 0x2A; /* * */
var CHAR_COMMA                = 0x2C; /* , */
var CHAR_MINUS                = 0x2D; /* - */
var CHAR_COLON                = 0x3A; /* : */
var CHAR_EQUALS               = 0x3D; /* = */
var CHAR_GREATER_THAN         = 0x3E; /* > */
var CHAR_QUESTION             = 0x3F; /* ? */
var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
var CHAR_VERTICAL_LINE        = 0x7C; /* | */
var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */

var ESCAPE_SEQUENCES = {};

ESCAPE_SEQUENCES[0x00]   = '\\0';
ESCAPE_SEQUENCES[0x07]   = '\\a';
ESCAPE_SEQUENCES[0x08]   = '\\b';
ESCAPE_SEQUENCES[0x09]   = '\\t';
ESCAPE_SEQUENCES[0x0A]   = '\\n';
ESCAPE_SEQUENCES[0x0B]   = '\\v';
ESCAPE_SEQUENCES[0x0C]   = '\\f';
ESCAPE_SEQUENCES[0x0D]   = '\\r';
ESCAPE_SEQUENCES[0x1B]   = '\\e';
ESCAPE_SEQUENCES[0x22]   = '\\"';
ESCAPE_SEQUENCES[0x5C]   = '\\\\';
ESCAPE_SEQUENCES[0x85]   = '\\N';
ESCAPE_SEQUENCES[0xA0]   = '\\_';
ESCAPE_SEQUENCES[0x2028] = '\\L';
ESCAPE_SEQUENCES[0x2029] = '\\P';

var DEPRECATED_BOOLEANS_SYNTAX = [
  'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
  'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
];

var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;

function compileStyleMap(schema, map) {
  var result, keys, index, length, tag, style, type;

  if (map === null) return {};

  result = {};
  keys = Object.keys(map);

  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map[tag]);

    if (tag.slice(0, 2) === '!!') {
      tag = 'tag:yaml.org,2002:' + tag.slice(2);
    }
    type = schema.compiledTypeMap['fallback'][tag];

    if (type && _hasOwnProperty.call(type.styleAliases, style)) {
      style = type.styleAliases[style];
    }

    result[tag] = style;
  }

  return result;
}

function encodeHex(character) {
  var string, handle, length;

  string = character.toString(16).toUpperCase();

  if (character <= 0xFF) {
    handle = 'x';
    length = 2;
  } else if (character <= 0xFFFF) {
    handle = 'u';
    length = 4;
  } else if (character <= 0xFFFFFFFF) {
    handle = 'U';
    length = 8;
  } else {
    throw new exception('code point within a string may not be greater than 0xFFFFFFFF');
  }

  return '\\' + handle + common.repeat('0', length - string.length) + string;
}


var QUOTING_TYPE_SINGLE = 1,
    QUOTING_TYPE_DOUBLE = 2;

function State(options) {
  this.schema        = options['schema'] || _default;
  this.indent        = Math.max(1, (options['indent'] || 2));
  this.noArrayIndent = options['noArrayIndent'] || false;
  this.skipInvalid   = options['skipInvalid'] || false;
  this.flowLevel     = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
  this.styleMap      = compileStyleMap(this.schema, options['styles'] || null);
  this.sortKeys      = options['sortKeys'] || false;
  this.lineWidth     = options['lineWidth'] || 80;
  this.noRefs        = options['noRefs'] || false;
  this.noCompatMode  = options['noCompatMode'] || false;
  this.condenseFlow  = options['condenseFlow'] || false;
  this.quotingType   = options['quotingType'] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes   = options['forceQuotes'] || false;
  this.replacer      = typeof options['replacer'] === 'function' ? options['replacer'] : null;

  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;

  this.tag = null;
  this.result = '';

  this.duplicates = [];
  this.usedDuplicates = null;
}

// Indents every line in a string. Empty lines (\n only) are not indented.
function indentString(string, spaces) {
  var ind = common.repeat(' ', spaces),
      position = 0,
      next = -1,
      result = '',
      line,
      length = string.length;

  while (position < length) {
    next = string.indexOf('\n', position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }

    if (line.length && line !== '\n') result += ind;

    result += line;
  }

  return result;
}

function generateNextLine(state, level) {
  return '\n' + common.repeat(' ', state.indent * level);
}

function testImplicitResolving(state, str) {
  var index, length, type;

  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type = state.implicitTypes[index];

    if (type.resolve(str)) {
      return true;
    }
  }

  return false;
}

// [33] s-white ::= s-space | s-tab
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}

// Returns true if the character can be printed without escaping.
// From YAML 1.2: "any allowed characters known to be non-printable
// should also be escaped. [However,] This isn’t mandatory"
// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
function isPrintable(c) {
  return  (0x00020 <= c && c <= 0x00007E)
      || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
      || ((0x0E000 <= c && c <= 0x00FFFD) && c !== CHAR_BOM)
      ||  (0x10000 <= c && c <= 0x10FFFF);
}

// [34] ns-char ::= nb-char - s-white
// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
// [26] b-char  ::= b-line-feed | b-carriage-return
// Including s-white (for some reason, examples doesn't match specs in this aspect)
// ns-char ::= c-printable - b-line-feed - b-carriage-return - c-byte-order-mark
function isNsCharOrWhitespace(c) {
  return isPrintable(c)
    && c !== CHAR_BOM
    // - b-char
    && c !== CHAR_CARRIAGE_RETURN
    && c !== CHAR_LINE_FEED;
}

// [127]  ns-plain-safe(c) ::= c = flow-out  ⇒ ns-plain-safe-out
//                             c = flow-in   ⇒ ns-plain-safe-in
//                             c = block-key ⇒ ns-plain-safe-out
//                             c = flow-key  ⇒ ns-plain-safe-in
// [128] ns-plain-safe-out ::= ns-char
// [129]  ns-plain-safe-in ::= ns-char - c-flow-indicator
// [130]  ns-plain-char(c) ::=  ( ns-plain-safe(c) - “:” - “#” )
//                            | ( /* An ns-char preceding */ “#” )
//                            | ( “:” /* Followed by an ns-plain-safe(c) */ )
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (
    // ns-plain-safe
    inblock ? // c = flow-in
      cIsNsCharOrWhitespace
      : cIsNsCharOrWhitespace
        // - c-flow-indicator
        && c !== CHAR_COMMA
        && c !== CHAR_LEFT_SQUARE_BRACKET
        && c !== CHAR_RIGHT_SQUARE_BRACKET
        && c !== CHAR_LEFT_CURLY_BRACKET
        && c !== CHAR_RIGHT_CURLY_BRACKET
  )
    // ns-plain-char
    && c !== CHAR_SHARP // false on '#'
    && !(prev === CHAR_COLON && !cIsNsChar) // false on ': '
    || (isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP) // change to true on '[^ ]#'
    || (prev === CHAR_COLON && cIsNsChar); // change to true on ':[^ ]'
}

// Simplified test for values allowed as the first character in plain style.
function isPlainSafeFirst(c) {
  // Uses a subset of ns-char - c-indicator
  // where ns-char = nb-char - s-white.
  // No support of ( ( “?” | “:” | “-” ) /* Followed by an ns-plain-safe(c)) */ ) part
  return isPrintable(c) && c !== CHAR_BOM
    && !isWhitespace(c) // - s-white
    // - (c-indicator ::=
    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
    && c !== CHAR_MINUS
    && c !== CHAR_QUESTION
    && c !== CHAR_COLON
    && c !== CHAR_COMMA
    && c !== CHAR_LEFT_SQUARE_BRACKET
    && c !== CHAR_RIGHT_SQUARE_BRACKET
    && c !== CHAR_LEFT_CURLY_BRACKET
    && c !== CHAR_RIGHT_CURLY_BRACKET
    // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
    && c !== CHAR_SHARP
    && c !== CHAR_AMPERSAND
    && c !== CHAR_ASTERISK
    && c !== CHAR_EXCLAMATION
    && c !== CHAR_VERTICAL_LINE
    && c !== CHAR_EQUALS
    && c !== CHAR_GREATER_THAN
    && c !== CHAR_SINGLE_QUOTE
    && c !== CHAR_DOUBLE_QUOTE
    // | “%” | “@” | “`”)
    && c !== CHAR_PERCENT
    && c !== CHAR_COMMERCIAL_AT
    && c !== CHAR_GRAVE_ACCENT;
}

// Simplified test for values allowed as the last character in plain style.
function isPlainSafeLast(c) {
  // just not whitespace or colon, it will be checked to be plain character later
  return !isWhitespace(c) && c !== CHAR_COLON;
}

// Same as 'string'.codePointAt(pos), but works in older browsers.
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 0xD800 && first <= 0xDBFF && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 0xDC00 && second <= 0xDFFF) {
      // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
    }
  }
  return first;
}

// Determines whether block indentation indicator is required.
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}

var STYLE_PLAIN   = 1,
    STYLE_SINGLE  = 2,
    STYLE_LITERAL = 3,
    STYLE_FOLDED  = 4,
    STYLE_DOUBLE  = 5;

// Determines which scalar styles are possible and returns the preferred style.
// lineWidth = -1 => no limit.
// Pre-conditions: str.length > 0.
// Post-conditions:
//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth,
  testAmbiguousType, quotingType, forceQuotes, inblock) {

  var i;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false; // only checked if shouldTrackWidth
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1; // count the first line correctly
  var plain = isPlainSafeFirst(codePointAt(string, 0))
          && isPlainSafeLast(codePointAt(string, string.length - 1));

  if (singleLineOnly || forceQuotes) {
    // Case: no block styles.
    // Check for disallowed characters to rule out plain and single.
    for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    // Case: block styles permitted.
    for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        // Check if any line can be folded.
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine ||
            // Foldable line = too long, and not more-indented.
            (i - previousLineBreak - 1 > lineWidth &&
             string[previousLineBreak + 1] !== ' ');
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    // in case the end is missing a \n
    hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
      (i - previousLineBreak - 1 > lineWidth &&
       string[previousLineBreak + 1] !== ' '));
  }
  // Although every style can represent \n without escaping, prefer block styles
  // for multiline, since they're more readable and they don't add empty lines.
  // Also prefer folding a super-long line.
  if (!hasLineBreak && !hasFoldableLine) {
    // Strings interpretable as another type have to be quoted;
    // e.g. the string 'true' vs. the boolean true.
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  // Edge case: block indentation indicator can only have one digit.
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  // At this point we know block styles are valid.
  // Prefer literal style unless we want to fold.
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}

// Note: line breaking/folding is implemented for only the folded style.
// NB. We drop the last trailing newline (if any) of a returned block scalar
//  since the dumper adds its own newline. This always works:
//    • No ending newline => unaffected; already using strip "-" chomping.
//    • Ending newline    => removed then restored.
//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
function writeScalar(state, string, level, iskey, inblock) {
  state.dump = (function () {
    if (string.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? ('"' + string + '"') : ("'" + string + "'");
      }
    }

    var indent = state.indent * Math.max(1, level); // no 0-indent scalars
    // As indentation gets deeper, let the width decrease monotonically
    // to the lower bound min(state.lineWidth, 40).
    // Note that this implies
    //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
    //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
    // This behaves better than a constant minimum width which disallows narrower options,
    // or an indent threshold which causes the width to suddenly increase.
    var lineWidth = state.lineWidth === -1
      ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

    // Without knowing if keys are implicit/explicit, assume implicit for safety.
    var singleLineOnly = iskey
      // No block styles in flow mode.
      || (state.flowLevel > -1 && level >= state.flowLevel);
    function testAmbiguity(string) {
      return testImplicitResolving(state, string);
    }

    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth,
      testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)) {

      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return '|' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return '>' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new exception('impossible error: invalid scalar style');
    }
  }());
}

// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';

  // note the special case: the string '\n' counts as a "trailing" empty line.
  var clip =          string[string.length - 1] === '\n';
  var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
  var chomp = keep ? '+' : (clip ? '' : '-');

  return indentIndicator + chomp + '\n';
}

// (See the note for writeScalar.)
function dropEndingNewline(string) {
  return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
}

// Note: a long line without a suitable break point will exceed the width limit.
// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
function foldString(string, width) {
  // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
  // unless they're before or after a more-indented line, or at the very
  // beginning or end, in which case $k$ maps to $k$.
  // Therefore, parse each chunk as newline(s) followed by a content line.
  var lineRe = /(\n+)([^\n]*)/g;

  // first line (possibly an empty line)
  var result = (function () {
    var nextLF = string.indexOf('\n');
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }());
  // If we haven't reached the first content line yet, don't add an extra \n.
  var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
  var moreIndented;

  // rest of the lines
  var match;
  while ((match = lineRe.exec(string))) {
    var prefix = match[1], line = match[2];
    moreIndented = (line[0] === ' ');
    result += prefix
      + (!prevMoreIndented && !moreIndented && line !== ''
        ? '\n' : '')
      + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }

  return result;
}

// Greedy line breaking.
// Picks the longest line under the limit each time,
// otherwise settles for the shortest line over the limit.
// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
function foldLine(line, width) {
  if (line === '' || line[0] === ' ') return line;

  // Since a more-indented line adds a \n, breaks can't be followed by a space.
  var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
  var match;
  // start is an inclusive index. end, curr, and next are exclusive.
  var start = 0, end, curr = 0, next = 0;
  var result = '';

  // Invariants: 0 <= start <= length-1.
  //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
  // Inside the loop:
  //   A match implies length >= 2, so curr and next are <= length-2.
  while ((match = breakRe.exec(line))) {
    next = match.index;
    // maintain invariant: curr - start <= width
    if (next - start > width) {
      end = (curr > start) ? curr : next; // derive end <= length-2
      result += '\n' + line.slice(start, end);
      // skip the space that was output as \n
      start = end + 1;                    // derive start <= length-1
    }
    curr = next;
  }

  // By the invariants, start <= length-1, so there is something left over.
  // It is either the whole string or a part starting from non-whitespace.
  result += '\n';
  // Insert a break if the remainder is too long and there is a break available.
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }

  return result.slice(1); // drop extra \n joiner
}

// Escapes a double-quoted string.
function escapeString(string) {
  var result = '';
  var char = 0;
  var escapeSeq;

  for (var i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
    char = codePointAt(string, i);
    escapeSeq = ESCAPE_SEQUENCES[char];

    if (!escapeSeq && isPrintable(char)) {
      result += string[i];
      if (char >= 0x10000) result += string[i + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }

  return result;
}

function writeFlowSequence(state, level, object) {
  var _result = '',
      _tag    = state.tag,
      index,
      length,
      value;

  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];

    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }

    // Write only valid elements, put null instead of invalid elements.
    if (writeNode(state, level, value, false, false) ||
        (typeof value === 'undefined' &&
         writeNode(state, level, null, false, false))) {

      if (_result !== '') _result += ',' + (!state.condenseFlow ? ' ' : '');
      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = '[' + _result + ']';
}

function writeBlockSequence(state, level, object, compact) {
  var _result = '',
      _tag    = state.tag,
      index,
      length,
      value;

  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];

    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }

    // Write only valid elements, put null instead of invalid elements.
    if (writeNode(state, level + 1, value, true, true, false, true) ||
        (typeof value === 'undefined' &&
         writeNode(state, level + 1, null, true, true, false, true))) {

      if (!compact || _result !== '') {
        _result += generateNextLine(state, level);
      }

      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += '-';
      } else {
        _result += '- ';
      }

      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = _result || '[]'; // Empty sequence if no valid values.
}

function writeFlowMapping(state, level, object) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      pairBuffer;

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {

    pairBuffer = '';
    if (_result !== '') pairBuffer += ', ';

    if (state.condenseFlow) pairBuffer += '"';

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }

    if (!writeNode(state, level, objectKey, false, false)) {
      continue; // Skip this pair because of invalid key;
    }

    if (state.dump.length > 1024) pairBuffer += '? ';

    pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');

    if (!writeNode(state, level, objectValue, false, false)) {
      continue; // Skip this pair because of invalid value.
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = '{' + _result + '}';
}

function writeBlockMapping(state, level, object, compact) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      explicitPair,
      pairBuffer;

  // Allow sorting keys so that the output file is deterministic
  if (state.sortKeys === true) {
    // Default sorting
    objectKeyList.sort();
  } else if (typeof state.sortKeys === 'function') {
    // Custom sort function
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    // Something is wrong
    throw new exception('sortKeys must be a boolean or a function');
  }

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = '';

    if (!compact || _result !== '') {
      pairBuffer += generateNextLine(state, level);
    }

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }

    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue; // Skip this pair because of invalid key.
    }

    explicitPair = (state.tag !== null && state.tag !== '?') ||
                   (state.dump && state.dump.length > 1024);

    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += '?';
      } else {
        pairBuffer += '? ';
      }
    }

    pairBuffer += state.dump;

    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }

    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue; // Skip this pair because of invalid value.
    }

    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ':';
    } else {
      pairBuffer += ': ';
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = _result || '{}'; // Empty mapping if no valid pairs.
}

function detectType(state, object, explicit) {
  var _result, typeList, index, length, type, style;

  typeList = explicit ? state.explicitTypes : state.implicitTypes;

  for (index = 0, length = typeList.length; index < length; index += 1) {
    type = typeList[index];

    if ((type.instanceOf  || type.predicate) &&
        (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
        (!type.predicate  || type.predicate(object))) {

      if (explicit) {
        if (type.multi && type.representName) {
          state.tag = type.representName(object);
        } else {
          state.tag = type.tag;
        }
      } else {
        state.tag = '?';
      }

      if (type.represent) {
        style = state.styleMap[type.tag] || type.defaultStyle;

        if (_toString.call(type.represent) === '[object Function]') {
          _result = type.represent(object, style);
        } else if (_hasOwnProperty.call(type.represent, style)) {
          _result = type.represent[style](object, style);
        } else {
          throw new exception('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
        }

        state.dump = _result;
      }

      return true;
    }
  }

  return false;
}

// Serializes `object` and writes it to global `result`.
// Returns true on success, or false on invalid object.
//
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;

  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }

  var type = _toString.call(state.dump);
  var inblock = block;
  var tagStr;

  if (block) {
    block = (state.flowLevel < 0 || state.flowLevel > level);
  }

  var objectOrArray = type === '[object Object]' || type === '[object Array]',
      duplicateIndex,
      duplicate;

  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }

  if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
    compact = false;
  }

  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = '*ref_' + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type === '[object Object]') {
      if (block && (Object.keys(state.dump).length !== 0)) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object Array]') {
      if (block && (state.dump.length !== 0)) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact);
        } else {
          writeBlockSequence(state, level, state.dump, compact);
        }
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object String]') {
      if (state.tag !== '?') {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type === '[object Undefined]') {
      return false;
    } else {
      if (state.skipInvalid) return false;
      throw new exception('unacceptable kind of an object to dump ' + type);
    }

    if (state.tag !== null && state.tag !== '?') {
      // Need to encode all characters except those allowed by the spec:
      //
      // [35] ns-dec-digit    ::=  [#x30-#x39] /* 0-9 */
      // [36] ns-hex-digit    ::=  ns-dec-digit
      //                         | [#x41-#x46] /* A-F */ | [#x61-#x66] /* a-f */
      // [37] ns-ascii-letter ::=  [#x41-#x5A] /* A-Z */ | [#x61-#x7A] /* a-z */
      // [38] ns-word-char    ::=  ns-dec-digit | ns-ascii-letter | “-”
      // [39] ns-uri-char     ::=  “%” ns-hex-digit ns-hex-digit | ns-word-char | “#”
      //                         | “;” | “/” | “?” | “:” | “@” | “&” | “=” | “+” | “$” | “,”
      //                         | “_” | “.” | “!” | “~” | “*” | “'” | “(” | “)” | “[” | “]”
      //
      // Also need to encode '!' because it has special meaning (end of tag prefix).
      //
      tagStr = encodeURI(
        state.tag[0] === '!' ? state.tag.slice(1) : state.tag
      ).replace(/!/g, '%21');

      if (state.tag[0] === '!') {
        tagStr = '!' + tagStr;
      } else if (tagStr.slice(0, 18) === 'tag:yaml.org,2002:') {
        tagStr = '!!' + tagStr.slice(18);
      } else {
        tagStr = '!<' + tagStr + '>';
      }

      state.dump = tagStr + ' ' + state.dump;
    }
  }

  return true;
}

function getDuplicateReferences(object, state) {
  var objects = [],
      duplicatesIndexes = [],
      index,
      length;

  inspectNode(object, objects, duplicatesIndexes);

  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}

function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList,
      index,
      length;

  if (object !== null && typeof object === 'object') {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);

      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);

        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}

function dump$1(input, options) {
  options = options || {};

  var state = new State(options);

  if (!state.noRefs) getDuplicateReferences(input, state);

  var value = input;

  if (state.replacer) {
    value = state.replacer.call({ '': value }, '', value);
  }

  if (writeNode(state, 0, value, true, true)) return state.dump + '\n';

  return '';
}

var dump_1 = dump$1;

var dumper = {
	dump: dump_1
};

function renamed(from, to) {
  return function () {
    throw new Error('Function yaml.' + from + ' is removed in js-yaml 4. ' +
      'Use yaml.' + to + ' instead, which is now safe by default.');
  };
}


var Type                = type;
var Schema              = schema;
var FAILSAFE_SCHEMA     = failsafe;
var JSON_SCHEMA         = json;
var CORE_SCHEMA         = core;
var DEFAULT_SCHEMA      = _default;
var load                = loader.load;
var loadAll             = loader.loadAll;
var dump                = dumper.dump;
var YAMLException       = exception;

// Re-export all types in case user wants to create custom schema
var types = {
  binary:    binary,
  float:     float,
  map:       map,
  null:      _null,
  pairs:     pairs,
  set:       set,
  timestamp: timestamp,
  bool:      bool,
  int:       int,
  merge:     merge,
  omap:      omap,
  seq:       seq,
  str:       str
};

// Removed functions from JS-YAML 3.0.x
var safeLoad            = renamed('safeLoad', 'load');
var safeLoadAll         = renamed('safeLoadAll', 'loadAll');
var safeDump            = renamed('safeDump', 'dump');

var jsYaml = {
	Type: Type,
	Schema: Schema,
	FAILSAFE_SCHEMA: FAILSAFE_SCHEMA,
	JSON_SCHEMA: JSON_SCHEMA,
	CORE_SCHEMA: CORE_SCHEMA,
	DEFAULT_SCHEMA: DEFAULT_SCHEMA,
	load: load,
	loadAll: loadAll,
	dump: dump,
	YAMLException: YAMLException,
	types: types,
	safeLoad: safeLoad,
	safeLoadAll: safeLoadAll,
	safeDump: safeDump
};

async function loadYamlAsJson(yamlFilePath) {
    try {
        const response = await fetch(yamlFilePath);
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            return {
                type: "custom:smartqasa-title-card",
                title: "Missing file.",
            };
        }
        const yamlContent = await response.text();
        const jsonContent = jsYaml.load(yamlContent);
        return jsonContent;
    }
    catch (e) {
        console.error("Error fetching and parsing YAML file:", e);
        return {
            type: "custom:smartqasa-title-card",
            title: "Missing file.",
        };
    }
}

async function entertainDialog(config, hass) {
    if (!config || !hass)
        return;
    window.smartqasa.deviceType;
    const videoPlayerObj = config.video_player ? hass.states[config.video_player] : undefined;
    const videoSoundObj = config.video_sound ? hass.states[config.video_sound] : undefined;
    const audioPlayerObj = config.audio_player ? hass.states[config.audio_player] : undefined;
    const appListCards = await loadYamlAsJson("/local/smartqasa/lists/entertain.yaml");
    const videoPlayerTitle = videoPlayerObj
        ? {
            type: "custom:smartqasa-title-card",
            title: videoPlayerObj.attributes.friendly_name || "TV",
        }
        : undefined;
    const videoPlayerCard = videoPlayerObj
        ? {
            type: "custom:roku-card",
            entity: videoPlayerObj.entity_id,
            tv: true,
            volume_mute: {
                tap_action: {
                    action: "call-service",
                    service: "script.system_toggle_volume_muted",
                    service_data: {
                        entity_id: videoSoundObj.entity_id || videoPlayerObj.entity_id,
                    },
                },
            },
            volume_down: {
                tap_action: {
                    action: "call-service",
                    service: "media_player.volume_down",
                    service_data: {
                        entity_id: videoSoundObj.entity_id || videoPlayerObj.entity_id,
                    },
                },
            },
            volume_up: {
                tap_action: {
                    action: "call-service",
                    service: "media_player.volume_up",
                    service_data: {
                        entity_id: videoSoundObj.entity_id || videoPlayerObj.entity_id,
                    },
                },
            },
        }
        : undefined;
    const audioPlayerTitle = audioPlayerObj
        ? {
            type: "custom:smartqasa-title-card",
            title: audioPlayerObj.attributes.friendly_name || "Audio",
        }
        : undefined;
    const audioPlayerCard = audioPlayerObj
        ? {
            type: "custom:sonos-card",
            entityId: audioPlayerObj.entity_id,
            heightPercentage: 86,
            mediaBrowserItemsPerRow: 3,
            mediaBrowserShowTitleForThumbnailIcons: true,
            showVolumeUpAndDownButtons: true,
            sections: ["player", "volumes", "groups", "grouping", "media browser"],
        }
        : undefined;
    const appListTitle = videoPlayerObj || audioPlayerObj
        ? {
            type: "custom:smartqasa-title-card",
            title: "Apps",
        }
        : undefined;
    const appListCard = videoPlayerObj || audioPlayerObj
        ? {
            type: "custom:layout-card",
            layout_type: "custom:grid-layout",
            layout: {
                height: "480px",
                margin: 0,
                "grid-gap": "var(--sq-dialog-grid-gap)",
            },
            cards: appListCards,
        }
        : undefined;
    let gridTemplateColumns = "auto";
    let cards = [];
    if (window.smartqasa.deviceType === "phone") {
        gridTemplateColumns = "95%";
        if (videoPlayerObj && audioPlayerObj) {
            cards = [videoPlayerTitle, videoPlayerCard, audioPlayerTitle, audioPlayerCard, appListTitle, appListCard];
        }
        else if (!videoPlayerObj && audioPlayerObj) {
            cards = [audioPlayerTitle, audioPlayerCard, appListTitle, appListCard];
        }
        else if (videoPlayerObj && !audioPlayerObj) {
            cards = [videoPlayerTitle, videoPlayerCard, appListTitle, appListCard];
        }
    }
    else {
        if (videoPlayerObj && audioPlayerObj) {
            gridTemplateColumns = "340px 420px 260px";
            cards = [videoPlayerTitle, audioPlayerTitle, appListTitle, videoPlayerCard, audioPlayerCard, appListCard];
        }
        else if (!videoPlayerObj && audioPlayerObj) {
            gridTemplateColumns = "420px 260px";
            cards = [audioPlayerTitle, audioPlayerCard, audioPlayerCard, appListCard];
        }
        else if (videoPlayerObj && !audioPlayerObj) {
            gridTemplateColumns = "340px 260px";
            cards = [videoPlayerTitle, videoPlayerCard, audioPlayerCard, appListCard];
        }
    }
    const dialogConfig = {
        title: "Entertainment",
        size: "fullscreen",
        timeout: 300000,
        content: {
            type: "custom:layout-card",
            layout_type: "custom:grid-layout",
            layout: {
                margin: 0,
                "place-content": "center",
                "grid-template-columns": gridTemplateColumns,
                "grid-template-rows": "max-content 480px",
                "grid-gap": "var(--sq-dialog-grid-gap)",
            },
            cards: cards,
        },
    };
    window.browser_mod?.service("popup", dialogConfig);
}

async function menuConfig(menu_tab) {
    function createAttributes(icon, label) {
        return {
            icon: window.smartqasa.deviceType === "phone" ? icon : null,
            label: window.smartqasa.deviceType === "tablet" ? label : null,
        };
    }
    const layout = {
        margin: 0,
        card_margin: 0,
        padding: "1rem 0 0 0",
        "grid-template-columns": window.smartqasa.deviceType === "phone"
            ? "repeat(2, 1fr)"
            : "repeat(3, var(--sq-tile-width-tablet, 20rem))",
        "grid-gap": "var(--sq-dialog-grid-gap)",
    };
    const favoMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/favorites.yaml");
    const funcMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/functions.yaml");
    const applMenuTiles = await loadYamlAsJson("/local/smartqasa/menus/applications.yaml");
    const utilMenuTiles = [
        {
            type: "custom:smartqasa-dialog-tile",
            dialog: "clean_screen",
            menu_tab: 3,
        },
        {
            type: "custom:smartqasa-dialog-tile",
            dialog: "display_themes",
            menu_tab: 3,
        },
        {
            type: "custom:smartqasa-routine-tile",
            entity: "script.system_tablet_reload",
        },
        {
            type: "custom:smartqasa-routine-tile",
            template: "clear-cache-tile",
        },
        {
            type: "custom:smartqasa-dialog-tile",
            dialog: "speed_test",
            menu_tab: 3,
        },
        {
            type: "custom:restriction-card",
            condition: {
                entity: "input_boolean.admin_mode",
                value: "off",
            },
            restrictions: {
                block: {
                    condition: {
                        entity: "input_boolean.admin_mode",
                        value: "off",
                    },
                },
            },
            card: {
                type: "custom:button-card",
                template: "system-reboot-tile",
            },
        },
        {
            type: "custom:restriction-card",
            condition: {
                entity: "input_boolean.admin_mode",
                value: "off",
            },
            restrictions: {
                block: {
                    condition: {
                        entity: "input_boolean.admin_mode",
                        value: "off",
                    },
                },
            },
            card: {
                type: "custom:button-card",
                template: "system-power-down-tile",
            },
        },
        {
            type: "custom:restriction-card",
            condition: {
                entity: "input_boolean.admin_mode",
                value: "off",
            },
            restrictions: {
                block: {
                    condition: {
                        entity: "input_boolean.admin_mode",
                        value: "off",
                    },
                },
            },
            card: {
                type: "custom:smartqasa-app-tile",
                app: "play_store",
                icon: "mdi:store",
            },
        },
        {
            type: "custom:button-card",
            template: "admin-mode-tile",
        },
        {
            type: "custom:button-card",
            template: "about-tile",
        },
    ];
    return {
        title: "Menu",
        timeout: 120000,
        content: {
            type: "custom:tabbed-card",
            options: {
                defaultTabIndex: menu_tab || 0,
            },
            styles: {
                "--mdc-tab-height": "45px",
                "--mdc-typography-button-font-size": "var(--sq-primary-font-size)",
                "--mdc-typography-button-font-weight": "var(--sq-primary-font-weight)",
                "--mdc-typography-button-text-transform": "none",
                "--mdc-theme-primary": "rgb(var(--sq-primary-font-rgb))",
                "--mdc-tab-color-default": "rgb(var(--sq-inactive-rgb))",
                "--mdc-tab-text-label-color-default": "rgb(var(--sq-inactive-rgb))",
            },
            tabs: [
                {
                    attributes: createAttributes("hass:star", "Favorites"),
                    card: {
                        type: "custom:layout-card",
                        layout_type: "custom:grid-layout",
                        layout: layout,
                        cards: favoMenuTiles,
                    },
                },
                {
                    attributes: createAttributes("hass:function", "Functions"),
                    card: {
                        type: "custom:layout-card",
                        layout_type: "custom:grid-layout",
                        layout: layout,
                        cards: funcMenuTiles,
                    },
                },
                {
                    attributes: createAttributes("hass:exit-to-apps", "Applications"),
                    card: {
                        type: "custom:layout-card",
                        layout_type: "custom:grid-layout",
                        layout: layout,
                        cards: applMenuTiles,
                    },
                },
                {
                    attributes: createAttributes("hass:cog-outline", "Utilities"),
                    card: {
                        type: "custom:layout-card",
                        layout_type: "custom:grid-layout",
                        layout: layout,
                        cards: utilMenuTiles,
                    },
                },
            ],
        },
    };
}

let PanelFooter = class PanelFooter extends s {
    static { this.styles = i$5 `
        :host {
            display: block;
            width: 100%;
            margin: 5px 0;
            padding: 0;
            border: none;
            border-radius: 0;
            box-shadow: none;
            background-color: transparent;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(4, min-content);
            grid-gap: 5vw;
            justify-content: center;
            align-items: center;
        }
        .button {
            display: flex;
            padding: 1rem;
            align-items: center;
            justify-content: center;
            column-gap: 0.5rem;
            font-size: var(--sq-primary-font-size, 1.5rem);
            font-weight: var(--sq-primary-font-weight, 400);
            color: rgb(var(--sq-secondary-font-rgb));
            cursor: pointer;
        }
        .icon {
            height: 1.8rem;
            width: 1.8rem;
        }
    `; }
    setConfig(config) {
        this._config = { ...config };
    }
    set hass(hass) {
        if (!hass)
            return;
        this._hass = hass;
    }
    render() {
        return x `
            <div class="grid">
                ${this.renderButton("hass:home", "Home", "handleHome")}
                ${this.renderButton("hass:view-dashboard", "Areas", "handleAreas")}
                ${this.renderButton("hass:music", "Entertainment", "handleEntertain")}
                ${this.renderButton("hass:menu", "Menu", "handleMenu")}
            </div>
        `;
    }
    renderButton(icon, name, methodName) {
        return x `
            <div class="button" @click="${(e) => this.handleAction(e, methodName)}">
                <ha-icon .icon=${icon}></ha-icon>
                ${window.smartqasa.deviceType !== "phone" ? x `<span>${name}</span>` : ""}
            </div>
        `;
    }
    handleAction(e, methodName) {
        e.stopPropagation();
        if (typeof this[methodName] === "function") {
            this[methodName]();
        }
        else {
            console.error(`Method not found: ${methodName}`);
        }
    }
    handleHome() {
        const basePath = window.smartqasa.homePath;
        const path = location.href.endsWith("/" + basePath) ? "home" : basePath;
        window.history.pushState(null, "", `/home-dash/${path}`);
        window.dispatchEvent(new CustomEvent("location-changed"));
    }
    handleAreas() {
        areasDialog(this._hass);
    }
    handleEntertain() {
        entertainDialog(this._config, this._hass);
    }
    async handleMenu() {
        try {
            const dialogConfig = await menuConfig(0);
            window.browser_mod?.service("popup", dialogConfig);
        }
        catch (error) {
            console.error("Error loading menu configuration", error);
        }
    }
};
__decorate([
    r()
], PanelFooter.prototype, "_config", void 0);
PanelFooter = __decorate([
    t$1("smartqasa-panel-footer")
], PanelFooter);
window.customCards.push({
    type: "smartqasa-panel-footer",
    name: "SmartQasa Panel Footer",
    preview: true,
    description: "A SmartQasa tile for displaying the panel footer strip.",
});

let MoreInfoDialog = class MoreInfoDialog extends s {
    setConfig(config) {
        this._config = { ...config };
        this._entity = this._config?.entity;
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
    }
    render() {
        return x `
            <div>
                <div class="card-content">
                    <more-info-content .hass=${this._hass} .stateObj=${this._stateObj}> </more-info-content>
                </div>
            </div>
        `;
    }
    getCardSize() {
        return 5;
    }
};
__decorate([
    r()
], MoreInfoDialog.prototype, "_config", void 0);
__decorate([
    r()
], MoreInfoDialog.prototype, "_stateObj", void 0);
MoreInfoDialog = __decorate([
    t$1("smartqasa-more-info-dialog")
], MoreInfoDialog);
window.customCards.push({
    type: "smartqasa-more-info-dialog",
    name: "SmartQasa More Info Dialog",
    preview: true,
    description: "A SmartQasa dialog for showing More Info for an entity.",
});

let SmartQasaTimeDate = class SmartQasaTimeDate extends s {
    constructor() {
        super(...arguments);
        this._time = "Loading...";
        this._date = "Loading...";
    }
    static get styles() {
        return i$5 `
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
                color: rgb(var(--sq-secondary-font-rgb));
            }
        `;
    }
    setConfig(config) { }
    set hass(hass) {
        this._time = hass?.states["sensor.current_time"]?.state || "Loading...";
        this._date = hass?.states["sensor.current_date"]?.state || "Loading...";
    }
    render() {
        return x `
            <div class="container" @click="${this.handleTap}">
                <div class="time">${this._time}</div>
                <div class="date">${this._date}</div>
            </div>
        `;
    }
    handleTap() {
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
};
__decorate([
    r()
], SmartQasaTimeDate.prototype, "_time", void 0);
__decorate([
    r()
], SmartQasaTimeDate.prototype, "_date", void 0);
SmartQasaTimeDate = __decorate([
    t$1("smartqasa-time-date")
], SmartQasaTimeDate);
window.customCards.push({
    type: "smartqasa-time-date",
    name: "SmartQasa Time Date",
    preview: true,
    description: "A SmartQasa card for rendering the time and date.",
});

let TitleCard = class TitleCard extends s {
    static get styles() {
        return i$5 `
            :host {
                display: block;
                padding: 0.7rem;
                border: var(--sq-card-border, none);
                border-radius: 1.5rem;
                background-color: var(--sq-card-background-color, rgba(192, 192, 192, 0.5));
                box-sizing: border-box;
            }
            .title {
                justify-self: center;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: var(--sq-primary-font-size, 1.5rem);
                font-weight: var(--sq-primary-font-weight, 400);
                color: rgb(var(--sq-primary-font-rgb));
            }
        `;
    }
    setConfig(config) {
        this._config = { ...config };
        this._config.title = this._config.title || "Title";
    }
    render() {
        return x ` <div class="title">${this._config?.title}</div> `;
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], TitleCard.prototype, "_config", void 0);
TitleCard = __decorate([
    t$1("smartqasa-title-card")
], TitleCard);
window.customCards.push({
    type: "smartqasa-title-card",
    name: "SmartQasa Title Card",
    preview: true,
    description: "A SmartQasa card for rendering text in a title.",
});

const tileBaseStyle = i$5 `
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
const tileStateStyle = i$5 `
    .container {
        grid-template-areas: "i n" "i s";
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
        font-size: var(--sq-secondary-font-size, 1rem);
        color: rgb(var(--sq-secondary-font-rgb, 0, 0, 0));
    }
`;
const tileIconBlinkStyle = i$5 `
    @keyframes blink {
        50% {
            opacity: 0.25;
        }
    }
`;
const tileIconSpinStyle = i$5 `
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

let AllOffTile = class AllOffTile extends s {
    constructor() {
        super(...arguments);
        this._waiting = false;
        this._icon = "hass:help-rhombus";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._area = this._config?.area;
        this.updateState();
    }
    set hass(hass) {
        if (!this._area || !hass)
            return;
        this._hass = hass;
        this._areaObj = this._hass?.areas[this._area];
        this.updateState();
    }
    updateState() {
        if (this._waiting === true)
            return;
        if (!this._areaObj) {
            this._icon = this._config?.icon ?? "hass:alert-rhombus";
            this._iconAnimation = "none";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name ?? "Unknown";
            return;
        }
        this._icon = this._config?.icon || "hass:power";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._areaObj.name || this._area || "Unknown";
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.runRoutine}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }
    runRoutine(e) {
        e.stopPropagation();
        if (!this._areaObj)
            return;
        this._waiting = true;
        this._icon = "hass:rotate-right";
        this._iconAnimation = "spin 1.0s linear infinite";
        this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
        this._hass.callService("light", "turn_off", {
            area_id: this._area,
            transition: 2,
        });
        this._hass.callService("fan", "turn_off", {
            area_id: this._area,
        });
        setTimeout(() => {
            this._waiting = false;
            this.updateState();
        }, 2000);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], AllOffTile.prototype, "_config", void 0);
__decorate([
    r()
], AllOffTile.prototype, "_areaObj", void 0);
__decorate([
    r()
], AllOffTile.prototype, "_waiting", void 0);
AllOffTile = __decorate([
    t$1("smartqasa-all-off-tile")
], AllOffTile);
window.customCards.push({
    type: "smartqasa-all-off-tile",
    name: "SmartQasa All Off Tile",
    preview: true,
    description: "A SmartQasa tile for turning off all light and fan entities in an area.",
});

var accuweatherIcon = "app_icons/c6398f61b62006d6.webp";

var alexaIcon = "app_icons/ac7d873543a99f2b.webp";

var amazonMusicIcon = "app_icons/bc9fbce2e6d159f1.webp";

var amazonShoppingIcon = "app_icons/78dfd5a2ee0e0c76.webp";

var amcrestSmartHomeIcon = "app_icons/a796754eaa177607.webp";

var appleMusicIcon = "app_icons/fcc95fef3d003919.webp";

var bmwIcon = "app_icons/623fbb0a26f0d279.webp";

var bondIcon = "app_icons/7956df979b9a8ade.webp";

var bringIcon = "app_icons/87b8dc0b3e6c6043.webp";

var calculatorIcon = "app_icons/d9ada803a6c25a27.webp";

var chatgptIcon = "app_icons/1593e8d54b2dc414.webp";

var clockTimerIcon = "app_icons/ce287d0d4033f900.webp";

var doordashIcon = "app_icons/8b89b6f5ec6c9a65.webp";

var eufyHomeIcon = "app_icons/cd5ae376a30ff8c2.webp";

var eufySecurityIcon = "app_icons/f04fb646ab6b01f4.webp";

var googleAssistantIcon = "app_icons/55a9c07ecbf045b5.webp";

var googleChromeIcon = "app_icons/e2355f8b7ea2187d.webp";

var googleMapsIcon = "app_icons/a7e2b4978ab707d5.webp";

var grubhubIcon = "app_icons/9df9536903a489da.webp";

var homeConnectIcon = "app_icons/b497656d840080ce.webp";

var hueIcon = "app_icons/80a26493036f69bd.webp";

var huluIcon = "app_icons/a9e70cc295d0b952.webp";

var irobotIcon = "app_icons/0ca373151c325a19.webp";

var keurigIcon = "app_icons/6919f9f6902faad1.webp";

var lionchiefIcon = "app_icons/de72bd1dc39aed3c.webp";

var lutronIcon = "app_icons/ef28e1bb6bdd6f4a.webp";

var lyftIcon = "app_icons/cb96a8739fcbc619.webp";

var myqIcon = "app_icons/fd002324ee1e87ca.webp";

var nestIcon = "app_icons/b71d57ceda34fc91.webp";

var netflixIcon = "app_icons/42aff84499087026.webp";

var pandoraIcon = "app_icons/b04f28bda90d27ca.webp";

var playStoreIcon = "app_icons/5573abb5c42c140d.webp";

var rachioIcon = "app_icons/bdb033e07cbf2ebc.webp";

var rainbirdIcon = "app_icons/2985d73af4d60b6f.webp";

var reolinkIcon = "app_icons/52c66cf6dd4c16b4.webp";

var ringIcon = "app_icons/05629b1fdf51e8ef.webp";

var rokuIcon = "app_icons/d3e41621bc247c26.webp";

var senseIcon = "app_icons/aa0bc15c183551a2.webp";

var shazamIcon = "app_icons/7fd799675986693c.webp";

var shiptShopperIcon = "app_icons/396351f26be46824.webp";

var sleepNumberIcon = "app_icons/1a1f41625f88e574.webp";

var solitaireIcon = "app_icons/331a9cf3880f3af0.webp";

var sonosIcon = "app_icons/62222c7dce17a7d8.webp";

var spotifyIcon = "app_icons/6a9035b3a3858196.webp";

var tuyaSmartIcon = "app_icons/29030c5e49b1e08e.webp";

var uberIcon = "app_icons/fec8a951e251ea9e.webp";

var uberEatsIcon = "app_icons/1d5583bd9b1fc7ea.webp";

var weatherChannelIcon = "app_icons/a19d116cd9972ad0.webp";

var weatherUndergroundIcon = "app_icons/be60d7ad16675704.webp";

var yummlyIcon = "app_icons/a7c3ec923f5fabd7.webp";

const appTable = {
    accuweather: {
        name: "AccuWeather",
        app_icon: accuweatherIcon,
        launcher: "package",
        package: "com.accuweather.android",
        uri_scheme: "",
    },
    alexa: {
        name: "Alexa",
        app_icon: alexaIcon,
        launcher: "package",
        package: "com.amazon.dee.app",
        uri_scheme: "alexa:",
    },
    amazon_music: {
        name: "Amazon Music",
        app_icon: amazonMusicIcon,
        launcher: "uri_scheme",
        package: "com.amazon.mp3",
        uri_scheme: "amznmp3:",
    },
    amazon_shopping: {
        name: "Amazon Shopping",
        app_icon: amazonShoppingIcon,
        launcher: "uri_scheme",
        package: "com.amazon.windowshop",
        uri_scheme: "amazon:",
    },
    amcrest_smart_home: {
        name: "Amcrest Smart Home",
        app_icon: amcrestSmartHomeIcon,
        launcher: "package",
        package: "com.mm.android.amcrestsmarthome",
        uri_scheme: "",
    },
    apple_music: {
        name: "Apple Music",
        app_icon: appleMusicIcon,
        launcher: "package",
        package: "com.apple.android.music",
        uri_scheme: "",
    },
    bmw: {
        name: "My BMW",
        app_icon: bmwIcon,
        launcher: "package",
        package: "de.bmw.connected.mobile20.na",
        uri_scheme: "bmwconnected:",
    },
    bond: {
        name: "Bond Home",
        app_icon: bondIcon,
        launcher: "package",
        package: "io.olibra.bondapp",
        uri_scheme: "",
    },
    bring: {
        name: "Bring!",
        app_icon: bringIcon,
        launcher: "package",
        package: "ch.publisheria.bring",
        uri_scheme: "",
    },
    calculator: {
        name: "Calculator",
        app_icon: calculatorIcon,
        launcher: "package",
        package: "com.google.android.calculator",
        uri_scheme: "",
    },
    chatgpt: {
        name: "ChatGPT",
        app_icon: chatgptIcon,
        launcher: "package",
        package: "com.openai.chatgpt",
        uri_scheme: "",
    },
    clock: {
        name: "Clock/Timer",
        app_icon: clockTimerIcon,
        launcher: "package",
        package: "com.google.android.deskclock",
        uri_scheme: "",
    },
    doordash: {
        name: "Doordash",
        app_icon: doordashIcon,
        launcher: "uri_scheme",
        package: "com.dd.dashdash",
        uri_scheme: "doordash:",
    },
    eufy_home: {
        name: "Eufy Clean",
        app_icon: eufyHomeIcon,
        launcher: "uri_scheme",
        package: "com.eufylife.smarthome",
        uri_scheme: "eufyhome:",
    },
    eufy_security: {
        name: "Eufy Security",
        app_icon: eufySecurityIcon,
        launcher: "package",
        package: "com.oceanwing.battery.cam",
        uri_scheme: "eufysecurity:",
    },
    google_assistant: {
        name: "Google Assistant",
        app_icon: googleAssistantIcon,
        launcher: "package",
        package: "com.google.android.apps.googleassistant",
        uri_scheme: "googleassistant:",
    },
    google_chrome: {
        name: "Google Chrome",
        app_icon: googleChromeIcon,
        launcher: "package",
        package: "com.android.chrome",
        uri_scheme: "googlechrome:",
    },
    google_maps: {
        name: "Google Maps",
        app_icon: googleMapsIcon,
        launcher: "package",
        package: "com.google.android.apps.maps",
        uri_scheme: "googlemaps:",
    },
    grubhub: {
        name: "Grubhub",
        app_icon: grubhubIcon,
        launcher: "package",
        package: "com.grubhub.android",
        uri_scheme: "grubhub:",
    },
    home_connect: {
        name: "Home Connect",
        app_icon: homeConnectIcon,
        launcher: "package",
        package: "com.bshg.homeconnect.android.release.na",
        uri_scheme: "",
    },
    hue: {
        name: "Hue",
        app_icon: hueIcon,
        launcher: "package",
        package: "com.philips.lighting.hue2",
        uri_scheme: "",
    },
    hulu: {
        name: "Hulu",
        app_icon: huluIcon,
        launcher: "uri_scheme",
        package: "com.hulu.plus",
        uri_scheme: "hulu:",
    },
    irobot: {
        name: "iRobot",
        app_icon: irobotIcon,
        launcher: "package",
        package: "com.irobot.home",
        uri_scheme: "",
    },
    keurig: {
        name: "Keurig",
        app_icon: keurigIcon,
        launcher: "package",
        package: "com.keurig.kconnect",
        uri_scheme: "",
    },
    lionel_chief: {
        name: "LionChief",
        app_icon: lionchiefIcon,
        launcher: "package",
        package: "com.lionel.lionchief",
        uri_scheme: "",
    },
    lutron: {
        name: "Lutron",
        app_icon: lutronIcon,
        launcher: "package",
        package: "com.lutron.mmw",
        uri_scheme: "",
    },
    lyft: {
        name: "Lyft",
        app_icon: lyftIcon,
        launcher: "uri_scheme",
        package: "me.lyft.android",
        uri_scheme: "lyft://",
    },
    myq: {
        name: "MyQ",
        app_icon: myqIcon,
        launcher: "package",
        package: "com.chamberlain.android.liftmaster.myq",
        uri_scheme: "",
    },
    nest: {
        name: "Nest",
        app_icon: nestIcon,
        launcher: "package",
        package: "com.nest.android",
        uri_scheme: "",
    },
    netflix: {
        name: "Netflix",
        app_icon: netflixIcon,
        launcher: "uri_scheme",
        package: "com.netflix.mediaclient",
        uri_scheme: "nflx:",
    },
    pandora: {
        name: "Pandora",
        app_icon: pandoraIcon,
        launcher: "uri_scheme",
        package: "com.pandora.android",
        uri_scheme: "pandora:",
    },
    play_store: {
        name: "Play Store",
        app_icon: playStoreIcon,
        launcher: "package",
        package: "com.android.vending",
        uri_scheme: "",
    },
    rachio: {
        name: "Rachio",
        app_icon: rachioIcon,
        launcher: "package",
        package: "com.rachio.iro",
        uri_scheme: "",
    },
    rainbird: {
        name: "Rainbird",
        app_icon: rainbirdIcon,
        launcher: "package",
        package: "com.rainbird",
        uri_scheme: "",
    },
    reolink: {
        name: "Reolink",
        app_icon: reolinkIcon,
        launcher: "package",
        package: "com.mcu.reolink",
        uri_scheme: "reolink:",
    },
    ring: {
        name: "Ring",
        app_icon: ringIcon,
        launcher: "uri_scheme",
        package: "com.ringapp",
        uri_scheme: "ring:",
    },
    roku: {
        name: "Roku",
        app_icon: rokuIcon,
        launcher: "package",
        package: "com.roku.remote",
        uri_scheme: "",
    },
    sense: {
        name: "Sense Energy",
        app_icon: senseIcon,
        launcher: "package",
        package: "com.sense.androidclient",
        uri_scheme: "",
    },
    shazam: {
        name: "Shazam",
        app_icon: shazamIcon,
        launcher: "uri_scheme",
        package: "com.shazam.android",
        uri_scheme: "shazam:",
    },
    shipt_shopper: {
        name: "Shipt Shopper",
        app_icon: shiptShopperIcon,
        launcher: "package",
        package: "com.shipt.shopper",
        uri_scheme: "",
    },
    sleep_number: {
        name: "Sleep Number",
        app_icon: sleepNumberIcon,
        launcher: "package",
        package: "com.selectcomfort.SleepIQ",
        uri_scheme: "",
    },
    solitaire: {
        name: "Solitaire",
        app_icon: solitaireIcon,
        launcher: "package",
        package: "com.tripledot.solitaire",
        uri_scheme: "",
    },
    sonos: {
        name: "Sonos",
        app_icon: sonosIcon,
        launcher: "uri_scheme",
        package: "com.sonos.acr2",
        uri_scheme: "sonos:",
    },
    spotify: {
        name: "Spotify",
        app_icon: spotifyIcon,
        launcher: "uri_scheme",
        package: "com.spotify.music",
        uri_scheme: "spotify:",
    },
    tuya_smart: {
        name: "Tuya Smart",
        app_icon: tuyaSmartIcon,
        launcher: "uri_scheme",
        package: "com.tuya.smart",
        uri_scheme: "tuyasmart:",
    },
    uber: {
        name: "Uber",
        app_icon: uberIcon,
        launcher: "uri_scheme",
        package: "com.ubercab",
        uri_scheme: "uber:",
    },
    uber_eats: {
        name: "Uber Eats",
        app_icon: uberEatsIcon,
        launcher: "uri_scheme",
        package: "com.ubercab.eats",
        uri_scheme: "ubereats:",
    },
    weather_channel: {
        name: "Weather Channel",
        app_icon: weatherChannelIcon,
        launcher: "package",
        package: "com.weather.Weather",
        uri_scheme: "",
    },
    weather_underground: {
        name: "Weather Underground",
        app_icon: weatherUndergroundIcon,
        launcher: "package",
        package: "com.wunderground.android.weather",
        uri_scheme: "",
    },
    yummly: {
        name: "Yummly Recipes",
        app_icon: yummlyIcon,
        launcher: "package",
        package: "com.yummly.android",
        uri_scheme: "",
    },
};

let AppTile = class AppTile extends s {
    static { this.styles = tileBaseStyle; }
    setConfig(config) {
        if (!config.app)
            throw new Error("A valid app must be specified.");
        this._config = { ...config };
        this._appObj = appTable[config.app] || undefined;
    }
    render() {
        let iconStyle, iconTemplate, name;
        if (this._appObj) {
            if (this._config?.icon) {
                iconStyle =
                    "color: rgb(var(--sq-inactive-rgb)); background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-opacity, 0.2));";
                iconTemplate = x `<ha-icon .icon=${this._config.icon}></ha-icon>`;
            }
            else if (this._appObj?.app_icon) {
                iconStyle = "height: 3.8rem; width: 3.8rem; padding: 0;";
                iconTemplate = x `<img
                    src="/local/community/smartqasa-dash/assets/${this._appObj.app_icon}"
                    alt="App Icon"
                    style="border-radius: 50%;"
                />`;
            }
            else {
                iconStyle =
                    "color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-opacity, 0.2));";
                iconTemplate = x `<ha-icon .icon="hass:help-rhombus"></ha-icon>`;
            }
        }
        else {
            iconStyle =
                "color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-opacity, 0.2));";
            iconTemplate = x `<ha-icon .icon="hass:alert-rhombus"></ha-icon>`;
        }
        name = this._config?.name || this._appObj?.name || this._config?.app;
        return x `
            <div class="container" @click=${this.launchApp}>
                <div class="icon" style=${iconStyle}>${iconTemplate}</div>
                <div class="name">${name}</div>
            </div>
        `;
    }
    launchApp(e) {
        e.stopPropagation();
        if (this._appObj.launcher == "uri_scheme" && this._appObj.uri_scheme) {
            window.location.href = this._appObj.uri_scheme;
        }
        else if (this._appObj.launcher == "package" && this._appObj.package) {
            if (window.fully?.startApplication) {
                window.fully.startApplication(this._appObj.package);
            }
            else {
                console.warn("fully.startApplication is not available.");
            }
        }
        else {
            console.error("Neither URI scheme nor package has been specified.");
        }
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], AppTile.prototype, "_config", void 0);
__decorate([
    r()
], AppTile.prototype, "_appObj", void 0);
AppTile = __decorate([
    t$1("smartqasa-app-tile")
], AppTile);
window.customCards.push({
    type: "smartqasa-app-tile",
    name: "SmartQasa App Tile",
    preview: true,
    description: "A SmartQasa tile for launching applications from the dashboard",
});

let AreaTile = class AreaTile extends s {
    constructor() {
        super(...arguments);
        this._waiting = false;
        this._icon = "hass:help-rhombus";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._area = this._config?.area;
        this.updateState();
    }
    set hass(hass) {
        if (!this._area || !hass)
            return;
        this._hass = hass;
        this._areaObj = this._hass?.areas[this._area];
        this.updateState();
    }
    updateState() {
        if (this._waiting === true)
            return;
        if (!this._areaObj) {
            this._icon = this._config?.icon ?? "hass:alert-rhombus";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name ?? "Unknown";
            return;
        }
        this._icon = this._config?.icon || this._areaObj.icon || "hass:help-rhombus";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._areaObj.name || this._area || "Unknown";
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.navigateToArea}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }
    navigateToArea(e) {
        e.stopPropagation();
        if (!this._areaObj)
            return;
        this._waiting = true;
        this._icon = "hass:rotate-right";
        this._iconAnimation = "spin 1.0s linear infinite";
        this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
        window.history.pushState(null, "", `/home-dash/${this._area}`);
        window.dispatchEvent(new CustomEvent("location-changed"));
        setTimeout(() => {
            this._waiting = false;
            window.browser_mod?.service("close_popup", {});
        }, 500);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], AreaTile.prototype, "_config", void 0);
__decorate([
    r()
], AreaTile.prototype, "_areaObj", void 0);
__decorate([
    r()
], AreaTile.prototype, "_waiting", void 0);
AreaTile = __decorate([
    t$1("smartqasa-area-tile")
], AreaTile);
window.customCards.push({
    type: "smartqasa-area-tile",
    name: "SmartQasa Area Tile",
    preview: true,
    description: "A SmartQasa card for navigating to an area panel.",
});

const dialogTable = {
    clean_screen: {
        icon: "hass:spray-bottle",
        name: "Clean Screen",
        data: {
            title: "Clean Screen",
            size: "fullscreen",
            timeout: 30000,
            dismissable: false,
            content: {
                type: "picture",
                image: "/local/sq-storage/images/clean_screen.png",
                card_mod: {
                    style: {
                        radius: "0px",
                    },
                },
            },
        },
    },
    display_themes: {
        icon: "hass:compare",
        name: "Dispaly Themes",
        data: {
            title: "Display Themes",
            timeout: 60000,
            content: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: listDialogStyle,
                cards: [
                    {
                        type: "custom:smartqasa-theme-tile",
                        mode: "light",
                        icon: "hass:brightness-7",
                        name: "Light",
                    },
                    {
                        type: "custom:smartqasa-theme-tile",
                        mode: "dark",
                        icon: "hass:weather-night",
                        name: "Dark",
                    },
                    {
                        type: "custom:smartqasa-theme-tile",
                        mode: "auto",
                        icon: "hass:theme-light-dark",
                        name: "Auto",
                    },
                ],
            },
        },
    },
    energy_monitor: {
        icon: "hass:transmission-tower",
        name: "Energy Monitor",
        data: {
            title: "Energy Monitor",
            size: "fullscreen",
            timeout: 120000,
            content: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: {
                    "grid-template-columns": "90vw",
                    "grid-template-rows": "auto",
                    "grid-gap": "var(--sq-dialog-grid-gap)",
                    "place-content": "center",
                    margin: 0,
                },
                cards: [
                    {
                        type: "horizontal-stack",
                        cards: [{ type: "energy-distribution" }, { type: "energy-date-selection" }],
                    },
                    { type: "energy-usage-graph" },
                ],
            },
        },
    },
    garages: {
        icon: "hass:garage-variant",
        name: "Garage Doors",
        data: listDialogConfig("Garage Doors", "group", "cover.all_garage_doors", "garage"),
    },
    locks: {
        icon: "hass:lock",
        name: "Door Locks",
        data: listDialogConfig("Door Locks", "group", "lock.all_door_locks", "lock"),
    },
    robots: {
        icon: "hass:robot-vacuum-variant",
        name: "Robots",
        data: listDialogConfig("Robots", "domain", "vacuum", "robot"),
    },
    roku_players: {
        icon: "hass:audio-video",
        name: "Roku Players",
        data: listDialogConfig("Roku Players", "group", "media_player.all_roku_players", "roku"),
    },
    sensors_doors: {
        icon: "hass:door-open",
        name: "Door Sensors",
        data: listDialogConfig("Door Sensors", "group", "binary_sensor.all_door_sensors", "sensor"),
    },
    sensors_windows: {
        icon: "hass:window-open",
        name: "Window Sensors",
        data: listDialogConfig("Window Sensors", "group", "binary_sensor.all_window_sensors", "sensor"),
    },
    speed_test: {
        icon: "hass:spray-bottle",
        name: "Speed Test",
        data: {
            title: "Speed Test",
            size: "wide",
            timeout: 60000,
            content: {
                type: "statistics-graph",
                entities: ["sensor.speedtest_download", "sensor.speedtest_upload"],
                chart_type: "line",
                period: "hour",
                stat_types: ["mean"],
                hide_legend: false,
                days_to_show: 3,
            },
        },
    },
    sonos_players: {
        icon: "hass:speaker-multiple",
        name: "Sonos Players",
        data: listDialogConfig("Sonos Players", "group", "media_player.all_sonos_players", "sonos"),
    },
    thermostats: {
        icon: "hass:thermostat",
        name: "Thermostats",
        data: listDialogConfig("Thermostats", "domain", "climate", "thermostat"),
    },
};

let DialogTile = class DialogTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:help-rhombus";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
    }
    static { this.styles = tileBaseStyle; }
    setConfig(config) {
        this._config = { ...config };
        this._dialogObj = this._config ? dialogTable[this._config.dialog] : undefined;
        this._updateState();
    }
    _updateState() {
        if (!this._dialogObj) {
            this._icon = this._config?.icon || "hass:help-rhombus";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            return;
        }
        this._icon = this._config?.icon || this._dialogObj.icon;
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._dialogObj.name;
    }
    render() {
        return x `
            <div class="container" @click=${this.showDialog}>
                <div
                    class="icon"
                    style="
                        color: rgb(${this._iconColor});
                        background-color: rgba(${this._iconColor}, var(--sq-icon-opacity, 0.2));
                    "
                >
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }
    async showDialog(e) {
        e.stopPropagation();
        if (!this._dialogObj || !this._config)
            return;
        let dialogConfig = { ...this._dialogObj.data };
        const menuTab = this._config.menu_tab;
        if (menuTab !== undefined && menuTab >= 0 && menuTab <= 3) {
            try {
                const dismissData = await menuConfig(menuTab);
                dialogConfig.dismiss_action = {
                    service: "browser_mod.popup",
                    data: dismissData,
                };
            }
            catch (error) {
                console.error("Error loading menu configuration", error);
            }
        }
        window.browser_mod?.service("popup", dialogConfig);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], DialogTile.prototype, "_config", void 0);
__decorate([
    r()
], DialogTile.prototype, "_dialogObj", void 0);
DialogTile = __decorate([
    t$1("smartqasa-dialog-tile")
], DialogTile);
window.customCards.push({
    type: "smartqasa-dialog-tile",
    name: "SmartQasa Dialog Tile",
    preview: true,
    description: "A SmartQasa card for displaying a browser_mod popup dialog.",
});

function entityListDialog(dialogTitle, filterType, filterValue, tileType) {
    const dialogConfig = listDialogConfig(dialogTitle, filterType, filterValue, tileType);
    window.browser_mod?.service("popup", dialogConfig);
}

let FanTile = class FanTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:fan";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileStateStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("fan.") ? this._config.entity : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:fan-alert";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        const state = this._stateObj.state || "unknown";
        this._icon = this._config?.icon || "hass:fan";
        if (state == "on" && this._icon === "hass:fan") {
            if (this._stateObj.attributes.percentage) {
                const speed = 0.5 + (1 - this._stateObj.attributes.percentage / 100);
                const direction = this._stateObj.attributes.direction == "reverse" ? "reverse" : "normal";
                this._iconAnimation = `spin ${speed}s linear infinite ${direction}`;
            }
            else {
                this._iconAnimation = `spin 0.5s linear infinite normal`;
            }
        }
        else {
            this._iconAnimation = "none";
        }
        this._iconColor = state == "on" ? "var(--sq-fan-on-rgb)" : "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || "Unknown";
        this._stateFmtd =
            this._hass.formatEntityState(this._stateObj) +
                (state == "on" && this._stateObj.attributes.percentage
                    ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "percentage")
                    : "");
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo} @contextmenu=${this.showEntityList}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (!this._stateObj)
            return;
        this._hass.callService("fan", "toggle", { entity_id: this._entity });
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
    showEntityList(e) {
        e.stopPropagation();
        if (!this._stateObj ||
            !Array.isArray(this._stateObj.attributes?.entity_id) ||
            this._stateObj.attributes.entity_id.length === 0)
            return;
        entityListDialog(this._stateObj.attributes?.friendly_name || "Unknown", "group", this._entity, "fan");
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], FanTile.prototype, "_config", void 0);
__decorate([
    r()
], FanTile.prototype, "_stateObj", void 0);
FanTile = __decorate([
    t$1("smartqasa-fan-tile")
], FanTile);
window.customCards.push({
    type: "smartqasa-fan-tile",
    name: "SmartQasa Fan Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a fan entity.",
});

let GarageTile = class GarageTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:garage-variant";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("cover.") ? this._config.entity : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:garage-alert-variant";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        const state = this._stateObj.state || "unknown";
        switch (state) {
            case "closed":
                this._icon = "hass:garage-variant";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-inactive-rgb)";
                break;
            case "opening":
                this._icon = "hass:arrow-up-box";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-garage-opening-rgb, 255, 120, 0)";
                break;
            case "open":
                this._icon = "hass:garage-open-variant";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-garage-open-rgb, 255, 120, 0)";
                break;
            case "closing":
                this._icon = "hass:arrow-down-box";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-garage-closing-rgb, 255, 120, 0)";
                break;
            default:
                this._icon = "hass:garage-alert-variant";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                break;
        }
        this._stateFmtd =
            this._hass.formatEntityState(this._stateObj) +
                (state === "open" && this._stateObj.attributes.current_position
                    ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "current_position")
                    : "");
        this._name = this._config?.icon || this._stateObj.attributes.friendly_name || "Unknown";
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (!this._stateObj)
            return;
        this._hass.callService("cover", "toggle", { entity_id: this._entity });
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], GarageTile.prototype, "_config", void 0);
__decorate([
    r()
], GarageTile.prototype, "_stateObj", void 0);
GarageTile = __decorate([
    t$1("smartqasa-garage-tile")
], GarageTile);
window.customCards.push({
    type: "smartqasa-garage-tile",
    name: "SmartQasa Garage Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a garage cover entity.",
});

let HeaterTile = class HeaterTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:water-thermometer";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("water_heater.") ? this._config.entity : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:water-thermometer";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        const state = this._stateObj.state || "unknown";
        this._iconColor = heaterColors[state] || heaterColors.idle;
        this._stateFmtd = this._hass.formatEntityState(this._stateObj);
        if (state !== "off" && this._stateObj.attributes.temperature) {
            this._stateFmtd += ` - ${this._stateObj.attributes.temperature}°`;
        }
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (!this._stateObj)
            return;
        this._hass.callService("water_heater", "toggle", { entity_id: this._stateObj.entity_id });
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], HeaterTile.prototype, "_config", void 0);
__decorate([
    r()
], HeaterTile.prototype, "_stateObj", void 0);
HeaterTile = __decorate([
    t$1("smartqasa-heater-tile")
], HeaterTile);
window.customCards.push({
    type: "smartqasa-heater-tile",
    name: "SmartQasa Heater Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a water heater entity.",
});

let LightTile = class LightTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:lightbulb";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("light.") ? this._config.entity : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:lightbulb-alert";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        const state = this._stateObj.state || "unknown";
        this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:lightbulb";
        this._iconColor = state === "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || "Unknown";
        this._stateFmtd =
            this._hass.formatEntityState(this._stateObj) +
                (state === "on" && this._stateObj.attributes.brightness
                    ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "brightness")
                    : "");
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo} @contextmenu=${this.showEntityList}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (!this._stateObj)
            return;
        this._hass.callService("light", "toggle", { entity_id: this._entity });
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
    showEntityList(e) {
        e.stopPropagation();
        if (!this._stateObj ||
            !Array.isArray(this._stateObj.attributes?.entity_id) ||
            this._stateObj.attributes.entity_id.length === 0)
            return;
        entityListDialog(this._stateObj.attributes?.friendly_name || "Unknown", "group", this._entity, "light");
    }
    getCardSize() {
        return 1;
    }
    static getConfigElement() {
        return document.createElement("smartqasa-light-tile-editor");
    }
    static getStubConfig() {
        return {
            entity: "",
            icon: "",
            name: "",
        };
    }
};
__decorate([
    r()
], LightTile.prototype, "_config", void 0);
__decorate([
    r()
], LightTile.prototype, "_stateObj", void 0);
LightTile = __decorate([
    t$1("smartqasa-light-tile")
], LightTile);
window.customCards.push({
    type: "smartqasa-light-tile",
    name: "SmartQasa Light Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a light entity.",
});

let LightTileEditor = class LightTileEditor extends s {
    setConfig(config) {
        this._config = { ...config }; // Ensure updates trigger reactivity
    }
    static { this.styles = i$5 `
        .table {
            display: table;
        }
        .row {
            display: table-row;
        }
        .cell {
            display: table-cell;
            padding: 0.5em;
        }
    `; }
    render() {
        return x `
      <form class="table">
        <div class="row">
          <label class="cell" for="entity">Entity:</label>
          <input
              @input="${this.handleInputEvent}"
              class="cell" id="entity" .value="${this._config.entity ?? ""}"></input>
        </div>
        <div class="row">
          <label class="cell" for="name">Name:</label>
          <input
              @input="${this.handleInputEvent}"
              class="cell" id="name" .value="${this._config.name ?? ""}"></input>
        </div>
      </form>
    `;
    }
    handleInputEvent(e) {
        const input = e.target;
        switch (input.id) {
            case "entity":
                this._config.entity = input.value;
                break;
            case "name":
                this._config.name = input.value;
                break;
        }
        this.dispatchConfigChanged();
    }
    dispatchConfigChanged() {
        const messageEvent = new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(messageEvent);
    }
};
__decorate([
    r()
], LightTileEditor.prototype, "_config", void 0);
LightTileEditor = __decorate([
    t$1("smartqasa-light-tile-editor")
], LightTileEditor);

let LockTile = class LockTile extends s {
    constructor() {
        super(...arguments);
        this._waiting = false;
        this._icon = "hass:lock";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("lock.") ? this._config.entity : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (this._waiting === true)
            return;
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:lock-alert";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        const state = this._stateObj.state || "unknown";
        switch (state) {
            case "locked":
                this._icon = "hass:lock";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-inactive-rgb)";
                break;
            case "unlocking":
                this._icon = "hass:rotate-right";
                this._iconAnimation = "spin 1.0s linear infinite";
                this._iconColor = "var(--sq-lock-unlocking-rgb)";
                break;
            case "unlocked":
                this._icon = "hass:lock-open";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-lock-unlocked-rgb)";
                break;
            case "locking":
                this._icon = "hass:rotate-right";
                this._iconAnimation = "spin 1.0s linear infinite";
                this._iconColor = "var(--sq-lock-locking-rgb)";
                break;
            case "jammed":
                this._icon = "hass:lock-open";
                this._iconAnimation = "blink 1.0s linear infinite";
                this._iconColor = "var(--sq-lock-jammed-rgb, 255, 0, 0)";
                break;
            default:
                this._icon = "hass:lock-alert";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-unavailable-rgb)";
                break;
        }
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || "Unknown";
        this._stateFmtd = this._hass.formatEntityState(this._stateObj);
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (!this._stateObj)
            return;
        const state = this._stateObj.state;
        this._stateObj.state = state == "locked" ? "unlocking" : "locking";
        this.updateState();
        this._waiting = true;
        this._hass.callService("lock", state == "locked" ? "unlock" : "lock", {
            entity_id: this._entity,
        });
        setTimeout(() => {
            this._waiting = false;
            this.updateState();
        }, 500);
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], LockTile.prototype, "_config", void 0);
__decorate([
    r()
], LockTile.prototype, "_stateObj", void 0);
__decorate([
    r()
], LockTile.prototype, "_waiting", void 0);
LockTile = __decorate([
    t$1("smartqasa-lock-tile")
], LockTile);
window.customCards.push({
    type: "smartqasa-lock-tile",
    name: "SmartQasa Lock Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a lock entity.",
});

let OptionTile = class OptionTile extends s {
    constructor() {
        super(...arguments);
        this._running = false;
        this._icon = "hass:form-dropdown";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this.updateState();
    }
    set hass(hass) {
        if (!this._config?.entity || !hass)
            return;
        this._hass = hass;
        this.updateState();
    }
    updateState() {
        if (this._running === true)
            return;
        this._stateObj = this._config?.entity ? this._hass?.states[this._config.entity] : undefined;
        if (!this._stateObj) {
            this._icon = "hass:form-dropdown";
            this._iconAnimation = "none";
            this._iconColor = "var(--sq-unavailable-rgb)";
            this._name = this._config?.option || "Unknown";
            return;
        }
        this._icon = "hass:form-dropdown";
        this._iconAnimation = "none";
        this._iconColor =
            this._stateObj.state === this._config?.option
                ? "var(--sq-rgb-blue, 25, 125, 255)"
                : "var(--sq-inactive-rgb)";
        this._name = this._config?.option || "Unknown";
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.selectOption}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }
    selectOption(e) {
        e.stopPropagation();
        if (!this._stateObj)
            return;
        this._running = true;
        this._icon = "hass:rotate-right";
        this._iconAnimation = "spin 1.0s linear infinite";
        this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
        this._hass.callService("input_select", "select_option", {
            entity_id: this._stateObj.entity_id,
            option: this._config?.option,
        });
        if (this._config?.trigger && this._config.trigger.split(".")[0] === "input_button") {
            this._hass.callService("input_button", "press", {
                entity_id: this._config.trigger,
            });
        }
        setTimeout(() => {
            this._running = false;
            window.browser_mod?.service("close_popup", {});
        }, 2000);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], OptionTile.prototype, "_config", void 0);
__decorate([
    r()
], OptionTile.prototype, "_stateObj", void 0);
__decorate([
    r()
], OptionTile.prototype, "_running", void 0);
OptionTile = __decorate([
    t$1("smartqasa-option-tile")
], OptionTile);
window.customCards.push({
    type: "smartqasa-option-tile",
    name: "SmartQasa Option Tile",
    preview: true,
    description: "A SmartQasa tile for displaying an Option of an Input Select entity.",
});

let RobotTile = class RobotTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:robot-vacuum-variant";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("vacuum.") ? this._config.entity : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:robot-vacuum-variant-alert";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        const state = this._stateObj.state || "unknown";
        switch (state) {
            case "cleaning":
                this._icon = "hass:robot-vacuum-variant";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-vacuum-cleaning-rgb, 0, 150, 136)";
                break;
            case "docked":
                this._icon = "hass:robot-vacuum-variant";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-inactive-rgb)";
                break;
            case "idle":
                this._icon = "hass:robot-vacuum-variant";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-vacuum-idle-rgb, 190, 75, 85)";
                break;
            case "paused":
                this._icon = "hass:robot-vacuum-variant";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-vacuum-paused-rgb, 190, 75, 85)";
                break;
            case "returning":
                this._icon = "hass:robot-vacuum-variant";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-vacuum-returning-rgb, 0, 150, 136)";
                break;
            default:
                this._icon = "hass:robot-vacuum-variant-alert";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                break;
        }
        this._stateFmtd =
            this._hass.formatEntityState(this._stateObj) +
                (this._stateObj.attributes.battery_level
                    ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "battery_level")
                    : "");
        this._name = this._config?.icon || this._stateObj.attributes.friendly_name || this._entity || "Unknown";
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (!this._stateObj)
            return;
        const state = this._stateObj.state;
        this._hass.callService("vacuum", ["docked", "idle", "paused"].includes(state) ? "start" : "pause", {
            entity_id: this._entity,
        });
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], RobotTile.prototype, "_config", void 0);
__decorate([
    r()
], RobotTile.prototype, "_stateObj", void 0);
RobotTile = __decorate([
    t$1("smartqasa-robot-tile")
], RobotTile);
window.customCards.push({
    type: "smartqasa-robot-tile",
    name: "SmartQasa Robot Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a robot vacuum entity.",
});

let RokuTile = class RokuTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:audio-video";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("media_player.") ? this._config.entity : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:audio-video-off";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:audio-video";
        const state = this._stateObj.state || "unknown";
        switch (state) {
            case "idle":
                this._iconColor = "var(--sq-media_player-idle-rgb)";
                break;
            case "standby":
                this._iconColor = "var(--sq-media_player-standby-rgb)";
                break;
            case "on":
                this._iconColor = "var(--sq-media_player-on-rgb)";
                break;
            case "paused":
                this._iconColor = "var(--sq-media_player-paused-rgb)";
                break;
            case "playing":
                this._iconColor = "var(--sq-media_player-playing-rgb, 3, 169, 244)";
                break;
            default:
                this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                break;
        }
        this._stateFmtd = `${this._hass.formatEntityState(this._stateObj)}${this._stateObj.attributes?.source ? ` - ${this._stateObj.attributes.source}` : ""}`;
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._entity || "Unknown";
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (!this._stateObj)
            return;
        this._hass.callService("media_player", "toggle", { entity_id: this._entity });
    }
    showMoreInfo(e) {
        e.stopPropagation();
        if (!this._config || !this._stateObj)
            return;
        const dialogConfig = {
            title: this._stateObj.attributes?.friendly_name || this._entity || "Unknown",
            timeout: 60000,
            content: {
                type: "custom:roku-card",
                entity: this._entity,
                tv: true,
            },
            ...(this._config.dialogTitle && {
                dismiss_action: {
                    service: "browser_mod.popup",
                    data: {
                        ...listDialogConfig(this._config.dialogTitle, this._config.filterType, this._config.filterValue, this._config.tileType),
                    },
                },
            }),
        };
        window.browser_mod?.service("popup", dialogConfig);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], RokuTile.prototype, "_config", void 0);
__decorate([
    r()
], RokuTile.prototype, "_stateObj", void 0);
RokuTile = __decorate([
    t$1("smartqasa-roku-tile")
], RokuTile);
window.customCards.push({
    type: "smartqasa-roku-tile",
    name: "SmartQasa Roku Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a Roku media_player entity.",
});

let RoutineTile = class RoutineTile extends s {
    constructor() {
        super(...arguments);
        this._waiting = false;
        this._icon = "hass:help-rhombus";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._entity = ["automation", "scene", "script"].includes(this._config.entity?.split(".")[0])
            ? this._config.entity
            : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (this._waiting === true)
            return;
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:alert-rhombus";
            this._iconAnimation = "none";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            return;
        }
        this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:help-circle";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.runRoutine}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }
    runRoutine(e) {
        e.stopPropagation();
        if (!this._stateObj)
            return;
        this._waiting = true;
        this._icon = "hass:rotate-right";
        this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
        this._iconAnimation = "spin 1.0s linear infinite";
        const domain = this._stateObj.entity_id.split(".")[0];
        switch (domain) {
            case "script":
                this._hass.callService("script", "turn_on", { entity_id: this._stateObj.entity_id });
                break;
            case "scene":
                this._hass.callService("scene", "turn_on", { entity_id: this._stateObj.entity_id });
                break;
            case "automation":
                this._hass.callService("automation", "trigger", { entity_id: this._stateObj.entity_id });
                break;
            default:
                console.error("Unsupported entity domain:", domain);
                return;
        }
        setTimeout(() => {
            this._waiting = false;
            this.updateState();
        }, 2000);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], RoutineTile.prototype, "_config", void 0);
__decorate([
    r()
], RoutineTile.prototype, "_stateObj", void 0);
__decorate([
    r()
], RoutineTile.prototype, "_waiting", void 0);
RoutineTile = __decorate([
    t$1("smartqasa-routine-tile")
], RoutineTile);
window.customCards.push({
    type: "smartqasa-routine-tile",
    name: "SmartQasa Routine Tile",
    preview: true,
    description: "A SmartQasa tile for triggering an automation, scene, or script entity.",
});

function selectOptionDialog(config, stateObj) {
    if (!stateObj)
        return;
    const cards = stateObj.attributes.options.map((option) => ({
        type: "custom:smartqasa-option-tile",
        entity: stateObj?.entity_id,
        option: option,
        trigger: config?.trigger || null,
    }));
    const dialogConfig = {
        title: stateObj.attributes.friendly_name || stateObj.entity_id,
        timeout: 60000,
        content: {
            type: "custom:layout-card",
            layout_type: "custom:grid-layout",
            layout: listDialogStyle,
            cards: cards,
        },
    };
    window.browser_mod?.service("popup", dialogConfig);
}

let SelectTile = class SelectTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:form-dropdown";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("input_select.") ? this._config.entity : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:form-dropdown";
            this._iconAnimation = "none";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        this._icon = this._config?.icon || this._stateObj.attributes?.icon || "hass:form-dropdown";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._stateObj.attributes?.friendly_name || this._entity || "Unknown";
        this._stateFmtd = this._hass.formatEntityState(this._stateObj) || "Unknown";
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showOptions}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    showOptions(e) {
        e.stopPropagation();
        selectOptionDialog(this._config, this._stateObj);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], SelectTile.prototype, "_config", void 0);
__decorate([
    r()
], SelectTile.prototype, "_stateObj", void 0);
SelectTile = __decorate([
    t$1("smartqasa-select-tile")
], SelectTile);
window.customCards.push({
    type: "smartqasa-select-tile",
    name: "SmartQasa Select Tile",
    preview: true,
    description: "A SmartQasa tile for displaying an Input Select entity.",
});

let SensorTile = class SensorTile extends s {
    constructor() {
        super(...arguments);
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("binary_sensor.") ? this._config.entity : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (!this._entity || !this._stateObj) {
            this._iconTemplate = x `<ha-icon .icon="hass:leak"></ha-icon>`;
            this._iconColor = "var(--sq-unavailable-rgb)";
            this._name = this._name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        if (this._stateObj) {
            if (!this._config?.icon) {
                this._iconTemplate = x `<ha-state-icon
                    .hass=${this._hass}
                    .stateObj=${this._stateObj}
                ></ha-state-icon>`;
            }
            else {
                this._iconTemplate = x `<ha-icon .icon=${this._config.icon}></ha-icon>`;
            }
            this._iconColor =
                this._stateObj.state === "on" ? "var(--sq-binary_sensor-on-rgb)" : "var(--sq-inactive-rgb)";
            this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._entity || "Unknown";
            this._stateFmtd = this._hass ? this._hass.formatEntityState(this._stateObj) : "Unknown";
        }
        else {
            this._iconTemplate = x `<ha-icon .icon="hass:leak"></ha-icon>`;
            this._iconColor = "var(--sq-unavailable-rgb)";
            this._name = this._name || "Unknown";
            this._stateFmtd = "Unknown";
        }
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" style="${o(iconStyles)}">${this._iconTemplate}</div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], SensorTile.prototype, "_config", void 0);
__decorate([
    r()
], SensorTile.prototype, "_stateObj", void 0);
SensorTile = __decorate([
    t$1("smartqasa-sensor-tile")
], SensorTile);
window.customCards.push({
    type: "smartqasa-sensor-tile",
    name: "SmartQasa Sensor Tile",
    preview: true,
    description: "A SmartQasa tile for observing a binary_sensor entity.",
});

let ShadeTile = class ShadeTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:roller-shade";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("cover.") ? this._config.entity : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:roller-shade";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        const state = this._stateObj.state;
        switch (state) {
            case "closed":
                this._icon = "hass:roller-shade-closed";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-inactive-rgb)";
                break;
            case "opening":
                this._icon = "hass:arrow-up-box";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-shade-opening-rgb, 146, 107, 199)";
                break;
            case "open":
                this._icon = "hass:roller-shade";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-shade-open-rgb, 146, 107, 199)";
                break;
            case "closing":
                this._icon = "hass:arrow-down-box";
                this._iconAnimation = "blink 2.0s linear infinite";
                this._iconColor = "var(--sq-shade-closing-rgb, 146, 107, 199)";
                break;
            default:
                this._icon = "hass:alert-rhombus";
                this._iconAnimation = "none";
                this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                break;
        }
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._entity || "Unknown";
        this._stateFmtd =
            this._hass.formatEntityState(this._stateObj) +
                (state === "open" && this._stateObj.attributes.current_position
                    ? " - " + this._hass.formatEntityAttributeValue(this._stateObj, "current_position")
                    : "");
    }
    render() {
        return x `
            <div class="container" @click=${this.showMoreInfo} @contextmenu=${this.showGroupList}>
                <div
                    class="icon"
                    @click=${this.toggleEntity}
                    style="
                        color: rgb(${this._iconColor});
                        background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
                        animation: ${this._iconAnimation};
                    "
                >
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (!this._stateObj)
            return;
        const tilt = this._config?.tilt || 100;
        if (tilt >= 1 && tilt <= 100) {
            if (this._stateObj.attributes.current_position !== tilt) {
                this._hass.callService("cover", "set_cover_position", {
                    entity_id: this._entity,
                    position: tilt,
                });
            }
            else {
                this._hass.callService("cover", "set_cover_position", {
                    entity_id: this._entity,
                    position: 0,
                });
            }
        }
        else {
            this.hass.callService("cover", "toggle", { entity_id: this._entity });
        }
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
    showGroupList(e) {
        e.stopPropagation();
        if (!this._stateObj ||
            !Array.isArray(this._stateObj.attributes?.entity_id) ||
            this._stateObj.attributes.entity_id.length === 0)
            return;
        entityListDialog(this._stateObj.attributes?.friendly_name || this._entity || "Unknown", "group", this._entity, "shade");
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], ShadeTile.prototype, "_config", void 0);
__decorate([
    r()
], ShadeTile.prototype, "_stateObj", void 0);
ShadeTile = __decorate([
    t$1("smartqasa-shade-tile")
], ShadeTile);
window.customCards.push({
    type: "smartqasa-shade-tile",
    name: "SmartQasa Shade Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a window shade entity.",
});

let SwitchTile = class SwitchTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:toggle-switch-variant";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._entity = ["fan", "input_boolean", "light", "switch"].includes(this._config.entity?.split(".")[0])
            ? this._config.entity
            : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:toggle-switch-variant";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        const state = this._stateObj.state;
        this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:toggle-switch-variant";
        this._iconColor =
            state === "on"
                ? `var(--sq-switch${this._config?.category ? `-${this._config.category}` : ""}-on-rgb)`
                : "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
        this._stateFmtd = this._hass ? this._hass.formatEntityState(this._stateObj) : "Unknown";
    }
    render() {
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div
                    class="icon"
                    @click=${this.toggleEntity}
                    style="
            color: rgb(${this._iconColor});
            background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
          "
                >
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (!this._stateObj)
            return;
        this._hass.callService("homeassistant", "toggle", {
            entity_id: this._entity,
        });
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], SwitchTile.prototype, "_config", void 0);
__decorate([
    r()
], SwitchTile.prototype, "_stateObj", void 0);
SwitchTile = __decorate([
    t$1("smartqasa-switch-tile")
], SwitchTile);
window.customCards.push({
    type: "smartqasa-switch-tile",
    name: "SmartQasa Switch Tile",
    preview: true,
    description: "A SmartQasa tile for toggling an entity.",
});

let ThemeTile = class ThemeTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:compare";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this.updateState();
    }
    updateState() {
        this._icon = this._config?.icon || "hass:compare";
        this._iconColor = this._config?.mode ? "var(--sq-inactive-rgb)" : "var(--sq-unavailable-rgb, 255, 0, 255)";
        this._name = this._config?.name || this._config?.mode || "Unknown";
    }
    render() {
        if (!this._config)
            return x ``;
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
        };
        return x `
            <div class="container" @click=${this.selectMode}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
            </div>
        `;
    }
    selectMode(e) {
        e.stopPropagation();
        if (!this._config)
            return;
        window.browser_mod?.service("set_theme", { dark: this._config.mode });
        window.browser_mod?.service("close_popup", {});
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], ThemeTile.prototype, "_config", void 0);
ThemeTile = __decorate([
    t$1("smartqasa-theme-tile")
], ThemeTile);
window.customCards.push({
    type: "smartqasa-theme-tile",
    name: "SmartQasa Theme Tile",
    preview: true,
    description: "A SmartQasa tile for setting the display theme.",
});

let ThermostatTile = class ThermostatTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:thermostat";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this._config = { ...config };
        this._entity = this._config.entity?.startsWith("climate.") ? this._config.entity : undefined;
        this.updateState();
    }
    set hass(hass) {
        if (!this._entity || !hass)
            return;
        this._hass = hass;
        this._stateObj = this._hass?.states[this._entity];
        this.updateState();
    }
    updateState() {
        if (!this._entity || !this._stateObj) {
            this._icon = this._config?.icon || "hass:thermostat";
            this._iconColor = thermostatColors.default;
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        const state = this._stateObj.state || "unavailable";
        this._icon = thermostatIcons[state] || thermostatIcons.default;
        const hvacAction = this._stateObj.attributes.hvac_action || "idle";
        if (state === "off") {
            this._iconColor = thermostatColors.off;
        }
        else {
            this._iconColor = thermostatColors[hvacAction] || thermostatColors.idle;
        }
        this._stateFmtd = this._hass.formatEntityState(this._stateObj);
        if (state !== "off") {
            if (this._stateObj.attributes.current_temperature) {
                this._stateFmtd += ` - ${this._stateObj.attributes.current_temperature}°`;
            }
            if (this._stateObj.attributes.current_humidity) {
                this._stateFmtd += ` / ${this._stateObj.attributes.current_humidity}%`;
            }
        }
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._entity || "Unknown";
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${this._icon}></ha-icon>
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (this._stateObj) {
            this._hass.callService("climate", "toggle", { entity_id: this._stateObj.entity_id });
        }
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj);
    }
    getCardSize() {
        return 1;
    }
};
__decorate([
    r()
], ThermostatTile.prototype, "_config", void 0);
__decorate([
    r()
], ThermostatTile.prototype, "_stateObj", void 0);
ThermostatTile = __decorate([
    t$1("smartqasa-thermostat-tile")
], ThermostatTile);
window.customCards.push({
    type: "smartqasa-thermostat-tile",
    name: "SmartQasa Thermostat Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a thermostat climate entity.",
});

window.smartqasa = window.smartqasa || {};
window.smartqasa.deviceType = window.screen.width < 600 ? "phone" : "tablet";
window.smartqasa.homePath = window.smartqasa.homePath || location.pathname.split("/").pop();
window.customCards = window.customCards ?? [];
console.info(`%c SmartQasa ⏏ ${version} `, "background-color: #0000ff; color: #ffffff; font-weight: 700;");
