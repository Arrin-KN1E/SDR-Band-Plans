/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. MIT license */

window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        if (!script) {
          document.head.appendChild(style);
        } else {
          script.parentNode.insertBefore(style, script);
        }

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());
;
//     Underscore.js 1.9.1
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
!function(){var n="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global||this||{},r=n._,e=Array.prototype,o=Object.prototype,s="undefined"!=typeof Symbol?Symbol.prototype:null,u=e.push,c=e.slice,p=o.toString,i=o.hasOwnProperty,t=Array.isArray,a=Object.keys,l=Object.create,f=function(){},h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};"undefined"==typeof exports||exports.nodeType?n._=h:("undefined"!=typeof module&&!module.nodeType&&module.exports&&(exports=module.exports=h),exports._=h),h.VERSION="1.9.1";var v,y=function(u,i,n){if(void 0===i)return u;switch(null==n?3:n){case 1:return function(n){return u.call(i,n)};case 3:return function(n,r,t){return u.call(i,n,r,t)};case 4:return function(n,r,t,e){return u.call(i,n,r,t,e)}}return function(){return u.apply(i,arguments)}},d=function(n,r,t){return h.iteratee!==v?h.iteratee(n,r):null==n?h.identity:h.isFunction(n)?y(n,r,t):h.isObject(n)&&!h.isArray(n)?h.matcher(n):h.property(n)};h.iteratee=v=function(n,r){return d(n,r,1/0)};var g=function(u,i){return i=null==i?u.length-1:+i,function(){for(var n=Math.max(arguments.length-i,0),r=Array(n),t=0;t<n;t++)r[t]=arguments[t+i];switch(i){case 0:return u.call(this,r);case 1:return u.call(this,arguments[0],r);case 2:return u.call(this,arguments[0],arguments[1],r)}var e=Array(i+1);for(t=0;t<i;t++)e[t]=arguments[t];return e[i]=r,u.apply(this,e)}},m=function(n){if(!h.isObject(n))return{};if(l)return l(n);f.prototype=n;var r=new f;return f.prototype=null,r},b=function(r){return function(n){return null==n?void 0:n[r]}},j=function(n,r){return null!=n&&i.call(n,r)},x=function(n,r){for(var t=r.length,e=0;e<t;e++){if(null==n)return;n=n[r[e]]}return t?n:void 0},_=Math.pow(2,53)-1,A=b("length"),w=function(n){var r=A(n);return"number"==typeof r&&0<=r&&r<=_};h.each=h.forEach=function(n,r,t){var e,u;if(r=y(r,t),w(n))for(e=0,u=n.length;e<u;e++)r(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;e<u;e++)r(n[i[e]],i[e],n)}return n},h.map=h.collect=function(n,r,t){r=d(r,t);for(var e=!w(n)&&h.keys(n),u=(e||n).length,i=Array(u),o=0;o<u;o++){var a=e?e[o]:o;i[o]=r(n[a],a,n)}return i};var O=function(c){return function(n,r,t,e){var u=3<=arguments.length;return function(n,r,t,e){var u=!w(n)&&h.keys(n),i=(u||n).length,o=0<c?0:i-1;for(e||(t=n[u?u[o]:o],o+=c);0<=o&&o<i;o+=c){var a=u?u[o]:o;t=r(t,n[a],a,n)}return t}(n,y(r,e,4),t,u)}};h.reduce=h.foldl=h.inject=O(1),h.reduceRight=h.foldr=O(-1),h.find=h.detect=function(n,r,t){var e=(w(n)?h.findIndex:h.findKey)(n,r,t);if(void 0!==e&&-1!==e)return n[e]},h.filter=h.select=function(n,e,r){var u=[];return e=d(e,r),h.each(n,function(n,r,t){e(n,r,t)&&u.push(n)}),u},h.reject=function(n,r,t){return h.filter(n,h.negate(d(r)),t)},h.every=h.all=function(n,r,t){r=d(r,t);for(var e=!w(n)&&h.keys(n),u=(e||n).length,i=0;i<u;i++){var o=e?e[i]:i;if(!r(n[o],o,n))return!1}return!0},h.some=h.any=function(n,r,t){r=d(r,t);for(var e=!w(n)&&h.keys(n),u=(e||n).length,i=0;i<u;i++){var o=e?e[i]:i;if(r(n[o],o,n))return!0}return!1},h.contains=h.includes=h.include=function(n,r,t,e){return w(n)||(n=h.values(n)),("number"!=typeof t||e)&&(t=0),0<=h.indexOf(n,r,t)},h.invoke=g(function(n,t,e){var u,i;return h.isFunction(t)?i=t:h.isArray(t)&&(u=t.slice(0,-1),t=t[t.length-1]),h.map(n,function(n){var r=i;if(!r){if(u&&u.length&&(n=x(n,u)),null==n)return;r=n[t]}return null==r?r:r.apply(n,e)})}),h.pluck=function(n,r){return h.map(n,h.property(r))},h.where=function(n,r){return h.filter(n,h.matcher(r))},h.findWhere=function(n,r){return h.find(n,h.matcher(r))},h.max=function(n,e,r){var t,u,i=-1/0,o=-1/0;if(null==e||"number"==typeof e&&"object"!=typeof n[0]&&null!=n)for(var a=0,c=(n=w(n)?n:h.values(n)).length;a<c;a++)null!=(t=n[a])&&i<t&&(i=t);else e=d(e,r),h.each(n,function(n,r,t){u=e(n,r,t),(o<u||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},h.min=function(n,e,r){var t,u,i=1/0,o=1/0;if(null==e||"number"==typeof e&&"object"!=typeof n[0]&&null!=n)for(var a=0,c=(n=w(n)?n:h.values(n)).length;a<c;a++)null!=(t=n[a])&&t<i&&(i=t);else e=d(e,r),h.each(n,function(n,r,t){((u=e(n,r,t))<o||u===1/0&&i===1/0)&&(i=n,o=u)});return i},h.shuffle=function(n){return h.sample(n,1/0)},h.sample=function(n,r,t){if(null==r||t)return w(n)||(n=h.values(n)),n[h.random(n.length-1)];var e=w(n)?h.clone(n):h.values(n),u=A(e);r=Math.max(Math.min(r,u),0);for(var i=u-1,o=0;o<r;o++){var a=h.random(o,i),c=e[o];e[o]=e[a],e[a]=c}return e.slice(0,r)},h.sortBy=function(n,e,r){var u=0;return e=d(e,r),h.pluck(h.map(n,function(n,r,t){return{value:n,index:u++,criteria:e(n,r,t)}}).sort(function(n,r){var t=n.criteria,e=r.criteria;if(t!==e){if(e<t||void 0===t)return 1;if(t<e||void 0===e)return-1}return n.index-r.index}),"value")};var k=function(o,r){return function(e,u,n){var i=r?[[],[]]:{};return u=d(u,n),h.each(e,function(n,r){var t=u(n,r,e);o(i,n,t)}),i}};h.groupBy=k(function(n,r,t){j(n,t)?n[t].push(r):n[t]=[r]}),h.indexBy=k(function(n,r,t){n[t]=r}),h.countBy=k(function(n,r,t){j(n,t)?n[t]++:n[t]=1});var S=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;h.toArray=function(n){return n?h.isArray(n)?c.call(n):h.isString(n)?n.match(S):w(n)?h.map(n,h.identity):h.values(n):[]},h.size=function(n){return null==n?0:w(n)?n.length:h.keys(n).length},h.partition=k(function(n,r,t){n[t?0:1].push(r)},!0),h.first=h.head=h.take=function(n,r,t){return null==n||n.length<1?null==r?void 0:[]:null==r||t?n[0]:h.initial(n,n.length-r)},h.initial=function(n,r,t){return c.call(n,0,Math.max(0,n.length-(null==r||t?1:r)))},h.last=function(n,r,t){return null==n||n.length<1?null==r?void 0:[]:null==r||t?n[n.length-1]:h.rest(n,Math.max(0,n.length-r))},h.rest=h.tail=h.drop=function(n,r,t){return c.call(n,null==r||t?1:r)},h.compact=function(n){return h.filter(n,Boolean)};var M=function(n,r,t,e){for(var u=(e=e||[]).length,i=0,o=A(n);i<o;i++){var a=n[i];if(w(a)&&(h.isArray(a)||h.isArguments(a)))if(r)for(var c=0,l=a.length;c<l;)e[u++]=a[c++];else M(a,r,t,e),u=e.length;else t||(e[u++]=a)}return e};h.flatten=function(n,r){return M(n,r,!1)},h.without=g(function(n,r){return h.difference(n,r)}),h.uniq=h.unique=function(n,r,t,e){h.isBoolean(r)||(e=t,t=r,r=!1),null!=t&&(t=d(t,e));for(var u=[],i=[],o=0,a=A(n);o<a;o++){var c=n[o],l=t?t(c,o,n):c;r&&!t?(o&&i===l||u.push(c),i=l):t?h.contains(i,l)||(i.push(l),u.push(c)):h.contains(u,c)||u.push(c)}return u},h.union=g(function(n){return h.uniq(M(n,!0,!0))}),h.intersection=function(n){for(var r=[],t=arguments.length,e=0,u=A(n);e<u;e++){var i=n[e];if(!h.contains(r,i)){var o;for(o=1;o<t&&h.contains(arguments[o],i);o++);o===t&&r.push(i)}}return r},h.difference=g(function(n,r){return r=M(r,!0,!0),h.filter(n,function(n){return!h.contains(r,n)})}),h.unzip=function(n){for(var r=n&&h.max(n,A).length||0,t=Array(r),e=0;e<r;e++)t[e]=h.pluck(n,e);return t},h.zip=g(h.unzip),h.object=function(n,r){for(var t={},e=0,u=A(n);e<u;e++)r?t[n[e]]=r[e]:t[n[e][0]]=n[e][1];return t};var F=function(i){return function(n,r,t){r=d(r,t);for(var e=A(n),u=0<i?0:e-1;0<=u&&u<e;u+=i)if(r(n[u],u,n))return u;return-1}};h.findIndex=F(1),h.findLastIndex=F(-1),h.sortedIndex=function(n,r,t,e){for(var u=(t=d(t,e,1))(r),i=0,o=A(n);i<o;){var a=Math.floor((i+o)/2);t(n[a])<u?i=a+1:o=a}return i};var E=function(i,o,a){return function(n,r,t){var e=0,u=A(n);if("number"==typeof t)0<i?e=0<=t?t:Math.max(t+u,e):u=0<=t?Math.min(t+1,u):t+u+1;else if(a&&t&&u)return n[t=a(n,r)]===r?t:-1;if(r!=r)return 0<=(t=o(c.call(n,e,u),h.isNaN))?t+e:-1;for(t=0<i?e:u-1;0<=t&&t<u;t+=i)if(n[t]===r)return t;return-1}};h.indexOf=E(1,h.findIndex,h.sortedIndex),h.lastIndexOf=E(-1,h.findLastIndex),h.range=function(n,r,t){null==r&&(r=n||0,n=0),t||(t=r<n?-1:1);for(var e=Math.max(Math.ceil((r-n)/t),0),u=Array(e),i=0;i<e;i++,n+=t)u[i]=n;return u},h.chunk=function(n,r){if(null==r||r<1)return[];for(var t=[],e=0,u=n.length;e<u;)t.push(c.call(n,e,e+=r));return t};var N=function(n,r,t,e,u){if(!(e instanceof r))return n.apply(t,u);var i=m(n.prototype),o=n.apply(i,u);return h.isObject(o)?o:i};h.bind=g(function(r,t,e){if(!h.isFunction(r))throw new TypeError("Bind must be called on a function");var u=g(function(n){return N(r,u,t,this,e.concat(n))});return u}),h.partial=g(function(u,i){var o=h.partial.placeholder,a=function(){for(var n=0,r=i.length,t=Array(r),e=0;e<r;e++)t[e]=i[e]===o?arguments[n++]:i[e];for(;n<arguments.length;)t.push(arguments[n++]);return N(u,a,this,this,t)};return a}),(h.partial.placeholder=h).bindAll=g(function(n,r){var t=(r=M(r,!1,!1)).length;if(t<1)throw new Error("bindAll must be passed function names");for(;t--;){var e=r[t];n[e]=h.bind(n[e],n)}}),h.memoize=function(e,u){var i=function(n){var r=i.cache,t=""+(u?u.apply(this,arguments):n);return j(r,t)||(r[t]=e.apply(this,arguments)),r[t]};return i.cache={},i},h.delay=g(function(n,r,t){return setTimeout(function(){return n.apply(null,t)},r)}),h.defer=h.partial(h.delay,h,1),h.throttle=function(t,e,u){var i,o,a,c,l=0;u||(u={});var f=function(){l=!1===u.leading?0:h.now(),i=null,c=t.apply(o,a),i||(o=a=null)},n=function(){var n=h.now();l||!1!==u.leading||(l=n);var r=e-(n-l);return o=this,a=arguments,r<=0||e<r?(i&&(clearTimeout(i),i=null),l=n,c=t.apply(o,a),i||(o=a=null)):i||!1===u.trailing||(i=setTimeout(f,r)),c};return n.cancel=function(){clearTimeout(i),l=0,i=o=a=null},n},h.debounce=function(t,e,u){var i,o,a=function(n,r){i=null,r&&(o=t.apply(n,r))},n=g(function(n){if(i&&clearTimeout(i),u){var r=!i;i=setTimeout(a,e),r&&(o=t.apply(this,n))}else i=h.delay(a,e,this,n);return o});return n.cancel=function(){clearTimeout(i),i=null},n},h.wrap=function(n,r){return h.partial(r,n)},h.negate=function(n){return function(){return!n.apply(this,arguments)}},h.compose=function(){var t=arguments,e=t.length-1;return function(){for(var n=e,r=t[e].apply(this,arguments);n--;)r=t[n].call(this,r);return r}},h.after=function(n,r){return function(){if(--n<1)return r.apply(this,arguments)}},h.before=function(n,r){var t;return function(){return 0<--n&&(t=r.apply(this,arguments)),n<=1&&(r=null),t}},h.once=h.partial(h.before,2),h.restArguments=g;var I=!{toString:null}.propertyIsEnumerable("toString"),T=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],B=function(n,r){var t=T.length,e=n.constructor,u=h.isFunction(e)&&e.prototype||o,i="constructor";for(j(n,i)&&!h.contains(r,i)&&r.push(i);t--;)(i=T[t])in n&&n[i]!==u[i]&&!h.contains(r,i)&&r.push(i)};h.keys=function(n){if(!h.isObject(n))return[];if(a)return a(n);var r=[];for(var t in n)j(n,t)&&r.push(t);return I&&B(n,r),r},h.allKeys=function(n){if(!h.isObject(n))return[];var r=[];for(var t in n)r.push(t);return I&&B(n,r),r},h.values=function(n){for(var r=h.keys(n),t=r.length,e=Array(t),u=0;u<t;u++)e[u]=n[r[u]];return e},h.mapObject=function(n,r,t){r=d(r,t);for(var e=h.keys(n),u=e.length,i={},o=0;o<u;o++){var a=e[o];i[a]=r(n[a],a,n)}return i},h.pairs=function(n){for(var r=h.keys(n),t=r.length,e=Array(t),u=0;u<t;u++)e[u]=[r[u],n[r[u]]];return e},h.invert=function(n){for(var r={},t=h.keys(n),e=0,u=t.length;e<u;e++)r[n[t[e]]]=t[e];return r},h.functions=h.methods=function(n){var r=[];for(var t in n)h.isFunction(n[t])&&r.push(t);return r.sort()};var R=function(c,l){return function(n){var r=arguments.length;if(l&&(n=Object(n)),r<2||null==n)return n;for(var t=1;t<r;t++)for(var e=arguments[t],u=c(e),i=u.length,o=0;o<i;o++){var a=u[o];l&&void 0!==n[a]||(n[a]=e[a])}return n}};h.extend=R(h.allKeys),h.extendOwn=h.assign=R(h.keys),h.findKey=function(n,r,t){r=d(r,t);for(var e,u=h.keys(n),i=0,o=u.length;i<o;i++)if(r(n[e=u[i]],e,n))return e};var q,K,z=function(n,r,t){return r in t};h.pick=g(function(n,r){var t={},e=r[0];if(null==n)return t;h.isFunction(e)?(1<r.length&&(e=y(e,r[1])),r=h.allKeys(n)):(e=z,r=M(r,!1,!1),n=Object(n));for(var u=0,i=r.length;u<i;u++){var o=r[u],a=n[o];e(a,o,n)&&(t[o]=a)}return t}),h.omit=g(function(n,t){var r,e=t[0];return h.isFunction(e)?(e=h.negate(e),1<t.length&&(r=t[1])):(t=h.map(M(t,!1,!1),String),e=function(n,r){return!h.contains(t,r)}),h.pick(n,e,r)}),h.defaults=R(h.allKeys,!0),h.create=function(n,r){var t=m(n);return r&&h.extendOwn(t,r),t},h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},h.tap=function(n,r){return r(n),n},h.isMatch=function(n,r){var t=h.keys(r),e=t.length;if(null==n)return!e;for(var u=Object(n),i=0;i<e;i++){var o=t[i];if(r[o]!==u[o]||!(o in u))return!1}return!0},q=function(n,r,t,e){if(n===r)return 0!==n||1/n==1/r;if(null==n||null==r)return!1;if(n!=n)return r!=r;var u=typeof n;return("function"===u||"object"===u||"object"==typeof r)&&K(n,r,t,e)},K=function(n,r,t,e){n instanceof h&&(n=n._wrapped),r instanceof h&&(r=r._wrapped);var u=p.call(n);if(u!==p.call(r))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+r;case"[object Number]":return+n!=+n?+r!=+r:0==+n?1/+n==1/r:+n==+r;case"[object Date]":case"[object Boolean]":return+n==+r;case"[object Symbol]":return s.valueOf.call(n)===s.valueOf.call(r)}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof r)return!1;var o=n.constructor,a=r.constructor;if(o!==a&&!(h.isFunction(o)&&o instanceof o&&h.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in r)return!1}e=e||[];for(var c=(t=t||[]).length;c--;)if(t[c]===n)return e[c]===r;if(t.push(n),e.push(r),i){if((c=n.length)!==r.length)return!1;for(;c--;)if(!q(n[c],r[c],t,e))return!1}else{var l,f=h.keys(n);if(c=f.length,h.keys(r).length!==c)return!1;for(;c--;)if(l=f[c],!j(r,l)||!q(n[l],r[l],t,e))return!1}return t.pop(),e.pop(),!0},h.isEqual=function(n,r){return q(n,r)},h.isEmpty=function(n){return null==n||(w(n)&&(h.isArray(n)||h.isString(n)||h.isArguments(n))?0===n.length:0===h.keys(n).length)},h.isElement=function(n){return!(!n||1!==n.nodeType)},h.isArray=t||function(n){return"[object Array]"===p.call(n)},h.isObject=function(n){var r=typeof n;return"function"===r||"object"===r&&!!n},h.each(["Arguments","Function","String","Number","Date","RegExp","Error","Symbol","Map","WeakMap","Set","WeakSet"],function(r){h["is"+r]=function(n){return p.call(n)==="[object "+r+"]"}}),h.isArguments(arguments)||(h.isArguments=function(n){return j(n,"callee")});var D=n.document&&n.document.childNodes;"function"!=typeof/./&&"object"!=typeof Int8Array&&"function"!=typeof D&&(h.isFunction=function(n){return"function"==typeof n||!1}),h.isFinite=function(n){return!h.isSymbol(n)&&isFinite(n)&&!isNaN(parseFloat(n))},h.isNaN=function(n){return h.isNumber(n)&&isNaN(n)},h.isBoolean=function(n){return!0===n||!1===n||"[object Boolean]"===p.call(n)},h.isNull=function(n){return null===n},h.isUndefined=function(n){return void 0===n},h.has=function(n,r){if(!h.isArray(r))return j(n,r);for(var t=r.length,e=0;e<t;e++){var u=r[e];if(null==n||!i.call(n,u))return!1;n=n[u]}return!!t},h.noConflict=function(){return n._=r,this},h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(r){return h.isArray(r)?function(n){return x(n,r)}:b(r)},h.propertyOf=function(r){return null==r?function(){}:function(n){return h.isArray(n)?x(r,n):r[n]}},h.matcher=h.matches=function(r){return r=h.extendOwn({},r),function(n){return h.isMatch(n,r)}},h.times=function(n,r,t){var e=Array(Math.max(0,n));r=y(r,t,1);for(var u=0;u<n;u++)e[u]=r(u);return e},h.random=function(n,r){return null==r&&(r=n,n=0),n+Math.floor(Math.random()*(r-n+1))},h.now=Date.now||function(){return(new Date).getTime()};var L={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},P=h.invert(L),W=function(r){var t=function(n){return r[n]},n="(?:"+h.keys(r).join("|")+")",e=RegExp(n),u=RegExp(n,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=W(L),h.unescape=W(P),h.result=function(n,r,t){h.isArray(r)||(r=[r]);var e=r.length;if(!e)return h.isFunction(t)?t.call(n):t;for(var u=0;u<e;u++){var i=null==n?void 0:n[r[u]];void 0===i&&(i=t,u=e),n=h.isFunction(i)?i.call(n):i}return n};var C=0;h.uniqueId=function(n){var r=++C+"";return n?n+r:r},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var J=/(.)^/,U={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},V=/\\|'|\r|\n|\u2028|\u2029/g,$=function(n){return"\\"+U[n]};h.template=function(i,n,r){!n&&r&&(n=r),n=h.defaults({},n,h.templateSettings);var t,e=RegExp([(n.escape||J).source,(n.interpolate||J).source,(n.evaluate||J).source].join("|")+"|$","g"),o=0,a="__p+='";i.replace(e,function(n,r,t,e,u){return a+=i.slice(o,u).replace(V,$),o=u+n.length,r?a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":t?a+="'+\n((__t=("+t+"))==null?'':__t)+\n'":e&&(a+="';\n"+e+"\n__p+='"),n}),a+="';\n",n.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{t=new Function(n.variable||"obj","_",a)}catch(n){throw n.source=a,n}var u=function(n){return t.call(this,n,h)},c=n.variable||"obj";return u.source="function("+c+"){\n"+a+"}",u},h.chain=function(n){var r=h(n);return r._chain=!0,r};var G=function(n,r){return n._chain?h(r).chain():r};h.mixin=function(t){return h.each(h.functions(t),function(n){var r=h[n]=t[n];h.prototype[n]=function(){var n=[this._wrapped];return u.apply(n,arguments),G(this,r.apply(h,n))}}),h},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(r){var t=e[r];h.prototype[r]=function(){var n=this._wrapped;return t.apply(n,arguments),"shift"!==r&&"splice"!==r||0!==n.length||delete n[0],G(this,n)}}),h.each(["concat","join","slice"],function(n){var r=e[n];h.prototype[n]=function(){return G(this,r.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},h.prototype.valueOf=h.prototype.toJSON=h.prototype.value,h.prototype.toString=function(){return String(this._wrapped)},"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}();;
/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. MIT license */
(function(){
    // Bail out for browsers that have addListener support
    if (window.matchMedia && window.matchMedia('all').addListener) {
        return false;
    }

    var localMatchMedia = window.matchMedia,
        hasMediaQueries = localMatchMedia('only all').matches,
        isListening     = false,
        timeoutID       = 0,    // setTimeout for debouncing 'handleChange'
        queries         = [],   // Contains each 'mql' and associated 'listeners' if 'addListener' is used
        handleChange    = function(evt) {
            // Debounce
            clearTimeout(timeoutID);

            timeoutID = setTimeout(function() {
                for (var i = 0, il = queries.length; i < il; i++) {
                    var mql         = queries[i].mql,
                        listeners   = queries[i].listeners || [],
                        matches     = localMatchMedia(mql.media).matches;

                    // Update mql.matches value and call listeners
                    // Fire listeners only if transitioning to or from matched state
                    if (matches !== mql.matches) {
                        mql.matches = matches;

                        for (var j = 0, jl = listeners.length; j < jl; j++) {
                            listeners[j].call(window, mql);
                        }
                    }
                }
            }, 30);
        };

    window.matchMedia = function(media) {
        var mql         = localMatchMedia(media),
            listeners   = [],
            index       = 0;

        mql.addListener = function(listener) {
            // Changes would not occur to css media type so return now (Affects IE <= 8)
            if (!hasMediaQueries) {
                return;
            }

            // Set up 'resize' listener for browsers that support CSS3 media queries (Not for IE <= 8)
            // There should only ever be 1 resize listener running for performance
            if (!isListening) {
                isListening = true;
                window.addEventListener('resize', handleChange, true);
            }

            // Push object only if it has not been pushed already
            if (index === 0) {
                index = queries.push({
                    mql         : mql,
                    listeners   : listeners
                });
            }

            listeners.push(listener);
        };

        mql.removeListener = function(listener) {
            for (var i = 0, il = listeners.length; i < il; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                }
            }
        };

        return mql;
    };
}());
;
/*! jCarousel - v0.3.8 - 2018-05-31
* http://sorgalla.com/jcarousel/
* Copyright (c) 2006-2018 Jan Sorgalla; Licensed MIT */

