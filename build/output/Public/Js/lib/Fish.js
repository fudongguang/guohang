!function(){var t=window,e={};e.Version="0.1.0",e.$=t.jQuery||t.Zepto||t.$;var n=function(t){return"[object String]"=={}.toString.call(t)},i=[].slice,r=e.events={on:function(t,e,n){this._events||(this._events={});var i=this._events[t]||(this._events[t]=[]);return i.push({callback:e,context:n||this}),this},once:function(t,e,n){var i=this,r=function(){i.off(t),e.apply(this,arguments)};this.on(t,r,n)},off:function(t){var e,i,r;if(!t)return this;for(e=n(t)?[t]:t,i=0,r=e.length;r>i;i++)t=e[i],delete this._events[t]},trigger:function(t){if(!this._events)return this;var e=i.call(arguments,1),n=this._events[t],r=this._events.all;return n&&s(n,e),r&&s(r,arguments),this}},s=function(t,e){var n,i=-1,r=t.length,s=e[0],o=e[1],h=e[2];switch(e.length){case 0:for(;++i<r;)(n=t[i]).callback.call(n.context);return;case 1:for(;++i<r;)(n=t[i]).callback.call(n.context,s);return;case 2:for(;++i<r;)(n=t[i]).callback.call(n.context,s,o);return;case 3:for(;++i<r;)(n=t[i]).callback.call(n.context,s,o,h);return;default:for(;++i<r;)(n=t[i]).callback.apply(n.context,e)}},o=e.Module=function(t,e){this.attributes={},this.set(t,e)};o.prototype={get:function(t){return this.attributes[t]},del:function(t){delete this.attributes[t],this.trigger("del:"+t,this)},set:function(t,e){var n,i,r,s,o=[],h=[];e||(e={}),i=e.silent,r=e.del,o=this.attributes;for(n in t)s=t[n],h.push(n),r?this.del(n):o[n]=s;if(!i)for(var l=0;l<h.length;l++)this.trigger("change:"+h[l],this,o[h[l]],e);return this}};var h=e.View=function(){this.initializer.apply(this,arguments),this.init.apply(this,arguments),this.fn=this.constructor.prototype};h.prototype={proxy:function(t){return $.proxy(t,this)},include:function(t){$.extend(this.fn,t)},init:function(){},initializer:function(t){for(var e in t)this[e]=t[e];this.elements&&this.refreshElements(),this.events&&this.delegateEvents()},$:function(t){return this.el||(this.el=$(document.body)),this.el.find(t)},eventSplitter:/^(\w+)\s*(.*)$/,delegateEvents:function(){for(var t in this.events){var e=this.events[t],n=this.proxy(this[e]),i=function(t){return function(e){return t||console.log("未找到方法"),t($(this),e)}}(n),r=t.match(this.eventSplitter),s=r[1],o=r[2];""===o?this.el.bind(s,i):(-1!==o.search(/_rel$/)&&(o=this[o+"Selector"]),(this[o]&&this[o].length||o)&&this.el.delegate(this[o]&&this[o].selector?this[o].selector:o,s,i))}},refreshElements:function(){var t=this;for(var e in this.elements){var n=this.elements[e];if(-1!==n.search(/_rel$/)){this[n+"Selector"]=e;var i=n.replace(/_rel$/,"");this[n]=function(e,n){return function(){return t[n]=t.$(e)}}(e,i)}else{var r=this.$(e);this[n]=r}}}};var l=function(t){var e=this,n=function(){e.apply(this,arguments)},i=function(t){var e=function(){};return e.prototype=t,new e};return n.prototype=i(this.prototype),$.extend(n.prototype,t),n};o.extend=h.extend=l,$.extend(o.prototype,r),window.FishMVC=e}();