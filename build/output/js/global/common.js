define(["../public/configs","./storage","./hack"],function(r,e,t){var n={}.toString,i=window.$,o=window.navigator.userAgent;return window.com=common={isFunction:function(r){return"[object Function]"==n.call(r)},isString:function(r){return"[object String]"==n.call(r)},isArray:function(r){return"[object Array]"==n.call(r)},isObject:function(r){return"[object Object]"==n.call(r)},ua:o,getRender:function(e,n){var a=new EJS({url:r.tplDir+e+".ejs?v=1111010806"}).render({md:n});return a&&(a=i(a),setTimeout(function(){t.placeHolder(a)},260)),a},showLoading:function(){var r='<div class="loading"></div>';i("body").append(r)},removeLoading:function(){i(".loading").remove()},ajax:function(r){var e=this;this.showLoading(),r.url&&(r.url+=/^[^\?]*\?/.test(r.url)?"&mdNmk="+Math.random():"?mdNmk="+Math.random());var t={type:"GET",url:this.host,data:"",dataType:"json",success:function(){},error:function(){alert("连接失败")},complete:function(){e.removeLoading()}};this.mix(t,r),t.success=function(e){r.success(e)},i.ajax(t)},mix:function(r,e){var t;for(t in e)r[t]=e[t]},clon:function(r){var e={},t=this;t.isArray(r)&&(e=[]);!function(r,e){if(t.isObject(r))for(k in r)r.hasOwnProperty(k)&&(t.isObject(r[k])?(e[k]={},arguments.callee(r[k],e[k])):t.isArray(r[k])?(e[k]=[],arguments.callee(r[k],e[k])):e[k]=r[k]);else if(t.isArray(r))for(k in r)t.isObject(r[k])?(e[k]={},arguments.callee(r[k],e[k])):t.isArray(r[k])?(e[k]=[],arguments.callee(r[k],e[k])):e[k]=r[k]}(r,e);return e},gather:{},query:function(r,e){if(!r)return!1;this._queryArray||(this._queryArray=[]),e=e||window.location.href,e=e.replace(/#[^&]*$/,"");var t=/\?(.+)/,n=e.match(t);if(n&&n[1]){var i=n[1].split("&");for(a in i){var o=i[a].split("="),c=o[0],s=o[1];this._queryArray[c]=s}return this._queryArray[r]?this._queryArray[r]:""}return""},simulate:function(r,e){this.ajax({url:"http://localhost/ThinkPHP/index.php/Home/Api/api?project=cps&api="+r,async:!1,dataType:"jsonp",success:function(r){r=JSON.parse(decodeURIComponent(r)),e&&g.isFunction(e)&&e(r)}})},showErrorLable:function(r,e){r.parent().find("label.validator_error").remove(),r.parent().append('<label class="validator_error">'+e+"</label>")},getDateStr:function(r){r=r||0;var e=new Date;e.setDate(e.getDate()+r);var t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate();return 10>n&&(n="0"+n),10>a&&(a="0"+a),t+"-"+n+"-"+a},openAppIframe:function(r){this.query("fr",r)||this.query("fr")&&(r=r+"&fr="+this.query("fr"));var e=document.createElement("iframe");e.style.display="none",e.src=r,document.body.appendChild(e)},shareHtml:""},common});