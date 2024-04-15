var version = "1.1.52";

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
const t$3=globalThis,e$3=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$5=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$5(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$3,defineProperty:e$2,getOwnPropertyDescriptor:r$4,getOwnPropertyNames:h$1,getOwnPropertySymbols:o$3,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$3(t,s),y$1={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$1){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e$2(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$4(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...h$1(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$1)(this[t],s))return;this.P(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$ET());}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$ET(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i);}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU();}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU();}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d$1("elementProperties")]=new Map,b[d$1("finalized")]=new Map,p$1?.({ReactiveElement:b}),(a$1.reactiveElementVersions??=[]).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$2=t$2.trustedTypes,s$1=i$2?i$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$1="$lit$",h=`lit$${(Math.random()+"").slice(9)}$`,o$2="?"+h,n$2=`<${o$2}>`,r$3=document,l=()=>r$3.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),w=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),A=new WeakMap,E=r$3.createTreeWalker(r$3,129);function C(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const P=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$2:d>=0?(o.push(a),s.slice(0,d)+e$1+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [C(t,l+(t[s]||"<?>")+(2===i?"</svg>":"")),o]};class V{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=P(t,s);if(this.el=V.createElement(f,n),E.currentNode=this.el.content,2===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=E.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$1)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?k:"?"===e[1]?H:"@"===e[1]?I:R}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$2?i$2.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),E.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$2)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$3.createElement("template");return s.innerHTML=t,s}}function N(t,i,s=t,e){if(i===w)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=N(t,h._$AS(t,i.values),h,e)),i}class S{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$3).importNode(i,!0);E.currentNode=e;let h=E.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new M(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new L(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=E.nextNode(),o++);}return E.currentNode=r$3,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N(this,t,i),c(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==w&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t));}_(t){this._$AH!==T&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$3.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=V.createElement(C(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new S(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new V(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new M(this.S(l()),this.S(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=T;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=N(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=N(this,e[s+n],i,n),r===w&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===T?t=T:t!==T&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class k extends R{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===T?void 0:t;}}class H extends R{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T);}}class I extends R{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=N(this,t,i,0)??T)===w)return;const s=this._$AH,e=t===T&&s!==T||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==T&&(s===T||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t);}}const Z=t$2.litHtmlPolyfillSupport;Z?.(V,M),(t$2.litHtmlVersions??=[]).push("3.1.2");const j=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new M(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class s extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=j(i,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return w}}s._$litElement$=!0,s[("finalized")]=!0,globalThis.litElementHydrateSupport?.({LitElement:s});const r$2=globalThis.litElementPolyfillSupport;r$2?.({LitElement:s});(globalThis.litElementVersions??=[]).push("4.0.4");

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
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o=e(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return w}});

var styleChipBasic = i$4 `
    .container {
        width: fit-content;
        place-self: center;
        display: grid;
        grid-template-areas: "i t";
        grid-column-gap: 0.8rem;
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

let MotionChip = class MotionChip extends s {
    static { this.styles = styleChipBasic; }
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
        this._stateObj = this._hass && this._config?.entity ? this._hass.states[this._config.entity] : undefined;
        if (!this._stateObj)
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
        if (!this._stateObj) {
            return x ``;
        }
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

var styleChipDouble = i$4 `
    .container {
        width: fit-content;
        place-self: center;
        display: grid;
        grid-template-areas: "i1 s i2";
        grid-column-gap: 1rem;
        margin-right: 0.7rem;
        padding: 0.8rem;
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
        --mdc-icon-size: 2.2rem;
        color: rgb(var(--sq-primary-text-rgb));
    }