!function(t){"use strict";var i=t.jCarousel={};i.version="0.3.8";var s=/^([+\-]=)?(.+)$/;i.parseTarget=function(t){var i=!1,e="object"!=typeof t?s.exec(t):null;return e?(t=parseInt(e[2],10)||0,e[1]&&(i=!0,"-="===e[1]&&(t*=-1))):"object"!=typeof t&&(t=parseInt(t,10)||0),{target:t,relative:i}},i.detectCarousel=function(t){for(var i;t.length>0;){if((i=t.filter("[data-jcarousel]")).length>0)return i;if((i=t.find("[data-jcarousel]")).length>0)return i;t=t.parent()}return null},i.base=function(s){return{version:i.version,_options:{},_element:null,_carousel:null,_init:t.noop,_create:t.noop,_destroy:t.noop,_reload:t.noop,create:function(){return this._element.attr("data-"+s.toLowerCase(),!0).data(s,this),!1===this._trigger("create")?this:(this._create(),this._trigger("createend"),this)},destroy:function(){return!1===this._trigger("destroy")?this:(this._destroy(),this._trigger("destroyend"),this._element.removeData(s).removeAttr("data-"+s.toLowerCase()),this)},reload:function(t){return!1===this._trigger("reload")?this:(t&&this.options(t),this._reload(),this._trigger("reloadend"),this)},element:function(){return this._element},options:function(i,s){if(0===arguments.length)return t.extend({},this._options);if("string"==typeof i){if(void 0===s)return void 0===this._options[i]?null:this._options[i];this._options[i]=s}else this._options=t.extend({},this._options,i);return this},carousel:function(){return this._carousel||(this._carousel=i.detectCarousel(this.options("carousel")||this._element),this._carousel||t.error('Could not detect carousel for plugin "'+s+'"')),this._carousel},_trigger:function(i,e,r){var n,o=!1;return r=[this].concat(r||[]),(e||this._element).each(function(){n=t.Event((s+":"+i).toLowerCase()),t(this).trigger(n,r),n.isDefaultPrevented()&&(o=!0)}),!o}}},i.plugin=function(s,e){var r=t[s]=function(i,s){this._element=t(i),this.options(s),this._init(),this.create()};return r.fn=r.prototype=t.extend({},i.base(s),e),t.fn[s]=function(i){var e=Array.prototype.slice.call(arguments,1),n=this;return"string"==typeof i?this.each(function(){var r=t(this).data(s);if(!r)return t.error("Cannot call methods on "+s+' prior to initialization; attempted to call method "'+i+'"');if(!t.isFunction(r[i])||"_"===i.charAt(0))return t.error('No such method "'+i+'" for '+s+" instance");var o=r[i].apply(r,e);return o!==r&&void 0!==o?(n=o,!1):void 0}):this.each(function(){var e=t(this).data(s);e instanceof r?e.reload(i):new r(this,i)}),n},r}}(jQuery),function(t,i){"use strict";var s=t(i),e=function(t){return parseFloat(t)||0};t.jCarousel.plugin("jcarousel",{animating:!1,tail:0,inTail:!1,resizeState:null,resizeTimer:null,lt:null,vertical:!1,rtl:!1,circular:!1,underflow:!1,relative:!1,_options:{list:function(){return this.element().children().eq(0)},items:function(){return this.list().children()},animation:400,transitions:!1,wrap:null,vertical:null,rtl:null,center:!1},_list:null,_items:null,_target:t(),_first:t(),_last:t(),_visible:t(),_fullyvisible:t(),_init:function(){var t=this;return t.resizeState=s.width()+"x"+s.height(),this.onWindowResize=function(){t.resizeTimer&&clearTimeout(t.resizeTimer),t.resizeTimer=setTimeout(function(){var i=s.width()+"x"+s.height();i!==t.resizeState&&(t.resizeState=i,t.reload())},100)},this},_create:function(){this._reload(),s.on("resize.jcarousel",this.onWindowResize)},_destroy:function(){s.off("resize.jcarousel",this.onWindowResize)},_reload:function(){this.vertical=this.options("vertical"),null==this.vertical&&(this.vertical=e(this.list().height())>e(this.list().width())),this.rtl=this.options("rtl"),null==this.rtl&&(this.rtl=function(i){if("rtl"===(""+i.attr("dir")).toLowerCase())return!0;var s=!1;return i.parents("[dir]").each(function(){if(/rtl/i.test(t(this).attr("dir")))return s=!0,!1}),s}(this._element)),this.lt=this.vertical?"top":"left",this.relative="relative"===this.list().css("position"),this._list=null,this._items=null;var i=this.index(this._target)>=0?this._target:this.closest();this.circular="circular"===this.options("wrap"),this.underflow=!1;var s={left:0,top:0};return i.length>0&&(this._prepare(i),this.list().find("[data-jcarousel-clone]").remove(),this._items=null,this.underflow=this._fullyvisible.length>=this.items().length,this.circular=this.circular&&!this.underflow,s[this.lt]=this._position(i)+"px"),this.move(s),this},list:function(){if(null===this._list){var i=this.options("list");this._list=t.isFunction(i)?i.call(this):this._element.find(i)}return this._list},items:function(){if(null===this._items){var i=this.options("items");this._items=(t.isFunction(i)?i.call(this):this.list().find(i)).not("[data-jcarousel-clone]")}return this._items},index:function(t){return this.items().index(t)},closest:function(){var i,s=this,r=this.list().position()[this.lt],n=t(),o=!1,l=this.vertical?"bottom":this.rtl&&!this.relative?"left":"right";return this.rtl&&this.relative&&!this.vertical&&(r+=e(this.list().width())-this.clipping()),this.items().each(function(){if(n=t(this),o)return!1;var a=s.dimension(n);if((r+=a)>=0){if(i=a-e(n.css("margin-"+l)),!(Math.abs(r)-a+i/2<=0))return!1;o=!0}}),n},target:function(){return this._target},first:function(){return this._first},last:function(){return this._last},visible:function(){return this._visible},fullyvisible:function(){return this._fullyvisible},hasNext:function(){if(!1===this._trigger("hasnext"))return!0;var t=this.options("wrap"),i=this.items().length-1,s=this.options("center")?this._target:this._last;return!!(i>=0&&!this.underflow&&(t&&"first"!==t||this.index(s)<i||this.tail&&!this.inTail))},hasPrev:function(){if(!1===this._trigger("hasprev"))return!0;var t=this.options("wrap");return!!(this.items().length>0&&!this.underflow&&(t&&"last"!==t||this.index(this._first)>0||this.tail&&this.inTail))},clipping:function(){return e(this._element["inner"+(this.vertical?"Height":"Width")]())},dimension:function(t){return e(t["outer"+(this.vertical?"Height":"Width")](!0))},scroll:function(i,s,e){if(this.animating)return this;if(!1===this._trigger("scroll",null,[i,s]))return this;t.isFunction(s)&&(e=s,s=!0);var r=t.jCarousel.parseTarget(i);if(r.relative){var n,o,l,a,h,u,c,f,d=this.items().length-1,_=Math.abs(r.target),p=this.options("wrap");if(r.target>0){var g=this.index(this._last);if(g>=d&&this.tail)this.inTail?"both"===p||"last"===p?this._scroll(0,s,e):t.isFunction(e)&&e.call(this,!1):this._scrollTail(s,e);else if(n=this.index(this._target),this.underflow&&n===d&&("circular"===p||"both"===p||"last"===p)||!this.underflow&&g===d&&("both"===p||"last"===p))this._scroll(0,s,e);else if(l=n+_,this.circular&&l>d){for(f=d,h=this.items().get(-1);f++<l;)h=this.items().eq(0),(u=this._visible.index(h)>=0)&&h.after(h.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(h),u||((c={})[this.lt]=this.dimension(h),this.moveBy(c)),this._items=null;this._scroll(h,s,e)}else this._scroll(Math.min(l,d),s,e)}else if(this.inTail)this._scroll(Math.max(this.index(this._first)-_+1,0),s,e);else if(o=this.index(this._first),n=this.index(this._target),l=(a=this.underflow?n:o)-_,a<=0&&(this.underflow&&"circular"===p||"both"===p||"first"===p))this._scroll(d,s,e);else if(this.circular&&l<0){for(f=l,h=this.items().get(0);f++<0;){h=this.items().eq(-1),(u=this._visible.index(h)>=0)&&h.after(h.clone(!0).attr("data-jcarousel-clone",!0)),this.list().prepend(h),this._items=null;var m=this.dimension(h);(c={})[this.lt]=-m,this.moveBy(c)}this._scroll(h,s,e)}else this._scroll(Math.max(l,0),s,e)}else this._scroll(r.target,s,e);return this._trigger("scrollend"),this},moveBy:function(t,i){var s=this.list().position(),r=1,n=0;return this.rtl&&!this.vertical&&(r=-1,this.relative&&(n=e(this.list().width())-this.clipping())),t.left&&(t.left=e(s.left)+n+e(t.left)*r+"px"),t.top&&(t.top=e(s.top)+n+e(t.top)*r+"px"),this.move(t,i)},move:function(i,s){s=s||{};var e=this.options("transitions"),r=!!e,n=!!e.transforms,o=!!e.transforms3d,l=s.duration||0,a=this.list();if(!r&&l>0)a.animate(i,s);else{var h=s.complete||t.noop,u={};if(r){var c={transitionDuration:a.css("transitionDuration"),transitionTimingFunction:a.css("transitionTimingFunction"),transitionProperty:a.css("transitionProperty")},f=h;h=function(){t(this).css(c),f.call(this)},u={transitionDuration:(l>0?l/1e3:0)+"s",transitionTimingFunction:e.easing||s.easing,transitionProperty:l>0?n||o?"all":i.left?"left":"top":"none",transform:"none"}}o?u.transform="translate3d("+(i.left||0)+","+(i.top||0)+",0)":n?u.transform="translate("+(i.left||0)+","+(i.top||0)+")":t.extend(u,i),r&&l>0&&a.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",h),a.css(u),l<=0&&a.each(function(){h.call(this)})}},_scroll:function(i,s,r){if(this.animating)return t.isFunction(r)&&r.call(this,!1),this;if("object"!=typeof i?i=this.items().eq(i):void 0===i.jquery&&(i=t(i)),0===i.length)return t.isFunction(r)&&r.call(this,!1),this;this.inTail=!1,this._prepare(i);var n=this._position(i);if(n===e(this.list().position()[this.lt]))return t.isFunction(r)&&r.call(this,!1),this;var o={};return o[this.lt]=n+"px",this._animate(o,s,r),this},_scrollTail:function(i,s){if(this.animating||!this.tail)return t.isFunction(s)&&s.call(this,!1),this;var r=this.list().position()[this.lt];this.rtl&&this.relative&&!this.vertical&&(r+=e(this.list().width())-this.clipping()),this.rtl&&!this.vertical?r+=this.tail:r-=this.tail,this.inTail=!0;var n={};return n[this.lt]=r+"px",this._update({target:this._target.next(),fullyvisible:this._fullyvisible.slice(1).add(this._visible.last())}),this._animate(n,i,s),this},_animate:function(i,s,e){if(e=e||t.noop,!1===this._trigger("animate"))return e.call(this,!1),this;this.animating=!0;var r=this.options("animation"),n=t.proxy(function(){this.animating=!1;var t=this.list().find("[data-jcarousel-clone]");t.length>0&&(t.remove(),this._reload()),this._trigger("animateend"),e.call(this,!0)},this),o="object"==typeof r?t.extend({},r):{duration:r},l=o.complete||t.noop;return!1===s?o.duration=0:void 0!==t.fx.speeds[o.duration]&&(o.duration=t.fx.speeds[o.duration]),o.complete=function(){n(),l.call(this)},this.move(i,o),this},_prepare:function(i){var s,r,n,o=this.index(i),l=o,a=this.dimension(i),h=this.clipping(),u=this.vertical?"bottom":this.rtl?"left":"right",c=this.options("center"),f={target:i,first:i,last:i,visible:i,fullyvisible:a<=h?i:t()};if(c&&(a/=2,h/=2),a<h)for(;;){if(0===(s=this.items().eq(++l)).length){if(!this.circular)break;if(s=this.items().eq(0),i.get(0)===s.get(0))break;if((r=this._visible.index(s)>=0)&&s.after(s.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(s),!r){var d={};d[this.lt]=this.dimension(s),this.moveBy(d)}this._items=null}if(0===(n=this.dimension(s)))break;if(a+=n,f.last=s,f.visible=f.visible.add(s),a-e(s.css("margin-"+u))<=h&&(f.fullyvisible=f.fullyvisible.add(s)),a>=h)break}if(!this.circular&&!c&&a<h)for(l=o;!(--l<0||0===(s=this.items().eq(l)).length||0===(n=this.dimension(s))||(a+=n,f.first=s,f.visible=f.visible.add(s),a-e(s.css("margin-"+u))<=h&&(f.fullyvisible=f.fullyvisible.add(s)),a>=h)););return this._update(f),this.tail=0,c||"circular"===this.options("wrap")||"custom"===this.options("wrap")||this.index(f.last)!==this.items().length-1||(a-=e(f.last.css("margin-"+u)))>h&&(this.tail=a-h),this},_position:function(t){var i=this._first,s=e(i.position()[this.lt]),r=this.options("center"),n=r?this.clipping()/2-this.dimension(i)/2:0;return this.rtl&&!this.vertical?(this.relative?s-=e(this.list().width())-this.dimension(i):s-=this.clipping()-this.dimension(i),s+=n):s-=n,!r&&(this.index(t)>this.index(i)||this.inTail)&&this.tail?(s=this.rtl&&!this.vertical?s-this.tail:s+this.tail,this.inTail=!0):this.inTail=!1,-s},_update:function(i){var s,e=this,r={target:this._target,first:this._first,last:this._last,visible:this._visible,fullyvisible:this._fullyvisible},n=this.index(i.first||r.first)<this.index(r.first),o=function(s){var o=[],l=[];i[s].each(function(){r[s].index(this)<0&&o.push(this)}),r[s].each(function(){i[s].index(this)<0&&l.push(this)}),n?o=o.reverse():l=l.reverse(),e._trigger(s+"in",t(o)),e._trigger(s+"out",t(l)),e["_"+s]=i[s]};for(s in i)o(s);return this}})}(jQuery,window),function(t){"use strict";t.jcarousel.fn.scrollIntoView=function(i,s,e){var r,n=t.jCarousel.parseTarget(i),o=this.index(this._fullyvisible.first()),l=this.index(this._fullyvisible.last());if((r=n.relative?n.target<0?Math.max(0,o+n.target):l+n.target:"object"!=typeof n.target?n.target:this.index(n.target))<o)return this.scroll(r,s,e);if(r>=o&&r<=l)return t.isFunction(e)&&e.call(this,!1),this;for(var a,h=this.items(),u=this.clipping(),c=this.vertical?"bottom":this.rtl?"left":"right",f=0;0!==(a=h.eq(r)).length;){if((f+=this.dimension(a))>=u){f-(parseFloat(a.css("margin-"+c))||0)!==u&&r++;break}if(r<=0)break;r--}return this.scroll(r,s,e)}}(jQuery),function(t){"use strict";t.jCarousel.plugin("jcarouselControl",{_options:{target:"+=1",event:"click",method:"scroll"},_active:null,_init:function(){this.onDestroy=t.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",t.proxy(this._create,this))},this),this.onReload=t.proxy(this._reload,this),this.onEvent=t.proxy(function(i){i.preventDefault();var s=this.options("method");t.isFunction(s)?s.call(this):this.carousel().jcarousel(this.options("method"),this.options("target"))},this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend jcarousel:scrollend",this.onReload),this._element.on(this.options("event")+".jcarouselcontrol",this.onEvent),this._reload()},_destroy:function(){this._element.off(".jcarouselcontrol",this.onEvent),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend jcarousel:scrollend",this.onReload)},_reload:function(){var i,s=t.jCarousel.parseTarget(this.options("target")),e=this.carousel();if(s.relative)i=e.jcarousel(s.target>0?"hasNext":"hasPrev");else{var r="object"!=typeof s.target?e.jcarousel("items").eq(s.target):s.target;i=e.jcarousel("target").index(r)>=0}return this._active!==i&&(this._trigger(i?"active":"inactive"),this._active=i),this}})}(jQuery),function(t){"use strict";t.jCarousel.plugin("jcarouselPagination",{_options:{perPage:null,item:function(t){return'<a href="#'+t+'">'+t+"</a>"},event:"click",method:"scroll"},_carouselItems:null,_pages:{},_items:{},_currentPage:null,_init:function(){this.onDestroy=t.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",t.proxy(this._create,this))},this),this.onReload=t.proxy(this._reload,this),this.onScroll=t.proxy(this._update,this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend",this.onReload).on("jcarousel:scrollend",this.onScroll),this._reload()},_destroy:function(){this._clear(),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend",this.onReload).off("jcarousel:scrollend",this.onScroll),this._carouselItems=null},_reload:function(){var i=this.options("perPage");if(this._pages={},this._items={},t.isFunction(i)&&(i=i.call(this)),null==i)this._pages=this._calculatePages();else for(var s,e=parseInt(i,10)||0,r=this._getCarouselItems(),n=1,o=0;0!==(s=r.eq(o++)).length;)this._pages[n]?this._pages[n]=this._pages[n].add(s):this._pages[n]=s,o%e==0&&n++;this._clear();var l=this,a=this.carousel().data("jcarousel"),h=this._element,u=this.options("item"),c=this._getCarouselItems().length;t.each(this._pages,function(i,s){var e=l._items[i]=t(u.call(l,i,s));e.on(l.options("event")+".jcarouselpagination",t.proxy(function(){var t=s.eq(0);if(a.circular){var e=a.index(a.target()),r=a.index(t);parseFloat(i)>parseFloat(l._currentPage)?r<e&&(t="+="+(c-e+r)):r>e&&(t="-="+(e+(c-r)))}a[this.options("method")](t)},l)),h.append(e)}),this._update()},_update:function(){var i,s=this.carousel().jcarousel("target");t.each(this._pages,function(t,e){if(e.each(function(){if(s.is(this))return i=t,!1}),i)return!1}),this._currentPage!==i&&(this._trigger("inactive",this._items[this._currentPage]),this._trigger("active",this._items[i])),this._currentPage=i},items:function(){return this._items},reloadCarouselItems:function(){return this._carouselItems=null,this},_clear:function(){this._element.empty(),this._currentPage=null},_calculatePages:function(){for(var t,i,s=this.carousel().data("jcarousel"),e=this._getCarouselItems(),r=s.clipping(),n=0,o=0,l=1,a={};0!==(t=e.eq(o++)).length;)n+(i=s.dimension(t))>r&&(l++,n=0),n+=i,a[l]?a[l]=a[l].add(t):a[l]=t;return a},_getCarouselItems:function(){return this._carouselItems||(this._carouselItems=this.carousel().jcarousel("items")),this._carouselItems}})}(jQuery),function(t,i){"use strict";var s,e;t.each({hidden:"visibilitychange",mozHidden:"mozvisibilitychange",msHidden:"msvisibilitychange",webkitHidden:"webkitvisibilitychange"},function(t,r){if(void 0!==i[t])return s=t,e=r,!1}),t.jCarousel.plugin("jcarouselAutoscroll",{_options:{target:"+=1",interval:3e3,autostart:!0,method:"scroll"},_timer:null,_started:!1,_init:function(){this.onDestroy=t.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",t.proxy(this._create,this))},this),this.onAnimateEnd=t.proxy(this._start,this),this.onVisibilityChange=t.proxy(function(){i[s]?this._stop():this._start()},this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy),t(i).on(e,this.onVisibilityChange),this.options("autostart")&&this.start()},_destroy:function(){this._stop(),this.carousel().off("jcarousel:destroy",this.onDestroy),t(i).off(e,this.onVisibilityChange)},_start:function(){if(this._stop(),this._started)return this.carousel().one("jcarousel:animateend",this.onAnimateEnd),this._timer=setTimeout(t.proxy(function(){this.carousel().jcarousel(this.options("method"),this.options("target"))},this),this.options("interval")),this},_stop:function(){return this._timer&&(this._timer=clearTimeout(this._timer)),this.carousel().off("jcarousel:animateend",this.onAnimateEnd),this},start:function(){return this._started=!0,this._start(),this},stop:function(){return this._started=!1,this._stop(),this}})}(jQuery,document);;
/**
 * --------------------------------------------------------------------
 * jQuery tabs plugin
 * Author: Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2009 Filament Group
 * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
 * --------------------------------------------------------------------
 */

