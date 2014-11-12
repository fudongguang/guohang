"no use strict";!function(t){if("undefined"==typeof t.window||!t.document){t.console=function(){var t=Array.prototype.slice.call(arguments,0);postMessage({type:"log",data:t})},t.console.error=t.console.warn=t.console.log=t.console.trace=t.console,t.window=t,t.ace=t,t.onerror=function(t,e,n,r,i){console.error("Worker "+(i?i.stack:t))},t.normalizeModule=function(e,n){if(-1!==n.indexOf("!")){var r=n.split("!");return t.normalizeModule(e,r[0])+"!"+t.normalizeModule(e,r[1])}if("."==n.charAt(0)){var i=e.split("/").slice(0,-1).join("/");for(n=(i?i+"/":"")+n;-1!==n.indexOf(".")&&o!=n;){var o=n;n=n.replace(/^\.\//,"").replace(/\/\.\//,"/").replace(/[^\/]+\/\.\.\//,"")}}return n},t.require=function(e,n){if(n||(n=e,e=null),!n.charAt)throw new Error("worker.js require() accepts only (parentId, id) as arguments");n=t.normalizeModule(e,n);var r=t.require.modules[n];if(r)return r.initialized||(r.initialized=!0,r.exports=r.factory().exports),r.exports;var i=n.split("/");if(!t.require.tlns)return console.log("unable to load "+n);i[0]=t.require.tlns[i[0]]||i[0];var o=i.join("/")+".js";return t.require.id=n,importScripts(o),t.require(e,n)},t.require.modules={},t.require.tlns={},t.define=function(e,n,r){if(2==arguments.length?(r=n,"string"!=typeof e&&(n=e,e=t.require.id)):1==arguments.length&&(r=e,n=[],e=t.require.id),n.length||(n=["require","exports","module"]),0!==e.indexOf("text!")){var i=function(n){return t.require(e,n)};t.require.modules[e]={exports:{},factory:function(){var t=this,e=r.apply(this,n.map(function(e){switch(e){case"require":return i;case"exports":return t.exports;case"module":return t;default:return i(e)}}));return e&&(t.exports=e),t}}}},t.define.amd={},t.initBaseUrls=function(t){require.tlns=t},t.initSender=function(){var e=t.require("ace/lib/event_emitter").EventEmitter,n=t.require("ace/lib/oop"),r=function(){};return function(){n.implement(this,e),this.callback=function(t,e){postMessage({type:"call",id:e,data:t})},this.emit=function(t,e){postMessage({type:"event",name:t,data:e})}}.call(r.prototype),new r};var e=t.main=null,n=t.sender=null;t.onmessage=function(r){var i=r.data;if(i.command){if(!e[i.command])throw new Error("Unknown command:"+i.command);e[i.command].apply(e,i.args)}else if(i.init){initBaseUrls(i.tlns),require("ace/lib/es5-shim"),n=t.sender=initSender();var o=require(i.module)[i.classname];e=t.main=new o(n)}else i.event&&n&&n._signal(i.event,i.data)}}}(this),define("ace/mode/json_worker",["require","exports","module","ace/lib/oop","ace/worker/mirror","ace/mode/json/json_parse"],function(t,e){var n=t("../lib/oop"),r=t("../worker/mirror").Mirror,i=t("./json/json_parse"),o=e.JsonWorker=function(t){r.call(this,t),this.setTimeout(200)};n.inherits(o,r),function(){this.onUpdate=function(){var t=this.doc.getValue();try{{i(t)}}catch(e){var n=this.doc.indexToPosition(e.at-1);return void this.sender.emit("error",{row:n.row,column:n.column,text:e.message,type:"error"})}this.sender.emit("ok")}}.call(o.prototype)}),define("ace/lib/oop",["require","exports","module"],function(t,e){e.inherits=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})},e.mixin=function(t,e){for(var n in e)t[n]=e[n];return t},e.implement=function(t,n){e.mixin(t,n)}}),define("ace/worker/mirror",["require","exports","module","ace/document","ace/lib/lang"],function(t,e){var n=t("../document").Document,r=t("../lib/lang"),i=e.Mirror=function(t){this.sender=t;var e=this.doc=new n(""),i=this.deferredUpdate=r.delayedCall(this.onUpdate.bind(this)),o=this;t.on("change",function(t){return e.applyDeltas(t.data),o.$timeout?i.schedule(o.$timeout):void o.onUpdate()})};(function(){this.$timeout=500,this.setTimeout=function(t){this.$timeout=t},this.setValue=function(t){this.doc.setValue(t),this.deferredUpdate.schedule(this.$timeout)},this.getValue=function(t){this.sender.callback(this.doc.getValue(),t)},this.onUpdate=function(){},this.isPending=function(){return this.deferredUpdate.isPending()}}).call(i.prototype)}),define("ace/lib/es5-shim",["require","exports","module"],function(){function t(){}function e(t){try{return Object.defineProperty(t,"sentinel",{}),"sentinel"in t}catch(e){}}function n(t){return t=+t,t!==t?t=0:0!==t&&t!==1/0&&t!==-1/0&&(t=(t>0||-1)*Math.floor(Math.abs(t))),t}function r(t){var e=typeof t;return null===t||"undefined"===e||"boolean"===e||"number"===e||"string"===e}Function.prototype.bind||(Function.prototype.bind=function(e){var n=this;if("function"!=typeof n)throw new TypeError("Function.prototype.bind called on incompatible "+n);var r=f.call(arguments,1),i=function(){if(this instanceof i){var t=n.apply(this,r.concat(f.call(arguments)));return Object(t)===t?t:this}return n.apply(e,r.concat(f.call(arguments)))};return n.prototype&&(t.prototype=n.prototype,i.prototype=new t,t.prototype=null),i});var i,o,s,a,c,u=Function.prototype.call,l=Array.prototype,h=Object.prototype,f=l.slice,p=u.bind(h.toString),m=u.bind(h.hasOwnProperty);if((c=m(h,"__defineGetter__"))&&(i=u.bind(h.__defineGetter__),o=u.bind(h.__defineSetter__),s=u.bind(h.__lookupGetter__),a=u.bind(h.__lookupSetter__)),2!=[1,2].splice(0).length)if(function(){function t(t){var e=new Array(t+2);return e[0]=e[1]=0,e}var e,n=[];return n.splice.apply(n,t(20)),n.splice.apply(n,t(26)),e=n.length,n.splice(5,0,"XXX"),e+1==n.length,e+1==n.length?!0:void 0}()){var d=Array.prototype.splice;Array.prototype.splice=function(t,e){return arguments.length?d.apply(this,[void 0===t?0:t,void 0===e?this.length-t:e].concat(f.call(arguments,2))):[]}}else Array.prototype.splice=function(t,e){var n=this.length;t>0?t>n&&(t=n):void 0==t?t=0:0>t&&(t=Math.max(n+t,0)),n>t+e||(e=n-t);var r=this.slice(t,t+e),i=f.call(arguments,2),o=i.length;if(t===n)o&&this.push.apply(this,i);else{var s=Math.min(e,n-t),a=t+s,c=a+o-s,u=n-a,l=n-s;if(a>c)for(var h=0;u>h;++h)this[c+h]=this[a+h];else if(c>a)for(h=u;h--;)this[c+h]=this[a+h];if(o&&t===l)this.length=l,this.push.apply(this,i);else for(this.length=l+o,h=0;o>h;++h)this[t+h]=i[h]}return r};Array.isArray||(Array.isArray=function(t){return"[object Array]"==p(t)});var g=Object("a"),w="a"!=g[0]||!(0 in g);if(Array.prototype.forEach||(Array.prototype.forEach=function(t){var e=q(this),n=w&&"[object String]"==p(this)?this.split(""):e,r=arguments[1],i=-1,o=n.length>>>0;if("[object Function]"!=p(t))throw new TypeError;for(;++i<o;)i in n&&t.call(r,n[i],i,e)}),Array.prototype.map||(Array.prototype.map=function(t){var e=q(this),n=w&&"[object String]"==p(this)?this.split(""):e,r=n.length>>>0,i=Array(r),o=arguments[1];if("[object Function]"!=p(t))throw new TypeError(t+" is not a function");for(var s=0;r>s;s++)s in n&&(i[s]=t.call(o,n[s],s,e));return i}),Array.prototype.filter||(Array.prototype.filter=function(t){var e,n=q(this),r=w&&"[object String]"==p(this)?this.split(""):n,i=r.length>>>0,o=[],s=arguments[1];if("[object Function]"!=p(t))throw new TypeError(t+" is not a function");for(var a=0;i>a;a++)a in r&&(e=r[a],t.call(s,e,a,n)&&o.push(e));return o}),Array.prototype.every||(Array.prototype.every=function(t){var e=q(this),n=w&&"[object String]"==p(this)?this.split(""):e,r=n.length>>>0,i=arguments[1];if("[object Function]"!=p(t))throw new TypeError(t+" is not a function");for(var o=0;r>o;o++)if(o in n&&!t.call(i,n[o],o,e))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(t){var e=q(this),n=w&&"[object String]"==p(this)?this.split(""):e,r=n.length>>>0,i=arguments[1];if("[object Function]"!=p(t))throw new TypeError(t+" is not a function");for(var o=0;r>o;o++)if(o in n&&t.call(i,n[o],o,e))return!0;return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(t){var e=q(this),n=w&&"[object String]"==p(this)?this.split(""):e,r=n.length>>>0;if("[object Function]"!=p(t))throw new TypeError(t+" is not a function");if(!r&&1==arguments.length)throw new TypeError("reduce of empty array with no initial value");var i,o=0;if(arguments.length>=2)i=arguments[1];else for(;;){if(o in n){i=n[o++];break}if(++o>=r)throw new TypeError("reduce of empty array with no initial value")}for(;r>o;o++)o in n&&(i=t.call(void 0,i,n[o],o,e));return i}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(t){var e=q(this),n=w&&"[object String]"==p(this)?this.split(""):e,r=n.length>>>0;if("[object Function]"!=p(t))throw new TypeError(t+" is not a function");if(!r&&1==arguments.length)throw new TypeError("reduceRight of empty array with no initial value");var i,o=r-1;if(arguments.length>=2)i=arguments[1];else for(;;){if(o in n){i=n[o--];break}if(--o<0)throw new TypeError("reduceRight of empty array with no initial value")}do o in this&&(i=t.call(void 0,i,n[o],o,e));while(o--);return i}),Array.prototype.indexOf&&-1==[0,1].indexOf(1,2)||(Array.prototype.indexOf=function(t){var e=w&&"[object String]"==p(this)?this.split(""):q(this),r=e.length>>>0;if(!r)return-1;var i=0;for(arguments.length>1&&(i=n(arguments[1])),i=i>=0?i:Math.max(0,r+i);r>i;i++)if(i in e&&e[i]===t)return i;return-1}),Array.prototype.lastIndexOf&&-1==[0,1].lastIndexOf(0,-3)||(Array.prototype.lastIndexOf=function(t){var e=w&&"[object String]"==p(this)?this.split(""):q(this),r=e.length>>>0;if(!r)return-1;var i=r-1;for(arguments.length>1&&(i=Math.min(i,n(arguments[1]))),i=i>=0?i:r-Math.abs(i);i>=0;i--)if(i in e&&t===e[i])return i;return-1}),Object.getPrototypeOf||(Object.getPrototypeOf=function(t){return t.__proto__||(t.constructor?t.constructor.prototype:h)}),!Object.getOwnPropertyDescriptor){var v="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function(t,e){if("object"!=typeof t&&"function"!=typeof t||null===t)throw new TypeError(v+t);if(m(t,e)){var n,r,i;if(n={enumerable:!0,configurable:!0},c){var o=t.__proto__;t.__proto__=h;var r=s(t,e),i=a(t,e);if(t.__proto__=o,r||i)return r&&(n.get=r),i&&(n.set=i),n}return n.value=t[e],n}}}if(Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(t){return Object.keys(t)}),!Object.create){var y;y=null===Object.prototype.__proto__?function(){return{__proto__:null}}:function(){var t={};for(var e in t)t[e]=null;return t.constructor=t.hasOwnProperty=t.propertyIsEnumerable=t.isPrototypeOf=t.toLocaleString=t.toString=t.valueOf=t.__proto__=null,t},Object.create=function(t,e){var n;if(null===t)n=y();else{if("object"!=typeof t)throw new TypeError("typeof prototype["+typeof t+"] != 'object'");var r=function(){};r.prototype=t,n=new r,n.__proto__=t}return void 0!==e&&Object.defineProperties(n,e),n}}if(Object.defineProperty){var b=e({}),_="undefined"==typeof document||e(document.createElement("div"));if(!b||!_)var j=Object.defineProperty}if(!Object.defineProperty||j){var L="Property description must be an object: ",x="Object.defineProperty called on non-object: ",O="getters & setters can not be defined on this javascript engine";Object.defineProperty=function(t,e,n){if("object"!=typeof t&&"function"!=typeof t||null===t)throw new TypeError(x+t);if("object"!=typeof n&&"function"!=typeof n||null===n)throw new TypeError(L+n);if(j)try{return j.call(Object,t,e,n)}catch(r){}if(m(n,"value"))if(c&&(s(t,e)||a(t,e))){var u=t.__proto__;t.__proto__=h,delete t[e],t[e]=n.value,t.__proto__=u}else t[e]=n.value;else{if(!c)throw new TypeError(O);m(n,"get")&&i(t,e,n.get),m(n,"set")&&o(t,e,n.set)}return t}}Object.defineProperties||(Object.defineProperties=function(t,e){for(var n in e)m(e,n)&&Object.defineProperty(t,n,e[n]);return t}),Object.seal||(Object.seal=function(t){return t}),Object.freeze||(Object.freeze=function(t){return t});try{Object.freeze(function(){})}catch(P){Object.freeze=function(t){return function(e){return"function"==typeof e?e:t(e)}}(Object.freeze)}if(Object.preventExtensions||(Object.preventExtensions=function(t){return t}),Object.isSealed||(Object.isSealed=function(){return!1}),Object.isFrozen||(Object.isFrozen=function(){return!1}),Object.isExtensible||(Object.isExtensible=function(t){if(Object(t)===t)throw new TypeError;for(var e="";m(t,e);)e+="?";t[e]=!0;var n=m(t,e);return delete t[e],n}),!Object.keys){var E=!0,T=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],$=T.length;for(var A in{toString:null})E=!1;Object.keys=function N(t){if("object"!=typeof t&&"function"!=typeof t||null===t)throw new TypeError("Object.keys called on a non-object");var N=[];for(var e in t)m(t,e)&&N.push(e);if(E)for(var n=0,r=$;r>n;n++){var i=T[n];m(t,i)&&N.push(i)}return N}}Date.now||(Date.now=function(){return(new Date).getTime()});var M="	\n\f\r   ᠎             　\u2028\u2029";if(!String.prototype.trim||M.trim()){M="["+M+"]";var S=new RegExp("^"+M+M+"*"),R=new RegExp(M+M+"*$");String.prototype.trim=function(){return String(this).replace(S,"").replace(R,"")}}var q=function(t){if(null==t)throw new TypeError("can't convert "+t+" to object");return Object(t)}}),define("ace/lib/event_emitter",["require","exports","module"],function(t,e){var n={},r=function(){this.propagationStopped=!0},i=function(){this.defaultPrevented=!0};n._emit=n._dispatchEvent=function(t,e){this._eventRegistry||(this._eventRegistry={}),this._defaultHandlers||(this._defaultHandlers={});var n=this._eventRegistry[t]||[],o=this._defaultHandlers[t];if(n.length||o){"object"==typeof e&&e||(e={}),e.type||(e.type=t),e.stopPropagation||(e.stopPropagation=r),e.preventDefault||(e.preventDefault=i),n=n.slice();for(var s=0;s<n.length&&(n[s](e,this),!e.propagationStopped);s++);return o&&!e.defaultPrevented?o(e,this):void 0}},n._signal=function(t,e){var n=(this._eventRegistry||{})[t];if(n){n=n.slice();for(var r=0;r<n.length;r++)n[r](e,this)}},n.once=function(t,e){var n=this;e&&this.addEventListener(t,function r(){n.removeEventListener(t,r),e.apply(null,arguments)})},n.setDefaultHandler=function(t,e){var n=this._defaultHandlers;if(n||(n=this._defaultHandlers={_disabled_:{}}),n[t]){var r=n[t],i=n._disabled_[t];i||(n._disabled_[t]=i=[]),i.push(r);var o=i.indexOf(e);-1!=o&&i.splice(o,1)}n[t]=e},n.removeDefaultHandler=function(t,e){var n=this._defaultHandlers;if(n){var r=n._disabled_[t];if(n[t]==e){{n[t]}r&&this.setDefaultHandler(t,r.pop())}else if(r){var i=r.indexOf(e);-1!=i&&r.splice(i,1)}}},n.on=n.addEventListener=function(t,e,n){this._eventRegistry=this._eventRegistry||{};var r=this._eventRegistry[t];return r||(r=this._eventRegistry[t]=[]),-1==r.indexOf(e)&&r[n?"unshift":"push"](e),e},n.off=n.removeListener=n.removeEventListener=function(t,e){this._eventRegistry=this._eventRegistry||{};var n=this._eventRegistry[t];if(n){var r=n.indexOf(e);-1!==r&&n.splice(r,1)}},n.removeAllListeners=function(t){this._eventRegistry&&(this._eventRegistry[t]=[])},e.EventEmitter=n}),define("ace/range",["require","exports","module"],function(t,e){var n=function(t,e){return t.row-e.row||t.column-e.column},r=function(t,e,n,r){this.start={row:t,column:e},this.end={row:n,column:r}};(function(){this.isEqual=function(t){return this.start.row===t.start.row&&this.end.row===t.end.row&&this.start.column===t.start.column&&this.end.column===t.end.column},this.toString=function(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"},this.contains=function(t,e){return 0==this.compare(t,e)},this.compareRange=function(t){var e,n=t.end,r=t.start;return e=this.compare(n.row,n.column),1==e?(e=this.compare(r.row,r.column),1==e?2:0==e?1:0):-1==e?-2:(e=this.compare(r.row,r.column),-1==e?-1:1==e?42:0)},this.comparePoint=function(t){return this.compare(t.row,t.column)},this.containsRange=function(t){return 0==this.comparePoint(t.start)&&0==this.comparePoint(t.end)},this.intersects=function(t){var e=this.compareRange(t);return-1==e||0==e||1==e},this.isEnd=function(t,e){return this.end.row==t&&this.end.column==e},this.isStart=function(t,e){return this.start.row==t&&this.start.column==e},this.setStart=function(t,e){"object"==typeof t?(this.start.column=t.column,this.start.row=t.row):(this.start.row=t,this.start.column=e)},this.setEnd=function(t,e){"object"==typeof t?(this.end.column=t.column,this.end.row=t.row):(this.end.row=t,this.end.column=e)},this.inside=function(t,e){return 0==this.compare(t,e)?this.isEnd(t,e)||this.isStart(t,e)?!1:!0:!1},this.insideStart=function(t,e){return 0==this.compare(t,e)?this.isEnd(t,e)?!1:!0:!1},this.insideEnd=function(t,e){return 0==this.compare(t,e)?this.isStart(t,e)?!1:!0:!1},this.compare=function(t,e){return this.isMultiLine()||t!==this.start.row?t<this.start.row?-1:t>this.end.row?1:this.start.row===t?e>=this.start.column?0:-1:this.end.row===t?e<=this.end.column?0:1:0:e<this.start.column?-1:e>this.end.column?1:0},this.compareStart=function(t,e){return this.start.row==t&&this.start.column==e?-1:this.compare(t,e)},this.compareEnd=function(t,e){return this.end.row==t&&this.end.column==e?1:this.compare(t,e)},this.compareInside=function(t,e){return this.end.row==t&&this.end.column==e?1:this.start.row==t&&this.start.column==e?-1:this.compare(t,e)},this.clipRows=function(t,e){if(this.end.row>e)var n={row:e+1,column:0};else if(this.end.row<t)var n={row:t,column:0};if(this.start.row>e)var i={row:e+1,column:0};else if(this.start.row<t)var i={row:t,column:0};return r.fromPoints(i||this.start,n||this.end)},this.extend=function(t,e){var n=this.compare(t,e);if(0==n)return this;if(-1==n)var i={row:t,column:e};else var o={row:t,column:e};return r.fromPoints(i||this.start,o||this.end)},this.isEmpty=function(){return this.start.row===this.end.row&&this.start.column===this.end.column},this.isMultiLine=function(){return this.start.row!==this.end.row},this.clone=function(){return r.fromPoints(this.start,this.end)},this.collapseRows=function(){return 0==this.end.column?new r(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new r(this.start.row,0,this.end.row,0)},this.toScreenRange=function(t){var e=t.documentToScreenPosition(this.start),n=t.documentToScreenPosition(this.end);return new r(e.row,e.column,n.row,n.column)},this.moveBy=function(t,e){this.start.row+=t,this.start.column+=e,this.end.row+=t,this.end.column+=e}}).call(r.prototype),r.fromPoints=function(t,e){return new r(t.row,t.column,e.row,e.column)},r.comparePoints=n,r.comparePoints=function(t,e){return t.row-e.row||t.column-e.column},e.Range=r}),define("ace/anchor",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(t,e){var n=t("./lib/oop"),r=t("./lib/event_emitter").EventEmitter,i=e.Anchor=function(t,e,n){this.$onChange=this.onChange.bind(this),this.attach(t),"undefined"==typeof n?this.setPosition(e.row,e.column):this.setPosition(e,n)};(function(){n.implement(this,r),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.$insertRight=!1,this.onChange=function(t){var e=t.data,n=e.range;if((n.start.row!=n.end.row||n.start.row==this.row)&&!(n.start.row>this.row||n.start.row==this.row&&n.start.column>this.column)){var r=this.row,i=this.column,o=n.start,s=n.end;"insertText"===e.action?o.row===r&&o.column<=i?o.column===i&&this.$insertRight||(o.row===s.row?i+=s.column-o.column:(i-=o.column,r+=s.row-o.row)):o.row!==s.row&&o.row<r&&(r+=s.row-o.row):"insertLines"===e.action?(o.row!==r||0!==i||!this.$insertRight)&&o.row<=r&&(r+=s.row-o.row):"removeText"===e.action?o.row===r&&o.column<i?i=s.column>=i?o.column:Math.max(0,i-(s.column-o.column)):o.row!==s.row&&o.row<r?(s.row===r&&(i=Math.max(0,i-s.column)+o.column),r-=s.row-o.row):s.row===r&&(r-=s.row-o.row,i=Math.max(0,i-s.column)+o.column):"removeLines"==e.action&&o.row<=r&&(s.row<=r?r-=s.row-o.row:(r=o.row,i=0)),this.setPosition(r,i,!0)}},this.setPosition=function(t,e,n){var r;if(r=n?{row:t,column:e}:this.$clipPositionToDocument(t,e),this.row!=r.row||this.column!=r.column){var i={row:this.row,column:this.column};this.row=r.row,this.column=r.column,this._signal("change",{old:i,value:r})}},this.detach=function(){this.document.removeEventListener("change",this.$onChange)},this.attach=function(t){this.document=t||this.document,this.document.on("change",this.$onChange)},this.$clipPositionToDocument=function(t,e){var n={};return t>=this.document.getLength()?(n.row=Math.max(0,this.document.getLength()-1),n.column=this.document.getLine(n.row).length):0>t?(n.row=0,n.column=0):(n.row=t,n.column=Math.min(this.document.getLine(n.row).length,Math.max(0,e))),0>e&&(n.column=0),n}}).call(i.prototype)}),define("ace/lib/lang",["require","exports","module"],function(t,e){e.last=function(t){return t[t.length-1]},e.stringReverse=function(t){return t.split("").reverse().join("")},e.stringRepeat=function(t,e){for(var n="";e>0;)1&e&&(n+=t),(e>>=1)&&(t+=t);return n};var n=/^\s\s*/,r=/\s\s*$/;e.stringTrimLeft=function(t){return t.replace(n,"")},e.stringTrimRight=function(t){return t.replace(r,"")},e.copyObject=function(t){var e={};for(var n in t)e[n]=t[n];return e},e.copyArray=function(t){for(var e=[],n=0,r=t.length;r>n;n++)e[n]=t[n]&&"object"==typeof t[n]?this.copyObject(t[n]):t[n];return e},e.deepCopy=function(t){if("object"!=typeof t||!t)return t;var n=t.constructor;if(n===RegExp)return t;var r=n();for(var i in t)r[i]="object"==typeof t[i]?e.deepCopy(t[i]):t[i];return r},e.arrayToMap=function(t){for(var e={},n=0;n<t.length;n++)e[t[n]]=1;return e},e.createMap=function(t){var e=Object.create(null);for(var n in t)e[n]=t[n];return e},e.arrayRemove=function(t,e){for(var n=0;n<=t.length;n++)e===t[n]&&t.splice(n,1)},e.escapeRegExp=function(t){return t.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},e.escapeHTML=function(t){return t.replace(/&/g,"&#38;").replace(/"/g,"&#34;").replace(/'/g,"&#39;").replace(/</g,"&#60;")},e.getMatchOffsets=function(t,e){var n=[];return t.replace(e,function(t){n.push({offset:arguments[arguments.length-2],length:t.length})}),n},e.deferredCall=function(t){var e=null,n=function(){e=null,t()},r=function(t){return r.cancel(),e=setTimeout(n,t||0),r};return r.schedule=r,r.call=function(){return this.cancel(),t(),r},r.cancel=function(){return clearTimeout(e),e=null,r},r.isPending=function(){return e},r},e.delayedCall=function(t,e){var n=null,r=function(){n=null,t()},i=function(t){null==n&&(n=setTimeout(r,t||e))};return i.delay=function(t){n&&clearTimeout(n),n=setTimeout(r,t||e)},i.schedule=i,i.call=function(){this.cancel(),t()},i.cancel=function(){n&&clearTimeout(n),n=null},i.isPending=function(){return n},i}}),define("ace/mode/json/json_parse",["require","exports","module"],function(){var t,e,n,r,i={'"':'"',"\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:"	"},o=function(e){throw{name:"SyntaxError",message:e,at:t,text:n}},s=function(r){return r&&r!==e&&o("Expected '"+r+"' instead of '"+e+"'"),e=n.charAt(t),t+=1,e},a=function(){var t,n="";for("-"===e&&(n="-",s("-"));e>="0"&&"9">=e;)n+=e,s();if("."===e)for(n+=".";s()&&e>="0"&&"9">=e;)n+=e;if("e"===e||"E"===e)for(n+=e,s(),("-"===e||"+"===e)&&(n+=e,s());e>="0"&&"9">=e;)n+=e,s();return t=+n,isNaN(t)?void o("Bad number"):t},c=function(){var t,n,r,a="";if('"'===e)for(;s();){if('"'===e)return s(),a;if("\\"===e)if(s(),"u"===e){for(r=0,n=0;4>n&&(t=parseInt(s(),16),isFinite(t));n+=1)r=16*r+t;a+=String.fromCharCode(r)}else{if("string"!=typeof i[e])break;a+=i[e]}else a+=e}o("Bad string")},u=function(){for(;e&&" ">=e;)s()},l=function(){switch(e){case"t":return s("t"),s("r"),s("u"),s("e"),!0;case"f":return s("f"),s("a"),s("l"),s("s"),s("e"),!1;case"n":return s("n"),s("u"),s("l"),s("l"),null}o("Unexpected '"+e+"'")},h=function(){var t=[];if("["===e){if(s("["),u(),"]"===e)return s("]"),t;for(;e;){if(t.push(r()),u(),"]"===e)return s("]"),t;s(","),u()}}o("Bad array")},f=function(){var t,n={};if("{"===e){if(s("{"),u(),"}"===e)return s("}"),n;for(;e;){if(t=c(),u(),s(":"),Object.hasOwnProperty.call(n,t)&&o('Duplicate key "'+t+'"'),n[t]=r(),u(),"}"===e)return s("}"),n;s(","),u()}}o("Bad object")};return r=function(){switch(u(),e){case"{":return f();case"[":return h();case'"':return c();case"-":return a();default:return e>="0"&&"9">=e?a():l()}},function(i,s){var a;return n=i,t=0,e=" ",a=r(),u(),e&&o("Syntax error"),"function"==typeof s?function c(t,e){var n,r,i=t[e];if(i&&"object"==typeof i)for(n in i)Object.hasOwnProperty.call(i,n)&&(r=c(i,n),void 0!==r?i[n]=r:delete i[n]);return s.call(t,e,i)}({"":a},""):a}}),define("ace/document",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/range","ace/anchor"],function(t,e){var n=t("./lib/oop"),r=t("./lib/event_emitter").EventEmitter,i=t("./range").Range,o=t("./anchor").Anchor,s=function(t){this.$lines=[],0===t.length?this.$lines=[""]:Array.isArray(t)?this._insertLines(0,t):this.insert({row:0,column:0},t)};(function(){n.implement(this,r),this.setValue=function(t){var e=this.getLength();this.remove(new i(0,0,e,this.getLine(e-1).length)),this.insert({row:0,column:0},t)},this.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},this.createAnchor=function(t,e){return new o(this,t,e)},this.$split=0==="aaa".split(/a/).length?function(t){return t.replace(/\r\n|\r/g,"\n").split("\n")}:function(t){return t.split(/\r\n|\r|\n/)},this.$detectNewLine=function(t){var e=t.match(/^.*?(\r\n|\r|\n)/m);this.$autoNewLine=e?e[1]:"\n",this._signal("changeNewLineMode")},this.getNewLineCharacter=function(){switch(this.$newLineMode){case"windows":return"\r\n";case"unix":return"\n";default:return this.$autoNewLine||"\n"}},this.$autoNewLine="",this.$newLineMode="auto",this.setNewLineMode=function(t){this.$newLineMode!==t&&(this.$newLineMode=t,this._signal("changeNewLineMode"))},this.getNewLineMode=function(){return this.$newLineMode},this.isNewLine=function(t){return"\r\n"==t||"\r"==t||"\n"==t},this.getLine=function(t){return this.$lines[t]||""},this.getLines=function(t,e){return this.$lines.slice(t,e+1)},this.getAllLines=function(){return this.getLines(0,this.getLength())},this.getLength=function(){return this.$lines.length},this.getTextRange=function(t){if(t.start.row==t.end.row)return this.getLine(t.start.row).substring(t.start.column,t.end.column);var e=this.getLines(t.start.row,t.end.row);e[0]=(e[0]||"").substring(t.start.column);var n=e.length-1;return t.end.row-t.start.row==n&&(e[n]=e[n].substring(0,t.end.column)),e.join(this.getNewLineCharacter())},this.$clipPosition=function(t){var e=this.getLength();return t.row>=e?(t.row=Math.max(0,e-1),t.column=this.getLine(e-1).length):t.row<0&&(t.row=0),t},this.insert=function(t,e){if(!e||0===e.length)return t;t=this.$clipPosition(t),this.getLength()<=1&&this.$detectNewLine(e);var n=this.$split(e),r=n.splice(0,1)[0],i=0==n.length?null:n.splice(n.length-1,1)[0];return t=this.insertInLine(t,r),null!==i&&(t=this.insertNewLine(t),t=this._insertLines(t.row,n),t=this.insertInLine(t,i||"")),t},this.insertLines=function(t,e){return t>=this.getLength()?this.insert({row:t,column:0},"\n"+e.join("\n")):this._insertLines(Math.max(t,0),e)},this._insertLines=function(t,e){if(0==e.length)return{row:t,column:0};for(;e.length>61440;){var n=this._insertLines(t,e.slice(0,61440));e=e.slice(61440),t=n.row}var r=[t,0];r.push.apply(r,e),this.$lines.splice.apply(this.$lines,r);var o=new i(t,0,t+e.length,0),s={action:"insertLines",range:o,lines:e};return this._signal("change",{data:s}),o.end},this.insertNewLine=function(t){t=this.$clipPosition(t);var e=this.$lines[t.row]||"";this.$lines[t.row]=e.substring(0,t.column),this.$lines.splice(t.row+1,0,e.substring(t.column,e.length));var n={row:t.row+1,column:0},r={action:"insertText",range:i.fromPoints(t,n),text:this.getNewLineCharacter()};return this._signal("change",{data:r}),n},this.insertInLine=function(t,e){if(0==e.length)return t;var n=this.$lines[t.row]||"";this.$lines[t.row]=n.substring(0,t.column)+e+n.substring(t.column);var r={row:t.row,column:t.column+e.length},o={action:"insertText",range:i.fromPoints(t,r),text:e};return this._signal("change",{data:o}),r},this.remove=function(t){if(t instanceof i||(t=i.fromPoints(t.start,t.end)),t.start=this.$clipPosition(t.start),t.end=this.$clipPosition(t.end),t.isEmpty())return t.start;var e=t.start.row,n=t.end.row;if(t.isMultiLine()){var r=0==t.start.column?e:e+1,o=n-1;t.end.column>0&&this.removeInLine(n,0,t.end.column),o>=r&&this._removeLines(r,o),r!=e&&(this.removeInLine(e,t.start.column,this.getLine(e).length),this.removeNewLine(t.start.row))}else this.removeInLine(e,t.start.column,t.end.column);return t.start},this.removeInLine=function(t,e,n){if(e!=n){var r=new i(t,e,t,n),o=this.getLine(t),s=o.substring(e,n),a=o.substring(0,e)+o.substring(n,o.length);this.$lines.splice(t,1,a);var c={action:"removeText",range:r,text:s};return this._signal("change",{data:c}),r.start}},this.removeLines=function(t,e){return 0>t||e>=this.getLength()?this.remove(new i(t,0,e+1,0)):this._removeLines(t,e)},this._removeLines=function(t,e){var n=new i(t,0,e+1,0),r=this.$lines.splice(t,e-t+1),o={action:"removeLines",range:n,nl:this.getNewLineCharacter(),lines:r};return this._signal("change",{data:o}),r},this.removeNewLine=function(t){var e=this.getLine(t),n=this.getLine(t+1),r=new i(t,e.length,t+1,0),o=e+n;this.$lines.splice(t,2,o);var s={action:"removeText",range:r,text:this.getNewLineCharacter()};this._signal("change",{data:s})},this.replace=function(t,e){if(t instanceof i||(t=i.fromPoints(t.start,t.end)),0==e.length&&t.isEmpty())return t.start;if(e==this.getTextRange(t))return t.end;if(this.remove(t),e)var n=this.insert(t.start,e);else n=t.start;return n},this.applyDeltas=function(t){for(var e=0;e<t.length;e++){var n=t[e],r=i.fromPoints(n.range.start,n.range.end);"insertLines"==n.action?this.insertLines(r.start.row,n.lines):"insertText"==n.action?this.insert(r.start,n.text):"removeLines"==n.action?this._removeLines(r.start.row,r.end.row-1):"removeText"==n.action&&this.remove(r)}},this.revertDeltas=function(t){for(var e=t.length-1;e>=0;e--){var n=t[e],r=i.fromPoints(n.range.start,n.range.end);"insertLines"==n.action?this._removeLines(r.start.row,r.end.row-1):"insertText"==n.action?this.remove(r):"removeLines"==n.action?this._insertLines(r.start.row,n.lines):"removeText"==n.action&&this.insert(r.start,n.text)}},this.indexToPosition=function(t,e){for(var n=this.$lines||this.getAllLines(),r=this.getNewLineCharacter().length,i=e||0,o=n.length;o>i;i++)if(t-=n[i].length+r,0>t)return{row:i,column:t+n[i].length+r};return{row:o-1,column:n[o-1].length}},this.positionToIndex=function(t,e){for(var n=this.$lines||this.getAllLines(),r=this.getNewLineCharacter().length,i=0,o=Math.min(t.row,n.length),s=e||0;o>s;++s)i+=n[s].length+r;return i+t.column}}).call(s.prototype),e.Document=s});