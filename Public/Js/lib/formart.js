/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-10-9
 * Time: AM10:48
 * To change this template use File | Settings | File Templates.
 */
define(['./../global/global', '../data/data','./content'], function (com, data) {
    var IndexController = FishMVC.View.extend({
        init: function () {
            var self = this;
            this.doCreate();
        },

        /**
         * 元素预绑定
         */
        elements: {
            '.collapser': 'collapser_rel',
            '.imgUrl': 'imgUrl_rel',
            '#doCreate':'doCreateButton',
            '#formartResult':'formartResult',
            '#inputText':'inputText',
            '.J_codeDesc':'codeDesc',
            '.J_propertyValue':'propertyValue_rel',
            '*[contenteditable]':'contenteditable_rel'
        },

        /**
         * 事件订阅
         */
        events: {
            'click collapser_rel': 'doCollapser',
            'hover imgUrl_rel': 'showImg',
            'click doCreateButton':'doCreate'
        },


        doCreate: function (target) {
            var self=this;

            this.codeDesc.each(function(){
                var msg = decodeURIComponent($(this).text());

                var that = this;
                self.doStartCreate(msg, '',function(result){
                    $(that).html(result).show();

                    if(!initData.userName){
                        self.contenteditable_rel().removeAttr('contenteditable');
                    }

                });
            })


        },

        doStartCreate: function (msg ,url, response) {
            var self = this;

            if (!msg) {
                return false;
            }

            if (!com.isString(msg)) {
                return false;
            }

            msg = msg.trim();


            var m;
            if(com.isJsonP(msg)){
                m = msg.match(/^(\w+\()(.+)\)$/);
                self.startMsg = m[1];
                msg = m[2];
                self.endMsg = '})';
            }else{
                self.startMsg = '';
                self.endMsg = '';
            }

            try {
                var newMsg = JSON.parse(msg);
                var html = self.forMart(newMsg);

                if (self.startMsg) {
                    html = '<div>' + self.startMsg + html + self.endMsg + '</div>';
                } else {
                    html = '<div class="distance">' + self.startMsg + html + self.endMsg + '</div>';
                }
                response(html);

                if(!window.bindJsonResultCheck){
                    bindJsonResult();
                }
            } catch (e) {

                response(msg);

            }
        },

        /**
         * 格式化数据
         * @param msg
         */
        forMart: function (msg) {
            var str = '';
            if (com.isBaseType(msg)) {
                str += this.getBaseTypeStr(msg);
            }

            if (com.isArray(msg)) {
                str += this.getArrayStr(msg);
            }

            if (com.isObject(msg)) {
                str += this.getObjectStr(msg);
            }

            return str;
        },

        /**
         * 基础数据类型数据
         */
        getBaseTypeStr: function (val) {
            var msg = '', type = com.getType(val);

            if (!com.isBaseType(val)) {
                return false;
            }

            if (com.isNull(val)) {
                msg = 'null';
            } else {
                msg = val.toString();
            }

            if (com.isUrl(val)) {
                var imgUrlClass = '';
                if (com.isgImgUrl(val)) {
                    imgUrlClass = 'imgUrl';
                }

                msg = '"<a href="' + val + '" class="' + imgUrlClass + '">' + val + '</a>"';
            } else if (com.isString(val)) {
                msg = val.split("<").join("&lt;").split(">").join("&gt;");
                msg = '"' + msg + '"';
            }

            return ' <span class="F' + type + ' J_propertyValue">' + msg + '</span>';
        },

        /**
         * 获取数值数据类型
         * @param val
         */
        getArrayStr: function (val) {
            if (!com.isArray(val)) {
                return false;
            }

            var i = 0, len = val.length, str = '', comma = ',';

            if (!len) {
                return '[]';
            }

            str += '<span class="collapser"> -</span><span> [</span><div class="Farray">';

            for (; i < len; i++) {

                if (i === (len - 1)) {
                    comma = '';
                }

                str += '<div class="distance J-hover">' + this.forMart(val[i]) + comma + '</div>';
            }

            str += '</div><span> ]</span>';

            return str;
        },


        /**
         * 获取对象字符串
         * @returns {boolean}
         */
        getObjectStr: function (val) {
            if (!com.isObject(val)) {
                return false;
            }

            var i = 0, len = com.getObjectLength(val), str = '', comma = ',';

            if (!len) {
                return '{}';
            }


            str += '<span class="collapser"> -</span><span> {</span><div class="Fobject">';

            for (k in val) {
                i++;
                if (i === (len)) {
                    comma = '';
                }
                str += '<div class="distance J-hover"> <span class="property J_property">"' + k + '"</span>:' + this.forMart(val[k]) + comma + '</div>';
            }

            str += '</div><span> }</span>';


            return str;
        },

        doCollapser: function (obj) {

        },

        showImg: function (obj) {
            obj = $(obj);
            var src = obj.attr('src');
        }

    });


    var indexController = new IndexController({el: $('body')});
});


