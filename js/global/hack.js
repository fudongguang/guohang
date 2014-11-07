/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-1-17
 * Time: 下午3:46
 * 通用函数.
 */
define(['./common'], function (com) {
    var toString = {}.toString,
        UA = window.navigator.userAgent,
        href = window.location.href,
        $ = window.$,
        body = $(document.body);

    if (!window.console || !window.console.log) {
        window.console = {};
        window.console.log = function (t) {
        };
    }


    var hack = {
        fixed: function () {

            var tempHtml = $('<div style="box-sizing: border-box;width: 100px;padding-left:20px;display: block"></div>');
            body.append(tempHtml);

            if (tempHtml.width() !== 100 && window.navigator.userAgent.search('Android 2.3')>-1) {
                var fixedObj = $('.J_fixed'),
                    interval;
                fixedObj.show();

                fixedObj.each(function () {
                    var t = $(this).offset().top;
                    $(this).attr('top', t)
                });

                fixedObj.bind('touchstart',function(event){
                    event.stopPropagation();
                });

                fixedObj.bind('touchend',function(event){
                    setTimeout(function(){
                        body.trigger('touchend');
                    },500);
                    event.stopPropagation();
                });

                body.bind('touchstart', function () {

                    var fixedObj = $('.J_fixed');
                    fixedObj.hide();
                    clearInterval(interval);
                });

                body.bind('touchend', function () {
                    var fixedObj = $('.J_fixed');

                    fixedObj.each(function () {
                        var top = Number($(this).attr('top')),
                            scrollTop = document.body.scrollTop,
                            self = this;


                        var interval =setInterval(function(){
                            var tempTop = document.body.scrollTop;
                            if(tempTop===scrollTop){
                                clearInterval(interval);
                                newTop = top + tempTop;
                                $(self).css({position: 'absolute', top: newTop, bottom: 'auto'}).show();
                            }else{
                                scrollTop = tempTop;
                            }
                        },100)

                    });
                });
            }

            tempHtml.remove();
        }
    };



    hack.fixed();

    return hack;


    var str='<div id="product"><div>' +
        '<p class="desc">' +
        '<a href="">sdfsdf</a>' +
        '</p> ' +
        '</div> ' +
        '</div>' +
        ' <div> ' +
        '<p class="desc"><a href="">' +
        'koudai.com</a></p> ' +
        '</div>';


});