(function ($) {

    jQuery.fn.tabsAria = function (settings) {
        //configurable options
        var o = $.extend({
            srcPath: "jQuery.history.blank.html",
            autoRotate: false,
            alwaysScrollToTop: true
        }, settings);

        return $(this).each(function () {
            //reference to tabs container
            var tabs = $(this);

            //nav is first ul
            var tabsNav = tabs.find("ul:first");

            //body is nav's next sibling
            var tabsBody = $(tabsNav.find("a:eq(0)").attr("href")).parent();

            var tabIDprefix = "tab-";

            var tabIDsuffix = "-enhanced";

            //add class to nav, tab body
            tabsNav
                .addClass("tabs-nav")
                .attr("role", "menu");

            tabsBody
                .addClass("tabs-body");

            //find tab panels, add class and aria
            tabsBody.find(">div").each(function () {
                $(this)
                    .addClass("tabs-panel")
                    .attr("role", "tabpanel")
                    .attr("aria-hidden", true)
                    .attr("aria-labelledby", tabIDprefix + $(this).attr("id"))
                    .attr("id", $(this).attr("id") + tabIDsuffix);
            });

            //set role of each tab
            tabsNav.find("li").each(function () {
                $(this)
                    .attr("role", "menuitem")
                    .attr("id", tabIDprefix + $(this).find("a").attr("href").split("#")[1]);
            });

            //switch selected on click
            tabsNav.find("a").attr("tabindex", "-1");

            //generic select tab function
            function selectTab(tab) {
                //unselect tabs
                tabsNav.find("li.tabs-selected")
                    .removeClass("tabs-selected")
                    .find("a")
                    .attr("tabindex", "-1");
                //set selected tab item
                tab
                    .attr("tabindex", "0")
                    .parent()
                    .addClass("tabs-selected");
                //unselect  panels
                tabsBody.find("div.tabs-panel-selected").attr("aria-hidden", true).removeClass("tabs-panel-selected");
                //select active panel
                $(tab.attr("href") + tabIDsuffix).addClass("tabs-panel-selected").attr("aria-hidden", false);
            }

            tabsNav.find("a")
                .click(function () {
                    selectTab($(this));
                    $(this).focus();
                    return false;
                })
                .keydown(function (event) {
                    var currentTab = $(this).parent();
                    var ret = true;
                    switch (event.keyCode) {
                        case 37://left
                            if (currentTab.prev().size() > 0) {
                                selectTab(currentTab.prev().find("a"));
                                currentTab.prev().find("a").eq(0).focus();
                                ret = false;
                            }
                            break;
                        case 38://up
                            $(".hamburger").focus();
                            ret = false;
                            break;
                        case 39: //right
                            if (currentTab.next().size() > 0) {
                                selectTab(currentTab.next().find("a"));
                                currentTab.next().find("a").eq(0).focus();
                                ret = false;
                            }
                            break;
                        case 40://down
                            $("div.tabs-panel-selected").find("li:first a").focus();
                            ret = false;
                            break;
                        case 36: //home key
                            selectTab(tabsNav.find("li:first a"));
                            tabsNav.find("li:first a").eq(0).focus();
                            ret = false;
                            break;
                        case 35://end key
                            selectTab(tabsNav.find("li:last a"));
                            tabsNav.find("li:last a").eq(0).focus();
                            ret = false;
                            break;
                    }
                    return ret;
                });

            //if tabs are rotating, stop them upon user events
            tabs.bind("click keydown focus", function () {
                if (o.autoRotate) {
                    clearInterval(tabRotator);
                }
            });

            //function to select a tab from the url hash
            function selectTabFromHash(hash) {
                var currHash = hash || window.location.hash;
                var hashedTab = tabsNav.find("a[href=\"#" + currHash.replace("#", "") + "\"]");
                if (hashedTab.size() > 0) {
                    selectTab(hashedTab, true);
                }
                else {
                    selectTab(tabsNav.find("a:first"), true);
                }
                //return true/false
                return !!hashedTab.size();
            }

            //set tab from hash at page load, if no tab hash, select first tab
            selectTabFromHash(null, true);

            //auto rotate tabs
            if (o.autoRotate) {
                var tabRotator = setInterval(function () {
                    var currentTabLI = tabsNav.find("li.tabs-selected");
                    var nextTab = currentTabLI.next();
                    if (nextTab.length) {
                        selectTab(nextTab.find("a"), false);
                    }
                    else {
                        selectTab(tabsNav.find("a:first"), false);
                    }
                }, o.autoRotate);
            }

            if (o.alwaysScrollToTop) {
                $(window)[0].scrollTo(0, 0);
            }
        });
    };

})(jQuery);
;
/*
 * Helper functions to enable quicktabs to Responsive select/ Dropdown.
 */

