/**
 * Created by fudg on 14-7-21.
 */

define(['./global/global', './public/functions', './data/data'], function (G, P, D) {

    $('.J_toggleShow').on('click',function(){
        var target = $(this).attr('target');
        var m = target.split('_');
        $('.J_'+m[0]+'Dest').hide();
        $('#'+target).show();
    });

    var IndexController = FishMVC.View.extend({
        init: function () {
            var self = this;
            this.doJiantou();
        },
        elements:{
            '.J_jiantou':'jiantou',
            '#infoTags a':'infoTags',
            '.J_icons a':'icons',
            '.J_iconsA a':'iconsA'
        },
        events:{
            'click infoTags':'doInfoTag',
            'click iconsA':'doIcons'
        },

        doInfoTag:function(target){
            this.infoTags.removeClass('selected');
            target.addClass('selected');
            return false;
        },

        doJiantou: function () {
            var self = this, i = 0, img;
            setInterval((function () {
                self['jiantou'].each(function (k, v) {
                    img = $(v).children('img');
                    img.css('opacity', 0.5);
                    img.eq(i).css('opacity', 1);
                });

                i++;

                if (i > 2) {
                    i = 0;
                }
            }), 300)
        },
        doIcons:function(target){
            this.icons.removeClass('selected');
            target.closest('.J_iconsA').prev().find('a').eq(target.index()).addClass('selected');
        }
    });

    var indexController = new IndexController({el: $('.wrapper')});


});