`;

let NavigateChip = class NavigateChip extends s {
    static { this.styles = styleChipDouble; }
    setConfig(config) {
        this._areaPrev = config.area_prev || undefined;
        this._areaNext = config.area_next || undefined;
    }
    set hass(hass) {
        if (this._areaPrev && this._areaNext) {
            this._hass = hass;
            if (this._hass?.areas) {
                this._areaObjPrev = this._hass.areas[this._areaPrev];
                this._areaObjNext = this._hass.areas[this._areaNext];
            }
        }
    }
    render() {
        if (!this._areaObjPrev || !this._areaObjNext) {
            return x ``;
        }
        const iconPrev = "hass:arrow-left";
        const iconNext = "hass:arrow-right";
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

const listDialogConfig = (dialogTitle, filterType, filterValue, tileType) => {
    return {
        title: dialogTitle,
        timeout: 60000,
        content: {
            type: "custom:auto-entities",
            card: {
                type: "custom:layout-card",
                layout_type: "custom:grid-layout",
                layout: {
                    margin: 0,
                    "grid-template-columns": "1fr",
                    "grid-gap": "var(--sq-dialog-grid-gap)",
                },
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

function moreInfoDialog(config, stateObj, hass) {
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
    static { this.styles = styleChipBasic; }
    setConfig(config) {
        if (!config.entity)
            return;
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
        this._stateObj = this._hass && this._config?.entity ? this._hass.states[this._config.entity] : undefined;
        if (!this._stateObj) {
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
        if (!this._config?.entity)
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
        moreInfoDialog(this._config, this._stateObj, this._hass);
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
        return i$4 `
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
            ? `/local/sq-areas/${this._config.picture}`
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

