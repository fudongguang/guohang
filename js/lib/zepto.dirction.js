(function ($) {

    var docEl = $(document);
    docEl.on('touchmove', function (e) {
        e.preventDefault();
    });

    var config = {
        itemSelector: '.page',
        direction: 'v'
    };

    var cover = $('<div class="moveCover" style="position: absolute;left: 0;top:0;width:100%;height:100%;background-color: rgba(0,0,0,0.3);z-index:10;display: none;"></div>');
    $('body').append(cover);

    var isIOS = false;
    if(window.navigator.userAgent.search(/iphone/i)>-1 || window.navigator.userAgent.search(/ipad/i)>-1){
        isIOS = true;
    }

    $.fn.pageSlider = function (option) {
        $.extend(config, option);
        var self = this,
            oldEventX = 0,
            oldEventY = 0,
            isTouchStart = false,
            isTouchMove = false,
            isAnimation = false,
            isDirectionV = (config.direction === 'v' ? true : false),
            sliderHeight = self.height(),
            sliderWidth = self.width(),
            movePage,
            curPage,
            gapX,
            gapY,
            gap,
            movePageStartPosition,
            distance = isDirectionV ? sliderHeight : sliderWidth,//页面间距离
            minDistance = distance * 0.2,//最小多少距离才可以移动
            minGap = 60,//最小触发距离
            moveDirction = false;


        var checkDirction = function (event) {

            if(moveDirction===config.direction){
                return true;
            }

            if(moveDirction){
                return false;
            }

            if (x < minGap && y < minGap) {
                return false;
            }

            var x = Math.abs(gapX),
                y = Math.abs(gapY);

            if (config.direction === 'v') {

                if(x>y){
                    moveDirction = 'h';
                    return false;
                }

                if (y < minGap) {
                    return false;
                } else {
                    moveDirction = 'v';
                    return true;
                }
            } else {

                if(x<y){
                    moveDirction = 'v';
                    return false;
                }

                if (x < minGap) {
                    return false;
                } else {
                    moveDirction = 'h';
                    return true;
                }
            }
        };

        var movePageFn = function (newPosition) {
            var opacity = Math.abs(gap) / distance;

            if (opacity > 0.8) {
                opacity = 0.8;
            }

//            var str='';
//            if(isDirectionV){
//                str = 'translate3d(0px, '+newPosition+'px, 0px)';
//            }else{
//                str = 'translate3d('+newPosition+'px, 0px, 0px)';
//            }
//
//            movePage.css('-webkit-transform', str);
//            return false;
////



//            movePage.css(isDirectionV ? 'top' : 'left', newPosition + 'px');
        };


        var setMovePage = function (event) {
            if(movePage){
                return movePage;
            }

            var nextPage = curPage.next(config.itemSelector),
                prevPage = curPage.prev(config.itemSelector);

            if (gap < 0) {
                movePage = nextPage;
                if (isDirectionV) {
                    movePageStartPosition = sliderHeight;
                } else {
                    movePageStartPosition = sliderWidth;
                }
            } else {
                movePage = prevPage;
                if (isDirectionV) {
                    movePageStartPosition = -sliderHeight;
                } else {
                    movePageStartPosition = -sliderWidth;
                }
            }
        };

        var getDestPosition = function () {
            var movePageIndex = movePage.index(),
                curPageIndex = curPage.index();

            if (movePageIndex > curPageIndex) {
                if (isDirectionV) {
                    if (Math.abs(gap) > minDistance) {
                        return 0;
                    } else {
                        return sliderHeight;
                    }
                } else {
                    if (Math.abs(gap) > minDistance) {
                        return 0;
                    } else {
                        return sliderWidth;
                    }
                }
            } else {
                if (isDirectionV) {
                    if (Math.abs(gap) > minDistance) {
                        return 0;
                    } else {
                        return -sliderHeight;
                    }
                } else {
                    if (Math.abs(gap) > minDistance) {
                        return 0;
                    } else {
                        return -sliderWidth;
                    }
                }
            }
        };


        docEl.on('touchstart', function (event) {
            if (isAnimation || window.isDoSart) {
                return true;
            }

            oldEventX = event.touches[0].clientX;
            oldEventY = event.touches[0].clientY;
            isTouchStart = true;
            isTouchMove = false;
            isAnimation = false;
            movePage = null;
            moveDirction = false;
            curPage = $('#curPage');
            gap = 0;
        });

        docEl.on('touchmove', function (event) {
            if (!isTouchStart || isAnimation || window.isDoSart) {
                return true;
            }

            gapX = event.touches[0].clientX - oldEventX;
            gapY = event.touches[0].clientY - oldEventY;

            if (isDirectionV) {
                gap = gapY;
            } else {
                gap = gapX;
            }

            if (!checkDirction(event)) {
                return true;
            }



            isTouchMove = true;



            if(!movePage){
                setMovePage(event);
                if(movePage.length){
                    movePage.css({
                        "-webkit-transform":"translate3d(0px, "+movePageStartPosition+"px, 0px)",
                        "transition":"-webkit-transform 0s ease-in",
                        "-webkit-transition":"-webkit-transform 0s ease-in 0",
                        "z-index":100,
                        "display":"block"
                    });

                    if(isIOS){
                        cover.show();
                    }
                }else{
                    if(gap<0){
                        $('#jichang_04').trigger('touchmoveself');
                    }
                }
            }

            if (!movePage || !movePage.length) {
                return true;
            }
        });

        docEl.on('touchend', function (event) {
            if (!isTouchStart || !isTouchMove || isAnimation || !movePage.length || window.isDoSart) {
                cover.hide();
                return true;
            }

            isAnimation = true;
            movePage.css({
                "-webkit-transform":"translate3d(0px, 0px, 0px)",
                "transition":"-webkit-transform 0.3s ease-in 0",
                "-webkit-transition":"-webkit-transform 0.3s ease-in 0"
            });


            setTimeout(function () {
                $('#curPage')
                    .removeAttr('id')
                    .hide();
                movePage
                    .css({
                        "z-index": "inherit",
                        "display":'block'
                    })
                    .attr('id', 'curPage');
                gap = 0;
                isAnimation = false;
                cover.hide();
            }, 300);


        });
    };


}(Zepto));
