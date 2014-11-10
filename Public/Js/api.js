/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-10-9
 * Time: AM10:48
 * To change this template use File | Settings | File Templates.
 */
define(['./global/global', './data/data'], function (com, data) {
    var IndexController = FishMVC.View.extend({
        init: function () {
            var self = this;

            $(window).scroll(function(){
                var t = $(window).scrollTop();
                if(t<=47){
                    self.zhedieTarget.parent().css('top',47-t);
                }else{
                    self.zhedieTarget.parent().css('top',0);
                }
            })

        },

        /**
         * 元素预绑定
         */
        elements: {
            '#zhedie':'zhedie',
            '#zhedieTarget':'zhedieTarget',
            '.J_property,.J_propertyValue':'property_rel'
        },

        /**
         * 事件订阅
         */
        events: {
            'click zhedie':'doZhedie'
        },





        doZhedie:function(){
            var a = this.zhedieTarget.css('display');
            if(a==='none'){
                this.zhedieTarget.show();
                this.zhedieTarget.parent().css('width',250);
            }else{
                this.zhedieTarget.hide();
                this.zhedieTarget.parent().css('width',70);
            }

            return false;
        },


        doPropertyValue:function(){

        }

    });


    new IndexController({el: $('body')});
});


