/**
 * Created by fudg on 14-7-21.
 */

define(['./global/global', './public/functions', './data/data'], function (G, P, D) {

    $('.J_toggleShow').on('touchstart',function(){
        var target = $(this).attr('target');
        var m = target.split('_');
        $('.J_'+m[0]+'Dest').hide();
        $('#'+target).show();
    });

    var IndexController = FishMVC.View.extend({
        init: function () {
            var self = this;
            this.doJiantou();
            $('.wrapper').pageSlider({itemSelector:'.page',direction:'v'});
        },
        elements:{
            '.J_jiantou':'jiantou',
            '#infoTags a':'infoTags',
            '.J_icons a':'icons',
            '.J_iconsA a':'iconsA',
            '.J_initNum':'initNum',
            '.J_startNum':'startNum',
            '.J_endNum':'endNum',
            '.J_end':'end',
            '#result':'result',
            '#jichang_04':'jichang_04'
        },
        events:{
            'touchstart infoTags':'doInfoTag',
            'touchstart iconsA':'doIcons',
            'touchmoveself jichang_04':'doStart'
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
        },

        doStart:function(target){

            window.isDoSart = true;

            this.reset();

            target.hide();
            this.startNum.show();
            this.initNum.hide();
            $('#jichang_03 img').addClass('animationFeiji')

            var self = this;
            setTimeout(function(){
                self.doEnd();
            },5000)
        },

        getEndPosition:function(num){
            var   t = 0;

            num = parseInt(num);

//            if(isNaN(num)){
                num = Math.floor(Math.random() * ( 10));
//            }

            if(num === 0){
                num = 1;
            }

            if(num === 1){
                t = -55;
            }

            if(num === 2){
                t = -143;
            }

            if(num === 3){
                t = -223;
            }


            if(num === 4){
                t = -313;
            }

            if(num === 5){
                t = -393;
            }

            if(num === 6){
                t = -477;
            }

            if(num === 7){
                t = -560;
            }


            if(num === 8){
                t = -646;
            }

            if(num === 9){
                t = -730;
            }

            if(num === 10){
                t = -852;
            }

            return t-1000;
        },

        doEnd:function(result){

//            if(!result || !result.length || result.length!=5){
//                return false;
//            }


            var num1 = this.getEndPosition(0);
            var num2 = this.getEndPosition(3);
            var num3 = this.getEndPosition(9);
            var num4 = this.getEndPosition(10);
            var num5 = this.getEndPosition(3);

            var self = this;

            this.end.css({"opacity":0,"display":"block"});
            setTimeout(function(){
                self.end.eq(0).css({"background-position-y":num1,"opacity":1});
                self.end.eq(1).css({"background-position-y":num2,"opacity":1});
                self.end.eq(2).css({"background-position-y":num3,"opacity":1});
                self.end.eq(3).css({"background-position-y":num4,"opacity":1});
                self.end.eq(4).css({"background-position-y":num5,"opacity":1});

                setTimeout(function(){
                    self.jichang_04.show();
                    self.showResult();
                    $('#jichang_03 img').removeClass('animationFeiji')
                    window.isDoSart = false;
                },4000);
            },50);

            this.startNum.hide();
//            this.endNum.show();
        },

        reset:function(){
            this.initNum.show();
            this.end.hide();
            this.end.css({"background-position-y":-90,"opacity":1});
        },

        showResult:function(){
            this.result.show();
        }
    });

    var indexController = new IndexController({el: $('.wrapper')});

    setTimeout(function(){

        var doMusicControl = function(a){
            var video = document.getElementById('audioSource');

            if (video.paused) {
                if(a){
                    $('#musicControl').attr('src','images/music_on.png');
                }
                video.play();
            } else {
                if(a){
                    $('#musicControl').attr('src','images/music_off.png');
                }
                video.pause();
            }
        };

        doMusicControl();

        $('#musicControlA').on('touchstart',function(){
            doMusicControl(true);
        })

    },1000);

});
