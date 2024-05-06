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

const chipBaseStyle = i$5 `
    .container {
        width: max-content;
        place-self: center;
        display: grid;
        grid-template-areas: "i";
        padding: 1rem;
        border: var(--sq-card-border);
        border-radius: var(--sq-chip-border-radius);
        background-color: var(--sq-card-background-color);
        justify-content: center;
        transition: var(--sq-icon-transition, none);
        cursor: pointer;
    }
    .icon {
        grid-area: i;
        display: flex;
        height: 1.8rem;
        width: 1.8rem;
        transition: var(--sq-icon-transition, none);
        color: rgb(var(--sq-primary-text-rgb));
    }
`;
const chipTextStyle = i$5 `
    .container {
        grid-template-areas: "i t";
        grid-column-gap: 0.5rem;
        justify-content: start;
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
const chipIconSpinStyle = i$5 `
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

window.customCards.push({
    type: "smartqasa-custom-chip",
    name: "SmartQasa Custom Chip",
    preview: true,
    description: "A SmartQasa chip for custom configurations.",
});
let CustomChip = class CustomChip extends s {
    static { this.styles = [chipBaseStyle, chipTextStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.loadDialogObj();
    }
    async loadDialogObj() {
        if (!this.config?.file)
            return;
        try {
            const path = `/local/smartqasa/dialogs/${this.config.file}`;
            this.dialogObj = (await loadYamlAsJson(path));
            this.entity = this.dialogObj.entity;
        }
        catch (error) {
            console.error("Failed to load YAML:", error);
        }
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.hass && this.entity) {
            this.stateObj = this.hass.states[this.entity];
        }
    }
    render() {
        if (!this.dialogObj || !this.stateObj)
            return x ``;
        const icon = this.dialogObj.icon || "mdi:help-circle";
        let iconColor = "var(--sq-inactive-rgb)";
        if (this.hass && this.dialogObj.icon_rgb) {
            try {
                const func = new Function("states", this.dialogObj.icon_rgb);
                iconColor = func(this.hass.states);
                console.log("Icon color:", iconColor);
            }
            catch (error) {
                console.error("Error evaluating icon color expression:", error);
            }
        }
        let text = this.stateObj.state || "";
        switch (this.dialogObj.entity_type) {
            case "temperature":
                text += "°";
                break;
            case "percentage":
                text += "%";
                break;
        }
        const containerStyle = {
            "margin-left": "0.7rem",
            "grid-template-areas": '"i t"',
        };
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: "transparent",
        };
        return x `
            <div class="container" style="${o(containerStyle)}" @click=${this.showDialog}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                ${text ? x `<div class="text">${text}</div>` : null}
            </div>
        `;
    }
    showDialog(e) {
        e.stopPropagation();
        if (!this.dialogObj)
            return;
        const dialogConfig = { ...this.dialogObj.data };
        window.browser_mod?.service("popup", dialogConfig);
    }
};
__decorate([
    n$1({ attribute: false })
], CustomChip.prototype, "hass", void 0);
__decorate([
    r()
], CustomChip.prototype, "config", void 0);
__decorate([
    r()
], CustomChip.prototype, "dialogObj", void 0);
__decorate([
    r()
], CustomChip.prototype, "stateObj", void 0);
CustomChip = __decorate([
    t$1("smartqasa-custom-chip")
], CustomChip);

const deviceType = window.screen.width < 600 ? "phone" : "tablet";
const heaterColors = {
    electric: "var(--sq-climate-heat-rgb, 250, 67, 54)",
    heating: "var(--sq-climate-heat-rgb, 250, 67, 54)",
    idle: "var(--sq-idle-rgb, 128, 128, 128)",
    off: "var(--sq-inactive-rgb, 128, 128, 128)",
    default: "var(--sq-unavailable-rgb, 255, 0, 255)",
};
const modeIcons = {
    Home: "hass:home-account",
    Away: "hass:map-marker-radius",
    Guest: "hass:account-multiple",
    Entertain: "hass:glass-cocktail",
    Vacation: "hass:airplane",
    default: "hass:help-rhombus",
};
const phaseIcons = {
    Morning: "hass:weather-sunset-up",
    Day: "hass:white-balance-sunny",
    Evening: "hass:weather-night",
    Night: "hass:sleep",
    default: "hass:help-rhombus",
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

const listDialogStyle = {
    margin: 0,
    card_margin: 0,
    "grid-template-columns": "1fr",
    "grid-gap": "var(--sq-dialog-grid-gap)",
};
const gridDialogStyle = {
    margin: 0,
    card_margin: 0,
    "grid-template-columns": deviceType === "phone" ? "repeat(2, 1fr)" : "repeat(3, var(--sq-tile-width-tablet, 20rem))",
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
                            dialog_title: dialogTitle,
                            filter_type: filterType,
                            filter_value: filterValue,
                            tile_type: tileType,
                        },
                    },
                ],
            },
        },
    };
};

const dialogTable = {
    air_quality: {
        icon: "hass:air-filter",
        name: "Air Quality",
        data: {
            title: "Air Quality",
            size: "fullscreen",
            timeout: 120000,
            content: {
                type: "custom:layout-card",
                layout_type: "custom:horizontal-layout",
                layout: {
                    max_cols: 3,
                    card_margin: "4px 4px 8px",
                },
                cards: [
                    {
                        type: "custom:mini-graph-card",
                        entities: ["sensor.air_quality_radon"],
                        name: "Radon Gas",
                        icon: "mdi:radioactive",
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: "#00ff00",
                            },
                            {
                                value: 48.1,
                                color: "#32cd32",
                            },
                            {
                                value: 96.2,
                                color: "#ffd700",
                            },
                            {
                                value: 148,
                                color: "#ff0000",
                            },
                        ],
                        tap_action: {
                            action: "none",
                        },
                        color_thresholds_transition: "hard",
                    },
                    {
                        type: "custom:mini-graph-card",
                        entities: ["sensor.air_quality_co2"],
                        name: "Carbon Dioxide",
                        icon: "mdi:molecule-co2",
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: "#00ff00",
                            },
                            {
                                value: 799,
                                color: "#ffd700",
                            },
                            {
                                value: 999,
                                color: "#ff0000",
                            },
                        ],
                        color_thresholds_transition: "hard",
                        tap_action: {
                            action: "none",
                        },
                    },
                    {
                        type: "custom:mini-graph-card",
                        entities: ["sensor.air_quality_voc"],
                        name: "VOC (Contaminents)",
                        icon: "mdi:weather-dust",
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: "#00ff00",
                            },
                            {
                                value: 250,
                                color: "#ffd700",
                            },
                            {
                                value: 2000,
                                color: "#ff0000",
                            },
                        ],
                        color_thresholds_transition: "hard",
                        tap_action: {
                            action: "none",
                        },
                    },
                    {
                        type: "custom:mini-graph-card",
                        entities: ["sensor.air_quality_temperature"],
                        name: "Temperature",
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: "#0000ff",
                            },
                            {
                                value: 68,
                                color: "#00ff00",
                            },
                            {
                                value: 75,
                                color: "#ffa500",
                            },
                            {
                                value: 85,
                                color: "#ff0000",
                            },
                        ],
                        color_thresholds_transition: "hard",
                        tap_action: {
                            action: "none",
                        },
                    },
                    {
                        type: "custom:mini-graph-card",
                        entities: ["sensor.air_quality_humidity"],
                        name: "Humidity",
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: "#d0ae8b",
                            },
                            {
                                value: 40,
                                color: "#00ff00",
                            },
                            {
                                value: 60,
                                color: "#52B1D2",
                            },
                        ],
                        color_thresholds_transition: "hard",
                        tap_action: {
                            action: "none",
                        },
                    },
                    {
                        type: "custom:mini-graph-card",
                        entities: ["sensor.air_quality_pressure"],
                        name: "Barometric Presure",
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: "#52B1D2",
                            },
                            {
                                value: 1009.144,
                                color: "#00ff00",
                            },
                            {
                                value: 1022.689,
                                color: "#d0ae8b",
                            },
                        ],
                        color_thresholds_transition: "hard",
                        tap_action: {
                            action: "none",
                        },
                    },
                ],
            },
        },
    },
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
        icon: "hass:garage-open-variant",
        name: "Garage Doors",
        entity: "cover.all_garage_doors",
        data: listDialogConfig("Garage Doors", "group", "cover.all_garage_doors", "garage"),
    },
    locks: {
        icon: "hass:lock-open",
        name: "Door Locks",
        entity: "lock.all_door_locks",
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
        entity: "binary_sensor.all_door_sensors",
        data: listDialogConfig("Door Sensors", "group", "binary_sensor.all_door_sensors", "sensor"),
    },
    sensors_windows: {
        icon: "hass:window-open",
        name: "Window Sensors",
        entity: "binary_sensor.all_window_sensors",
        data: listDialogConfig("Window Sensors", "group", "binary_sensor.all_window_sensors", "sensor"),
    },
    speed_test: {
        icon: "hass:gauge",
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
    weather: {
        icon: "hass:sun-wireless",
        name: "Weather",
        data: {
            title: "Weather",
            size: "fullscreen",
            timeout: 60000,
            content: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: {
                    "place-content": "center",
                    "place-self": "center",
                    "grid-template-columns": "446px 454px",
                    "grid-gap": "var(--sq-dialog-grid-gap)",
                },
                cards: [
                    {
                        type: "vertical-stack",
                        cards: [
                            {
                                type: "custom:gap-card",
                                height: 15,
                            },
                            {
                                type: "weather-forecast",
                                entity: "weather.forecast_home",
                                forecast_type: "hourly",
                                name: "Forecast",
                                show_current: true,
                                show_forecast: true,
                                secondary_info_attribute: "wind_speed",
                            },
                            {
                                type: "weather-forecast",
                                entity: "weather.forecast_home",
                                forecast_type: "daily",
                                show_current: false,
                                show_forecast: true,
                            },
                        ],
                    },
                    {
                        type: "vertical-stack",
                        cards: [
                            {
                                type: "custom:gap-card",
                                height: 15,
                            },
                            {
                                type: "custom:weather-radar-card",
                                frame_count: 10,
                                show_marker: true,
                                show_range: true,
                                show_zoom: true,
                                show_recenter: true,
                                show_playback: true,
                                zoom_level: 20,
                                square_map: true,
                                show_scale: true,
                                extra_labels: true,
                                map_style: "Voyager",
                            },
                        ],
                    },
                ],
            },
        },
    },
};

window.customCards.push({
    type: "smartqasa-dialog-chip",
    name: "SmartQasa Dialog Chip",
    preview: true,
    description: "A SmartQasa chip for dialog.",
});
let DialogChip = class DialogChip extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    static { this.styles = [chipBaseStyle, chipTextStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.dialog = this.config.dialog;
        this.dialogObj = this.dialog ? dialogTable[this.dialog] : undefined;
        this.entity = this.dialogObj.entity;
        this.icon = this.dialogObj.icon;
        this.label = this.config.label || "";
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized || !this.dialogObj || !this.stateObj)
            return x ``;
        const state = this.stateObj.state;
        if ((this.dialog === "garages" && state === "closed") ||
            (this.dialog === "locks" && state === "locked") ||
            (this.dialog === "sensors_doors" && state === "off") ||
            (this.dialog === "sensors_windows" && state === "off"))
            return x ``;
        const containerStyle = {
            "margin-left": "0.7rem",
            "grid-template-areas": this.label ? '"i t"' : '"i"',
        };
        return x `
            <div class="container" style="${o(containerStyle)}" @click=${this.showDialog}>
                <div class="icon" style="color: rgb(var(--sq-rgb-orange));">
                    <ha-icon .icon=${this.icon}></ha-icon>
                </div>
                ${this.label ? x `<div class="text">${this.label}</div>` : null}
            </div>
        `;
    }
    showDialog(e) {
        e.stopPropagation();
        if (!window.browser_mod) {
            console.error("browser_mod is not available!");
            return;
        }
        const dialogConfig = { ...this.dialogObj.data };
        window.browser_mod.service("popup", dialogConfig);
    }
};
__decorate([
    n$1({ attribute: false })
], DialogChip.prototype, "hass", void 0);
__decorate([
    r()
], DialogChip.prototype, "initialized", void 0);
__decorate([
    r()
], DialogChip.prototype, "config", void 0);
__decorate([
    r()
], DialogChip.prototype, "dialogObj", void 0);
__decorate([
    r()
], DialogChip.prototype, "stateObj", void 0);
DialogChip = __decorate([
    t$1("smartqasa-dialog-chip")
], DialogChip);

async function toggleHassEntity(hass, entity) {
    if (!hass || !entity)
        return;
    try {
        await hass.callService("homeassistant", "toggle", { entity_id: entity });
    }
    catch (error) {
        console.error("Failed to toggle the entity:", error);
    }
}

window.customCards.push({
    type: "smartqasa-motion-chip",
    name: "SmartQasa Motion Sensor Chip",
    preview: true,
    description: "A SmartQasa chip for toggling a motion sensor automation entity.",
});
let MotionChip = class MotionChip extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    static { this.styles = [chipBaseStyle, chipTextStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("automation.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.entity || !this.initialized)
            return x ``;
        const { icon, iconColor, name } = this.updateState();
        const containerStyle = {
            "margin-right": "0.7rem",
            "grid-template-areas": name ? '"i t"' : '"i"',
        };
        const iconStyles = {
            color: `rgb(${iconColor})`,
        };
        return x `
            <div class="container" style="${o(containerStyle)}" @click=${this.toggleEntity}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                ${name ? x `<div class="text">${name}</div>` : null}
            </div>
        `;
    }
    updateState() {
        let icon, iconColor, name;
        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state || undefined;
            switch (state) {
                case "on":
                    icon = "hass:motion-sensor";
                    iconColor = "var(--sq-primary-font-rgb)";
                    break;
                case "off":
                    icon = "hass:motion-sensor-off";
                    iconColor = "var(--sq-red-rgb, 255, 0, 0)";
                    break;
                default:
                    icon = "hass:motion-sensor-off";
                    iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                    break;
            }
        }
        else {
            icon = this.config?.icon || "hass:lightbulb-alert";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
        }
        name = this.config?.name || "";
        return { icon, iconColor, name };
    }
    toggleEntity(e) {
        e.stopPropagation();
        toggleHassEntity(this.hass, this.entity);
    }
};
__decorate([
    n$1({ attribute: false })
], MotionChip.prototype, "hass", void 0);
__decorate([
    r()
], MotionChip.prototype, "initialized", void 0);
__decorate([
    r()
], MotionChip.prototype, "config", void 0);
__decorate([
    r()
], MotionChip.prototype, "stateObj", void 0);
MotionChip = __decorate([
    t$1("smartqasa-motion-chip")
], MotionChip);

window.customCards.push({
    type: "smartqasa-navigate-chip",
    name: "SmartQasa Navigate Chip",
    preview: true,
    description: "A SmartQasa chip for navigating to a previous/next area.",
});
let NavigateChip = class NavigateChip extends s {
    static { this.styles = [chipDoubleStyle]; }
    setConfig(config) {
        this.areaPrev = config.area_prev || undefined;
        this.areaNext = config.area_next || undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.areaPrev && this.areaNext) {
            this.areaObjPrev = this.hass ? this.hass.areas[this.areaPrev] : undefined;
            this.areaObjNext = this.hass ? this.hass.areas[this.areaNext] : undefined;
        }
    }
    render() {
        if (!this.areaObjPrev || !this.areaObjNext) {
            return x ``;
        }
        const containerStyle = {
            "margin-right": "0.7rem",
        };
        const iconPrev = "hass:menu-left";
        const iconNext = "hass:menu-right";
        return x `
            <div class="container" style="${o(containerStyle)}">
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
        if (this.areaObjPrev) {
            window.history.pushState(null, "", `/home-dash/${this.areaPrev}`);
            window.dispatchEvent(new CustomEvent("location-changed"));
            // Assume browser_mod is correctly typed and included
        }
        else {
            console.error("Previous area is not found.");
        }
    }
    _navigateNext(e) {
        e.stopPropagation();
        if (this.areaObjNext) {
            window.history.pushState(null, "", `/home-dash/${this.areaNext}`);
            window.dispatchEvent(new CustomEvent("location-changed"));
        }
        else {
            console.error("Next area is not found.");
        }
    }
};
__decorate([
    n$1({ attribute: false })
], NavigateChip.prototype, "hass", void 0);
__decorate([
    r()
], NavigateChip.prototype, "areaPrev", void 0);
__decorate([
    r()
], NavigateChip.prototype, "areaNext", void 0);
__decorate([
    r()
], NavigateChip.prototype, "areaObjPrev", void 0);
__decorate([
    r()
], NavigateChip.prototype, "areaObjNext", void 0);
NavigateChip = __decorate([
    t$1("smartqasa-navigate-chip")
], NavigateChip);

let RoutineChip = class RoutineChip extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
        this.running = false;
    }
    static { this.styles = [chipBaseStyle, chipTextStyle, chipIconSpinStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = ["automation", "scene", "script"].includes(this.config.entity?.split(".")[0])
            ? this.config.entity
            : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized || !this.entity)
            return x ``;
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const containerStyle = {
            "margin-left": "0.7rem",
            "grid-template-areas": name ? '"i t"' : '"i"',
        };
        const iconStyles = {
            color: `rgb(${iconColor})`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" style="${o(containerStyle)}" @click=${this.runRoutine}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                ${name ? x `<div class="text">${name}</div>` : null}
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name;
        if (this.config && this.hass && this.stateObj) {
            if (this.running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            }
            else {
                icon = this.config.icon || this.stateObj.attributes.icon || "hass:help-rhombus";
                iconAnimation = "none";
                iconColor = this.config.color || "var(--sq-primary-text-rgb)";
            }
        }
        else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
        }
        name = this.config?.name || "";
        return { icon, iconAnimation, iconColor, name };
    }
    runRoutine(e) {
        e.stopPropagation();
        if (!this.hass || !this.stateObj)
            return;
        this.running = true;
        const domain = this.stateObj.entity_id.split(".")[0];
        switch (domain) {
            case "script":
                this.hass.callService("script", "turn_on", { entity_id: this.entity });
                break;
            case "scene":
                this.hass.callService("scene", "turn_on", { entity_id: this.entity });
                break;
            case "automation":
                this.hass.callService("automation", "trigger", { entity_id: this.entity });
                break;
            default:
                console.error("Unsupported entity domain:", domain);
                return;
        }
        setTimeout(() => {
            this.running = false;
        }, 2000);
    }
};
__decorate([
    n$1({ attribute: false })
], RoutineChip.prototype, "hass", void 0);
__decorate([
    r()
], RoutineChip.prototype, "initialized", void 0);
__decorate([
    r()
], RoutineChip.prototype, "config", void 0);
__decorate([
    r()
], RoutineChip.prototype, "stateObj", void 0);
__decorate([
    r()
], RoutineChip.prototype, "running", void 0);
RoutineChip = __decorate([
    t$1("smartqasa-routine-chip")
], RoutineChip);
window.customCards.push({
    type: "smartqasa-routine-chip",
    name: "SmartQasa Routine Chip",
    preview: true,
    description: "A SmartQasa chip for triggering an automation, scene, or script entity.",
});

function selectOptionDialog(config, stateObj) {
    if (!stateObj)
        return;
    const cards = stateObj.attributes.options.map((option) => ({
        type: "custom:smartqasa-option-tile",
        entity: stateObj.entity_id,
        option: option,
        trigger: config?.trigger,
        menu_tab: config.menu_tab,
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

window.customCards.push({
    type: "smartqasa-select-chip",
    name: "SmartQasa Input Select Chip",
    preview: true,
    description: "A SmartQasa chip for selecting an option for a input_select entity.",
});
let SelectChip = class SelectChip extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    static { this.styles = [chipBaseStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("input_select.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized || !this.entity)
            return x ``;
        let icon;
        const state = this.stateObj?.state || "unknown";
        if (this.entity === "input_select.location_phase") {
            icon = phaseIcons[state] || phaseIcons.default;
        }
        else if (this.entity === "input_select.location_mode") {
            icon = modeIcons[state] || modeIcons.default;
        }
        else {
            icon = this.config?.icon || this.stateObj?.attributes?.icon || "hass:form-dropdown";
        }
        const containerStyle = {
            "margin-left": "0.7rem",
        };
        return x `
            <div class="container" style="${o(containerStyle)}" @click=${this.showOptions}>
                <div class="icon">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
            </div>
        `;
    }
    showOptions(e) {
        e.stopPropagation();
        selectOptionDialog(this.config, this.stateObj);
    }
};
__decorate([
    n$1({ attribute: false })
], SelectChip.prototype, "hass", void 0);
__decorate([
    r()
], SelectChip.prototype, "initialized", void 0);
__decorate([
    r()
], SelectChip.prototype, "config", void 0);
__decorate([
    r()
], SelectChip.prototype, "stateObj", void 0);
SelectChip = __decorate([
    t$1("smartqasa-select-chip")
], SelectChip);

function moreInfoDialog(config, stateObj) {
    if (!config || !stateObj)
        return;
    const title = stateObj.attributes.friendly_name || stateObj.entity_id;
    let dialogConfig = {
        title: title,
        dismissable: true,
        timeout: 60000,
        content: {
            type: "custom:smartqasa-more-info-dialog",
            entity: stateObj.entity_id,
        },
        ...(config.dialog_title && {
            dismiss_action: {
                service: "browser_mod.popup",
                data: {
                    ...listDialogConfig(config.dialog_title, config.filter_type, config.filter_value, config.tile_type),
                },
            },
        }),
    };
    window.browser_mod?.service("popup", dialogConfig);
}

let ThermostatChip$1 = class ThermostatChip extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
        this._icon = "hass:thermometer-lines";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._temperature = "??";
    }
    static { this.styles = [chipBaseStyle, chipTextStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("climate.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized || !this.entity)
            return x ``;
        const { icon, iconColor, temperature } = this.updateState();
        const containerStyle = {
            "margin-right": "0.7rem",
        };
        return x `
            <div class="container" style="${o(containerStyle)}" @click=${this.showMoreInfo}>
                <div class="icon" id="icon" style="color: rgb(${iconColor});">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="text">${temperature}°</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, temperature;
        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state;
            icon = thermostatIcons[state] || thermostatIcons.default;
            const hvacAction = this.stateObj.attributes.hvac_action;
            iconColor = thermostatColors[hvacAction] || thermostatColors.default;
            temperature = this.stateObj.attributes.current_temperature || "??";
        }
        else {
            icon = thermostatIcons.default;
            iconColor = thermostatColors.default;
            temperature = "??";
        }
        return { icon, iconAnimation, iconColor, temperature };
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
};
__decorate([
    n$1({ attribute: false })
], ThermostatChip$1.prototype, "hass", void 0);
__decorate([
    r()
], ThermostatChip$1.prototype, "initialized", void 0);
__decorate([
    r()
], ThermostatChip$1.prototype, "config", void 0);
__decorate([
    r()
], ThermostatChip$1.prototype, "stateObj", void 0);
ThermostatChip$1 = __decorate([
    t$1("smartqasa-thermostat-chip")
], ThermostatChip$1);