Drupal.fcc = Drupal.fcc || {};
Drupal.fcc.quickTabs = Drupal.fcc.quickTabs || {};

Drupal.fcc.quickTabs = {
  /**
   * Returns a select obj with options.
   * @param {$} jQuery Object.
   */
  BuildSelect: function($) {
    $select = $('<select/>');
    // Append options into a select
    $select.append(this.BuildOptions($, "ul.quicktabs-tabs"));
    return $select;
  },

  /**
   * Returns an option obj.
   * @param {$} jQuery Object.
   * @param {el} String.
   */
  BuildOptions: function($, el) {
    var $nav = $(el);
    var options = '';
    $nav
      .addClass('__')
      .find('a')
      .each(function (i) {
        var linkTypeClass = ($(this).hasClass("skip-tabs") ? 'class="skip-tabs" href="' + $(this).attr("href")  +'"' : '');
        options += '<option '+ linkTypeClass +' value="qt-' + i + '">';
        options += $(this).text() + '</option>';
      });
    return options;
  },

  /**
   * Return a string formatted as an ID.
   * @param {num} number
   */
  tabPageRef: function(num) {
    return "#quicktabs-tabpage-leadership_tabs-" + num;
  },

  /**
   * @param {$} the jQuery object.
   * @param {el} String
   */
  selectChange: function($, el) {
    if (el.hasClass("skip-tabs")) {
      window.location.href = el.attr("href");
    } else {
      this.changeTabBody($, el);
    }
  },

  /**
   * @param {$} the jQuery object.
   * @param {el} String
   */
  changeTabBody: function($, el) {
    var currentId = $(el).val().replace("qt-", "");
    $(".quicktabs-tabpage").addClass("quicktabs-hide");
    $(this.tabPageRef(currentId)).removeClass("quicktabs-hide");
  },

  /**
   * Return a string
   * @param {idStr} String
   */
  getTabId: function(idStr) {
    return idStr.replace("quicktabs-tab-events_tabs-", "");
  }
}
;
Drupal.fcc = Drupal.fcc || {};
Drupal.fcc.genericCarousel = Drupal.fcc.genericCarousel || {};

