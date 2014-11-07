(function ($) {

    $(document).on('touchmove',function(e){
        e.preventDefault();
    });

    var config = {
        itemSelector:'.page'
    };

    $.fn.pageSlider = function (option) {
        option = $.extend({}, config, option);
        var self = $(this),
            pages = $(this).find(config.itemSelector),
            sliderHeight = self.height(),
            sliderWidth = self.width(),
            canloop = option.canloop || false, //是否开启循环
            backMove = false,//向后移动
            forwardMove = false,//向前移动
            oldPosition = 0,
            isAnimate =false,//是否正在移动
            isDirectionV = (option.direction === 'h'?false:true),//移动方向
            distance = isDirectionV ? sliderHeight : sliderWidth,//页面间距离
            gap = 0,//手滑动距离
            isTouchStart = false,
            curPage,//当前显示page
            movePage,//移动的page
            minGap = distance*0.2;//生效距离

        if(pages.length<2){
            return;
        }

        pages.hide().css('position','absolute');
        pages.eq(0).css({left:0,top:0}).show().attr('id','touchSliderCurPage');

        var cover = $('<div style="position: absolute;left: 0;top:0;width:100%;height:100%;background-color: rgba(0,0,0,0.6);z-index:10;display: none;opacity: 1;"></div>');
        self.append(cover);


        self.on('touchstart',function(e){
            if(isAnimate){
                return false;
            }

            isTouchStart = true;

            gap = 0;

            var touch = e.touches[0];
            oldPosition = isDirectionV ? touch.clientY : touch.clientX;

            backMove = false;
            forwardMove = false;
            curPage = $('#touchSliderCurPage');
        }).on('touchmove',function(e){
            if(isAnimate || !isTouchStart){
                return false;
            }

            var touch = e.touches[0],
                curPosition = isDirectionV ? touch.clientY : touch.clientX,
                newPosition = 0;

            gap = curPosition - oldPosition;


            //向上滑动 向左滑动
            if(gap<0 && !isAnimate){
                newPosition = distance + gap;
                movePage = curPage.next('.page');


                curPage.prev('.page').hide();

                if(!movePage.length && !canloop){
                    return false;
                }

                if(!movePage.length && canloop){
                    movePage = pages.eq(0);
                }

                forwardMove = true;

                movePageFn(newPosition);
            }

            if(gap>0 && !isAnimate){
                newPosition = -distance + gap;
                movePage = curPage.prev('.page');

                curPage.next('.page').hide();

                if(!movePage.length && !canloop){
                    return false;
                }

                if(!movePage.length && canloop){
                    movePage = pages.eq(pages.length-1);
                }


                backMove = true;
                movePageFn(newPosition);
            }

        }).on('touchend',function(){
            if(!isTouchStart){
                return false;
            }

            isTouchStart = false;
            if(forwardMove || backMove){
                animatePage();
            }
        });


        var animatePage = function(){
            if(isAnimate || !movePage.length){
                $('#touchSliderCurPage').css('opacity',1).show().css('top',0);
                return false;
            }

            isAnimate = true;
            var cloumn = isDirectionV?'top':'left',
                value = 0,
                cssPropery = [];

            if(minGap>Math.abs(gap)){
                value = forwardMove?distance:-distance;
            }


            cssPropery[cloumn] = value;


            movePage.animate(cssPropery,250,'ease-in',function(){
                if(minGap<Math.abs(gap)){
                    curPage.hide().removeAttr('id').css('opacity',1);
                    curPage.find('.J_animation').hide();
                    curPage.find('.J_animationPrice').css('-webkit-animation','none');
                    movePage.attr('id','touchSliderCurPage').css('z-index','inherit').show().css('top',0);
                    movePage.find('.J_animation').show();
                    movePage.find('.J_animationPrice').css('-webkit-animation','swing .5s 2 ease-in 1.5s')

                }else{
                    curPage.css('opacity',1).show().css('top',0);
                    movePage.hide();
                }

                cover.hide();

                gap = 0;
                isAnimate = false;
            })
        };


        var movePageFn = function(newPosition){
            var opacity = Math.abs(gap)/(isDirectionV?sliderHeight:sliderWidth);

            if(opacity>0.8){
                opacity = 0.8;
            }

            cover.show().css('background-color','rgba(0,0,0,'+opacity+')');
            movePage.css(isDirectionV ? 'top' : 'left',newPosition+'px').css('z-index',100).show();
        };

    };


}(Zepto));