let ThermostatChip = class ThermostatChip extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    static { this.styles = [chipBaseStyle, chipTextStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("weather.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized || !this.entity)
            return x ``;
        let iconColor, temperature;
        if (this.config && this.entity && this.stateObj) {
            iconColor = "var(--sq-primary-text-rgb)";
            temperature = this.stateObj?.attributes?.temperature || "??";
        }
        else {
            iconColor = "var(--sq-unavailable-rgb)";
            temperature = "??";
        }
        const containerStyle = {
            "margin-left": "0.7rem",
        };
        return x `
            <div class="container" style="${o(containerStyle)}" @click=${this.showDialog}>
                <div class="icon" style="color: rgb(${iconColor});">
                    <ha-state-icon .hass=${this.hass} .stateObj=${this.stateObj}></ha-state-icon>
                </div>
                <div class="text">${temperature}°</div>
            </div>
        `;
    }
    showDialog(e) {
        e.stopPropagation();
        const dialogObj = dialogTable.weather;
        const dialogConfig = { ...dialogObj.data };
        window.browser_mod?.service("popup", dialogConfig);
    }
};
__decorate([
    n$1({ attribute: false })
], ThermostatChip.prototype, "hass", void 0);
__decorate([
    r()
], ThermostatChip.prototype, "initialized", void 0);
__decorate([
    r()
], ThermostatChip.prototype, "config", void 0);
__decorate([
    r()
], ThermostatChip.prototype, "stateObj", void 0);
ThermostatChip = __decorate([
    t$1("smartqasa-weather-chip")
], ThermostatChip);
window.customCards.push({
    type: "smartqasa-weather-chip",
    name: "SmartQasa Weather Chip",
    preview: true,
    description: "A SmartQasa chip for displaying the weather.",
});

var img$O = "data:image/png;base64,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";

window.customCards.push({
    type: "smartqasa-area-picture",
    name: "SmartQasa Area Picture",
    preview: true,
    description: "A SmartQasa card for rendering an area picture.",
});
let AreaPicture = class AreaPicture extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    getCardSize() {
        return 1;
    }
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
        this.config = { ...config };
        this.area = this.config?.area;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.area) {
            this.areaObj = this.hass && this.area ? this.hass.areas[this.area] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized || !this.areaObj)
            return x ``;
        const height = deviceType === "phone" ? "15vh" : "20vh";
        const picture = this.config?.picture
            ? `/local/smartqasa/images/${this.config.picture}`
            : this.areaObj?.picture ?? img$O;
        return x `
            <ha-card style="background-image: url(${picture}); height: ${height};" class="picture"></ha-card>
        `;
    }
};
__decorate([
    n$1({ attribute: false })
], AreaPicture.prototype, "hass", void 0);
__decorate([
    r()
], AreaPicture.prototype, "initialized", void 0);
__decorate([
    r()
], AreaPicture.prototype, "config", void 0);
__decorate([
    r()
], AreaPicture.prototype, "areaObj", void 0);
AreaPicture = __decorate([
    t$1("smartqasa-area-picture")
], AreaPicture);

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
            layout: gridDialogStyle,
            cards: cards,
        },
    };
    window.browser_mod?.service("popup", dialogConfig);
}

async function entertainDialog(config, hass) {
    if (!config || !hass)
        return;
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
    if (deviceType === "phone") {
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
            cards = [audioPlayerTitle, appListTitle, audioPlayerCard, appListCard];
        }
        else if (videoPlayerObj && !audioPlayerObj) {
            gridTemplateColumns = "340px 260px";
            cards = [videoPlayerTitle, appListTitle, videoPlayerCard, appListCard];
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
            icon: deviceType === "phone" ? icon : null,
            label: deviceType === "tablet" ? label : null,
        };
    }
    const layout = {
        margin: 0,
        card_margin: 0,
        padding: "1rem 0 0 0",
        "grid-template-columns": deviceType === "phone" ? "repeat(2, 1fr)" : "repeat(3, var(--sq-tile-width-tablet, 20rem))",
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
    const menuConfig = {
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
    window.smartqasa.menuConfig = menuConfig;
    return menuConfig;
}

window.customCards.push({
    type: "smartqasa-panel-footer",
    name: "SmartQasa Panel Footer",
    preview: true,
    description: "A SmartQasa tile for displaying the panel footer strip.",
});
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
        this.config = { ...config };
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
                ${deviceType !== "phone" ? x `<span>${name}</span>` : ""}
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
        areasDialog(this.hass);
    }
    handleEntertain() {
        entertainDialog(this.config, this.hass);
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
    n$1({ attribute: false })
], PanelFooter.prototype, "hass", void 0);
__decorate([
    r()
], PanelFooter.prototype, "config", void 0);
PanelFooter = __decorate([
    t$1("smartqasa-panel-footer")
], PanelFooter);

let MoreInfoDialog = class MoreInfoDialog extends s {
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config?.entity;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
        }
    }
    render() {
        return x `
            <div>
                <div class="card-content">
                    <more-info-content .hass=${this.hass} .stateObj=${this.stateObj}> </more-info-content>
                </div>
            </div>
        `;
    }
    getCardSize() {
        return 5;
    }
};
__decorate([
    n$1({ attribute: false })
], MoreInfoDialog.prototype, "hass", void 0);
__decorate([
    r()
], MoreInfoDialog.prototype, "config", void 0);
__decorate([
    r()
], MoreInfoDialog.prototype, "stateObj", void 0);
MoreInfoDialog = __decorate([
    t$1("smartqasa-more-info-dialog")
], MoreInfoDialog);
window.customCards.push({
    type: "smartqasa-more-info-dialog",
    name: "SmartQasa More Info Dialog",
    preview: true,
    description: "A SmartQasa dialog for showing More Info for an entity.",
});