Drupal.fcc.genericCarousel = {
  el: "",
  activate: function($, el) {
    this.el = el,
    $(this.el).parent().addClass("jcarousel-wrapper");
    $(this.el).addClass("jcarousel");
    /* This makes each slide width responsive. */
    $(this.el)
      .on("jcarousel:create jcarousel:reload", function () {
        var element = $ (this),
            width = element.innerWidth();
        element.jcarousel("items").css("width", width + "px");
      })
      .jcarousel();

    /* Add functionality to next and previous */
    $(this.el).parent().find('.jcarousel-control-prev')
      .on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
      })
      .jcarouselControl({
        target: '-=1',
        carousel: $(this.el)
      });
    $(this.el).parent().find('.jcarousel-control-next')
      .on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
      })
      .jcarouselControl({
        target: '+=1',
        carousel: $(this.el)
      });
  },
  deactivate: function($, el) {
    this.el = el,
    $(this.el).parent().removeClass("jcarousel-wrapper");
    $(this.el).removeClass("jcarousel");
  }
}
;
/*! Sidr - v1.2.1 - 2013-11-06
 * https://github.com/artberri/sidr
 * Copyright (c) 2013 Alberto Varela; Licensed MIT */
(function(e){var t=!1,i=!1,n={isUrl:function(e){var t=RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i");return t.test(e)?!0:!1},loadContent:function(e,t){e.html(t)},addPrefix:function(e){var t=e.attr("id"),i=e.attr("class");"string"==typeof t&&""!==t&&e.attr("id",t.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-id-$1")),"string"==typeof i&&""!==i&&"sidr-inner"!==i&&e.attr("class",i.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-class-$1")),e.removeAttr("style")},execute:function(n,s,a){"function"==typeof s?(a=s,s="sidr"):s||(s="sidr");var r,d,l,c=e("#"+s),u=e(c.data("body")),f=e("html"),p=c.outerWidth(!0),g=c.data("speed"),h=c.data("side"),m=c.data("displace"),v=c.data("onOpen"),y=c.data("onClose"),x="sidr"===s?"sidr-open":"sidr-open "+s+"-open";if("open"===n||"toggle"===n&&!c.is(":visible")){if(c.is(":visible")||t)return;if(i!==!1)return o.close(i,function(){o.open(s)}),void 0;t=!0,"left"===h?(r={left:p+"px"},d={left:"0px"}):(r={right:p+"px"},d={right:"0px"}),u.is("body")&&(l=f.scrollTop(),f.css("overflow-x","hidden").scrollTop(l)),m?u.addClass("sidr-animating").css({width:u.width(),position:"absolute"}).animate(r,g,function(){e(this).addClass(x)}):setTimeout(function(){e(this).addClass(x)},g),c.css("display","block").animate(d,g,function(){t=!1,i=s,"function"==typeof a&&a(s),u.removeClass("sidr-animating")}),v()}else{if(!c.is(":visible")||t)return;t=!0,"left"===h?(r={left:0},d={left:"-"+p+"px"}):(r={right:0},d={right:"-"+p+"px"}),u.is("body")&&(l=f.scrollTop(),f.removeAttr("style").scrollTop(l)),u.addClass("sidr-animating").animate(r,g).removeClass(x),c.animate(d,g,function(){c.removeAttr("style").hide(),u.removeAttr("style"),e("html").removeAttr("style"),t=!1,i=!1,"function"==typeof a&&a(s),u.removeClass("sidr-animating")}),y()}}},o={open:function(e,t){n.execute("open",e,t)},close:function(e,t){n.execute("close",e,t)},toggle:function(e,t){n.execute("toggle",e,t)},toogle:function(e,t){n.execute("toggle",e,t)}};e.sidr=function(t){return o[t]?o[t].apply(this,Array.prototype.slice.call(arguments,1)):"function"!=typeof t&&"string"!=typeof t&&t?(e.error("Method "+t+" does not exist on jQuery.sidr"),void 0):o.toggle.apply(this,arguments)},e.fn.sidr=function(t){var i=e.extend({name:"sidr",speed:200,side:"left",source:null,renaming:!0,body:"body",displace:!0,onOpen:function(){},onClose:function(){}},t),s=i.name,a=e("#"+s);if(0===a.length&&(a=e("<div />").attr("id",s).appendTo(e("body"))),a.addClass("sidr").addClass(i.side).data({speed:i.speed,side:i.side,body:i.body,displace:i.displace,onOpen:i.onOpen,onClose:i.onClose}),"function"==typeof i.source){var r=i.source(s);n.loadContent(a,r)}else if("string"==typeof i.source&&n.isUrl(i.source))e.get(i.source,function(e){n.loadContent(a,e)});else if("string"==typeof i.source){var d="",l=i.source.split(",");if(e.each(l,function(t,i){d+='<div class="sidr-inner">'+e(i).html()+"</div>"}),i.renaming){var c=e("<div />").html(d);c.find("*").each(function(t,i){var o=e(i);n.addPrefix(o)}),d=c.html()}n.loadContent(a,d)}else null!==i.source&&e.error("Invalid Sidr Source");return this.each(function(){var t=e(this),i=t.data("sidr");i||(t.data("sidr",s),"ontouchstart"in document.documentElement?(t.bind("touchstart",function(e){e.originalEvent.touches[0],this.touched=e.timeStamp}),t.bind("touchend",function(e){var t=Math.abs(e.timeStamp-this.touched);200>t&&(e.preventDefault(),o.toggle(s))})):t.click(function(e){e.preventDefault(),o.toggle(s)}))})}})(jQuery);;
(function($) {

  window.modResponsiveDesktop = {

    menuItemsFeatured: [],
    menuItemsNormal: [],
    counter: 0, // Use to avoid multiple instantiations.

    config: {
      tree: "ul.accessible-megamenu",
      topNavItem: ".accessible-megamenu-top-nav-item",
      panel: ".accessible-megamenu-panel",
      panelGroup: ".accessible-megamenu-panel-group",
      tabBlocks: "#block-fcc-blocks-browse-by",
      cols: [3, 3, 2, 3, 3, 2], // Total columns per section.
    },

    init: function(mq) {
      var that = this;
      if (mq.matches) {
        modResponsiveDesktop.counter = modResponsiveDesktop.counter + 1;
        $.sidr('close', 'sidr');
        modResponsiveDesktop.buildFeaturedItems();
        modResponsiveDesktop.reset();
        modResponsiveDesktop.setDropdownTop();
        modResponsiveDesktop.addSpan();
        if (modResponsiveDesktop.counter < 2) {
          modResponsiveDesktop.allDropdowns();
        }
      }
    },

    setDropdownTop: function() {
      var that = this;
      $(window).scroll(function() {
        $(that.config.panel).removeClass("open");
      });
    },

    addSpan: function() {
      // Used for styling the title text.
      $(this.config.topNavItem + " > a").wrapInner("<span class='link-title'>");
    },

    reset: function() {
      $(this.config.topNavItem).removeClass("js-hide");
      this.moveTabsBackToHeaderRegion();
      this.moveNavigationBackToHeader();
      $(".accessible-megamenu-panel").removeClass("js-hide").show();
     if ($(".nav-helper-back").length > 0) {
       $(".nav-helper-back").remove();
     }
      $("#browse-by .tabs-selected").removeClass("panel-open");
    },

    allDropdowns: function() {
      var $panel = $(this.config.panel);
      $panel.each(function(index) {
        // Saved data queries.
        if ($(this).hasClass("licensing-databases")) {
          // Use show-only-megamenu-desktop to distinguish databases.
          modResponsiveDesktop.menuItemsNormal[index] = $(this)
            .find("li.menu__item").not(":has(a.menu__link[show-only-megamenu-desktop=1])")
            .clone();
          modResponsiveDesktop.menuItemsFeatured[index] = $(this)
            .find("li.menu__item").has("a.menu__link[show-only-megamenu-desktop=1]")
            .clone();
        } else {
          modResponsiveDesktop.menuItemsNormal[index] = $(this)
            .find("li.menu__item")
            .not(":has(a.menu__link[data-featured-item=1])")
            .clone();
          modResponsiveDesktop.menuItemsFeatured[index] = $(this)
            .find("li.menu__item")
            .has("a.menu__link[data-featured-item=1]")
            .clone();
        }

        $(this).prepend(modResponsiveDesktop.singleDropdown(this, index));
      });
      /* Hide the original panel and all it's items. */
      $(this.config.panelGroup).hide();
    },

    singleDropdown: function(el, index) {
      var layoutType = "js-columns col-"+ modResponsiveDesktop.config.cols[index] + "-layout";
      var $outerWrapper = $('<ul class="'+ layoutType  +'"/>');

      // Normal cols per dropdown is the total column count minus a column for featured items when they exist.
      var normalColsPerDropdown =  (this.config.cols[index] - (this.menuItemsFeatured[index].length > 0 ? 1 : 0) );
      var itemsPerNormalCol =  Math.ceil(this.menuItemsNormal[index].length / normalColsPerDropdown);
      var menuItemsNormalGroupedByCol = _.groupBy(this.menuItemsNormal[index], function(element, i){
        return Math.floor(i/itemsPerNormalCol);
      });
      // Add _.toArray this to convert the returned object to an array.
      return $outerWrapper.append(
        this.renderNormalCols(el, _.toArray(menuItemsNormalGroupedByCol))
          .concat(this.renderFeaturedCol(index, (normalColsPerDropdown)))
      );
    },

    renderNormalCols: function(el, menuItemsNormalGroupedByCol) {
      if (menuItemsNormalGroupedByCol.length) {
        return _.map(menuItemsNormalGroupedByCol, function(group, index) {
          var wrapper = $("<div>").addClass("normal-items col").addClass("col-"+ (index + 1));
          return wrapper.append(group);
        });
      }
    },

    renderFeaturedCol: function(index, offset) {
      if (this.menuItemsFeatured[index].length) {
        var wrapper = $("<div>").addClass("featured-items col").addClass("col-"+ (offset + 1));
        return  wrapper.append(this.menuItemsFeatured[index]);
      }
      return "";
    },

    buildFeaturedItems: function() {
      var subTitle, featuredEls;
      // Hide featured items from all menus apart from the desktop.
      $("ul:not(.accessible-megamenu, ul.accessible-megamenu-panel-group) > li > a[data-featured-item=1]").parent("li").hide();

      // Add Sub-title meta information to to some featured items.
      featuredEls = $(this.config.panelGroup).find("li.menu__item > a.menu__link[data-featured-item=1]");
      if (featuredEls.length > 0) {
        wrapWithTitleEmphasis($, featuredEls, "title-emphasis");
        featuredEls.each(function() {
          if (typeof $(this).data("subTitle") != 'undefined' &&  $(this).data("subTitle").length > 0) {
            $(this).append($(this).data("subTitle"));
          }
        });
      }
    },

    moveTabsBackToHeaderRegion: function() {
      var tabBlocks = $("#sidr").find(modResponsiveDesktop.config.tabBlocks);
      if (tabBlocks.length === 1) {
        $("#page header .header__region").prepend($(modResponsiveDesktop.config.tabBlocks));
      }
    },

    moveNavigationBackToHeader: function() {
      var navigationInSidr = $("#sidr").find("#navigation");
      var navigationInPage = $("#page").find("#navigation");
      if (navigationInSidr.length === 1 && navigationInPage.length === 0) {
        $("#page > header").after($("#navigation"));
      }
    }
  }

})(jQuery);
;
(function($) {

window.modResponsive = {
  config: {
    bpLarge1: 992,
    tree: "ul.accessible-megamenu",
    topNavItem: ".accessible-megamenu-top-nav-item",
    panel: ".accessible-megamenu-panel",
    panelGroup: ".accessible-megamenu-panel-group",
    topNavItem: ".accessible-megamenu-top-nav-item"
  },

  init: function(mq) {
    if (mq.matches) {
      modResponsive.setUpNavHelper();
      modResponsive.setUpTree();
      modResponsive.setUpEvents();
      modResponsive.keyboardEvents();
      modResponsive.navigationSlider();
      modResponsive.browseBy();
      modResponsive.burger();
    }
  },

  setUpNavHelper: function() {
    // Nav Helper added dynamically with JavaScript.
    var navHelperText = Drupal.t("Back to categories");
    var navHelperTextNode = document.createTextNode(navHelperText);
    this.navHelperNode = document.createElement("li");
    this.navHelperNode.appendChild(navHelperTextNode);
    $(this.navHelperNode).addClass("nav-helper-back");
  },

  setUpTree: function() {
    tree = $(this.config.tree);
    // add role and class of tree
    tree.attr({"role": "tree"}).addClass("tree");
    // set first node"s tabindex to 0
    tree.find("a:eq(0)").attr("tabindex", "0");
    // set all others to -1
    tree.find("a:gt(0)").attr("tabindex", "-1");
    // add group role and tree-group-collapsed class to all ul children
    tree.find("ul").attr("role", "group").addClass("tree-group-collapsed");
    // add treeitem role to all li children
    tree.find("li").attr("role", "treeitem");
    // find tree group parents
    tree.find("li:has(ul)")
      .attr("aria-expanded", "false")
      .find("> div")
      .addClass("tree-parent tree-parent-collapsed");
  },

  setUpEvents: function() {
    $(this.config.topNavItem + "> a").on("click", function(event) {
      var target = $(event.target);
      target.trigger("showPanel");
      event.preventDefault();
    });

    $(this.navHelperNode).on("click", function(event) {
      var target = $(event.target);
      target.trigger("hidePanel");
      event.preventDefault();
    });

    // bind events.
    tree.on("showPanel", function(event) {
      var target = $(event.target) || tree.find("a[tabindex=0]");
      if (target.parents("li").find(modResponsive.config.panel).children().length > 0) { // Contains menu items.
        var subMenu = target.parents("li").find(modResponsive.config.panel);
        var restOfTopNav = target.parents("li").siblings();
        modResponsive.showSubMenu(subMenu);
        modResponsive.addNavHelper(subMenu);
        restOfTopNav.addClass("js-hide");
        modResponsive.hideSelectedMenuItem(target);
      }
      if (target.parents("li")) {
        target.next().find("a").eq(0).focus();
      }
    });

    tree.on("hidePanel", function(event) {
      var target = $(event.target) || tree.find("a[tabindex=0]");
      var subMenu = target.parents("li").find(modResponsive.config.panel);
      modResponsive.hideSubMenu(subMenu);
      modResponsive.removeNavHelper(subMenu);
      modResponsive.showAllTopNav();
      target.parents("li.accessible-megamenu-top-nav-item").find("a").eq(0).focus();
    });

    tree.on("traverseDown", function(event) {
      var target = $(event.target) || tree.find("a[tabindex=0]");
      var targetLi = target.parent();
      if(targetLi.next().length) {
        targetLi.next().find("a").eq(0).focus();
      }
    });
    tree.on("traverseUp", function(event) {
      var target = $(event.target) || tree.find("a[tabindex=0]");
      var targetLi = target.parent();
      if(targetLi.prev().length) {
        targetLi.prev().find("a").eq(0).focus();
      }
      else {
        $(".tabs-selected > a").focus();
      }
    });
  },

  showSubMenu: function(subMenu) {
    subMenu.css("display", "block");
    $("#browse-by .tabs-selected").addClass("panel-open");
  },

  addNavHelper: function(subMenu) {
    var el;
    if ($("ul.js-columns").length < 1) {
      el = modResponsive.config.panelGroup;
    } else {
      el = "ul.js-columns";
    }
    subMenu.find(el).prepend(modResponsive.navHelperNode);
  },

  hideSubMenu: function(subMenu) {
    subMenu.addClass("js-hide").hide();
    $("#browse-by .tabs-selected").removeClass("panel-open");
  },

  removeNavHelper: function(subMenu) {
     modResponsive.navHelperNode.remove();
  },

  showAllTopNav: function() {
    $(modResponsive.config.topNavItem).find("a").removeClass("js-hide-menu-item");
    $(modResponsive.config.topNavItem).removeClass("js-hide");
  },

  hideSelectedMenuItem: function(item) {
     item.addClass("js-hide-menu-item");
  },

  keyboardEvents: function() {
    tree
      .focus(function(event){
        //deactivate previously active tree node, if one exists
        tree.find("[tabindex=0]").attr("tabindex", "-1").removeClass("tree-item-active");
        //assign 0 tabindex to focused item
        $(event.target).attr("tabindex", "0").addClass("tree-item-active");
      })
      .keydown(function(event) {
        var target = tree.find(event.target);
        // Left arrow
        if (event.keyCode === 37){
          target.trigger("hidePanel");
        }
        // Right arrow
        if (event.keyCode === 39){
          target.trigger("showPanel");
        }
        //if key is down arrow or tab
        if (event.keyCode === 40 || event.keyCode === 9){
          target.trigger("traverseDown");
        }
        //if key is up arrow or shift tab move back up the list.
        if (event.keyCode === 38 || (event.keyCode === 9 && event.shiftKey)){
          target.trigger("traverseUp");
        }
        // Spacebar or enter key was pressed.
        if (event.keyCode === 13 || event.keyCode === 32) {
          if (target.parent("li.accessible-megamenu-top-nav-item").length) {
            target.trigger("showPanel");
          }
          if (target.parents(".accessible-megamenu-panel").length) {
            if (target.attr("href")) {
              window.location.href = target.attr("href");
            }
          }
        }
        return false;
      });
  },

  navigationSlider: function () {
    // Add a container for the slider, and append to the DOM.
    var navSlider = document.createElement("div");
    modResponsive.$navSlider = $(navSlider)
      .addClass("navigation-slider")
      .attr("id", "sidr");
    modResponsive.$tabBlocks = $("#block-fcc-blocks-browse-by");
    $("#navigation").prependTo(modResponsive.$navSlider);
    modResponsive.$tabBlocks.prependTo(modResponsive.$navSlider);
    $('.hamburger').sidr({
      "side": "right"
    });
     ;
      $("#sidr").prepend(modResponsive.$navSlider);
  },

  pointerPosition: function() {
    var tabSelected = $("#browse-by li.tabs-selected");
    tabSelected.find(".pointer").css("top", this.calculateTabHeight(tabSelected) + "px");
  },

  burger: function() {
    var burger = $("a.hamburger");
    burger.click(function() {
      this.pointerPosition();
    }.bind(modResponsive));

    burger.keydown(function(event) {
      // Enter Key.
      var target = $(event.target);
      if (event.keyCode === 9){
        target.trigger("tabFocus");
      }
    });
    burger.on("tabFocus", function() {
      var tab = $("#browse-by > li > a");
      if (tab.length) {
        tab.eq(0).focus();
      }
    });
  },

  browseBy: function() {
    var tab = $("#browse-by li a");
    tab.click(function() {
      this.pointerPosition();
    }.bind(modResponsive));
  },

  calculateTabHeight: function(tab) {
    return tab.height() - 12;
  }
}

})(jQuery);
;
(function($) {


window.fccSearch = {
  init: function(mq) {
    var searchBlock = $("#header #block-block-1");
    var magnifyingGlass =  $("#header #block-fcc-blocks-search-magnifying-glass");

    if (mq.matches) { // Mobile/Tablet.
      searchBlock.hide();

      searchBlock.on("magFired", function() {
        $(this).toggle();
        $(this).addClass("js-searchbox-expanded");
        $(this).css("top", "0").animate({
          top: $("header").css("height")
        }, "slow", function() {
          $(this).find("input.form-text").focus();
        });
      });

      magnifyingGlass.on("click", function(){
        event.preventDefault();
        searchBlock.trigger("magFired");
      });

    } else { // Desktop
      searchBlock.off("magFired");
      searchBlock.css("display", "block");
      searchBlock.removeClass("js-searchbox-expanded");
    }
  },
}
})(jQuery);
;
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});
;
/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function ($, Drupal, window, document, undefined) {

  var bpLarge1 = 992;
  var bpSmall2 = 476;
  var bpMedium = 720;
  var windowWidth = $(window).width();

  $(function () {
    $("#block-fcc-blocks-browse-by > div.item-list").tabsAria({"trackstate": false});

    // Hide designated links on both mobile and desktop in non mega menu.
    $("ul:not(.accessible-megamenu, .accessible-megamenu ul)")
      .find("li > a[show-only-megamenu-desktop=1]")
      .parent("li").addClass("fcc-hide-mobile fcc-hide-desktop");

    // Hide "Show only megamenu desktop" links in the responsive menu for mobile.
    $("ul.accessible-megamenu").find("li > a[show-only-megamenu-desktop=1]")
      .parent("li").addClass("fcc-hide-mobile");

    // Setup Media Queries:
    mobileAndTablet = window.matchMedia("(max-width: 991px)");
    desktopAndUp = window.matchMedia("(min-width: 992px)");
    mobileToMidTablet = window.matchMedia("(max-width: 768px)");
    mobileAndTablet.addListener(modResponsive.init);
    desktopAndUp.addListener(modResponsiveDesktop.init);
    mobileToMidTablet.addListener(fccSearch.init);
    // Pass in the object; used to detect transitions.
    modResponsiveDesktop.init(desktopAndUp);
    modResponsive.init(mobileAndTablet);
    fccSearch.init(mobileToMidTablet);

    //Show non-federated User login form when link is clicked
    $('.page-user.not-logged-in .tabs-primary, .page-user.not-logged-in form#user-login, #display-okta-button').hide();
    $('#display-log-in-form').click(function(e){
      e.preventDefault();

      $('.page-user.not-logged-in form#user-login').show();
      $('#block-simplesamlphp-auth-0').hide();
      $('#display-okta-button').show();

      $(this).hide();
    });

    $('#display-okta-button').click(function(e){
      e.preventDefault();

      $('.page-user.not-logged-in form#user-login').hide();
      $('#block-simplesamlphp-auth-0').show();
      $('#display-log-in-form').show();

      $(this).hide();
    });

    $('.jquery-ui-filter .ui-tabs-paging button').click(function scrollToTabs(evt) {
      'use strict';
      $('html, body').animate({
        scrollTop: $('.jquery-ui-filter').offset().top
      }, 'fast');
    });
  });

  // Headlines Attachments Animation
  Drupal.behaviors.headlinesAnimation = {
    attach: function(context) {
      var headline = $("article.node-edoc");
      var attachments = $(".edoc-attachments", headline);

      function hideAttachments() {
        $(attachments).each(function() {
          hideLink = $('<a>',{
            text: '< See Headline',
            title: 'See Headline',
            href: '#',
            click: function(){
              $(this).parents('.edoc-attachments').hide();
              $(this).parent().siblings('.edoc-details').show("slide", { direction: "right" }, "100");

              return false;
            }
          });

          $(this).append(hideLink);

          // Set list of attachments to hidden initially
          $(this).hide();

          // Add link to show attachments
          showLink = $('<a>',{
            text: 'Related Materials >',
            title: 'View Related Documents',
            href: '#',
            click: function(){
              // Hide initial content, show attachments
              $(this).parents('.edoc-details').hide();
              $(this).parent().siblings('.edoc-attachments').show("slide", { direction: "left" }, "100");
              return false;
            }
          });
          $(this).siblings('.edoc-details').append(showLink);

        });
      }

      $(window).load(hideAttachments);
    }
  };

  Drupal.behaviors.accessibility = {
    attach: function (context) {
      var obj = $("#edit_items_per_page_chosen > div > div > input");
      obj.wrap("<label></label>");

      $('.ui-tabs .ui-tabs-paging .ui-button .ui-button-text').each(function(){$(this).attr('title',this.textContent);});
    }
  };

  // The bureaus and offices menu
  Drupal.behaviors.bureausAndOfficesNavMenu = {
    attach: function(context) {
      // Setup
      var obj = $(".block-menu-bureaus-and-offices ul.menu");

      obj.find("a:eq(0)").attr("tabindex", "0");
      // set all others to -1
      obj.find("a:gt(0)").attr("tabindex", "-1");

      // event handling
      var traverseDown = function(event) {
        var target = $(event.target) || obj.find("a[tabindex=0]");
        var targetLi = target.parent();
        if(targetLi.next().length) {
          targetLi.next().find("a").eq(0).focus();
        }
      };

      var traverseUp = function(event) {
        var target = $(event.target) || obj.find("a[tabindex=0]");
        var targetLi = target.parent();
        if(targetLi.prev().length) {
          targetLi.prev().find("a").eq(0).focus();
        }
        else {
          $(".tabs-selected > a").eq(0).focus();
        }
      };

      // Native events
      obj.keydown(function(event) {
        //if key is up arrow
        if (event.keyCode === 38){
          traverseUp(event);
        }
        //if key is down arrow
        if (event.keyCode === 40){
          traverseDown(event);
        }
      });

      obj.focus(function(event){
        //deactivate previously active obj node, if one exists
        obj.find("[tabindex=0]").attr("tabindex", "-1").removeClass("obj-item-active");
        //assign 0 tabindex to focused item
        $(event.target).attr("tabindex", "0").addClass("obj-item-active");
      });
    }
  };

// fullWidth is used for an element to fit full browser width when it's wrapped in fixegd width container. Use class: network-background to apply behaviour
Drupal.behaviors.fullWidth = {
  attach: function() {
    function fullWidth() {
      var fullWidthElement = $(".network-background");
      var browserWidth = $("body").width();
      var insideBoxWidth = fullWidthElement.width();
      var spaceFix = ((browserWidth - insideBoxWidth)/2) + "px";

      fullWidthElement.css({
        "margin-left": "-" + spaceFix,
        "padding-left": spaceFix,
        "margin-right": "-" + spaceFix,
        "padding-right": spaceFix
      });
    }
     $(window).resize(fullWidth);
     $(window).load(fullWidth);
   }
 };

 // selectLabel is used to change the default value of a select
Drupal.behaviors.selectLabel = {
  attach: function() {
    function selectLabel() {
      $('.form-elements .views-widget-filter-field_event_type_tid option[value="All"]').html("Event Type");
      $('.form-elements .views-widget-filter-og_user_node_target_id option[value="All"]').html("Bureaus & Offices");
      $('.form-elements .form-item-field-dates-value-value-year [value=""]').html("Year");
    }
    $(window).load(selectLabel);
  }
};

  /* Inserts js for the search form. */
  Drupal.behaviors.searchSubmit = {
    attach: function () {

      var baseUrl = $('#search-block-form').attr("action");

      $("form#search-block-form").submit(function(e) {
        var query = $('#edit-search-block-form--2').val();
        var htmlQuery = encodeURIComponent($.trim(query)).replace(/'/g, '%27');
        location.href = baseUrl+'#q='+htmlQuery;
        return false;
      });
    }
  }


  /*
   * Convert the leadership tabs to a select dropdown for small screens.
   */
  Drupal.behaviors.quicktabsResponsiveSelect = {
    attach: function() {
      if (windowWidth < bpMedium) {
        var quickTabsUl = ".node-type-leadership #quicktabs-leadership_tabs ul.quicktabs-tabs";
        $quickTabsUl = $(quickTabsUl);

        // Append additional links field
        var additionalLinks = $('#leadership-external-links li');
        additionalLinks.find("a").addClass("skip-tabs");
        $quickTabsUl.append(additionalLinks);
        var $select = Drupal.fcc.quickTabs.BuildSelect($, quickTabsUl);
        $($quickTabsUl.parent()).after($select);
        $select.parent().addClass("form-type-select");
        $quickTabsUl.hide();
        $select.change(function() {
          var optionSelected = $(this).find("option:selected");
          Drupal.fcc.quickTabs.selectChange($, optionSelected);
        });
      }
    }
  }

  /*
   * Respond to a click on that events quick tabs.
   */

  Drupal.behaviors.quicktabsEventTypeDisplay = {
    attach: function(context, settings) {
      var tabId;
      var el = $("#quicktabs-events_tabs", context);
      var allEventsEls = $(
        "#views-exposed-form-events-panel-pane-1,.pane-custom,pane-1,.pane-views-exp-events-panel-pane-1", context);
      var exposedYear = $("#views-exposed-form-events-panel-pane-4", context);
      var open_comm = $('.pane-views-exp-events-panel-pane-8', context);

      var redrawUi = function() {
        exposedYear.hide();
        open_comm.hide();
      };

      if(el.length > 0) {
        redrawUi();
        el.find("a").click(function() {
          tabId = Drupal.fcc.quickTabs.getTabId($(this).attr("id"));
          if(tabId === "0") {
            allEventsEls.show();
            exposedYear.hide();
            open_comm.hide();
          }
          else if(tabId === "1") {
            allEventsEls.hide();
            exposedYear.show();
            open_comm.show();
          }
          else {

          }
        })
      }
    }
  }

  Drupal.behaviors.leadershipCarousel = {
    attach: function(context, settings) {
      $(window).on("resize load", function() {
        windowWidth = $(window).width();
        if (windowWidth < bpSmall2 ) {
          Drupal.fcc.genericCarousel.activate($, ".view-leadership-page.view-display-id-homepage");
        }
        else {
          Drupal.fcc.genericCarousel.deactivate($, ".view-leadership-page.view-display-id-homepage");
        }
      });
    }
  }

  Drupal.behaviors.genericCarousel = {
    attach: function(context, settings) {
      Drupal.fcc.genericCarousel.activate($, "#strategic-plan-carousel");
    }
  }

  Drupal.behaviors.jqueryUiTabs = {
    attach: function(context, settings) {
      $("#tabs").tabs();
      $("#statements-tabs").tabs();
      $("#speeches-tabs").tabs();
      $("#testimony-tabs").tabs();
    }
  }

  /*
   * Hide the first, up and coming,
   * event on the Events commission page,
   * when not on the first AJAXed page.
   */
  Drupal.behaviors.openCommissionMeetings = {
    attach: function(context, settings) {
      var el = $("body.page-news-events-events-open-commission-meetings ul.pager li.pager-item").first();
      var singleCommissionEvent = $(".view-events.view-display-id-panel_pane_3")
      if (!el.hasClass("pager-current")) {
        singleCommissionEvent.addClass("js-hide");
      } else {
        singleCommissionEvent.removeClass("js-hide");
      }
    }
  }


  // Placing this in a behavior would mean that it loaded after the library it needs to alter has already run.
  if (Drupal.jQueryUiFilter !== "undefined" &&
      Drupal.jQueryUiFilter.accordionOptions !== "undefined" &&
      Drupal.jQueryUiFilter.accordionOptions.jQueryUiFilter != "undefined" ) {
    // We might want to also check for the autoHeight option being set to true,
    // as the below should only apply when it is set to false. However, loading order means that autoHeight gets set afterwards.
    Drupal.jQueryUiFilter.accordionOptions.heightStyle = "content";
  }

  Drupal.behaviors.headlinesTitle = {
    attach: function(context, settings) {
      if ($('body').hasClass('page-news-events-headlines-')) {
        $('.page-news-events-headlines- .page_header_container h1#page-title').text($('.section--left-80 h2.pane-title').text());
        $('.section--left-80 h2.pane-title').remove();
      }
    }
  }

  // Adds functionality to display extra links in Access Now block
  Drupal.behaviors.showMoreAccessNow = {
    attach: function (context, settings) {
      if ($('body').hasClass('page-home')) {
        var container = $('.section--block--homepage');
        var a_tag = '<a class="read-more pull-right show-more" href="#">See More </a>'
        var main_wrapper = container.find('> .pane-access-now');
        var content_wrapper = container.find('.view-access-now');
        var footer = container.find('.view-display-id-block.access-now > .view-footer');
        var content = container.find('.view-display-id-block.access-now > .view-content');
        var block_2 = container.find('> .box--consumer.pane-views');

        container.find('> .pane-access-now > .pane-inner').prepend(a_tag);

        $('.read-more', container).click(function (e) {
          e.preventDefault();

          if (main_wrapper.hasClass('col-12')) {
            main_wrapper.removeClass('col-12').addClass('col-6');
            block_2.toggle();
            content.removeClass('col-6');
            content_wrapper.removeClass('row');
            footer.removeClass('col-6').toggle();
            $(this).text('See More');
          }
          else {
            content_wrapper.addClass('row');
            footer.addClass('col-6').toggle();
            block_2.toggle();
            main_wrapper.addClass('col-12').removeClass('col-6');
            content.addClass('col-6');
            $(this).text('See Less');
          }

          return false;
        });
      }
    }
  }

  // Menu in-page effect for mobiles.
  Drupal.behaviors.menuCollapsible = {
    attach: function(context, settings) {
      setInterval(function () {
        if (windowWidth < 465 ) {
          $('.menu__sidebar h4.block__title').addClass('collapsible');
        }
        else {
          $('.menu__sidebar h4.block__title').removeClass('collapsible');
          $('.menu__sidebar h4.block__title').removeClass('expanded');
          $('.menu__sidebar h4.block__title').parent().find('.menu-block-wrapper ul.menu').show();
        }
      }, 500);
      $('.menu__sidebar h4.block__title').click(function () {
        if (windowWidth < 465 ) {
          $(this).toggleClass('expanded');
          $(this).parent().find('.menu-block-wrapper ul.menu').slideToggle();
        }
      });
    }
  }

  // Toggle eas application correspondence visibility.
  Drupal.behaviors.collapseCorrespondence = {
    attach: function(context, settings) {
      $('table.collapsible tr.main').click(function(){
        $(this).toggleClass('show');
        $(this).next('table.collapsible tr.details').toggleClass('show');
      });
    }
  }

  Drupal.behaviors.toggleApplication = {
    attach: function(context, settings) {
      if ($('body').hasClass('page-eas-fccid')) {

        var hash = window.location.hash;

        if(hash){
          hash = hash.substring(1, hash.length);
        }else{
          hash = $('.slick-carousel li:first-of-type').data('tabId');
        }

        $('ul.slick-carousel li[data-tab-id="' + hash + '"').addClass('selected');
        $('#' + hash).addClass('active');

        $(window).one('scroll', function () {
          window.scrollTo(0, 0);
        })

        $('#fcc-eas-tabs .slick-carousel li').on('click', function () {

          //Prevent anchor jump
          var y = window.pageYOffset;
          $(window).one('scroll', function () {
            window.scrollTo(0, y);
          })

          //Disable current active
          $('#fcc-eas-tabs .slick-carousel li').each(function() {
            $(this).removeClass('selected');
          });
          $('#fcc-eas-tabs section.fcc-eas-grant').each(function() {
            $(this).removeClass('active');
          });

          //Get ID to activate
          var itemId = $(this).data('tabId');

          //Enable
          $(this).addClass('selected');
          $('#' + itemId).addClass('active');

          //Add hash to url
          location.hash = itemId;

        });
      }
    }
  };

  Drupal.behaviors.dailyDigestYearFilter = {
    attach: function(context, settings) {

      var container = $('ul.slick-carousel');

      container.slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        prevArrow: '<span class="prevArrow"><i class="fa fa-arrow-circle-left"></i></span>',
        nextArrow: '<span class="nextArrow"><i class="fa fa-arrow-circle-right"></i></span>',
        responsive: [
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }
        ]
      });
      container.slick('slickGoTo', parseInt(container.find('li.selected').attr('data-selected-index')), true);
    }
  };

  // Year-Tabs.
  Drupal.behaviors.customYearFilter = {
    attach: function(context, settings) {
      if ($('body').hasClass('page-news-events-headlines')) {
        var selected_index = 0;
        var count = 1;
        var ssid = 0;
        var desc = "";
        var date = new Date();
        var year = date.getFullYear();
        var diff = year - 2001;
        var container_container;
        if ($('body').hasClass('bureau-specific-headlines-landing-page')) {
          container_container = $('#content .pane-headlines-headlines-landing-page-2');
        }
        else {
          container_container = $('#content .pane-headlines-landing-page');
        }

        container_container.prepend('<div class="custom-filter-wrapper"><ul></ul></div>');
        var container = container_container.find('.custom-filter-wrapper ul');

        $('#edit-field-released-date-value-wrapper').hide();

        $('body').append('<div class ="is-hidden" id="slick-slide00">All news headlines</div>');
        $('select#edit-field-released-date-value-value-year > option').once().each(function (i, e) {
          var val = ($(this).val() != '') ? $(this).val() : 'All';
          var sel = ($(this).attr('selected') == 'selected') ? 'selected' : '';
          var elem = '<li class="option ' + sel + '" data-value="' + val + '">' + val + '</li>';

          container.append(elem);

          $('.option[data-value="' + val + '"]', container).click(function () {
            $("#edit-field-released-date-value-value-year option").removeAttr("selected");
            $("#edit-field-released-date-value-value-year option").prop("selected", false);

            $('#edit-field-released-date-value-value-year option[value="' + $(this).data('value') + '"]').attr("selected", 'selected');
            $('#edit-field-released-date-value-value-year option[value="' + $(this).data('value') + '"]').prop("selected", true);
            $('input#edit-submit-headlines').click();
          });

          if (sel == 'selected') {
            selected_index = i;
          }

          // Adds Archive button.
          if (i == diff) {
            container.append('<li class="option slick-slide" data-value="arch" data-click-index="16" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide016" style="width: 76px;"><a style="font-size: 14px; font-weight: 400;" href="/news-events/headlines/fcc-headlines-archive-1996-2002">Archive</a></li>');
          }

          if (i + 1 == $('select#edit-field-released-date-value-value-year > option').length) {
            container.slick({
              infinite: false,
              slidesToShow: 5,
              slidesToScroll: 5,
              prevArrow: '<span class="prevArrow"><i class="fa fa-arrow-circle-left"></i></span>',
              nextArrow: '<span class="nextArrow"><i class="fa fa-arrow-circle-right"></i></span>',
              responsive: [
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  }
                }
              ]
            });
            container.slick('slickGoTo', selected_index, true);
          }
        });
        $($("li").get().reverse()).each(function () {
          if (year > 2001) {
            ssid = "0" + count;
            desc = '<div class ="is-hidden" id="slick-slide' + ssid + '">' + year + ' news headlines</div>';
            count = count + 1;
            $('body').append(desc);
            year = year - 1;
          }
        });
      }
    }
  }

  Drupal.behaviors.expandCollapseAll = {
    attach: function (context, settings) {
      var obj = $(".ui-accordion");
      obj.prepend('<p class="toggall">Expand All</p>');

      var headers = $('.accordion-header');
      var contentAreas = $('.ui-accordion-content').hide();
      var expandLink = $('.toggall');

      // add the accordion functionality
      headers.click(function() {
        var panel = $(this).next();
        var isOpen = panel.is(':visible');

        // open or close as necessary
        panel[isOpen? 'slideUp': 'slideDown']()
        // trigger the correct custom event
            .trigger(isOpen? 'hide': 'show');

        //Toggle header class
        $(this).toggleClass("opened");

        // stop the link from causing a pagescroll
        return false;
      });

      // hook up the expand/collapse all
      expandLink.click(function(){
        var isAllOpen = $(this).data('isAllOpen');

        if (isAllOpen == true){
          $('h3.accordion-header').removeClass('opened');
        }else{
          $('h3.accordion-header').addClass('opened');
        }

        //Toggle header class
        $(this).toggleClass("opened");

        contentAreas[isAllOpen ? 'hide': 'show']()
            .trigger(isAllOpen ? 'hide': 'show');
      });

      // when panels open or close, check to see if they're all open
      contentAreas.on({
        // whenever we open a panel, check to see if they're all open
        // if all open, swap the button to collapser
        show: function(){
          var isAllOpen = !$(this).is(':hidden');
          if(isAllOpen){
            expandLink.text('Collapse All')
                .data('isAllOpen', true)
                .addClass('open')
                .removeClass('closed');
            $('.ui-accordion-header').removeClass('ui-corner-all').addClass('ui-accordion-header-active ui-state-active ui-corner-top').attr({'aria-selected':'true','tabindex':'0'});
            $('.ui-accordion-header .ui-icon').removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
            $('.ui-accordion-content').addClass('ui-accordion-content-active').attr({'aria-expanded':'true','aria-hidden':'false'});
          }
        },
        // whenever we close a panel, check to see if they're all open
        // if not all open, swap the button to expander
        hide: function(){
          var isAllOpen = !$(this).is(':hidden');
          if(!isAllOpen){
            expandLink.text('Expand all')
                .data('isAllOpen', false)
                .addClass('closed')
                .removeClass('open');
            $('.ui-accordion-header').removeClass('ui-accordion-header-active ui-state-active ui-corner-top').addClass('ui-corner-all').attr({'aria-selected':'false','tabindex':'-1'});
            $('.ui-accordion-header .ui-icon').removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
            $('.ui-accordion-content').removeClass('ui-accordion-content-active').attr({'aria-expanded':'false','aria-hidden':'true'});
          }
        }
      });
    }
  };

  // Float embedded caption, image, and parent div left or right.
  Drupal.behaviors.caption = {
    attach: function () {
      function floatCaptionParent() {
        var captionImage = $('.field-name-body img');
        if(captionImage.length > 0){
          if(captionImage[0].style.float == 'left') {
            captionImage.parent().css('float', 'left');
          }
          else if(captionImage[0].style.float == 'right') {
            captionImage.parent().css('float', 'right');
          }
        }
      }
      $(window).load(floatCaptionParent);
    }
  };



})(jQuery, Drupal, this, this.document);

Drupal.fcc = Drupal.fcc || {};

/**
 * Wrap a DOM node with a styling class for title emphasis.
 * @param {Sbject} $
 * @param {Sbject} els
 * @param {String} classname
 */
var wrapWithTitleEmphasis = function($, els, className) {
  els.each(function() {
    $(this).wrapInner("<div class="+ className +"></div>");
  });
}
;
