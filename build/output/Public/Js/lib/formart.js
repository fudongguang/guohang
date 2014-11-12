define(["./../global/global","../data/data","./content"],function(t){{var e=FishMVC.View.extend({init:function(){this.doCreate()},elements:{".collapser":"collapser_rel",".imgUrl":"imgUrl_rel","#doCreate":"doCreateButton","#formartResult":"formartResult","#inputText":"inputText",".J_codeDesc":"codeDesc",".J_propertyValue":"propertyValue_rel","*[contenteditable]":"contenteditable_rel"},events:{"click collapser_rel":"doCollapser","hover imgUrl_rel":"showImg","click doCreateButton":"doCreate"},doCreate:function(){var t=this;this.codeDesc.each(function(){var e=decodeURIComponent($(this).text()),r=this;t.doStartCreate(e,"",function(e){$(r).html(e).show(),initData.userName||t.contenteditable_rel().removeAttr("contenteditable")})})},doStartCreate:function(e,r,s){var a=this;if(!e)return!1;if(!t.isString(e))return!1;e=e.trim();var n;t.isJsonP(e)?(n=e.match(/^(\w+\()(.+)\)$/),a.startMsg=n[1],e=n[2],a.endMsg="})"):(a.startMsg="",a.endMsg="");try{var i=JSON.parse(e),o=a.forMart(i);o=a.startMsg?"<div>"+a.startMsg+o+a.endMsg+"</div>":'<div class="distance">'+a.startMsg+o+a.endMsg+"</div>",s(o),window.bindJsonResultCheck||bindJsonResult()}catch(l){s(e)}},forMart:function(e){var r="";return t.isBaseType(e)&&(r+=this.getBaseTypeStr(e)),t.isArray(e)&&(r+=this.getArrayStr(e)),t.isObject(e)&&(r+=this.getObjectStr(e)),r},getBaseTypeStr:function(e){var r="",s=t.getType(e);if(!t.isBaseType(e))return!1;if(r=t.isNull(e)?"null":e.toString(),t.isUrl(e)){var a="";t.isgImgUrl(e)&&(a="imgUrl"),r='"<a href="'+e+'" class="'+a+'">'+e+'</a>"'}else t.isString(e)&&(r=e.split("<").join("&lt;").split(">").join("&gt;"),r='"'+r+'"');return' <span class="F'+s+' J_propertyValue">'+r+"</span>"},getArrayStr:function(e){if(!t.isArray(e))return!1;var r=0,s=e.length,a="",n=",";if(!s)return"[]";for(a+='<span class="collapser"> -</span><span> [</span><div class="Farray">';s>r;r++)r===s-1&&(n=""),a+='<div class="distance J-hover">'+this.forMart(e[r])+n+"</div>";return a+="</div><span> ]</span>"},getObjectStr:function(e){if(!t.isObject(e))return!1;var r=0,s=t.getObjectLength(e),a="",n=",";if(!s)return"{}";a+='<span class="collapser"> -</span><span> {</span><div class="Fobject">';for(k in e)r++,r===s&&(n=""),a+='<div class="distance J-hover"> <span class="property J_property">"'+k+'"</span>:'+this.forMart(e[k])+n+"</div>";return a+="</div><span> }</span>"},doCollapser:function(){},showImg:function(t){t=$(t);t.attr("src")}});new e({el:$("body")})}});