window.customCards.push({
    type: "smartqasa-time-date",
    name: "SmartQasa Time Date",
    preview: true,
    description: "A SmartQasa card for rendering the time and date.",
});
let SmartQasaTimeDate = class SmartQasaTimeDate extends s {
    constructor() {
        super(...arguments);
        this.time = "Loading...";
        this.date = "Loading...";
    }
    getCardSize() {
        return 1;
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
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.hass) {
            this.time = this.hass.states["sensor.current_time"]?.state || "Loading...";
            this.date = this.hass.states["sensor.current_date"]?.state || "Loading...";
        }
    }
    render() {
        return x `
            <div class="container" @click="${this.handleTap}">
                <div class="time">${this.time}</div>
                <div class="date">${this.date}</div>
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
};
__decorate([
    n$1({ attribute: false })
], SmartQasaTimeDate.prototype, "hass", void 0);
__decorate([
    r()
], SmartQasaTimeDate.prototype, "time", void 0);
__decorate([
    r()
], SmartQasaTimeDate.prototype, "date", void 0);
SmartQasaTimeDate = __decorate([
    t$1("smartqasa-time-date")
], SmartQasaTimeDate);

window.customCards.push({
    type: "smartqasa-title-card",
    name: "SmartQasa Title Card",
    preview: true,
    description: "A SmartQasa card for rendering text in a title.",
});
let TitleCard = class TitleCard extends s {
    getCardSize() {
        return 1;
    }
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
};
__decorate([
    r()
], TitleCard.prototype, "_config", void 0);
TitleCard = __decorate([
    t$1("smartqasa-title-card")
], TitleCard);

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
        transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
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

window.customCards.push({
    type: "smartqasa-all-off-tile",
    name: "SmartQasa All Off Tile",
    preview: true,
    description: "A SmartQasa tile for turning off all light and fan entities in an area.",
});
let AllOffTile = class AllOffTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
        this.running = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.area = this.config?.area;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.area) {
            this.areaObj = this.hass && this.area ? this.hass.areas[this.area] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.runRoutine}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name;
        if (this.config && this.hass && this.areaObj) {
            if (this.running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            }
            else {
                icon = this.config.icon || "hass:power";
                iconAnimation = "none";
                iconColor = "var(--sq-inactive-rgb)";
            }
            name = this.config.name || this.areaObj.name || this.area;
        }
        else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name };
    }
    async runRoutine(e) {
        e.stopPropagation();
        if (!this.areaObj || !this.hass)
            return;
        this.running = true;
        try {
            await this.hass.callService("light", "turn_off", {
                area_id: this.area,
                transition: 2,
            });
            await this.hass.callService("fan", "turn_off", {
                area_id: this.area,
            });
        }
        catch (error) {
            console.error("Failed to turn off entities:", error);
        }
        this.running = false;
        setTimeout(() => { }, 1000);
    }
};
__decorate([
    n$1({ attribute: false })
], AllOffTile.prototype, "hass", void 0);
__decorate([
    r()
], AllOffTile.prototype, "initialized", void 0);
__decorate([
    r()
], AllOffTile.prototype, "config", void 0);
__decorate([
    r()
], AllOffTile.prototype, "areaObj", void 0);
__decorate([
    r()
], AllOffTile.prototype, "running", void 0);
AllOffTile = __decorate([
    t$1("smartqasa-all-off-tile")
], AllOffTile);

var img$N = "data:image/webp;base64,UklGRg4EAABXRUJQVlA4TAIEAAAvL8ALAP/msG0bSVL2+rn+K/vHFnC5IgykbZPdv+aXcdtGjrSX+y/07hlnrPk3m7YNWZNWd5ghQSIJTJLpKBEtIEmAJIhQUBMIWREggQAJK4ESoIGKaAZIIUCC8PUhCEwQqaIEreMoUoUAQZAgQAJEkK4N34opCwVkgIRoJIEBkipC0gXHSzJ9K4IknX7VZoAYxnA+VAISJDBQG0MXr25oggBpQEiYtJ8ARauPAqoBAxr07KOQKqTRIEGDhBghFYQKBAvo0anaiGsaA5qUhvjdXAYUCISAjwqEkIRNQRAKBYEwMBAQGAyC8Ost5u/BKhoKwgcWQLjfDENNcAC1bdvOSNI9bYxt27Zt27ZtYzXWGr3PlKuSqrRt23mfxY+Z6uStWnyO6P8E4P9y66ggC39xPyS47qYWXgqKgfNi/VzPJao65Kfrlm6BWMH6k4UdsKuGiEisRo8NHwTPCsRtze4r4ndFDm98vNdR8htnq5bEEwGIjPMQkVrGtU/PnntWxyUqESkfA9BJWMgjXi3uHAoAoV2WvhEesje2lTepngoTxwCtBk9ds2bqoFbA2LQ80ofJajfsqsY7gKGnWC/LzS3T+dRQYDdrVyd2ijTVY9axb5t1TUxBzHmRSC0mivMxmCG0ehF3e8VAY5s4UbETT0FvkUSGk0QfTGeyeDSeZ6yrsBAVbkdfdpNJN/fF7jwiux5rDB9UUv5Ga+Ek004Ri3QP+Z7A5PpsEqNwOZEkJl7GGEFFC8z0YPVrjBYkVYzCa5Xbm8GvZfPwyCfH9xBLyt7C7OoSbh/Nn+R84ujOXLzLxCHhzA8ZW0eS68aE1DpqbhoJuVRFvntYlyMrZy0eein3XngLUfcLiRJOYm+arLQ9OBNPlPqytb/Wz1P97EuXlb4Pp+OJCu9H+UP43Vzy3cHWTFmZm/DAS9UXQ2Dweo0zK2RCpazKCSHlDnEAxncWc9sOLIvbd+SSVTD7rmoONEWO8hcWlP4Csx1Z/RLTmuU0T8U3Kvcws6iIxAh875Xh/Q4jBWWvN/PYR8qP6M82czbuh78VUj+YaK3biUo2Yh5bzVh5LrYVEVlEV2PzWfNYiMdjMSvGFF6EyUx2JZE3Gxuw/MZPokET4zDkj2pXS67qP4dgstD0po9HZ3YzBiCi07grGm8AlglRkJSYmFQgxDJgE2tXh7WD5GE6lfwwHOi5cv/hw/tX9gJG/F5M9ZMgvV2jnRTxxezW8NtmzldCIYvoJA8fFSJSKzj55pEjt1K4SiUiT1xkAI4nWtRs/rnEpSUkaK7it1zks2u3EcBZLN6v74HVgoioZic6Lnyi84pAdN/UFZ8frCbKvYbPY+cNDITBC4UZdxHUIfefhwUXolrj/zI=";

var img$M = "data:image/webp;base64,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";

var img$L = "data:image/webp;base64,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";

var img$K = "data:image/webp;base64,UklGRs4HAABXRUJQVlA4TMIHAAAvL8ALEE0obNu2zUF2t9CI/kfV8GJL3lm6AFwLWQ13/gWDRpIUjX+1dfiMKtS0keS4vPJz5g/mUZFJ2+Tr/CuclP5n9wQOdCRCOAEm4XM4SWrJyym/mgqVlV8DIBjz2Hn/T5E0p3t2j83MzAwRY8RMb4DZsXPndswQXm5mzJiZme3neKeDw5fwfXSRq0oq48jzd90Ye+WSdbyr099st6Eiw/4N2UHJca9kjFqSHNu2alVz7ou7ZUAQFFnQ1AzIwiUc8oAubffvLucs2LVtq2rW2g+HVuiFL77pI+5WSVJFSnK/3MMmsm0ni4Vf/+8DBThIHSpQgZHYZj3UT8MENFDxljzlDuYvfqH54mdTK+hUB9qAOZoJbYYfey42Dt1bayf3moBjVmgbuv9jF7461fUFOjQD85RWlYbSBdNBg3HRwa8NUwM/NFT90VuGPV9JU+miFmhPo0Z1NMI7jq7QQ+kE0A9TUXoCeqUx2waOt+QxW6FFNo8cxZrIV1qKaxCUJgV6UPBAtDAHbQqL6WQBvfIopcOZUd1kDpaGUvADp4MLQCQmb34FqUcxBrvSmMvnP9HgRsRQj6t9UY/gFGXe4EiQyqBCrwFA4aDB2PONRHETU54FSenphOAHlOj0kitz60iHVXM9OGr3RVcFB9ZGLvUBZyjOCgsr6qwkB74QKYuNf7j48tQFGdmI5sGqexysb36YHz9o2gKp4OZi0kESHA0BAYqr2gZDl2AHFsjyyKYNMHQ3g42NN4ecX2n62HkN6HsNoqUPbjyZfmlzFWsstVMKGlNtLAF6GD/fNZzV/UIgC2pk5zxZcecUNZuytIRMy+xsC3zpe8B14ItNTUfXVLI6l3GkMfcJdQbq4kilTJYSiGMZUQj2pQ44mWTopLIDyI6hOgOrDtUUU87JOSklUFq71P0X0Ic902oTuQiWuwCXNElBObqOM5TzFDOUpRuXqWtT+689+8L5zvxyrp0o1nXR/MKehT8NsQ2KOfP0gAugboxzUGuZcjF8Qm2rSbQTby60f6uxKx4b2vq3E4k4c3kr7Tg1xZlmJbNdKzESfaWQO2L+f2XRqIW50BIdoCcB1ptxjMOkMlAqdcroeJ6WrX8FqAtxJoD2BErCZciDqRQU/KLqjkIapdoYo1dLBD0dmyuxzaXoUtkxNUj4HLTWHqv1y1JTdaMDIoYLVRmVqDoWNVx1XQmfAPUbCgatY92sdbSK9A5DDcMcIZ9n2iYsyS5ECL24WUAXmERXozgBCpaEYConG5ZdIo9FEjjLIasrePvVUMcxio1m6rDogp3eGQhAQlbJVbGlJQhmYcp+b7WT4yhJiiOhYmBVZNWHpamWrS80vesPPiG+oPZDl1TXi/YXyM7AMz7g3X+UdcE2tVaxEWE0zAJODWyZV/Pg6R908IcJjv5o/902IPl00h3n8bCbrce/6IN/MY1mjFEKIdmIOAJihuyY58Q7zOmpqwd+K0eiVw96UibWxVGWNZRzOumo4KwjPPK8z/hEO3KfrmuDdRUIuUNGyCXMVAg5uK5EyMCG0H8dhd4jPq+uLy4iuHiiI3JDCfqvOTgKxOll347Bg2luSFwuWlMtaij/2JUAy2CEHEKGroI23UfVm0tPpPBAmn3RRwCXFi3wqfw2lFxOPMB4TuFgJ4AH0FwHXRZdDPzRJyFJiH7XNSqUz1E+Kt5Z8WQABw2Dx/XuSuD/z2LigTT7gmnvdge2V5mi5f8fLT2/8GwmOPpN/Xed4OLigujAxL5iDdnqKHGI+CL6pHqfeFEmOPpj1fXRPsb0fsTNwAxITrmN0pZh/P9IdWThU8ZrxdOZ4AS9lbgFuprx3V9+V15fesL6g/3FTE0sm8AsJljubogNdCQ67Qj1ocK70GsGvCMTx+MuNlcnroQugNbp1tWZa6I1NqJ7BhtqHcyqbKVOpBaF6NtEYNkVOmIu9p72tQ3ws0PRZ9Bnq3xOfQkcBo5ArToQfft737uw+N6Za3Qz48x9stcaM0oD0uT2CaatZCLLiTJ0IkpIvuyWDfG1f5R/rfiX4SbOkWkm1ii/bg0aYwFrIOGTOIqzOYKRLjC2mJiGtHKr3IF5NKlMTqaMj76g2ReEnKp3CSmCpDzIj7MzZ/iiWTUr4vZOTS+1E044mQxUIi5pLvR7cZAAzYskJ/dpe6jK3qxCcopEraUS6ZMhw4jlvky+yo75AioMlXzyt36UvebiKdFHyZWiaRO0UjJJUjQU8CdvYyqau5QcnBQf1fDErKRgBdyIyyFLUUloZrVdcFOxoQ746ClSVFL0JUbQXm2zWMiYq5ZVpQArG2xAF9UXAE9WajLvdIQkyTIYCTmZrFJ0u9iAkKZBCr5YzAqFYKVN2CzYyhQwVVgkQKVEE2KJmSgQIWTY9cQlpEQWUdShKELBRyEimEiMpdpmFLAlSRKwZIlTxMg+KioFSqYWK1T9dTZixAJQOV8RYJoZ5wLdEZRVRrFeW6KSJ2JGKkKJ2SIpjgdKXHTEb9kBNJdtEaUoBVRSFyCAFyklRotx2ow5sHvuNleQs5OJJaqAy+ZBs2aVoqBQYp5gRKdKhAwcpGMD/5XGbRN5CSQF6I1VXxUklmjotAnbQqyeXUjXgBbOvtIY5Z8HDcYyo6AFrIAv4HNWQYxaQYQUKz+9Ip4H4Qg=";

var img$J = "data:image/webp;base64,UklGRtgCAABXRUJQVlA4IMwCAADQDwCdASpAAEAAPlEgjEQjoiEZ+ZysOAUEtQBkhoAash0T8XPyO6tviXwBk98BHvAOsB5gP2Z8gD3Af9vfN/QA6SZnQXQLKVMh8d30BuoHsefrso5OBC8rVFfMBMxQOGDAq+BuO67Y3BgAO5gaWgUThpCyp79azgHSqGYrSj6wBbr1hRVvWgAA/uWs2bTP62KG0jGDR/12c73u1/SDqg8wFf8+ekyTHqBtZ/wMA672fy+jfMZnd+9h4/eJf5mABPXRvvpF85NPj6ZvUM745tsesdBsVYvAC9umOZorovlaKMfFfo+zm2fd26aq05jstQqK9tx+M8yZ9rod6Rfu6bA+jlTlJeUYkX6glz3G0Tx9b1ufs28sU3+UDp+Pur/YNJvYWLukgMYYAZfY/zRwHYemPNz9oZDeAcKv6mOWteM2qqjt6Xe0h+2W420UjYc7hX78+F96NMmYsWmJ2KF3N/u7DIIq39mhCwZxbHH3Dshsc4DwEebfoE0znPtvviQvKazezs0oGXUrJxmp7WPQLX7Ks9ZLvlPIlyO11pdSDiBuyFFCbFuSIi35hZ1GwwahQ2pXGxRQR+tw3P0sp/JlTslel+l4QqPYXg89FtGPdLjlcgTMVOd+8xpVGdAukTsFYuweoZ/1dycE6EWi0SPvVoLbuZ9e8IyZmmP2Fuz8rqfYMI1Zids39uC/fNIfEPWZqC548zadawN+QlSSUXIylwVvypfDY/tw/bactfwtoOB7PQmWI51yANQodpjW/NhPUPBkF6vTwbDXRELbl1bIsPP2S7OsMKJUq1A7i8wWX3yVl5xNf6KTPNNrLuB9BMShjfqslxUnLTrZBBP2skzSgYlnvM+QM/ch2GryLmdu174QW+e6G8/DtFa1Xom4mXg1SIM3t2FIOKftfDyAq62kDgdtVHSnomk1cogfPiYewHpwAfmq93dFPpjKLKgAAA==";

var img$I = "data:image/webp;base64,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";

var img$H = "data:image/webp;base64,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";

var img$G = "data:image/webp;base64,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";

var img$F = "data:image/webp;base64,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";

var img$E = "data:image/webp;base64,UklGRgYFAABXRUJQVlA4TPkEAAAvP8APEE2YadtGSfd1/AlvICL6PwGAl62ZCJjM2aY8LbS69aECCiwUMpIkFcB+/nTjcjkHpZEkRV1EgESSf1Sr+QNAoI0kJQtoU/ZfCENoBWb2PwHQfAAgjQ09FQ7ASv9BDSs8eAyjtQYAlwEACUkghHsgBBAd6h18Gsrb/xmynaq6tm0buxs7WXHnbPNkZdtZOfkHbO5s2/a1Dq/vqIPpnj59fVefYKaC8wvm3ODk6Zi1yjPR1QZubduqlbX30487LRBSB/WRklMEvwE68Mzd7f13t+xIkhTJ8qxjRulPKf48IfgeTqeAoMj/0Sbg1P891HDT3uey6aeUARZpDa97mS+0WLRoMmMOtYBavWgZhXHMhQVi9SKlKsSYeamFsHoR8oiGI1olxsyjalcvOugKUUKMmCdqVy86DVKeQwNK0YCabxIgi8wbWBGASSxUVRsHpMAnESI1HjsAE+pNypJIdDaP/x3JMr/UiCruqNEQoQmxvANNWMmElLmh3Zzlzdz5b0Ca+DcNZ9asjtB4ZZ3IgsgLP0eOrZdbvMkkFAA69W9veHe0SYTojHcWHwzMXvxhKA/gqQ7g37RiboIQF0JaBLHNIcD4qutENkR0ADjEUQ92FSHWbu9NFyoOoDXO62lN+E10d9lEiqIUZODff0nCN4SadPTK0sgoys8aOOIqNOU3SVYqn6KUdGLmMHZhbAb8fqB4uiOcebCH6AYZhV+ddpx4sqdjR4Bitnd6itaphgCNQZoqwmF2SAgFAaVDjwc++cmyC+A5gP/2TdyVaghEezI5QCvTNuShFYz85iJhNIBGw6kITcHWp7nHdYXzPVorwBNPjdGlDZD/DskYx7foTKWLT8cqzgsNw/mONsHzYLXVARV2LGz7z+SR6Ewh+7HREOcR12S0qgBb1JRS9P4eJ81iYYkmjuhMkcmuKOhoWgigWFdShAp9mmqgILpT7VIWi29dyRZ1qlSKkKFKKiVKUFfywwoO65XQQqJS+kQcdSX8reCw4hCJCOKQEgEFhxUH1gQXDZNyiAPxw2HFgS2yOhqqCsSBOD+HFQe2iEMigTgQR0ArDqzgAImACobQigLiELFWxFqrCSnAKvEIB2DraAA1teoV/hu4/SpvWJyjvoyX/5rJyz+X6fkynv+jjKfFAQZwWSjyrKkhW8l9G17enep25anZRlBDGI5eyIF09ytbQxG0LFefBQsoo9GJKixKs2EfVR+RgIM/o5tYlJLUD93hs50/kMIiRCEjMgoF4Se/yQcyDSFZQGmEtvCZTfdKUTaAVpV9Rfp/5La+FibPKq1AZXnIF7bjw/uUfijkpqHqmp12F8/xSQBjXniP5FvktH5vVTcPj4UMdKEyooHi/sU3DSkU0SDLAZ87emrJjUJjwAUwYAI513b36FuWtfSHtZ6QgaVAU4bY4iNsbh503uG0/VtqhIDu+uPRZIOc6ueWpZfIEMTNqAZgqwgDVGvHt80chOmNENhpyKm9llMG9voDXnn/66qNfUPEAqIntd0fMTKwqjiMxD1eIVCDOcjZIzo4QMYuH1iPbPFL7ypiiMldiXmnbH+w/BpEqyY/R4qR0zvjPBATshbTp5zytVEhDvDnC1+RGggFrOgshDZ1ylnZENQUGhYI10BKkYSkYve/CAttyo6Ig3D54WjaEU47x/FDVBcaKvp7icNCCQLnCTfurBJiVrIEAA==";

var img$D = "data:image/webp;base64,UklGRjwDAABXRUJQVlA4TDADAAAvP8APAAUl2raNzdVqJXm23bXVtf1atm3Etm3bto2yXRU7+Y2q9+/Gvd/33f+vXloR/Z8AXcDYUrd7887qVKsp+wP7F3mtIvQefp8+kXuVmO+OnDHmI8y8XKsGmBmTmVwMMKXXdz8PXnsyV2LAbWfkHcHnG2W58RvQLO8D+P87kwOHgOPyPPYewDWzi+prd/YDuDOZtUxPGC57ajDmPtmbxwB3Z6n8F4BjtpWY8+S3GOiZjdiXWGWW3grQOSr/+UC9u8PYfzR+A3iuQdZ01EMD4AdnJwCmH4Cuko4DbJd9BYxtsUWBiCuAo6qBLrapGVlLrsPcaNEvsMfRJCAkVduOcb2sp7+Ch9oDPF5trIAZbuJAkXy1M1rGAEulqgcB/gpJ+2CQm5XwmYJtBIanZa7HnKECGOjmM8gLcIWqHwd4u8aillGYPWCqGyAR4L5eQF4e8EfIkE59gXWHkxigAMBsSZoDTLdIRZcZ55ychzaB2kdkjXQAdlqkKUBnJ2kgyHXyeSnwUqNFm4G9LgScMqqgu+VaPxcxB+geMzQJcNIDVhiN8MI54xo/7TijicASQ8ABF3mAoaXARJ0Oclw69zw0GquguwsB4w3FuwOzudbPRYa6QZVxGnCyD9hoSE2vANf5udTSGaoNAWkX6gJMtkg7gfYRW6Q9Qa6C807OYRZapBnAHGM2BAJiTnZY+OykRaG/gLw8oNcDARKAnE6Fnpgjmw2p9h2Ax6t1Y4B8+MzNQCjUTMx1lvRwYKOkawJ8BivdDIL9UvgfgPsrpaXA2BYFKwbibmbASkmqeQqg/UPw9WlZb/MVAibJ7R74zZA2YV5fImtmKl41OgIgxxEgZlHLOFgh+3bwcWA6wAlX+gEG2qRoWtaG5wB+k6TvsB+W83qgwMMe7QJwa6lMrF/HlcWeQLGv+ZgrZT1i/F6h7N4NjGn22Ic5OCX7UOiZUbaTdwH021lbXzTneoD3jsnzKHBI2c/8jf8D8k4Dvyony97wE5H36SuBWG5IJ9cO/vm7XlMAFqcs0ekA1crxPMyPx8wY+TZmpXL+xNP4fS+k1pj3hccfZWqtqepdm/fU/a8LGAE=";

var img$C = "data:image/webp;base64,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";

var img$B = "data:image/webp;base64,UklGRm4BAABXRUJQVlA4TGIBAAAvP8APACIo2narVmg8JK9uyWUOzOFm6p0CD5Xq7pbcJbt3h+QS3Tmy1ql3jtR/TYIZMIY1IDrzWPMg9N+Jbdtqc8MZSsYRH1VX29VRxFZyFTMzs2TWDIpJMvR/Al7+EWRvbguNlQ7tcmelvTU62RJFgWW78+ZKMRRHEV/IU2sBFQvUGgmsxwmlEhFFmXj38M+6HFA6kWSUCgTWZYcykBhUygTWYYMyUOxMCKzdCqWTHIQkCmu3QH13obg8Udh4Bv7nwUEwWyax5+/ebH/h78FqtYc/hwyE1TSEt3cUsp/lAwGxFksSPtPA9Lh/gob/zwpIJvePu7vHh+fuNKTIhHyehXIli8EIvH+JIybzLCazKObVqzgqrs4srN4IFZ8zEFYZ0zoD1B/FxZGL1emhvmDAb3xr9VBvigrZONfooF6+UaUx3tVaqBvNBbA9Nu6NZriOxmzJAni8ma3O1x1Xu78WiRY=";

var img$A = "data:image/webp;base64,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";

var img$z = "data:image/webp;base64,UklGRpADAABXRUJQVlA4TIQDAAAvP8APAM8HK5JtV9VscoYvbOAMs5jAQd5rCC9YgBxJkiTFq7mfoL8EiIIq5293obsqIUSSpNiq3gef+Vv6/j18FwfTNf9q0zZgxvTcYUxDoOAoEREDA0tQVfQpRh0RQEJOGRl0lylKzz2YEKzyoA0aJSh1KoFdBK7K0XMPiUL+KiqtEESQgi0NgkzRkalERA665VTuR/eos9jCQpBURkWtnGpVBQoCJ+yqc/GokyMCyKOM2JGpLFXBf6XkoAaPOblx3yejtFzFApfou1O2Qiy5lYAgypEb/F90qgxvkehmN3xY8hvP//H8q0cd+rHG68qnGj1c7N8+DWop8H4M19Xp4x8bw89luu64qf9PAkEBIlARAwIGBAQOIAIBEv5DP30IREEBoo2fL8oSJ4WkQAmSIAkBQfpxSxIQCJX0gBiCgJAESIGQoO9VASVo0RAEBCogCNCFzg7YHPzauRuJ4/uf4bpYvz5ZvbyiAGnYtply8yapbZtxattJ7TY1Utu25qRbdxXbtq3attvU7v8zsztz6l8R/Z8A8n+rdMTF7YSkGJ1v/MXcOVOTLif6uhySxJK03tEF11b2tKwCAGVa99h64XSsj3a/EM5qz+Cs4nWD7GrCwOrWX9e+zAnxVDtzcnm7b2z7BjB6vXZj9r524eLiBAGdXHh4fxHhizcXBxEc/qrZDtu2faiNcvo/ipW9008ZpTaHBBZN/PZtQlFQ9BZTJexyudYdst1SXHaXFW+yz43aoM7SvWsuXNVniXagLvK5Zw7hBvofBHWh7z1ziLc+ugNlge99cyjgUnILuRkB9y0Ak03TRHuT2lBuxQdzAM2y34sWmWAph4oAYJkQIYg9bXrISIrs6OCZNHs+g2lWidfLs5S/FfeDNoSL+xQaYlyXsCx2SQN9kgcP3XKGOs9959Hm+r2oz7BMz+NwPgPaPHH91LUGUK1znuvdtmBMO8aDFNRiQNPbAUEFr4oLg/yftgRjtTMSF99eLDDrHXU1Pf1K+IASYO0SQLge/8wEoHSjxqVhYNhJPiS0kwFGtEognFUfy3E6f5QX0a3hM9+V8A9y5DE+loiY3dd4wzOJkNKpPsYalymJQaRsR+PMTiDiBq2uYFiVjT5EZO3DjoZ8v6UhYqsSNjRhqbQ0Q0WEV5/bUVeu5KjHOqJI/dlVrYDKIx54HSBK1WXs2XnTiyharZfIf64=";

var img$y = "data:image/webp;base64,UklGRlgDAABXRUJQVlA4TEsDAAAvP8APAK8GOZIkRVJkDbz2tRrcl/XX4KTAHzNXVeeREA7bNnIk3n2u4rv41r7unHZnDDuSbdVKH3luuJMEAZE3GfDlbmfNv9q0DRg8O+UNJ924cXBwI9+0FN4XLMUEKdqPyofXMOukWp9oKXr8qfqlGZ+O0NRgVPSA0EUl8g+FEWChJiwxZlEd+Y8a9BuaEix00V8Q41d8/cL4ekf+UApXdPPximkUnuQzviYavN7CIBAcCA4EggOFQUNwQXBDmJEFjTAKguEJv7CCCn/wFzc0ozEGjF/+eQjDOLIlCDNkB2uLKztzCtVsD04sNsKKhHTowoQ0mJuXBithYrExW5NqXeYmC5MJaQKhuy0IWornftP5k/llYcNdP/isH2/eEd68u+x7LTCEuO9XJ7nz6kH3YCAQ7Z+FDYjU2Dvj0zflFwIx/Ipl+Mybi/wxXkF42PxjJdZCmLYcn6r/n/5f26hQoJJL15cbbAqWQord663t+RpLwa6JXQdZt7YdenPHtmrbdmdiu3ZsJ7Xd1LY+1W5j205+UWZezLt6lJOI/k8AJiRPW7h0+aLZ5qJYrEw/GB8THbcvZ32FENMzonyVpdDMVQIsSZV9CeU9mzQ3N1nyJY9fp7GaLMmXNmGGttaG+1L7JWnKKkum8907j8Z62I3Dgl2+DEM3UIzmleQPsVsdwcL3CEX+QP9gvjuzrcEspCwyr+KB/v6SEWbbA5mkmY17/PzN0zsACvsGBvJsmG0JYZILwOXzv+9ff5W9BjwLiwrGwHxZNAv/WMCu7JPBYDDo/rwF4AGOc/aziFwBvPhpUC57AM5pDOTEyUCZQfXLS16Ld9IFbQNsy3UqH97zwu4AGim7CgDBx3fcqjMopLSZAPDbpPLjGTdUpobJBAGZ8zH+UZleQVfuyg+WG1MifGVfX1kKObDDG8qvyow6g85U/hCanLQmNenwoYSczbNA+KSs7G/Zt7vQbPWUqT6gvXffGf/z2xdqG49edhTnXHtDfV19Q8d1Uc429yh33BCjtK1HtavdQYiT9Wo9TVeFaOsmaDgtRGcPYf0JIVq7CBrOCHGqnqDpmhC32tXq2iDm+Ral7s6bguBiR0N9fX1jRymEdbp0rPf4FXtMRAUA";

var img$x = "data:image/webp;base64,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";

var img$w = "data:image/webp;base64,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";

var img$v = "data:image/webp;base64,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";

var img$u = "data:image/webp;base64,UklGRkQDAABXRUJQVlA4IDgDAAAwEgCdASpAAEAAPl0ij0SjoiEqNfLsyUALiWwAnTnA0/0gHsgVb+0/iSqAfbN6o3SA8wG6Af5z+3dZF6DXhAfCP/lf+Z6R2k37cOLsUlEB5++ap6b9GPrJLq3NalY6Ymrn0Ygqg5H9xsRsKP1Iz+ngMuiVgI9R0NL6zlEPrKGQGELL7ogjJbue2D+w3MEIBhsizS4kvX0KmxFAAP7uV89glugr/ewX+7Bf7sFod/kGMxdKO4GYIvV4oitR4km59gr/RLrsdn1hEsZtnk3k6mnm3uvAIM3g6W7WoPny3DW+1COV5G6TOrURteQwOVpE9PJnbKXlVoK7B5jttDjPsCkysIQEKmoqpy835Bsgj6SfuFgSW9v2n/JEkwvFNOOQrUHHn9Z+ypXVIAAOmkkWOPn/DFyq291PncRXDhAnXekafVmdd57Doa0+zDAgv4iuaV8zuPs73tlk7GEVP/8KTgcDxvhTKk69X3eQjbSHCGne4ZBslOExyDvG0rnYAJK1/seWuUpUn3UV+WsaJjrzt4P7KB4EpZ7y805QJ/YkRrTQqo4hCkR4wBwOp7MoqLTBW2lq8noN9n+LJdHEeaUqRt0rWNTLL6vOFumg+cUm1exezjqqi/XRoDEa6UN4OKz3/LqfSfcHML9z4lrhCNiLLcdGaqzWpKu8/4nBfa8JGZ5uO2m/bSPH/gBFIBI+d1yickG0p0uv6iabzndb3gwZoHrJ8gvyf2Bgxs7bWwNAfJq5kOULo+5jDryY5pufysnha7Ff7qnZbmZzLpiDVbB93Njp1Jn7gzZZ4/m4dQJryklJKvDlc3EJkXzt15RF7+BwxRSQ0i+9oSzHPDr9KQor04G5PJPiERnn9vwMdCfinSf0nrqkHgAXdu7Tsx4qZ82vf77nz/vie3kdq0fWyroTWcR2txKz6U6ktkv4mlQuaMtZtxlfdwq1yhesd5OGnI3onfgs8uV1uu2J5GciHp90PRvAN1caMWis8ODMJBY3R1rVvyHPFbK7Tq7ToR5nDGs3VSXV0569gGm/ezHT+61FUgg5/2Rsb50MnkP0hboUAO6cw+k8lv/jjYx8KWGEn1vXWa5+VysTgtgAAA==";

var img$t = "data:image/webp;base64,UklGRvQEAABXRUJQVlA4TOcEAAAvP8APABo5/P+fn/Lbw9Rsa7Ltmmzbtm3bts72n2fbtv3X4ff7/plrxeb6Tdmc7qr3oxZJtm2blrQ6EKg7ogFG2rbNkm3bNl4t7cySbdu2wraWJFvbDkl6z6k1VS2AQ2Pudq/Att0j27Yd6MhwxB9p2878/7//E5Anv2ssJVjNk0o1Tia7EXBXNfG9ie84fkq3SEg1niCRI/bTb3F5TY7E1+Wgyynvy6nAG6WMzL6yEGeGZVm2sqgqjnuIaaPYJUhx3/8ZzYJTsIUQdoIY8foKH0/y/QDCLrTNkJMtU2nZfeWkWGb3eynKBLKt2/unhRgqTnuIYZs4KiR2CbHfRIvlcNqzgcl55GsrnvG6/ox7WgRkFTzwfnUbscVkE/70ldLKYXsF0FMsdBbdRboFhcyXwynYyOC1/C2fO+4LBTCKStkGcsso5dVzZSx2B5hPeWyM4PtaoX8MGd+z1hwR8BBEv4ftlZTcrrSU4aJCcPLnSHHOXYo5BZtofnte8TgbfcNPwgKKpwfUlJFti+Cl0Flscpa2WuwRpJgvv41mwG7zAk3AXg6nczObcmylvI6SYj46vrogZlkPlcQap8XpJejlyQiiynraf39mTgJw33TBa9VVXsxeQcRl9/GfXUb/sh/1jz9KsR5lmI0iRqNCuqMSl0dlL04q76A8i4JiYnsS+ySZTGpfKmUCUVzVSM30fwFsh291HHSAn3BQGH/FpfUbhwZf+Bm/rNIF0zSffrqtle4/nx49lZo+mlo8mFjVX1pXjBJsrh2Cs78aiTVO0FaL3SJPSoj/IRjOwEsA4LKNwylpeR+qZFmRXYKn4kix1w20veKYyLVACH/71XIVnIJNNI+F97ici38YVZcRYo8baFccPyUiFAjcfUPW6+AUbKQlPg9wOOnQ8rm6PGNw98V/fQeZgt88MtsG6/UDDHAcepvPPa+lknp4KI4QDHmye1rCrHwuqcoCcqsL7k9PaG1BzOfPFivgtGcjQ14NEyY/sOEFp/n36Me5vFoOIO5Dx3pv7WDXqlKkUoK7f3uJnS7SkGVeS1wqxeW/uPAWF+7iyjnoH0NWWT7pj2o0G467VxkA/0DX56U2n0/z4yjSPoxNkPVEF5C5sqCuBE8tvr9BtvRFshkGIK5W9i156Zl5y/f3k6jMXwDCn7/LKcoTkFfHo+/nfM7EnA/HHI+kXc8Vgu41pVUctzN/FFXRvHoOiKupuIZBUsNyKyneFuHZd6DoLR5+l9VyWm4VVQff9w0KuUeIRaEMinSkNbwZxqgOBPqnUxQClg0K3sewpm5lNHykEE/vjeWUUgqpCyaF2h4zraCndzhD8b8rJoWuBsFfmjXRHO4WU7J7ZVE5N3OTW5JFI4O/DE+mKXzYMS1ShIXDgwOx8bBI+1hSVMFKoHKv51BkcSnTDWtGT5JTxqAWdreLnAtFCsX/XX1ya9ITszr6g4qoDAOwgCLtY8nXpVEtzme9n9Z+Cm8U47PavXF+zu7jqUHQl2Zj9Bmdvf1rIu7PKhgc7iwfF4LN1SyFgu1TIj+xYEhgALa4kovKGIVP62jydWXUaV3IziVhuztFRP1qg3+pUBT8oam6kG+tZpiuDyoAJjTxVk0Kw+JsrhI69s6NlUfHqvHhYTFuGTT/N43GGLrHUqIKVheDcyMPoA46hVB0ZFMctx8CAA==";

var img$s = "data:image/webp;base64,UklGRsoBAABXRUJQVlA4TL4BAAAvP8APAK/iIJIkRarq2WPwxP51vIg/G4raNpKc+S1/jMvictRIkiNl1Doux/aw3tvMf6AUJhQKhoYT3k9F91nnMUTwOZRJNEOpD1Car6DMN4e/v+nf8kOs3QIxz00ZOimEogBlnosydlKAkgDvemmNCLoOZfYeopoyFc0ARRGCEigxgUIBilCAIpSE+L2PY78BlmzbaqID7YJLuxLB3eVd9AXygsP85xIrpPqzqyL6r8ht24ZJelruN/CPpL4q5dqh3ivl6sMJKPPB8uAfzQeLyAkkpkwc6lNneuiP8CYlNWDZJ6UUgLuUlPI5+JJS6h5ASkr6DkVMcD4zOnGguOJbANEtX6cckhu+vQY8W75JHoxoMCAa7IDcmASAkM645JCYMv0KgGDTxOG6jXqXSHwgN3Egd8KGuHTUFo9gM+WsvIK45BQ0ya4uTwE2hbFNWGf6r4NqurBLnmD5EUTdRqNLZHgcAgZRt26L8nKonh3jErAbUH8w6NOwBVNPDwGtkT3KoIPDJFfa1rLW5ingqW1wjXOj8wx8r7R1DLhp2qKIXfxA+2K2COC2lC3uAcCfyeXTrwDwWMyW4BLlDf8KCg==";

var img$r = "data:image/webp;base64,UklGRpoCAABXRUJQVlA4TI0CAAAvP8APAP/koG0jQcrw51zf3T8Ih23bSJL6b3j3npgO27aRJF3//f4Xc/4VAgiACDQaGMAGit1xY6OEoIQAIgkQlAA2NhCgSAoDbIJIgmJjs/szMmDYSaAwdqcwikAyiXAHbAIpEma/H9jvJ9jY2Ni4AzZtoA1jY7QRSbAJNsX+p/D/a+z/4447/n//U0WiFMmVQkmuiKRQ6iH8SEmRKJkfiRRJccVGSYorkBSBFCEEpo3heYJs27ZNO1pl27aNpOzcsm3X2te2bVtJPvaevc7dux7zEtH/CcC5yQaPgykxqkS61sd7DyOBEYPNxbXHu8UAk0On3wwAcD+NqP8G5C23yhYp2itA8akV/VM0gIVvoxI4H4DyqjKmjqkBeOEWlzjFgQbWVqkDrU5Y7AyvzUowxuNJYabXnG1586txQEsY1vYr/dCHJ8fyxigMG2cBYN1XN4Ymtu8a3bOGpHGLw0T9+7+aARFDOeWZa5S7XgkQ9QxVTlMeWaVQzYqU37r/oXGZsKSNkurD2WKqolgd3gDiREQOY+PH5N6Nh5evGl09D6hBJkX+/SYA2PAOxngnjDL2z8Hoidmt6nb1Ucb+IVDUxL+pWtdiMuQvgPIvffmAih1NhhIaP4Dy/B7q/tCuDxjK2FvL2VZAzJ6kfM6hlOZXwD0fQ2RByv6qHJmDvMdWRExcIsAXgxRd4DMdIrLyAsKWrgyG97zFbRwNTBHguVWCwE3evqwCDpYQlg0kSB/hXQkrOZ8QQOMT11jKe2lWwv56wqK2MBYBfoZxTO8IcDUmyvKMt7KG/MZuAkSZoOhF3tEUQf+TcjojKL+TdztAwOIxAvzViWkB/5OBomOUXWkx2OpxDUjWdXr8NM41BwA=";

var img$q = "data:image/webp;base64,UklGRkgDAABXRUJQVlA4TDsDAAAvP8APAP/ksJEkJxpE/unCm51ubA4Q27YRJLn/gu/uf2ZEiG3bCJLcf8F39z8z4vyTTdqQuWDfyFZQhHATXLu7voci3FiEEJST8SxwQxGCclmesLkXhSIofQ+FMveiUPoeAQI3gcUNpSV4QX///4QAwf8cFOGm97pNlL5H3FjK/xzA0veAuVff8zuHJeh7KC0BmwVi7uWmxbJ/v4LvOeYcboLt8yFEi5vgvu1GBBQ3InAj1s1ACCBEwOa+2XuBIAC127ZN29FYwY1t2zbLsW3bTrlq3Rnb5o89a5+7z8m3fIro/wTY967t2307nWau/4Pw3y2ze9Rv+mXguYePgK+z6jUb3rpK+0NYWp8+f3FHOWFYTRbyQpnvsa4WO3Fld47W4CAKPYvEmcp2oiLAgzIvv8QSxypaiCQ5aycOnwEpLh05WtyDxKZK+uAFhlvxMNF9LJ6B1GRUFX+/kCRWWNg2wZioA5J0mwpmI0nOwMj2UeCgxdsCsSIfd6IOiZ8KTrdoJAqdRq7pqNhkXOL8G0n8ZjGPI7Ek1+W3gTgQ9UPSXSz+ASXvkakTHolNhZ7ckcT4qCueckbmmYnS8Ou8g9yR9PmExYdQSRbkWV/u3HGQ5HSPxqKy70/n+f15ikMNM5uExGqLuVtK5METr69aOJabWLwSlXbaVMOUyP5natQdb2VAjvYpp3NixVmLr3xUKyNytCvTN7GZNtEqWhqew1JifgI2RsbdVgZXI3oE23F6R2NopZHlv4epG8ztZqMPIb27GNl+WrCsW0hJFCWJaVEXvMyrq3lml3B+HtJr8gUk3SKyxZRhUZ4eeIKeVtyNJNZE9vRJqsn4PPb1YcSPFhec7tFQUjexzLMInP6JHUj6dDKyrSRYlstSHRO/FMSEqJFwumRbSkFMSvz5rHCXyOYQsMHyc6/w4VQ0DIUsj+za66BDBcNwSWJXYTg3IqdHo0OHDh3aDUISM63KdRQEu5b/ww0lnaRL7LVqj1KQ4InKelLiulV9hiA7dKjMjtGsgOsdrIabuJ2NvVbPUeA5HGZabVfAPS/XvAkbOliNG0uA9/L4FbCsi9V95ILTJK8uGm/faJsBI4YPbtj3rQA=";

var img$p = "data:image/webp;base64,UklGRjAFAABXRUJQVlA4ICQFAADQFgCdASpAAEAAPnk0lkckoyIhKhM9EJAPCWwAnTKqgUfI+bbUP7Z+Jt6ZjvzgOXPHh6i/MA51fmV+1X3cPRXvIHoAdLXWOfB/xm/AJZdTI9WRQ8bmk7xu+q5/Vf+D7gPah9H/+T3Df106wfoi/sO10c3BjCbNmge/NdWLKchub1mbeotHMp2baf2KnDGl01oNCtY/Bg0EjfInhruluebMA7RwXxixd66c8FDC0/veEf8k5Gzu1kWfv8OeeO1QAAD+/m6efrMpkNEennp7mJT2Ye9ab/7Af/laf82evw3eY9mG/+KZn2ntVW3HegReRHHOm3Uo8lQiuo6YrvtMinq1sv7KeiPVwyrnwgnlVDa8bd6AneODX82zFXQW2nwM2wvAJbhxvOCfb/dE28ZkLZuNRe1L6or6+jqPCFlU0PNj6gcFLoQQ26ZhwB4TL8VshZ4Iw2hUgtG3viXMO6wu5f6eIQG5I0Utp5L946+Kv65BS92FEUkTgl6hXMX1Bv11HnmKJRF3KlIfd4rqZXiXh15FOJibBabXrIY9A1cMT5FXh3hsgEzknQP7knZys5LyeJNiwTJn47VPMCt3Z+fsxo0Bv/iBOV7a4Jr2P1MPGjLciYzyj2grzHbLWY9i/z93zHA753z5/W0TXN0+bE6F39qQYMMEKmy1DMq/1JuY6Ir1T3cuFlTH7b5UOGid6A956eoKevqx+FU2iRn5QEHndpLspghdyKeGjsDcSI7LDkTV2Va8oqj87wNdKJlhetUsSrSGazlALJc4ghe6SX8PP4c6MFujGwV9tgcjjhd0r+3+61TUJdz7xOIAPM7524Zidr5g+NzxyQFAydQfAPVm0X5/1O0zFqiObOhF0vtnZvZmSDK06nrhyJ2iLTOwYzqVoILiekxd60lvUSPDzsf8zKPfOqCPwdQckxxe08J4v9P+2Ectd+99+7QmDOpOyPTV/PpzO+9xyoIqiBf5HgjzCuZrj8FwhX9B3QTSsjg9KqC2ElZW3c0a6EZbv1zY+I1iXRGlD5MdNY99zBklwgYSENZB1PH+SVE0kqnMUGrlJ+RvJDoFDqtwVtzQqvAtvxED8KFbmz2E/bt+eRuYucnTYdbe8KAR71N+WowByY6GX23vKpH+NWCa8x50p2nelM/rzF5cc1FEZpVsG9bU+KR5IN0v2EdJoViOd6qiLVFW09j78ofjneNajbYbVe+NjbDSzGt4IppGji53aIHFc9cpsO+Lx17WEK5soZxeULGpeRhcoufRc1ChthocYBjuqSosWBXUK+1NQXvuMWfSM75AbOJcqCXGP/MzPTQaycqRE62LU4At0vzH2exzCCz/hmK8o3HGmLjxg9n/T9FaqfzWjDQtd9yVZTzZQiMoraXnLIiLCnqcDsFkldD5zQvSHeOtTeRNfi05yn9on20LqKabb7wZohjxYULFjkTyD2UbVOIzRnSfxFqR1EteV4kFkGsT6BfF5X+s6Oa76DH55gPEdOqDxBoa58GgEsYrxc2GokzujFfRAVACWg/fQjGGCWfgqTwHkgIr5iHL133r1x1aIcAGPjKAhLzKplb1UzHrRnqmjDLKQDR81x2X2GeEWJ2PBHiFiSIj5ZNEkY2rkAtbTLwxRsWITGv5XKzVwdLRGBU6QfHtv9CnW9jgcSAtPphRxIFxqLhHRonuo0f2PdTcdPKDsHDI1mQlTiGviPE/fsDdjzVMMir4BV7wLKN+OX3y9ZO6/9nBeAB8hL5ofOzsDRbPGmQAAA==";

var img$o = "data:image/webp;base64,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";

var img$n = "data:image/webp;base64,UklGRroEAABXRUJQVlA4TK4EAAAvP8APEJkuRPQ/NmTStqGv7RbR/+DdQlm2bdO2NF/atm2bz6W0P8C2XcqSbaNk27Zt29bzWmPOffMHeswdcR/Sdp75h3Pbtqln73M/Gx2S0rat35zUtm22du47Z/4hOJIct1l6xu2D5ixFJX+wb6iHMcJJzwORVLQeuFYonWrEjaSjCCVRVaECKlMojkm8EVEdpksYMs7ZhOOfe5w+J0q4TORaBhh/oQg7gVx2hKfYbkaZqClWyRoyzjshTmIzuoaFRReKMhngkGjAGbmavmjKTUx2FzEI30fpsYOpmnFcB/BDZCyUaMO/ix1Lo4oQRtTstGgC/6zq1fx+DEQPirlUmnEMeZaoCKcr680MQGQP9DqxpBvD62blKevcocGSFMBAdBPqZd9wdcO6B2kKanoK4FWimqu5s6Unh5lQhhkN9GQGabateYcoMSReO8Y3FK2RAd7Ik0oAB5uxrTmHKIMEqSqic3X07Wi8o0xAjoPN6mGXcRSXDyn8ww2dK7QYHejiZm2Wt2u4vEPVAcha5YbUfxLaP/rzcGo5YP6YsLathdyCqg5VbQFqIIDRwJNoE7fW8GFbf75iDMBYoKdj63nVAxR1o5CeNuXDOs3HFAmu0cOouzg722GoPnC1xOgsDZZCAPcznamYXsKKHCawkmcU1dMGE8X8Ng3Sqag+gMsYYwJSTwNAOS/Lc0COzRT1JSKTAai6AsMT9GtIeVd4AapAo6ETdJgAPC5sb2vU7nhGZiQvzvh1fcB1VCcgGogMrDIAiAg9ABFl0mXjNfQZep2gslraIsuIBN1FnQF2tMo4hrQl6iE36TMQmT8AjAmG1RxU28a42+lzHmDEan55y3xJjMmMRgx/hpibAlids58+O1knzlkq/hwVNQhVMSdkBqmDMz4gJrbIRAz/5mneSkSRYUfmKu362yJeqgN4v4iixmeM+gJRDu/tZ4CJ+YZc2Y7y4PMJAgK2j0NFTcrwNCI2riGGA3kRWAU55w79a+0txHIMwD6ebeDIlxqNwUTsVbCDVb8nGLGqFS/pMz0CFEunXd6Zt9WYDABb8ozZ2oIjDSnr525xJd5B09n0exHz9xksu0u/xTmFCUatYZzJnblarb4ApmD202Inh3racJwecwN4l9iX2N+wQsYbF/AVcS5azxoTUQZNE7WENet6tYtvixP8i+AUlnzTzznjLcYbg7pDxDfDZ+fNY9s3M4Pn0R+va1OE+5DzzZ5WPSzF/DBhJkJsoQk5U9ESVpl/06NJ/TNkjP5UhGp/vkdc/sAfJxnwFnqS+QRMSSwEKOpRyoiHJeXvlFy+/83fL4uoWH7R28EpmGUR9dhPVlseEaFEz2jLUE4PejxMnSXnh3Q4vYWMSs3lAhLeYRawzYSJoJJVky1y3QDeLLCCbSZCx1Shygyl+eKb/cEK1ByckfAseobX3xETkArMoLAY/9bp/JMMH95+U21S4JcizSSpfnD4D3WYaEC12R67aYMMelLHa0ela2TyowZGxk2nhbZL2DVnRtBikr1pff1MU079f7HqyVFjDpx4LxTQVUwz6QbCHAoVtFgM0UZcDZgwA8KacpWzAUMPKL8bU5uB276VNRoF";

var img$m = "data:image/webp;base64,UklGRgIDAABXRUJQVlA4TPYCAAAvP8APANcFJ5Ikx1btPgYP3eNvamF9OWn9j8FtJEmSUnun4b9nYMSPhMROdzFo20iSqyVx/GG+mf8zOLBJBWgSkiQgAZkEJCQBSYQkI5mEJETz55FMIIgh2cd8zy9JKmMmVBjyO6kkIElAi73md35ESZJpFKFhQYsxoIWiAclspiFCG6QFKBBQWbCddfI9PyWZgVmdjDIBICszTYEomYS0mUVFkSRKApQtUyobBMQBKCiV38kqCSFDhOTQ+dnpjy+TVJJKIXFnQsOGXwIAiIAY5D8JAWDgeDlOj8tes8/5+H3ej9f99jhfb5C1bZshR29srO3dZG3btm3btm1n81alU1Wd3uqO/ffGM6c5iOj/BLCr7CrjWetpkSoyuDZ/SEtp+YqfnkgJ/WYAIk7XMgXMMUSb90MmnbqE0LJZ0/sBQJYU8ZF0tCLpaIekFOEkKSQATKiwxgQPSgGM9ePS9Dg4t3aXVu7hNYdcIR/9FSHiPmkWAZhTJ0jS8foAuCvjIN5jXE57a8bDtF7j0wurvZGTPZJ6fbalnw70rmV4+R3AFDceHzGv3m0ow/Y6t7bn7Jq3+C1IH4eUvAdgj4pAbyKQ58enlnTOpNeTalt3z5ZNq6Hal+ZT7QXwVYSTVFsAqPi4pLwNn3RO5lv5HBUiKN6oqbYCkGGE88RTRwD8E3G7FeZEgaU/bIZ/GYZ0TgN4IUmKyiwMbNgEwGUSyDvwhy40pPgDYJ0h6ewHMK8c6GGlI2L6AEPKm2GO51rSHzQJlYKk7Q+kOYIU3xB+oX/l4BcRy+dmTcqnfT2y6sJol3RuYGoNSTpHAbQZTapT4X6dP9C5UsZA4ZGk9EiyyiUpKvFJhjAYASB7n/Ft45KQ5cHmqx0Xn4kY4mhmjrIMK6pbEFrcMqZhOIDyulerz67STLBQuO6Eo5SDQwBs+J8JYKmV7zQTrReXBIwsgp1FYY6YlwDwWgomXnuMWgUPN81dsMOl2Q3grmQKSm2MImnXdltWw5TWVrNLaQ==";

var img$l = "data:image/webp;base64,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";

var img$k = "data:image/webp;base64,UklGRnoFAABXRUJQVlA4WAoAAAAIAAAAPwAAPwAAVlA4TDEFAAAvP8APADXRjba9keQYo7rR2J1u9Mqe7cZu/ll2Y+6O/1pnbwBrUzOD3wa1yQDkqaaWv7UpMBT6Y10AVzUeNZnNJkDVoVwU1Nq6ACi8LVpbNT6oxXiUQbS1/m8xCfosZnABoAqOAAAEFNu12Zja7cZmfMG27Trbtm0r2+Zm04HbtpHktLN3fKT/f+tO/xm4bRtHLrLZ6+77C9oTJyPSXhjXdqF/sHl2j0vfwUS/oR0XDPofeWApV5bUXNJwSaN7Silr8vKl71GhvzDKXQvwHgK+pYaA33/XSCz1OUDQf9jwq+H6qM2ojVRSG052ZpX6rY1hVrYFR5LSksJSn30WSAJEHlVS5Uath9WamVmtJT4+rUFWugVbkkxJbm+9tYEoQOSJNSA43QsSExMl+zOqftQGgm1bCY48vkKWh3o3hIyML6xwf+2x8VDkcSX4khSprRAzI9Pw/Gye3dodhgEuNwq+g3Gmu1HrRmMk2cmo91GPYcSBaIDYiF+CqwjVi0o3jFhyaknR7XgxuoAhSS0QVDshZiSm+PzUR0bsqwbIvN/HdMumpSuz6WdtGKNBIsBckLpRa3HEyC+kZrXTceM9HFZiO5jlDpFjRozPThFW+hv6HVnJvmdsNkBsr4tqNc45ZMfJVtbhr1p/ICvagiVwY20I4AJPDRGjQ1Yr2Tr9609khVswNXbdAjKPkN0fYHoQJK6C+Hjy7FVnBVvQBG0E195KXPc6mTjsmBwTn1ojfNosdwuKtiGWRAYzjJg+xWQsONmdrdN/lrVDkibWetBirSRRwNlr5dKhDYuYHExesbPMFeAt8Q0eexuh2etmbPIL5JgdnVqlfrPoNUD5BuPGATXzw2CyBclqK8RIzJgcz+i6+lBLdE/AYysJHYLVqWd6GOSq0h3Lve/+jPZ3gfHlhP1+Tw+1fsF8+jSxzv3uFmAezoGLtzbCcDClEGW1ndIiM77VbWEwr6cnwF2s94chkJ0apnshZ0RtxNBgTBGiJbG9h71uvZUEChj7A1xUuLLk+IXE5m47BYQS39CzWTuJUBxMKwAo3Qk6ZGZ6q9ej9ySmwWezPsLxq069GmZiJD4leR6MckeSCD2btxcElJ0pr6I+atOERlPL7jZSwPW5tR4SX956O11oNhJ3cjLEyER06bv/d8FjO3mlh4k+v1Ob1EaQkZlPLYj93Q1zWGPYPjHFBdYXXsl22BjldNOdOu4Ad6ns7oCSwg31nURMTHg+AFCAWpIIbvwkYLjwwebZvaThC8TsHDeLcg/G+bmFxvqA5cIPdTb4PKgMEl3qNlBie+6hiw05/lv/on4VGR0S74don56D3rfGayLk+m/thnZF8DNufsZmqHEwRdDZzBlDvosA/FiPGh8HVYZEl3sdlCTCPjcqXSwC8eOsjU+OWUhtRVAcoQnaxaQIQskK/XfKMRKzi00OZ3sOPluFvsVG1ZXsjzEz8+X+iObbUqZtshtCZiY+Jdm6ABp7b5ZZ/cC1TFzZDwWwA3GA7ztroF+QZ+9HkR0ycbqX34TIYO89w4wx3Tr9q5U4RiZ2zaJYsPe99Sazeh3+TraHidihu31AN+h15+3EZK8IrVeJiJDpfCgMFBcllRFNEZ2C6au/DnnuaU8RiqOSaasWE5+e+Hjio5Ps5+CZa9VW5NIAsZG8zqrh93L7c636yirXKG/lGZVHVuFWR7NK2gN14VN5/Mpz17+j3sc6+LWK/6ywf8lS3oX5ldkrf1D0NfQDnvrnqMzMdt/eezfVdV230xmMpldkg05CNAMARVhJRiIAAABJSSoACAAAAAEAMQECAAcAAAAaAAAAAAAAAFBpY2FzYQAA";

var img$j = "data:image/webp;base64,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";

var img$i = "data:image/webp;base64,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";

var img$h = "data:image/webp;base64,UklGRvgDAABXRUJQVlA4TOwDAAAvP8APAO8GoZEkR1L2gThYxx+Jv+l4QwKSJEmSmkjM+P8zOe8gdVWGg7aRJMm194A4/jSvM//rwCb/QJIwiUKSBCm0JGUkhhIAJjQk4Pfzn0ISoYUkEZCQYeQYSEISTJ5EATE1oBKx7CYBlRimQQIm7ACSkZItjJKPCv84lQRkkkRoAUrJlGFOg9THCMPsJhlHYZQK0JCksiVBRnZgkpgpZCcWZkQROoDKwDaWYTLEQLrEHw5n45fLzp4stAxo6pxv+uGfTE6yTaTvNMywh1nO9cz9UQMAsgAiICYGiQAQGRgYQAAAMSAmzv8FRCIgBvnCla/b/Jy/RL5v9pwzSYT953iAv9xv5/P+A0Vr2wxJ0j+2bdv29Ni2vbbtHc+svTtrto3/n4jI3OiK2qjstXU1lZWBnAuI6P8EwA29dY9BAwcO6NE2Fa1mHHj+q+ogF0VRWFt84di8tn4tfrxaSY5IsYhcqPoXilr50u5AqeZIxshVxS1dvDhYJZEsowxub+ts1jcZJJeyvMjRvS3XyTFGz7Vx0O1tSR6KkhHWRlZy8pIFcyyNDxh5inqZlZEBkreo51voVsHIOjIueDLCcIzZW5ysIpeq/seXnjxzR2MyYqUdTO6RZBN12UPrx7UDABiTNSBxzmBmC9nEr/+Cwr8bkV6X7MvrVtg7kPA3M6zrlGRfhuy8G9N2ysojtz7aZETigQTtqtDFhjqlpOBkUfUrtFeSg27fIdkW9xcqwWRBmFUZwTFukiLr2NApboGmxHJt77GzVx99+uMg+gAA/nBAmf/iHuPJMosgvuvSk67Ya3EVaLCkQLwTCrvnTVWUGrUyb780UHM9EvflPcsN8NMP33jmrk3TOvrA3sv7Ag0IkXEhVXD1Z3dY1QagVY1R4WiHO/q2F0DPgGzL7YmQcdHcLIzUZIBBOWfIZbah+MojN+/aeVOjSe5vgIGRoyk/fP7w5smdIXZ41iTzjwe/DIGk49JgaJb7B6CvTJOaDtCuFj0aYRT+CgAlvnQfPeffLYFJY3sAuMjcTdz24JvlYVYpSYZ4DQDglHDV9yMtOUOyyZ/IW6hcPdVM1uW2vA6Nrs5ze3pYHlxkjl60h9cgdo1Kizwe17YOU6L7xcGdIh38LBTsE6ZDTygEd4s08EuQsFMdpkANTQIbc/5lboHkL3Pf2Ptg2Kkc/cJgsAlMVehVy3IwL4p8iv4Hm1sjf6ITYHeVRj+w5RDYnlXHfWDhCrDf7XXlTn4yApweUdwN03eC6/7nNbfHolfHgIcTzmqBNlDoV+aAp/1Of6YlzyRBJnXpbaPA57F7zlXsjrv6fVh6+fAkSOFPcX9O7gY3cg==";

var img$g = "data:image/webp;base64,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";

var img$f = "data:image/webp;base64,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";

var img$e = "data:image/webp;base64,UklGRswEAABXRUJQVlA4TMAEAAAvP8APEOcGKbZtV9E+jzBljozsAEN47/TevbuzBri1batW5pM/iCyCOiiHtompwF3vv3vLjiTZtaJsNHwqc3Aff+TqPeU6kmxV6efv4fBFHERKbgTg7u6iNm0DZkzPHQAKqNqWFApF/CCBUCwmlJ8mA6UlCw5aDAoZExOKxVLLwT99jKB0Y7CpGQIifn1kZ2MMH3//GKoRFJqYYDksI7NG2uESNkTMyHDIeklJJszJwsx/+Zm1HCzkb+Y8DM54pGconFBvMVRj0yMOPKIYDGxZI5S8TY3M+2M5+KT+spsX/LhCkUX730YUhAVBQejAF0OLCAZKlqnlGDslm8OMcXntr1MmUCgUAsEJjRCIwAjku+nXA0X8+0ARoqXlaDbuYTAxmBgMpvzxcfXj1/octsd076E3oIvWYX0ZsjiHA5zCuwH9EFD3AIKuXeq33UzhX3Qfd3XWyMv7H8/Te33CPHC/efNx/WFevFuXv51uX4GitW2GJCmrY2zbtm3bts1SbMc/tpXVKI6n3b1227ZxNYk/MyNuIKL/DNw2UpQcM8/MPUEyra2iKDfT+fzOnefOzNyiCpvE16r89Aw3UEoBQLMld0Z6fhU/itMcQG+BgbcoONKK+VBAKZiW0gLrlDyhYEn6pMQaYdkusKwrO8wC5RS4SMtNk2cHTtrzTJLjAm66ckxRTYGjtNrMsNJybYwH83RzOc40WqHcDty14/sJoyBAGoaRDULMxl4WlxhcJXqegCCf6CikoqCFWsy19zg12s+UKf78+z8+FKukgQn+aGqs//c2jyZNodJhhr9aGhp/f8QDR6Uk5YMp/29t/ofP7HxJSjeY8y7SF/UQAFJTQYPH65UVsIMwmpEu2TJuYbDA1dUrt/ki4P3l6w8VPsTsWb7qWPxLDR9i9i5fdTz+BR4NMmwVbsAI7Saqhz2x7WYEAORLHYji4MevFeSL7YniIA/euCuKAEM+RcZF/3pz+KhPcZ3nBuDVM1LTlpJ4gPT6fhve3CA9T6Qk7Ce13wG1KBedE5rY6eeHP739+jVchQVmkqceBr5zZGsUBKcRv3oQp8n2KHRGbhZKElnhA40q4UlkURAAWOzI0V+Ug1gSAAAWP2zsF4aR5cRg38iGSAz2jWzUHEZgXo8Y9pms1xxEcGGfH4DhfA4YX8kmFOQwAnO6xyms0zK9dwxgPr/LnwUG3L3Dh24WOnee86FrHDrZaMRJORGeRJb5AYAljOiPQp2ZvGDBqeSjDOA7SwbgZOaaZh5Olzh4d430PvNL8kFiRG4R4GzR036WyhYtMzrEAXguENWhk/vhk4sq3ChDjsq6N2jCjkjkMCJ3TgoBgPxt1+Klh36bjS/irrBl3EIbj/4IQl70MLwhBgDstsfnlUNTBv5g6HdDSucWNSJiZAZwP4bM9+PfLSmfVysfIed/eH0pdeTKB4PvZpWDE/cj+5Lxm9d0JPsC6He7ShM3OPng29o+hIw5GWJGcUMq5jbjtvdHfOIX2UTckjiGXcaYqbgpFYiL2wXi8wYdpcLyFuF5k/i8TXjeKDxvFZ43C8/bhdcNwusW4XWT+LrNkmU86kbLFlqrWwuF183crDRXt1dKfLVVFOVmOZ/fvfvcmWXpv4EE";

var img$d = "data:image/webp;base64,UklGRsICAABXRUJQVlA4TLUCAAAvP8APAIfmIJJkV5kfAAv4l4C4fLtDEgGhjSRJUqyW1dJa7PdfpR20bSRIngfxtJ4/lr9r5v8HDqoBKhRQyU02BtKNISjA6MalYiDdPP4eucmNRShKBUEMgRgGsAjlF6AsMctSFGFHUZQsSjdZKGBuKkpFUMQikUpuhGIsEswNpVCefw/DJYtFzE2X2SBzYxTXnz9ljYghKgAZKbIR8/9qVESDJYIsscQsjQHSUMTtBrw2wHgujxtkiYghGophGHR8wGIYoqUwEoawNAxgJIybGAYdBFDAv+ggFEAHUD6BvwsCAAJYAAWwAICwsMPng4/X+fV1en5c3j+Qdtu2sTcrtm3Utm03dm2ltvGc2LZt2079m2J8zhgR/VfYtm3DrM5HWEISa/19fHx8zzosnkOtWTmdLWXtH/UWy8EyKdp26G9YUon6FCqLQGkC3Xal8jC4Phwc+HQAuPLijTtw7nnw+9uPn1wHtc/Bb9fNWTNwKz49CM++hKziiPpn8CC71A8utkcP7zlRkf56wmB0w475NGJD8y9s6JYy78PNUhrI/fgsH9xapW8f5wujXk3olcrtc1arYRKUJ2PGP8IS78LxEhnSvhOf4XGmZbIWgihd7WnSulm3Wyp2gnmrVK6+Fq/EFEjZHhZIX75keGLZLtVrQL9TKrZejZeEcKlynCLy5Xw3jbhVSI+dyrAUnwS7Ommwvhkff/ldkgyvnRT6D+iZj2b4EBdaxaXMkHIdHsWH1nAvPsuL78kyvJFjpdJgp+WdO0+G/UrqDc2OuJC2uoSQsf9Tv2l+SZHhNUbjInVducU11XN0ZKjuF7BjpObnIf2v7aWlde0r4GlnbwBofmut+bNh93hFcfnoUZvfu+bGwtVpOcCKVSu3gP2xU+tVAVtnFytAa5mT0yYM9p7ebwBmpiwdCQAA";

var img$c = "data:image/webp;base64,UklGRqIBAABXRUJQVlA4WAoAAAAIAAAAPwAAPwAAVlA4TFoBAAAvP8APAGfCoG0kR8l87w/knz+8oaGwbduGyv8XdzJqG0lS0j33DJh9LX9mPf/RX6tUqTKuho81vDCDEDghIAiCEBAWEAYbBCkgKEAQJGAJoBRUBotQqTAJ6jRAgtKoC40GhcXz9ZOg0NISaTIM0qST/vlAAjRqJEgSIhnyUxIkDBpAEgAGTRNKirs7Ke42d8Ph/y+qJbmxS0T/J4C092/eyk1l8c0gp6mMb2DcYUtNfHICAPhI5nQU8Q3sjQdsyLPi8zO4/MxkpRXNd3BvPGJDVHx+Ac/fmaycEr6Dn4FHbAqJzy7g81c6J6GEb+C/cY9NtsL0BKwf6RZTYwzcQWSqrNmAbfXva62tsTxut9vtj6vr39b1PsJEjWg0Go2Ybl7NqPsYcdl2Q06HYYKYuV7MCmnatVPEz/KMVdL0m0+TSL/C8IQ1UmR1FhmS6hNZdVIm+ean0+sr740ARVhJRiIAAABJSSoACAAAAAEAMQECAAcAAAAaAAAAAAAAAFBpY2FzYQAA";

var img$b = "data:image/webp;base64,UklGRtIEAABXRUJQVlA4TMYEAAAvP8APEGflNpIkSane48cGXMN/GW337rpkPHDYSJKj9N4/kH9cJOK9h7tpBW3bMB6D8Yf63UaSpEi5J5L/3pwdrDI+80cCIIAAYpDpdwTEgYAIBAsGAlIYjf0HIiBChYFARzkFqQgZIIRMzC/C/sVAsHAgIA4EgcIOogiIE+cXgQ6hQkAMuxCcSSMFxbaCQlhb2miHQEdYwYDwoQG5LBiNFL8jleML0icKgy6g8IXCDyFyvBCQ1RHGB0J/rAkaWUBxrjlu8CEQCATEeCKIFMTCPwXhwwhB2qLI/d5kAf7gFlzBKdiCaEMbAC+x7Xg/0H83clC0ts2QJGUjxrZt27Ztru3NLcYflWUz0bZxldMRf0RU7QVE9N+B20iKlHTtMQ/eEwxlWyZHB/tDYYBwqH9wdLLFqK9TI70BEyilAMA9kxnoHZmqG81jPT5Q0tcz1lwPmoY7KShLO4ebtBnvpqAl7R7XozVogrZmsFWDiS6oi10Tygz5oE76hhQZMKFumgNK9FHAiTk5N6nxYn0q5yWh5WezCblQ0yj52SFT8rac82TG4xmNG2UPmPBJ4h4nvEmm8WT467R2SeIdJgKfLZ0XbcUIyrKPiPzDQMMg1llM5Wwt6b3euNhVuyWPOIhkZR707G7iGaZo7JNIVpeZJnSYH2c6AaN8GUuNjxVPJBNxS6k6m2cYoxjZV0jWONw1GfeHB7fP3rr2oViMKZyMzdADCNH3skTsb/YS0e1Pvai0embGWB9GTpbUnxsI7sK3FWnjnTKMEUDI70YeUQWg1ZdE7h5PViOG0YvA/iUCyysMqHuCqLjOkdBrtAQQkqcFFhcY13zV3Cg5G2iZNBG8uQJ/W0Bd1RByMYu3/clR7LKf8BzJAtSOEYw504sI5s8RtEYHKfLMbwR+i0DiEUG4G/cqTvHxUpH1NtryBvsR4lcEOihUiciqQoJx42j7TvGtfGdh9IcQEnd4FtgQ+QlrfwzAilsAtGOzwME0RigMCDcJbztlDG++tW/vfbIBoDqL8LYBIhaIPRcwGZR28M3XBoDSWkLIigxA8qrA7xFQMvK7wNUkQGbFF9aWAMBezb2ZbSVg/wm8iCmeeAKzqgBgf7z3fQ0AnDWElzHaLnAjgSVEEdIHCO+Wdir8WMwVQ36MgL2A5w4CDfVjWN+J73FXR4xryYnCaiJSBdpBeK7EsScapIBorxff5NLHRafiJe4SxIcJiPwq8CaKtdtR/M6/EMwl0/MI5vEaQPaogJ9h/WbSRCt7kai6z6Vg/UV45npov20JAKq3STUeBVZYJnA6iY4bRi/gOuuUOOV+SWU5EfgXu9zLjZuSs3sUeFmhAFWkBezOScbNKZ+sKm/nS9jwR4pvviJZ2bht9IDMqPdkO8Ler+2ILO/QyaNHmLekxorFD9dvnbl9/yc3Y4Esr7Pyeau5EySikyXfv1ltNZJLZcm8Kc7berIylhM2xedtcd2gSWElkv0ulawbkHWLFqWtePOVrFuwdZPWdf8oB4L4uk0D6yuRQ7J0tUrWjRqHpMAxVxLfhHzdqmzmGMc5RxJzSGHdrF61C4TMflahmutmw+jTqKSbc2LSdXvD9w0N37c0fN/U8H1bo/eNDd+3Nnrf/H/ctzf8fwMD";

var img$a = "data:image/webp;base64,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";

var img$9 = "data:image/webp;base64,UklGRrwCAABXRUJQVlA4TK8CAAAvP8APAKfjIJIkRarzb5XpYaHr0YPjRpIUKcd/P5dfcDBUybBtG0e6/Yf93t/W/AtIEhxQO9ItQIAUIAEChBB8At8JhACEEA0FfZQqKUVSfYbq/ru1EUkoUIlUfcazvlSmBBRkFqL2nyqppBTHvUvqWV8IUVKlflTP/6v0T0a1GeM+Udzem6r8wlKlfjKVqLWo9ReFUGXI6LweTpzLTQASwNAJgUAkCAoSrHyeqIOCgkAgEBQICgoK9AcCBMm27ahuZGa7jHKYmZmZOSknDWZmhv8fdJ7U68nDTCL6z8BtI0Xprvh44N4gf7IViqfyhUI+FQ/1h1ixcb67tby0uXveKMb4CTcvF71Gu1MIp93oW7pqhpnJvcxoRRCQgkIz+5RjpX1oFsq9Hg8oJKyHbUZ6G1pAdWIaFdBu9Pj6G0ZA6G6e9YBk2ODq5g5xH9xzjcqCANw95Dkg/GQFjP42Gn41AJb5JcxBc1ZgxHxVyvKqi7iPmSaHuV5qgHjTjxEp/76bgZi6jKmnuES0rpWy/KfSmpNoFovqfa3hDWKsH3+++f3LRhiwtxFSS/zcSLTrJfQqNonGeB5XS2rXjjG9tcoK1SoGjH03pZY89Yz+sckphabHPRjnVl4tBWon+D1YQGxcLqhmmcJmRDJTLKkmv+Uk6unDnUL310RxbuYZt9hOshGFMmc2xi3xCyOxMtJVGllv1E+eiNNuzUfJbxLHJk67lcVFQTRDzU8pQ50RP7WzyOG3WsCy7GekTB5RR2quOBJAc4ZqBspfn/Vhqp1tssStFzNleTu59IGFuA3rU5g7bvoD2dqgn4ybbHGb8tPtPRsZt/uQN8DhACpvsOYtq4D/SJgP27x582lWQ+dN7cxLjj1vXy35cN72Ll42w336b9hcWt7avWgUY33/b/nBlgQA";

var img$8 = "data:image/webp;base64,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";

var img$7 = "data:image/webp;base64,UklGRsQCAABXRUJQVlA4TLcCAAAvP8APADcFsZEkRVJGLRz8++8uGwG5bSRJkhhVPXs+139Tdxi2bRuGSrb/P27m/wwOZQ3lOp/Pv3V9He9V2cNxx3HG9bGevznvzx5Ljd44z4xkD+cdOf2v42aLnVoQFuGrZ1tEJ4Q6ofew6DQm18dKjpMtFiCWjUDuz7EtqJNMLA1lJ2ABQgyycTwLKkHsBIjFgEkL7Iwtxw0BqCScbQSLCFuOO7aEv1YQiUiCCIkQIVREnUSEigh/n5/Uv8JXwH9pkYhQ56sooY5IwEIIpN22tkbNqQt1d3d3dxfqTh3XupA7mjaMhEzHU9zhjwZCV7+zVkT/J0ATRwZ8BP6HwPjs1NdibBSr40dz5y9PKOYx0s4oVqdibnSUZO5bW2wciaPA+bik/E2A+66hwMeLriG5c9dkJWVvANPLCoaUPAFcsn05B2AX3LWUXwY718N+Vwpyql1GD7hSaj6sWwKnc7IPw2a4/dtPgcnDmUyVrZYrrLbT2cgcnpoKwKH25k5P/Cw77LTbBG8jf2EobZfb8tsOD9KtUakdkmEp8okpRQ97Cz2eLGQlmRWsctrhUcGOynf0DXC43go3sDYrSe1TySvAhqUsHwE39I7jtiRjEDojr4BjH0xfsj5fAKqjX1hR8AyAqwCb+uaxx1POQUeSBqDbsBrPADUhX7Ji3Q9ZkO6G71HJqmZxVgE2pNMbAdcogh2WrNfsdSQr3nWHhWlfhdJYfx0lOfMJ02r7BirgfcSTUmEfuGq5yqKfbQMVUBVR8V6ms4nZOT/2FrwvTLlHGfV6WhIr/0jdR3ClwnaYBZS2yt4GM+G56UepazCjzJGMwsuVsLsiJUknb8Uko/2cI8l9XAJbKx1J9mWY9Cwt/5bbmzfljWb62p2IvDFL3pi8Zq63z4nI29LeWzQ1bkNjG/rXhqGxDU0cCQA=";

var img$6 = "data:image/webp;base64,UklGRqYEAABXRUJQVlA4TJkEAAAvP8APAGfmqJEkR8qsNedAHH969/ZXvRwEAilsgxG0bRtnP3/KnX+1bdswaVsC5g2WQGYSGAwe5JBiZIAIRDMEhTzlYe4+4ubZRFklEihCCGV3BEbn1Vw8EREgiyyyOQoRKGIRoYjFEUIRFqEIERGKUnCKEIujlF6JIATyv9SPlEEhPgiUAAkiSqSkAAmU/hghfqoqftwqKGNPGZOY3MiBoCzyIw0V8YEiMIoArW3b0zZSv3B3E8eOO8zQRsPMzMzMzMzMzMzMzEyfJUVKV6P9V3EaO3M2RxH9nwDyV2OFbZmmVS39ZzROhgC6jpk0aVRHgLBZUWyp4L/zz39UKitlVom3JydDuKyYbOh7SUhOMS/lCk+0hdrFkg51vqs5Fupwdb5+rDhqwU7F0FOeWQhNisCyX/xGz/UVqO6b2f4HRx/FO9P2yWqPDH3ln5I1fall/2DoM38D5T6k4QVH3+V58CG08zcWoZ5heGZ3VpjXYZyL3AxntBAH4w29grssh4ms/vb08rH9O7ds23v4/N33TMsMqwKKQ2GPUn01IjrZh1tHmgDBcDQWL41GQgGAjjMPPleS5UFh1/UmeIkjIusKpVYjUmA1MwrGvOtZ4bjtjHnS+J8MIvLTQHIb21bSMIykmaqZJrmNkpDa+kvm0M/gSXKeRER2u6SmFQUw+oybvWjFsnlTBrcBCMZTaUJIvRhsoA4i6n62F6HzHBExu7nZ8H0PfmolpRRCSqUrP17ZNBBCZpqQ8lAPgYhiW6kX8JHmoFBZwRysMuVC4YXxEC8nBN5QRHYr4EEFKKwi5UIqVykyzEFEh6tv6yAeL6WI6HwCD+yu+ahUb09vnDGkW7u2XfqPW3rg5k8tGCI68sfKuR8YImIlpAuzxmTd6MdpCQjHzZRdvUZZyjKiAeiw4u5/giI6QlLM1S3rFGZOkm6qZ7QRIY1TppFIGEmrJiGkLAHW+s+KYn7VvcyPTjEjBMaAqUtWrVk+a0RrgKhZTurFYc4X4Ys1KutG345fdPGLVlIKIWRWs2eHJkLQImkDjog8unmDwqp1VG5IpeAOVpVlFLswFCzStATzZoAUnobKPLkO40JIKYXgDBGR69ejIVRfutGPXhB4R/Mwqb8/PLVr1eIFi1fvPfsqowRFZPr+ji/UjV8NehE+yd3YnbFlAOFYwjCMRDQEMGz/Z80QmXDQXayPe2FOUW4KkrZZGgbXQMRIWVEYdkszrKLuWOZFBaDjIieUtJq+/cyjt5++fnp77/jyXhCxLejzgudjb4F4Gj7BXVD+0lJwRh3HoYwL/eNob0ilSt7SPHJtwpuytsoNHSzQ4f8/HAAlL5mbg8Em3hA4l3HzkqlrjzPoLjfHiMe16/uAyBi6069Q7hWJLdQ+VFEPtoj3cFX4p/YA8bEJvON+yRtAfK1ufuL+yCfQxB9iG2+kH+oGNCJ+14Tz2vGK6t3QhPhfDjNQeOLIr4OAFKcRPyQELYRJ3AwWKdaGYXvnZy2Y40a50G/XBmPlpIjrxqDftlufKrVSOvPx6vpOkGhCit0uDQC06N69OUAwXkb+0HSdsrIG5C9HAA==";

var img$5 = "data:image/webp;base64,UklGRqwCAABXRUJQVlA4TJ8CAAAvP8APAJfksG0jR7LsnbvPodfv+yu4HGqYf7aNJCnqnj14sN/66D7/EHD+BSQJDcgdSkODDhoABYYLAIABMAQCwDbYtxHODH/d0wExaO5eo41IQgoiBHydRJNVeQGh0TSIi5VFEQJN3IBoAGliFV18ouk0EGISAQgQWVM6hP1kaMI0aSzwkxAB+Bgmr8nUAGoKMCnWmEpjQwBAiEoDlSICRCbrrnbxg0yllAWEgCIsIIQIQIjwk7CfhAiK8nMZBeRv23bmzd12rN18xpI8z2zbtu2tszLbzLd7+5ebN03euj9F9H8CZPJsNVfydChVlp/e1otee7y26S3lWH4jSX6+gZzaUco8fvn0f1scwQ9GHoTaUF3JgXuzcRTL1vR/IBlA01O8j+BUP4ZU+woO9tTIAJqa38joI4UYlRWnV6FQwEfyYC41d4nhasbkN5IMD8NHjUR6iwwXYgh+kORDFPaQN3utuRhHseBkSB4u4AM/Q1MqzTWc7axEuyriOggZwukne7w0tA9rNxturVsfuWE+PBFxTpKrCmvI7aU06k8x0XezPRF3IXm6byl5OpdC/igT/goRwQ+uqOIHl1eTU3xJisfyIorGiigaK5IGE7/bIyLii4j4ksr3xK5kBliYO57YNN8SxfWEduXFVu2asnGH4fa/LZFbN6EgFvvFOYaz7aXostjtLjJczMjQHAdabDg/VLyi4ZozRBSGex1D5k/UN+jQkKbnUTyQGyLZM4a/mDU0BAZ+mtk9NFofGchzqGtqbm5u6nSt8hGDfB0EQfDswbysTZLbH8e8s2iT4kkChE2ieJXAvqJNorg/uBN5q0Trdv8eTIdnl0gRl37Gutwh9jtYfefF21+1MKy9OVSvQ0C00j0DkQ0FGbIaKZOVAQA=";

var img$4 = "data:image/webp;base64,UklGRjoBAABXRUJQVlA4TC4BAAAvP8APAIWcbfvPL7vfQW1NbU1a7Zpcb8DabLvNbrPtx7Y227b9XMPv+8+1dRwR/Z8A7SVYVudjSq+LVk3dFvhHrekx44It8IMq012Gdgf2UxdONtvIOHBmKUJS5GirepY3SS/WH7GWh1jPSzW8eQubhJ/9uc3PIUR6w9umlIF/nFUlcHR2k3yR9SoPNMwbSXIC7zLI0LqvqcYg0HOaA8LDw50vMpvPF63/TypWJ/Nr4n9h+1IOrzbgHZ2mtwY70ydCv3Nkadm6v6F4Q65w3xCDYdIQB7rJlGxWbkgKrEhy+2qiSJLrd44qAwolOX6b2CCtwI+rD+Cn4R+Pj1+Dl5IW4fGxa3B7o9T1E/hRf4MJgcNDgCOyNn0B/o5JdXzaECmiKlqrLUmTbffsKO1NCA==";

var img$3 = "data:image/webp;base64,UklGRvwDAABXRUJQVlA4TPADAAAvP8APEL/FqI0kR1W9l17Hn9qByTPHgUDSxvXv/DNo20ZQvN3x5/kg/hS0bcN4hz/klmjaRnYqewN1dwwEMTYDQ8Ejgs21WIEiQGS2lGEo4OpZrWEEQihCCUBEBIFQgDIZw6B4IncJFBAoQBmGUhQFKGKgAwYKKYSS6BpFAd/+M1BuCXgsoknrTIGKUCKg8AjKK+rCTqMU4uV1DAoqCgz67uxVMHH6LY5jH1Dbtu2MJN3r3bFt27Zt27arbWPc7ucdvE89byX19qTHPzBJdTq93+ZLRP8n4MO7Hv7+I/Xwd78SGKOD2AhpI7FzNi0t1T5+tuSoqVy8V+Jme+MJ++QSZqdzMMGJ3QA8C7qCBekcTPkfEPezNToo6XRao4mITZJTJhZTvTPjMHBbgxCRSt+ajj6bGoT44YLb5QvmuHEYMxSBDxwiHoHAhMgpjAXQEQfgjP7csh0oYTsRUxu+OeeAV+YMMK/6hY7FPZdIeTsx6Hs2+nnC7J3ACnsGf3msKZL+XfnXIz8DzZuxNSeRSGQ/Ar6ewUZDmWbUN+xSwJJUQOffKJ+PDM1ZbI3KmYRL4jO7A0Z3BHjA81XYk5PwZz2RM9gSldmLIR4RaQcBeM5EZJ4A3jVM/crM7LrSHaoJWOk6rpoS0qshbT6VA2dEgF2eMZ+2jWo03UByH8CsaUD/gL7ArE0TgLmWuBr4b/OmP4AX3UJO8RAAuHMfM9LZmPxqJACct0SUbJgNAGuI5RjWRUdsm8rqrYh1iK2rbVNpnRXya1dVVImjiIx1KDoipTVlqlhThlpTpBlpDlchscyES4tCC96origRjoH9E+HXpAuq4cDhbI7BgOh0NbBf4vG8xF/8VhGRmJRhJaKVqQeOuMJESkzKiOqGb5r9ioj1pZWLdlaoqxdL3944CSy7dzOHpfXChsXrTjdLdF+U9hOZHATOBE4UI3itfYLguyYy9dr/oo2LAQxbPwwATueHrGIAe09vA/BcRxVa1vEb8NQz3jMAJ4zzHDhqjXkMnP/q2gSwS7qpMg845BKRewg4LroWOGiIywHsuF/faY2iqOoK/T/bzwG1moh0bUANcECI0ssRuKROIvum2S/ngJooyCaW+IA8juoLKT/nAQdcInKPhB02RG3tOu09v7cMGO9EZVtaW1tbW9psL+CxZ7wEAqqBFY6Yi8D1jpT7AxjuRhV62VQCGLxqGAJUC/wrLYClRw6NBA5JJP9kcE2kBIELgSNCzj7fWvfl7whc4FAUcu9W6I0aTWzubFpz4DndvlOhidza27dv5bJ2Hu1aveZAuaVIiCVcExEljRFNzJqISCeTSSYiNsYIU0Q99BeAD+96+Hs=";

var img$2 = "data:image/webp;base64,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";

var img$1 = "data:image/webp;base64,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";

var img = "data:image/webp;base64,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";

const appTable = {
    accuweather: {
        name: "AccuWeather",
        app_icon: img$N,
        launcher: "package",
        package: "com.accuweather.android",
        uri_scheme: "",
    },
    alexa: {
        name: "Alexa",
        app_icon: img$M,
        launcher: "package",
        package: "com.amazon.dee.app",
        uri_scheme: "alexa:",
    },
    amazon_music: {
        name: "Amazon Music",
        app_icon: img$L,
        launcher: "uri_scheme",
        package: "com.amazon.mp3",
        uri_scheme: "amznmp3:",
    },
    amazon_shopping: {
        name: "Amazon Shopping",
        app_icon: img$K,
        launcher: "uri_scheme",
        package: "com.amazon.windowshop",
        uri_scheme: "amazon:",
    },
    amcrest_smart_home: {
        name: "Amcrest Smart Home",
        app_icon: img$J,
        launcher: "package",
        package: "com.mm.android.amcrestsmarthome",
        uri_scheme: "",
    },
    apple_music: {
        name: "Apple Music",
        app_icon: img$I,
        launcher: "package",
        package: "com.apple.android.music",
        uri_scheme: "",
    },
    bmw: {
        name: "My BMW",
        app_icon: img$H,
        launcher: "package",
        package: "de.bmw.connected.mobile20.na",
        uri_scheme: "bmwconnected:",
    },
    bond: {
        name: "Bond Home",
        app_icon: img$G,
        launcher: "package",
        package: "io.olibra.bondapp",
        uri_scheme: "",
    },
    bring: {
        name: "Bring!",
        app_icon: img$F,
        launcher: "package",
        package: "ch.publisheria.bring",
        uri_scheme: "",
    },
    calculator: {
        name: "Calculator",
        app_icon: img$E,
        launcher: "package",
        package: "com.google.android.calculator",
        uri_scheme: "",
    },
    chatgpt: {
        name: "ChatGPT",
        app_icon: img$D,
        launcher: "package",
        package: "com.openai.chatgpt",
        uri_scheme: "",
    },
    clock: {
        name: "Clock/Timer",
        app_icon: img$C,
        launcher: "package",
        package: "com.google.android.deskclock",
        uri_scheme: "",
    },
    doordash: {
        name: "Doordash",
        app_icon: img$B,
        launcher: "uri_scheme",
        package: "com.dd.dashdash",
        uri_scheme: "doordash:",
    },
    eufy_home: {
        name: "Eufy Clean",
        app_icon: img$A,
        launcher: "uri_scheme",
        package: "com.eufylife.smarthome",
        uri_scheme: "eufyhome:",
    },
    eufy_security: {
        name: "Eufy Security",
        app_icon: img$z,
        launcher: "package",
        package: "com.oceanwing.battery.cam",
        uri_scheme: "eufysecurity:",
    },
    google_assistant: {
        name: "Google Assistant",
        app_icon: img$y,
        launcher: "package",
        package: "com.google.android.apps.googleassistant",
        uri_scheme: "googleassistant:",
    },
    google_chrome: {
        name: "Google Chrome",
        app_icon: img$x,
        launcher: "package",
        package: "com.android.chrome",
        uri_scheme: "googlechrome:",
    },
    google_maps: {
        name: "Google Maps",
        app_icon: img$w,
        launcher: "package",
        package: "com.google.android.apps.maps",
        uri_scheme: "googlemaps:",
    },
    grubhub: {
        name: "Grubhub",
        app_icon: img$v,
        launcher: "package",
        package: "com.grubhub.android",
        uri_scheme: "grubhub:",
    },
    home_connect: {
        name: "Home Connect",
        app_icon: img$u,
        launcher: "package",
        package: "com.bshg.homeconnect.android.release.na",
        uri_scheme: "",
    },
    hue: {
        name: "Hue",
        app_icon: img$t,
        launcher: "package",
        package: "com.philips.lighting.hue2",
        uri_scheme: "",
    },
    hulu: {
        name: "Hulu",
        app_icon: img$s,
        launcher: "uri_scheme",
        package: "com.hulu.plus",
        uri_scheme: "hulu:",
    },
    irobot: {
        name: "iRobot",
        app_icon: img$r,
        launcher: "package",
        package: "com.irobot.home",
        uri_scheme: "",
    },
    keurig: {
        name: "Keurig",
        app_icon: img$q,
        launcher: "package",
        package: "com.keurig.kconnect",
        uri_scheme: "",
    },
    lionel_chief: {
        name: "LionChief",
        app_icon: img$p,
        launcher: "package",
        package: "com.lionel.lionchief",
        uri_scheme: "",
    },
    lutron: {
        name: "Lutron",
        app_icon: img$o,
        launcher: "package",
        package: "com.lutron.mmw",
        uri_scheme: "",
    },
    lyft: {
        name: "Lyft",
        app_icon: img$n,
        launcher: "uri_scheme",
        package: "me.lyft.android",
        uri_scheme: "lyft://",
    },
    myq: {
        name: "MyQ",
        app_icon: img$m,
        launcher: "package",
        package: "com.chamberlain.android.liftmaster.myq",
        uri_scheme: "",
    },
    nest: {
        name: "Nest",
        app_icon: img$l,
        launcher: "package",
        package: "com.nest.android",
        uri_scheme: "",
    },
    netflix: {
        name: "Netflix",
        app_icon: img$k,
        launcher: "uri_scheme",
        package: "com.netflix.mediaclient",
        uri_scheme: "nflx:",
    },
    pandora: {
        name: "Pandora",
        app_icon: img$j,
        launcher: "uri_scheme",
        package: "com.pandora.android",
        uri_scheme: "pandora:",
    },
    play_store: {
        name: "Play Store",
        app_icon: img$i,
        launcher: "package",
        package: "com.android.vending",
        uri_scheme: "",
    },
    rachio: {
        name: "Rachio",
        app_icon: img$h,
        launcher: "package",
        package: "com.rachio.iro",
        uri_scheme: "",
    },
    rainbird: {
        name: "Rainbird",
        app_icon: img$g,
        launcher: "package",
        package: "com.rainbird",
        uri_scheme: "",
    },
    reolink: {
        name: "Reolink",
        app_icon: img$f,
        launcher: "package",
        package: "com.mcu.reolink",
        uri_scheme: "reolink:",
    },
    ring: {
        name: "Ring",
        app_icon: img$e,
        launcher: "uri_scheme",
        package: "com.ringapp",
        uri_scheme: "ring:",
    },
    roku: {
        name: "Roku",
        app_icon: img$d,
        launcher: "package",
        package: "com.roku.remote",
        uri_scheme: "",
    },
    sense: {
        name: "Sense Energy",
        app_icon: img$c,
        launcher: "package",
        package: "com.sense.androidclient",
        uri_scheme: "",
    },
    shazam: {
        name: "Shazam",
        app_icon: img$b,
        launcher: "uri_scheme",
        package: "com.shazam.android",
        uri_scheme: "shazam:",
    },
    shipt_shopper: {
        name: "Shipt Shopper",
        app_icon: img$a,
        launcher: "package",
        package: "com.shipt.shopper",
        uri_scheme: "",
    },
    sleep_number: {
        name: "Sleep Number",
        app_icon: img$9,
        launcher: "package",
        package: "com.selectcomfort.SleepIQ",
        uri_scheme: "",
    },
    solitaire: {
        name: "Solitaire",
        app_icon: img$8,
        launcher: "package",
        package: "com.tripledot.solitaire",
        uri_scheme: "",
    },
    sonos: {
        name: "Sonos",
        app_icon: img$7,
        launcher: "uri_scheme",
        package: "com.sonos.acr2",
        uri_scheme: "sonos:",
    },
    spotify: {
        name: "Spotify",
        app_icon: img$6,
        launcher: "uri_scheme",
        package: "com.spotify.music",
        uri_scheme: "spotify:",
    },
    tuya_smart: {
        name: "Tuya Smart",
        app_icon: img$5,
        launcher: "uri_scheme",
        package: "com.tuya.smart",
        uri_scheme: "tuyasmart:",
    },
    uber: {
        name: "Uber",
        app_icon: img$4,
        launcher: "uri_scheme",
        package: "com.ubercab",
        uri_scheme: "uber:",
    },
    uber_eats: {
        name: "Uber Eats",
        app_icon: img$3,
        launcher: "uri_scheme",
        package: "com.ubercab.eats",
        uri_scheme: "ubereats:",
    },
    weather_channel: {
        name: "Weather Channel",
        app_icon: img$2,
        launcher: "package",
        package: "com.weather.Weather",
        uri_scheme: "",
    },
    weather_underground: {
        name: "Weather Underground",
        app_icon: img$1,
        launcher: "package",
        package: "com.wunderground.android.weather",
        uri_scheme: "",
    },
    yummly: {
        name: "Yummly Recipes",
        app_icon: img,
        launcher: "package",
        package: "com.yummly.android",
        uri_scheme: "",
    },
};

window.customCards.push({
    type: "smartqasa-app-tile",
    name: "SmartQasa App Tile",
    preview: true,
    description: "A SmartQasa tile for launching applications from the dashboard",
});
let AppTile = class AppTile extends s {
    getCardSize() {
        return 1;
    }
    static { this.styles = tileBaseStyle; }
    setConfig(config) {
        if (!config.app)
            throw new Error("A valid app must be specified.");
        this.config = { ...config };
        this.appObj = appTable[config.app] || undefined;
    }
    render() {
        let iconStyle, iconTemplate, name;
        if (this.appObj) {
            if (this.config?.icon) {
                iconStyle =
                    "color: rgb(var(--sq-inactive-rgb)); background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-opacity, 0.2));";
                iconTemplate = x `<ha-icon .icon=${this.config.icon}></ha-icon>`;
            }
            else if (this.appObj?.app_icon) {
                iconStyle = "height: 3.8rem; width: 3.8rem; padding: 0;";
                iconTemplate = x `<img src="${this.appObj.app_icon}" alt="App Icon" style="border-radius: 50%;" />`;
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
        name = this.config?.name || this.appObj?.name || this.config?.app;
        return x `
            <div class="container" @click=${this.launchApp}>
                <div class="icon" style=${iconStyle}>${iconTemplate}</div>
                <div class="name">${name}</div>
            </div>
        `;
    }
    launchApp(e) {
        e.stopPropagation();
        if (this.appObj.launcher == "uri_scheme" && this.appObj.uri_scheme) {
            window.location.href = this.appObj.uri_scheme;
        }
        else if (this.appObj.launcher == "package" && this.appObj.package) {
            if (window.fully?.startApplication) {
                window.fully.startApplication(this.appObj.package);
            }
            else {
                console.warn("fully.startApplication is not available.");
            }
        }
        else {
            console.error("Neither URI scheme nor package has been specified.");
        }
    }
};
__decorate([
    r()
], AppTile.prototype, "config", void 0);
__decorate([
    r()
], AppTile.prototype, "appObj", void 0);
AppTile = __decorate([
    t$1("smartqasa-app-tile")
], AppTile);

window.customCards.push({
    type: "smartqasa-area-tile",
    name: "SmartQasa Area Tile",
    preview: true,
    description: "A SmartQasa card for navigating to an area panel.",
});
let AreaTile = class AreaTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
        this.running = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.area = this.config?.area;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.area) {
            this.areaObj = this.hass && this.area ? this.hass.areas[this.area] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.navigateToArea}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name;
        if (this.config && this.hass && this.areaObj) {
            if (this.running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            }
            else {
                icon = this.config.icon || this.areaObj.icon || "hass:help-rhombus";
                iconAnimation = "none";
                iconColor = "var(--sq-inactive-rgb)";
            }
            name = this.config.name || this.areaObj.name || this.area;
        }
        else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name };
    }
    navigateToArea(e) {
        e.stopPropagation();
        if (!this.areaObj)
            return;
        this.running = true;
        window.history.pushState(null, "", `/home-dash/${this.area}`);
        window.dispatchEvent(new CustomEvent("location-changed"));
        setTimeout(() => {
            this.running = false;
            window.browser_mod?.service("close_popup", {});
        }, 500);
    }
};
__decorate([
    n$1({ attribute: false })
], AreaTile.prototype, "hass", void 0);
__decorate([
    r()
], AreaTile.prototype, "initialized", void 0);
__decorate([
    r()
], AreaTile.prototype, "config", void 0);
__decorate([
    r()
], AreaTile.prototype, "areaObj", void 0);
__decorate([
    r()
], AreaTile.prototype, "running", void 0);
AreaTile = __decorate([
    t$1("smartqasa-area-tile")
], AreaTile);

window.customCards.push({
    type: "smartqasa-dialog-tile",
    name: "SmartQasa Dialog Tile",
    preview: true,
    description: "A SmartQasa card for displaying a browser_mod popup dialog.",
});
let DialogTile = class DialogTile extends s {
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.dialogObj = dialogTable[config.dialog];
    }
    render() {
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showDialog}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name;
        if (this.config && this.dialogObj) {
            icon = this.config.icon || this.dialogObj.icon;
            iconColor = "var(--sq-inactive-rgb)";
            name = this.config.name || this.dialogObj.name;
        }
        else {
            icon = this.config?.icon || "hass:help-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
        }
        return { icon, iconAnimation, iconColor, name };
    }
    async showDialog(e) {
        e.stopPropagation();
        if (!this.dialogObj || !this.config)
            return;
        const dialogConfig = { ...this.dialogObj.data };
        /*
        const menuTab = this._config.menu_tab;

        if (menuTab !== undefined && menuTab >= 0 && menuTab <= 3) {
            const dismissData = await menuConfig(menuTab);
            dialogConfig.dismiss_action = {
                service: "browser_mod.popup",
                data: {
                    ...dismissData,
                },
            };
        }
        */
        window.browser_mod?.service("popup", dialogConfig);
    }
};
__decorate([
    r()
], DialogTile.prototype, "config", void 0);
__decorate([
    r()
], DialogTile.prototype, "dialogObj", void 0);
DialogTile = __decorate([
    t$1("smartqasa-dialog-tile")
], DialogTile);

function entityListDialog(dialogTitle, filterType, filterValue, tileType) {
    const dialogConfig = listDialogConfig(dialogTitle, filterType, filterValue, tileType);
    window.browser_mod?.service("popup", dialogConfig);
}

window.customCards.push({
    type: "smartqasa-fan-tile",
    name: "SmartQasa Fan Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a fan entity.",
});
let FanTile = class FanTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileStateStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("fan.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo} @contextmenu=${this.showEntityList}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state || "unknown";
            icon = this.config.icon || "hass:fan";
            iconAnimation = "none";
            if (state == "on" && icon === "hass:fan") {
                if (this.stateObj.attributes.percentage) {
                    const speed = 0.5 + (1 - this.stateObj.attributes.percentage / 100);
                    const direction = this.stateObj.attributes.direction == "reverse" ? "reverse" : "normal";
                    iconAnimation = `spin ${speed}s linear infinite ${direction}`;
                }
                else {
                    iconAnimation = `spin 0.5s linear infinite normal`;
                }
            }
            iconColor = state === "on" ? "var(--sq-fan-on-rgb)" : "var(--sq-inactive-rgb)";
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd = `${this.hass.formatEntityState(this.stateObj)}${state === "on" && this.stateObj.attributes.percentage
                ? " - " + this.hass.formatEntityAttributeValue(this.stateObj, "percentage")
                : ""}`;
        }
        else {
            icon = this.config?.icon || "hass:lightbulb-alert";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }
    toggleEntity(e) {
        e.stopPropagation();
        toggleHassEntity(this.hass, this.entity);
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
    showEntityList(e) {
        e.stopPropagation();
        if (!this.stateObj ||
            !Array.isArray(this.stateObj.attributes?.entity_id) ||
            this.stateObj.attributes.entity_id.length === 0)
            return;
        entityListDialog(this.stateObj.attributes?.friendly_name || "Unknown", "group", this.entity, "fan");
    }
};
__decorate([
    n$1({ attribute: false })
], FanTile.prototype, "hass", void 0);
__decorate([
    r()
], FanTile.prototype, "initialized", void 0);
__decorate([
    r()
], FanTile.prototype, "config", void 0);
__decorate([
    r()
], FanTile.prototype, "stateObj", void 0);
FanTile = __decorate([
    t$1("smartqasa-fan-tile")
], FanTile);

window.customCards.push({
    type: "smartqasa-garage-tile",
    name: "SmartQasa Garage Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a garage cover entity.",
});
let GarageTile = class GarageTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("cover.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state || "unknown";
            switch (state) {
                case "closed":
                    icon = "hass:garage-variant";
                    iconAnimation = "none";
                    iconColor = "var(--sq-inactive-rgb)";
                    break;
                case "opening":
                    icon = "hass:arrow-up-box";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-garage-opening-rgb, 255, 120, 0)";
                    break;
                case "open":
                    icon = "hass:garage-open-variant";
                    iconAnimation = "none";
                    iconColor = "var(--sq-garage-open-rgb, 255, 120, 0)";
                    break;
                case "closing":
                    icon = "hass:arrow-down-box";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-garage-closing-rgb, 255, 120, 0)";
                    break;
                default:
                    icon = "hass:garage-alert-variant";
                    iconAnimation = "none";
                    iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                    break;
            }
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd =
                this.hass.formatEntityState(this.stateObj) +
                    (state === "open" && this.stateObj.attributes.current_position
                        ? " - " + this.hass.formatEntityAttributeValue(this.stateObj, "current_position")
                        : "");
        }
        else {
            icon = this.config?.icon || "hass:garage-alert-variant";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }
    toggleEntity(e) {
        e.stopPropagation();
        toggleHassEntity(this.hass, this.entity);
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
};
__decorate([
    n$1({ attribute: false })
], GarageTile.prototype, "hass", void 0);
__decorate([
    r()
], GarageTile.prototype, "initialized", void 0);
__decorate([
    r()
], GarageTile.prototype, "config", void 0);
__decorate([
    r()
], GarageTile.prototype, "stateObj", void 0);
GarageTile = __decorate([
    t$1("smartqasa-garage-tile")
], GarageTile);

window.customCards.push({
    type: "smartqasa-heater-tile",
    name: "SmartQasa Heater Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a water heater entity.",
});
let HeaterTile = class HeaterTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("water_heater.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state || "unknown";
            icon = this.config.icon || "hass:water-thermometer";
            iconAnimation = "none";
            iconColor = heaterColors[state] || heaterColors.idle;
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd = this.hass.formatEntityState(this.stateObj);
            if (state !== "off" && this.stateObj.attributes.temperature) {
                stateFmtd += ` - ${this.stateObj.attributes.temperature}°`;
            }
        }
        else {
            icon = this.config?.icon || "hass:water-thermometer";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }
    toggleEntity(e) {
        e.stopPropagation();
        toggleHassEntity(this.hass, this.entity);
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
};
__decorate([
    n$1({ attribute: false })
], HeaterTile.prototype, "hass", void 0);
__decorate([
    r()
], HeaterTile.prototype, "initialized", void 0);
__decorate([
    r()
], HeaterTile.prototype, "config", void 0);
__decorate([
    r()
], HeaterTile.prototype, "stateObj", void 0);
HeaterTile = __decorate([
    t$1("smartqasa-heater-tile")
], HeaterTile);

window.customCards.push({
    type: "smartqasa-light-tile",
    name: "SmartQasa Light Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a light entity.",
});
let LightTile = class LightTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
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
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("light.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo} @contextmenu=${this.showEntityList}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state || "unknown";
            icon = this.config.icon || this.stateObj.attributes.icon || "hass:lightbulb";
            iconAnimation = "none";
            iconColor = state === "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb)";
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd = `${this.hass.formatEntityState(this.stateObj)}${state === "on" && this.stateObj.attributes.brightness
                ? " - " + this.hass.formatEntityAttributeValue(this.stateObj, "brightness")
                : ""}`;
        }
        else {
            icon = this.config?.icon || "hass:lightbulb-alert";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }
    toggleEntity(e) {
        e.stopPropagation();
        toggleHassEntity(this.hass, this.entity);
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
    showEntityList(e) {
        e.stopPropagation();
        if (!this.stateObj ||
            !Array.isArray(this.stateObj.attributes?.entity_id) ||
            this.stateObj.attributes.entity_id.length === 0)
            return;
        entityListDialog(this.stateObj.attributes?.friendly_name || "Unknown", "group", this.entity, "light");
    }
};
__decorate([
    n$1({ attribute: false })
], LightTile.prototype, "hass", void 0);
__decorate([
    r()
], LightTile.prototype, "initialized", void 0);
__decorate([
    r()
], LightTile.prototype, "config", void 0);
__decorate([
    r()
], LightTile.prototype, "stateObj", void 0);
LightTile = __decorate([
    t$1("smartqasa-light-tile")
], LightTile);

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

window.customCards.push({
    type: "smartqasa-lock-tile",
    name: "SmartQasa Lock Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a lock entity.",
});
let LockTile = class LockTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
        this.running = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("lock.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity && !this.running ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state || "unknown";
            switch (state) {
                case "locked":
                    icon = "hass:lock";
                    iconAnimation = "none";
                    iconColor = "var(--sq-inactive-rgb)";
                    break;
                case "unlocking":
                    icon = "hass:rotate-right";
                    iconAnimation = "spin 1.0s linear infinite";
                    iconColor = "var(--sq-lock-unlocking-rgb)";
                    break;
                case "unlocked":
                    icon = "hass:lock-open";
                    iconAnimation = "none";
                    iconColor = "var(--sq-lock-unlocked-rgb)";
                    break;
                case "locking":
                    icon = "hass:rotate-right";
                    iconAnimation = "spin 1.0s linear infinite";
                    iconColor = "var(--sq-lock-locking-rgb)";
                    break;
                case "jammed":
                    icon = "hass:lock-open";
                    iconAnimation = "blink 1.0s linear infinite";
                    iconColor = "var(--sq-lock-jammed-rgb, 255, 0, 0)";
                    break;
                default:
                    icon = "hass:lock-alert";
                    iconAnimation = "none";
                    iconColor = "var(--sq-unavailable-rgb)";
                    break;
            }
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd = this.hass.formatEntityState(this.stateObj);
        }
        else {
            icon = this.config?.icon || "hass:garage-alert-variant";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (!this.hass || !this.stateObj)
            return;
        const state = this.stateObj.state;
        this.running = true;
        this.stateObj.state = state == "locked" ? "unlocking" : "locking";
        this.hass.callService("lock", state == "locked" ? "unlock" : "lock", {
            entity_id: this.entity,
        });
        setTimeout(() => {
            this.running = false;
        }, 250);
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
};
__decorate([
    n$1({ attribute: false })
], LockTile.prototype, "hass", void 0);
__decorate([
    r()
], LockTile.prototype, "initialized", void 0);
__decorate([
    r()
], LockTile.prototype, "config", void 0);
__decorate([
    r()
], LockTile.prototype, "stateObj", void 0);
__decorate([
    r()
], LockTile.prototype, "running", void 0);
LockTile = __decorate([
    t$1("smartqasa-lock-tile")
], LockTile);

window.customCards.push({
    type: "smartqasa-option-tile",
    name: "SmartQasa Option Tile",
    preview: true,
    description: "A SmartQasa tile for displaying an Option of an Input Select entity.",
});
let OptionTile = class OptionTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
        this.running = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("input_select.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.selectOption}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name;
        if (this.config && this.hass && this.stateObj) {
            if (this.running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            }
            else {
                if (this.entity === "input_select.location_phase") {
                    icon = phaseIcons[this.config.option] || phaseIcons.default;
                }
                else if (this.entity === "input_select.location_mode") {
                    icon = modeIcons[this.config.option] || modeIcons.default;
                }
                else {
                    icon = this.config.icon || this.stateObj.attributes.icon || "hass:form-dropdown";
                }
                iconAnimation = "none";
                iconColor =
                    this.stateObj.state === this.config.option
                        ? "var(--sq-rgb-blue, 25, 125, 255)"
                        : "var(--sq-inactive-rgb)";
            }
            name = this.config.option || "Unknown";
        }
        else {
            icon = this.config?.icon || "hass:form-dropdown";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.option || "Unknown";
        }
        return { icon, iconAnimation, iconColor, name };
    }
    selectOption(e) {
        e.stopPropagation();
        if (!this.hass || !this.config || !this.stateObj)
            return;
        this.running = true;
        this.hass.callService("input_select", "select_option", {
            entity_id: this.entity,
            option: this.config.option,
        });
        const trigger = this.config.trigger;
        if (trigger && trigger.startsWith("input_button.")) {
            this.hass.callService("input_button", "press", {
                entity_id: trigger,
            });
        }
        setTimeout(() => {
            this.running = false;
            const menuTab = this.config?.menu_tab;
            if (menuTab !== undefined && menuTab >= 0 && menuTab <= 3) {
                this.showMenu(menuTab);
            }
            else {
                window.browser_mod?.service("close_popup", {});
            }
        }, 1000);
    }
    async showMenu(menuTab) {
        try {
            const dialogConfig = await menuConfig(menuTab);
            window.browser_mod?.service("popup", dialogConfig);
        }
        catch (e) {
            window.browser_mod?.service("close_popup", {});
            console.error("Error opening menu dialog", e);
        }
    }
};
__decorate([
    n$1({ attribute: false })
], OptionTile.prototype, "hass", void 0);
__decorate([
    r()
], OptionTile.prototype, "initialized", void 0);
__decorate([
    r()
], OptionTile.prototype, "config", void 0);
__decorate([
    r()
], OptionTile.prototype, "stateObj", void 0);
__decorate([
    r()
], OptionTile.prototype, "running", void 0);
OptionTile = __decorate([
    t$1("smartqasa-option-tile")
], OptionTile);

window.customCards.push({
    type: "smartqasa-robot-tile",
    name: "SmartQasa Robot Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a robot vacuum entity.",
});
let RobotTile = class RobotTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("light.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state || "unknown";
            switch (state) {
                case "cleaning":
                    icon = "hass:robot-vacuum-variant";
                    iconAnimation = "none";
                    iconColor = "var(--sq-vacuum-cleaning-rgb, 0, 150, 136)";
                    break;
                case "docked":
                    icon = "hass:robot-vacuum-variant";
                    iconAnimation = "none";
                    iconColor = "var(--sq-inactive-rgb)";
                    break;
                case "idle":
                    icon = "hass:robot-vacuum-variant";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-vacuum-idle-rgb, 190, 75, 85)";
                    break;
                case "paused":
                    icon = "hass:robot-vacuum-variant";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-vacuum-paused-rgb, 190, 75, 85)";
                    break;
                case "returning":
                    icon = "hass:robot-vacuum-variant";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-vacuum-returning-rgb, 0, 150, 136)";
                    break;
                default:
                    icon = "hass:robot-vacuum-variant-alert";
                    iconAnimation = "none";
                    iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                    break;
            }
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd =
                this.hass.formatEntityState(this.stateObj) +
                    (this.stateObj.attributes.battery_level
                        ? " - " + this.hass.formatEntityAttributeValue(this.stateObj, "battery_level")
                        : "");
        }
        else {
            icon = this.config?.icon || "hass:robot-vacuum-variant-alert";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (!this.hass || !this.stateObj)
            return;
        const state = this.stateObj.state;
        this.hass.callService("vacuum", ["docked", "idle", "paused"].includes(state) ? "start" : "pause", {
            entity_id: this.entity,
        });
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
};
__decorate([
    n$1({ attribute: false })
], RobotTile.prototype, "hass", void 0);
__decorate([
    r()
], RobotTile.prototype, "initialized", void 0);
__decorate([
    r()
], RobotTile.prototype, "config", void 0);
__decorate([
    r()
], RobotTile.prototype, "stateObj", void 0);
RobotTile = __decorate([
    t$1("smartqasa-robot-tile")
], RobotTile);

window.customCards.push({
    type: "smartqasa-roku-tile",
    name: "SmartQasa Roku Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a Roku media_player entity.",
});
let RokuTile = class RokuTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("media_player.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this.config && this.hass && this.stateObj) {
            icon = this.config?.icon || this.stateObj.attributes.icon || "hass:audio-video";
            iconAnimation = "none";
            const state = this.stateObj.state || "unknown";
            switch (state) {
                case "idle":
                    iconColor = "var(--sq-media_player-idle-rgb)";
                    break;
                case "standby":
                    iconColor = "var(--sq-media_player-standby-rgb)";
                    break;
                case "on":
                    iconColor = "var(--sq-media_player-on-rgb)";
                    break;
                case "paused":
                    iconColor = "var(--sq-media_player-paused-rgb)";
                    break;
                case "playing":
                    iconColor = "var(--sq-media_player-playing-rgb, 3, 169, 244)";
                    break;
                default:
                    iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                    break;
            }
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd = `${this.hass.formatEntityState(this.stateObj)}${this.stateObj.attributes?.source ? ` - ${this.stateObj.attributes.source}` : ""}`;
        }
        else {
            icon = this.config?.icon || "hass:audio-video-off";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }
    toggleEntity(e) {
        e.stopPropagation();
        toggleHassEntity(this.hass, this.entity);
    }
    showMoreInfo(e) {
        e.stopPropagation();
        if (!this.config || !this.stateObj)
            return;
        const dialogConfig = {
            title: this.stateObj.attributes?.friendly_name || this.entity || "Unknown",
            timeout: 60000,
            content: {
                type: "custom:roku-card",
                entity: this.entity,
                tv: true,
            },
            ...(this.config.dialog_title && {
                dismiss_action: {
                    service: "browser_mod.popup",
                    data: {
                        ...listDialogConfig(this.config.dialog_title, this.config.filter_type, this.config.filter_value, this.config.tile_type),
                    },
                },
            }),
        };
        window.browser_mod?.service("popup", dialogConfig);
    }
};
__decorate([
    n$1({ attribute: false })
], RokuTile.prototype, "hass", void 0);
__decorate([
    r()
], RokuTile.prototype, "initialized", void 0);
__decorate([
    r()
], RokuTile.prototype, "config", void 0);
__decorate([
    r()
], RokuTile.prototype, "stateObj", void 0);
RokuTile = __decorate([
    t$1("smartqasa-roku-tile")
], RokuTile);

window.customCards.push({
    type: "smartqasa-routine-tile",
    name: "SmartQasa Routine Tile",
    preview: true,
    description: "A SmartQasa tile for triggering an automation, scene, or script entity.",
});
let RoutineTile = class RoutineTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
        this.running = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = ["automation", "scene", "script"].includes(this.config.entity?.split(".")[0])
            ? this.config.entity
            : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.runRoutine}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name;
        if (this.config && this.hass && this.stateObj) {
            if (this.running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            }
            else {
                icon = this.config.icon || this.stateObj.attributes.icon || "hass:help-rhombus";
                iconAnimation = "none";
                iconColor = "var(--sq-inactive-rgb)";
            }
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
        }
        else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name };
    }
    async runRoutine(e) {
        e.stopPropagation();
        if (!this.hass || !this.stateObj)
            return;
        this.running = true;
        const domain = this.stateObj.entity_id.split(".")[0];
        try {
            switch (domain) {
                case "script":
                    await this.hass.callService("script", "turn_on", { entity_id: this.entity });
                    break;
                case "scene":
                    await this.hass.callService("scene", "turn_on", { entity_id: this.entity });
                    break;
                case "automation":
                    await this.hass.callService("automation", "trigger", { entity_id: this.entity });
                    break;
                default:
                    console.error("Unsupported entity domain:", domain);
                    return;
            }
        }
        catch (error) {
            console.error("Failed to turn off entities:", error);
        }
        setTimeout(() => {
            this.running = false;
        }, 1000);
    }
};
__decorate([
    n$1({ attribute: false })
], RoutineTile.prototype, "hass", void 0);
__decorate([
    r()
], RoutineTile.prototype, "initialized", void 0);
__decorate([
    r()
], RoutineTile.prototype, "config", void 0);
__decorate([
    r()
], RoutineTile.prototype, "stateObj", void 0);
__decorate([
    r()
], RoutineTile.prototype, "running", void 0);
RoutineTile = __decorate([
    t$1("smartqasa-routine-tile")
], RoutineTile);

window.customCards.push({
    type: "smartqasa-select-tile",
    name: "SmartQasa Select Tile",
    preview: true,
    description: "A SmartQasa tile for displaying an Input Select entity.",
});
let SelectTile = class SelectTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("input_select.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showOptions}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this.config && this.hass && this.stateObj) {
            this.stateObj.state || "unknown";
            icon = this.config?.icon || this.stateObj.attributes?.icon || "hass:form-dropdown";
            iconAnimation = "none";
            iconColor = "var(--sq-inactive-rgb)";
            name = this.config?.name || this.stateObj.attributes?.friendly_name || this.entity;
            stateFmtd = this.hass.formatEntityState(this.stateObj) || "Unknown";
        }
        else {
            icon = this.config?.icon || "hass:form-dropdown";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }
    showOptions(e) {
        e.stopPropagation();
        selectOptionDialog(this.config, this.stateObj);
    }
};
__decorate([
    n$1({ attribute: false })
], SelectTile.prototype, "hass", void 0);
__decorate([
    r()
], SelectTile.prototype, "initialized", void 0);
__decorate([
    r()
], SelectTile.prototype, "config", void 0);
__decorate([
    r()
], SelectTile.prototype, "stateObj", void 0);
SelectTile = __decorate([
    t$1("smartqasa-select-tile")
], SelectTile);

window.customCards.push({
    type: "smartqasa-sensor-tile",
    name: "SmartQasa Sensor Tile",
    preview: true,
    description: "A SmartQasa tile for observing a binary_sensor entity.",
});
let SensorTile = class SensorTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("binary_sensor.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { iconTemplate, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" style="${o(iconStyles)}">${iconTemplate}</div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }
    updateState() {
        let iconTemplate, iconAnimation, iconColor, name, stateFmtd;
        if (this.config && this.hass && this.stateObj) {
            if (!this.config.icon) {
                iconTemplate = x `<ha-state-icon .hass=${this.hass} .stateObj=${this.stateObj}></ha-state-icon>`;
            }
            else {
                iconTemplate = x `<ha-icon .icon=${this.config.icon}></ha-icon>`;
            }
            iconColor = this.stateObj.state === "on" ? "var(--sq-binary_sensor-on-rgb)" : "var(--sq-inactive-rgb)";
            name = this.config?.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd = this.hass.formatEntityState(this.stateObj);
        }
        else {
            iconTemplate = x `<ha-icon .icon="hass:leak"></ha-icon>`;
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }
        return { iconTemplate, iconAnimation, iconColor, name, stateFmtd };
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
};
__decorate([
    n$1({ attribute: false })
], SensorTile.prototype, "hass", void 0);
__decorate([
    r()
], SensorTile.prototype, "initialized", void 0);
__decorate([
    r()
], SensorTile.prototype, "config", void 0);
__decorate([
    r()
], SensorTile.prototype, "stateObj", void 0);
SensorTile = __decorate([
    t$1("smartqasa-sensor-tile")
], SensorTile);

const sequenceTable = {
    white: {
        count: 0,
        iconRGB: "255, 255, 255",
        name: "White",
    },
    sky_blue: {
        count: 1,
        iconRGB: "135, 206, 250",
        name: "Sky Blue",
    },
    cobalt_blue: {
        count: 2,
        iconRGB: "0, 71, 171",
        name: "Cobalt Blue",
    },
    carribean_blue: {
        count: 3,
        iconRGB: "0, 105, 148",
        name: "Carribean Blue",
    },
    spring_green: {
        count: 4,
        iconRGB: "0, 255, 127",
        name: "Spring Green",
    },
    emerald_green: {
        count: 5,
        iconRGB: "0, 201, 87",
        name: "Emerald Green",
    },
    emerald_rose: {
        count: 6,
        iconRGB: "0, 134, 67",
        name: "Emerald Rose",
    },
    magenta: {
        count: 7,
        iconRGB: "255, 0, 255",
        name: "Magenta",
    },
    violet: {
        count: 8,
        iconRGB: "127, 0, 255",
        name: "Violet",
    },
    slow_color_splash: {
        count: 9,
        iconRGB: "204,102,0",
        name: "Slow Color Splash",
    },
    fast_color_splash: {
        count: 10,
        iconRGB: "255,255,153",
        name: "Fast Color Splash",
    },
    usa_beautiful: {
        count: 11,
        iconRGB: "228,28,29",
        name: "USA Beautiful",
    },
    fat_tuesday: {
        count: 12,
        iconRGB: "0,255,255",
        name: "Fat Tuesday",
    },
    disco_tech: {
        count: 13,
        iconRGB: "255,229,204",
        name: "Disco Tech",
    },
};

window.customCards.push({
    type: "smartqasa-pool-light-tile",
    name: "SmartQasa Pool Light Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a pool color light or switch entity.",
});
let PoolLightTile = class PoolLightTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = ["light", "switch"].includes(this.config.entity?.split(".")[0]) ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showColorList}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state || "unknown";
            icon = this.config.icon || this.stateObj.attributes.icon || "hass:lightbulb";
            iconColor = state === "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb)";
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd =
                this.hass.formatEntityState(this.stateObj) +
                    (state === "on" && this.stateObj.attributes.brightness
                        ? " - " + this.hass.formatEntityAttributeValue(this.stateObj, "brightness")
                        : "");
        }
        else {
            icon = this.config?.icon || "hass:lightbulb-alert";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }
    toggleEntity(e) {
        e.stopPropagation();
        toggleHassEntity(this.hass, this.entity);
    }
    showColorList(e) {
        e.stopPropagation();
        if (!this.stateObj)
            return;
        const cards = Object.keys(sequenceTable).map((key) => ({
            type: "custom:smartqasa-pool-light-sequencer-tile",
            entity: this.entity,
            sequence: key,
        }));
        const dialogConfig = {
            title: this.stateObj.attributes.friendly_name || this.stateObj.entity_id,
            timeout: 60000,
            content: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: gridDialogStyle,
                cards: cards,
            },
        };
        window.browser_mod?.service("popup", dialogConfig);
    }
};
__decorate([
    n$1({ attribute: false })
], PoolLightTile.prototype, "hass", void 0);
__decorate([
    r()
], PoolLightTile.prototype, "initialized", void 0);
__decorate([
    r()
], PoolLightTile.prototype, "config", void 0);
__decorate([
    r()
], PoolLightTile.prototype, "stateObj", void 0);
PoolLightTile = __decorate([
    t$1("smartqasa-pool-light-tile")
], PoolLightTile);

let PoolLightSequencerTile = class PoolLightSequencerTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
        this.running = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.sequenceObj = config.sequence ? sequenceTable[config.sequence] : undefined;
        this.entity = ["light", "switch"].includes(this.config.entity?.split(".")[0]) ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.runRoutine}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name;
        if (this.config && this.hass && this.sequenceObj && this.stateObj) {
            if (this.running) {
                icon = "hass:rotate-right";
                iconAnimation = "spin 1.0s linear infinite";
                iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
            }
            else {
                icon = this.config.icon || this.stateObj.attributes.icon || "hass:lightbulb";
                iconAnimation = "none";
                iconColor = this.sequenceObj.iconRGB || "var(--sq-inactive-rgb)";
            }
            name = this.sequenceObj.name || "Unknown";
        }
        else {
            icon = "hass:alert-rhombus";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name };
    }
    runRoutine(e) {
        e.stopPropagation();
        if (!this.hass || !this.config || !this.stateObj)
            return;
        this.running = true;
        this.hass.callService("script", "system_color_light_sequence_selector", {
            entity: this.entity,
            count: this.sequenceObj.count,
        });
        setTimeout(() => {
            this.running = false;
        }, 2000);
    }
};
__decorate([
    n$1({ attribute: false })
], PoolLightSequencerTile.prototype, "hass", void 0);
__decorate([
    r()
], PoolLightSequencerTile.prototype, "initialized", void 0);
__decorate([
    r()
], PoolLightSequencerTile.prototype, "config", void 0);
__decorate([
    r()
], PoolLightSequencerTile.prototype, "sequenceObj", void 0);
__decorate([
    r()
], PoolLightSequencerTile.prototype, "stateObj", void 0);
__decorate([
    r()
], PoolLightSequencerTile.prototype, "running", void 0);
PoolLightSequencerTile = __decorate([
    t$1("smartqasa-pool-light-sequencer-tile")
], PoolLightSequencerTile);

window.customCards.push({
    type: "smartqasa-shade-tile",
    name: "SmartQasa Shade Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a window shade entity.",
});
let ShadeTile = class ShadeTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileStateStyle, tileIconBlinkStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("cover.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo} @contextmenu=${this.showEntityList}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state || "unknown";
            switch (state) {
                case "closed":
                    icon = "hass:roller-shade-closed";
                    iconAnimation = "none";
                    iconColor = "var(--sq-inactive-rgb)";
                    break;
                case "opening":
                    icon = "hass:arrow-up-box";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-shade-opening-rgb, 146, 107, 199)";
                    break;
                case "open":
                    icon = "hass:roller-shade";
                    iconAnimation = "none";
                    iconColor = "var(--sq-shade-open-rgb, 146, 107, 199)";
                    break;
                case "closing":
                    icon = "hass:arrow-down-box";
                    iconAnimation = "blink 2.0s linear infinite";
                    iconColor = "var(--sq-shade-closing-rgb, 146, 107, 199)";
                    break;
                default:
                    icon = "hass:alert-rhombus";
                    iconAnimation = "none";
                    iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
                    break;
            }
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd =
                this.hass.formatEntityState(this.stateObj) +
                    (state === "open" && this.stateObj.attributes.current_position
                        ? " - " + this.hass.formatEntityAttributeValue(this.stateObj, "current_position")
                        : "");
        }
        else {
            icon = this.config?.icon || "hass:roller-shade";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }
    toggleEntity(e) {
        e.stopPropagation();
        if (!this.hass || !this.config || !this.stateObj)
            return;
        const tilt = this.config.tilt || 100;
        if (tilt >= 1 && tilt <= 100) {
            if (this.stateObj.attributes.current_position !== tilt) {
                this.hass.callService("cover", "set_cover_position", {
                    entity_id: this.entity,
                    position: tilt,
                });
            }
            else {
                this.hass.callService("cover", "set_cover_position", {
                    entity_id: this.entity,
                    position: 0,
                });
            }
        }
        else {
            this.hass.callService("cover", "toggle", { entity_id: this.entity });
        }
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
    showEntityList(e) {
        e.stopPropagation();
        if (!this.stateObj ||
            !Array.isArray(this.stateObj.attributes?.entity_id) ||
            this.stateObj.attributes.entity_id.length === 0)
            return;
        entityListDialog(this.stateObj.attributes?.friendly_name || "Unknown", "group", this.entity, "shade");
    }
};
__decorate([
    n$1({ attribute: false })
], ShadeTile.prototype, "hass", void 0);
__decorate([
    r()
], ShadeTile.prototype, "initialized", void 0);
__decorate([
    r()
], ShadeTile.prototype, "config", void 0);
__decorate([
    r()
], ShadeTile.prototype, "stateObj", void 0);
ShadeTile = __decorate([
    t$1("smartqasa-shade-tile")
], ShadeTile);

window.customCards.push({
    type: "smartqasa-switch-tile",
    name: "SmartQasa Switch Tile",
    preview: true,
    description: "A SmartQasa tile for toggling an entity.",
});
let SwitchTile = class SwitchTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = ["fan", "input_boolean", "light", "switch"].includes(this.config.entity?.split(".")[0])
            ? this.config.entity
            : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state;
            icon = this.config.icon || this.stateObj.attributes.icon || "hass:toggle-switch-variant";
            iconAnimation = "none";
            iconColor =
                state === "on"
                    ? `var(--sq-switch${this.config?.category ? `-${this.config.category}` : ""}-on-rgb)`
                    : "var(--sq-inactive-rgb)";
            name = this.config.name || this.stateObj.attributes.friendly_name || this.stateObj.entity_id;
            stateFmtd = this.hass.formatEntityState(this.stateObj);
        }
        else {
            icon = this.config?.icon || "hass:toggle-switch-variant";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }
    toggleEntity(e) {
        e.stopPropagation();
        toggleHassEntity(this.hass, this.entity);
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
};
__decorate([
    n$1({ attribute: false })
], SwitchTile.prototype, "hass", void 0);
__decorate([
    r()
], SwitchTile.prototype, "initialized", void 0);
__decorate([
    r()
], SwitchTile.prototype, "config", void 0);
__decorate([
    r()
], SwitchTile.prototype, "stateObj", void 0);
SwitchTile = __decorate([
    t$1("smartqasa-switch-tile")
], SwitchTile);

window.customCards.push({
    type: "smartqasa-theme-tile",
    name: "SmartQasa Theme Tile",
    preview: true,
    description: "A SmartQasa tile for setting the display theme.",
});
let ThemeTile = class ThemeTile extends s {
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileIconSpinStyle]; }
    setConfig(config) {
        this.config = { ...config };
    }
    render() {
        if (!this.config)
            return x ``;
        const icon = this.config.icon || "hass:compare";
        const iconColor = this.config.mode ? "var(--sq-inactive-rgb)" : "var(--sq-unavailable-rgb, 255, 0, 255)";
        const name = this.config.name || this.config.mode || "Unknown";
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
        };
        return x `
            <div class="container" @click=${this.selectMode}>
                <div class="icon" style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
            </div>
        `;
    }
    selectMode(e) {
        e.stopPropagation();
        if (!this.config)
            return;
        window.browser_mod?.service("set_theme", { dark: this.config.mode });
        window.browser_mod?.service("close_popup", {});
    }
};
__decorate([
    r()
], ThemeTile.prototype, "config", void 0);
ThemeTile = __decorate([
    t$1("smartqasa-theme-tile")
], ThemeTile);

window.customCards.push({
    type: "smartqasa-thermostat-tile",
    name: "SmartQasa Thermostat Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a thermostat climate entity.",
});
let ThermostatTile = class ThermostatTile extends s {
    constructor() {
        super(...arguments);
        this.initialized = false;
    }
    getCardSize() {
        return 1;
    }
    static { this.styles = [tileBaseStyle, tileStateStyle]; }
    setConfig(config) {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith("climate.") ? this.config.entity : undefined;
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("hass")) {
            this.stateObj = this.hass && this.entity ? this.hass.states[this.entity] : undefined;
            this.initialized = true;
        }
    }
    render() {
        if (!this.initialized)
            return x ``;
        const { icon, iconAnimation, iconColor, name, stateFmtd } = this.updateState();
        const iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
            animation: iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div class="icon" @click=${this.toggleEntity} style="${o(iconStyles)}">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
                <div class="name">${name}</div>
                <div class="state">${stateFmtd}</div>
            </div>
        `;
    }
    updateState() {
        let icon, iconAnimation, iconColor, name, stateFmtd;
        if (this.config && this.hass && this.stateObj) {
            const state = this.stateObj.state || "unknown";
            icon = thermostatIcons[state] || thermostatIcons.default;
            iconAnimation = "none";
            const hvacAction = this.stateObj.attributes.hvac_action || "idle";
            if (state === "off") {
                iconColor = thermostatColors.off;
            }
            else {
                iconColor = thermostatColors[hvacAction] || thermostatColors.idle;
            }
            name = this.config.name || this.stateObj.attributes.friendly_name || this.entity;
            stateFmtd = this.hass.formatEntityState(this.stateObj);
            if (state !== "off") {
                if (this.stateObj.attributes.current_temperature) {
                    stateFmtd += ` - ${this.stateObj.attributes.current_temperature}°`;
                }
                if (this.stateObj.attributes.current_humidity) {
                    stateFmtd += ` / ${this.stateObj.attributes.current_humidity}%`;
                }
            }
        }
        else {
            icon = this.config?.icon || "hass:thermostat";
            iconAnimation = "none";
            iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            name = this.config?.name || "Unknown";
            stateFmtd = "Unknown";
        }
        return { icon, iconAnimation, iconColor, name, stateFmtd };
    }
    toggleEntity(e) {
        e.stopPropagation();
        toggleHassEntity(this.hass, this.entity);
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }
};
__decorate([
    n$1({ attribute: false })
], ThermostatTile.prototype, "hass", void 0);
__decorate([
    r()
], ThermostatTile.prototype, "initialized", void 0);
__decorate([
    r()
], ThermostatTile.prototype, "config", void 0);
__decorate([
    r()
], ThermostatTile.prototype, "stateObj", void 0);
ThermostatTile = __decorate([
    t$1("smartqasa-thermostat-tile")
], ThermostatTile);

var version = "2024.5.6a";

window.smartqasa = window.smartqasa || {};
window.smartqasa.homePath = window.smartqasa.homePath || location.pathname.split("/").pop();
window.customCards = window.customCards ?? [];
console.info(`%c SmartQasa ⏏ ${version} `, "background-color: #0000ff; color: #ffffff; font-weight: 700;");
