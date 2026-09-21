var Kv=Object.defineProperty;var Zv=(t,e,n)=>e in t?Kv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Ge=(t,e,n)=>Zv(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var jm={exports:{}},Bl={},Xm={exports:{}},We={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wo=Symbol.for("react.element"),Jv=Symbol.for("react.portal"),Qv=Symbol.for("react.fragment"),e0=Symbol.for("react.strict_mode"),t0=Symbol.for("react.profiler"),n0=Symbol.for("react.provider"),i0=Symbol.for("react.context"),r0=Symbol.for("react.forward_ref"),s0=Symbol.for("react.suspense"),o0=Symbol.for("react.memo"),a0=Symbol.for("react.lazy"),yf=Symbol.iterator;function l0(t){return t===null||typeof t!="object"?null:(t=yf&&t[yf]||t["@@iterator"],typeof t=="function"?t:null)}var Ym={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$m=Object.assign,qm={};function zs(t,e,n){this.props=t,this.context=e,this.refs=qm,this.updater=n||Ym}zs.prototype.isReactComponent={};zs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};zs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Km(){}Km.prototype=zs.prototype;function Jh(t,e,n){this.props=t,this.context=e,this.refs=qm,this.updater=n||Ym}var Qh=Jh.prototype=new Km;Qh.constructor=Jh;$m(Qh,zs.prototype);Qh.isPureReactComponent=!0;var Sf=Array.isArray,Zm=Object.prototype.hasOwnProperty,ed={current:null},Jm={key:!0,ref:!0,__self:!0,__source:!0};function Qm(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Zm.call(e,i)&&!Jm.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Wo,type:t,key:s,ref:o,props:r,_owner:ed.current}}function c0(t,e){return{$$typeof:Wo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function td(t){return typeof t=="object"&&t!==null&&t.$$typeof===Wo}function u0(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Mf=/\/+/g;function ac(t,e){return typeof t=="object"&&t!==null&&t.key!=null?u0(""+t.key):e.toString(36)}function Ya(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Wo:case Jv:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+ac(o,0):i,Sf(r)?(n="",t!=null&&(n=t.replace(Mf,"$&/")+"/"),Ya(r,e,n,"",function(c){return c})):r!=null&&(td(r)&&(r=c0(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Mf,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Sf(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+ac(s,a);o+=Ya(s,e,n,l,r)}else if(l=l0(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+ac(s,a++),o+=Ya(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ia(t,e,n){if(t==null)return t;var i=[],r=0;return Ya(t,i,"","",function(s){return e.call(n,s,r++)}),i}function h0(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Zt={current:null},$a={transition:null},d0={ReactCurrentDispatcher:Zt,ReactCurrentBatchConfig:$a,ReactCurrentOwner:ed};function eg(){throw Error("act(...) is not supported in production builds of React.")}We.Children={map:ia,forEach:function(t,e,n){ia(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ia(t,function(){e++}),e},toArray:function(t){return ia(t,function(e){return e})||[]},only:function(t){if(!td(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};We.Component=zs;We.Fragment=Qv;We.Profiler=t0;We.PureComponent=Jh;We.StrictMode=e0;We.Suspense=s0;We.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=d0;We.act=eg;We.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=$m({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=ed.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)Zm.call(e,l)&&!Jm.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Wo,type:t.type,key:r,ref:s,props:i,_owner:o}};We.createContext=function(t){return t={$$typeof:i0,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:n0,_context:t},t.Consumer=t};We.createElement=Qm;We.createFactory=function(t){var e=Qm.bind(null,t);return e.type=t,e};We.createRef=function(){return{current:null}};We.forwardRef=function(t){return{$$typeof:r0,render:t}};We.isValidElement=td;We.lazy=function(t){return{$$typeof:a0,_payload:{_status:-1,_result:t},_init:h0}};We.memo=function(t,e){return{$$typeof:o0,type:t,compare:e===void 0?null:e}};We.startTransition=function(t){var e=$a.transition;$a.transition={};try{t()}finally{$a.transition=e}};We.unstable_act=eg;We.useCallback=function(t,e){return Zt.current.useCallback(t,e)};We.useContext=function(t){return Zt.current.useContext(t)};We.useDebugValue=function(){};We.useDeferredValue=function(t){return Zt.current.useDeferredValue(t)};We.useEffect=function(t,e){return Zt.current.useEffect(t,e)};We.useId=function(){return Zt.current.useId()};We.useImperativeHandle=function(t,e,n){return Zt.current.useImperativeHandle(t,e,n)};We.useInsertionEffect=function(t,e){return Zt.current.useInsertionEffect(t,e)};We.useLayoutEffect=function(t,e){return Zt.current.useLayoutEffect(t,e)};We.useMemo=function(t,e){return Zt.current.useMemo(t,e)};We.useReducer=function(t,e,n){return Zt.current.useReducer(t,e,n)};We.useRef=function(t){return Zt.current.useRef(t)};We.useState=function(t){return Zt.current.useState(t)};We.useSyncExternalStore=function(t,e,n){return Zt.current.useSyncExternalStore(t,e,n)};We.useTransition=function(){return Zt.current.useTransition()};We.version="18.3.1";Xm.exports=We;var Ee=Xm.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f0=Ee,p0=Symbol.for("react.element"),m0=Symbol.for("react.fragment"),g0=Object.prototype.hasOwnProperty,_0=f0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,v0={key:!0,ref:!0,__self:!0,__source:!0};function tg(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)g0.call(e,i)&&!v0.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:p0,type:t,key:s,ref:o,props:r,_owner:_0.current}}Bl.Fragment=m0;Bl.jsx=tg;Bl.jsxs=tg;jm.exports=Bl;var P=jm.exports,ng={exports:{}},xn={},ig={exports:{}},rg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(T,B){var X=T.length;T.push(B);e:for(;0<X;){var ie=X-1>>>1,ye=T[ie];if(0<r(ye,B))T[ie]=B,T[X]=ye,X=ie;else break e}}function n(T){return T.length===0?null:T[0]}function i(T){if(T.length===0)return null;var B=T[0],X=T.pop();if(X!==B){T[0]=X;e:for(var ie=0,ye=T.length,He=ye>>>1;ie<He;){var G=2*(ie+1)-1,re=T[G],_e=G+1,ce=T[_e];if(0>r(re,X))_e<ye&&0>r(ce,re)?(T[ie]=ce,T[_e]=X,ie=_e):(T[ie]=re,T[G]=X,ie=G);else if(_e<ye&&0>r(ce,X))T[ie]=ce,T[_e]=X,ie=_e;else break e}}return B}function r(T,B){var X=T.sortIndex-B.sortIndex;return X!==0?X:T.id-B.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],h=1,d=null,f=3,p=!1,g=!1,v=!1,m=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(T){for(var B=n(c);B!==null;){if(B.callback===null)i(c);else if(B.startTime<=T)i(c),B.sortIndex=B.expirationTime,e(l,B);else break;B=n(c)}}function y(T){if(v=!1,x(T),!g)if(n(l)!==null)g=!0,q(b);else{var B=n(c);B!==null&&ee(y,B.startTime-T)}}function b(T,B){g=!1,v&&(v=!1,u(L),L=-1),p=!0;var X=f;try{for(x(B),d=n(l);d!==null&&(!(d.expirationTime>B)||T&&!D());){var ie=d.callback;if(typeof ie=="function"){d.callback=null,f=d.priorityLevel;var ye=ie(d.expirationTime<=B);B=t.unstable_now(),typeof ye=="function"?d.callback=ye:d===n(l)&&i(l),x(B)}else i(l);d=n(l)}if(d!==null)var He=!0;else{var G=n(c);G!==null&&ee(y,G.startTime-B),He=!1}return He}finally{d=null,f=X,p=!1}}var C=!1,A=null,L=-1,w=5,S=-1;function D(){return!(t.unstable_now()-S<w)}function F(){if(A!==null){var T=t.unstable_now();S=T;var B=!0;try{B=A(!0,T)}finally{B?V():(C=!1,A=null)}}else C=!1}var V;if(typeof _=="function")V=function(){_(F)};else if(typeof MessageChannel<"u"){var K=new MessageChannel,$=K.port2;K.port1.onmessage=F,V=function(){$.postMessage(null)}}else V=function(){m(F,0)};function q(T){A=T,C||(C=!0,V())}function ee(T,B){L=m(function(){T(t.unstable_now())},B)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(T){T.callback=null},t.unstable_continueExecution=function(){g||p||(g=!0,q(b))},t.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):w=0<T?Math.floor(1e3/T):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(T){switch(f){case 1:case 2:case 3:var B=3;break;default:B=f}var X=f;f=B;try{return T()}finally{f=X}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(T,B){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var X=f;f=T;try{return B()}finally{f=X}},t.unstable_scheduleCallback=function(T,B,X){var ie=t.unstable_now();switch(typeof X=="object"&&X!==null?(X=X.delay,X=typeof X=="number"&&0<X?ie+X:ie):X=ie,T){case 1:var ye=-1;break;case 2:ye=250;break;case 5:ye=1073741823;break;case 4:ye=1e4;break;default:ye=5e3}return ye=X+ye,T={id:h++,callback:B,priorityLevel:T,startTime:X,expirationTime:ye,sortIndex:-1},X>ie?(T.sortIndex=X,e(c,T),n(l)===null&&T===n(c)&&(v?(u(L),L=-1):v=!0,ee(y,X-ie))):(T.sortIndex=ye,e(l,T),g||p||(g=!0,q(b))),T},t.unstable_shouldYield=D,t.unstable_wrapCallback=function(T){var B=f;return function(){var X=f;f=B;try{return T.apply(this,arguments)}finally{f=X}}}})(rg);ig.exports=rg;var x0=ig.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y0=Ee,vn=x0;function se(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var sg=new Set,Ao={};function Nr(t,e){As(t,e),As(t+"Capture",e)}function As(t,e){for(Ao[t]=e,t=0;t<e.length;t++)sg.add(e[t])}var yi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),gu=Object.prototype.hasOwnProperty,S0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ef={},wf={};function M0(t){return gu.call(wf,t)?!0:gu.call(Ef,t)?!1:S0.test(t)?wf[t]=!0:(Ef[t]=!0,!1)}function E0(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function w0(t,e,n,i){if(e===null||typeof e>"u"||E0(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Jt(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var kt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){kt[t]=new Jt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];kt[e]=new Jt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){kt[t]=new Jt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){kt[t]=new Jt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){kt[t]=new Jt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){kt[t]=new Jt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){kt[t]=new Jt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){kt[t]=new Jt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){kt[t]=new Jt(t,5,!1,t.toLowerCase(),null,!1,!1)});var nd=/[\-:]([a-z])/g;function id(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(nd,id);kt[e]=new Jt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(nd,id);kt[e]=new Jt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(nd,id);kt[e]=new Jt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){kt[t]=new Jt(t,1,!1,t.toLowerCase(),null,!1,!1)});kt.xlinkHref=new Jt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){kt[t]=new Jt(t,1,!1,t.toLowerCase(),null,!0,!0)});function rd(t,e,n,i){var r=kt.hasOwnProperty(e)?kt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(w0(e,n,r,i)&&(n=null),i||r===null?M0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ai=y0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ra=Symbol.for("react.element"),ts=Symbol.for("react.portal"),ns=Symbol.for("react.fragment"),sd=Symbol.for("react.strict_mode"),_u=Symbol.for("react.profiler"),og=Symbol.for("react.provider"),ag=Symbol.for("react.context"),od=Symbol.for("react.forward_ref"),vu=Symbol.for("react.suspense"),xu=Symbol.for("react.suspense_list"),ad=Symbol.for("react.memo"),Fi=Symbol.for("react.lazy"),lg=Symbol.for("react.offscreen"),Tf=Symbol.iterator;function Xs(t){return t===null||typeof t!="object"?null:(t=Tf&&t[Tf]||t["@@iterator"],typeof t=="function"?t:null)}var yt=Object.assign,lc;function ao(t){if(lc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);lc=e&&e[1]||""}return`
`+lc+t}var cc=!1;function uc(t,e){if(!t||cc)return"";cc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{cc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ao(t):""}function T0(t){switch(t.tag){case 5:return ao(t.type);case 16:return ao("Lazy");case 13:return ao("Suspense");case 19:return ao("SuspenseList");case 0:case 2:case 15:return t=uc(t.type,!1),t;case 11:return t=uc(t.type.render,!1),t;case 1:return t=uc(t.type,!0),t;default:return""}}function yu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ns:return"Fragment";case ts:return"Portal";case _u:return"Profiler";case sd:return"StrictMode";case vu:return"Suspense";case xu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case ag:return(t.displayName||"Context")+".Consumer";case og:return(t._context.displayName||"Context")+".Provider";case od:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case ad:return e=t.displayName||null,e!==null?e:yu(t.type)||"Memo";case Fi:e=t._payload,t=t._init;try{return yu(t(e))}catch{}}return null}function A0(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return yu(e);case 8:return e===sd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Qi(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function cg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function C0(t){var e=cg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function sa(t){t._valueTracker||(t._valueTracker=C0(t))}function ug(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=cg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function dl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Su(t,e){var n=e.checked;return yt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Af(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Qi(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function hg(t,e){e=e.checked,e!=null&&rd(t,"checked",e,!1)}function Mu(t,e){hg(t,e);var n=Qi(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Eu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Eu(t,e.type,Qi(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Cf(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Eu(t,e,n){(e!=="number"||dl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var lo=Array.isArray;function gs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Qi(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function wu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(se(91));return yt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Rf(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(se(92));if(lo(n)){if(1<n.length)throw Error(se(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Qi(n)}}function dg(t,e){var n=Qi(e.value),i=Qi(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Pf(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function fg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Tu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?fg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var oa,pg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(oa=oa||document.createElement("div"),oa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=oa.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Co(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var po={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},R0=["Webkit","ms","Moz","O"];Object.keys(po).forEach(function(t){R0.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),po[e]=po[t]})});function mg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||po.hasOwnProperty(t)&&po[t]?(""+e).trim():e+"px"}function gg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=mg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var P0=yt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Au(t,e){if(e){if(P0[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(se(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(se(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(se(61))}if(e.style!=null&&typeof e.style!="object")throw Error(se(62))}}function Cu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ru=null;function ld(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Pu=null,_s=null,vs=null;function bf(t){if(t=Yo(t)){if(typeof Pu!="function")throw Error(se(280));var e=t.stateNode;e&&(e=jl(e),Pu(t.stateNode,t.type,e))}}function _g(t){_s?vs?vs.push(t):vs=[t]:_s=t}function vg(){if(_s){var t=_s,e=vs;if(vs=_s=null,bf(t),e)for(t=0;t<e.length;t++)bf(e[t])}}function xg(t,e){return t(e)}function yg(){}var hc=!1;function Sg(t,e,n){if(hc)return t(e,n);hc=!0;try{return xg(t,e,n)}finally{hc=!1,(_s!==null||vs!==null)&&(yg(),vg())}}function Ro(t,e){var n=t.stateNode;if(n===null)return null;var i=jl(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(se(231,e,typeof n));return n}var bu=!1;if(yi)try{var Ys={};Object.defineProperty(Ys,"passive",{get:function(){bu=!0}}),window.addEventListener("test",Ys,Ys),window.removeEventListener("test",Ys,Ys)}catch{bu=!1}function b0(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(h){this.onError(h)}}var mo=!1,fl=null,pl=!1,Lu=null,L0={onError:function(t){mo=!0,fl=t}};function D0(t,e,n,i,r,s,o,a,l){mo=!1,fl=null,b0.apply(L0,arguments)}function N0(t,e,n,i,r,s,o,a,l){if(D0.apply(this,arguments),mo){if(mo){var c=fl;mo=!1,fl=null}else throw Error(se(198));pl||(pl=!0,Lu=c)}}function Ir(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Mg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Lf(t){if(Ir(t)!==t)throw Error(se(188))}function I0(t){var e=t.alternate;if(!e){if(e=Ir(t),e===null)throw Error(se(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Lf(r),t;if(s===i)return Lf(r),e;s=s.sibling}throw Error(se(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(se(189))}}if(n.alternate!==i)throw Error(se(190))}if(n.tag!==3)throw Error(se(188));return n.stateNode.current===n?t:e}function Eg(t){return t=I0(t),t!==null?wg(t):null}function wg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=wg(t);if(e!==null)return e;t=t.sibling}return null}var Tg=vn.unstable_scheduleCallback,Df=vn.unstable_cancelCallback,U0=vn.unstable_shouldYield,F0=vn.unstable_requestPaint,Et=vn.unstable_now,O0=vn.unstable_getCurrentPriorityLevel,cd=vn.unstable_ImmediatePriority,Ag=vn.unstable_UserBlockingPriority,ml=vn.unstable_NormalPriority,k0=vn.unstable_LowPriority,Cg=vn.unstable_IdlePriority,Hl=null,Jn=null;function z0(t){if(Jn&&typeof Jn.onCommitFiberRoot=="function")try{Jn.onCommitFiberRoot(Hl,t,void 0,(t.current.flags&128)===128)}catch{}}var Bn=Math.clz32?Math.clz32:V0,B0=Math.log,H0=Math.LN2;function V0(t){return t>>>=0,t===0?32:31-(B0(t)/H0|0)|0}var aa=64,la=4194304;function co(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function gl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=co(a):(s&=o,s!==0&&(i=co(s)))}else o=n&~r,o!==0?i=co(o):s!==0&&(i=co(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Bn(e),r=1<<n,i|=t[n],e&=~r;return i}function G0(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function W0(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Bn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=G0(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Du(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Rg(){var t=aa;return aa<<=1,!(aa&4194240)&&(aa=64),t}function dc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function jo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Bn(e),t[e]=n}function j0(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Bn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function ud(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Bn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var tt=0;function Pg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var bg,hd,Lg,Dg,Ng,Nu=!1,ca=[],Gi=null,Wi=null,ji=null,Po=new Map,bo=new Map,ki=[],X0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Nf(t,e){switch(t){case"focusin":case"focusout":Gi=null;break;case"dragenter":case"dragleave":Wi=null;break;case"mouseover":case"mouseout":ji=null;break;case"pointerover":case"pointerout":Po.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":bo.delete(e.pointerId)}}function $s(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Yo(e),e!==null&&hd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Y0(t,e,n,i,r){switch(e){case"focusin":return Gi=$s(Gi,t,e,n,i,r),!0;case"dragenter":return Wi=$s(Wi,t,e,n,i,r),!0;case"mouseover":return ji=$s(ji,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Po.set(s,$s(Po.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,bo.set(s,$s(bo.get(s)||null,t,e,n,i,r)),!0}return!1}function Ig(t){var e=vr(t.target);if(e!==null){var n=Ir(e);if(n!==null){if(e=n.tag,e===13){if(e=Mg(n),e!==null){t.blockedOn=e,Ng(t.priority,function(){Lg(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function qa(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Iu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Ru=i,n.target.dispatchEvent(i),Ru=null}else return e=Yo(n),e!==null&&hd(e),t.blockedOn=n,!1;e.shift()}return!0}function If(t,e,n){qa(t)&&n.delete(e)}function $0(){Nu=!1,Gi!==null&&qa(Gi)&&(Gi=null),Wi!==null&&qa(Wi)&&(Wi=null),ji!==null&&qa(ji)&&(ji=null),Po.forEach(If),bo.forEach(If)}function qs(t,e){t.blockedOn===e&&(t.blockedOn=null,Nu||(Nu=!0,vn.unstable_scheduleCallback(vn.unstable_NormalPriority,$0)))}function Lo(t){function e(r){return qs(r,t)}if(0<ca.length){qs(ca[0],t);for(var n=1;n<ca.length;n++){var i=ca[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Gi!==null&&qs(Gi,t),Wi!==null&&qs(Wi,t),ji!==null&&qs(ji,t),Po.forEach(e),bo.forEach(e),n=0;n<ki.length;n++)i=ki[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<ki.length&&(n=ki[0],n.blockedOn===null);)Ig(n),n.blockedOn===null&&ki.shift()}var xs=Ai.ReactCurrentBatchConfig,_l=!0;function q0(t,e,n,i){var r=tt,s=xs.transition;xs.transition=null;try{tt=1,dd(t,e,n,i)}finally{tt=r,xs.transition=s}}function K0(t,e,n,i){var r=tt,s=xs.transition;xs.transition=null;try{tt=4,dd(t,e,n,i)}finally{tt=r,xs.transition=s}}function dd(t,e,n,i){if(_l){var r=Iu(t,e,n,i);if(r===null)Mc(t,e,i,vl,n),Nf(t,i);else if(Y0(r,t,e,n,i))i.stopPropagation();else if(Nf(t,i),e&4&&-1<X0.indexOf(t)){for(;r!==null;){var s=Yo(r);if(s!==null&&bg(s),s=Iu(t,e,n,i),s===null&&Mc(t,e,i,vl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Mc(t,e,i,null,n)}}var vl=null;function Iu(t,e,n,i){if(vl=null,t=ld(i),t=vr(t),t!==null)if(e=Ir(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Mg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return vl=t,null}function Ug(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(O0()){case cd:return 1;case Ag:return 4;case ml:case k0:return 16;case Cg:return 536870912;default:return 16}default:return 16}}var Hi=null,fd=null,Ka=null;function Fg(){if(Ka)return Ka;var t,e=fd,n=e.length,i,r="value"in Hi?Hi.value:Hi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Ka=r.slice(t,1<i?1-i:void 0)}function Za(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ua(){return!0}function Uf(){return!1}function yn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ua:Uf,this.isPropagationStopped=Uf,this}return yt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ua)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ua)},persist:function(){},isPersistent:ua}),e}var Bs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pd=yn(Bs),Xo=yt({},Bs,{view:0,detail:0}),Z0=yn(Xo),fc,pc,Ks,Vl=yt({},Xo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:md,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ks&&(Ks&&t.type==="mousemove"?(fc=t.screenX-Ks.screenX,pc=t.screenY-Ks.screenY):pc=fc=0,Ks=t),fc)},movementY:function(t){return"movementY"in t?t.movementY:pc}}),Ff=yn(Vl),J0=yt({},Vl,{dataTransfer:0}),Q0=yn(J0),ex=yt({},Xo,{relatedTarget:0}),mc=yn(ex),tx=yt({},Bs,{animationName:0,elapsedTime:0,pseudoElement:0}),nx=yn(tx),ix=yt({},Bs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),rx=yn(ix),sx=yt({},Bs,{data:0}),Of=yn(sx),ox={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ax={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},lx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function cx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=lx[t])?!!e[t]:!1}function md(){return cx}var ux=yt({},Xo,{key:function(t){if(t.key){var e=ox[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Za(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ax[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:md,charCode:function(t){return t.type==="keypress"?Za(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Za(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),hx=yn(ux),dx=yt({},Vl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),kf=yn(dx),fx=yt({},Xo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:md}),px=yn(fx),mx=yt({},Bs,{propertyName:0,elapsedTime:0,pseudoElement:0}),gx=yn(mx),_x=yt({},Vl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),vx=yn(_x),xx=[9,13,27,32],gd=yi&&"CompositionEvent"in window,go=null;yi&&"documentMode"in document&&(go=document.documentMode);var yx=yi&&"TextEvent"in window&&!go,Og=yi&&(!gd||go&&8<go&&11>=go),zf=" ",Bf=!1;function kg(t,e){switch(t){case"keyup":return xx.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function zg(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var is=!1;function Sx(t,e){switch(t){case"compositionend":return zg(e);case"keypress":return e.which!==32?null:(Bf=!0,zf);case"textInput":return t=e.data,t===zf&&Bf?null:t;default:return null}}function Mx(t,e){if(is)return t==="compositionend"||!gd&&kg(t,e)?(t=Fg(),Ka=fd=Hi=null,is=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Og&&e.locale!=="ko"?null:e.data;default:return null}}var Ex={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Ex[t.type]:e==="textarea"}function Bg(t,e,n,i){_g(i),e=xl(e,"onChange"),0<e.length&&(n=new pd("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var _o=null,Do=null;function wx(t){Zg(t,0)}function Gl(t){var e=os(t);if(ug(e))return t}function Tx(t,e){if(t==="change")return e}var Hg=!1;if(yi){var gc;if(yi){var _c="oninput"in document;if(!_c){var Vf=document.createElement("div");Vf.setAttribute("oninput","return;"),_c=typeof Vf.oninput=="function"}gc=_c}else gc=!1;Hg=gc&&(!document.documentMode||9<document.documentMode)}function Gf(){_o&&(_o.detachEvent("onpropertychange",Vg),Do=_o=null)}function Vg(t){if(t.propertyName==="value"&&Gl(Do)){var e=[];Bg(e,Do,t,ld(t)),Sg(wx,e)}}function Ax(t,e,n){t==="focusin"?(Gf(),_o=e,Do=n,_o.attachEvent("onpropertychange",Vg)):t==="focusout"&&Gf()}function Cx(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Gl(Do)}function Rx(t,e){if(t==="click")return Gl(e)}function Px(t,e){if(t==="input"||t==="change")return Gl(e)}function bx(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Wn=typeof Object.is=="function"?Object.is:bx;function No(t,e){if(Wn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!gu.call(e,r)||!Wn(t[r],e[r]))return!1}return!0}function Wf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function jf(t,e){var n=Wf(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Wf(n)}}function Gg(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Gg(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Wg(){for(var t=window,e=dl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=dl(t.document)}return e}function _d(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Lx(t){var e=Wg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Gg(n.ownerDocument.documentElement,n)){if(i!==null&&_d(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=jf(n,s);var o=jf(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Dx=yi&&"documentMode"in document&&11>=document.documentMode,rs=null,Uu=null,vo=null,Fu=!1;function Xf(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Fu||rs==null||rs!==dl(i)||(i=rs,"selectionStart"in i&&_d(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),vo&&No(vo,i)||(vo=i,i=xl(Uu,"onSelect"),0<i.length&&(e=new pd("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=rs)))}function ha(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ss={animationend:ha("Animation","AnimationEnd"),animationiteration:ha("Animation","AnimationIteration"),animationstart:ha("Animation","AnimationStart"),transitionend:ha("Transition","TransitionEnd")},vc={},jg={};yi&&(jg=document.createElement("div").style,"AnimationEvent"in window||(delete ss.animationend.animation,delete ss.animationiteration.animation,delete ss.animationstart.animation),"TransitionEvent"in window||delete ss.transitionend.transition);function Wl(t){if(vc[t])return vc[t];if(!ss[t])return t;var e=ss[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in jg)return vc[t]=e[n];return t}var Xg=Wl("animationend"),Yg=Wl("animationiteration"),$g=Wl("animationstart"),qg=Wl("transitionend"),Kg=new Map,Yf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ir(t,e){Kg.set(t,e),Nr(e,[t])}for(var xc=0;xc<Yf.length;xc++){var yc=Yf[xc],Nx=yc.toLowerCase(),Ix=yc[0].toUpperCase()+yc.slice(1);ir(Nx,"on"+Ix)}ir(Xg,"onAnimationEnd");ir(Yg,"onAnimationIteration");ir($g,"onAnimationStart");ir("dblclick","onDoubleClick");ir("focusin","onFocus");ir("focusout","onBlur");ir(qg,"onTransitionEnd");As("onMouseEnter",["mouseout","mouseover"]);As("onMouseLeave",["mouseout","mouseover"]);As("onPointerEnter",["pointerout","pointerover"]);As("onPointerLeave",["pointerout","pointerover"]);Nr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Nr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Nr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Nr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Nr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Nr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var uo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ux=new Set("cancel close invalid load scroll toggle".split(" ").concat(uo));function $f(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,N0(i,e,void 0,t),t.currentTarget=null}function Zg(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;$f(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;$f(r,a,c),s=l}}}if(pl)throw t=Lu,pl=!1,Lu=null,t}function ft(t,e){var n=e[Hu];n===void 0&&(n=e[Hu]=new Set);var i=t+"__bubble";n.has(i)||(Jg(e,t,2,!1),n.add(i))}function Sc(t,e,n){var i=0;e&&(i|=4),Jg(n,t,i,e)}var da="_reactListening"+Math.random().toString(36).slice(2);function Io(t){if(!t[da]){t[da]=!0,sg.forEach(function(n){n!=="selectionchange"&&(Ux.has(n)||Sc(n,!1,t),Sc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[da]||(e[da]=!0,Sc("selectionchange",!1,e))}}function Jg(t,e,n,i){switch(Ug(e)){case 1:var r=q0;break;case 4:r=K0;break;default:r=dd}n=r.bind(null,e,n,t),r=void 0,!bu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Mc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=vr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Sg(function(){var c=s,h=ld(n),d=[];e:{var f=Kg.get(t);if(f!==void 0){var p=pd,g=t;switch(t){case"keypress":if(Za(n)===0)break e;case"keydown":case"keyup":p=hx;break;case"focusin":g="focus",p=mc;break;case"focusout":g="blur",p=mc;break;case"beforeblur":case"afterblur":p=mc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Ff;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Q0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=px;break;case Xg:case Yg:case $g:p=nx;break;case qg:p=gx;break;case"scroll":p=Z0;break;case"wheel":p=vx;break;case"copy":case"cut":case"paste":p=rx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=kf}var v=(e&4)!==0,m=!v&&t==="scroll",u=v?f!==null?f+"Capture":null:f;v=[];for(var _=c,x;_!==null;){x=_;var y=x.stateNode;if(x.tag===5&&y!==null&&(x=y,u!==null&&(y=Ro(_,u),y!=null&&v.push(Uo(_,y,x)))),m)break;_=_.return}0<v.length&&(f=new p(f,g,null,n,h),d.push({event:f,listeners:v}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",f&&n!==Ru&&(g=n.relatedTarget||n.fromElement)&&(vr(g)||g[Si]))break e;if((p||f)&&(f=h.window===h?h:(f=h.ownerDocument)?f.defaultView||f.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?vr(g):null,g!==null&&(m=Ir(g),g!==m||g.tag!==5&&g.tag!==6)&&(g=null)):(p=null,g=c),p!==g)){if(v=Ff,y="onMouseLeave",u="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(v=kf,y="onPointerLeave",u="onPointerEnter",_="pointer"),m=p==null?f:os(p),x=g==null?f:os(g),f=new v(y,_+"leave",p,n,h),f.target=m,f.relatedTarget=x,y=null,vr(h)===c&&(v=new v(u,_+"enter",g,n,h),v.target=x,v.relatedTarget=m,y=v),m=y,p&&g)t:{for(v=p,u=g,_=0,x=v;x;x=kr(x))_++;for(x=0,y=u;y;y=kr(y))x++;for(;0<_-x;)v=kr(v),_--;for(;0<x-_;)u=kr(u),x--;for(;_--;){if(v===u||u!==null&&v===u.alternate)break t;v=kr(v),u=kr(u)}v=null}else v=null;p!==null&&qf(d,f,p,v,!1),g!==null&&m!==null&&qf(d,m,g,v,!0)}}e:{if(f=c?os(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var b=Tx;else if(Hf(f))if(Hg)b=Px;else{b=Cx;var C=Ax}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(b=Rx);if(b&&(b=b(t,c))){Bg(d,b,n,h);break e}C&&C(t,f,c),t==="focusout"&&(C=f._wrapperState)&&C.controlled&&f.type==="number"&&Eu(f,"number",f.value)}switch(C=c?os(c):window,t){case"focusin":(Hf(C)||C.contentEditable==="true")&&(rs=C,Uu=c,vo=null);break;case"focusout":vo=Uu=rs=null;break;case"mousedown":Fu=!0;break;case"contextmenu":case"mouseup":case"dragend":Fu=!1,Xf(d,n,h);break;case"selectionchange":if(Dx)break;case"keydown":case"keyup":Xf(d,n,h)}var A;if(gd)e:{switch(t){case"compositionstart":var L="onCompositionStart";break e;case"compositionend":L="onCompositionEnd";break e;case"compositionupdate":L="onCompositionUpdate";break e}L=void 0}else is?kg(t,n)&&(L="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(L="onCompositionStart");L&&(Og&&n.locale!=="ko"&&(is||L!=="onCompositionStart"?L==="onCompositionEnd"&&is&&(A=Fg()):(Hi=h,fd="value"in Hi?Hi.value:Hi.textContent,is=!0)),C=xl(c,L),0<C.length&&(L=new Of(L,t,null,n,h),d.push({event:L,listeners:C}),A?L.data=A:(A=zg(n),A!==null&&(L.data=A)))),(A=yx?Sx(t,n):Mx(t,n))&&(c=xl(c,"onBeforeInput"),0<c.length&&(h=new Of("onBeforeInput","beforeinput",null,n,h),d.push({event:h,listeners:c}),h.data=A))}Zg(d,e)})}function Uo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function xl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Ro(t,n),s!=null&&i.unshift(Uo(t,s,r)),s=Ro(t,e),s!=null&&i.push(Uo(t,s,r))),t=t.return}return i}function kr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function qf(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Ro(n,s),l!=null&&o.unshift(Uo(n,l,a))):r||(l=Ro(n,s),l!=null&&o.push(Uo(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Fx=/\r\n?/g,Ox=/\u0000|\uFFFD/g;function Kf(t){return(typeof t=="string"?t:""+t).replace(Fx,`
`).replace(Ox,"")}function fa(t,e,n){if(e=Kf(e),Kf(t)!==e&&n)throw Error(se(425))}function yl(){}var Ou=null,ku=null;function zu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Bu=typeof setTimeout=="function"?setTimeout:void 0,kx=typeof clearTimeout=="function"?clearTimeout:void 0,Zf=typeof Promise=="function"?Promise:void 0,zx=typeof queueMicrotask=="function"?queueMicrotask:typeof Zf<"u"?function(t){return Zf.resolve(null).then(t).catch(Bx)}:Bu;function Bx(t){setTimeout(function(){throw t})}function Ec(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Lo(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Lo(e)}function Xi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Jf(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Hs=Math.random().toString(36).slice(2),Kn="__reactFiber$"+Hs,Fo="__reactProps$"+Hs,Si="__reactContainer$"+Hs,Hu="__reactEvents$"+Hs,Hx="__reactListeners$"+Hs,Vx="__reactHandles$"+Hs;function vr(t){var e=t[Kn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Si]||n[Kn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Jf(t);t!==null;){if(n=t[Kn])return n;t=Jf(t)}return e}t=n,n=t.parentNode}return null}function Yo(t){return t=t[Kn]||t[Si],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function os(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(se(33))}function jl(t){return t[Fo]||null}var Vu=[],as=-1;function rr(t){return{current:t}}function pt(t){0>as||(t.current=Vu[as],Vu[as]=null,as--)}function ut(t,e){as++,Vu[as]=t.current,t.current=e}var er={},Xt=rr(er),on=rr(!1),Tr=er;function Cs(t,e){var n=t.type.contextTypes;if(!n)return er;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function an(t){return t=t.childContextTypes,t!=null}function Sl(){pt(on),pt(Xt)}function Qf(t,e,n){if(Xt.current!==er)throw Error(se(168));ut(Xt,e),ut(on,n)}function Qg(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(se(108,A0(t)||"Unknown",r));return yt({},n,i)}function Ml(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||er,Tr=Xt.current,ut(Xt,t),ut(on,on.current),!0}function ep(t,e,n){var i=t.stateNode;if(!i)throw Error(se(169));n?(t=Qg(t,e,Tr),i.__reactInternalMemoizedMergedChildContext=t,pt(on),pt(Xt),ut(Xt,t)):pt(on),ut(on,n)}var hi=null,Xl=!1,wc=!1;function e_(t){hi===null?hi=[t]:hi.push(t)}function Gx(t){Xl=!0,e_(t)}function sr(){if(!wc&&hi!==null){wc=!0;var t=0,e=tt;try{var n=hi;for(tt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}hi=null,Xl=!1}catch(r){throw hi!==null&&(hi=hi.slice(t+1)),Tg(cd,sr),r}finally{tt=e,wc=!1}}return null}var ls=[],cs=0,El=null,wl=0,En=[],wn=0,Ar=null,pi=1,mi="";function fr(t,e){ls[cs++]=wl,ls[cs++]=El,El=t,wl=e}function t_(t,e,n){En[wn++]=pi,En[wn++]=mi,En[wn++]=Ar,Ar=t;var i=pi;t=mi;var r=32-Bn(i)-1;i&=~(1<<r),n+=1;var s=32-Bn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,pi=1<<32-Bn(e)+r|n<<r|i,mi=s+t}else pi=1<<s|n<<r|i,mi=t}function vd(t){t.return!==null&&(fr(t,1),t_(t,1,0))}function xd(t){for(;t===El;)El=ls[--cs],ls[cs]=null,wl=ls[--cs],ls[cs]=null;for(;t===Ar;)Ar=En[--wn],En[wn]=null,mi=En[--wn],En[wn]=null,pi=En[--wn],En[wn]=null}var _n=null,gn=null,gt=!1,On=null;function n_(t,e){var n=Tn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function tp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,_n=t,gn=Xi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,_n=t,gn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Ar!==null?{id:pi,overflow:mi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Tn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,_n=t,gn=null,!0):!1;default:return!1}}function Gu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Wu(t){if(gt){var e=gn;if(e){var n=e;if(!tp(t,e)){if(Gu(t))throw Error(se(418));e=Xi(n.nextSibling);var i=_n;e&&tp(t,e)?n_(i,n):(t.flags=t.flags&-4097|2,gt=!1,_n=t)}}else{if(Gu(t))throw Error(se(418));t.flags=t.flags&-4097|2,gt=!1,_n=t}}}function np(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;_n=t}function pa(t){if(t!==_n)return!1;if(!gt)return np(t),gt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!zu(t.type,t.memoizedProps)),e&&(e=gn)){if(Gu(t))throw i_(),Error(se(418));for(;e;)n_(t,e),e=Xi(e.nextSibling)}if(np(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(se(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){gn=Xi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}gn=null}}else gn=_n?Xi(t.stateNode.nextSibling):null;return!0}function i_(){for(var t=gn;t;)t=Xi(t.nextSibling)}function Rs(){gn=_n=null,gt=!1}function yd(t){On===null?On=[t]:On.push(t)}var Wx=Ai.ReactCurrentBatchConfig;function Zs(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(se(309));var i=n.stateNode}if(!i)throw Error(se(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(se(284));if(!n._owner)throw Error(se(290,t))}return t}function ma(t,e){throw t=Object.prototype.toString.call(e),Error(se(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function ip(t){var e=t._init;return e(t._payload)}function r_(t){function e(u,_){if(t){var x=u.deletions;x===null?(u.deletions=[_],u.flags|=16):x.push(_)}}function n(u,_){if(!t)return null;for(;_!==null;)e(u,_),_=_.sibling;return null}function i(u,_){for(u=new Map;_!==null;)_.key!==null?u.set(_.key,_):u.set(_.index,_),_=_.sibling;return u}function r(u,_){return u=Ki(u,_),u.index=0,u.sibling=null,u}function s(u,_,x){return u.index=x,t?(x=u.alternate,x!==null?(x=x.index,x<_?(u.flags|=2,_):x):(u.flags|=2,_)):(u.flags|=1048576,_)}function o(u){return t&&u.alternate===null&&(u.flags|=2),u}function a(u,_,x,y){return _===null||_.tag!==6?(_=Lc(x,u.mode,y),_.return=u,_):(_=r(_,x),_.return=u,_)}function l(u,_,x,y){var b=x.type;return b===ns?h(u,_,x.props.children,y,x.key):_!==null&&(_.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Fi&&ip(b)===_.type)?(y=r(_,x.props),y.ref=Zs(u,_,x),y.return=u,y):(y=rl(x.type,x.key,x.props,null,u.mode,y),y.ref=Zs(u,_,x),y.return=u,y)}function c(u,_,x,y){return _===null||_.tag!==4||_.stateNode.containerInfo!==x.containerInfo||_.stateNode.implementation!==x.implementation?(_=Dc(x,u.mode,y),_.return=u,_):(_=r(_,x.children||[]),_.return=u,_)}function h(u,_,x,y,b){return _===null||_.tag!==7?(_=wr(x,u.mode,y,b),_.return=u,_):(_=r(_,x),_.return=u,_)}function d(u,_,x){if(typeof _=="string"&&_!==""||typeof _=="number")return _=Lc(""+_,u.mode,x),_.return=u,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case ra:return x=rl(_.type,_.key,_.props,null,u.mode,x),x.ref=Zs(u,null,_),x.return=u,x;case ts:return _=Dc(_,u.mode,x),_.return=u,_;case Fi:var y=_._init;return d(u,y(_._payload),x)}if(lo(_)||Xs(_))return _=wr(_,u.mode,x,null),_.return=u,_;ma(u,_)}return null}function f(u,_,x,y){var b=_!==null?_.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return b!==null?null:a(u,_,""+x,y);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case ra:return x.key===b?l(u,_,x,y):null;case ts:return x.key===b?c(u,_,x,y):null;case Fi:return b=x._init,f(u,_,b(x._payload),y)}if(lo(x)||Xs(x))return b!==null?null:h(u,_,x,y,null);ma(u,x)}return null}function p(u,_,x,y,b){if(typeof y=="string"&&y!==""||typeof y=="number")return u=u.get(x)||null,a(_,u,""+y,b);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case ra:return u=u.get(y.key===null?x:y.key)||null,l(_,u,y,b);case ts:return u=u.get(y.key===null?x:y.key)||null,c(_,u,y,b);case Fi:var C=y._init;return p(u,_,x,C(y._payload),b)}if(lo(y)||Xs(y))return u=u.get(x)||null,h(_,u,y,b,null);ma(_,y)}return null}function g(u,_,x,y){for(var b=null,C=null,A=_,L=_=0,w=null;A!==null&&L<x.length;L++){A.index>L?(w=A,A=null):w=A.sibling;var S=f(u,A,x[L],y);if(S===null){A===null&&(A=w);break}t&&A&&S.alternate===null&&e(u,A),_=s(S,_,L),C===null?b=S:C.sibling=S,C=S,A=w}if(L===x.length)return n(u,A),gt&&fr(u,L),b;if(A===null){for(;L<x.length;L++)A=d(u,x[L],y),A!==null&&(_=s(A,_,L),C===null?b=A:C.sibling=A,C=A);return gt&&fr(u,L),b}for(A=i(u,A);L<x.length;L++)w=p(A,u,L,x[L],y),w!==null&&(t&&w.alternate!==null&&A.delete(w.key===null?L:w.key),_=s(w,_,L),C===null?b=w:C.sibling=w,C=w);return t&&A.forEach(function(D){return e(u,D)}),gt&&fr(u,L),b}function v(u,_,x,y){var b=Xs(x);if(typeof b!="function")throw Error(se(150));if(x=b.call(x),x==null)throw Error(se(151));for(var C=b=null,A=_,L=_=0,w=null,S=x.next();A!==null&&!S.done;L++,S=x.next()){A.index>L?(w=A,A=null):w=A.sibling;var D=f(u,A,S.value,y);if(D===null){A===null&&(A=w);break}t&&A&&D.alternate===null&&e(u,A),_=s(D,_,L),C===null?b=D:C.sibling=D,C=D,A=w}if(S.done)return n(u,A),gt&&fr(u,L),b;if(A===null){for(;!S.done;L++,S=x.next())S=d(u,S.value,y),S!==null&&(_=s(S,_,L),C===null?b=S:C.sibling=S,C=S);return gt&&fr(u,L),b}for(A=i(u,A);!S.done;L++,S=x.next())S=p(A,u,L,S.value,y),S!==null&&(t&&S.alternate!==null&&A.delete(S.key===null?L:S.key),_=s(S,_,L),C===null?b=S:C.sibling=S,C=S);return t&&A.forEach(function(F){return e(u,F)}),gt&&fr(u,L),b}function m(u,_,x,y){if(typeof x=="object"&&x!==null&&x.type===ns&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case ra:e:{for(var b=x.key,C=_;C!==null;){if(C.key===b){if(b=x.type,b===ns){if(C.tag===7){n(u,C.sibling),_=r(C,x.props.children),_.return=u,u=_;break e}}else if(C.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Fi&&ip(b)===C.type){n(u,C.sibling),_=r(C,x.props),_.ref=Zs(u,C,x),_.return=u,u=_;break e}n(u,C);break}else e(u,C);C=C.sibling}x.type===ns?(_=wr(x.props.children,u.mode,y,x.key),_.return=u,u=_):(y=rl(x.type,x.key,x.props,null,u.mode,y),y.ref=Zs(u,_,x),y.return=u,u=y)}return o(u);case ts:e:{for(C=x.key;_!==null;){if(_.key===C)if(_.tag===4&&_.stateNode.containerInfo===x.containerInfo&&_.stateNode.implementation===x.implementation){n(u,_.sibling),_=r(_,x.children||[]),_.return=u,u=_;break e}else{n(u,_);break}else e(u,_);_=_.sibling}_=Dc(x,u.mode,y),_.return=u,u=_}return o(u);case Fi:return C=x._init,m(u,_,C(x._payload),y)}if(lo(x))return g(u,_,x,y);if(Xs(x))return v(u,_,x,y);ma(u,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,_!==null&&_.tag===6?(n(u,_.sibling),_=r(_,x),_.return=u,u=_):(n(u,_),_=Lc(x,u.mode,y),_.return=u,u=_),o(u)):n(u,_)}return m}var Ps=r_(!0),s_=r_(!1),Tl=rr(null),Al=null,us=null,Sd=null;function Md(){Sd=us=Al=null}function Ed(t){var e=Tl.current;pt(Tl),t._currentValue=e}function ju(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function ys(t,e){Al=t,Sd=us=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(sn=!0),t.firstContext=null)}function Cn(t){var e=t._currentValue;if(Sd!==t)if(t={context:t,memoizedValue:e,next:null},us===null){if(Al===null)throw Error(se(308));us=t,Al.dependencies={lanes:0,firstContext:t}}else us=us.next=t;return e}var xr=null;function wd(t){xr===null?xr=[t]:xr.push(t)}function o_(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,wd(e)):(n.next=r.next,r.next=n),e.interleaved=n,Mi(t,i)}function Mi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Oi=!1;function Td(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function a_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function vi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Yi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Ke&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Mi(t,n)}return r=i.interleaved,r===null?(e.next=e,wd(i)):(e.next=r.next,r.next=e),i.interleaved=e,Mi(t,n)}function Ja(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,ud(t,n)}}function rp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Cl(t,e,n,i){var r=t.updateQueue;Oi=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var h=t.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==o&&(a===null?h.firstBaseUpdate=c:a.next=c,h.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,h=c=l=null,a=s;do{var f=a.lane,p=a.eventTime;if((i&f)===f){h!==null&&(h=h.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var g=t,v=a;switch(f=e,p=n,v.tag){case 1:if(g=v.payload,typeof g=="function"){d=g.call(p,d,f);break e}d=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=v.payload,f=typeof g=="function"?g.call(p,d,f):g,f==null)break e;d=yt({},d,f);break e;case 2:Oi=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(c=h=p,l=d):h=h.next=p,o|=f;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;f=a,a=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(h===null&&(l=d),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=h,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Rr|=o,t.lanes=o,t.memoizedState=d}}function sp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(se(191,r));r.call(i)}}}var $o={},Qn=rr($o),Oo=rr($o),ko=rr($o);function yr(t){if(t===$o)throw Error(se(174));return t}function Ad(t,e){switch(ut(ko,e),ut(Oo,t),ut(Qn,$o),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Tu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Tu(e,t)}pt(Qn),ut(Qn,e)}function bs(){pt(Qn),pt(Oo),pt(ko)}function l_(t){yr(ko.current);var e=yr(Qn.current),n=Tu(e,t.type);e!==n&&(ut(Oo,t),ut(Qn,n))}function Cd(t){Oo.current===t&&(pt(Qn),pt(Oo))}var _t=rr(0);function Rl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Tc=[];function Rd(){for(var t=0;t<Tc.length;t++)Tc[t]._workInProgressVersionPrimary=null;Tc.length=0}var Qa=Ai.ReactCurrentDispatcher,Ac=Ai.ReactCurrentBatchConfig,Cr=0,vt=null,Ct=null,Nt=null,Pl=!1,xo=!1,zo=0,jx=0;function Ht(){throw Error(se(321))}function Pd(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Wn(t[n],e[n]))return!1;return!0}function bd(t,e,n,i,r,s){if(Cr=s,vt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Qa.current=t===null||t.memoizedState===null?qx:Kx,t=n(i,r),xo){s=0;do{if(xo=!1,zo=0,25<=s)throw Error(se(301));s+=1,Nt=Ct=null,e.updateQueue=null,Qa.current=Zx,t=n(i,r)}while(xo)}if(Qa.current=bl,e=Ct!==null&&Ct.next!==null,Cr=0,Nt=Ct=vt=null,Pl=!1,e)throw Error(se(300));return t}function Ld(){var t=zo!==0;return zo=0,t}function Yn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Nt===null?vt.memoizedState=Nt=t:Nt=Nt.next=t,Nt}function Rn(){if(Ct===null){var t=vt.alternate;t=t!==null?t.memoizedState:null}else t=Ct.next;var e=Nt===null?vt.memoizedState:Nt.next;if(e!==null)Nt=e,Ct=t;else{if(t===null)throw Error(se(310));Ct=t,t={memoizedState:Ct.memoizedState,baseState:Ct.baseState,baseQueue:Ct.baseQueue,queue:Ct.queue,next:null},Nt===null?vt.memoizedState=Nt=t:Nt=Nt.next=t}return Nt}function Bo(t,e){return typeof e=="function"?e(t):e}function Cc(t){var e=Rn(),n=e.queue;if(n===null)throw Error(se(311));n.lastRenderedReducer=t;var i=Ct,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var h=c.lane;if((Cr&h)===h)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var d={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,vt.lanes|=h,Rr|=h}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,Wn(i,e.memoizedState)||(sn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,vt.lanes|=s,Rr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Rc(t){var e=Rn(),n=e.queue;if(n===null)throw Error(se(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Wn(s,e.memoizedState)||(sn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function c_(){}function u_(t,e){var n=vt,i=Rn(),r=e(),s=!Wn(i.memoizedState,r);if(s&&(i.memoizedState=r,sn=!0),i=i.queue,Dd(f_.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Nt!==null&&Nt.memoizedState.tag&1){if(n.flags|=2048,Ho(9,d_.bind(null,n,i,r,e),void 0,null),Ut===null)throw Error(se(349));Cr&30||h_(n,e,r)}return r}function h_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=vt.updateQueue,e===null?(e={lastEffect:null,stores:null},vt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function d_(t,e,n,i){e.value=n,e.getSnapshot=i,p_(e)&&m_(t)}function f_(t,e,n){return n(function(){p_(e)&&m_(t)})}function p_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Wn(t,n)}catch{return!0}}function m_(t){var e=Mi(t,1);e!==null&&Hn(e,t,1,-1)}function op(t){var e=Yn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Bo,lastRenderedState:t},e.queue=t,t=t.dispatch=$x.bind(null,vt,t),[e.memoizedState,t]}function Ho(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=vt.updateQueue,e===null?(e={lastEffect:null,stores:null},vt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function g_(){return Rn().memoizedState}function el(t,e,n,i){var r=Yn();vt.flags|=t,r.memoizedState=Ho(1|e,n,void 0,i===void 0?null:i)}function Yl(t,e,n,i){var r=Rn();i=i===void 0?null:i;var s=void 0;if(Ct!==null){var o=Ct.memoizedState;if(s=o.destroy,i!==null&&Pd(i,o.deps)){r.memoizedState=Ho(e,n,s,i);return}}vt.flags|=t,r.memoizedState=Ho(1|e,n,s,i)}function ap(t,e){return el(8390656,8,t,e)}function Dd(t,e){return Yl(2048,8,t,e)}function __(t,e){return Yl(4,2,t,e)}function v_(t,e){return Yl(4,4,t,e)}function x_(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function y_(t,e,n){return n=n!=null?n.concat([t]):null,Yl(4,4,x_.bind(null,e,t),n)}function Nd(){}function S_(t,e){var n=Rn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Pd(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function M_(t,e){var n=Rn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Pd(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function E_(t,e,n){return Cr&21?(Wn(n,e)||(n=Rg(),vt.lanes|=n,Rr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,sn=!0),t.memoizedState=n)}function Xx(t,e){var n=tt;tt=n!==0&&4>n?n:4,t(!0);var i=Ac.transition;Ac.transition={};try{t(!1),e()}finally{tt=n,Ac.transition=i}}function w_(){return Rn().memoizedState}function Yx(t,e,n){var i=qi(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},T_(t))A_(e,n);else if(n=o_(t,e,n,i),n!==null){var r=qt();Hn(n,t,i,r),C_(n,e,i)}}function $x(t,e,n){var i=qi(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(T_(t))A_(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Wn(a,o)){var l=e.interleaved;l===null?(r.next=r,wd(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=o_(t,e,r,i),n!==null&&(r=qt(),Hn(n,t,i,r),C_(n,e,i))}}function T_(t){var e=t.alternate;return t===vt||e!==null&&e===vt}function A_(t,e){xo=Pl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function C_(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,ud(t,n)}}var bl={readContext:Cn,useCallback:Ht,useContext:Ht,useEffect:Ht,useImperativeHandle:Ht,useInsertionEffect:Ht,useLayoutEffect:Ht,useMemo:Ht,useReducer:Ht,useRef:Ht,useState:Ht,useDebugValue:Ht,useDeferredValue:Ht,useTransition:Ht,useMutableSource:Ht,useSyncExternalStore:Ht,useId:Ht,unstable_isNewReconciler:!1},qx={readContext:Cn,useCallback:function(t,e){return Yn().memoizedState=[t,e===void 0?null:e],t},useContext:Cn,useEffect:ap,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,el(4194308,4,x_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return el(4194308,4,t,e)},useInsertionEffect:function(t,e){return el(4,2,t,e)},useMemo:function(t,e){var n=Yn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Yn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Yx.bind(null,vt,t),[i.memoizedState,t]},useRef:function(t){var e=Yn();return t={current:t},e.memoizedState=t},useState:op,useDebugValue:Nd,useDeferredValue:function(t){return Yn().memoizedState=t},useTransition:function(){var t=op(!1),e=t[0];return t=Xx.bind(null,t[1]),Yn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=vt,r=Yn();if(gt){if(n===void 0)throw Error(se(407));n=n()}else{if(n=e(),Ut===null)throw Error(se(349));Cr&30||h_(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,ap(f_.bind(null,i,s,t),[t]),i.flags|=2048,Ho(9,d_.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Yn(),e=Ut.identifierPrefix;if(gt){var n=mi,i=pi;n=(i&~(1<<32-Bn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=zo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=jx++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Kx={readContext:Cn,useCallback:S_,useContext:Cn,useEffect:Dd,useImperativeHandle:y_,useInsertionEffect:__,useLayoutEffect:v_,useMemo:M_,useReducer:Cc,useRef:g_,useState:function(){return Cc(Bo)},useDebugValue:Nd,useDeferredValue:function(t){var e=Rn();return E_(e,Ct.memoizedState,t)},useTransition:function(){var t=Cc(Bo)[0],e=Rn().memoizedState;return[t,e]},useMutableSource:c_,useSyncExternalStore:u_,useId:w_,unstable_isNewReconciler:!1},Zx={readContext:Cn,useCallback:S_,useContext:Cn,useEffect:Dd,useImperativeHandle:y_,useInsertionEffect:__,useLayoutEffect:v_,useMemo:M_,useReducer:Rc,useRef:g_,useState:function(){return Rc(Bo)},useDebugValue:Nd,useDeferredValue:function(t){var e=Rn();return Ct===null?e.memoizedState=t:E_(e,Ct.memoizedState,t)},useTransition:function(){var t=Rc(Bo)[0],e=Rn().memoizedState;return[t,e]},useMutableSource:c_,useSyncExternalStore:u_,useId:w_,unstable_isNewReconciler:!1};function Un(t,e){if(t&&t.defaultProps){e=yt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Xu(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:yt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var $l={isMounted:function(t){return(t=t._reactInternals)?Ir(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=qt(),r=qi(t),s=vi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Yi(t,s,r),e!==null&&(Hn(e,t,r,i),Ja(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=qt(),r=qi(t),s=vi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Yi(t,s,r),e!==null&&(Hn(e,t,r,i),Ja(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=qt(),i=qi(t),r=vi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Yi(t,r,i),e!==null&&(Hn(e,t,i,n),Ja(e,t,i))}};function lp(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!No(n,i)||!No(r,s):!0}function R_(t,e,n){var i=!1,r=er,s=e.contextType;return typeof s=="object"&&s!==null?s=Cn(s):(r=an(e)?Tr:Xt.current,i=e.contextTypes,s=(i=i!=null)?Cs(t,r):er),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=$l,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function cp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&$l.enqueueReplaceState(e,e.state,null)}function Yu(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Td(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Cn(s):(s=an(e)?Tr:Xt.current,r.context=Cs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Xu(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&$l.enqueueReplaceState(r,r.state,null),Cl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Ls(t,e){try{var n="",i=e;do n+=T0(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Pc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function $u(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Jx=typeof WeakMap=="function"?WeakMap:Map;function P_(t,e,n){n=vi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Dl||(Dl=!0,rh=i),$u(t,e)},n}function b_(t,e,n){n=vi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){$u(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){$u(t,e),typeof i!="function"&&($i===null?$i=new Set([this]):$i.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function up(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Jx;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=dy.bind(null,t,e,n),e.then(t,t))}function hp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function dp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=vi(-1,1),e.tag=2,Yi(n,e,1))),n.lanes|=1),t)}var Qx=Ai.ReactCurrentOwner,sn=!1;function $t(t,e,n,i){e.child=t===null?s_(e,null,n,i):Ps(e,t.child,n,i)}function fp(t,e,n,i,r){n=n.render;var s=e.ref;return ys(e,r),i=bd(t,e,n,i,s,r),n=Ld(),t!==null&&!sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ei(t,e,r)):(gt&&n&&vd(e),e.flags|=1,$t(t,e,i,r),e.child)}function pp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Hd(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,L_(t,e,s,i,r)):(t=rl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:No,n(o,i)&&t.ref===e.ref)return Ei(t,e,r)}return e.flags|=1,t=Ki(s,i),t.ref=e.ref,t.return=e,e.child=t}function L_(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(No(s,i)&&t.ref===e.ref)if(sn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(sn=!0);else return e.lanes=t.lanes,Ei(t,e,r)}return qu(t,e,n,i,r)}function D_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ut(ds,fn),fn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ut(ds,fn),fn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,ut(ds,fn),fn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,ut(ds,fn),fn|=i;return $t(t,e,r,n),e.child}function N_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function qu(t,e,n,i,r){var s=an(n)?Tr:Xt.current;return s=Cs(e,s),ys(e,r),n=bd(t,e,n,i,s,r),i=Ld(),t!==null&&!sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ei(t,e,r)):(gt&&i&&vd(e),e.flags|=1,$t(t,e,n,r),e.child)}function mp(t,e,n,i,r){if(an(n)){var s=!0;Ml(e)}else s=!1;if(ys(e,r),e.stateNode===null)tl(t,e),R_(e,n,i),Yu(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Cn(c):(c=an(n)?Tr:Xt.current,c=Cs(e,c));var h=n.getDerivedStateFromProps,d=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&cp(e,o,i,c),Oi=!1;var f=e.memoizedState;o.state=f,Cl(e,i,o,r),l=e.memoizedState,a!==i||f!==l||on.current||Oi?(typeof h=="function"&&(Xu(e,n,h,i),l=e.memoizedState),(a=Oi||lp(e,n,a,i,f,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,a_(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:Un(e.type,a),o.props=c,d=e.pendingProps,f=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Cn(l):(l=an(n)?Tr:Xt.current,l=Cs(e,l));var p=n.getDerivedStateFromProps;(h=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||f!==l)&&cp(e,o,i,l),Oi=!1,f=e.memoizedState,o.state=f,Cl(e,i,o,r);var g=e.memoizedState;a!==d||f!==g||on.current||Oi?(typeof p=="function"&&(Xu(e,n,p,i),g=e.memoizedState),(c=Oi||lp(e,n,c,i,f,g,l)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,g,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,g,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),o.props=i,o.state=g,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return Ku(t,e,n,i,s,r)}function Ku(t,e,n,i,r,s){N_(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&ep(e,n,!1),Ei(t,e,s);i=e.stateNode,Qx.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Ps(e,t.child,null,s),e.child=Ps(e,null,a,s)):$t(t,e,a,s),e.memoizedState=i.state,r&&ep(e,n,!0),e.child}function I_(t){var e=t.stateNode;e.pendingContext?Qf(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Qf(t,e.context,!1),Ad(t,e.containerInfo)}function gp(t,e,n,i,r){return Rs(),yd(r),e.flags|=256,$t(t,e,n,i),e.child}var Zu={dehydrated:null,treeContext:null,retryLane:0};function Ju(t){return{baseLanes:t,cachePool:null,transitions:null}}function U_(t,e,n){var i=e.pendingProps,r=_t.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ut(_t,r&1),t===null)return Wu(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Zl(o,i,0,null),t=wr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Ju(n),e.memoizedState=Zu,t):Id(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return ey(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Ki(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Ki(a,s):(s=wr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?Ju(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Zu,i}return s=t.child,t=s.sibling,i=Ki(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Id(t,e){return e=Zl({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ga(t,e,n,i){return i!==null&&yd(i),Ps(e,t.child,null,n),t=Id(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function ey(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Pc(Error(se(422))),ga(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Zl({mode:"visible",children:i.children},r,0,null),s=wr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Ps(e,t.child,null,o),e.child.memoizedState=Ju(o),e.memoizedState=Zu,s);if(!(e.mode&1))return ga(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(se(419)),i=Pc(s,i,void 0),ga(t,e,o,i)}if(a=(o&t.childLanes)!==0,sn||a){if(i=Ut,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Mi(t,r),Hn(i,t,r,-1))}return Bd(),i=Pc(Error(se(421))),ga(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=fy.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,gn=Xi(r.nextSibling),_n=e,gt=!0,On=null,t!==null&&(En[wn++]=pi,En[wn++]=mi,En[wn++]=Ar,pi=t.id,mi=t.overflow,Ar=e),e=Id(e,i.children),e.flags|=4096,e)}function _p(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),ju(t.return,e,n)}function bc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function F_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if($t(t,e,i.children,n),i=_t.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&_p(t,n,e);else if(t.tag===19)_p(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ut(_t,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Rl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),bc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Rl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}bc(e,!0,n,null,s);break;case"together":bc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function tl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ei(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Rr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(se(153));if(e.child!==null){for(t=e.child,n=Ki(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ki(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function ty(t,e,n){switch(e.tag){case 3:I_(e),Rs();break;case 5:l_(e);break;case 1:an(e.type)&&Ml(e);break;case 4:Ad(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ut(Tl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ut(_t,_t.current&1),e.flags|=128,null):n&e.child.childLanes?U_(t,e,n):(ut(_t,_t.current&1),t=Ei(t,e,n),t!==null?t.sibling:null);ut(_t,_t.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return F_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ut(_t,_t.current),i)break;return null;case 22:case 23:return e.lanes=0,D_(t,e,n)}return Ei(t,e,n)}var O_,Qu,k_,z_;O_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Qu=function(){};k_=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,yr(Qn.current);var s=null;switch(n){case"input":r=Su(t,r),i=Su(t,i),s=[];break;case"select":r=yt({},r,{value:void 0}),i=yt({},i,{value:void 0}),s=[];break;case"textarea":r=wu(t,r),i=wu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=yl)}Au(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ao.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ao.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ft("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};z_=function(t,e,n,i){n!==i&&(e.flags|=4)};function Js(t,e){if(!gt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Vt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function ny(t,e,n){var i=e.pendingProps;switch(xd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Vt(e),null;case 1:return an(e.type)&&Sl(),Vt(e),null;case 3:return i=e.stateNode,bs(),pt(on),pt(Xt),Rd(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(pa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,On!==null&&(ah(On),On=null))),Qu(t,e),Vt(e),null;case 5:Cd(e);var r=yr(ko.current);if(n=e.type,t!==null&&e.stateNode!=null)k_(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(se(166));return Vt(e),null}if(t=yr(Qn.current),pa(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Kn]=e,i[Fo]=s,t=(e.mode&1)!==0,n){case"dialog":ft("cancel",i),ft("close",i);break;case"iframe":case"object":case"embed":ft("load",i);break;case"video":case"audio":for(r=0;r<uo.length;r++)ft(uo[r],i);break;case"source":ft("error",i);break;case"img":case"image":case"link":ft("error",i),ft("load",i);break;case"details":ft("toggle",i);break;case"input":Af(i,s),ft("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ft("invalid",i);break;case"textarea":Rf(i,s),ft("invalid",i)}Au(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&fa(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&fa(i.textContent,a,t),r=["children",""+a]):Ao.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ft("scroll",i)}switch(n){case"input":sa(i),Cf(i,s,!0);break;case"textarea":sa(i),Pf(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=yl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=fg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[Kn]=e,t[Fo]=i,O_(t,e,!1,!1),e.stateNode=t;e:{switch(o=Cu(n,i),n){case"dialog":ft("cancel",t),ft("close",t),r=i;break;case"iframe":case"object":case"embed":ft("load",t),r=i;break;case"video":case"audio":for(r=0;r<uo.length;r++)ft(uo[r],t);r=i;break;case"source":ft("error",t),r=i;break;case"img":case"image":case"link":ft("error",t),ft("load",t),r=i;break;case"details":ft("toggle",t),r=i;break;case"input":Af(t,i),r=Su(t,i),ft("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=yt({},i,{value:void 0}),ft("invalid",t);break;case"textarea":Rf(t,i),r=wu(t,i),ft("invalid",t);break;default:r=i}Au(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?gg(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&pg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Co(t,l):typeof l=="number"&&Co(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ao.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ft("scroll",t):l!=null&&rd(t,s,l,o))}switch(n){case"input":sa(t),Cf(t,i,!1);break;case"textarea":sa(t),Pf(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Qi(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?gs(t,!!i.multiple,s,!1):i.defaultValue!=null&&gs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=yl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Vt(e),null;case 6:if(t&&e.stateNode!=null)z_(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(se(166));if(n=yr(ko.current),yr(Qn.current),pa(e)){if(i=e.stateNode,n=e.memoizedProps,i[Kn]=e,(s=i.nodeValue!==n)&&(t=_n,t!==null))switch(t.tag){case 3:fa(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&fa(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Kn]=e,e.stateNode=i}return Vt(e),null;case 13:if(pt(_t),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(gt&&gn!==null&&e.mode&1&&!(e.flags&128))i_(),Rs(),e.flags|=98560,s=!1;else if(s=pa(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(se(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(se(317));s[Kn]=e}else Rs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Vt(e),s=!1}else On!==null&&(ah(On),On=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||_t.current&1?Rt===0&&(Rt=3):Bd())),e.updateQueue!==null&&(e.flags|=4),Vt(e),null);case 4:return bs(),Qu(t,e),t===null&&Io(e.stateNode.containerInfo),Vt(e),null;case 10:return Ed(e.type._context),Vt(e),null;case 17:return an(e.type)&&Sl(),Vt(e),null;case 19:if(pt(_t),s=e.memoizedState,s===null)return Vt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Js(s,!1);else{if(Rt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Rl(t),o!==null){for(e.flags|=128,Js(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ut(_t,_t.current&1|2),e.child}t=t.sibling}s.tail!==null&&Et()>Ds&&(e.flags|=128,i=!0,Js(s,!1),e.lanes=4194304)}else{if(!i)if(t=Rl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Js(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!gt)return Vt(e),null}else 2*Et()-s.renderingStartTime>Ds&&n!==1073741824&&(e.flags|=128,i=!0,Js(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Et(),e.sibling=null,n=_t.current,ut(_t,i?n&1|2:n&1),e):(Vt(e),null);case 22:case 23:return zd(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?fn&1073741824&&(Vt(e),e.subtreeFlags&6&&(e.flags|=8192)):Vt(e),null;case 24:return null;case 25:return null}throw Error(se(156,e.tag))}function iy(t,e){switch(xd(e),e.tag){case 1:return an(e.type)&&Sl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return bs(),pt(on),pt(Xt),Rd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Cd(e),null;case 13:if(pt(_t),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(se(340));Rs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return pt(_t),null;case 4:return bs(),null;case 10:return Ed(e.type._context),null;case 22:case 23:return zd(),null;case 24:return null;default:return null}}var _a=!1,jt=!1,ry=typeof WeakSet=="function"?WeakSet:Set,xe=null;function hs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Mt(t,e,i)}else n.current=null}function eh(t,e,n){try{n()}catch(i){Mt(t,e,i)}}var vp=!1;function sy(t,e){if(Ou=_l,t=Wg(),_d(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,h=0,d=t,f=null;t:for(;;){for(var p;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(p=d.firstChild)!==null;)f=d,d=p;for(;;){if(d===t)break t;if(f===n&&++c===r&&(a=o),f===s&&++h===i&&(l=o),(p=d.nextSibling)!==null)break;d=f,f=d.parentNode}d=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(ku={focusedElem:t,selectionRange:n},_l=!1,xe=e;xe!==null;)if(e=xe,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,xe=t;else for(;xe!==null;){e=xe;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var v=g.memoizedProps,m=g.memoizedState,u=e.stateNode,_=u.getSnapshotBeforeUpdate(e.elementType===e.type?v:Un(e.type,v),m);u.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var x=e.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(se(163))}}catch(y){Mt(e,e.return,y)}if(t=e.sibling,t!==null){t.return=e.return,xe=t;break}xe=e.return}return g=vp,vp=!1,g}function yo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&eh(e,n,s)}r=r.next}while(r!==i)}}function ql(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function th(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function B_(t){var e=t.alternate;e!==null&&(t.alternate=null,B_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Kn],delete e[Fo],delete e[Hu],delete e[Hx],delete e[Vx])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function H_(t){return t.tag===5||t.tag===3||t.tag===4}function xp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||H_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function nh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=yl));else if(i!==4&&(t=t.child,t!==null))for(nh(t,e,n),t=t.sibling;t!==null;)nh(t,e,n),t=t.sibling}function ih(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(ih(t,e,n),t=t.sibling;t!==null;)ih(t,e,n),t=t.sibling}var Ft=null,Fn=!1;function Pi(t,e,n){for(n=n.child;n!==null;)V_(t,e,n),n=n.sibling}function V_(t,e,n){if(Jn&&typeof Jn.onCommitFiberUnmount=="function")try{Jn.onCommitFiberUnmount(Hl,n)}catch{}switch(n.tag){case 5:jt||hs(n,e);case 6:var i=Ft,r=Fn;Ft=null,Pi(t,e,n),Ft=i,Fn=r,Ft!==null&&(Fn?(t=Ft,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ft.removeChild(n.stateNode));break;case 18:Ft!==null&&(Fn?(t=Ft,n=n.stateNode,t.nodeType===8?Ec(t.parentNode,n):t.nodeType===1&&Ec(t,n),Lo(t)):Ec(Ft,n.stateNode));break;case 4:i=Ft,r=Fn,Ft=n.stateNode.containerInfo,Fn=!0,Pi(t,e,n),Ft=i,Fn=r;break;case 0:case 11:case 14:case 15:if(!jt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&eh(n,e,o),r=r.next}while(r!==i)}Pi(t,e,n);break;case 1:if(!jt&&(hs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){Mt(n,e,a)}Pi(t,e,n);break;case 21:Pi(t,e,n);break;case 22:n.mode&1?(jt=(i=jt)||n.memoizedState!==null,Pi(t,e,n),jt=i):Pi(t,e,n);break;default:Pi(t,e,n)}}function yp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new ry),e.forEach(function(i){var r=py.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Ln(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Ft=a.stateNode,Fn=!1;break e;case 3:Ft=a.stateNode.containerInfo,Fn=!0;break e;case 4:Ft=a.stateNode.containerInfo,Fn=!0;break e}a=a.return}if(Ft===null)throw Error(se(160));V_(s,o,r),Ft=null,Fn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Mt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)G_(e,t),e=e.sibling}function G_(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Ln(e,t),Xn(t),i&4){try{yo(3,t,t.return),ql(3,t)}catch(v){Mt(t,t.return,v)}try{yo(5,t,t.return)}catch(v){Mt(t,t.return,v)}}break;case 1:Ln(e,t),Xn(t),i&512&&n!==null&&hs(n,n.return);break;case 5:if(Ln(e,t),Xn(t),i&512&&n!==null&&hs(n,n.return),t.flags&32){var r=t.stateNode;try{Co(r,"")}catch(v){Mt(t,t.return,v)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&hg(r,s),Cu(a,o);var c=Cu(a,s);for(o=0;o<l.length;o+=2){var h=l[o],d=l[o+1];h==="style"?gg(r,d):h==="dangerouslySetInnerHTML"?pg(r,d):h==="children"?Co(r,d):rd(r,h,d,c)}switch(a){case"input":Mu(r,s);break;case"textarea":dg(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?gs(r,!!s.multiple,p,!1):f!==!!s.multiple&&(s.defaultValue!=null?gs(r,!!s.multiple,s.defaultValue,!0):gs(r,!!s.multiple,s.multiple?[]:"",!1))}r[Fo]=s}catch(v){Mt(t,t.return,v)}}break;case 6:if(Ln(e,t),Xn(t),i&4){if(t.stateNode===null)throw Error(se(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(v){Mt(t,t.return,v)}}break;case 3:if(Ln(e,t),Xn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Lo(e.containerInfo)}catch(v){Mt(t,t.return,v)}break;case 4:Ln(e,t),Xn(t);break;case 13:Ln(e,t),Xn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Od=Et())),i&4&&yp(t);break;case 22:if(h=n!==null&&n.memoizedState!==null,t.mode&1?(jt=(c=jt)||h,Ln(e,t),jt=c):Ln(e,t),Xn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!h&&t.mode&1)for(xe=t,h=t.child;h!==null;){for(d=xe=h;xe!==null;){switch(f=xe,p=f.child,f.tag){case 0:case 11:case 14:case 15:yo(4,f,f.return);break;case 1:hs(f,f.return);var g=f.stateNode;if(typeof g.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(v){Mt(i,n,v)}}break;case 5:hs(f,f.return);break;case 22:if(f.memoizedState!==null){Mp(d);continue}}p!==null?(p.return=f,xe=p):Mp(d)}h=h.sibling}e:for(h=null,d=t;;){if(d.tag===5){if(h===null){h=d;try{r=d.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=mg("display",o))}catch(v){Mt(t,t.return,v)}}}else if(d.tag===6){if(h===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(v){Mt(t,t.return,v)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;h===d&&(h=null),d=d.return}h===d&&(h=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Ln(e,t),Xn(t),i&4&&yp(t);break;case 21:break;default:Ln(e,t),Xn(t)}}function Xn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(H_(n)){var i=n;break e}n=n.return}throw Error(se(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Co(r,""),i.flags&=-33);var s=xp(t);ih(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=xp(t);nh(t,a,o);break;default:throw Error(se(161))}}catch(l){Mt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function oy(t,e,n){xe=t,W_(t)}function W_(t,e,n){for(var i=(t.mode&1)!==0;xe!==null;){var r=xe,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||_a;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||jt;a=_a;var c=jt;if(_a=o,(jt=l)&&!c)for(xe=r;xe!==null;)o=xe,l=o.child,o.tag===22&&o.memoizedState!==null?Ep(r):l!==null?(l.return=o,xe=l):Ep(r);for(;s!==null;)xe=s,W_(s),s=s.sibling;xe=r,_a=a,jt=c}Sp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,xe=s):Sp(t)}}function Sp(t){for(;xe!==null;){var e=xe;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:jt||ql(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!jt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Un(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&sp(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}sp(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var d=h.dehydrated;d!==null&&Lo(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(se(163))}jt||e.flags&512&&th(e)}catch(f){Mt(e,e.return,f)}}if(e===t){xe=null;break}if(n=e.sibling,n!==null){n.return=e.return,xe=n;break}xe=e.return}}function Mp(t){for(;xe!==null;){var e=xe;if(e===t){xe=null;break}var n=e.sibling;if(n!==null){n.return=e.return,xe=n;break}xe=e.return}}function Ep(t){for(;xe!==null;){var e=xe;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{ql(4,e)}catch(l){Mt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Mt(e,r,l)}}var s=e.return;try{th(e)}catch(l){Mt(e,s,l)}break;case 5:var o=e.return;try{th(e)}catch(l){Mt(e,o,l)}}}catch(l){Mt(e,e.return,l)}if(e===t){xe=null;break}var a=e.sibling;if(a!==null){a.return=e.return,xe=a;break}xe=e.return}}var ay=Math.ceil,Ll=Ai.ReactCurrentDispatcher,Ud=Ai.ReactCurrentOwner,An=Ai.ReactCurrentBatchConfig,Ke=0,Ut=null,Tt=null,Ot=0,fn=0,ds=rr(0),Rt=0,Vo=null,Rr=0,Kl=0,Fd=0,So=null,rn=null,Od=0,Ds=1/0,ui=null,Dl=!1,rh=null,$i=null,va=!1,Vi=null,Nl=0,Mo=0,sh=null,nl=-1,il=0;function qt(){return Ke&6?Et():nl!==-1?nl:nl=Et()}function qi(t){return t.mode&1?Ke&2&&Ot!==0?Ot&-Ot:Wx.transition!==null?(il===0&&(il=Rg()),il):(t=tt,t!==0||(t=window.event,t=t===void 0?16:Ug(t.type)),t):1}function Hn(t,e,n,i){if(50<Mo)throw Mo=0,sh=null,Error(se(185));jo(t,n,i),(!(Ke&2)||t!==Ut)&&(t===Ut&&(!(Ke&2)&&(Kl|=n),Rt===4&&zi(t,Ot)),ln(t,i),n===1&&Ke===0&&!(e.mode&1)&&(Ds=Et()+500,Xl&&sr()))}function ln(t,e){var n=t.callbackNode;W0(t,e);var i=gl(t,t===Ut?Ot:0);if(i===0)n!==null&&Df(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Df(n),e===1)t.tag===0?Gx(wp.bind(null,t)):e_(wp.bind(null,t)),zx(function(){!(Ke&6)&&sr()}),n=null;else{switch(Pg(i)){case 1:n=cd;break;case 4:n=Ag;break;case 16:n=ml;break;case 536870912:n=Cg;break;default:n=ml}n=J_(n,j_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function j_(t,e){if(nl=-1,il=0,Ke&6)throw Error(se(327));var n=t.callbackNode;if(Ss()&&t.callbackNode!==n)return null;var i=gl(t,t===Ut?Ot:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Il(t,i);else{e=i;var r=Ke;Ke|=2;var s=Y_();(Ut!==t||Ot!==e)&&(ui=null,Ds=Et()+500,Er(t,e));do try{uy();break}catch(a){X_(t,a)}while(!0);Md(),Ll.current=s,Ke=r,Tt!==null?e=0:(Ut=null,Ot=0,e=Rt)}if(e!==0){if(e===2&&(r=Du(t),r!==0&&(i=r,e=oh(t,r))),e===1)throw n=Vo,Er(t,0),zi(t,i),ln(t,Et()),n;if(e===6)zi(t,i);else{if(r=t.current.alternate,!(i&30)&&!ly(r)&&(e=Il(t,i),e===2&&(s=Du(t),s!==0&&(i=s,e=oh(t,s))),e===1))throw n=Vo,Er(t,0),zi(t,i),ln(t,Et()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(se(345));case 2:pr(t,rn,ui);break;case 3:if(zi(t,i),(i&130023424)===i&&(e=Od+500-Et(),10<e)){if(gl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){qt(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Bu(pr.bind(null,t,rn,ui),e);break}pr(t,rn,ui);break;case 4:if(zi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Bn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Et()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*ay(i/1960))-i,10<i){t.timeoutHandle=Bu(pr.bind(null,t,rn,ui),i);break}pr(t,rn,ui);break;case 5:pr(t,rn,ui);break;default:throw Error(se(329))}}}return ln(t,Et()),t.callbackNode===n?j_.bind(null,t):null}function oh(t,e){var n=So;return t.current.memoizedState.isDehydrated&&(Er(t,e).flags|=256),t=Il(t,e),t!==2&&(e=rn,rn=n,e!==null&&ah(e)),t}function ah(t){rn===null?rn=t:rn.push.apply(rn,t)}function ly(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Wn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function zi(t,e){for(e&=~Fd,e&=~Kl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Bn(e),i=1<<n;t[n]=-1,e&=~i}}function wp(t){if(Ke&6)throw Error(se(327));Ss();var e=gl(t,0);if(!(e&1))return ln(t,Et()),null;var n=Il(t,e);if(t.tag!==0&&n===2){var i=Du(t);i!==0&&(e=i,n=oh(t,i))}if(n===1)throw n=Vo,Er(t,0),zi(t,e),ln(t,Et()),n;if(n===6)throw Error(se(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,pr(t,rn,ui),ln(t,Et()),null}function kd(t,e){var n=Ke;Ke|=1;try{return t(e)}finally{Ke=n,Ke===0&&(Ds=Et()+500,Xl&&sr())}}function Pr(t){Vi!==null&&Vi.tag===0&&!(Ke&6)&&Ss();var e=Ke;Ke|=1;var n=An.transition,i=tt;try{if(An.transition=null,tt=1,t)return t()}finally{tt=i,An.transition=n,Ke=e,!(Ke&6)&&sr()}}function zd(){fn=ds.current,pt(ds)}function Er(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,kx(n)),Tt!==null)for(n=Tt.return;n!==null;){var i=n;switch(xd(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Sl();break;case 3:bs(),pt(on),pt(Xt),Rd();break;case 5:Cd(i);break;case 4:bs();break;case 13:pt(_t);break;case 19:pt(_t);break;case 10:Ed(i.type._context);break;case 22:case 23:zd()}n=n.return}if(Ut=t,Tt=t=Ki(t.current,null),Ot=fn=e,Rt=0,Vo=null,Fd=Kl=Rr=0,rn=So=null,xr!==null){for(e=0;e<xr.length;e++)if(n=xr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}xr=null}return t}function X_(t,e){do{var n=Tt;try{if(Md(),Qa.current=bl,Pl){for(var i=vt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Pl=!1}if(Cr=0,Nt=Ct=vt=null,xo=!1,zo=0,Ud.current=null,n===null||n.return===null){Rt=1,Vo=e,Tt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Ot,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,h=a,d=h.tag;if(!(h.mode&1)&&(d===0||d===11||d===15)){var f=h.alternate;f?(h.updateQueue=f.updateQueue,h.memoizedState=f.memoizedState,h.lanes=f.lanes):(h.updateQueue=null,h.memoizedState=null)}var p=hp(o);if(p!==null){p.flags&=-257,dp(p,o,a,s,e),p.mode&1&&up(s,c,e),e=p,l=c;var g=e.updateQueue;if(g===null){var v=new Set;v.add(l),e.updateQueue=v}else g.add(l);break e}else{if(!(e&1)){up(s,c,e),Bd();break e}l=Error(se(426))}}else if(gt&&a.mode&1){var m=hp(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),dp(m,o,a,s,e),yd(Ls(l,a));break e}}s=l=Ls(l,a),Rt!==4&&(Rt=2),So===null?So=[s]:So.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=P_(s,l,e);rp(s,u);break e;case 1:a=l;var _=s.type,x=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&($i===null||!$i.has(x)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=b_(s,a,e);rp(s,y);break e}}s=s.return}while(s!==null)}q_(n)}catch(b){e=b,Tt===n&&n!==null&&(Tt=n=n.return);continue}break}while(!0)}function Y_(){var t=Ll.current;return Ll.current=bl,t===null?bl:t}function Bd(){(Rt===0||Rt===3||Rt===2)&&(Rt=4),Ut===null||!(Rr&268435455)&&!(Kl&268435455)||zi(Ut,Ot)}function Il(t,e){var n=Ke;Ke|=2;var i=Y_();(Ut!==t||Ot!==e)&&(ui=null,Er(t,e));do try{cy();break}catch(r){X_(t,r)}while(!0);if(Md(),Ke=n,Ll.current=i,Tt!==null)throw Error(se(261));return Ut=null,Ot=0,Rt}function cy(){for(;Tt!==null;)$_(Tt)}function uy(){for(;Tt!==null&&!U0();)$_(Tt)}function $_(t){var e=Z_(t.alternate,t,fn);t.memoizedProps=t.pendingProps,e===null?q_(t):Tt=e,Ud.current=null}function q_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=iy(n,e),n!==null){n.flags&=32767,Tt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Rt=6,Tt=null;return}}else if(n=ny(n,e,fn),n!==null){Tt=n;return}if(e=e.sibling,e!==null){Tt=e;return}Tt=e=t}while(e!==null);Rt===0&&(Rt=5)}function pr(t,e,n){var i=tt,r=An.transition;try{An.transition=null,tt=1,hy(t,e,n,i)}finally{An.transition=r,tt=i}return null}function hy(t,e,n,i){do Ss();while(Vi!==null);if(Ke&6)throw Error(se(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(se(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(j0(t,s),t===Ut&&(Tt=Ut=null,Ot=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||va||(va=!0,J_(ml,function(){return Ss(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=An.transition,An.transition=null;var o=tt;tt=1;var a=Ke;Ke|=4,Ud.current=null,sy(t,n),G_(n,t),Lx(ku),_l=!!Ou,ku=Ou=null,t.current=n,oy(n),F0(),Ke=a,tt=o,An.transition=s}else t.current=n;if(va&&(va=!1,Vi=t,Nl=r),s=t.pendingLanes,s===0&&($i=null),z0(n.stateNode),ln(t,Et()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Dl)throw Dl=!1,t=rh,rh=null,t;return Nl&1&&t.tag!==0&&Ss(),s=t.pendingLanes,s&1?t===sh?Mo++:(Mo=0,sh=t):Mo=0,sr(),null}function Ss(){if(Vi!==null){var t=Pg(Nl),e=An.transition,n=tt;try{if(An.transition=null,tt=16>t?16:t,Vi===null)var i=!1;else{if(t=Vi,Vi=null,Nl=0,Ke&6)throw Error(se(331));var r=Ke;for(Ke|=4,xe=t.current;xe!==null;){var s=xe,o=s.child;if(xe.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(xe=c;xe!==null;){var h=xe;switch(h.tag){case 0:case 11:case 15:yo(8,h,s)}var d=h.child;if(d!==null)d.return=h,xe=d;else for(;xe!==null;){h=xe;var f=h.sibling,p=h.return;if(B_(h),h===c){xe=null;break}if(f!==null){f.return=p,xe=f;break}xe=p}}}var g=s.alternate;if(g!==null){var v=g.child;if(v!==null){g.child=null;do{var m=v.sibling;v.sibling=null,v=m}while(v!==null)}}xe=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,xe=o;else e:for(;xe!==null;){if(s=xe,s.flags&2048)switch(s.tag){case 0:case 11:case 15:yo(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,xe=u;break e}xe=s.return}}var _=t.current;for(xe=_;xe!==null;){o=xe;var x=o.child;if(o.subtreeFlags&2064&&x!==null)x.return=o,xe=x;else e:for(o=_;xe!==null;){if(a=xe,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:ql(9,a)}}catch(b){Mt(a,a.return,b)}if(a===o){xe=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,xe=y;break e}xe=a.return}}if(Ke=r,sr(),Jn&&typeof Jn.onPostCommitFiberRoot=="function")try{Jn.onPostCommitFiberRoot(Hl,t)}catch{}i=!0}return i}finally{tt=n,An.transition=e}}return!1}function Tp(t,e,n){e=Ls(n,e),e=P_(t,e,1),t=Yi(t,e,1),e=qt(),t!==null&&(jo(t,1,e),ln(t,e))}function Mt(t,e,n){if(t.tag===3)Tp(t,t,n);else for(;e!==null;){if(e.tag===3){Tp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&($i===null||!$i.has(i))){t=Ls(n,t),t=b_(e,t,1),e=Yi(e,t,1),t=qt(),e!==null&&(jo(e,1,t),ln(e,t));break}}e=e.return}}function dy(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=qt(),t.pingedLanes|=t.suspendedLanes&n,Ut===t&&(Ot&n)===n&&(Rt===4||Rt===3&&(Ot&130023424)===Ot&&500>Et()-Od?Er(t,0):Fd|=n),ln(t,e)}function K_(t,e){e===0&&(t.mode&1?(e=la,la<<=1,!(la&130023424)&&(la=4194304)):e=1);var n=qt();t=Mi(t,e),t!==null&&(jo(t,e,n),ln(t,n))}function fy(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),K_(t,n)}function py(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(se(314))}i!==null&&i.delete(e),K_(t,n)}var Z_;Z_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||on.current)sn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return sn=!1,ty(t,e,n);sn=!!(t.flags&131072)}else sn=!1,gt&&e.flags&1048576&&t_(e,wl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;tl(t,e),t=e.pendingProps;var r=Cs(e,Xt.current);ys(e,n),r=bd(null,e,i,t,r,n);var s=Ld();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,an(i)?(s=!0,Ml(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Td(e),r.updater=$l,e.stateNode=r,r._reactInternals=e,Yu(e,i,t,n),e=Ku(null,e,i,!0,s,n)):(e.tag=0,gt&&s&&vd(e),$t(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(tl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=gy(i),t=Un(i,t),r){case 0:e=qu(null,e,i,t,n);break e;case 1:e=mp(null,e,i,t,n);break e;case 11:e=fp(null,e,i,t,n);break e;case 14:e=pp(null,e,i,Un(i.type,t),n);break e}throw Error(se(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Un(i,r),qu(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Un(i,r),mp(t,e,i,r,n);case 3:e:{if(I_(e),t===null)throw Error(se(387));i=e.pendingProps,s=e.memoizedState,r=s.element,a_(t,e),Cl(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Ls(Error(se(423)),e),e=gp(t,e,i,n,r);break e}else if(i!==r){r=Ls(Error(se(424)),e),e=gp(t,e,i,n,r);break e}else for(gn=Xi(e.stateNode.containerInfo.firstChild),_n=e,gt=!0,On=null,n=s_(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Rs(),i===r){e=Ei(t,e,n);break e}$t(t,e,i,n)}e=e.child}return e;case 5:return l_(e),t===null&&Wu(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,zu(i,r)?o=null:s!==null&&zu(i,s)&&(e.flags|=32),N_(t,e),$t(t,e,o,n),e.child;case 6:return t===null&&Wu(e),null;case 13:return U_(t,e,n);case 4:return Ad(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Ps(e,null,i,n):$t(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Un(i,r),fp(t,e,i,r,n);case 7:return $t(t,e,e.pendingProps,n),e.child;case 8:return $t(t,e,e.pendingProps.children,n),e.child;case 12:return $t(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,ut(Tl,i._currentValue),i._currentValue=o,s!==null)if(Wn(s.value,o)){if(s.children===r.children&&!on.current){e=Ei(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=vi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?l.next=l:(l.next=h.next,h.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),ju(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(se(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),ju(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}$t(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,ys(e,n),r=Cn(r),i=i(r),e.flags|=1,$t(t,e,i,n),e.child;case 14:return i=e.type,r=Un(i,e.pendingProps),r=Un(i.type,r),pp(t,e,i,r,n);case 15:return L_(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Un(i,r),tl(t,e),e.tag=1,an(i)?(t=!0,Ml(e)):t=!1,ys(e,n),R_(e,i,r),Yu(e,i,r,n),Ku(null,e,i,!0,t,n);case 19:return F_(t,e,n);case 22:return D_(t,e,n)}throw Error(se(156,e.tag))};function J_(t,e){return Tg(t,e)}function my(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Tn(t,e,n,i){return new my(t,e,n,i)}function Hd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function gy(t){if(typeof t=="function")return Hd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===od)return 11;if(t===ad)return 14}return 2}function Ki(t,e){var n=t.alternate;return n===null?(n=Tn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function rl(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Hd(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ns:return wr(n.children,r,s,e);case sd:o=8,r|=8;break;case _u:return t=Tn(12,n,e,r|2),t.elementType=_u,t.lanes=s,t;case vu:return t=Tn(13,n,e,r),t.elementType=vu,t.lanes=s,t;case xu:return t=Tn(19,n,e,r),t.elementType=xu,t.lanes=s,t;case lg:return Zl(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case og:o=10;break e;case ag:o=9;break e;case od:o=11;break e;case ad:o=14;break e;case Fi:o=16,i=null;break e}throw Error(se(130,t==null?t:typeof t,""))}return e=Tn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function wr(t,e,n,i){return t=Tn(7,t,i,e),t.lanes=n,t}function Zl(t,e,n,i){return t=Tn(22,t,i,e),t.elementType=lg,t.lanes=n,t.stateNode={isHidden:!1},t}function Lc(t,e,n){return t=Tn(6,t,null,e),t.lanes=n,t}function Dc(t,e,n){return e=Tn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function _y(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=dc(0),this.expirationTimes=dc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=dc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Vd(t,e,n,i,r,s,o,a,l){return t=new _y(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Tn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Td(s),t}function vy(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ts,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Q_(t){if(!t)return er;t=t._reactInternals;e:{if(Ir(t)!==t||t.tag!==1)throw Error(se(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(an(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(se(171))}if(t.tag===1){var n=t.type;if(an(n))return Qg(t,n,e)}return e}function ev(t,e,n,i,r,s,o,a,l){return t=Vd(n,i,!0,t,r,s,o,a,l),t.context=Q_(null),n=t.current,i=qt(),r=qi(n),s=vi(i,r),s.callback=e??null,Yi(n,s,r),t.current.lanes=r,jo(t,r,i),ln(t,i),t}function Jl(t,e,n,i){var r=e.current,s=qt(),o=qi(r);return n=Q_(n),e.context===null?e.context=n:e.pendingContext=n,e=vi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Yi(r,e,o),t!==null&&(Hn(t,r,o,s),Ja(t,r,o)),o}function Ul(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Ap(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Gd(t,e){Ap(t,e),(t=t.alternate)&&Ap(t,e)}function xy(){return null}var tv=typeof reportError=="function"?reportError:function(t){console.error(t)};function Wd(t){this._internalRoot=t}Ql.prototype.render=Wd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(se(409));Jl(t,e,null,null)};Ql.prototype.unmount=Wd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Pr(function(){Jl(null,t,null,null)}),e[Si]=null}};function Ql(t){this._internalRoot=t}Ql.prototype.unstable_scheduleHydration=function(t){if(t){var e=Dg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ki.length&&e!==0&&e<ki[n].priority;n++);ki.splice(n,0,t),n===0&&Ig(t)}};function jd(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function ec(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Cp(){}function yy(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Ul(o);s.call(c)}}var o=ev(e,i,t,0,null,!1,!1,"",Cp);return t._reactRootContainer=o,t[Si]=o.current,Io(t.nodeType===8?t.parentNode:t),Pr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Ul(l);a.call(c)}}var l=Vd(t,0,!1,null,null,!1,!1,"",Cp);return t._reactRootContainer=l,t[Si]=l.current,Io(t.nodeType===8?t.parentNode:t),Pr(function(){Jl(e,l,n,i)}),l}function tc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Ul(o);a.call(l)}}Jl(e,o,t,r)}else o=yy(n,e,t,r,i);return Ul(o)}bg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=co(e.pendingLanes);n!==0&&(ud(e,n|1),ln(e,Et()),!(Ke&6)&&(Ds=Et()+500,sr()))}break;case 13:Pr(function(){var i=Mi(t,1);if(i!==null){var r=qt();Hn(i,t,1,r)}}),Gd(t,1)}};hd=function(t){if(t.tag===13){var e=Mi(t,134217728);if(e!==null){var n=qt();Hn(e,t,134217728,n)}Gd(t,134217728)}};Lg=function(t){if(t.tag===13){var e=qi(t),n=Mi(t,e);if(n!==null){var i=qt();Hn(n,t,e,i)}Gd(t,e)}};Dg=function(){return tt};Ng=function(t,e){var n=tt;try{return tt=t,e()}finally{tt=n}};Pu=function(t,e,n){switch(e){case"input":if(Mu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=jl(i);if(!r)throw Error(se(90));ug(i),Mu(i,r)}}}break;case"textarea":dg(t,n);break;case"select":e=n.value,e!=null&&gs(t,!!n.multiple,e,!1)}};xg=kd;yg=Pr;var Sy={usingClientEntryPoint:!1,Events:[Yo,os,jl,_g,vg,kd]},Qs={findFiberByHostInstance:vr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},My={bundleType:Qs.bundleType,version:Qs.version,rendererPackageName:Qs.rendererPackageName,rendererConfig:Qs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ai.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Eg(t),t===null?null:t.stateNode},findFiberByHostInstance:Qs.findFiberByHostInstance||xy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var xa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!xa.isDisabled&&xa.supportsFiber)try{Hl=xa.inject(My),Jn=xa}catch{}}xn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Sy;xn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!jd(e))throw Error(se(200));return vy(t,e,null,n)};xn.createRoot=function(t,e){if(!jd(t))throw Error(se(299));var n=!1,i="",r=tv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Vd(t,1,!1,null,null,n,!1,i,r),t[Si]=e.current,Io(t.nodeType===8?t.parentNode:t),new Wd(e)};xn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(se(188)):(t=Object.keys(t).join(","),Error(se(268,t)));return t=Eg(e),t=t===null?null:t.stateNode,t};xn.flushSync=function(t){return Pr(t)};xn.hydrate=function(t,e,n){if(!ec(e))throw Error(se(200));return tc(null,t,e,!0,n)};xn.hydrateRoot=function(t,e,n){if(!jd(t))throw Error(se(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=tv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=ev(e,null,t,1,n??null,r,!1,s,o),t[Si]=e.current,Io(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Ql(e)};xn.render=function(t,e,n){if(!ec(e))throw Error(se(200));return tc(null,t,e,!1,n)};xn.unmountComponentAtNode=function(t){if(!ec(t))throw Error(se(40));return t._reactRootContainer?(Pr(function(){tc(null,null,t,!1,function(){t._reactRootContainer=null,t[Si]=null})}),!0):!1};xn.unstable_batchedUpdates=kd;xn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!ec(n))throw Error(se(200));if(t==null||t._reactInternals===void 0)throw Error(se(38));return tc(t,e,n,!1,i)};xn.version="18.3.1-next-f1338f8080-20240426";function nv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nv)}catch(t){console.error(t)}}nv(),ng.exports=xn;var Ey=ng.exports,iv,Rp=Ey;iv=Rp.createRoot,Rp.hydrateRoot;class wy{constructor(){Ge(this,"ws",null);Ge(this,"handlers",new Set);Ge(this,"reconnects",0);Ge(this,"closed",!1)}connect(){this.closed=!1,this._open()}url(){return`${location.protocol==="https:"?"wss:":"ws:"}//${location.host}/ws`}_open(){const e=new WebSocket(this.url());this.ws=e,e.onopen=()=>{this.reconnects=0,this.emit({type:"_open"})},e.onmessage=n=>{try{const i=JSON.parse(String(n.data));this.emit(i)}catch{}},e.onclose=()=>{if(this.emit({type:"_close"}),!this.closed){const n=Math.min(4e3,400+this.reconnects*400);this.reconnects+=1,setTimeout(()=>this._open(),n)}}}emit(e){this.handlers.forEach(n=>n(e))}on(e){return this.handlers.add(e),()=>this.handlers.delete(e)}send(e){this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify(e))}close(){var e;this.closed=!0,(e=this.ws)==null||e.close()}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xd="170",Ms={ROTATE:0,DOLLY:1,PAN:2},fs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ty=0,Pp=1,Ay=2,rv=1,sv=2,ci=3,tr=0,Kt=1,fi=2,Zi=0,Es=1,bp=2,Lp=3,Dp=4,Cy=5,gr=100,Ry=101,Py=102,by=103,Ly=104,Dy=200,Ny=201,Iy=202,Uy=203,lh=204,ch=205,Fy=206,Oy=207,ky=208,zy=209,By=210,Hy=211,Vy=212,Gy=213,Wy=214,uh=0,hh=1,dh=2,Ns=3,fh=4,ph=5,mh=6,gh=7,ov=0,jy=1,Xy=2,Ji=0,Yy=1,$y=2,qy=3,av=4,Ky=5,Zy=6,Jy=7,lv=300,Is=301,Us=302,_h=303,vh=304,nc=306,xh=1e3,Sr=1001,yh=1002,Vn=1003,Qy=1004,ya=1005,Zn=1006,Nc=1007,Mr=1008,wi=1009,cv=1010,uv=1011,Go=1012,Yd=1013,br=1014,gi=1015,qo=1016,$d=1017,qd=1018,Fs=1020,hv=35902,dv=1021,fv=1022,zn=1023,pv=1024,mv=1025,ws=1026,Os=1027,gv=1028,Kd=1029,_v=1030,Zd=1031,Jd=1033,sl=33776,ol=33777,al=33778,ll=33779,Sh=35840,Mh=35841,Eh=35842,wh=35843,Th=36196,Ah=37492,Ch=37496,Rh=37808,Ph=37809,bh=37810,Lh=37811,Dh=37812,Nh=37813,Ih=37814,Uh=37815,Fh=37816,Oh=37817,kh=37818,zh=37819,Bh=37820,Hh=37821,cl=36492,Vh=36494,Gh=36495,vv=36283,Wh=36284,jh=36285,Xh=36286,eS=3200,tS=3201,xv=0,nS=1,Bi="",pn="srgb",Vs="srgb-linear",ic="linear",nt="srgb",zr=7680,Np=519,iS=512,rS=513,sS=514,yv=515,oS=516,aS=517,lS=518,cS=519,Ip=35044,Up="300 es",_i=2e3,Fl=2001;class Ur{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ul=Math.PI/180,Yh=180/Math.PI;function Ko(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Gt[t&255]+Gt[t>>8&255]+Gt[t>>16&255]+Gt[t>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[n&63|128]+Gt[n>>8&255]+"-"+Gt[n>>16&255]+Gt[n>>24&255]+Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]).toLowerCase()}function It(t,e,n){return Math.max(e,Math.min(n,t))}function uS(t,e){return(t%e+e)%e}function Ic(t,e,n){return(1-n)*t+n*e}function eo(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function tn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const hS={DEG2RAD:ul};class de{constructor(e=0,n=0){de.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(It(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,n,i,r,s,o,a,l,c){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=n,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],d=i[7],f=i[2],p=i[5],g=i[8],v=r[0],m=r[3],u=r[6],_=r[1],x=r[4],y=r[7],b=r[2],C=r[5],A=r[8];return s[0]=o*v+a*_+l*b,s[3]=o*m+a*x+l*C,s[6]=o*u+a*y+l*A,s[1]=c*v+h*_+d*b,s[4]=c*m+h*x+d*C,s[7]=c*u+h*y+d*A,s[2]=f*v+p*_+g*b,s[5]=f*m+p*x+g*C,s[8]=f*u+p*y+g*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return n*o*h-n*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,f=a*l-h*s,p=c*s-o*l,g=n*d+i*f+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(r*c-h*i)*v,e[2]=(a*i-r*o)*v,e[3]=f*v,e[4]=(h*n-r*l)*v,e[5]=(r*s-a*n)*v,e[6]=p*v,e[7]=(i*l-c*n)*v,e[8]=(o*n-i*s)*v,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Uc.makeScale(e,n)),this}rotate(e){return this.premultiply(Uc.makeRotation(-e)),this}translate(e,n){return this.premultiply(Uc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Uc=new ke;function Sv(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Ol(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function dS(){const t=Ol("canvas");return t.style.display="block",t}const Fp={};function ho(t){t in Fp||(Fp[t]=!0,console.warn(t))}function fS(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function pS(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function mS(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const qe={enabled:!0,workingColorSpace:Vs,spaces:{},convert:function(t,e,n){return this.enabled===!1||e===n||!e||!n||(this.spaces[e].transfer===nt&&(t.r=xi(t.r),t.g=xi(t.g),t.b=xi(t.b)),this.spaces[e].primaries!==this.spaces[n].primaries&&(t.applyMatrix3(this.spaces[e].toXYZ),t.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===nt&&(t.r=Ts(t.r),t.g=Ts(t.g),t.b=Ts(t.b))),t},fromWorkingColorSpace:function(t,e){return this.convert(t,this.workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this.workingColorSpace)},getPrimaries:function(t){return this.spaces[t].primaries},getTransfer:function(t){return t===Bi?ic:this.spaces[t].transfer},getLuminanceCoefficients:function(t,e=this.workingColorSpace){return t.fromArray(this.spaces[e].luminanceCoefficients)},define:function(t){Object.assign(this.spaces,t)},_getMatrix:function(t,e,n){return t.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(t){return this.spaces[t].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(t=this.workingColorSpace){return this.spaces[t].workingColorSpaceConfig.unpackColorSpace}};function xi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Ts(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}const Op=[.64,.33,.3,.6,.15,.06],kp=[.2126,.7152,.0722],zp=[.3127,.329],Bp=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hp=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qe.define({[Vs]:{primaries:Op,whitePoint:zp,transfer:ic,toXYZ:Bp,fromXYZ:Hp,luminanceCoefficients:kp,workingColorSpaceConfig:{unpackColorSpace:pn},outputColorSpaceConfig:{drawingBufferColorSpace:pn}},[pn]:{primaries:Op,whitePoint:zp,transfer:nt,toXYZ:Bp,fromXYZ:Hp,luminanceCoefficients:kp,outputColorSpaceConfig:{drawingBufferColorSpace:pn}}});let Br;class gS{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Br===void 0&&(Br=Ol("canvas")),Br.width=e.width,Br.height=e.height;const i=Br.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Br}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Ol("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=xi(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(xi(n[i]/255)*255):n[i]=xi(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _S=0;class Mv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_S++}),this.uuid=Ko(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Fc(r[o].image)):s.push(Fc(r[o]))}else s=Fc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Fc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?gS.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vS=0;class cn extends Ur{constructor(e=cn.DEFAULT_IMAGE,n=cn.DEFAULT_MAPPING,i=Sr,r=Sr,s=Zn,o=Mr,a=zn,l=wi,c=cn.DEFAULT_ANISOTROPY,h=Bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vS++}),this.uuid=Ko(),this.name="",this.source=new Mv(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xh:e.x=e.x-Math.floor(e.x);break;case Sr:e.x=e.x<0?0:1;break;case yh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xh:e.y=e.y-Math.floor(e.y);break;case Sr:e.y=e.y<0?0:1;break;case yh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=lv;cn.DEFAULT_ANISOTROPY=1;class st{constructor(e=0,n=0,i=0,r=1){st.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],h=l[4],d=l[8],f=l[1],p=l[5],g=l[9],v=l[2],m=l[6],u=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const x=(c+1)/2,y=(p+1)/2,b=(u+1)/2,C=(h+f)/4,A=(d+v)/4,L=(g+m)/4;return x>y&&x>b?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=C/i,s=A/i):y>b?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=C/r,s=L/r):b<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),i=A/s,r=L/s),this.set(i,r,s,n),this}let _=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(d-v)/_,this.z=(f-h)/_,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xS extends Ur{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new st(0,0,e,n),this.scissorTest=!1,this.viewport=new st(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new cn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Mv(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Lr extends xS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Ev extends cn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=Sr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class yS extends cn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=Sr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Dr{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],d=i[r+3];const f=s[o+0],p=s[o+1],g=s[o+2],v=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=h,e[n+3]=d;return}if(a===1){e[n+0]=f,e[n+1]=p,e[n+2]=g,e[n+3]=v;return}if(d!==v||l!==f||c!==p||h!==g){let m=1-a;const u=l*f+c*p+h*g+d*v,_=u>=0?1:-1,x=1-u*u;if(x>Number.EPSILON){const b=Math.sqrt(x),C=Math.atan2(b,u*_);m=Math.sin(m*C)/b,a=Math.sin(a*C)/b}const y=a*_;if(l=l*m+f*y,c=c*m+p*y,h=h*m+g*y,d=d*m+v*y,m===1-a){const b=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=b,c*=b,h*=b,d*=b}}e[n]=l,e[n+1]=c,e[n+2]=h,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],d=s[o],f=s[o+1],p=s[o+2],g=s[o+3];return e[n]=a*g+h*d+l*p-c*f,e[n+1]=l*g+h*f+c*d-a*p,e[n+2]=c*g+h*p+a*f-l*d,e[n+3]=h*g-a*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),d=a(s/2),f=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*h*d+c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d-f*p*g;break;case"YXZ":this._x=f*h*d+c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d+f*p*g;break;case"ZXY":this._x=f*h*d-c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d-f*p*g;break;case"ZYX":this._x=f*h*d-c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d+f*p*g;break;case"YZX":this._x=f*h*d+c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d-f*p*g;break;case"XZY":this._x=f*h*d-c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],h=n[6],d=n[10],f=i+a+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(h-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(It(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-n)*h)/c,f=Math.sin(n*h)/c;return this._w=o*d+this._w*f,this._x=i*d+this._x*f,this._y=r*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,n=0,i=0){N.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Vp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Vp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),h=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*c+o*d-a*h,this.y=i+l*h+a*c-s*d,this.z=r+l*d+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Oc.copy(this).projectOnVector(e),this.sub(Oc)}reflect(e){return this.sub(Oc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(It(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Oc=new N,Vp=new Dr;class Zo{constructor(e=new N(1/0,1/0,1/0),n=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Dn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Dn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Dn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Dn):Dn.fromBufferAttribute(s,o),Dn.applyMatrix4(e.matrixWorld),this.expandByPoint(Dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Sa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Sa.copy(i.boundingBox)),Sa.applyMatrix4(e.matrixWorld),this.union(Sa)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Dn),Dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(to),Ma.subVectors(this.max,to),Hr.subVectors(e.a,to),Vr.subVectors(e.b,to),Gr.subVectors(e.c,to),bi.subVectors(Vr,Hr),Li.subVectors(Gr,Vr),ar.subVectors(Hr,Gr);let n=[0,-bi.z,bi.y,0,-Li.z,Li.y,0,-ar.z,ar.y,bi.z,0,-bi.x,Li.z,0,-Li.x,ar.z,0,-ar.x,-bi.y,bi.x,0,-Li.y,Li.x,0,-ar.y,ar.x,0];return!kc(n,Hr,Vr,Gr,Ma)||(n=[1,0,0,0,1,0,0,0,1],!kc(n,Hr,Vr,Gr,Ma))?!1:(Ea.crossVectors(bi,Li),n=[Ea.x,Ea.y,Ea.z],kc(n,Hr,Vr,Gr,Ma))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ri=[new N,new N,new N,new N,new N,new N,new N,new N],Dn=new N,Sa=new Zo,Hr=new N,Vr=new N,Gr=new N,bi=new N,Li=new N,ar=new N,to=new N,Ma=new N,Ea=new N,lr=new N;function kc(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){lr.fromArray(t,s);const a=r.x*Math.abs(lr.x)+r.y*Math.abs(lr.y)+r.z*Math.abs(lr.z),l=e.dot(lr),c=n.dot(lr),h=i.dot(lr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const SS=new Zo,no=new N,zc=new N;class Jo{constructor(e=new N,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):SS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;no.subVectors(e,this.center);const n=no.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(no,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(no.copy(e.center).add(zc)),this.expandByPoint(no.copy(e.center).sub(zc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const si=new N,Bc=new N,wa=new N,Di=new N,Hc=new N,Ta=new N,Vc=new N;class Qo{constructor(e=new N,n=new N(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,si)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=si.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(si.copy(this.origin).addScaledVector(this.direction,n),si.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Bc.copy(e).add(n).multiplyScalar(.5),wa.copy(n).sub(e).normalize(),Di.copy(this.origin).sub(Bc);const s=e.distanceTo(n)*.5,o=-this.direction.dot(wa),a=Di.dot(this.direction),l=-Di.dot(wa),c=Di.lengthSq(),h=Math.abs(1-o*o);let d,f,p,g;if(h>0)if(d=o*l-a,f=o*a-l,g=s*h,d>=0)if(f>=-g)if(f<=g){const v=1/h;d*=v,f*=v,p=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Bc).addScaledVector(wa,f),p}intersectSphere(e,n){si.subVectors(e.center,this.origin);const i=si.dot(this.direction),r=si.dot(si)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),h>=0?(s=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,si)!==null}intersectTriangle(e,n,i,r,s){Hc.subVectors(n,e),Ta.subVectors(i,e),Vc.crossVectors(Hc,Ta);let o=this.direction.dot(Vc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Di.subVectors(this.origin,e);const l=a*this.direction.dot(Ta.crossVectors(Di,Ta));if(l<0)return null;const c=a*this.direction.dot(Hc.cross(Di));if(c<0||l+c>o)return null;const h=-a*Di.dot(Vc);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,n,i,r,s,o,a,l,c,h,d,f,p,g,v,m){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,h,d,f,p,g,v,m)}set(e,n,i,r,s,o,a,l,c,h,d,f,p,g,v,m){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=f,u[3]=p,u[7]=g,u[11]=v,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Wr.setFromMatrixColumn(e,0).length(),s=1/Wr.setFromMatrixColumn(e,1).length(),o=1/Wr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*h,p=o*d,g=a*h,v=a*d;n[0]=l*h,n[4]=-l*d,n[8]=c,n[1]=p+g*c,n[5]=f-v*c,n[9]=-a*l,n[2]=v-f*c,n[6]=g+p*c,n[10]=o*l}else if(e.order==="YXZ"){const f=l*h,p=l*d,g=c*h,v=c*d;n[0]=f+v*a,n[4]=g*a-p,n[8]=o*c,n[1]=o*d,n[5]=o*h,n[9]=-a,n[2]=p*a-g,n[6]=v+f*a,n[10]=o*l}else if(e.order==="ZXY"){const f=l*h,p=l*d,g=c*h,v=c*d;n[0]=f-v*a,n[4]=-o*d,n[8]=g+p*a,n[1]=p+g*a,n[5]=o*h,n[9]=v-f*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const f=o*h,p=o*d,g=a*h,v=a*d;n[0]=l*h,n[4]=g*c-p,n[8]=f*c+v,n[1]=l*d,n[5]=v*c+f,n[9]=p*c-g,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,g=a*l,v=a*c;n[0]=l*h,n[4]=v-f*d,n[8]=g*d+p,n[1]=d,n[5]=o*h,n[9]=-a*h,n[2]=-c*h,n[6]=p*d+g,n[10]=f-v*d}else if(e.order==="XZY"){const f=o*l,p=o*c,g=a*l,v=a*c;n[0]=l*h,n[4]=-d,n[8]=c*h,n[1]=f*d+v,n[5]=o*h,n[9]=p*d-g,n[2]=g*d-p,n[6]=a*h,n[10]=v*d+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(MS,e,ES)}lookAt(e,n,i){const r=this.elements;return hn.subVectors(e,n),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),Ni.crossVectors(i,hn),Ni.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),Ni.crossVectors(i,hn)),Ni.normalize(),Aa.crossVectors(hn,Ni),r[0]=Ni.x,r[4]=Aa.x,r[8]=hn.x,r[1]=Ni.y,r[5]=Aa.y,r[9]=hn.y,r[2]=Ni.z,r[6]=Aa.z,r[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],d=i[5],f=i[9],p=i[13],g=i[2],v=i[6],m=i[10],u=i[14],_=i[3],x=i[7],y=i[11],b=i[15],C=r[0],A=r[4],L=r[8],w=r[12],S=r[1],D=r[5],F=r[9],V=r[13],K=r[2],$=r[6],q=r[10],ee=r[14],T=r[3],B=r[7],X=r[11],ie=r[15];return s[0]=o*C+a*S+l*K+c*T,s[4]=o*A+a*D+l*$+c*B,s[8]=o*L+a*F+l*q+c*X,s[12]=o*w+a*V+l*ee+c*ie,s[1]=h*C+d*S+f*K+p*T,s[5]=h*A+d*D+f*$+p*B,s[9]=h*L+d*F+f*q+p*X,s[13]=h*w+d*V+f*ee+p*ie,s[2]=g*C+v*S+m*K+u*T,s[6]=g*A+v*D+m*$+u*B,s[10]=g*L+v*F+m*q+u*X,s[14]=g*w+v*V+m*ee+u*ie,s[3]=_*C+x*S+y*K+b*T,s[7]=_*A+x*D+y*$+b*B,s[11]=_*L+x*F+y*q+b*X,s[15]=_*w+x*V+y*ee+b*ie,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],f=e[10],p=e[14],g=e[3],v=e[7],m=e[11],u=e[15];return g*(+s*l*d-r*c*d-s*a*f+i*c*f+r*a*p-i*l*p)+v*(+n*l*p-n*c*f+s*o*f-r*o*p+r*c*h-s*l*h)+m*(+n*c*d-n*a*p-s*o*d+i*o*p+s*a*h-i*c*h)+u*(-r*a*h-n*l*d+n*a*f+r*o*d-i*o*f+i*l*h)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],f=e[10],p=e[11],g=e[12],v=e[13],m=e[14],u=e[15],_=d*m*c-v*f*c+v*l*p-a*m*p-d*l*u+a*f*u,x=g*f*c-h*m*c-g*l*p+o*m*p+h*l*u-o*f*u,y=h*v*c-g*d*c+g*a*p-o*v*p-h*a*u+o*d*u,b=g*d*l-h*v*l-g*a*f+o*v*f+h*a*m-o*d*m,C=n*_+i*x+r*y+s*b;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return e[0]=_*A,e[1]=(v*f*s-d*m*s-v*r*p+i*m*p+d*r*u-i*f*u)*A,e[2]=(a*m*s-v*l*s+v*r*c-i*m*c-a*r*u+i*l*u)*A,e[3]=(d*l*s-a*f*s-d*r*c+i*f*c+a*r*p-i*l*p)*A,e[4]=x*A,e[5]=(h*m*s-g*f*s+g*r*p-n*m*p-h*r*u+n*f*u)*A,e[6]=(g*l*s-o*m*s-g*r*c+n*m*c+o*r*u-n*l*u)*A,e[7]=(o*f*s-h*l*s+h*r*c-n*f*c-o*r*p+n*l*p)*A,e[8]=y*A,e[9]=(g*d*s-h*v*s-g*i*p+n*v*p+h*i*u-n*d*u)*A,e[10]=(o*v*s-g*a*s+g*i*c-n*v*c-o*i*u+n*a*u)*A,e[11]=(h*a*s-o*d*s-h*i*c+n*d*c+o*i*p-n*a*p)*A,e[12]=b*A,e[13]=(h*v*r-g*d*r+g*i*f-n*v*f-h*i*m+n*d*m)*A,e[14]=(g*a*r-o*v*r-g*i*l+n*v*l+o*i*m-n*a*m)*A,e[15]=(o*d*r-h*a*r+h*i*l-n*d*l-o*i*f+n*a*f)*A,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,h=o+o,d=a+a,f=s*c,p=s*h,g=s*d,v=o*h,m=o*d,u=a*d,_=l*c,x=l*h,y=l*d,b=i.x,C=i.y,A=i.z;return r[0]=(1-(v+u))*b,r[1]=(p+y)*b,r[2]=(g-x)*b,r[3]=0,r[4]=(p-y)*C,r[5]=(1-(f+u))*C,r[6]=(m+_)*C,r[7]=0,r[8]=(g+x)*A,r[9]=(m-_)*A,r[10]=(1-(f+v))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Wr.set(r[0],r[1],r[2]).length();const o=Wr.set(r[4],r[5],r[6]).length(),a=Wr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Nn.copy(this);const c=1/s,h=1/o,d=1/a;return Nn.elements[0]*=c,Nn.elements[1]*=c,Nn.elements[2]*=c,Nn.elements[4]*=h,Nn.elements[5]*=h,Nn.elements[6]*=h,Nn.elements[8]*=d,Nn.elements[9]*=d,Nn.elements[10]*=d,n.setFromRotationMatrix(Nn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=_i){const l=this.elements,c=2*s/(n-e),h=2*s/(i-r),d=(n+e)/(n-e),f=(i+r)/(i-r);let p,g;if(a===_i)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Fl)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=_i){const l=this.elements,c=1/(n-e),h=1/(i-r),d=1/(o-s),f=(n+e)*c,p=(i+r)*h;let g,v;if(a===_i)g=(o+s)*d,v=-2*d;else if(a===Fl)g=s*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Wr=new N,Nn=new at,MS=new N(0,0,0),ES=new N(1,1,1),Ni=new N,Aa=new N,hn=new N,Gp=new at,Wp=new Dr;class ei{constructor(e=0,n=0,i=0,r=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],d=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(It(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-It(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(It(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-It(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(It(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-It(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Gp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gp,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Wp.setFromEuler(this),this.setFromQuaternion(Wp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class Qd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wS=0;const jp=new N,jr=new Dr,oi=new at,Ca=new N,io=new N,TS=new N,AS=new Dr,Xp=new N(1,0,0),Yp=new N(0,1,0),$p=new N(0,0,1),qp={type:"added"},CS={type:"removed"},Xr={type:"childadded",child:null},Gc={type:"childremoved",child:null};class Pt extends Ur{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wS++}),this.uuid=Ko(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new N,n=new ei,i=new Dr,r=new N(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new at},normalMatrix:{value:new ke}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return jr.setFromAxisAngle(e,n),this.quaternion.multiply(jr),this}rotateOnWorldAxis(e,n){return jr.setFromAxisAngle(e,n),this.quaternion.premultiply(jr),this}rotateX(e){return this.rotateOnAxis(Xp,e)}rotateY(e){return this.rotateOnAxis(Yp,e)}rotateZ(e){return this.rotateOnAxis($p,e)}translateOnAxis(e,n){return jp.copy(e).applyQuaternion(this.quaternion),this.position.add(jp.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Xp,e)}translateY(e){return this.translateOnAxis(Yp,e)}translateZ(e){return this.translateOnAxis($p,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ca.copy(e):Ca.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),io.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(io,Ca,this.up):oi.lookAt(Ca,io,this.up),this.quaternion.setFromRotationMatrix(oi),r&&(oi.extractRotation(r.matrixWorld),jr.setFromRotationMatrix(oi),this.quaternion.premultiply(jr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(qp),Xr.child=e,this.dispatchEvent(Xr),Xr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(CS),Gc.child=e,this.dispatchEvent(Gc),Gc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(qp),Xr.child=e,this.dispatchEvent(Xr),Xr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,e,TS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,AS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Pt.DEFAULT_UP=new N(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const In=new N,ai=new N,Wc=new N,li=new N,Yr=new N,$r=new N,Kp=new N,jc=new N,Xc=new N,Yc=new N,$c=new st,qc=new st,Kc=new st;class kn{constructor(e=new N,n=new N,i=new N){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),In.subVectors(e,n),r.cross(In);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){In.subVectors(r,n),ai.subVectors(i,n),Wc.subVectors(e,n);const o=In.dot(In),a=In.dot(ai),l=In.dot(Wc),c=ai.dot(ai),h=ai.dot(Wc),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,p=(c*l-a*h)*f,g=(o*h-a*l)*f;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,li)===null?!1:li.x>=0&&li.y>=0&&li.x+li.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,li)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,li.x),l.addScaledVector(o,li.y),l.addScaledVector(a,li.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return $c.setScalar(0),qc.setScalar(0),Kc.setScalar(0),$c.fromBufferAttribute(e,n),qc.fromBufferAttribute(e,i),Kc.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector($c,s.x),o.addScaledVector(qc,s.y),o.addScaledVector(Kc,s.z),o}static isFrontFacing(e,n,i,r){return In.subVectors(i,n),ai.subVectors(e,n),In.cross(ai).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return In.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),In.cross(ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return kn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return kn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return kn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return kn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return kn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Yr.subVectors(r,i),$r.subVectors(s,i),jc.subVectors(e,i);const l=Yr.dot(jc),c=$r.dot(jc);if(l<=0&&c<=0)return n.copy(i);Xc.subVectors(e,r);const h=Yr.dot(Xc),d=$r.dot(Xc);if(h>=0&&d<=h)return n.copy(r);const f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),n.copy(i).addScaledVector(Yr,o);Yc.subVectors(e,s);const p=Yr.dot(Yc),g=$r.dot(Yc);if(g>=0&&p<=g)return n.copy(s);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),n.copy(i).addScaledVector($r,a);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Kp.subVectors(s,r),a=(d-h)/(d-h+(p-g)),n.copy(r).addScaledVector(Kp,a);const u=1/(m+v+f);return o=v*u,a=f*u,n.copy(i).addScaledVector(Yr,o).addScaledVector($r,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const wv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},Ra={h:0,s:0,l:0};function Zc(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ne{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=qe.workingColorSpace){return this.r=e,this.g=n,this.b=i,qe.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=qe.workingColorSpace){if(e=uS(e,1),n=It(n,0,1),i=It(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Zc(o,s,e+1/3),this.g=Zc(o,s,e),this.b=Zc(o,s,e-1/3)}return qe.toWorkingColorSpace(this,r),this}setStyle(e,n=pn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=pn){const i=wv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xi(e.r),this.g=xi(e.g),this.b=xi(e.b),this}copyLinearToSRGB(e){return this.r=Ts(e.r),this.g=Ts(e.g),this.b=Ts(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pn){return qe.fromWorkingColorSpace(Wt.copy(this),e),Math.round(It(Wt.r*255,0,255))*65536+Math.round(It(Wt.g*255,0,255))*256+Math.round(It(Wt.b*255,0,255))}getHexString(e=pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=qe.workingColorSpace){qe.fromWorkingColorSpace(Wt.copy(this),n);const i=Wt.r,r=Wt.g,s=Wt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,n=qe.workingColorSpace){return qe.fromWorkingColorSpace(Wt.copy(this),n),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=pn){qe.fromWorkingColorSpace(Wt.copy(this),e);const n=Wt.r,i=Wt.g,r=Wt.b;return e!==pn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ii),this.setHSL(Ii.h+e,Ii.s+n,Ii.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ii),e.getHSL(Ra);const i=Ic(Ii.h,Ra.h,n),r=Ic(Ii.s,Ra.s,n),s=Ic(Ii.l,Ra.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new Ne;Ne.NAMES=wv;let RS=0;class Fr extends Ur{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:RS++}),this.uuid=Ko(),this.name="",this.blending=Es,this.side=tr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lh,this.blendDst=ch,this.blendEquation=gr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=Ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Np,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zr,this.stencilZFail=zr,this.stencilZPass=zr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Es&&(i.blending=this.blending),this.side!==tr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==lh&&(i.blendSrc=this.blendSrc),this.blendDst!==ch&&(i.blendDst=this.blendDst),this.blendEquation!==gr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ns&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Np&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==zr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==zr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class rc extends Fr{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=ov,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wt=new N,Pa=new de;class Gn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Ip,this.updateRanges=[],this.gpuType=gi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Pa.fromBufferAttribute(this,n),Pa.applyMatrix3(e),this.setXY(n,Pa.x,Pa.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyMatrix3(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyMatrix4(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyNormalMatrix(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.transformDirection(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=eo(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=tn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=eo(n,this.array)),n}setX(e,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=eo(n,this.array)),n}setY(e,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=eo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=eo(n,this.array)),n}setW(e,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=tn(n,this.array),i=tn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=tn(n,this.array),i=tn(i,this.array),r=tn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=tn(n,this.array),i=tn(i,this.array),r=tn(r,this.array),s=tn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ip&&(e.usage=this.usage),e}}class Tv extends Gn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Av extends Gn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class xt extends Gn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let PS=0;const Mn=new at,Jc=new Pt,qr=new N,dn=new Zo,ro=new Zo,Dt=new N;class Qt extends Ur{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:PS++}),this.uuid=Ko(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Sv(e)?Av:Tv)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Mn.makeRotationFromQuaternion(e),this.applyMatrix4(Mn),this}rotateX(e){return Mn.makeRotationX(e),this.applyMatrix4(Mn),this}rotateY(e){return Mn.makeRotationY(e),this.applyMatrix4(Mn),this}rotateZ(e){return Mn.makeRotationZ(e),this.applyMatrix4(Mn),this}translate(e,n,i){return Mn.makeTranslation(e,n,i),this.applyMatrix4(Mn),this}scale(e,n,i){return Mn.makeScale(e,n,i),this.applyMatrix4(Mn),this}lookAt(e){return Jc.lookAt(e),Jc.updateMatrix(),this.applyMatrix4(Jc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qr).negate(),this.translate(qr.x,qr.y,qr.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new xt(i,3))}else{for(let i=0,r=n.count;i<r;i++){const s=e[i];n.setXYZ(i,s.x,s.y,s.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];dn.setFromBufferAttribute(s),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const i=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];ro.setFromBufferAttribute(a),this.morphTargetsRelative?(Dt.addVectors(dn.min,ro.min),dn.expandByPoint(Dt),Dt.addVectors(dn.max,ro.max),dn.expandByPoint(Dt)):(dn.expandByPoint(ro.min),dn.expandByPoint(ro.max))}dn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Dt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Dt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Dt.fromBufferAttribute(a,c),l&&(qr.fromBufferAttribute(e,c),Dt.add(qr)),r=Math.max(r,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<i.count;L++)a[L]=new N,l[L]=new N;const c=new N,h=new N,d=new N,f=new de,p=new de,g=new de,v=new N,m=new N;function u(L,w,S){c.fromBufferAttribute(i,L),h.fromBufferAttribute(i,w),d.fromBufferAttribute(i,S),f.fromBufferAttribute(s,L),p.fromBufferAttribute(s,w),g.fromBufferAttribute(s,S),h.sub(c),d.sub(c),p.sub(f),g.sub(f);const D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(D),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(D),a[L].add(v),a[w].add(v),a[S].add(v),l[L].add(m),l[w].add(m),l[S].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let L=0,w=_.length;L<w;++L){const S=_[L],D=S.start,F=S.count;for(let V=D,K=D+F;V<K;V+=3)u(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const x=new N,y=new N,b=new N,C=new N;function A(L){b.fromBufferAttribute(r,L),C.copy(b);const w=a[L];x.copy(w),x.sub(b.multiplyScalar(b.dot(w))).normalize(),y.crossVectors(C,w);const D=y.dot(l[L])<0?-1:1;o.setXYZW(L,x.x,x.y,x.z,D)}for(let L=0,w=_.length;L<w;++L){const S=_[L],D=S.start,F=S.count;for(let V=D,K=D+F;V<K;V+=3)A(e.getX(V+0)),A(e.getX(V+1)),A(e.getX(V+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Gn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new N,s=new N,o=new N,a=new N,l=new N,c=new N,h=new N,d=new N;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,v),o.fromBufferAttribute(n,m),h.subVectors(o,s),d.subVectors(r,s),h.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),h.subVectors(o,s),d.subVectors(r,s),h.cross(d),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Dt.fromBufferAttribute(e,n),Dt.normalize(),e.setXYZ(n,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,d=a.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?p=l[v]*a.data.stride+a.offset:p=l[v]*h;for(let u=0;u<h;u++)f[g++]=c[p++]}return new Gn(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Qt,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,d=c.length;h<d;h++){const f=c[h],p=e(f,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){const p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(n))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let f=0,p=d.length;f<p;f++)h.push(d[f].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Zp=new at,cr=new Qo,ba=new Jo,Jp=new N,La=new N,Da=new N,Na=new N,Qc=new N,Ia=new N,Qp=new N,Ua=new N;class it extends Pt{constructor(e=new Qt,n=new rc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ia.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],d=s[l];h!==0&&(Qc.fromBufferAttribute(d,e),o?Ia.addScaledVector(Qc,h):Ia.addScaledVector(Qc.sub(n),h))}n.add(Ia)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ba.copy(i.boundingSphere),ba.applyMatrix4(s),cr.copy(e.ray).recast(e.near),!(ba.containsPoint(cr.origin)===!1&&(cr.intersectSphere(ba,Jp)===null||cr.origin.distanceToSquared(Jp)>(e.far-e.near)**2))&&(Zp.copy(s).invert(),cr.copy(e.ray).applyMatrix4(Zp),!(i.boundingBox!==null&&cr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,cr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],u=o[m.materialIndex],_=Math.max(m.start,p.start),x=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,b=x;y<b;y+=3){const C=a.getX(y),A=a.getX(y+1),L=a.getX(y+2);r=Fa(this,u,e,i,c,h,d,C,A,L),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let m=g,u=v;m<u;m+=3){const _=a.getX(m),x=a.getX(m+1),y=a.getX(m+2);r=Fa(this,o,e,i,c,h,d,_,x,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],u=o[m.materialIndex],_=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,b=x;y<b;y+=3){const C=y,A=y+1,L=y+2;r=Fa(this,u,e,i,c,h,d,C,A,L),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,u=v;m<u;m+=3){const _=m,x=m+1,y=m+2;r=Fa(this,o,e,i,c,h,d,_,x,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function bS(t,e,n,i,r,s,o,a){let l;if(e.side===Kt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===tr,a),l===null)return null;Ua.copy(a),Ua.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Ua);return c<n.near||c>n.far?null:{distance:c,point:Ua.clone(),object:t}}function Fa(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,La),t.getVertexPosition(l,Da),t.getVertexPosition(c,Na);const h=bS(t,e,n,i,La,Da,Na,Qp);if(h){const d=new N;kn.getBarycoord(Qp,La,Da,Na,d),r&&(h.uv=kn.getInterpolatedAttribute(r,a,l,c,d,new de)),s&&(h.uv1=kn.getInterpolatedAttribute(s,a,l,c,d,new de)),o&&(h.normal=kn.getInterpolatedAttribute(o,a,l,c,d,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new N,materialIndex:0};kn.getNormal(La,Da,Na,f.normal),h.face=f,h.barycoord=d}return h}class nr extends Qt{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],d=[];let f=0,p=0;g("z","y","x",-1,-1,i,n,e,o,s,0),g("z","y","x",1,-1,i,n,-e,o,s,1),g("x","z","y",1,1,e,i,n,r,o,2),g("x","z","y",1,-1,e,i,-n,r,o,3),g("x","y","z",1,-1,e,n,i,r,s,4),g("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new xt(c,3)),this.setAttribute("normal",new xt(h,3)),this.setAttribute("uv",new xt(d,2));function g(v,m,u,_,x,y,b,C,A,L,w){const S=y/A,D=b/L,F=y/2,V=b/2,K=C/2,$=A+1,q=L+1;let ee=0,T=0;const B=new N;for(let X=0;X<q;X++){const ie=X*D-V;for(let ye=0;ye<$;ye++){const He=ye*S-F;B[v]=He*_,B[m]=ie*x,B[u]=K,c.push(B.x,B.y,B.z),B[v]=0,B[m]=0,B[u]=C>0?1:-1,h.push(B.x,B.y,B.z),d.push(ye/A),d.push(1-X/L),ee+=1}}for(let X=0;X<L;X++)for(let ie=0;ie<A;ie++){const ye=f+ie+$*X,He=f+ie+$*(X+1),G=f+(ie+1)+$*(X+1),re=f+(ie+1)+$*X;l.push(ye,He,re),l.push(He,G,re),T+=6}a.addGroup(p,T,w),p+=T,f+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ks(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Yt(t){const e={};for(let n=0;n<t.length;n++){const i=ks(t[n]);for(const r in i)e[r]=i[r]}return e}function LS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Cv(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const DS={clone:ks,merge:Yt};var NS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,IS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ti extends Fr{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=NS,this.fragmentShader=IS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ks(e.uniforms),this.uniformsGroups=LS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Rv extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=_i}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ui=new N,em=new de,tm=new de;class mn extends Rv{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Yh*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ul*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yh*2*Math.atan(Math.tan(ul*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z)}getViewSize(e,n){return this.getViewBounds(e,em,tm),n.subVectors(tm,em)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(ul*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Kr=-90,Zr=1;class US extends Pt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new mn(Kr,Zr,e,n);r.layers=this.layers,this.add(r);const s=new mn(Kr,Zr,e,n);s.layers=this.layers,this.add(s);const o=new mn(Kr,Zr,e,n);o.layers=this.layers,this.add(o);const a=new mn(Kr,Zr,e,n);a.layers=this.layers,this.add(a);const l=new mn(Kr,Zr,e,n);l.layers=this.layers,this.add(l);const c=new mn(Kr,Zr,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===_i)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Fl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),e.render(n,h),e.setRenderTarget(d,f,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Pv extends cn{constructor(e,n,i,r,s,o,a,l,c,h){e=e!==void 0?e:[],n=n!==void 0?n:Is,super(e,n,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class FS extends Lr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Pv(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Zn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new nr(5,5,5),s=new Ti({name:"CubemapFromEquirect",uniforms:ks(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Kt,blending:Zi});s.uniforms.tEquirect.value=n;const o=new it(r,s),a=n.minFilter;return n.minFilter===Mr&&(n.minFilter=Zn),new US(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const eu=new N,OS=new N,kS=new ke;class di{constructor(e=new N(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=eu.subVectors(i,n).cross(OS.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(eu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||kS.getNormalMatrix(e),r=this.coplanarPoint(eu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ur=new Jo,Oa=new N;class ef{constructor(e=new di,n=new di,i=new di,r=new di,s=new di,o=new di){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=_i){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],d=r[6],f=r[7],p=r[8],g=r[9],v=r[10],m=r[11],u=r[12],_=r[13],x=r[14],y=r[15];if(i[0].setComponents(l-s,f-c,m-p,y-u).normalize(),i[1].setComponents(l+s,f+c,m+p,y+u).normalize(),i[2].setComponents(l+o,f+h,m+g,y+_).normalize(),i[3].setComponents(l-o,f-h,m-g,y-_).normalize(),i[4].setComponents(l-a,f-d,m-v,y-x).normalize(),n===_i)i[5].setComponents(l+a,f+d,m+v,y+x).normalize();else if(n===Fl)i[5].setComponents(a,d,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ur.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ur.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ur)}intersectsSprite(e){return ur.center.set(0,0,0),ur.radius=.7071067811865476,ur.applyMatrix4(e.matrixWorld),this.intersectsSphere(ur)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Oa.x=r.normal.x>0?e.max.x:e.min.x,Oa.y=r.normal.y>0?e.max.y:e.min.y,Oa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Oa)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function bv(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function zS(t){const e=new WeakMap;function n(a,l){const c=a.array,h=a.usage,d=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const h=l.array,d=l.updateRanges;if(t.bindBuffer(c,a),d.length===0)t.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<d.length;p++){const g=d[f],v=d[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,d[f]=v)}d.length=f+1;for(let p=0,g=d.length;p<g;p++){const v=d[p];t.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class ea extends Qt{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,d=e/a,f=n/l,p=[],g=[],v=[],m=[];for(let u=0;u<h;u++){const _=u*f-o;for(let x=0;x<c;x++){const y=x*d-s;g.push(y,-_,0),v.push(0,0,1),m.push(x/a),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let _=0;_<a;_++){const x=_+c*u,y=_+c*(u+1),b=_+1+c*(u+1),C=_+1+c*u;p.push(x,y,C),p.push(y,b,C)}this.setIndex(p),this.setAttribute("position",new xt(g,3)),this.setAttribute("normal",new xt(v,3)),this.setAttribute("uv",new xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ea(e.width,e.height,e.widthSegments,e.heightSegments)}}var BS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,HS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,VS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,GS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,WS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,XS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,YS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$S=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,qS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,KS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ZS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,JS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,QS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,eM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,tM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,nM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,iM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,oM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,aM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,lM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,cM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,uM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,hM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,dM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gM="gl_FragColor = linearToOutputTexel( gl_FragColor );",_M=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,xM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,SM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,MM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,EM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,TM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,AM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,CM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,RM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,PM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,LM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,DM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,NM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,IM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,UM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,FM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,OM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,kM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,BM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,HM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,VM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,GM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,WM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,XM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,YM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$M=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,KM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ZM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,JM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,QM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,eE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,nE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,rE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,aE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,mE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_E=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,SE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ME=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,EE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,wE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,TE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,AE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,CE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,RE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,PE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,LE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,DE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,NE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,IE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,UE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,FE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,OE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,kE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,BE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,HE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,WE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,XE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,YE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,$E=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,KE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,JE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,QE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ew=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,rw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ow=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,aw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,uw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,pw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,_w=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:BS,alphahash_pars_fragment:HS,alphamap_fragment:VS,alphamap_pars_fragment:GS,alphatest_fragment:WS,alphatest_pars_fragment:jS,aomap_fragment:XS,aomap_pars_fragment:YS,batching_pars_vertex:$S,batching_vertex:qS,begin_vertex:KS,beginnormal_vertex:ZS,bsdfs:JS,iridescence_fragment:QS,bumpmap_pars_fragment:eM,clipping_planes_fragment:tM,clipping_planes_pars_fragment:nM,clipping_planes_pars_vertex:iM,clipping_planes_vertex:rM,color_fragment:sM,color_pars_fragment:oM,color_pars_vertex:aM,color_vertex:lM,common:cM,cube_uv_reflection_fragment:uM,defaultnormal_vertex:hM,displacementmap_pars_vertex:dM,displacementmap_vertex:fM,emissivemap_fragment:pM,emissivemap_pars_fragment:mM,colorspace_fragment:gM,colorspace_pars_fragment:_M,envmap_fragment:vM,envmap_common_pars_fragment:xM,envmap_pars_fragment:yM,envmap_pars_vertex:SM,envmap_physical_pars_fragment:DM,envmap_vertex:MM,fog_vertex:EM,fog_pars_vertex:wM,fog_fragment:TM,fog_pars_fragment:AM,gradientmap_pars_fragment:CM,lightmap_pars_fragment:RM,lights_lambert_fragment:PM,lights_lambert_pars_fragment:bM,lights_pars_begin:LM,lights_toon_fragment:NM,lights_toon_pars_fragment:IM,lights_phong_fragment:UM,lights_phong_pars_fragment:FM,lights_physical_fragment:OM,lights_physical_pars_fragment:kM,lights_fragment_begin:zM,lights_fragment_maps:BM,lights_fragment_end:HM,logdepthbuf_fragment:VM,logdepthbuf_pars_fragment:GM,logdepthbuf_pars_vertex:WM,logdepthbuf_vertex:jM,map_fragment:XM,map_pars_fragment:YM,map_particle_fragment:$M,map_particle_pars_fragment:qM,metalnessmap_fragment:KM,metalnessmap_pars_fragment:ZM,morphinstance_vertex:JM,morphcolor_vertex:QM,morphnormal_vertex:eE,morphtarget_pars_vertex:tE,morphtarget_vertex:nE,normal_fragment_begin:iE,normal_fragment_maps:rE,normal_pars_fragment:sE,normal_pars_vertex:oE,normal_vertex:aE,normalmap_pars_fragment:lE,clearcoat_normal_fragment_begin:cE,clearcoat_normal_fragment_maps:uE,clearcoat_pars_fragment:hE,iridescence_pars_fragment:dE,opaque_fragment:fE,packing:pE,premultiplied_alpha_fragment:mE,project_vertex:gE,dithering_fragment:_E,dithering_pars_fragment:vE,roughnessmap_fragment:xE,roughnessmap_pars_fragment:yE,shadowmap_pars_fragment:SE,shadowmap_pars_vertex:ME,shadowmap_vertex:EE,shadowmask_pars_fragment:wE,skinbase_vertex:TE,skinning_pars_vertex:AE,skinning_vertex:CE,skinnormal_vertex:RE,specularmap_fragment:PE,specularmap_pars_fragment:bE,tonemapping_fragment:LE,tonemapping_pars_fragment:DE,transmission_fragment:NE,transmission_pars_fragment:IE,uv_pars_fragment:UE,uv_pars_vertex:FE,uv_vertex:OE,worldpos_vertex:kE,background_vert:zE,background_frag:BE,backgroundCube_vert:HE,backgroundCube_frag:VE,cube_vert:GE,cube_frag:WE,depth_vert:jE,depth_frag:XE,distanceRGBA_vert:YE,distanceRGBA_frag:$E,equirect_vert:qE,equirect_frag:KE,linedashed_vert:ZE,linedashed_frag:JE,meshbasic_vert:QE,meshbasic_frag:ew,meshlambert_vert:tw,meshlambert_frag:nw,meshmatcap_vert:iw,meshmatcap_frag:rw,meshnormal_vert:sw,meshnormal_frag:ow,meshphong_vert:aw,meshphong_frag:lw,meshphysical_vert:cw,meshphysical_frag:uw,meshtoon_vert:hw,meshtoon_frag:dw,points_vert:fw,points_frag:pw,shadow_vert:mw,shadow_frag:gw,sprite_vert:_w,sprite_frag:vw},he={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},$n={basic:{uniforms:Yt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Yt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ne(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Yt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Yt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Yt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ne(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Yt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Yt([he.points,he.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Yt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Yt([he.common,he.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Yt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Yt([he.sprite,he.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:Yt([he.common,he.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:Yt([he.lights,he.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};$n.physical={uniforms:Yt([$n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const ka={r:0,b:0,g:0},hr=new ei,xw=new at;function yw(t,e,n,i,r,s,o){const a=new Ne(0);let l=s===!0?0:1,c,h,d=null,f=0,p=null;function g(_){let x=_.isScene===!0?_.background:null;return x&&x.isTexture&&(x=(_.backgroundBlurriness>0?n:e).get(x)),x}function v(_){let x=!1;const y=g(_);y===null?u(a,l):y&&y.isColor&&(u(y,1),x=!0);const b=t.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(_,x){const y=g(x);y&&(y.isCubeTexture||y.mapping===nc)?(h===void 0&&(h=new it(new nr(1,1,1),new Ti({name:"BackgroundCubeMaterial",uniforms:ks($n.backgroundCube.uniforms),vertexShader:$n.backgroundCube.vertexShader,fragmentShader:$n.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),hr.copy(x.backgroundRotation),hr.x*=-1,hr.y*=-1,hr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(hr.y*=-1,hr.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(xw.makeRotationFromEuler(hr)),h.material.toneMapped=qe.getTransfer(y.colorSpace)!==nt,(d!==y||f!==y.version||p!==t.toneMapping)&&(h.material.needsUpdate=!0,d=y,f=y.version,p=t.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new it(new ea(2,2),new Ti({name:"BackgroundMaterial",uniforms:ks($n.background.uniforms),vertexShader:$n.background.vertexShader,fragmentShader:$n.background.fragmentShader,side:tr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=qe.getTransfer(y.colorSpace)!==nt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||f!==y.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,d=y,f=y.version,p=t.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function u(_,x){_.getRGB(ka,Cv(t)),i.buffers.color.setClear(ka.r,ka.g,ka.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(_,x=1){a.set(_),l=x,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,u(a,l)},render:v,addToRenderList:m}}function Sw(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(S,D,F,V,K){let $=!1;const q=d(V,F,D);s!==q&&(s=q,c(s.object)),$=p(S,V,F,K),$&&g(S,V,F,K),K!==null&&e.update(K,t.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,y(S,D,F,V),K!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function l(){return t.createVertexArray()}function c(S){return t.bindVertexArray(S)}function h(S){return t.deleteVertexArray(S)}function d(S,D,F){const V=F.wireframe===!0;let K=i[S.id];K===void 0&&(K={},i[S.id]=K);let $=K[D.id];$===void 0&&($={},K[D.id]=$);let q=$[V];return q===void 0&&(q=f(l()),$[V]=q),q}function f(S){const D=[],F=[],V=[];for(let K=0;K<n;K++)D[K]=0,F[K]=0,V[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:F,attributeDivisors:V,object:S,attributes:{},index:null}}function p(S,D,F,V){const K=s.attributes,$=D.attributes;let q=0;const ee=F.getAttributes();for(const T in ee)if(ee[T].location>=0){const X=K[T];let ie=$[T];if(ie===void 0&&(T==="instanceMatrix"&&S.instanceMatrix&&(ie=S.instanceMatrix),T==="instanceColor"&&S.instanceColor&&(ie=S.instanceColor)),X===void 0||X.attribute!==ie||ie&&X.data!==ie.data)return!0;q++}return s.attributesNum!==q||s.index!==V}function g(S,D,F,V){const K={},$=D.attributes;let q=0;const ee=F.getAttributes();for(const T in ee)if(ee[T].location>=0){let X=$[T];X===void 0&&(T==="instanceMatrix"&&S.instanceMatrix&&(X=S.instanceMatrix),T==="instanceColor"&&S.instanceColor&&(X=S.instanceColor));const ie={};ie.attribute=X,X&&X.data&&(ie.data=X.data),K[T]=ie,q++}s.attributes=K,s.attributesNum=q,s.index=V}function v(){const S=s.newAttributes;for(let D=0,F=S.length;D<F;D++)S[D]=0}function m(S){u(S,0)}function u(S,D){const F=s.newAttributes,V=s.enabledAttributes,K=s.attributeDivisors;F[S]=1,V[S]===0&&(t.enableVertexAttribArray(S),V[S]=1),K[S]!==D&&(t.vertexAttribDivisor(S,D),K[S]=D)}function _(){const S=s.newAttributes,D=s.enabledAttributes;for(let F=0,V=D.length;F<V;F++)D[F]!==S[F]&&(t.disableVertexAttribArray(F),D[F]=0)}function x(S,D,F,V,K,$,q){q===!0?t.vertexAttribIPointer(S,D,F,K,$):t.vertexAttribPointer(S,D,F,V,K,$)}function y(S,D,F,V){v();const K=V.attributes,$=F.getAttributes(),q=D.defaultAttributeValues;for(const ee in $){const T=$[ee];if(T.location>=0){let B=K[ee];if(B===void 0&&(ee==="instanceMatrix"&&S.instanceMatrix&&(B=S.instanceMatrix),ee==="instanceColor"&&S.instanceColor&&(B=S.instanceColor)),B!==void 0){const X=B.normalized,ie=B.itemSize,ye=e.get(B);if(ye===void 0)continue;const He=ye.buffer,G=ye.type,re=ye.bytesPerElement,_e=G===t.INT||G===t.UNSIGNED_INT||B.gpuType===Yd;if(B.isInterleavedBufferAttribute){const ce=B.data,be=ce.stride,Ie=B.offset;if(ce.isInstancedInterleavedBuffer){for(let Be=0;Be<T.locationSize;Be++)u(T.location+Be,ce.meshPerAttribute);S.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Be=0;Be<T.locationSize;Be++)m(T.location+Be);t.bindBuffer(t.ARRAY_BUFFER,He);for(let Be=0;Be<T.locationSize;Be++)x(T.location+Be,ie/T.locationSize,G,X,be*re,(Ie+ie/T.locationSize*Be)*re,_e)}else{if(B.isInstancedBufferAttribute){for(let ce=0;ce<T.locationSize;ce++)u(T.location+ce,B.meshPerAttribute);S.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=B.meshPerAttribute*B.count)}else for(let ce=0;ce<T.locationSize;ce++)m(T.location+ce);t.bindBuffer(t.ARRAY_BUFFER,He);for(let ce=0;ce<T.locationSize;ce++)x(T.location+ce,ie/T.locationSize,G,X,ie*re,ie/T.locationSize*ce*re,_e)}}else if(q!==void 0){const X=q[ee];if(X!==void 0)switch(X.length){case 2:t.vertexAttrib2fv(T.location,X);break;case 3:t.vertexAttrib3fv(T.location,X);break;case 4:t.vertexAttrib4fv(T.location,X);break;default:t.vertexAttrib1fv(T.location,X)}}}}_()}function b(){L();for(const S in i){const D=i[S];for(const F in D){const V=D[F];for(const K in V)h(V[K].object),delete V[K];delete D[F]}delete i[S]}}function C(S){if(i[S.id]===void 0)return;const D=i[S.id];for(const F in D){const V=D[F];for(const K in V)h(V[K].object),delete V[K];delete D[F]}delete i[S.id]}function A(S){for(const D in i){const F=i[D];if(F[S.id]===void 0)continue;const V=F[S.id];for(const K in V)h(V[K].object),delete V[K];delete F[S.id]}}function L(){w(),o=!0,s!==r&&(s=r,c(s.object))}function w(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:L,resetDefaultState:w,dispose:b,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function Mw(t,e,n){let i;function r(c){i=c}function s(c,h){t.drawArrays(i,c,h),n.update(h,i,1)}function o(c,h,d){d!==0&&(t.drawArraysInstanced(i,c,h,d),n.update(h,i,d))}function a(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];n.update(p,i,1)}function l(c,h,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v]*f[v];n.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Ew(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==zn&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const L=A===qo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==wi&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==gi&&!L)}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),u=t.getParameter(t.MAX_VERTEX_ATTRIBS),_=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),x=t.getParameter(t.MAX_VARYING_VECTORS),y=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),b=g>0,C=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:_,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:b,maxSamples:C}}function ww(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new di,a=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||r;return r=f,i=d.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){n=h(d,f,0)},this.setState=function(d,f,p){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,u=t.get(d);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{const _=s?0:i,x=_*4;let y=u.clippingState||null;l.value=y,y=h(g,f,x,p);for(let b=0;b!==x;++b)y[b]=n[b];u.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,f,p,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const u=p+v*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<u)&&(m=new Float32Array(u));for(let x=0,y=p;x!==v;++x,y+=4)o.copy(d[x]).applyMatrix4(_,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Tw(t){let e=new WeakMap;function n(o,a){return a===_h?o.mapping=Is:a===vh&&(o.mapping=Us),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===_h||a===vh)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new FS(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Lv extends Rv{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const ps=4,nm=[.125,.215,.35,.446,.526,.582],_r=20,tu=new Lv,im=new Ne;let nu=null,iu=0,ru=0,su=!1;const mr=(1+Math.sqrt(5))/2,Jr=1/mr,rm=[new N(-mr,Jr,0),new N(mr,Jr,0),new N(-Jr,0,mr),new N(Jr,0,mr),new N(0,mr,-Jr),new N(0,mr,Jr),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class $h{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){nu=this._renderer.getRenderTarget(),iu=this._renderer.getActiveCubeFace(),ru=this._renderer.getActiveMipmapLevel(),su=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=am(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=om(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(nu,iu,ru),this._renderer.xr.enabled=su,e.scissorTest=!1,za(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Is||e.mapping===Us?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),nu=this._renderer.getRenderTarget(),iu=this._renderer.getActiveCubeFace(),ru=this._renderer.getActiveMipmapLevel(),su=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Zn,minFilter:Zn,generateMipmaps:!1,type:qo,format:zn,colorSpace:Vs,depthBuffer:!1},r=sm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sm(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Aw(s)),this._blurMaterial=Cw(s,e,n)}return r}_compileMaterial(e){const n=new it(this._lodPlanes[0],e);this._renderer.compile(n,tu)}_sceneToCubeUV(e,n,i,r){const a=new mn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(im),h.toneMapping=Ji,h.autoClear=!1;const p=new rc({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1}),g=new it(new nr,p);let v=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(im),v=!0);for(let u=0;u<6;u++){const _=u%3;_===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):_===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));const x=this._cubeSize;za(r,_*x,u>2?x:0,x,x),h.setRenderTarget(r),v&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Is||e.mapping===Us;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=am()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=om());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new it(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;za(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,tu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=rm[(r-s-1)%rm.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new it(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*_r-1),v=s/g,m=isFinite(s)?1+Math.floor(h*v):_r;m>_r&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${_r}`);const u=[];let _=0;for(let A=0;A<_r;++A){const L=A/v,w=Math.exp(-L*L/2);u.push(w),A===0?_+=w:A<m&&(_+=2*w)}for(let A=0;A<u.length;A++)u[A]=u[A]/_;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=u,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-i;const y=this._sizeLods[r],b=3*y*(r>x-ps?r-x+ps:0),C=4*(this._cubeSize-y);za(n,b,C,3*y,2*y),l.setRenderTarget(n),l.render(d,tu)}}function Aw(t){const e=[],n=[],i=[];let r=t;const s=t-ps+1+nm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-ps?l=nm[o-t+ps-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,v=3,m=2,u=1,_=new Float32Array(v*g*p),x=new Float32Array(m*g*p),y=new Float32Array(u*g*p);for(let C=0;C<p;C++){const A=C%3*2/3-1,L=C>2?0:-1,w=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];_.set(w,v*g*C),x.set(f,m*g*C);const S=[C,C,C,C,C,C];y.set(S,u*g*C)}const b=new Qt;b.setAttribute("position",new Gn(_,v)),b.setAttribute("uv",new Gn(x,m)),b.setAttribute("faceIndex",new Gn(y,u)),e.push(b),r>ps&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function sm(t,e,n){const i=new Lr(t,e,n);return i.texture.mapping=nc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function za(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function Cw(t,e,n){const i=new Float32Array(_r),r=new N(0,1,0);return new Ti({name:"SphericalGaussianBlur",defines:{n:_r,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:tf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function om(){return new Ti({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function am(){return new Ti({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function tf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Rw(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===_h||l===vh,h=l===Is||l===Us;if(c||h){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return n===null&&(n=new $h(t)),d=c?n.fromEquirectangular(a,d):n.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&r(p)?(n===null&&(n=new $h(t)),d=c?n.fromEquirectangular(a):n.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function Pw(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&ho("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function bw(t,e,n,i){const r={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,u=v.length;m<u;m++)e.remove(v[m])}f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function l(d){const f=d.attributes;for(const g in f)e.update(f[g],t.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const v=p[g];for(let m=0,u=v.length;m<u;m++)e.update(v[m],t.ARRAY_BUFFER)}}function c(d){const f=[],p=d.index,g=d.attributes.position;let v=0;if(p!==null){const _=p.array;v=p.version;for(let x=0,y=_.length;x<y;x+=3){const b=_[x+0],C=_[x+1],A=_[x+2];f.push(b,C,C,A,A,b)}}else if(g!==void 0){const _=g.array;v=g.version;for(let x=0,y=_.length/3-1;x<y;x+=3){const b=x+0,C=x+1,A=x+2;f.push(b,C,C,A,A,b)}}else return;const m=new(Sv(f)?Av:Tv)(f,1);m.version=v;const u=s.get(d);u&&e.remove(u),s.set(d,m)}function h(d){const f=s.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Lw(t,e,n){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){t.drawElements(i,p,s,f*o),n.update(p,i,1)}function c(f,p,g){g!==0&&(t.drawElementsInstanced(i,p,s,f*o,g),n.update(p,i,g))}function h(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,g);let m=0;for(let u=0;u<g;u++)m+=p[u];n.update(m,i,1)}function d(f,p,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<f.length;u++)c(f[u]/o,p[u],v[u]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,v,0,g);let u=0;for(let _=0;_<g;_++)u+=p[_]*v[_];n.update(u,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Dw(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Nw(t,e,n){const i=new WeakMap,r=new st;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==d){let S=function(){L.dispose(),i.delete(a),a.removeEventListener("dispose",S)};var p=S;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),v===!0&&(y=2),m===!0&&(y=3);let b=a.attributes.position.count*y,C=1;b>e.maxTextureSize&&(C=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const A=new Float32Array(b*C*4*d),L=new Ev(A,b,C,d);L.type=gi,L.needsUpdate=!0;const w=y*4;for(let D=0;D<d;D++){const F=u[D],V=_[D],K=x[D],$=b*C*4*D;for(let q=0;q<F.count;q++){const ee=q*w;g===!0&&(r.fromBufferAttribute(F,q),A[$+ee+0]=r.x,A[$+ee+1]=r.y,A[$+ee+2]=r.z,A[$+ee+3]=0),v===!0&&(r.fromBufferAttribute(V,q),A[$+ee+4]=r.x,A[$+ee+5]=r.y,A[$+ee+6]=r.z,A[$+ee+7]=0),m===!0&&(r.fromBufferAttribute(K,q),A[$+ee+8]=r.x,A[$+ee+9]=r.y,A[$+ee+10]=r.z,A[$+ee+11]=K.itemSize===4?r.w:1)}}f={count:d,texture:L,size:new de(b,C)},i.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",v),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function Iw(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,d=e.get(l,h);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class Dv extends cn{constructor(e,n,i,r,s,o,a,l,c,h=ws){if(h!==ws&&h!==Os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===ws&&(i=br),i===void 0&&h===Os&&(i=Fs),super(null,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:Vn,this.minFilter=l!==void 0?l:Vn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const Nv=new cn,lm=new Dv(1,1),Iv=new Ev,Uv=new yS,Fv=new Pv,cm=[],um=[],hm=new Float32Array(16),dm=new Float32Array(9),fm=new Float32Array(4);function Gs(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=cm[r];if(s===void 0&&(s=new Float32Array(r),cm[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function bt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Lt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function sc(t,e){let n=um[e];n===void 0&&(n=new Int32Array(e),um[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Uw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Fw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(bt(n,e))return;t.uniform2fv(this.addr,e),Lt(n,e)}}function Ow(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(bt(n,e))return;t.uniform3fv(this.addr,e),Lt(n,e)}}function kw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(bt(n,e))return;t.uniform4fv(this.addr,e),Lt(n,e)}}function zw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(bt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Lt(n,e)}else{if(bt(n,i))return;fm.set(i),t.uniformMatrix2fv(this.addr,!1,fm),Lt(n,i)}}function Bw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(bt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Lt(n,e)}else{if(bt(n,i))return;dm.set(i),t.uniformMatrix3fv(this.addr,!1,dm),Lt(n,i)}}function Hw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(bt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Lt(n,e)}else{if(bt(n,i))return;hm.set(i),t.uniformMatrix4fv(this.addr,!1,hm),Lt(n,i)}}function Vw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Gw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(bt(n,e))return;t.uniform2iv(this.addr,e),Lt(n,e)}}function Ww(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(bt(n,e))return;t.uniform3iv(this.addr,e),Lt(n,e)}}function jw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(bt(n,e))return;t.uniform4iv(this.addr,e),Lt(n,e)}}function Xw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function Yw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(bt(n,e))return;t.uniform2uiv(this.addr,e),Lt(n,e)}}function $w(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(bt(n,e))return;t.uniform3uiv(this.addr,e),Lt(n,e)}}function qw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(bt(n,e))return;t.uniform4uiv(this.addr,e),Lt(n,e)}}function Kw(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(lm.compareFunction=yv,s=lm):s=Nv,n.setTexture2D(e||s,r)}function Zw(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Uv,r)}function Jw(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Fv,r)}function Qw(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Iv,r)}function eT(t){switch(t){case 5126:return Uw;case 35664:return Fw;case 35665:return Ow;case 35666:return kw;case 35674:return zw;case 35675:return Bw;case 35676:return Hw;case 5124:case 35670:return Vw;case 35667:case 35671:return Gw;case 35668:case 35672:return Ww;case 35669:case 35673:return jw;case 5125:return Xw;case 36294:return Yw;case 36295:return $w;case 36296:return qw;case 35678:case 36198:case 36298:case 36306:case 35682:return Kw;case 35679:case 36299:case 36307:return Zw;case 35680:case 36300:case 36308:case 36293:return Jw;case 36289:case 36303:case 36311:case 36292:return Qw}}function tT(t,e){t.uniform1fv(this.addr,e)}function nT(t,e){const n=Gs(e,this.size,2);t.uniform2fv(this.addr,n)}function iT(t,e){const n=Gs(e,this.size,3);t.uniform3fv(this.addr,n)}function rT(t,e){const n=Gs(e,this.size,4);t.uniform4fv(this.addr,n)}function sT(t,e){const n=Gs(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function oT(t,e){const n=Gs(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function aT(t,e){const n=Gs(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function lT(t,e){t.uniform1iv(this.addr,e)}function cT(t,e){t.uniform2iv(this.addr,e)}function uT(t,e){t.uniform3iv(this.addr,e)}function hT(t,e){t.uniform4iv(this.addr,e)}function dT(t,e){t.uniform1uiv(this.addr,e)}function fT(t,e){t.uniform2uiv(this.addr,e)}function pT(t,e){t.uniform3uiv(this.addr,e)}function mT(t,e){t.uniform4uiv(this.addr,e)}function gT(t,e,n){const i=this.cache,r=e.length,s=sc(n,r);bt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||Nv,s[o])}function _T(t,e,n){const i=this.cache,r=e.length,s=sc(n,r);bt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Uv,s[o])}function vT(t,e,n){const i=this.cache,r=e.length,s=sc(n,r);bt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Fv,s[o])}function xT(t,e,n){const i=this.cache,r=e.length,s=sc(n,r);bt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||Iv,s[o])}function yT(t){switch(t){case 5126:return tT;case 35664:return nT;case 35665:return iT;case 35666:return rT;case 35674:return sT;case 35675:return oT;case 35676:return aT;case 5124:case 35670:return lT;case 35667:case 35671:return cT;case 35668:case 35672:return uT;case 35669:case 35673:return hT;case 5125:return dT;case 36294:return fT;case 36295:return pT;case 36296:return mT;case 35678:case 36198:case 36298:case 36306:case 35682:return gT;case 35679:case 36299:case 36307:return _T;case 35680:case 36300:case 36308:case 36293:return vT;case 36289:case 36303:case 36311:case 36292:return xT}}class ST{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=eT(n.type)}}class MT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=yT(n.type)}}class ET{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const ou=/(\w+)(\])?(\[|\.)?/g;function pm(t,e){t.seq.push(e),t.map[e.id]=e}function wT(t,e,n){const i=t.name,r=i.length;for(ou.lastIndex=0;;){const s=ou.exec(i),o=ou.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){pm(n,c===void 0?new ST(a,t,e):new MT(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new ET(a),pm(n,d)),n=d}}}class hl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);wT(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function mm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const TT=37297;let AT=0;function CT(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const gm=new ke;function RT(t){qe._getMatrix(gm,qe.workingColorSpace,t);const e=`mat3( ${gm.elements.map(n=>n.toFixed(4))} )`;switch(qe.getTransfer(t)){case ic:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function _m(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+CT(t.getShaderSource(e),o)}else return r}function PT(t,e){const n=RT(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function bT(t,e){let n;switch(e){case Yy:n="Linear";break;case $y:n="Reinhard";break;case qy:n="Cineon";break;case av:n="ACESFilmic";break;case Zy:n="AgX";break;case Jy:n="Neutral";break;case Ky:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ba=new N;function LT(){qe.getLuminanceCoefficients(Ba);const t=Ba.x.toFixed(4),e=Ba.y.toFixed(4),n=Ba.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function DT(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fo).join(`
`)}function NT(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function IT(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function fo(t){return t!==""}function vm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function xm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const UT=/^[ \t]*#include +<([\w\d./]+)>/gm;function qh(t){return t.replace(UT,OT)}const FT=new Map;function OT(t,e){let n=ze[e];if(n===void 0){const i=FT.get(e);if(i!==void 0)n=ze[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return qh(n)}const kT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ym(t){return t.replace(kT,zT)}function zT(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Sm(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function BT(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===rv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===sv?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===ci&&(e="SHADOWMAP_TYPE_VSM"),e}function HT(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Is:case Us:e="ENVMAP_TYPE_CUBE";break;case nc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function VT(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Us:e="ENVMAP_MODE_REFRACTION";break}return e}function GT(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case ov:e="ENVMAP_BLENDING_MULTIPLY";break;case jy:e="ENVMAP_BLENDING_MIX";break;case Xy:e="ENVMAP_BLENDING_ADD";break}return e}function WT(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function jT(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=BT(n),c=HT(n),h=VT(n),d=GT(n),f=WT(n),p=DT(n),g=NT(s),v=r.createProgram();let m,u,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(fo).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(fo).join(`
`),u.length>0&&(u+=`
`)):(m=[Sm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fo).join(`
`),u=[Sm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ji?"#define TONE_MAPPING":"",n.toneMapping!==Ji?ze.tonemapping_pars_fragment:"",n.toneMapping!==Ji?bT("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,PT("linearToOutputTexel",n.outputColorSpace),LT(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(fo).join(`
`)),o=qh(o),o=vm(o,n),o=xm(o,n),a=qh(a),a=vm(a,n),a=xm(a,n),o=ym(o),a=ym(a),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",n.glslVersion===Up?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Up?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const x=_+m+o,y=_+u+a,b=mm(r,r.VERTEX_SHADER,x),C=mm(r,r.FRAGMENT_SHADER,y);r.attachShader(v,b),r.attachShader(v,C),n.index0AttributeName!==void 0?r.bindAttribLocation(v,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function A(D){if(t.debug.checkShaderErrors){const F=r.getProgramInfoLog(v).trim(),V=r.getShaderInfoLog(b).trim(),K=r.getShaderInfoLog(C).trim();let $=!0,q=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if($=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,v,b,C);else{const ee=_m(r,b,"vertex"),T=_m(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+F+`
`+ee+`
`+T)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(V===""||K==="")&&(q=!1);q&&(D.diagnostics={runnable:$,programLog:F,vertexShader:{log:V,prefix:m},fragmentShader:{log:K,prefix:u}})}r.deleteShader(b),r.deleteShader(C),L=new hl(r,v),w=IT(r,v)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let S=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(v,TT)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=AT++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=b,this.fragmentShader=C,this}let XT=0;class YT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new $T(e),n.set(e,i)),i}}class $T{constructor(e){this.id=XT++,this.code=e,this.usedTimes=0}}function qT(t,e,n,i,r,s,o){const a=new Qd,l=new YT,c=new Set,h=[],d=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,S,D,F,V){const K=F.fog,$=V.geometry,q=w.isMeshStandardMaterial?F.environment:null,ee=(w.isMeshStandardMaterial?n:e).get(w.envMap||q),T=ee&&ee.mapping===nc?ee.image.height:null,B=g[w.type];w.precision!==null&&(p=r.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));const X=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ie=X!==void 0?X.length:0;let ye=0;$.morphAttributes.position!==void 0&&(ye=1),$.morphAttributes.normal!==void 0&&(ye=2),$.morphAttributes.color!==void 0&&(ye=3);let He,G,re,_e;if(B){const et=$n[B];He=et.vertexShader,G=et.fragmentShader}else He=w.vertexShader,G=w.fragmentShader,l.update(w),re=l.getVertexShaderID(w),_e=l.getFragmentShaderID(w);const ce=t.getRenderTarget(),be=t.state.buffers.depth.getReversed(),Ie=V.isInstancedMesh===!0,Be=V.isBatchedMesh===!0,lt=!!w.map,je=!!w.matcap,mt=!!ee,z=!!w.aoMap,zt=!!w.lightMap,Ve=!!w.bumpMap,Xe=!!w.normalMap,Pe=!!w.displacementMap,ot=!!w.emissiveMap,we=!!w.metalnessMap,R=!!w.roughnessMap,M=w.anisotropy>0,H=w.clearcoat>0,Q=w.dispersion>0,ne=w.iridescence>0,Z=w.sheen>0,Se=w.transmission>0,ue=M&&!!w.anisotropyMap,ve=H&&!!w.clearcoatMap,$e=H&&!!w.clearcoatNormalMap,U=H&&!!w.clearcoatRoughnessMap,J=ne&&!!w.iridescenceMap,Me=ne&&!!w.iridescenceThicknessMap,Le=Z&&!!w.sheenColorMap,ge=Z&&!!w.sheenRoughnessMap,Ye=!!w.specularMap,le=!!w.specularColorMap,De=!!w.specularIntensityMap,I=Se&&!!w.transmissionMap,oe=Se&&!!w.thicknessMap,Y=!!w.gradientMap,te=!!w.alphaMap,me=w.alphaTest>0,fe=!!w.alphaHash,Fe=!!w.extensions;let St=Ji;w.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(St=t.toneMapping);const Bt={shaderID:B,shaderType:w.type,shaderName:w.name,vertexShader:He,fragmentShader:G,defines:w.defines,customVertexShaderID:re,customFragmentShaderID:_e,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:Be,batchingColor:Be&&V._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&V.instanceColor!==null,instancingMorph:Ie&&V.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ce===null?t.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Vs,alphaToCoverage:!!w.alphaToCoverage,map:lt,matcap:je,envMap:mt,envMapMode:mt&&ee.mapping,envMapCubeUVHeight:T,aoMap:z,lightMap:zt,bumpMap:Ve,normalMap:Xe,displacementMap:f&&Pe,emissiveMap:ot,normalMapObjectSpace:Xe&&w.normalMapType===nS,normalMapTangentSpace:Xe&&w.normalMapType===xv,metalnessMap:we,roughnessMap:R,anisotropy:M,anisotropyMap:ue,clearcoat:H,clearcoatMap:ve,clearcoatNormalMap:$e,clearcoatRoughnessMap:U,dispersion:Q,iridescence:ne,iridescenceMap:J,iridescenceThicknessMap:Me,sheen:Z,sheenColorMap:Le,sheenRoughnessMap:ge,specularMap:Ye,specularColorMap:le,specularIntensityMap:De,transmission:Se,transmissionMap:I,thicknessMap:oe,gradientMap:Y,opaque:w.transparent===!1&&w.blending===Es&&w.alphaToCoverage===!1,alphaMap:te,alphaTest:me,alphaHash:fe,combine:w.combine,mapUv:lt&&v(w.map.channel),aoMapUv:z&&v(w.aoMap.channel),lightMapUv:zt&&v(w.lightMap.channel),bumpMapUv:Ve&&v(w.bumpMap.channel),normalMapUv:Xe&&v(w.normalMap.channel),displacementMapUv:Pe&&v(w.displacementMap.channel),emissiveMapUv:ot&&v(w.emissiveMap.channel),metalnessMapUv:we&&v(w.metalnessMap.channel),roughnessMapUv:R&&v(w.roughnessMap.channel),anisotropyMapUv:ue&&v(w.anisotropyMap.channel),clearcoatMapUv:ve&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:$e&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:U&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:Me&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:ge&&v(w.sheenRoughnessMap.channel),specularMapUv:Ye&&v(w.specularMap.channel),specularColorMapUv:le&&v(w.specularColorMap.channel),specularIntensityMapUv:De&&v(w.specularIntensityMap.channel),transmissionMapUv:I&&v(w.transmissionMap.channel),thicknessMapUv:oe&&v(w.thicknessMap.channel),alphaMapUv:te&&v(w.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Xe||M),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!$.attributes.uv&&(lt||te),fog:!!K,useFog:w.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:be,skinning:V.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:ye,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:t.shadowMap.enabled&&D.length>0,shadowMapType:t.shadowMap.type,toneMapping:St,decodeVideoTexture:lt&&w.map.isVideoTexture===!0&&qe.getTransfer(w.map.colorSpace)===nt,decodeVideoTextureEmissive:ot&&w.emissiveMap.isVideoTexture===!0&&qe.getTransfer(w.emissiveMap.colorSpace)===nt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===fi,flipSided:w.side===Kt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Fe&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&w.extensions.multiDraw===!0||Be)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Bt.vertexUv1s=c.has(1),Bt.vertexUv2s=c.has(2),Bt.vertexUv3s=c.has(3),c.clear(),Bt}function u(w){const S=[];if(w.shaderID?S.push(w.shaderID):(S.push(w.customVertexShaderID),S.push(w.customFragmentShaderID)),w.defines!==void 0)for(const D in w.defines)S.push(D),S.push(w.defines[D]);return w.isRawShaderMaterial===!1&&(_(S,w),x(S,w),S.push(t.outputColorSpace)),S.push(w.customProgramCacheKey),S.join()}function _(w,S){w.push(S.precision),w.push(S.outputColorSpace),w.push(S.envMapMode),w.push(S.envMapCubeUVHeight),w.push(S.mapUv),w.push(S.alphaMapUv),w.push(S.lightMapUv),w.push(S.aoMapUv),w.push(S.bumpMapUv),w.push(S.normalMapUv),w.push(S.displacementMapUv),w.push(S.emissiveMapUv),w.push(S.metalnessMapUv),w.push(S.roughnessMapUv),w.push(S.anisotropyMapUv),w.push(S.clearcoatMapUv),w.push(S.clearcoatNormalMapUv),w.push(S.clearcoatRoughnessMapUv),w.push(S.iridescenceMapUv),w.push(S.iridescenceThicknessMapUv),w.push(S.sheenColorMapUv),w.push(S.sheenRoughnessMapUv),w.push(S.specularMapUv),w.push(S.specularColorMapUv),w.push(S.specularIntensityMapUv),w.push(S.transmissionMapUv),w.push(S.thicknessMapUv),w.push(S.combine),w.push(S.fogExp2),w.push(S.sizeAttenuation),w.push(S.morphTargetsCount),w.push(S.morphAttributeCount),w.push(S.numDirLights),w.push(S.numPointLights),w.push(S.numSpotLights),w.push(S.numSpotLightMaps),w.push(S.numHemiLights),w.push(S.numRectAreaLights),w.push(S.numDirLightShadows),w.push(S.numPointLightShadows),w.push(S.numSpotLightShadows),w.push(S.numSpotLightShadowsWithMaps),w.push(S.numLightProbes),w.push(S.shadowMapType),w.push(S.toneMapping),w.push(S.numClippingPlanes),w.push(S.numClipIntersection),w.push(S.depthPacking)}function x(w,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),w.push(a.mask)}function y(w){const S=g[w.type];let D;if(S){const F=$n[S];D=DS.clone(F.uniforms)}else D=w.uniforms;return D}function b(w,S){let D;for(let F=0,V=h.length;F<V;F++){const K=h[F];if(K.cacheKey===S){D=K,++D.usedTimes;break}}return D===void 0&&(D=new jT(t,S,w,s),h.push(D)),D}function C(w){if(--w.usedTimes===0){const S=h.indexOf(w);h[S]=h[h.length-1],h.pop(),w.destroy()}}function A(w){l.remove(w)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:y,acquireProgram:b,releaseProgram:C,releaseShaderCache:A,programs:h,dispose:L}}function KT(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function ZT(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Mm(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Em(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(d,f,p,g,v,m){let u=t[e];return u===void 0?(u={id:d.id,object:d,geometry:f,material:p,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},t[e]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=p,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=v,u.group=m),e++,u}function a(d,f,p,g,v,m){const u=o(d,f,p,g,v,m);p.transmission>0?i.push(u):p.transparent===!0?r.push(u):n.push(u)}function l(d,f,p,g,v,m){const u=o(d,f,p,g,v,m);p.transmission>0?i.unshift(u):p.transparent===!0?r.unshift(u):n.unshift(u)}function c(d,f){n.length>1&&n.sort(d||ZT),i.length>1&&i.sort(f||Mm),r.length>1&&r.sort(f||Mm)}function h(){for(let d=e,f=t.length;d<f;d++){const p=t[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function JT(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new Em,t.set(i,[o])):r>=s.length?(o=new Em,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function QT(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new N,color:new Ne};break;case"SpotLight":n={position:new N,direction:new N,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new N,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":n={direction:new N,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":n={color:new Ne,position:new N,halfWidth:new N,halfHeight:new N};break}return t[e.id]=n,n}}}function e1(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let t1=0;function n1(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function i1(t){const e=new QT,n=e1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);const r=new N,s=new at,o=new at;function a(c){let h=0,d=0,f=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,g=0,v=0,m=0,u=0,_=0,x=0,y=0,b=0,C=0,A=0;c.sort(n1);for(let w=0,S=c.length;w<S;w++){const D=c[w],F=D.color,V=D.intensity,K=D.distance,$=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=F.r*V,d+=F.g*V,f+=F.b*V;else if(D.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(D.sh.coefficients[q],V);A++}else if(D.isDirectionalLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ee=D.shadow,T=n.get(D);T.shadowIntensity=ee.intensity,T.shadowBias=ee.bias,T.shadowNormalBias=ee.normalBias,T.shadowRadius=ee.radius,T.shadowMapSize=ee.mapSize,i.directionalShadow[p]=T,i.directionalShadowMap[p]=$,i.directionalShadowMatrix[p]=D.shadow.matrix,_++}i.directional[p]=q,p++}else if(D.isSpotLight){const q=e.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(F).multiplyScalar(V),q.distance=K,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,i.spot[v]=q;const ee=D.shadow;if(D.map&&(i.spotLightMap[b]=D.map,b++,ee.updateMatrices(D),D.castShadow&&C++),i.spotLightMatrix[v]=ee.matrix,D.castShadow){const T=n.get(D);T.shadowIntensity=ee.intensity,T.shadowBias=ee.bias,T.shadowNormalBias=ee.normalBias,T.shadowRadius=ee.radius,T.shadowMapSize=ee.mapSize,i.spotShadow[v]=T,i.spotShadowMap[v]=$,y++}v++}else if(D.isRectAreaLight){const q=e.get(D);q.color.copy(F).multiplyScalar(V),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=q,m++}else if(D.isPointLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),q.distance=D.distance,q.decay=D.decay,D.castShadow){const ee=D.shadow,T=n.get(D);T.shadowIntensity=ee.intensity,T.shadowBias=ee.bias,T.shadowNormalBias=ee.normalBias,T.shadowRadius=ee.radius,T.shadowMapSize=ee.mapSize,T.shadowCameraNear=ee.camera.near,T.shadowCameraFar=ee.camera.far,i.pointShadow[g]=T,i.pointShadowMap[g]=$,i.pointShadowMatrix[g]=D.shadow.matrix,x++}i.point[g]=q,g++}else if(D.isHemisphereLight){const q=e.get(D);q.skyColor.copy(D.color).multiplyScalar(V),q.groundColor.copy(D.groundColor).multiplyScalar(V),i.hemi[u]=q,u++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=f;const L=i.hash;(L.directionalLength!==p||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==m||L.hemiLength!==u||L.numDirectionalShadows!==_||L.numPointShadows!==x||L.numSpotShadows!==y||L.numSpotMaps!==b||L.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=u,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=y+b-C,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=A,L.directionalLength=p,L.pointLength=g,L.spotLength=v,L.rectAreaLength=m,L.hemiLength=u,L.numDirectionalShadows=_,L.numPointShadows=x,L.numSpotShadows=y,L.numSpotMaps=b,L.numLightProbes=A,i.version=t1++)}function l(c,h){let d=0,f=0,p=0,g=0,v=0;const m=h.matrixWorldInverse;for(let u=0,_=c.length;u<_;u++){const x=c[u];if(x.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),d++}else if(x.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),o.identity(),s.copy(x.matrixWorld),s.premultiply(m),o.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const y=i.point[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){const y=i.hemi[v];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:i}}function wm(t){const e=new i1(t),n=[],i=[];function r(h){c.camera=h,n.length=0,i.length=0}function s(h){n.push(h)}function o(h){i.push(h)}function a(){e.setup(n)}function l(h){e.setupView(n,h)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function r1(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new wm(t),e.set(r,[a])):s>=o.length?(a=new wm(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class s1 extends Fr{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=eS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class o1 extends Fr{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const a1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,l1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function c1(t,e,n){let i=new ef;const r=new de,s=new de,o=new st,a=new s1({depthPacking:tS}),l=new o1,c={},h=n.maxTextureSize,d={[tr]:Kt,[Kt]:tr,[fi]:fi},f=new Ti({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:a1,fragmentShader:l1}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Qt;g.setAttribute("position",new Gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new it(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rv;let u=this.type;this.render=function(C,A,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const w=t.getRenderTarget(),S=t.getActiveCubeFace(),D=t.getActiveMipmapLevel(),F=t.state;F.setBlending(Zi),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const V=u!==ci&&this.type===ci,K=u===ci&&this.type!==ci;for(let $=0,q=C.length;$<q;$++){const ee=C[$],T=ee.shadow;if(T===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(T.autoUpdate===!1&&T.needsUpdate===!1)continue;r.copy(T.mapSize);const B=T.getFrameExtents();if(r.multiply(B),s.copy(T.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/B.x),r.x=s.x*B.x,T.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/B.y),r.y=s.y*B.y,T.mapSize.y=s.y)),T.map===null||V===!0||K===!0){const ie=this.type!==ci?{minFilter:Vn,magFilter:Vn}:{};T.map!==null&&T.map.dispose(),T.map=new Lr(r.x,r.y,ie),T.map.texture.name=ee.name+".shadowMap",T.camera.updateProjectionMatrix()}t.setRenderTarget(T.map),t.clear();const X=T.getViewportCount();for(let ie=0;ie<X;ie++){const ye=T.getViewport(ie);o.set(s.x*ye.x,s.y*ye.y,s.x*ye.z,s.y*ye.w),F.viewport(o),T.updateMatrices(ee,ie),i=T.getFrustum(),y(A,L,T.camera,ee,this.type)}T.isPointLightShadow!==!0&&this.type===ci&&_(T,L),T.needsUpdate=!1}u=this.type,m.needsUpdate=!1,t.setRenderTarget(w,S,D)};function _(C,A){const L=e.update(v);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Lr(r.x,r.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,t.setRenderTarget(C.mapPass),t.clear(),t.renderBufferDirect(A,null,L,f,v,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,t.setRenderTarget(C.map),t.clear(),t.renderBufferDirect(A,null,L,p,v,null)}function x(C,A,L,w){let S=null;const D=L.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)S=D;else if(S=L.isPointLight===!0?l:a,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const F=S.uuid,V=A.uuid;let K=c[F];K===void 0&&(K={},c[F]=K);let $=K[V];$===void 0&&($=S.clone(),K[V]=$,A.addEventListener("dispose",b)),S=$}if(S.visible=A.visible,S.wireframe=A.wireframe,w===ci?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:d[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const F=t.properties.get(S);F.light=L}return S}function y(C,A,L,w,S){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&S===ci)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,C.matrixWorld);const V=e.update(C),K=C.material;if(Array.isArray(K)){const $=V.groups;for(let q=0,ee=$.length;q<ee;q++){const T=$[q],B=K[T.materialIndex];if(B&&B.visible){const X=x(C,B,w,S);C.onBeforeShadow(t,C,A,L,V,X,T),t.renderBufferDirect(L,null,V,X,C,T),C.onAfterShadow(t,C,A,L,V,X,T)}}}else if(K.visible){const $=x(C,K,w,S);C.onBeforeShadow(t,C,A,L,V,$,null),t.renderBufferDirect(L,null,V,$,C,null),C.onAfterShadow(t,C,A,L,V,$,null)}}const F=C.children;for(let V=0,K=F.length;V<K;V++)y(F[V],A,L,w,S)}function b(C){C.target.removeEventListener("dispose",b);for(const L in c){const w=c[L],S=C.target.uuid;S in w&&(w[S].dispose(),delete w[S])}}}const u1={[uh]:hh,[dh]:mh,[fh]:gh,[Ns]:ph,[hh]:uh,[mh]:dh,[gh]:fh,[ph]:Ns};function h1(t,e){function n(){let I=!1;const oe=new st;let Y=null;const te=new st(0,0,0,0);return{setMask:function(me){Y!==me&&!I&&(t.colorMask(me,me,me,me),Y=me)},setLocked:function(me){I=me},setClear:function(me,fe,Fe,St,Bt){Bt===!0&&(me*=St,fe*=St,Fe*=St),oe.set(me,fe,Fe,St),te.equals(oe)===!1&&(t.clearColor(me,fe,Fe,St),te.copy(oe))},reset:function(){I=!1,Y=null,te.set(-1,0,0,0)}}}function i(){let I=!1,oe=!1,Y=null,te=null,me=null;return{setReversed:function(fe){if(oe!==fe){const Fe=e.get("EXT_clip_control");oe?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT);const St=me;me=null,this.setClear(St)}oe=fe},getReversed:function(){return oe},setTest:function(fe){fe?ce(t.DEPTH_TEST):be(t.DEPTH_TEST)},setMask:function(fe){Y!==fe&&!I&&(t.depthMask(fe),Y=fe)},setFunc:function(fe){if(oe&&(fe=u1[fe]),te!==fe){switch(fe){case uh:t.depthFunc(t.NEVER);break;case hh:t.depthFunc(t.ALWAYS);break;case dh:t.depthFunc(t.LESS);break;case Ns:t.depthFunc(t.LEQUAL);break;case fh:t.depthFunc(t.EQUAL);break;case ph:t.depthFunc(t.GEQUAL);break;case mh:t.depthFunc(t.GREATER);break;case gh:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}te=fe}},setLocked:function(fe){I=fe},setClear:function(fe){me!==fe&&(oe&&(fe=1-fe),t.clearDepth(fe),me=fe)},reset:function(){I=!1,Y=null,te=null,me=null,oe=!1}}}function r(){let I=!1,oe=null,Y=null,te=null,me=null,fe=null,Fe=null,St=null,Bt=null;return{setTest:function(et){I||(et?ce(t.STENCIL_TEST):be(t.STENCIL_TEST))},setMask:function(et){oe!==et&&!I&&(t.stencilMask(et),oe=et)},setFunc:function(et,Pn,ni){(Y!==et||te!==Pn||me!==ni)&&(t.stencilFunc(et,Pn,ni),Y=et,te=Pn,me=ni)},setOp:function(et,Pn,ni){(fe!==et||Fe!==Pn||St!==ni)&&(t.stencilOp(et,Pn,ni),fe=et,Fe=Pn,St=ni)},setLocked:function(et){I=et},setClear:function(et){Bt!==et&&(t.clearStencil(et),Bt=et)},reset:function(){I=!1,oe=null,Y=null,te=null,me=null,fe=null,Fe=null,St=null,Bt=null}}}const s=new n,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let h={},d={},f=new WeakMap,p=[],g=null,v=!1,m=null,u=null,_=null,x=null,y=null,b=null,C=null,A=new Ne(0,0,0),L=0,w=!1,S=null,D=null,F=null,V=null,K=null;const $=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,ee=0;const T=t.getParameter(t.VERSION);T.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(T)[1]),q=ee>=1):T.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(T)[1]),q=ee>=2);let B=null,X={};const ie=t.getParameter(t.SCISSOR_BOX),ye=t.getParameter(t.VIEWPORT),He=new st().fromArray(ie),G=new st().fromArray(ye);function re(I,oe,Y,te){const me=new Uint8Array(4),fe=t.createTexture();t.bindTexture(I,fe),t.texParameteri(I,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(I,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Fe=0;Fe<Y;Fe++)I===t.TEXTURE_3D||I===t.TEXTURE_2D_ARRAY?t.texImage3D(oe,0,t.RGBA,1,1,te,0,t.RGBA,t.UNSIGNED_BYTE,me):t.texImage2D(oe+Fe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,me);return fe}const _e={};_e[t.TEXTURE_2D]=re(t.TEXTURE_2D,t.TEXTURE_2D,1),_e[t.TEXTURE_CUBE_MAP]=re(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[t.TEXTURE_2D_ARRAY]=re(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),_e[t.TEXTURE_3D]=re(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ce(t.DEPTH_TEST),o.setFunc(Ns),Ve(!1),Xe(Pp),ce(t.CULL_FACE),z(Zi);function ce(I){h[I]!==!0&&(t.enable(I),h[I]=!0)}function be(I){h[I]!==!1&&(t.disable(I),h[I]=!1)}function Ie(I,oe){return d[I]!==oe?(t.bindFramebuffer(I,oe),d[I]=oe,I===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=oe),I===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=oe),!0):!1}function Be(I,oe){let Y=p,te=!1;if(I){Y=f.get(oe),Y===void 0&&(Y=[],f.set(oe,Y));const me=I.textures;if(Y.length!==me.length||Y[0]!==t.COLOR_ATTACHMENT0){for(let fe=0,Fe=me.length;fe<Fe;fe++)Y[fe]=t.COLOR_ATTACHMENT0+fe;Y.length=me.length,te=!0}}else Y[0]!==t.BACK&&(Y[0]=t.BACK,te=!0);te&&t.drawBuffers(Y)}function lt(I){return g!==I?(t.useProgram(I),g=I,!0):!1}const je={[gr]:t.FUNC_ADD,[Ry]:t.FUNC_SUBTRACT,[Py]:t.FUNC_REVERSE_SUBTRACT};je[by]=t.MIN,je[Ly]=t.MAX;const mt={[Dy]:t.ZERO,[Ny]:t.ONE,[Iy]:t.SRC_COLOR,[lh]:t.SRC_ALPHA,[By]:t.SRC_ALPHA_SATURATE,[ky]:t.DST_COLOR,[Fy]:t.DST_ALPHA,[Uy]:t.ONE_MINUS_SRC_COLOR,[ch]:t.ONE_MINUS_SRC_ALPHA,[zy]:t.ONE_MINUS_DST_COLOR,[Oy]:t.ONE_MINUS_DST_ALPHA,[Hy]:t.CONSTANT_COLOR,[Vy]:t.ONE_MINUS_CONSTANT_COLOR,[Gy]:t.CONSTANT_ALPHA,[Wy]:t.ONE_MINUS_CONSTANT_ALPHA};function z(I,oe,Y,te,me,fe,Fe,St,Bt,et){if(I===Zi){v===!0&&(be(t.BLEND),v=!1);return}if(v===!1&&(ce(t.BLEND),v=!0),I!==Cy){if(I!==m||et!==w){if((u!==gr||y!==gr)&&(t.blendEquation(t.FUNC_ADD),u=gr,y=gr),et)switch(I){case Es:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case bp:t.blendFunc(t.ONE,t.ONE);break;case Lp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Dp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Es:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case bp:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Lp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Dp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}_=null,x=null,b=null,C=null,A.set(0,0,0),L=0,m=I,w=et}return}me=me||oe,fe=fe||Y,Fe=Fe||te,(oe!==u||me!==y)&&(t.blendEquationSeparate(je[oe],je[me]),u=oe,y=me),(Y!==_||te!==x||fe!==b||Fe!==C)&&(t.blendFuncSeparate(mt[Y],mt[te],mt[fe],mt[Fe]),_=Y,x=te,b=fe,C=Fe),(St.equals(A)===!1||Bt!==L)&&(t.blendColor(St.r,St.g,St.b,Bt),A.copy(St),L=Bt),m=I,w=!1}function zt(I,oe){I.side===fi?be(t.CULL_FACE):ce(t.CULL_FACE);let Y=I.side===Kt;oe&&(Y=!Y),Ve(Y),I.blending===Es&&I.transparent===!1?z(Zi):z(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),s.setMask(I.colorWrite);const te=I.stencilWrite;a.setTest(te),te&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ot(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ce(t.SAMPLE_ALPHA_TO_COVERAGE):be(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(I){S!==I&&(I?t.frontFace(t.CW):t.frontFace(t.CCW),S=I)}function Xe(I){I!==Ty?(ce(t.CULL_FACE),I!==D&&(I===Pp?t.cullFace(t.BACK):I===Ay?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):be(t.CULL_FACE),D=I}function Pe(I){I!==F&&(q&&t.lineWidth(I),F=I)}function ot(I,oe,Y){I?(ce(t.POLYGON_OFFSET_FILL),(V!==oe||K!==Y)&&(t.polygonOffset(oe,Y),V=oe,K=Y)):be(t.POLYGON_OFFSET_FILL)}function we(I){I?ce(t.SCISSOR_TEST):be(t.SCISSOR_TEST)}function R(I){I===void 0&&(I=t.TEXTURE0+$-1),B!==I&&(t.activeTexture(I),B=I)}function M(I,oe,Y){Y===void 0&&(B===null?Y=t.TEXTURE0+$-1:Y=B);let te=X[Y];te===void 0&&(te={type:void 0,texture:void 0},X[Y]=te),(te.type!==I||te.texture!==oe)&&(B!==Y&&(t.activeTexture(Y),B=Y),t.bindTexture(I,oe||_e[I]),te.type=I,te.texture=oe)}function H(){const I=X[B];I!==void 0&&I.type!==void 0&&(t.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Q(){try{t.compressedTexImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ne(){try{t.compressedTexImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Z(){try{t.texSubImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Se(){try{t.texSubImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ue(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ve(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function $e(){try{t.texStorage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function U(){try{t.texStorage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{t.texImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Me(){try{t.texImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Le(I){He.equals(I)===!1&&(t.scissor(I.x,I.y,I.z,I.w),He.copy(I))}function ge(I){G.equals(I)===!1&&(t.viewport(I.x,I.y,I.z,I.w),G.copy(I))}function Ye(I,oe){let Y=c.get(oe);Y===void 0&&(Y=new WeakMap,c.set(oe,Y));let te=Y.get(I);te===void 0&&(te=t.getUniformBlockIndex(oe,I.name),Y.set(I,te))}function le(I,oe){const te=c.get(oe).get(I);l.get(oe)!==te&&(t.uniformBlockBinding(oe,te,I.__bindingPointIndex),l.set(oe,te))}function De(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},B=null,X={},d={},f=new WeakMap,p=[],g=null,v=!1,m=null,u=null,_=null,x=null,y=null,b=null,C=null,A=new Ne(0,0,0),L=0,w=!1,S=null,D=null,F=null,V=null,K=null,He.set(0,0,t.canvas.width,t.canvas.height),G.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ce,disable:be,bindFramebuffer:Ie,drawBuffers:Be,useProgram:lt,setBlending:z,setMaterial:zt,setFlipSided:Ve,setCullFace:Xe,setLineWidth:Pe,setPolygonOffset:ot,setScissorTest:we,activeTexture:R,bindTexture:M,unbindTexture:H,compressedTexImage2D:Q,compressedTexImage3D:ne,texImage2D:J,texImage3D:Me,updateUBOMapping:Ye,uniformBlockBinding:le,texStorage2D:$e,texStorage3D:U,texSubImage2D:Z,texSubImage3D:Se,compressedTexSubImage2D:ue,compressedTexSubImage3D:ve,scissor:Le,viewport:ge,reset:De}}function Tm(t,e,n,i){const r=d1(i);switch(n){case dv:return t*e;case pv:return t*e;case mv:return t*e*2;case gv:return t*e/r.components*r.byteLength;case Kd:return t*e/r.components*r.byteLength;case _v:return t*e*2/r.components*r.byteLength;case Zd:return t*e*2/r.components*r.byteLength;case fv:return t*e*3/r.components*r.byteLength;case zn:return t*e*4/r.components*r.byteLength;case Jd:return t*e*4/r.components*r.byteLength;case sl:case ol:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case al:case ll:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Mh:case wh:return Math.max(t,16)*Math.max(e,8)/4;case Sh:case Eh:return Math.max(t,8)*Math.max(e,8)/2;case Th:case Ah:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Ch:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Rh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Ph:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case bh:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Lh:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Dh:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Nh:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Ih:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Uh:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Fh:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Oh:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case kh:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case zh:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Bh:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Hh:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case cl:case Vh:case Gh:return Math.ceil(t/4)*Math.ceil(e/4)*16;case vv:case Wh:return Math.ceil(t/4)*Math.ceil(e/4)*8;case jh:case Xh:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function d1(t){switch(t){case wi:case cv:return{byteLength:1,components:1};case Go:case uv:case qo:return{byteLength:2,components:1};case $d:case qd:return{byteLength:2,components:4};case br:case Yd:case gi:return{byteLength:4,components:1};case hv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function f1(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new de,h=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,M){return p?new OffscreenCanvas(R,M):Ol("canvas")}function v(R,M,H){let Q=1;const ne=we(R);if((ne.width>H||ne.height>H)&&(Q=H/Math.max(ne.width,ne.height)),Q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Z=Math.floor(Q*ne.width),Se=Math.floor(Q*ne.height);d===void 0&&(d=g(Z,Se));const ue=M?g(Z,Se):d;return ue.width=Z,ue.height=Se,ue.getContext("2d").drawImage(R,0,0,Z,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+Z+"x"+Se+")."),ue}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),R;return R}function m(R){return R.generateMipmaps}function u(R){t.generateMipmap(R)}function _(R){return R.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?t.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function x(R,M,H,Q,ne=!1){if(R!==null){if(t[R]!==void 0)return t[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Z=M;if(M===t.RED&&(H===t.FLOAT&&(Z=t.R32F),H===t.HALF_FLOAT&&(Z=t.R16F),H===t.UNSIGNED_BYTE&&(Z=t.R8)),M===t.RED_INTEGER&&(H===t.UNSIGNED_BYTE&&(Z=t.R8UI),H===t.UNSIGNED_SHORT&&(Z=t.R16UI),H===t.UNSIGNED_INT&&(Z=t.R32UI),H===t.BYTE&&(Z=t.R8I),H===t.SHORT&&(Z=t.R16I),H===t.INT&&(Z=t.R32I)),M===t.RG&&(H===t.FLOAT&&(Z=t.RG32F),H===t.HALF_FLOAT&&(Z=t.RG16F),H===t.UNSIGNED_BYTE&&(Z=t.RG8)),M===t.RG_INTEGER&&(H===t.UNSIGNED_BYTE&&(Z=t.RG8UI),H===t.UNSIGNED_SHORT&&(Z=t.RG16UI),H===t.UNSIGNED_INT&&(Z=t.RG32UI),H===t.BYTE&&(Z=t.RG8I),H===t.SHORT&&(Z=t.RG16I),H===t.INT&&(Z=t.RG32I)),M===t.RGB_INTEGER&&(H===t.UNSIGNED_BYTE&&(Z=t.RGB8UI),H===t.UNSIGNED_SHORT&&(Z=t.RGB16UI),H===t.UNSIGNED_INT&&(Z=t.RGB32UI),H===t.BYTE&&(Z=t.RGB8I),H===t.SHORT&&(Z=t.RGB16I),H===t.INT&&(Z=t.RGB32I)),M===t.RGBA_INTEGER&&(H===t.UNSIGNED_BYTE&&(Z=t.RGBA8UI),H===t.UNSIGNED_SHORT&&(Z=t.RGBA16UI),H===t.UNSIGNED_INT&&(Z=t.RGBA32UI),H===t.BYTE&&(Z=t.RGBA8I),H===t.SHORT&&(Z=t.RGBA16I),H===t.INT&&(Z=t.RGBA32I)),M===t.RGB&&H===t.UNSIGNED_INT_5_9_9_9_REV&&(Z=t.RGB9_E5),M===t.RGBA){const Se=ne?ic:qe.getTransfer(Q);H===t.FLOAT&&(Z=t.RGBA32F),H===t.HALF_FLOAT&&(Z=t.RGBA16F),H===t.UNSIGNED_BYTE&&(Z=Se===nt?t.SRGB8_ALPHA8:t.RGBA8),H===t.UNSIGNED_SHORT_4_4_4_4&&(Z=t.RGBA4),H===t.UNSIGNED_SHORT_5_5_5_1&&(Z=t.RGB5_A1)}return(Z===t.R16F||Z===t.R32F||Z===t.RG16F||Z===t.RG32F||Z===t.RGBA16F||Z===t.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(R,M){let H;return R?M===null||M===br||M===Fs?H=t.DEPTH24_STENCIL8:M===gi?H=t.DEPTH32F_STENCIL8:M===Go&&(H=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===br||M===Fs?H=t.DEPTH_COMPONENT24:M===gi?H=t.DEPTH_COMPONENT32F:M===Go&&(H=t.DEPTH_COMPONENT16),H}function b(R,M){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Vn&&R.minFilter!==Zn?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function C(R){const M=R.target;M.removeEventListener("dispose",C),L(M),M.isVideoTexture&&h.delete(M)}function A(R){const M=R.target;M.removeEventListener("dispose",A),S(M)}function L(R){const M=i.get(R);if(M.__webglInit===void 0)return;const H=R.source,Q=f.get(H);if(Q){const ne=Q[M.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&w(R),Object.keys(Q).length===0&&f.delete(H)}i.remove(R)}function w(R){const M=i.get(R);t.deleteTexture(M.__webglTexture);const H=R.source,Q=f.get(H);delete Q[M.__cacheKey],o.memory.textures--}function S(R){const M=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(M.__webglFramebuffer[Q]))for(let ne=0;ne<M.__webglFramebuffer[Q].length;ne++)t.deleteFramebuffer(M.__webglFramebuffer[Q][ne]);else t.deleteFramebuffer(M.__webglFramebuffer[Q]);M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer[Q])}else{if(Array.isArray(M.__webglFramebuffer))for(let Q=0;Q<M.__webglFramebuffer.length;Q++)t.deleteFramebuffer(M.__webglFramebuffer[Q]);else t.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&t.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Q=0;Q<M.__webglColorRenderbuffer.length;Q++)M.__webglColorRenderbuffer[Q]&&t.deleteRenderbuffer(M.__webglColorRenderbuffer[Q]);M.__webglDepthRenderbuffer&&t.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const H=R.textures;for(let Q=0,ne=H.length;Q<ne;Q++){const Z=i.get(H[Q]);Z.__webglTexture&&(t.deleteTexture(Z.__webglTexture),o.memory.textures--),i.remove(H[Q])}i.remove(R)}let D=0;function F(){D=0}function V(){const R=D;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),D+=1,R}function K(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function $(R,M){const H=i.get(R);if(R.isVideoTexture&&Pe(R),R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){const Q=R.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{G(H,R,M);return}}n.bindTexture(t.TEXTURE_2D,H.__webglTexture,t.TEXTURE0+M)}function q(R,M){const H=i.get(R);if(R.version>0&&H.__version!==R.version){G(H,R,M);return}n.bindTexture(t.TEXTURE_2D_ARRAY,H.__webglTexture,t.TEXTURE0+M)}function ee(R,M){const H=i.get(R);if(R.version>0&&H.__version!==R.version){G(H,R,M);return}n.bindTexture(t.TEXTURE_3D,H.__webglTexture,t.TEXTURE0+M)}function T(R,M){const H=i.get(R);if(R.version>0&&H.__version!==R.version){re(H,R,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,H.__webglTexture,t.TEXTURE0+M)}const B={[xh]:t.REPEAT,[Sr]:t.CLAMP_TO_EDGE,[yh]:t.MIRRORED_REPEAT},X={[Vn]:t.NEAREST,[Qy]:t.NEAREST_MIPMAP_NEAREST,[ya]:t.NEAREST_MIPMAP_LINEAR,[Zn]:t.LINEAR,[Nc]:t.LINEAR_MIPMAP_NEAREST,[Mr]:t.LINEAR_MIPMAP_LINEAR},ie={[iS]:t.NEVER,[cS]:t.ALWAYS,[rS]:t.LESS,[yv]:t.LEQUAL,[sS]:t.EQUAL,[lS]:t.GEQUAL,[oS]:t.GREATER,[aS]:t.NOTEQUAL};function ye(R,M){if(M.type===gi&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Zn||M.magFilter===Nc||M.magFilter===ya||M.magFilter===Mr||M.minFilter===Zn||M.minFilter===Nc||M.minFilter===ya||M.minFilter===Mr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(R,t.TEXTURE_WRAP_S,B[M.wrapS]),t.texParameteri(R,t.TEXTURE_WRAP_T,B[M.wrapT]),(R===t.TEXTURE_3D||R===t.TEXTURE_2D_ARRAY)&&t.texParameteri(R,t.TEXTURE_WRAP_R,B[M.wrapR]),t.texParameteri(R,t.TEXTURE_MAG_FILTER,X[M.magFilter]),t.texParameteri(R,t.TEXTURE_MIN_FILTER,X[M.minFilter]),M.compareFunction&&(t.texParameteri(R,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(R,t.TEXTURE_COMPARE_FUNC,ie[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Vn||M.minFilter!==ya&&M.minFilter!==Mr||M.type===gi&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");t.texParameterf(R,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function He(R,M){let H=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",C));const Q=M.source;let ne=f.get(Q);ne===void 0&&(ne={},f.set(Q,ne));const Z=K(M);if(Z!==R.__cacheKey){ne[Z]===void 0&&(ne[Z]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ne[Z].usedTimes++;const Se=ne[R.__cacheKey];Se!==void 0&&(ne[R.__cacheKey].usedTimes--,Se.usedTimes===0&&w(M)),R.__cacheKey=Z,R.__webglTexture=ne[Z].texture}return H}function G(R,M,H){let Q=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Q=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Q=t.TEXTURE_3D);const ne=He(R,M),Z=M.source;n.bindTexture(Q,R.__webglTexture,t.TEXTURE0+H);const Se=i.get(Z);if(Z.version!==Se.__version||ne===!0){n.activeTexture(t.TEXTURE0+H);const ue=qe.getPrimaries(qe.workingColorSpace),ve=M.colorSpace===Bi?null:qe.getPrimaries(M.colorSpace),$e=M.colorSpace===Bi||ue===ve?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let U=v(M.image,!1,r.maxTextureSize);U=ot(M,U);const J=s.convert(M.format,M.colorSpace),Me=s.convert(M.type);let Le=x(M.internalFormat,J,Me,M.colorSpace,M.isVideoTexture);ye(Q,M);let ge;const Ye=M.mipmaps,le=M.isVideoTexture!==!0,De=Se.__version===void 0||ne===!0,I=Z.dataReady,oe=b(M,U);if(M.isDepthTexture)Le=y(M.format===Os,M.type),De&&(le?n.texStorage2D(t.TEXTURE_2D,1,Le,U.width,U.height):n.texImage2D(t.TEXTURE_2D,0,Le,U.width,U.height,0,J,Me,null));else if(M.isDataTexture)if(Ye.length>0){le&&De&&n.texStorage2D(t.TEXTURE_2D,oe,Le,Ye[0].width,Ye[0].height);for(let Y=0,te=Ye.length;Y<te;Y++)ge=Ye[Y],le?I&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,ge.width,ge.height,J,Me,ge.data):n.texImage2D(t.TEXTURE_2D,Y,Le,ge.width,ge.height,0,J,Me,ge.data);M.generateMipmaps=!1}else le?(De&&n.texStorage2D(t.TEXTURE_2D,oe,Le,U.width,U.height),I&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,U.width,U.height,J,Me,U.data)):n.texImage2D(t.TEXTURE_2D,0,Le,U.width,U.height,0,J,Me,U.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){le&&De&&n.texStorage3D(t.TEXTURE_2D_ARRAY,oe,Le,Ye[0].width,Ye[0].height,U.depth);for(let Y=0,te=Ye.length;Y<te;Y++)if(ge=Ye[Y],M.format!==zn)if(J!==null)if(le){if(I)if(M.layerUpdates.size>0){const me=Tm(ge.width,ge.height,M.format,M.type);for(const fe of M.layerUpdates){const Fe=ge.data.subarray(fe*me/ge.data.BYTES_PER_ELEMENT,(fe+1)*me/ge.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,fe,ge.width,ge.height,1,J,Fe)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,0,ge.width,ge.height,U.depth,J,ge.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,Y,Le,ge.width,ge.height,U.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else le?I&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,0,ge.width,ge.height,U.depth,J,Me,ge.data):n.texImage3D(t.TEXTURE_2D_ARRAY,Y,Le,ge.width,ge.height,U.depth,0,J,Me,ge.data)}else{le&&De&&n.texStorage2D(t.TEXTURE_2D,oe,Le,Ye[0].width,Ye[0].height);for(let Y=0,te=Ye.length;Y<te;Y++)ge=Ye[Y],M.format!==zn?J!==null?le?I&&n.compressedTexSubImage2D(t.TEXTURE_2D,Y,0,0,ge.width,ge.height,J,ge.data):n.compressedTexImage2D(t.TEXTURE_2D,Y,Le,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?I&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,ge.width,ge.height,J,Me,ge.data):n.texImage2D(t.TEXTURE_2D,Y,Le,ge.width,ge.height,0,J,Me,ge.data)}else if(M.isDataArrayTexture)if(le){if(De&&n.texStorage3D(t.TEXTURE_2D_ARRAY,oe,Le,U.width,U.height,U.depth),I)if(M.layerUpdates.size>0){const Y=Tm(U.width,U.height,M.format,M.type);for(const te of M.layerUpdates){const me=U.data.subarray(te*Y/U.data.BYTES_PER_ELEMENT,(te+1)*Y/U.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,te,U.width,U.height,1,J,Me,me)}M.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,U.width,U.height,U.depth,J,Me,U.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Le,U.width,U.height,U.depth,0,J,Me,U.data);else if(M.isData3DTexture)le?(De&&n.texStorage3D(t.TEXTURE_3D,oe,Le,U.width,U.height,U.depth),I&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,U.width,U.height,U.depth,J,Me,U.data)):n.texImage3D(t.TEXTURE_3D,0,Le,U.width,U.height,U.depth,0,J,Me,U.data);else if(M.isFramebufferTexture){if(De)if(le)n.texStorage2D(t.TEXTURE_2D,oe,Le,U.width,U.height);else{let Y=U.width,te=U.height;for(let me=0;me<oe;me++)n.texImage2D(t.TEXTURE_2D,me,Le,Y,te,0,J,Me,null),Y>>=1,te>>=1}}else if(Ye.length>0){if(le&&De){const Y=we(Ye[0]);n.texStorage2D(t.TEXTURE_2D,oe,Le,Y.width,Y.height)}for(let Y=0,te=Ye.length;Y<te;Y++)ge=Ye[Y],le?I&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,J,Me,ge):n.texImage2D(t.TEXTURE_2D,Y,Le,J,Me,ge);M.generateMipmaps=!1}else if(le){if(De){const Y=we(U);n.texStorage2D(t.TEXTURE_2D,oe,Le,Y.width,Y.height)}I&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,J,Me,U)}else n.texImage2D(t.TEXTURE_2D,0,Le,J,Me,U);m(M)&&u(Q),Se.__version=Z.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function re(R,M,H){if(M.image.length!==6)return;const Q=He(R,M),ne=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,R.__webglTexture,t.TEXTURE0+H);const Z=i.get(ne);if(ne.version!==Z.__version||Q===!0){n.activeTexture(t.TEXTURE0+H);const Se=qe.getPrimaries(qe.workingColorSpace),ue=M.colorSpace===Bi?null:qe.getPrimaries(M.colorSpace),ve=M.colorSpace===Bi||Se===ue?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const $e=M.isCompressedTexture||M.image[0].isCompressedTexture,U=M.image[0]&&M.image[0].isDataTexture,J=[];for(let te=0;te<6;te++)!$e&&!U?J[te]=v(M.image[te],!0,r.maxCubemapSize):J[te]=U?M.image[te].image:M.image[te],J[te]=ot(M,J[te]);const Me=J[0],Le=s.convert(M.format,M.colorSpace),ge=s.convert(M.type),Ye=x(M.internalFormat,Le,ge,M.colorSpace),le=M.isVideoTexture!==!0,De=Z.__version===void 0||Q===!0,I=ne.dataReady;let oe=b(M,Me);ye(t.TEXTURE_CUBE_MAP,M);let Y;if($e){le&&De&&n.texStorage2D(t.TEXTURE_CUBE_MAP,oe,Ye,Me.width,Me.height);for(let te=0;te<6;te++){Y=J[te].mipmaps;for(let me=0;me<Y.length;me++){const fe=Y[me];M.format!==zn?Le!==null?le?I&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,me,0,0,fe.width,fe.height,Le,fe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,me,Ye,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):le?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,me,0,0,fe.width,fe.height,Le,ge,fe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,me,Ye,fe.width,fe.height,0,Le,ge,fe.data)}}}else{if(Y=M.mipmaps,le&&De){Y.length>0&&oe++;const te=we(J[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,oe,Ye,te.width,te.height)}for(let te=0;te<6;te++)if(U){le?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,J[te].width,J[te].height,Le,ge,J[te].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ye,J[te].width,J[te].height,0,Le,ge,J[te].data);for(let me=0;me<Y.length;me++){const Fe=Y[me].image[te].image;le?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,me+1,0,0,Fe.width,Fe.height,Le,ge,Fe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,me+1,Ye,Fe.width,Fe.height,0,Le,ge,Fe.data)}}else{le?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Le,ge,J[te]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ye,Le,ge,J[te]);for(let me=0;me<Y.length;me++){const fe=Y[me];le?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,me+1,0,0,Le,ge,fe.image[te]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,me+1,Ye,Le,ge,fe.image[te])}}}m(M)&&u(t.TEXTURE_CUBE_MAP),Z.__version=ne.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function _e(R,M,H,Q,ne,Z){const Se=s.convert(H.format,H.colorSpace),ue=s.convert(H.type),ve=x(H.internalFormat,Se,ue,H.colorSpace),$e=i.get(M),U=i.get(H);if(U.__renderTarget=M,!$e.__hasExternalTextures){const J=Math.max(1,M.width>>Z),Me=Math.max(1,M.height>>Z);ne===t.TEXTURE_3D||ne===t.TEXTURE_2D_ARRAY?n.texImage3D(ne,Z,ve,J,Me,M.depth,0,Se,ue,null):n.texImage2D(ne,Z,ve,J,Me,0,Se,ue,null)}n.bindFramebuffer(t.FRAMEBUFFER,R),Xe(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Q,ne,U.__webglTexture,0,Ve(M)):(ne===t.TEXTURE_2D||ne>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Q,ne,U.__webglTexture,Z),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ce(R,M,H){if(t.bindRenderbuffer(t.RENDERBUFFER,R),M.depthBuffer){const Q=M.depthTexture,ne=Q&&Q.isDepthTexture?Q.type:null,Z=y(M.stencilBuffer,ne),Se=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ue=Ve(M);Xe(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ue,Z,M.width,M.height):H?t.renderbufferStorageMultisample(t.RENDERBUFFER,ue,Z,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,Z,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Se,t.RENDERBUFFER,R)}else{const Q=M.textures;for(let ne=0;ne<Q.length;ne++){const Z=Q[ne],Se=s.convert(Z.format,Z.colorSpace),ue=s.convert(Z.type),ve=x(Z.internalFormat,Se,ue,Z.colorSpace),$e=Ve(M);H&&Xe(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,$e,ve,M.width,M.height):Xe(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,$e,ve,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,ve,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function be(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=i.get(M.depthTexture);Q.__renderTarget=M,(!Q.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),$(M.depthTexture,0);const ne=Q.__webglTexture,Z=Ve(M);if(M.depthTexture.format===ws)Xe(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ne,0,Z):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ne,0);else if(M.depthTexture.format===Os)Xe(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ne,0,Z):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Ie(R){const M=i.get(R),H=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const Q=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Q){const ne=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Q.removeEventListener("dispose",ne)};Q.addEventListener("dispose",ne),M.__depthDisposeCallback=ne}M.__boundDepthTexture=Q}if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");be(M.__webglFramebuffer,R)}else if(H){M.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[Q]),M.__webglDepthbuffer[Q]===void 0)M.__webglDepthbuffer[Q]=t.createRenderbuffer(),ce(M.__webglDepthbuffer[Q],R,!1);else{const ne=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer[Q];t.bindRenderbuffer(t.RENDERBUFFER,Z),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,Z)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=t.createRenderbuffer(),ce(M.__webglDepthbuffer,R,!1);else{const Q=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ne=M.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ne),t.framebufferRenderbuffer(t.FRAMEBUFFER,Q,t.RENDERBUFFER,ne)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Be(R,M,H){const Q=i.get(R);M!==void 0&&_e(Q.__webglFramebuffer,R,R.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),H!==void 0&&Ie(R)}function lt(R){const M=R.texture,H=i.get(R),Q=i.get(M);R.addEventListener("dispose",A);const ne=R.textures,Z=R.isWebGLCubeRenderTarget===!0,Se=ne.length>1;if(Se||(Q.__webglTexture===void 0&&(Q.__webglTexture=t.createTexture()),Q.__version=M.version,o.memory.textures++),Z){H.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[ue]=[];for(let ve=0;ve<M.mipmaps.length;ve++)H.__webglFramebuffer[ue][ve]=t.createFramebuffer()}else H.__webglFramebuffer[ue]=t.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let ue=0;ue<M.mipmaps.length;ue++)H.__webglFramebuffer[ue]=t.createFramebuffer()}else H.__webglFramebuffer=t.createFramebuffer();if(Se)for(let ue=0,ve=ne.length;ue<ve;ue++){const $e=i.get(ne[ue]);$e.__webglTexture===void 0&&($e.__webglTexture=t.createTexture(),o.memory.textures++)}if(R.samples>0&&Xe(R)===!1){H.__webglMultisampledFramebuffer=t.createFramebuffer(),H.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ue=0;ue<ne.length;ue++){const ve=ne[ue];H.__webglColorRenderbuffer[ue]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,H.__webglColorRenderbuffer[ue]);const $e=s.convert(ve.format,ve.colorSpace),U=s.convert(ve.type),J=x(ve.internalFormat,$e,U,ve.colorSpace,R.isXRRenderTarget===!0),Me=Ve(R);t.renderbufferStorageMultisample(t.RENDERBUFFER,Me,J,R.width,R.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.RENDERBUFFER,H.__webglColorRenderbuffer[ue])}t.bindRenderbuffer(t.RENDERBUFFER,null),R.depthBuffer&&(H.__webglDepthRenderbuffer=t.createRenderbuffer(),ce(H.__webglDepthRenderbuffer,R,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(Z){n.bindTexture(t.TEXTURE_CUBE_MAP,Q.__webglTexture),ye(t.TEXTURE_CUBE_MAP,M);for(let ue=0;ue<6;ue++)if(M.mipmaps&&M.mipmaps.length>0)for(let ve=0;ve<M.mipmaps.length;ve++)_e(H.__webglFramebuffer[ue][ve],R,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ve);else _e(H.__webglFramebuffer[ue],R,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);m(M)&&u(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Se){for(let ue=0,ve=ne.length;ue<ve;ue++){const $e=ne[ue],U=i.get($e);n.bindTexture(t.TEXTURE_2D,U.__webglTexture),ye(t.TEXTURE_2D,$e),_e(H.__webglFramebuffer,R,$e,t.COLOR_ATTACHMENT0+ue,t.TEXTURE_2D,0),m($e)&&u(t.TEXTURE_2D)}n.unbindTexture()}else{let ue=t.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ue=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ue,Q.__webglTexture),ye(ue,M),M.mipmaps&&M.mipmaps.length>0)for(let ve=0;ve<M.mipmaps.length;ve++)_e(H.__webglFramebuffer[ve],R,M,t.COLOR_ATTACHMENT0,ue,ve);else _e(H.__webglFramebuffer,R,M,t.COLOR_ATTACHMENT0,ue,0);m(M)&&u(ue),n.unbindTexture()}R.depthBuffer&&Ie(R)}function je(R){const M=R.textures;for(let H=0,Q=M.length;H<Q;H++){const ne=M[H];if(m(ne)){const Z=_(R),Se=i.get(ne).__webglTexture;n.bindTexture(Z,Se),u(Z),n.unbindTexture()}}}const mt=[],z=[];function zt(R){if(R.samples>0){if(Xe(R)===!1){const M=R.textures,H=R.width,Q=R.height;let ne=t.COLOR_BUFFER_BIT;const Z=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Se=i.get(R),ue=M.length>1;if(ue)for(let ve=0;ve<M.length;ve++)n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ve,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ve,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let ve=0;ve<M.length;ve++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ne|=t.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ne|=t.STENCIL_BUFFER_BIT)),ue){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Se.__webglColorRenderbuffer[ve]);const $e=i.get(M[ve]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,$e,0)}t.blitFramebuffer(0,0,H,Q,0,0,H,Q,ne,t.NEAREST),l===!0&&(mt.length=0,z.length=0,mt.push(t.COLOR_ATTACHMENT0+ve),R.depthBuffer&&R.resolveDepthBuffer===!1&&(mt.push(Z),z.push(Z),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,z)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,mt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ue)for(let ve=0;ve<M.length;ve++){n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ve,t.RENDERBUFFER,Se.__webglColorRenderbuffer[ve]);const $e=i.get(M[ve]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ve,t.TEXTURE_2D,$e,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const M=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[M])}}}function Ve(R){return Math.min(r.maxSamples,R.samples)}function Xe(R){const M=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Pe(R){const M=o.render.frame;h.get(R)!==M&&(h.set(R,M),R.update())}function ot(R,M){const H=R.colorSpace,Q=R.format,ne=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||H!==Vs&&H!==Bi&&(qe.getTransfer(H)===nt?(Q!==zn||ne!==wi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),M}function we(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=F,this.setTexture2D=$,this.setTexture2DArray=q,this.setTexture3D=ee,this.setTextureCube=T,this.rebindTextures=Be,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=je,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Xe}function p1(t,e){function n(i,r=Bi){let s;const o=qe.getTransfer(r);if(i===wi)return t.UNSIGNED_BYTE;if(i===$d)return t.UNSIGNED_SHORT_4_4_4_4;if(i===qd)return t.UNSIGNED_SHORT_5_5_5_1;if(i===hv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===cv)return t.BYTE;if(i===uv)return t.SHORT;if(i===Go)return t.UNSIGNED_SHORT;if(i===Yd)return t.INT;if(i===br)return t.UNSIGNED_INT;if(i===gi)return t.FLOAT;if(i===qo)return t.HALF_FLOAT;if(i===dv)return t.ALPHA;if(i===fv)return t.RGB;if(i===zn)return t.RGBA;if(i===pv)return t.LUMINANCE;if(i===mv)return t.LUMINANCE_ALPHA;if(i===ws)return t.DEPTH_COMPONENT;if(i===Os)return t.DEPTH_STENCIL;if(i===gv)return t.RED;if(i===Kd)return t.RED_INTEGER;if(i===_v)return t.RG;if(i===Zd)return t.RG_INTEGER;if(i===Jd)return t.RGBA_INTEGER;if(i===sl||i===ol||i===al||i===ll)if(o===nt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===sl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ol)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ll)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===sl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ol)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===al)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ll)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Sh||i===Mh||i===Eh||i===wh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Sh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Mh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Eh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===wh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Th||i===Ah||i===Ch)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Th||i===Ah)return o===nt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ch)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Rh||i===Ph||i===bh||i===Lh||i===Dh||i===Nh||i===Ih||i===Uh||i===Fh||i===Oh||i===kh||i===zh||i===Bh||i===Hh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Rh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ph)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===bh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Lh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Dh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Nh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ih)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Uh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Oh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===kh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===zh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Bh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Hh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===cl||i===Vh||i===Gh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===cl)return o===nt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Vh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Gh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===vv||i===Wh||i===jh||i===Xh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===cl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Wh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===jh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Xh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Fs?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class m1 extends mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class qn extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const g1={type:"move"};class au{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const m=n.getJointPose(v,i),u=this._getHandJoint(c,v);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(g1)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new qn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const _1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,v1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class x1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new cn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Ti({vertexShader:_1,fragmentShader:v1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new it(new ea(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class y1 extends Ur{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,f=null,p=null,g=null;const v=new x1,m=n.getContextAttributes();let u=null,_=null;const x=[],y=[],b=new de;let C=null;const A=new mn;A.viewport=new st;const L=new mn;L.viewport=new st;const w=[A,L],S=new m1;let D=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let re=x[G];return re===void 0&&(re=new au,x[G]=re),re.getTargetRaySpace()},this.getControllerGrip=function(G){let re=x[G];return re===void 0&&(re=new au,x[G]=re),re.getGripSpace()},this.getHand=function(G){let re=x[G];return re===void 0&&(re=new au,x[G]=re),re.getHandSpace()};function V(G){const re=y.indexOf(G.inputSource);if(re===-1)return;const _e=x[re];_e!==void 0&&(_e.update(G.inputSource,G.frame,c||o),_e.dispatchEvent({type:G.type,data:G.inputSource}))}function K(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",K),r.removeEventListener("inputsourceschange",$);for(let G=0;G<x.length;G++){const re=y[G];re!==null&&(y[G]=null,x[G].disconnect(re))}D=null,F=null,v.reset(),e.setRenderTarget(u),p=null,f=null,d=null,r=null,_=null,He.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(u=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",K),r.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await n.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0){const re={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,re),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Lr(p.framebufferWidth,p.framebufferHeight,{format:zn,type:wi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let re=null,_e=null,ce=null;m.depth&&(ce=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,re=m.stencil?Os:ws,_e=m.stencil?Fs:br);const be={colorFormat:n.RGBA8,depthFormat:ce,scaleFactor:s};d=new XRWebGLBinding(r,n),f=d.createProjectionLayer(be),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new Lr(f.textureWidth,f.textureHeight,{format:zn,type:wi,depthTexture:new Dv(f.textureWidth,f.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),He.setContext(r),He.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function $(G){for(let re=0;re<G.removed.length;re++){const _e=G.removed[re],ce=y.indexOf(_e);ce>=0&&(y[ce]=null,x[ce].disconnect(_e))}for(let re=0;re<G.added.length;re++){const _e=G.added[re];let ce=y.indexOf(_e);if(ce===-1){for(let Ie=0;Ie<x.length;Ie++)if(Ie>=y.length){y.push(_e),ce=Ie;break}else if(y[Ie]===null){y[Ie]=_e,ce=Ie;break}if(ce===-1)break}const be=x[ce];be&&be.connect(_e)}}const q=new N,ee=new N;function T(G,re,_e){q.setFromMatrixPosition(re.matrixWorld),ee.setFromMatrixPosition(_e.matrixWorld);const ce=q.distanceTo(ee),be=re.projectionMatrix.elements,Ie=_e.projectionMatrix.elements,Be=be[14]/(be[10]-1),lt=be[14]/(be[10]+1),je=(be[9]+1)/be[5],mt=(be[9]-1)/be[5],z=(be[8]-1)/be[0],zt=(Ie[8]+1)/Ie[0],Ve=Be*z,Xe=Be*zt,Pe=ce/(-z+zt),ot=Pe*-z;if(re.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(ot),G.translateZ(Pe),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),be[10]===-1)G.projectionMatrix.copy(re.projectionMatrix),G.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const we=Be+Pe,R=lt+Pe,M=Ve-ot,H=Xe+(ce-ot),Q=je*lt/R*we,ne=mt*lt/R*we;G.projectionMatrix.makePerspective(M,H,Q,ne,we,R),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function B(G,re){re===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(re.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;let re=G.near,_e=G.far;v.texture!==null&&(v.depthNear>0&&(re=v.depthNear),v.depthFar>0&&(_e=v.depthFar)),S.near=L.near=A.near=re,S.far=L.far=A.far=_e,(D!==S.near||F!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),D=S.near,F=S.far),A.layers.mask=G.layers.mask|2,L.layers.mask=G.layers.mask|4,S.layers.mask=A.layers.mask|L.layers.mask;const ce=G.parent,be=S.cameras;B(S,ce);for(let Ie=0;Ie<be.length;Ie++)B(be[Ie],ce);be.length===2?T(S,A,L):S.projectionMatrix.copy(A.projectionMatrix),X(G,S,ce)};function X(G,re,_e){_e===null?G.matrix.copy(re.matrixWorld):(G.matrix.copy(_e.matrixWorld),G.matrix.invert(),G.matrix.multiply(re.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(re.projectionMatrix),G.projectionMatrixInverse.copy(re.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Yh*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(G){l=G,f!==null&&(f.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let ie=null;function ye(G,re){if(h=re.getViewerPose(c||o),g=re,h!==null){const _e=h.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let ce=!1;_e.length!==S.cameras.length&&(S.cameras.length=0,ce=!0);for(let Ie=0;Ie<_e.length;Ie++){const Be=_e[Ie];let lt=null;if(p!==null)lt=p.getViewport(Be);else{const mt=d.getViewSubImage(f,Be);lt=mt.viewport,Ie===0&&(e.setRenderTargetTextures(_,mt.colorTexture,f.ignoreDepthValues?void 0:mt.depthStencilTexture),e.setRenderTarget(_))}let je=w[Ie];je===void 0&&(je=new mn,je.layers.enable(Ie),je.viewport=new st,w[Ie]=je),je.matrix.fromArray(Be.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(Be.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(lt.x,lt.y,lt.width,lt.height),Ie===0&&(S.matrix.copy(je.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ce===!0&&S.cameras.push(je)}const be=r.enabledFeatures;if(be&&be.includes("depth-sensing")){const Ie=d.getDepthInformation(_e[0]);Ie&&Ie.isValid&&Ie.texture&&v.init(e,Ie,r.renderState)}}for(let _e=0;_e<x.length;_e++){const ce=y[_e],be=x[_e];ce!==null&&be!==void 0&&be.update(ce,re,c||o)}ie&&ie(G,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),g=null}const He=new bv;He.setAnimationLoop(ye),this.setAnimationLoop=function(G){ie=G},this.dispose=function(){}}}const dr=new ei,S1=new at;function M1(t,e){function n(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,Cv(t)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function r(m,u,_,x,y){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(m,u):u.isMeshToonMaterial?(s(m,u),d(m,u)):u.isMeshPhongMaterial?(s(m,u),h(m,u)):u.isMeshStandardMaterial?(s(m,u),f(m,u),u.isMeshPhysicalMaterial&&p(m,u,y)):u.isMeshMatcapMaterial?(s(m,u),g(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),v(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(o(m,u),u.isLineDashedMaterial&&a(m,u)):u.isPointsMaterial?l(m,u,_,x):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,n(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===Kt&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,n(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===Kt&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,n(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,n(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const _=e.get(u),x=_.envMap,y=_.envMapRotation;x&&(m.envMap.value=x,dr.copy(y),dr.x*=-1,dr.y*=-1,dr.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(dr.y*=-1,dr.z*=-1),m.envMapRotation.value.setFromMatrix4(S1.makeRotationFromEuler(dr)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,m.aoMapTransform))}function o(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform))}function a(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,_,x){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*_,m.scale.value=x*.5,u.map&&(m.map.value=u.map,n(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function h(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function d(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function f(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,_){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Kt&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,u){u.matcap&&(m.matcap.value=u.matcap)}function v(m,u){const _=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function E1(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,x){const y=x.program;i.uniformBlockBinding(_,y)}function c(_,x){let y=r[_.id];y===void 0&&(g(_),y=h(_),r[_.id]=y,_.addEventListener("dispose",m));const b=x.program;i.updateUBOMapping(_,b);const C=e.render.frame;s[_.id]!==C&&(f(_),s[_.id]=C)}function h(_){const x=d();_.__bindingPointIndex=x;const y=t.createBuffer(),b=_.__size,C=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,b,C),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,x,y),y}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const x=r[_.id],y=_.uniforms,b=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,x);for(let C=0,A=y.length;C<A;C++){const L=Array.isArray(y[C])?y[C]:[y[C]];for(let w=0,S=L.length;w<S;w++){const D=L[w];if(p(D,C,w,b)===!0){const F=D.__offset,V=Array.isArray(D.value)?D.value:[D.value];let K=0;for(let $=0;$<V.length;$++){const q=V[$],ee=v(q);typeof q=="number"||typeof q=="boolean"?(D.__data[0]=q,t.bufferSubData(t.UNIFORM_BUFFER,F+K,D.__data)):q.isMatrix3?(D.__data[0]=q.elements[0],D.__data[1]=q.elements[1],D.__data[2]=q.elements[2],D.__data[3]=0,D.__data[4]=q.elements[3],D.__data[5]=q.elements[4],D.__data[6]=q.elements[5],D.__data[7]=0,D.__data[8]=q.elements[6],D.__data[9]=q.elements[7],D.__data[10]=q.elements[8],D.__data[11]=0):(q.toArray(D.__data,K),K+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,F,D.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,x,y,b){const C=_.value,A=x+"_"+y;if(b[A]===void 0)return typeof C=="number"||typeof C=="boolean"?b[A]=C:b[A]=C.clone(),!0;{const L=b[A];if(typeof C=="number"||typeof C=="boolean"){if(L!==C)return b[A]=C,!0}else if(L.equals(C)===!1)return L.copy(C),!0}return!1}function g(_){const x=_.uniforms;let y=0;const b=16;for(let A=0,L=x.length;A<L;A++){const w=Array.isArray(x[A])?x[A]:[x[A]];for(let S=0,D=w.length;S<D;S++){const F=w[S],V=Array.isArray(F.value)?F.value:[F.value];for(let K=0,$=V.length;K<$;K++){const q=V[K],ee=v(q),T=y%b,B=T%ee.boundary,X=T+B;y+=B,X!==0&&b-X<ee.storage&&(y+=b-X),F.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=ee.storage}}}const C=y%b;return C>0&&(y+=b-C),_.__size=y,_.__cache={},this}function v(_){const x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),x}function m(_){const x=_.target;x.removeEventListener("dispose",m);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),t.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function u(){for(const _ in r)t.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:l,update:c,dispose:u}}class w1{constructor(e={}){const{canvas:n=dS(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,u=null;const _=[],x=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pn,this.toneMapping=Ji,this.toneMappingExposure=1;const y=this;let b=!1,C=0,A=0,L=null,w=-1,S=null;const D=new st,F=new st;let V=null;const K=new Ne(0);let $=0,q=n.width,ee=n.height,T=1,B=null,X=null;const ie=new st(0,0,q,ee),ye=new st(0,0,q,ee);let He=!1;const G=new ef;let re=!1,_e=!1;const ce=new at,be=new at,Ie=new N,Be=new st,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let je=!1;function mt(){return L===null?T:1}let z=i;function zt(E,O){return n.getContext(E,O)}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Xd}`),n.addEventListener("webglcontextlost",te,!1),n.addEventListener("webglcontextrestored",me,!1),n.addEventListener("webglcontextcreationerror",fe,!1),z===null){const O="webgl2";if(z=zt(O,E),z===null)throw zt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ve,Xe,Pe,ot,we,R,M,H,Q,ne,Z,Se,ue,ve,$e,U,J,Me,Le,ge,Ye,le,De,I;function oe(){Ve=new Pw(z),Ve.init(),le=new p1(z,Ve),Xe=new Ew(z,Ve,e,le),Pe=new h1(z,Ve),Xe.reverseDepthBuffer&&f&&Pe.buffers.depth.setReversed(!0),ot=new Dw(z),we=new KT,R=new f1(z,Ve,Pe,we,Xe,le,ot),M=new Tw(y),H=new Rw(y),Q=new zS(z),De=new Sw(z,Q),ne=new bw(z,Q,ot,De),Z=new Iw(z,ne,Q,ot),Le=new Nw(z,Xe,R),U=new ww(we),Se=new qT(y,M,H,Ve,Xe,De,U),ue=new M1(y,we),ve=new JT,$e=new r1(Ve),Me=new yw(y,M,H,Pe,Z,p,l),J=new c1(y,Z,Xe),I=new E1(z,ot,Xe,Pe),ge=new Mw(z,Ve,ot),Ye=new Lw(z,Ve,ot),ot.programs=Se.programs,y.capabilities=Xe,y.extensions=Ve,y.properties=we,y.renderLists=ve,y.shadowMap=J,y.state=Pe,y.info=ot}oe();const Y=new y1(y,z);this.xr=Y,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const E=Ve.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ve.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return T},this.setPixelRatio=function(E){E!==void 0&&(T=E,this.setSize(q,ee,!1))},this.getSize=function(E){return E.set(q,ee)},this.setSize=function(E,O,W=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=E,ee=O,n.width=Math.floor(E*T),n.height=Math.floor(O*T),W===!0&&(n.style.width=E+"px",n.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(q*T,ee*T).floor()},this.setDrawingBufferSize=function(E,O,W){q=E,ee=O,T=W,n.width=Math.floor(E*W),n.height=Math.floor(O*W),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(D)},this.getViewport=function(E){return E.copy(ie)},this.setViewport=function(E,O,W,j){E.isVector4?ie.set(E.x,E.y,E.z,E.w):ie.set(E,O,W,j),Pe.viewport(D.copy(ie).multiplyScalar(T).round())},this.getScissor=function(E){return E.copy(ye)},this.setScissor=function(E,O,W,j){E.isVector4?ye.set(E.x,E.y,E.z,E.w):ye.set(E,O,W,j),Pe.scissor(F.copy(ye).multiplyScalar(T).round())},this.getScissorTest=function(){return He},this.setScissorTest=function(E){Pe.setScissorTest(He=E)},this.setOpaqueSort=function(E){B=E},this.setTransparentSort=function(E){X=E},this.getClearColor=function(E){return E.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor.apply(Me,arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha.apply(Me,arguments)},this.clear=function(E=!0,O=!0,W=!0){let j=0;if(E){let k=!1;if(L!==null){const ae=L.texture.format;k=ae===Jd||ae===Zd||ae===Kd}if(k){const ae=L.texture.type,pe=ae===wi||ae===br||ae===Go||ae===Fs||ae===$d||ae===qd,Te=Me.getClearColor(),Ae=Me.getClearAlpha(),Ue=Te.r,Oe=Te.g,Ce=Te.b;pe?(g[0]=Ue,g[1]=Oe,g[2]=Ce,g[3]=Ae,z.clearBufferuiv(z.COLOR,0,g)):(v[0]=Ue,v[1]=Oe,v[2]=Ce,v[3]=Ae,z.clearBufferiv(z.COLOR,0,v))}else j|=z.COLOR_BUFFER_BIT}O&&(j|=z.DEPTH_BUFFER_BIT),W&&(j|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",te,!1),n.removeEventListener("webglcontextrestored",me,!1),n.removeEventListener("webglcontextcreationerror",fe,!1),ve.dispose(),$e.dispose(),we.dispose(),M.dispose(),H.dispose(),Z.dispose(),De.dispose(),I.dispose(),Se.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",df),Y.removeEventListener("sessionend",ff),or.stop()};function te(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const E=ot.autoReset,O=J.enabled,W=J.autoUpdate,j=J.needsUpdate,k=J.type;oe(),ot.autoReset=E,J.enabled=O,J.autoUpdate=W,J.needsUpdate=j,J.type=k}function fe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Fe(E){const O=E.target;O.removeEventListener("dispose",Fe),St(O)}function St(E){Bt(E),we.remove(E)}function Bt(E){const O=we.get(E).programs;O!==void 0&&(O.forEach(function(W){Se.releaseProgram(W)}),E.isShaderMaterial&&Se.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,W,j,k,ae){O===null&&(O=lt);const pe=k.isMesh&&k.matrixWorld.determinant()<0,Te=Yv(E,O,W,j,k);Pe.setMaterial(j,pe);let Ae=W.index,Ue=1;if(j.wireframe===!0){if(Ae=ne.getWireframeAttribute(W),Ae===void 0)return;Ue=2}const Oe=W.drawRange,Ce=W.attributes.position;let Ze=Oe.start*Ue,ct=(Oe.start+Oe.count)*Ue;ae!==null&&(Ze=Math.max(Ze,ae.start*Ue),ct=Math.min(ct,(ae.start+ae.count)*Ue)),Ae!==null?(Ze=Math.max(Ze,0),ct=Math.min(ct,Ae.count)):Ce!=null&&(Ze=Math.max(Ze,0),ct=Math.min(ct,Ce.count));const ht=ct-Ze;if(ht<0||ht===1/0)return;De.setup(k,j,Te,W,Ae);let en,Je=ge;if(Ae!==null&&(en=Q.get(Ae),Je=Ye,Je.setIndex(en)),k.isMesh)j.wireframe===!0?(Pe.setLineWidth(j.wireframeLinewidth*mt()),Je.setMode(z.LINES)):Je.setMode(z.TRIANGLES);else if(k.isLine){let Re=j.linewidth;Re===void 0&&(Re=1),Pe.setLineWidth(Re*mt()),k.isLineSegments?Je.setMode(z.LINES):k.isLineLoop?Je.setMode(z.LINE_LOOP):Je.setMode(z.LINE_STRIP)}else k.isPoints?Je.setMode(z.POINTS):k.isSprite&&Je.setMode(z.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Je.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))Je.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Re=k._multiDrawStarts,ii=k._multiDrawCounts,Qe=k._multiDrawCount,bn=Ae?Q.get(Ae).bytesPerElement:1,Or=we.get(j).currentProgram.getUniforms();for(let un=0;un<Qe;un++)Or.setValue(z,"_gl_DrawID",un),Je.render(Re[un]/bn,ii[un])}else if(k.isInstancedMesh)Je.renderInstances(Ze,ht,k.count);else if(W.isInstancedBufferGeometry){const Re=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,ii=Math.min(W.instanceCount,Re);Je.renderInstances(Ze,ht,ii)}else Je.render(Ze,ht)};function et(E,O,W){E.transparent===!0&&E.side===fi&&E.forceSinglePass===!1?(E.side=Kt,E.needsUpdate=!0,na(E,O,W),E.side=tr,E.needsUpdate=!0,na(E,O,W),E.side=fi):na(E,O,W)}this.compile=function(E,O,W=null){W===null&&(W=E),u=$e.get(W),u.init(O),x.push(u),W.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(u.pushLight(k),k.castShadow&&u.pushShadow(k))}),E!==W&&E.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(u.pushLight(k),k.castShadow&&u.pushShadow(k))}),u.setupLights();const j=new Set;return E.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const ae=k.material;if(ae)if(Array.isArray(ae))for(let pe=0;pe<ae.length;pe++){const Te=ae[pe];et(Te,W,k),j.add(Te)}else et(ae,W,k),j.add(ae)}),x.pop(),u=null,j},this.compileAsync=function(E,O,W=null){const j=this.compile(E,O,W);return new Promise(k=>{function ae(){if(j.forEach(function(pe){we.get(pe).currentProgram.isReady()&&j.delete(pe)}),j.size===0){k(E);return}setTimeout(ae,10)}Ve.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Pn=null;function ni(E){Pn&&Pn(E)}function df(){or.stop()}function ff(){or.start()}const or=new bv;or.setAnimationLoop(ni),typeof self<"u"&&or.setContext(self),this.setAnimationLoop=function(E){Pn=E,Y.setAnimationLoop(E),E===null?or.stop():or.start()},Y.addEventListener("sessionstart",df),Y.addEventListener("sessionend",ff),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(O),O=Y.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,O,L),u=$e.get(E,x.length),u.init(O),x.push(u),be.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),G.setFromProjectionMatrix(be),_e=this.localClippingEnabled,re=U.init(this.clippingPlanes,_e),m=ve.get(E,_.length),m.init(),_.push(m),Y.enabled===!0&&Y.isPresenting===!0){const ae=y.xr.getDepthSensingMesh();ae!==null&&oc(ae,O,-1/0,y.sortObjects)}oc(E,O,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(B,X),je=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,je&&Me.addToRenderList(m,E),this.info.render.frame++,re===!0&&U.beginShadows();const W=u.state.shadowsArray;J.render(W,E,O),re===!0&&U.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,k=m.transmissive;if(u.setupLights(),O.isArrayCamera){const ae=O.cameras;if(k.length>0)for(let pe=0,Te=ae.length;pe<Te;pe++){const Ae=ae[pe];mf(j,k,E,Ae)}je&&Me.render(E);for(let pe=0,Te=ae.length;pe<Te;pe++){const Ae=ae[pe];pf(m,E,Ae,Ae.viewport)}}else k.length>0&&mf(j,k,E,O),je&&Me.render(E),pf(m,E,O);L!==null&&(R.updateMultisampleRenderTarget(L),R.updateRenderTargetMipmap(L)),E.isScene===!0&&E.onAfterRender(y,E,O),De.resetDefaultState(),w=-1,S=null,x.pop(),x.length>0?(u=x[x.length-1],re===!0&&U.setGlobalState(y.clippingPlanes,u.state.camera)):u=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function oc(E,O,W,j){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)W=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)u.pushLight(E),E.castShadow&&u.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||G.intersectsSprite(E)){j&&Be.setFromMatrixPosition(E.matrixWorld).applyMatrix4(be);const pe=Z.update(E),Te=E.material;Te.visible&&m.push(E,pe,Te,W,Be.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||G.intersectsObject(E))){const pe=Z.update(E),Te=E.material;if(j&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Be.copy(E.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),Be.copy(pe.boundingSphere.center)),Be.applyMatrix4(E.matrixWorld).applyMatrix4(be)),Array.isArray(Te)){const Ae=pe.groups;for(let Ue=0,Oe=Ae.length;Ue<Oe;Ue++){const Ce=Ae[Ue],Ze=Te[Ce.materialIndex];Ze&&Ze.visible&&m.push(E,pe,Ze,W,Be.z,Ce)}}else Te.visible&&m.push(E,pe,Te,W,Be.z,null)}}const ae=E.children;for(let pe=0,Te=ae.length;pe<Te;pe++)oc(ae[pe],O,W,j)}function pf(E,O,W,j){const k=E.opaque,ae=E.transmissive,pe=E.transparent;u.setupLightsView(W),re===!0&&U.setGlobalState(y.clippingPlanes,W),j&&Pe.viewport(D.copy(j)),k.length>0&&ta(k,O,W),ae.length>0&&ta(ae,O,W),pe.length>0&&ta(pe,O,W),Pe.buffers.depth.setTest(!0),Pe.buffers.depth.setMask(!0),Pe.buffers.color.setMask(!0),Pe.setPolygonOffset(!1)}function mf(E,O,W,j){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[j.id]===void 0&&(u.state.transmissionRenderTarget[j.id]=new Lr(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?qo:wi,minFilter:Mr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const ae=u.state.transmissionRenderTarget[j.id],pe=j.viewport||D;ae.setSize(pe.z,pe.w);const Te=y.getRenderTarget();y.setRenderTarget(ae),y.getClearColor(K),$=y.getClearAlpha(),$<1&&y.setClearColor(16777215,.5),y.clear(),je&&Me.render(W);const Ae=y.toneMapping;y.toneMapping=Ji;const Ue=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),u.setupLightsView(j),re===!0&&U.setGlobalState(y.clippingPlanes,j),ta(E,W,j),R.updateMultisampleRenderTarget(ae),R.updateRenderTargetMipmap(ae),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let Ce=0,Ze=O.length;Ce<Ze;Ce++){const ct=O[Ce],ht=ct.object,en=ct.geometry,Je=ct.material,Re=ct.group;if(Je.side===fi&&ht.layers.test(j.layers)){const ii=Je.side;Je.side=Kt,Je.needsUpdate=!0,gf(ht,W,j,en,Je,Re),Je.side=ii,Je.needsUpdate=!0,Oe=!0}}Oe===!0&&(R.updateMultisampleRenderTarget(ae),R.updateRenderTargetMipmap(ae))}y.setRenderTarget(Te),y.setClearColor(K,$),Ue!==void 0&&(j.viewport=Ue),y.toneMapping=Ae}function ta(E,O,W){const j=O.isScene===!0?O.overrideMaterial:null;for(let k=0,ae=E.length;k<ae;k++){const pe=E[k],Te=pe.object,Ae=pe.geometry,Ue=j===null?pe.material:j,Oe=pe.group;Te.layers.test(W.layers)&&gf(Te,O,W,Ae,Ue,Oe)}}function gf(E,O,W,j,k,ae){E.onBeforeRender(y,O,W,j,k,ae),E.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),k.onBeforeRender(y,O,W,j,E,ae),k.transparent===!0&&k.side===fi&&k.forceSinglePass===!1?(k.side=Kt,k.needsUpdate=!0,y.renderBufferDirect(W,O,j,k,E,ae),k.side=tr,k.needsUpdate=!0,y.renderBufferDirect(W,O,j,k,E,ae),k.side=fi):y.renderBufferDirect(W,O,j,k,E,ae),E.onAfterRender(y,O,W,j,k,ae)}function na(E,O,W){O.isScene!==!0&&(O=lt);const j=we.get(E),k=u.state.lights,ae=u.state.shadowsArray,pe=k.state.version,Te=Se.getParameters(E,k.state,ae,O,W),Ae=Se.getProgramCacheKey(Te);let Ue=j.programs;j.environment=E.isMeshStandardMaterial?O.environment:null,j.fog=O.fog,j.envMap=(E.isMeshStandardMaterial?H:M).get(E.envMap||j.environment),j.envMapRotation=j.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,Ue===void 0&&(E.addEventListener("dispose",Fe),Ue=new Map,j.programs=Ue);let Oe=Ue.get(Ae);if(Oe!==void 0){if(j.currentProgram===Oe&&j.lightsStateVersion===pe)return vf(E,Te),Oe}else Te.uniforms=Se.getUniforms(E),E.onBeforeCompile(Te,y),Oe=Se.acquireProgram(Te,Ae),Ue.set(Ae,Oe),j.uniforms=Te.uniforms;const Ce=j.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ce.clippingPlanes=U.uniform),vf(E,Te),j.needsLights=qv(E),j.lightsStateVersion=pe,j.needsLights&&(Ce.ambientLightColor.value=k.state.ambient,Ce.lightProbe.value=k.state.probe,Ce.directionalLights.value=k.state.directional,Ce.directionalLightShadows.value=k.state.directionalShadow,Ce.spotLights.value=k.state.spot,Ce.spotLightShadows.value=k.state.spotShadow,Ce.rectAreaLights.value=k.state.rectArea,Ce.ltc_1.value=k.state.rectAreaLTC1,Ce.ltc_2.value=k.state.rectAreaLTC2,Ce.pointLights.value=k.state.point,Ce.pointLightShadows.value=k.state.pointShadow,Ce.hemisphereLights.value=k.state.hemi,Ce.directionalShadowMap.value=k.state.directionalShadowMap,Ce.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ce.spotShadowMap.value=k.state.spotShadowMap,Ce.spotLightMatrix.value=k.state.spotLightMatrix,Ce.spotLightMap.value=k.state.spotLightMap,Ce.pointShadowMap.value=k.state.pointShadowMap,Ce.pointShadowMatrix.value=k.state.pointShadowMatrix),j.currentProgram=Oe,j.uniformsList=null,Oe}function _f(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=hl.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function vf(E,O){const W=we.get(E);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function Yv(E,O,W,j,k){O.isScene!==!0&&(O=lt),R.resetTextureUnits();const ae=O.fog,pe=j.isMeshStandardMaterial?O.environment:null,Te=L===null?y.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Vs,Ae=(j.isMeshStandardMaterial?H:M).get(j.envMap||pe),Ue=j.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Oe=!!W.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Ce=!!W.morphAttributes.position,Ze=!!W.morphAttributes.normal,ct=!!W.morphAttributes.color;let ht=Ji;j.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ht=y.toneMapping);const en=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Je=en!==void 0?en.length:0,Re=we.get(j),ii=u.state.lights;if(re===!0&&(_e===!0||E!==S)){const Sn=E===S&&j.id===w;U.setState(j,E,Sn)}let Qe=!1;j.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==ii.state.version||Re.outputColorSpace!==Te||k.isBatchedMesh&&Re.batching===!1||!k.isBatchedMesh&&Re.batching===!0||k.isBatchedMesh&&Re.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Re.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Re.instancing===!1||!k.isInstancedMesh&&Re.instancing===!0||k.isSkinnedMesh&&Re.skinning===!1||!k.isSkinnedMesh&&Re.skinning===!0||k.isInstancedMesh&&Re.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Re.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Re.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Re.instancingMorph===!1&&k.morphTexture!==null||Re.envMap!==Ae||j.fog===!0&&Re.fog!==ae||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==U.numPlanes||Re.numIntersection!==U.numIntersection)||Re.vertexAlphas!==Ue||Re.vertexTangents!==Oe||Re.morphTargets!==Ce||Re.morphNormals!==Ze||Re.morphColors!==ct||Re.toneMapping!==ht||Re.morphTargetsCount!==Je)&&(Qe=!0):(Qe=!0,Re.__version=j.version);let bn=Re.currentProgram;Qe===!0&&(bn=na(j,O,k));let Or=!1,un=!1,Ws=!1;const dt=bn.getUniforms(),jn=Re.uniforms;if(Pe.useProgram(bn.program)&&(Or=!0,un=!0,Ws=!0),j.id!==w&&(w=j.id,un=!0),Or||S!==E){Pe.buffers.depth.getReversed()?(ce.copy(E.projectionMatrix),pS(ce),mS(ce),dt.setValue(z,"projectionMatrix",ce)):dt.setValue(z,"projectionMatrix",E.projectionMatrix),dt.setValue(z,"viewMatrix",E.matrixWorldInverse);const Ci=dt.map.cameraPosition;Ci!==void 0&&Ci.setValue(z,Ie.setFromMatrixPosition(E.matrixWorld)),Xe.logarithmicDepthBuffer&&dt.setValue(z,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&dt.setValue(z,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,un=!0,Ws=!0)}if(k.isSkinnedMesh){dt.setOptional(z,k,"bindMatrix"),dt.setOptional(z,k,"bindMatrixInverse");const Sn=k.skeleton;Sn&&(Sn.boneTexture===null&&Sn.computeBoneTexture(),dt.setValue(z,"boneTexture",Sn.boneTexture,R))}k.isBatchedMesh&&(dt.setOptional(z,k,"batchingTexture"),dt.setValue(z,"batchingTexture",k._matricesTexture,R),dt.setOptional(z,k,"batchingIdTexture"),dt.setValue(z,"batchingIdTexture",k._indirectTexture,R),dt.setOptional(z,k,"batchingColorTexture"),k._colorsTexture!==null&&dt.setValue(z,"batchingColorTexture",k._colorsTexture,R));const js=W.morphAttributes;if((js.position!==void 0||js.normal!==void 0||js.color!==void 0)&&Le.update(k,W,bn),(un||Re.receiveShadow!==k.receiveShadow)&&(Re.receiveShadow=k.receiveShadow,dt.setValue(z,"receiveShadow",k.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(jn.envMap.value=Ae,jn.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&O.environment!==null&&(jn.envMapIntensity.value=O.environmentIntensity),un&&(dt.setValue(z,"toneMappingExposure",y.toneMappingExposure),Re.needsLights&&$v(jn,Ws),ae&&j.fog===!0&&ue.refreshFogUniforms(jn,ae),ue.refreshMaterialUniforms(jn,j,T,ee,u.state.transmissionRenderTarget[E.id]),hl.upload(z,_f(Re),jn,R)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(hl.upload(z,_f(Re),jn,R),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&dt.setValue(z,"center",k.center),dt.setValue(z,"modelViewMatrix",k.modelViewMatrix),dt.setValue(z,"normalMatrix",k.normalMatrix),dt.setValue(z,"modelMatrix",k.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const Sn=j.uniformsGroups;for(let Ci=0,Ri=Sn.length;Ci<Ri;Ci++){const xf=Sn[Ci];I.update(xf,bn),I.bind(xf,bn)}}return bn}function $v(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function qv(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(E,O,W){we.get(E.texture).__webglTexture=O,we.get(E.depthTexture).__webglTexture=W;const j=we.get(E);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=W===void 0,j.__autoAllocateDepthBuffer||Ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,O){const W=we.get(E);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,W=0){L=E,C=O,A=W;let j=!0,k=null,ae=!1,pe=!1;if(E){const Ae=we.get(E);if(Ae.__useDefaultFramebuffer!==void 0)Pe.bindFramebuffer(z.FRAMEBUFFER,null),j=!1;else if(Ae.__webglFramebuffer===void 0)R.setupRenderTarget(E);else if(Ae.__hasExternalTextures)R.rebindTextures(E,we.get(E.texture).__webglTexture,we.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ce=E.depthTexture;if(Ae.__boundDepthTexture!==Ce){if(Ce!==null&&we.has(Ce)&&(E.width!==Ce.image.width||E.height!==Ce.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(E)}}const Ue=E.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(pe=!0);const Oe=we.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Oe[O])?k=Oe[O][W]:k=Oe[O],ae=!0):E.samples>0&&R.useMultisampledRTT(E)===!1?k=we.get(E).__webglMultisampledFramebuffer:Array.isArray(Oe)?k=Oe[W]:k=Oe,D.copy(E.viewport),F.copy(E.scissor),V=E.scissorTest}else D.copy(ie).multiplyScalar(T).floor(),F.copy(ye).multiplyScalar(T).floor(),V=He;if(Pe.bindFramebuffer(z.FRAMEBUFFER,k)&&j&&Pe.drawBuffers(E,k),Pe.viewport(D),Pe.scissor(F),Pe.setScissorTest(V),ae){const Ae=we.get(E.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ae.__webglTexture,W)}else if(pe){const Ae=we.get(E.texture),Ue=O||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ae.__webglTexture,W||0,Ue)}w=-1},this.readRenderTargetPixels=function(E,O,W,j,k,ae,pe){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=we.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&pe!==void 0&&(Te=Te[pe]),Te){Pe.bindFramebuffer(z.FRAMEBUFFER,Te);try{const Ae=E.texture,Ue=Ae.format,Oe=Ae.type;if(!Xe.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xe.textureTypeReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-j&&W>=0&&W<=E.height-k&&z.readPixels(O,W,j,k,le.convert(Ue),le.convert(Oe),ae)}finally{const Ae=L!==null?we.get(L).__webglFramebuffer:null;Pe.bindFramebuffer(z.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(E,O,W,j,k,ae,pe){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=we.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&pe!==void 0&&(Te=Te[pe]),Te){const Ae=E.texture,Ue=Ae.format,Oe=Ae.type;if(!Xe.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xe.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=E.width-j&&W>=0&&W<=E.height-k){Pe.bindFramebuffer(z.FRAMEBUFFER,Te);const Ce=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Ce),z.bufferData(z.PIXEL_PACK_BUFFER,ae.byteLength,z.STREAM_READ),z.readPixels(O,W,j,k,le.convert(Ue),le.convert(Oe),0);const Ze=L!==null?we.get(L).__webglFramebuffer:null;Pe.bindFramebuffer(z.FRAMEBUFFER,Ze);const ct=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await fS(z,ct,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Ce),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,ae),z.deleteBuffer(Ce),z.deleteSync(ct),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,O=null,W=0){E.isTexture!==!0&&(ho("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,E=arguments[1]);const j=Math.pow(2,-W),k=Math.floor(E.image.width*j),ae=Math.floor(E.image.height*j),pe=O!==null?O.x:0,Te=O!==null?O.y:0;R.setTexture2D(E,0),z.copyTexSubImage2D(z.TEXTURE_2D,W,0,0,pe,Te,k,ae),Pe.unbindTexture()},this.copyTextureToTexture=function(E,O,W=null,j=null,k=0){E.isTexture!==!0&&(ho("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,E=arguments[1],O=arguments[2],k=arguments[3]||0,W=null);let ae,pe,Te,Ae,Ue,Oe,Ce,Ze,ct;const ht=E.isCompressedTexture?E.mipmaps[k]:E.image;W!==null?(ae=W.max.x-W.min.x,pe=W.max.y-W.min.y,Te=W.isBox3?W.max.z-W.min.z:1,Ae=W.min.x,Ue=W.min.y,Oe=W.isBox3?W.min.z:0):(ae=ht.width,pe=ht.height,Te=ht.depth||1,Ae=0,Ue=0,Oe=0),j!==null?(Ce=j.x,Ze=j.y,ct=j.z):(Ce=0,Ze=0,ct=0);const en=le.convert(O.format),Je=le.convert(O.type);let Re;O.isData3DTexture?(R.setTexture3D(O,0),Re=z.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(R.setTexture2DArray(O,0),Re=z.TEXTURE_2D_ARRAY):(R.setTexture2D(O,0),Re=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,O.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,O.unpackAlignment);const ii=z.getParameter(z.UNPACK_ROW_LENGTH),Qe=z.getParameter(z.UNPACK_IMAGE_HEIGHT),bn=z.getParameter(z.UNPACK_SKIP_PIXELS),Or=z.getParameter(z.UNPACK_SKIP_ROWS),un=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,ht.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ht.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Ae),z.pixelStorei(z.UNPACK_SKIP_ROWS,Ue),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Oe);const Ws=E.isDataArrayTexture||E.isData3DTexture,dt=O.isDataArrayTexture||O.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const jn=we.get(E),js=we.get(O),Sn=we.get(jn.__renderTarget),Ci=we.get(js.__renderTarget);Pe.bindFramebuffer(z.READ_FRAMEBUFFER,Sn.__webglFramebuffer),Pe.bindFramebuffer(z.DRAW_FRAMEBUFFER,Ci.__webglFramebuffer);for(let Ri=0;Ri<Te;Ri++)Ws&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,we.get(E).__webglTexture,k,Oe+Ri),E.isDepthTexture?(dt&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,we.get(O).__webglTexture,k,ct+Ri),z.blitFramebuffer(Ae,Ue,ae,pe,Ce,Ze,ae,pe,z.DEPTH_BUFFER_BIT,z.NEAREST)):dt?z.copyTexSubImage3D(Re,k,Ce,Ze,ct+Ri,Ae,Ue,ae,pe):z.copyTexSubImage2D(Re,k,Ce,Ze,ct+Ri,Ae,Ue,ae,pe);Pe.bindFramebuffer(z.READ_FRAMEBUFFER,null),Pe.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else dt?E.isDataTexture||E.isData3DTexture?z.texSubImage3D(Re,k,Ce,Ze,ct,ae,pe,Te,en,Je,ht.data):O.isCompressedArrayTexture?z.compressedTexSubImage3D(Re,k,Ce,Ze,ct,ae,pe,Te,en,ht.data):z.texSubImage3D(Re,k,Ce,Ze,ct,ae,pe,Te,en,Je,ht):E.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,k,Ce,Ze,ae,pe,en,Je,ht.data):E.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,k,Ce,Ze,ht.width,ht.height,en,ht.data):z.texSubImage2D(z.TEXTURE_2D,k,Ce,Ze,ae,pe,en,Je,ht);z.pixelStorei(z.UNPACK_ROW_LENGTH,ii),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Qe),z.pixelStorei(z.UNPACK_SKIP_PIXELS,bn),z.pixelStorei(z.UNPACK_SKIP_ROWS,Or),z.pixelStorei(z.UNPACK_SKIP_IMAGES,un),k===0&&O.generateMipmaps&&z.generateMipmap(Re),Pe.unbindTexture()},this.copyTextureToTexture3D=function(E,O,W=null,j=null,k=0){return E.isTexture!==!0&&(ho("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,j=arguments[1]||null,E=arguments[2],O=arguments[3],k=arguments[4]||0),ho('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,O,W,j,k)},this.initRenderTarget=function(E){we.get(E).__webglFramebuffer===void 0&&R.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?R.setTextureCube(E,0):E.isData3DTexture?R.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?R.setTexture2DArray(E,0):R.setTexture2D(E,0),Pe.unbindTexture()},this.resetState=function(){C=0,A=0,L=null,Pe.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=qe._getDrawingBufferColorSpace(e),n.unpackColorSpace=qe._getUnpackColorSpace()}}class nf{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ne(e),this.density=n}clone(){return new nf(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ov extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class kv extends Fr{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const kl=new N,zl=new N,Am=new at,so=new Qo,Ha=new Jo,lu=new N,Cm=new N;class T1 extends Pt{constructor(e=new Qt,n=new kv){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)kl.fromBufferAttribute(n,r-1),zl.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=kl.distanceTo(zl);e.setAttribute("lineDistance",new xt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ha.copy(i.boundingSphere),Ha.applyMatrix4(r),Ha.radius+=s,e.ray.intersectsSphere(Ha)===!1)return;Am.copy(r).invert(),so.copy(e.ray).applyMatrix4(Am);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=p,m=g-1;v<m;v+=c){const u=h.getX(v),_=h.getX(v+1),x=Va(this,e,so,l,u,_);x&&n.push(x)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(p),u=Va(this,e,so,l,v,m);u&&n.push(u)}}else{const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let v=p,m=g-1;v<m;v+=c){const u=Va(this,e,so,l,v,v+1);u&&n.push(u)}if(this.isLineLoop){const v=Va(this,e,so,l,g-1,p);v&&n.push(v)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Va(t,e,n,i,r,s){const o=t.geometry.attributes.position;if(kl.fromBufferAttribute(o,r),zl.fromBufferAttribute(o,s),n.distanceSqToSegment(kl,zl,lu,Cm)>i)return;lu.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(lu);if(!(l<e.near||l>e.far))return{distance:l,point:Cm.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const Rm=new N,Pm=new N;class A1 extends T1{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)Rm.fromBufferAttribute(n,r),Pm.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Rm.distanceTo(Pm);e.setAttribute("lineDistance",new xt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class zv extends Fr{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const bm=new at,Kh=new Qo,Ga=new Jo,Wa=new N;class C1 extends Pt{constructor(e=new Qt,n=new zv){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ga.copy(i.boundingSphere),Ga.applyMatrix4(r),Ga.radius+=s,e.ray.intersectsSphere(Ga)===!1)return;bm.copy(r).invert(),Kh.copy(e.ray).applyMatrix4(bm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){const f=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=f,v=p;g<v;g++){const m=c.getX(g);Wa.fromBufferAttribute(d,m),Lm(Wa,m,l,r,e,n,this)}}else{const f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let g=f,v=p;g<v;g++)Wa.fromBufferAttribute(d,g),Lm(Wa,g,l,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Lm(t,e,n,i,r,s,o){const a=Kh.distanceSqToPoint(t);if(a<n){const l=new N;Kh.closestPointToPoint(t,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class ti{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const h=i[r],f=i[r+1]-h,p=(o-h)/f;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new de:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n){const i=new N,r=[],s=[],o=[],a=new N,l=new at;for(let p=0;p<=e;p++){const g=p/e;r[p]=this.getTangentAt(g,new N)}s[0]=new N,o[0]=new N;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),d=Math.abs(r[0].y),f=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(It(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(It(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],p*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class rf extends ti{constructor(e=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,n=new de){const i=n,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*h-p*d+this.aX,c=f*d+p*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class R1 extends rf{constructor(e,n,i,r,s,o){super(e,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function sf(){let t=0,e=0,n=0,i=0;function r(s,o,a,l){t=s,e=a,n=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,d){let f=(o-s)/c-(a-s)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+d)+(l-a)/d;f*=h,p*=h,r(o,a,f,p)},calc:function(s){const o=s*s,a=o*s;return t+e*s+n*o+i*a}}}const ja=new N,cu=new sf,uu=new sf,hu=new sf;class P1 extends ti{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new N){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=r[(a-1)%s]:(ja.subVectors(r[0],r[1]).add(r[0]),c=ja);const d=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(ja.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=ja),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),p),v=Math.pow(d.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(h),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),cu.initNonuniformCatmullRom(c.x,d.x,f.x,h.x,g,v,m),uu.initNonuniformCatmullRom(c.y,d.y,f.y,h.y,g,v,m),hu.initNonuniformCatmullRom(c.z,d.z,f.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(cu.initCatmullRom(c.x,d.x,f.x,h.x,this.tension),uu.initCatmullRom(c.y,d.y,f.y,h.y,this.tension),hu.initCatmullRom(c.z,d.z,f.z,h.z,this.tension));return i.set(cu.calc(l),uu.calc(l),hu.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new N().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Dm(t,e,n,i,r){const s=(i-e)*.5,o=(r-n)*.5,a=t*t,l=t*a;return(2*n-2*i+s+o)*l+(-3*n+3*i-2*s-o)*a+s*t+n}function b1(t,e){const n=1-t;return n*n*e}function L1(t,e){return 2*(1-t)*t*e}function D1(t,e){return t*t*e}function Eo(t,e,n,i){return b1(t,e)+L1(t,n)+D1(t,i)}function N1(t,e){const n=1-t;return n*n*n*e}function I1(t,e){const n=1-t;return 3*n*n*t*e}function U1(t,e){return 3*(1-t)*t*t*e}function F1(t,e){return t*t*t*e}function wo(t,e,n,i,r){return N1(t,e)+I1(t,n)+U1(t,i)+F1(t,r)}class Bv extends ti{constructor(e=new de,n=new de,i=new de,r=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new de){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(wo(e,r.x,s.x,o.x,a.x),wo(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class O1 extends ti{constructor(e=new N,n=new N,i=new N,r=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new N){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(wo(e,r.x,s.x,o.x,a.x),wo(e,r.y,s.y,o.y,a.y),wo(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Hv extends ti{constructor(e=new de,n=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new de){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new de){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class k1 extends ti{constructor(e=new N,n=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new N){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new N){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vv extends ti{constructor(e=new de,n=new de,i=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new de){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Eo(e,r.x,s.x,o.x),Eo(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class z1 extends ti{constructor(e=new N,n=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new N){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Eo(e,r.x,s.x,o.x),Eo(e,r.y,s.y,o.y),Eo(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Gv extends ti{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new de){const i=n,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],h=r[o>r.length-2?r.length-1:o+1],d=r[o>r.length-3?r.length-1:o+2];return i.set(Dm(a,l.x,c.x,h.x,d.x),Dm(a,l.y,c.y,h.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new de().fromArray(r))}return this}}var Nm=Object.freeze({__proto__:null,ArcCurve:R1,CatmullRomCurve3:P1,CubicBezierCurve:Bv,CubicBezierCurve3:O1,EllipseCurve:rf,LineCurve:Hv,LineCurve3:k1,QuadraticBezierCurve:Vv,QuadraticBezierCurve3:z1,SplineCurve:Gv});class B1 extends ti{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Nm[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(n.push(h),i=h)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new Nm[r.type]().fromJSON(r))}return this}}class H1 extends B1{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new Hv(this.currentPoint.clone(),new de(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){const s=new Vv(this.currentPoint.clone(),new de(e,n),new de(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,o){const a=new Bv(this.currentPoint.clone(),new de(e,n),new de(i,r),new de(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new Gv(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,n+l,i,r,s,o),this}absarc(e,n,i,r,s,o){return this.absellipse(e,n,i,i,r,s,o),this}ellipse(e,n,i,r,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,n+h,i,r,s,o,a,l),this}absellipse(e,n,i,r,s,o,a,l){const c=new rf(e,n,i,r,s,o,a,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class of extends Qt{constructor(e=[new de(0,-.5),new de(.5,0),new de(0,.5)],n=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:n,phiStart:i,phiLength:r},n=Math.floor(n),r=It(r,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],h=1/n,d=new N,f=new de,p=new N,g=new N,v=new N;let m=0,u=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:m=e[_+1].x-e[_].x,u=e[_+1].y-e[_].y,p.x=u*1,p.y=-m,p.z=u*0,v.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:m=e[_+1].x-e[_].x,u=e[_+1].y-e[_].y,p.x=u*1,p.y=-m,p.z=u*0,g.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),l.push(p.x,p.y,p.z),v.copy(g)}for(let _=0;_<=n;_++){const x=i+_*h*r,y=Math.sin(x),b=Math.cos(x);for(let C=0;C<=e.length-1;C++){d.x=e[C].x*y,d.y=e[C].y,d.z=e[C].x*b,o.push(d.x,d.y,d.z),f.x=_/n,f.y=C/(e.length-1),a.push(f.x,f.y);const A=l[3*C+0]*y,L=l[3*C+1],w=l[3*C+0]*b;c.push(A,L,w)}}for(let _=0;_<n;_++)for(let x=0;x<e.length-1;x++){const y=x+_*e.length,b=y,C=y+e.length,A=y+e.length+1,L=y+1;s.push(b,C,L),s.push(A,L,C)}this.setIndex(s),this.setAttribute("position",new xt(o,3)),this.setAttribute("uv",new xt(a,2)),this.setAttribute("normal",new xt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new of(e.points,e.segments,e.phiStart,e.phiLength)}}class af extends of{constructor(e=1,n=1,i=4,r=8){const s=new H1;s.absarc(0,-n/2,e,Math.PI*1.5,0),s.absarc(0,n/2,e,0,Math.PI*.5),super(s.getPoints(i),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:n,capSegments:i,radialSegments:r}}static fromJSON(e){return new af(e.radius,e.length,e.capSegments,e.radialSegments)}}class To extends Qt{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],d=[],f=[],p=[];let g=0;const v=[],m=i/2;let u=0;_(),o===!1&&(e>0&&x(!0),n>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new xt(d,3)),this.setAttribute("normal",new xt(f,3)),this.setAttribute("uv",new xt(p,2));function _(){const y=new N,b=new N;let C=0;const A=(n-e)/i;for(let L=0;L<=s;L++){const w=[],S=L/s,D=S*(n-e)+e;for(let F=0;F<=r;F++){const V=F/r,K=V*l+a,$=Math.sin(K),q=Math.cos(K);b.x=D*$,b.y=-S*i+m,b.z=D*q,d.push(b.x,b.y,b.z),y.set($,A,q).normalize(),f.push(y.x,y.y,y.z),p.push(V,1-S),w.push(g++)}v.push(w)}for(let L=0;L<r;L++)for(let w=0;w<s;w++){const S=v[w][L],D=v[w+1][L],F=v[w+1][L+1],V=v[w][L+1];(e>0||w!==0)&&(h.push(S,D,V),C+=3),(n>0||w!==s-1)&&(h.push(D,F,V),C+=3)}c.addGroup(u,C,0),u+=C}function x(y){const b=g,C=new de,A=new N;let L=0;const w=y===!0?e:n,S=y===!0?1:-1;for(let F=1;F<=r;F++)d.push(0,m*S,0),f.push(0,S,0),p.push(.5,.5),g++;const D=g;for(let F=0;F<=r;F++){const K=F/r*l+a,$=Math.cos(K),q=Math.sin(K);A.x=w*q,A.y=m*S,A.z=w*$,d.push(A.x,A.y,A.z),f.push(0,S,0),C.x=$*.5+.5,C.y=q*.5*S+.5,p.push(C.x,C.y),g++}for(let F=0;F<r;F++){const V=b+F,K=D+F;y===!0?h.push(K,K+1,V):h.push(K+1,K,V),L+=3}c.addGroup(u,L,y===!0?1:2),u+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new To(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class lf extends Qt{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new N,f=new N,p=[],g=[],v=[],m=[];for(let u=0;u<=i;u++){const _=[],x=u/i;let y=0;u===0&&o===0?y=.5/n:u===i&&l===Math.PI&&(y=-.5/n);for(let b=0;b<=n;b++){const C=b/n;d.x=-e*Math.cos(r+C*s)*Math.sin(o+x*a),d.y=e*Math.cos(o+x*a),d.z=e*Math.sin(r+C*s)*Math.sin(o+x*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),v.push(f.x,f.y,f.z),m.push(C+y,1-x),_.push(c++)}h.push(_)}for(let u=0;u<i;u++)for(let _=0;_<n;_++){const x=h[u][_+1],y=h[u][_],b=h[u+1][_],C=h[u+1][_+1];(u!==0||o>0)&&p.push(x,y,C),(u!==i-1||l<Math.PI)&&p.push(y,b,C)}this.setIndex(p),this.setAttribute("position",new xt(g,3)),this.setAttribute("normal",new xt(v,3)),this.setAttribute("uv",new xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lf(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class cf extends Qt{constructor(e=1,n=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],h=new N,d=new N,f=new N;for(let p=0;p<=i;p++)for(let g=0;g<=r;g++){const v=g/r*s,m=p/i*Math.PI*2;d.x=(e+n*Math.cos(m))*Math.cos(v),d.y=(e+n*Math.cos(m))*Math.sin(v),d.z=n*Math.sin(m),a.push(d.x,d.y,d.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),f.subVectors(d,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/r),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=r;g++){const v=(r+1)*p+g-1,m=(r+1)*(p-1)+g-1,u=(r+1)*(p-1)+g,_=(r+1)*p+g;o.push(v,m,_),o.push(m,u,_)}this.setIndex(o),this.setAttribute("position",new xt(a,3)),this.setAttribute("normal",new xt(l,3)),this.setAttribute("uv",new xt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cf(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ms extends Fr{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xv,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class uf extends Pt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class V1 extends uf{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const du=new at,Im=new N,Um=new N;class Wv{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ef,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Im.setFromMatrixPosition(e.matrixWorld),n.position.copy(Im),Um.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Um),n.updateMatrixWorld(),du.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(du),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(du)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Fm=new at,oo=new N,fu=new N;class G1 extends Wv{constructor(){super(new mn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new de(4,2),this._viewportCount=6,this._viewports=[new st(2,1,1,1),new st(0,1,1,1),new st(3,1,1,1),new st(1,1,1,1),new st(3,0,1,1),new st(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),oo.setFromMatrixPosition(e.matrixWorld),i.position.copy(oo),fu.copy(i.position),fu.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(fu),i.updateMatrixWorld(),r.makeTranslation(-oo.x,-oo.y,-oo.z),Fm.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fm)}}class jv extends uf{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new G1}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class W1 extends Wv{constructor(){super(new Lv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Om extends uf{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new W1}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class j1{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=km(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=km();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function km(){return performance.now()}const zm=new at;class X1{constructor(e,n,i=0,r=1/0){this.ray=new Qo(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Qd,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return zm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zm),this}intersectObject(e,n=!0,i=[]){return Zh(e,this,i,n),i.sort(Bm),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Zh(e[r],this,i,n);return i.sort(Bm),i}}function Bm(t,e){return t.distance-e.distance}function Zh(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let o=0,a=s.length;o<a;o++)Zh(s[o],e,n,!0)}}class Hm{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(It(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Y1 extends A1{constructor(e=10,n=10,i=4473924,r=8947848){i=new Ne(i),r=new Ne(r);const s=n/2,o=e/n,a=e/2,l=[],c=[];for(let f=0,p=0,g=-a;f<=n;f++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const v=f===s?i:r;v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3}const h=new Qt;h.setAttribute("position",new xt(l,3)),h.setAttribute("color",new xt(c,3));const d=new kv({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class $1 extends Ur{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xd);const Vm={type:"change"},hf={type:"start"},Xv={type:"end"},Xa=new Qo,Gm=new di,q1=Math.cos(70*hS.DEG2RAD),At=new N,nn=2*Math.PI,rt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},pu=1e-6;class K1 extends $1{constructor(e,n=null){super(e,n),this.state=rt.NONE,this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ms.ROTATE,MIDDLE:Ms.DOLLY,RIGHT:Ms.PAN},this.touches={ONE:fs.ROTATE,TWO:fs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Dr,this._lastTargetPosition=new N,this._quat=new Dr().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Hm,this._sphericalDelta=new Hm,this._scale=1,this._panOffset=new N,this._rotateStart=new de,this._rotateEnd=new de,this._rotateDelta=new de,this._panStart=new de,this._panEnd=new de,this._panDelta=new de,this._dollyStart=new de,this._dollyEnd=new de,this._dollyDelta=new de,this._dollyDirection=new N,this._mouse=new de,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=J1.bind(this),this._onPointerDown=Z1.bind(this),this._onPointerUp=Q1.bind(this),this._onContextMenu=oA.bind(this),this._onMouseWheel=nA.bind(this),this._onKeyDown=iA.bind(this),this._onTouchStart=rA.bind(this),this._onTouchMove=sA.bind(this),this._onMouseDown=eA.bind(this),this._onMouseMove=tA.bind(this),this._interceptControlDown=aA.bind(this),this._interceptControlUp=lA.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Vm),this.update(),this.state=rt.NONE}update(e=null){const n=this.object.position;At.copy(n).sub(this.target),At.applyQuaternion(this._quat),this._spherical.setFromVector3(At),this.autoRotate&&this.state===rt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=nn:i>Math.PI&&(i-=nn),r<-Math.PI?r+=nn:r>Math.PI&&(r-=nn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(At.setFromSpherical(this._spherical),At.applyQuaternion(this._quatInverse),n.copy(this.target).add(At),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=At.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=At.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Xa.origin.copy(this.object.position),Xa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Xa.direction))<q1?this.object.lookAt(this.target):(Gm.setFromNormalAndCoplanarPoint(this.object.up,this.target),Xa.intersectPlane(Gm,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>pu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>pu||this._lastTargetPosition.distanceToSquared(this.target)>pu?(this.dispatchEvent(Vm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?nn/60*this.autoRotateSpeed*e:nn/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){At.setFromMatrixColumn(n,0),At.multiplyScalar(-e),this._panOffset.add(At)}_panUp(e,n){this.screenSpacePanning===!0?At.setFromMatrixColumn(n,1):(At.setFromMatrixColumn(n,0),At.crossVectors(this.object.up,At)),At.multiplyScalar(e),this._panOffset.add(At)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;At.copy(r).sub(this.target);let s=At.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(nn*this._rotateDelta.x/n.clientHeight),this._rotateUp(nn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(nn*this._rotateDelta.x/n.clientHeight),this._rotateUp(nn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+n.x)*.5,a=(e.pageY+n.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new de,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Z1(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t)))}function J1(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function Q1(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Xv),this.state=rt.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function eA(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ms.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=rt.DOLLY;break;case Ms.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=rt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=rt.ROTATE}break;case Ms.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=rt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=rt.PAN}break;default:this.state=rt.NONE}this.state!==rt.NONE&&this.dispatchEvent(hf)}function tA(t){switch(this.state){case rt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case rt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case rt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function nA(t){this.enabled===!1||this.enableZoom===!1||this.state!==rt.NONE||(t.preventDefault(),this.dispatchEvent(hf),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(Xv))}function iA(t){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(t)}function rA(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case fs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=rt.TOUCH_ROTATE;break;case fs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=rt.TOUCH_PAN;break;default:this.state=rt.NONE}break;case 2:switch(this.touches.TWO){case fs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=rt.TOUCH_DOLLY_PAN;break;case fs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=rt.TOUCH_DOLLY_ROTATE;break;default:this.state=rt.NONE}break;default:this.state=rt.NONE}this.state!==rt.NONE&&this.dispatchEvent(hf)}function sA(t){switch(this._trackPointer(t),this.state){case rt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case rt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case rt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case rt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=rt.NONE}}function oA(t){this.enabled!==!1&&t.preventDefault()}function aA(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function lA(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class cA extends Ov{constructor(){super();const e=new nr;e.deleteAttribute("uv");const n=new ms({side:Kt}),i=new ms,r=new jv(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new it(e,n);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const o=new it(e,i);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new it(e,i);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const l=new it(e,i);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const c=new it(e,i);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);const h=new it(e,i);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const d=new it(e,i);d.position.set(-2.193,-.369,-5.547),d.rotation.set(0,.516,0),d.scale.set(3.875,3.487,2.986),this.add(d);const f=new it(e,Qr(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);const p=new it(e,Qr(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);const g=new it(e,Qr(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const v=new it(e,Qr(43));v.position.set(-.462,8.89,14.52),v.scale.set(4.38,5.441,.088),this.add(v);const m=new it(e,Qr(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const u=new it(e,Qr(100));u.position.set(0,20,0),u.scale.set(1,.1,1),this.add(u)}dispose(){const e=new Set;this.traverse(n=>{n.isMesh&&(e.add(n.geometry),e.add(n.material))});for(const n of e)n.dispose()}}function Qr(t){const e=new rc;return e.color.setScalar(t),e}const es=new Ne("#3ee0c5");class uA{constructor(e){Ge(this,"renderer");Ge(this,"scene",new Ov);Ge(this,"camera");Ge(this,"controls");Ge(this,"simRoot",new qn);Ge(this,"bodies",new Map);Ge(this,"linkNodes",new Map);Ge(this,"selected",null);Ge(this,"follow",!1);Ge(this,"debug",!1);Ge(this,"actorId",null);Ge(this,"fps",0);Ge(this,"simTime",0);Ge(this,"frames",0);Ge(this,"lastFps",performance.now());Ge(this,"ring",null);Ge(this,"gizmo");Ge(this,"ray",new X1);Ge(this,"mouse",new de);Ge(this,"dragging",!1);Ge(this,"dragId",null);Ge(this,"plane",new di(new N(0,1,0),0));Ge(this,"onEdit");Ge(this,"onSelect");Ge(this,"contacts",new qn);Ge(this,"traj",new qn);Ge(this,"clock",new j1);Ge(this,"disposed",!1);Ge(this,"_loop",()=>{if(this.disposed)return;requestAnimationFrame(this._loop);const e=this.clock.getElapsedTime();if(this.ring){const i=this.ring.material;i.emissiveIntensity=.7+.35*Math.sin(e*2.2)}this.controls.update(),this.renderer.render(this.scene,this.camera),this.frames+=1;const n=performance.now();n-this.lastFps>500&&(this.fps=Math.round(this.frames*1e3/(n-this.lastFps)),this.frames=0,this.lastFps=n)});Ge(this,"_onDown",e=>{var i;const n=this._pick(e);this.select(n),(i=this.onSelect)==null||i.call(this,n),n!=null&&e.shiftKey&&(this.dragging=!0,this.dragId=n,this.controls.enabled=!1)});Ge(this,"_onMove",e=>{if(!this.dragging||this.dragId==null)return;this._ndc(e),this.ray.setFromCamera(this.mouse,this.camera);const n=new N;if(this.ray.ray.intersectPlane(this.plane,n)){const i=this.simRoot.worldToLocal(n.clone()),r=this.linkNodes.get(`${this.dragId}:-1`);r&&(r.position.x=i.x,r.position.y=i.y,this._placeGizmo())}});Ge(this,"_onUp",()=>{var e;if(this.dragging&&this.dragId!=null){const n=this.linkNodes.get(`${this.dragId}:-1`);n&&((e=this.onEdit)==null||e.call(this,this.dragId,[n.position.x,n.position.y,n.position.z]))}this.dragging=!1,this.dragId=null,this.controls.enabled=!0});this.renderer=new w1({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.setSize(e.clientWidth,e.clientHeight,!1),this.renderer.outputColorSpace=pn,this.renderer.toneMapping=av,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=sv,this.camera=new mn(42,1,.05,80),this.camera.position.set(2.7,1.85,2.55),this.controls=new K1(this.camera,e),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.target.set(0,.18,0),this.controls.maxPolarAngle=Math.PI*.49,this.controls.minDistance=.6,this.controls.maxDistance=14,this.scene.background=new Ne("#07090d"),this.scene.fog=new nf("#07090d",.045);const n=new cA,i=new $h(this.renderer);this.scene.environment=i.fromScene(n,.04).texture,n.dispose(),this.simRoot.rotation.x=-Math.PI/2,this.scene.add(this.simRoot),this._lights(),this._arena(),this._dust(),this.gizmo=new qn,this.gizmo.visible=!1,this.simRoot.add(this.gizmo),this._makeGizmo(),this.simRoot.add(this.contacts),this.simRoot.add(this.traj),e.addEventListener("pointerdown",this._onDown),e.addEventListener("pointermove",this._onMove),e.addEventListener("pointerup",this._onUp),this._loop()}setHandlers(e){this.onEdit=e.onEdit,this.onSelect=e.onSelect}resize(e,n){e<2||n<2||(this.camera.aspect=e/n,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,n,!1))}setStatus(e){if(!this.ring)return;const n=this.ring.material;e==="experimenting"||e==="thinking"?(n.emissive=new Ne("#f0a05a"),n.color=new Ne("#f0a05a")):e==="idle"&&(n.emissive=es.clone(),n.color=es.clone())}setScene(e,n,i){var r;this.actorId=n;for(const[s,o]of this.bodies)this.simRoot.remove(o),o.traverse(a=>{a.geometry&&a.geometry.dispose()});this.bodies.clear(),this.linkNodes.clear();for(const s of e){if(s.assetId==="arena"||(r=s.tags)!=null&&r.includes("arena"))continue;const o=this._buildBody(s);this.bodies.set(s.id,o),this.simRoot.add(o)}}applyPoses(e){this.simTime=e.t;for(const n of e.bodies){const i=`${n.id}:-1`,r=this.linkNodes.get(i);r&&(r.position.set(n.p[0],n.p[1],n.p[2]),r.quaternion.set(n.q[0],n.q[1],n.q[2],n.q[3]));for(const s of n.links||[]){const o=this.linkNodes.get(`${n.id}:${s.i}`);o&&(o.position.set(s.p[0],s.p[1],s.p[2]),o.quaternion.set(s.q[0],s.q[1],s.q[2],s.q[3]))}}if(this.selected!=null&&this._placeGizmo(),this.follow&&this.actorId!=null){const n=this.linkNodes.get(`${this.actorId}:-1`);if(n){const i=new N;n.getWorldPosition(i),this.controls.target.lerp(i,.08)}}}select(e){this.selected=e,this.gizmo.visible=e!=null,this._placeGizmo()}setCamera(e){this.follow=e==="follow";const n={iso:[2.7,1.85,2.55],front:[3.4,.9,.15],top:[.1,5.4,.1],side:[.2,1.1,3.4]}[e];n&&(this.camera.position.set(n[0],n[1],n[2]),this.controls.target.set(0,.15,0))}dispose(){this.disposed=!0,this.renderer.dispose()}_lights(){const e=new V1("#c9d6ff","#1a1510",.55);this.scene.add(e);const n=new Om("#fff4e8",2.1);n.position.set(-2.4,6.2,3.4),n.castShadow=!0,n.shadow.mapSize.set(2048,2048),n.shadow.camera.near=.5,n.shadow.camera.far=18,n.shadow.camera.left=-4,n.shadow.camera.right=4,n.shadow.camera.top=4,n.shadow.camera.bottom=-4,n.shadow.bias=-25e-5,this.scene.add(n);const i=new Om("#6a8cff",.35);i.position.set(4,2,-3),this.scene.add(i);const r=new jv("#3ee0c5",.6,8);r.position.set(0,1.4,0),this.scene.add(r)}_arena(){const e=new it(new To(2.58,2.58,.08,48),new ms({color:"#12151c",metalness:.18,roughness:.86}));e.receiveShadow=!0,e.position.y=-.04,this.scene.add(e);const n=new cf(2.32,.012,10,96),i=new ms({color:es,emissive:es,emissiveIntensity:.9,metalness:.4,roughness:.3}),r=new it(n,i);r.rotation.x=Math.PI/2,r.position.y=.005,this.scene.add(r),this.ring=r;const s=this._grid();this.simRoot.add(s);const o=new Y1(4.4,22,1975859,1317154);o.position.z=.002,o.rotation.x=Math.PI/2,o.material.transparent=!0,o.material.opacity=.35,this.simRoot.add(o)}_grid(){const e=new ea(5,5,1,1),n=new Ti({transparent:!0,depthWrite:!1,uniforms:{uColor:{value:new Ne("#3ee0c5")}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,fragmentShader:`
        varying vec2 vUv;
        uniform vec3 uColor;
        void main() {
          vec2 p = (vUv - 0.5) * 5.0;
          float d = length(p);
          float fade = 1.0 - smoothstep(1.6, 2.35, d);
          vec2 g = abs(fract(p) - 0.5);
          float line = 1.0 - smoothstep(0.02, 0.04, min(g.x, g.y));
          vec2 g2 = abs(fract(p * 0.5) - 0.5);
          float major = 1.0 - smoothstep(0.015, 0.03, min(g2.x, g2.y));
          float a = (line * 0.12 + major * 0.22) * fade;
          gl_FragColor = vec4(uColor, a);
        }
      `}),i=new it(e,n);return i.position.z=.003,i}_dust(){const n=new Float32Array(540);for(let s=0;s<180;s++)n[s*3]=(Math.random()-.5)*6,n[s*3+1]=Math.random()*2.2,n[s*3+2]=(Math.random()-.5)*6;const i=new Qt;i.setAttribute("position",new Gn(n,3));const r=new C1(i,new zv({color:"#6a7388",size:.012,transparent:!0,opacity:.35}));this.scene.add(r)}_buildBody(e){const n=new qn;n.userData.bodyId=e.id;for(const i of e.links){const r=new qn;r.userData.bodyId=e.id,r.userData.link=i.index;for(const s of i.geoms){const o=this._geomMesh(s);o.userData.bodyId=e.id,r.add(o)}if(i.index===-1&&e.category==="robots"){const s=new it(new nr(.08,.012,.012),new ms({color:es,emissive:es,emissiveIntensity:1.2}));s.position.set(e.assetId==="hauler"?.16:.14,0,.03),r.add(s)}this.linkNodes.set(`${e.id}:${i.index}`,r),n.add(r)}return n}_geomMesh(e){let n;const i=e.size;e.type==="sphere"?n=new lf(i[0],24,16):e.type==="cylinder"?(n=new To(i[0],i[0],i[1],22),n.rotateX(Math.PI/2)):e.type==="capsule"?(n=new af(i[0],i[1],6,12),n.rotateX(Math.PI/2)):n=new nr(i[0]*2,i[1]*2,i[2]*2);const r=new Ne().fromArray(e.color),s=new ms({color:r,metalness:e.metalness??.45,roughness:e.roughness??.42,emissive:e.emissive?new Ne().fromArray(e.emissive):new Ne(0),emissiveIntensity:e.emissive?.8:0}),o=new it(n,s);o.castShadow=!0,o.receiveShadow=!0;const a=e.localPos||[0,0,0];o.position.set(a[0],a[1],a[2]);const l=e.localOrn||[0,0,0,1];return o.quaternion.set(l[0],l[1],l[2],l[3]),o}_makeGizmo(){const e=(n,i)=>{const r=new it(new To(.01,.01,.36,8),new rc({color:i}));return r.quaternion.setFromUnitVectors(new N(0,1,0),n),r.position.copy(n.clone().multiplyScalar(.18)),r};this.gizmo.add(e(new N(1,0,0),16739194)),this.gizmo.add(e(new N(0,1,0),6217888)),this.gizmo.add(e(new N(0,0,1),6990079))}_placeGizmo(){if(this.selected==null)return;const e=this.linkNodes.get(`${this.selected}:-1`);e&&(this.gizmo.position.copy(e.position),this.gizmo.visible=!0)}_ndc(e){const n=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(e.clientX-n.left)/n.width*2-1,this.mouse.y=-((e.clientY-n.top)/n.height)*2+1}_pick(e){this._ndc(e),this.ray.setFromCamera(this.mouse,this.camera);const n=[];this.linkNodes.forEach(r=>n.push(r));const i=this.ray.intersectObjects(n,!0);for(const r of i){let s=r.object;for(;s;){if(typeof s.userData.bodyId=="number")return s.userData.bodyId;s=s.parent}}return null}}function hA({open:t,onClose:e,hub:n,download:i,onRefresh:r}){var ee;const[s,o]=Ee.useState("cloud"),[a,l]=Ee.useState({}),[c,h]=Ee.useState(null),[d,f]=Ee.useState(null),[p,g]=Ee.useState({}),[v,m]=Ee.useState({}),[u,_]=Ee.useState("");Ee.useEffect(()=>{if(!n)return;const T={};for(const B of n.providers)T[B.id]={key:B.has_key?B.key_hint:"",model:B.model,base_url:B.base_url};l(T)},[n]);const x=!!((ee=n==null?void 0:n.providers.find(T=>T.id==="openrouter"))!=null&&ee.has_key);if(Ee.useEffect(()=>{t&&x&&C("openrouter")},[t,x]),!t)return null;const y=n,b=T=>{f(T),setTimeout(()=>f(null),4200)},C=async T=>{h("models-"+T);try{const X=await(await fetch(`/api/llm/models?provider_id=${encodeURIComponent(T)}&free_only=true`)).json();g(ie=>({...ie,[T]:X.models||[]})),!X.ok&&X.error?m(ie=>({...ie,[T]:X.error})):m(ie=>({...ie,[T]:""})),b(X.ok?`${X.count||(X.models||[]).length} free models`:X.error||"catalog fallback")}catch(B){b(String(B))}finally{h(null)}},A=async(T,B)=>{const X=a[T.id]||{key:"",model:T.model,base_url:T.base_url};h(T.id);try{const ie=await fetch("/api/llm/keys",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({provider_id:T.id,api_key:X.key,model:X.model,base_url:X.base_url,activate:B})}),ye=await ie.json();if(!ie.ok)throw new Error(ye.detail||"save failed");r(ye),b(B?`Using ${T.name} · ${X.model}`:`Saved ${T.name} key`),T.id==="openrouter"&&C("openrouter")}catch(ie){b(String(ie))}finally{h(null)}},L=async(T,B)=>{h(T);try{const X=await fetch("/api/llm/activate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({provider_id:T,model:B})}),ie=await X.json();if(!X.ok)throw new Error(ie.detail||"activate failed");r(ie),b("Active model updated")}catch(X){b(String(X))}finally{h(null)}},w=async T=>{h("test-"+T);try{const X=await(await fetch("/api/llm/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({provider_id:T})})).json();b(X.ok?`Live: ${X.model} → ${X.sample||"pong"}`:X.error||"no response")}catch(B){b(String(B))}finally{h(null)}},S=async T=>{const B=await fetch(`/api/llm/keys/${T}`,{method:"DELETE"});r(await B.json()),b("Key removed from this machine")},D=async T=>{h("dl-"+T);try{const B=await fetch("/api/llm/download",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model_id:T})}),X=await B.json();if(!B.ok)throw new Error(X.detail||"download failed");b("Downloading into the local vault…")}catch(B){b(String(B))}finally{h(null)}},F=()=>fetch("/api/llm/download/cancel",{method:"POST"}),V=async T=>{const B=await fetch(`/api/llm/local/${T}`,{method:"DELETE"});r(await B.json())},K=(y==null?void 0:y.active_provider)||"builtin",$=i||(y==null?void 0:y.download),q=[...(y==null?void 0:y.providers)||[]].sort((T,B)=>T.id==="openrouter"?-1:B.id==="openrouter"?1:0);return P.jsx("div",{className:"modal-scrim",onClick:e,children:P.jsxs("div",{className:"modal models-modal",onClick:T=>T.stopPropagation(),children:[P.jsxs("div",{className:"modal-head",children:[P.jsxs("div",{children:[P.jsx("div",{className:"kicker",children:"Model interface"}),P.jsx("h2",{children:"Connect a brain"})]}),P.jsx("button",{className:"icon-btn",onClick:e,children:"✕"})]}),P.jsxs("p",{className:"modal-lead",children:["Paste a key and click ",P.jsx("b",{children:"Use this model"}),". The lab sends your prompt plus a physics system prompt to that API — it will not silently fall back to the built-in gait script. Keys stay in ",P.jsx("span",{className:"mono",children:"data/secrets.json"}),"."]}),P.jsxs("div",{className:"tabs",children:[P.jsx("button",{className:`tab ${s==="cloud"?"on":""}`,onClick:()=>o("cloud"),children:"API keys"}),P.jsx("button",{className:`tab ${s==="local"?"on":""}`,onClick:()=>o("local"),children:"Local Qwen"})]}),s==="cloud"&&P.jsxs("div",{className:"model-list",children:[P.jsxs("button",{className:`provider-card ${K==="builtin"?"active":""}`,onClick:()=>L("builtin"),children:[P.jsxs("div",{className:"pc-top",children:[P.jsx("b",{children:"Built-in experimenter"}),K==="builtin"&&P.jsx("span",{className:"tag",children:"active"})]}),P.jsx("p",{children:"No key. Parameter search instead of a language model — the repetitive scripted loop."})]}),q.map(T=>{const B=a[T.id]||{key:"",model:T.model,base_url:T.base_url},X=K===T.id,ie=p[T.id]||(T.id==="openrouter"?T.models.map(G=>({id:G,name:G,free:!0,tools:!0})):[]),ye=u.toLowerCase(),He=ie.filter(G=>!ye||G.id.toLowerCase().includes(ye)||(G.name||"").toLowerCase().includes(ye));return P.jsxs("div",{className:`provider-card ${X?"active":""}`,children:[P.jsxs("div",{className:"pc-top",children:[P.jsx("b",{children:T.name}),X&&P.jsx("span",{className:"tag",children:"active"}),T.has_key&&P.jsx("span",{className:"tag",children:"key on disk"}),T.id==="openrouter"&&P.jsx("span",{className:"tag free",children:"free models"})]}),P.jsx("p",{children:T.blurb}),T.needs_key&&P.jsxs("label",{className:"field",children:[P.jsx("span",{children:"API key"}),P.jsx("input",{type:"password",autoComplete:"off",placeholder:T.has_key?T.key_hint:T.placeholder,value:B.key.includes("••••")?"":B.key,onChange:G=>l(re=>({...re,[T.id]:{...B,key:G.target.value}}))})]}),T.id==="openrouter"&&P.jsxs(P.Fragment,{children:[P.jsxs("div",{className:"pc-actions",style:{marginTop:8},children:[P.jsx("button",{className:"ghost",disabled:!!c,onClick:()=>C("openrouter"),children:c==="models-openrouter"?"Loading…":"Load free models"}),ie.length>0&&P.jsxs("span",{className:"dl-meta",children:[ie.length," free"]})]}),v.openrouter&&P.jsx("div",{className:"err",children:v.openrouter}),ie.length>0&&P.jsxs(P.Fragment,{children:[P.jsx("input",{className:"search",style:{margin:"8px 0 6px"},placeholder:"Filter free models…",value:u,onChange:G=>_(G.target.value)}),P.jsx("div",{className:"free-list",children:He.slice(0,80).map(G=>P.jsxs("button",{className:`free-opt ${B.model===G.id?"on":""}`,onClick:()=>l(re=>({...re,[T.id]:{...B,model:G.id}})),children:[P.jsx("span",{children:G.id}),P.jsxs("span",{className:"free-meta",children:[G.free&&P.jsx("i",{children:"free"}),G.tools&&P.jsx("i",{children:"tools"}),G.context?P.jsxs("i",{children:[Math.round(Number(G.context)/1024),"k"]}):null]})]},G.id))})]})]}),P.jsxs("div",{className:"field-row",children:[P.jsxs("label",{className:"field",children:[P.jsx("span",{children:"Model"}),P.jsx("input",{list:`models-${T.id}`,value:B.model,onChange:G=>l(re=>({...re,[T.id]:{...B,model:G.target.value}}))}),P.jsx("datalist",{id:`models-${T.id}`,children:(ie.length?ie.map(G=>G.id):T.models).map(G=>P.jsx("option",{value:G},G))})]}),P.jsxs("label",{className:"field",children:[P.jsx("span",{children:"Base URL"}),P.jsx("input",{value:B.base_url,onChange:G=>l(re=>({...re,[T.id]:{...B,base_url:G.target.value}}))})]})]}),P.jsxs("div",{className:"pc-actions",children:[P.jsx("button",{className:"ghost",disabled:c===T.id,onClick:()=>A(T,!0),children:"Save key"}),P.jsx("button",{className:"ghost",disabled:!!c,onClick:()=>w(T.id),children:"Test"}),P.jsx("button",{className:"primary",disabled:!!c,onClick:()=>A(T,!0),children:"Use this model"}),T.has_key&&P.jsx("button",{className:"ghost danger-text",onClick:()=>S(T.id),children:"Remove key"}),T.docs&&P.jsx("a",{className:"docs",href:T.docs,target:"_blank",rel:"noreferrer",children:"Get a key ↗"})]})]},T.id)})]}),s==="local"&&P.jsxs("div",{className:"model-list",children:[P.jsxs("div",{className:"vault-note",children:["Skip this tab if you have OpenRouter. HuggingFace often refuses TLS from this host, so Qwen GGUF downloads fail — that is expected. Use ",P.jsx("b",{children:"google/gemma-4-26b-a4b-it:free"})," on the API keys tab.",P.jsx("br",{}),"Vault · ",P.jsx("span",{className:"mono",children:y==null?void 0:y.vault}),P.jsx("br",{}),y!=null&&y.llama_cpp?"llama-cpp-python is available — a downloaded GGUF can run in-process.":"Even after a download, running Qwen needs llama-cpp-python. Prefer OpenRouter."]}),((y==null?void 0:y.local_models)||[]).map(T=>{const B=($==null?void 0:$.status)==="running"&&$.model_id===T.id,X=B?($==null?void 0:$.pct)||0:T.downloaded?100:0,ie=K==="local-gguf"&&(y==null?void 0:y.active_model)===T.id;return P.jsxs("div",{className:`provider-card ${ie?"active":""}`,children:[P.jsxs("div",{className:"pc-top",children:[P.jsx("b",{children:T.name}),ie&&P.jsx("span",{className:"tag",children:"active"}),T.downloaded&&P.jsx("span",{className:"tag",children:"in vault"})]}),P.jsx("p",{children:T.blurb}),P.jsxs("div",{className:"dl-meta",children:[T.size_mb," MB · ctx ",T.context,T.downloaded?` · ${(T.bytes/1048576).toFixed(0)} MB on disk`:""]}),(B||T.downloaded)&&P.jsx("div",{className:"dl-bar",children:P.jsx("i",{style:{width:`${Math.min(100,X)}%`}})}),B&&P.jsxs("div",{className:"dl-meta",children:[((($==null?void 0:$.received)||0)/1048576).toFixed(1)," / ",((($==null?void 0:$.total)||1)/1048576).toFixed(0)," MB"]}),($==null?void 0:$.status)==="error"&&$.model_id===T.id&&P.jsx("div",{className:"err",children:$.error}),P.jsxs("div",{className:"pc-actions",children:[!T.downloaded&&!B&&P.jsx("button",{className:"primary",disabled:!!c,onClick:()=>D(T.id),children:"Download to vault"}),B&&P.jsx("button",{className:"ghost",onClick:F,children:"Cancel"}),T.downloaded&&P.jsxs(P.Fragment,{children:[P.jsx("button",{className:"primary",disabled:!!c,onClick:()=>L("local-gguf",T.id),children:"Use local Qwen"}),P.jsx("button",{className:"ghost danger-text",onClick:()=>V(T.id),children:"Delete weights"})]})]})]},T.id)})]}),d&&P.jsx("div",{className:"toast",children:d})]})})}const dA=[{n:100,label:"100",hint:"interactive"},{n:1e3,label:"1k",hint:"research"},{n:1e4,label:"10k",hint:"overnight-ish"},{n:1e5,label:"100k",hint:"shard + resume"},{n:1e6,label:"1M",hint:"queued shards"}];function fA({open:t,onClose:e,campaign:n}){const[i,r]=Ee.useState([]),[s,o]=Ee.useState([]),[a,l]=Ee.useState("gait_search"),[c,h]=Ee.useState("pulse"),[d,f]=Ee.useState(1e3),[p,g]=Ee.useState(1),[v,m]=Ee.useState(240),[u,_]=Ee.useState(!1),[x,y]=Ee.useState(null),b=i.find(F=>F.id===a),C=()=>{fetch("/api/research/usecases").then(F=>F.json()).then(r).catch(()=>{}),fetch("/api/campaigns").then(F=>F.json()).then(F=>o(F.datasets||[])).catch(()=>{})};if(Ee.useEffect(()=>{t&&C()},[t]),Ee.useEffect(()=>{b&&(h(b.default_asset),f(b.default_n),b.default_n<=100?m(90):b.default_n<=1e3?m(240):b.default_n<=1e4?m(900):m(3600))},[a,b==null?void 0:b.id]),!t)return null;const A=F=>{y(F),setTimeout(()=>y(null),3200)},L=async()=>{_(!0);try{const F=await fetch("/api/campaigns",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({usecase:a,n:d,asset:c,workers:p,wallclock:v,distill_top:.1})}),V=await F.json();if(!F.ok)throw new Error(V.detail||"start failed");A(`Running ${V.thisRun} trials → ${V.dir}`)}catch(F){A(String(F))}finally{_(!1)}},w=()=>fetch("/api/campaigns/cancel",{method:"POST"}),S=(n==null?void 0:n.status)==="running",D=S&&(n!=null&&n.thisRun)?Math.min(100,100*(n.done||0)/n.thisRun):0;return P.jsx("div",{className:"modal-scrim",onClick:e,children:P.jsxs("div",{className:"modal research-modal",onClick:F=>F.stopPropagation(),children:[P.jsxs("div",{className:"modal-head",children:[P.jsxs("div",{children:[P.jsx("div",{className:"kicker",children:"Research"}),P.jsx("h2",{children:"Campaigns & datasets"})]}),P.jsx("button",{className:"icon-btn",onClick:e,children:"✕"})]}),P.jsx("p",{className:"modal-lead",children:"Headless PyBullet — not the 4× realtime viewport loop. Each trial is a compact JSONL row (no full trajectories). N is a use-case choice: 100 to watch, 1k–10k to distill, 100k / 1M as resumed shards."}),P.jsx("div",{className:"usecase-grid",children:i.map(F=>P.jsxs("button",{className:`provider-card ${a===F.id?"active":""}`,onClick:()=>l(F.id),children:[P.jsxs("div",{className:"pc-top",children:[P.jsx("b",{children:F.title}),P.jsxs("span",{className:"tag",children:[F.default_n.toLocaleString()," rec."]})]}),P.jsx("p",{children:F.blurb})]},F.id))}),b&&P.jsx("p",{className:"why-n",children:b.why_n}),P.jsxs("div",{className:"field-row",style:{marginTop:12},children:[P.jsxs("label",{className:"field",children:[P.jsx("span",{children:"Robot"}),P.jsx("select",{value:c,onChange:F=>h(F.target.value),children:((b==null?void 0:b.assets)||["pulse"]).map(F=>P.jsx("option",{value:F,children:F},F))})]}),P.jsxs("label",{className:"field",children:[P.jsx("span",{children:"Sims in parallel"}),P.jsxs("select",{value:p,onChange:F=>g(Number(F.target.value)),children:[P.jsx("option",{value:1,children:"1 client"}),P.jsx("option",{value:2,children:"2 clients"})]})]}),P.jsxs("label",{className:"field",children:[P.jsx("span",{children:"Wall-clock budget"}),P.jsxs("select",{value:v,onChange:F=>m(Number(F.target.value)),children:[P.jsx("option",{value:90,children:"90 s"}),P.jsx("option",{value:240,children:"4 min"}),P.jsx("option",{value:900,children:"15 min"}),P.jsx("option",{value:3600,children:"1 hour"})]})]})]}),P.jsx("div",{className:"n-row",children:dA.map(F=>P.jsxs("button",{className:`n-chip ${d===F.n?"on":""}`,onClick:()=>f(F.n),children:[F.label,P.jsx("i",{children:F.hint})]},F.n))}),P.jsxs("div",{className:"pc-actions",style:{marginTop:14},children:[S?P.jsx("button",{className:"ghost danger-text",onClick:w,children:"Cancel campaign"}):P.jsxs("button",{className:"primary",disabled:u,onClick:L,children:["Run ",d.toLocaleString()," trials"]}),d>=1e5&&P.jsx("span",{className:"mono",children:"This process caps a shard at 100k; leftover N is stored as resumeFrom in the manifest."})]}),(S||(n==null?void 0:n.done))&&P.jsxs("div",{className:"campaign-progress",children:[P.jsx("div",{className:"dl-bar",children:P.jsx("i",{style:{width:`${S?D:100}%`}})}),P.jsxs("div",{className:"dl-meta",children:[(n==null?void 0:n.done)||0," / ",(n==null?void 0:n.thisRun)||d," · ",(n==null?void 0:n.successes)||0," success ·"," ",(n==null?void 0:n.rate)||0," Hz",n!=null&&n.eta?` · eta ${Math.round(n.eta)}s`:"",n!=null&&n.status&&n.status!=="running"?` · ${n.status}`:""]}),(n==null?void 0:n.last)&&P.jsxs("div",{className:"dl-meta",children:["last #",n.last.trial," · ",n.last.success?"ok":"miss"," · ",n.last.reason]}),(n==null?void 0:n.dir)&&P.jsx("div",{className:"mono",children:n.dir})]}),P.jsx("div",{className:"kicker",style:{marginTop:18},children:"Datasets on disk"}),P.jsxs("div",{className:"dataset-list",children:[s.length===0&&P.jsx("div",{className:"empty",children:"No distilled sets yet."}),s.map(F=>P.jsxs("div",{className:"dataset-row",children:[P.jsxs("div",{children:[P.jsx("b",{children:F.usecase})," · ",F.asset,P.jsxs("div",{className:"mono",children:[F.done||0," trials · ",F.successes||0," ok · ",F.status]})]}),P.jsx("a",{className:"ghost",href:`/api/campaigns/${F.id}/download`,children:"zip"})]},F.id))]}),x&&P.jsx("div",{className:"toast",children:x})]})})}const mu=["Make this robot walk to the red cube.","Add a ramp and see what happens.","Try solving it without changing the robot.","Now make it climb the stairs.","Why did it fall?","Load the Husky robot.","Run 100 gait-search experiments and distill a dataset."];let Wm=1;function pA(){const t=Ee.useRef(null),e=Ee.useRef(null),n=Ee.useRef(null),i=Ee.useRef(null),r=Ee.useRef(null),[s,o]=Ee.useState(!1),[a,l]=Ee.useState(!1),[c,h]=Ee.useState(""),[d,f]=Ee.useState([]),[p,g]=Ee.useState([]),[v,m]=Ee.useState([]),[u,_]=Ee.useState([]),[x,y]=Ee.useState(null),[b,C]=Ee.useState("idle"),[A,L]=Ee.useState("pause"),[w,S]=Ee.useState(1),[D,F]=Ee.useState(null),[V,K]=Ee.useState(null),[$,q]=Ee.useState("scene"),[ee,T]=Ee.useState("chat"),[B,X]=Ee.useState(!0),[ie,ye]=Ee.useState(!0),[He,G]=Ee.useState(""),[re,_e]=Ee.useState("iso"),[ce,be]=Ee.useState(0),[Ie,Be]=Ee.useState(0),[lt,je]=Ee.useState(null),[mt,z]=Ee.useState(0),[zt,Ve]=Ee.useState(!1),[Xe,Pe]=Ee.useState(!1),[ot,we]=Ee.useState(null),[R,M]=Ee.useState(null),[H,Q]=Ee.useState(null),ne=b==="experimenting"||b==="thinking";Ee.useEffect(()=>{const U=setInterval(()=>z(J=>(J+1)%mu.length),4200);return()=>clearInterval(U)},[]),Ee.useEffect(()=>{const U=window.setTimeout(()=>o(!0),1800);return fetch("/api/health").then(J=>{J.ok&&o(!0)}).catch(()=>{}),()=>window.clearTimeout(U)},[]),Ee.useEffect(()=>{fetch("/api/assets").then(U=>U.json()).then(_).catch(()=>{}),fetch("/api/llm/hub").then(U=>U.json()).then(we).catch(()=>{})},[]),Ee.useEffect(()=>{zt&&fetch("/api/llm/hub").then(U=>U.json()).then(we).catch(()=>{})},[zt]),Ee.useEffect(()=>{const U=t.current;if(!U)return;let J;try{J=new uA(U)}catch(le){console.error("WebGL viewport failed",le),o(!0);return}n.current=J,J.setHandlers({onSelect:le=>y(le),onEdit:(le,De)=>{var I;return(I=i.current)==null?void 0:I.send({type:"edit",id:le,position:De})}});const Me=new ResizeObserver(()=>{const le=e.current;le&&J.resize(le.clientWidth,le.clientHeight)});e.current&&Me.observe(e.current);const Le=setInterval(()=>{be(J.fps),Be(J.simTime)},250),ge=new wy;i.current=ge;const Ye=ge.on(le=>{const De=String(le.type||"");if(De==="_open"&&l(!0),De==="_close"&&l(!1),De==="hello"&&(F(le.llm),le.hub&&we(le.hub),o(!0)),De==="hub"&&we(le),De==="download"&&(M(le),le.status==="done"&&fetch("/api/llm/hub").then(I=>I.json()).then(we).catch(()=>{})),De==="llm"&&(F(le),le.hub&&we(le.hub)),De==="scene"){const I=le.bodies||[];m(I),J.setScene(I,le.actorId??null,le.targetId??null)}if(De==="poses"&&J.applyPoses(le),De==="chat_delta"){const I=String(le.content||"");if(!I)return;f(oe=>{const Y=oe[oe.length-1];return Y&&Y.role==="assistant"&&Y.streaming?[...oe.slice(0,-1),{...Y,content:Y.content+I}]:[...oe,{id:`m${Wm++}`,role:"assistant",content:I,ts:Number(le.ts||Date.now()),streaming:!0}]})}if(De==="chat"&&f(I=>{const oe=I[I.length-1];return oe&&oe.role==="assistant"&&oe.streaming&&le.role==="assistant"?[...I.slice(0,-1),{...oe,content:String(le.content||oe.content),streaming:!1}]:[...I,{id:`m${Wm++}`,role:le.role,content:String(le.content||""),ts:Number(le.ts||Date.now())}]}),De==="attempt"){const I=le;g(oe=>[...oe.filter(Y=>Y.id!==I.id),I]),T("timeline")}De==="attempt_update"&&g(I=>I.map(oe=>oe.id===le.id?{...oe,...le}:oe)),De==="status"&&(le.agent&&(C(String(le.agent)),J.setStatus(String(le.agent))),le.sim&&L(String(le.sim))),De==="education"&&K(le.lesson),De==="tool_call"&&je(String(le.tool)),De==="tool_result"&&je(null),De==="campaign"&&Q(le)});return ge.connect(),()=>{Ye(),ge.close(),clearInterval(Le),Me.disconnect(),J.dispose()}},[]),Ee.useEffect(()=>{var U;(U=r.current)==null||U.scrollTo({top:r.current.scrollHeight,behavior:"smooth"})},[d]);const Z=U=>{var Me;const J=(U??c).trim();J&&((Me=i.current)==null||Me.send({type:"prompt",text:J}),h(""),T("chat"))},Se=(U,J)=>{var Me;(Me=i.current)==null||Me.send({type:"control",cmd:U,value:J}),U==="play"&&L("play"),U==="pause"&&L("pause")},ue=v.find(U=>U.id===x),ve=Ee.useMemo(()=>{const U=He.toLowerCase();return U?u.filter(J=>J.name.toLowerCase().includes(U)||J.tags.some(Me=>Me.includes(U))||J.description.toLowerCase().includes(U)):u},[u,He]),$e=!B&&!ie?"both-collapsed":B?ie?"":"right-collapsed":"left-collapsed";return P.jsxs("div",{className:"app",children:[!s&&P.jsx("div",{className:"boot",children:P.jsxs("div",{className:"boot-card",children:[P.jsx("img",{src:"/arena-preview.png",alt:"Arena"}),P.jsxs("div",{className:"boot-copy",children:[P.jsx("h1",{children:"PRISM LAB"}),P.jsx("p",{children:"Give the model a world, not the answers. Connecting to the local physics engine…"}),P.jsx("div",{className:"bar",children:P.jsx("i",{})})]})]})}),P.jsxs("header",{className:"topbar",children:[P.jsxs("div",{className:"brand",children:[P.jsx("img",{src:"/logo.png",alt:"PRISM"}),P.jsxs("div",{children:[P.jsx("div",{className:"name",children:"PRISM"}),P.jsx("div",{className:"sub",children:"Simulation lab"})]})]}),P.jsxs("div",{className:"transport",children:[P.jsx("button",{className:"icon-btn",title:"Scene",onClick:()=>X(U=>!U),children:"☰"}),P.jsx("button",{className:`icon-btn ${A==="play"?"active":""}`,title:"Play",onClick:()=>Se("play"),children:"▶"}),P.jsx("button",{className:"icon-btn",title:"Pause",onClick:()=>Se("pause"),children:"❚❚"}),P.jsx("button",{className:"icon-btn",title:"Step",onClick:()=>Se("step"),children:"⏭"}),P.jsx("button",{className:"icon-btn",title:"Reset",onClick:()=>Se("reset"),children:"↺"}),P.jsx("button",{className:"icon-btn danger",title:"Stop agent",onClick:()=>Se("stop_agent"),children:"■"}),P.jsxs("div",{className:"speed",children:[P.jsxs("span",{children:[w.toFixed(1),"×"]}),P.jsx("input",{type:"range",min:.25,max:4,step:.25,value:w,onChange:U=>{const J=Number(U.target.value);S(J),Se("speed",J)}})]})]}),P.jsx("div",{className:"top-spacer"}),P.jsxs("div",{className:`chip ${a?"live":""}`,children:[P.jsx("span",{className:"dot"}),a?"local":"offline"]}),P.jsxs("div",{className:`chip ${ne?"busy":"ok"}`,children:[P.jsx("span",{className:"dot"}),ne?b:"idle"]}),P.jsx("button",{className:`chip model-chip ${(H==null?void 0:H.status)==="running"?"busy":""}`,title:"Research campaigns",onClick:()=>Pe(!0),children:(H==null?void 0:H.status)==="running"?`campaign · ${H.done||0}/${H.thisRun||0}`:"research"}),P.jsx("button",{className:"chip model-chip",title:(D==null?void 0:D.note)||"Choose a model",onClick:()=>Ve(!0),children:D?`${D.active_provider||D.provider}${D.active_model||D.model?" · "+(D.active_model||D.model):""}`:"models"}),P.jsx("button",{className:"icon-btn",title:"Chat",onClick:()=>ye(U=>!U),children:"✶"})]}),P.jsxs("div",{className:`workspace ${$e}`,children:[P.jsxs("aside",{className:"rail",children:[P.jsx("div",{className:"rail-head",children:P.jsx("span",{className:"kicker",children:"Studio"})}),P.jsxs("div",{className:"tabs",children:[P.jsx("button",{className:`tab ${$==="scene"?"on":""}`,onClick:()=>q("scene"),children:"Hierarchy"}),P.jsx("button",{className:`tab ${$==="assets"?"on":""}`,onClick:()=>q("assets"),children:"Assets"})]}),$==="scene"?P.jsxs("div",{className:"list",children:[v.filter(U=>{var J;return!((J=U.tags)!=null&&J.includes("arena"))}).map(U=>{var J;return P.jsxs("div",{className:`row ${x===U.id?"sel":""}`,onClick:()=>{var Me;y(U.id),(Me=n.current)==null||Me.select(U.id)},children:[P.jsx("span",{className:"swatch",style:{background:U.color}}),P.jsxs("div",{children:[P.jsx("div",{className:"title",children:U.name}),P.jsxs("div",{className:"meta",children:["#",U.id," · ",U.category,(J=U.joints)!=null&&J.length?` · ${U.joints.length} DoF`:""]})]}),P.jsx("span",{className:"tag",children:U.createdBy})]},U.id)}),ue&&P.jsxs("div",{className:"inspector",children:[P.jsx("div",{className:"kicker",children:"Inspector"}),P.jsxs("div",{className:"kv",children:[P.jsx("span",{children:"mass"}),P.jsxs("b",{children:[ue.mass," kg"]}),P.jsx("span",{children:"caps"}),P.jsx("b",{children:ue.capabilities.join(", ")||"—"}),P.jsx("span",{children:"joints"}),P.jsx("b",{children:ue.joints.map(U=>U.name).join(", ")||"none"})]}),P.jsx("p",{style:{fontSize:11,color:"var(--faint)"},children:"Shift-drag in the viewport to slide on the arena floor. The agent continues from the new state."})]})]}):P.jsxs(P.Fragment,{children:[P.jsx("input",{className:"search",placeholder:"Search library…",value:He,onChange:U=>G(U.target.value)}),P.jsx("div",{className:"list",children:ve.map(U=>P.jsxs("button",{className:"asset",onClick:()=>Z(U.category==="robots"?`Load the ${U.name} robot.`:`Add a ${U.name.toLowerCase()} in front of the robot.`),children:[P.jsx("div",{className:"aname",style:{color:U.color},children:U.name}),P.jsx("div",{className:"adesc",children:U.description}),P.jsxs("div",{className:"atags",children:[U.origin==="pybullet"&&P.jsx("span",{className:"tag",children:"pybullet"}),U.tags.filter(J=>J!=="pybullet").slice(0,3).map(J=>P.jsx("span",{className:"tag",children:J},J))]})]},U.id))})]})]}),P.jsxs("div",{className:"viewport-wrap",ref:e,children:[P.jsx("canvas",{ref:t}),P.jsxs("div",{className:"hud",children:[P.jsxs("div",{className:"hud-left",children:[P.jsxs("div",{className:"hud-pill",children:["t ",P.jsxs("b",{children:[Ie.toFixed(2),"s"]})]}),P.jsxs("div",{className:"hud-pill",children:[P.jsx("b",{children:ce})," fps"]}),P.jsxs("div",{className:"hud-pill",children:[P.jsx("b",{children:v.filter(U=>{var J;return!((J=U.tags)!=null&&J.includes("arena"))}).length})," bodies"]})]}),P.jsx("div",{className:"hud-right cam-presets",children:["iso","front","side","top","follow"].map(U=>P.jsx("button",{className:re===U?"on":"",onClick:()=>{var J;_e(U),(J=n.current)==null||J.setCamera(U)},children:U},U))})]}),P.jsxs("div",{className:"prompt-dock",children:[P.jsx("div",{className:"hints",children:mu.map((U,J)=>P.jsx("button",{className:"hint",style:{opacity:J===mt?1:.55},onClick:()=>Z(U),children:U},U))}),P.jsxs("div",{className:`prompt ${ne?"busy":""}`,children:[P.jsx("textarea",{value:c,placeholder:mu[mt],onChange:U=>h(U.target.value),onKeyDown:U=>{U.key==="Enter"&&!U.shiftKey&&(U.preventDefault(),Z()),U.key==="Escape"&&Se("stop_agent")}}),ne?P.jsx("button",{className:"stop-btn",onClick:()=>Se("stop_agent"),title:"Stop",children:"■"}):P.jsx("button",{className:"send",onClick:()=>Z(),disabled:!c.trim(),children:"➤"})]})]})]}),P.jsxs("aside",{className:"rail right",children:[P.jsx("div",{className:"rail-head",children:P.jsx("span",{className:"kicker",children:"Collaborator"})}),P.jsxs("div",{className:"tabs",children:[P.jsx("button",{className:`tab ${ee==="chat"?"on":""}`,onClick:()=>T("chat"),children:"Chat"}),P.jsx("button",{className:`tab ${ee==="timeline"?"on":""}`,onClick:()=>T("timeline"),children:"Timeline"})]}),lt&&P.jsxs("div",{className:"tool-chip",children:["tool · ",lt]}),ee==="chat"?P.jsxs("div",{className:"chat",children:[P.jsx("div",{className:"msgs",ref:r,children:d.map(U=>P.jsxs("div",{className:`msg ${U.role}`,children:[U.role!=="system"&&P.jsx("div",{className:"who",children:U.role==="user"?"You":"PRISM"}),U.content]},U.id))}),V&&P.jsxs("div",{className:"lesson",children:[P.jsx("h3",{children:V.title}),P.jsx("p",{children:V.takeaway}),V.whatWorked&&P.jsxs("p",{children:["Worked: ",P.jsx("b",{style:{color:"var(--ok)"},children:V.whatWorked.strategy})]}),V.concepts.slice(0,2).map(U=>P.jsxs("div",{className:"concept",children:[P.jsx("div",{className:"ct",children:U.title}),P.jsx("p",{children:U.body})]},U.title))]})]}):P.jsxs("div",{className:"timeline",children:[p.length===0&&P.jsx("div",{className:"empty",children:"Attempts will land here — objective, action, parameters, result, next experiment."}),p.slice().reverse().map(U=>P.jsxs("div",{className:`attempt ${U.status==="running"?"run":U.status==="success"?"ok":""}`,children:[P.jsxs("div",{className:"ah",children:[P.jsxs("span",{children:["ATTEMPT ",String(U.id).padStart(2,"0")]}),P.jsx("span",{className:"score",children:U.score!=null?U.score.toFixed(3):"…"})]}),P.jsx("div",{className:"astrat",children:U.strategy}),P.jsx("div",{className:"ap",children:U.action}),U.parameters&&P.jsx("div",{className:"ap",children:JSON.stringify(U.parameters)}),U.result&&P.jsx("div",{className:"ap",children:U.result}),U.next&&P.jsxs("div",{className:"ap",children:["next · ",U.next]})]},U.id))]})]})]}),P.jsx(hA,{open:zt,onClose:()=>Ve(!1),hub:ot,download:R,onRefresh:we}),P.jsx(fA,{open:Xe,onClose:()=>Pe(!1),campaign:H})]})}iv(document.getElementById("root")).render(P.jsx(pA,{}));