let FooterStrip = class FooterStrip extends s {
    static { this.styles = i$4 `
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
            grid-template-areas: "home areas entertain menu";
            grid-template-columns: repeat(4, max-content);
            grid-column-gap: 5vw;
            justify-content: center;
        }
        .button {
            display: flex;
            padding: 1rem;
            align-items: center;
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
                ${this.renderButton("home", "hass:home", "Home", "handleHome")}
                ${this.renderButton("areas", "hass:view-dashboard", "Areas", "handleAreas")}
                ${this.renderButton("entertain", "hass:music", "Entertainment", "handleEntertain")}
                ${this.renderButton("menu", "hass:menu", "Menu", "handleMenu")}
            </div>
        `;
    }
    renderButton(id, icon, name, methodName) {
        return x `
            <div class="button" @click="${(e) => this.handleAction(e, methodName)}">
                <ha-icon .icon=${icon}></ha-icon>
                <span>${name}</span>
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
    async handleAreas() {
        this._areas = Object.values(this._hass.areas).filter((area) => area && area.labels && area.labels.includes("visible"));
        this._areas?.map((area) => ({
            type: "custom:smartqasa-area-tile",
            area: area.area_id,
        }));
    }
    handleEntertain() {
        console.log("Entertain action");
    }
    handleMenu() {
        console.log("Menu action");
    }
};
__decorate([
    r()
], FooterStrip.prototype, "_config", void 0);
__decorate([
    r()
], FooterStrip.prototype, "_areas", void 0);
FooterStrip = __decorate([
    t$1("smartqasa-footer-strip")
], FooterStrip);
window.customCards.push({
    type: "smartqasa-footer-strip",
    name: "SmartQasa Footer Strip",
    preview: true,
    description: "A SmartQasa tile for displaying the panel footer strip.",
});

let MoreInfoDialog = class MoreInfoDialog extends s {
    setConfig(config) {
        if (!config.entity)
            throw new Error("A valid entity is required.");
        this._config = config;
        if (this._hass)
            this.hass = this._hass;
    }
    set hass(hass) {
        this._hass = hass;
        this._stateObj = this._config?.entity ? this._hass.states[this._config.entity] : undefined;
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
        this._time = "loading";
        this._date = "loading";
    }
    static get styles() {
        return i$4 `
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
        this._hass = hass;
        if (this._hass) {
            this._time = this._hass.states["sensor.current_time"].state || "unavailable";
            this._date = this._hass.states["sensor.current_date"].state || "unavailable";
        }
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

var styleTileBase = i$4 `
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

var styleTileIconSpin = i$4 `
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
        this._running = false;
        this._icon = "hass:help-rhombus";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
    }
    static { this.styles = [styleTileBase, styleTileIconSpin]; }
    setConfig(config) {
        this._config = { ...config };
        this.updateState();
    }
    set hass(hass) {
        if (!this._config?.area || !hass)
            return;
        this._hass = hass;
        this.updateState();
    }
    updateState() {
        if (this._running === true)
            return;
        this._areaObj = this._config?.area ? this._hass?.areas[this._config.area] : undefined;
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
        this._name = this._config?.name || this._areaObj.name || this._areaObj.id;
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
        this._running = true;
        const icon = this._icon;
        this._icon = "hass:rotate-right";
        this._iconAnimation = "spin 1.0s linear infinite";
        this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
        this._hass.callService("light", "turn_off", {
            area_id: this._areaObj.area_id,
            transition: 2,
        });
        this._hass.callService("fan", "turn_off", {
            area_id: this._areaObj.area_id,
        });
        setTimeout(() => {
            this._icon = icon;
            this._iconAnimation = "none";
            this._iconColor = "var(--sq-inactive-rgb)";
            this._running = false;
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
], AllOffTile.prototype, "_running", void 0);
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
    static { this.styles = styleTileBase; }
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
        this._icon = "hass:help-rhombus";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
    }
    static { this.styles = [styleTileBase, styleTileIconSpin]; }
    setConfig(config) {
        this._config = { ...config };
        this._updateState();
    }
    set hass(hass) {
        if (!this._config?.area || !hass)
            return;
        this._hass = hass;
        this._updateState();
    }
    _updateState() {
        this._areaObj = this._config?.area ? this._hass?.areas[this._config.area] : undefined;
        if (!this._areaObj) {
            this._icon = this._config?.icon ?? "hass:alert-rhombus";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name ?? "Unknown";
            return;
        }
        this._icon = this._config?.icon ?? this._areaObj.icon ?? this._icon;
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = this._config?.name ?? this._areaObj.name ?? "Unknown";
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
        const icon = this._icon;
        this._icon = "hass:rotate-right";
        this._iconAnimation = "spin 1.0s linear infinite";
        this._iconColor = "var(--sq-rgb-blue, 25, 125, 255)";
        window.history.pushState(null, "", `/home-dash/${this._areaObj.area_id}`);
        window.dispatchEvent(new CustomEvent("location-changed"));
        setTimeout(() => {
            this._icon = icon;
            this._iconAnimation = "none";
            this._iconColor = "var(--sq-inactive-rgb)";
        }, 2000);
        window.browser_mod?.service("close_popup", {});
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
    location_phase: {
        icon: "hass:lock",
        name: "Door Locks",
        data: {
            type: "custom:layout-card",
            layout_type: "custom:grid-layout",
            layout: {
                "grid-template-columns": "1fr",
                "grid-gap": "var(--sq-dialog-grid-gap)",
                margin: 0,
            },
            cards: [
                {
                    type: "custom:smartqasa-select-option-tile",
                    entity: "input_select.location_phase",
                    trigger: "input_button.location_phase",
                    option: "Morning",
                    icon: "mdi:weather-sunset-up",
                },
                {
                    type: "custom:button-card",
                    template: "select-tile",
                    variables: {
                        entity: "input_select.location_phase",
                        trigger: "input_button.location_phase",
                        option: "Day",
                        icon: "mdi:white-balance-sunny",
                    },
                },
                {
                    type: "custom:button-card",
                    template: "select-tile",
                    variables: {
                        entity: "input_select.location_phase",
                        trigger: "input_button.location_phase",
                        option: "Evening",
                        icon: "mdi:weather-night",
                    },
                },
                {
                    type: "custom:button-card",
                    template: "select-tile",
                    variables: {
                        entity: "input_select.location_phase",
                        trigger: "input_button.location_phase",
                        option: "Night",
                        icon: "mdi:sleep",
                    },
                },
            ],
        },
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
    rokus: {
        icon: "hass:audio-video",
        name: "Roku Players",
        data: listDialogConfig("Rokus", "group", "media_player.all_roku_players", "roku"),
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
    sonos: {
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
    static { this.styles = styleTileBase; }
    setConfig(config) {
        this._config = { ...config };
        this._updateState();
    }
    _updateState() {
        this._dialogObj = this._config ? dialogTable[this._config.dialog] : undefined;
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
    showDialog(e) {
        e.stopPropagation();
        if (!this._dialogObj)
            return;
        window.browser_mod?.service("popup", this._dialogObj.data);
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

var styleTileState = i$4 `
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

let FanTile = class FanTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:fan";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [styleTileBase, styleTileState, styleTileIconSpin]; }
    setConfig(config) {
        this._config = { ...config };
        this._updateState();
    }
    set hass(hass) {
        if (!this._config?.entity || !hass)
            return;
        this._hass = hass;
        this._updateState();
    }
    _updateState() {
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "fan"
                ? this._hass?.states[this._config.entity]
                : undefined;
        if (!this._stateObj) {
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
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
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
        this._hass.callService("fan", "toggle", { entity_id: this._stateObj.entity_id });
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj, this._hass);
    }
    showEntityList(e) {
        e.stopPropagation();
        if (!this._stateObj ||
            !Array.isArray(this._stateObj.attributes?.entity_id) ||
            this._stateObj.attributes.entity_id.length === 0)
            return;
        entityListDialog(this._stateObj.attributes?.friendly_name || this._stateObj.entity_id, "group", this._stateObj.entity_id, "fan");
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

var styleTileIconBlink = i$4 `
    @keyframes blink {
        50% {
            opacity: 0.25;
        }
    }
`;

let GarageTile = class GarageTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:garage-variant";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [styleTileBase, styleTileState, styleTileIconBlink]; }
    setConfig(config) {
        this._config = { ...config };
        this._updateState();
    }
    set hass(hass) {
        if (!this._config?.entity || !hass)
            return;
        this._hass = hass;
        this._updateState();
    }
    _updateState() {
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "cover"
                ? this._hass?.states[this._config.entity]
                : undefined;
        if (!this._stateObj) {
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
        this._name = this._config?.icon || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
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
        this._hass.callService("cover", "toggle", { entity_id: this._stateObj.entity_id });
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj, this._hass);
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
    static { this.styles = [styleTileBase, styleTileState]; }
    setConfig(config) {
        this._config = { ...config };
        this._updateState();
    }
    set hass(hass) {
        if (!this._config?.entity || !hass)
            return;
        this._hass = hass;
        this._updateState();
    }
    _updateState() {
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "water_heater"
                ? this._hass?.states[this._config.entity]
                : undefined;
        if (!this._stateObj) {
            this._icon = this._config?.icon || "hass:water-thermometer";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        const state = this._stateObj.state || "unavailable";
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
        moreInfoDialog(this._config, this._stateObj, this._hass);
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
    static { this.styles = [styleTileBase, styleTileState]; }
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
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "light"
                ? this._hass?.states[this._config.entity]
                : undefined;
        if (!this._stateObj) {
            this._icon = this._config?.icon || "hass:lightbulb-alert";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        const state = this._stateObj.state || "unknown";
        this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:lightbulb";
        this._iconColor = state === "on" ? "var(--sq-light-on-rgb)" : "var(--sq-inactive-rgb)";
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
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
        this._hass.callService("light", "toggle", { entity_id: this._stateObj.entity_id });
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj, this._hass);
    }
    showEntityList(e) {
        e.stopPropagation();
        if (!this._stateObj ||
            !Array.isArray(this._stateObj.attributes?.entity_id) ||
            this._stateObj.attributes.entity_id.length === 0)
            return;
        entityListDialog(this._stateObj.attributes?.friendly_name || this._stateObj.entity_id, "group", this._stateObj.entity_id, "light");
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
    static { this.styles = i$4 `
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
        this._actuating = false;
        this._icon = "hass:lock";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [styleTileBase, styleTileState, styleTileIconBlink, styleTileIconSpin]; }
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
        if (this._actuating === false) {
            this._stateObj =
                this._config?.entity && this._config.entity.split(".")[0] === "lock"
                    ? this._hass?.states[this._config.entity]
                    : undefined;
        }
        if (!this._stateObj) {
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
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
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
        this._actuating = true;
        this._hass.callService("lock", state == "locked" ? "unlock" : "lock", {
            entity_id: this._stateObj.entity_id,
        });
        setTimeout(() => {
            this._actuating = false;
        }, 500);
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj, this._hass);
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
], LockTile.prototype, "_actuating", void 0);
LockTile = __decorate([
    t$1("smartqasa-lock-tile")
], LockTile);
window.customCards.push({
    type: "smartqasa-lock-tile",
    name: "SmartQasa Lock Tile",
    preview: true,
    description: "A SmartQasa tile for controlling a lock entity.",
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
    static { this.styles = [styleTileBase, styleTileState, styleTileIconBlink]; }
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
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "vacuum"
                ? this._hass?.states[this._config.entity]
                : undefined;
        if (!this._stateObj) {
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
        this._name = this._config?.icon || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
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
            entity_id: this._stateObj.entity_id,
        });
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj, this._hass);
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
    static { this.styles = [styleTileBase, styleTileState]; }
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
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "media_player"
                ? this._hass?.states[this._config.entity]
                : undefined;
        if (!this._stateObj) {
            this._icon = this._config?.icon || "hass:lightbulb-alert";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:audio-video";
        const state = this._stateObj.state || "unknown";
        switch (state) {
            case "idle":
                this._iconColor = "var(--sq-media_player-idle)";
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
        this._name = this._config?.icon || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
    }
    render() {
        const iconStyles = {
            color: `rgb(${this._iconColor})`,
            backgroundColor: `rgba(${this._iconColor}, var(--sq-icon-opacity))`,
            animation: this._iconAnimation,
        };
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div
                    class="icon"
                    @click=${this.toggleEntity}
                    style="${o(iconStyles)}
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
        this._hass.callService("media_player", "toggle", { entity_id: this._stateObj.entity_id });
    }
    showMoreInfo(e) {
        e.stopPropagation();
        if (!this._config || !this._stateObj)
            return;
        const dialogConfig = {
            title: this._stateObj.attributes?.friendly_name || this._stateObj.entity_id,
            timeout: 60000,
            content: {
                type: "custom:roku-card",
                entity: this._stateObj.entity_id,
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
        this._running = false;
        this._icon = "hass:help-rhombus";
        this._iconAnimation = "none";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
    }
    static { this.styles = [styleTileBase, styleTileIconSpin]; }
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
        const validDomains = ["automation", "scene", "script"];
        this._stateObj =
            this._config?.entity && validDomains.includes(this._config.entity.split(".")[0])
                ? this._hass?.states[this._config.entity]
                : undefined;
        if (!this._stateObj) {
            this._icon = this._config?.icon || "hass:alert-rhombus";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            return;
        }
        this._icon = this._config?.icon || this._stateObj.attributes.icon || "hass:help-circle";
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
        this._running = true;
        const icon = this._icon;
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
            this._icon = icon;
            this._iconColor = "var(--sq-inactive-rgb)";
            this._iconAnimation = "none";
            this._running = false;
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
], RoutineTile.prototype, "_running", void 0);
RoutineTile = __decorate([
    t$1("smartqasa-routine-tile")
], RoutineTile);
window.customCards.push({
    type: "smartqasa-routine-tile",
    name: "SmartQasa Routine Tile",
    preview: true,
    description: "A SmartQasa tile for triggering an automation, scene, or script entity.",
});

let SelectTile = class SelectTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:form-dropdown";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [styleTileBase, styleTileState]; }
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
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "input_select"
                ? this._hass?.states[this._config.entity]
                : undefined;
        if (!this._stateObj) {
            this._icon = this._config?.icon || "hass:form-dropdown";
            this._iconColor = "var(--sq-unavailable-rgb, 255, 0, 255)";
            this._name = this._config?.name || "Unknown";
            this._stateFmtd = "Invalid entity!";
            return;
        }
        this._icon = this._config?.icon || this._stateObj.attributes?.icon || this._icon;
        this._name = this._config?.name || this._stateObj.attributes?.friendly_name || this._stateObj.entity_id;
        this._stateFmtd = this._hass.formatEntityState(this._stateObj) || "Unknown";
    }
    render() {
        return x `
            <div class="container" @click=${this.showChoices}>
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
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    showChoices(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj, this._hass);
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
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [styleTileBase, styleTileState]; }
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
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "binary_sensor"
                ? this._hass?.states[this._config.entity]
                : undefined;
        if (!this._stateObj) {
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
            this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
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
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div
                    class="icon"
                    style="
            color: rgb(${this._iconColor});
            background-color: rgba(${this._iconColor}, var(--sq-icon-opacity));
          "
                >
                    ${this._iconTemplate}
                </div>
                <div class="name">${this._name}</div>
                <div class="state">${this._stateFmtd}</div>
            </div>
        `;
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj, this._hass);
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
    static { this.styles = [styleTileBase, styleTileState, styleTileIconBlink]; }
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
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "cover"
                ? this._hass?.states[this._config.entity]
                : undefined;
        if (!this._stateObj) {
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
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
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
                    entity_id: this._stateObj.entity_id,
                    position: tilt,
                });
            }
            else {
                this._hass.callService("cover", "set_cover_position", {
                    entity_id: this._stateObj.entity_id,
                    position: 0,
                });
            }
        }
        else {
            this.hass.callService("cover", "toggle", { entity_id: this._stateObj.entity_id });
        }
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj, this._hass);
    }
    showGroupList(e) {
        e.stopPropagation();
        if (!this._stateObj ||
            !Array.isArray(this._stateObj.attributes?.entity_id) ||
            this._stateObj.attributes.entity_id.length === 0)
            return;
        entityListDialog(this._stateObj.attributes?.friendly_name || this._stateObj.entity_id, "group", this._stateObj.entity_id, "shade");
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
    static { this.styles = [styleTileBase, styleTileState]; }
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
        const validDomains = ["fan", "input_boolean", "light", "switch"];
        this._stateObj =
            this._config?.entity && validDomains.includes(this._config.entity.split(".")[0])
                ? this._hass?.states[this._config.entity]
                : undefined;
        if (!this._stateObj) {
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
        if (this._stateObj) {
            this._hass.callService("homeassistant", "toggle", {
                entity_id: this._stateObj.entity_id,
            });
        }
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj, this._hass);
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

let ThermostatTile = class ThermostatTile extends s {
    constructor() {
        super(...arguments);
        this._icon = "hass:thermostat";
        this._iconColor = "var(--sq-inactive-rgb)";
        this._name = "Loading...";
        this._stateFmtd = "Loading...";
    }
    static { this.styles = [styleTileBase, styleTileState]; }
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
        this._stateObj =
            this._config?.entity && this._config.entity.split(".")[0] === "climate"
                ? this._hass?.states[this._config.entity]
                : undefined;
        if (!this._stateObj) {
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
        this._name = this._config?.name || this._stateObj.attributes.friendly_name || this._stateObj.entity_id;
    }
    render() {
        return x `
            <div class="container" @click=${this.showMoreInfo}>
                <div
                    class="icon"
                    @click=${this.toggleEntity}
                    style="
                        color: rgb(${this._iconColor});
                        background-color: rgba(${this._iconColor}, var(--sq-icon-opacity, 0.2));
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
        if (this._stateObj) {
            this._hass.callService("climate", "toggle", { entity_id: this._stateObj.entity_id });
        }
    }
    showMoreInfo(e) {
        e.stopPropagation();
        moreInfoDialog(this._config, this._stateObj, this._hass);
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
